import express from "express";
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet'

import {sendNotification} from "./firebase.js";

// Routes
import articleRoutes from './routes/article.js'
import adminRoutes from './routes/auth.js'
import quoteRoutes from './routes/quote.js'
import promotion_1_Routes from './routes/promotion_1.js'
import promotion_2_Routes from './routes/promotion_2.js'
import contestRoutes from './routes/contest.js'
import emailFormRoutes from './routes/emailForm.js'
import formRoutes from './routes/form.js'

dotenv.config()



const app = express()
app.use(
    helmet({
      referrerPolicy: { policy: "no-referrer" },
    })
  );
app.use(cors());
var whitelist = ['http://localhost:3000', 'http://localhost:3000']
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}
 
app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))

//routes
app.use('/article', cors(corsOptionsDelegate),articleRoutes)
app.use('/user', cors(corsOptionsDelegate), adminRoutes)
app.use('/quote', cors(corsOptionsDelegate),quoteRoutes)
app.use('/promotion_1',cors(corsOptionsDelegate), promotion_1_Routes)
app.use('/promotion_2', cors(corsOptionsDelegate), promotion_2_Routes)
app.use('/contest', cors(corsOptionsDelegate), contestRoutes)
app.use('/email-form', cors(corsOptionsDelegate),emailFormRoutes)
app.use('/form', cors(corsOptionsDelegate),formRoutes)



app.get('/', async(req, res) => {   
    res.send(" <h1>REST for Wonder of Weird is working </h1>")
   await sendNotification()

})


// mongoose.connect('mongodb://localhost:27017/rmj', (err) => {
//     if(err){
//         console.log(err)
//     } else {
//         console.log('mongo connected')
//     }
// })

// mongoose.connect('mongodb://uiibuser:Qy5HLeRGu@127.0.0.1:27017/webd',(err)=>{
//     if(err){
//         console.log(err)
//         }else{
//             console.log("connected to mongodb") 
//             }
// })
mongoose.connect(process.env.MONGO_Atlas_URL,(err)=>{
    if(err){
        console.log(err)
        }else{
            console.log("connected to mongodb") 
            }
})


app.listen(5000, (req, res) => {
    console.log(`server is running on 'http://localhost:${process.env.PORT}`)
})