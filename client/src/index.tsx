import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';  // 일단은 Redux-toolkit 은 사용하지 않습니다. 필요해진다면 변경합니다.
import logger from 'redux-logger';
import rootReducer from './modules';

import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './styles/GlobalStyle';
import theme from "./styles/theme";

const store = createStore(rootReducer, applyMiddleware(logger));

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyle/>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
