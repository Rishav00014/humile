import React, { useEffect, useState } from "react";

import Pagination from "react-js-pagination";

//dialog
import LanguageDialog from "../Dialog/LanguageDialog";

//react-redux
import { connect, useSelector, useDispatch } from "react-redux";

//action
import { getLanguage, deleteLanguage } from "../../store/language/action";
import {
  OPEN_LANGUAGE_DIALOG,
  UNSET_CREATE_LANGUAGE_DONE,
  UNSET_UPDATE_LANGUAGE_DONE,
} from "../../store/language/types";

//dayjs
import dayjs from "dayjs";

//sweet alert
import { alert, languageWarning } from "../../util/alert";

//MUI
import { Snackbar } from "@material-ui/core";

//topNav
import TopNav from "../Navbar/Topnav";
import { Alert } from "@material-ui/lab";

import { baseURL, key } from "../../util/ServerPath";

const LanguageTable = (props) => {
  const dispatch = useDispatch();

  const [data, setData] = useState([]);

  // const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [activePage, setActivePage] = useState(1);

  const [openSuccess, setOpenSuccess] = useState(false);
  const [openUpdateSuccess, setOpenUpdateSuccess] = useState(false);

  const { language, createDone, updateDone, total } = useSelector(
    (state) => state.language
  );
  
  useEffect(() => {
    if ((activePage, rowsPerPage)) {
      dispatch(getLanguage(activePage, rowsPerPage));
    }
  }, [dispatch, activePage, rowsPerPage]);

  useEffect(() => {
    setData(language);
  }, [language]);

  useEffect(() => {
    if (createDone) {
      setOpenSuccess(true);
      dispatch({ type: UNSET_CREATE_LANGUAGE_DONE });
    }
  }, [createDone, dispatch]);

  useEffect(() => {
    if (updateDone) {
      setOpenUpdateSuccess(true);
      dispatch({ type: UNSET_UPDATE_LANGUAGE_DONE });
    }
  }, [updateDone, dispatch]);

  const handleEdit = (data) => {
    dispatch({ type: OPEN_LANGUAGE_DIALOG, payload: data });
  };
  const handleDelete = (id, count) => {
    const data = languageWarning(count);
    data
      .then((isDeleted) => {
        if (isDeleted) {
          
          props.deleteLanguage(id);
          alert("Deleted!", `Language has been deleted!`, "success");
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (search !== "") {
      fetch(
        `${baseURL}/language/search?value=${search}&key=${key}&start=${activePage}&limit=${rowsPerPage}`
      )
        .then((res) => res.json())
        .then((res) => {
          setData(res.language);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setData(language);
    }
  }, [search]);

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
    dispatch(getLanguage(pageNumber, rowsPerPage));
  };

  const handleOpen = () => {
    dispatch({ type: OPEN_LANGUAGE_DIALOG });
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
            <b>Success!</b> Language add successfully.
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
            <b>Success!</b> Language update successfully.
          </span>
        </Alert>
      </Snackbar>
      <div class="content">
        <div class="row">
          <div class="card">
            <div class="card-header pt-4 pl-5 ml-2">
              <h4 class="title text-center text-primary">Language Table</h4>
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
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                </form>
              </div>
              <button
                type="button"
                class="btn btn-fill btn-primary btn-sm  mt-4 mr-3 float-left ml-4 float-lg-right float-xl-right"
                style={{ borderRadius: 5 }}
                onClick={handleOpen}
              >
                <i class="fas fa-plus"></i> New
              </button>
            </div>
            <div class="card-body" style={{ overflowX: "auto" }}>
              <table
                id="example"
                class="table display "
                style={{ width: "100%" }}
              >
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Available Host</th>
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
                            <td>{data.language}</td>
                            <td>{data.count}</td>

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
                                onClick={() =>
                                  handleDelete(data._id, data.count)
                                }
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
                      style={{ borderColor: "#e14eca", width: "100px" }}
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
      <LanguageDialog />
    </>
  );
};

export default connect(null, { getLanguage, deleteLanguage })(LanguageTable);
