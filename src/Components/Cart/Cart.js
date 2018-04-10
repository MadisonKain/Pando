import React, { Component } from 'react';
import axios from 'axios';
import CartItem from '../CartItem/CartItem';
import './Cart.css';


import { IconButton } from 'material-ui';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import { deepOrange400 } from 'material-ui/styles/colors';
import { orange50 } from 'material-ui/styles/colors';



class Cart extends Component {
    constructor() {
        super()
        this.state = {
            cartItems: []
        }
    }

    componentDidMount() {
        axios.get('/cart')
            .then(response => {
                this.setState({
                    cartItems: response.data
                })
            })
    }


    render() {
        const product = this.state.cartItems.map(item => {
            return <CartItem key={item.id}
                products={item} />
        })
        console.log(product)
        return (
            <div>
                <div className='pageTitle'>
                    <IconButton>
                        <ArrowBack hoverColor={orange50} />
                    </IconButton>
                    MY CART
                </div>
                <div>
                    {product}
                </div>
            </div>
        )
    }
}

export default Cart