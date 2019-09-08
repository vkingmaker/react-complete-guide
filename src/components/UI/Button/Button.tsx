import React from 'react';

import classes from './Button.module.css';

interface buttonProps {
  disabled?: boolean;
  clicked?: () => void;
  children: any;
  btnType: any;
}
const button = (props: buttonProps) => (
  <button
    disabled={props.disabled}
    className={[classes.Button, classes[props.btnType]].join(' ')}
    onClick={props.clicked}
  >
    {props.children}
  </button>
);

export default button;
