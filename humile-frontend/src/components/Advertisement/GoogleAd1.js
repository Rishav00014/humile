import React, { useState, useEffect, Fragment } from "react";

// Redux
import { useSelector, connect } from "react-redux";

import { getGoogleFbAd, showToggle } from "../../store/googleFbAd/action";

// MUI
import { Grid, Typography } from "@material-ui/core";

// Components
import AddField from "./AddField";
import IOSSwitch from "@material-ui/core/Switch";

import { useDispatch } from "react-redux";

const GoogleAd = (props) => {
  const ad = useSelector((state) => state.googleFbAd.googleFb.google1);
  
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
    setMongoID(ad?._id);
    setShow(ad?.show);
    setRewardId(ad?.reward);
    setAppOpenAd(ad?.appOpenAd);
  }, [ad]);

  const handleShowChange = () => {
    
    props.showToggle(mongoID);
    setShow(!show);
  };

  return (
    <Fragment>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <Typography
          variant="h6"
          style={{ marginBottom: 20, fontSize: 16 }}
          class="text-primary"
        >
          Google Ad 1 Revenue
          <IOSSwitch
            onChange={handleShowChange}
            checked={show}
            color="secondary"
          />
        </Typography>
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
          disableData={show}
          value={bannerId}
          onChange={setBannerId}
        />

        <AddField
          title="Native Id"
          name="native"
          mongoID={mongoID}
          disableData={show}
          value={nativeId}
          onChange={setNativeId}
        />
        <AddField
          title="Reward Id"
          name="reward"
          mongoID={mongoID}
          disableData={show}
          value={reward}
          onChange={setRewardId}
        />
        <AddField
          title="App Open Id"
          name="appOpenAd"
          mongoID={mongoID}
          disableData={show}
          value={appOpenAd}
          onChange={setAppOpenAd}
        />
      </Grid>
    </Fragment>
  );
};

export default connect(null, {
  getGoogleFbAd,
  showToggle,
})(GoogleAd);
