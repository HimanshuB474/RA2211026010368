import axios from "axios";

const API_BASE_URL = "https://your-api-url.com"; // Replace with the actual API URL

export const fetchUsers = async () => {
  const response = await axios.get(`${API_BASE_URL}/users`);
  return response.data;
};

export const fetchPosts = async () => {
  const response = await axios.get(`${API_BASE_URL}/posts`);
  return response.data;
};

export const fetchComments = async () => {
  const response = await axios.get(`${API_BASE_URL}/comments`);
  return response.data;
};
