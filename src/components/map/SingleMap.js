import { useRef, useEffect } from "react";
const SingleMap = ({ id, options, onMapLoad, project }) => {
  const mapRef = useRef();

  const EnableDrawControl = (controlDiv, map) => {
    // Set CSS for the control border.
    const controlUI = document.createElement("div");
    controlUI.className = "";
    controlDiv.appendChild(controlUI);
    // Set CSS for the control interior.
    const controlText = document.createElement("div");
    controlText.className = "mt-3 px-2 py-2 map-display text-13";
    controlText.innerHTML = `${
      project.address === null ? "" : project.address
    } ${project?.city} <br /> ${project.state}, ${project.country}`;
    controlUI.appendChild(controlText);
    // Setup the click event listeners: simply set the map to Chicago.
  };

  const onScriptLoad = () => {
    const map = new window.google.maps.Map(
      document.getElementById(id),
      options
    );
    onMapLoad(map);
    const enableDrawControlDiv = document.createElement("div");
    EnableDrawControl(enableDrawControlDiv, map);
    map.controls[window.google.maps.ControlPosition.TOP_LEFT].push(
      enableDrawControlDiv
    );
    mapRef.current = map;
  };

  useEffect(() => {
    createMap();
  }, []);

  const createMap = () => {
    if (!window.google) {
      const googleMapScript = document.createElement("script");
      googleMapScript.type = "text/javascript";
      googleMapScript.src = `https://maps.google.com/maps/api/js?key=${process.env.REACT_APP_MAP_API_KEY}`;
      const mapScript = document.getElementsByTagName("script")[0];
      mapScript.parentNode.insertBefore(googleMapScript, mapScript);
      // Below is important.
      //We cannot access google.maps until it's finished loading
      googleMapScript.addEventListener("load", (e) => {
        onScriptLoad();
      });
    } else {
      onScriptLoad();
    }
  };

  return <div style={{ width: "auto", height: "400px" }} id={id} />;
};

export default SingleMap;
