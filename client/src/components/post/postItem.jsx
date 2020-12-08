import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import {Card, Button, Container} from "react-bootstrap";
import { deletePost} from "../../actions/post-actions"

const PostItem = ({deletePost, auth, showActions, post: {_id,description,user,title,comments,date}}) => {
    return(
        <Container fluid className="mb-3">
            <Card border="dark" >
                <Card.Header>{title}</Card.Header>
                <Card.Body>
                    <blockquote className="blockquote mb-0">
                    <p>
                        {description}
                    </p>
                    {showActions && 
                    <Button className="mr-1" href={`/post/${_id}`} variant="primary">Feedback</Button>}
                    {!auth.loading && user === auth.user._id && (<Button onClick={e=> deletePost(_id)} variant="danger">Delete Post</Button>)}
                    <footer className="blockquote-footer mt-1">
                        Posted On <cite title="Source Title"><Moment format="DD/MM/YYYY">{date}</Moment></cite>
                    </footer>
                    </blockquote>
                </Card.Body>
            </Card>
        </Container>
    )
}

PostItem.defaultProps = {
    showActions: true
};

PostItem.propTypes = {
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    deletePost: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {deletePost})(PostItem);