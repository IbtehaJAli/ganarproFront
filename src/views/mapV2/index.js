// src/components/ProjectBoardV2.js
import React, { useState, useCallback } from "react";
import Map from "./components/Map";
import DataDisplay from "./components/DataDisplay";
import { debounce } from "lodash";

function ProjectBoardV2() {
  const [locations, setLocations] = useState([]);

  const debouncedFetchLocations = debounce(async (ne, sw) => {
    const response = await fetch(
      `http://localhost:8001/mapv2?ne_lat=${ne.lat()}&ne_lng=${ne.lng()}&sw_lat=${sw.lat()}&sw_lng=${sw.lng()}`
    );
    const data = await response.json();
    setLocations(data);
  }, 200);

  const fetchLocations = useCallback(debouncedFetchLocations, [setLocations]);
  console.log("fetchLocations", fetchLocations);

  return (
    <div style={{ display: "flex" }}>
      <Map locations={locations} fetchLocations={fetchLocations} />
      <DataDisplay locations={locations} />
    </div>
  );
}

export default ProjectBoardV2;
