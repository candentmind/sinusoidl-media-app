import { v4 as uuidv4 } from "uuid";
import React, { useReducer, useState, useEffect, useRef } from "react";
import Player from "./components/Player";
import Song from "./components/Song";
import reducer from "./components/Reducer";
import Nav from "./components/Nav";
import Library from "./components/Library";
import secondsToTime from "./utils/secondstotime";
// import LibrarySong from "./components/LibrarySong";

// import MusicData from "./data"; //ThIS DATA REQUIRES NETWORK ACCESS
import "./styles/app.scss";

function playMediaFile(elem) {
  elem.play().then(() => elem.play());
}

const initialState = {
  songs: [],
  currentSongIndex: 0,
  isPlaying: false,
  libraryIsVisible: false,
  audioInfo: {
    currentTime: 0,
    duration: 0,
    // isLoaded: false,
  },
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { songs, currentSongIndex, isPlaying, audioInfo, libraryIsVisible } =
    state;

  const audioRef = useRef("null");
  const audioFileLoaded = () => audioInfo.duration > 0;

  // console.log("component call");
  // console.info("audio file is loaded: ", audioFileLoaded);

  useEffect(() => {
    // console.log("use effect call");
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

  // useEffect(() => {
  //   console.log(audioFileLoaded);
  //   console.log(
  //     "%c SECOND useEffect, audio file metadata is loaded",
  //     "color: lime"
  //   );
  //   console.log(audioRef.current);
  // }, [audioFileLoaded]);

  function changeSong({ direction = "SET_AT_POSITION", index }) {
    if (direction === "FORWARD") {
      dispatch({ type: "SONG_CHANGE", direction: "FORWARD" });
    } else if (direction === "BACKWARD") {
      dispatch({ type: "SONG_CHANGE", direction: "BACKWARD" });
    } else {
      dispatch({ type: "SONG_CHANGE", direction, payload: index });
    }

    // console.info("%c CURRENT AUDIO FILE: ", "color: lime")
    // console.info(audioRef.current);
  }

  let currentSong = songs[currentSongIndex];
  // console.info("CURRENT SONG IS: ");
  // console.info(currentSong);
  // console.info("CURRENT AUDIO IS: ");
  // console.info(audioRef.current);

  return (
    <div>
      {songs.length !== 0 && (
        <audio
          src={currentSong.audio}
          ref={audioRef}
          onLoadedMetadata={() => {
            // audioFileLoaded = true;
            dispatch({
              type: "SET_AUDIO_INFO",
              payload: {
                // isLoaded: true,
                currentTime: audioRef.current.currentTime,
                duration: audioRef.current.duration,
              },
            });
            if (isPlaying) audioRef.current.play();

            // console.info("audio file is loaded: ", audioFileLoaded);
          }}
          onTimeUpdate={() => {
            dispatch({
              type: "SET_AUDIO_INFO",
              payload: {
                // isLoaded: true,
                currentTime: audioRef.current.currentTime,
                duration: audioRef.current.duration,
              },
            });
          }}
        />
      )}
      <Nav
        onToggleLibraryVisibility={() =>
          dispatch({ type: "TOGGLE_SHOW_LIBRARY" })
        }
      />
      <hr></hr>
      <Library
        songs={songs}
        libraryIsVisible={libraryIsVisible}
        currentSongIndex={currentSongIndex}
        currentSong={currentSong}
        onChangeSong={changeSong}
        playMediaFile={playMediaFile}
      />
      <div style={{ position: "relative", top: "10vh" }}>
        <Song currentSong={currentSong} className={`song-container`} />
        {songs.length !== 0 && (
          <Player
            onChangeSong={changeSong}
            onTogglePlay={() => dispatch({ type: "TOGGLE_PLAY" })}
            isPlaying={isPlaying}
            audioRef={audioRef}
            currentSong={currentSong}
            currentSongIndex={currentSongIndex}
            audioInfo={audioInfo}
            audioFileLoaded={audioFileLoaded}
            playMediaFile={playMediaFile}
            dispatch={dispatch}
          />
        )}
      </div>
    </div>
  );
};

export default App;
