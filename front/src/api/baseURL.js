import axios from "axios";

const baseUrl = axios.create({ baseURL: "http://localhost:8082/api" });

export default baseUrl;
