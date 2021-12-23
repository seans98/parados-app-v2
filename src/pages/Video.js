import React, { useState, useRef } from "react";
import ReactPlayer from "react-player";
import { Grid } from "@mui/material";
import { Button } from "@mui/material";
import screenfull from "screenfull";
import { findDOMNode } from "react-dom";
import { useHistory } from "react-router-dom";

const Video = (props) => {
  const player = useRef();
  const [play, setPlay] = useState(false);
  const history = useHistory();
  const handlePause = () => {
    setPlay((play) => !play);
  };

  const onPlay = () => {
    setPlay(true);
  };
  const onPause = () => {
    setPlay(false);
  };

  const enableNextVideo = () => {
    props.setvideoWatched(true);
  };

  const handleFullScreen = () => {
    screenfull.request(findDOMNode(player.current));
  };

  return (
    <>
      <h1>Exercise #{props.number}</h1>
      <h2>
        Please watch the video/listen to the audio and complete the exercise as
        instructed
      </h2>
      <Grid
        container
        direction="row"
        justifyContent="space-around"
        alignItems="center"
      >
        <Button
          sx={{ mb: 3, mt: 3 }}
          variant="contained"
          onClick={() => {
            history.push(props.backButtonContent);
          }}
        >
          {props.backButton}
        </Button>

        <ReactPlayer
          ref={player}
          url={props.videoURL}
          playing={play}
          onPause={onPause}
          onPlay={onPlay}
          onEnded={enableNextVideo}
          controls
        />

        <Button
          sx={{ mt: 3, mb: 3 }}
          variant="contained"
          disabled={!props.videoWatched}
          onClick={() => {
            history.push(props.nextButtonContent);
          }}
        >
          {props.nextButton}
        </Button>
      </Grid>
      <Button
        sx={{ mt: 3, mb: 3 }}
        variant="contained"
        color="secondary"
        onClick={handlePause}
      >
        {play ? "Pause" : "Play"}
      </Button>
      <Button
        sx={{ mt: 3, mb: 3, ml: 3 }}
        variant="contained"
        color="secondary"
        onClick={handleFullScreen}
      >
        Fullscreen
      </Button>
    </>
  );
};
export default Video;
