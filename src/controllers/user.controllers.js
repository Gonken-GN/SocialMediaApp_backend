/**
 * Programmer: Raden Fadhil Anugerah Ardiwilaga
 * Filename: 17 June 2023
 * Contact: fadhilanugrah21@upi.edu
 * Date: server.js
 * Description: This is the code for running the servers
 * */
import bcrypt from 'bcrypt';
// import mongoose from 'mongoose';
import User from '../models/user.js';

export const updateUser = async (
  /** @type import('express').Request */ req,
  /** @type import('express').Response */ res,
) => {
  const { userid } = req.body;
  // let { password } = req.body;
  const { id } = req.params;
  try {
    if (userid === id || req.body.isAdmin) {
      if (req.body.password) {
        try {
          const salt = await bcrypt.genSalt(10);
          req.body.password = await bcrypt.hash(req.body.password, salt);
        } catch (err) {
          const response = res.status(500).json({
            status: 'fail',
            message: err.message,
          });
          return response;
        }
      }
      const user = await User.findByIdAndUpdate(id, {
        $set: req.body,
      });
      if (!user) {
        const response = res.status(403).json({
          status: 'fail',
          message: 'User not found!',
        });
        return response;
      }
      const response = res.status(200).json({
        status: 'success',
        data: user,
      });
      return response;
    }
    const response = res.status(403).json({
      status: 'fail',
      message: 'You can only update your account!',
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

export const deleteUser = async (
  /** @type import('express').Request */ req,
  /** @type import('express').Response */ res,
) => {
  const { userid } = req.body;
  const { id } = req.params;
  try {
    if (userid === id || req.body.isAdmin) {
      const user = await User.findByIdAndDelete(id);
      if (!user) {
        const response = res.status(403).json({
          status: 'fail',
          message: 'User not found!',
        });
        return response;
      }
      const response = res.status(200).json({
        status: 'success',
        message: 'account has been deleted',
      });
      return response;
    }
    const response = res.status(403).json({
      status: 'fail',
      message: 'You can only delete your account!',
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

export const getUserById = async (
  /** @type import('express').Request */ req,
  /** @type import('express').Response */ res,
) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    const {
      password, isAdmin, updatedAt, _id, ...other
    } = user._doc;
    const response = res.status(200).json({
      status: 'success',
      data: other,
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

export const getAllUser = async (
  /** @type import('express').Request */ req,
  /** @type import('express').Response */ res,
) => {
  try {
    const user = await User.find();
    if (user == null) {
      const response = res.status(400).json({
        status: 'fail',
        message: 'Bad Request.',
      });
      return response;
    }
    const response = res.status(200).json({
      status: 'success',
      data: user,
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

export const followUser = async (
  /** @type import('express').Request */ req,
  /** @type import('express').Response */ res,
) => {
  const { userid } = req.body;
  const { id } = req.params;
  if (userid !== id) {
    try {
      const user = await User.findById(id);
      const currentUser = await User.findById(userid);
      if (!user.followers.includes(userid)) {
        await user.updateOne({ $push: { followings: userid } });
        await currentUser.updateOne({ $push: { followers: id } });
        const response = res.status(200).json({
          status: 'success',
          message: 'User has been followed',
        });
        return response;
      }
      const response = res.status(403).json({
        status: 'fail',
        message: 'You already follow this user!',
      });
      return response;
    } catch (err) {
      const response = res.status(500).json({
        status: 'fail',
        message: err.message,
      });
      return response;
    }
  } else {
    const response = res.status(403).json({
      status: 'fail',
      message: 'You can\'t follow yourself!',
    });
    return response;
  }
};

export const unfollowUser = async (
  /** @type import('express').Request */ req,
  /** @type import('express').Response */ res,
) => {
  const { userid } = req.body;
  const { id } = req.params;
  if (userid !== id) {
    try {
      const user = await User.findById(id);
      const currentUser = await User.findById(userid);
      if (user.followers.includes(userid)) {
        await user.updateOne({ $pull: { followings: userid } });
        await currentUser.updateOne({ $pull: { followers: id } });
        const response = res.status(200).json({
          status: 'success',
          message: 'User has been unfollowed',
        });
        return response;
      }
      const response = res.status(403).json({
        status: 'fail',
        message: 'You don\'t follow this user!',
      });
      return response;
    } catch (err) {
      const response = res.status(500).json({
        status: 'fail',
        message: err.message,
      });
      return response;
    }
  } else {
    const response = res.status(403).json({
      status: 'fail',
      message: 'You can\'t follow yourself!',
    });
    return response;
  }
};
