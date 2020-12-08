import React, {useState} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {addPost} from "../../actions/post-actions";
import { Container,Form,Button } from "react-bootstrap";

const PostForm = ({addPost}) => {

    const [formData,setFormData] = useState({
        title:"",
        description:""
    });

    const {title,description} = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value});

    const onSubmit = async e => {
        e.preventDefault();
        addPost({title,description})
        setFormData({
            title:"",
            description:""
        })
    }

    return (<Container fluid >
        <Form onSubmit={e=> onSubmit(e)}>
            <Form.Group controlId="formGroupEmail">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="Enter Title for the post" name="title" value={title} onChange={e=> onChange(e)}  required />
            </Form.Group>
            <Form.Group controlId="formGroupPassword">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={3} type="text" placeholder="Enter the description" name="description" value={description} onChange={e=> onChange(e)} required />
            </Form.Group>
            <Button variant="primary" type="submit">Create Post</Button>
        </Form>
    </Container>)
}

PostForm.propTypes = {
    addPost : PropTypes.func.isRequired
}

export default connect(null,{addPost})(PostForm);