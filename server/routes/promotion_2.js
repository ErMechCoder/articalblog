import express from 'express'
import {createPromotion, getPromotion_2,editPromotion_2,deletePromotion_2} from '../controllers/promotion_2.js'


const router = express.Router()



router.post('/add',createPromotion )
router.get('/get',getPromotion_2 )
router.put('/edit/:id',editPromotion_2 )
router.delete('/delete/:id',deletePromotion_2 )



export default router;