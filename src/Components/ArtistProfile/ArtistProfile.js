import React, { Component } from 'react';
import axios from 'axios';

class ArtistProfile extends Component {
    constructor(){
        super()
        this.state = {
            artistInfo: {}
        }
    }

    componentDidMount(){
        axios.get( `/artist/${this.props.match.params.id}` )
        .then( res => {
            this.setState({
                artistInfo: res.data
            })
        })
    }

    render() {

        const { username } = this.state.artistInfo;

        return (
            <div>
                    { username  &&
                        <h1>
                            { username }
                        </h1>
                    }
            </div>
        )
    }
}

export default ArtistProfile