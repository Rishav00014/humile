/* eslint-disable  no-unused-vars*/
import React, { useState, useEffect } from "react";

//react-router-dom
import { Link, NavLink, useHistory } from "react-router-dom";

//react-redux
import { useSelector, connect } from "react-redux";

import { TablePagination, Typography } from "@material-ui/core";

//action
import { rechargeHistory, callHistory } from "../../store/user/action";

//topNav
import TopNav from "../Navbar/Topnav";

//no image photo
import Images from "../../images/no_image.jpg";

import TablePaginationActions from "../Tables/TablePagination";

const UserProfile = (props) => {
  const { dialogData, recharge, callHistory } = useSelector(
    (state) => state.user
  );

  const [name, setName] = useState(" ");
  const [userName, setUserName] = useState(" ");
  const [email, setEmail] = useState(" ");
  const [coin, setCoin] = useState(" ");
  const [image, setImage] = useState(" ");
  const [mongoId, setMongoId] = useState("");

  useEffect(() => {
    setName(dialogData?.name);
    setUserName(dialogData?.username);
    setEmail(dialogData?.email);
    setCoin(dialogData?.coin);
    setImage(dialogData?.image);
    setMongoId(dialogData?._id);
  }, [dialogData]);

  useEffect(() => {
    props.rechargeHistory(dialogData?._id);

    props.callHistory(dialogData?._id); 
  }, [dialogData?._id]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, callHistory.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <TopNav />
      <div class="content">
        <div class="row">
          <div class="col-md-12">
            <div class="card card-user">
              <div class="card-header text-center mb-4">
                <h4 class="title">About User</h4>
              </div>
              <div class="row mb-4">
                <div className="col-md-2 mt-2">
                  <img
                    src={image === "null" ? Images : image}
                    width="120px"
                    height="120px"
                    alt="img"
                    style={{
                      objectFit: "contain",

                      float: "right",
                    }}
                  ></img>
                </div>
                <div className="col-md-10">
                  <div class="container mt-1">
                    <p class="p-1">
                      <b class="text-primary pr-2">Name :</b> {name}
                    </p>
                    <p class="p-1">
                      <b class="text-primary pr-2">User Name :</b>
                      {userName}
                    </p>
                    <p class="p-1">
                      <b class="text-primary pr-2">email :</b>
                      {email}
                    </p>
                    <p class="p-1">
                      <b class="text-primary pr-2">coin :</b>
                      {coin}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-12">
            <div class="row ">
              <div className="col-md-5 mt-2">
                <div class="card card-user">
                  <div class="card-header text-center mb-4">
                    <h4 class="title">User Recharge History</h4>
                  </div>
                  <table class="table tablesorter">
                    <thead class="text-primary">
                      <tr>
                        <th class="text-primary text-center">Date</th>
                        <th class="text-primary text-center">Coin</th>
                        <th class="text-primary text-center">Rupee</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recharge.length > 0 ? (
                        recharge.map((data) => {
                          return (
                            <tr>
                              <td align="center">{data.date}</td>
                              <td align="center">{data.coin}</td>
                              <td align="center">
                                {data.data === -1 ? "By Admin" : data.data}
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan="3" align="center">
                            Nothing to Show!
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="col-md-7 mt-2">
                <div class="card card-user">
                  <div class="card-header text-center mb-4">
                    <h4 class="title">User Call History</h4>
                  </div>
                  <table class="table tablesorter">
                    <thead class="text-primary">
                      <tr>
                        <th class="text-primary pl-5 ml-3">Name</th>
                        <th class="text-primary text-center">Date</th>
                        <th class="text-primary text-center">Time</th>
                        {/* <th class="text-primary text-center">Duration</th> */}
                        <th class="text-primary text-center">Coin</th>
                      </tr>
                    </thead>
                    <tbody>
                      {callHistory && callHistory.length > 0 ? (
                        (rowsPerPage > 0
                          ? callHistory.slice(
                              page * rowsPerPage,
                              page * rowsPerPage + rowsPerPage
                            )
                          : callHistory
                        ).map((data, index) => {
                          var d = Number(data.duration);
                          var h = Math.floor(d / 3600)
                            .toString()
                            .padStart(2, "0");
                          var m = Math.floor((d % 3600) / 60)
                            .toString()
                            .padStart(2, "0");
                          var s = Math.floor(d % 60)
                            .toString()
                            .padStart(2, "0");
                          return (
                            <>
                              <tr>
                                <td align="left" class>
                                  <img
                                    src={data.image}
                                    height="50px"
                                    width="50px"
                                    alt="img"
                                    style={{ borderRadius: "50%" }}
                                    className="mr-3 ml-3"
                                  />
                                  <span>
                                    {data.name} {data.data}
                                  </span>
                                </td>
                                <td align="center">{data.date}</td>
                                <td align="center">At {data.time}</td>
                                {/* <td align="center">{h + ":" + m + ":" + s}</td> */}
                                <td align="center">{data.coin}</td>
                              </tr>
                            </>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan="5" align="center">
                            Nothing to Show!
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                  {callHistory.length > 0 && (
                    <div class="py-2">
                      <TablePagination
                        id="pagination"
                        component="div"
                        rowsPerPageOptions={[
                          5,
                          10,
                          25,
                          100,
                          { label: "All", value: -1 },
                        ]}
                        count={callHistory.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        SelectProps={{
                          inputProps: { "aria-label": "rows per page" },
                          native: true,
                        }}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                        ActionsComponent={TablePaginationActions}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default connect(null, { rechargeHistory, callHistory })(UserProfile);
