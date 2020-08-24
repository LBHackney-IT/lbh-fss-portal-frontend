import axios from "axios";

const UserService = {
  async retrieveUsers({
    sort = "name",
    direction = "asc",
    offset = 0,
    limit = 10,
    search = "",
  }) {
    try {
      const response = await axios.get("/api/users", {
        params: {
          sort,
          direction,
          offset,
          limit,
          search,
        },
      });

      return response.data.entries;
    } catch (error) {
      console.error(error);

      return false;
    }
  },
  async createUser(values) {
    try {
      const response = await axios.post("/api/users", values);

      return response.data;
    } catch (error) {
      console.error(error);

      return false;
    }
  },
  async getUser(id) {
    try {
      const response = await axios.get(`/api/users/${id}`);

      return response.data;
    } catch (error) {
      console.error(error);

      return false;
    }
  },
  async updateUser(id, values) {
    try {
      const response = await axios.patch(`/api/users/${id}`, values);

      return response.data;
    } catch (error) {
      console.error(error);

      return false;
    }
  },
  async deleteUser(id) {
    try {
      await axios.delete(`/api/users/${id}`);

      return true;
    } catch (error) {
      console.error(error);

      return false;
    }
  },
};

export default UserService;
