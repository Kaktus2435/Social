import store from "./components/redux/redux.store"; 
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

export const rerenderEntireTree = (state) => {
  root.render(
    <React.StrictMode>
      <App appState={store.getState()} dispatch={store.dispatch.bind(store)} store={store}/>
    </React.StrictMode>
  );

  reportWebVitals();

}
rerenderEntireTree(store.getState());

store.subscribe(() => {
  const state = store.getState();
  rerenderEntireTree(state);
});

