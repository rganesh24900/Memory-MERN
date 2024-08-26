import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
  try {
    console.log("Inside get posts");
    const posts = await PostMessage.find();
    console.log("posts", posts);
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const createPost = async (req, res) => {
  try {
    const requestBody = req.body;
    const newPost = new PostMessage({
      ...requestBody,
      creator: req.userId,
      createdAt: new Date().toISOString(),
    });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { id: _id } = req.params;
    const post = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id))
      return req.status(404).send("No post with that id");

    const updatedPost = await PostMessage.findByIdAndUpdate(
      _id,
      { ...post, _id },
      { new: true }
    );
    res.json(updatedPost);
  } catch (error) {
    res.status(409).json({ message: error });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id: _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id))
      return req.status(404).send("No post with that id");
    await PostMessage.deleteOne({ _id });
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(409).json({ message: error });
  }
};

export const likePost = async (req, res) => {
  try {
    const { id: _id } = req.params;

    if (!req.userId) res.json({ message: "Unauthenticated" });

    if (!mongoose.Types.ObjectId.isValid(_id))
      return req.status(404).send("No post with that id");

    const post = await PostMessage.findById(_id);

    const index = post.likes.findIndex((id) => id == String(req.userId));

    if (index == -1) {
      post.likes.push(req.userId);
    } else {
      post.likes = post.likes.filter((id) => id !== String(req.userId));
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {
      new: true,
    });
    res.json(updatedPost);
  } catch (error) {
    console.log("Error", error);
    res.status(409).json({ message: error });
  }
};

export const getPostsBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query;
  try {
    console.log("Inside get posts by search");
    const title = new RegExp(searchQuery, "i");
    const posts = PostMessage.find({
      $or: [{ title }, { tags: { $in: tags.split(",") } }],
    });
    res.json({ data: posts });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};
