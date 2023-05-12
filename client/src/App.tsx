import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import "./styles/yuri-grid.css";

import Main from "./pages/Main";
import Login from "./pages/Login";
import Singup from "./pages/Signup";
import FindAccount from "./pages/FindAccount";
import Write from "./pages/Write";
import Product from "./pages/Product";
import Error from "./pages/Error";
import Post from "./pages/Post";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Singup />} />
          <Route path="/findaccount" element={<FindAccount />} />
          <Route path="/write" element={<Write />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/post/:post_id" element={<Post />} />
          <Route path="/*" element={<Error/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
