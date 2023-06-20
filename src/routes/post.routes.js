/**
 * Programmer: Raden Fadhil Anugerah Ardiwilaga
 * Filename: 17 June 2023
 * Contact: fadhilanugrah21@upi.edu
 * Date: server.js
 * Description: This is the code for running the servers
 * */

import express from 'express';
import {
  createPost, deletePost, getAllPost, getPostById, likePost, timeLinePost, updatePost,
} from '../controllers/post.controllers.js';

const router = express.Router();
router.post('/', createPost);
router.put('/:id', updatePost);
router.put('/:id/like', likePost);
router.get('/', getAllPost);
router.get('/:id', getPostById);
router.get('/timeline/all', timeLinePost);
router.delete('/:id', deletePost);

export default router;
