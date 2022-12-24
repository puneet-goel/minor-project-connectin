import PostMessage from '../models/postMessage.js';
import mongoose from 'mongoose';
import {
  createPostImage,
  deletePostImage,
  updatePostImage,
  getSpecificPostImage,
} from '../sanity/apiPostImage.js';
import fs from 'fs';
import { promisify } from 'util';

const unlinkAsync = promisify(fs.unlink);

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find().lean();

    return res.status(200).json({
      message: 'ok',
      posts: postMessages,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  try {
    const post = {
      title: req.body.title,
      message: req.body.message,
      creator: req.body.username,
      tags: req.body.tags.split(/[ ,]/).filter((ele) => ele),
      createdAt: new Date(),
    };

    let newPost = new PostMessage(post);

    if (req.file) {
      //host image on sanity
      await createPostImage(req.file, newPost._id);
      unlinkAsync(req.file.path);
      const data = await getSpecificPostImage(newPost._id);

      //update image metadata
      newPost.selectedFile = {
        url: data[0].photo.asset.url,
        sanityId: data[0]._id,
        imageId: data[0].photo.asset._id,
      };
    }

    await newPost.save();
    return res.status(201).json({
      message: 'ok',
      post: newPost,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { id: _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({ message: 'Invalid Id' });
    }

    const oldPost = await PostMessage.findById(_id)
      .select({ creator: 1, selectedFile: 1 })
      .lean();

    if (!oldPost) {
      return res.status(400).json({ message: 'Invalid Id' });
    }

    if (oldPost.creator !== req.body.username) {
      return res
        .status(403)
        .json({ message: 'Tried to change other user data' });
    }

    const post = {
      title: req.body.title,
      message: req.body.message,
      tags: req.body.tags.split(/[ ,]/).filter((ele) => ele),
      selectedFile: oldPost.selectedFile,
    };

    if (req.file) {
      if (post.selectedFile.sanityId) {
        await updatePostImage(req.file, post.selectedFile.sanityId);
      } else {
        await createPostImage(req.file, _id);
      }
      unlinkAsync(req.file.path);

      const data = await getSpecificPostImage(_id);
      post.selectedFile = {
        url: data[0].photo.asset.url,
        sanityId: data[0]._id,
        imageId: data[0].photo.asset._id,
      };
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(
      _id,
      { ...post, _id },
      { new: true },
    ).lean();

    return res.status(200).json({
      message: 'ok',
      post: updatedPost,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id: _id } = req.params;
    const username = req.body.username;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({ message: 'Invalid Id' });
    }

    const oldPost = await PostMessage.findById(_id)
      .select({ creator: 1, selectedFile: 1 })
      .lean();

    if (!oldPost) {
      return res.status(400).json({ message: 'Invalid Id' });
    }

    if (oldPost.creator !== username) {
      return res
        .status(403)
        .json({ message: 'Tried to change other user data' });
    }

    //delete image from sanity
    if (oldPost.selectedFile.sanityId) {
      await deletePostImage(oldPost.selectedFile.sanityId);
    }

    await PostMessage.findByIdAndRemove(_id).lean();

    return res.status(200).json({ message: 'ok' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const likePost = async (req, res) => {
  try {
    const { id: _id } = req.params;
    const username = req.body.username;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({ message: 'Invalid Id' });
    }

    let post = await PostMessage.findById(_id).select({ likedBy: 1 }).lean();
    if (!post) {
      return res.status(400).json({ message: 'Invalid Id' });
    }

    const index = post.likedBy.indexOf(username);

    if (index >= 0) {
      post.likedBy.splice(index, 1);
    } else {
      post.likedBy.push(username);
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(
      _id,
      { likedBy: post.likedBy },
      { new: true },
    )
      .select({ likedBy: 1 })
      .lean();

    return res.status(200).json({
      message: 'ok',
      post: updatedPost,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getUserPost = async (req, res) => {
  try {
    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({ message: 'Invalid Id' });
    }

    const post = await PostMessage.findById(_id).lean();
    if (!post) {
      return res.status(400).json({ message: 'Invalid Id' });
    }

    return res.status(200).json({
      message: 'ok',
      post: post,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createComment = async (req, res) => {
  try {
    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({ message: 'Invalid Id' });
    }

    const post = await PostMessage.findById(_id).select({ comments: 1 }).lean();

    if (!post) {
      return res.status(400).json({ message: 'Invalid Id' });
    }

    post.comments.push({
      _id: req.body.username + new Date() + new Date().getMilliseconds(),
      creator: req.body.username,
      message: req.body.message,
      createdAt: new Date(),
    });

    const updatedPost = await PostMessage.findByIdAndUpdate(
      _id,
      { comments: post.comments },
      { new: true },
    )
      .select({ comments: 1 })
      .lean();

    return res.status(200).json({
      message: 'ok',
      post: updatedPost,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { id: _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({ message: 'Invalid Id' });
    }

    let post = await PostMessage.findById(_id).select({ comments: 1 }).lean();

    if (!post) {
      return res.status(400).json({ message: 'Invalid Id' });
    }
    post.comments = post.comments.filter(
      (cur) => !(cur._id === req.body.id && cur.creator === req.body.username),
    );

    const updatedPost = await PostMessage.findByIdAndUpdate(
      _id,
      { comments: post.comments },
      { new: true },
    )
      .select({ comments: 1 })
      .lean();

    return res.status(200).json({
      message: 'ok',
      post: updatedPost,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
