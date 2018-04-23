import React, { Component } from 'react';
import './Nav.css';
import { connect } from 'react-redux';
import { getUserInfo } from '../../ducks/reducer';
import { Link } from 'react-router-dom';


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

    render() {

        const userLoggedIn = this.props.user.username ?
            (
                <nav className="navbar navbar-expand-lg navbar-light" id="navigation-bar">
                    <Link className="navbar-brand" to="/" style={{ color: "white" }}>
                        P A N D O
                    </Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <Link className="nav-item nav-link" to="/" style={{ color: "white" }}>| H O M E |<span className="sr-only">(current)</span></Link>
                            <Link className="nav-item nav-link" to="/shop" style={{ color: "white" }}>| S H O P |</Link>
                            <Link to={`/profile/${this.props.user.id}`} className="nav-item nav-link" style={{ color: "white" }}>| P R O F I L E |</Link>
                            <Link to="/cart" className="nav-item nav-link" style={{ color: "white" }}>| C A R T |</Link>
                            <a href={process.env.REACT_APP_LOGOUT} className="nav-item nav-link" style={{ color: "white" }}>| L O G O U T |</a>
                        </div>
                    </div>
                </nav>
            )
            :
            (
                <nav className="navbar navbar-expand-lg navbar-light" id="navigation-bar">
                    <Link className="navbar-brand" to="/" style={{ color: "white" }}>
                        P A N D O
                    </Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <Link className="nav-item nav-link" to="/" style={{ color: "white" }}>| H O M E |<span className="sr-only">(current)</span></Link>
                            <Link className="nav-item nav-link" to="/shop" style={{ color: "white" }}>| S H O P |</Link>
                            <a href={process.env.REACT_APP_LOGIN} className="nav-item nav-link" style={{ color: "white" }}>| L O G I N |</a>
                        </div>
                    </div>
                </nav>
            )

        return (
            <div className="akbar-position">
                { userLoggedIn }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, { getUserInfo })(Nav);