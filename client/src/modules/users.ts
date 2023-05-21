import { UserData } from "../type/user";

const SET_USER = `users/SET_USER` as const;
const SET_IMAGE = `users/SET_IMAGE` as const;
const RESET_USER = `users/RESET_USER` as const;

export const setUser = (user: UserData) => ({
  type: SET_USER,
  payload: user,
});
export const setProfileImage = (imgURL: string) => ({
  type: SET_IMAGE,
  payload: imgURL,
});
export const resetUser = () => ({
  type: RESET_USER,
});

type UserAction =
  | ReturnType<typeof setUser>
  | ReturnType<typeof setProfileImage>
  | ReturnType<typeof resetUser>;

type UserState = UserData & {
  isLoggedIn: boolean;
};

const initState: UserState = {
  nickname: "",
  id: "",
  email: "",
  image: "",
  isLoggedIn: false,
};

function user(state: UserState = initState, action: UserAction): UserState {
  switch (action.type) {
    case SET_USER:
      return { ...action.payload, isLoggedIn: true };
    case SET_IMAGE:
      return { ...state, image: action.payload };
    case RESET_USER:
      return { ...initState };
    default:
      return state;
  }
}
export default user;
