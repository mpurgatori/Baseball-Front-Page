
//Helper function to sift through scoreboard object and find game of particular team
const findTeam = scoreboard => {
    let theGame = {}
    for (let i=0;i<scoreboard.game.length;i++){
        if (scoreboard.game[i].home_team_name === 'Padres'|| scoreboard.game[i].away_team_name === 'Padres'){
          if (scoreboard.game[i].status === 'Final' || scoreboard.game[i].status === 'Postponed'){
            theGame = scoreboard.game[i]
            return theGame
          }
        }
    }
    return false
}

//Function that finds previous game
const findPreviousGame = gameData => {
    let theGame = {}
    for (let i=0;i<gameData.length;i++){
        if (gameData[i].status === 'Final'||gameData[i] === 'Postponed'){
            theGame = gameData[i]
        }
    }
     if (theGame === {}){return false}
    return theGame
}



//Function that creates an array of ten api calls, one for every day from 5 days before today, today and 4 days from now
const callArrayContructor = () => {
  let dateIterate = new Date()
  dateIterate.setDate(dateIterate.getDate() + 5)
  let callArray = []
  for (let i=0;i<10;i++){
    dateIterate.setDate(dateIterate.getDate() - 1)
    let dateFormat = `year_${dateIterate.getFullYear()}/month_${("0" + (dateIterate.getMonth() + 1)).slice(-2)}/day_${('0'+dateIterate.getDate()).slice(-2)}`
    callArray.push(`http://gd2.mlb.com/components/game/mlb/${dateFormat}/miniscoreboard.json`)
  }
  return callArray
}

const requestCreate = array => {
  let fetchArray = []
  for (let i=0;i<array.length;i++){
    fetchArray.push(fetch(array[i], {
      method: 'get'
      }).then(response => {
          return response.json()
        .then(obj => {
          return obj.data.games
      })
      }).catch(err => {
          return err
      })
    )
  }
  return fetchArray
}


// let requestDateFormat = new Date()
// requestDateFormat.setDate(requestDateFormat.getDate() + 5)
// let requestDateFormat = `${requestDateFormat.getFullYear()}${("0" + (requestDateFormat.getMonth() + 1)).slice(-2)}${('0'+requestDateFormat.getDate()).slice(-2)}`


Promise.all(requestCreate(callArrayContructor()))
  .then(gameScores => {
    console.log(gameScores)
    let previousGame = {}
    for (let i=4;i<=9;i++){
      if(findTeam(gameScores[i])) {
        previousGame = findTeam(gameScores[i])
        return previousGame
      }
    }
  })
  .then( gameObj => console.log(gameObj))















// const previousGame = (apiUrl)=> {
//   fetch(apiUrl, {
//   method: 'get'
//   }).then(response => {
//     return response.json()
//     .then(obj => {
//       let scoreBoard = obj.data.games;
//       findPreviousGame(findTeam(scoreBoard))
//   })
//     //document.getElementById('vueCommit').innerHTML = gitHubData.vue.lastWeekCommits;
//   }).catch(err => {
//     console.log(err);
//   })
// }
// //Run currentDay once on load
// currentDay()
// //Run once every minute to retrieve any new data
