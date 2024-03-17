import { memberApi } from "../axios/api";

export const memberLogin = async (user) => await memberApi.post('/signin',user);

export const emailDuplicateCheck = async (email) => await memberApi.get(`/email-check?email=${email}`);

export const registerMember = async (user) => await memberApi.post('/signup',user);

export const searchMember = async (headers) => await memberApi.get('', headers);

export const updateMember = async (updateInfo, headers) => await memberApi.put('', updateInfo, headers);

export const memberDiaries = async (headers) => await memberApi.get('/articles', headers);