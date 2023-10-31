import React from "react";
import { MapContext } from "../../context/MapContext";
import ProjectBoardList from "./ProjectBoardList";

const testComp = () => <div>Damilola</div>;

const ProjectBoardListHoc = () => {
  return (
    <MapContext.Provider value={testComp}>
      <ProjectBoardList />
    </MapContext.Provider>
  );
};

export default ProjectBoardListHoc;
