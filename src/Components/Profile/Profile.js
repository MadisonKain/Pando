import React, { Component } from 'react';
import axios from "axios";
import './Profile.css';
import Product from '../Product/Product';

// ========== MATERIAL-UI IMPORTS =========== //

import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { orange500 } from 'material-ui/styles/colors';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

class Profile extends Component {
    constructor(){
        super()
        this.state = {
            userInfo: {},
            artistInfo: [],
            open: false,
            editOpen: false,
            productName: "",
            productMedium: "",
            productDescription: "",
            productPrice: "",
            productPhoto: "",
            file: '',
            filename: '',
            filetype: '',
            name: "",
            bio: ""
        }
        this.sendPhoto = this.sendPhoto.bind( this );
        this.handlePhoto = this.handlePhoto.bind( this );
        this.updateState = this.updateState.bind( this );
        this.handleEditOpen = this.handleEditOpen.bind( this );
        this.handleEditClose = this.handleEditClose.bind( this );
        this.editProfile = this.editProfile.bind( this );
    }

    componentDidMount(){
        this.getUserInfo()
        this.getArtistProducts()
    }
    
    getUserInfo(){
        axios.get( '/profile/:id' )
        .then( response => {
            this.setState({
                userInfo: response.data[0],
            })
        })
    }

    getArtistProducts(){
        axios.get( `/artist/${this.props.match.params.id}` )
        .then( res => {
            console.log( "getArtistProducts res.data === ", res.data )
            this.setState({
                artistInfo: res.data
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

    handleEditOpen = () => {
        this.setState({
            editOpen: true
        })
    }

    handleEditClose = () => {
        this.setState({
            editOpen: false
        })
    }

    updateState( prop, val ){
        this.setState({
            [prop]: val
        })
    }

    createProduct( newProduct ){
        axios.post( '/profile/newProduct', newProduct )
        .then( response => {
            this.setState({
                open: false
            })
        })
    }

    editProfile(){
        let body = {
            name: this.state.name,
            bio: this.state.bio,
            user_id: this.state.userInfo.id
        }

        axios.put( '/profile/edit', body )
        .then( res => {
            this.setState({
                editOpen: false
            })
        })
        window.location.reload();
    }

    handleSubmitAll(){

        const { 
            productName,
            productMedium, 
            productDescription, 
            productPrice, 
            userInfo, 
            productPhoto
        } = this.state;

        let newProduct = {
            name: productName,
            medium: productMedium,
            description: productDescription,
            price: productPrice,
            user_id: userInfo.id,
            picture: productPhoto
        }
        this.createProduct( newProduct )
    }

    handlePhoto(event){
        const reader = new FileReader()
        , file = event.target.files[0]
        , _this = this
        
        reader.onload = photo => {
            this.setState({
                file: photo.target.result,
                filename: file.name,
                filetype: file.type
            })
        }
        reader.readAsDataURL(file)
    }

    sendToback(photo){
        console.log(photo)
        return axios.post('/api/photoUpload', photo)
    }

    sendPhoto(event){
        event.preventDefault()

        let body = {
            file: this.state.file,
            filename: this.state.filename,
            filetype: this.state.filetype
        }
        this.sendToback( body ).then(response => {
            this.setState({
                productPhoto: response.data.Location
            })
        }).then( res => {
            this.handleSubmitAll()
        })
    }


    render(){

        const item = this.state.artistInfo.map( item => {
            return <Product 
                        key={ item.id }
                        products={ item }
                    />
        })

        const actions = [
            <FlatButton
              label="Cancel"
              primary={ true }
              onClick={ this.handleClose }
            />,
            <FlatButton
              label="Submit"
              primary={ true }
              onClick={ this.sendPhoto }
            />
          ];

        const editActions = [
            <FlatButton
              label="Cancel"
              primary={ true }
              onClick={ this.handleEditClose }
            />,
            <FlatButton
              label="Edit"
              primary={ true }
              onClick={ this.editProfile }
            />
          ];

        const styles = {
            underlineStyle: {
            borderColor: orange500
            }
        }

        const { username, bio, profile_pic } = this.state.userInfo

        return(
            <div className="container overflow-fix">
                <div id="moreShopStuff">
                    <div className="topContainer">
                        <img 
                            className="img-circle"
                            src={ profile_pic }
                        />
                        <div className="infoContainer">
                            <h1>
                                { username }
                            </h1> 
                            <div className="bioContainer">
                                { bio }
                            </div>
                        </div>
                        <div className="buttonContainer">
                            <div className="extra-margin">
                                <RaisedButton 
                                    label="SELL"
                                    onClick={ this.handleOpen } 
                                />
                            </div>
                            <div className="extra-margin">
                                <RaisedButton
                                    label="EDIT PROFILE"
                                    onClick={ this.handleEditOpen }
                                />
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="row" id="wider">
                            <div className="row d-flex justify-content-center" id="moreShopStuff">
                                { item }
                            </div>
                        </div>
                    </div>
                    <Dialog 
                        title="Edit Profile Information"
                        actions={ editActions }
                        modal={ false }
                        open={ this.state.editOpen }
                        onRequestClose={ this.handleEditClose }
                    >
                        <TextField 
                            hintText="Name"
                            underlineStyle={ styles.underlineStyle }
                            onChange={ e => this.updateState( 'name', e.target.value ) }
                            fullWidth={ true }
                        /><br />
                        <TextField 
                            hintText="Bio"
                            underlineStyle={ styles.underlineStyle }
                            onChange={ e => this.updateState( 'bio', e.target.value ) }
                            fullWidth={ true }
                        /><br />
                    </Dialog>
                    <Dialog
                        title="Tell us about your new piece!"
                        actions={ actions }
                        modal={ false }
                        open={ this.state.open }
                        onRequestClose={ this.handleClose }
                    >
                        <TextField 
                            hintText="Name of piece"
                            underlineStyle={ styles.underlineStyle }
                            onChange={ e => this.updateState( 'productName', e.target.value ) }
                            fullWidth={ true }
                        /><br />
                        <TextField 
                            hintText="Medium"
                            underlineStyle={ styles.underlineStyle }
                            onChange={ e => this.updateState( 'productMedium', e.target.value ) }
                            fullWidth={ true }
                        /><br />
                        <TextField 
                            hintText="Description/About your piece"
                            underlineStyle={ styles.underlineStyle }
                            onChange={ e => this.updateState( 'productDescription', e.target.value ) }
                            fullWidth={ true }
                            multiLine={ true }
                        /><br />
                        <TextField 
                            hintText="Price"
                            underlineStyle={ styles.underlineStyle }
                            onChange={ e => this.updateState( 'productPrice', e.target.value ) }
                            fullWidth={ true }
                        /><br />
                        <div>
                            <input type="file" onChange={this.handlePhoto}/>
                            <br />
                        </div>
                    </Dialog>
                </div>
            </div>
        )
    }
}

export default Profile;