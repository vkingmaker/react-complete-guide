import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions/index';
import { Dispatch } from 'redux';

interface LogoutProps {
  onLogout(): any;
}

class Logout extends Component<LogoutProps> {
  componentDidMount() {
    this.props.onLogout();
  }

  render() {
    return <Redirect to='/' />;
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onLogout: () => dispatch(actions.logout())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Logout);
