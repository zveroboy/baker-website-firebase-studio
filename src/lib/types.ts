export type Category = {
  id: string;
  name: string;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  price: number;
  unit: 'kg' | 'item';
  minWeight?: number;
  weightStep?: number;
  maxWeight?: number;
  quantities?: number[];
  allergens: string[];
  categoryId: string;
  imageId: string;
  featured: boolean;
};

export type FAQ = {
  id: string;
  question: string;
  answer: string;
};

export type GalleryImage = {
  id: string;
  imageId: string;
  alt: string;
};

export type Order = {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  productId: string;
  productName: string;
  quantity: number;
  totalPrice: number;
  deliveryType: 'pickup' | 'delivery';
  deliveryAddress?: string;
  deliveryDate: string;
  specialRequest?: string;
  status: 'Новый' | 'Подтвержден' | 'Готовится' | 'Готов к выдаче' | 'Доставлен' | 'Отменен';
  createdAt: string;
  deliveryFee?: number;
};
