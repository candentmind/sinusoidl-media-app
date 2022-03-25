// import LibrarySong from "./LibrarySong";
import Song from "./Song";

const Library = ({
  libraryIsVisible,
  songs,
  isPlaying,
  currentSongIndex,
  onChangeSong,
  setLibraryVisibility,
}) => {
  return (
    <div className={`library ${libraryIsVisible ? "active-library" : ""}`}>
      <div className="library-songs">
        {songs.map((song, index) => (
          <Song
            song={song}
            key={song.id}
            isPlaying={isPlaying}
            // audioRef={props.audioRef}
            className={`song-container song-container--horizontal row ${
              index === currentSongIndex ? "selected" : ""
            }`}
            currentSong={song}
            onSelectSong={() => {
              onChangeSong({ direction: "SET_AT_POSITION", index });
              if (libraryIsVisible) setLibraryVisibility();
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Library;
