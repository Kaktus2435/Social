import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import AppMain from './App.tsx';
import store from './components/redux/redux.store.ts';


// setInterval(() => {
//   store.dispatch({type:"FAKE"})
// }, 1000);

const root = ReactDOM.createRoot(document.getElementById('root'));

export const rerenderEntireTree = (state) => {
  root.render(<AppMain />);

  reportWebVitals();

}
rerenderEntireTree(store.getState());

store.subscribe(() => {
  const state = store.getState();
  rerenderEntireTree(state);
});

