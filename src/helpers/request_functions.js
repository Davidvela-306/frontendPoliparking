/* fetchGet, fetchPost, fetchPut, fetchDelete */
async function fetchPost(baseUrl, route, postData, token) {
  const response = await baseUrl.post(route, postData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
}

async function fetchGet(baseUrl, route, token) {
  const response = await baseUrl.get(route, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
}

async function fetchPut(baseUrl, route, putData, token) {
  const response = await baseUrl.put(route, putData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response;
}

async function fetchDelete(baseUrl, route, token) {
  const response = await baseUrl.delete(route, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
}
/* patch */

async function fetchPatch(baseUrl, route, patchData, token) {
  const response = await baseUrl.patch(route, patchData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
}

export { fetchGet, fetchPost, fetchPut, fetchDelete, fetchPatch };
