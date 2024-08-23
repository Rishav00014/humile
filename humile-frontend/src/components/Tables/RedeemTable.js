import React, { Fragment, useEffect, useState } from "react";

//dayjs
import dayjs from "dayjs";

//datepicker
import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap-daterangepicker/daterangepicker.css";

//alert
import { alert, warning } from "../../util/alert";

//redux
import { connect, useSelector } from "react-redux";
import {
  getUnacceptedRedeem,
  acceptRedeemRequest,
  getPendingDateList,
  deleteRedeemRequest,
} from "../../store/redeem/action";

//MUI
import { FormControl, Snackbar, TablePagination } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import TablePaginationActions from "./TablePagination";

//serverPath
import { baseURL } from "../../util/ServerPath";

//topNav
import TopNav from "../Navbar/Topnav";
import { useDispatch } from "react-redux";

const RedeemTable = (props) => {
  const dispatch = useDispatch();

  const [data, setData] = useState([]);

  const [openSuccess, setOpenSuccess] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [date, setDate] = useState("");

  const redeem = useSelector((state) => state.redeem.unAcceptedRedeem);

  

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    setData(redeem);
  }, [redeem]);

  useEffect(() => {
    dispatch(getUnacceptedRedeem("all", "all"));
    dispatch(getPendingDateList()); 
  }, [dispatch]);

  const handleCloseSuccess = () => {
    setOpenSuccess(false);
  };

  const redeemRequest = (data) => {
    
    props.acceptRedeemRequest(data._id);
    setOpenSuccess(true);
  };

  const handleSearch = (e) => {
    const value = e.target.value.toUpperCase();
    if (value) {
      const data = redeem.filter((data) => {
        return (
          data?.host_id.name?.toUpperCase()?.indexOf(value) > -1 ||
          data?.paymentGateway?.toUpperCase()?.indexOf(value) > -1 ||
          data?.description?.toUpperCase()?.indexOf(value) > -1 ||
          data?.mobile?.indexOf(value) > -1
        );
      });
      setData(data);
    } else {
      return setData(redeem);
    }
  };



  const handleDelete = (id) => {
    const data = warning();
    data
      .then((isDeleted) => {
        if (isDeleted) {
          props.deleteRedeemRequest(id);
          alert("Deleted!", `Redeem Request has been deleted!`, "success");
        }
      })
      .catch((err) => console.log(err));
  };

  const handleCallback = (start, end) => {
    const start_ = dayjs(start._d).format("YYYY-MM-DD");
    const end_ = dayjs(end._d).format("YYYY-MM-DD");
    setDate(start_ + " to " + end_);
    dispatch(getUnacceptedRedeem(start_, end_));
  };

  const { howManyCoins } = useSelector((state) => state.setting.setting);

  return (
    <>
      <Snackbar
        open={openSuccess}
        autoHideDuration={2000}
        onClose={handleCloseSuccess}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleCloseSuccess} severity="success">
          <span style={{ color: "#184d47" }}>
            <b>Success!</b> Redeem Request accepted successfully.
          </span>
        </Alert>
      </Snackbar>
      <TopNav />

      <div class="content">
        <div class="row">
          <div class="card">
            <div class="card-header pt-4 pl-5 ml-2">
              {/* <h4 class="title text-center">Country Table</h4> */}
            </div>
            <div class="card-header pt-4 pl-5 ml-2">
              <h4 class="title text-center text-primary">
                Pending Redeem Request
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
                      onChange={handleSearch}
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

                    {pendingDate.map((date, index) => {
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
                    <th>Coin</th>
                    <th>Rupee</th>
                    <th>mobile</th>
                    <th>Description</th>
                    <th>Arrived On</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.length > 0 ? (
                    <Fragment>
                      {(rowsPerPage > 0
                        ? data.slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                        : data
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
                                  {dayjs(data.createdAt).format("DD MMM, YYYY")}
                                </td>
                                <td>
                                  <button
                                    type="button"
                                    class="btn waves-effect waves-light btn-primary btn-sm"
                                    data-toggle="modal"
                                    // data-target="#country-modal"
                                    style={{ borderRadius: 5 }}
                                    onClick={() => redeemRequest(data)}
                                  >
                                    <i class="fas fa-check"></i> Accept
                                  </button>
                                  <button
                                    type="button"
                                    class="btn waves-effect waves-light btn-primary btn-sm ml-2 mt-2"
                                    data-toggle="modal"
                                    // data-target="#country-modal"
                                    style={{ borderRadius: 5 }}
                                    onClick={() => handleDelete(data._id)}
                                  >
                                    <i class="fas fa-trash"></i> Delete
                                  </button>
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
    </>
  );
};

export default connect(null, {
  getUnacceptedRedeem,
  acceptRedeemRequest,
  getPendingDateList,
  deleteRedeemRequest,
})(RedeemTable);
