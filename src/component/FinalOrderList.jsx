import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as Actions from '../store/actions';

function FinalOrderList(props){
    const cartTotal = () => {
        let total = 0;
        props.cart.forEach(element => {
            total = total + parseInt(element.quantity) * parseInt(element.price);
        });
        return total;
    }
    return (
        <div className="order-list">
            <div className="d-flex align-center text-center">
                <div><h3>Product</h3></div>
                <div><h3>Price</h3></div>
            </div>
            {props.cart?.map(item => <div key={item.id} className="d-flex align-center">
                <div className="d-flex align-center space-around">
                    <div><img src={item.image} width="50px" alt=""/></div>
                    <div>
                        <h4>{item.name}</h4>
                        <p>Category: {item.category}</p>
                        <p>Quantity: {item.quantity}</p>
                    </div>
                </div>
                <div className="text-center">{parseInt(item.quantity) * parseInt(item.price)}</div>
            </div>)}
            <div className="d-flex align-center text-center total">
                <div>Total</div>
                <div>{cartTotal()}</div>
            </div>
            {cartTotal() >= 50 ? <div className="d-flex align-center text-center total discount">
                <div>Discount (10%)</div>
                <div>{cartTotal()/10}</div>
            </div> : <></>}
            {cartTotal() >= 50 ? <div className="d-flex align-center text-center total">
                <div>Total Summary</div>
                <div>{cartTotal() - (cartTotal()/10)}</div>
            </div> : <></>}
        </div>
    );
}

export default withRouter(connect((state)=>state.rootReducer)(FinalOrderList));