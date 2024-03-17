import axios from "axios";

export const memberApi = axios.create({
    baseURL: `${process.env.REACT_APP_SERVER_URL}/api/v1/members`,
})

export const ArticleApi = axios.create({
    baseURL: `${process.env.REACT_APP_SERVER_URL}/api/v1/articles`,
})

export const CommentApi = axios.create({
    baseURL: `${process.env.REACT_APP_SERVER_URL}/api/v1/comments`,
})