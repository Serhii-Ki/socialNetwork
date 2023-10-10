const initialState = {
    usersData: [],
};

const usersReducer = (state = initialState, actions) => {
    switch (actions.type) {
        case 'GET_USERS':
            // console.log('Получены данные юзеров:', actions.usersData);
            return {
                ...state,
                usersData: actions.usersData
            }
        default: return state;
    }
}

export default usersReducer;