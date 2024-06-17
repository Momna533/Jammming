import { useGlobalContext } from "../../context/Context";

const Playlist = () => {
  const { playlist, removeFromPlaylist, saveToSpotify } = useGlobalContext();
  return (
    <div className="playlist">
      <h1>playlist</h1>
      <input type="text" className="playlist__input" />
      <div className="tracklist">
        {playlist.map((playlistEntry) => {
          const { id, name, artist, album } = playlistEntry;
          return (
            <div className="track" key={id}>
              <p>
                {name} by {artist} from {album}
              </p>
              <button
                className="remove__btn"
                onClick={() => removeFromPlaylist(id)}
              >
                -
              </button>
            </div>
          );
        })}
      </div>
      <button className="save__btn" onClick={saveToSpotify}>
        add to spotify
      </button>
    </div>
  );
};

export default Playlist;
