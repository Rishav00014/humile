import React, { useEffect, useState } from "react";

//dayjs
import dayjs from "dayjs";

//alert
import { warning, alert } from "../../util/alert";

//topNav
import TopNav from "../Navbar/Topnav";

//action
import { getGame, deleteGame, top } from "../../store/Game/action";

//redux
import { useDispatch, connect, useSelector } from "react-redux";

//MUI
import { Snackbar, TablePagination } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import TablePaginationActions from "./TablePagination";

import {
  OPEN_DIALOG,
  UNSET_CREATE_GAME_DONE,
  UNSET_UPDATE_GAME_DONE,
} from "../../store/Game/type";
import GameDialog from "../Dialog/GameDialog";

const GameTable = (props) => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openUpdateSuccess, setOpenUpdateSuccess] = useState(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  //Get game
  useEffect(() => {
    dispatch(getGame()); 
  }, [dispatch]);

  const { game, createDone, updateDone } = useSelector((state) => state.game);
  

  //Set Data
  useEffect(() => {
    setData(game);
  }, [game]);

  console.log("data", data);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    if (createDone) {
      setOpenSuccess(true);
      dispatch({ type: UNSET_CREATE_GAME_DONE });
    }
  }, [createDone, dispatch]);
  useEffect(() => {
    if (updateDone) {
      setOpenUpdateSuccess(true);
      dispatch({ type: UNSET_UPDATE_GAME_DONE });
    }
  }, [updateDone, dispatch]);

  const handleOpen = () => {
    dispatch({ type: OPEN_DIALOG });
  };

  const handleEdit = (data) => {
    dispatch({ type: OPEN_DIALOG, payload: data });
  };
  const handleDelete = (id) => {
    const data = warning();
    data
      .then((isDeleted) => {
        if (isDeleted) {
          
          props.deleteGame(id);
          alert("Deleted!", `GAME Photos has been deleted!`, "success");
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

  //active plan switch
  const handleTop = (id) => {
    
    props.top(id);
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
            <b>Success!</b> Game add successfully.
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
            <b>Success!</b> Game update successfully.
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
                <h4 class="text-primary">Game</h4>
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
                    <th>ID</th>
                    <th>isTop</th>
                    <th>Thumbnail</th>
                    <th>Logo</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Link</th>
                    <th>Ratting</th>
                    <th>Created At</th>
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
                            <td>{index + 1}</td>
                            <td>
                              <label class="switch">
                                <input
                                  type="checkbox"
                                  checked={data.isTop}
                                  onChange={() => handleTop(data._id)}
                                />
                                <span class="slider">
                                  <p
                                    style={{
                                      fontSize: 12,
                                      marginLeft: `${data.isTop ? "7px" : "32px"
                                        }`,
                                      color: "white",
                                      marginTop: "4px",
                                    }}
                                  >
                                    {data.isTop ? "Yes" : "No"}
                                  </p>
                                </span>
                              </label>
                            </td>

                            <td>
                              <img
                                className="shadow p-1 mb-2 bg-white rounded "
                                src={data?.thumbnail}
                                height="50px"
                                width="50px"
                                alt=""
                              />
                            </td>
                            <td>
                              <img
                                className="shadow p-1 mb-2 bg-white rounded "
                                src={data?.logo}
                                height="50px"
                                width="50px"
                                alt=""
                              />
                            </td>
                            <td>{data?.name}</td>
                            <td>
                              {data.category.map((content) => {
                                return <li>{content.name}</li>;
                              })}
                            </td>
                            <td>{data?.link}</td>
                            <td>{data?.ratting}</td>

                            <td>
                              {dayjs(data?.createdAt).format(
                                "DD MMM YYYY, hh:mm:ss A"
                              )}
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
                                <i class="fas fa-trash text-danger mr-3"></i>
                              </a>
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
                {/* <tfoot>
                  <tr>
                    <th>ID</th>
                    <th>isTop</th>
                    <th>Thumbnail</th>
                    <th>Logo</th>
                    <th>Category</th>
                    <th>Link</th>
                    <th>Ratting</th>
                    <th>Created At</th>
                    <th>Action</th>
                  </tr>
                </tfoot> */}
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
      <GameDialog />
    </>
  );
};

export default connect(null, { getGame, deleteGame, top })(GameTable);
