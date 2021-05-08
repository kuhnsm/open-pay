import axios from "axios";
const config = {
  init() {
    if (process.env.REACT_APP_ENV === "dev") {
      axios.defaults.baseURL = "http://localhost:8000";
    }
  },
};
if (process.env.REACT_APP_ENV === "dev") {
  console.log(config);
}
export default config;
