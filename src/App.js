import { v4 as uuidv4 } from "uuid";
import React, { useReducer, useState, useEffect, useRef } from "react";
import Player from "./components/Player";
import Song from "./components/Song";
import reducer from "./components/Reducer";
import Nav from "./components/Nav";
import Library from "./components/Library";
import { FaHeart, FaReact } from "react-icons/fa";

// import LibrarySong from "./components/LibrarySong";

// import MusicData from "./data"; //ThIS DATA REQUIRES NETWORK ACCESS

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
  const { songs, currentSongIndex, isPlaying, audioInfo } = state;

  const [songs2, setSongs2] = useState([]);
  const [isLibraryVisible, setLibraryVisibility] = useState(false);
  const [isPlaying2, setIsPlaying2] = useState(false);
  const [currentSongIndex2, setCurrentSongIndex2] = useState();
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
            dispatch({
              type: "SET_AUDIO_INFO",
              payload: {
                currentTime: audioRef.current.currentTime,
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
      <Nav onToggleLibraryVisibility={() => setLibraryVisibility((v) => !v)} />
      <hr></hr>
      <Library
        songs={songs}
        isLibraryVisible={isLibraryVisible}
        currentSongIndex={currentSongIndex}
        currentSong={currentSong}
        onChangeSong={changeSong}
      />
      <div className="player-panel">
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
      <footer className="footer fixed-bottom">
        <h6>
          ..{"  "}Built with{" "}
          <FaHeart
            size="0.85em"
            style={{
              color: "red",
              margin: "0 0.2em",
              position: "relative",
              top: "-1.2px",
            }}
            className={`animated infinite pulse`}
          />{" "}
          with{" "}
          <FaReact
          className={`App-logo`}
            size="1.5em"
            style={{
              marginLeft: "0.2em",
              position: "relative",
              top: "-1.2px",
            }}
          />{" "}
          ..
        </h6>
      </footer>
    </div>
  );
};

export default App;
