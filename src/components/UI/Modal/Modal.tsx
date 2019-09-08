import React, { Component } from 'react';

import classes from './Modal.module.css';
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop';

interface ModalProps {
  show: boolean;
  modalClosed: any;
}
class Modal extends Component<ModalProps> {
  myStyle: React.CSSProperties = {
    transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
    opacity: this.props.show ? 1 : 0
  };
  shouldComponentUpdate(nextProps: any, nextState: any) {
    return (
      nextProps.show !== this.props.show ||
      nextProps.children !== this.props.children
    );
  }

  render() {
    return (
      <Aux>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
        <div className={classes.Modal} style={this.myStyle}>
          {this.props.children}
        </div>
      </Aux>
    );
  }
}

export default Modal;
