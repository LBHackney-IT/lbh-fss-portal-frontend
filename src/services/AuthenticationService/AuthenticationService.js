import axios from "axios";
import API_KEY from "../../settings/apiKey";
import BASE_API_URL from "../../settings/baseApiUrl";
// import qs from "qs";

const AuthenticationService = {
  async register(name, email, password) {
    try {
      const { data } = await axios.post(
        `${BASE_API_URL}/registration`,
        {
          name,
          email,
          password,
        },
        {
          headers: {
            "x-api-key": API_KEY,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(data);

      return data;
    } catch (error) {
      return false;
    }
  },
  async registerConfirmation(email, code) {
    try {
      const { data } = await axios.post(
        `${BASE_API_URL}/registration/confirmation`,
        {
          email,
          code,
        },
        {
          headers: {
            "x-api-key": API_KEY,
            "Content-Type": "application/json",
          },
        }
      );

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
