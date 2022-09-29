const express = require("express");
const {
  getAdminStaffs,
  createStaff,
  updateStaff,
  deleteStaff,
  getStaffDetails,
} = require("../controllers/staffController");

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

// router.route("/staffs").get(getAllProducts);

router
  .route("/admin/staffs")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminStaffs);

router
  .route("/admin/staff/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createStaff);

router
  .route("/admin/staff/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateStaff)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteStaff);

router.route("/staff/:id").get(getStaffDetails);
module.exports = router;
