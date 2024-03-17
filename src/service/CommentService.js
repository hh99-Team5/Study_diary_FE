import { CommentApi } from "../axios/api";
import { ArticleApi } from "../axios/api";

export const updateComment = (id, data, headers) => CommentApi.put(`/${id}`, data, headers)

export const deleteComment = (id, headers) => CommentApi.delete(`/${id}`, headers)

export const commentList = (id) => CommentApi.get(`/${id}`)

export const createComment = (id, headers) => ArticleApi.post(`/${id}/comments`, headers);