// const fetch = require("node-fetch")
const SpotifyWebApi = require("spotify-web-api-node")
const access_token = 'BQDpa39i9YbiAQSFrcsG1GR_x2zVc0xoAEVpjqbEhCOxlhgujMojm8V1MwX7274k9HFlYskqM7pEhhcXDTzGyjzkHlfASPzLSH0tTaLWIFFawoj-R6Jeqy6HOvoOqiE4uuxqNHmYAe6F8E-krAkEjbSTsfQexueOkzLV1ZOj4t3Lsk6u4bUkIbb3tEiXOqgCVeG2Usstn8jPUGcKjw4mfOe52HmctehnFfsRzbGB8L655g4OEEKi4VnxTkPGWxx_WgP0Bd-r1g2oMorhgStbwfgc3pUcpmuvGYMwk3kuMwCnx7dfFf2z6XcPYmv5-dqO6etttq-kVpOTCeH0m-k7'
const refresh_token = 'AQB8jqdlNBDxnKrUviefUcynBvudyJkhKAvUM4CxyLL_UEaPSyA4mtusyciIgMa1SNxXhju-a9VrR_K32Imz6aRfZFpHWXdfV_sy5QSqAAkXS67Pc6xACwhoLxA8OyPktQw'
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

async function searcher(song,artist)
{
  return spotifyApi.searchTracks(`track:${song} artist:${artist}`)
  //   spotifyApi.searchTracks(`track:${song} artist:${artist}`)
  // .then(function(data) {
  //   console.log(JSON.stringify(data.body.tracks.items[0].uri))
  //   return data
  // }, function(err) {
  //   console.log('Something went wrong!', err);
  //   return false
  // });
}

// async function searcher(song,artist)
// {
//     spotifyApi.searchTracks(`track:${song} artist:${artist}`)
//   .then(function(data) {
//     console.log('Search tracks by "Alright" in the track name and "Kendrick Lamar" in the artist name', JSON.stringify(data.body.tracks.items[0].uri));
//   }, function(err) {
//     console.log('Something went wrong!', err);
//   });

// }


async function billieJean(song,artist)
{
    spotifyApi.searchTracks(`track:${song} artist:${artist}`)
  .then(function(data) {
    console.log('Search tracks by "Alright" in the track name and "Kendrick Lamar" in the artist name', JSON.stringify(data.body.tracks.items[0].uri));
  }, function(err) {
    console.log('Something went wrong!', err);
  });

}


async function getData()
{
let title = await searcher("Black or White","Michael Jackson")
console.log("TITLE",JSON.stringify(title.body.tracks.items[0].uri))

// title = billieJean("Black or White","Michael Jackson")
}

// getData()
// spotifyApi.searchTracks(`track:Black or White artist:Michael Jackson`).then(function(data){console.log(JSON.stringify(data.body))});


async function addTracks(tracks)
{
spotifyApi.addTracksToPlaylist('2q4ibk2cVymxYX8iZzyY8J', [tracks])
  .then(function(data) {
    console.log('Added tracks to playlist!');
  }, function(err) {
    console.log('Something went wrong!', err);
    return false
  });
}

// getPlayLists()

// createPlaylist()
// addTracks()
// getTrack()

module.exports = {addTracks,searcher}
