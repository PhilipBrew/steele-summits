'use client';

import styled from 'styled-components';

export type LandscapeScene = 'fells' | 'valley' | 'coast' | 'summit';

export interface LandscapeBannerProps {
  $scene?: LandscapeScene;
}

const Svg = styled.svg`
  position: absolute;
  inset: 0;
  z-index: 0;
  width: 100%;
  height: 100%;
  display: block;
`;

interface Layer {
  points: string;
  color: string;
  opacity?: number;
}

interface SceneConfig {
  skyTop: string;
  skyBottom: string;
  sun?: { cx: number; cy: number; r: number; color: string; opacity: number };
  water?: { y: number; height: number; color: string };
  layers: Layer[];
}

const scenes: Record<LandscapeScene, SceneConfig> = {
  // Lake District fells in warm morning light
  fells: {
    skyTop: '#F6E9CE',
    skyBottom: '#E3ECDD',
    sun: { cx: 1180, cy: 130, r: 85, color: '#F3D9A6', opacity: 0.6 },
    layers: [
      {
        points:
          '0,380 160,310 340,345 520,280 700,335 900,265 1080,325 1260,275 1440,330 1440,600 0,600',
        color: '#A9BFA0',
      },
      {
        points:
          '0,440 200,375 380,415 560,345 760,405 960,335 1160,395 1320,345 1440,385 1440,600 0,600',
        color: '#6B8F6E',
      },
      {
        points:
          '0,520 220,460 420,500 620,440 820,490 1040,430 1240,480 1440,455 1440,600 0,600',
        color: '#28402C',
      },
    ],
  },
  // Misty Lakeland valley with a glimpse of water
  valley: {
    skyTop: '#E7ECE6',
    skyBottom: '#F7F5EF',
    water: { y: 350, height: 40, color: '#C3D3CB' },
    layers: [
      {
        points:
          '0,430 220,400 440,415 660,390 880,410 1100,385 1320,405 1440,395 1440,600 0,600',
        color: '#B4C4B9',
      },
      {
        points:
          '0,500 260,480 520,490 780,465 1040,485 1300,460 1440,475 1440,600 0,600',
        color: '#7E9A87',
      },
      {
        points:
          '0,560 300,545 600,552 900,535 1200,548 1440,538 1440,600 0,600',
        color: '#3A5A40',
      },
    ],
  },
  // Northumberland coast — sea, sand dunes, marram grass
  coast: {
    skyTop: '#DCEFF2',
    skyBottom: '#F3EFE1',
    water: { y: 380, height: 55, color: '#6E9C9A' },
    layers: [
      {
        points:
          '0,460 220,435 460,450 700,430 940,448 1180,432 1440,445 1440,600 0,600',
        color: '#C9A467',
      },
      {
        points:
          '0,540 260,520 520,528 800,510 1060,524 1300,512 1440,518 1440,600 0,600',
        color: '#28402C',
      },
    ],
  },
  // Moody, misty high fell summit
  summit: {
    skyTop: '#C9D3D1',
    skyBottom: '#EDE7D8',
    layers: [
      {
        points:
          '0,340 220,260 460,300 640,180 860,290 1080,240 1260,300 1440,260 1440,600 0,600',
        color: '#9FB3AE',
        opacity: 0.65,
      },
      {
        points:
          '0,430 240,380 480,410 700,340 920,400 1140,360 1440,390 1440,600 0,600',
        color: '#5C7A72',
      },
      {
        points:
          '0,520 260,490 540,505 800,470 1060,500 1300,480 1440,495 1440,600 0,600',
        color: '#28402C',
      },
    ],
  },
};

export const LandscapeBanner = ({ $scene = 'fells' }: LandscapeBannerProps) => {
  const scene = scenes[$scene];
  const gradientId = `sky-${$scene}`;

  return (
    <Svg
      viewBox="0 0 1440 600"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={scene.skyTop} />
          <stop offset="100%" stopColor={scene.skyBottom} />
        </linearGradient>
      </defs>
      <rect
        x="0"
        y="0"
        width="1440"
        height="600"
        fill={`url(#${gradientId})`}
      />
      {scene.sun && (
        <circle
          cx={scene.sun.cx}
          cy={scene.sun.cy}
          r={scene.sun.r}
          fill={scene.sun.color}
          opacity={scene.sun.opacity}
        />
      )}
      {scene.water && (
        <rect
          x="0"
          y={scene.water.y}
          width="1440"
          height={scene.water.height}
          fill={scene.water.color}
          opacity={0.85}
        />
      )}
      {scene.layers.map(layer => (
        <polygon
          key={layer.points}
          points={layer.points}
          fill={layer.color}
          opacity={layer.opacity ?? 1}
        />
      ))}
    </Svg>
  );
};
