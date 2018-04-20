import React, { Component } from 'react';
import axios from 'axios';
import ArtistItems from '../ArtistItems/ArtistItems';


class ArtistProfile extends Component {
    constructor(){
        super()
        this.state = {
            artistInfo: []
        }
    }

    componentDidMount(){
        this.getArtistProducts();
    }

    getArtistProducts(){
        axios.get( `/artist/${this.props.match.params.id}` )
        .then( res => {
            // console.log( res.data )
            this.setState({
                artistInfo: res.data
            })
        })
    }

    render() {

        const item = this.state.artistInfo.map( item => {
            return <ArtistItems 
                key={ item.id } 
                products={ item }
            />
        })

        const { artistInfo } = this.state;
                
        return (
            <div>
                    { artistInfo[0]  &&
                        <div className="mainArtistProfileContainer">
                            <div className="topArtistProfileContainer">
                                <img 
                                    src={ artistInfo[0].profile_pic }
                                />
                                <div>
                                    <h1>
                                        { artistInfo[0].username }
                                    </h1>
                                    <div>
                                        { artistInfo[0].bio }
                                    </div>
                                </div>
                            </div>
                            { item }
                        </div>
                    }
            </div>
        )
    }
}

export default ArtistProfile