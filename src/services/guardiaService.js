import { baseGuardias } from "@/helpers/instances_routes";
import { fetchGet } from "@/helpers/request_functions";
const getUser = async ({ token }) => {
  try {
    const response = await fetchGet(baseGuardias, "/perfil", token);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export default { getUser };
