import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

export const tokenBind = (token) => {
  API.interceptors.request.use((req) => {
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
  });
};

// tokenBind(token1);

export const fetchPosts = async () => {
  const { data } = await API.get("/posts");
  return data;
};
export const createPost = async (token, newPost, id) => {
  tokenBind(token);
  const data = await API.post(`/requests/scheme/createPost/${id}`, newPost);
  return data;
};
export const makeRequest = async (token, newRequest, id) => {
  tokenBind(token);
  const data = await API.post(`/posts/request/${id}`, newRequest);
  return data;
};
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const updatePost = (id, updatedPost) =>
  API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const createScheme = async (newScheme, token) => {
  tokenBind(token);
  const data = await API.post("/requests/scheme", newScheme);
  return data;
};

export const getSchemes = async (token) => {
  tokenBind(token);
  const { data } = await API.get("/requests/scheme/get");
  return data;
};

export const getUsersRequests = async (token) => {
  tokenBind(token);
  const { data } = await API.get("/requests/scheme/getRequests");
  return data;
}
export const getRequest = async (token, id) => {
  tokenBind(token);
  const { data } = await API.get(`/requests/scheme/getRequest/${id}`);
  return data;
}

export const proceedRequest = async (token, id, requestdata) => {
  tokenBind(token);
  const { data } = await API.patch(`/requests/scheme/proceedRequest/${id}`, requestdata);
  return data;
}
export const signIn = (formData) => API.post("/user/signin", formData);
export const signUp = (formData) => API.post("/user/signup", formData);

export const getNameById = async (id) => {
  const { data } = await API.get(`/user/getNameById/${id}`);
  return data;
}