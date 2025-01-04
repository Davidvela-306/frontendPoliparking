import { baseGuardias } from "@/helpers/instances_routes";
import { fetchGet, fetchPatch, fetchPost } from "@/helpers/request_functions";
const guardiaService = {
  async getUser({ token }) {
    try {
      const response = await fetchGet(baseGuardias, "/perfil", token);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
  async createExternalUser({ token, user }) {
    try {
      const response = await fetchPost(baseGuardias, "/registrar", user, token);
      return response.data;
    } catch (error) {
      console.error("Error:", error);
    }
  },

  async changeStatus(token, parkingId, data) {
    try {
      const response = await fetchPatch(
        baseGuardias,
        `/parqueaderos/${parkingId}`,
        data,
        token,
      );
      return response.data;
    } catch (error) {
      console.error("Error:", error);
    }
  },
  async changeSpecialSpace(token, parkingId, data) {
    try {
      const response = await fetchPatch(
        baseGuardias,
        `/parqueaderos-espacio/${parkingId}`,
        data,
        token,
      );
      return response.data;
    } catch (error) {
      console.error("Error:", error);
    }
  },
};
export default guardiaService;
