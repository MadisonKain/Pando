import React, { Component } from 'react';
import axios from 'axios';
import './SelectedItem.css';
import { IconButton } from 'material-ui';
import AddShoppingCart from 'material-ui/svg-icons/action/add-shopping-cart';
import { deepOrange400 } from 'material-ui/styles/colors';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import { orange50, amber500 } from 'material-ui/styles/colors';
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

    render() {
        const { product } = this.state
        return (
            // <div>
            //     { product[0] &&
            //         <div className="">
            //             {/* <div className="product-title">
            //                 { product[0].name }
            //             </div> */}
            //             <Link to={`/artist/${product[0].user_id}`}>
            //                 <h1>
            //                     { product[0].username }
            //                 </h1>
            //             </Link>
            //             <img className=''
            //                 src={ product[0].picture } />
            //             <div className=''>
            //                 <div className=''>
            //                     { product[0].description }
            //                 </div>
            //                 <div className=''>
            //                     ${ product[0].price }
            //                     <div>
            //                         <IconButton>
            //                             <AddShoppingCart hoverColor={ amber500 } />
            //                         </IconButton>
            //                     </div>
            //                 </div>
            //             </div>
            //         </div> }
            // </div>
            <div className="container">
                { product[0] &&
                <div id="moreShopStuff" className="main-shop-container">
                    <div className="photo-container">
                        <img id="maximum-height" src={ product[0].picture }/>
                    </div>
                    <div className="container-number-2">
                        <div className="top-container">
                            <img className="img-circle" src={ product[0].profile_pic }/>
                            <div className="right-container-item">Created By: { product[0].username }</div>
                        </div>
                        <div className="right-container-item">{ product[0].description }</div>
                        <div>{  }</div>
                    </div>
                    </div>
                }
            </div>
        )
    }
}


export default SelectedItem