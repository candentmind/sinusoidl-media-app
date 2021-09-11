import React, { useRef } from "react";
import { FaPlay, FaAngleLeft, FaAngleRight, FaPause } from "react-icons/fa";

const Player = (props) => {
  let playerRef = useRef(null);
  const audioElement = props.audioRef.current;

  return (
    <div className="player">
      {console.log("component call in player")}
      <div className="time-control">
        {console.info(props.audioRef.current)}
        <p>{props.audioIsLoaded && props.audioRef.current.currentTime}</p>
        <input type="range" ref={playerRef} />
        <p>{props.audioIsLoaded && props.audioRef.current.duration}</p>
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
              props.onChangeSong({direction: "SET_AT_POSITION", index: props.currentSongIndex});
              props.playMediaFile(audioElement);
            }}
          />
        )}
        <FaAngleRight
          size="2em"
          onClick={() => {
            // console.log("ANGLE RIGHTT: ");
            // console.log(props.audioRef.current);
            // console.log("BEFORE FORWARD currentSongIndex: " + props.currentSongIndex);
            props.onChangeSong({ direction: "FORWARD" });
            // console.log("AFTER FORWARD currentSongIndex: " + props.currentSongIndex);
            // props.onChangeSong({direction: "SET_AT_POSITION", index: props.currentSongIndex});
            // console.log("AFTER SET_AT_POSITION currentSongIndex: " + props.currentSongIndex);
            // props.audioRef.current.play();
            // console.log(props.audioRef.current);
            // console.log(props.audioInfo.audioRefPointer.current);
          }}
        />
      </div>
    </div>
  );
};

export default Player;
