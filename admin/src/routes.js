import Dashboard from "views/Dashboard.js";
import UserProfile from "views/UserProfile.js";
import TableList from "views/TableList.js";
import Typography from "views/Typography.js";
import Icons from "views/Icons.js";
import Maps from "views/Maps.js";
import Notifications from "views/Notifications.js";
import Upgrade from "views/Upgrade.js";
import { GiAbbotMeeple } from "react-icons/gi";
const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    layout: "/admin",
  },
  {
    path: "/staffs",
    name: "Danh sách nhân viên",
    icon: "nc-icon nc-notes",
    layout: "/admin",
  },
  {
    path: "/staffs",
    name: "Quản lý chế độ",
    icon: "nc-icon nc-app",
    layout: "/admin",
  },
  {
    path: "/staffs",
    name: "Quản lý phòng ban",
    icon: "nc-icon nc-bank",
    layout: "/admin",
  },
  {
    path: "/staffs",
    name: "Báo cáo",
    icon: "nc-icon nc-paper-2",
    layout: "/admin",
  },
  {
    path: "/staffs",
    name: "Quản lý lương",
    icon: "nc-icon nc-money-coins",
    layout: "/admin",
  },
  {
    path: "/users",
    name: "Quản lý tài khoản",
    icon: "nc-icon nc-single-02",
    layout: "/admin",
  },
];

export default dashboardRoutes;
