import React, { Component } from 'react';
import axios from 'axios';
import Product from '../Product/Product';
import './Shop.css';

import IconButton from 'material-ui/IconButton';
import Search from 'material-ui/svg-icons/action/search';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';


class Shop extends Component {
    constructor() {
        super()
        this.state = {
            products: [],
            filteredProducts: [],
            searchShowing: false,
            searchInput: '',
            value: 1
        }
    }

    componentDidMount() {
        this.getProducts();
    }

    getProducts(){
        axios.get( '/shop' ).then( ( response ) => {
            this.setState({
                products: response.data,
                filteredProducts: response.data,
                value: 1
            })
        })

    }

    handleSearch(){
        let newProducts = this.state.products.filter(
            ( product ) => {
                if( this.state.value === 1 ){
                    return product.name.toLowerCase().indexOf( this.state.searchInput.toLowerCase() ) !== -1;
                } else if ( this.state.value === 2 ){
                    return product.username.toLowerCase().indexOf( this.state.searchInput.toLowerCase() ) !==-1;
                }
            }
        )
        this.setState({
            filteredProducts: newProducts
        })
    }

    updateSearchInput( e ){
        this.setState({
            searchInput: e.target.value
        })
    }

    handleChange = ( event, index, value ) => this.setState( { value } );

    render() {

        const product = this.state.filteredProducts.map( item => (
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
                    <DropDownMenu value={ this.state.value } onChange={ this.handleChange }>
                        <MenuItem value={1} primaryText="Name" />
                        <MenuItem value={2} primaryText="Artist" />
                    </DropDownMenu>
                    <input
                        type="text"
                        placeholder="Search"
                        value={ this.state.searchInput } 
                        onChange={ this.updateSearchInput.bind( this ) }
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