import { css, DefaultTheme } from "styled-components";

const breakpoints = {
  mobile: 500,
  tablet: 768,
  laptop: 1024,
  pc: 1440,
} as const;

type Breakpoints = keyof typeof breakpoints;

const styledMedia = Object.keys(breakpoints).reduce((acc, label) => {
  acc[label as Breakpoints] = (literals: TemplateStringsArray, ...placeholders: any[]) => css`
    @media (max-width: ${breakpoints[label as Breakpoints]}px) {
      ${css(literals, ...placeholders)};
    }
  `;
  return acc;
}, {} as Record<Breakpoints, (l: TemplateStringsArray, ...p: any[]) => ReturnType<typeof css>>);

export default styledMedia;
