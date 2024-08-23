import React, { Fragment, useState, useEffect } from "react";

//redux
import { useSelector, useDispatch, connect } from "react-redux";
import { CLOSE_LANGUAGE_DIALOG } from "../../store/language/types";
import { createNewLanguage, editLanguage } from "../../store/language/action";

//icon
import Cancel from "@material-ui/icons/Cancel";
import {
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
  Typography,
} from "@material-ui/core";

//dialog
import Dialog from "@material-ui/core/Dialog";


const LanguageDialog = (props) => {
  const dispatch = useDispatch();
  const {
    dialog: open,
    dialogData,
    language,
  } = useSelector((state) => state.language);

  const [mongoId, setMongoId] = useState("");
  const [name, setName] = useState("");

  const [errors, setError] = useState({
    name: "",
  });

  

  useEffect(() => {
    if (dialogData) {
      setMongoId(dialogData._id);
      setName(dialogData.language);
    }
  }, [dialogData]);

  useEffect(
    () => () => {
      setError({
        name: "",
      });
      setMongoId("");
      setName("");
    },
    [open]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      const errors = {};

      if (!name) {
        errors.name = "Language can't be a blank!";
      }

      return setError({ ...errors });
    }

    if (!mongoId) {
      const index = language.findIndex(
        (language) => language.language.toLowerCase() === name.toLowerCase()
      );
      if (index > -1) {
        return setError({ ...errors, name: "Language already exist." });
      }
    } else {
      const index = language.find(
        (language) => language.language.toLowerCase() === name.toLowerCase()
      );
      if (index !== undefined) {
        if (index._id === mongoId) {
        } else {
          return setError({ ...errors, name: "Language already exist." });
        }
      }
    }

    

    const data = {
      language: name,
    };

    if (mongoId) {
      props.editLanguage(data, mongoId);
    } else {
      props.createNewLanguage(data);
    }
  };

  const closePopup = () => {
    dispatch({ type: CLOSE_LANGUAGE_DIALOG });
  };

  return (
    <Fragment>
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
          <p class="text-default">Language</p>
        </DialogTitle>

        <IconButton
          style={{
            position: "absolute",
            right: 0,
            color: "#e14eca",
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
                  <label class="float-left">Language</label>
                  <input
                    type="text"
                    class="form-control text-dark "
                    placeholder="English"
                    required
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);

                      if (!e.target.value) {
                        return setError({
                          ...errors,
                          name: "Language can't be a blank!",
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

                <button
                  type="button"
                  class="btn btn-primary btn-block mt-3"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default connect(null, { createNewLanguage, editLanguage })(
  LanguageDialog
);
