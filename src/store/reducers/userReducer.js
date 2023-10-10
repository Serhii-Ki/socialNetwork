const initialState = {
    userData: {

    },
};

const userReducer = (state = initialState, actions) => {
    switch (actions.type) {
        case 'GET_USER':
            // console.log('Получены мои данные:', actions.userData);
            return {
                ...state,
                userData: actions.userData
            }
        default: return state;
    }
}

export default userReducer;