import * as actionTypes from  './actionTypes';
import axios from '../../axios-orders';

export const addIngridients = (ingName) => {
    return {
        type:actionTypes.ADD_INGRIDIENT,
        ingridientName: ingName 
    }
}

export const removeIngridients = (ingName) => {
    return {
        type:actionTypes.REMOVE_INGRIDIENT,
        ingridientName: ingName 
    }
}

export const setIngridients = (ingridients) => {
    return {
        type:actionTypes.SET_INGRIDIENT,
        ingridients:ingridients
    }

}

export const initIngridients = () => {
    return dispatch => {
        axios.get('/ingridients.json').then(res => {
            // console.log(res.data);
           dispatch(setIngridients(res.data));
        }).catch(err => console.log(err));

    }
};