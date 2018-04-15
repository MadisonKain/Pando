import React, { Component } from 'react';
import axios from 'axios';
import Product from '../Product/Product';
import './Shop.css';

import IconButton from 'material-ui/IconButton';
import Search from 'material-ui/svg-icons/action/search';

class Shop extends Component {
    constructor() {
        super()
        this.state = {
            products: [],
            searchShowing: false,
            searchInput: ''
        }
    }

    componentDidMount() {
        axios.get( '/shop' ).then( ( response ) => {
            this.setState({
                products: response.data
            })
        })
    }


    handleSearch(){
        console.log( 'hit' )
    }


    updateSearchInput( e ){
        this.setState({
            searchInput: e.target.value
        })
        console.log( this.state.searchInput )
    }


    render() {

        const product = this.state.products.map( item => (
            <Product key={ item.id }
                products={ item }
            />
        ))

        return (
            <div>
                <div className='shopTitle'>
                    SHOP
                </div>
                <div className='searchBar'>
                    <input 
                        placeholder='Search' 
                        onChange={ (e)=>{ this.updateSearchInput( e ) } }
                    />
                    <IconButton>
                        <Search onClick={ () => { this.handleSearch() } }/>
                    </IconButton>
                </div>
                <div className="shopContainer">
                    { product }
                </div>
            </div>
        )
    }
}

export default Shop