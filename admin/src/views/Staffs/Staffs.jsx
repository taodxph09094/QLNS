import React, { useEffect, Fragment, useState } from "react";
import { useAlert } from "react-alert";
import { DataGrid } from "@material-ui/data-grid";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import { Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  clearErrors,
  deleteStaff,
  getAdminStaff,
} from "../../actions/staffAction";
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { DELETE_STAFF_RESET } from "../../constants/staffConstants";
const Staffs = ({ match }) => {
  const dispatch = useDispatch();

  const alert = useAlert();
  let history = useHistory();
  const [keywordSearch, setKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { error, staffs, filteredProductsCount } = useSelector(
    (state) => state.staffs
  );
  const { error: deleteError, isDeleted } = useSelector((state) => state.staff);

  //   const [id, setId] = useState();
  const keyword = match.params.keyword;

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  let count = filteredProductsCount;
  const deleteStaffHandler = (id) => {
    dispatch(deleteStaff(id));
  };
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keywordSearch.trim()) {
      history.push(`/admin/staffs/${keywordSearch}`);
    } else {
      history.push("/admin/staffs");
    }
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Xóa sách thành công");
      history.push("/admin/staffs");
      dispatch({ type: DELETE_STAFF_RESET });
    }

    dispatch(getAdminStaff(keyword, currentPage));
  }, [
    dispatch,
    alert,
    error,
    keyword,
    currentPage,
    deleteError,
    history,
    isDeleted,
  ]);

  const columns = [
    {
      //   field: "id",
      headerAlign: "center",
      flex: 0.1,
      align: "center",
    },
    {
      field: "idDb",
      headerName: "ID",
      headerAlign: "center",
      flex: 0.2,
      align: "center",
    },

    {
      field: "name",
      headerName: "Tên nhân viên",
      flex: 0.5,
      headerAlign: "center",
      align: "center",
    },

    {
      field: "phone",
      headerName: "Số điện thoại ",
      flex: 0.3,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "addressEmail",
      headerName: "Email ",
      flex: 0.3,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "gender",
      headerName: "Giới tính ",
      flex: 0.25,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "position",
      headerName: "Chức vụ",
      flex: 0.25,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "wage",
      headerName: "Lương",
      flex: 0.25,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "actions",
      headerName: "Hành động",
      type: "number",
      flex: 0.5,
      headerAlign: "center",
      align: "center",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/staff/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              variant="danger"
              onClick={() =>
                deleteStaffHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];
  const getId = [];
  staffs &&
    staffs.forEach((item) => {
      // setId(item._id);
      console.log(item.name);
      rows.push({
        id: item._id,
        name: item.name,
        phone: item.numberPhone,
        addressEmail: item.addressEmail,
        gender: item.gender,
        position: item.position,
        wage: item.wage,
        idDb: item.staffCode,
      });
    });
  return (
    <>
      <h1 id="productListHeading">Danh sách nhân viên</h1>
      <Link to="/admin/createStaff">
        <h4>
          {" "}
          <AddIcon />
          Thêm nhân viên
        </h4>
      </Link>

      <InputGroup className="mb-3">
        <Form onSubmit={searchSubmitHandler}>
          <Form.Control
            placeholder="Nhập tên"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            onChange={(e) => setKeyword(e.target.value)}
          />
          <Button type="submit" variant="secondary">
            Tìm kiếm
          </Button>
        </Form>
      </InputGroup>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        className="productList"
        autoHeight
      />
    </>
  );
};

export default Staffs;
