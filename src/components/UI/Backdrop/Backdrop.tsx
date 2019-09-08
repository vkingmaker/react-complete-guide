import React from 'react';

import classes from './Backdrop.module.css';

interface backdropProps {
  clicked: () => void;
  show: boolean;
}
const backdrop = (props: backdropProps) =>
  props.show ? (
    <div className={classes.Backdrop} onClick={props.clicked}></div>
  ) : null;

export default backdrop;
