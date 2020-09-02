import { request } from "@/plugins/request";

export const login = (user) => {
    return request.post("/api/users/login", { user: user });
}

export const register = (user) => {
    return request.post("/api/users", { user: user });
}

export const obtainUser = () => {
    return request.get("/api/user");
}

export const updateUser = (user) => {
    return request.put("/api/user", { user: user });
}

export const obtainProfile = (username) => {
    return request.get(`/api/profiles/${username}`);
}

export const followUser = (username) => {
    return request.post(`/api/profiles/${username}/follow`);
}

export const unFollowUser = (username) => {
    return request.delete(`/api/profiles/${username}/follow`);
}