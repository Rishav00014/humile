import React, { Fragment, useState, useEffect } from "react";

//redux
import { useSelector, useDispatch, connect } from "react-redux";
import { CLOSE_PLAN_DIALOG } from "../../store/plan/types";
import { createNewPlan, editPlan } from "../../store/plan/action";

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


const PlanDialog = (props) => {
  const dispatch = useDispatch();
  const { dialog: open, dialogData } = useSelector((state) => state.plan);
  

  const [mongoId, setMongoId] = useState("");
  const [coin, setCoin] = useState("");
  const [rupee, setRupee] = useState("");
  const [productKey, setProductKey] = useState("");
  const [discount, setDiscount] = useState(null);

  const [errors, setError] = useState({
    coin: "",
    rupee: "",
    productKey,
  });

  useEffect(() => {
    if (dialogData) {
      setMongoId(dialogData._id);
      setCoin(dialogData.coin);
      setRupee(dialogData.rupee);
      setProductKey(dialogData.productKey);
      setDiscount(dialogData.discount);
    }
  }, [dialogData]);

  useEffect(
    () => () => {
      setError({
        coin: "",
        rupee: "",
        productKey: "",
      });
      setMongoId("");
      setCoin("");
      setRupee("");
      setProductKey("");
      setDiscount(null);
    },
    [open]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!coin || !rupee || !productKey) {
      const errors = {};

      if (!coin) {
        errors.coin = "Coin can't be a blank!";
      }
      if (!rupee) {
        errors.rupee = "Rupee can't be a blank!";
      }
      if (!productKey) {
        errors.productKey = " Product Key can't be a blank!";
      }

      return setError({ ...errors });
    }

    const validateCoin =
      coin.toString().includes("-") || coin.toString().includes(".");

    if (validateCoin) {
      return setError({ ...errors, coin: "Invalid Value!" });
    }

    if (coin.length >= 20) {
      return setError({ ...errors, coin: "Invalid Value" });
    }
    const validateRupee =
      rupee.toString().includes("-") || rupee.toString().includes(".");

    if (validateRupee) {
      return setError({ ...errors, rupee: "Invalid Value!" });
    }
    if (rupee.length >= 20) {
      return setError({ ...errors, rupee: "Invalid Value" });
    }

    setError({ ...errors, coin: "", rupee: "" });

    

    const data = {
      coin,
      rupee,
      productKey,
      discount,
    };

    if (mongoId) {
      props.editPlan(data, mongoId);
    } else {
      props.createNewPlan(data);
    }
  };

  const closePopup = () => {
    dispatch({ type: CLOSE_PLAN_DIALOG });
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
          <p class="text-default">Plan</p>
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
                  <label class="float-left">Coin</label>
                  <input
                    type="number"
                    class="form-control text-dark "
                    placeholder="0"
                    required
                    value={coin}
                    onChange={(e) => {
                      setCoin(e.target.value);

                      if (!e.target.value) {
                        return setError({
                          ...errors,
                          coin: "Coin can't be a blank!",
                        });
                      } else {
                        return setError({
                          ...errors,
                          coin: "",
                        });
                      }
                    }}
                  />
                  {errors.coin && (
                    <div class="pl-1 text-left">
                      <Typography variant="caption" color="error">
                        {errors.coin}
                      </Typography>
                    </div>
                  )}
                </div>
                <div class="form-group">
                  <div class="row">
                    <div class="col-md-6">
                      <label class="float-left">Rupee</label>
                      <input
                        type="number"
                        class="form-control text-dark "
                        placeholder="0"
                        required
                        value={rupee}
                        onChange={(e) => {
                          setRupee(e.target.value);

                          if (!e.target.value) {
                            return setError({
                              ...errors,
                              rupee: "Rupee can't be a blank!",
                            });
                          } else {
                            return setError({
                              ...errors,
                              rupee: "",
                            });
                          }
                        }}
                      />
                      {errors.rupee && (
                        <div class="pl-1 text-left">
                          <Typography variant="caption" color="error">
                            {errors.rupee}
                          </Typography>
                        </div>
                      )}
                    </div>

                    <div class="col-md-6">
                      <label class="float-left">Discount</label>
                      <input
                        type="text"
                        class="form-control text-dark "
                        placeholder="10%"
                        required
                        value={discount}
                        onChange={(e) => {
                          setDiscount(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <label class="float-left">Product Key</label>
                  <input
                    type="text"
                    class="form-control text-dark "
                    placeholder="Enter Product key"
                    required
                    value={productKey}
                    onChange={(e) => {
                      setProductKey(e.target.value);

                      if (!e.target.value) {
                        return setError({
                          ...errors,
                          productKey: " Product Key can't be a blank!",
                        });
                      } else {
                        return setError({
                          ...errors,
                          productKey: "",
                        });
                      }
                    }}
                  />
                  {errors.productKey && (
                    <div class="pl-1 text-left">
                      <Typography variant="caption" color="error">
                        {errors.productKey}
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

export default connect(null, { createNewPlan, editPlan })(PlanDialog);
