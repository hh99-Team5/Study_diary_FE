import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Detail from '../pages/DiaryDetail/Main';
import DiaryList from '../pages/DiaryList/Main';
import MyPage from '../pages/MyPage/Main';
import AddDiary from "../pages/AddDiary/Main";
import Home from '../pages/Home/Main';
import Header from '../components/Header'


const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/diaryList" element={<DiaryList />} />
        <Route path="/:id" elemenet={<MyPage />} />
        <Route path="/add" element={<AddDiary />} />
        <Route path="/diary/:id" element={<Detail />} />
      </Routes>
    </BrowserRouter >
  );
};

export default Router;