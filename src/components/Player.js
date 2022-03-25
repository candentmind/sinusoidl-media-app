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
        currentTime: audioElement.currentTime,
        duration: audioElement.duration,
      },
    });
  };

  return (
    <div className="player">
      <div className="time-control">
        <p>
          {props.audioInfo.duration
            ? secondsToTime(props.audioInfo.currentTime)
            : "00:00"}
        </p>
        <div className="track">
          <input
            type="range"
            ref={sliderRef}
            min="0"
            max={props.audioInfo.duration || 0}
            value={props.audioInfo.currentTime}
            onChange={dragHandler}
          />
          <div className="animate-track" style={{}}></div>
        </div>
        <p>
          {props.audioInfo.duration
            ? secondsToTime(props.audioInfo.duration)
            : "00:00"}
        </p>
      </div>
      <div className="play-control">
        <FaAngleLeft
          size="2em"
          onClick={() => {
            props.onChangeSong({ direction: "BACKWARD" });
          }}
        />
        {props.isPlaying ? (
          <FaPause
            size="2em"
            onClick={() => {
              props.onTogglePlay();
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
