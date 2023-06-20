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

export const registerUser = async (
  /** @type import('express').Request */ req,
  /** @type import('express').Response */ res,
) => {
  const { username, email, password } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const user = await User({
      username,
      email,
      password: hashPassword,
    });
    await user.save();
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

export const loginUser = async (
  /** @type import('express').Request */ req,
  /** @type import('express').Response */ res,
) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      const response = res.status(404).json({
        status: 'fail',
        message: 'User not found',
      });
      return response;
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      const response = res.status(400).json({
        status: 'fail',
        message: 'Password does not match',
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
