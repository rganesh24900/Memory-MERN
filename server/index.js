import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import postRoutes from './routes/posts.js'
import userRoutes from './routes/users.js'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

const app = express();
dotenv.config();
app.use(cookieParser());
app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));

app.use(cors({
  origin: 'http://localhost:3000',  // ✅ Replace with your React app URL
  credentials: true,                // ✅ Allow cookies
}));
app.use('/posts',postRoutes);
app.use('/users',userRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL)
        .then(()=>app.listen(PORT,()=>console.log(`Server running on Port ${PORT}`)))
        .catch((err)=>console.log(err));

// mongoose.set('useFindAndModify',false);