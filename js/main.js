
//
const setOrLoadTeam = () => {
  $('#gameInfo').hide()
  let theSelectedTeam = Cookies.get('team') || null
  if (theSelectedTeam) {
    run(theSelectedTeam)
  }
  else {
    $('#teamSelector').show()
    $('#teamButton').click((e) => {
      e.preventDefault()
      let userTeam = document.getElementById('sel1')
      let selectedTeam = userTeam.options[userTeam.selectedIndex].value
      Cookies.set('team', selectedTeam)
      theSelectedTeam = selectedTeam
      run(theSelectedTeam)
    })
  }
}

const changeTeam = () => {
  $('#changeTeam').click((e) => {
    e.preventDefault()
    Cookies.remove('team')
    $('#gameInfo').hide()
    setOrLoadTeam()
  })
}


const run = (team) => {
  $('#teamSelector').hide()
  Promise.all(requestCreate(callArrayContructor()))
    .then(gameScores => {
      let previousGame = {}
      for (let i = 4; i <= 9; i++) {
        if (findPreviousGame(gameScores[i], team)) {
          previousGame = findPreviousGame(gameScores[i], team)
          break
        }
      }
      if (isEmpty(previousGame)) { document.getElementById('prev').innerHTML = 'No Previous Game' }
      else {
        document.getElementById('prev').innerHTML = 'Previous Game'
        document.getElementById('prevDate').innerHTML = dateOfGame(previousGame.time_date, previousGame.day)
        document.getElementById('prevAwayTeam').innerHTML = `${teamAsset[previousGame.away_team_name].city} ${previousGame.away_team_name} (${previousGame.away_win}-${previousGame.away_loss})`
        document.getElementById('prevAwayScore').innerHTML = previousGame.away_team_runs || null
        document.getElementById('atPrev').innerHTML = '@'
        document.getElementById('prevHomeTeam').innerHTML = `${teamAsset[previousGame.home_team_name].city} ${previousGame.home_team_name} (${previousGame.home_win}-${previousGame.home_loss})`
        document.getElementById('prevHomeScore').innerHTML = previousGame.home_team_runs || null
        document.getElementById('prevStatus').innerHTML = previousGame.status
      }
      return gameScores
    })
    .then(gameScores => {
      let nextGame = {}
      for (let i = 4; i >= 0; i--) {
        if (findNextOrCurrent(gameScores[i], team)) {
          nextGame = findNextOrCurrent(gameScores[i], team)
          break
        }
      }
      if (isEmpty(nextGame)) { document.getElementById('next').innerHTML = 'No Game Scheduled' }
      else {
        if (nextGame.status !== 'Preview') { document.getElementById('next').innerHTML = 'Current Game' }
        else { document.getElementById('next').innerHTML = 'Next Game' }
        document.getElementById('nextDate').innerHTML = dateOfGame(nextGame.time_date, nextGame.day)
        document.getElementById('nextTime').innerHTML = `${nextGame.home_time} ${nextGame.home_ampm} ${nextGame.home_time_zone}`
        document.getElementById('nextAwayTeam').innerHTML = `${teamAsset[nextGame.away_team_name].city} ${nextGame.away_team_name} (${nextGame.away_win}-${nextGame.away_loss})`
        document.getElementById('nextAwayScore').innerHTML = nextGame.away_team_runs || null
        document.getElementById('atNext').innerHTML = '@'
        document.getElementById('nextHomeTeam').innerHTML = `${teamAsset[nextGame.home_team_name].city} ${nextGame.home_team_name} (${nextGame.home_win}-${nextGame.home_loss})`
        document.getElementById('nextHomeScore').innerHTML = nextGame.home_team_runs || null
        if (nextGame.inning) { document.getElementById('nextStatus').innerHTML = `${nextGame.status}: Inning ${nextGame.inning}` }
        else { document.getElementById('nextStatus').innerHTML = nextGame.status }
      }
      $('#gameInfo').fadeIn(400)
    })
}


$(document).ready( () => {
  setOrLoadTeam()
  changeTeam()
})













