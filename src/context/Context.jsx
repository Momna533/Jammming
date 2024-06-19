import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import Spotify from "../components/SpotifyData";

const data = [
  {
    name: "a",
    artist: "aa",
    album: "aaa",
    id: 1,
  },
  {
    name: "b",
    artist: "bb",
    album: "bbb",
    id: 2,
  },
  {
    name: "c",
    artist: "cc",
    album: "ccc",
    id: 3,
  },
  {
    name: "d",
    artist: "dd",
    album: "ddd",
    id: 4,
  },
];
const AppContext = createContext();
const AppProvider = ({ children }) => {
  const [searchInput, setSearchInput] = useState("standing next to you...");
  const [searchResults, setSearchResults] = useState(data);
  const [playlist, setPlaylist] = useState([]);
  const [playlistTitle, setPlaylistTitle] = useState("title");

  useEffect(() => {
    const token = Spotify.getAccessToken();
    console.log("Spotify Access Token:", token);
  }, []);
  const addToPlaylist = (id) => {
    const tempPlaylist = searchResults.find(
      (searchResult) => searchResult.id === id
    );
    if (playlist.some((playlistEntry) => playlistEntry.id === id)) {
      console.log(`Track with ID ${id} is already in the playlist.`);
      return;
    }
    setPlaylist([...playlist, tempPlaylist]);
  };
  const removeFromPlaylist = (id) => {
    const tempPlaylist = playlist.filter(
      (playlistEntry) => playlistEntry.id !== id
    );
    setPlaylist(tempPlaylist);
  };
  const saveToSpotify = () => {
    console.log("saved to spotify");
  };
  // const searchSpotify = (term) => {
  //   Spotify.searchTracks(term).then((tracks) => {
  //     setSearchResults(tracks);
  //   });
  // };
  return (
    <AppContext.Provider
      value={{
        searchResults,
        playlist,
        addToPlaylist,
        removeFromPlaylist,
        saveToSpotify,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
