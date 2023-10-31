import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { HiOutlineInformationCircle } from "react-icons/hi2";

const ToolTip = ({ information, show, trigger }) => {
  const renderTooltip = (props, message) => {
    return (
      <Tooltip id="button-tooltip" {...props}>
        {/* {message} */}
        <div
          // style={{ whiteSpace: "pre-line" }}
          dangerouslySetInnerHTML={{ __html: message }}
        />
      </Tooltip>
    );
  };

  let showTime = 250;
  let triggerType = ["hover", "focus"];

  if (show) {
    showTime = show;
  }
  if (trigger) {
    triggerType = trigger;
  }

  return (
    <>
      <span className="d-lg-none">
        <OverlayTrigger
          trigger={triggerType}
          placement="left"
          delay={{ show: showTime, hide: 400 }}
          overlay={(e) => renderTooltip(e, information)}
          className="left-tool-tip"
        >
          <Button
            variant="light"
            style={{ backgroundColor: "transparent", border: "transparent" }}
          >
            <HiOutlineInformationCircle
              className="cursor-pointer fs-3"
              style={{ color: "#146ebe" }}
            />
          </Button>
        </OverlayTrigger>
      </span>
      <span className="d-none d-lg-inline">
        <OverlayTrigger
          trigger={triggerType}
          placement="right"
          delay={{ show: 250, hide: 400 }}
          overlay={(e) => renderTooltip(e, information)}
        >
          <Button
            variant="light"
            style={{ backgroundColor: "transparent", border: "transparent" }}
          >
            <HiOutlineInformationCircle
              className="cursor-pointer fs-3"
              style={{ color: "#146ebe" }}
            />
          </Button>
        </OverlayTrigger>
      </span>
    </>
  );
};

export default ToolTip;
