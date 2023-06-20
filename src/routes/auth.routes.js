/**
 * Programmer: Raden Fadhil Anugerah Ardiwilaga
 * Filename: 17 June 2023
 * Contact: fadhilanugrah21@upi.edu
 * Date: server.js
 * Description: This is the code for running the servers
 * */

import express from 'express';
import { loginUser, registerUser } from '../controllers/auth.controllers.js';

const router = express.Router();
router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;
