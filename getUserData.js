// const fetch = require("node-fetch")
const SpotifyWebApi = require("spotify-web-api-node")

const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(access_token);

// (async () => {
//   const me = await spotifyApi.getMe();
//   console.log(me);
// })().catch(e => {
//   console.error(e);
// });

async function getPlayLists()
{
    spotifyApi.getUserPlaylists('2frv3wbfdu6qvxmf79fx3st8p')
  .then(function(data) {
    console.log('Retrieved playlists', data.body);
  },function(err) {
    console.log('Something went wrong!', err);
  });
}

async function billieJean()
{
    spotifyApi.searchTracks('track:Billie Jean artist:Michael Jackson')
  .then(function(data) {
    console.log('Search tracks by "Alright" in the track name and "Kendrick Lamar" in the artist name', data.body);
  }, function(err) {
    console.log('Something went wrong!', err);
  });

}

async function createPlaylist()
{
    spotifyApi.createPlaylist('MJ', { 'description': 'Favorite MJ songs', 'public': true })
  .then(function(data) {
    console.log('Created playlist!',data.body);
  }, function(err) {
    console.log('Something went wrong!', err);
  });
}

// async function addTracks()
// {
//     track = await spotifyApi.searchTracks('track:Billie Jean artist:Michael Jackson');
//     spotifyApi.addTracksToPlaylist('2q4ibk2cVymxYX8iZzyY8J', [track])
//   .then(function(data) {
//     console.log('Added tracks to playlist!');
//   }, function(err) {
//     console.log('Something went wrong!', err);
//   });
// }

// async function getTrack()
// {
//     const response = await fetch('https://accounts.spotify.com/v1/search?q=track:' + "Despacito" + '"%20artist:"' + "Luis Fonsi" + '"&type=track'
//     , {
//         headers: {
//           Authorization: `token ${access_token}`
//         }
//       })
//     console.log("RESPONSE",response)
//     console.log('hello')
//     const jsOn = await response.json()
//     console.log(jsOn)
// }

async function searcher(artist,song)
{
  // return spotifyApi.searchTracks(`track:${song} artist:${artist}`)
spotifyApi.searchTracks(`track:${song} artist:${artist}`)
  .then(function(data) {
    console.log(data.body)
  }, function(err) {
    console.log('Something went wrong!', err);
    return false
  });
}

searcher("Black or White","Michael Jackson")

// async function addTracks(tracks)
// {
// spotifyApi.addTracksToPlaylist('2q4ibk2cVymxYX8iZzyY8J', tracks)
//   .then(function(data) {
//     console.log('Added tracks to playlist!');
//   }, function(err) {
//     console.log('Something went wrong!', err);
//     return false
//   });
// }

// getPlayLists()
// billieJean()
// createPlaylist()
// addTracks()
// getTrack()

// module.exports = {addTracks,searcher}
