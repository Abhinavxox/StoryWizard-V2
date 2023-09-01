import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import thunk from "redux-thunk";

//for redux devtools
import { composeWithDevTools } from "redux-devtools-extension";

import { storiesReducer, questionReducer } from "./reducers/storyReducer";

//multiple reducers
const reducer = combineReducers({
  stories: storiesReducer,
  questions: questionReducer,
});

let initialState = {};

const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
