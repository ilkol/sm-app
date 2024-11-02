import axios from "axios";

export const axiosServer = axios.create({
    baseURL: 'https://api.space-manager.ru',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `SecKey a65860fff959423f30b5131d5d4c58a7`
    }
});

axiosServer.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
)

export const makeRequest = async (
    method: string,
    url: string,
    params?: { [key: string]: unknown}
) => {
    try {
        const response = await axiosServer({
          method: method,
          url: url,
          data: params,
        });
        return response.data;
      } catch (e) {
        return Promise.reject(e);
      }
};

