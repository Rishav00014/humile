import React, { Fragment, useEffect, useState } from "react";

//dayjs
import dayjs from "dayjs";

//datepicker
import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap-daterangepicker/daterangepicker.css";

//redux
import { connect, useSelector } from "react-redux";
import {
  getAcceptedRedeem,
  getAcceptedDateList,
} from "../../store/redeem/action";

//MUI
import { FormControl, TablePagination } from "@material-ui/core";

import TablePaginationActions from "./TablePagination";

//serverPath
import { baseURL } from "../../util/ServerPath";

//topNav
import TopNav from "../Navbar/Topnav";
import { useDispatch } from "react-redux";

const AcceptedRedeemTable = (props) => {
  //true redeem
  const dispatch = useDispatch();

  const [data_, setData_] = useState([]);

  const [page_, setPage_] = useState(0);
  const [rowsPerPage_, setRowsPerPage_] = useState(25);
  const [date, setDate] = useState("");

  const redeem_ = useSelector((state) => state.redeem.acceptedRedeem);

  const handleChangePage_ = (event, newPage) => {
    setPage_(newPage);
  };

  const handleChangeRowsPerPage_ = (event) => {
    setRowsPerPage_(parseInt(event.target.value, 10));
    setPage_(0);
  };

  useEffect(() => {
    setData_(redeem_);
  }, [redeem_]);

  useEffect(() => {
    dispatch(getAcceptedRedeem("all", "all"));
    dispatch(getAcceptedDateList()); 
  }, [dispatch]);

  const handleSearch_ = (e) => {
    const value = e.target.value.toUpperCase();
    if (value) {
      const data = redeem_.filter((data) => {
        return (
          data?.host_id.name?.toUpperCase()?.indexOf(value) > -1 ||
          data?.paymentGateway?.toUpperCase()?.indexOf(value) > -1 ||
          data?.description?.toUpperCase()?.indexOf(value) > -1 ||
          data?.mobile?.indexOf(value) > -1
        );
      });
      setData_(data);
    } else {
      return setData_(redeem_);
    }
  };



  const handleCallback = (start, end) => {
    const start_ = dayjs(start._d).format("YYYY-MM-DD");
    const end_ = dayjs(end._d).format("YYYY-MM-DD");
    setDate(start_ + " to " + end_);
    dispatch(getAcceptedRedeem(start_, end_));
  };

  const { howManyCoins } = useSelector((state) => state.setting.setting);

  return (
    <>
      <TopNav />

      <div class="content">
        <div class="row">
          <div class="card">
            <div class="card-header pt-4 pl-5 ml-2">
              {/* <h4 class="title text-center">Country Table</h4> */}
            </div>
            <div class="card-header pt-4 pl-5 ml-2">
              <h4 class="title text-center text-primary">
                Accepted Redeem Request
              </h4>
            </div>
            <div class="row">
              <div class="col-xs-12 col-sm-12  col-lg-4 mt-3 float-left">
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
                      onChange={handleSearch_}
                    />
                  </div>
                </form>
              </div>
              <div class="col-xs-12 col-sm-12  col-lg-4 mt-3"></div>
              <div class="col-xs-12 col-sm-12  col-lg-4 mt-3">
                <FormControl class="float-right mr-5">
                  {/* <Select
                    labelId="demo-controlled-open-select-label"
                    id="dropdown"
                    onChange={(e) => handleDateChange(e.target.value)}
                    defaultValue="all"
                  >
                    <MenuItem value="all">All Request</MenuItem>

                    {acceptedDate.map((date, index) => {
                      return <MenuItem value={date._id}>{date._id}</MenuItem>;
                    })}
                  </Select> */}
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
                </FormControl>
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
                    <th>Image</th>
                    <th>Name</th>
                    <th>Payment Gateway</th>
                    <th>Coin</th> <th>Rupee</th>
                    <th>Mobile</th>
                    <th>Description</th>
                    <th>Accepted On</th>
                  </tr>
                </thead>
                <tbody>
                  {data_.length > 0 ? (
                    <Fragment>
                      {(rowsPerPage_ > 0
                        ? data_.slice(
                            page_ * rowsPerPage_,
                            page_ * rowsPerPage_ + rowsPerPage_
                          )
                        : data_
                      ) 
                        .map((data, index) => {
                          if (!data.host_id.isDeleted) {
                            return (
                              <tr key={index}>
                                <td>
                                  {
                                    <img
                                      src={baseURL + "/" + data.host_id.image}
                                      width="70px"
                                      height="70px"
                                      alt="img"
                                      style={{
                                        objectFit: "contain",
                                        borderRadius: "50%",
                                        border: " 1px solid #808080",
                                      }}
                                      class="mr-3"
                                    />
                                  }
                                </td>
                                <td>{data.host_id.name}</td>
                                <td>{data.paymentGateway}</td>
                                <td>{data.coin}</td>
                                <td>{data.coin / howManyCoins}&nbsp;₹</td>
                                <td>{data.mobile}</td>
                                <td>{data.description}</td>

                                <td>
                                  {dayjs(data.updatedAt).format("DD MMM, YYYY")}
                                </td>
                              </tr>
                            );
                          }
                        })}
                    </Fragment>
                  ) : (
                    <tr>
                      <td colSpan="8" align="center">
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
                  count={data_.length}
                  rowsPerPage={rowsPerPage_}
                  page={page_}
                  SelectProps={{
                    inputProps: { "aria-label": "rows per page" },
                    native: true,
                  }}
                  onChangePage={handleChangePage_}
                  onChangeRowsPerPage={handleChangeRowsPerPage_}
                  ActionsComponent={TablePaginationActions}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default connect(null, {
  getAcceptedRedeem,
  getAcceptedDateList,
})(AcceptedRedeemTable);
