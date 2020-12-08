import React, {useState} from "react";
import { Container, Form, Button} from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import {connect} from "react-redux"
import PropTypes from "prop-types"
import { login} from "../../actions/auth-action";

const Login = ({login,isAuthenticated}) => {

    const [formData , setFormData] = useState({
        email:'',
        password:""
    });

    const {email, password} = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value});

    const onSubmit = async e => {
        e.preventDefault();
        login(email,password);
    }

    if(isAuthenticated){
        return <Redirect to="/posts" />
    }

    return (
        <Container fluid>
            <h3> Sign In </h3>
            <Form onSubmit={e=> onSubmit(e)}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={e=> onChange(e)} name="email" required />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={e=> onChange(e)} name="password" required />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Login
                </Button>
            </Form>
            <p>
                Don't have an account? <Link to='/register'>Register</Link>
            </p>
        </Container>
    )
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps,{login})(Login);