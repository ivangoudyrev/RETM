import axios from 'axios';

export const api = axios.create({
    baseURL: "http://3.94.182.213/api/v1/"
});
