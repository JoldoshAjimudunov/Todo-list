import React, { useEffect } from "react";
import "./App.css";
import { userSlice } from "./store/reducers/UserSlice";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { fetchUsers } from "./store/reducers/ActionCreators";
import PostContainer from "./components/PostContainer";

function App() {
  return (
    <div className="App">
      <PostContainer />
    </div>
  );
}

export default App;
