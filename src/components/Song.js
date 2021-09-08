import React from "react";

const Song = (props) => {
  return (
    <div className="song-container">
      {!props.currentSong && <p>Loading...</p>}
      {props.currentSong && (
        <>
        {console.log(props.currentSong.cover.src)}
          <img
            src={props.currentSong.cover.src}
            alt={props.currentSong.cover.alt}
          ></img>
          <h2>{props.currentSong.name}</h2>
          <h2>{props.currentSong.artist}</h2>
        </>
      )}

      {/* <audio src="./59 years after.mp3"></audio> */}
    </div>
  );
};

export default Song;
