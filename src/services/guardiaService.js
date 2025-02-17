import { baseGuardias } from "@/helpers/instances_routes";
import {
  fetchGet,
  fetchPatch,
  fetchPost,
  fetchPut,
} from "@/helpers/request_functions";
const guardiaService = {
  async getUser({ token }) {
    const response = await fetchGet(baseGuardias, "/perfil", token);
    return response.data;
  },
  async getExternalUsers({ token }) {
    const response = await fetchGet(baseGuardias, "/listar-usuarios", token);
    return response.data;
  },
  async createExternalUser({ token, user }) {
    const response = await fetchPost(baseGuardias, "/registrar", user, token);

    return response.data;
  },

  async changeStatus(token, parkingId, data) {
    const response = await fetchPatch(
      baseGuardias,
      `/parqueaderos/${parkingId}`,
      data,
      token,
    );
    return response.data;
  },
  async changeSpecialSpace(token, parkingId, data) {
    const response = await fetchPatch(
      baseGuardias,
      `/parqueaderos-espacio/${parkingId}`,
      data,
      token,
    );
    return response.data;
  },

  async confirmChangePassword(token) {
    const response = await fetchGet(baseGuardias, `recuperar-clave/${token}`);
    return response.data;
  },
  async recoverPassword(data, token) {
    const response = await fetchPut(
      baseGuardias,
      `/nueva-clave/${token}`,
      data,
    );
    return response.data;
  },
  async enableUsers(token) {
    const response = await fetchPatch(
      baseGuardias,
      "cambiar-estado-usuario",
      {},
      token,
    );
    return response.data;
  },
  async updateExternalUser(id, token, data) {
    const response = await fetchPut(
      baseGuardias,
      `/actualizar-usuarios/${id}`,
      data,
      token,
    );
    return response.data;
  },
};
export default guardiaService;
