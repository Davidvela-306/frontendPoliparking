import { base, baseUsuarios } from "@/helpers/instances_routes";
import { fetchGet, fetchPut } from "@/helpers/request_functions";
const userService = {
  async getUser({ token }) {
    try {
      const response = await fetchGet(baseUsuarios, "/perfil", token);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
  async confirmChangePassword(token) {
    try {
      const response = await fetchGet(base, `recuperar-clave/${token}`);
      return response.data;
    } catch (error) {
      console.error("Error en la confirmación del token:", error);
      throw new Error("El token no es válido.");
    }
  },
  async recoverPassword(data, token) {
    try {
      const response = await fetchPut(base, `/nueva-clave/${token}`, data);

      return response.data;
    } catch (error) {
      console.error("Error:", error);
    }
  },
};
export default userService;
