import { Dispatch } from 'redux';
import { ActionTypes } from './actionTypes';
import axios from '../../axios-orders';
import { OrderDataType, OrderType } from '../../shared/types';

export const purchaseBurgerSuccess = (id: number, orderData: OrderDataType) => {
  return {
    type: ActionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData
  };
};

export const purchaseBurgerFail = (error: { message: string }) => {
  return {
    type: ActionTypes.PURCHASE_BURGER_FAIL,
    error: error
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: ActionTypes.PURCHASE_BURGER_START
  };
};

export const purchaseBurger = (orderData: OrderDataType, token: string) => {
  return (dispatch: Dispatch) => {
    dispatch(purchaseBurgerStart());
    axios
      .post('/orders.json?auth=' + token, orderData)
      .then(response => {
        dispatch(purchaseBurgerSuccess(response.data.name, orderData));
      })
      .catch(error => {
        dispatch(purchaseBurgerFail(error));
      });
  };
};

export const purchaseInit = () => {
  return {
    type: ActionTypes.PURCHASE_INIT
  };
};

export const fetchOrdersSuccess = (orders: OrderType[]) => {
  return {
    type: ActionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders
  };
};

export const fetchOrdersFail = (error: string) => {
  return {
    type: ActionTypes.FETCH_ORDERS_FAIL,
    error: error
  };
};

export const fetchOrdersStart = () => {
  return {
    type: ActionTypes.FETCH_ORDERS_START
  };
};

export const fetchOrders = (token: string, userId: string) => {
  return (dispatch: Dispatch) => {
    dispatch(fetchOrdersStart());
    const queryParams =
      '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
    axios
      .get('/orders.json' + queryParams)
      .then(res => {
        const fetchedOrders = [];
        for (let key in res.data) {
          fetchedOrders.push({
            ...res.data[key],
            id: key
          });
        }
        dispatch(fetchOrdersSuccess(fetchedOrders));
      })
      .catch(err => {
        dispatch(fetchOrdersFail(err));
      });
  };
};
