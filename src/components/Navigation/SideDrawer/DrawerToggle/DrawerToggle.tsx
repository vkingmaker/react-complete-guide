import React from 'react';

import classes from './DrawerToggle.module.css';

interface drawerToggleProps {
  clicked: () => void;
}
const drawerToggle = (props: drawerToggleProps) => (
  <div className={classes.DrawerToggle} onClick={props.clicked}>
    <div></div>
    <div></div>
    <div></div>
  </div>
);

export default drawerToggle;
