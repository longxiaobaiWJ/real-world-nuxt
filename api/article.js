import { request } from "@/plugins/request";

export const getArticles = (params) => {
    return request.get("/api/articles", { params });
}

export const feedArticles = (params) => {
    return request.get("/api/articles/feed", {params});
}

export const getArticleSingle = (slug) => {
    return request.get(`/api/articles/${slug}`);
}

export const updateArticle = (article) => {
    return request.put(`/api/articles/${article.slug}`, { article: article });
}

export const createArticle = (article) => {
    return request.post("/api/articles", { article: article });
}

export const deleteArticle = (slug) => {
    return request.delete(`/api/articles/${slug}`);
}

export const addFavoriteArticle = (slug) => {
    return request.post(`/api/articles/${slug}/favorite`);
}

export const delFavoriteArticle = (slug) => {
    return request.delete(`/api/articles/${slug}/favorite`);
}