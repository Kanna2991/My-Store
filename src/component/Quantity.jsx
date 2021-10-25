import React from 'react';

export default function Quantity(props){
    return <div className="quantity">
        <div className="on-click" onClick={()=>props.quantityUpdate('-', props.product)}>-</div>
        <div>{props.value}</div>
        <div className="on-click" onClick={()=>props.quantityUpdate('+', props.product)}>+</div>
    </div>
}