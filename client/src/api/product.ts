import axios from "axios";
const baseURL = process.env.REACT_APP_API_URL;

const productAPI = axios.create({
  baseURL: `/api/product`,
  withCredentials: true,
});
productAPI.defaults.withCredentials = true; // 세션


/**
 * id로 product를 조회함.
 * @param {string} id 글 고유 id
 * @returns 성공 여부
 */
export const getProduct = async (id: string) => {
    try {
      const res = await productAPI.get(`/product/${id}`);
      return res.data;
    } catch (err) {
      let msg: string;
      if (err instanceof Error) msg = err.message;
      else msg = String(err);
      throw new Error(msg);
    }
  };
  
/**
 * 제품 목록 불러오기
 * @param {"user" | "date" | "like"} type 정렬 기준
 * @param {string} reverse 정렬 반대 여부
 * @returns 성공 여부
 */
export const getProductList = async (
    type: "user" | "date" | "like",
    reverse: boolean = false
  ) => {
    try {
      const res = await productAPI.post(`/list?type=${type}&rever=${reverse}`, {
        "startTime": "2019-02-01T01:01:01",
        "endTime": "2023-05-23T01:01:01",
        "offset": 0,
        "limit": 4,
      });
      return res.data;
    } catch (err) {
      let msg: string;
      if (err instanceof Error) msg = err.message;
      else msg = String(err);
      throw new Error(msg);
    }
  };