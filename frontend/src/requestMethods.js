import axios from "axios";

 export const BASE_URL = "http://localhost:5000";


const user = JSON.parse(localStorage.getItem("user"));
const TOKEN = user?.token;

// const currentUser = user && JSON.parse(user);

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});