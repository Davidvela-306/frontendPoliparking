/**
 * Performs a POST request to the specified route in the baseUrl.
 * @param {import('axios').AxiosInstance} baseUrl - The base URL to send the request to.
 * @param {string} route - The route to send the request to.
 * @param {Object} postData - The data to send with the request.
 * @param {string} token - The authentication token to include in the request.
 * @returns {Promise<import('axios').AxiosResponse>} The response from the server.
 */
async function fetchPost(baseUrl, route, postData, token) {
  const response = await baseUrl.post(route, postData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
}

/**
 * Performs a GET request to the specified route in the baseUrl.
 * @param {import('axios').AxiosInstance} baseUrl - The base URL to send the request to.
 * @param {string} route - The route to send the request to.
 * @param {string} token - The authentication token to include in the request.
 * @returns {Promise<import('axios').AxiosResponse>} The response from the server.
 */
async function fetchGet(baseUrl, route, token) {
  const response = await baseUrl.get(route, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
}

/**
 * Performs a PUT request to the specified route in the baseUrl.
 * @param {import('axios').AxiosInstance} baseUrl - The base URL to send the request to.
 * @param {string} route - The route to send the request to.
 * @param {Object} putData - The data to send with the request.
 * @param {string} token - The authentication token to include in the request.
 * @returns {Promise<import('axios').AxiosResponse>} The response from the server.
 */
async function fetchPut(baseUrl, route, putData, token) {
  const response = await baseUrl.put(route, putData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response;
}

/**
 * Performs a DELETE request to the specified route in the baseUrl.
 * @param {import('axios').AxiosInstance} baseUrl - The base URL to send the request to.
 * @param {string} route - The route to send the request to.
 * @param {string} token - The authentication token to include in the request.
 * @returns {Promise<import('axios').AxiosResponse>} The response from the server.
 */
async function fetchDelete(baseUrl, route, token) {
  const response = await baseUrl.delete(route, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
}
/* patch */

/**
 * Performs a PATCH request to the specified route in the baseUrl.
 * @param {import('axios').AxiosInstance} baseUrl - The base URL to send the request to.
 * @param {string} route - The route to send the request to.
 * @param {Object} patchData - The data to send with the request.
 * @param {string} token - The authentication token to include in the request.
 * @returns {Promise<import('axios').AxiosResponse>} The response from the server.
 */
async function fetchPatch(baseUrl, route, patchData, token) {
  const response = await baseUrl.patch(route, patchData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
}

export { fetchGet, fetchPost, fetchPut, fetchDelete, fetchPatch };
