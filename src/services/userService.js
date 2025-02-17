import { base, baseUsuarios } from "@/helpers/instances_routes";
import { fetchGet, fetchPut } from "@/helpers/request_functions";
const userService = {
  async getUser({ token }) {
    const response = await fetchGet(baseUsuarios, "/perfil", token);
    return response.data;
  },
  async confirmChangePassword(token) {
    const response = await fetchGet(base, `recuperar-clave/${token}`);
    return response.data;
  },
  async recoverPassword(data, token) {
    const response = await fetchPut(base, `/nueva-clave/${token}`, data);
    return response.data;
  },
};
export default userService;
