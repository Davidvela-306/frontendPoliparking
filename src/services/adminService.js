import { fetchDelete, fetchPatch } from "@/helpers/request_functions";
import { baseAdmin, baseGuardias } from "@/helpers/instances_routes";
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
  async deleteExternalUser(token, userId) {
    console.log("eliminar usuario externo, llamada con parámetros:", token, userId);

    try {
      const response = await fetchDelete(
        baseAdmin,
        `/eliminar-usuario/${userId}`,
        token,
      );
      return response.data;
    } catch (error) {
      console.error("Error:", error);
    }
  },

  /**
   * Registers a new user on the external API.
   * @param {{ token: string, user: object }} params - Object containing the authentication token and the user object to register.
   * @returns {Promise<object>} Promise that resolves with the registered user object.
   * @throws {Error} If there is an error with the request.
   */

  // TODO : cambiar baseGuardias por baseAdmin
  async createExternalUser({ token, user }) {
    try {
      const response = await fetchPost(baseGuardias, "/registrar", user, token);
      return response.data;
    } catch (error) {
      console.error("Error:", error);
    }
  },

  /**
   * Retrieves a list of all users from the external API.
   * @param {{ token: string }} params - Object containing the authentication token.
   * @returns {Promise<object[]>} Promise that resolves with an array of user objects.
   * @throws {Error} If there is an error with the request.
   */
  async getGuardias({ token }) {
    try {
      const response = await fetchGet(baseAdmin, "/listar-guardias", token);
      return response.data;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  },

  /**
   * Registers a new guard on the platform.
   * @param {{ token: string, user: object }} params - Object containing the authentication token and the guard object to register.
   * @returns {Promise<object>} Promise that resolves with the registered guard object.
   * @throws {Error} If there is an error with the request.
   */
  async createGuardia({ token, user }) {
    try {
      const response = await fetchPost(
        baseAdmin,
        "/registrar-guardia",
        user,
        token,
      );
      return response.data;
    } catch (error) {
      console.error("Error:", error);
    }
  },

  /**
   * Deletes a guard from the platform.
   * @param {{ token: string, userId: string }} params - Object containing the authentication token and the ID of the guard to delete.
   * @returns {Promise<object>} Promise that resolves with the deleted guard object.
   * @throws {Error} If there is an error with the request.
   */
  async deleteGuardia(token, userId) {
    console.log("deleteGuardia llamada con parámetros:", token, userId);

    try {
      const response = await fetchDelete(
        baseAdmin,
        `/eliminar-guardia/${userId}`,
        token,
      );
      return response.data;
    } catch (error) {
      console.error("Error:", error);
    }
  },

  /**
   * Changes the state of a guard on the platform.
   *
   * @param {string} token - The authentication token.
   * @param {string} userId - The ID of the guard whose state is to be changed.
   * @param {boolean} state - The new state to be set for the guard.
   * @returns {Promise<object>} Promise that resolves with the updated guard object.
   * @throws {Error} If there is an error with the request.
   */
  async changeGuardiaState(token, userId, state) {
    console.log(
      "changeGuardiaState llamada con parámetros:",
      token,
      userId,
      state,
    );
    try {
      const response = await fetchPatch(
        baseAdmin,
        `/cambiar-estado-guardia/${userId}`,
        { estado: state.toString() },
        token,
      );
      return response.data;
    } catch (error) {
      console.error("Error:", error);
    }
  }
};

export default adminService;
