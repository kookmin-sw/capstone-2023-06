import { ElementType } from "react";
import { LINE_TYPE } from "../components/editor/type";
import { generateRandomID } from "../utils/randomID";

const UPDATE_HTML = `editor/UPDATE_HTML` as const;
const CHANGE_TAG = `editor/CHANGE_TAG` as const;
const ADD_LINE = `editor/ADD_LINE` as const;
const NEW_LINE = `editor/NEW_LINE` as const;
const REMOVE_LINE = `editor/REMOVE_LINE` as const;
const UPDATE_CONTENT = `editor/UPDATE_CONTENT` as const;

export const updateHtml = (id:string, content: string) => ({
    type: UPDATE_HTML,
    id: id,
    payload: content,
});
export const changeTag = (id:string, tag: ElementType<any>) => ({
    type: CHANGE_TAG,
    id: id,
    payload: tag,
});
// 라인들 사이세 라인을 생성할 수 있는 경우 사용
export const addLine = (id:string, content: string = '') => ({
    type: ADD_LINE,
    id: id,
    payload: content
});
// 라인의 마지막 라인에 새 라인을 추가하고 싶을 경우에만 사용
export const newLine = () => ({
    type: NEW_LINE
});
export const removeLine = (id:string) => ({
    type: REMOVE_LINE,
    id: id,
});
export const updateContent = (state: LINE_TYPE[]) => ({
    type: UPDATE_CONTENT,
    payload: state,
});

type EditorAction = 
    | ReturnType<typeof updateHtml>
    | ReturnType<typeof changeTag>
    | ReturnType<typeof addLine>
    | ReturnType<typeof newLine>
    | ReturnType<typeof removeLine>
    | ReturnType<typeof updateContent>;

const initState: LINE_TYPE = {
    id: generateRandomID(),
    html: '',
    tag: 'p',
    flag: 0
};


function editor(
    state: LINE_TYPE[] = [initState],
    action: EditorAction
): LINE_TYPE[] {
    var idx;
    switch (action.type) {
        case UPDATE_HTML:
            idx = state.findIndex(line => line.id === action.id);
            if (idx > -1)
                state[idx].html = action.payload;
            return [...state];

        case CHANGE_TAG:
            idx = state.findIndex(line => line.id === action.id);
            if (idx > -1)
                state[idx].tag = action.payload;
            return [...state];


        case ADD_LINE:
            idx = state.findIndex(line => line.id === action.id);
            if (idx > -1) {
                const newTag = state[idx].tag === 'ol' || state[idx].tag === 'ul' ? state[idx].tag : 'p';
                state.splice(idx + 1, 0, {
                    id: generateRandomID(),
                    html: action.payload,
                    tag: newTag,
                    flag: 0
                });
            }
            return [...state];

        case NEW_LINE:
            return [
                ...state,
                {
                    id: generateRandomID(),
                    html: '',
                    tag: 'p',
                    flag: 0
                }
            ];
        

        case REMOVE_LINE:
            idx = state.findIndex(line => line.id === action.id);
            if (idx > -1)
                state.splice(idx, 1);
            return [...state];

        case UPDATE_CONTENT:
            return [...action.payload];

        default:
            return state;
    }
}
export default editor;