import React , { useEffect} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import { getPosts } from "../../actions/post-actions";
import { Container } from "react-bootstrap";
import PostItem from "./postItem";
import PostForm from "./postForm";

const Posts = ({getPosts, post: { posts, loading}}) => {

    useEffect(()=> {
        getPosts()
    }, [getPosts]);

    return (
        <Container fluid>
            <h2>Posts</h2>
            <PostForm />
            <br/>
                {posts.map(post=> (<PostItem key={post._id} post={post} />))}
        </Container>
    )
}

Posts.propTypes = {
    getPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    post : state.post
})

export default connect(mapStateToProps,{getPosts})(Posts);