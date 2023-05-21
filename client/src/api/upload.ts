import axios from "axios";
import { UploadData } from "../components/editor/type";
const baseURL = process.env.REACT_APP_API_URL;

const uploadAPI = axios.create({
  baseURL: `/api/post`,
  withCredentials: true,
});
uploadAPI.defaults.withCredentials = true; // 세션

/**
 * 글 작성 API
 * @param {UploadData} uploadData 글 데이터 form
 * @returns 성공 여부
 */
export const upload = async (uploadData: UploadData) => {
  console.log(baseURL);

  try {
    const res = await uploadAPI.post(`/`, uploadData);
    return res.data;
  } catch (err) {
    let msg: string;
    if (err instanceof Error) msg = err.message;
    else msg = String(err);
    throw new Error(msg);
  }
};

/**
 * 글 작성 중 이미지 업로드 API
 * @param {UploadData} uploadData 글 데이터 form
 * @returns 성공 여부
 */
export const uploadImage = async (uploadData: FormData) => {
  try {
    const res = await uploadAPI.post(`/image`, uploadData);
    return res.data;
  } catch (err) {
    let msg: string;
    if (err instanceof Error) msg = err.message;
    else msg = String(err);
    throw new Error(msg);
  }
};

/**
 * id 로 글 조회
 * @param {string} id 글 고유 id
 * @returns 성공 여부
 */
export const getPost = async (id: string) => {
  try {
    const res = await uploadAPI.get(`/${id}`);
    return res.data;
  } catch (err) {
    let msg: string;
    if (err instanceof Error) msg = err.message;
    else msg = String(err);
    throw new Error(msg);
  }
};

/**
 * id 로 글 삭제
 * @param {string} id 글 고유 id
 * @returns 성공 여부
 */
export const deletePost = async (id: string) => {
  try {
    const res = await uploadAPI.delete(`/${id}`);
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
export const getPostList = async (
  type: "user" | "date" | "like",
  reverse: boolean = false
) => {
  try {
    const res = await uploadAPI.post(`/list?type=${type}&reverse=${reverse}`, {
      "startTime": "2022-02-01T01:01:01",
      "endTime": "2022-02-01T01:01:01",
      "offset": 0,
      "limit": 4,
      "keyward": "스타일링페이지"
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
 * 특정 글의 좋아요 수
 * @param {string} id 글 고유 id
 * @returns 성공 여부
 */
export const getPostLike = async (id: string) => {
  try {
    const res = await uploadAPI.get(`/${id}/like`);
    return res.data;
  } catch (err) {
    let msg: string;
    if (err instanceof Error) msg = err.message;
    else msg = String(err);
    throw new Error(msg);
  }
};

/**
 * 특정 글에 좋아요 하기
 * @param {string} id 글 고유 id
 * @returns 성공 여부
 */
export const postLike = async (id: string) => {
  try {
    const res = await uploadAPI.post(`/${id}/like`);
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
    const res = await uploadAPI.get(`/${id}/comment`);
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
 * @param {number | null} parent 댓글의 부모, 답글 시 사용, 부모가 없다면 null
 * @param {string} comment 댓글 내용
 * @returns 성공 여부
 */
export const postComments = async (
  id: string,
  parent: number | null,
  comment: string
) => {
  try {
    const res = await uploadAPI.post(`/${id}/comment`, {
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
