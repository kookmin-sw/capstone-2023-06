import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

import Main from './pages/Main';
import Login from './pages/Login';
import Singup from './pages/Signup';
import FindAccount from './pages/FindAccount';
import Write from './pages/Write';

function App() {  
  return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Singup/>}/>
            <Route path="/findAccount" element={<FindAccount/>}/>
            <Route path="/write" element={<Write/>}/>
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;
