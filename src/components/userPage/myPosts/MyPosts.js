import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMyPosts } from "../../../store/actions/actions";

import useService from "../../../services/requestFunction";

import DeletePost from './deletePost/DeletePost';
import ChangePost from './changePost/ChangePost';
import ModalPost from "./modalPost/ModalPost";

import './myPosts.scss';

function MyPosts({ onChangeUserData }) {
    const myPosts = useSelector(state => state.myPosts.posts);
    const dispatch = useDispatch();
    const myId = useSelector(state => state.user.userData);
    const [isNewPost, setNewPost] = useState(false);

    const { getAllPosts } = useService();

    useEffect(() => {
        getAllPosts()
            .then(data => {
                dispatch(getMyPosts(data));
            })
    }, [isNewPost]);

    const renderNewPost = () => {
        setNewPost(!isNewPost)
    }

    const [isModal, setModal] = useState(false);

    const openModal = () => {
        setModal(true);
    }

    const closeModal = () => {
        setModal(false);
    }

    return (
        <div className="posts animate__animated animate__fadeIn">
            <button onClick={openModal} className="posts__btn">Add Post</button>
            {isModal ? <ModalPost closeModal={closeModal} renderNewPost={renderNewPost} onChangeUserData={() => onChangeUserData()} /> : null}

            {myPosts.map(post => {
                if (post.author === myId._id) {
                    return (
                        <div key={post._id} className="post">
                            <div className="post__author">
                                <img className="post__avatar" src={post.user[0].avatar || "https://cdn-icons-png.flaticon.com/512/6596/6596121.png"} alt="user avatar" />
                                <div className="post__username">{post.user[0].username}</div>
                                <DeletePost postId={post._id} renderNewPost={renderNewPost} onChangeUserData={() => onChangeUserData()} />
                            </div>
                            <img className="post__img" src={post.image} alt="post img" />
                            <h2 className="post__title">{post.title || 'There is not title'}</h2>
                            <p className="post__descr">{post.description}</p>
                            <div className="post__info">
                                <div className="post__like">&#10084; {post.likes.length}</div>
                                <div className="post__date">{post.user[0].fullName}</div>
                            </div>
                            <ChangePost />
                        </div>
                    );
                }
            })}
        </div>
    );
}

export default MyPosts;