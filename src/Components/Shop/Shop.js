import React, { Component } from 'react';
import axios from 'axios';
import Product from '../Product/Product';

class Shop extends Component {
    constructor() {
        super()
        this.state = {
            products: []
        }
    }

    componentDidMount() {
        axios.get('/shop').then((response) => {
            this.setState({
                products: response.data
            })
        })

    }


    render() {
        const product = this.state.products.map( item => (
            <Product key={ item.id }
                products={ item }
            />
        ))
        return (
            <div>
                { product }
            </div>
        )
    }
}

export default Shop