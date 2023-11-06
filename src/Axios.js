import axios from "axios";

const Axios = axios.create({
  baseURL: process.env.REACT_APP_API_URL || `http://localhost:4000/api`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default Axios;
