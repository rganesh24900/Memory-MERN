import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js"

export const getPosts = async (req, res) => {
    try {

        const posts = await PostMessage.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

export const createPost = async (req, res) => {
    try {
        const requestBody = req.body;
        const newPost = new PostMessage(requestBody);
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error });
    }
}

export const updatePost = async (req, res) => {
    try {
        const { id: _id } = req.params;
        const post = req.body;

        if (!mongoose.Types.ObjectId.isValid(_id)) return req.status(404).send("No post with that id");

        const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id }, { new: true })
        res.json(updatedPost);
    } catch (error) {
        res.status(409).json({ message: error });
    }
}

export const deletePost = async (req, res) => {
    try {
        const { id: _id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(_id)) return req.status(404).send("No post with that id");
        await PostMessage.deleteOne({ _id })
        res.json({ message: "Post deleted successfully" });
    } catch (error) {
        res.status(409).json({ message: error });
    }
}

export const likePost = async (req, res) => {
    try {
        const { id: _id } = req.params;
        const post = req.body;

        if (!mongoose.Types.ObjectId.isValid(_id)) return req.status(404).send("No post with that id");

        const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, likeCount: post.likeCount + 1 }, { new: true })
        res.json(updatedPost);
    } catch (error) {
        res.status(409).json({ message: error });
    }
}