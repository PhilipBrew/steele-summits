'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import styled from 'styled-components';

interface WrapperProps {
  $visible: boolean;
  $delay: number;
}

// The animated state lives entirely inside a `prefers-reduced-motion:
// no-preference` block, so a reduced-motion visitor never gets the opacity
// or transform applied at all. That's deliberately different from animating
// to a "no motion" value: if the observer never fires (JS disabled, old
// browser, bot), content outside this block is fully visible by default and
// nothing can leave the page stuck at opacity 0.
const Wrapper = styled.div<WrapperProps>`
  @media (prefers-reduced-motion: no-preference) {
    opacity: ${({ $visible }) => ($visible ? 1 : 0)};
    transform: ${({ $visible }) => ($visible ? 'none' : 'translateY(14px)')};
    transition:
      opacity 0.55s cubic-bezier(0.16, 1, 0.3, 1),
      transform 0.55s cubic-bezier(0.16, 1, 0.3, 1);
    transition-delay: ${({ $delay }) => $delay}ms;
    will-change: opacity, transform;
  }
`;

export interface RevealProps {
  children: ReactNode;
  /** Stagger offset in ms, for sequencing siblings. */
  delay?: number;
  className?: string;
}

export const Reveal = ({ children, delay = 0, className }: RevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // IntersectionObserver rather than a scroll listener: scroll handlers
    // fire on every frame and are a hard ban in the design rules.
    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            // One-shot: content should not re-hide when scrolled back past.
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Wrapper ref={ref} $visible={visible} $delay={delay} className={className}>
      {children}
    </Wrapper>
  );
};
