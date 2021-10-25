const initialState = {
    pageTitle: 'Store',
    allProducts: null,
    categoryList: null,
    cart: [],
    userEmail: ''
};

export default function reducer(state = initialState, {type, payload}){
    switch(type){
        case 'UPDATE_PAGE_TITLE': {
            return ({
                ...state,
                pageTitle: payload
            })
        }
        case 'ALL_PRODUCTS':{ 
            return {
                ...state,
                allProducts: payload.sort( ()=>Math.random()-0.5 )
            }
        }
        case 'PRODUCTS_CATEGORY': {
            const allCategory = payload.map(item => item.category);
            const categoryList = [...new Set([...allCategory])]
            return {
                ...state,
                categoryList
            }
        }
        case 'ADD_TO_CART': {
            let tempCart = JSON.parse(JSON.stringify(state.cart));
            let index = tempCart.findIndex(item => item.id === payload.id);
            if(index !== -1){ tempCart[index] = payload;}else {tempCart.push(payload)}
            return {
                ...state,
                cart: tempCart
            }
        }
        case 'REMOVE_FROM_CART':{
            let tempCart = JSON.parse(JSON.stringify(state.cart));
            let itemIndex = tempCart.findIndex(item => item.id === payload.id);
            tempCart.splice(itemIndex, 1);
            return {
                ...state,
                cart: tempCart
            }
        }
        case 'CHECKOUT_USER_EMAIL': {
            return {
                ...state,
                userEmail: payload,
            }
        }
        case 'CLEAR_CART': {
            return {
                ...state,
                userEmail: '',
                cart: []
            }
        }
        default:
            return state;
    }
}