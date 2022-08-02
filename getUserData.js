// const fetch = require("node-fetch")
const SpotifyWebApi = require("spotify-web-api-node")
const access_token = 'BQDFfGj_K_5rw0l1OcdfwjSrSU79lxTVaDewXfBayWUV_w_bU0grLd67k1LPMYxIZH1kjDL9aF_isgYmCnZnG1lFYDOTtA5n0_nVwGv8NGGVXwvSEunmPVbMq2tneziIn1LGs_iXP2ZSPGE93mYEvt2gIssKTR91rWhISPo_KipnwEVtQ740XPSORWjLtrytQ_3xVtqGu4R8maILMspazn9lpl5YSQSShuCPbsVZCL1wX6YhtMgmuMKXeXQxmjJIFS2zev7A3Rwv9tej4eQL8LPRsubMLyQXSx6OkYMH38C9Dxf-OJsmhTtw3lGDiVJYVRds4yUdfcDDcj9PtWX3'
const refresh_token = 'AQB8jqdlNBDxnKrUviefUcynBvudyJkhKAvUM4CxyLL_UEaPSyA4mtusyciIgMa1SNxXhju-a9VrR_K32Imz6aRfZFpHWXdfV_sy5QSqAAkXS67Pc6xACwhoLxA8OyPktQw'
const spotifyApi = new SpotifyWebApi({accessToken:access_token});
spotifyApi.setAccessToken(access_token);

global.playlist_id = ""

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

async function createPlaylist(name,description)
{
    spotifyApi.createPlaylist(name, { 'description': description, 'public': true })
  .then(function(data) {
    // console.log('Created playlist!',data.body);
    let pl_uri = data.body.uri
    let first = pl_uri.indexOf(':')
    let second = pl_uri.indexOf(':',(first+1))
    // console.log("SECOND",second)
    global.playlist_id = pl_uri.slice(second+1,pl_uri.length)
    console.log("PLAYAYYA",global.playlist_id)
  }, function(err) {
    console.log('Something went wrong!', err);
  });
}

// createPlaylist("SENGI","DESCY")

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

async function searchSong(song)
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
    spotifyApi.searchTracks(`track:${song} artist: ${artist}`)
  .then(function(data) {
    console.log('Search tracks by "Alright" in the track name and "Kendrick Lamar" in the artist name', JSON.stringify(data.body.tracks.items[0].uri));
    addTracks(data.body.tracks.items[0].uri)
  }, function(err) {
    console.log('Something went wrong!', err);
  });

}


async function getData()
{
let title = await searcher("Time","Pink Floyd")
// console.log("TITLE",title.body)
// billieJean("Time","Pink Floyd")
addTracks(title.body.tracks.items[0]['uri'])


// title = billieJean("Black or White","Michael Jackson")
}

// getData()
// spotifyApi.searchTracks(`track:Black or White artist:Michael Jackson`).then(function(data){console.log(JSON.stringify(data.body))});


async function addTracks(tracks)
{
spotifyApi.setAccessToken(access_token);
spotifyApi.addTracksToPlaylist(global.playlist_id, [tracks])
  .then(function(data) {
    console.log('Added tracks to playlist!');
  }, function(err) {
    console.log('Something went wrong!', err);
    return false
  });
}

// getPlayLists()
// 
// createPlaylist("Helllo","DESC")s
// addTracks()
// getTrack()

module.exports = {addTracks,searcher,searchSong,createPlaylist}
