import axios from "axios";

const authEndpoint = "https://accounts.spotify.com/authorize?";
const clientId = "367ea4ca15a64c5597de192eb4075c8e";
const redirectUri = "http://localhost:3000/";
const scopes =
  "user-read-playback-state user-library-read playlist-read-private user-modify-playback-state user-follow-read user-library-modify user-top-read";
export const loginEndpoint = `${authEndpoint}client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes}&response_type=token&show_dialog=true`;

const apiClient = axios.create({ baseURL: "https://api.spotify.com/v1/" });

export const setClientToken = (token) => {
  apiClient.interceptors.request.use(async function (config) {
    config.headers.Authorization = "Bearer " + token;
    return config;
  });
};

export default apiClient;