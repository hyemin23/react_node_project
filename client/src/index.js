import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import "antd/dist/antd.css";
import { Provider } from "react-redux";
//미들웨어 사용
import { applyMiddleware, createStore } from "redux";
//promise와 thunk는 리덕스를 편리하게 사용할 수 있게 도와주는 것.
import promiseMiddleware from "redux-promise";
import ReduxThunk from "redux-thunk";
import rootReducer from './_reducers';

//원래는 createStore 따로 하는데 여기서는 promise 와 function 을 함께 받기 위해 같이 넣어줌.
//리덕스에서 applyMiddleware를 가져온 후
//redux-promise와 redux-thunk를 넣고 Strore를 가져온다

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore)


ReactDOM.render(
  <Provider
    store={createStoreWithMiddleware(rootReducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__()
    )}
  >
    <App />
  </Provider>
  , document.getElementById('root'));

