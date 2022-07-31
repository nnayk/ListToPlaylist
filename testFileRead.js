const fs = require('fs')
const readline = require('readline')
const getUser = require("./getUserData")

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

  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
    console.log(line,line.length)
    if (line.length > 0)
    {
        if (line.includes(':') || line.includes('--'))
        {
            currArtist = line.slice(0,-1)
        }
        else
        {
            song = line
            // let title = await searcher("Black or White","Michael Jackson")
            // console.log("TITLE",JSON.stringify(title.body.tracks.items[0].uri)) 
            let songInfo = await getUser.searcher(song,currArtist)
            try
            {
            console.log(`${song} details:\n ${songInfo.body.tracks.items[0]['uri']}`)
            getUser.addTracks(songInfo.body.tracks.items[0]['uri'])
            } catch (e) 
            {
              console.log("ERROR ADDING TRACK")
            }

        }
    }
  }
  console.log("TRACKS",tracks)
  // getUser.addTracks(tracks)
}

processLineByLine();

// getUser.searcher()

// readF()