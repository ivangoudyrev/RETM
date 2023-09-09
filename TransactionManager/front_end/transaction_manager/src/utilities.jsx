import axios from 'axios';

export const api = axios.create({
    baseURL: "https://retm.goudycode.com/api/v1/",
    withCredentials: true,
});
