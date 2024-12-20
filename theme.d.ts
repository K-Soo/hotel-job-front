import 'styled-components';
import colors from '@/styles/colors';

type Colors = typeof colors;

interface MediaQueries {
  mobile: (literals: TemplateStringsArray, ...placeholders: any[]) => ReturnType<typeof css>;
  tablet: (literals: TemplateStringsArray, ...placeholders: any[]) => ReturnType<typeof css>;
  laptop: (literals: TemplateStringsArray, ...placeholders: any[]) => ReturnType<typeof css>;
  pc: (literals: TemplateStringsArray, ...placeholders: any[]) => ReturnType<typeof css>;
}

// declare module "styled-components" {
//   export interface DefaultTheme extends MediaQueries {}
// }

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: Colors;
    media: MediaQueries;
  }
}
