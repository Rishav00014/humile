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
//action
import { getCategory } from "../../store/Category/action";
import { updateGame, insertGame } from "../../store/Game/action";
import { CLOSE_DIALOG } from "../../store/Game/type";

import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";


const ITEM_HEIGHT = 40;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 200,
    },
  },
};

const GameDialog = (props) => {
  //State  Define
  const dispatch = useDispatch();

  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [logo, setLogo] = useState("");
  const [logoPath, setLogoPath] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [thumbnailPath, setThumbnailPath] = useState("");

  const [link, setLink] = useState("");
  const [ratting, setRatting] = useState(0);
  const [mid, setMid] = useState("");
  const [error, setError] = useState({
    description: "",
    name: "",
    logo: "",
    thumbnail: "",
    link: "",
    ratting: "",
    gameCategory: "",
  });

  //get category
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    dispatch(getCategory()); 
  }, [dispatch]);

  const { category } = useSelector((state) => state.category);

  useEffect(() => {
    setCategoryData(category);
  }, [category]);


  const { dialogData, dialog: open } = useSelector((state) => state.game);

  

  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a the stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    if (!event.target.value) {
      return setError({
        ...error,
        personName: "gameCategory is Required!",
      });
    } else {
      return setError({
        ...error,
        personName: "",
      });
    }
  };

  //  logo Load
  const logoLoad = (event) => {
    setLogo(event.target.files[0]);

    setLogoPath(URL.createObjectURL(event.target.files[0]));
  };

  //  thumbnail Load
  const thumbnailLoad = (event) => {
    setThumbnail(event.target.files[0]);

    setThumbnailPath(URL.createObjectURL(event.target.files[0]));
  };

  //Null Value After Delete
  useEffect(() => {
    setDescription("");
    setLink("");
    setName("");
    setRatting(0);
    setPersonName([]);
    setThumbnail("");
    setThumbnailPath("");
    setLogoPath("");
    setLogo("");
    setError({
      description: "",
      logo: "",
      thumbnail: "",
      link: "",
      ratting: "",
      personName: "",
      name: "",
    });
  }, [open]);

  //Set Value For Update
  useEffect(() => {
    if (dialogData) {
      const gameCategoryId = dialogData.category.map((value) => {
        return value._id;
      });

      setDescription(dialogData.description);
      setLink(dialogData.link);
      setName(dialogData.name);
      setRatting(dialogData.ratting);
      setPersonName(gameCategoryId);
      setThumbnailPath(dialogData.thumbnail);
      setThumbnail(dialogData.thumbnail);
      setLogoPath(dialogData.logo);
      setLogo(dialogData.logo);
      setMid(dialogData._id);
    }
  }, [dialogData]);
  const isNumeric = (value) => {
    const val = value === "" ? 0 : value;
    const validNumber = /^\d+(\.\d{1,2})?$/.test(val);
    return validNumber;
  };
  const isLink= (value) => {
    const val = value === "" ? 0 : value;
    const validNumber = /^(ftp|http|https):\/\/[^ "]+$/.test(val);
    return validNumber;
  };
  //Update Function
  const submit = () => {
    const rattingValid = isNumeric(ratting);
    const validLink =isLink(link) ;
    if (
      !description ||
      !link ||
      !name ||
      !ratting ||
      personName.length === 0 ||
      !thumbnail ||
      !logo ||
      !rattingValid ||
      !validLink
    ) {
      const error = {};
      if (!description) error.description = "Description is Required!";
      if (!name) error.name = "Name is Required!";
      if (!link){
        error.link = "Link is Required!"
      }else if(!validLink){
        error.link="Invalid URL!"
      }
      if (!ratting){
        error.ratting = "Ratting is Required!"
      }else if(!rattingValid){
        error.ratting= "Invalid ratting!!" 
      }
      if (personName.length === 0 ) error.personName = "Category is Required!";
      if (!logo) error.logo = "Logo is Required!";
      if (!thumbnail) error.thumbnail = "Thumbnail is Required!";
         return  setError({ ...error });
    } else {
      
      const formData = new FormData();

      formData.append("description", description);
      formData.append("link", link);
      formData.append("name", name);
      formData.append("ratting", ratting);
      formData.append("category", personName);
      formData.append("thumbnail", thumbnail);
      formData.append("logo", logo);

      if (mid) {
        props.updateGame(formData, mid);
      } else {
        props.insertGame(formData);
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
        maxWidth="sm"
      >
        <DialogTitle id="responsive-dialog-title">
          <p className="text-dark">{"Game"}</p>
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
                <div className="row">
                  <div className="col-md-6 my-2">
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
                  </div>
                  <div className="col-md-6 my-2">
                    <div class="form-group">
                      <label class="float-left">Link</label>
                      <input
                        type="text"
                        placeholder="Link"
                        class="form-control text-dark"
                        required
                        value={link}
                        onChange={(e) => {
                          setLink(e.target.value);

                          if (!e.target.value) {
                            return setError({
                              ...error,
                              link: "Link is Required!",
                            });
                          } else {
                            return setError({
                              ...error,
                              link: "",
                            });
                          }
                        }}
                      />
                      {error.link && (
                        <div class="pl-1 text-left">
                          <Typography
                            variant="caption"
                            color="error"
                            style={{ fontFamily: "Circular-Loom" }}
                          >
                            {error.link}
                          </Typography>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div class="form-group">
                      <label class="float-left">Description</label>
                      <input
                        type="text"
                        placeholder="description"
                        class="form-control text-dark"
                        required
                        value={description}
                        onChange={(e) => {
                          setDescription(e.target.value);

                          if (!e.target.value) {
                            return setError({
                              ...error,
                              description: "description is Required!",
                            });
                          } else {
                            return setError({
                              ...error,
                              description: "",
                            });
                          }
                        }}
                      />
                      {error.description && (
                        <div class="pl-1 text-left">
                          <Typography
                            variant="caption"
                            color="error"
                            style={{ fontFamily: "Circular-Loom" }}
                          >
                            {error.description}
                          </Typography>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12 my-2">
                    <div class="form-group">
                      <label class="float-left">Ratting</label>
                      <input
                        type="number"
                        placeholder="Ratting"
                        class="form-control text-dark"
                        required
                        min="0"
                        value={ratting}
                        onChange={(e) => {
                          setRatting(e.target.value);

                          if (!e.target.value) {
                            return setError({
                              ...error,
                              ratting: "Ratting is Required!",
                            });
                          } else {
                            return setError({
                              ...error,
                              ratting: "",
                            });
                          }
                        }}
                      />
                      {error.ratting && (
                        <div class="pl-1 text-left">
                          <Typography
                            variant="caption"
                            color="error"
                            style={{ fontFamily: "Circular-Loom" }}
                          >
                            {error.ratting}
                          </Typography>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 my-2">
                    <label class="float-left">Thumbnail</label>
                    <input
                      type="file"
                      class="form-control"
                      accept="image/*"
                      required=""
                      onChange={thumbnailLoad}
                    />
                    {error.thumbnail && (
                      <div class="pl-1 text-left">
                        <Typography
                          variant="caption"
                          color="error"
                          style={{ fontFamily: "Circular-Loom" }}
                        >
                          {error.thumbnail}
                        </Typography>
                      </div>
                    )}

                    {thumbnailPath && (
                      <>
                        <img
                          height="50px"
                          width="50px"
                          alt="app"
                          src={thumbnailPath}
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
                  <div className="col-md-6 my-2">
                    <label class="float-left">Logo</label>
                    <input
                      type="file"
                      class="form-control"
                      accept="image/*"
                      required=""
                      onChange={logoLoad}
                    />
                    {error.logo && (
                      <div class="pl-1 text-left">
                        <Typography
                          variant="caption"
                          color="error"
                          style={{ fontFamily: "Circular-Loom" }}
                        >
                          {error.logo}
                        </Typography>
                      </div>
                    )}

                    {logoPath && (
                      <>
                        <img
                          height="50px"
                          width="50px"
                          alt="app"
                          src={logoPath}
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
                </div>
                <div className="row">
                  <div className="col-md-12 text-left category-select">
                    <FormControl sx={{ width: "100%", mt: 2 }}>
                      <InputLabel id="demo-multiple-name-label">
                        Category
                      </InputLabel>
                      <Select
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        class="form-control text-dark"
                        multiple
                        value={personName}
                        onChange={handleChange}
                        input={<OutlinedInput label="Category" />}
                        MenuProps={MenuProps}
                      >
                        {categoryData.map((value) => (
                          <MenuItem
                            key={value}
                            value={value._id}
                          // style={getStyles(name, personName, theme)}
                          >
                            {value.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>

                  {error.personName && (
                    <div class="pl-4 text-left">
                      <Typography
                        variant="caption"
                        color="error"
                        style={{ fontFamily: "Circular-Loom" }}
                      >
                        {error.personName}
                      </Typography>
                    </div>
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

export default connect(null, { getCategory, updateGame, insertGame })(
  GameDialog
);
