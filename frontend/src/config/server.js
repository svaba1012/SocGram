import axios from "axios";

const serverDomain = "http://localhost:5000";

const server = axios.create({ baseURL: serverDomain });

export default server;
