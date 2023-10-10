export const getUserData = (data) => ({
    type: 'GET_USER',
    userData: data
});

export const getUsers = (data) => ({
    type: 'GET_USERS',
    usersData: data
});

export const getPosts = (data) => ({
    type: 'GET_POSTS',
    posts: data
});

export const getMyPosts = (data) => ({
    type: 'GET_MY_POSTS',
    posts: data
});
