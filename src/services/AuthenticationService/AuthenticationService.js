import axios from "axios";
import API_KEY from "../../settings/apiKey";
import BASE_API_URL from "../../settings/baseApiUrl";

const AuthenticationService = {
  async register(name, email, password) {
    try {
      // TODO: Live API
      const response = await axios.post(
        `${BASE_API_URL}/registration`,
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

      console.log(response);

      return response.data;
    } catch (error) {
      return false;
    }
  },
  async registerConfirmation(email, code) {
    try {
      // TODO: Live API
      const response = await axios.post(
        `${BASE_API_URL}/registration/confirmation`,
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
      // TODO: Live API
      await axios.post(
        `${BASE_API_URL}/registration/confirmation/resend`,
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
      // TODO: Live API
      await axios.post(
        `${BASE_API_URL}/session`,
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
      // TODO: Mock API
      const response = await axios.get("/api/account");

      return response.data;

      // TODO: Live API
      // const response = await axios.get(`${BASE_API_URL}/account`, {
      //   headers: {
      //     "x-api-key": API_KEY,
      //   },
      // });

      // return response.data;
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
    // TODO: Mock API
    try {
      await axios.post("api/password-recovery", { email: email });
      console.log("pass");
      return true;
    } catch (error) {
      console.log("fail");
      return false;
    }

    // TODO: Live API
    // try {
    //   await axios.post(
    //     `${BASE_API_URL}/password-recovery`,
    //     {
    //       email: email,
    //     },
    //     {
    //       headers: {
    //         "x-api-key": API_KEY,
    //         "Content-Type": "application/json",
    //       },
    //     }
    //   );
    //   console.log("pass");
    //   return true;
    // } catch (error) {
    //   console.log("fail");
    //   return false;
    // }
  },
  async passwordRecoveryConfirmation(email, code, password) {
    // TODO: Mock API
    try {
      await axios.post("api/password-recovery/confirmation", {
        email: email,
        code: code,
        password: password,
      });
      console.log("pass");
      return true;
    } catch (error) {
      console.log("fail");
      return false;
    }

    // TODO: Live API
    // try {
    //   await axios.post(
    //     `${BASE_API_URL}/password-recovery/confirmation`,
    //     {
    //       email: email,
    //       code: code,
    //       password: password,
    //     },
    //     {
    //       headers: {
    //         "x-api-key": API_KEY,
    //         "Content-Type": "application/json",
    //       },
    //     }
    //   );

    //   return true;
    // } catch (error) {
    //   return false;
    // }
  },
};

export default AuthenticationService;
