const initialState = {
    posts: []
};

const myPostsReducer = (state = initialState, actions) => {
    if (actions.type === 'GET_MY_POSTS') {
        // console.log('My POSTS', actions.posts);
        return {
            ...state,
            posts: actions.posts
        }
    } else {
        return state;
    }
}

export default myPostsReducer;