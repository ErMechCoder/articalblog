import express from 'express'
import {registerUser,userSignIn,getAllUsers } from '../controllers/auth.js'
import {verifyUser,verifyTokenAndAdmin} from '../middlewares/auth.js'


const router = express.Router()


router.post('/register', registerUser)
router.post('/signin', userSignIn)
router.get("/users",verifyUser,verifyTokenAndAdmin,getAllUsers)


export default router;


