import React, { useEffect } from "react";

//react-router-dom
import { Link } from "react-router-dom";

//react-redux
import { useSelector, connect } from "react-redux";

//action
import { getDashboard } from "../../store/dashboard/action";
import { getHost } from "../../store/host/action";

//topNav
import TopNav from "../Navbar/Topnav";
import { useDispatch } from "react-redux";

const Dashboard = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDashboard()); 
  }, [dispatch]);
  const data = useSelector((state) => state.dashboard.dashboard);
  return (
    <>
      <TopNav />
      <div class="content">
        <div class="row mt-5 mb-5">
          <div class="col-lg-12 col-md-12">
            <h1 class="text-primary text-center ">Welcome Admin</h1>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <div class="row">
              <div class="col-lg-6 col-md-6">
                <div class="card card-stats">
                  <Link to="/admin/user">
                    <div class="card-body">
                      <div class="row m-2 align-items-center">
                        <div class="col-5">
                          <div class="info-icon text-center icon-primary">
                            <i class="tim-icons icon-single-02"></i>
                          </div>
                        </div>
                        <div class="col-7">
                          <div class="numbers float-right mr-4">
                            <p class="card-category">App User</p>
                            <h3 class="card-title mb-0">{data.user}</h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
              <div class="col-lg-6 col-md-6">
                <div class="card card-stats">
                  <Link to="/admin/complain">
                    <div class="card-body">
                      <div class="row m-2 align-items-center">
                        <div class="col-5">
                          <div class="info-icon text-center icon-warning">
                            <i class="tim-icons icon-notes"></i>
                          </div>
                        </div>
                        <div class="col-7">
                          <div class="numbers  float-right mr-4">
                            <p class="card-category">Complain</p>
                            <h3 class="card-title mb-0">{data.complain}</h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-12">
            <div class="row">
              <div class="col-lg-6 col-md-6">
                <div class="card card-stats">
                  <Link to="/admin/language">
                    <div class="card-body">
                      <div class="row m-2 align-items-center">
                        <div class="col-5">
                          <div class="info-icon text-center icon-success">
                            <i class="tim-icons icon-world"></i>
                          </div>
                        </div>
                        <div class="col-7">
                          <div class="numbers  float-right mr-4">
                            <p class="card-category">Languages</p>
                            <h3 class="card-title mb-0">{data.language}</h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>

              <div class="col-lg-6 col-md-6">
                <div class="card card-stats">
                  <Link to="/admin/host">
                    <div class="card-body">
                      <div class="row m-2 align-items-center">
                        <div class="col-5">
                          <div class="info-icon text-center icon-success">
                            <i class="tim-icons icon-satisfied"></i>
                          </div>
                        </div>
                        <div class="col-7">
                          <div class="numbers  float-right mr-4">
                            <p class="card-category">Total Host</p>
                            <h3 class="card-title mb-0">{data.host}</h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6"></div>

          <div class="col-lg-6 col-md-6">
            <div class="card card-stats">
              <Link to="/admin/plan">
                <div class="card-body">
                  <div class="row m-2 align-items-center">
                    <div class="col-5">
                      <div class="info-icon text-center icon-warning">
                        <i class="tim-icons icon-settings"></i>
                      </div>
                    </div>
                    <div class="col-7">
                      <div class="numbers  float-right mr-4">
                        <p class="card-category">Total Plan</p>
                        <h3 class="card-title mb-0">{data.plan}</h3>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
          <div class="col-lg-3 col-md-6"></div>
        </div>
      </div>
    </>
  );
};

export default connect(null, { getDashboard, getHost })(Dashboard);
