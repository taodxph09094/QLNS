import React, { Fragment, useEffect, useState } from "react";
import { clearErrors, getAdminStaff } from "../../actions/staffAction";
import { StaffTable } from "./StaffTable";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
const SearchStaff = ({ match }) => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const alert = useAlert();
  const {
    staffs,
    loading,
    error,
    staffsCount,
    resultPerPage,
    filteredStaffsCount,
  } = useSelector((state) => state.staffs);
  const keyword = match.params.keyword;
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };
  let count = filteredStaffsCount;
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getAdminStaff(keyword, currentPage));
  }, [dispatch, keyword, currentPage, alert, error]);
  return (
    <div className="row">
      {staffs &&
        staffs.map((staff) => <StaffTable key={staff._id} staff={staff} />)}
    </div>
  );
};

export default SearchStaff;
