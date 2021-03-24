import { combineReducers } from "redux";
import userReducer from "./user_reducer";


//리듀서들을 하나로 묶어주는 역할을 함.
const rootReducer = combineReducers({
    userReducer,

});


export default rootReducer;
