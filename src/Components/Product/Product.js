import React, { Component } from 'react';
import './Product.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { IconButton } from 'material-ui';
import AddShoppingCart from 'material-ui/svg-icons/action/add-shopping-cart';
import { deepOrange400 } from 'material-ui/styles/colors';


class Product extends Component {
    constructor( props ) {
        super( props )
        this.state = {
            
        }
    }

    handleClick(){
        axios.post( `/cart/add/${this.props.products.id}` )
    }
    

    render() {
        const { name, price, picture, id } = this.props.products;
        return (
            <div className='productContainer'>
                <div className="product">
                    { name }
                </div>
                <Link to={`/product/${id}`}>
                    <img className="productPhoto" 
                         src={ picture }
                    />
                </Link>
                <div className="product">
                    <div>
                        ${ price }
                    </div>
                    <IconButton>
                        <AddShoppingCart hoverColor={ deepOrange400 }
                                         onClick={ e => { this.handleClick() } }
                        />
                    </IconButton>
                </div>

            </div>
        )
    }
}

export default Product