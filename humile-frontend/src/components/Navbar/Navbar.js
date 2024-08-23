import React from "react";

import { useDispatch } from "react-redux";

//react-router-dom
import { NavLink as Link, useHistory } from "react-router-dom";

//custom css
import "../../assets/css/nucleo-icons.css";
import "../../assets/css/black-dashboard.css";

//js
import "../../assets/js/black-dashboard";
import "../../assets/js/plugins/perfect-scrollbar.jquery.min.js";
import "../../assets/js/core/popper.min.js";

//sweet alert
import { warning } from "../../util/alert";

//redux
import { UNSET_ADMIN } from "../../store/admin/types";

//jquery
import $ from "jquery";

const Navbar = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  $("li").click(function () {
    $("li").removeClass("active");
    $(this).addClass("active");
  });

  const handleLogout = () => {
    const data = warning();
    data
      .then((isDeleted) => {
        if (isDeleted) {
          dispatch({ type: UNSET_ADMIN });
          history.push("/");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div class="sidebar" style={{ backgroundColor: "#27293D" }}>
        <div class="sidebar-wrapper" style={{ backgroundColor: "#27293D" }}>
          <div class="logo">
            {/* <Link to="/admin/dashboard">
              <a href="javascript:void(0)" class="simple-text logo-mini">
                Bumble
              </a>
            </Link> */}
            <Link to="/admin/dashboard">
              <a href={() => false} class="simple-text logo-normal ml-5 pl-3">
                Humile
              </a>
            </Link>
          </div>
          <ul class="nav">
            <li class="active">
              <Link to="/admin/dashboard">
                <a href>
                  <i class="tim-icons icon-chart-pie-36"></i>
                  <p>Dashboard</p>
                </a>
              </Link>
            </li>
            <li>
              <Link to="/admin/ad">
                <i class="me-3 fab fa-adversal" aria-hidden="true"></i>
                <span class="hide-menu">Advertisement</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/banner">
                <i class="me-3 fas fa-bold" aria-hidden="true"></i>
                <span class="hide-menu">Banner</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/language">
                <a href>
                  <i class="tim-icons icon-world"></i>
                  <p>Languages</p>
                </a>
              </Link>
            </li>
            <li>
              <Link to="/admin/category">
                <a href>
                  <i class="tim-icons icon-bullet-list-67"></i>
                  <p>Game Category</p>
                </a>
              </Link>
            </li>
            <li>
              <Link to="/admin/game">
                <a href>
                  <i class="tim-icons icon-controller"></i>
                  <p>Game</p>
                </a>
              </Link>
            </li>
            <li>
              <Link to="/admin/message">
                <a href>
                  <i class="tim-icons icon-single-copy-04"></i>
                  <p>Message</p>
                </a>
              </Link>
            </li>

            <li>
              <Link to="/admin/host">
                <a href>
                  <i class="tim-icons icon-satisfied"></i>
                  <p>Host</p>
                </a>
              </Link>
            </li>

            <li>
              <Link to="/admin/topHost">
                <a href>
                  <i class="tim-icons icon-trophy"></i>
                  <p>Top Host</p>
                </a>
              </Link>
            </li>

            <li>
              <Link to="/admin/user">
                <a href>
                  {/* <i class="tim-icons icon-puzzle-10"></i> */}
                  <i class="fas fa-users"></i>
                  <p>App Users</p>
                </a>
              </Link>
            </li>
            <li>
              <Link to="/admin/report">
                <a href>
                  {/* <i class="tim-icons icon-puzzle-10"></i> */}
                  <i class="fas fa-list"></i>
                  <p>Reported User</p>
                </a>
              </Link>
            </li>
            {/* <li>
            
              <a
                class="nav-link collapsed text-truncate"
                href="#submenu1"
                data-toggle="collapse"
                data-target="#submenu1"
              >
                <i class="tim-icons icon-sound-wave"></i>
                <p class="d-sm-inline">Redeem Request</p>
              </a>

              <div class="collapse" id="submenu1" aria-expanded="false">
                <ul class="flex-column pl-3 nav">
                  <li class="nav-item">
                    <Link to="/admin/redeem">
                      <a>
                        <i
                          class="tim-icons icon-triangle-right-17 "
                          style={{ fontSize: 10, paddingTop: 2 }}
                        ></i>
                        <span>Pending Redeem</span>
                      </a>
                    </Link>
                  </li>
                  <li class="nav-item">
                    <Link to="/admin/redeem/accepted">
                      <a>
                        <i
                          class="tim-icons icon-triangle-right-17"
                          style={{ fontSize: 10, paddingTop: 2 }}
                        ></i>
                        <span>Accepted Redeem</span>
                      </a>
                    </Link>
                  </li>
                </ul>
              </div>
           
            </li> */}
            <li>
              {/* <Link to="/admin/complain"> */}

              <a
                class="nav-link collapsed text-truncate"
                href="#submenu2"
                data-toggle="collapse"
                data-target="#submenu2"
              >
                <i class="tim-icons icon-notes"></i>
                <p class="d-sm-inline">Complain</p>
              </a>

              <div class="collapse" id="submenu2" aria-expanded="false">
                <ul class="flex-column pl-3 nav">
                  <li class="nav-item">
                    <Link to="/admin/complain">
                      <a href>
                        <i
                          class="tim-icons icon-triangle-right-17 "
                          style={{ fontSize: 10, paddingTop: 2 }}
                        ></i>
                        <span>Pending Complain</span>
                      </a>
                    </Link>
                  </li>
                  <li class="nav-item">
                    <Link to="/admin/complain/solved">
                      <a href>
                        <i
                          class="tim-icons icon-triangle-right-17"
                          style={{ fontSize: 10, paddingTop: 2 }}
                        ></i>
                        <span>Solved Complain</span>
                      </a>
                    </Link>
                  </li>
                </ul>
              </div>
              {/* </Link> */}
            </li>
            <li>
              <Link to="/admin/plan">
                <a href>
                  <i class="tim-icons icon-settings"></i>
                  <p>Plan</p>
                </a>
              </Link>
            </li>
            <li>
              <Link to="/admin/setting">
                <a href>
                  <i class="tim-icons icon-settings-gear-63"></i>
                  <p>Setting</p>
                </a>
              </Link>
            </li>
            <li>
              <Link to="/admin/profile">
                <a href>
                  <i class="tim-icons icon-single-02"></i>
                  <p>User Profile</p>
                </a>
              </Link>
            </li>

            <li class="active-pro">
              <a onClick={handleLogout} href>
                <i class="tim-icons icon-button-power"></i>
                <p>Logout</p>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
