import { ArticleApi } from "../axios/api";

import { AuthHeader } from "./Cookie";

const userHeaders = AuthHeader();

export const searchArticle = async(id) => await ArticleApi.get(`/${id}`);

export const createArticles = async(diary, headers) => await ArticleApi.post('', diary, headers);

export const updateArticle = async(id, newData, headers) => await ArticleApi.put(`/${id}`, newData, headers);

export const deleteArticle = async(id, headers) => await ArticleApi.delete(`/${id}`, headers);

export const articleList = async() => await ArticleApi.get();

export const countArticleLikes = async(id, headers) => await ArticleApi.get(`${id}/likes`, headers);

export const likeArticle = async(id, headers) => await ArticleApi.post(`${id}/likes`,null ,headers);

export const searchArticleList = async(params) => await ArticleApi.get('/search', params);