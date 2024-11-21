import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.100.229:5000",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("authToken"); // Using localStorage instead of AsyncStorage for web
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for logging and error handling
api.interceptors.response.use(
  (response) => {
    console.log("Response:", response);
    return response;
  },
  (error) => {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "An unknown error occurred";
    return Promise.reject(new Error(errorMessage));
  }
);

// Generic API call function
const callApi = async <D = any, R = any>({
  url,
  method = "get",
  data,
  params,
}: {
  url: string;
  method?: "get" | "post" | "put" | "patch" | "delete";
  data?: D;
  params?: Record<string, any>;
}): Promise<R> => {
  try {
    const response = await api.request<R>({
      url,
      method,
      data,
      params,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default {
  callApi,
};
