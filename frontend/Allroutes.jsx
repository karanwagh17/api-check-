import React from "react";
import SignIn from "./src/pages/SignIn ";
import SignUp from "./src/pages/SignUp";
import { Route, Routes } from "react-router-dom";
import UserList from "./src/pages/UserList";
import Edit from "./src/pages/edit";

const Allroutes = () => {
  return (
    <Routes>
      <Route path="/" element={<SignIn />}></Route>
      <Route path="/sign-up" element={<SignUp />}></Route>
      <Route path="/UserList" element={<UserList />}></Route>
      <Route path="/edit/:userId" element={<Edit/>}></Route>
    </Routes>
  );
};

export default Allroutes;
