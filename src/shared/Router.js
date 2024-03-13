import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Detail from '../pages/DiaryDetail/main';
import DiaryList from '../pages/DiaryList/main';
import MyPage from '../pages/MyPage/main';
import WriteDiary from '../pages/WriteDiary/main';
import Home from '../pages/Home/main';
import Header from "../components/Header";


const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Header />}>
          <Route path="/diaryList" element={<DiaryList />} />
          <Route path="/:id" elemenet={<MyPage />} />
          <Route path="/writeDiary" elemenet={<WriteDiary />} />
          <Route path="/diary/:id" element={<Detail />} />
        </Route>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter >
  );
};

export default Router;