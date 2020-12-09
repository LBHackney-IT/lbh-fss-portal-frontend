import axios from "axios";
import API_KEY from "../../settings/apiKey";
import BASE_API_URL from "../../settings/baseApiUrl";

axios.defaults.withCredentials = true;

const ServiceService = {
  async retrieveServices({
    sort = "name",
    direction = "asc",
    offset = 0,
    limit = 10,
    search = "",
  }) {
    try {
      const response = await axios.get(`${BASE_API_URL}/services`, {
        params: {
          sort,
          direction,
          offset,
          limit,
          search,
        },
      });

      return response.data;
    } catch (error) {
      console.error(error);

      return false;
    }
  },
  async createService(values) {
    try {
      const response = await axios.post(`${BASE_API_URL}/services`, values, {
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
  async getService(id) {
    try {
      const response = await axios.get(`${BASE_API_URL}/services/${id}`);

      return response.data;
    } catch (error) {
      console.error(error);

      return false;
    }
  },
  async updateService(id, values) {
    try {
      const response = await axios.patch(
        `${BASE_API_URL}/services/${id}`,
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
  async deleteService(id) {
    try {
      await axios.delete(`${BASE_API_URL}/services/${id}`);

      return true;
    } catch (error) {
      console.error(error);

      return false;
    }
  },
  async findAddress(postcode) {
    try {
      const response = await axios.get(`${BASE_API_URL}/address-lookup`, {
        params: {
          postcode: postcode.replace(/ /g, ""),
        },
      });

      return response.data;
    } catch (error) {
      console.error(error);

      return false;
    }
  },
  async createServiceImage(id, image) {
    try {
      await axios.post(`${BASE_API_URL}/services/${id}/image`, image, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return true;
    } catch (error) {
      console.error(error);

      return false;
    }
  },
};

export default ServiceService;
