// const fetch = require("node-fetch")
const SpotifyWebApi = require("spotify-web-api-node")
const access_token = 'BQDT65hlEe9J37IZEThHsbZgelbeQYe_d8HAIx2LUA5i1INAMvnzaglW7HQjMDa25UR4XKkBOJ2KQXJmDucRGZs_rfUPMmTZQWRsBScX2iALAIOPOVHZcWxiv6_c-GYj27xdmJFkcHFXh3BMwBS6AiV-3_GA_l0wV0Wo5XvdH1eLZXytsaKJX11ozNE0zWx0Ymk1PPUrPowyMdkwYLSwncjLxNhAKlRpIwa7pZY9EeldBPWNyUFXGQMTWVgpabezYJosxpMlZmxuXb6TvoUvu3HvWZxpB9j2jTTHG7Vh2DU6lzzCr-nwq1WNXQmeI_c-5cbaQRE5lfNrpQ6TlSe3'
const refresh_token = 'AQB8jqdlNBDxnKrUviefUcynBvudyJkhKAvUM4CxyLL_UEaPSyA4mtusyciIgMa1SNxXhju-a9VrR_K32Imz6aRfZFpHWXdfV_sy5QSqAAkXS67Pc6xACwhoLxA8OyPktQw'
const spotifyApi = new SpotifyWebApi({accessToken:access_token});
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
    spotifyApi.createPlaylist('Pappa\'s Oldies', { 'description': 'Pappa\'s favorite 20th century songs', 'public': true })
  .then(function(data) {
    console.log('Created playlist!',data.body);
  }, function(err) {
    console.log('Something went wrong!', err);
  });
}

// createPlaylist()

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
  spotifyApi.setAccessToken(access_token);
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

async function searcher(song)
{
  spotifyApi.setAccessToken(access_token);
  return spotifyApi.searchTracks(`track:${song}`)
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
    spotifyApi.searchTracks(`track:${song}`)
  .then(function(data) {
    console.log('Search tracks by "Alright" in the track name and "Kendrick Lamar" in the artist name', JSON.stringify(data.body.tracks.items[0].uri));
  }, function(err) {
    console.log('Something went wrong!', err);
  });

}


async function getData()
{
let title = await searcher("Black or White","")
console.log("TITLE",title.body)

// title = billieJean("Black or White","Michael Jackson")
}

// getData()
// spotifyApi.searchTracks(`track:Black or White artist:Michael Jackson`).then(function(data){console.log(JSON.stringify(data.body))});


async function addTracks(tracks)
{
spotifyApi.setAccessToken(access_token);
spotifyApi.addTracksToPlaylist('2iDw58o5AeXbxCKijSex8Q', [tracks])
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
