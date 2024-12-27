import { baseParqueaderos } from "@/helpers/instances_routes";
import { fetchPut } from "@/helpers/request_functions";
const parkingService = {
  /**
   * Updates a parking space.
   * @param {string} token - The authentication token to include in the request.
   * @param {string} parkingId - The ID of the parking space to update.
   * @param {object} data - The data to update the parking space with.
   * @returns {Promise<object>} Promise that resolves with the updated parking space object.
   * @throws {Error} If there is an error with the request.
   */
  async updateParking(token, parkingId, data) {
    try {
      const response = await fetchPut(
        baseParqueaderos,
        `/actualizar-parqueadero/${parkingId}`,
        data,
        token,
      );
      return response.data;
    } catch (error) {
      console.error("Error:", error);
    }
  },
};

export default parkingService;
