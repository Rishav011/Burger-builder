import * as actionTypes from '../actions/actionTypes';
const initialState = {
    ingridients: null,
        totalPrice: 4,
        building:false
    }
    const INGRIDIENT_PRICES  = {
        salad: 0.5,
        cheese: 0.4,
        meat: 1.3,
        bacon: 0.7
    }

const reducer = (state=initialState,action) => {
    switch(action.type){ 
        case actionTypes.ADD_INGRIDIENT:
            return {
            ...state,
            ingridients: {
                ...state.ingridients,
                [action.ingridientName]: state.ingridients[action.ingridientName]+1
            },
            totalPrice:state.totalPrice + INGRIDIENT_PRICES[action.ingridientName],
            building:true

        };
        case actionTypes.REMOVE_INGRIDIENT:
            return {
            ...state,
            ingridients: {
                ...state.ingridients,
                [action.ingridientName]: state.ingridients[action.ingridientName]-1
            },
            totalPrice:state.totalPrice - INGRIDIENT_PRICES[action.ingridientName],
            building:true
        };
        case actionTypes.SET_INGRIDIENT:
            return {
                ...state,
                ingridients: action.ingridients,
                totalPrice:4 ,
                building:false
            }
        default:
            return state;
    }
}

export default reducer;