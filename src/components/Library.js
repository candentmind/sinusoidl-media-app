// import LibrarySong from "./LibrarySong";
import Song from "./Song";

const Library = (props) => {
  return (
    <div
      className={`library ${props.libraryIsVisible ? "active-library" : ""}`}
    >
      <div className="library-songs">
        {props.songs.map((song, index) => (
          <Song
            song={song}
            key={song.id}
            isPlaying={props.isPlaying}
            audioRef={props.audioRef}
            className={`song-container song-container--horizontal row ${
              index === props.currentSongIndex ? "selected" : ""
            }`}
            currentSong={song}
            onSelectSong={() => {
              props.onChangeSong({direction: "SET_AT_POSITION", index});
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Library;
