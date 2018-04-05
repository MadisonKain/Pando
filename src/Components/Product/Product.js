import React, { Component } from 'react';
import './Product.css';


class Product extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }


    render() {
        const { name, price, picture } = this.props.products;
        return (
            <div className='productContainer'>
                <div className="product">
                    {name}
                </div>
                <img className="productPhoto" 
                     src={picture}
                />
                <div className="product">
                    {price}
                </div>

            </div>
        )
    }
}

export default Product