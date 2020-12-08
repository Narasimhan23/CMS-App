const express = require("express");
const router = express.Router();
const { body, validationResult} = require("express-validator");
const auth = require("../../middleware/auth");

const Post = require('../../model/post_model');
const User = require("../../model/user_model");


//Post routes handled 

router.post('/',[auth, [ 
    body("title","Title is required").notEmpty(),
    body("description", "Desciption is required").notEmpty()
]],async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    try {
        const user = await User.findById(req.user.id).select("-password");
        const newPost = new Post({
            title: req.body.title,
            description: req.body.description,
            user: req.user.id
        });

        const post = await newPost.save();
        res.status(200).json({post});

    } catch (err) {
        console.log(err);
        res.status(500).send("Server error");
    }
})

router.get("/",auth, async (req,res) =>{
    try {
        const posts = await Post.find().sort({ date: -1});
        res.status(200).send(posts);
    } catch (err) {
        console.log(err)
        res.status(400).json({msg: "Server error"});
    }
})

router.get("/:id", auth, async (req,res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(!post){
            return res.status(404).json({msg: "Post not found"})
        }
        res.status(200).json(post)
    } catch (err) {
        console.log(err);
        if(err.kind==="ObjectId"){
            return res.status(404).json({msg: "Post not found"});
        }
        res.status(500).send('Server error');
    }
})

router.delete("/:id", auth, async (req,res)=>{
    try {
        const post = await Post.findById(req.params.id);

        if(post.user.toString() !== req.user.id){
            return res.status(401).send("User not authorized");
        }
        await post.remove();

        res.status(200).json({msg: "Post deleted"});

    } catch (err) {
        console.log(err);
        if(err.kind==="ObjectId"){
            return res.status(404).json({msg: "Post not found"});
        }
        res.status(500).send('Server error');
    }
});


//Comment routes handled 

router.post("/:p_id/comments", [auth,[
    body("text", "Text box cannot be empty").notEmpty()
]], async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    try {
        const user = await User.findById(req.user.id).select("-password");
        const post = await Post.findById(req.params.p_id);

        const newComment = {
            text: req.body.text,
            user: req.user.id
        }

        post.comments.unshift(newComment);

        await post.save();

        res.status(200).json(post.comments);

    } catch (err) {
        console.log(err);
        res.status(500).send('Server error');
    }
})

router.delete("/:p_id/comments/:c_id",auth, async (req,res) => {
    try {
        const post = await Post.findById(req.params.p_id);
        const comment = post.comments.find(
            comment => comment.id === req.params.c_id
        );
        if(!comment){
            return res.status(404).json({msg: "Comment not found"})
        }
        if(comment.user.toString() !== req.user.id){
            return res.status(401).send("User not authorized");
        }

        const removeIndex = post.comments
            .map(comment => comment.id)
            .indexOf(req.params.c_id)

        post.comments.splice(removeIndex,1);

        await post.save();

        res.status(200).send(post.comments);
        
    } catch (err) {
        console.log(err);
        res.status(500).send('Server error');
    }

})

module.exports = router;