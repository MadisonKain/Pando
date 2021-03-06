import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

class Checkout extends Component {
    constructor( props ) {
        super( props )
        this.state = {
            
        }
    }

    onToken = ( token ) => {
        token.card = void 0;
        axios.post( '/api/payment', { token, amount: this.props.total } )
        .then( response => {
            window.location.reload();
        } )
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