import express from 'express'
import { createContest,getContests } from '../controllers/contest.js';
const router=express.Router();





router.post('/add',createContest);

router.get('/get', getContests)

export default router;
