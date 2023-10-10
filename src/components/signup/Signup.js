import { Link, useNavigate } from 'react-router-dom';
import { useState } from "react";
import { useForm } from "react-hook-form";
import ErrorMessage from '../errorMessage/ErrorMessage';

import useService from '../../services/requestFunction';

import first from '../../resources/in-first.png';
import second from '../../resources/up-second.png';
import third from '../../resources/up-third.png';
import main from '../../resources/up-main.png';

import './signup.scss';

function Signup() {
    const [isError, setIsError] = useState(false);
    const [isErrorLogin, setErrorLogin] = useState(false);
    let userData;
    const navigate = useNavigate();

    const { registration } = useService();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        getValues
    } = useForm();

    const passwordMatchValidator = (value) => {
        const { password } = getValues();
        return password === value ? true : "Passwords do not match";
    };

    const submitedData = (data) => {
        userData = {
            "username": data.login,
            "password": data.password,
            "confirm_password": data.confirmPassword
        };
        registration(userData)
            .then(data => {
                if (data.id) {
                    setIsError(false);
                    setErrorLogin(false);
                    navigate("/signin");
                } else {
                    setErrorLogin(true);
                }
            })
            .catch((error) => {
                setIsError(true);
                console.log(error);
            })
            .finally(() => reset());
    }

    return (
        <section className='signup'>
            <div className="signup__window">
                <h2 className="signup__title">Sign up</h2>
                <img className="signup__img signup__img-first" src={first} alt="abstraction" />
                <img className="signup__img signup__img-third" src={third} alt="abstraction" />
                <img className="signup__img signup__img-second" src={second} alt="abstraction" />
                <div className="signup__main">
                    <img className="signup__main-img" src={main} alt="main" />
                    <div className="signup__form">
                        {isError ? <ErrorMessage /> : null}
                        {isErrorLogin ? <p className="errors__message">The login must be unique</p> : null}
                        <form onSubmit={handleSubmit(submitedData)}>
                            <input
                                placeholder='User Name'
                                className="signup__form-input"
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
                                className="signup__form-input"
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

                            <input
                                placeholder='Confirm Password'
                                className="signup__form-input"
                                type="password"
                                name="confirmPassword"
                                {...register("confirmPassword", {
                                    validate: passwordMatchValidator
                                })}
                            />
                            {errors.confirmPassword && <p className="errors__message">{'Passwords don\'t match'}</p>}

                            <input className="signup__form-btn" type="submit" value='Login' />
                        </form>
                        <div className="signup__main-text">
                            Do you have an Account?
                            <Link className="signup__main-link" to="/signin"> Sign in</Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Signup;