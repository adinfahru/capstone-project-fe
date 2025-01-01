import axios from "axios";
const BASE_URL = "http://127.0.0.1:8000/";

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}api/accounts/login/`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response.data; // Mengembalikan pesan error dari backend
  }
};

export const register = async (formData) => {
  try {
    const response = await axios.post(`${BASE_URL}api/accounts/register/`, formData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};
