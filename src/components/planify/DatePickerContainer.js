import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { useDispatch } from "react-redux";
import { updatePlanRoom } from "../../store/actions/gc_qualify/gcQualify.actions";
import { isSubscriptionActive } from "../../utils/helpers/helper";
import styled from "styled-components";

const StyledDatePicker = styled(DatePicker)`
  @media (max-width: 576px) {
    width: 87px;
    padding: 0 !important;
  }
`;
const DatePickerContainer = ({
  row,
  handleSetLoginModal,
  handleSetPaymentModal,
  handleSetFreeMode,
  price_id,
  free_mode_count,
  user,
}) => {
  const [startDate, setStartDate] = useState(
    row.max_date_visited ? new Date(row.max_date_visited) : null
  );
  const dispatch = useDispatch();

  const handleDateClick = (date_visited) => {
    // ref.current.style.color = "red";
    // setNote(true);
    if (!user) {
      handleSetLoginModal();
    } else if (!isSubscriptionActive(user, price_id, user, free_mode_count)) {
      handleSetPaymentModal();
    } else {
      handleSetFreeMode();
      setStartDate(date_visited);
      dispatch(updatePlanRoom({ date_visited, company_account_id: row.id }));
    }
  };

  return (
    <div>
      <StyledDatePicker
        showIcon
        selected={startDate}
        onChange={(date) => handleDateClick(date)}
      />
    </div>
  );
};

export default DatePickerContainer;
