import { Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";

import GoogleAd from "../Advertisement/GoogleAd";

import GoogleAd1 from "../Advertisement/GoogleAd1";

//topNav
import TopNav from "../Navbar/Topnav";

// action
import { getSetting, updateAdSetting } from "../../store/setting/action";
import { connect, useSelector } from "react-redux";

import { useDispatch } from "react-redux";

const GoogleFbAd = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSetting());
  }, [dispatch]);

  const [mongoId, setMongoId] = useState("");
  const [maxAdPerDay, setMaxAdPerDay] = useState(0);
  const [freeCoinForAd, setFreeCoinForAd] = useState(0);
  const [errorSetting,setErrorSetting]=useState({
    maxAdPerDay:"",
    freeCoinForAd:""
  })
  const setting = useSelector((state) => state.setting.setting);
  useEffect(() => {
    if (setting) {
      setMongoId(setting._id);
      setMaxAdPerDay(setting.maxAdPerDay)
      setFreeCoinForAd(setting.freeCoinForAd)
    }
  }, [setting]);

  const isNumeric = (value) => {
    const val = value === "" ? 0 : value;
    const validNumber = /^\d+(\.\d{1,2})?$/.test(val);
    return validNumber;
  };
  const handleSubmit = () => {
  if(!maxAdPerDay || !freeCoinForAd){
    let errorSetting = {};
    if(!maxAdPerDay) errorSetting.maxAdPerDay="maxAdPerDay is Required"
    if(!freeCoinForAd) errorSetting.freeCoinForAd="freeCoinForWatchAd is Required"
    return setErrorSetting({ ...errorSetting });
  } else{

    const maxAdPerDayValid = isNumeric(maxAdPerDay);
    if (!maxAdPerDayValid) {
      return setErrorSetting({ ...errorSetting, maxAdPerDay: "Invalid maxAdPerDay!!" });
    }
    const freeCoinForAdValid = isNumeric(freeCoinForAd);
    if (!freeCoinForAdValid) {
      return setErrorSetting({ ...errorSetting, freeCoinForAd: "Invalid freeCoinForAd!!" });
    }

    const data = {
      settingId: mongoId,
      maxAdPerDay,
      freeCoinForAd
    }
    
    props.updateAdSetting(data)
  }
  }
  return (
    <>
      <TopNav />
      <div class="content">
        <div class="card py-0 px-0 py-xl-1 px-xl-4">
          <div class="row">
            <div class="col-12">
              <div class="card py-0 px-0 py-xl-1 px-xl-4 ">
                <div class="card-body" style={{ overflow: "auto" }}>
                  <div>
                    <GoogleAd />
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12">
              <div class="card py-0 px-0 py-xl-1 px-xl-4 ">
                <div class="card-body" style={{ overflow: "auto" }}>
                  <div>
                    <GoogleAd1 />
                  </div>
                </div>
              </div>
            </div>

            <div class="col-12">
              <div class="card py-0 px-0 py-xl-1 px-xl-4 ">
                <div class="card-body" style={{ overflow: "auto" }}>
                  <div>
                    <Typography
                      class="text-primary"
                      variant="h6"
                      style={{ marginBottom: 20, fontSize: 16 }}
                    >
                      Advertisement Setting
                    </Typography>

                    <form>
                      <div class="form-group">
                        <label class="float-left">Max Ad Per Day</label>
                        <input
                          type="number"
                          class="form-control text-white"
                          required=""
                          value={maxAdPerDay}
                          onChange={(e) => {
                            setMaxAdPerDay(e.target.value);
                            if (!e.target.value) {
                              return setErrorSetting({
                                ...errorSetting,
                                maxAdPerDay: `maxAdPerDay Is Required`,
                              });
                            } else {
                              return setErrorSetting({
                                ...errorSetting,
                                maxAdPerDay: "",
                              });
                            }
                          }}
                        />
                      <p className="errorMessage" style={{color:"red",marginTop:"-10px",fontSize:"12px",marginRight:"6px"}}>
                        {errorSetting.maxAdPerDay && errorSetting.maxAdPerDay}
                      </p>
                      </div>
                      <div class="form-group">
                        <label class="float-left">Free Coin for Watch Ad</label>
                        <input
                          type="number"
                          class="form-control text-white"
                          required=""
                          value={freeCoinForAd}
                          onChange={(e) => {
                            setFreeCoinForAd(e.target.value);
                            if (!e.target.value) {
                              return setErrorSetting({
                                ...errorSetting,
                                freeCoinForAd: `freeCoinForWatchAd Is Required`,
                              });
                            } else {
                              return setErrorSetting({
                                ...errorSetting,
                                freeCoinForAd: "",
                              });
                            }
                          }}
                        />
                      <p className="errorMessage" style={{color:"red",marginTop:"-10px",fontSize:"12px",marginRight:"6px"}}>
                         {errorSetting.freeCoinForAd && errorSetting.freeCoinForAd}
                      </p>
                      </div>
                      <button
                        type="button"
                        class="btn btn-primary float-right"
                        onClick={handleSubmit}
                      >
                        Submit
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default connect(null, { getSetting, updateAdSetting })(GoogleFbAd);
