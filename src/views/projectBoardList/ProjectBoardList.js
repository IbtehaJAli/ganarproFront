import React, { useContext, useEffect, useRef, useState } from "react";
import { render } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import ProjectBoardNav from "./components/ProjectBoardNav";
import "./ProjectBoardList.css";
import {
  fetchProjects,
  fetchProjectsByLocation,
  archiveProject,
  favouriteProject,
  unFavouriteProject,
  saveSearch,
} from "../../store/actions/projects/projects.action";
import Mobile from "./views/Mobile";
import LargeScreen from "./views/LargeScreen";
import Map from "../../components/map/Map";
import InfoWindow from "../../components/map/infoWindow/InfoWindow";
import imageMarker from "../../assets/img/marker_new2.png";
import { authLogin } from "../../store/actions/authentication.action";
import { authUser } from "../../store/selectors/users/user.selector";
import Geolocation from "../../components/geolocation/Geolocation";
import { json, useSearchParams } from "react-router-dom";
import { isEmpty, isSubscriptionActive } from "../../utils/helpers/helper";
import LoginModal from "../../components/LoginModal";
import SubscriptionModal from "../../components/subscriptionModal";
import { BID_AMOUNT_SET_VALUES } from "../../store/constants/mortgageConstant";
import {
  getUserDetail,
  setFreeModeAction,
} from "../../store/actions/users/users.actions";
import { USER_SET_FREE_MODE_SUCCESS } from "../../store/constants/userConstants";

const sortItems = [
  {
    id: 1,
    key: "last_modified_date",
    value: "updated",
  },
  {
    id: 2,
    key: "created_date",
    value: "newest",
  },
  {
    id: 3,
    key: "bid_due_date",
    value: "Bid due date",
  },
  {
    id: 4,
    key: "sf_size",
    value: "Square Feet",
  },
  {
    id: 5,
    key: "project_completion",
    value: "Near completion",
  },
  {
    id: 6,
    key: "plan_drawings",
    value: "Plans Drawings",
  },
  {
    id: 7,
    key: "public_works",
    value: "Public works",
  },
];
const ProjectBoardList = () => {
  const [selectedTab, setSelectedTab] = useState("list");
  // const [selectedSortItem, setSelectedSortItem] = useState(sortItems[0].value);
  const [selectedSortItem, setSelectedSortItem] = useState("");
  const [filters, setFilters] = useState([]);
  const [userLocation, setUserLocation] = useState({});
  const [userBound, setUserBound] = useState({});
  const [latLng, setLatLng] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [queryStringParam, setQueryStringParam] = useState("");
  const [showSaveSearchModal, setShowSaveSearchModal] = useState(false);
  const [zoom, setZoom] = useState(10);
  const [firstTimeLoading, setFirstTimeLoading] = useState(true);
  const boardListMapRef = useRef();
  const [loginModalShow, setLoginModalShow] = useState(false);
  const [paymentModalShow, setPaymentModalShow] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { free_mode_count } = useSelector((state) => state.userFreeModeCount);
  const { user: profile } = useSelector((state) => state.userDetails);
  const price_id = process.env.REACT_APP_PROJECT_APP;
  const dispatch = useDispatch();
  const {
    projects,
    loading,
    count,
    favouriteProjects,
    phases,
    sizes,
    buildingTypes,
  } = useSelector((state) => state.projects);
  const authenticatedUser = useSelector(authUser());
  let [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setTimeout(() => {
      setFirstTimeLoading(false);
    }, 5000);
    // navigator?.geolocation?.getCurrentPosition(successCallback, errorCallback);
  }, []);

  useEffect(() => {
    if (!isEmpty(userLocation)) {
      setLatLng({ latitude: userLocation?.lat, longitude: userLocation?.lng });
    }
  }, [userLocation]);

  useEffect(() => {
    if (!authenticatedUser) {
      dispatch(authLogin({}));
    }
  }, [authenticatedUser, dispatch, projects]);

  useEffect(() => {
    const currentParams = Object.fromEntries([...searchParams]);
    let values = {};
    for (const param in currentParams) {
      if (param.includes("phases")) {
        values["phaseFilters"] = currentParams[param];
      }
      if (param.includes("size")) {
        values["sizeFilters"] = currentParams[param];
      }
      if (param.includes("project_types")) {
        values["projectTypes"] = currentParams[param];
      }
      if (param.includes("sort")) {
        values["sortItem"] = {
          key: currentParams[param],
          value: currentParams[param],
        };
        const item = sortItems.find(
          (item) => item.key === currentParams[param]
        );
        setSelectedSortItem(item.value);
      }
      if (param.includes("coordinates")) {
        values["coordinates"] = JSON.parse(currentParams[param]);
      }
    }
    if (
      !isEmpty(currentParams["latitude"]) &&
      !isEmpty(currentParams["longitude"])
    ) {
      setLatLng({
        latitude: currentParams["latitude"] ?? userLocation?.lat,
        longitude: currentParams["longitude"] ?? userLocation?.lng,
      });
      values["latitude"] = currentParams["latitude"] ?? "";
      values["longitude"] = currentParams["longitude"] ?? "";
      setZoom(10);
      values["bounds"] = calculateUserBound(
        parseFloat(currentParams["longitude"]),
        parseFloat(currentParams["latitude"])
      );
    }
    values["isQueryParams"] = true;
    if (!values["sortItem"] || !selectedSortItem) {
      setSelectedSortItem("updated");
      values["sortItem"] = {
        key: "last_modified_date",
        value: "last_modified_date",
      };
    }
    if (Object.keys(values).length > 1) {
      handleSetQueryString(values);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      // fetchProjectByLocations();
      handleGetLocation();
    }, 3000);

    return () => clearTimeout(timer);
  }, [userLocation]);

  const handleSetSelectedTab = (tab) => {
    setSelectedTab(tab);
  };

  const handleSelectedSortItem = (itemId) => {
    const item = sortItems.find((item) => item.id === itemId);
    setSelectedSortItem(item.value);
    handleSetQueryString({ ...filters, sortItem: item });
  };

  const handlePageChanged = (data) => {
    const { currentPage } = data;
    setCurrentPage(currentPage);
  };

  const calculateUserBound = (longitude, latitude) => {
    const offset = parseFloat(6 / 10);
    const bounds = {
      south: parseFloat(latitude) - offset,
      west: parseFloat(longitude) - offset,
      north: parseFloat(latitude) + offset,
      east: parseFloat(longitude) + offset,
    };

    return bounds;
  };

  const handleSetQueryString = ({
    phaseFilters,
    sizeFilters,
    projectTypes,
    searchValue,
    sortItem = "",
    longitude = "",
    latitude = "",
    bounds = "",
    isQueryParams = false,
  }) => {
    if (isEmpty(longitude)) {
      longitude = latLng?.longitude;
    }
    if (isEmpty(latitude)) {
      latitude = latLng?.latitude;
    }
    setFilters([phaseFilters, sizeFilters, projectTypes, searchValue]);

    let item = sortItem;
    if (!item) {
      item = sortItems.find((item) => item.value === selectedSortItem);
    }
    var obj = {
      phases: phaseFilters,
      size: sizeFilters,
      project_types: projectTypes,
      sort: item?.key ?? "",
      longitude: longitude,
      latitude: latitude,
      coordinates: JSON.stringify(
        JSON.stringify(calculateUserBound(longitude, latitude))
      ),
    };
    if (!isEmpty(bounds)) {
      obj["coordinates"] = JSON.stringify(JSON.stringify(bounds));
    }
    const queryString = Object.keys(obj)
      .map((key) => {
        if (obj[key]) {
          return `${key}=${obj[key]}`;
        }
      })
      .filter((key) => !!key)
      .join("&");

    setQueryStringParam(queryString);
    setSearchParams(queryString);

    if (bounds || phaseFilters || sizeFilters || projectTypes || obj?.sort) {
      const query = JSON.parse(JSON.parse(obj?.coordinates));
      if (
        !isEmpty(query?.south) ||
        !isEmpty(query?.north) ||
        !isEmpty(query?.east) ||
        !isEmpty(query?.west)
      ) {
        dispatch(fetchProjects(queryString));
        return;
      }
      if (bounds) {
        dispatch(
          fetchProjectsByLocation(JSON.stringify(JSON.stringify(bounds)))
        );
      }

      return;
    }
    // if (searchValue || bounds) {
    if (bounds) {
      dispatch(fetchProjectsByLocation(JSON.stringify(JSON.stringify(bounds))));
      return;
    }
    delete obj["longitude"];
    delete obj["latitude"];

    const requestQueryString = Object.keys(obj)
      .map((key) => {
        if (obj[key]) {
          return `${key}=${obj[key]}`;
        }
      })
      .filter((key) => !!key)
      .join("&");
    dispatch(fetchProjects(requestQueryString));
    return queryString;
  };

  const fetchProjectByLocations = (locations = {}) => {
    if (isEmpty(locations)) {
      locations = userBound;
    }

    if (!isEmpty(locations)) {
      const values = {
        bounds: locations,
      };
      const currentParams = Object.fromEntries([...searchParams]);
      const north = JSON.parse(currentParams["coordinates"])["north"];
      if (!firstTimeLoading || isEmpty(north)) {
        handleSetQueryString(values);
      }
      // dispatch(fetchProjectsByLocation(JSON.stringify(locations)));
    }
  };

  const handleArchive = (e, id) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(archiveProject(id));
  };

  const handleFavourite = (e, type, id) => {
    e.stopPropagation();
    e.preventDefault();
    if (!user) {
      setLoginModalShow(true);
    } else if (!isSubscriptionActive(user, price_id, user, free_mode_count)) {
      setPaymentModalShow(true);
    } else {
      dispatch(getUserDetail());
      if (type === "favourite") {
        dispatch(favouriteProject(id));
        return;
      }
      dispatch(unFavouriteProject(id));
    }
  };

  const handleSaveSearch = (searchName) => {
    const data = {
      search_name: searchName,
      search_query: queryStringParam,
      projects: count
    };
    dispatch(saveSearch(data));
    setShowSaveSearchModal(false);
  };

  const createInfoWindow = (e, map, marker) => {
    const infoWindow = new window.google.maps.InfoWindow({
      content: '<div id="infoWindow"></div>',
      position: { lat: e.latLng.lat(), lng: e.latLng.lng() },
    });
    infoWindow.addListener("domready", (e) => {
      render(<InfoWindow />, document.getElementById("infoWindow"));
    });
    infoWindow.open(map, marker);
  };

  const handleSearchLatLng = (latLng = null) => {
    if (latLng) {
      setLatLng({ latitude: latLng.lat, longitude: latLng.lng });
      setZoom(zoom);
      return;
    }
  };

  const handleGetLocation = () => {
    let city;
    const latlng = new window.google.maps.LatLng(
      userLocation.lat,
      userLocation.lng
    );
    if (isEmpty(latLng)) {
      setLatLng({
        latitude: userLocation.lat,
        longitude: userLocation.lng,
      });
    }
    const geocoder = new window.google.maps.Geocoder();

    geocoder.geocode({ latLng: latlng }, function (results, status) {
      if (status == window.google.maps.GeocoderStatus.OK) {
        if (results[1]) {
          fetchProjectByLocations(userBound);
          return;
          //find country name
          for (var i = 0; i < results[0].address_components.length; i++) {
            for (
              var b = 0;
              b < results[0].address_components[i].types.length;
              b++
            ) {
              //there are different types that might hold a city admin_area_lvl_1 usually does in come cases looking for sublocality type will be more appropriate
              if (results[0].address_components[i].types[b] == "locality") {
                //this is the object you are looking for
                city = results[0].address_components[i];
                break;
              }
            }
          }

          // handleSetQueryString("", "", "", city.long_name);
        } else {
          // alert("No results found");
          if (!isEmpty(userBound)) {
            fetchProjectByLocations(userBound);
          }
        }
      } else {
        // alert("Geocoder failed due to: " + status);
        if (!isEmpty(userBound)) {
          fetchProjectByLocations(userBound);
        }
      }
    });
    createMap();
    // }
    // await codeLatLng();
    // if (!isEmpty(userBound)) {
    //   dispatch(fetchProjectsByLocation(JSON.stringify(userBound)));
    // }
  };

  const filterProjects = (map) => {
    const bounds = map.getBounds();
    let filteredProjects = [];
    projects.filter((project) => {
      if (bounds){
        const latLng = new window.google.maps.LatLng(project.latitude, project.longitude);
        if (bounds.contains(latLng)) {
          filteredProjects.push(project);
        }
      }
    });
  };

  const createMap = () => {
    return (
      <Map
        id="myMap"
        options={{
          center: {
            lat: parseFloat(latLng?.latitude),
            lng: parseFloat(latLng?.longitude),
          },
          zoom: zoom,
          // draggable: false,
        }}
        onMapLoad={(map) => {

          // if(map){
          //   map.addListener('zoom_changed, dragend', function(){
          //     filterProjects(map);
          //   })
          // }

          // if (projects?.[0]) {
          //   var marker = new window.google.maps.Marker({
          //     position: {
          //       lat: parseFloat(latLng?.latitude),
          //       lng: parseFloat(latLng?.longitude),
          //     },
          //     map: map,
          //     title: projects?.[0]?.name || "N/A",
          //     icon: imageMarker,
          //   });
          //   marker.addListener("click", (e) => {
          //     console.log(e);
          //     // `createInfoWindow`(e, map, marker);
          //   });
          // }
        }}
        selectedLatLng={latLng}
        projects={projects}
        handleFetchProject={fetchProjectByLocations}
        mapZoom={zoom}
        setLatLng={setLatLng}
        setZoom={setZoom}
        boardListMapRef={boardListMapRef}
      />
    );
  };

  const successCallback = (position) => {};

  const errorCallback = (error) => {};

  const handleProjectDetailCLick = (e, link) => {
    e.preventDefault();
    if (!user) {
      setLoginModalShow(true);
    } else if (!isSubscriptionActive(user, price_id, user, free_mode_count)) {
      setPaymentModalShow(true);
    } else {
      window.open(link, "_self");
    }
  };

  const applyQueryParams = (obj) => {};

  return (
    <div className="project-board-container">
      <Geolocation
        setUserLocation={setUserLocation}
        setUserBound={setUserBound}
        setLatLng={setLatLng}
      />
      <section>
        <ProjectBoardNav
          selectedTab={selectedTab}
          setSelectedTab={handleSetSelectedTab}
          setQueryParams={handleSetQueryString}
          phases={phases}
          sizes={sizes}
          buildingTypes={buildingTypes}
          setSearchLatLng={handleSearchLatLng}
          saveSearchHandler={handleSaveSearch}
          queryString={queryStringParam}
          modalState={showSaveSearchModal}
          handleGetLocation={handleGetLocation}
        />
      </section>
      <section className="project-list-container">
        <div className="mx-3">
          <div className="d-md-none">
            <Mobile
              selectedTab={selectedTab}
              count={count}
              selectedSortItem={selectedSortItem}
              loading={loading}
              projects={projects}
              currentPage={currentPage}
              sortItems={sortItems}
              favouriteProjects={favouriteProjects}
              handleSelectedSortItem={handleSelectedSortItem}
              handlePageChanged={handlePageChanged}
              handleArchive={handleArchive}
              handleFavourite={handleFavourite}
              map={createMap()}
              handleProjectDetailCLick={handleProjectDetailCLick}
              authenticatedUser={authenticatedUser}
            />
          </div>

          <div className="d-none d-md-flex row mb-5">
            <LargeScreen
              loading={loading}
              count={count}
              sortItems={sortItems}
              projects={projects}
              currentPage={currentPage}
              selectedSortItem={selectedSortItem}
              favouriteProjects={favouriteProjects}
              handleSelectedSortItem={handleSelectedSortItem}
              handlePageChanged={handlePageChanged}
              handleArchive={handleArchive}
              handleFavourite={handleFavourite}
              latLng={latLng}
              map={createMap()}
              handleProjectDetailCLick={handleProjectDetailCLick}
              authenticatedUser={authenticatedUser}
              firstTimeLoading={firstTimeLoading}
            />
          </div>
        </div>
      </section>
      <LoginModal
        show={loginModalShow}
        onHide={() => setLoginModalShow(false)}
      />
      <SubscriptionModal
        show={paymentModalShow}
        onHide={() => setPaymentModalShow(false)}
      />
    </div>
  );
};

export default ProjectBoardList;
