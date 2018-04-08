import React, { Component } from 'react';
import './Product.css';
import { IconButton } from 'material-ui';
import AddShoppingCart from 'material-ui/svg-icons/action/add-shopping-cart';
import { deepOrange400 } from 'material-ui/styles/colors';
import { Link } from 'react-router-dom';

class Product extends Component {
    constructor( props ) {
        super( props )
        this.state = {
            
        }
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
                        <AddShoppingCart hoverColor={ deepOrange400 }/>
                    </IconButton>
                </div>

            </div>
        )
    }
}

export default Product