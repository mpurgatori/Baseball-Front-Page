
const myTeam = 'Tigers'
const months = ['Jan','Feb','Mar','Apr','May','June','July','Aug','Sept','Oct','Nov','Dec']
const daysOfWeek = {SUN:'Sunday',MON:'Monday',TUE:'Tuesday',WED:'Wednesday',THU:'Thursday',FRI:'Friday',SAT:'Saturday'}

Promise.all(requestCreate(callArrayContructor()))
  .then(gameScores => {
    let previousGame = {}
    for (let i = 4; i <= 9; i++) {
      if (findPreviousGame(gameScores[i])) {
        previousGame = findPreviousGame(gameScores[i])
        break
      }
    }
    document.getElementById('prevDate').innerHTML = dateOfGame(previousGame.time_date,previousGame.day)
    document.getElementById('prevAwayTeam').innerHTML = `${previousGame.away_team_name} (${previousGame.away_win}-${previousGame.away_loss})`
    document.getElementById('prevAwayScore').innerHTML = previousGame.away_team_runs || null
    document.getElementById('prevHomeTeam').innerHTML = `${previousGame.home_team_name} (${previousGame.home_win}-${previousGame.home_loss})`
    document.getElementById('prevHomeScore').innerHTML = previousGame.home_team_runs || null
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
    console.log(nextGame)
    if(nextGame.status !== 'Preview'){document.getElementById('next').innerHTML = 'Current Game'}
    document.getElementById('nextDate').innerHTML = dateOfGame(nextGame.time_date,nextGame.day)
    document.getElementById('nextTime').innerHTML = `${nextGame.home_time} ${nextGame.home_ampm} ${nextGame.home_time_zone}`
    document.getElementById('nextAwayTeam').innerHTML = `${nextGame.away_team_name} (${nextGame.away_win}-${nextGame.away_loss})`
    document.getElementById('nextAwayScore').innerHTML = nextGame.away_team_runs || null
    document.getElementById('nextHomeTeam').innerHTML = `${nextGame.home_team_name} (${nextGame.home_win}-${nextGame.home_loss})`
    document.getElementById('nextHomeScore').innerHTML = nextGame.home_team_runs || null
    if (nextGame.inning){document.getElementById('nextStatus').innerHTML = `${nextGame.status}: Inning ${nextGame.inning}`}
    else {document.getElementById('nextStatus').innerHTML = nextGame.status}
  })














