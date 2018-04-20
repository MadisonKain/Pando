import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

class Checkout extends Component {
    constructor() {
        super()
        this.state = {

        }
    }

    onToken = ( token ) => {
        token.card = void 0;
        axios.post( '/api/payment', { token, amount: this.props.total }  )
        .then( response => {} )
    }

    render() {
        return (
            <div>
                <StripeCheckout
                    token={ this.onToken }
                    stripeKey={ process.env.REACT_APP_STRIPE_KEY }
                    amount={ this.props.amount }
                />
            </div>
        )
    }
}

export default Checkout