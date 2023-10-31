import { useEffect, useState } from "react";
import dayjs from "dayjs";
import _ from "lodash";
import email from "../../../assets/icons/flat-email.svg";
import sent from "../../../assets/icons/sent.svg";
import calendar from "../../../assets/icons/calendar.svg";
import ActivityEmailCard from "../../../components/activityEmailCard/ActivityEmailCard";
import { getCallLogs } from "../../../utils/requests/callLogs";
import relativeTime from "dayjs/plugin/relativeTime";
import { getEmailLogsAPI } from "../../../utils/requests/projects";
import ActivityCallCard from "../../../components/activityEmailCard/ActivityCallCard";
dayjs.extend(relativeTime);

const Activities = ({ projectId }) => {
  const [callLogs, setCallLogs] = useState([]);
  const [totalLogCalls, setTotalLogCalls] = useState(0);
  const [lastLoggedCall, setLastLoggedCall] = useState(0);
  const [emailLogs, setEmailLogs] = useState([]);
  const [totalLogEmails, setTotalLogEmails] = useState(0);
  const [lastLoggedEmail, setLastLoggedEmail] = useState(0);

  useEffect(() => {
    callActivitiesHandler();
    emailActivitiesHandler();
  }, [callActivitiesHandler, emailActivitiesHandler]);

  const callActivitiesHandler = () => {
    getCallLogs(projectId)
      .then((response) => {
        const grouped = _.groupBy(response.data, function (item) {
          const month = dayjs(item.created).month() + 1;
          const year = dayjs(item.created).year();
          return `${month} ${year}`;
        });
        setCallLogs(grouped);
        setTotalLogCalls(response.total_logged_calls);
        setLastLoggedCall(response.last_call_logged);
      })
      .catch((error) => {});
  };

  const emailActivitiesHandler = () => {
    getEmailLogsAPI(projectId)
      .then((response) => {
        const grouped = _.groupBy(response.data, function (item) {
          const month = dayjs(item.created).month() + 1;
          const year = dayjs(item.created).year();
          return `${month} ${year}`;
        });
        setEmailLogs(grouped);
        setTotalLogEmails(response.total_email_sent);
        setLastLoggedEmail(response.last_email_sent);
      })
      .catch((error) => {});
  };
  return (
    <div>
      <section>
        <div className="border rounded-2 py-5 px-4">
          <div className="d-flex justify-content-between">
            <div className="d-flex align-items-baseline">
              <img src={email} alt="email" className="me-3" />
              <h4 className="text-16 fw-bold">Recent Emails</h4>
            </div>
            <h4 className="text-primary">+</h4>
          </div>
          <div className="border py-4 px-5 mt-5 d-md-flex rounded-6 justify-content-md-between">
            <div className="d-md-flex">
              <div className="text-13 black-200 mb-1 me-3">
                <img src={sent} alt="sent" className="me-2" />
                Total emails sent:
              </div>
              <div className="d-flex text-primary text-center justify-content-center">
                <h3 className="me-1">{totalLogEmails}</h3>
                <span className="d-md-none">emails</span>
              </div>
            </div>
            <div className="border px-5 mt-3 mb-4 d-md-none"></div>
            <div className="d-none d-md-block border activity-ruler"></div>
            <div className="d-md-flex">
              <div className="text-13 black-200 mb-1 me-3">
                <img src={calendar} alt="sent" className="me-2" />
                Last email sent:
              </div>
              <div className="d-flex text-13 text-primary text-center justify-content-center align-items-md-center">
                <h3 className="me-1">
                  {lastLoggedEmail ? dayjs(lastLoggedEmail).fromNow() : "N/A"}
                </h3>
              </div>
            </div>
          </div>

          <div className="mt-5">
            {/* {new Array(3).fill(3).map((email, index) => (
              <ActivityEmailCard key={index + 1} />
            ))} */}

            {Object.keys(emailLogs)?.map((data, index) => (
              <ActivityEmailCard key={index + 1} logs={emailLogs[data]} />
            ))}
          </div>
        </div>
      </section>

      <section className="mt-4">
        <div className="border rounded-2 py-5 px-4">
          <div className="d-flex justify-content-between">
            <div className="d-flex align-items-baseline">
              <img src={email} alt="email" className="me-3" />
              <h4 className="text-16 fw-bold">Recent logged calls</h4>
            </div>
            <h4 className="text-primary">+</h4>
          </div>
          <div className="border py-4 px-5 mt-5 d-md-flex rounded-6 justify-content-md-between">
            <div className="d-md-flex">
              <div className="text-13 black-200 mb-1 me-3">
                <img src={sent} alt="sent" className="me-2" />
                Total logged calls:
              </div>
              <div className="d-flex text-primary text-center justify-content-center">
                <h3 className="me-1">{totalLogCalls}</h3>
                <span className="d-md-none">emails</span>
              </div>
            </div>
            <div className="border px-5 mt-3 mb-4 d-md-none"></div>
            <div className="d-none d-md-block border activity-ruler"></div>
            <div className="d-md-flex">
              <div className="text-13 black-200 mb-1 me-3">
                <img src={calendar} alt="sent" className="me-2" />
                Last logged calls:
              </div>
              <div className="d-flex text-13 text-primary text-center justify-content-center align-items-md-center">
                <h3 className="me-1">
                  {lastLoggedCall ? dayjs(lastLoggedCall).fromNow() : "N/A"}
                </h3>
              </div>
            </div>
          </div>

          <div className="mt-5">
            {Object.keys(callLogs)?.map((data, index) => (
              <ActivityCallCard key={index + 1} logs={callLogs[data]} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Activities;
