import express from 'express'
import {createPromotion, getPromotion_1,editPromotion_1,deletePromotion_1} from '../controllers/promotion_1.js'


const router = express.Router()



router.post('/add',createPromotion )
router.get('/get',getPromotion_1 )
router.put('/edit/:id',editPromotion_1 )
router.delete('/delete/:id',deletePromotion_1 )



export default router;