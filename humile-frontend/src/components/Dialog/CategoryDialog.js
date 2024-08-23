import React, { useEffect, useState } from "react";

//redux
import { connect, useDispatch, useSelector } from "react-redux";

//MUI
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { Cancel } from "@material-ui/icons";

import {
  insertCategory,
  updateCategory,
} from "../../store/Category/action";
import { baseURL } from "../../util/ServerPath";
import { CLOSE_DIALOG } from "../../store/Category/type";


const CategoryDialog = (props) => {
  //State  Define
  const [name, setName] = useState("");
  const [imageData, setImageData] = useState("");
  const [imagePath, setImagePath] = useState("");
  const [mid, setMid] = useState("");
  const [error, setError] = useState({
    name: "",
    imageData: "",
  });

  const dispatch = useDispatch();
  const { dialogData, dialog: open } = useSelector((state) => state.category);
  

  //Null Value After insert
  useEffect(() => {
    setName("");
    setImagePath("");
    setImageData("");
    setError({
      name: "",
      imageData: "",
    });
  }, [open]);

  //  Image Load
  const imageLoad = (event) => {
    setImageData(event.target.files[0]);

    setImagePath(URL.createObjectURL(event.target.files[0]));
  };

  //Set Value For Update
  useEffect(() => {
    if (dialogData) {
      setName(dialogData.name);
      setImagePath(baseURL + "/" + dialogData.image);
      setImageData(dialogData.image);
      setMid(dialogData._id);
    }
  }, [dialogData]);

  //Update Function
  const submit = () => {
    if (!name || !imageData) {
      const error = {};
      if (!name) error.name = "Name is Required!";
      if (!imageData) error.imageData = "Image is Required!";
      setError({ ...error });
    } else {
      
      const formData = new FormData();

      formData.append("name", name);
      formData.append("image", imageData);

      if (mid) {
        props.updateCategory(formData, mid);
      } else {
        props.insertCategory(formData);
      }
    }
  };

  const closePopup = () => {
    dispatch({ type: CLOSE_DIALOG });
  };

  return (
    <div>
      <Dialog
        open={open}
        aria-labelledby="responsive-dialog-title"
        onClose={closePopup}
        disableBackdropClick
        disableEscapeKeyDown
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle id="responsive-dialog-title">
          <p className="text-dark">{"Category"}</p>
        </DialogTitle>

        <IconButton
          style={{
            position: "absolute",
            right: 0,
            color: "#C652E7",
          }}
        >
          <Tooltip title="Close">
            <Cancel onClick={closePopup} />
          </Tooltip>
        </IconButton>
        <DialogContent>
          <div class="modal-body pt-1 px-1 pb-3">
            <div class="d-flex flex-column text-center">
              <form>
                <div class="form-group">
                  <label class="float-left">Name</label>
                  <input
                    type="text"
                    placeholder="Name"
                    class="form-control text-dark"
                    required
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);

                      if (!e.target.value) {
                        return setError({
                          ...error,
                          name: "Name is Required!",
                        });
                      } else {
                        return setError({
                          ...error,
                          name: "",
                        });
                      }
                    }}
                  />
                  {error.name && (
                    <div class="pl-1 text-left">
                      <Typography
                        variant="caption"
                        color="error"
                        style={{ fontFamily: "Circular-Loom" }}
                      >
                        {error.name}
                      </Typography>
                    </div>
                  )}
                </div>
                <div>
                  <label class="float-left">Category Image</label>
                  <input
                    class="form-control text-dark"
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={imageLoad}
                  />
                  {error.imageData && (
                    <div class="pl-1 text-left">
                      <Typography
                        variant="caption"
                        color="error"
                        style={{ fontFamily: "Circular-Loom" }}
                      >
                        {error.imageData}
                      </Typography>
                    </div>
                  )}
                  {imagePath && (
                    <>
                      <img
                        height="50px"
                        width="50px"
                        className="mb-3"
                        alt="app"
                        src={imagePath}
                        style={{
                          boxShadow: "0 5px 15px 0 rgb(105 103 103 / 50%)",
                          border: "2px solid #fff",
                          borderRadius: 10,
                          marginTop: 10,
                          float: "left",
                        }}
                      />
                    </>
                  )}
                </div>

                <button
                  type="button"
                  class="btn btn-primary btn-block btn-round mt-4"
                  onClick={submit}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default connect(null, { insertCategory, updateCategory })(
  CategoryDialog
);
