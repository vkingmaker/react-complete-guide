import React from 'react';
import classes from './Cockpit.css';

const cockpit = props => {
  const assignedClasses = [];
  let btnClass = '';

  btnClass = classes.Red;
  if (props.persons.length <= 2) {
    assignedClasses.push(classes.red); // classes = ['red']
  }
  if (props.persons.length <= 1) {
    assignedClasses.push(classes.bold); // classes = ['red', 'bold']
  }
  return (
    <div className={classes.Cockpit}>
      <p className={assignedClasses.join('')}>This is really</p>
      <button className={btnClass} onClick={props.clciked}>
        Toggle Persons
      </button>
    </div>
  );
};

export default cockpit;
