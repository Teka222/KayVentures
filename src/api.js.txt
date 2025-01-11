// src/api.js
import axios from "axios";

export const getToken = async () => {
  try {
    const response = await axios.post(
      "https://test.api.amadeus.com/v1/security/oauth2/token",
      new URLSearchParams({
        grant_type: "client_credentials",
        client_id: "Y9cFOqXFrxW3DhwRG7w5LKjo95jM4K6n", // Your API Key
        client_secret: "74ZYcvC4U42wbhnv", // Your API Secret
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return response.data.access_token; // Return the access token
  } catch (error) {
    console.error("Failed to get access token:", error);
    return null;
  }
};
