import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL
});

export const fetchArticles = () => API.get("/articles");
export const fetchArticleVersion = (id) =>
  API.get(`/article-versions/${id}`);
