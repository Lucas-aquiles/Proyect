import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from "../reducers/index";
import thunk from "redux-thunk";

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
// const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(rootReducer,
//   composeEnhancer(applyMiddleware(thunk)),
// );
export default store;
  // MIDleware, nos va a permitir hacer petisiones asincronicas a nuestra api