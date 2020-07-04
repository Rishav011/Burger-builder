import React from 'react';
import classes from './BuildControl.css';

const buildControl = (props) =>(
    <div className={classes.BuildControl}>
        <div className={classes.Label}>{props.label}</div>
        <button onClick={props.added} className={classes.Less}>Add</button>
        <button onClick={props.removed} className={classes.More} disabled={props.disabled}>Remove</button>
    </div>
)
export default buildControl;