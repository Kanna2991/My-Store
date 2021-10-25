import React, {useEffect} from 'react';
import './App.css';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router';
import Home from './component/Home';
import { NavLink } from 'react-router-dom';
import Categories from './component/Categories';
import { connect } from 'react-redux';
import * as Actions from './store/actions';
import Product from './component/Product';
import Cart from './component/Cart';
import PlaceOrder from './component/PlaceOrder';
import Checkout from './component/Checkout';

function App(props) {
  console.log('props', props);
  useEffect(() => {
    console.log('props getAll call');
    props.getAll();
  }, []);
  useEffect(() => {
    console.log('props history', props.history, props.history.location.pathname);
  }, [props.history, props.history.location.pathname]);
  return (
    <Router>
      <div className="app-container">
        {props.data.pageTitle !== "Checkout" ? <div className="header">
            <h1>{props.data.pageTitle === "Product" || props.data.pageTitle === "Category" ? <Link to="/">{props.data.pageTitle || "Store"}</Link> : (props.data.pageTitle || "Store")}</h1>
            {(props.data.pageTitle === "Store" || props.data.pageTitle === "Product" || props.data.pageTitle === "Category") ? <nav>
                <NavLink to="/categories" onClick={() => props.history.push("/categories")} activeClassName="nav-active">Categories</NavLink>
                <NavLink to="/cart" onClick={() => props.history.push("/cart")} activeClassName="nav-active" className="cart-link">Cart{props.data.cart.length !== 0 ? <span>{props.data.cart.length}</span>:<></>}</NavLink>
            </nav> : <nav>
                <NavLink to="/" onClick={() => props.history.push("/")}>Return to Home</NavLink>
            </nav>}
        </div>: <></>}
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/categories" component={Categories}/>
          <Route path="/product/:id" component={Product}/>
          <Route path="/cart" component={Cart}/>
          <Route path="/order" component={PlaceOrder}/>
          <Route path="/checkout" component={Checkout}/>
        </Switch>
      </div>
    </Router>
  );
}
const mapStateToProps = state => {
  return({
    data: state.rootReducer
  })
}
const mapActionsToProps = (dispatch) => ({
  getAll: () => dispatch(Actions.getAllData())
});

export default withRouter(connect(mapStateToProps, mapActionsToProps)(App));
