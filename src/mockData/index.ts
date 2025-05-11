// src/data/mockData.ts
import {
  Address,
  CartItem,
  Category,
  Order,
  OrderDetail,
  PaymentMethod,
  Supplier,
  SupplierDetail,
} from "../types"; // Импортируем типы

// Используем тип Category[]
export const CATEGORIES_DATA: Category[] = [
  // Используем require с путем ОТНОСИТЕЛЬНО ЭТОГО ФАЙЛА (src/data/)
  {
    id: "1",
    title: "Milk",
    image: require("../assets/images/categories/milk.png"),
  },
  {
    id: "2",
    title: "Cheese",
    image: require("../assets/images/categories/cheese.png"),
  },
  {
    id: "3",
    title: "Eggs",
    image: require("../assets/images/categories/eggs.png"),
  },
  {
    id: "4",
    title: "Bread",
    image: require("../assets/images/categories/bread.png"),
  },
  {
    id: "5",
    title: "Eggs",
    image: require("../assets/images/categories/eggs.png"),
  },
  {
    id: "6",
    title: "Butter",
    image: require("../assets/images/categories/butter.png"),
  },
  {
    id: "7",
    title: "Milk",
    image: require("../assets/images/categories/milk.png"),
  },
  {
    id: "8",
    title: "Cheese",
    image: require("../assets/images/categories/cheese.png"),
  },
  {
    id: "9",
    title: "Bread",
    image: require("../assets/images/categories/bread.png"),
  },
];

// Используем тип Supplier[]
export const SUPPLIERS_DATA: Supplier[] = [
  // Используем require с путем ОТНОСИТЕЛЬНО ЭТОГО ФАЙЛА (src/data/)
  {
    id: "s1",
    name: "Ballerina Farm",
    rating: 4.9,
    reviews: 21,
    tags: ["Milk", "Butter", "Cheese", "Cream"],
    image: require("../assets/images/suppliers/BallerinaFarm.png"),
    isFavorite: true,
  },
  {
    id: "s2",
    name: "Daily Farmers",
    rating: 4.5,
    reviews: 17,
    tags: ["Milk", "Butter", "Cheese", "Cream"],
    image: require("../assets/images/suppliers/DailyFarmers.png"),
    isFavorite: false,
  },
  {
    id: "s3",
    name: "Dean Foods",
    rating: 4.5,
    reviews: 212,
    tags: ["Milk", "Butter", "Cheese", "Cream"],
    image: require("../assets/images/suppliers/DeanFoods.png"),
    isFavorite: false,
  },
  {
    id: "s4",
    name: "Champs Meat",
    rating: 4.7,
    reviews: 11,
    tags: ["Meat", "Rice", "Cheese", "Yogurt"],
    image: require("../assets/images/suppliers/ChampsMeat.png"),
    isFavorite: true,
  },
  {
    id: "s5",
    name: "Local Bakery",
    rating: 4.8,
    reviews: 55,
    tags: ["Bread", "Pastry"],
    image: require("../assets/images/categories/bread.png"),
    isFavorite: false,
  }, // Placeholder image
  {
    id: "s6",
    name: "Eggcellent Farms",
    rating: 4.6,
    reviews: 30,
    tags: ["Eggs"],
    image: require("../assets/images/categories/eggs.png"),
    isFavorite: true,
  }, // Placeholder image
];

// --- Моковые данные для скидок/доставки ---
export const MOCK_DISCOUNT = 6.0;
export const MOCK_SPECIAL_DISCOUNT = 1.0;
export const MOCK_DELIVERY_FEE = 5.0;

export const MOCK_ADDRESSES: Address[] = [
  {
    id: "addr_1",
    fullAddress: "38 Kote and Soso Tsereteli Street, Tbilisi",
    street: "Kote and Soso Tsereteli Street",
    building: "38",
    city: "Tbilisi",
    postalCode: "0179",
    isPrimary: true, // Отмечаем как основной
    notes: "Call upon arrival",
  },
  {
    id: "addr_2",
    fullAddress: "12 Ivane Javakhishvili St, Batumi, 6010",
    street: "Ivane Javakhishvili St",
    building: "12",
    city: "Batumi",
    postalCode: "6010",
    isPrimary: false,
  },
  {
    id: "addr_3",
    fullAddress: "Business Center Plaza, Floor 5, Kutaisi",
    street: "Business Center Plaza", // Пример без номера дома
    apartment: "Floor 5",
    city: "Kutaisi",
    isPrimary: false,
  },
];

export const MOCK_PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: "pm_1",
    type: "card",
    last4: "1119",
    expiryMonth: 12,
    expiryYear: 2025,
    isPrimary: true,
    cardHolderName: "John Doe",
  },
  {
    id: "pm_2",
    type: "card",
    last4: "2124",
    expiryMonth: 8,
    expiryYear: 2026,
    isPrimary: false,
    cardHolderName: "Jane Smith",
  },
];

export const MOCK_CART_ITEMS: CartItem[] = [
  {
    id: "cart_item_1",
    product: {
      id: "prod_1",
      name: "Basmati rice",
      imageUrl: require("../assets/images/rice_basmati.png"),
      pricePerUnit: 9.0,
      unit: "Kg",
      supplierId: "sup1",
      unavailable: true, // <<< Помечаем этот товар как недоступный
    },
    quantity: 1,
  },
  {
    id: "cart_item_2",
    product: {
      id: "prod_2",
      name: "Brown rice",
      imageUrl: require("../assets/images/rice_brown.png"),
      pricePerUnit: 11.0, // Цена может измениться в чекауте
      unit: "Kg",
      supplierId: "sup2",
      // unavailable: false, // По умолчанию false или отсутствует
    },
    quantity: 1,
  },
  {
    // Добавим еще один доступный товар для примера
    id: "cart_item_3",
    product: {
      id: "prod_3",
      name: "Organic Quinoa",
      imageUrl: require("../assets/images/rice_basmati.png"),
      pricePerUnit: 15.0,
      unit: "Kg",
      supplierId: "sup1",
    },
    quantity: 2,
  },
];

export const MOCK_CHECKOUT_SUMMARY = {
  discount: 6.0,
  specialDiscount: 1.0,
  deliveryFee: 5.0,
};

export const MOCK_ORDER_DETAILS = {
  deliveryOption: "delivery" as const, // 'delivery' | 'pickup'
  address: MOCK_ADDRESSES.find((a) => a.isPrimary) || MOCK_ADDRESSES[0], // Выбранный адрес
  timeOption: "asap" as const, // 'asap' | 'scheduled'
  scheduledTime: null as string | null, // null или "Select date and time"
  businessStatus: "not_registered" as const, // 'registered' | 'not_registered'
  selectedPaymentMethod:
    MOCK_PAYMENT_METHODS.find((p) => p.isPrimary) || MOCK_PAYMENT_METHODS[0], // Выбранный метод оплаты
};

export const MOCK_ORDERS: Order[] = [
  // --- Current Orders ---
  {
    id: "order_1",
    supplier: {
      name: "Ballerina Farm",
      logoUrl: require("../assets/images/suppliers/BallerinaFarm.png"),
    },
    status: "Delivered",
    itemsSummary: "1 x Milk, 2 x Cheese",
    requiresResponse: true, // <<< Появляется предупреждение
    isCurrent: true,
  },
  {
    id: "order_2",
    supplier: {
      name: "Ballerina Farm",
      logoUrl: require("../assets/images/suppliers/BallerinaFarm.png"),
    },
    status: "Negotiating",
    itemsSummary: "1 x Meat, 4 x Milk",
    isCurrent: true,
  },
  {
    id: "order_3",
    supplier: {
      name: "Ballerina Farm",
      logoUrl: require("../assets/images/suppliers/BallerinaFarm.png"),
    },
    status: "Pending",
    itemsSummary: "1 x Meat, 4 x Milk",
    isCurrent: true,
  },
  {
    id: "order_4",
    supplier: {
      name: "Ballerina Farm",
      logoUrl: require("../assets/images/suppliers/BallerinaFarm.png"),
    },
    status: "InProgress",
    itemsSummary: "1 x Meat, 4 x Milk",
    isCurrent: true,
  },
  {
    id: "order_7",
    supplier: {
      name: "Daily Farmers",
      logoUrl: require("../assets/images/suppliers/DailyFarmers.png"),
    },
    status: "Accepted", // Использует secondary цвет
    itemsSummary: "5 x Butter",
    isCurrent: true,
  },

  // --- History Orders ---
  {
    id: "order_5",
    supplier: {
      name: "Ballerina Farm",
      logoUrl: require("../assets/images/suppliers/BallerinaFarm.png"),
    },
    status: "Accepted", // Повторяем для истории
    itemsSummary: "1 x Meat, 4 x Milk",
    isCurrent: false,
  },
  {
    id: "order_6",
    supplier: {
      name: "Ballerina Farm",
      logoUrl: require("../assets/images/suppliers/BallerinaFarm.png"),
    },
    status: "Canceled",
    itemsSummary: "1 x Meat, 4 x Milk",
    isCurrent: false,
  },

  {
    id: "order_8",
    supplier: {
      name: "Champs Meat",
      logoUrl: require("../assets/images/suppliers/ChampsMeat.png"),
    },
    status: "Declined",
    itemsSummary: "10 x Rice",
    isCurrent: false,
  },
  {
    id: "order_9",
    supplier: {
      name: "Dean Foods",
      logoUrl: require("../assets/images/suppliers/DeanFoods.png"),
    },
    status: "Delivered", // Доставленный в истории (без requiresResponse)
    itemsSummary: "2 x Yogurt",
    isCurrent: false,
  },
];

const DEFAULT_HEADER_IMAGE = require("../assets/images/mock_order_header.png"); // <<< Добавь путь к фоновому изображению

export const MOCK_ORDER_DETAILS_DATA: OrderDetail[] = [
  {
    // Заказ с зеленым баннером (Accepted and Rated) - соответствует order_1 из MOCK_ORDERS?
    id: "order_1", // <<< Связь с MOCK_ORDERS
    supplier: {
      name: "Ballerina Farm",
      logoUrl: require("../assets/images/suppliers/BallerinaFarm.png"),
    },
    orderNumber: "112233",
    status: "Delivered", // Основной статус
    detailedStatusType: "AcceptedAndRated", // Тип для UI
    statusTextKey: "orderDetails.status.delivered",
    statusBannerKey: "orderDetails.banner.acceptedAndRated", // Зеленый баннер
    orderDate: "2025-03-13T13:00:00Z",
    taxInvoiceNumber: "4455222336",
    items: [
      { id: "prod_1", name: "Basmati rice", quantity: 1, price: 9.0 },
      { id: "prod_2", name: "Brown rice", quantity: 1, price: 13.0 }, // Цена отличается от MOCK_CART_ITEMS
    ],
    discount: 6.0,
    specialDiscount: 1.0,
    deliveryFee: 5.0,
    totalAmount: 20.0,
    paymentMethodSummary: "card ending in 2211",
    currencySymbol: "₾",
    headerImageUrl: DEFAULT_HEADER_IMAGE,
  },
  {
    // Заказ с красным баннером (Declined) - соответствует order_8?
    id: "order_8", // <<< Связь с MOCK_ORDERS
    supplier: {
      name: "Champs Meat",
      logoUrl: require("../assets/images/suppliers/ChampsMeat.png"),
    },
    orderNumber: "112244", // Другой номер для примера
    status: "Declined",
    detailedStatusType: "DeclinedRefund", // Тип для UI
    statusTextKey: "orderDetails.status.declinedByYou",
    statusBannerKey: "orderDetails.banner.declinedRefund", // Красный баннер
    orderDate: "2025-03-14T10:15:00Z",
    taxInvoiceNumber: "4455222337",
    items: [{ id: "prod_rice", name: "Sushi Rice", quantity: 10, price: 90.0 }],
    deliveryFee: 5.0,
    totalAmount: 95.0, // Пример без скидок
    paymentMethodSummary: "card ending in 5544",
    currencySymbol: "₾",
    headerImageUrl: DEFAULT_HEADER_IMAGE,
  },
  {
    // Заказ с оранжевым баннером (Unsatisfied) - может быть любым доставленным заказом с проблемой
    id: "order_9", // <<< Связь с MOCK_ORDERS (доставленный в истории)
    supplier: {
      name: "Dean Foods",
      logoUrl: require("../assets/images/suppliers/DeanFoods.png"),
    },
    orderNumber: "112255",
    status: "Delivered", // Был доставлен, но возникла проблема
    detailedStatusType: "UnsatisfiedSupport", // Тип для UI
    // Текст статуса может быть другим, если проблема возникла после доставки
    statusTextKey: "orderDetails.status.delivered", // Или свой ключ "orderDetails.status.problemReported"
    statusBannerKey: "orderDetails.banner.unsatisfiedSupport", // Оранжевый баннер
    orderDate: "2025-03-12T09:00:00Z",
    taxInvoiceNumber: "4455222338",
    items: [
      { id: "prod_yogurt", name: "Greek Yogurt", quantity: 2, price: 12.0 },
    ],
    deliveryFee: 5.0,
    totalAmount: 17.0,
    paymentMethodSummary: "card ending in 1119",
    currencySymbol: "₾",
    headerImageUrl: DEFAULT_HEADER_IMAGE,
  },
  {
    // Пример заказа в процессе (без баннера) - соответствует order_4?
    id: "order_4", // <<< Связь с MOCK_ORDERS
    supplier: {
      name: "Ballerina Farm",
      logoUrl: require("../assets/images/suppliers/BallerinaFarm.png"),
    },
    orderNumber: "112266",
    status: "InProgress",
    detailedStatusType: "InProgress", // Тип для UI (без баннера)
    statusTextKey: "orderDetails.status.inProgress", // Ключ для текста "Your order is in progress"
    orderDate: "2025-03-15T11:00:00Z",
    taxInvoiceNumber: "4455222339",
    items: [
      { id: "prod_meat", name: "Beef Steak", quantity: 1, price: 25.0 },
      { id: "prod_milk", name: "Organic Milk", quantity: 4, price: 12.0 },
    ],
    deliveryFee: 5.0,
    totalAmount: 42.0,
    paymentMethodSummary: "card ending in 8888",
    currencySymbol: "₾",
    headerImageUrl: DEFAULT_HEADER_IMAGE,
  },
];

// Функция для получения деталей заказа по ID
export const getMockOrderDetailById = (id: string): OrderDetail | undefined => {
  return MOCK_ORDER_DETAILS_DATA.find((detail) => detail.id === id);
};

export const MOCK_SUPPLIER_DETAILS_DATA: SupplierDetail[] = [
  {
    id: "s1", // Соответствует Ballerina Farm в SUPPLIERS_DATA
    name: "Ballerina Farm",
    rating: 4.9,
    reviews: 21,
    isFavorite: true,
    headerImageUrl: require("../assets/images/mock_order_header.png"), // Используем то же изображение пока
    logoUrl: require("../assets/images/suppliers/BallerinaFarm.png"),
    infoBannerTextKey: "supplierDetail.priceWarningBanner", // Ключ для текста баннера
    categories: [
      // Категории для фильтров
      { id: "cat_rice", name: "Rice" },
      { id: "cat_sp", name: "Special Prices" },
      { id: "cat_beef", name: "Beef" },
      { id: "cat_cheese", name: "Cheese" },
      { id: "cat_milk", name: "Milk" },
      { id: "cat_butter", name: "Butter" },
    ],
    products: [
      // Товары этого поставщика
      {
        id: "p1_basmati",
        name: "Basmati rice",
        description:
          "Basmati rice is a long-grain, aromatic rice known for its fluffy texture and nutty flavor. Popular in...", // Обрежем на UI
        imageUrl: require("../assets/images/rice_basmati.png"),
        pricePerUnit: 9.0, // <<< Renamed from currentPrice
        oldPricePerUnit: 10.0, // <<< Renamed from originalPrice
        unit: "Kg",
        currencySymbol: "₾",
        supplierId: "s1", // <<< Added supplierId
        categoryId: "cat_rice", // <<< Added categoryId
      },
      {
        id: "p1_brown",
        name: "Brown rice",
        description:
          "Brown rice is a long-grain, aromatic rice known for its fluffy texture and nutty flavor. Popular in I...",
        imageUrl: require("../assets/images/rice_brown.png"),
        pricePerUnit: 11.0, // <<< Renamed from currentPrice
        oldPricePerUnit: 16.0, // <<< Renamed from originalPrice
        unit: "Kg",
        currencySymbol: "₾",
        supplierId: "s1", // <<< Added supplierId
        categoryId: "cat_rice", // <<< Added categoryId
      },
      {
        id: "p1_black",
        name: "Black rice",
        description:
          "Black rice is known for its health benefits and nutty taste. Popular in Asian cuisine...",
        imageUrl: require("../assets/images/black_rice.png"),
        pricePerUnit: 10.0, // <<< Renamed from currentPrice
        // oldPricePerUnit: 16.00, // <<< No old price here
        unit: "Kg",
        currencySymbol: "₾",
        supplierId: "s1", // <<< Added supplierId
        categoryId: "cat_rice", // <<< Added categoryId
      },
      {
        id: "p1_basmati_2", // Другой товар для длины списка
        name: "Basmati rice", // Может быть дубль названия, но другой ID
        description:
          "Premium quality Basmati rice, aged for extra flavor and aroma...",
        imageUrl: require("../assets/images/rice_basmati.png"),
        pricePerUnit: 10.0, // <<< Renamed from currentPrice
        unit: "Kg",
        currencySymbol: "₾",
        supplierId: "s1", // <<< Added supplierId
        categoryId: "cat_rice", // <<< Added categoryId
      },
      // Добавь больше товаров из других категорий для теста фильтров
      {
        id: "p1_milk",
        name: "Organic Milk",
        description: "Fresh organic whole milk.",
        imageUrl: require("../assets/images/categories/milk.png"), // Placeholder
        pricePerUnit: 3.5,
        unit: "Liter",
        currencySymbol: "₾",
        supplierId: "s1",
        categoryId: "cat_milk",
      },
      {
        id: "p1_cheese",
        name: "Cheddar Cheese",
        description: "Aged cheddar cheese block.",
        imageUrl: require("../assets/images/categories/cheese.png"), // Placeholder
        pricePerUnit: 15.0,
        unit: "Kg",
        currencySymbol: "₾",
        supplierId: "s1",
        categoryId: "cat_cheese",
      },
    ],
  },
  {
    id: "s4", // Соответствует Champs Meat в SUPPLIERS_DATA
    name: "Champs Meat",
    rating: 4.7,
    reviews: 11,
    isFavorite: true,
    headerImageUrl: require("../assets/images/mock_order_header.png"), // Другое изображение?
    logoUrl: require("../assets/images/suppliers/ChampsMeat.png"),
    // infoBannerTextKey: "supplierDetail.priceWarningBanner", // Можно не показывать баннер
    categories: [
      { id: "cat_beef", name: "Beef" },
      { id: "cat_chicken", name: "Chicken" },
      { id: "cat_pork", name: "Pork" },
      { id: "cat_sp", name: "Special Prices" },
    ],
    products: [
      {
        id: "p4_steak",
        name: "Ribeye Steak",
        description: "Premium cut Ribeye steak, perfect for grilling.",
        imageUrl: require("../assets/images/mock_order_header.png"), // Заменить на изображение мяса
        pricePerUnit: 25.0, // <<< Renamed from currentPrice
        unit: "Kg",
        currencySymbol: "₾",
        supplierId: "s4", // <<< Added supplierId
        categoryId: "cat_beef", // <<< Added categoryId
      },
      {
        id: "p4_mince",
        name: "Lean Beef Mince",
        description: "90% lean beef mince, great for bolognese or burgers.",
        imageUrl: require("../assets/images/mock_order_header.png"), // Заменить на изображение мяса
        pricePerUnit: 18.0, // <<< Renamed from currentPrice
        unit: "Kg",
        currencySymbol: "₾",
        supplierId: "s4", // <<< Added supplierId
        categoryId: "cat_beef", // <<< Added categoryId
      },
      {
        id: "p4_chicken_breast",
        name: "Chicken Breast",
        description: "Skinless, boneless chicken breast.",
        imageUrl: require("../assets/images/mock_order_header.png"), // Заменить на изображение мяса
        pricePerUnit: 12.0,
        unit: "Kg",
        currencySymbol: "₾",
        supplierId: "s4",
        categoryId: "cat_chicken",
      },
      // Добавь больше товаров
    ],
  },
  // Добавь детали для других поставщиков при необходимости
];

// Функция для получения деталей поставщика по ID
export const getMockSupplierDetailById = (
  id: string
): SupplierDetail | undefined => {
  return MOCK_SUPPLIER_DETAILS_DATA.find((detail) => detail.id === id);
};

export const MOCK_MAP_IMAGE = require("../assets/images/mock_map.png"); // <<< ДОБАВЛЯЮ ЭКСПОРТ MOCK_MAP_IMAGE
