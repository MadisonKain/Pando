import React, { Component } from 'react';
import axios from 'axios';
import ArtistItems from '../ArtistItems/ArtistItems';
import Product from '../Product/Product';



class ArtistProfile extends Component {
    constructor() {
        super()
        this.state = {
            artistInfo: []
        }
    }

    componentDidMount() {
        this.getArtistProducts();
    }

    getArtistProducts() {
        axios.get(`/artist/${this.props.match.params.id}`)
            .then(res => {
                // console.log( res.data )
                this.setState({
                    artistInfo: res.data
                })
            })
    }

    render() {

        const item = this.state.artistInfo.map(item => {
            return <Product
                key={item.id}
                products={item}
            />
        })

        const { artistInfo } = this.state;

        return (
            <div className="container">
                {artistInfo[0] &&
                    <div id="moreShopStuff">
                        <div className="topContainer">
                            <img
                                className="img-circle"
                                src={artistInfo[0].profile_pic}
                            />
                            <div className="infoContainer">
                                <h1>
                                    {artistInfo[0].username}
                                </h1>
                                <div className="bioContainer">
                                    {artistInfo[0].bio}
                                </div>
                            </div>
                        </div>
                        <div className="container">
                            <div id="wider">
                                <div className="row d-flex justify-content-center" id="moreShopStuff">
                                    {item}
                                </div>
                            </div>
                        </div>
                    </div>
                            }
                </div>
                        )
                    }
                }
                
export default ArtistProfile