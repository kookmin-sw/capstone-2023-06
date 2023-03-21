import { ElementType } from "react";
import { LINE_TYPE } from "../components/editor/type";

const UPDATE_HTML = `editor/UPDATE_HTML` as const;
const CHANGE_TAG = `editor/CHANGE_TAG` as const;
const ADD_LINE = `editor/ADD_LINE` as const;
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
export const addLine = (id:string) => ({
    type: ADD_LINE,
    id: id,
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
    | ReturnType<typeof removeLine>
    | ReturnType<typeof updateContent>;

const generateRandomID = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

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
            if (idx > -1)
                state.splice(idx + 1, 0, {
                    id: generateRandomID(),
                    html: '',
                    tag: 'p',
                    flag: 0
                });
            return [...state];

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