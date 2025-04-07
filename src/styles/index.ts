// src/styles/index.ts
// Этот файл ре-экспортирует все константы из других файлов папки styles

export * from "./colors";
export * from "./typography";
export * from "./spacing";
export * from "./components";

// Можно также экспортировать единый объект theme, если предпочитаешь
/*
import { COLORS } from './colors';
import { FONT_FAMILY, FONT_SIZES, FONT_WEIGHTS } from './typography';
import { SPACING } from './spacing';
import { COMPONENT_STYLES } from './components';

export const theme = {
  colors: COLORS,
  typography: {
    families: FONT_FAMILY,
    sizes: FONT_SIZES,
    weights: FONT_WEIGHTS,
  },
  spacing: SPACING,
  components: COMPONENT_STYLES,
};
*/
