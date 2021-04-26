import axios from "axios";
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
      });

      return response.data.users;
    } catch (error) {
      console.error(error);

      return false;
    }
  },
  async createUser(values) {
    try {
      const response = await axios.post(`${BASE_API_URL}/users`, values, {
        headers: {
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
      });

      return true;
    } catch (error) {
      console.error(error);

      return false;
    }
  },
  async resendAuthentication(id) {
    try {
      await axios.post(
        `${BASE_API_URL}/users/${id}/resend`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return true;
    } catch (error) {
      console.error(error);

      return false;
    }
  },
  async unlinkOrganisation(id) {
    try {
      await axios.delete(`${BASE_API_URL}/user-links/${id}`, {
      });

      return true;
    } catch (error) {
      console.error(error);

      return false;
    }
  },
  async linkOrganisation(values) {
    try {
      const response = await axios.post(`${BASE_API_URL}/user-links`, values, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return response.data;
    } catch (error) {
      console.error(error);

      return false;
    }
  },
};

export default UserService;
