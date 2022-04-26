import { combineReducers } from 'redux';
import movieReducer from './movieResReducer';
import sendMovReducer from "./sendMovReducer"

export default combineReducers({
    movieReducer,
    sendMovReducer
});