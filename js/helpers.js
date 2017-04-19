

//Helper function to format date of game in HTML
 const dateOfGame = (gameDate, gameDayOfWeek) => {
  const months = ['Jan','Feb','Mar','Apr','May','June','July','Aug','Sept','Oct','Nov','Dec']
  const daysOfWeek = {SUN:'Sun',MON:'Mon',TUE:'Tues',WED:'Wed',THU:'Thur',FRI:'Fri',SAT:'Sat'}
  let day = Number(gameDate.slice(8,10)).toString()
  let month = months[Number(gameDate.slice(5,7))-1]
  let year = gameDate.slice(0,4)
  let dateComplete = `${daysOfWeek[gameDayOfWeek]}, ${month} ${day}, ${year}`
  return dateComplete
}

//Helper function to sift through scoreboard object and find game of particular team and their previous game
 const findPreviousGame = (scoreboard, theTeam) => {
  let theGame = {}
  for (let i = 0; i < scoreboard.game.length; i++) {
    if (scoreboard.game[i].home_team_name === theTeam || scoreboard.game[i].away_team_name === theTeam) {
      if (scoreboard.game[i].status === 'Final' || scoreboard.game[i].status === 'Postponed') {
        theGame = scoreboard.game[i]
        return theGame
      }
    }
  }
  return false
}

//Helper function to sift through scoreboard object and find next or current game of particular team
 const findNextOrCurrent = (scoreboard, theTeam) => {
  let theGame = {}
  for (let i = 0; i < scoreboard.game.length; i++) {
    if (scoreboard.game[i].home_team_name === theTeam || scoreboard.game[i].away_team_name === theTeam) {
      if (scoreboard.game[i].status !== 'Final' && scoreboard.game[i].status !== 'Postponed') {
        theGame = scoreboard.game[i]
        return theGame
      }
    }
  }
  return false
}

const isEmpty = o => {
    for(let i in o){
        if(o.hasOwnProperty(i)){
            return false
        }
    }
    return true
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


