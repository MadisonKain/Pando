import React, { Component } from 'react';
import axios from 'axios';
import CartItem from '../CartItem/CartItem';
import './Cart.css';
import Checkout from '../Checkout/Checkout';
import { connect } from 'react-redux';
import { getUserInfo } from '../../ducks/reducer';
import { Link } from 'react-router-dom';


import { IconButton } from 'material-ui';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import { deepOrange400 } from 'material-ui/styles/colors';
import { orange50 } from 'material-ui/styles/colors';


class Cart extends Component {
    constructor( props ) {
        super( props )
        this.state = {
            cartItems: [],
            total: 0
        }
        this.updateCart = this.updateCart.bind( this );
    }

    componentDidMount() {
        this.updateCart();
        this.getOrderTotal();
    }
    
    updateCart(){
        axios.get( '/cart' ).then( response => {
                this.setState({
                    cartItems: response.data
                })
            })
    }

    getOrderTotal(){
        axios.get( '/cart/total' ).then( response => {
            // console.log( response.data )
                this.setState({
                    total: response.data.total
                })
            })
    }

    render() {

        console.log( this.state.total )

        const product = this.state.cartItems.map( item => {
            return <CartItem key={ item.id }
                products={ item } 
                updateCart={ this.updateCart }/>
        })
        
        const cartData = (this.state.total === 0) 
        ?
            <div id="moreShopStuff" className="buySomething">
                You have nothing in your cart. {<br/>}
                Check out our artists, and buy some art!{<br/>}
            </div>
        :
            <div id="moreShopStuff" className="pleaseWork">
                <div className="cartItemContainer">
                    { product }
                </div>
                <div className="checkoutContainer">
                    <strong className="dude">
                        { `TOTAL: $${this.state.total}.00` }
                    </strong>
                    <Checkout 
                        total={ this.state.total * 100 }
                    />
                </div>
            </div>

        return (
            <div className="container">
                <div className="searchBar">
                    My Cart
                </div>
                { cartData }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, { getUserInfo })( Cart )