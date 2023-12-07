import store from "./components/redux/redux.store"; 
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById('root'));

export const rerenderEntireTree = (state) => {
  root.render(
    <React.StrictMode>
      <Provider store={store}>
      <App />
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
