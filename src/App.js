import { v4 as uuidv4 } from "uuid";
import React, { useState, useEffect } from "react";
import Player from "./components/Player";
import Song from "./components/Song";
// import MusicData from "./data"; //ThIS DATA REQUIRES NETWORK ACCESS
import "./styles/app.scss";

// console.log(MusicData);

const App = () => {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setisPlaying] = useState(true);

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
        console.log(resObj);
      });
  }, []);

  console.log(currentSong);

  return (
    <div>
      <Song currentSong={currentSong} />
      <Player isPlaying={isPlaying} setisPlaying={setisPlaying} />
    </div>
  );
};

export default App;
