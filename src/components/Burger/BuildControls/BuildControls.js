import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';
const controls =[
    {label:"Salad", type:"salad"},
    {label:"Meat", type:"meat"},
    {label:"Bacon", type:"bacon"},
    {label:"Cheese", type:"cheese"}
];
const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current Price : <strong>${props.price.toFixed(2)}</strong></p>
        {controls.map(ctrl => (
            <BuildControl key={ctrl.label} label={ctrl.label}
            added={() => props.ingridientAdded(ctrl.type)}
            removed = {() => props.ingridientRemoved(ctrl.type)}
            disabled = {props.disabled[ctrl.type]} />
        ))}
        <button 
            disabled={!props.purchasable} 
            className={classes.OrderButton}
            onClick={props.ordered}>
                { props.isAuth ? 'Checkout' : 'Sign up to proceed'}
                </button>
    </div>
)

export default buildControls; 