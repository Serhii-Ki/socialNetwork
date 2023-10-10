import { useForm } from "react-hook-form";

import useService from "../../../../services/requestFunction";

import './modalPost.scss';

function ModalPost(props) {
    const { addPost } = useService();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    const submittedData = (data) => {
        addPost(data)
            .then(data => {
                props.closeModal();
                props.renderNewPost();
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
                <h2 className="modal__title">Enter information</h2>
                <div className="modal__close" onClick={props.closeModal}>&times;</div>
                <form className="modal__form" onSubmit={handleSubmit(submittedData)}>
                    <label className="modal__label" htmlFor="name">Title</label>
                    <input
                        name="title"
                        className="modal__input"
                        placeholder="Title"
                        type="text"
                        id="name"
                        {...register("title",
                            {
                                minLength: {
                                    value: 2,
                                    message: 'Your name too short!'
                                },
                            })}
                    />
                    {errors.fullName && <p className="errors__message">{errors.fullName.message} </p>}

                    <label className="modal__label" htmlFor="usname">Video</label>
                    <input
                        name="video"
                        className="modal__input"
                        placeholder="Video"
                        type="text"
                        id="usname"
                        {...register("video",
                            {
                                minLength: {
                                    value: 4,
                                    message: 'Your description too short!'
                                },
                            })}
                    />
                    {errors.username && <p className="errors__message">{errors.username.message} </p>}

                    <label className="modal__label" htmlFor="age">Status</label>
                    <input
                        name="status"
                        className="modal__input"
                        placeholder="Status"
                        type="text"
                        id="age"
                        {...register("status",
                            {
                                maxLength: {
                                    value: 3,
                                    message: 'Your age too big!'
                                },
                            })}
                    />
                    {errors.age && <p className="errors__message">{errors.age.message} </p>}

                    <label className="modal__label" htmlFor="avatar">Image</label>
                    <input
                        name="image"
                        className="modal__input"
                        placeholder="Image"
                        type="text"
                        id="avatar"
                        {...register("image")}
                    />

                    <textarea
                        name="description"
                        className="modal__text"
                        placeholder="Description"
                        {...register("description",
                            {
                                maxLength: {
                                    value: 180,
                                    message: 'Your description too long!'
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

export default ModalPost;