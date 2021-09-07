import React from "react";
import { FaPlay, FaAngleLeft, FaAngleRight, FaPause } from "react-icons/fa";

const Player = (props) => {
  return (
    <div className="player">
      <div className="time-control">
        <p>start-time</p>
        <input type="range" />
        <p>end-time</p>
      </div>
      <div className="play-control">
        <FaAngleLeft
          size="2em"
          onClick={() => props.onChangeSong({direction: "BACKWARD"})}
        />
        {props.isPlaying ? (
          <FaPause size="2em" onClick={props.onTogglePlay} />
        ) : (
          <FaPlay size="2em" onClick={props.onTogglePlay} />
        )}
        <FaAngleRight
          size="2em"
          onClick={() => props.onChangeSong({direction: "FORWARD"})}
        />
      </div>
    </div>
  );
};

export default Player;
