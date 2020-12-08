import React, { Fragment } from "react";
import {Nav, Navbar} from "react-bootstrap";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {logout} from "../../actions/auth-action"

const NavBar = ({ auth: { isAuthenticated,loading},logout}) => {

    const authLinks = (
        <Nav className="justify-content-end">
            <Nav.Link onClick={logout} href="/posts">Posts</Nav.Link>
            <Nav.Link onClick={logout} href="#!">Logout</Nav.Link>
        </Nav>
    )
    const newUserLinks = (
        <Nav className="justify-content-end">
            <Nav.Link href="/register">Register</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
        </Nav>
    )

    return <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="/">CMS</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
    {!loading ? (<Fragment>{isAuthenticated ? authLinks : newUserLinks}</Fragment>) : null}
        </Navbar.Collapse>
    </Navbar>
}

NavBar.propTypes ={
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps,{logout})(NavBar);