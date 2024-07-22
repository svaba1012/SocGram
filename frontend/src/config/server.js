import axios from "axios";

const serverDomain =
  process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

const server = axios.create({ baseURL: serverDomain });

export default server;
