import axios from "axios";
import BASE_API_URL from "../../settings/baseApiUrl";

axios.defaults.withCredentials = true;

const AuthenticationService = {
  async register(name, email, password) {
    try {
      const response = await axios.post(
        `${BASE_API_URL}/registration`,
        {
          name: name,
          email: email,
          password: password,
        },
        {
          headers: {
            ////"x-api-key": API_KEY,
            "Content-Type": "application/json",
          },
        }
      );

      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, data: error.response.data };
    }
  },
  async registerConfirmation(email, code) {
    try {
      const response = await axios.post(
        `${BASE_API_URL}/registration/confirmation`,
        {
          email: email,
          code: code,
        },
        {
          headers: {
            ////"x-api-key": API_KEY,
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
        `${BASE_API_URL}/registration/confirmation/resend-request`,
        {
          email: email,
        },
        {
          headers: {
            //"x-api-key": API_KEY,
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
        `${BASE_API_URL}/session`,
        { email: email, password: password },
        {
          headers: {
            //"x-api-key": API_KEY,
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
      const response = await axios.get(`${BASE_API_URL}/account`, {
        headers: {
          //"x-api-key": API_KEY,
        },
      });

      return response.data;
    } catch (error) {
      return false;
    }
  },
  async logout() {
    try {
      await axios.post(
        `${BASE_API_URL}/logout`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return true;
    } catch (error) {
      return false;
    }
  },
  async passwordRecovery(email) {
    try {
      await axios.post(
        `${BASE_API_URL}/password-recovery`,
        {
          email: email,
        },
        {
          headers: {
            //"x-api-key": API_KEY,
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
        `${BASE_API_URL}/password-recovery/confirmation`,
        {
          email: email,
          code: code,
          password: password,
        },
        {
          headers: {
            //"x-api-key": API_KEY,
            "Content-Type": "application/json",
          },
        }
      );

      return true;
    } catch (error) {
      return false;
    }
  },
  async invitationConfirmation(email, password, newPassword) {
    try {
      await axios.post(
        `${BASE_API_URL}/invitation/confirmation`,
        {
          email: email,
          password: password,
          newPassword: newPassword,
        },
        {
          headers: {
            //"x-api-key": API_KEY,
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
