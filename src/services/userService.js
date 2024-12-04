import { baseUsuarios } from "@/helpers/instances_routes";
import { fetchGet } from "@/helpers/request_functions";
const userService = {
  async getUser({ token }) {
    try {
      const response = await fetchGet(baseUsuarios, "/perfil", token);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
};
export default userService;
