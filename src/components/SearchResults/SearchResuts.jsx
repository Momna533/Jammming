import { useGlobalContext } from "../../context/Context";

const SearchResuts = () => {
  const { searchResults, addToPlaylist } = useGlobalContext();
  return (
    <div className="search__results">
      <h1>SearchResuts</h1>
      <div className="tracklist">
        {searchResults.map((searchResult) => {
          const { id, name, album, artist } = searchResult;
          return (
            <div className="track" key={id}>
              <p>
                {name} by {artist} from {album}
              </p>
              <button className="add__btn" onClick={() => addToPlaylist(id)}>
                +
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SearchResuts;
