import React, { useRef } from "react";
import { FaPlay, FaAngleLeft, FaAngleRight, FaPause } from "react-icons/fa";
import secondsToTime from "../utils/secondstotime";

const Player = (props) => {
  let sliderRef = useRef(null);
  const audioElement = props.audioRef.current;

  const dragHandler = (e) => {
    audioElement.currentTime = e.target.value;
    props.dispatch({
      type: "SET_AUDIO_INFO",
      payload: {
        // isLoaded: true,
        currentTime: audioElement.currentTime,
        duration: audioElement.duration,
      },
    });
  };

  return (
    <div className="player">
      {/* {console.log("component call in player")} */}
      <div className="time-control">
        {/* {console.info(props.audioRef.current)} */}
        <p>
          {props.audioFileLoaded() &&
            secondsToTime(props.audioInfo.currentTime)}
        </p>
        <input
          type="range"
          ref={sliderRef}
          min="0"
          max={props.audioInfo.duration}
          value={props.audioInfo.currentTime}
          onChange={dragHandler}
        />
        <p>
          {props.audioFileLoaded() && secondsToTime(props.audioInfo.duration)}
        </p>
      </div>
      <div className="play-control">
        <FaAngleLeft
          size="2em"
          onClick={() => {
            // console.log("ANGLE LEFT: ");
            // console.log(props.audioRef.current);
            props.onChangeSong({ direction: "BACKWARD" });
            // props.audioRef.current.play();
          }}
        />
        {props.isPlaying ? (
          <FaPause
            size="2em"
            onClick={() => {
              props.onTogglePlay();
              //props.onChangeSong({direction: "SET_IN_PLACE", index: props.currentSongIndex})
              audioElement.pause();
            }}
          />
        ) : (
          <FaPlay
            size="2em"
            onClick={() => {
              props.onTogglePlay();
              props.onChangeSong({
                direction: "SET_AT_POSITION",
                index: props.currentSongIndex,
              });
              props.playMediaFile(audioElement);
            }}
          />
        )}
        <FaAngleRight
          size="2em"
          onClick={() => {
            props.onChangeSong({ direction: "FORWARD" });
          }}
        />
      </div>
    </div>
  );
};

export default Player;
