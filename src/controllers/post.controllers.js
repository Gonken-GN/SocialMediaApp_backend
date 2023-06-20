/**
 * Programmer: Raden Fadhil Anugerah Ardiwilaga
 * Filename: 17 June 2023
 * Contact: fadhilanugrah21@upi.edu
 * Date: server.js
 * Description: This is the code for running the servers
 * */

import User from '../models/user.js';
import Post from '../models/post.js';

export const createPost = async (
  /** @type import('express').Request */ req,
  /** @type import('express').Response */ res,
) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    const response = res.status(200).json({
      status: 'success',
      data: savedPost,
    });
    return response;
  } catch (err) {
    const response = res.status(500).json({
      status: 'fail',
      message: err.message,
    });
    return response;
  }
};

export const updatePost = async (
  /** @type import('express').Request */ req,
  /** @type import('express').Response */ res,
) => {
  const { id } = req.params;
  const { userid } = req.body;
  try {
    const post = await Post.findById(id);
    if (post.userid === userid) {
      await post.updateOne({ $set: req.body });
      const response = res.status(200).json({
        status: 'success',
        data: post,
      });
      return response;
    }
    const response = res.status(403).json({
      status: 'fail',
      message: 'You can only update your post!',
    });
    return response;
  } catch (err) {
    const response = res.status(500).json({
      status: 'fail',
      message: err.message,
    });
    return response;
  }
};

export const deletePost = async (
  /** @type import('express').Request */ req,
  /** @type import('express').Response */ res,
) => {
  const { id } = req.params;
  const { userid } = req.body;
  try {
    const post = await Post.findById(id);
    if (post.userid === userid) {
      await post.deleteOne();
      const response = res.status(200).json({
        status: 'success',
        message: 'This post has been deleted',
      });
      return response;
    }
    const response = res.status(403).json({
      status: 'fail',
      message: 'You can only delete your post!',
    });
    return response;
  } catch (err) {
    const response = res.status(500).json({
      status: 'fail',
      message: err.message,
    });
    return response;
  }
};

export const getAllPost = async (
  /** @type import('express').Request */ req,
  /** @type import('express').Response */ res,
) => {
  try {
    const post = await Post.find();
    const response = res.status(200).json({
      status: 'success',
      data: post,
    });
    return response;
  } catch (err) {
    const response = res.status(500).json({
      status: 'fail',
      message: err.message,
    });
    return response;
  }
};

export const getPostById = async (
  /** @type import('express').Request */ req,
  /** @type import('express').Response */ res,
) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    const response = res.status(200).json({
      status: 'success',
      data: post,
    });
    return response;
  } catch (err) {
    const response = res.status(500).json({
      status: 'fail',
      message: err.message,
    });
    return response;
  }
};

export const likePost = async (
  /** @type import('express').Request */ req,
  /** @type import('express').Response */ res,
) => {
  const { id } = req.params;
  const { userid } = req.body;
  try {
    const post = await Post.findById(id);
    if (!post) {
      const response = res.status(403).json({
        status: 'fail',
        message: 'post not found',
      });
      return response;
    }
    if (!post.likes.includes(userid)) {
      await post.updateOne({ $push: { likes: userid } });
      const response = res.status(200).json({
        status: 'success',
        message: 'The post has been liked',
        data: post,
      });
      return response;
    }
    await post.updateOne({ $pull: { likes: userid } });
    const response = res.status(200).json({
      status: 'success',
      message: 'The post has been disliked',
      data: post,
    });
    return response;
  } catch (err) {
    const response = res.status(500).json({
      status: 'fail',
      message: err.message,
    });
    return response;
  }
};

export const timeLinePost = async (
  /** @type import('express').Request */ req,
  /** @type import('express').Response */ res,
) => {
  const { userid } = req.body;
  try {
    const currentUser = await User.findById(userid);
    const userPost = await Post.find({ userid: currentUser._id });
    const friendPost = await Promise.all(
      currentUser.followings.map((friendid) => (Post.find({ userid: friendid }))),
    );
    const response = res.status(200).json({
      status: 'success',
      data: userPost.concat(...friendPost),
    });
    return response;
  } catch (err) {
    const response = res.status(500).json({
      status: 'fail',
      message: err.message,
    });
    return response;
  }
};
