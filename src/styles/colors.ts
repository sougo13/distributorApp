// src/styles/colors.ts
export const COLORS = {
  // Core Palette
  primary: "#141414", // Night (основной фон, темный текст на светлом)
  secondary: "#59FFA0", // Spring Green (акценты, активные элементы)
  accent: "#FFFAFF", // Ghost White (основной светлый текст, фон светлой темы)

  // Grays & Neutrals
  white: "#FFFFFF",
  black: "#000000",
  grey: "#64748B", // Неактивные элементы таббара
  placeholder: "#A9A9A9", // Плейсхолдеры (можно уточнить по дизайну полей ввода)
  border: "#E0E0E0", // Границы (редко используются в темной теме)
  inputBackground: "#2D2D2D", // Фон полей ввода (из скринов Personal Info и др.)
  cardBackground: "#2D2D2D", // Фон карточек, аккордеона FAQ, строк выбора
  listItemBackground: "#1F1F1F", // Фон элементов списка в ProfileScreen (чуть темнее?) - *Предположение, можно подстроить*
  iconGrey: "#9CA3AF", // Цвет иконок в полях ввода / списках

  // Functional Colors
  searchBackground: "#434243", // Фон поиска на HomeScreen
  tagBackground: "#434243", // Фон тегов на HomeScreen

  // Specific UI Colors
  profileHeaderGradientStart: "#141414", // Начало градиента в хедере профиля
  profileHeaderGradientEnd: "rgba(20, 20, 20, 0.5)", // Конец градиента в хедере профиля (как в linear-gradient)
  // Заметил, что в CSS градиенте у тебя было два linear-gradient. Второй перекрывает первый.
  // #59FFA0 (secondary) - похоже, это цвет фона *под* градиентом или основной цвет акцентов в хедере.
  // Уточним: сам градиент должен быть от #141414 к rgba(20, 20, 20, 0.5) поверх фона #59FFA0?
  // Или градиент от #59FFA0 к #59FFA0 (т.е. сплошной #59FFA0) поверх градиента от #141414?
  // Пока сделаем проще: градиент от #141414 к rgba(20, 20, 20, 0.5) поверх фона #141414.
  // Цвет #59FFA0 используем для кнопки "Get Help".

  deleteButtonBackBackground: "rgba(20, 20, 20, 0.8)", // #141414CC - фон кнопки "Back" при удалении

  // Status Colors (из скриншота статусов, добавь по мере необходимости)
  statusPending: "#...", // Добавь цвета статусов из дизайн-системы
  statusInProgress: "#...",
  statusNegotiating: "#...",
  statusCanceled: "#...",
  statusDelivered: "#...",
  statusAccepted: "#...",
  statusDeclined: "#...",
};
