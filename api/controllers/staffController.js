const Staff = require("../models/staffModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");

// Create Staff -- Admin
exports.createStaff = catchAsyncErrors(async (req, res, next) => {
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "staff",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;
  req.body.user = req.user.id;

  const staff = await Staff.create(req.body);

  res.status(201).json({
    success: true,
    staff,
  });
});

// Get All Staff
exports.getAllStaffs = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 8;
  const staffsCount = await Staff.countDocuments();

  const apiFeature = new ApiFeatures(Staff.find(), req.query).search().filter();

  let staffs = await apiFeature.query;

  let filteredStaffsCount = staffs.length;

  apiFeature.pagination(resultPerPage);

  staffs = await apiFeature.query;

  res.status(200).json({
    success: true,
    staffs,
    staffsCount,
    resultPerPage,
    filteredStaffsCount,
  });
});

// Get All Staff (Admin)
exports.getAdminStaffs = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 8;
  const staffsCount = await Staff.countDocuments();

  const apiFeature = new ApiFeatures(Staff.find(), req.query)
    .search()
    .searchId()
    .searchCode()
    .filter();

  let staffs = await apiFeature.query;

  let filteredStaffsCount = staffs.length;

  apiFeature.pagination(resultPerPage);

  staffs = await apiFeature.query;

  res.status(200).json({
    success: true,
    staffs,
    staffsCount,
    resultPerPage,
    filteredStaffsCount,
  });
});

// Get Staff Details
exports.getStaffDetails = catchAsyncErrors(async (req, res, next) => {
  const staff = await Staff.findById(req.params.id);

  if (!staff) {
    return next(new ErrorHander("Không tìm thấy nhân viên", 404));
  }

  res.status(200).json({
    success: true,
    staff,
  });
});

// Update Staff -- Admin

exports.updateStaff = catchAsyncErrors(async (req, res, next) => {
  let staff = await Staff.findById(req.params.id);

  if (!staff) {
    return next(new ErrorHander("Không tìm thấy nhân viên", 404));
  }

  // Images Start Here
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    // Deleting Images From Cloudinary
    for (let i = 0; i < staff.images.length; i++) {
      await cloudinary.v2.uploader.destroy(staff.images[i].public_id);
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "staffs",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }

  staff = await Staff.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    staff,
  });
});

// Delete staff

exports.deleteStaff = catchAsyncErrors(async (req, res, next) => {
  const staff = await Staff.findById(req.params.id);

  if (!staff) {
    return next(new ErrorHander("Không tìm thấy nhân viên", 404));
  }

  // Deleting Images From Cloudinary
  for (let i = 0; i < staff.images.length; i++) {
    await cloudinary.v2.uploader.destroy(staff.images[i].public_id);
  }

  await staff.remove();

  res.status(200).json({
    success: true,
    message: "Xóa thành công",
  });
});
