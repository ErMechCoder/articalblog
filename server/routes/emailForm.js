import express from 'express';
import { saveEmailForm } from '../controllers/emailForm.js';

const router = express.Router();




router.post('/add', saveEmailForm);



export default router;