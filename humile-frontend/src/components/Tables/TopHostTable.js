import React, { useEffect, useState } from "react";
import Pagination from "react-js-pagination";

import axios from "axios";

//react-redux
import { connect } from "react-redux";

//dayjs
import dayjs from "dayjs";
import FemaleImage from '../../assets/img/anime6.png'
//serverPath
import { baseURL, key } from "../../util/ServerPath";

//topNav
import TopNav from "../Navbar/Topnav";

//dialog
import ComplainDialog from "../Dialog/ComplainDialog";

const TopHostTable = (props) => {
  const [data, setData] = useState([]);

  const [search, setSearch] = useState("");
  const [total, setTotal] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [activePage, setActivePage] = useState(1);

  useEffect(() => {
    axios
      .get(`/host/top?start=${activePage}&limit=${rowsPerPage}`)
      .then((res) => {
        if (res.data) {
          setData(res.data.host);
          setTotal(res.data.total);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [activePage, rowsPerPage]);

  useEffect(() => {
    if (search !== "") {
      fetch(
        `${baseURL}/host/search?value=${search}&key=${key}&start=${activePage}&limit=${rowsPerPage}`
      )
        .then((res) => res.json())
        .then((res) => {
          setData(res.host);
          setTotal(res.total);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .get(`/host/top?start=${activePage}&limit=${rowsPerPage}`)
        .then((res) => {
          if (res.data) {
            setData(res.data.host);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } 
  }, [search]);

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
    axios
      .get(`/host/top?start=${pageNumber}&limit=${rowsPerPage}`)
      .then((res) => {
        if (res.data) {
          setData(res.data.host);
          setTotal(res.data.total);
        }
      })
      .catch((error) => {
        console.log(error);
      });
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
            <div>
              <div class="col-xs-12 col-sm-12  col-lg-4 mt-3 float-right">
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
              <div class="mt-4 mr-3 float-left ml-4 ">
                <h4 class="text-primary">Top Host Leaderboard</h4>
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
                    <th>Language</th>
                    <th>Coin</th>
                    <th>Like</th>
                    <th>Age</th>
                    <th>Arrived On</th>
                  </tr>
                </thead>
                <tbody>
                  {data.length > 0 ? (
                    <>
                      {data.map((data_, index) => {
                        return (
                          <tr key={index}>
                            <td>
                              <img
                                src={data_.image[0] ? data_.image[0] : FemaleImage}
                                width="70px"
                                height="70px"
                                alt="img"
                                style={{
                                  objectFit: "cover",
                                  borderRadius: "50%",
                                }}
                              ></img>
                            </td>
                            <td>{data_.name}</td>

                            <td>
                              {data_.language
                                ? data_.language.language
                                : "Deleted"}
                            </td>
                            <td>{data_.coin}</td>
                            <td>{data_.like}</td>
                            <td>{data_.age}</td>

                            <td>
                              {dayjs(data_.createdAt).format("DD MMM, YYYY")}
                            </td>
                          </tr>
                        );
                      })}
                    </>
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
      <ComplainDialog />
    </>
  );
};

export default connect(null, {})(TopHostTable);
