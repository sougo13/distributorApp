// src/styles/typography.ts

// Используем Regular и Medium, как ты уточнил
export const FONT_FAMILY = {
  regular: "Satoshi-Regular",
  medium: "Satoshi-Medium",
  // Добавь другие веса, если используешь (e.g., bold: 'Satoshi-Bold')
};

// Размеры шрифтов, используемые в проекте
export const FONT_SIZES = {
  h1: 24,
  h2: 20,
  h3: 18,
  bodyL: 18, // Возможно пригодится
  bodyM: 16, // Основной размер
  bodyS: 14, // Меньший размер
  bodyXS: 12, // Очень маленький (теги, рейтинг)
  button: 16, // Размер текста кнопки (совпадает с bodyM)
  tabLabel: 10, // Текст под иконками таб-бара
};

// Веса шрифтов (для справки или редких случаев, когда fontFamily не срабатывает)
export const FONT_WEIGHTS: {
  [key: string]:
    | "normal"
    | "bold"
    | "100"
    | "200"
    | "300"
    | "400"
    | "500"
    | "600"
    | "700"
    | "800"
    | "900";
} = {
  regular: "400",
  medium: "500", // '500' обычно соответствует Medium
  // semibold: '600',
  // bold: '700',
};

// Можно добавить lineHeights, letterSpacing, если они стандартизированы
// export const LINE_HEIGHTS = { ... };
// export const LETTER_SPACING = { ... };
