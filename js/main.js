


const today = new Date()

const callArrayContructor = (date) => {
  let dateIterate = new Date(date)
  let callArray = []
  for (let i=0;i<5;i++){
    dateIterate.setDate(date.getDate() - i)
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


Promise.all(requestCreate(callArrayContructor(today)))
  .then(gameScores => console.log(gameScores))


// const findTeam = theData => {
//     let theGame = {}
//     for (let i=0;i<theData.game.length;i++){
//         if (theData.game[i].home_team_name === 'Tigers'|| theData.game[i].away_team_name === 'Tigers'){
//             theGame = theData.game[i]
//         }
//     }
//     if (theGame === {}){return false}
//     return theGame
// }



// const findPreviousGame = gameData => {
//     let theGame = {}
//     for (let i=0;i<gameData.length;i++){
//         if (gameData[i].status === 'Final'){
//             theGame = gameData[i]
//         }
//     }
//      if (theGame === {}){return false}
//     return theGame
// }





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
