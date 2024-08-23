import React, { useEffect, useState } from "react";

//Banner dialog
import BannerDialog from "../Dialog/BannerDialog";

//dayjs
import dayjs from "dayjs";

//alert
import { warning, alert } from "../../util/alert";

//redux
import { useDispatch, connect, useSelector } from "react-redux";

//action
import { getBanner, deleteBanner, isGame } from "../../store/banner/action";

//topNav
import TopNav from "../Navbar/Topnav";

//type
import {
  OPEN_BANNER_DIALOG,
  UNSET_CREATE_BANNER_DONE,
  UNSET_UPDATE_BANNER_DONE,
} from "../../store/banner/types";

//MUI
import { Snackbar, TablePagination } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import TablePaginationActions from "./TablePagination";

//server path
import { baseURL } from "../../util/ServerPath";

const BannerTable = (props) => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  const [openSuccess, setOpenSuccess] = useState(false);
  const [openUpdateSuccess, setOpenUpdateSuccess] = useState(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { banner, createDone, updateDone } = useSelector(
    (state) => state.banner
  );

  

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    setData(banner);
  }, [banner]);

  useEffect(() => {
    if (createDone) {
      setOpenSuccess(true);
      dispatch({ type: UNSET_CREATE_BANNER_DONE });
    }
  }, [createDone, dispatch]);
  useEffect(() => {
    if (updateDone) {
      setOpenUpdateSuccess(true);
      dispatch({ type: UNSET_UPDATE_BANNER_DONE });
    }
  }, [updateDone, dispatch]);

  useEffect(() => {
    dispatch(getBanner()); 
  }, [dispatch]);

  const handleOpen = () => {
    dispatch({ type: OPEN_BANNER_DIALOG });
  };

  const handleEdit = (data) => {
    dispatch({ type: OPEN_BANNER_DIALOG, payload: data });
  };
  const handleDelete = (id) => {
    const data = warning();
    data
      .then((isDeleted) => {
        if (isDeleted) {
          
          props.deleteBanner(id);
          alert("Deleted!", `Banner Photos has been deleted!`, "success");
        }
      })
      .catch((err) => console.log(err));
  };

  const handleCloseSuccess = () => {
    setOpenSuccess(false);
  };
  const handleCloseUpdateSuccess = () => {
    setOpenUpdateSuccess(false);
  };

  const handleGame = (id) => {
    
    props.isGame(id);
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
            <b>Success!</b> Banner add successfully.
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
            <b>Success!</b> Banner update successfully.
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
                <h4 class="text-primary">Banner</h4>
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
                    <th>Is Game</th>
                    <th>Created At</th>
                    <th>Updated At</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.length > 0 ? (
                    <>
                      {(rowsPerPage > 0
                        ? data?.slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                        : data
                      ).map((data, index) => {
                        return (
                          <tr key={index}>
                            <td>
                              <img
                                height="70px"
                                width={"150px"}
                                alt="app"
                                src={baseURL + "/" + data?.image}
                                style={{
                                  boxShadow:
                                    "0 5px 15px 0 rgb(105 103 103 / 50%)",
                                  border: "2px solid #ffffff",
                                  objectFit:"cover",
                                  borderRadius: 10,
                                }}
                              />
                            </td>

                            <td>
                              <label class="switch">
                                <input
                                  type="checkbox"
                                  checked={data?.isGame}
                                  onChange={() => handleGame(data?._id)}
                                />
                                <span class="slider">
                                  <p
                                    style={{
                                      fontSize: 12,
                                      marginLeft: `${
                                        data?.isGame ? "7px" : "32px"
                                      }`,
                                      color: "white",
                                      marginTop: "4px",
                                    }}
                                  >
                                    {data?.isGame ? "Yes" : "No"}
                                  </p>
                                </span>
                              </label>
                            </td>
                            <td>
                              {dayjs(data?.createdAt).format("DD MMM, YYYY")}
                            </td>
                            <td>
                              {dayjs(data?.updatedAt).format("DD MMM, YYYY")}
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
                                onClick={() => handleDelete(data?._id)}
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
                      <td colSpan="5" align="center">
                        Nothing to show!!
                      </td>
                    </tr>
                  )}
                </tbody>
                <tfoot>
                  <tr>
                    <th>Image</th>
                    <th>Is Game</th>
                    <th>Created At</th>
                    <th>Updated At</th>
                    <th>Action</th>
                  </tr>
                </tfoot>
              </table>

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
      <BannerDialog />
    </>
  );
};

export default connect(null, {
  getBanner,
  deleteBanner,
  isGame,
})(BannerTable);
