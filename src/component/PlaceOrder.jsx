import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as Actions from '../store/actions';
import FinalOrderList from './FinalOrderList';

function PlaceOrder(props){
    useEffect(()=>{
        props.updateTitle("Order");
    }, []);
    const [email, setEmail] = useState('');
    
    const gotoCheckout = (e) => {
        if(email) {
            props.setUserEmail(email);
            props.history.push("/checkout");
        }
    }
    return <div className="order d-flex">
        <div className="text-center">
            <h2>Kindly review your orders in the list</h2>
            <input type="email" placeholder="*Enter your email" onInput={e=>setEmail(e.target.value)}/>
            <button className="checkout" onClick={()=>gotoCheckout()}>Checkout</button>
        </div>
        <div>
            <FinalOrderList />
            <div className="text-center">
                <button className="checkout" onClick={()=>gotoCheckout()}>Checkout</button>
            </div>
        </div>
        
    </div>
}

const mapDispatchToProps = dispatch => {
    return ({
        updateTitle: title => dispatch(Actions.updateTitle(title)),
        setUserEmail: email => dispatch(Actions.setUserEmail(email))
    })
}

export default withRouter(connect(state => state.rootReducer, mapDispatchToProps)(PlaceOrder));