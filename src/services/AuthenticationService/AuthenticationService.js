import axios from "axios";

const AuthenticationService = {
  async login(email, password) {
    try {
      await axios.post("/api/sessions", { email, password });

      return true;
    } catch (error) {
      return false;
    }
  },
  async me() {
    try {
      await axios.post("/api/me");

      return true;
    } catch (error) {
      return false;
    }
  },
};

export default AuthenticationService;
