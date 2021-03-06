import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

//for loading screen
export const purchaseBurgerStart = () => {
    return {
        type:actionTypes.PURCHASE_BURGER_START
    }
}

//returns object to reducer
export const purchaseBurgerSuccess = (id,orderData) => {
    return {
        type:actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId:id,
        orderData:orderData
    }
} 


//function runs inside container
export const purchaseBurger = (orderData,token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json?auth='+token,orderData).then(res => {
            console.log(res.data);      
            dispatch(purchaseBurgerSuccess(res.data.name,orderData))         
        }).catch(err => {
            console.log(err);
        });

    }
}

export const purchaseInit = () => {
    return {
        type:actionTypes.PURCHASE_INIT
    };
};

//for loading screen
export const fetchOrderStart = () => {
    return {
        type:actionTypes.FETCH_ORDERS_START
    };
}

export const fetchOrdersSuccess = (orders) => {
    return {
        type:actionTypes.FETCH_ORDERS_SUCCESS,
        orders:orders
    };
};

export const fetchOrdersFail = (error) => {
    return {
        type:actionTypes.FETCH_ORDERS_FAIL,
        error:error
    }
}

export const fetchOrders = (token,userId) => {
    return dispatch => {
        dispatch(fetchOrderStart());
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get('/orders.json?' + queryParams )
        .then(res => {
            const fetchedOrders = [];
            for(let key in res.data){
                fetchedOrders.push({...res.data[key],
                id:key
                });
            };
            // console.log(fetchedOrders);
            dispatch(fetchOrdersSuccess(fetchedOrders));
        }).catch(err => {
            // console.log(err);
            dispatch(fetchOrdersFail(err));
         });
    }
}
