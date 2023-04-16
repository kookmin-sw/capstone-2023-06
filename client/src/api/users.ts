import axios from "axios";
// const baseURL = process.env.API_URL;
const baseURL = process.env.API_URL;

//axios.defaults.withCredentials = true;    // 세션

const userAPI = axios.create({
  baseURL: `${baseURL}/user`,
});
userAPI.defaults.withCredentials = true; // 세션

type UserLoginData = {
  email: string;
  password: string;
};

/**
 * 로그인 API
 * @param {UserLoginData} userData 로그인시 필요한 데이터 폼
 * @returns 성공 여부
 */
export const login = async (userData: UserLoginData) => {
  try {
    const res = await userAPI.post(`/login`, userData);
    return res.data;
  } catch (err) {
    let msg: string;
    if (err instanceof Error) msg = err.message;
    else msg = String(err);
    throw new Error(msg);
  }
};

/**
 * 자동 로그인
 * (최초 로그인 후 캐시가 남아있다면 자동 로그인이 가능함)
 * @returns 성공 여부
 */
export const autoLogin = async () => {
  try {
    const res = await userAPI.get(`/auto-login`);
    return res.data;
  } catch (err) {
    let msg: string;
    if (err instanceof Error) msg = err.message;
    else msg = String(err);
    throw new Error(msg);
  }
};

/**
 * 로그아웃
 * (자동 로그인 방지를 위해 세션 및 쿠키 삭제 진행함)
 * @returns 성공 여부
 */
export const logout = async () => {
  try {
    const res = await userAPI.get(`/logout`);
    return res.data;
  } catch (err) {
    let msg: string;
    if (err instanceof Error) msg = err.message;
    else msg = String(err);
    throw new Error(msg);
  }
};

type UserSignupData = UserLoginData & {
  nickname: string;
  pickture: string;
};
/**
 * 회원가입
 * @param {UserSignupData} userData 회원가입시 필요한 데이터 폼
 * @returns 성공 여부
 */
export const signup = async (userData: UserSignupData) => {
  try {
    const res = await userAPI.post(`/sign-up`, userData);
    return res.data;
  } catch (err) {
    let msg: string;
    if (err instanceof Error) msg = err.message;
    else msg = String(err);
    throw new Error(msg);
  }
};

/**
 * 유저 정보 id 로 가져오기
 * @param {string} id 유저 id
 * @returns 성공 여부
 */
export const getuserByID = async (id: string) => {
  try {
    const res = await userAPI.get(`/id/${id}`);
    return res.data;
  } catch (err) {
    let msg: string;
    if (err instanceof Error) msg = err.message;
    else msg = String(err);
    throw new Error(msg);
  }
};

/**
 * 유저 정보 email 로 가져오기
 * @param {string} email 유저 email
 * @returns 성공 여부
 */
export const getuserByEmail = async (email: string) => {
  try {
    const res = await userAPI.get(`/email/${email}`);
    return res.data;
  } catch (err) {
    let msg: string;
    if (err instanceof Error) msg = err.message;
    else msg = String(err);
    throw new Error(msg);
  }
};

/**
 * 회원 탈퇴
 * @returns 성공 여부
 */
export const removeUser = async () => {
  try {
    const res = await userAPI.delete(`/`);
    return res.data;
  } catch (err) {
    let msg: string;
    if (err instanceof Error) msg = err.message;
    else msg = String(err);
    throw new Error(msg);
  }
};

/**
 * 유저 정보 수정
 * @param {File} image 프로필 이미지
 * @returns 성공 여부
 */
export const updateProfile = async (image: File) => {
  try {
    const res = await userAPI.post(`/profile`, { image });
    return res.data;
  } catch (err) {
    let msg: string;
    if (err instanceof Error) msg = err.message;
    else msg = String(err);
    throw new Error(msg);
  }
};
