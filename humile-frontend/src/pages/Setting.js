import React, { useEffect, useState } from "react";

//redux
import { connect, useSelector } from "react-redux";

//action
import {
  getSetting,
  editSetting,
  isUnderMaintenance,
  isWhatsAppSupport,
  isUpiActive,
  isPayUMoneyActive,
  isGooglePayActive,
} from "../store/setting/action";

//TopNav
import TopNav from "../components/Navbar/Topnav";

//MUI
import { Snackbar, Typography } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useDispatch } from "react-redux";

const Setting = (props) => {
  const dispatch = useDispatch();

  const [mongoId, setMongoId] = useState(null);
  const [loginBonus, setLoginBonus] = useState(null);
  const [UPIId, setUPIId] = useState(null);
  const [isUpi, setIsUpi] = useState(false);
  const [userCharge, setUserCharge] = useState(null);
  const [policyLink, setPolicyLink] = useState(null);
  const [minCoins, setMinCoins] = useState(null);
  const [toCurrency, setToCurrency] = useState(null);
  const [howManyCoins, setHowManyCoins] = useState(null);
  const [minFreeSeconds, setMinFreeSeconds] = useState(null);
  const [durationBetweenCall, setDurationBetweenCall] = useState(null);
  const [howManyFreeCall, setHowManyFreeCall] = useState(0);
  const [whatsAppNo, setWhatsAppNo] = useState(0);
  const [whatsAppSupport, setWhatsAppSupport] = useState(false);
  const [underMaintenance, setUnderMaintenance] = useState(false);
  const [isPayUMoney, setIsPayUMoney] = useState(false);

  const [merchantKey, setMerchantKey] = useState(null);
  const [merchantId, setMerchantId] = useState(null);
  const [merchantSalt, setMerchantSalt] = useState(null);
  const [maxSecondForCall, setMaxSecondForCall] = useState(10);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [googlePayId, setGooglePayId] = useState("");
  const [googlePayActive, setGooglePayActive] = useState(false);

  // const [agoraId, setAgoraId] = useState(null);
  // const [hostPay, setHostPay] = useState(null);
  // const [redeemDay, setRedeemDay] = useState(0);
  // const [policyText, setPolicyText] = useState(null);

  const [error, setError] = useState({
    UPIId: "",

    policyLink: "",
    loginBonus: "",
    userCharge: "",

    minCoins: "",
    howManyCoins: "",
    toCurrency: "",
    minFreeSeconds: "",
    howManyFreeCall: "",
    durationBetweenCall: "",
    whatsAppNo: "",
    merchantKey: "",
    merchantId: "",
    merchantSalt: "",
    googlePayId: "",
  });

  const setting = useSelector((state) => state.setting.setting);
  

  useEffect(() => {
    dispatch(getSetting());
  }, [dispatch]);

  useEffect(() => {
    setMongoId(setting._id);
    setUPIId(setting.upiId);

    setPolicyLink(setting.policyLink);
    setLoginBonus(setting.loginBonus);
    setUserCharge(setting.userCharge);

    setMinCoins(setting.minCoins);
    setHowManyCoins(setting.howManyCoins);
    setToCurrency(setting.toCurrency);
    setMinFreeSeconds(setting.minFreeSecond);
    setHowManyFreeCall(setting.howManyFreeCall);
    setDurationBetweenCall(setting.durationBetweenCall);
    setUnderMaintenance(setting.isAppActive);
    setWhatsAppSupport(setting.isWpSupport);
    setWhatsAppNo(setting.whatsAppNo);

    setIsUpi(setting.isUpi);
    setMerchantKey(setting.merchantKey);
    setMerchantId(setting.merchantId);
    setMerchantSalt(setting.merchantSalt);

    setMaxSecondForCall(setting.maxSecondForCall);
    setIsPayUMoney(setting.isPayUMoneyActive);
    setGooglePayId(setting.googlePayId);
    setGooglePayId(setting.googlePayId);
    setGooglePayActive(setting.isGooglePayId);
  }, [setting]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!policyLink || !userCharge) {
      const errors = {};

      if (!policyLink) {
        errors.policyLink = "Policy Link is Required!";
      }

      if (!userCharge) {
        errors.userCharge = "User Charge is Required!";
      }

      return setError({ ...errors });
    }
    if (isPayUMoney === true) {
      if (!merchantSalt) {
        return setError({
          ...error,
          merchantSalt: "Merchant Salt is Required!",
        });
      }
      if (!merchantKey) {
        return setError({ ...error, merchantKey: "Merchant Key is Required!" });
      }
      if (!merchantId) {
        return setError({ ...error, merchantId: "Merchant Id is Required!" });
      }
    }
    if (googlePayActive === true) {
      if (!googlePayId) {
        return setError({
          ...error,
          googlePayId: "Google Pay Id is Required!",
        });
      }
    }
    if (whatsAppSupport === true) {
      if (!whatsAppNo) {
        return setError({
          ...error,
          whatsAppNo: "WhatsApp Number is Required!",
        });
      }
    }
    if (whatsAppSupport === true) {
      if (whatsAppNo.length <= 11) {
        return setError({
          ...error,
          whatsAppNo: "Please enter mobile number with Country code!",
        });
      }
    }
    if (isUpi === true) {
      if (!UPIId) {
        return setError({ ...error, UPIId: "Upi Id is Required!" });
      }
    }

    const validateMinFreeSeconds =
      minFreeSeconds.toString().includes("-") ||
      minFreeSeconds.toString().includes(".");

    if (validateMinFreeSeconds) {
      return setError({ ...error, minFreeSeconds: "Invalid Value!" });
    }

    const validateDurationBetweenCall =
      durationBetweenCall.toString().includes("-") ||
      durationBetweenCall.toString().includes(".");

    if (validateDurationBetweenCall) {
      return setError({ ...error, durationBetweenCall: "Invalid Value!" });
    }
    const validateHowManyFreeCall =
      howManyFreeCall.toString().includes("-") ||
      howManyFreeCall.toString().includes(".");

    if (validateHowManyFreeCall) {
      return setError({ ...error, howManyFreeCall: "Invalid Value!" });
    }
    const validateLoginBonus =
      loginBonus.toString().includes("-") ||
      loginBonus.toString().includes(".");

    if (validateLoginBonus) {
      return setError({ ...error, loginBonus: "Invalid Value!" });
    }
    const validateUserCharge =
      userCharge.toString().includes("-") ||
      userCharge.toString().includes(".");

    if (validateUserCharge) {
      return setError({ ...error, userCharge: "Invalid Value!" });
    }
    const validateMinCoins =
      minCoins.toString().includes("-") || minCoins.toString().includes(".");

    if (validateMinCoins) {
      return setError({ ...error, minCoins: "Invalid Value!" });
    }
    const validateHowManyCoins =
      howManyCoins.toString().includes("-") ||
      howManyCoins.toString().includes(".");

    if (validateHowManyCoins) {
      return setError({ ...error, howManyCoins: "Invalid Value!" });
    }

    const data = {
      loginBonus,
      upiId: UPIId,
      userCharge,
      policyLink,
      minCoins,
      toCurrency,
      howManyCoins,
      minFreeSecond: minFreeSeconds,
      durationBetweenCall,
      howManyFreeCall,
      whatsAppNo,
      merchantKey,
      merchantId,
      merchantSalt,
      maxSecondForCall,
      googlePayId,
    };

    

    props.editSetting(data, mongoId);

    setOpenSuccess(true);
  };

  const handleCloseSuccess = () => {
    setOpenSuccess(false);
  };

  const handleMaintenance = (id) => {
    
    props.isUnderMaintenance(id);
  };

  const handleWpSupport = (id) => {
    
    props.isWhatsAppSupport(id);
  };

  const handleUpi = (id) => {
    
    props.isUpiActive(id);
  };

  const handlePayUMoney = (id) => {
    
    props.isPayUMoneyActive(id);
  };
  const handleGooglePayId = (id) => {
    
    props.isGooglePayActive(id);
  };

  return (
    <>
      <TopNav />
      <Snackbar
        open={openSuccess}
        autoHideDuration={2000}
        onClose={handleCloseSuccess}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleCloseSuccess} severity="success">
          Updated successfully.
        </Alert>
      </Snackbar>
      <div class="content">
        <div class="row">
          <div class="col-md-6">
            <div class="card">
              <div class="card-header pt-4 pl-5 ml-2 ">
                <h4 class="title mb-4">
                  Google Pay Id
                  <label class="switch float-right">
                    <input
                      type="checkbox"
                      checked={googlePayActive}
                      onChange={() => handleGooglePayId(mongoId)}
                    />
                    <span class="slider">
                      <p
                        style={{
                          fontSize: 12,
                          marginLeft: `${googlePayActive ? "7px" : "32px"}`,
                          color: "white",
                          marginTop: "1px",
                        }}
                      >
                        {googlePayActive ? "Yes" : "No"}
                      </p>
                    </span>
                  </label>
                </h4>
              </div>
              <div class="card-body">
                <form>
                  <div class="row px-5 mt-1">
                    <div class="col-md-12 pr-md-1">
                      <div class="form-group">
                        <label>Google Pay Id</label>
                        <input
                          type="text"
                          class="form-control"
                          value={googlePayId}
                          onChange={(e) => {
                            setGooglePayId(e.target.value);

                            // if (!e.target.value) {
                            //   return setError({
                            //     ...error,
                            //     googlePayId: "Google Pay ID is Required!",
                            //   });
                            // } else {
                            //   return setError({
                            //     ...error,
                            //     googlePayId: "",
                            //   });
                            // }
                          }}
                        />

                        {error.googlePayId && (
                          <div class="pl-1 text-left">
                            <Typography variant="caption" color="error">
                              {error.googlePayId}
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
                  onClick={handleSubmit}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="card ">
              <div class="card-header pt-4 pl-5 ml-2">
                <h4 class="title">Policy Link</h4>
              </div>
              <div class="card-body  mb-0 pt-0 pb-0">
                <form>
                  <div class="row px-5">
                    <div class="col-md-12 pr-md-1">
                      <div class="form-group">
                        <label>Policy Link</label>
                        <input
                          type="text"
                          class="form-control"
                          value={policyLink}
                          onChange={(e) => {
                            setPolicyLink(e.target.value);

                            if (!e.target.value) {
                              return setError({
                                ...error,
                                policyLink: "Policy Link is Required!",
                              });
                            } else {
                              return setError({
                                ...error,
                                policyLink: "",
                              });
                            }
                          }}
                        />
                        {error.policyLink && (
                          <div class="pl-1 text-left">
                            <Typography variant="caption" color="error">
                              {error.policyLink}
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
                  onClick={handleSubmit}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6">
            <div class="card">
              <div class="card-header pt-4 pl-5 ml-2">
                <h4 class="title mb-4">
                  Is App Active
                  <label class="switch float-right">
                    <input
                      type="checkbox"
                      checked={underMaintenance}
                      onChange={() => handleMaintenance(mongoId)}
                    />
                    <span class="slider">
                      <p
                        style={{
                          fontSize: 12,
                          marginLeft: `${underMaintenance ? "7px" : "32px"}`,
                          color: "white",
                          marginTop: "1px",
                        }}
                      >
                        {underMaintenance ? "Yes" : "No"}
                      </p>
                    </span>
                  </label>
                </h4>
              </div>
              <div class="card-header pt-4 pl-5 ml-2 ">
                <h4 class="title mb-4">
                  WhatsApp Support
                  <label class="switch float-right">
                    <input
                      type="checkbox"
                      checked={whatsAppSupport}
                      onChange={() => handleWpSupport(mongoId)}
                    />
                    <span class="slider">
                      <p
                        style={{
                          fontSize: 12,
                          marginLeft: `${whatsAppSupport ? "7px" : "32px"}`,
                          color: "white",
                          marginTop: "1px",
                        }}
                      >
                        {whatsAppSupport ? "Yes" : "No"}
                      </p>
                    </span>
                  </label>
                </h4>
              </div>
              <div class="card-body">
                <form>
                  <div class="row px-5 mt-1">
                    <div class="col-md-12 pr-md-1">
                      <div class="form-group">
                        <label>WhatsApp Number</label>
                        <input
                          type="text"
                          class="form-control"
                          disabled={whatsAppSupport ? false : true}
                          value={whatsAppSupport && whatsAppNo}
                          onChange={(e) => {
                            setWhatsAppNo(e.target.value);

                            if (!e.target.value) {
                              return setError({
                                ...error,
                                whatsAppNo: "WhatsApp number is Required!",
                              });
                            } else {
                              return setError({
                                ...error,
                                whatsAppNo: "",
                              });
                            }
                          }}
                        />

                        {error.whatsAppNo && (
                          <div class="pl-1 text-left">
                            <Typography variant="caption" color="error">
                              {error.whatsAppNo}
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
                  onClick={handleSubmit}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="card">
              <div class="card-header pt-4 pl-5 ml-2">
                <h4 class="title">Coins</h4>
              </div>
              <div class="card-body">
                <form>
                  <div class="row px-5">
                    <div class="col-md-12 pr-md-1">
                      <div class="form-group">
                        <label>Login Bonus</label>
                        <input
                          type="number"
                          class="form-control"
                          value={loginBonus}
                          onChange={(e) => {
                            setLoginBonus(e.target.value);

                            if (!e.target.value) {
                              return setError({
                                ...error,
                                loginBonus: "Login Bonus is Required!",
                              });
                            } else {
                              return setError({
                                ...error,
                                loginBonus: "",
                              });
                            }
                          }}
                        />
                        {error.loginBonus && (
                          <div class="pl-1 text-left">
                            <Typography variant="caption" color="error">
                              {error.loginBonus}
                            </Typography>
                          </div>
                        )}
                      </div>
                    </div>
                    <div class="col-md-6 pr-md-1">
                      <div class="form-group">
                        <label>User Charge / Per Minute</label>
                        <input
                          type="number"
                          class="form-control"
                          value={userCharge}
                          onChange={(e) => {
                            setUserCharge(e.target.value);

                            if (!e.target.value) {
                              return setError({
                                ...error,
                                userCharge: "User Charge Id is Required!",
                              });
                            } else {
                              return setError({
                                ...error,
                                userCharge: "",
                              });
                            }
                          }}
                        />
                        {error.userCharge && (
                          <div class="pl-1 text-left">
                            <Typography variant="caption" color="error">
                              {error.userCharge}
                            </Typography>
                          </div>
                        )}
                      </div>
                    </div>
                    <div class="col-md-6 pr-md-1">
                      <div class="form-group"></div>
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
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="card ">
              <div class="card-header pt-4 pl-5 ml-2 pb-0">
                <h4 class="title mb-0">
                  Minimum Seconds for host to earn coin
                </h4>
              </div>
              <div class="card-body pb-0">
                <form>
                  <div class="row px-5">
                    <div class="col-md-12 pr-md-1">
                      <div class="form-group">
                        <label>Seconds</label>
                        <input
                          type="number"
                          class="form-control mb-0"
                          value={minFreeSeconds}
                          onChange={(e) => {
                            setMinFreeSeconds(e.target.value);

                            if (!e.target.value) {
                              return setError({
                                ...error,
                                minFreeSeconds:
                                  "Minimum Free Seconds  is Required!",
                              });
                            } else {
                              return setError({
                                ...error,
                                minFreeSeconds: "",
                              });
                            }
                          }}
                        />
                        {error.minFreeSeconds && (
                          <div class="pl-1 text-left">
                            <Typography variant="caption" color="error">
                              {error.minFreeSeconds}
                            </Typography>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div class="card-header pt-3 pl-5 ml-2 pb-0">
                <h4 class="title mb-0">
                  Free call for User OR Duration Between Call
                </h4>
              </div>
              <div class="card-body pb-0">
                <form>
                  <div class="row px-5">
                    <div class="col-md-6 pr-md-1">
                      <div class="form-group">
                        <label>Free call Number</label>
                        <input
                          type="number"
                          class="form-control pb-0"
                          value={howManyFreeCall}
                          onChange={(e) => {
                            setHowManyFreeCall(e.target.value);

                            if (!e.target.value) {
                              return setError({
                                ...error,
                                howManyFreeCall: "Free Call is Required!",
                              });
                            } else {
                              return setError({
                                ...error,
                                howManyFreeCall: "",
                              });
                            }
                          }}
                        />
                        {error.howManyFreeCall && (
                          <div class="pl-1 text-left">
                            <Typography variant="caption" color="error">
                              {error.howManyFreeCall}
                            </Typography>
                          </div>
                        )}
                      </div>
                    </div>
                    <div class="col-md-6 pr-md-1">
                      <div class="form-group">
                        <label>Duration Between Call</label>
                        <input
                          type="number"
                          class="form-control pb-0"
                          value={durationBetweenCall}
                          onChange={(e) => {
                            setDurationBetweenCall(e.target.value);

                            if (!e.target.value) {
                              return setError({
                                ...error,
                                durationBetweenCall: "Duration is Required!",
                              });
                            } else {
                              return setError({
                                ...error,
                                durationBetweenCall: "",
                              });
                            }
                          }}
                        />
                        {error.durationBetweenCall && (
                          <div class="pl-1 text-left">
                            <Typography variant="caption" color="error">
                              {error.durationBetweenCall}
                            </Typography>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div class="card-header pt-0 pl-5 ml-2">
                <h4 class="title">Maximum Seconds for call</h4>
              </div>
              <div class="card-body pb-0 pt-0">
                <form>
                  <div class="row px-5">
                    <div class="col-md-12 pr-md-1">
                      <div class="form-group">
                        <label>Seconds</label>
                        <input
                          type="number"
                          class="form-control mb-0"
                          value={maxSecondForCall}
                          onChange={(e) => {
                            setMaxSecondForCall(e.target.value);
                          }}
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
          </div>
          {/* <div class="col-md-6">
            <div class="card ">
              <div class="card-header pt-4 pl-5 ml-2">
                <h4 class="title">
                  PayU Money
                  <label class="switch float-right">
                    <input
                      type="checkbox"
                      checked={isPayUMoney}
                      onChange={() => handlePayUMoney(mongoId)}
                    />
                    <span class="slider">
                      <p
                        style={{
                          fontSize: 12,
                          marginLeft: `${isPayUMoney ? "7px" : "32px"}`,
                          color: "white",
                          marginTop: "1px",
                        }}
                      >
                        {isPayUMoney ? "Yes" : "No"}
                      </p>
                    </span>
                  </label>
                </h4>
              </div>
              <div class="card-body">
                <form>
                  <div class="row px-5 py-1">
                    <div class="col-md-12 pr-md-1">
                      <div class="form-group">
                        <label>Merchant Id</label>
                        <input
                          type="text"
                          disabled={isPayUMoney ? false : true}
                          class="form-control"
                          value={merchantId}
                          onChange={(e) => {
                            setMerchantId(e.target.value);

                            if (!e.target.value) {
                              return setError({
                                ...error,
                                merchantId: "Merchant Id is Required!",
                              });
                            } else {
                              return setError({
                                ...error,
                                merchantId: "",
                              });
                            }
                          }}
                        />
                        {error.merchantId && (
                          <div class="pl-1 text-left">
                            <Typography variant="caption" color="error">
                              {error.merchantId}
                            </Typography>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div class="row px-5 py-2">
                    <div class="col-md-12 pr-md-1">
                      <div class="form-group">
                        <label>Merchant Key</label>
                        <input
                          type="text"
                          class="form-control"
                          disabled={isPayUMoney ? false : true}
                          value={merchantKey}
                          onChange={(e) => {
                            setMerchantKey(e.target.value);

                            if (!e.target.value) {
                              return setError({
                                ...error,
                                merchantKey: "Merchant Key is Required!",
                              });
                            } else {
                              return setError({
                                ...error,
                                merchantKey: "",
                              });
                            }
                          }}
                        />
                        {error.merchantKey && (
                          <div class="pl-1 text-left">
                            <Typography variant="caption" color="error">
                              {error.merchantKey}
                            </Typography>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div class="row px-5 py-1">
                    <div class="col-md-12 pr-md-1">
                      <div class="form-group">
                        <label>Merchant salt</label>
                        <input
                          type="text"
                          class="form-control"
                          disabled={isPayUMoney ? false : true}
                          value={merchantSalt}
                          onChange={(e) => {
                            setMerchantSalt(e.target.value);

                            if (!e.target.value) {
                              return setError({
                                ...error,
                                merchantSalt: "Merchant Salt is Required!",
                              });
                            } else {
                              return setError({
                                ...error,
                                merchantSalt: "",
                              });
                            }
                          }}
                        />
                        {error.merchantSalt && (
                          <div class="pl-1 text-left">
                            <Typography variant="caption" color="error">
                              {error.merchantSalt}
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
                  onClick={handleSubmit}
                >
                  Save
                </button>
              </div>
            </div>
          </div> */}
        </div>
        <div class="row"></div>
      </div>
    </>
  );
};

export default connect(null, {
  getSetting,
  editSetting,
  isWhatsAppSupport,
  isUnderMaintenance,
  isUpiActive,
  isPayUMoneyActive,
  isGooglePayActive,
})(Setting);
