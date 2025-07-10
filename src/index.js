import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
// import {store ,persistor } from './store'; //when persistor
import {store} from './store';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import { PersistGate } from 'redux-persist/integration/react';

// export const server = `http://localhost:4000/api/v1`;
export const server = `https://my-ecommerce-electronic-backend.onrender.com/api/v1`; //change it before pushing


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    {/* <PersistGate loading={null} persistor={persistor}> */}
      <App />
    {/* </PersistGate> */}
  </Provider>
);


reportWebVitals();
