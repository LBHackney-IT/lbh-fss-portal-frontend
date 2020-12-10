let BASE_API_URL = "";

const location = window.location.origin;

if (location.includes("find-support-services-admin.hackney")) {
  BASE_API_URL = `https://b56cfvfyb8.execute-api.eu-west-2.amazonaws.com/production`;
} else if (location.includes("find-support-services-staging-admin.hackney")) {
  BASE_API_URL = `https://fjilyjs06h.execute-api.eu-west-2.amazonaws.com/staging/api/v1`;
} else {
  BASE_API_URL = "/api";
} 

export default BASE_API_URL;
