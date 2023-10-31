import { classNames } from "../helpers/helpers";
import CheckIcon from "../../assets/icons/CheckIcon";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const ProjectProgressBar = ({
  stage_name,
  project_completion,
  est_break_ground_date,
  setShowProgressModal,
}) => {
  const stageLevel = (stageName) => {
    let stage = 0;
    if (stageName === "Pre-construction") {
      stage = 1;
    }
    if (stageName === "Work in progress") {
      stage = 2;
    }
    if (stageName === "90% contracts purchased") {
      stage = 3;
    }
    if (stageName === "complete") {
      stage = 4;
    }
    return stage;
  };

  const completionBefore = dayjs().isBefore(
    dayjs(project_completion).format("YYYY-MM-DD")
  );
  const workProgressBefore = dayjs().isBefore(
    dayjs(est_break_ground_date).format("YYYY-MM-DD")
  );

  const completionDuration = completionBefore
    ? `complete ${dayjs(project_completion).fromNow()}`
    : `completed ${dayjs(project_completion).fromNow()}`;

  const workProgressDuration = workProgressBefore
    ? `start ${dayjs(est_break_ground_date).fromNow()}`
    : `started ${dayjs(est_break_ground_date).fromNow()}`;

  return (
    <div className="d-flex text-center text-10 mx-2 justify-content-center project-stage-row">
      <div className="position-relative">
        <div
          className="cursor-pointer"
          onClick={() => setShowProgressModal("Pre-construction")}
        >
          <div className="check-container-first rounded-circle bg-white text-white fs-6 px-2 py-2">
            <div className="check-container rounded-circle orange-100">
              <CheckIcon
                fill="white"
                width="25"
                height="25"
                strokeWidth="4"
                className="rounded-circle orange-100 text-white px-2 py-2"
              />
            </div>
          </div>
        </div>
        <p className="check-text mt-2">Preconstruction</p>
      </div>
      <div className="border border-checks bg-white border-white"></div>
      <div className="position-relative">
        <div
          className={classNames(
            stageLevel(stage_name) > 1 ? "active-bar" : "not-active-bar",
            "cursor-pointer"
          )}
          onClick={() => setShowProgressModal("Work in progress")}
        >
          <div className="check-container-first rounded-circle bg-white text-white fs-6 px-2 py-2">
            <div className="check-container second-bar rounded-circle orange-200">
              {stageLevel(stage_name) > 2 ? (
                <CheckIcon
                  fill="white"
                  width="25"
                  height="25"
                  strokeWidth="4"
                  className="rounded-circle orange-200 text-white px-2 py-2"
                />
              ) : (
                <div className="check-container second-bar rounded-circle text-20 fw-bold px-2 py-2">
                  2
                </div>
              )}
            </div>
          </div>
        </div>
        <p className="check-text mt-2">
          Work in Progress
          {est_break_ground_date ? (
            <>
              <br />
              <span className="fw-bolder text-primary">
                {workProgressDuration}
              </span>{" "}
            </>
          ) : (
            ""
          )}
        </p>
      </div>
      <div className="border border-checks bg-white border-white"></div>
      <div className="position-relative">
        <div
          // className="cursor-pointer"
          className={classNames(
            stageLevel(stage_name) > 2 ? "active-bar" : "not-active-bar",
            "cursor-pointer"
          )}
          onClick={() => setShowProgressModal("90% contracts purchased")}
        >
          <div className="check-container-first rounded-circle fs-6 px-2 py-2">
            <div className="check-container third-bar rounded-circle">
              {stageLevel(stage_name) > 2 ? (
                <CheckIcon
                  fill="white"
                  width="25"
                  height="25"
                  strokeWidth="4"
                  className="rounded-circle orange-300 text-white px-2 py-2"
                />
              ) : (
                <div className="check-container fourth-bar rounded-circle text-20 fw-bold px-2 py-2">
                  3
                </div>
              )}
            </div>
          </div>
        </div>
        <p className="check-text mt-2">90% contracts purchased</p>
      </div>
      <div className="border border-checks bg-white border-white"></div>
      <div className="position-relative">
        <div
          className={classNames(
            stageLevel(stage_name) > 3 ? "active-bar" : "not-active-bar",
            "cursor-pointer"
          )}
          onClick={() => setShowProgressModal("complete")}
        >
          <div className="check-container-first rounded-circle fs-6 px-2 py-2 mx-auto">
            <div className="check-container fourth-bar rounded-circle text-20 fw-bold px-2 py-2 mx-auto">
              4
            </div>
          </div>
        </div>
        <p className="mt-2">
          Complete
          {project_completion ? (
            <>
              <br />
              <span className="fw-bolder text-primary">
                {completionDuration}
              </span>
            </>
          ) : (
            ""
          )}
        </p>
      </div>
    </div>
  );
};

export default ProjectProgressBar;
