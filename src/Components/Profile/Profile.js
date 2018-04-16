import React, { Component } from 'react';
import axios from "axios";

class Profile extends Component {
    constructor(){
        super()
        this.state = {
            userInfo: {}
        }
    }

    componentDidMount(){
        this.getUserInfo()
    }

    getUserInfo(){
        axios.get( '/profile/:id' )
        .then( response => {
            this.setState({
                userInfo: response.data[0]
            })
        })
    }
    
    render(){
        console.log( this.state.userInfo )
        const { username, bio, profile_pic } = this.state.userInfo
        return(
            <div>
                <div>
                    <img 
                        src={ profile_pic }
                    />
                    <div>
                        <h1>
                            { username }
                        </h1>
                    </div>
                </div>
            </div>
        )
    }
}

export default Profile;