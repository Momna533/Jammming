const clientId = "e8b5ff3b1b83484790b906c2fd6dbb80";
const redirectUri = "http://localhost:5173/";
const scopes = "playlist-modify-public";
const authorizeUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=${encodeURIComponent(
  scopes
)}&redirect_uri=${encodeURIComponent(redirectUri)}`;

const Spotify = {
  getAccessToken() {
    const accessToken = localStorage.getItem("spotify_access_token");
    const expirationTime = localStorage.getItem("spotify_token_expiry_time");

    if (accessToken && Date.now() < expirationTime) {
      return accessToken;
    }

    const urlToken = window.location.href.match(/access_token=([^&]*)/);
    const urlExpiry = window.location.href.match(/expires_in=([^&]*)/);

    if (urlToken && urlExpiry) {
      const token = urlToken[1];
      const expiresIn = Number(urlExpiry[1]);
      const expiryTime = Date.now() + expiresIn * 1000;

      localStorage.setItem("spotify_access_token", token);
      localStorage.setItem("spotify_token_expiry_time", expiryTime);

      window.history.pushState("Access Token", null, "/");

      return token;
    } else {
      window.location.href = authorizeUrl;
    }
  },

  searchTracks(searchTerm) {
    const accessToken = this.getAccessToken();
    const endpoint = `https://api.spotify.com/v1/search?type=track&q=${encodeURIComponent(
      searchTerm
    )}`;

    return fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.tracks) {
          return [];
        }
        return data.tracks.items.map((track) => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri,
        }));
      });
  },
};

export default Spotify;
