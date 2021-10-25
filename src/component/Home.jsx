import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as Actions from '../store/actions';

function Home(props){
    useEffect(()=>{
        props.updateTitle("Store");
    }, []);
    return (
        <div className="home">
            {props?.allProducts?.map((item, i) => {
                return <div key={item.id} className="on-click home-product" style={{backgroundImage: `url(./src/img/${item.image})`}} onClick={()=>props.history.push(`/product/${item.id}`)}>
                    <div><img src={item.image} alt={item.name} width="150px"/></div>
                    <div>{item.name}</div>
                </div>
            })}
        </div>
    );
}

const mapDispatchToProps = dispatch => {
    return ({
        updateTitle: title => dispatch(Actions.updateTitle(title)),
    })
}
export default withRouter(connect((state)=>state.rootReducer, mapDispatchToProps)(Home));