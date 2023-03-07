const userEl = document.querySelector('.player--isuser');
const botEl = document.querySelector('.player--isbot');

let roundNum = 0;
let userScore = 0;
let botScore = 0;

const Players = {
  Bot: 'bot',
  User: 'user',
}

const Actions = {
  Rock: 'камінь',
  Paper: 'бумага',
  Scissors: 'ножниці',
}

const Results = {
  Tie: 'tie',
  Bot: Players.Bot,
  User: Players.User
}

const playerControlEl = document.querySelector('.player-control');
playerControlEl.addEventListener('click', function(e) {
  const target = e.target;
  const action = target.dataset.action;

  if(action) {
    playRound(action);
  }
})

function reset() {
  userScore = 0;
  botScore = 0;

  userEl.querySelector('.player__score').textContent = userScore;
  botEl.querySelector('.player__score').textContent = botScore;
}

function playRound(userAction) {
  const botAction = getBotsAction();
  const info = getWinner({
    botAction,
    userAction,
  });

  const {result: winner} = info;

  if(winner == Players.User) userScore++;
  else if(winner == Players.Bot) botScore++;

  roundNum++;
  showResult(winner, userAction, botAction)
}

function getWinner(arr) {
  const {botAction, userAction} = arr;

  console.log('Bot:', botAction, 'Player:', userAction)

  const rules = {
    [Actions.Scissors]: Actions.Paper, // scissors > paper and vice versa
    [Actions.Paper]: Actions.Rock, // paper > rock and vice versa
    [Actions.Rock]: Actions.Scissors, // rock > scissors and vice versa
  }

  if(botAction == userAction) return {
    result: Results.Tie,
    userAction,
    botAction,
  }

  // wAction = winner action; lAction = loose action;
  for (const [wAction, lAction] of Object.entries(rules)) {
    if(userAction == wAction && botAction == lAction) {
      return {
        result: Results.User,
        userAction,
        botAction,
      };
    } else if(botAction == wAction && userAction == lAction){
      return {
        result: Results.Bot,
        userAction,
        botAction,
      };
    }
  }
}

function getBotsAction() {
  const actions = [...Object.values(Actions)];;
  return actions[Math.floor(Math.random() * actions.length)]
}

function showResult(result, userAction, botAction) {
  userEl.querySelector('.player__action').textContent = userAction;
  botEl.querySelector('.player__action').textContent = botAction;

  userEl.querySelector('.player__score').textContent = userScore;
  botEl.querySelector('.player__score').textContent = botScore;

  document.querySelector('.info__round-num').textContent = roundNum;

  const roundInfoEl = document.querySelector('.round-info');
  
  roundInfoEl.querySelector('.round-info__result').textContent = result == Results.Tie ? 'Нічия ...' : result == Results.User ? 'Ти виграв !' : 'Бот виграв ! ;((';
  roundInfoEl.querySelector('.round-info__user-action').textContent = userAction;
  roundInfoEl.querySelector('.round-info__result-symbol').textContent = result == Results.Tie ? '=' : result == Results.User ? '>' : '<';
  roundInfoEl.querySelector('.round-info__bot-action').textContent = botAction;
}

reset();
