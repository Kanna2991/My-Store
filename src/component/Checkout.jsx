import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as Actions from '../store/actions';
import FinalOrderList from './FinalOrderList';

function Checkout(props){
    useEffect(()=>{
        props.updateTitle("Checkout");
    }, []);
    const backtoHome = () =>{
        props.history.push("/"); 
        props.updateTitle("Store");
        props.clearCart();
    }
    return (
        <div className="checkout">
            <h1 className="text-center">Thanks for ordering with us.Check your orders below.</h1>
            <p className="text-center">We sent you order details along with invoice number to your email {props.userEmail}</p>
            <FinalOrderList/>
            <div className="text-center">
                <p>Your Invoice No: {new Date().getTime().toString() + Math.floor(Math.random()*1000000)}</p>
                <button onClick={()=>backtoHome()}>Back to Home</button>
            </div>
        </div>
    );
}

const mapDispatchToProps = dispatch => {
    return ({
        updateTitle: title => dispatch(Actions.updateTitle(title)),
        clearCart: () => dispatch(Actions.clearCart()),
    })
}
export default withRouter(connect((state)=>state.rootReducer, mapDispatchToProps)(Checkout));