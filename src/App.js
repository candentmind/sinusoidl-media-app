import { v4 as uuidv4 } from "uuid";
import React, { useReducer, useState, useEffect, useRef } from "react";
import Player from "./components/Player";
import Song from "./components/Song";
import reducer from "./components/Reducer";
import Nav from "./components/Nav";
// import MusicData from "./data"; //ThIS DATA REQUIRES NETWORK ACCESS
import "./styles/app.scss";

const initialState = {
  songs: [],
  currentSongIndex: 0,
  isPlaying: false,
  libraryIsVisible: false,
  audioInfo: {
    currentTime: 0,
    duration: 0,
  },
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { songs, currentSongIndex, isPlaying } = state;

  const audioRef = useRef("null");

  console.log("component call");

  useEffect(() => {
    console.log("use effect call");
    fetch("./assets/local-data.json")
      .then((res) => res.json())
      .then((resObj) => {
        resObj = resObj.map((item) =>
          item.active === "true"
            ? { ...item, active: true, id: uuidv4() }
            : { ...item, active: false, id: uuidv4() }
        );
        dispatch({ type: "SET_SONGS", payload: resObj });
      });
  }, []);

  console.log(currentSongIndex);

  function changeSong({ direction = "SET_AT_POSITION", index }) {
    console.log(`Direction: ${direction}, Payload: ${index}`);
    if (direction === "FORWARD")
      dispatch({ type: "SONG_CHANGE", direction: "FORWARD" });
    else if (direction === "BACKWARD")
      dispatch({ type: "SONG_CHANGE", direction: "BACKWARD" });
    else dispatch({ type: "SONG_CHANGE", direction, payload: index });
  }

  return (
    <div>
      {songs.length !== 0 && (
        <audio src={songs[currentSongIndex].audio} ref={audioRef} />
      )}
      {console.log(audioRef)}
      <Nav />
      <hr></hr>
      <Song currentSong={songs[currentSongIndex]} />
      {songs.length !== 0 && (
        <Player
          onChangeSong={changeSong}
          onTogglePlay={() => dispatch({ type: "TOGGLE_PLAY" })}
          isPlaying={isPlaying}
          audioRef={audioRef}
        />
      )}
      
      {console.log(songs)}
    </div>
  );
};

export default App;
