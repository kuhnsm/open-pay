import axios from "axios";

//axios.defaults.baseURL = "http://localhost:8000";

const config = {
  init() {
    axios.defaults.baseURL = "http://localhost:8000";
  },
};

export default config;
