import React, { useState, useEffect } from "react";

//react-redux
import { useSelector, connect } from "react-redux";

//action
import { recentCallHistory, incomeCallHistory } from "../../store/host/action";

//no image photo
import Images from "../../images/no_image.jpg";

import {
  FormControl,
  MenuItem,
  Select,
  TablePagination,
} from "@material-ui/core";

//topNav
import TopNav from "../Navbar/Topnav";

import TablePaginationActions from "../Tables/TablePagination";

const HostHistory = (props) => {
  const { recentHistory, incomingHistory } = useSelector((state) => state.host);
  const [day, setDay] = useState("lifetime");

  const id = props.match.params.id;

  useEffect(() => {
    props.recentCallHistory(id);
    props.incomeCallHistory(id, day); 
  }, [id]);

  useEffect(() => {
    props.incomeCallHistory(id, day); 
  }, [day]);

  let arr = [];
  useEffect(() => {
    
    recentHistory.map((doc) => {
      if (doc.name === "ChumYou User" && doc.user_id !== "") {
        doc.name = "Guest_" + doc.user_id.slice(16, 25);
        arr.push(doc);
      } else if (doc.user_id === "") {
        doc.name = "By Admin";
        doc.username = "By Admin";

        array.push(doc);
      } else {
        arr.push(doc);
      }
    });

    setRecent(arr); 
  }, [recentHistory]);

  let array = [];
  useEffect(() => {
    
    incomingHistory.map((doc) => {
      if (doc.name === "ChumYou User" && doc.user_id !== "") {
        doc.name = "Guest_" + doc.user_id.slice(16, 25);
        array.push(doc);
      } else if (doc.user_id === "") {
        doc.name = "By Admin";
        doc.username = "By Admin";
        array.push(doc);
      } else {
        array.push(doc);
      }
    });
    setIncoming(array); 
  }, [incomingHistory]);

  const handleDropDown = (day) => {
    setDay(day);
  };

  const [recent, setRecent] = useState([]);
  const [incoming, setIncoming] = useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [recentPage, setRecentPage] = useState(0);
  const [RecentRowsPerPage, setRecentRowsPerPage] = useState(5);

  // const emptyRowsRecent =
  //   RecentRowsPerPage -
  //   Math.min(RecentRowsPerPage, recent.length - page * RecentRowsPerPage);

  // const emptyRows =
  //   rowsPerPage - Math.min(rowsPerPage, incoming.length - page * rowsPerPage);

  const handleRecentChangePage = (event, newPage) => {
    setRecentPage(newPage);
  };

  const handleRecentChangeRowsPerPage = (event) => {
    setRecentRowsPerPage(parseInt(event.target.value, 10));
    setRecentPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRecentSearch = (e) => {
    const value = e.target.value.toUpperCase();
    if (value) {
      const data = recentHistory.filter((data) => {
        return (
          data?.name?.toUpperCase()?.indexOf(value) > -1 ||
          data?.username?.toUpperCase()?.indexOf(value) > -1 ||
          data?.time?.toUpperCase()?.indexOf(value) > -1
        );
      });
      setRecent(data);
    } else {
      return setRecent(recentHistory);
    }
  };

  const handleIncomingSearch = (e) => {
    const value = e.target.value.toUpperCase();
    if (value) {
      const data = incomingHistory.filter((data) => {
        return (
          data?.name?.toUpperCase()?.indexOf(value) > -1 ||
          data?.username?.toUpperCase()?.indexOf(value) > -1 ||
          data?.time?.toUpperCase()?.indexOf(value) > -1
        );
      });
      setIncoming(data);
    } else {
      return setIncoming(recentHistory);
    }
  };

  return (
    <>
      <TopNav />
      <div class="content">
        <div class="col-md-12">
          <div class="card card-user">
            <div class="card-header text-center mt-2">
              <h4 class="title">Recent Call History</h4>
            </div>
            <div class="card-body">
              <div class="card card-user">
                <div class="col-xs-12 col-sm-12  col-lg-4 mt-3 float-left">
                  <form action="">
                    <div class="input-group mb-4 border rounded-pill ">
                      <div class="input-group-prepend border-0">
                        <div
                          id="button-addon4"
                          class="btn btn-link text-primary"
                        >
                          <i class="fa fa-search"></i>
                        </div>
                      </div>
                      <input
                        type="search"
                        placeholder="What're you searching for?"
                        aria-describedby="button-addon4"
                        class="form-control bg-none border-0 rounded-pill text-white"
                        onChange={handleRecentSearch}
                      />
                    </div>
                  </form>
                </div>
                <table class="table tablesorter">
                  <thead class="text-primary">
                    <tr>
                      <th class="text-primary pl-5 ml-3">Name</th>
                      <th class="text-primary text-center">UserName</th>
                      <th class="text-primary text-center">At</th>
                      <th class="text-primary text-center">Time</th>
                      <th class="text-primary text-center">Coin</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recent && recent.length > 0 ? (
                      recent.map((data) => {
                        return (
                          <tr>
                            <td align="left" class>
                              <img
                                src={
                                  data.image === "null" ? Images : data.image
                                }
                                height="50px"
                                width="50px"
                                alt="img"
                                style={{ borderRadius: "50%" }}
                                className="mr-3 ml-4"
                              />
                              <span>
                                {data.name === "FATFAT User"
                                  ? "Guest_" + data.user_id.slice(16, 25)
                                  : data.name}
                              </span>
                            </td>

                            <td align="center">{data.username}</td>
                            <td align="center">{data.at}</td>
                            <td align="center">{data.time}</td>
                            <td align="center">{data.coin}</td>
                          </tr>
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
                {recent.length > 0 && (
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
                      count={recent.length}
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

        <div class="col-md-12">
          <div class="card card-user">
            <div class="card-header text-center">
              <h4 class="title">Incoming Call History</h4>
            </div>
            <div class="card-body">
              <div class="card card-user">
                <div class="row">
                  <div class=" col-md-4 mb-4">
                    <div class="input-group mb-4 border rounded-pill ">
                      <div class="input-group-prepend border-0">
                        <div
                          id="button-addon4"
                          class="btn btn-link text-primary"
                        >
                          <i class="fa fa-search"></i>
                        </div>
                      </div>
                      <input
                        type="search"
                        placeholder="What're you searching for?"
                        aria-describedby="button-addon4"
                        class="form-control bg-none border-0 rounded-pill text-white"
                        onChange={handleIncomingSearch}
                      />
                    </div>
                  </div>
                  <div class=" col-md-8 mb-4">
                    <FormControl class="float-right">
                      <Select
                        labelId="demo-controlled-open-select-label"
                        className="mr-3"
                        id="dropdown"
                        onChange={(e) => handleDropDown(e.target.value)}
                        defaultValue="lifetime"
                      >
                        <MenuItem value="today">Today</MenuItem>
                        <MenuItem value="yesterday">Yesterday</MenuItem>;
                        <MenuItem value="week">This Week</MenuItem>;
                        <MenuItem value="7">Last 7 days</MenuItem>;
                        <MenuItem value="15">Last 15 days</MenuItem>;
                        <MenuItem value="month">This Month</MenuItem>;
                        <MenuItem value="lifetime">LifeTime</MenuItem>;
                      </Select>
                    </FormControl>
                  </div>
                </div>
                <table class="table tablesorter">
                  <thead class="text-primary">
                    <tr>
                      <th class="text-primary pl-5 ml-3">Name</th>
                      <th class="text-primary text-center">UserName</th>
                      <th class="text-primary text-center">At</th>
                      <th class="text-primary text-center">Time</th>
                      <th class="text-primary text-center">Coin</th>
                    </tr>
                  </thead>
                  <tbody>
                    {incoming && incoming.length > 0 ? (
                      incoming.map((data) => {
                        return (
                          <tr>
                            <td align="left" class>
                              <img
                                src={
                                  data.image === "null" ? Images : data.image
                                }
                                height="50px"
                                width="50px"
                                alt="img"
                                style={{ borderRadius: "50%" }}
                                className="mr-3 ml-4"
                              />
                              <span>
                                {data.name === "FATFAT User"
                                  ? "Guest_" + data.user_id.slice(16, 25)
                                  : data.name}
                              </span>
                            </td>

                            <td align="center">{data.username}</td>
                            <td align="center">{data.at}</td>
                            <td align="center">{data.time}</td>
                            <td align="center">{data.coin}</td>
                          </tr>
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
                {incoming.length > 0 && (
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
                      count={incoming.length}
                      rowsPerPage={RecentRowsPerPage}
                      page={recentPage}
                      SelectProps={{
                        inputProps: { "aria-label": "rows per page" },
                        native: true,
                      }}
                      onChangePage={handleRecentChangePage}
                      onChangeRowsPerPage={handleRecentChangeRowsPerPage}
                      ActionsComponent={TablePaginationActions}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default connect(null, { recentCallHistory, incomeCallHistory })(
  HostHistory
);
