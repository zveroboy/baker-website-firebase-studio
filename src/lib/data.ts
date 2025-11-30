import type { Category, Product, FAQ, GalleryImage, Order } from './types';

export const categories: Category[] = [
  { id: 'cakes', name: 'Торты' },
  { id: 'pastries', name: 'Пирожные' },
  { id: 'desserts', name: 'Десерты' },
];

export const products: Product[] = [
  {
    id: 'napoleon',
    name: 'Торт "Наполеон"',
    description: 'Классический слоеный торт с нежным заварным кремом.',
    longDescription: 'Наш "Наполеон" — это хрустящие, тающие во рту коржи, прослоенные воздушным заварным кремом по старинному рецепту. Каждый кусочек - это путешествие в детство. Идеально подходит для семейного чаепития или торжественного события.',
    price: 1500, // per kg
    unit: 'kg',
    minWeight: 1,
    maxWeight: 5,
    weightStep: 0.5,
    allergens: ['Пшеничная мука', 'Молоко', 'Яйца', 'Сливочное масло'],
    categoryId: 'cakes',
    imageId: 'napoleon-cake',
    featured: true,
  },
  {
    id: 'medovik',
    name: 'Торт "Медовик"',
    description: 'Ароматные медовые коржи со сметанным кремом.',
    longDescription: 'Нежный, ароматный и очень домашний торт "Медовик". Тонкие медовые коржи, пропитанные легким сметанным кремом, создают неповторимый вкус, который любят и взрослые, и дети. Мы используем только натуральный цветочный мед.',
    price: 1400, // per kg
    unit: 'kg',
    minWeight: 1,
    maxWeight: 4,
    weightStep: 0.5,
    allergens: ['Пшеничная мука', 'Молоко', 'Яйца', 'Мед', 'Сметана'],
    categoryId: 'cakes',
    imageId: 'honey-cake',
    featured: true,
  },
  {
    id: 'eclairs',
    name: 'Эклеры',
    description: 'Набор изысканных эклеров с разными начинками.',
    longDescription: 'Воздушное заварное тесто, наполненное нежным кремом и покрытое глазурью. В наборе эклеры с классическим заварным кремом, шоколадным ганашем и фисташковым муссом. Настоящее французское лакомство.',
    price: 250, // per item
    unit: 'item',
    quantities: [6, 12, 18],
    allergens: ['Пшеничная мука', 'Молоко', 'Яйца', 'Шоколад', 'Орехи'],
    categoryId: 'pastries',
    imageId: 'eclairs-set',
    featured: true,
  },
  {
    id: 'pavlova',
    name: 'Десерт "Павлова"',
    description: 'Хрустящая меренга, взбитые сливки и свежие ягоды.',
    longDescription: 'Легендарный десерт, названный в честь балерины Анны Павловой. Хрустящая снаружи и нежная внутри меренга, облако взбитых сливок и шапка из свежих сезонных ягод. Легкий, воздушный и незабываемый.',
    price: 350, // per item
    unit: 'item',
    quantities: [4, 6, 8],
    allergens: ['Яйца', 'Сахар'],
    categoryId: 'desserts',
    imageId: 'pavlova-dessert',
    featured: false,
  },
    {
    id: 'cheesecake',
    name: 'Чизкейк "Нью-Йорк"',
    description: 'Классический чизкейк на песочной основе.',
    longDescription: 'Плотный, сливочный и насыщенный — это все о нашем чизкейке "Нью-Йорк". Мы готовим его из лучшего сливочного сыра на тонкой основе из песочного печенья. Подается с ягодным соусом.',
    price: 1800, // per kg
    unit: 'kg',
    minWeight: 1.2,
    maxWeight: 3.6,
    weightStep: 0.6,
    allergens: ['Пшеничная мука', 'Сливочный сыр', 'Яйца', 'Сливки'],
    categoryId: 'cakes',
    imageId: 'cheesecake-slice',
    featured: false,
  },
  {
    id: 'cupcakes',
    name: 'Капкейки',
    description: 'Ассорти капкейков с кремовой шапочкой.',
    longDescription: 'Нежные бисквитные кексы (ванильные или шоколадные) с шапочкой из сливочного крема. Идеальное порционное угощение для любого праздника. Доступны для заказа в ассортименте вкусов.',
    price: 200, // per item
    unit: 'item',
    quantities: [6, 9, 12, 24],
    allergens: ['Пшеничная мука', 'Молоко', 'Яйца', 'Сливочное масло'],
    categoryId: 'pastries',
    imageId: 'cupcakes-box',
    featured: false,
  },
];

export const faqs: FAQ[] = [
  {
    id: '1',
    question: 'За какое время нужно делать заказ?',
    answer: 'Мы рекомендуем делать заказ на торты за 3-5 дней, на пирожные и десерты — за 1-2 дня. Для срочных заказов, пожалуйста, свяжитесь с нами по телефону.',
  },
  {
    id: '2',
    question: 'Какие у вас есть варианты доставки?',
    answer: 'Вы можете забрать заказ самостоятельно (самовывоз) из нашей кондитерской или заказать доставку курьером по городу. Стоимость доставки рассчитывается индивидуально в зависимости от района.',
  },
  {
    id: '3',
    question: 'Используете ли вы натуральные ингредиенты?',
    answer: 'Да, мы гордимся тем, что используем только высококачественные и натуральные ингредиенты: настоящее сливочное масло, свежие яйца, натуральные сливки и бельгийский шоколад.',
  },
  {
    id: '4',
    question: 'Можно ли сделать торт с индивидуальным дизайном?',
    answer: 'Конечно! Мы с радостью обсудим ваши идеи и создадим торт вашей мечты. Свяжитесь с нами, чтобы обсудить детали дизайна, начинки и стоимость.',
  },
];

export const galleryImages: GalleryImage[] = [
  { id: '1', imageId: 'gallery-1', alt: 'Элегантный свадебный торт с живыми цветами' },
  { id: '2', imageId: 'gallery-2', alt: 'Разноцветные пирожные макарон крупным планом' },
  { id: '3', imageId: 'gallery-3', alt: 'Яркий детский торт на день рождения' },
  { id: '4', imageId: 'gallery-4', alt: 'Тарталетка с темным шоколадом и ягодами' },
  { id: '5', imageId: 'gallery-5', alt: 'Витрина с ассортиментом свежей выпечки' },
  { id: '6', imageId: 'gallery-6', alt: 'Процесс украшения торта кремом' },
  { id: '7', imageId: 'gallery-7', alt: 'Глянцевый фруктовый тарт' },
  { id: '8', imageId: 'gallery-8', alt: 'Стопка домашнего шоколадного печенья' },
];

export const orders: Order[] = [
  {
    id: 'ORD001',
    customerName: 'Иван Петров',
    customerPhone: '+7 (926) 123-45-67',
    customerEmail: 'ivan.p@example.com',
    productId: 'napoleon',
    productName: 'Торт "Наполеон"',
    quantity: 2, // 2 kg
    totalPrice: 3000,
    deliveryType: 'delivery',
    deliveryAddress: 'г. Москва, ул. Тверская, д. 10, кв. 5',
    deliveryDate: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString(),
    specialRequest: 'Пожалуйста, поменьше сахара в креме.',
    status: 'Новый',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'ORD002',
    customerName: 'Анна Сидорова',
    customerPhone: '+7 (916) 765-43-21',
    customerEmail: 'anna.s@example.com',
    productId: 'eclairs',
    productName: 'Эклеры',
    quantity: 12, // 12 items
    totalPrice: 3000,
    deliveryType: 'pickup',
    deliveryDate: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(),
    status: 'Подтвержден',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
  },
];
