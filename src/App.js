import { v4 as uuidv4 } from "uuid";
import React, { useReducer, useState, useEffect, useRef } from "react";
import Player from "./components/Player";
import Song from "./components/Song";
import reducer from "./components/Reducer";
import Nav from "./components/Nav";
import Library from "./components/Library";
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
  },
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { songs, currentSongIndex, isPlaying, audioInfo, libraryIsVisible } =
    state;

  const audioRef = useRef("null");
  const audioFileLoaded = () => audioInfo.duration > 0;

  let currentSong = songs[currentSongIndex];

  useEffect(() => {
    fetch("./assets/local-data.json")
      .then((res) => res.json())
      .then((data) => {
        data = data.map((item) =>
          item.active === "true"
            ? { ...item, active: true, id: uuidv4() }
            : { ...item, active: false, id: uuidv4() }
        );
        dispatch({ type: "SET_SONGS", payload: data });
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
      dispatch({ type: "SELECT_SONG", direction: "FORWARD" });
    } else if (direction === "BACKWARD") {
      dispatch({ type: "SELECT_SONG", direction: "BACKWARD" });
    } else {
      dispatch({ type: "SELECT_SONG", direction, payload: index });
    }
  }

  return (
    <div>
      {songs.length !== 0 && (
        <audio
          src={currentSong.audio}
          ref={audioRef}
          onLoadedMetadata={(e) => {
            // audioFileLoaded = true;
            dispatch({
              type: "SET_AUDIO_INFO",
              payload: {
                // isLoaded: true,
                currentTime: audioRef.current.currentTime,
                // duration: audioRef.current.duration,
                duration: e.target.duration,
              },
            });
            if (isPlaying) audioRef.current.play();
          }}
          onTimeUpdate={() => {
            dispatch({
              type: "SET_AUDIO_INFO",
              payload: {
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
      />
      <div className="player-panel" style={{ position: "relative", top: "4.5rem" }}>
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
      <div className="footer fixed-bottom">..Built with love with React..</div>
    </div>
  );
};

export default App;
