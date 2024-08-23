import React, { useEffect, useState } from "react";
import Pagination from "react-js-pagination";

//dialog
import PlanDialog from "../Dialog/PlanDialog";

//react-redux
import { connect, useSelector, useDispatch } from "react-redux";

//action
import { getPlan, deletePlan } from "../../store/plan/action";
import {
  OPEN_PLAN_DIALOG,
  UNSET_CREATE_PLAN_DONE,
  UNSET_UPDATE_PLAN_DONE,
} from "../../store/plan/types";

//dayjs
import dayjs from "dayjs";

//sweet alert
import { alert, warning } from "../../util/alert";

//MUI

import { Snackbar } from "@material-ui/core";

//topNav
import TopNav from "../Navbar/Topnav";
import { Alert } from "@material-ui/lab";

const PlanTable = (props) => {
  const dispatch = useDispatch();

  const [data, setData] = useState([]);

  const [rowsPerPage, setRowsPerPage] = useState(1);
  const [activePage, setActivePage] = useState(1);

  const [openSuccess, setOpenSuccess] = useState(false);
  const [openUpdateSuccess, setOpenUpdateSuccess] = useState(false);

  const { plan, createDone, updateDone, total } = useSelector(
    (state) => state.plan
  );
  

  useEffect(() => {
    dispatch(getPlan(activePage, rowsPerPage));
  }, [dispatch, activePage, rowsPerPage]);

  useEffect(() => {
    setData(plan);
  }, [plan]);

  useEffect(() => {
    if (createDone) {
      setOpenSuccess(true);
      dispatch({ type: UNSET_CREATE_PLAN_DONE });
    }
  }, [createDone, dispatch]);
  useEffect(() => {
    if (updateDone) {
      setOpenUpdateSuccess(true);
      dispatch({ type: UNSET_UPDATE_PLAN_DONE });
    }
  }, [updateDone, dispatch]);

  const handleEdit = (data) => {
    dispatch({ type: OPEN_PLAN_DIALOG, payload: data });
  };
  const handleDelete = (id) => {
    const data = warning();
    data
      .then((isDeleted) => {
        if (isDeleted) {
          
          props.deletePlan(id);
          alert("Deleted!", `Plan has been deleted!`, "success");
        }
      })
      .catch((err) => console.log(err));
  };

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
    dispatch(getPlan(pageNumber, rowsPerPage));
  };

  const handleOpen = () => {
    dispatch({ type: OPEN_PLAN_DIALOG });
  };

  const handleCloseSuccess = () => {
    setOpenSuccess(false);
  };
  const handleCloseUpdateSuccess = () => {
    setOpenUpdateSuccess(false);
  };

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
            <b>Success!</b> Plan add successfully.
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
            <b>Success!</b> Plan update successfully.
          </span>
        </Alert>
      </Snackbar>
      <div class="content">
        <div class="row">
          <div class="card">
            <div class="card-header pt-4 pl-5 ml-2">
              {/* <h4 class="title text-center">Country Table</h4> */}
            </div>
            <div>
              <div class="col-xs-12 col-sm-12  col-lg-4 mt-3 float-right">
                <form action="">
                  <button
                    type="button"
                    class="btn btn-fill btn-primary btn-sm  mt-4 mr-3 float-left ml-4 float-lg-right float-xl-right"
                    style={{ borderRadius: 5 }}
                    onClick={handleOpen}
                  >
                    <i class="fas fa-plus"></i> New
                  </button>
                </form>
              </div>
              <div class="mt-4 mr-3 float-left ml-4 ">
                <h4 class="text-primary">Plan Table</h4>
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
                    <th>Coin</th>
                    <th>Rupee</th>
                    <th>Discount</th>
                    <th>Product Key</th>
                    <th>Created At</th>
                    <th>Updated At</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.length > 0 ? (
                    <>
                      {data.map((data, index) => {
                        return (
                          <tr key={index}>
                            <td>{data.coin}</td>
                            <td>{data.rupee}</td>
                            <td>{data.discount}</td>
                            <td>{data?.productKey}</td>

                            <td>
                              {dayjs(data.createdAt).format("DD MMM, YYYY")}
                            </td>
                            <td>
                              {dayjs(data.updatedAt).format("DD MMM, YYYY")}
                            </td>
                            <td>
                              <a
                                class="ml-3"
                                onClick={() => handleEdit(data)}
                                style={{ cursor: "pointer" }}
                                href
                              >
                                <i class="fas fa-edit text-primary mr-3"></i>
                              </a>

                              <a
                                onClick={() => handleDelete(data._id)}
                                style={{ cursor: "pointer" }}
                                href
                              >
                                <i class="fas fa-trash-alt text-danger"></i>
                              </a>
                            </td>
                          </tr>
                        );
                      })}
                    </>
                  ) : (
                    <tr>
                      <td colSpan="7" align="center">
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
              </div>
            </div>
          </div>
        </div>
      </div>
      <PlanDialog />
    </>
  );
};

export default connect(null, { getPlan, deletePlan })(PlanTable);
