import express from 'express'
import {createQuote, getAllquotes,deleteQuote,editQuote} from '../controllers/quote.js';


const router = express.Router()



router.post('/add',createQuote )
router.get('/get-all',getAllquotes)
router.delete('/delete/:id',deleteQuote)
router.put('/edit/:id',editQuote)



export default router;