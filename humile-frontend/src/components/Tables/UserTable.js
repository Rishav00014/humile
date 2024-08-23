import React, { useEffect, useState } from "react";
import Pagination from "react-js-pagination";

//react-redux
import { connect, useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

//action
import {
  getUser,
  blockUnblockUser,
  editCoin,
  createUserHistory,
} from "../../store/user/action";

//dayjs
import dayjs from "dayjs";

import { Snackbar } from "@material-ui/core";

//topNav
import TopNav from "../Navbar/Topnav";

//no image photo
import Images from "../../images/images.webp";

//inline edit
import EdiText from "react-editext";
import { OPEN_USER_DIALOG } from "../../store/user/types";
import { Alert } from "@material-ui/lab";
import FemaleImage from '../../assets/img/anime6.png'
//Date-range-picker
import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap-daterangepicker/daterangepicker.css";

const UserTable = (props) => {
  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState("ALL");
  const [startDate, setStartDate] = useState("ALL");
  const [endDate, setEndDate] = useState("ALL");
  const [coin, setCoin] = useState();
  const [isCoin, setIsCoin] = useState(false);

  const [coinError, setCoinError] = useState(null);
  const [openCoinError, setOpenCoinError] = useState(false);

  const { user, userTotal } = useSelector((state) => state.user);

  useEffect(() => {
    setIsCoin(false);
    setData(user);
  }, [user]);

  useEffect(() => {
    if (search === "" || search) {
      dispatch(getUser(startDate, endDate, search, activePage, rowsPerPage)); 
    }
  }, [startDate, endDate, search, activePage, rowsPerPage]);

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
    dispatch(getUser(startDate, endDate, search, pageNumber, rowsPerPage));
  };

  const handleSave = (coin, id, oldCoin) => {
    let newCoin = 0;
    setIsCoin(true);

    if (oldCoin < coin) {
      newCoin = coin - oldCoin;
    } else {
      setOpenCoinError(true);
      setCoinError("You Can't less User Coin");
      dispatch(getUser(startDate, endDate, search, activePage, rowsPerPage));
      return true;
    }
    props.editCoin({ coin }, id);
    const data = {
      coin: newCoin,
      plan_id: "111111111111111111111111",
      user_id: id,
    };
    props.createUserHistory(data);
    setCoin(coin);
  };

  const handleUserProfile = (data) => {
    dispatch({ type: OPEN_USER_DIALOG, payload: data });
  };

  const handleCloseError = () => {
    setOpenCoinError(false);
    setCoin(null);
  };

  //Apply button function for analytic
  const handleApply = (event, picker) => {
    picker.element.val(
      picker.startDate.format("YYYY/MM/DD") +
        " - " +
        picker.endDate.format("YYYY/MM/DD")
    );
    const dayStart = dayjs(picker.startDate).format("YYYY-MM-DD");

    const dayEnd = dayjs(picker.endDate).format("YYYY-MM-DD");

    setStartDate(dayStart);
    setEndDate(dayEnd);

    dispatch(getUser(startDate, endDate, search, activePage, rowsPerPage));
  };

  //Cancel button function for analytic
  const handleCancel = (event, picker) => {
    picker.element.val("");
    dispatch(getUser("ALL", "ALL", search, activePage, rowsPerPage));
  };

  return (
    <>
      <TopNav />
      <Snackbar
        open={openCoinError}
        autoHideDuration={2000}
        onClose={handleCloseError}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleCloseError} severity="error">
          {coinError}
        </Alert>
      </Snackbar>
      <div class="content">
        <div class="row">
          <div class="card">
            <div class="card-header pt-4 pl-5 ml-2"></div>
            <div>
              <div class="col-xs-12 col-sm-12  col-lg-4 mt-3 float-right">
                <form action="">
                  <div class="input-group mb-4 border rounded-pill ">
                    <div class="input-group-prepend border-0">
                      <div id="button-addon4" class="btn btn-link text-primary">
                        <i class="fa fa-search"></i>
                      </div>
                    </div>
                    <input
                      type="search"
                      placeholder="What're you searching for?"
                      aria-describedby="button-addon4"
                      class="form-control bg-none border-0 rounded-pill text-white"
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                </form>
              </div>
              <div class="mt-4 float-left mx-4 ">
                <h4 class="text-primary">User Table</h4>
              </div>
              <div class="col-md-8 col-12 align-self-center mt-3">
                <div className="text-end px-md-5 "></div>
              </div>
            </div>

            <div class=" float-left mx-4 ">
              <DateRangePicker
                initialSettings={{
                  autoUpdateInput: false,
                  locale: {
                    cancelLabel: "Clear",
                  },
                  maxDate: new Date(),

                  buttonClasses: ["btn btn-dark"],
                }}
                onApply={handleApply}
                onCancel={handleCancel}
              >
                <input
                  type="text"
                  class="daterange form-control float-left "
                  placeholder="Select Date"
                  style={{ width: 180, fontWeight: 700 }}
                />
              </DateRangePicker>
            </div>

            <div class="mt-4 float-left mx-4 ">
              <h4 class="text-primary">Total User : {userTotal}</h4>
            </div>
            <div class="card-body" style={{ overflowX: "auto" }}>
              <table
                id="example"
                class="table display"
                style={{ width: "100%" }}
              >
                <thead>
                  <tr>
                    <th>Index</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Coin</th>
                    <th>Created At</th>
                    <th>View</th>
                  </tr>
                </thead>
                <tbody>
                  {data.length > 0 ? (
                    <>
                      {data.map((data, index) => {
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                              <img
                                src={
                                  data.image === "null" ? Images : data.image
                                }
                                width="70px"
                                height="70px"
                                alt="img"
                                style={{
                                  objectFit: "contain",
                                  borderRadius: "50%",
                                }}
                              ></img>
                            </td>
                            <td>{data.guest}</td>
                            <td align="left">
                              <EdiText
                                type="text"
                                value={isCoin ? coin : data.coin}
                                onSave={(val) =>
                                  handleSave(val, data._id, data.coin)
                                }
                                className="editClass"
                              />
                            </td>

                            <td style={{ verticalAlign: "middle" }}>
                              {data.analyticDate ? data.analyticDate : "-"}
                            </td>

                            <td>
                              <Link to={"/admin/user/profile/" + data._id}>
                                <button
                                  type="button"
                                  class="btn btn-fill btn-primary btn-sm"
                                  style={{ borderRadius: 5 }}
                                  onClick={() => handleUserProfile(data)}
                                >
                                  <i class="fas fa-eye text-white pr-2"></i>View
                                </button>
                              </Link>
                            </td>
                          </tr>
                        );
                      })}
                    </>
                  ) : (
                    <tr>
                      <td colSpan="9" align="center">
                        Nothing to show!!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              <div class="py-2">
                <div className="row">
                  <div className="col-md-2 d-flex float-left">
                    <span className="m-auto">Select</span>
                    <select
                      class="form-select form-control mr-3 ml-2 mb-2 mb-md-0 mb-lg-0"
                      aria-label="Default select example"
                      onChange={(e) => {
                        setRowsPerPage(e.target.value);
                      }}
                      style={{ borderColor: "#e14eca" }}
                    >
                      <option class="text-dark" value={5}>
                        5
                      </option>
                      <option class="text-dark" value={10} selected>
                        10
                      </option>
                      <option class="text-dark" value={25}>
                        25
                      </option>
                      <option class="text-dark" value={50}>
                        50
                      </option>
                      <option class="text-dark" value={100}>
                        100
                      </option>
                      <option class="text-dark" value={200}>
                        200
                      </option>
                      <option class="text-dark" value={500}>
                        500
                      </option>
                      <option class="text-dark" value={1000}>
                        1000
                      </option>
                      <option class="text-dark" value={5000}>
                        5000
                      </option>
                      {/* <option class="text-dark" value="10000">
                        10000
                      </option> */}
                      {/* <option class="text-dark" value="20000">
                        20000
                      </option> */}
                    </select>
                  </div>
                  <div className="col-md-6"></div>
                  <div className="col-md-4 float-right">
                    <Pagination
                      activePage={activePage}
                      itemsCountPerPage={rowsPerPage}
                      totalItemsCount={userTotal}
                      pageRangeDisplayed={3}
                      onChange={(page) => handlePageChange(page)}
                      itemClass="page-item"
                      linkClass="page-link"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default connect(null, {
  getUser,
  blockUnblockUser,
  editCoin,
  createUserHistory,
})(UserTable);
