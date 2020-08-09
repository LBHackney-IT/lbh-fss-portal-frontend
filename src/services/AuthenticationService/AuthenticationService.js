import axios from "axios";

const AuthenticationService = {
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
      const { data } = await axios.get("/api/me");

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
