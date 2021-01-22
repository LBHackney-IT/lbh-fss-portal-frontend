import BASE_API_URL from "../../settings/baseApiUrl";
import axios from "axios";
import API_KEY from "../../settings/apiKey";

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
      await axios.delete(`${BASE_API_URL}/taxonomies/${id}`, {
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

export default TaxonomiesService;
