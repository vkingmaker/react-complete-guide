export interface OrderType {
  id?: string;
  userId: string;
  price: number;
  ingredients: IngredientsType;
  orderData: OrderDataType;
}

export interface OrderDataType {
  country: string;
  deliveryMethod: string;
  email: string;
  name: string;
  street: string;
  zipCode: string;
}

export interface OrderState {
  orders: OrderType[];
  loading: boolean;
  purchased?: boolean;
}

export interface IngredientsType {
  bacon: number;
  salad: number;
  cheese: number;
  meat: number;
}
