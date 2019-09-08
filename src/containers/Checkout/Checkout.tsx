import React, { Component } from 'react';
import { Route, Redirect, match } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

interface CheckoutProps {
  ings: any;
  purchased: boolean;
  match: match;
  history: any;
  location: any;
}

class Checkout extends Component<CheckoutProps> {
  checkoutCancelledHandler = () => {
    this.props.history.back();
  };

  checkoutContinuedHandler = () => {
    this.props.location.replace('/checkout/contact-data');
  };

  render() {
    let summary = <Redirect to='/' />;
    if (this.props.ings) {
      const purchasedRedirect = this.props.purchased ? (
        <Redirect to='/' />
      ) : null;
      summary = (
        <div>
          {purchasedRedirect}
          <CheckoutSummary
            ingredients={this.props.ings}
            checkoutCancelled={this.checkoutCancelledHandler}
            checkoutContinued={this.checkoutContinuedHandler}
          />
          <Route
            path={this.props.match.path + '/contact-data'}
            component={ContactData}
          />
        </div>
      );
    }
    return summary;
  }
}

const mapStateToProps = (state: {
  burgerBuilder: { [keys: string]: number };
  order: { purchased: boolean };
}) => {
  return {
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
  };
};

export default connect(mapStateToProps)(Checkout);
