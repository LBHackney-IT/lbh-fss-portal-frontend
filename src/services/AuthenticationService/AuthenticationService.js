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
      const { data } = await axios.get("/api/me");

      return data;
    } catch (error) {
      return false;
    }
  },
};

export default AuthenticationService;
