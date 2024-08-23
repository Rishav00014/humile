import React, { useState, useEffect } from "react";

//react-router-dom
import { useHistory } from "react-router-dom";

//react-redux
import { useSelector, connect } from "react-redux";
import { createNewHost, editHost } from "../../store/host/action";

import { Typography } from "@material-ui/core";

//alert
import { alert } from "../../util/alert";

//topNav
import TopNav from "../Navbar/Topnav";

// react dropzone
import ReactDropzone from "react-dropzone";

//jquery
import $, { error } from "jquery";
import { baseURL, key } from "../../util/ServerPath";

const HostDialog = (props) => {
  const LanguageList = useSelector((state) => state.language.language);

  const [mongoId, setMongoId] = useState("");

  const [language, setLanguage] = useState("");
  const [name, setName] = useState("");

  const [bio, setBio] = useState("");
  const [age, setAge] = useState("");
  const [imageData, setImageData] = useState([]);
  const [imagePath, setImagePath] = useState("");
  const [videoData, setVideoData] = useState("");
  const [videoPath, setVideoPath] = useState("");
  const [type, setVideoType] = useState("link");
  const [imageType, setImageType] = useState("link");
  const [imageLink, setImageLink] = useState([]);

  const [link, setLink] = useState("");

  const [errors, setError] = useState({
    language: "",
    name: "",
    bio: "",
    age: "",
    video: "",
    imageData: "",
  });

  const { dialog: open, dialogData } = useSelector((state) => state.host);
  

  useEffect(() => {
    setError({
      language: "",
      name: "",
      bio: "",
      age: "",
      video: "",
      imageData: "",
    });
    setMongoId("");
    setName("");
    setAge("");
    setBio("");
    setLanguage("");
    setImageData([]);
    setImageLink([]);
    setLink("");
    setVideoPath("");
    setVideoData("");
  }, [open]);

  useEffect(() => {
    if (dialogData) {
      setMongoId(dialogData._id);
      setName(dialogData.name);
      setAge(dialogData.age);
      setBio(dialogData.bio);
      setLanguage(dialogData.language ? dialogData.language._id : "Deleted");
      setVideoType(dialogData.videoType);
      setImageType(dialogData.imageType);
      dialogData.imageType === "link"
        ? setImageLink(dialogData.image)
        : setImageData(dialogData.image);

      dialogData.videoType === "link"
        ? setLink(dialogData.video)
        : setVideoPath(dialogData.video);
      setVideoData(dialogData.video);
    }
  }, [dialogData]);

  let history = useHistory();

  //Remove Host Image
  const removeHostImage = (index, file) => {
    if (mongoId && imageData.length === 1) {
      return setError({ ...errors, image: "Select At least 1 Image!" });
    }
    setError({ ...errors, image: "" });
    if (file.preview) {
      const imageDataa = imageData?.filter((ele) => {
        return ele.preview !== file.preview;
      });
      setImageData(imageDataa);
    } else {
      if (mongoId) {
        
        fetch(`${baseURL}/host/deleteHostImage/${mongoId}?position=${index}`, {
          method: "DELETE",
          headers: { key: key },
        })
          .then((res) => res.json())
          .then((res) => {
            if (res.status) {
              const images = imageData.filter((ele) => {
                return ele != file;
              });

              setImageData(images);
            }
          })
          .catch((error) => console.log(error));
      }
    }
  };

  const removeVideo = () => {
    $("#video").val("");
    setVideoData(null);
    setVideoPath(null);
  };

  const handleInputVideo = (e) => {
    if (e.target.files[0]) {
      setVideoData(e.target.files[0]);
      const reader = new FileReader();

      reader.addEventListener("load", () => {
        setVideoPath(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
    if (!e.target.files[0]) {
      return setError({
        ...errors,
        video: "Video can't be a Blank!",
      });
    } else {
      return setError({
        ...errors,
        video: "",
      });
    }
  };
  const isLink= (value) => {
    const val = value === "" ? 0 : value;
    const validNumber = /^(ftp|http|https):\/\/[^ "]+$/.test(val);
    return validNumber;
  };
  const handleSubmit = (e) => {
    const validVideoLink=isLink(link)
    const validImageLink=isLink(imageLink)
    const validBio=bio.length >= 500
    e.preventDefault();
    if (
      !name ||
      !bio ||
      validBio ||
      !age ||
      !language ||
      (type == "link" ?!link || !validVideoLink : !videoData ) ||
      (imageType == "link" ?!imageLink || !validImageLink : !imageData) 
    ) {
      const errors = {};

      if (!name) {
        errors.name = "Name can't be a Blank!";
      }

      if (!bio) {
        errors.bio = "Bio can't be a Blank!";
      }else if(validBio){
        errors.bio="Maximum 500 Characters are Allowed!"
      }
      if (!age) {
        errors.age = "Age can't be a Blank!";
      }

      if (!language) {
        errors.language = "Please Select a Language!";
      }
 
      if(imageType == "link"){
        if (imageLink?.length === 0){
          errors.imageLink = "Image Link can't be a Blank!";
        }else if(!validImageLink){
          errors.imageLink = "Invalid URL!";
        }
      }else{
        if (imageData.length === 0) errors.imageData = "Image is Required!";
      }

    if(type == "link"){
      if (!link) {
        errors.video = "Video can't be a Blank!"
      }else if(!validVideoLink){
        errors.video= "Invalid URL!"
      }
    }else{
      if (videoData.length === 0) errors.video = "Video is Required!";
    }
      return setError({ ...errors });
    } else {

      if (Number(age) <= 18 || Number(age) >= 100) {
        return setError({
          ...errors,
          age: "Please Enter Age between 18 to 100!",
        });
      }
      const validateAge =
        age.toString().includes("-") || age.toString().includes(".");

      if (validateAge) {
        return setError({ ...errors, age: "Invalid Value!" });
      }

      if (language === "Language" || language === "Deleted") {
        return setError({
          ...errors,
          language: "Please Select a Language!",
        });
      }

      setError({ ...errors, hostId: "", password: "" });
      

      const formData = new FormData();
      formData.append("name", name);

      formData.append("bio", bio);
      formData.append("age", age);
      formData.append("language", language);
      formData.append("videoType", type);
      formData.append("imageType", imageType);

      if (type === "link") {
        formData.append("video", link);
      } else {
        formData.append("video", videoData);
      }

      if (imageType === "link") {
        formData.append("image", imageLink);
      } else {
        for (let i = 0; i < imageData.length; i++) {
          formData.append("image", imageData[i]);
        }
      }

      if (mongoId) {
        props.editHost(formData, mongoId);
      } else {
        props.createNewHost(formData);
      }
      history.push("/admin/host");
    }
  };

  const handleCancel = () => {
    setError({
      language: "",
      name: "",
      bio: "",
      age: "",
      video: "",
      imageData: "",
    });
    setName("");
    setAge("");
    setBio("");
    setImageData([]);
    setImagePath("");
    setLanguage("");
    setVideoData(null);
    setVideoPath(null);
    setLink("");

    history.push("/admin/host");
  };

  //onPreviewDrop function
  const onPreviewDrop = (files) => {
    setError({ ...errors, image: "" });
    files.map((file) =>
      Object.assign(file, { preview: URL.createObjectURL(file) })
    );
    setImageData(imageData.concat(files));
  };
  return (
    <>
      <TopNav />
      <div class="content">
        <div class="row">
          <div class="card">
            <div class="card-header">
              <h4 class="text-primary">{mongoId ? "Edit Host" : "Add Host"}</h4>
            </div>

            <div class="card-body">
              <div class="row">
                <div class="col-md-12">
                  <div class="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      class="form-control text-white"
                      placeholder="Name"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);

                        if (!e.target.value) {
                          return setError({
                            ...errors,
                            name: "Name can't be a Blank!",
                          });
                        } else {
                          return setError({
                            ...errors,
                            name: "",
                          });
                        }
                      }}
                    />
                    {errors.name && (
                      <div class="pl-1 text-left">
                        <Typography variant="caption" color="error">
                          {errors.name}
                        </Typography>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div class="row mt-3">
                <div class="col-md-12">
                  <div class="form-group">
                    <label>Bio</label>
                    <textarea
                      type="text"
                      class="form-control text-white"
                      placeholder="Name"
                      rows="3"
                      value={bio}
                      onChange={(e) => {
                        setBio(e.target.value);

                        if (!e.target.value) {
                          return setError({
                            ...errors,
                            bio: "Bio can't be a Blank!",
                          });
                        } else {
                          return setError({
                            ...errors,
                            bio: "",
                          });
                        }
                      }}
                    />
                    {errors.bio && (
                      <div class="pl-1 text-left">
                        <Typography variant="caption" color="error">
                          {errors.bio}
                        </Typography>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div class="row mt-3">
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Age</label>
                    <input
                      type="number"
                      class="form-control text-white"
                      placeholder="Age"
                      min="0"
                      value={age}
                      onChange={(e) => {
                        setAge(e.target.value);

                        if (!e.target.value) {
                          return setError({
                            ...errors,
                            age: "Age can't be a Blank!",
                          });
                        } else {
                          return setError({
                            ...errors,
                            age: "",
                          });
                        }
                      }}
                    />
                    {errors.age && (
                      <div class="pl-1 text-left">
                        <Typography variant="caption" color="error">
                          {errors.age}
                        </Typography>
                      </div>
                    )}
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="form-group">
                    <label class="float-left">Language</label>

                    <select
                      class="form-select form-control"
                      aria-label="Default select example"
                      value={language}
                      onChange={(e) => {
                        setLanguage(e.target.value);

                        if (!e.target.value) {
                          return setError({
                            ...errors,
                            language: "Please select a Language!",
                          });
                        } else if (e.target.value === "Language") {
                          return setError({
                            ...errors,
                            language: "Please select a Language!",
                          });
                        } else {
                          return setError({
                            ...errors,
                            language: "",
                          });
                        }
                      }}
                    >
                      <option class="text-dark" selected>
                        Language
                      </option>

                      {LanguageList.map((language) => {
                        return (
                          <option class="text-dark" value={language._id}>
                            {language.language}
                          </option>
                        );
                      })}
                    </select>
                    {errors.language && (
                      <div class="pl-1 text-left">
                        <Typography variant="caption" color="error">
                          {errors.language}
                        </Typography>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12 mt-3">
                  <label style={{ verticalAlign: "top" }}>
                    Select Video Type :{" "}
                  </label>
                  <input
                    type="radio"
                    id="video"
                    name="video"
                    value="video"
                    className="ml-2 pt-5"
                    checked={type === "video" ? true : false}
                    onChange={(e) => setVideoType(e.target.value)}
                  />
                  <label
                    for="video"
                    className="ml-1 mr-3 mb-1"
                    style={{ verticalAlign: "middle" }}
                  >
                    Video
                  </label>
                  <input
                    type="radio"
                    id="link"
                    name="video"
                    value="link"
                    checked={type === "link" ? true : false}
                    onChange={(e) => setVideoType(e.target.value)}
                  />
                  <label
                    for="link"
                    className="ml-1 mb-1"
                    style={{ verticalAlign: "middle" }}
                  >
                    Link
                  </label>
                  {type === "link" ? (
                    <>
                      <input
                        type="text"
                        class="form-control text-white"
                        placeholder="link"
                        value={link}
                        onChange={(e) => {
                          setLink(e.target.value);

                          if (!e.target.value) {
                            return setError({
                              ...errors,
                              video: "Video can't be a Blank!",
                            });
                          } else {
                            return setError({
                              ...errors,
                              video: "",
                            });
                          }
                        }}
                      />
                      {errors.video && (
                        <div class="pl-1 text-left">
                          <Typography variant="caption" color="error">
                            {errors.video}
                          </Typography>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      <input
                        class="form-control"
                        type="file"
                        id="video"
                        accept="video/*"
                        required=""
                        onChange={handleInputVideo}
                      />
                      {errors.video && (
                        <div class="pl-1 text-left">
                          <Typography variant="caption" color="error">
                            {errors.video}
                          </Typography>
                        </div>
                      )}
                      {videoPath && (
                        <>
                          <video
                            src={videoPath}
                            class="mt-3 rounded float-left mb-2"
                            height="100px"
                            width="100px"
                            controls={true}
                            controlsList="nodownload"
                            alt="video"
                          />
                          <div
                            class="img-container"
                            style={{
                              display: "inline",
                              position: "relative",
                              float: "left",
                              color: "#414755",
                            }}
                          >
                            <i
                              class="fas fa-times-circle material-icons remove_img text-primary"
                              style={{
                                position: "absolute",
                                right: "-6px",
                                top: "10px",
                                cursor: "pointer",
                              }}
                              onClick={removeVideo}
                            ></i>
                          </div>
                        </>
                      )}
                    </>
                  )}
                </div>
              </div>
              <div class="row mt-3"></div>
              <div class="row">
                <div class="col-md-12 mt-3">
                  <label style={{ verticalAlign: "top" }}>
                    Select Image Type :
                  </label>
                  <input
                    type="radio"
                    id="image"
                    name="image"
                    value="image"
                    checked={imageType === "image" ? true : false}
                    className="ml-2 pt-5"
                    onChange={(e) => setImageType(e.target.value)}
                  />
                  <label
                    for="image"
                    className="ml-1 mr-3 mb-1"
                    style={{ verticalAlign: "middle" }}
                  >
                    Image
                  </label>
                  <input
                    type="radio"
                    id="link_"
                    name="image"
                    value="link"
                    checked={imageType === "link" ? true : false}
                    onChange={(e) => setImageType(e.target.value)}
                  />
                  <label
                    for="link_"
                    className="ml-1 mb-1"
                    style={{ verticalAlign: "middle" }}
                  >
                    Link
                  </label>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  {imageType === "link" ? (
                    <>
                      <input
                        type="text"
                        class="form-control text-white input-link"
                        placeholder="link"
                        value={imageLink}
                        onChange={(e) => {
                          setImageLink(e.target.value);
                          if (!e.target.value) {
                            return setError({
                              ...errors,
                              imageLink: "ImageLink can't be a Blank!",
                            });
                          } else {
                            return setError({
                              ...errors,
                              imageLink: "",
                            });
                          }
                        }}
                      />
                      {errors.imageLink && (
                        <div class="pl-1 text-left">
                          <Typography variant="caption" color="error">
                            {errors.imageLink}
                          </Typography>
                        </div>
                      )}
                      {/* {mongoId &&
                        dialogData.image.map((data, index) => {
                          return (
                            <li>
                              <span
                                style={{
                                  color: "#fff",
                                  fontSize: 15,
                                }}
                              >
                                {data}
                              </span>
                            </li>
                          );
                        })} */}

                      {!mongoId && (
                        <>
                          <Typography variant="caption" color="error">
                            Note :{" "}
                          </Typography>
                          <Typography variant="caption" color="error">
                            You can add multiple links separate by comma (,)
                          </Typography>
                        </>
                      )}
                    </>
                  ) : (
                    <div className="row mt-4">
                      <div className="col-lg-2">
                        <label
                          className="form-control-label"
                          for="input-username"
                        >
                          Select (Multiple) Images
                        </label>

                        <>
                          <ReactDropzone
                            onDrop={(acceptedFiles) =>
                              onPreviewDrop(acceptedFiles)
                            }
                            accept="image/*"
                          >
                            {({ getRootProps, getInputProps }) => (
                              <section>
                                <div {...getRootProps()}>
                                  <input {...getInputProps()} />
                                  <div
                                    style={{
                                      height: 130,
                                      width: 130,
                                      border: "2px dashed gray",
                                      textAlign: "center",
                                      marginTop: "10px",
                                    }}
                                  >
                                    <i
                                      className="fas fa-plus"
                                      style={{ paddingTop: 30, fontSize: 70 }}
                                    ></i>
                                  </div>
                                </div>
                              </section>
                            )}
                          </ReactDropzone>
                          {errors.imageData && (
                            <div className="ml-2 mt-1">
                              {errors.imageData && (
                                <div className="pl-1 text__left">
                                  <Typography
                                    variant="caption"
                                    color="error"
                                    style={{ fontFamily: "Circular-Loom" }}
                                  >
                                    {errors.imageData}
                                  </Typography>
                                </div>
                              )}
                            </div>
                          )}
                        </>
                      </div>
                      <div className="col-lg-10 mt-4">
                        {imageData.length > 0 &&
                          imageData.map((file, index) => {
                            return (
                              <>
                                <img
                                  height="60px"
                                  width="60px"
                                  alt="app"
                                  draggable="false"
                                  src={file.preview ? file.preview : file}
                                  style={{
                                    boxShadow:
                                      "0 5px 15px 0 rgb(105 103 103 / 00%)",
                                    border: "2px solid #fff",
                                    borderRadius: 10,
                                    marginTop: 10,
                                    float: "left",
                                    objectFit: "contain",
                                    marginRight: 15,
                                  }}
                                />
                                <div
                                  class="img-container"
                                  style={{
                                    display: "inline",
                                    position: "relative",
                                    float: "left",
                                  }}
                                >
                                  <i
                                    class="fas fa-times-circle"
                                    style={{
                                      position: "absolute",
                                      right: "10px",
                                      top: "4px",
                                      cursor: "pointer",
                                      color: "#6777ef",
                                    }}
                                    onClick={() => removeHostImage(index, file)}
                                  ></i>
                                </div>
                              </>
                            );
                          })}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <button
                type="button"
                class="btn btn-fill btn-default btn-md mt-0 mt-lg-4 float-right ml-3"
                style={{ borderRadius: 5 }}
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                type="button"
                class="btn btn-fill btn-primary btn-md mt-0 mt-lg-4 float-right"
                style={{ borderRadius: 5 }}
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default connect(null, { createNewHost, editHost })(HostDialog);
