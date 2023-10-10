import { useHttp } from "../hooks/http.hook";

const useService = () => {
    const { request, clearError, process, setProcess } = useHttp();

    const apiBase = 'http://49.13.31.246:9191/';
    const token = localStorage.getItem('jwt');
    const routes = {
        signin: 'signin',
        signup: 'signup',
        me: 'me',
        user: 'user',
        users: 'users',
        posts: 'posts',
        post: 'post',
        like: 'like'
    };

    //Регистрация
    const registration = async (data) => {
        const res = await request(
            `${apiBase}${routes.signup}`,
            'POST',
            JSON.stringify(data),
        );
        return res;
    };

    //Запрос на вход
    const enter = async (data) => {
        const res = await request(
            `${apiBase}${routes.signin}`,
            'POST',
            JSON.stringify(data),
        );
        return res;
    };

    //Получение данных пользователя
    const getUser = async () => {
        const res = await request(
            `${apiBase}${routes.me}`,
            'GET',
            null,
            {
                "content-type": "application/json",
                'x-access-token': token
            }
        );
        return res;
    };


    //Запрос на изменение данных
    const changeUserData = async (myData) => {
        const res = await request(
            `${apiBase}${routes.me}`,
            'PUT',
            JSON.stringify(myData),
            {
                "content-type": "application/json",
                "x-access-token": token
            }
        );
        return res;
    };

    //Запрос на получения всех юзеров
    const getAllUsers = async () => {
        const res = await request(
            `${apiBase}${routes.users}`,
            'GET',
            null,
            {
                "content-type": "application/json",
                'x-access-token': token
            }
        );
        return res;
    };

    //Запрос на получение постов
    const getAllPosts = async () => {
        const res = await request(
            `${apiBase}${routes.posts}`,
            'GET',
            null,
            {
                "content-type": "application/json",
                'x-access-token': token
            }
        );
        return res;
    }

    //Добавление постов
    const addPost = async (postData) => {
        const res = await request(
            `${apiBase}${routes.post}`,
            'POST',
            JSON.stringify(postData),
            {
                "content-type": "application/json",
                "x-access-token": token
            }
        );
        return res;
    }

    //Удаление постов
    const deletePost = async (id) => {
        const res = await request(
            `${apiBase}${routes.post}/${id}`,
            'DELETE',
            null,
            {
                "content-type": "application/json",
                'x-access-token': token
            }
        );
        return res;
    }

    //Лайк поста
    const addLike = async (data) => {
        const res = await request(
            `${apiBase}${routes.like}`,
            'POST',
            JSON.stringify(data),
            {
                "content-type": "application/json",
                'x-access-token': token
            }
        );
        return res;
    };

    //Удаление лайка
    const deleteLike = async (path) => {
        const res = await request(
            `${apiBase}${routes.like}/${path}`,
            'DELETE',
            null,
            {
                "content-type": "application/json",
                'x-access-token': token
            }
        );
    };

    return {
        clearError,
        process,
        setProcess,
        getUser,
        getAllPosts,
        registration,
        enter,
        changeUserData,
        getAllUsers,
        addPost,
        deletePost,
        addLike,
        deleteLike
    };
};

export default useService;
