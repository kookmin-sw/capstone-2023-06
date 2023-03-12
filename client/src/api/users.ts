import axios from "axios";
// const baseURL = process.env.API_URL;
const baseURL = "http://localhost:8080/api/";

//axios.defaults.withCredentials = true;    // 세션


const userAPI = axios.create({
    baseURL
});
userAPI.defaults.withCredentials = true;    // 세션

type UserLoginData = {
    email: string,
    password: string
}

/**
 * 로그인 API
 * @param {UserLoginData} userData 로그인시 필요한 데이터 폼
 * @returns 성공 여부
 */ 
export const login = async (userData : UserLoginData) => {
    try {
        const res = await userAPI.post(`/user/login`, userData);
        return res.data;    
    } catch (err) {
        let msg : string;
        if (err instanceof Error) msg = err.message;
        else msg = String(err);
        throw new Error(msg);
    }
}

/**
 * 자동 로그인
 * (최초 로그인 후 캐시가 남아있다면 자동 로그인이 가능함)
 * @returns 성공 여부
 */
export const autoLogin = async () => {
    try {
        const res = await userAPI.get(`/user/autologin`);
        return res.data;    
    } catch (err) {
        let msg : string;
        if (err instanceof Error) msg = err.message;
        else msg = String(err);
        throw new Error(msg);
    }
}

/**
 * 로그아웃
 * (자동 로그인 방지를 위해 세션 및 쿠키 삭제 진행함)
 * @returns 성공 여부
 */
export const logout = async () => {
    try {
        const res = await userAPI.get(`/user/logout`);
        return res.data;    
    } catch (err) {
        let msg : string;
        if (err instanceof Error) msg = err.message;
        else msg = String(err);
        throw new Error(msg);
    }
}