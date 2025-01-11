import React, { useState } from "react";
import axios from "axios";
import { getToken } from "../api"; // Import the getToken function

const DestinationSearch = () => {
  const [destination, setDestination] = useState(""); // Store the destination
  const [results, setResults] = useState([]); // Store the search results
  const [error, setError] = useState(""); // Store the error message
  const [loading, setLoading] = useState(false); // Loading state to indicate the API call is in progress
  const [selectedDestination, setSelectedDestination] = useState(null); // Store the selected destination for details
  const [itinerary, setItinerary] = useState([]); // Store the selected destinations for the itinerary

  const handleSearch = async () => {
    if (destination.trim()) {
      setLoading(true); // Start loading indicator
      try {
        // Get the access token from the API
        const token = await getToken();
        if (!token) {
          setError("Failed to fetch destinations. Please try again.");
          setLoading(false); // Stop loading
          return;
        }

        // Make the API request to fetch destinations
        const response = await axios.get(
          `https://test.api.amadeus.com/v1/reference-data/locations?subType=CITY&keyword=${destination}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setResults(response.data.data || []); // Set the search results
        setError(""); // Clear any previous errors
      } catch (error) {
        console.error("Error fetching destinations:", error);
        setError("Failed to fetch destinations. Please try again."); // Set the error message
      } finally {
        setLoading(false); // Stop loading once the API call is complete
      }
    } else {
      setError("Please enter a destination."); // Display error if input is empty
    }
  };

  const handleDestinationClick = async (destinationId) => {
    // Find the selected destination
    const selected = results.find((result) => result.id === destinationId);
    setSelectedDestination(selected);
  };

  const handleAddToItinerary = (destination) => {
    // Add the selected destination to the itinerary
    setItinerary((prevItinerary) => [...prevItinerary, destination]);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Search for a Destination</h1>
      <input
        type="text"
        className="border p-2 w-full mb-4"
        value={destination}
        onChange={(e) => setDestination(e.target.value)} // Update the destination state
        placeholder="Enter a destination"
      />
      <button
        className="bg-blue-500 text-white p-2 w-full mb-4"
        onClick={handleSearch} // Trigger the search function when clicked
      >
        Search
      </button>

      {loading && <p>Loading...</p>} {/* Show loading text when data is being fetched */}
      {error && <p className="text-red-500">{error}</p>} {/* Display error if any */}
      
      {/* Show results if available */}
      {results.length > 0 && !loading && !error && (
        <ul className="space-y-2">
          {results.map((result) => (
            <li
              key={result.id}
              className="border p-4 rounded-md shadow-md bg-white"
            >
              {result.name} ({result.countryCode})
              <button
                className="ml-4 bg-green-500 text-white p-2"
                onClick={() => handleDestinationClick(result.id)}
              >
                View Details
              </button>
              <button
                className="ml-4 bg-yellow-500 text-white p-2"
                onClick={() => handleAddToItinerary(result)}
              >
                Add to Itinerary
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Show detailed information about the selected destination */}
      {selectedDestination && (
        <div className="mt-6 p-4 border bg-gray-100 rounded-md">
          <h2 className="text-xl font-bold">{selectedDestination.name}</h2>
          <p><strong>Country:</strong> {selectedDestination.countryCode}</p>
          <p><strong>Region:</strong> {selectedDestination.region}</p>
          <p><strong>Latitude:</strong> {selectedDestination.latitude}</p>
          <p><strong>Longitude:</strong> {selectedDestination.longitude}</p>
        </div>
      )}

      {/* Display the itinerary */}
      {itinerary.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-bold">Your Itinerary</h2>
          <ul>
            {itinerary.map((destination, index) => (
              <li key={index} className="border p-2 mt-2 rounded-md bg-gray-100">
                {destination.name} ({destination.countryCode})
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Display a message if no results are found */}
      {results.length === 0 && !loading && !error && (
        <p>No destinations found. Try a different search.</p>
      )}
    </div>
  );
};

export default DestinationSearch;
