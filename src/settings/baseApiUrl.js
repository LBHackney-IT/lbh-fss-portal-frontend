let BASE_API_URL = "";

if (window.location.origin.search("localhost:3000") === -1) {
  // BASE_API_URL = `${window.location.origin}/api/v1`;
  BASE_API_URL = `https://fjilyjs06h.execute-api.eu-west-2.amazonaws.com/staging/api/v1`;
} else {
  BASE_API_URL = "/api";
}

export default BASE_API_URL;
