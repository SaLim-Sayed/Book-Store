import axios from "axios"; 

export const APP_API = "https://ecommerce-api-v1.vercel.app/";
export const axiosInstance = axios.create({
  baseURL: APP_API,
});
 