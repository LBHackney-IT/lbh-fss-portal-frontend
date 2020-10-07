import axios from "axios";

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
      // TODO: Mock API
      const response = await axios.get("/api/organisations", {
        params: {
          sort,
          direction,
          offset,
          limit,
          search,
          created_before,
          created_after,
          submitted_before,
          submitted_after,
          reviewed_before,
          reviewed_after,
        },
      });

      // TODO: Live API
      // const response = await axios.get(
      // `${BASE_API_URL}/organisations`, {
      //   params: {
      //     sort: sort,
      //     direction: direction,
      //     offset: offset,
      //     limit: limit,
      //     search: search,
      //     created_before: created_before,
      //     created_after: created_after,
      //     submitted_before: submitted_before,
      //     submitted_after: submitted_after,
      //     reviewed_before: reviewed_before,
      //     reviewed_after: reviewed_after,
      //   },
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
  async createOrganisation(values) {
    try {
      // TODO: Mock API
      const response = await axios.post("/api/organisations", values);

      // TODO: Live API
      // const response = await axios.post(
      //   `${BASE_API_URL}/organisations`,
      //   values,
      //   {
      //     headers: {
      //       "x-api-key": API_KEY,
      //       "Content-Type": "application/json",
      //     },
      //   }
      // );

      return response.data;
    } catch (error) {
      console.error(error);

      return false;
    }
  },
  async getOrganisation(id) {
    try {
      // TODO: Mock API
      const response = await axios.get(`/api/organisations/${id}`);

      // TODO: Live API
      // const response = await axios.get(`${BASE_API_URL}/organisations/${id}`, {
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
  async updateOrganisation(id, values) {
    try {
      // TODO: Mock API
      const response = await axios.patch(`/api/organisations/${id}`, values);

      // TODO: Live API
      // const response = await axios.patch(
      //   `${BASE_API_URL}/organisations/${id}`,
      //   values
      // );

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
