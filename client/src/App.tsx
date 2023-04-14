import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

import Main from './pages/Main';
import Login from './pages/Login';
import Write from './pages/Write';
import Post from './pages/Post';

function App() {  
  return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/write" element={<Write/>}/>
            <Route path="/post/:post_id" element={<Post/>}/>
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;
