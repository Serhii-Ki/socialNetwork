const initialState = {
    posts: []
};

const postsReducer = (state = initialState, actions) => {
    if (actions.type === 'GET_POSTS') {
        // console.log(actions.posts);
        return {
            ...state,
            posts: actions.posts
        }
    } else {
        return state;
    }
}

export default postsReducer;