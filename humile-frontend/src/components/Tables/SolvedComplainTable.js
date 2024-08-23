import React, { useEffect, useState } from "react";

//react-redux
import { connect, useSelector, useDispatch } from "react-redux";

//action
import {
  getSolvedComplain,
  getAcceptedDateList,
} from "../../store/complain/action";
import { OPEN_COMPLAIN_DIALOG } from "../../store/complain/types";

//dayjs
import dayjs from "dayjs";

//datepicker
import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap-daterangepicker/daterangepicker.css";

//MUI

import TablePaginationActions from "./TablePagination";

//serverPath
import { baseURL } from "../../util/ServerPath";

//topNav
import TopNav from "../Navbar/Topnav";

import {
  FormControl,
  MenuItem,
  Select,
  TablePagination,
} from "@material-ui/core";

//dialog
import ComplainDialog from "../Dialog/ComplainDialog";

//no image logo
import Images from "../../images/images.webp";
const SolvedComplainTable = (props) => {
  const dispatch = useDispatch();

  const [data, setData] = useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  const [date, setDate] = useState("");

  const [start, setStart] = useState("all");
  const [end, setEnd] = useState("all");

  const complain = useSelector((state) => state.complain.solvedComplain);

  // const [date, setDate] = useState("all");
  const [type, setType] = useState("all");

  let arr = [];
  useEffect(() => {
    dispatch(getSolvedComplain(start, end, type));
    dispatch(getAcceptedDateList()); 
  }, [dispatch]);

  useEffect(() => {
    
    complain.map((complain) => {
      if (complain.host_id) {
        if (!complain.host_id.isDeleted) return arr.push(complain);
      } else {
        arr.push(complain);
      }
    });
    setData(arr); 
  }, [complain]);

  let array = [];

  useEffect(() => {
    
    complain.map((doc) => {
      if (doc.host_id?.name === "FATFAT User") {
        doc.host_id.name = "Guest_" + doc._id.slice(16, 25);
        array.push(doc);
      } else if (doc.user_id?.name === "FATFAT User") {
        doc.user_id.name = "Guest_" + doc._id.slice(16, 25);
        array.push(doc);
      } else {
        array.push(doc);
      }
    });
    setData(array); 
  }, [complain]);

  const handleSearch = (e) => {
    const value = e.target.value.toUpperCase();
    if (value) {
      const data = complain.filter((data) => {
        return (
          data?.user_id?.name?.toUpperCase()?.indexOf(value) > -1 ||
          data?.host_id?.name?.toUpperCase()?.indexOf(value) > -1 ||
          data?.contact?.toUpperCase()?.indexOf(value) > -1
        );
      });
      setData(data);
    } else {
      return setData(complain);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenCloseComplain = (data) => {
    dispatch({ type: OPEN_COMPLAIN_DIALOG, payload: data });
  };



  const handleTypeChange = (type) => {
    if (type === "all") {
      setType("all");
      dispatch(getSolvedComplain(start, end, type));
    } else {
      setType(type);
      dispatch(getSolvedComplain(start, end, type));
    }
  };

  const handleCallback = (start, end) => {
    const start_ = dayjs(start._d).format("YYYY-MM-DD");
    const end_ = dayjs(end._d).format("YYYY-MM-DD");
    setStart(start_);
    setEnd(end_);
    setDate(start_ + " to " + end_);
    dispatch(getSolvedComplain(start_, end_, type));
  };

  return (
    <>
      <TopNav />

      <div class="content">
        <div class="row">
          <div class="card">
            <div class="card-header pt-4 pl-5 ml-2">
              {/* <h4 class="title text-center text-primary">Language Table</h4> */}
            </div>
            <div class="card-header pt-4 pl-5 ml-2">
              <h4 class="title text-center text-primary">
                Solved Complain List
              </h4>
            </div>
            <div class="row justify-content-around">
              <div class="col-xs-12 col-sm-12  col-lg-4 mt-3 float-left pl-5 pr-5">
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
                      onChange={handleSearch}
                    />
                  </div>
                </form>
              </div>
            <div className="col-xs-12 col-sm-12  col-lg-6">
           <div className="row">
           <div class="col-xs-6 col-sm-6  col-lg-6 mt-3">
                <FormControl class="float-right">
                  <Select
                    labelId="demo-controlled-open-select-label"
                    className="mr-3"
                    id="dropdown"
                    onChange={(e) => handleTypeChange(e.target.value)}
                    defaultValue="all"
                  >
                    <MenuItem value="all">All Type</MenuItem>
                    <MenuItem value="host">Host</MenuItem>;
                    <MenuItem value="user">User</MenuItem>;
                  </Select>
                </FormControl>
              </div>
              <div class="col-xs-6 col-sm-6  col-lg-6 mt-3">
                <FormControl class="float-right mr-5">
                  <DateRangePicker
                    // onEvent={handleEvent}
                    onCallback={handleCallback}
                  >
                    <input
                      type="text"
                      class="form-control text-white"
                      placeholder="Select Date"
                      value={!date ? "Select Date" : date}
                      style={{ width: 180 }}
                    />
                  </DateRangePicker>
                  {/* <Select
                    labelId="demo-controlled-open-select-label"
                    id="dropdown"
                    onChange={(e) => handleDateChange(e.target.value)}
                    defaultValue="all"
                  >
                    <MenuItem value="all">All Complain</MenuItem>

                    {acceptedDate.map((date, index) => {
                      return <MenuItem value={date._id}>{date._id}</MenuItem>;
                    })}
                  </Select> */}
                </FormControl>
              </div>
           </div>
            </div>
            </div>
            <div class="card-body" style={{ overflowX: "auto" }}>
              <table
                id="example"
                class="table display "
                style={{ width: "100%" }}
              >
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Coin</th>
                    <th>Type</th>
                    <th>Contact</th>
                    <th>Is Solved</th>
                    <th>Solved On</th>
                    <th>View</th>
                  </tr>
                </thead>
                <tbody>
                  {data.length > 0 ? (
                    <>
                      {(rowsPerPage > 0
                        ? data.slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                        : data
                      ).map((data, index) => {
                        return (
                          <tr key={index}>
                            <td>{data.id}</td>
                            <td>
                              <a
                                href={
                                  data.image === "null"
                                    ? Images
                                    : baseURL + "/" + data.image
                                }
                                target="blank"
                                style={{ cursor: "pointer" }}
                              >
                                <img
                                  src={
                                    data.image === "null"
                                      ? Images
                                      : baseURL + "/" + data.image
                                  }
                                  width="70px"
                                  height="70px"
                                  alt="img"
                                  style={{
                                    objectFit: "contain",
                                    borderRadius: "50%",
                                  }}
                                ></img>
                              </a>
                            </td>
                            <td>
                              {data.user_id === null
                                ? data.host_id.name
                                : data.user_id.name}
                            </td>
                            <td>
                              {data.user_id === null
                                ? data.host_id.coin
                                : data.user_id.coin}
                            </td>
                            <td>{data.user_id === null ? "Host" : "User"}</td>
                            <td>{data.contact}</td>
                            <td>Solved</td>
                            <td>
                              {dayjs(data.updatedAt).format("DD MMM, YYYY")}
                            </td>

                            <td>
                              <button
                                type="button"
                                class="btn btn-fill btn-primary btn-sm"
                                style={{ borderRadius: 5 }}
                                onClick={() => handleOpenCloseComplain(data)}
                              >
                                <i class="fas fa-eye text-white pr-2"></i>View
                              </button>
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
                <TablePagination
                  id="pagination"
                  component="div"
                  rowsPerPageOptions={[
                    5,
                    10,
                    25,
                    50,
                    100,
                    200,
                    500,
                    { label: "All", value: -1 },
                  ]}
                  count={data.length}
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
            </div>
          </div>
        </div>
      </div>
      <ComplainDialog />
    </>
  );
};

export default connect(null, { getSolvedComplain, getAcceptedDateList })(
  SolvedComplainTable
);
