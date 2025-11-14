import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from "react-leaflet";
import { useState, useEffect, useCallback } from "react";
import { LatLng } from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import { debounce } from "lodash";

interface MapSelectorProps {
  onSelect: (latlng: LatLng) => void;
}

interface LocationSuggestion {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
}

const MapSelector = ({ onSelect }: MapSelectorProps) => {
  const [position, setPosition] = useState<LatLng | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const MapUpdater = ({ center }: { center: LatLng | null }) => {
    const map = useMap();
    useEffect(() => {
      if (center) {
        map.setView(center, map.getZoom());
      }
    }, [center, map]);
    return null;
  };

 
  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        setPosition(e.latlng);
        setSearchQuery("");
        setSuggestions([]);
        setIsDropdownOpen(false);
        onSelect(e.latlng);
      },
    });
    return position ? <Marker position={position} /> : null;
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchSuggestions = useCallback(
    debounce(async (query: string) => {
      if (query.length < 3) {
        setSuggestions([]);
        setIsDropdownOpen(false);
        return;
      }
      try {
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/search`,
          {
            params: {
              q: query,
              format: "json",
              limit: 5,
            },
            headers: {
              "User-Agent": "CosmicProfileApp/1.0",
            },
          }
        );
        setSuggestions(response.data);
        setIsDropdownOpen(true);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        setSuggestions([]);
        setIsDropdownOpen(false);
      }
    }, 300),
    []
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    fetchSuggestions(query);
  };

  const handleSuggestionSelect = (suggestion: LocationSuggestion) => {
    const lat = parseFloat(suggestion.lat);
    const lon = parseFloat(suggestion.lon);
    if (isNaN(lat) || isNaN(lon)) {
      console.error("Invalid coordinates:", suggestion);
      return;
    }
    const newPosition = new LatLng(lat, lon);
    setPosition(newPosition);
    setSearchQuery(suggestion.display_name);
    setSuggestions([]);
    setIsDropdownOpen(false);
    onSelect(newPosition);
  };

  return (
    <div className="relative w-full" style={{ height: "320px" }}>
      {/* Search Input */}
      <div className="absolute top-4 left-4 z-[1000] w-[calc(100%-2rem)] max-w-md">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search for a location..."
          className="w-full p-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
          aria-label="Search for a location"
        />
        {/* Suggestions Dropdown */}
        {isDropdownOpen && suggestions.length > 0 && (
          <div className="absolute top-full left-0 w-full bg-gray-800 border border-gray-600 rounded-lg mt-1 max-h-60 overflow-y-auto z-[1001]">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion.place_id}
                className="w-full text-left px-4 py-2 text-white hover:bg-gray-700 transition-colors text-sm"
                onClick={() => handleSuggestionSelect(suggestion)}
              >
                {suggestion.display_name}
              </button>
            ))}
          </div>
        )}
      </div>
      {/* Map */}
      <MapContainer
        center={[20, 77]}
        zoom={4}
        scrollWheelZoom={true}
        className="w-full h-full z-10"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap contributors"
        />
        <MapUpdater center={position} />
        <MapClickHandler />
      </MapContainer>
    </div>
  );
};

export default MapSelector;
