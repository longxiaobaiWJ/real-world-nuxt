import { request } from "@/plugins/request";

export const createCommentArticle = (slug, params = {}) => {
    return request.post(`/api/articles/${slug}/comments`, params);
}

export const getCommentArticle = (slug) => {
    return request.get(`/api/articles/${slug}/comments`);
}

export const delCommentArticle = ({ slug, id }) => {
    return request.delete(`/api/articles/${slug}/comments/${id}`);
}