import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Container,Card,Button} from "react-bootstrap";
import Moment from "react-moment";
import { deleteComment } from "../../actions/post-actions";

const CommentItem = ({postId,deleteComment, comment: {_id,user,text,date} , auth}) => {
    return (<Container fluid className="mb-3">
    <Card border="primary" >
        <Card.Header>{user}</Card.Header>
        <Card.Body>
            <blockquote className="blockquote mb-0">
            <p>
                {text}
            </p>
            {!auth.loading && user === auth.user._id && (<Button onClick={e=> deleteComment(postId,_id)} variant="danger">Delete Comment</Button>)}
            <footer className="blockquote-footer mt-1">
                Commented On <cite title="Source Title"><Moment format="DD/MM/YYYY">{date}</Moment></cite>
            </footer>
            </blockquote>
        </Card.Body>
    </Card>
</Container>)
}

CommentItem.propTypes = {
    postId : PropTypes.number.isRequired,
    comment: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps,{deleteComment})(CommentItem);