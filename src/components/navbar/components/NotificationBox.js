import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import indicatorIcon from '../../../assets/icons/indicator.svg';
// import { notifications } from "../../../data/notifications";
import Dropdown from '../../dropdown/Dropdown';
import { classNames } from '../../helpers/helpers';
dayjs.extend(relativeTime);

const NotificationBox = ({
  title,
  notifications,
  showNotificationBox,
  close,
}) => {

  return (
    <Dropdown title={title} customClassName="profile-container">
      <div
        // ref={box}
        tabIndex="0"
        className={classNames('notification__box')}
      >
        <div className="link-box d-flex justify-content-evenly">
          <Link to="#" className="px-3 py-2 text-center active">
            Notifications
          </Link>
        </div>
        <div className="display">
          <ul className="notification-container">
            {notifications?.map((notification) => (
              <li
                key={notification.id}
                className="row py-2 my-1 d-flex text-13 text-start"
              >
                <div className="me-3 col-1">
                  {notification.read ? (
                    <p className="me-1"></p>
                  ) : (
                    <img src={indicatorIcon} alt="indicator" />
                  )}
                </div>

                <Link to="/" className="col-10 text-decoration-none text-dark">
                  <div className="title d-flex justify-content-between ">
                    <span className="main fw-bold text-truncate notification-title">
                      {notification.project_name}
                    </span>
                    <span className="sub text-primary text-10 fw-bolder">
                      {dayjs(notification.created).fromNow()}
                    </span>
                  </div>
                  <div className="notification-description">
                    {notification.notification_name}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Dropdown>
  );
};

export default NotificationBox;
