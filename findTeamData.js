const data = require('./dataExport').theData

const findTeamScore = theData => {
    let theGame = {}
    for (let i=0;i<theData.game.length;i++){
        if (theData.game[i].home_team_name === 'Tigers'|| theData.game[i].away_team_name === 'Tigers'){
            theGame = theData.game[i]
        }
    }
    console.log(theGame)
    return theGame
}

findTeamScore(data)