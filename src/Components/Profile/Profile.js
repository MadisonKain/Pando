import React, { Component } from 'react';
import axios from "axios";

// ========== MATERIAL-UI IMPORTS =========== //

import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { orange500 } from 'material-ui/styles/colors';



class Profile extends Component {
    constructor(){
        super()
        this.state = {
            userInfo: {},
            open: false,
            productName: "",
            productMedium: "",
            productDescription: "",
            productPrice: ""
        }
    }

    componentDidMount(){
        this.getUserInfo()
    }
    
    getUserInfo(){
        axios.get( '/profile/:id' )
        .then( response => {
            this.setState({
                userInfo: response.data[0],
            })
        })
    }

    handleOpen = () => {
        this.setState({
            open: true
        })
    }

    handleClose = () => {
        this.setState({
            open: false
        })
    }

    updateState( prop, val ){
        this.setState({
            [prop]: val
        })
        console.log( val )
    }
    
    render(){

        const actions = [
            <FlatButton
              label="Cancel"
              primary={true}
              onClick={this.handleClose}
            />,
            <FlatButton
              label="Submit"
              primary={true}
              onClick={this.handleClose}
            />,
          ];

        const styles = {
            underlineStyle: {
            borderColor: orange500
            }
        }

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
                    <RaisedButton 
                        label="Sell Something New" 
                        onClick={this.handleOpen} 
                    />
                    <Dialog
                        title="Tell us about your new piece!"
                        actions={actions}
                        modal={false}
                        open={this.state.open}
                        onRequestClose={this.handleClose}
                    >
                        <TextField 
                            hintText="Name of piece"
                            underlineStyle={styles.underlineStyle}
                            onChange={e => this.updateState('productName', e.target.value)}
                            fullWidth={true}
                        /><br />
                        <TextField 
                            hintText="Medium"
                            underlineStyle={styles.underlineStyle}
                            onChange={e => this.updateState('productMedium', e.target.value)}
                            fullWidth={true}
                        /><br />
                        <TextField 
                            hintText="Description/About your piece"
                            underlineStyle={styles.underlineStyle}
                            onChange={e => this.updateState('productDescription', e.target.value)}
                            fullWidth={true}
                        /><br />
                        <TextField 
                            hintText="Price"
                            underlineStyle={styles.underlineStyle}
                            onChange={e => this.updateState('productPrice', e.target.value)}
                            fullWidth={true}
                        /><br />
                    </Dialog>
                </div>
            </div>
        )
    }
}

export default Profile;