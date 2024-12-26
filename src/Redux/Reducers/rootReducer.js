import { combineReducers } from "redux";
import userReducer from "./UserReducer";
import errorsReducer from "./errorsReducer";
import taskReducer from "./taskReducer";

const rootReducer = combineReducers({userReducer , errorsReducer , taskReducer})

export default rootReducer