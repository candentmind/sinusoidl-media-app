const reducer = (state, action) => {
  switch (action.type) {
    case "SET_SONGS":
      return {
        ...state,
        songs: action.payload,
        currentSongIndex: 0,
      };

    case "TOGGLE_PLAY":
      return {
        ...state,
        isPlaying: !state.isPlaying,
      };

    case "TOGGLE_LIBRARY_VISIBILITY":
      return {
        ...state,
        libraryIsVisible: !state.libraryIsVisible,
      };

    case "SELECT_SONG":
      let currentSongIndex;
      if (action.direction === "FORWARD")
        currentSongIndex = (state.currentSongIndex + 1) % state.songs.length;
      else if (action.direction === "BACKWARD") {
        currentSongIndex =
          state.currentSongIndex === 0
            ? state.songs.length - 1
            : state.currentSongIndex - 1;
      } else if (action.direction === "SET_AT_POSITION") {
        currentSongIndex = action.payload;
      }
      return {
        ...state,
        currentSongIndex,
      };

    case "SET_AUDIO_INFO":
      return {
        ...state,
        audioInfo: {
          ...state.audioInfo,
          currentTime: action.payload.currentTime,
          duration: action.payload.duration,
        },
      };

    default:
      return state;
  }
};

export default reducer;
