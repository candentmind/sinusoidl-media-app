import React from "react";
import { FaPlay, FaAngleLeft, FaAngleRight, FaPause } from "react-icons/fa";

const Player = () => {
  return (
    <div className="player">
      <div className="time-control">
        <p>start-time</p>
        <input type="range" />
        <p>end-time</p>
      </div>
      <div className="play-control">
        <FaAngleLeft size="2em"/>
        <FaPlay size="2em"/>
        <FaAngleRight size="2em"/>
      </div>
    </div>
  );
};

export default Player;
