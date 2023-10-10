import React, { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getPosts } from '../../../store/actions/actions';
import setContent from '../../utils/setContent';

import useService from '../../../services/requestFunction';

import './allPosts.scss';

function AllPosts() {
    const dispatch = useDispatch();
    const myId = useSelector(state => state.user.userData);
    const postData = useSelector(state => state.posts.posts);
    const [isRenderPosts, setRenderPosts] = useState(false);

    const { getAllPosts, addLike, deleteLike, process, setProcess } = useService();

    useEffect(() => {
        getAllPosts()
            .then(data => {
                dispatch(getPosts(data.filter(item => item.author !== myId._id)));
                setProcess('confirmed');
            })
    }, [isRenderPosts]);

    const onAddLike = (id, selector) => {
        let userId = null;
        if (selector) userId = selector.fromUser

        if (userId && myId._id === userId) {
            deleteLike(id)
                .then(data => {
                    setRenderPosts(prevIsRenderPosts => !prevIsRenderPosts);
                })
                .catch(e => {
                    console.log('Error Delete like', e);
                })
        } else {
            addLike({ "post_id": id })
                .then(data => {
                    setRenderPosts(prevIsRenderPosts => !prevIsRenderPosts);
                })
                .catch(e => {
                    console.log('Error like', e);
                })
        }
    }

    const renderItems = arr => {
        return arr.map(post => {
            return (
                <div key={post._id} className="card">
                    <div className="card__author">
                        <img className="card__avatar" src={post.user[0].avatar || "https://cdn-icons-png.flaticon.com/512/6596/6596121.png"} alt="user avatar" />
                        <div className="card__username">{post.user[0].username}</div>
                    </div>
                    <img className="card__img" src={post.image} alt="post img" />
                    <h2 className="card__title">{post.title || 'There is not title'}</h2>
                    <p className="card__descr">{post.description || 'There is not description'}</p>
                    <div className="card__info">
                        <div onClick={() => onAddLike(post._id, post.likes[0])} className="card__like">&#10084; {post.likes.length}</div>
                        <div className="card__date">{post.user[0].fullName || 'Name not specified'}</div>
                    </div>
                </div>
            )
        });
    };

    const element = useMemo(() => {
        return setContent(process, () => renderItems(postData))
    }, [process]);

    return (
        <div className="cards animate__animated animate__fadeIn">
            {element}
        </div>
    );

}

export default AllPosts;