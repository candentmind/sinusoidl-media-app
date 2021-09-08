import React, { useRef } from "react";
import { FaPlay, FaAngleLeft, FaAngleRight, FaPause } from "react-icons/fa";

const Player = (props) => {
  let playerRef = useRef(null);

  return (
    <div className="player">
      <div className="time-control">
        <p>{props.audioRef.current.currentTime}</p>
        <input type="range" ref={playerRef} />
        <p>{props.audioRef.current.duration}</p>
      </div>
      <div className="play-control">
        <FaAngleLeft
          size="2em"
          onClick={() => props.onChangeSong({ direction: "BACKWARD" })}
        />
        {props.isPlaying ? (
          <FaPause
            size="2em"
            onClick={() => {
              props.onTogglePlay();
              props.audioRef.current.pause();
            }}
          />
        ) : (
          <FaPlay
            size="2em"
            onClick={() => {
              console.log(props.audioRef.current);
              props.onTogglePlay();
              props.audioRef.current.play();
            }}
          />
        )}
        <FaAngleRight
          size="2em"
          onClick={() => props.onChangeSong({ direction: "FORWARD" })}
        />
      </div>
    </div>
  );
};

export default Player;
