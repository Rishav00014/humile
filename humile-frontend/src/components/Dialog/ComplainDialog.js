/* eslint-disable  no-unused-vars */
import React, { Fragment, useState, useEffect } from "react";

//redux
import { useSelector, useDispatch } from "react-redux";
import { CLOSE_COMPLAIN_DIALOG } from "../../store/complain/types";

//icon
import Cancel from "@material-ui/icons/Cancel";
import {
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from "@material-ui/core";

//dialog
import Dialog from "@material-ui/core/Dialog";

//serverPath
import { baseURL } from "../../util/ServerPath";

const ComplainDialog = (props) => {
  const dispatch = useDispatch();
  const { dialog: open, dialogData } = useSelector((state) => state.complain);

  const [mongoID, setMongoId] = useState("");
  const [name, setName] = useState("");

  const [userName, setUserName] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [contact, setContact] = useState("");
  const [image, setImage] = useState([]);
  const [type, setType] = useState("");
  const [id, setId] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    if (dialogData) {
      setMongoId(dialogData._id);
      setName(
        dialogData.host_id === null
          ? dialogData.user_id.name
          : dialogData.host_id.name
      );
      setUserName(
        dialogData.host_id === null
          ? dialogData.user_id.username
          : dialogData.host_id.username
      );
      setTitle(dialogData.title);
      setMessage(dialogData.message);
      setContact(dialogData.contact);
      setImage(dialogData.image && baseURL + "/" + dialogData.image);
      setType(dialogData.host_id === null ? "User" : "Host");
      setId(dialogData.id);
      setDate(dialogData.date);
    }
  }, [dialogData]);

  const closePopup = () => {
    dispatch({ type: CLOSE_COMPLAIN_DIALOG });
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
          <p class="text-default">Complain Details</p>
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
          <table id="example" class="table display " style={{ width: "100%" }}>
            <tbody>
              <tr>
                <td class="d-flex">
                  <b class="text-dark">Complain Id : </b>
                  <p class="text-dark pl-2">{id}</p>
                </td>
              </tr>
              <tr>
                <td class="d-flex">
                  <b class="text-dark">Complain Arrived Date : </b>
                  <p class="text-dark pl-2">{date}</p>
                </td>
              </tr>
              <tr>
                <td class="d-flex">
                  <b class="text-dark">Complain From : </b>
                  <p class="text-dark pl-2">{type}</p>
                </td>
              </tr>
              <tr>
                <td class="d-flex">
                  <b class="text-dark">Name : </b>
                  <p class="text-dark pl-2">{name}</p>
                </td>
              </tr>
              <tr>
                <td class="d-flex">
                  <b class="text-dark">User Name : </b>
                  <p class="text-dark pl-2">{userName}</p>
                </td>
              </tr>
              <tr>
                <td class="d-flex">
                  <b class="text-dark">Complain Title : </b>
                  <p class="text-dark pl-2">{title}</p>
                </td>
              </tr>
              <tr>
                <td class="d-flex">
                  <b class="text-dark">Message </b>
                  <p class="text-dark pl-2">{message}</p>
                </td>
              </tr>
              <tr>
                <td class="d-flex">
                  <b class="text-dark">Contact </b>
                  <p class="text-dark pl-2">{contact}</p>
                </td>
              </tr>
              <tr>
                <td class="d-flex">
                  <b class="text-dark pt-4">image </b>
                  <p class="text-dark pl-2">
                    {image !== baseURL + "/null" && (
                      <a
                        href={image}
                        target="blank"
                        style={{ cursor: "pointer" }}
                      >
                        <img
                          src={image}
                          width="90px"
                          height="90px"
                          alt="img"
                          style={{
                            objectFit: "contain",
                            borderRadius: 10,
                          }}
                        ></img>
                      </a>
                    )}
                  </p>
                </td>
              </tr>
              <tr>
                <td>
                  <button
                    type="button"
                    class="btn btn-fill btn-primary btn-md float-right"
                    style={{ borderRadius: 5 }}
                    onClick={closePopup}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default ComplainDialog;
