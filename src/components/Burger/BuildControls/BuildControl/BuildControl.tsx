import React from 'react';

import styles from './BuildControl.module.css';

interface BurgerProps {
  removed: any;
  disabled: boolean;
  added: any;
  label: string;
}

const buildControl = (props: BurgerProps): JSX.Element => (
  <div className={styles.BuildControl}>
    <div className={styles.Label}>{props.label}</div>
    <button
      className={styles.Less}
      onClick={props.removed}
      disabled={props.disabled}
    >
      Less
    </button>
    <button className={styles.More} onClick={props.added}>
      More
    </button>
  </div>
);

export default buildControl;
