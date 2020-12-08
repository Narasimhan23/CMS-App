import React, {useState} from "react";
import { Container, Form, Button} from "react-bootstrap";
import {Link, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import { setAlert} from "../../actions/alert-action"
import { register} from "../../actions/auth-action"
import PropTypes from 'prop-types';

const Register = ({ setAlert,register,isAuthenticated}) => {
    const [formData , setFormData] = useState({
        name: "",
        email:'',
        password:"",
        repassword:""
    });

    const {name, email, password, repassword} = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value});
    const onSubmit = async e => {
        e.preventDefault();
        if(password !== repassword){
            setAlert("Passwords do not match","danger")
        }else{
            register({name,email,password})
        }
    }

    if(isAuthenticated){
        return <Redirect to="/posts" />
    }

    return (
        <Container fluid>
            <h3> Sign Up </h3>
            <Form onSubmit={e => onSubmit(e)}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Username" value={name} onChange={e=> onChange(e)} name="name" required/>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={e=> onChange(e)} name="email" required/>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={e=> onChange(e)} name="password" required />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Re-enter Password</Form.Label>
                    <Form.Control type="password" placeholder="Re-enter Password" value={repassword} onChange={e=> onChange(e)} name="repassword" required/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Register
                </Button>
            </Form>
            <p>
                Already a user? <Link to='/login'>Login</Link>
            </p>
        </Container>
    )
}

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {setAlert,register})(Register);