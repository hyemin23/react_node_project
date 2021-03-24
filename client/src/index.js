import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "antd/dist/antd.css";
import { Provider } from "react-redux";
//미들웨어 사용
import { applyMiddleware, createStore } from "redux";
//promise와 thunk는 리덕스를 편리하게 사용할 수 있게 도와주는 것.
import promiseMiddleware from "redux-promise";
import ReduxThunk from "redux-thunk";
import Reducer from './_reducers';
import { composeWithDevTools } from "redux-devtools-extension";

//원래는 createStore 따로 하는데 여기서는 promise 와 function 을 함께 받기 위해 같이 넣어줌.
//리덕스에서 applyMiddleware를 가져온 후
//redux-promise와 redux-thunk를 넣고 Strore를 가져온다
const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk);

const store = createStore(
  Reducer, composeWithDevTools(createStoreWithMiddleware)
);

//Provider는 리액트 app에 store를 손 쉽게  연동할 수 있도록 도와주는 컴포넌트
//하위 컴포넌트들이 Provider를 통해 store에 접근이 가능하다.
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
