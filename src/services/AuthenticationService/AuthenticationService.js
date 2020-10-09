import axios from "axios";
import API_KEY from "../../settings/apiKey";

const AuthenticationService = {
  async register(name, email, password) {
    try {
      const response = await axios.post(
        "api/registration",
        {
          name: name,
          email: email,
          password: password,
        },
        {
          headers: {
            "x-api-key": API_KEY,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (error) {
      return false;
    }
  },
  async registerConfirmation(email, code) {
    try {
      const response = await axios.post(
        "api/registration/confirmation",
        {
          email: email,
          code: code,
        },
        {
          headers: {
            "x-api-key": API_KEY,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (error) {
      return false;
    }
  },
  async resendRegisterConfirmation(email) {
    try {
      await axios.post(
        "api/registration/confirmation/resend",
        {
          email: email,
        },
        {
          headers: {
            "x-api-key": API_KEY,
            "Content-Type": "application/json",
          },
        }
      );

      return true;
    } catch (error) {
      return false;
    }
  },
  async login(email, password) {
    try {
      await axios.post(
        "api/session",
        { email: email, password: password },
        {
          headers: {
            "x-api-key": API_KEY,
            "Content-Type": "application/json",
          },
        }
      );

      return true;
    } catch (error) {
      return false;
    }
  },
  async me() {
    try {
      const response = await axios.get("api/account", {
        headers: {
          "x-api-key": API_KEY,
        },
      });

      return response.data;
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
      await axios.post(
        "api/password-recovery",
        {
          email: email,
        },
        {
          headers: {
            "x-api-key": API_KEY,
            "Content-Type": "application/json",
          },
        }
      );
      return true;
    } catch (error) {
      return false;
    }
  },
  async passwordRecoveryConfirmation(email, code, password) {
    try {
      await axios.post(
        "api/password-recovery/confirmation",
        {
          email: email,
          code: code,
          password: password,
        },
        {
          headers: {
            "x-api-key": API_KEY,
            "Content-Type": "application/json",
          },
        }
      );

      return true;
    } catch (error) {
      return false;
    }
  },
};

export default AuthenticationService;
