import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as Actions from '../store/actions';
import Quantity from './Quantity';


function Cart(props){
    useEffect(()=>{
        props.updateTitle("Cart");
    }, []);
    const updateCart = (type, product) => {
        let quantity = product.quantity;
        if(type === "+") quantity += 1;
        else quantity = (quantity - 1) || 1;
        product.quantity = quantity;
        props.updateCartItem(product);
    }
    const cartTotal = () => {
        let total = 0;
        props.cart.forEach(element => {
            total = total + parseInt(element.quantity) * parseInt(element.price);
        });
        return total;
    }
    if(props.cart?.length === 0) return <h2 className="cart text-center">Your Cart is Empty!</h2>
    return (
        <div className="cart">
                <div className="t-cart d-flex f-bold">
                    <div>Sl.no</div>
                    <div>Image</div>
                    <div>Title</div>
                    <div>Quantity</div>
                    <div>Price</div>
                    <div></div>
                </div>
                {props.cart?.map((item, i) => <div className="t-cart d-flex align-center" key={item.id}>
                    <div>{i + 1}</div>
                    <div><img src={item.image} width="75px" alt=""/></div>
                    <div>{item.name}</div>
                    <div className="d-flex justify-center"><Quantity value={item.quantity} quantityUpdate={updateCart} product={item}/></div>
                    <div>{parseInt(item.quantity) * parseInt(item.price)}</div>
                    <div onClick={()=>props.removeCartItem({id: item.id})}>Delete</div>
                </div>)}
                <div className="d-flex align-center t-cart-total">
                    <div>Total</div>
                    <div>{cartTotal()}</div>
                </div>
                <div className="place-order">
                    <button onClick={()=>props.history.push("/order")}>Place Order</button>
                </div>
        </div>
    );
}

const mapDispatchToProps = dispatch => {
    return ({
        updateTitle: title => dispatch(Actions.updateTitle(title)),
        removeCartItem: payload => dispatch(Actions.removeCartItem(payload)),
        updateCartItem: payload => dispatch(Actions.addToCart(payload))
    })
}

export default withRouter(connect(state => state.rootReducer, mapDispatchToProps)(Cart));