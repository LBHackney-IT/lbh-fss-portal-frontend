import axios from "axios";

const AuthenticationService = {
  async register(name, email, password) {
    try {
      const { data } = await axios.post("/api/registration", {
        name,
        email,
        password,
      });

      return data;
    } catch (error) {
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
