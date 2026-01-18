const API_BASE_URL = "http://localhost:8000/api/onboard";

export default class OnboardingService {
  // Fetch all onboarding requests
  static async getAll() {
    try {
      const response = await fetch(API_BASE_URL);
      if (!response.ok) throw new Error("Failed to fetch onboard requests");
      return await response.json();
    } catch (error) {
      console.error("OnboardingService.getAll error:", error);
      return [];
    }
  }

  // Add a new onboarding request
  static async create({ name, currentFloor, dropOffFloor }) {
    try {
      const response = await fetch(API_BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // use application/json
        },
        body: JSON.stringify({ name, currentFloor, dropOffFloor }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to create onboard request");
      }

      return await response.json();
    } catch (error) {
      console.error("OnboardingService.create error:", error);
      throw error;
    }
  }

  // Delete an onboarding request by id
  static async delete(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to delete onboard request");
      }

      return await response.json(); // { deleted: 1 }
    } catch (error) {
      console.error("OnboardingService.delete error:", error);
      throw error;
    }
  }
}
