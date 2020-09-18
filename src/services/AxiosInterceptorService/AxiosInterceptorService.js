import axios from "axios";
import { navigate } from "@reach/router";

const AxiosInterceptorService = {
  setupInterceptors() {
    axios.interceptors.response.use(
      function (response) {
        return response;
      },
      function (error) {
        if (401 === error.response.status) {
          navigate("/");
        }

        return Promise.reject(error);
      }
    );
  },
};

export default AxiosInterceptorService;
