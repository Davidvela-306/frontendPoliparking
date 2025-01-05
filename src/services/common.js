import { base } from "@/helpers/instances_routes";
import { fetchGet } from "@/helpers/request_functions";
const commonService = {
/*
async getGuardias({ token }) {
    try {
      const response = await fetchGet(baseAdmin, "/listar-guardias", token);
      return response.data;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  },
*/
  async validateRecoveryToken(token) {
    try {
      const response = await fetchGet(base, `localhost/administrador/recuperar-clave/${token}`);
      const response = await fetchGet(base, `localhost/guardias/recuperar-clave/${token}`);
      const response=await fetchGet(base, `localhost/recuperar-clave/${token}`);

          

      return response.data;
    } catch (error) {
      console.error(error);
    }
  },


};
export default commonService;
