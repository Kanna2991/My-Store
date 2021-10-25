import {products} from './db';

export const updateTitle = title => dispatch => {
    dispatch({type: 'UPDATE_PAGE_TITLE', payload: title})
}

export const getAllData = () => (dispatch) => {
    dispatch({type: "LOADING", payload: true});
    try{
        setTimeout(() => {
            dispatch({type: "ALL_PRODUCTS", payload: JSON.parse(JSON.stringify(products.products))});
            dispatch({type: "PRODUCTS_CATEGORY", payload: JSON.parse(JSON.stringify(products.products))});
            dispatch({type: "LOADING", payload: false});
        }, 1000);
    }catch{
        dispatch({type: "FETCH_FAILED"})
        dispatch({type: "LOADING", payload: false});
    }
}

export const addToCart = payload => dispatch => {
    dispatch({type: "ADD_TO_CART", payload});
}

export const removeCartItem = payload => dispatch => {
    dispatch({type: "REMOVE_FROM_CART", payload});
}

export const setUserEmail = payload => dispatch => {
    dispatch({type: "CHECKOUT_USER_EMAIL", payload});
}

export const clearCart = () => dispatch => {
    dispatch({type: "CLEAR_CART"});
}