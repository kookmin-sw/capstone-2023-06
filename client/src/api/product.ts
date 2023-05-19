import axios from "axios";
const baseURL = process.env.REACT_APP_API_URL;

const productAPI = axios.create({
  baseURL: `/api/product`,
  withCredentials: true,
});
productAPI.defaults.withCredentials = true; // 세션

/**
 * id 로 제품 조회
 * @param {string} id 글 고유 id
 * @returns 성공 여부
 */
export const getProduct = async (id: string) => {
  try {
    const res = await productAPI.get(`/${id}`);
    return res.data;
  } catch (err) {
    let msg: string;
    if (err instanceof Error) msg = err.message;
    else msg = String(err);
    throw new Error(msg);
  }
};

/**
 * 글 목록 불러오기
 * @param {"user" | "date" | "like"} type 정렬 기준
 * @param {string} reverse 정렬 반대 여부
 * @returns 성공 여부
 */
export const getProductList = async (
  type: "user" | "date" | "like",
  reverse: boolean = false
) => {
  try {
    const res = await productAPI.post(`/list?type=${type}&reverse=${reverse}`, {
      startTime: "2022-02-01T01:01:01",
      endTime: "2024-02-01T01:01:01",
      offset: 0,
      limit: 4,
      keyward: "스타일링페이지",
    });
    return res.data;
  } catch (err) {
    let msg: string;
    if (err instanceof Error) msg = err.message;
    else msg = String(err);
    throw new Error(msg);
  }
};

/**
 * 특정 글의 댓글 가져오기
 * @param {string} id 글 고유 id
 * @returns 성공 여부
 */
export const getComments = async (id: string) => {
  try {
    const res = await productAPI.get(`/${id}/comments`);
    return res.data;
  } catch (err) {
    let msg: string;
    if (err instanceof Error) msg = err.message;
    else msg = String(err);
    throw new Error(msg);
  }
};

/**
 * 특정 제품의 댓글 작성하기
 * @param {string} id 글 고유 id
 * @param {number | null} parent 댓글의 부모, 답글 시 사용, 부모가 없다면 null
 * @param {string} comment 댓글 내용
 * @returns 성공 여부
 */
export const productComments = async (
  id: string,
  parent: number | null,
  comment: string
) => {
  try {
    const res = await productAPI.post(`/${id}/comment`, {
      parent,
      comment,
    });
    return res.data;
  } catch (err) {
    let msg: string;
    if (err instanceof Error) msg = err.message;
    else msg = String(err);
    throw new Error(msg);
  }
};

/**
 * 특정 제품의 좋아요 수
 * @param {string} id 글 고유 id
 * @returns 성공 여부
 */
export const getProductLike = async (id: string) => {
  try {
    const res = await productAPI.get(`/${id}/likes`);
    return res.data;
  } catch (err) {
    let msg: string;
    if (err instanceof Error) msg = err.message;
    else msg = String(err);
    throw new Error(msg);
  }
};

/**
 * 특정 제품에 좋아요 하기
 * @param {string} id 글 고유 id
 * @returns 성공 여부
 */
export const productLike = async (id: string) => {
  try {
    const res = await productAPI.post(`/${id}/like`);
    return res.data;
  } catch (err) {
    let msg: string;
    if (err instanceof Error) msg = err.message;
    else msg = String(err);
    throw new Error(msg);
  }
};

/**
 * 제품 검색
 * @param {string} msg 입력
 * @returns 성공 여부
 */
export const productSearch = async (msg: string) => {
  try {
    const res = await productAPI.post(`/search`, {
      keyword: msg
    });
    return res.data;
  } catch (err) {
    let msg: string;
    if (err instanceof Error) msg = err.message;
    else msg = String(err);
    throw new Error(msg);
  }
};

/**
 * 제품 관련 리뷰
 * @param {string} id 제품 id
 * @returns 성공 여부
 */
export const productReviews = async (id: string) => {
  try {
    const res = await productAPI.get(`/${id}/reviews`);
    return res.data;
  } catch (err) {
    let msg: string;
    if (err instanceof Error) msg = err.message;
    else msg = String(err);
    throw new Error(msg);
  }
};