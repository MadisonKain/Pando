import React, { Component } from 'react';
import './CartItem.css';
import axios from 'axios';

import { IconButton } from 'material-ui';
import Delete from 'material-ui/svg-icons/action/delete';
import { deepOrange400 } from 'material-ui/styles/colors';


class CartItem extends Component {
    constructor( props ){
        super( props )
        this.state = {

        }
    }

    handleClick(){
        axios.delete( `/cart/delete/${this.props.products.id}` ).then( () => {
            this.props.updateCart()
        })
        window.location.reload();
    }

    render(){
        const { name, picture, price, quantity } = this.props.products;
        return(
            // <div className="mainBox">
            //     <h1 className='title'>
            //         { name }
            //     </h1>
            //     <div className="itemContainer">
            //         <img 
            //             className="itemPhoto"
            //             src={ picture }
            //         />
            //         <div className='stuff'>
            //             <div>
            //                 ${ price }
            //             </div>
            //             <div>
            //                 Qty: { quantity }
            //             </div>
            //             <IconButton>
            //                 <Delete hoverColor={ deepOrange400 } 
            //                         onClick={ ()=> this.handleClick() }/>
            //             </IconButton>
            //         </div>
            //     </div>
            // </div>
            <div className="mainCartItemContainer">
                <div className="leftCartContainer">
                    <img src={ picture } id="notTooBig"/>
                </div>
                <div className="rightCartContainer">
                    <strong className="totalContainer">
                        { `$${price}.00` }
                    </strong>
                    <div>
                        { `QTY: ${ quantity }` } 
                    </div>
                    <IconButton>
                        <Delete 
                            hoverColor={ deepOrange400 } 
                            onClick={ ()=> this.handleClick() }
                        />
                    </IconButton>
                </div>
            </div>
        )
    }
}

export default CartItem