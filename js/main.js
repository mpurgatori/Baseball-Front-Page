

const setOrLoadTeam = () => {
  let theSelectedTeam = Cookies.get('team')||null
  if (theSelectedTeam){
      $( '#teamSelector' ).hide()
      run(theSelectedTeam)
      }
  else{
    $( '#gameInfo' ).hide()
     $('#teamButton').click((e)=> {
      e.preventDefault()
      let userTeam = document.getElementById('sel1')
      let selectedTeam = userTeam.options[userTeam.selectedIndex].value
      Cookies.set('team', selectedTeam)
      theSelectedTeam = selectedTeam
      run(theSelectedTeam)
      $('#teamSelector').fadeTo(800, 0)
      $('#gameInfo').fadeIn(1200)
    })
  }
}

const changeTeam = () => {
  $('#changeTeam').click(()=> {
    Cookies.remove('team')
    $('#gameInfo').fadeOut(800)
    $('#teamSelector').fadeTo(0,800)
    setOrLoadTeam()
  })
}


const run = (team) => {
  Promise.all(requestCreate(callArrayContructor()))
    .then(gameScores => {
      console.log(gameScores)
      let previousGame = {}
      for (let i = 4; i <= 9; i++) {
        console.log('PRE LOOP',team)
        if (findPreviousGame(gameScores[i], team)) {
          previousGame = findPreviousGame(gameScores[i], team)
          break
        }
      }
      console.log('HERES PREVIOUS GAME',previousGame)
      document.getElementById('prevDate').innerHTML = dateOfGame(previousGame.time_date, previousGame.day)
      document.getElementById('prevAwayTeam').innerHTML = `${teamCity[previousGame.away_team_name]} ${previousGame.away_team_name} (${previousGame.away_win}-${previousGame.away_loss})`
      document.getElementById('prevAwayScore').innerHTML = previousGame.away_team_runs || null
      document.getElementById('prevHomeTeam').innerHTML = `${teamCity[previousGame.home_team_name]} ${previousGame.home_team_name} (${previousGame.home_win}-${previousGame.home_loss})`
      document.getElementById('prevHomeScore').innerHTML = previousGame.home_team_runs || null
      document.getElementById('prevStatus').innerHTML = previousGame.status
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
      console.log(nextGame)
      if(nextGame.status !== 'Preview'){document.getElementById('next').innerHTML = 'Current Game'}
      document.getElementById('nextDate').innerHTML = dateOfGame(nextGame.time_date,nextGame.day)
      document.getElementById('nextTime').innerHTML = `${nextGame.home_time} ${nextGame.home_ampm} ${nextGame.home_time_zone}`
      document.getElementById('nextAwayTeam').innerHTML = `${teamCity[nextGame.away_team_name]} ${nextGame.away_team_name} (${nextGame.away_win}-${nextGame.away_loss})`
      document.getElementById('nextAwayScore').innerHTML = nextGame.away_team_runs || null
      document.getElementById('nextHomeTeam').innerHTML = `${teamCity[nextGame.home_team_name]} ${nextGame.home_team_name} (${nextGame.home_win}-${nextGame.home_loss})`
      document.getElementById('nextHomeScore').innerHTML = nextGame.home_team_runs || null
      if (nextGame.inning){document.getElementById('nextStatus').innerHTML = `${nextGame.status}: Inning ${nextGame.inning}`}
      else {document.getElementById('nextStatus').innerHTML = nextGame.status}
    })
}


$(document).ready(()=> {
  setOrLoadTeam()
  changeTeam()
})













