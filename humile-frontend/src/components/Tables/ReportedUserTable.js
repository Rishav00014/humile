import React, { useState, useEffect } from "react";

//MUI
import { TablePagination } from "@material-ui/core";

// image
import NoImage from "../../images/images.webp"

//rect-redux
import { connect, useSelector } from "react-redux";

//action
import { getReportedUser } from "../../store/reportedUser/action";
import { useDispatch } from "react-redux";

//pagination
const TablePaginationActions = React.lazy(() => import("./TablePagination"));

const ReportedUser = (props) => {
  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const report = useSelector((state) => state.report.reportedUser);

  useEffect(() => {
    dispatch(getReportedUser()); //eslint-disable-next-line
  }, [dispatch]);

  useEffect(() => {
    setData(report);
  }, [report]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <div class="content">
        <div class="row">
          <div class="col">
            <div class="card">
              <div class="card-header pt-4 pl-5 ml-2">
                <h4 class="title text-center text-primary">
                  Reported Host
                </h4>
              </div>
              <div class="card-body card-overflow">
                <table class="table" style={{ borderCollapse: "collapse" }}>
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Coin</th>
                      <th>Count</th>
                      <th>Info</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.length > 0 ? (
                      (rowsPerPage > 0
                        ? data.slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        : data
                      ).map((data, index) => {
                        return (
                          <>
                            <tr
                              data-toggle="collapse"
                              data-target={`#demo${index}`}
                              class="accordion-toggle pointer-cursor"
                            >
                              <td>{index + 1}</td>
                              <td>
                                <img
                                  height="50px"
                                  width="50px"
                                  alt="app"
                                  src={data?._id?.image1 !== "null" ? data._id.image1 : NoImage}
                                  style={{
                                    boxShadow:
                                      "0 5px 15px 0 rgb(105 103 103 / 0%)",
                                    border: "2px solid #fff",
                                    borderRadius: 10,
                                    float: "left",
                                    objectFit: "cover",
                                  }}
                                />
                              </td>
                              <td>{data._id.name}</td>
                              <td class="text-success">{data._id.coin}</td>
                              <td class="text-danger">{data.count}</td>
                              <td className="pointer-cursor">
                                <i className="fas fa-info-circle fa-lg"></i>
                              </td>
                            </tr>
                            <tr>
                              <td colspan="8" class="hiddenRow">
                                <div
                                  id={`demo${index}`}
                                  class="accordian-body collapse"
                                >
                                  <h6 className="text-primary mt-2">
                                    Report User Detail
                                  </h6>
                                  <table className="w-100 table">
                                    <thead>
                                      <tr>
                                        <th>No</th>
                                        <th>Image</th>
                                        <th>Name</th>
                                        <th>Coin</th>
                                        <th>Description</th>
                                        <th>Arrived on</th>
                                      </tr>
                                    </thead>
                                    <tbody
                                      style={{
                                        maxHeight: 100,
                                        overflowY: "auto",
                                      }}
                                    >
                                      {data.report.length > 0 ? (
                                        data.report.map((report, no) => {
                                          return (
                                            <tr key={no}>
                                              <td>{no + 1}</td>
                                              <td>
                                                <img
                                                  height="35px"
                                                  width="35px"
                                                  alt="app"
                                                  src={
                                                    report?.user.image ? report?.user.image : NoImage
                                                  }
                                                  style={{
                                                    boxShadow:
                                                      "0 5px 15px 0 rgb(105 103 103 / 0%)",
                                                    border: "2px solid #fff",
                                                    borderRadius: 10,
                                                    float: "left",
                                                    objectFit: "cover",
                                                  }}
                                                />
                                              </td>
                                              <td>{report?.user?.name}</td>
                                              <td class="text-success">
                                                {report?.user?.coin}
                                              </td>
                                              <td>{report?.description}</td>

                                              <td>
                                                {report.date}
                                              </td>
                                            </tr>
                                          );
                                        })
                                      ) : (
                                        <tr>
                                          <td colSpan="7" align="center">
                                            Nothing to show!!
                                          </td>
                                        </tr>
                                      )}
                                    </tbody>
                                  </table>
                                </div>
                              </td>
                            </tr>
                          </>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="7" align="center">
                          Nothing to show!!
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
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

export default connect(null, { getReportedUser })(ReportedUser);
