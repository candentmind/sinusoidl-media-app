const LibrarySong = (props) => {
  // const selectSongHandler = async () => {
  //   await setCurrentSong(song);
  //   const newSongs = songs.map((songData) => {
  //     if (songData.id === song.id) {
  //       return {
  //         ...songData,
  //         active: true,
  //       };
  //     } else {
  //       return {
  //         ...songData,
  //         active: false,
  //       };
  //     }
  //   });
  //   setSongs(newSongs);
  //   if (isPlaying) audioRef.current.play();
  // };



  return (
    <div
      // className={`library-song ${props.currentSong.active ? "selected" : ""}`}
      className={`song-container ${props.className}`}
      // onClick={selectSongHandler}
      onClick={props.changeSongHandler}
    >
      <img alt={props.currentSong.name} src={props.currentSong.cover} />
      <div className="song-description">
        <h3>{props.currentSong.name}</h3>
        <h4>{props.currentSong.artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
