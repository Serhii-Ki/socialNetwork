class Requests {
    constructor() {
        this.apiBase = 'http://49.13.31.246:9191/';
        this.token = localStorage.getItem('jwt');
        this.id = localStorage.getItem('id');
        this.routes = {
            signin: 'signin',
            signup: 'signup',
            me: 'me',
            user: 'user',
            users: 'users',
            posts: 'posts',
            post: 'post',
            like: 'like'
        }
    }

    //Запрос регистрация
    registration(data) {
        return fetch(this.apiBase + this.routes.signup, {
            "headers": {
                "content-type": "application/json",
            },
            "body": JSON.stringify(data),
            "method": "POST",
        })
            .then(res => res.json())
    }

    //Запрос на вход
    enter(data) {
        return fetch(this.apiBase + this.routes.signin, {
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(data),
            method: "POST"
        })
            .then(res => res.json())
    }

    //Запрос на получения данных пользователя
    async getUserData() {
        try {
            const response = await fetch(this.apiBase + this.routes.me, {
                headers: {
                    "content-type": "application/json",
                    'x-access-token': this.token
                }
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Произошла ошибка при выполнении запроса getUserData:', error);
            throw error;
        }
    }


    //Запрос на изменение данных
    putChangeData(myData) {
        return fetch(this.apiBase + this.routes.me, {
            headers: {
                "content-type": "application/json",
                "x-access-token": this.token
            },
            "body": JSON.stringify(myData),
            "method": "PUT"
        })
            .then(res => res.json())
    }

    //Запрос на получения всех юзеров
    async getAllUsers() {
        try {
            const response = await fetch(this.apiBase + this.routes.users, {
                headers: {
                    "content-type": "application/json",
                    'x-access-token': this.token
                }
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Произошла ошибка при выполнении запроса getAllUsers:', error);
            throw error;
        }
    }

    //Запрос на получение определенного пользователя
    getOneUser(path) {
        return fetch(this.apiBase + this.routes.user + '/' + path, {
            headers: {
                "content-type": "application/json",
                'x-access-token': this.token
            }
        })
            .then(res => res.json())
    }

    //Запрос на получение постов
    async getPosts() {
        try {
            const response = await fetch(this.apiBase + this.routes.posts, {
                headers: {
                    'x-access-token': this.token
                }
            });

            if (!response.ok) {
                throw new Error('Request failed');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching posts:', error);
            throw error;
        }
    }

    //Замрос на получение моих постов
    async getMyPosts() {
        try {
            const response = fetch(this.apiBase + this.routes.posts + '/' + this.id, {
                headers: {
                    'x-access-token': this.token
                }
            });

            if (!response.ok) {
                throw new Error('Request failed');
            }

            const data = await response.json();
            return data;

        } catch (error) {
            console.error('Error fetching posts:', error);
            throw error;
        }
    }

    //Добавление постов
    putChangePost(postData) {
        return fetch(this.apiBase + this.routes.post, {
            headers: {
                "content-type": "application/json",
                "x-access-token": this.token
            },
            "body": JSON.stringify(postData),
            "method": "POST"
        })
            .then(res => res.json())
    }

    //Удаление постов
    deleteMyPosts(id) {
        return fetch(this.apiBase + this.routes.post + '/' + id, {
            headers: {
                "content-type": "application/json",
                'x-access-token': this.token
            },
            "method": "DELETE"
        })
            .then(res => res.json())
    }

    //Лайк поста
    addLike(data) {
        return fetch(this.apiBase + this.routes.like, {
            headers: {
                "content-type": "application/json",
                'x-access-token': this.token
            },
            body: JSON.stringify(data),
            method: "POST"
        })
            .then(res => res.json())
    }

    //Удаление лайка
    deleteLike(path) {
        return fetch(this.apiBase + this.routes.like + '/' + path, {
            headers: {
                "content-type": "application/json",
                'x-access-token': this.token
            },
            method: "DELETE"
        })
            .then(res => res.json())
    }
}

export default Requests;