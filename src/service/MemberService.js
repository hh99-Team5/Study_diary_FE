import { memberApi } from "../axios/api";

import { AuthHeader } from "./Cookie";

const userHeaders = AuthHeader();

export const memberLogin = async (user) => await memberApi.post('/signin',user);

export const emailDuplicateCheck = async (email) => await memberApi.get(`/email-check?email=${email}`);

export const registerMember = async (user) => await memberApi.post('/signup',user);

export const searchMember = async () => await memberApi.get('', userHeaders);

export const updateMember = async (updateInfo) => await memberApi.put('', updateInfo, userHeaders);

export const memberDiaries = async () => await memberApi.get('/articles', userHeaders);

export const passwordCheck = async (newData) => await memberApi.post('/signin', newData, userHeaders);