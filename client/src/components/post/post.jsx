import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getPost} from "../../actions/post-actions";
import {Link} from 'react-router-dom';
import React, { Fragment,useEffect } from "react";
import Spinner from "../layout/Spinner"
import PostItem from "./postItem";
import CommentForm from "../comment/commentForm";
import CommentItem from "../comment/commentItem";

const Post = ({ getPost, post: { post, loading }, match }) => {
    useEffect(() => {
      getPost(match.params.id);
    }, [getPost, match.params.id]);

    return loading || post === null ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to="/posts" className="btn">
            Back To Posts
          </Link>
          <PostItem post={post} showActions={false} />
          <CommentForm postId={post._id} />
          <div>
              {post.comments.map(comment => (<CommentItem key={comment._id} comment={comment} postId={post._id} />))}
          </div>
        </Fragment>
      );
}

Post.propTypes= {
    getPost : PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    post : state.post
})

export default connect(mapStateToProps, {getPost})(Post);