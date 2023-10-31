import React from "react";
import { faFlag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { updatePlanRoom } from "../../store/actions/gc_qualify/gcQualify.actions";
import { isSubscriptionActive } from "../../utils/helpers/helper";

const ReportProblemContainer = ({
  row,
  handleSetLoginModal,
  handleSetPaymentModal,
  handleSetFreeMode,
  price_id,
  free_mode_count,
  user,
}) => {
  const dispatch = useDispatch();

  const handleFlagClick = (e) => {
    if (!user) {
      handleSetLoginModal();
    } else if (!isSubscriptionActive(user, price_id, user, free_mode_count)) {
      handleSetPaymentModal();
    } else {
      handleSetFreeMode();
      dispatch(updatePlanRoom({ flag: true, company_account_name: row.name }));
    }
  };
  return (
    <div className="text-center cursor-pointer">
      <FontAwesomeIcon
        icon={faFlag}
        size="lg"
        style={{ color: "red" }}
        onClick={handleFlagClick}
      />
    </div>
  );
};

export default ReportProblemContainer;
