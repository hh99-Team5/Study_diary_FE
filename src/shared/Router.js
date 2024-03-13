import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Detail from '../pages/DiaryDetail/Main';
import DiaryList from '../pages/DiaryList/Main';
import MyPage from '../pages/MyPage/Main';
import WriteDiary from '../pages/WriteDiary/Main';
import Home from '../pages/Home';


const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/diaryList" element={<DiaryList />} />
        <Route path="/:id" elemenet={<MyPage />} />
        <Route path="/writeDiary" elemenet={<WriteDiary />} />
        <Route path="/diary/:id" element={<Detail/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;