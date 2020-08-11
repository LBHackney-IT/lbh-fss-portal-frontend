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
  async addUser({ name, email, organisationName, roles }) {
    try {
      const response = await axios.post("/api/users", {
        name,
        email,
        roles,
        organisation: {
          name: organisationName,
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
