import axios from "axios";
import BASE_API_URL from "../../settings/baseApiUrl";

axios.defaults.withCredentials = true;

const AnalyticsService = {
  async retrieveAnalytics({ id, from_date, to_date }) {
    try {
      const response = await axios.get(`${BASE_API_URL}/analytics-event`, {
        params: {
          organisationId: id,
          from_date: from_date,
          to_date: to_date,
        },
        headers: {
          //"x-api-key": API_KEY,
        },
      });

      return response.data;
    } catch (error) {
      console.error(error);

      return false;
    }
  },
};

export default AnalyticsService;
