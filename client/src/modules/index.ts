import { combineReducers } from 'redux';
import users from './users';
import editor from './editor';

const rootReducer = combineReducers({
    users,
    editor
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;