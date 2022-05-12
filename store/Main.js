import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import RootReducer from "./RootReducer";

const middleware = applyMiddleware(thunkMiddleware);
const Store = createStore(RootReducer, middleware);

export default Store;
