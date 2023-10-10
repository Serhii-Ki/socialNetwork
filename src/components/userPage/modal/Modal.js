import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

import useService from "../../../services/requestFunction";

import './modal.scss';

function Modal(props) {
    const { changeUserData } = useService();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    const userData = useSelector(state => state.user.userData);

    const submittedData = (data) => {
        changeUserData(data)
            .then(data => {
                props.closeModal();
                props.onChangeUserData();
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => reset());
    }

    return (
        <section className='modal animate__animated animate__fadeIn'>
            <div className="modal__window">
                <h2 className="modal__title">Edit profile</h2>
                <div className="modal__close" onClick={props.closeModal}>&times;</div>
                <form className="modal__form" onSubmit={handleSubmit(submittedData)}>
                    <label className="modal__label" htmlFor="name">Name</label>
                    <input
                        name="fullName"
                        className="modal__input"
                        placeholder="Full Name"
                        type="text"
                        id="name"
                        defaultValue={userData.fullName}
                        {...register("fullName",
                            {
                                minLength: {
                                    value: 2,
                                    message: 'Your name too short!'
                                },
                            })}
                    />
                    {errors.fullName && <p className="errors__message">{errors.fullName.message} </p>}

                    <label className="modal__label" htmlFor="usname">UserName</label>
                    <input
                        name="username"
                        className="modal__input"
                        placeholder="User Name"
                        type="text"
                        id="usname"
                        defaultValue={userData.username}
                        {...register("username",
                            {
                                minLength: {
                                    value: 4,
                                    message: 'Your username too short!'
                                },
                            })}
                    />
                    {errors.username && <p className="errors__message">{errors.username.message} </p>}

                    <label className="modal__label" htmlFor="age">Age</label>
                    <input
                        name="age"
                        className="modal__input"
                        placeholder="age"
                        type="number"
                        id="age"
                        defaultValue={userData.age}
                        {...register("age",
                            {
                                maxLength: {
                                    value: 3,
                                    message: 'Your age too big!'
                                },
                            })}
                    />
                    {errors.age && <p className="errors__message">{errors.age.message} </p>}

                    <label className="modal__label" htmlFor="avatar">Avatar</label>
                    <input
                        name="avatar"
                        className="modal__input"
                        placeholder="avatar"
                        type="text"
                        id="avatar"
                        {...register("avatar")}
                    />

                    <textarea
                        name="bio"
                        className="modal__text"
                        placeholder="Bio"
                        {...register("bio",
                            {
                                maxLength: {
                                    value: 180,
                                    message: 'Your bio too long!'
                                },
                            })}
                    ></textarea>
                    {errors.bio && <p className="errors__message">{errors.bio.message} </p>}

                    <input className="modal__btn" type="submit" value='Submit' />
                </form>
            </div>
        </section>
    );
}

export default Modal;