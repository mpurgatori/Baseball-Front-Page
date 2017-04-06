

const myTeam = 'Tigers'

//Helper function to sift through scoreboard object and find game of particular team and their previous game
const findPreviousGame = scoreboard => {
  let theGame = {}
  for (let i = 0; i < scoreboard.game.length; i++) {
    if (scoreboard.game[i].home_team_name === myTeam || scoreboard.game[i].away_team_name === myTeam) {
      if (scoreboard.game[i].status === 'Final' || scoreboard.game[i].status === 'Postponed') {
        theGame = scoreboard.game[i]
        return theGame
      }
    }
  }
  return false
}

//Helper function to sift through scoreboard object and find next or current game of particular team
const findNextOrCurrent = scoreboard => {
  let theGame = {}
  for (let i = 0; i < scoreboard.game.length; i++) {
    if (scoreboard.game[i].home_team_name === myTeam || scoreboard.game[i].away_team_name === myTeam) {
      if (scoreboard.game[i].status === 'Preview' || scoreboard.game[i].status === 'Warmup' || scoreboard.game[i].status === 'In Progress') {
        theGame = scoreboard.game[i]
        return theGame
      }
    }
  }
  return false
}


//Function that creates an array of ten api calls, one for every day from 5 days before today, today and 4 days from now
const callArrayContructor = () => {
  let dateIterate = new Date()
  dateIterate.setDate(dateIterate.getDate() + 5)
  let callArray = []
  for (let i = 0; i < 10; i++) {
    dateIterate.setDate(dateIterate.getDate() - 1)
    let dateFormat = `year_${dateIterate.getFullYear()}/month_${("0" + (dateIterate.getMonth() + 1)).slice(-2)}/day_${('0' + dateIterate.getDate()).slice(-2)}`
    callArray.push(`http://gd2.mlb.com/components/game/mlb/${dateFormat}/miniscoreboard.json`)
  }
  return callArray
}

const requestCreate = array => {
  let fetchArray = []
  for (let i = 0; i < array.length; i++) {
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


Promise.all(requestCreate(callArrayContructor()))
  .then(gameScores => {
    let previousGame = {}
    for (let i = 4; i <= 9; i++) {
      if (findPreviousGame(gameScores[i])) {
        previousGame = findPreviousGame(gameScores[i])
        break
      }
    }
    document.getElementById('prevAwayTeam').innerHTML = previousGame.away_team_name
    document.getElementById('prevHomeTeam').innerHTML = previousGame.home_team_name
    document.getElementById('prevStatus').innerHTML = previousGame.status
    return gameScores
  })
  .then(gameScores => {
    let nextGame = {}
    for (let i = 4; i >= 0; i--) {
      if (findNextOrCurrent(gameScores[i])) {
        nextGame = findNextOrCurrent(gameScores[i])
        break
      }
    }
    document.getElementById('nextAwayTeam').innerHTML = nextGame.away_team_name
    document.getElementById('nextHomeTeam').innerHTML = nextGame.home_team_name
    document.getElementById('nextStatus').innerHTML = nextGame.status

  })














