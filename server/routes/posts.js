import express from 'express'
import { getPosts, createPost, updatePost, deletePost, likePost, getPostsBySearch } from '../controllers/posts.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/',auth,getPosts);
router.post('/',auth,createPost);
router.patch('/:id',auth,updatePost);
router.delete('/:id',auth,deletePost);
router.patch('/likePost/:id',auth,likePost);
router.get('/search',auth,getPostsBySearch);


export default router;