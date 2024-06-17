import Playlist from "./components/Playlist/Playlist";
import Searchbar from "./components/SearchBar/Searchbar";
import SearchResults from "./components/SearchResults/SearchResuts";

const App = () => {
  return (
    <div className="app">
      <Searchbar />
      <div className="app__body">
        <SearchResults />
        <Playlist />
      </div>
    </div>
  );
};

export default App;
