import 'styled-components';
import type { Theme } from './theme';

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type -- module augmentation requires this shape
  export interface DefaultTheme extends Theme {}
}
