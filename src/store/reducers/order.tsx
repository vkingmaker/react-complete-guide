import { ActionTypes } from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';
import { OrderType } from '../../shared/types';
import { OrderState } from '../../shared/types';

const initialState = {
  orders: [],
  loading: false,
  purchased: false
};

interface OrderAction {
  orderId?: number;
  type: string;
  error?: { message: string };
  orders?: OrderType;
  orderData?: {
    ingredients: {
      [key: string]: number;
    };
    orderData: {
      country: string;
      deliveryMethod: string;
      email: string;
      name: string;
      street: string;
      zipCode: string;
    };
    price: number;
    userId: string;
  };
}

const purchaseInit = (state: OrderState, action: { type: string }) => {
  return updateObject(state, { purchased: false });
};

const purchaseBurgerStart = (state: OrderState, action: { type: string }) => {
  return updateObject(state, { loading: true });
};

const purchaseBurgerSuccess = (state: OrderState, action: OrderAction) => {
  const newOrder = updateObject(action.orderData, { id: action.orderId });
  return updateObject(state, {
    loading: false,
    purchased: true,
    orders: state.orders.concat(newOrder)
  });
};

const purchaseBurgerFail = (state: OrderState, action: OrderAction) => {
  return updateObject(state, { loading: false });
};

const fetchOrdersStart = (state: OrderState, action: OrderAction) => {
  return updateObject(state, { loading: true });
};

const fetchOrdersSuccess = (state: OrderState, action: OrderAction) => {
  return updateObject(state, {
    orders: action.orders,
    loading: false
  });
};

const fetchOrdersFail = (state: OrderState, action: OrderAction) => {
  return updateObject(state, { loading: false });
};

const reducer = (state = initialState, action: OrderAction) => {
  switch (action.type) {
    case ActionTypes.PURCHASE_INIT:
      return purchaseInit(state, action);
    case ActionTypes.PURCHASE_BURGER_START:
      return purchaseBurgerStart(state, action);
    case ActionTypes.PURCHASE_BURGER_SUCCESS:
      return purchaseBurgerSuccess(state, action);
    case ActionTypes.PURCHASE_BURGER_FAIL:
      return purchaseBurgerFail(state, action);
    case ActionTypes.FETCH_ORDERS_START:
      return fetchOrdersStart(state, action);
    case ActionTypes.FETCH_ORDERS_SUCCESS:
      return fetchOrdersSuccess(state, action);
    case ActionTypes.FETCH_ORDERS_FAIL:
      return fetchOrdersFail(state, action);
    default:
      return state;
  }
};

export default reducer;
