import React, { Component } from 'react';
import axios from 'axios';
import './SelectedItem.css';
import { IconButton } from 'material-ui';
import AddShoppingCart from 'material-ui/svg-icons/action/add-shopping-cart';
import { deepOrange400 } from 'material-ui/styles/colors';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import { orange50 } from 'material-ui/styles/colors';
import { Link } from "react-router-dom";


class SelectedItem extends Component {
    constructor( props ) {
        super( props )
        this.state = {
            product: []
        }
    }

    componentDidMount() {
        // console.log( this.props )
        axios.get( `/product/${this.props.match.params.id}` )
            .then( item => {
                this.setState({
                    product: item.data
                })
            })
    }

    render() {
        const { product } = this.state
        return (
            <div>
                { product[0] &&
                    <div className='mainContainer'>
                        <div className='pageTitle'>
                            { product[0].name }
                        </div>
                        <Link to={`/artist/${product[0].user_id}`}>
                            <h1>
                                { product[0].username }
                            </h1>
                        </Link>
                        <img className='productPhoto'
                            src={ product[0].picture } />
                        <div className='selectedInfoContainer'>
                            <div className='itemInfo'>
                                { product[0].description }
                            </div>
                            <div className='itemInfo'>
                                ${ product[0].price }
                                <div>
                                    <IconButton>
                                        <AddShoppingCart hoverColor={ deepOrange400 } />
                                    </IconButton>
                                </div>
                            </div>
                        </div>
                    </div> }
            </div>
        )
    }
}


export default SelectedItem