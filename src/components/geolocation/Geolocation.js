import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { isEmpty } from "../../utils/helpers/helper";

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

function errors(err) {}

function calculateUserBound(longitude, latitude) {
  const offset = parseFloat(6 / 10);
  const bounds = {
    south: parseFloat(latitude) - offset,
    west: parseFloat(longitude) - offset,
    north: parseFloat(latitude) + offset,
    east: parseFloat(longitude) + offset,
  };

  return bounds;
}

const Geolocation = ({ setUserLocation, setUserBound, setLatLng }) => {
  let [searchParams, setSearchParams] = useSearchParams();
  function success(pos) {
    var crd = pos.coords;

    const bounds = calculateUserBound(crd.longitude, crd.latitude);

    setUserLocation({ lat: crd.latitude, lng: crd.longitude });
    setUserBound(bounds);
  }
  useEffect(() => {
    const currentParams = Object.fromEntries([...searchParams]);
    let values = {};

    for (const param in currentParams) {
      if (param.includes("coordinates")) {
        values["coordinates"] = JSON.parse(currentParams[param]);
      }
      if (param.includes("latitude")) {
        values["latitude"] = JSON.parse(currentParams[param]);
      }
      if (param.includes("longitude")) {
        values["longitude"] = JSON.parse(currentParams[param]);
      }
    }
    if (
      !isEmpty(currentParams["latitude"]) &&
      !isEmpty(currentParams["longitude"])
    ) {
      setLatLng({
        latitude: currentParams["latitude"] ?? "",
        longitude: currentParams["longitude"] ?? "",
      });
      const bounds = calculateUserBound(
        currentParams["longitude"],
        currentParams["latitude"]
      );

      setUserLocation({
        lat: currentParams["latitude"],
        lng: currentParams["longitude"],
      });
      setUserBound(bounds);
      return;
    }

    if (navigator?.geolocation) {
      if (navigator.permissions && navigator.permissions.query) {
        navigator?.permissions
          .query({ name: "geolocation" })
          .then(function (result) {
            if (result.state === "granted") {
              //If granted then you can directly call your function here
              navigator.geolocation.getCurrentPosition(success);
            } else if (result.state === "prompt") {
              navigator.geolocation.getCurrentPosition(
                success,
                errors,
                options
              );
            } else if (result.state === "denied") {
              //If denied then you have to show instructions to enable location
              setLatLng({
                latitude: 38.889805, // washington DC
                longitude: -77.009056,
              });
              setUserLocation({
                lat: 38.889805, // washington DC
                lng: -77.009056,
              });
              const bounds = calculateUserBound(-77.009056, 38.889805);

              setUserBound(bounds);
            }
            result.onchange = function () {};
          });
      } else {
        setLatLng({
          latitude: 38.889805, // washington DC
          longitude: -77.009056,
        });
        setUserLocation({
          lat: 38.889805, // washington DC
          lng: -77.009056,
        });
        const bounds = calculateUserBound(-77.009056, 38.889805);

        setUserBound(bounds);
      }
    } else {
      setLatLng({
        latitude: 38.889805, // washington DC
        longitude: -77.009056,
      });
      setUserLocation({
        lat: 38.889805, // washington DC
        lng: -77.009056,
      });
      const bounds = calculateUserBound(-77.009056, 38.889805);

      setUserBound(bounds);
      alert("Sorry Not available!");
    }
  }, []);
  return <div></div>;
};

export default Geolocation;
