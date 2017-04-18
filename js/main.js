
const setOrLoadTeam = () => {
  $('#gameInfo').hide()
  $('#changeTeam').hide()
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
    $('#changeTeam').hide()
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
      console.log(previousGame)
      if (isEmpty(previousGame)) { document.getElementById('prev').innerHTML = 'No Previous Game' }
      else {
        $("#prevAwayLogo").attr("src",teamAsset[previousGame.away_team_name].logo2);
        $("#prevHomeLogo").attr("src",teamAsset[previousGame.home_team_name].logo2);
        document.getElementById('prev').innerHTML = 'Last Game'
        document.getElementById('prevDate').innerHTML = dateOfGame(previousGame.time_date, previousGame.day)
        document.getElementById('prevAwayCity').innerHTML = `${teamAsset[previousGame.away_team_name].city}`
        document.getElementById('prevAwayTeam').innerHTML = `${previousGame.away_team_name}`
        document.getElementById('prevAwayRecord').innerHTML = `(${previousGame.away_win}-${previousGame.away_loss})`
        document.getElementById('atPrev').innerHTML = '@'
        document.getElementById('prevScore').innerHTML = `${previousGame.away_team_runs || null} - ${previousGame.home_team_runs || null}`
        document.getElementById('prevHomeCity').innerHTML = `${teamAsset[previousGame.home_team_name].city}`
        document.getElementById('prevHomeTeam').innerHTML = `${previousGame.home_team_name}`
        document.getElementById('prevHomeRecord').innerHTML = `(${previousGame.home_win}-${previousGame.home_loss})`
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
        $("#nextAwayLogo").attr("src",teamAsset[nextGame.away_team_name].logo2);
        $("#nextHomeLogo").attr("src",teamAsset[nextGame.home_team_name].logo2);
        document.getElementById('nextDate').innerHTML = dateOfGame(nextGame.time_date, nextGame.day)
        document.getElementById('nextTime').innerHTML = `${nextGame.home_time} ${nextGame.home_ampm} ${nextGame.home_time_zone}`
        document.getElementById('nextAwayCity').innerHTML = `${teamAsset[nextGame.away_team_name].city}`
        document.getElementById('nextAwayTeam').innerHTML = `${nextGame.away_team_name}`
        document.getElementById('nextAwayRecord').innerHTML = `(${nextGame.away_win}-${nextGame.away_loss})`
        document.getElementById('atNext').innerHTML = '@'
        if (nextGame.away_team_runs){document.getElementById('nextScore').innerHTML = `${nextGame.away_team_runs} - ${nextGame.home_team_runs}`}
        document.getElementById('nextHomeCity').innerHTML = `${teamAsset[nextGame.home_team_name].city}`
        document.getElementById('nextHomeTeam').innerHTML = `${nextGame.home_team_name}`
        document.getElementById('nextHomeRecord').innerHTML = `(${nextGame.home_win}-${nextGame.home_loss})`
        if (nextGame.inning) { document.getElementById('nextStatus').innerHTML = `${nextGame.status}: Inning ${nextGame.inning}` }
        else { document.getElementById('nextStatus').innerHTML = nextGame.status }
      }
      $(".full").css("background-color",teamAsset[team].primary)
       $(".card").css("background-color",teamAsset[team].secondary)
      $("#logo").attr("src",teamAsset[team].logo1);
      $('#gameInfo').fadeIn(400)
      $('#changeTeam').fadeIn(400)
    })
}


$(document).ready( () => {
  setOrLoadTeam()
  changeTeam()
})













