import userReducer from "./userReducer";
import usersReducer from "./usersReducer";
import postsReducer from "./postsReducer";
import myPostsReducer from "./myPostReducer";
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    user: userReducer,
    users: usersReducer,
    posts: postsReducer,
    myPosts: myPostsReducer
});

export default rootReducer;