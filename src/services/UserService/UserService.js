import axios from "axios";
import API_KEY from "../../settings/apiKey";
import BASE_API_URL from "../../settings/baseApiUrl";

const UserService = {
  async retrieveUsers(
    sort = "name",
    direction = "asc",
    offset = 0,
    limit = 10,
    search = ""
  ) {
    try {
      // TODO: Mock API
      const response = await axios.get("/api/users", {
        params: {
          sort: sort,
          direction: direction,
          offset: offset,
          limit: limit,
          search: search,
        },
      });

      return response.data;

      // // TODO: Live API
      // const response = await axios.get(
      //   "/api/users",
      //   {
      //     data: {
      //       sort: sort,
      //       direction: direction,
      //       offset: offset,
      //       limit: limit,
      //       search: search,
      //     },
      //     params: {
      //       sort,
      //       direction,
      //       offset,
      //       limit,
      //       search,
      //     },
      //   },
      //   {
      //     headers: {
      //       "x-api-key": API_KEY,
      //       "Content-Type": "application/json",
      //     },
      //   }
      // );

      // return response.data;
    } catch (error) {
      console.error(error);
      return false;
    }
  },
  async createUser(values) {
    try {
      // TODO: Mock API
      const response = await axios.post("/api/users", values);

      // TODO: Live API
      // const response = await axios.post(`${BASE_API_URL}/users`, values, {
      //   headers: {
      //     "x-api-key": API_KEY,
      //     "Content-Type": "application/json",
      //   },
      // });

      return response.data;
    } catch (error) {
      console.error(error);

      return false;
    }
  },
  async getUser(id) {
    try {
      // TODO: Mock API
      const response = await axios.get(`/api/users/${id}`);

      // TODO: Live API
      // const response = await axios.post(`${BASE_API_URL}/users/${id}`, {
      //   headers: {
      //     "x-api-key": API_KEY,
      //   },
      // });

      return response.data;
    } catch (error) {
      console.error(error);

      return false;
    }
  },
  async updateUser(id, values) {
    console.log("updateUser triggered");
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
