const reducer = (state, action) => {
  switch (action.type) {
    case "SET_SONGS":
      return {
        ...state,
        songs: action.payload,
        currentSongIndex: 0,
      };

    case "SET_SONG":
      return {
        ...state,
        currentSongIndex: action.payload,
      };

    case "TOGGLE_SHOW_LIBRARY":
      return {
        ...state,
        libraryIsVisible: !state.libraryIsVisible,
      };

    case "TOGGLE_PLAY":
      return {
        ...state,
        isPlaying: !state.isPlaying,
      };

    case "SONG_CHANGE":
      let currentSongIndex;
      if (action.direction === "FORWARD")
        currentSongIndex = (state.currentSongIndex + 1) % state.songs.length;
      else if (action.direction === "BACKWARD") {
        currentSongIndex =
          state.currentSongIndex === 0
            ? state.songs.length - 1
            : state.currentSongIndex - 1;
      } else if(action.direction === "SET_AT_POSITION") {
        currentSongIndex = action.payload;
      }
      return {
        ...state,
        currentSongIndex,
      };

    default:
      return state;
  }
};

export default reducer;
