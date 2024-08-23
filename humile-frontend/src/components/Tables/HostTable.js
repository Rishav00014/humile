import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

// import Pagination from "react-js-pagination";

//react-redux
import { connect, useSelector, useDispatch } from "react-redux";

//alert
import { warning, alert } from "../../util/alert";

//action
import {
  getHost,
  enableDisableHost,
  deleteHost,
} from "../../store/host/action";

//dayjs
import dayjs from "dayjs";

//router
import { Link } from "react-router-dom";

//MUI

import { TablePagination, Snackbar } from "@material-ui/core";

//topNav
import TopNav from "../Navbar/Topnav";

import TablePaginationActions from "./TablePagination";

import {
  OPEN_HOST_DIALOG,
  UNSET_CREATE_HOST_DONE,
  UNSET_UPDATE_HOST_DONE,
} from "../../store/host/types";
import { Alert } from "@material-ui/lab";
import FemaleImage from '../../assets/img/anime6.png'
import $ from "jquery";

import arraySort from "array-sort";

const HostTable = (props) => {
  const dispatch = useDispatch();
  let history = useHistory();

  const [data, setData] = useState([]);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openUpdateSuccess, setOpenUpdateSuccess] = useState(false);

  // const [activePage, setActivePage] = useState(1);
  // const [rowsPerPage, setRowsPerPage] = useState(10);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  const [coinSort, setCoinSort] = useState(true);

  const { host, createDone, updateDone } = useSelector((state) => state.host);

  

  useEffect(() => {
    dispatch(getHost()); 
  }, [dispatch]);
  useEffect(() => {
    setData(host);
  }, [host]);

  useEffect(() => {
    if (createDone) {
      setOpenSuccess(true);
      dispatch({ type: UNSET_CREATE_HOST_DONE });
    }
  }, [createDone, dispatch]);
  useEffect(() => {
    if (updateDone) {
      setOpenUpdateSuccess(true);
      dispatch({ type: UNSET_UPDATE_HOST_DONE });
    }
  }, [updateDone, dispatch]);

  const handleCoinSort = () => {
    setCoinSort(!coinSort);
    arraySort(host, "coin", { reverse: coinSort });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // useEffect(() => {
  //   if (search != "") {
  //     fetch(
  //       `${baseURL}/host/search?value=${search}&key=${key}&start=${activePage}&limit=${rowsPerPage}`
  //     )
  //       .then((res) => res.json())
  //       .then((res) => {
  //         setData(res.host);
  //         console.log(res.host);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   } else {
  //     setData(host);
  //   }
  // }, [search]);

  const handleSearch = (e) => {
    const value = e.target.value.toUpperCase();
    if (value) {
      const data = host.filter((data) => {
        return (
          data?.name?.toUpperCase()?.indexOf(value) > -1 ||
          data?.language?.language?.toUpperCase()?.indexOf(value) > -1
        );
      });
      setData(data);
    } else {
      return setData(host);
    }
  };


  const handleEnableDisableHost = (data) => {
    if (!data.language)
      return alert(
        "Warning!",
        `You Delete this Host language, Please Edit Host!`,
        "warning"
      );
    
    props.enableDisableHost(data._id);
  };

  const handleCloseSuccess = () => {
    setOpenSuccess(false);
  };

  const handleCloseUpdateSuccess = () => {
    setOpenUpdateSuccess(false);
  };

  const handleDelete = (id) => {
    const data = warning();
    data
      .then((isDeleted) => {
        if (isDeleted) {
          
          props.deleteHost(id);
          alert("Deleted!", `Host has been deleted!`, "success");
        }
      })
      .catch((err) => console.log(err));
  };

  const handleEdit = (data) => {
    dispatch({ type: OPEN_HOST_DIALOG, payload: data });
    history.push("/admin/host/add");
  };

  const handleAnalytic = (data) => {
    dispatch({ type: OPEN_HOST_DIALOG, payload: data });
    // history.push("/admin/host/analytic");
  };

  const handleNew = (data) => {
    dispatch({ type: OPEN_HOST_DIALOG });
    history.push("/admin/host/add");
  };
  $(document).ready(function () {
    $("img").bind("error", function () {
      // Set the default image
      $(this).attr("src", FemaleImage);
    });
  });

  return (
    <>
      <TopNav />
      <Snackbar
        open={openSuccess}
        autoHideDuration={3000}
        onClose={handleCloseSuccess}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleCloseSuccess} severity="success">
          <span style={{ color: "#184d47" }}>
            <b>Success!</b> Host add successfully.
          </span>
        </Alert>
      </Snackbar>
      <Snackbar
        open={openUpdateSuccess}
        autoHideDuration={3000}
        onClose={handleCloseUpdateSuccess}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleCloseUpdateSuccess} severity="success">
          <span style={{ color: "#184d47" }}>
            <b>Success!</b> Host update successfully.
          </span>
        </Alert>
      </Snackbar>
      <div class="content">
        <div class="row">
          <div class="card">
            <div class="card-header pt-4 pl-5 ml-2">
              <h4 class="title text-center text-primary">Host Table</h4>
            </div>
            <div>
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
                      // onChange={(e) => setSearch(e.target.value)}
                      onChange={handleSearch}
                    />
                  </div>
                </form>
              </div>
              {/* <Link to="/admin/host/add"> */}
              <button
                type="button"
                class="btn btn-fill btn-primary btn-sm  mt-4 mr-3 float-left ml-4 float-lg-right float-xl-right"
                style={{ borderRadius: 5 }}
                onClick={handleNew}
              >
                <i class="fas fa-plus"></i> New
              </button>
              {/* </Link> */}
            </div>
            <div class="card-body" style={{ overflowX: "auto" }}>
              <table
                id="example"
                class="table display"
                style={{ width: "100%" }}
              >
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Language</th>
                    <th onClick={handleCoinSort} style={{ cursor: "pointer" }}>
                      Coin {coinSort ? " ▼" : " ▲"}
                      {/* <i class="fa fa-fw fa-sort" onClick={handleCoinSort}></i> */}
                    </th>
                    <th>Like</th>
                    <th>Age</th>
                    <th>Is Disable</th>
                    <th>Created At</th>
                    <th>Profile</th>
                    {/* <th>History</th> */}
                    <th>Action</th>
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
                            <td>
                              <img
                                src={data.image[0] ? data.image[0] : FemaleImage}
                                width="70px"
                                height="70px"
                                alt="img"
                                style={{
                                  objectFit: "cover",
                                  borderRadius: "50%",
                                }}
                              ></img>
                            </td>
                            <td>{data.name}</td>

                            <td>
                              {data.language
                                ? data.language.language
                                : "Deleted"}
                            </td>
                            <td>{data.coin}</td>
                            <td>{data.like}</td>
                            <td>{data.age}</td>
                            <td>
                              <label class="switch">
                                <input
                                  type="checkbox"
                                  checked={data.isDisable}
                                  onChange={() => handleEnableDisableHost(data)}
                                />
                                <span class="slider">
                                  <p
                                    style={{
                                      fontSize: 12,
                                      marginLeft: `${
                                        data.isDisable ? "7px" : "32px"
                                      }`,
                                      color: "white",
                                      marginTop: "3px",
                                    }}
                                  >
                                    {data.isDisable ? "Yes" : "No"}
                                  </p>
                                </span>
                              </label>
                            </td>

                            <td>
                              {dayjs(data.createdAt).format("DD MMM, YYYY")}
                            </td>
                            <td>
                              <Link to={"/admin/host/analytic/" + data._id}>
                                <button
                                  type="button"
                                  class="btn btn-fill btn-primary btn-sm"
                                  style={{ borderRadius: 5 }}
                                  onClick={() => handleAnalytic(data)}
                                >
                                  <i class="fas fa-eye text-white pr-2"></i>View
                                </button>
                              </Link>
                            </td>
                            {/* <td>
                              <Link to={"/admin/host/history/" + data._id}>
                                <button
                                  type="button"
                                  class="btn btn-fill btn-primary btn-sm"
                                  style={{ borderRadius: 5 }}
                                  onClick={() => handleAnalytic(data)}
                                >
                                  <i class="fas fa-history text-white pr-2"></i>
                                  History
                                </button>
                              </Link>
                            </td> */}
                            <td>
                              <a
                                class="ml-3"
                                onClick={() => handleEdit(data)}
                                style={{ cursor: "pointer" }}
                                href
                              >
                                <i class="fas fa-edit text-primary"></i>
                              </a>
                              <a
                                class="ml-3"
                                onClick={() => handleDelete(data._id)}
                                style={{ cursor: "pointer" }}
                                href
                              >
                                <i class="fas fa-trash text-danger mr-3"></i>
                              </a>
                            </td>
                          </tr>
                        );
                      })}
                    </>
                  ) : (
                    <tr>
                      <td colSpan="10" align="center">
                        Nothing to show!!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              {/* <div class="py-2">
                <div className="row">
                  <div className="col-md-2 d-flex float-left">
                    <span className="m-auto">Select</span>
                    <select
                      class="form-select form-control mr-3 ml-2 mb-2 mb-md-0 mb-lg-0"
                      aria-label="Default select example"
                      onChange={(e) => setRowsPerPage(e.target.value)}
                      style={{ borderColor: "#e14eca" }}
                    >
                      <option class="text-dark" value="5">
                        5
                      </option>
                      <option class="text-dark" value="10" selected>
                        10
                      </option>
                      <option class="text-dark" value="25">
                        25
                      </option>
                      <option class="text-dark" value="50">
                        50
                      </option>
                      <option class="text-dark" value="100">
                        100
                      </option>
                      <option class="text-dark" value="200">
                        200
                      </option>
                      <option class="text-dark" value="500">
                        500
                      </option>
                      <option class="text-dark" value={total}>
                        All
                      </option>
                    </select>
                  </div>
                  <div className="col-md-6"></div>
                  <div className="col-md-4 float-right">
                    <Pagination
                      activePage={activePage}
                      itemsCountPerPage={rowsPerPage}
                      totalItemsCount={total}
                      pageRangeDisplayed={3}
                      onChange={(page) => handlePageChange(page)}
                      itemClass="page-item"
                      linkClass="page-link"
                    />
                  </div>
                </div>
              </div> */}
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

export default connect(null, { getHost, enableDisableHost, deleteHost })(
  HostTable
);
