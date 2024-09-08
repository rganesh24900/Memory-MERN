import { FETCH_ALL,CREATE, UPDATE, DELETE, LIKE, FETCH_BY_SEARCH } from "../constants/actionTypes";

const handlers = {
    [FETCH_ALL]: (posts, action) => action.payload,
    [CREATE]: (posts, action) => [...posts, action.payload],
    [UPDATE]: (posts, action) => posts.map(post => 
        post._id === action.payload._id ? action.payload : post
    ),
    [DELETE]: (posts, action) => posts.filter(post => post._id !== action.payload),
    [FETCH_BY_SEARCH]: (posts, action) => action.payload
};

export default (posts = [], action) => {
    const handler = handlers[action.type] || ((posts) => posts);
    return handler(posts, action);
};