import React, { Component } from 'react';
import './Nav.css';

import { AppBar, Popover, MenuItem, Menu } from 'material-ui';

class Nav extends Component {
    constructor() {
        super()
        this.state = {
            open: false
        }
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
        return (
            <div>
                <AppBar
                    title="WITTY ART TITLE"
                    className="nav"
                    onClick={this.handleClick}
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
                        {/* <MenuItem primaryText="PROFILE" /> */}
                        {/* <MenuItem primaryText="FAVORITES" /> */}
                        <a href='http://localhost:3000/#/cart'>
                            <MenuItem primaryText="CART" />
                        </a>
                        <a href='http://localhost:3005/auth'>
                            <MenuItem primaryText="LOGIN" />
                        </a>
                    </Menu>
                </Popover>
            </div >
        )
    }
}

export default Nav