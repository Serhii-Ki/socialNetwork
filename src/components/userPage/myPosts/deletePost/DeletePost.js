import React from 'react';

import useService from '../../../../services/requestFunction';

import './deletePost.scss';

function DeletePost({ postId, renderNewPost, onChangeUserData }) {
    const { deletePost } = useService();

    const handleDelete = () => {
        deletePost(postId)
            .then(data => {
                renderNewPost();
                onChangeUserData();
            })
            .catch(error => {
                console.error('Ошибка при удалении поста:', error);
            });
    };
    return (
        <div onClick={handleDelete} className='delete'>&times;</div>
    );
}

export default DeletePost;