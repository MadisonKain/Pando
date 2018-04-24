import React, { Component } from 'react';
import axios from 'axios';
import './SelectedItem.css';
import { IconButton } from 'material-ui';
import AddShoppingCart from 'material-ui/svg-icons/action/add-shopping-cart';
import { amber500 } from 'material-ui/styles/colors';
import { Link } from "react-router-dom";


class SelectedItem extends Component {
    constructor( props ) {
        super( props )
        this.state = {
            product: []
        }
    }

    componentDidMount() {
        axios.get( `/product/${this.props.match.params.id}` )
            .then( item => {
                this.setState({
                    product: item.data
                })
            })
    }

    handleClick() {
        console.log( this.state.product )
        axios.post(`/cart/add/${this.state.product[0].id}`)
    }

    render() {
        const { product } = this.state
        return (
            <div className="container">
                { product[0] &&
                <div id="moreShopStuff" className="main-shop-container">
                    <div className="photo-container">
                        <img id="maximum-height" src={ product[0].picture }/>
                    </div>
                    <div className="container-number-2">
                        <h4 className="">{ product[0].name }</h4>
                        <div className="top-container">
                            <img className="img-circle" src={ product[0].profile_pic }/>
                            <div className="right-container-item">{`Artist: `}
                                <Link to={`/artist/${product[0].user_id}`}>
                                    <strong>
                                        @{ product[0].username }
                                    </strong>
                                </Link>
                            </div>
                        </div>
                        <div className="right-container-item">{ product[0].description }</div>
                        <div className="top-container" id="no-top-margin">
                            <div>${ product[0].price }</div>
                            <IconButton>
                                <AddShoppingCart hoverColor={ amber500 } onClick={ () => { this.handleClick() } } />
                            </IconButton>
                        </div>
                    </div>
                    </div>
                }
            </div>
        )
    }
}


export default SelectedItem