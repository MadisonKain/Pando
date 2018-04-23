import React, { Component } from 'react';
import './Product.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { IconButton } from 'material-ui';
import AddShoppingCart from 'material-ui/svg-icons/action/add-shopping-cart';
import { deepOrange400 } from 'material-ui/styles/colors';


class Product extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    handleClick() {
        axios.post(`/cart/add/${this.props.products.id}`)
    }


    render() {
        const { name, price, picture, id, username } = this.props.products;
        return (
                <div className="card mr-5 mb-5 mt-5" id="maximum-width">
                    <img className="card-img-top" src={ picture } alt="FOR SALE ITEM"/>
                    <div className="card-body">
                        <h5 className="card-title">{ name }</h5>
                    </div>
                    <div className="card-footer">
                        <Link to={ `/product/${id}` } className="btn">
                            <div style={{ color: "#19B29C" }}>
                                Buy
                            </div>
                        </Link>
                    </div>
                </div> 
            )
        }
    }
                
export default Product