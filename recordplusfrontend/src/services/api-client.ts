import axios from "axios";

// const URL = import.meta.env.DEV ? import.meta.env.VITE_API_BASE_URL : process.env.API_BASE_URL;
export const baseURL = import.meta.env.DEV ? import.meta.env.VITE_API_BASE_URL : process.env.API_BASE_URL;
export const reactBaseURL = import.meta.env.DEV ? import.meta.env.VITE_BASE_URL : process.env.BASE_URL;
let headers;

if (localStorage.getItem("access")) {
  headers = {
    'Authorization': `JWT ${localStorage.getItem("access")}`,
    'Content-Type': 'application/json'
  }
}

const axiosInstance = axios.create({
  baseURL,
  headers
});

class APIClient<T, Q> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  post = (data: Q) => {
    return axiosInstance
      .post<T>(this.endpoint, data)
      .then(res => res.data);
  };

  get = () => {
    return axiosInstance
      .get(this.endpoint)
      .then(res => res.data)
  }
}

export default APIClient;
