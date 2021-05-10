import axios from "axios";
const config = {
  init() {
    if (process.env.REACT_APP_ENV === "dev") {
      axios.defaults.baseURL = "http://localhost:8000";
    }
  },
};
export default config;
