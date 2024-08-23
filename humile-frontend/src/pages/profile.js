/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";

//axios
import axios from "axios";

//redux
import { connect, useSelector } from "react-redux";
import { getProfile, updateProfile } from "../store/admin/action";

//img
import emilyz from "../assets/img/emilyz.jpg";

//TopNav
import TopNav from "../components/Navbar/Topnav";

//MUI
import { Snackbar, Typography } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

//serverpath
import { baseURL } from "../util/ServerPath";
import { useDispatch } from "react-redux";

const Profile = (props) => {
  const { user: admin } = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  //profile
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [imageData, setImageData] = useState(null);
  const [imagePath, setImagePath] = useState(null);

  //password

  const [oldpasssword, setOldPassword] = useState("");
  const [passsword, setPassword] = useState("");
  const [confirmPasssword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({
    old: "",
    new: "",
    confirm: "",
  });

  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openProfileSuccess, setOpenProfileSuccess] = useState(false);

  useEffect(() => {
    dispatch(getProfile()); 
  }, [dispatch]);

  useEffect(() => {
    setName(admin.name);
    setEmail(admin.email);
  }, [admin]);

  const handleEditImage = () => {
    document.getElementById("profileImage").click();
  };

  

  const handleChangeImage = (e) => {
    if (e.target.files[0]) {
      // console.log("picture: ", e.target.files);
      setImageData(e.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImagePath(reader.result);
      });
      
      reader.readAsDataURL(e.target.files[0]);
      const formData = new FormData();
      formData.append("image", e.target.files[0]);

      axios
        .patch("/admin/updateImage", formData)
        .then((res) => {
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleCloseSuccess = () => {
    setOpenSuccess(false);
    setOpenProfileSuccess(false);
    setOpenError(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      name,
      email,
    };

    

    props.updateProfile(data);
    setOpenProfileSuccess(true);
  };

  const submitChangePass = (e) => {
    e.preventDefault();

    if (!passsword || !oldpasssword || !confirmPasssword) {
      const errors = {};

      if (!oldpasssword) {
        errors.old = "Old password can't be a blank!";
      }
      if (!passsword) {
        errors.new = "New password can't be a blank!";
      }
      if (!confirmPasssword) {
        errors.confirm = "Confirm password can't be a blank!";
      }

      return setErrors({ ...errors });
    }
    setError("");
    if (passsword !== confirmPasssword) {
      return setError("Password & Confirm Password does not match");
    }

    

    axios
      .put("/admin", {
        oldPass: oldpasssword,
        newPass: passsword,
        confirmPass: confirmPasssword,
      })
      .then((res) => {
        setOldPassword("");
        setPassword("");
        setConfirmPassword("");
        setOpenSuccess(true);
      })
      .catch(({ response }) => {
        setOpenError(true);
      });
  };
  return (
    <>
      <TopNav />

      <Snackbar
        open={openSuccess}
        autoHideDuration={1000}
        onClose={handleCloseSuccess}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleCloseSuccess} severity="success">
          Password update successfully.
        </Alert>
      </Snackbar>
      <Snackbar
        open={openError}
        autoHideDuration={1000}
        onClose={handleCloseSuccess}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleCloseSuccess} severity="error">
          Old Password does not match.
        </Alert>
      </Snackbar>
      <Snackbar
        open={openProfileSuccess}
        autoHideDuration={1000}
        onClose={handleCloseSuccess}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleCloseSuccess} severity="success">
          Profile update successfully.
        </Alert>
      </Snackbar>
      <div class="content">
        <div class="row">
          <div class="col-md-8">
            <div class="card">
              <div class="card-header pt-4 pl-5 ml-2">
                <h4 class="title">Edit Profile</h4>
              </div>
              <div class="card-body">
                <form>
                  <div class="row px-5">
                    <div class="col-md-12 pr-md-1">
                      <div class="form-group">
                        <label>Name</label>
                        <input
                          type="text"
                          class="form-control"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                    </div>
                    <div class="col-md-12 pr-md-1">
                      <div class="form-group">
                        <label>Email</label>
                        <input
                          type="text"
                          class="form-control"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div class="card-footer">
                <button
                  type="submit"
                  class="btn btn-fill btn-primary float-right"
                  onClick={handleSubmit}
                >
                  Save
                </button>
              </div>
            </div>
            <div class="card">
              <div class="card-header pt-4 pl-5 ml-2">
                <h4 class="title">Change Password</h4>
              </div>
              <div class="card-body">
                <form>
                  <div class="row px-5">
                    <div class="col-md-12 pr-md-1">
                      <div class="form-group">
                        <label>Old Password</label>
                        <input
                          type="password"
                          class="form-control"
                          value={oldpasssword}
                          onChange={(e) => {
                            setOldPassword(e.target.value);
                            if (!e.target.value) {
                              return setErrors({
                                ...errors,
                                old: "Old password can't be a blank!",
                              });
                            } else {
                              return setErrors({ ...errors, old: "" });
                            }
                          }}
                        />
                        {errors.old && (
                          <div class="pl-1 text-left">
                            <Typography
                              variant="caption"
                              style={{ color: "#D450D9" }}
                            >
                              {errors.old}
                            </Typography>
                          </div>
                        )}
                      </div>
                    </div>
                    <div class="col-md-12 pr-md-1">
                      <div class="form-group">
                        <label>New Password</label>
                        <input
                          type="password"
                          class="form-control"
                          value={passsword}
                          onChange={(e) => {
                            setPassword(e.target.value);
                            if (!e.target.value) {
                              return setErrors({
                                ...errors,
                                new: "New password can't be a blank!",
                              });
                            } else {
                              return setErrors({ ...errors, new: "" });
                            }
                          }}
                        />
                        {errors.new && (
                          <div class="pl-1 text-left">
                            <Typography
                              variant="caption"
                              style={{ color: "#D450D9" }}
                            >
                              {errors.new}
                            </Typography>
                          </div>
                        )}
                      </div>
                    </div>
                    <div class="col-md-12 pr-md-1">
                      <div class="form-group">
                        <label for="exampleInputEmail1">Confirm Password</label>
                        <input
                          type="password"
                          class="form-control"
                          value={confirmPasssword}
                          onChange={(e) => {
                            setConfirmPassword(e.target.value);

                            if (!e.target.value) {
                              return setErrors({
                                ...errors,
                                confirm: "Confirm password can't be a blank!",
                              });
                            } else {
                              return setErrors({ ...errors, confirm: "" });
                            }
                          }}
                        />
                        {errors.confirm && (
                          <div class="pl-1 text-left">
                            <Typography
                              variant="caption"
                              style={{ color: "#D450D9" }}
                            >
                              {errors.confirm}
                            </Typography>
                          </div>
                        )}
                        {error && (
                          <div class="pl-1 text-left">
                            <Typography
                              variant="caption"
                              style={{ color: "#D450D9" }}
                            >
                              {error}
                            </Typography>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div class="card-footer">
                <button
                  type="submit"
                  class="btn btn-fill btn-primary float-right"
                  onClick={submitChangePass}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card card-user">
              <div class="card-body">
                <p class="card-password">
                  <div class="author">
                    <div class="block block-one"></div>
                    <div class="block block-two"></div>
                    <div class="block block-three"></div>
                    <div class="block block-four"></div>
                    <a
                      href={() => false}
                      onClick={handleEditImage}
                      style={{ cursor: "pointer" }}
                    >
                      <input
                        name="image"
                        id="profileImage"
                        type="file"
                        hidden="hidden"
                        accept="image/*"
                        onChange={handleChangeImage}
                      ></input>
                      <img
                        class="avatar"
                        src={
                          !imagePath
                            ? !admin.image
                              ? emilyz
                              : baseURL + "/" + admin.image
                            : imagePath
                        }
                        alt="..."
                      />
                      <h5 class="title">{name}</h5>
                    </a>
                    <p class="description">Admin of the Humile App</p>
                    <hr
                      class="m-5"
                      style={{ borderTop: "3px solid #A04299" }}
                    />
                    <p class="description mb-4">Email : {email}</p>
                  </div>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default connect(null, { getProfile, updateProfile })(Profile);
