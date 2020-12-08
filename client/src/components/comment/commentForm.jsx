import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../actions/post-actions';
import {Container,Form,Button} from "react-bootstrap"

const CommentForm = ({ postId, addComment }) => {
  const [text, setText] = useState('');

  return (
    <Container fluid className="mb-3" >
        <Form onSubmit={e => {
            e.preventDefault();
            addComment(postId, { text });
            setText('');
        }}>
            <Form.Group controlId="formGroupEmail">
                <Form.Label>Comments</Form.Label>
                <Form.Control as="textarea" rows={3} type="text" placeholder="Enter the comment" name="description" value={text} onChange={e=> setText(e.target.value)} required />
            </Form.Group>
            <Button variant="primary" type="submit">Submit</Button>
        </Form>
    </Container>
  );
}
CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired
};

export default connect(
  null,
  { addComment }
)(CommentForm);