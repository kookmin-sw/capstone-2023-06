import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

import "./styles/yuri-grid.css";

import Main from './pages/Main';
import Login from './pages/Login';
import Write from './pages/Write';
import Product from './pages/Product';

function App() {  
  return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/write" element={<Write/>}/>
            <Route path="/product/:id" element={<Product/>}/>
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;
