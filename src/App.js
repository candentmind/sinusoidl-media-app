import { v4 as uuidv4 } from "uuid";
import React, { useReducer, useState, useEffect } from "react";
import Player from "./components/Player";
import Song from "./components/Song";
import reducer from "./components/Reducer";
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

  function changeSong({direction = "SET", payload}) {
    console.log(`Direction: ${direction}, Payload: ${payload}`);
    if (direction === "FORWARD")
      dispatch({ type: "SONG_CHANGE", direction: "FORWARD" });
    else if (direction === "BACKWARD")
      dispatch({ type: "SONG_CHANGE", direction: "BACKWARD" });
    else dispatch({ type: "SONG_CHANGE", payload });
  }

  return (
    <div>
      <h1>Waves Media App</h1><hr></hr>
      <Song currentSong={songs[currentSongIndex]} />
      <Player
        onChangeSong={changeSong}
        onTogglePlay={() => dispatch({ type: "TOGGLE_PLAY" })}
        isPlaying={isPlaying}
      />
    </div>
  );
};

export default App;
