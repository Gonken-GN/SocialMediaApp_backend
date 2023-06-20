/**
 * Programmer: Raden Fadhil Anugerah Ardiwilaga
 * Filename: 17 June 2023
 * Contact: fadhilanugrah21@upi.edu
 * Date: server.js
 * Description: This is the code for running the servers
 * */

import express from 'express';
import {
  deleteUser, followUser, getAllUser, getUserById, unfollowUser, updateUser,
} from '../controllers/user.controllers.js';

const router = express.Router();

router.get('/:id', getUserById);
router.get('/', getAllUser);
router.put('/:id/follow', followUser);
router.put('/:id/unfollow', unfollowUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
