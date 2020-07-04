import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css';
const checkoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>We hope it tastes well!</h1>
            <div style={{width:'100%',height:'-100px', margin:'auto'}}>
                <Burger ingridients = {props.ingridients} />
            </div>
            <Button btnType='Danger'
            clicked={props.checkoutCancelled}> CANCEL</Button>
            <Button btnType='Success'
            clicked={props.checkoutContinue}> CONTINUE</Button>

        </div>

    );

}

export default checkoutSummary;