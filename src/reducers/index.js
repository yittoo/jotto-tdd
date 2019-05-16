import { combineReducers } from "redux";
import success from "./successReducer";
import guessedWords from "./guessWordReducer";

export default combineReducers({ success, guessedWords });
