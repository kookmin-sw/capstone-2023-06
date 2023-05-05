import { ElementType } from "react";
import { ImagesObjectType, POSITION, Refer } from "../components/editor/type";
import { generateRandomID } from "../utils/randomID";
import { omit } from "lodash";

const UPDATE_REFERS = `images/UPDATE_REFERS` as const;
const CHECK_REFERS = `images/CHECK_REFERS` as const;
const ADD_REFER = `images/ADD_REFERS` as const;
const REMOVE_REFER = `images/REMOVE_REFERS` as const;
const NEW_IMAGE = `images/NEW_LINE` as const;
const SRC_IMAGE = `images/SRC_IMAGE` as const;
const REMOVE_IMAGE = `images/REMOVE_LINE` as const;
const RESET_IMAGES = `images/RESET_IMAGES` as const;

export const updateRefers = (id: string, content: Refer[]) => ({
  type: UPDATE_REFERS,
  id: id,
  payload: content,
});
export const checkRefers = (id: string, payload: string) => ({
  type: CHECK_REFERS,
  id: id,
  payload: payload,
});
export const addRefer = (id: string, payload: string, pos: POSITION) => ({
  type: ADD_REFER,
  id: id,
  pos: pos,
  payload: payload,
});
export const removeRefer = (id: string, payload: string) => ({
  type: REMOVE_REFER,
  id: id,
  payload: payload,
});
// 라인의 마지막 라인에 새 라인을 추가하고 싶을 경우에만 사용
export const newImage = (id: string) => ({
  type: NEW_IMAGE,
  id: id,
});
export const srcImage = (id: string, src: string) => ({
  type: SRC_IMAGE,
  id: id,
  payload: src,
});
export const removeImage = (id: string) => ({
  type: REMOVE_IMAGE,
  id: id,
});
export const resetImages = (payload: ImagesObjectType) => ({
  type: RESET_IMAGES,
  payload: payload,
});

type EditorAction =
  | ReturnType<typeof updateRefers>
  | ReturnType<typeof checkRefers>
  | ReturnType<typeof addRefer>
  | ReturnType<typeof removeRefer>
  | ReturnType<typeof newImage>
  | ReturnType<typeof srcImage>
  | ReturnType<typeof removeImage>
  | ReturnType<typeof resetImages>;

function editor(
  state: ImagesObjectType = {},
  action: EditorAction
): ImagesObjectType {
  var idx;
  var newState;
  switch (action.type) {
    case UPDATE_REFERS:
      newState = { ...state };
      newState[action.id].refers = [...action.payload];
      return newState;
    // idx = state.findIndex(line => line.id === action.id);
    // if (idx > -1)
    //     state[idx].refers = action.payload;
    // return [...state];

    case NEW_IMAGE:
      return {
        ...state,
        [action.id]: {
          id: "",
          refers: [],
          src: "",
        },
      };
    // return [
    //     ...state,
    //     {
    //         id: action.id,
    //         refers: [],
    //         src: '',
    //     }
    // ];

    case ADD_REFER:
      newState = { ...state };
      newState[action.id].refers = [
        ...state[action.id].refers,
        {
          id: action.payload,
          data: "",
          ...action.pos,
        },
      ];
      return { ...newState };

    // idx = state.findIndex(line => line.id === action.id);
    // if (idx > -1) {
    //     state[idx].refers.push({
    //         id: generateRandomID(),
    //         data: '',
    //         ...action.pos
    //     });
    // }
    // return [...state];

    case REMOVE_REFER:
      newState = { ...state };
      idx = newState[action.id].refers.findIndex(
        (r) => r.id === action.payload
      );
      if (idx > -1) newState[action.id].refers.splice(idx, 1);
      return { ...newState };

    case CHECK_REFERS:
      newState = { ...state };
      idx = newState[action.id].refers.findIndex(
        (r) => r.id === action.payload
      );
      if (idx > -1) {
        if (newState[action.id].refers[idx].data === "") {
          newState[action.id].refers.splice(idx, 1);
        }
      }
      return { ...newState };

    case SRC_IMAGE:
      newState = { ...state };
      newState[action.id].src = action.payload;
      return { ...newState };
    case REMOVE_IMAGE:
      return omit(state, action.id);
    // delete state[action.id];
    // return { ...state };

    case RESET_IMAGES:
      return { ...action.payload };

    default:
      return { ...state };
  }
}
export default editor;
