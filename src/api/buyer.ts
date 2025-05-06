import { API_BASE_URLS } from "./config";

// Define the structure of the registration data
interface BuyerRegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  businessName: string;
  address: string;
}

// Define the structure for API error responses (adjust as needed)
interface ApiErrorResponse {
  message?: string;
  errors?: Record<string, string[]>; // Example structure for validation errors
}

/**
 * Registers a new buyer business.
 * @param data - The registration data for the buyer.
 * @returns A promise that resolves on success, rejects with an error message or object on failure.
 */
export const registerBuyer = async (
  data: BuyerRegistrationData
): Promise<void> => {
  const url = `${API_BASE_URLS.buyerBusiness}/register`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      // Attempt to parse error details from the response body
      const errorData: ApiErrorResponse = await response
        .json()
        .catch(() => ({})); // Default to empty object if JSON parsing fails

      console.error("Buyer registration failed:", response.status, errorData);

      // Construct a meaningful error message
      let errorMessage = `API Error: ${response.status}`;
      if (errorData.message) {
        errorMessage = errorData.message;
      } else if (errorData.errors) {
        // Combine validation errors if present
        errorMessage = Object.entries(errorData.errors)
          .map(([field, messages]) => `${field}: ${messages.join(", ")}`)
          .join("; ");
      }

      throw new Error(errorMessage);
    }

    // Optionally process successful response data if the API returns any
    // const responseData = await response.json();
    console.log("Buyer registration successful:", response.status);
  } catch (error) {
    // Handle network errors or errors thrown from the !response.ok block
    console.error("Error during buyer registration:", error);

    // Re-throw the error to be caught by the calling function
    // If it's a generic Error (like network error), keep its message,
    // otherwise, use the custom message created above.
    if (error instanceof Error) {
      throw error; // Keep original error message for network/fetch issues
    } else {
      // This case might not be reached often with the current try/catch
      throw new Error("An unexpected error occurred during registration.");
    }
  }
}; 