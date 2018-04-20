import React, { Component } from 'react';
import axios from 'axios';
import CartItem from '../CartItem/CartItem';
import './Cart.css';
import Checkout from '../Checkout/Checkout';


import { IconButton } from 'material-ui';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import { deepOrange400 } from 'material-ui/styles/colors';
import { orange50 } from 'material-ui/styles/colors';


class Cart extends Component {
    constructor() {
        super()
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

        const product = this.state.cartItems.map( item => {
            return <CartItem key={ item.id }
                products={ item } 
                updateCart={ this.updateCart }/>
        })

        return (
            <div>
                <div className='pageTitle'>
                    MY CART
                </div>
                <div>
                    <h1>
                        TOTAL: { this.state.total }
                    </h1>
                    { product }
                    <Checkout 
                        total={ this.state.total * 100 }
                    />
                </div>
            </div>
        )
    }
}

export default ( Cart )