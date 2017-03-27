



const today = new Date()
const todayFormat = `year_${today.getFullYear()}/month_${("0" + (today.getMonth() + 1)).slice(-2)}/day_${('0'+today.getDate()).slice(-2)}`

let yesterday = new Date(today)
yesterday.setDate(today.getDate() - 1)

const yesterdayFormat = `year_${yesterday.getFullYear()}/month_${("0" + (yesterday.getMonth() + 1)).slice(-2)}/day_${('0'+yesterday.getDate()).slice(-2)}`

console.log(yesterdayFormat)

const currentDay = ()=> {
  fetch(`http://gd2.mlb.com/components/game/mlb/${todayFormat}/miniscoreboard.json`, {
  method: 'get'
  }).then(response => {
    return response.json()
    .then(obj => {
      let todayScoreBoard = obj.data.games;
      console.log(todayScoreBoard);
  })
    //document.getElementById('vueCommit').innerHTML = gitHubData.vue.lastWeekCommits;
  }).catch(err => {
    console.log(err);
  })
}
//Run currentDay once on load
currentDay()
//Run once every minute to retrieve any new data
