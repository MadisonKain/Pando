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
        this.getProducts();
    }

    getProducts(){
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
    }


    render() {

        let filteredProducts = this.state.products.filter(
            ( product ) => {
                return product.name.toLowerCase().indexOf( this.state.searchInput.toLowerCase() ) !== -1;
            }
        )

        const product = filteredProducts.map( item => (
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
                        type="text"
                        placeholder="Search"
                        value={ this.state.searchInput } 
                        onChange={ this.updateSearchInput.bind( this ) }
                    />
                    <IconButton>
                        <Search onClick={ () => { this.handleSearch.bind() } }/>
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