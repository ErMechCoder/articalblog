import express from 'express'
import {verifyUser} from '../middlewares/auth.js';
import multer from 'multer';
import Article from '../models/article.js';
import path from 'path';

const router = express.Router();


const urlify = (text) => {
    return text
      .toLowerCase()
      .replace(/[^a-zA-Z0-9-]/g, "*") // reg ex
      .split("*")
      .filter((word) => word.length > 1)
      .join("-");
  };

const imageStorage = multer.diskStorage({
    // Destination to store image    
    destination: '/home/ekanatechnologies/public_html/wow/',
      filename: (req, file, cb) => {
          cb(null, file.fieldname + '_' + Date.now() 
             + path.extname(file.originalname))
            // file.fieldname is name of the field (image)
            // path.extname get the uploaded file extension
    }
})

const imageUpload = multer({
    storage: imageStorage,
    limits: {
      // Max file size is 10MB
        fileSize: 10000000
    },
    fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(png|jpg)$/)) { 
         // upload only png and jpg format
         return cb(new Error('Please upload a Image'))
       }
     cb(undefined, true)
  }
}) 


router.post('/create', imageUpload.single('imageFile'), async (req, res) => {
    try {
        const { title, category, articleBody, createdBy } = req.body;
        const imageFile = req.file.path;
        const fileType = req.file.mimetype;
        const URL=urlify(title)
        const article = new Article({ title, category, articleBody, imageFile,fileType, createdBy,URL });
        await article.save();
        res.status(201).json(article);
    } catch (error) {
        res.status(500).json(error.message);
    }
});

router.get('/get-all', async (req, res) => {
    try {
        const articles = await Article.find();
        res.status(200).json(articles);
    } catch (error) {
        res.status(500).json(error.message);
    }
});


router.get("/get-by-url",async (req,res)=>{
    try{
        const {URL} = req.params
        const article = await Article.findOne({URL})
        if(!article) return res.status(404).json({message:"Article not found"})
        res.status(200).json(article)
    }
    catch(error){
        res.status(500).json(error.message)
    }
})



export default router;