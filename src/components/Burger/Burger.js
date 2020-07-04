import React from 'react';
import classes from './Burger.css'
import BurgerIngridient from './BurgerIngridient/BurgerIngridient';
const burger = (props) => {
    let transformedIngridients = Object.keys(props.ingridients)
    .map(igKey =>{
        // console.log("igKey:"+igKey); 
        // console.log("PI:"+props.ingridients[igKey]);
        // console.log([...Array(props.ingridients[igKey])]);
        return [...Array(props.ingridients[igKey])].map((_,i) =>{
            
           return <BurgerIngridient key={igKey + i} type = {igKey} />
        })
    }).reduce((arr,el) =>{
        return arr.concat(el);
    },[]);
    if(transformedIngridients.length===0){
        transformedIngridients = <p><strong>Please start adding ingridients</strong></p>
    }
    // console.log(transformedIngridients);
    return (
        <div className={classes.Burger}>
            <BurgerIngridient type="bread-top" />
            {transformedIngridients}
            <BurgerIngridient type="bread-bottom" />
        </div>
    );
}

export default burger;