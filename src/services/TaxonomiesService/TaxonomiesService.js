import BASE_API_URL from "../../settings/baseApiUrl";
import axios from "axios";

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
};

export default TaxonomiesService;
