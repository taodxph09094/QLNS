const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Nhập tên nhân viên"],
    trim: true,
  },
  staffCode: {
    type: String,
    // default: 1,
    trim: true,
  },
  countryside: {
    type: String,
    required: [true, "Nhập quê quán"],
  },
  address: {
    type: String,
    required: [true, "Nhập địa chỉ hiện tại"],
  },
  dateOfBirth: {
    type: String,
    required: [true, "Nhập ngày sinh"],
  },
  numberPhone: {
    type: String,
    required: [true, "Nhập số điện thoại"],
  },
  ethnic: {
    type: String,
    required: ["Nhập dân tộc"],
  },
  numberCIC: {
    type: String,
    trim: true,
  },
  addressCIC: {
    type: String,
    required: ["Nhập nơi cấp căn cước công dân"],
  },
  addressEmail: {
    type: String,
    required: ["Nhập địa chỉ email"],
  },
  gender: {
    type: String,
    required: ["Nhập giới tính"],
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  position: {
    type: String,
    required: [true, "Nhập chức vụ"],
  },
  rank: {
    type: String,
    required: [true, "Nhập chọn rank"],
  },
  dateSign: {
    type: String,
    required: [true, "Nhập ngày ký hợp đồng"],
  },
  wage: {
    type: Number,
    required: [true, "Nhập lương"],
  },
  room: {
    type: String,
    required: [true, "Nhập phòng ban làm việc"],
  },
  expired: {
    type: String,
    required: [true, "Nhập ngày hết hạn hợp đồng"],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Staff", staffSchema);
