import axios from 'axios'


const API = axios.create({ baseURL: 'http://localhost:5000' });

export const getTimelinePosts= (id)=> API.get(`/post/${id}/timeline`);
export const likePost=(id, userId)=>API.put(`post/${id}/like`, {userId: userId});
export const editPost = (id, updatedData) => API.put(`/post/${id}`, updatedData);
export const retractPost = (id, userId) => API.put(`/post/${id}/retract`, { userId });
export const deletePost = (id, userId) => API.delete(`/post/${id}`, { data: { userId } });

