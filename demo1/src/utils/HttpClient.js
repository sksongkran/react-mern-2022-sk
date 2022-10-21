import axios from "axios";
import join from "url-join";
import { server, apiUrl, NOT_CONNECT_NETWORK, NETWORK_CONNECTION_MESSAGE } from "../constants";
import { store } from "../store/store";
import { logout, relogin } from "../store/slices/authSlice";

const isAbsoluteURLRegex = /^(?:\w+:)\/\//;

axios.interceptors.request.use(async (config) => {
  if (!isAbsoluteURLRegex.test(config.url)) {
    config.url = join(apiUrl, config.url);
  }

  const userToken = localStorage.getItem(server.TOKEN_KEY);
  if (userToken) {
    config.headers = { Authorization: `Bearer ${userToken}` };
  }
  config.timeout = 10000; // 10 Second
  return config;
});

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // const { dispatch } = store;
    console.log(JSON.stringify(error, undefined, 2));

    if (error.response.status === 401) {
      const refreshToken = localStorage.getItem(server.REFRESH_TOKEN_KEY);
      const refreshUrl = `${apiUrl}/${server.REFRESH_TOKEN_URL}`;
      let result = await axios.post(refreshUrl, { refreshToken });

      const token = result.data.jwt;
      localStorage.setItem(server.TOKEN_KEY, token);
      store.dispatch(relogin());

      return axios.request(error.config);
    } else if (error.response.status === 403) {
      store.dispatch(logout());
    }

    if (axios.isCancel(error)) {
      return Promise.reject(error);
    } else if (!error.response) {
      alert(JSON.stringify(error));
      return Promise.reject({
        code: NOT_CONNECT_NETWORK,
        message: NETWORK_CONNECTION_MESSAGE,
      });
    }
    return Promise.reject(error);
  }
);

export const httpClient = axios;
