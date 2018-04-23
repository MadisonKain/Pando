// NAV BAR STUFF USING MATERIAL UI //

import React, { Component } from 'react';
import './Nav.css';
import { connect } from 'react-redux';
import { getUserInfo } from '../../ducks/reducer';
import { Link } from 'react-router-dom';

import { AppBar, Popover, MenuItem, Menu } from 'material-ui';
import Divider from 'material-ui/Divider';

import Home from 'material-ui/svg-icons/action/home';
import Store from 'material-ui/svg-icons/action/store';
import LocalGroceryStore from 'material-ui/svg-icons/maps/local-grocery-store';
import AccountCircle from 'material-ui/svg-icons/action/account-circle';
import Clear from 'material-ui/svg-icons/content/clear';
import Add from 'material-ui/svg-icons/content/add';


class Nav extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false
        }
    }

    componentDidMount() {
        this.props.getUserInfo()
    }
    
    handleClick = (event) => {
        event.preventDefault();
        this.setState({
            open: true,
            anchorEl: event.currentTarget,
        });
    };

    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    };

    render() {

        const userLoggedIn = !!this.props.user.username ?
            (
                <div>
                    <Link to='/cart'>
                        <MenuItem primaryText="CART" 
                        leftIcon={ <LocalGroceryStore /> }
                        />
                    </Link>
                    <Link to={`/profile/${this.props.user.id}`}>
                        <MenuItem primaryText='PROFILE'
                        leftIcon={ <AccountCircle /> } 
                        />
                    </Link>
                    <a href={ process.env.REACT_APP_LOGOUT }>
                        <MenuItem primaryText="LOGOUT" 
                        leftIcon={ <Clear /> }
                        />
                    </a>
                </div>
            )
            :
            (
                <a href={ process.env.REACT_APP_LOGIN }>
                    <MenuItem primaryText="LOGIN" 
                    leftIcon={ <Add /> }
                    />
                </a>
            );


        return (
            <div>
                <AppBar
                    title="WITTY ART TITLE"
                    className="nav"
                    onLeftIconButtonClick={this.handleClick}
                />
                <Popover
                    open={this.state.open}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                    targetOrigin={{ horizontal: 'left', vertical: 'top' }}
                    onRequestClose={this.handleRequestClose}
                >
                    <Menu>
                        <Link to='/'>
                            <MenuItem primaryText='HOME' 
                            leftIcon={ <Home /> }
                            />
                        </Link>
                        <Link to='/shop'>
                            <MenuItem primaryText="SHOP" 
                            leftIcon={ <Store /> }
                            />
                        </Link>
                        {/* <MenuItem primaryText="FAVORITES" /> */}
                        <Divider />
                        {userLoggedIn}
                    </Menu>
                </Popover>
            </div >
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, { getUserInfo })(Nav);