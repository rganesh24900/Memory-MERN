import axios from 'axios';

const API = axios.create({baseURL:'http://localhost:5000'});
// const url = 'http://localhost:5000/posts';

API.interceptors.request.use((req)=>{
    if(localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
})

export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery?.search || 'none'}&tags=${searchQuery.tags}`);
export const createPost = (post) => API.post('/posts',post);
export const updatePost = (currentId,post) => API.patch(`/posts/${currentId}`,post);
export const deletePost = (currentId) => API.delete(`/posts/${currentId}`);
export const likePost = (currentId,post) => API.patch(`/posts/likePost/${currentId}`,post);

export const signIn = (formData) => API.post('/users/signin',formData)
export const signUp = (formData) => API.post('/users/signup',formData)

