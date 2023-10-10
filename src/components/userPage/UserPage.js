import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";

import Requests from "../../services/requests";
import { getUserData } from '../../store/actions/actions';
import Modal from './modal/Modal';
import About from './about/About';
import Users from './users/Users';
import AllPosts from './allPosts/AllPosts';
import MyPosts from './myPosts/MyPosts';

import useService from '../../services/requestFunction';

import friends from "../../resources/friends.svg";
import home from "../../resources/home.svg";
import photo from "../../resources/photo.svg";
import message from "../../resources/message.svg";
import video from "../../resources/video.svg";
import follower from "../../resources/follower.svg";
import like from "../../resources/like.svg";

import './userPage.scss';

function UserPage() {
    const dispatch = useDispatch();
    const userData = useSelector(state => state.user.userData);

    const [isModal, setModal] = useState(false);
    const [isUserDataChange, setUserDataChange] = useState(false);
    const [renderElem, setRenderElem] = useState('home');

    const { getUser } = useService();

    useEffect(() => {
        getUser()
            .then(data => {
                dispatch(getUserData(data));
            })
    }, [isUserDataChange]);

    const openModal = () => {
        setModal(true);
    };

    const closeModal = () => {
        setModal(false);
    };

    const onChangeUserData = () => {
        setUserDataChange(!isUserDataChange)
    };

    const onChangeElem = (selector) => {
        setRenderElem(selector);
    };

    const showElem = (action) => {
        switch (action) {
            case 'home':
                return <MyPosts onChangeUserData={onChangeUserData} />;
            case 'posts':
                return <AllPosts />;
            case 'users':
                return <Users />;
            default: return null;
        }
    };

    return (
        <div id='grid' className='grid-wrapp'>
            {isModal ? <Modal
                closeModal={closeModal}
                onChangeUserData={onChangeUserData}
            /> : null}
            <main id='main' className="main" >
                <div className="main__left">
                    <div className="main__exit"><Link to="/">Exit</Link></div>
                    <img className="main__avatar" src={userData.avatar || "https://cdn-icons-png.flaticon.com/512/149/149071.png"} alt="my avatar" />
                    <h2 className="main__username">{userData.fullName || 'Your Name'}</h2>
                    <h3 className="main__mail">{userData.username || 'user name'}</h3>
                    <button className='main__btn' onClick={openModal}>Edit Profile</button>
                    <div className="main__social">
                        <div className="main__social-follow">
                            <a href="./"><img src={follower} alt="follow" />{userData.followers}</a>
                        </div>
                        <div className="main__social-follow">
                            <a href="./"><img className="heart" src={like} alt="like" />8</a>
                        </div>
                    </div>
                    <ul className="main__nav nav-list">
                        <li onClick={() => onChangeElem('home')} className={renderElem === 'home' ? "main__nav-item active" : "main__nav-item"}><img src={home} alt="Home" /><span>Home</span></li>
                        <li onClick={() => onChangeElem('users')} className={renderElem === 'users' ? "main__nav-item active" : "main__nav-item"}><img src={friends} alt="Friends" /><span>Users</span></li>
                        <li onClick={() => onChangeElem('posts')} className={renderElem === 'posts' ? "main__nav-item active" : "main__nav-item"}><img src={photo} alt="Photos" /><span>Posts</span></li>
                        <li className="main__nav-item"><img src={video} alt="Video" /><span>Video</span></li>
                        <li className="main__nav-item"><img src={message} alt="Messages" /><span>Messages</span></li>
                    </ul>
                </div>
                <div className="main__right"></div>
            </main>
            <div id='about' className="about__sec">
                <About
                    age={userData.age}
                    bio={userData.bio}
                    following={userData.following}
                    postsCount={userData.posts_count}
                />
            </div>
            <section id='content' className="content">
                <div className="content__line"></div>
                {showElem(renderElem)}
            </section>

        </div>
    );
}

export default UserPage;