import React, { useState, useEffect, Fragment } from "react";

// Redux
import { useSelector, connect, useDispatch } from "react-redux";

import {
  getGoogleFbAd,
  showToggle,
  setPriority,
} from "../../store/googleFbAd/action";

// MUI
import { Grid, Typography } from "@material-ui/core";

// Components
import AddField from "./AddField";
import IOSSwitch from "@material-ui/core/Switch";


const GoogleAd = (props) => {
  const ad = useSelector((state) => state.googleFbAd.googleFb.google);
  

  const dispatch = useDispatch();

  const [mongoID, setMongoID] = useState("");
  const [bannerId, setBannerId] = useState(" ");
  const [nativeId, setNativeId] = useState(" ");
  const [appOpenAd, setAppOpenAd] = useState(" ");
  const [interstitial, setInterstitialId] = useState(" ");
  const [reward, setRewardId] = useState(" ");
  const [show, setShow] = useState(false);

  useEffect(() => {
    dispatch(getGoogleFbAd()); 
  }, [dispatch]);

  useEffect(() => {
    setBannerId(ad?.banner);
    setNativeId(ad?.native);
    setInterstitialId(ad?.interstitial);
    setAppOpenAd(ad?.appOpenAd);
    setRewardId(ad?.reward);
    setMongoID(ad?._id);
    setShow(ad?.show);
  }, [ad]);

  const handleShowChange = () => {
    
    props.showToggle(mongoID);
    setShow(!show);
  };
  return (
    <Fragment>
      <Grid container>
        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
          <Typography
            class="text-primary"
            variant="h6"
            style={{ marginBottom: 20, fontSize: 16 }}
          >
            Google Ad Revenue
            <IOSSwitch
              onChange={handleShowChange}
              checked={show}
              color="secondary"
            />
          </Typography>
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>

      <Grid item xs={12} style={{opacity:`${show===true? "1" :"0.5"}`}}>
        <AddField
          title="Interstitial ID"
          name="interstitial"
          mongoID={mongoID}
          disableData={show}
          value={interstitial}
          onChange={setInterstitialId}
        />
        <AddField
          title="Banner ID"
          name="banner"
          mongoID={mongoID}
          value={bannerId}
          disableData={show}
          onChange={setBannerId}
        />

        <AddField
          title="Native Id"
          name="native"
          mongoID={mongoID}
          value={nativeId}
          disableData={show}
          onChange={setNativeId}
        />
        <AddField
          title="Reward Id"
          name="reward"
          mongoID={mongoID}
          value={reward}
          disableData={show}
          onChange={setRewardId}
        />
        <AddField
          title="App Open Id"
          name="appOpenAd"
          mongoID={mongoID}
          value={appOpenAd}
          disableData={show}
          onChange={setAppOpenAd}
        />
      </Grid>
    </Fragment>
  );
};

export default connect(null, {
  getGoogleFbAd,
  showToggle,
  setPriority,
})(GoogleAd);
