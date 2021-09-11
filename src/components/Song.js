import React from "react";

const Song = (props) => {
  return (
    <div className={props.className} onClick={props.onSelectSong}>
      {!props.currentSong && <p>Loading...</p>}
      {props.currentSong && (
        <>
          <img
            src={props.currentSong.cover.src}
            alt={props.currentSong.cover.alt}
          ></img>
          <h2>{props.currentSong.name}</h2>
          <h2>{props.currentSong.artist}</h2>
        </>
      )}
    </div>
  );
};

export default Song;
