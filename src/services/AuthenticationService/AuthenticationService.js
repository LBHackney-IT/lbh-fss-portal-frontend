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
};

export default AuthenticationService;
