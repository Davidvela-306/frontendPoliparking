import { fetchDelete } from "@/helpers/request_functions";
import { baseAdmin } from "@/helpers/instances_routes";
import { fetchGet, fetchPost } from "@/helpers/request_functions";
const adminService = {
  /**
   * Gets a list of users from the external API.
   * @param {{ token: string }} params - Object containing the authentication token.
   * @returns {Promise<Array<object>>} Promise that resolves with an array of user objects.
   * @throws {Error} If there is an error with the request.
   */
  async getExternalUsers({ token }) {
    try {
      const response = await fetchGet(baseAdmin, "/listar-usuarios", token);
      console.log(response);

      return response.data;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  },

  /**
   * Deletes a user from the external API.
   * @param {{ token: string, userId: string }} params - Object containing the authentication token and the ID of the user to delete.
   * @returns {Promise<object>} Promise that resolves with the deleted user object.
   * @throws {Error} If there is an error with the request.
   */
  async deleteExternalUser({ token, userId }) {
    try {
      const response = await fetchDelete(
        baseAdmin,
        `/eliminar-usuario/${userId}`,
        token,
      );

      return response.data;
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  },

  createExternalUser({ token, user }) {
    console.log("user", user);
    console.log("token", token);
    return fetchPost(baseAdmin, "/registrar-usuario", user, token);
  },
};

export default adminService;
