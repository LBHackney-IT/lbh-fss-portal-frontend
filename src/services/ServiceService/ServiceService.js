import axios from "axios";

const ServiceService = {
  async retrieveServices({
    sort = "name",
    direction = "asc",
    offset = 0,
    limit = 10,
    search = "",
  }) {
    try {
      const response = await axios.get("/api/services", {
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
  async createService(values) {
    try {
      const response = await axios.post("/api/services", values);

      return response.data;
    } catch (error) {
      console.error(error);

      return false;
    }
  },
  async getService(id) {
    try {
      const response = await axios.get(`/api/services/${id}`);

      return response.data;
    } catch (error) {
      console.error(error);

      return false;
    }
  },
  async updateService(id, values) {
    try {
      const response = await axios.patch(`/api/services/${id}`, values);

      return response.data;
    } catch (error) {
      console.error(error);

      return false;
    }
  },
  async deleteService(id) {
    try {
      await axios.delete(`/api/services/${id}`);

      return true;
    } catch (error) {
      console.error(error);

      return false;
    }
  },
  async findAddress(postcode) {
    try {
      const response = await axios.get(`/api/address-lookup`, postcode);

      return response.data;
    } catch (error) {
      console.error(error);

      return false;
    }
  },
};

export default ServiceService;
