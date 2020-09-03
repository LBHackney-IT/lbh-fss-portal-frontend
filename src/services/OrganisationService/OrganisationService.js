import axios from "axios";

const OrganisationService = {
  async retrieveOrganisation({
    sort = "name",
    direction = "asc",
    offset = 0,
    limit = 10,
    search = "",
  }) {
    try {
      const response = await axios.get("/api/organisations", {
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
  async createOrganisation(values) {
    try {
      const response = await axios.post("/api/organisations", values);

      return response.data;
    } catch (error) {
      console.error(error);

      return false;
    }
  },
  async getOrganisation(id) {
    try {
      const response = await axios.get(`/api/organisations/${id}`);

      return response.data;
    } catch (error) {
      console.error(error);

      return false;
    }
  },
  async updateOrganisation(id, values) {
    try {
      const response = await axios.patch(`/api/organisations/${id}`, values);

      return response.data;
    } catch (error) {
      console.error(error);

      return false;
    }
  },
  async deleteOrganisation(id) {
    try {
      await axios.delete(`/api/organisations/${id}`);

      return true;
    } catch (error) {
      console.error(error);

      return false;
    }
  },
};

export default OrganisationService;
