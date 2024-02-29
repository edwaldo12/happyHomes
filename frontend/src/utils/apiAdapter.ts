import axios, { AxiosInstance } from "axios";

export default function apiAdapter(baseUrl: string): AxiosInstance {
  return axios.create({
    baseURL: baseUrl,
    timeout: 5000,
  });
}
