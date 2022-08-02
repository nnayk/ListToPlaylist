const e = require('express');
const fs = require('fs')
const readline = require('readline')
const getUser = require("./getUserData")
const prompt = require('prompt-sync')();

// async function readF()
// {
// const file = await fs.readFile('./songs.pdf',{encoding:'utf8'})
// console.log(file)
// }

// const readline = require('readline');

async function processLineByLine() {
  const fileStream = fs.createReadStream('songs.pdf');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  let currArtist = ""
  let song = ""
let tracks = []

 total = 0
 success = 0

  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
    console.log(line,line.length)
    if (line.length > 0)
    {
        if (line.includes(':'))
        {
            currArtist = line.slice(0,-1)
        }
        else
        {
            
            try
            {
            let index = 0
            if (line.includes('-'))
            {
              
              index = line.indexOf('-')
              currArtist = line.slice(0,index)
              song = line.slice(index+1,line.length)
            }
            else if (line.includes('--'))
            {
              index = line.indexOf('--')
              currArtist = line.slice(0,index)
              song = line.slice(index+2,line.length)
            }
            else
            {
              song = line
            }


            // let title = await searcher("Black or White","Michael Jackson")
            // console.log("TITLE",JSON.stringify(title.body.tracks.items[0].uri)) 
            let songInfo = await getUser.searcher(song,currArtist)
            console.log("SONG",song,"Artist",currArtist)

            if (songInfo == undefined)
            {
              console.log("SONG",song,"artist",currArtist)
              songInfo = await getUser.searchSong(song)
            }
            // console.log(`${song} details:\n ${songInfo.body.tracks.items[0]['uri']}`)
            getUser.addTracks(songInfo.body.tracks.items[0]['uri'])
            }catch (e) 
            {
              console.log("ERROR ADDING TRACK")
            }

        }
    }
  }
  console.log("TRACKS",tracks)
  // getUser.addTracks(tracks)
}



//usage inside aync function do not need closure demo only*
const name = prompt('What is the name of the playlist? ');
const desc = prompt("What is the playlist description? ")
getUser.createPlaylist(name,desc).then(
  processLineByLine()
);


// getUser.searcher()

// readF()