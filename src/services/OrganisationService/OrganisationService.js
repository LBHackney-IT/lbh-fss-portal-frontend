import axios from "axios";
import API_KEY from "../../settings/apiKey";
import BASE_API_URL from "../../settings/baseApiUrl";

axios.defaults.withCredentials = true;

const OrganisationService = {
  async retrieveOrganisations({
    sort = "name",
    direction = "asc",
    offset = 0,
    limit = 10,
    search = "",
    created_before = "",
    created_after = "",
    submitted_before = "",
    submitted_after = "",
    reviewed_before = "",
    reviewed_after = "",
  }) {
    try {
      const response = await axios.get(`${BASE_API_URL}/organisations`, {
        params: {
          sort: sort,
          direction: direction,
          offset: offset,
          limit: limit,
          search: search,
          created_before: created_before,
          created_after: created_after,
          submitted_before: submitted_before,
          submitted_after: submitted_after,
          reviewed_before: reviewed_before,
          reviewed_after: reviewed_after,
        },
        headers: {
          "x-api-key": API_KEY,
        },
      });

      return response.data.organisations;
    } catch (error) {
      console.error(error);

      return false;
    }
  },
  async createOrganisation(values) {
    try {
      const response = await axios.post(
        `${BASE_API_URL}/organisations`,
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
  async getOrganisation(id) {
    try {
      const response = await axios.get(`${BASE_API_URL}/organisations/${id}`, {
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
  async updateOrganisation(id, values) {
    try {
      const response = await axios.patch(
        `${BASE_API_URL}/organisations/${id}`,
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
  async deleteOrganisation(id) {
    try {
      await axios.delete(`${BASE_API_URL}/organisations/${id}`, {
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
};

export default OrganisationService;
