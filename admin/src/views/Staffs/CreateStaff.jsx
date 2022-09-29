import React, { useEffect, useState } from "react";
import { BiUpload } from "react-icons/bi";
// react-bootstrap components

import {
  Badge,
  Button,
  Card,
  Form,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import "./product.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { formatCurrency } from "../../utils/helper";
import { NEW_STAFF_RESET } from "../../constants/staffConstants";
import { clearErrors, createStaff } from "../../actions/staffAction";
const CreateStaff = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, error, success } = useSelector((state) => state.newStaff);
  const { staffs } = useSelector((state) => state.staffs);
  const [name, setName] = useState("");
  const [staffCode, setStaffCode] = useState("");
  const [countryside, setCountrySide] = useState("");
  const [address, setAddress] = useState("");
  const [dateOfBirth, setDetOfBirth] = useState("");
  const [numberPhone, setNumberPhone] = useState("");
  const [ethnic, setEthnic] = useState("");
  const [numberCIC, setNumberCIC] = useState("");
  const [addressCIC, setAddressCIC] = useState("");
  const [addressEmail, setAddressEmail] = useState("");
  const [gender, setGender] = useState("");
  const [position, setPosition] = useState("");
  const [wage, setWage] = useState("");
  const [department, setDepartment] = useState("");
  const [dateSign, setSign] = useState("");
  const [expired, setExpired] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  //   setStaffCode(staffs.length + 1);
  useEffect(() => {
    // dispatch(getBrand());
    setStaffCode("NV" + staffs.length + 1);
  }, [dispatch, alert, history]);
  console.log(staffCode);
  const genders = ["Nam", "Nữ"];
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Thêm nhân viên thành công");
      history.push("/admin/staffs");
      dispatch({ type: NEW_STAFF_RESET });
    }
  }, [dispatch, alert, error, history, success]);

  const createStaffSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("staffCode", staffCode);
    myForm.set("countryside", countryside);
    myForm.set("address", address);
    myForm.set("dateOfBirth", dateOfBirth);
    myForm.set("numberPhone", numberPhone);
    myForm.set("ethnic", ethnic);
    myForm.set("numberCIC", numberCIC);
    myForm.set("addressCIC", addressCIC);
    myForm.set("addressEmail", addressEmail);
    myForm.set("gender", gender);
    myForm.set("position", position);
    myForm.set("wage", wage);
    myForm.set("department", department);
    myForm.set("dateSign", dateSign);
    myForm.set("expired", expired);
    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(createStaff(myForm));
  };
  const createStaffImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Thêm nhân viên mới</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form
                  encType="multipart/form-data"
                  onSubmit={createStaffSubmitHandler}
                >
                  <Row>
                    <Col className="pr-1" md="4">
                      <Form.Group>
                        <label>Tên nhân viên</label>
                        <Form.Control
                          // defaultValue={name}
                          value={name}
                          placeholder="Nhập tên nhân viên"
                          type="text"
                          onChange={(e) => setName(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pr-1" md="4">
                      <Form.Group>
                        <label>Quê quán</label>
                        <Form.Control
                          // defaultValue={name}
                          value={countryside}
                          placeholder="Nhập quê quán"
                          type="text"
                          onChange={(e) => setCountrySide(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pr-1" md="3">
                      <Form.Group>
                        <label>Địa chỉ hiện tại</label>
                        <Form.Control
                          // defaultValue={name}
                          value={address}
                          placeholder="Nhập địa chỉ hiện tại"
                          type="text"
                          onChange={(e) => setAddress(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col className="pr-1" md="4">
                      <Form.Group>
                        <label>Ngày sinh</label>
                        <Form.Control
                          value={dateOfBirth}
                          placeholder="Nhập ngày sinh"
                          required
                          onChange={(e) => setDetOfBirth(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="4">
                      <Form.Group>
                        <label>Số điện thoại</label>
                        <Form.Control
                          value={numberPhone}
                          placeholder="Số điện thoại"
                          type="number"
                          required
                          onChange={(e) => setNumberPhone(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <label>Email</label>
                        <Form.Control
                          value={addressEmail}
                          placeholder="Nhập email"
                          type="text"
                          onChange={(e) => setAddressEmail(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="4">
                      <Form.Group>
                        <Form.Select
                          className="select-category"
                          aria-label="Default select example"
                          onChange={(e) => setGender(e.target.value)}
                        >
                          <option value="">Chọn giới tính</option>
                          {genders.map((gen) => (
                            <option key={gen} value={gen}>
                              {gen}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>

                    <Col className="pl-1" md="2">
                      <Form.Group>
                        <label>Dân tộc</label>
                        <Form.Control
                          value={ethnic}
                          placeholder="Nhập dân tộc"
                          type="text"
                          onChange={(e) => setEthnic(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="2">
                      <Form.Group>
                        <label>Phòng ban</label>
                        <Form.Control
                          value={department}
                          placeholder="Nhập phòng ban"
                          type="text"
                          onChange={(e) => setDepartment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="2">
                      <Form.Group>
                        <label>Chức vụ</label>
                        <Form.Control
                          value={position}
                          placeholder="Nhập chức vụ"
                          type="text"
                          onChange={(e) => setPosition(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="2">
                      <Form.Group>
                        <label>Lương</label>
                        <Form.Control
                          value={wage}
                          placeholder="Nhập lương"
                          type="text"
                          onChange={(e) => setWage(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pl-1" md="6">
                      <Form.Group>
                        <label>Số căn cước công dân</label>
                        <Form.Control
                          value={numberCIC}
                          placeholder="Nhập số căn cước công dân"
                          type="text"
                          onChange={(e) => setNumberCIC(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="6">
                      <Form.Group>
                        <label>Nơi cấp CCCD</label>
                        <Form.Control
                          value={addressCIC}
                          placeholder="Nhập nơi cấp"
                          type="text"
                          onChange={(e) => setAddressCIC(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pl-1" md="6">
                      <Form.Group>
                        <label>Nhập ngày ký hợp đồng</label>
                        <Form.Control
                          value={dateSign}
                          placeholder="Nhập ngày ký hợp đồng"
                          type="text"
                          onChange={(e) => setSign(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="6">
                      <Form.Group>
                        <label>Nhập ngày hết hạn</label>
                        <Form.Control
                          value={expired}
                          placeholder="Nhập ngày hết hạn hợp đồng"
                          type="text"
                          onChange={(e) => setExpired(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button
                    className="btn-fill pull-right buttonCreate"
                    type="submit"
                    variant="info"
                    disabled={loading ? true : false}
                  >
                    Thêm nhân viên mới
                  </Button>
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col md="4">
            <Card className="card-user">
              <div className="card-imageProduct">
                {imagesPreview.map((image, index) => (
                  <img key={index} src={image} alt="Product Preview" />
                ))}
              </div>
              <hr></hr>

              <div className="button-container mr-auto ml-auto">
                <input
                  type="file"
                  name="avatar"
                  className="inputImageProduct"
                  // style="position:relative;overflow:hidden"
                  // name="avatar"
                  accept="image/*"
                  onChange={createStaffImagesChange}
                  multiple
                />
                {/* */}
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CreateStaff;
