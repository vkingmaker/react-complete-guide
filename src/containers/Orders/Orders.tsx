import React, { Component } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { fetchOrders } from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Dispatch } from 'redux';
import { OrderType } from '../../shared/types';

interface OrdersProps {
  token: string;
  userId: string;
  orders: OrderType[];
  loading: boolean;
  fetchOrders(
    token: string,
    userId: string
  ): (token: string, userId: string) => OrderType[];
}
class Orders extends Component<OrdersProps> {
  componentDidMount() {
    this.props.fetchOrders(this.props.token, this.props.userId);
  }

  render() {
    let orders = <Spinner />;
    if (!this.props.loading) {
      orders: [] = this.props.orders.map(order => (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          price={order.price}
        />
      ));
    }
    return <div>{orders}</div>;
  }
}

const mapStateToProps = (state: {
  order: { orders: OrderType; loading: boolean };
  auth: { token: string; userId: string };
}) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

export default connect(
  mapStateToProps,
  { fetchOrders }
)(withErrorHandler(Orders, axios));
