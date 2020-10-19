import axios from "axios";
import API_KEY from "../../settings/apiKey";
import BASE_API_URL from "../../settings/baseApiUrl";

axios.defaults.withCredentials = true;

const UserService = {
  async retrieveUsers(
    sort = "name",
    direction = "asc",
    offset = 0,
    limit = 10,
    search = ""
  ) {
    try {
      const response = await axios.get(`${BASE_API_URL}/users`, {
        params: {
          sort: sort,
          direction: direction,
          offset: offset,
          limit: limit,
          search: search,
        },
        headers: {
          "x-api-key": API_KEY,
        },
      });

      return response.data;
    } catch (error) {
      console.error(error);

      return false;
    }
  },
  async createUser(values) {
    try {
      const response = await axios.post(`${BASE_API_URL}/users`, values, {
        headers: {
          "x-api-key": API_KEY,
          "Content-Type": "application/json",
        },
      });

      return response.data;
    } catch (error) {
      console.error(error);

      return false;
    }
  },
  async getUser(id) {
    try {
      const response = await axios.get(`${BASE_API_URL}/users/${id}`, {
        headers: {
          "x-api-key": API_KEY,
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);

      return false;
    }
  },
  async updateUser(id, values) {
    try {
      const response = await axios.patch(
        `${BASE_API_URL}/users/${id}`,
        values,
        {
          headers: {
            "x-api-key": API_KEY,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error(error);

      return false;
    }
  },
  async deleteUser(id) {
    try {
      await axios.delete(`${BASE_API_URL}/users/${id}`, {
        headers: {
          "x-api-key": API_KEY,
        },
      });

      return true;
    } catch (error) {
      console.error(error);

      return false;
    }
  },
  async resendAuthentication(id) {
    try {
      await axios.post(`${BASE_API_URL}/users/${id}/resend`, {
        headers: {
          "x-api-key": API_KEY,
          "Content-Type": "application/json",
        },
      });

      return true;
    } catch (error) {
      console.error(error);

      return false;
    }
  },
};

export default UserService;
