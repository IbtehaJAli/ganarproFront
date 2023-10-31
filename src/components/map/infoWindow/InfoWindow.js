import React from "react";
import "./InfoWindow.css";

function InfoWindow(props) {
  const { project } = props;
  return (
    <div>
      <div className="">
        {/* <img
          className=""
          src="https://source.unsplash.com/200x182/?concert,party"
          alt="Contemplative Reptile"
        /> */}
        <div>
          <p>{project?.name}</p>
        </div>
        <div>
          <div className="mx-auto">
            <a href={`project_board/${project?.url_slug}`}>
              <button className="btn btn-outline-primary py-1">Details</button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoWindow;
