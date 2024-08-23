/* eslint-disable   no-unused-vars */
import React, { useState, useEffect } from "react";

//react-redux
import { useSelector, connect } from "react-redux";

//action
import {
  currentWeekAnalytic,
  lastWeekAnalytic,
  editCoin,
  createHostHistory,
} from "../../store/host/action";

//topNav
import TopNav from "../Navbar/Topnav";

//pagination

//slider
import { Carousel, CarouselItem, CarouselControl } from "reactstrap";
import EdiText from "react-editext";

const HostAnalytic = (props) => {
  const { dialogData: hostData } = useSelector((state) => state.host);

  const id = props.match.params.id;

  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [mongoId, setMongoId] = useState(" ");
  const [name, setName] = useState(" ");
  const [hostId, setHostId] = useState(" ");
  const [password, setPassword] = useState(" ");
  const [userName, setUserName] = useState(" ");
  const [bio, setBio] = useState(" ");
  const [age, setAge] = useState(" ");
  const [imagePath, setImagePath] = useState([]);
  const [video, setVideo] = useState(" ");
  const [coin, setCoin] = useState(" ");
  const [like, setLike] = useState(" ");
  const [language, setLanguage] = useState(" ");
  const [newCoin, setNewCoin] = useState();
  const [isCoin, setIsCoin] = useState(false);

  useEffect(() => {
    setMongoId(hostData._id);
    setName(hostData.name);
    setHostId(hostData.host_id);
    setUserName(hostData.username);
    setPassword(hostData.password);
    setBio(hostData.bio);
    setAge(hostData.age);
    setCoin(hostData.coin);
    setLike(hostData.like);
    setLanguage(hostData.language ? hostData.language.language : "Deleted");
    imagePath.push(hostData.image);

    setVideo(hostData.video); 
  }, [hostData]);

  const adNext = () => {
    if (animating) return;
    const nextIndex =
      // activeIndex === imagePath.length - 1 ? 0 : activeIndex + 1;
      activeIndex === hostData.image.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };
  const adPrev = () => {
    if (animating) return;
    const nextIndex =
      // activeIndex === 0 ? imagePath.length - 1 : activeIndex - 1;
      activeIndex === 0 ? hostData.image.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const posterData = hostData.image.map((poster, index) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={index}
      >
        {/* <a href={poster.url}> */}
        <img
          class="img-rounded img mx-auto d-block"
          src={poster}
          alt=""
          style={{
            height: "12rem",
            width: "12rem",
          }}
        />
        {/* </a> */}
      </CarouselItem>
    );
  });

  const handleSave = (coin, id, oldCoin) => {
    let newAddCoin = 0;
    setIsCoin(true);

    newAddCoin = coin - oldCoin;

    props.editCoin({ coin }, id);
    props.currentWeekAnalytic(id);
    const data = {
      user_id: "111111111111111111111111",
      host_id: id,
      time: 111,
      coin: newAddCoin,
    };

    props.createHostHistory(data);
    setCoin(coin);
  };

  return (
    <>
      <TopNav />

      <div class="content">
        <div class="row">
          <div class="col-md-5">
            <div class="card card-user">
              <div class="card-header text-center mt-2">
                <h4 class="title">Host Profile</h4>
              </div>
              <div class="card-body">
                <Carousel
                  activeIndex={activeIndex}
                  next={adNext}
                  previous={adPrev}
                >
                  {posterData}
                  <CarouselControl
                    class="carousel-control-prev"
                    direction="prev"
                    directionText="Previous"
                    onClickHandler={adPrev}
                  />
                  <CarouselControl
                    class="carousel-control-next"
                    direction="next"
                    directionText="Next"
                    onClickHandler={adNext}
                  />
                </Carousel>
              </div>
            </div>
          </div>
          <div class="col-md-7 text-center">
            <div class="card">
              <div class="card-header text-center mt-2">
                <h4 class="title">Host Video</h4>
              </div>
              <div class="card-body" style={{ minHeight: 240 }}>
                <video
                  src={video}
                  alt="video"
                  controls={true}
                  style={{
                    objectFit: "cover",
                    height: "12rem",
                    width: "12rem",
                    borderRadius: 5,
                  }}
                ></video>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8">
            <div class="card card-user">
              <div class="card-header text-center">
                <h4 class="title">About Host</h4>
              </div>
              <div class="container mt-1">
                <p class="p-1">
                  <b class="text-primary pr-2">Host Name :</b> {name}
                </p>

                <p class="p-1">
                  <b class="text-primary pr-2">Bio :</b> {bio}
                </p>
                <p class="p-1">
                  <b class="text-primary pr-2">Age :</b> {age}
                </p>
                <p class="p-1">
                  <b class="text-primary pr-2">language :</b> {language}
                </p>
                <p class="p-1">
                  <span className="d-flex">
                    <b class="text-primary pr-2 pt-2">Coin :</b>
                    <EdiText
                      type="text"
                      value={isCoin ? newCoin : coin}
                      onSave={(val) => handleSave(val, mongoId, coin)}
                      // editButtonClassName="editClass"
                      className="editClass"
                    />
                  </span>
                </p>
                <p class="pl-1">
                  <b class="text-primary pr-2">Likes :</b> {like}
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-2"></div>
        </div>
      </div>
    </>
  );
};

export default connect(null, {
  currentWeekAnalytic,
  lastWeekAnalytic,
  editCoin,
  createHostHistory,
})(HostAnalytic);
