import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation,
} from "react-router-dom";
import { loadUser } from "./actions/userAction";
import store from "./store";
import AdminNavbar from "components/Navbars/AdminNavbar";
import Dashboard from "./views/Dashboard";
import Sidebar from "./components/Sidebar/Sidebar";
import FixedPlugin from "./components/FixedPlugin/FixedPlugin";
import sidebarImage from "assets/img/sidebar-3.jpg";
import ProtectedRoute from "./components/Route/ProtectedRoute";
import Footer from "./components/Footer/Footer";
import LoginSignUp from "./components/User/LoginSignUp";
import routes from "routes.js";
import UserList from "./views/User/UserList";
import UserUpdate from "./views/User/UserUpdate";
import CreateUser from "./views/User/CreateUser";
import Staffs from "./views/Staffs/Staffs";
import CreateStaff from "./views/Staffs/CreateStaff";
import UpdateStaff from "./views/Staffs/UpdateStaff";
import SearchStaff from "./views/Staffs/SearchStaff";
const App = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [color, setColor] = React.useState("black");
  const [image, setImage] = React.useState(sidebarImage);
  const [hasImage, setHasImage] = React.useState(true);
  const mainPanel = React.useRef(null);

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainPanel.current.scrollTop = 0;
    if (
      window.innerWidth < 993 &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
      var element = document.getElementById("bodyClick");
      element.parentNode.removeChild(element);
    }
  }, [location]);
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  window.addEventListener("contextmenu", (e) => e.preventDefault());
  return (
    <Router>
      {isAuthenticated}

      <div className="wrapper">
        <Sidebar color={color} image={hasImage ? image : ""} routes={routes} />

        <div className="main-panel" ref={mainPanel}>
          <AdminNavbar />
          <div className="content">
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <ProtectedRoute
                isAdmin={true}
                exact
                path="/admin/dashboard"
                component={Dashboard}
              />
              <Route exact path="/login" component={LoginSignUp} />
              <ProtectedRoute
                exact
                path="/admin/user/:id"
                isAdmin={true}
                component={UserUpdate}
              />
              <ProtectedRoute
                exact
                path="/admin/staffs"
                isAdmin={true}
                component={Staffs}
              />
              {/* <Route
                exact
                path="/admin/staffs/:code"
                isAdmin={true}
                component={Staffs}
              /> */}
              <Route
                exact
                path="/admin/searchStaff/:staffCode"
                isAdmin={true}
                component={SearchStaff}
              />
              <Route
                exact
                path="/admin/staffs/:keyword"
                isAdmin={true}
                component={Staffs}
              />
              <ProtectedRoute
                exact
                path="/admin/staff/:id"
                isAdmin={true}
                component={UpdateStaff}
              />
              <ProtectedRoute
                exact
                path="/admin/createStaff"
                isAdmin={true}
                component={CreateStaff}
              />
              <ProtectedRoute
                exact
                path="/admin/searchStaff"
                isAdmin={true}
                component={SearchStaff}
              />
              <ProtectedRoute
                isAdmin={true}
                exact
                path="/admin/users"
                component={UserList}
              />
              <ProtectedRoute
                isAdmin={true}
                exact
                path="/admin/createUser"
                component={CreateUser}
              />
            </Switch>
          </div>
          <Footer />
        </div>
      </div>
    </Router>
  );
};

export default App;
