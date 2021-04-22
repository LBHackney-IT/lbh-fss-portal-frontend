import axios from "axios";
import API_KEY from "../../settings/apiKey";
import BASE_API_URL from "../../settings/baseApiUrl";

const TaxonomiesService = {
  async retrieveTaxonomies() {
    try {
      const response = await axios.get(`${BASE_API_URL}/taxonomies`);

      return response.data;
    } catch (error) {
      console.error(error);

      return false;
    }
  },
  async createTaxonomyTerm(term) {
    console.log(term);
    try {
      const response = await axios.post(`${BASE_API_URL}/taxonomies`, term, {
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
  async getTaxonomyTerm(id) {
    try {
      const response = await axios.get(`${BASE_API_URL}/taxonomies/${id}`, {
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
  async updateTaxonomyTerm(id, values) {
    console.log(values);
    try {
      const response = await axios.patch(
        `${BASE_API_URL}/taxonomies/${id}`,
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
  async deleteTaxonomyTerm(id) {
    try {
      const response = await axios.delete(`${BASE_API_URL}/taxonomies/${id}`, {
        headers: {
          "x-api-key": API_KEY,
        },
      });

      return {
        error: false,
        status: response.status,
      };
    } catch (error) {
      console.error(error);

      return {
        error: true,
        status: error.response.status,
      };
    }
  },
};

export default TaxonomiesService;
