import axios from "axios";
import API_KEY from "../../settings/apiKey";
import BASE_API_URL from "../../settings/baseApiUrl";
// import qs from "qs";

const AuthenticationService = {
  async register(name, email, password) {
    try {
      // const options = {
      //   method: "post",
      //   url:
      //     "https://d20nspk61k.execute-api.eu-west-2.amazonaws.com/development/api/v1/registration",
      //   headers: {
      //     "x-api-key": "3TqLIQo223anJJyIwM3tW7IysijNlDAsaMNilvcQ",
      //     "Content-Type": "application/json",
      //   },
      //   data: {
      //     name: "Finn",
      //     email: "Williams",
      //     password: "password",
      //   },
      //   transformRequest: [
      //     (data, headers) => {
      //       // transform the data

      //       return data;
      //     },
      //   ],
      // };
      // const { data } = axios(options);

      const { data } = await axios.post(
        "https://d20nspk61k.execute-api.eu-west-2.amazonaws.com/development/api/v1/registration",
        {
          headers: {
            "x-api-key": "3TqLIQo223anJJyIwM3tW7IysijNlDAsaMNilvcQ",
            "Content-Type": "application/json",
          },
          params: {
            name,
            email,
            password,
          },
        }
      );

      console.log(data);

      return data;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  async registerConfirmation(email, code) {
    try {
      const { data } = await axios.post("/api/registration/confirmation", {
        email,
        code,
      });

      return data;
    } catch (error) {
      return false;
    }
  },
  async resendRegisterConfirmation(email) {
    try {
      const { data } = await axios.post(
        "/api/registration/confirmation/resend-request",
        {
          email,
        }
      );

      return data;
    } catch (error) {
      return false;
    }
  },
  async login(email, password) {
    try {
      const { data } = await axios.post("/api/session", { email, password });

      return data;
    } catch (error) {
      return false;
    }
  },
  async me() {
    try {
      const { data } = await axios.get("/api/account");

      return data;
    } catch (error) {
      return false;
    }
  },
  async logout() {
    try {
      await axios.post("/api/logout");

      return true;
    } catch (error) {
      return false;
    }
  },
  async passwordRecovery(email) {
    try {
      await axios.post("/api/password-recovery", { email });

      return true;
    } catch (error) {
      return false;
    }
  },
  async passwordRecoveryConfirmation(email, code, password) {
    try {
      await axios.post("/api/password-recovery/confirmation", {
        email,
        code,
        password,
      });

      return true;
    } catch (error) {
      return false;
    }
  },
};

export default AuthenticationService;
