import { baseGuardias } from "@/helpers/instances_routes";
import {
  fetchGet,
  fetchPatch,
  fetchPost,
  fetchPut,
} from "@/helpers/request_functions";
const guardiaService = {
  async getUser({ token }) {
    try {
      const response = await fetchGet(baseGuardias, "/perfil", token);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
  async getExternalUsers({ token }) {
    try {
      const response = await fetchGet(baseGuardias, "/listar-usuarios", token);
      return response.data;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
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

  async confirmChangePassword(token) {
    try {
      const response = await fetchGet(baseGuardias, `recuperar-clave/${token}`);

      return response.data;
    } catch (error) {
      console.error("Error en la confirmación del token:", error);
      throw new Error("El token no es válido.");
    }
  },
  async recoverPassword(data, token) {
    try {
      const response = await fetchPut(
        baseGuardias,
        `/nueva-clave/${token}`,
        data,
      );
      return response.data;
    } catch (error) {
      console.error("Error:", error);
    }
  },
  async enableUsers(token) {
    try {
      const response = await fetchPatch(
        baseGuardias,
        "cambiar-estado-usuario",
        {},
        token,
      );
      return response.data;
    } catch (error) {
      console.error("Error:", error);
    }
  },
 
};
export default guardiaService;
