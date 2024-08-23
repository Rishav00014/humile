import React, { Fragment, useState, useEffect } from "react";

//redux
import { useSelector, useDispatch, connect } from "react-redux";
import { CLOSE_DIALOG } from "../../store/message/type";
import { insertMessage, updateMessage } from "../../store/message/action";

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


const MessageDialog = (props) => {
  const dispatch = useDispatch();
  const {
    dialog: open,
    dialogData,
  } = useSelector((state) => state.message);

  const [mongoId, setMongoId] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const [errors, setError] = useState({
    question: "",
    answer: "",
  });

  

  useEffect(() => {
    if (dialogData) {
      setMongoId(dialogData._id);
      setQuestion(dialogData.question);
      setAnswer(dialogData?.answer.join(","));
    }
  }, [dialogData]);

  useEffect(
    () => () => {
      setError({
        question: "",
        answer: "",
      });
      setMongoId("");
      setQuestion("");
      setAnswer("");
    },
    [open]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!question || !answer) {
      const errors = {};

      if (!question.trim()) {
        errors.question = "Question can't be a blank!";
      }
      if (!answer.trim()) {
        errors.answer = "Answer can't be a blank!";
      }

      return setError({ ...errors });
    }

    

    const data = {
      question,
      answer: answer.replace(/,(?=\s*$)/, '').split(",")
    };

    if (mongoId) {
      props.updateMessage(data, mongoId);
    } else {
      props.insertMessage(data);
    }
  };

  const closePopup = () => {
    dispatch({ type: CLOSE_DIALOG });
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
          <p class="text-default">Message</p>
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
                  <label class="float-left">Question</label>
                  <input
                    type="text"
                    class="form-control text-dark "
                    placeholder="Hello"
                    required
                    value={question}
                    onChange={(e) => {
                      setQuestion(e.target.value);

                      if (!e.target.value) {
                        return setError({
                          ...errors,
                          question: "Question can't be a blank!",
                        });
                      } else {
                        return setError({
                          ...errors,
                          question: "",
                        });
                      }
                    }}
                  />

                  {errors.question &&
                    (<div class="pl-1 text-left">
                      <Typography variant="caption" color="error">
                        {errors.question}
                      </Typography>
                    </div>)

                  }
                </div>
                <div class="form-group">
                  <label class="float-left">answer</label>
                  <textarea
                    type="text"
                    class="form-control text-dark "
                    placeholder="Hello"
                    required
                    rows={2}
                    value={answer}
                    onChange={(e) => {
                      setAnswer(e.target.value);

                      if (!e.target.value) {
                        return setError({
                          ...errors,
                          answer: "Answer can't be a blank!",
                        });
                      } else {
                        return setError({
                          ...errors,
                          answer: "",
                        });
                      }
                    }}
                  />
                  <div class="pl-1 text-left">
                    <Typography variant="caption" color="error">
                      You Can Add Multiple Answer using comma (",")
                    </Typography>
                  </div>
                  {errors.answer &&
                    (<div class="pl-1 text-left">
                      <Typography variant="caption" color="error">
                        {errors.answer}
                      </Typography>
                    </div>)

                  }
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

export default connect(null, { insertMessage, updateMessage })(
  MessageDialog
);
