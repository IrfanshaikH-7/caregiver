// src/components/schedule/LocationMap.tsx
import React from "react";
import { location as locationIcon } from "../../assets";

interface LocationMapProps {
  location: {
    lat: number | null;
    long: number | null;
  };
  address?: string;
  title?: string;
}

const LocationMap: React.FC<LocationMapProps> = ({
  location,
  address,
  title = "Location",
}) => {
  const hasValidLocation =
    location && location.lat !== null && location.long !== null;

  // For a real implementation, you would use a mapping library like Google Maps, Mapbox, or Leaflet
  // This is a placeholder that shows the location information

  return (
    <div className="mt-4">
      {hasValidLocation ? (
        <div className="flex flex-col md:flex-row items-start border border-gray-200 rounded-lg overflow-hidden">
          {/* Google Maps iframe - smaller height and responsive width */}
          <div className="h-48 w-full md:w-1/2">
            <iframe
              title={`${title} Map`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${location.lat},${location.long}&zoom=15`}
              allowFullScreen
            ></iframe>
          </div>
          {/* Address on the right side for desktop, below for mobile */}
          <div className="p-4 bg-white w-full md:w-1/2">
            {address && (
              <div className="flex items-start">
                <img
                  src={locationIcon}
                  alt="location"
                  className="w-5 h-5 mt-1 mr-2"
                />
                <p className="text-gray-700">{address}</p>
              </div>
            )}
            <div className="text-sm text-gray-500 mt-2">
              Coordinates: {location.lat}, {location.long}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-gray-50 rounded-lg p-4 text-center">
          <img
            src={locationIcon}
            alt="location"
            className="w-8 h-8 mx-auto mb-2 opacity-50"
          />
          <p className="text-gray-500">No location data available</p>
        </div>
      )}
    </div>
  );
};

export default LocationMap;
