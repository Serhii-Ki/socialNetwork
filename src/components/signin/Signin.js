import { Link, useNavigate } from 'react-router-dom';
import { useState } from "react";
import { useForm } from "react-hook-form";

import useService from '../../services/requestFunction';

import ErrorMessage from "../errorMessage/ErrorMessage";

import first from '../../resources/in-first.png';
import second from '../../resources/is-second.png';
import third from '../../resources/in-third.png';
import main from '../../resources/in-main.png';

import './signin.scss';

function Signin() {
    const [isError, setIsError] = useState(false);
    const [isErrorLogin, setErrorLogin] = useState(false);
    let userData;
    const navigate = useNavigate();

    const { enter } = useService();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    const submittedData = (data) => {
        userData = {
            "username": data.login,
            "password": data.password
        };
        enter(userData)
            .then(data => {
                if (data.token) {
                    setIsError(false);
                    setErrorLogin(false);
                    localStorage.setItem('jwt', data.token);
                    navigate("/userpage");
                } else {
                    setErrorLogin(true);
                }
            })
            .catch((error) => {
                setIsError(true);
                console.log(error);
            })
            .finally(() => reset());
    };

    return (
        <section className='signin'>
            <div className="signin__window">
                <h2 className="signin__title">Login</h2>
                <img className="signin__img signin__img-first" src={first} alt="abstraction" />
                <img className="signin__img signin__img-second" src={second} alt="abstraction" />
                <img className="signin__img signin__img-third" src={third} alt="abstraction" />
                <div className="signin__main">
                    <img className="signin__main-img" src={main} alt="main" />
                    <div className="signin__form">
                        {isError ? <ErrorMessage /> : null}
                        {isErrorLogin ? <p className="errors__message">Login failed, please try again</p> : null}
                        <form onSubmit={handleSubmit(submittedData)}>
                            <input
                                placeholder='User Name'
                                className="signin__form-input"
                                type="text"
                                name="login"
                                {...register("login",
                                    {
                                        required: 'login is required field',
                                        minLength: {
                                            value: 3,
                                            message: 'login too short'
                                        },
                                    })}
                            />
                            {errors.login && <p className="errors__message">{errors.login.message} </p>}

                            <input
                                placeholder='Password'
                                className="signin__form-input"
                                type="password"
                                name="password"
                                {...register("password",
                                    {
                                        required: 'password is required field',
                                        minLength: {
                                            value: 3,
                                            message: 'password too short'
                                        },
                                    })}
                            />
                            {errors.password && <p className="errors__message">{errors.password.message} </p>}

                            <input className="signin__form-btn" type="submit" value='Login' />
                        </form>
                        <div className="signin__main-text">
                            Don’t have an Account?
                            <Link className="signin__main-link" to="/signup"> Sign up</Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Signin;