/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Nav } from "./Admin/Nav";
import { Aside } from "./Admin/Aside";
import { Users } from "./Admin/Users/Users";
import { Posts } from "./Admin/Posts/Posts";
import { PostsRequest } from "./Admin/Posts/PostsRequest";
import { Comments } from "./Admin/Comments/Comments";
import "./App.css";

export const RefreshContext = createContext();

function App() {
  const [refresh, setRefresh] = useState(true);
  return (
    <RefreshContext.Provider value={{ refresh, setRefresh }}>
      <BrowserRouter>
        <Nav />
        <Aside />
        <Routes>
          <Route path="/" element={<Users />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/request" element={<PostsRequest />} />
          <Route path="/comment" element={<Comments />} />
        </Routes>
      </BrowserRouter>
    </RefreshContext.Provider>
  );
}

export default App;
