import { ArticleApi } from "../axios/api";

import { AuthHeader } from "./Cookie";

const userHeaders = AuthHeader();

// List
export const articleList = async() => await ArticleApi.get();

export const searchArticleList = async(params) => await ArticleApi.get('/search', params);

// Diary
export const searchArticle = async(id) => await ArticleApi.get(`/${id}`);

export const createArticles = async(diary) => await ArticleApi.post('', diary, userHeaders);

export const updateArticle = async(id, newData) => await ArticleApi.put(`/${id}`, newData, userHeaders);

export const deleteArticle = async(id) => await ArticleApi.delete(`/${id}`, userHeaders);

// Diary - like
export const countArticleLikes = async(id) => await ArticleApi.get(`${id}/likes`, userHeaders);

export const likeArticle = async(id) => await ArticleApi.post(`${id}/likes`,null ,userHeaders);

