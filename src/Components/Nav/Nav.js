import React, { Component } from 'react';
import './Nav.css';
import { connect } from 'react-redux';
import { getUserInfo } from '../../ducks/reducer';
import { Link } from 'react-router-dom';

import { AppBar, Popover, MenuItem, Menu } from 'material-ui';


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

        const userLoggedIn = !!this.props.user.name ?
            (
                <div>
                    <a href='http://localhost:3000/#/cart'>
                        <MenuItem primaryText="CART" />
                    </a>
                    <Link to={`/profile/${this.props.user.id}`}>
                        <MenuItem primaryText='PROFILE' />
                    </Link>
                    <a href='http://localhost:3005/auth/logout'>
                        <MenuItem primaryText="LOGOUT" />
                    </a>
                </div>
            )
            :
            (
                <a href='http://localhost:3005/auth'>
                    <MenuItem primaryText="LOGIN" />
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
                        <a href='http://localhost:3000/#/'>
                            <MenuItem primaryText='HOME' />
                        </a>
                        <a href='http://localhost:3000/#/shop'>
                            <MenuItem primaryText="SHOP" />
                        </a>
                        {/* <MenuItem primaryText="FAVORITES" /> */}
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