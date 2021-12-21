import "./App.css";
import "./pages/PhoneNumber";
import PhoneNumber from "./pages/PhoneNumber";
import { Route, Switch, Redirect } from "react-router";
import Video from "./pages/Video";
import InfoScreen from "./pages/InfoScreen";
import Survey from "./pages/Survey";
import { useState, useEffect } from "react";

function App() {
  const [userInfo, setUserInfo] = useState({
    firstName: "Test",
    lastName: "Run",
    telnumber: "16473687890",
    group: [
      "https://www.youtube.com/watch?v=5R54QoUbbow",
      "https://www.youtube.com/watch?v=2NOsE-VPpkE",
      "https://www.youtube.com/watch?v=6ijg6tpyxXg",
    ],
  });
  const [submitSurvey, setSubmitSurvey] = useState(false);
  const [video1Watched, setvideo1Watched] = useState(false);
  const [video2Watched, setvideo2Watched] = useState(false);
  const [video3Watched, setvideo3Watched] = useState(false);

  const [timestarted, setTimeStarted] = useState();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUserInfo(JSON.parse(user));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(userInfo));
  }, [userInfo]);
  //
  useEffect(() => {
    const vid2 = localStorage.getItem("video2");
    setvideo2Watched(JSON.parse(vid2));
    const vid1 = localStorage.getItem("video1");
    setvideo1Watched(JSON.parse(vid1));

    const vid3 = localStorage.getItem("video3");
    setvideo2Watched(JSON.parse(vid3));
  }, []);

  useEffect(() => {
    localStorage.setItem("video2", JSON.stringify(video2Watched));

    localStorage.setItem("video1", JSON.stringify(video1Watched));
    localStorage.setItem("video3", JSON.stringify(video3Watched));
  }, [video1Watched, video2Watched, video3Watched]);

  //
  useEffect(() => {
    localStorage.setItem("timestarted", JSON.stringify(timestarted));
  }, [timestarted]);

  return (
    <div className="App">
      <Switch>
        <Route path="/" exact>
          <Redirect to="/phone" />
        </Route>
        <Route path="/phone">
          <PhoneNumber setUserInfo={setUserInfo} />
        </Route>
        <Route path="/infoscreen">
          {userInfo.firstName === "Test" ? (
            <h1>You have not been properly authenticated</h1>
          ) : (
            <InfoScreen userInfo={userInfo} setTimeStarted={setTimeStarted} />
          )}
        </Route>
        <Route path="/video1" exact>
          {userInfo.firstName === "Test" ? (
            <h1>You have not been properly authenticated</h1>
          ) : (
            <Video
              number={1}
              backButton="Info Page"
              backButtonContent="/infoscreen"
              nextButtonContent="/video2"
              nextButton="Next Video"
              endText="to the next exercise."
              videoURL={userInfo.group[0]}
              videoWatched={video1Watched}
              setvideoWatched={setvideo1Watched}
            />
          )}
        </Route>
        <Route path="/video2" exact>
          {userInfo.firstName === "Test" ? (
            <h1>You have not been properly authenticated</h1>
          ) : (
            <Video
              number={2}
              backButton="Prev Video"
              backButtonContent="/video1"
              nextButtonContent="/video3"
              nextButton="Next Video"
              endText="to the next exercise."
              videoURL={userInfo.group[1]}
              videoWatched={video2Watched}
              setvideoWatched={setvideo2Watched}
            />
          )}
        </Route>
        <Route path="/video3" exact>
          {userInfo.firstName === "Test" ? (
            <h1>You have not been properly authenticated</h1>
          ) : (
            <Video
              number={3}
              backButton="Prev Video"
              backButtonContent="/video2"
              nextButtonContent="/survey"
              nextButton="Survey"
              endText="to the survey."
              videoURL={userInfo.group[2]}
              videoWatched={video3Watched}
              setvideoWatched={setvideo3Watched}
            />
          )}
        </Route>
        <Route path="/survey">
          {userInfo.firstName === "Test" ? (
            <h1>You have not been properly authenticated</h1>
          ) : (
            <Survey
              timestarted={timestarted}
              submitSurvey={submitSurvey}
              setSubmitSurvey={setSubmitSurvey}
            />
          )}
        </Route>
      </Switch>
    </div>
  );
}

export default App;
