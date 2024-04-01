import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000/api";

export const sendRequest = async (method, route, body) => {
  const response = await axios.request({
    method: method,
    url: route,
    data: body,
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      Accept: "application/json",
    },
  });

  //   if (response.status === 401) {
  //     localStorage.removeItem("token");
  //   }

  return response;
};
