import axios from "axios";
const instance = axios.create({
  baseURL: "http://localhost:5000/redroom-809d5/us-central1/api",
});

instance.defaults.headers.common["Authorization"] =
  "Bearer " + localStorage.getItem("token");

export default instance;
