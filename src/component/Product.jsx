import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams, withRouter } from 'react-router';
import * as Actions from '../store/actions';
import Quantity from './Quantity';

function Product(props){
    const params = useParams();
    const [prodQuant, setQuant] = useState(1);
    const [product, setProduct] = useState(null);
    const [existInCart, setExistInCart] = useState(false);
    const updateQuant = (type) => {
        if(type === "+") setQuant(q => q + 1);
        else setQuant(q => q - 1 || 1);
    }
    useEffect(()=>{
        props.updateTitle("Product");
    }, []);
    useEffect(() => {
        const product = props?.allProducts?.find(item => parseInt(item.id) === parseInt(params.id))
        setProduct(product);
    }, [props.allProducts, params.id]);

    useEffect(() => {
        const cartItem = props?.cart?.find(item => parseInt(item.id) === parseInt(params.id))
        setQuant(cartItem?.quantity || 1);
        setExistInCart(cartItem)
    }, [props.cart, params.id]);
    console.log("props", props);
    return <div className="product d-flex">
        <div className="text-center"><img src={product?.image} width="250px" alt={product?.name}/></div>
        <div>
            <h3>{product?.name}</h3>
            <p>Lorem Ipsum, sometimes referred to as 'lipsum', is the placeholder text used in design when creating content. It helps designers plan out where the content will sit, without needing to wait for the content to be written and approved. It originally comes from a Latin text, but to today's reader, it's seen as gibberish.</p>
            <div className="d-flex space-between align-center">
                <div>Rs.{parseInt(product?.price * prodQuant)}</div>
                <Quantity value={prodQuant} quantityUpdate={updateQuant}/>
                <button className={`addCart ${existInCart?'added':''}`} onClick={()=>props.addToCart({...product, quantity: prodQuant})}>{existInCart ? (prodQuant !== existInCart?.quantity ? 'Update Cart':'Added in Cart') : 'Add to Cart'}</button>
            </div>
        </div>
    </div>
}

const mapDispatchToProps = dispatch => {
    return ({
        updateTitle: title => dispatch(Actions.updateTitle(title)),
        addToCart: (payload) => dispatch(Actions.addToCart(payload))
    })
}

export default withRouter(connect(state => state.rootReducer, mapDispatchToProps)(Product))