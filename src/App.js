import React, { useState } from "react";
import Player from "./components/Player";
import Song from "./components/Song";
import "./styles/app.scss";

const App = (props) => {
  return (
    <div>
      <Song />
      <Player />
    </div>
  );
};

export default App;
