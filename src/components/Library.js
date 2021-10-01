// import LibrarySong from "./LibrarySong";
import Song from "./Song";

const Library = ({isLibraryVisible, songs, isPlaying, currentSongIndex, onChangeSong}) => {
  return (
    <div
      className={`library ${isLibraryVisible ? "active-library" : ""}`}
    >
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
              onChangeSong({direction: "SET_AT_POSITION", index});
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Library;
