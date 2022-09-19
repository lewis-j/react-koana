import axios from "axios";

const axios_instance = axios.create({
    baseURL: process.env.REACT_APP_KOANA_SQUARE_API,
});

export default axios_instance;
