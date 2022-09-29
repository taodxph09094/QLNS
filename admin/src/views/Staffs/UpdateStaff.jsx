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
import { UPDATE_STAFF_RESET } from "../../constants/staffConstants";
import {
  clearErrors,
  getStaffDetails,
  updateStaff,
} from "../../actions/staffAction";
const UpdateStaff = ({ history, match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, staff } = useSelector((state) => state.staffDetails);
  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.staff);
  const [name, setName] = useState("");
  const [staffCode, setStaffCode] = useState();
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
  const [rank, setRank] = useState("");
  const [dateSign, setSign] = useState("");
  const [expired, setExpired] = useState("");
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  //   setStaffCode(staffs.length + 1);

  const genders = ["Nam", "Nữ"];
  const staffId = match.params.id;
  console.log(staffId);
  useEffect(() => {
    if (staff && staff._id !== staffId) {
      dispatch(getStaffDetails(staffId));
    } else {
      setStaffCode(staff.staffCode);
      setName(staff.name);
      setCountrySide(staff.countryside);
      setAddress(staff.address);
      setDetOfBirth(staff.dateOfBirth);
      setNumberPhone(staff.numberPhone);
      setEthnic(staff.ethnic);
      setNumberCIC(staff.numberCIC);
      setAddressCIC(staff.addressCIC);
      setAddressEmail(staff.addressEmail);
      setGender(staff.gender);
      setPosition(staff.position);
      setRank(staff.rank);
      setSign(staff.dateSign);
      setExpired(staff.expired);
      setOldImages(staff.images);
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Sửa thông tin nhân viên thành công");
      history.push("/admin/staffs");
      dispatch({ type: UPDATE_STAFF_RESET });
    }
  }, [dispatch, alert, error, history, isUpdated, staffId, staff, updateError]);

  const updateStaffSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("staffCode", staffCode);
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
    myForm.set("rank", rank);
    myForm.set("dateSign", dateSign);
    myForm.set("expired", expired);
    images.forEach((image) => {
      myForm.append("images", image);
    });
    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(updateStaff(staffId, myForm));
  };
  const updateStaffImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);
    setOldImages([]);

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
                <Card.Title as="h4">Sửa thông tin nhân viên</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form
                  encType="multipart/form-data"
                  onSubmit={updateStaffSubmitHandler}
                >
                  <Row>
                    <Col className="pr-1" md="4">
                      <Form.Group>
                        <label>Tên nhân viên</label>
                        <Form.Control
                          defaultValue={name}
                          //   value={name}
                          //   placeholder="Nhập tên nhân viên"
                          type="text"
                          onChange={(e) => setName(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pr-1" md="4">
                      <Form.Group>
                        <label>Quê quán</label>
                        <Form.Control
                          defaultValue={countryside}
                          //   placeholder="Nhập quê quán"
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
                          defaultValue={address}
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
                          defaultValue={dateOfBirth}
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
                          defaultValue={numberPhone}
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
                          defaultValue={addressEmail}
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
                          <option value="">{gender}</option>
                          {genders.map((gen) => (
                            <option key={gen} value={gen}>
                              {gen}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>

                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <label>Dân tộc</label>
                        <Form.Control
                          defaultValue={ethnic}
                          placeholder="Nhập dân tộc"
                          type="text"
                          onChange={(e) => setEthnic(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="2">
                      <Form.Group>
                        <label>Chức vụ</label>
                        <Form.Control
                          defaultValue={position}
                          placeholder="Nhập chức vụ"
                          type="text"
                          onChange={(e) => setPosition(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="2">
                      <Form.Group>
                        <label>Rank chức vụ</label>
                        <Form.Control
                          defaultValue={rank}
                          placeholder="Nhập rank"
                          type="text"
                          onChange={(e) => setRank(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pl-1" md="6">
                      <Form.Group>
                        <label>Số căn cước công dân</label>
                        <Form.Control
                          defaultValue={numberCIC}
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
                          defaultValue={addressCIC}
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
                          defaultValue={dateSign}
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
                          defaultValue={expired}
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
                    Chỉnh sửa nhân viên
                  </Button>
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col md="4">
            <Card className="card-user">
              <label>Ảnh cũ</label>
              <div className="card-imageProduct">
                {oldImages &&
                  oldImages.map((image, index) => (
                    <img
                      className="oldImagesProduct"
                      key={index}
                      src={image.url}
                      alt="Old Product Preview"
                    />
                  ))}
              </div>
            </Card>
            <Card>
              <label>Ảnh mới</label>
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
                  onChange={updateStaffImagesChange}
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

export default UpdateStaff;
