import axios from "axios";

const baseUrl = axios.create({ baseURL: "http://localhost:8081/api" });

export default baseUrl;
