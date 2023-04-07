import { combineReducers } from 'redux';
import users from './users';
import editor from './editor';
import images from './images';

const rootReducer = combineReducers({
    users,
    editor,
    images
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;