import store from "./components/redux/redux.store";
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux";
<<<<<<< HEAD
import { BrowserRouter } from "react-router-dom"
=======
>>>>>>> dce12c4e69743825c35f82af172bdbd5c759dba7

const root = ReactDOM.createRoot(document.getElementById('root'));

export const rerenderEntireTree = (state) => {
  root.render(
    <React.StrictMode>
      <Provider store={store}>
<<<<<<< HEAD
        <BrowserRouter>
          <App />
        </BrowserRouter>
=======
      <App />
>>>>>>> dce12c4e69743825c35f82af172bdbd5c759dba7
      </Provider>
    </React.StrictMode>
  );

  reportWebVitals();

}
rerenderEntireTree(store.getState());

store.subscribe(() => {
  const state = store.getState();
  rerenderEntireTree(state);
});
window.store = store;
