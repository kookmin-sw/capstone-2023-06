const SET_USER = `users/SET_USER` as const;
const RESET_USER = `users/RESET_USER` as const;

export const setUser = (nickname: string) => ({
    type: SET_USER,
    payload: nickname,
});
export const resetUser = () => ({
    type: RESET_USER
});

type UserAction = 
    | ReturnType<typeof setUser>
    | ReturnType<typeof resetUser>;

type UserState = {
    nickname: string;
};

const initState: UserState = {
    nickname: ''
};

function user(
    state: UserState = initState,
    action: UserAction
): UserState {
    switch (action.type) {
        case SET_USER:
            state.nickname = action.payload;
            return state;
        case RESET_USER:
            state.nickname = '';
            return state;
        default:
            return state;
    }
}
export default user;