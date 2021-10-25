import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as Actions from '../store/actions';

function Categories(props){
    const [categorizedProducts, setCatProducts] = useState(null);
    const getCategoryProducts = () => {
        const products = {};
        props?.categoryList?.forEach(item => {
            let filteredProduct = props.allProducts.filter(product => product.category === item);
            products[item] = filteredProduct;
        })
        setCatProducts(products);
    };
    useEffect(()=>{
        getCategoryProducts();
        props.updateTitle("Category");
    }, []);
    useEffect(()=>{
        getCategoryProducts();
    }, [props.categoryList, props.allProducts]);
    return (
        <div className="category-list">
            {props.categoryList?.map(category => <div key={category} className="category">
            <h3>{category}</h3>
            <div className="home">
                {categorizedProducts && categorizedProducts[category]?.map((item) => {
                    return <div key={item.id} className="on-click home-product" onClick={()=>props.history.push(`/product/${item.id}`)}>
                        <div><img src={item.image} alt={item.name} width="150px"/></div>
                        <div>{item.name}</div>
                    </div>
                })}
            </div>
            </div>)}
        </div>
    );
}

const mapDispatchToProps = dispatch => {
    return ({
        updateTitle: title => dispatch(Actions.updateTitle(title)),
    })
}
export default withRouter(connect((state)=>state.rootReducer, mapDispatchToProps)(Categories));