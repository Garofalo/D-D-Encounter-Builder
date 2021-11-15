let partySizeDiv = document.querySelector('#party-size-buttons')
let bubbleDiv = document.querySelector('#bubbles')
let selectedLevel = document.getElementsByClassName("selected-level")
let selectedPartySize = document.getElementsByClassName('selected-party-size')
let resultsButton = document.querySelector('#results-button')
let starterP = document.querySelectorAll('.start')
let resultsArea = document.querySelector('#center-bottom')
let tableP = document.querySelector('#p1')
let howP = document.querySelector('#p2')
let partyCompDiv = document.querySelector('#party-comp')
let firstCompDiv = document.querySelector('#first-comp-div')
let secondCompDiv = document.querySelector('#second-comp-div')
let allMonsterCr = document.getElementsByClassName('get-this')
let resetButton = document.querySelector('#reset')
let typeSelector = document.querySelector('#monster-type')
let ratingSelector = document.querySelector('#monster-cr')
let nameSelector = document.querySelector('#monster-name')
let addToFight = document.querySelector('#add-to-fight')
let monsterComp = document.querySelector('#monster-comp')

resetButton.addEventListener('click', resetFight)

function calculateMultiplier(toCalc) {
  let monsterNumber = eval(allMonsterCr.length)
  let multiplier
  let output
  if (monsterNumber === 1) {
    multiplier = 1
  } else if (monsterNumber === 2) {
    multiplier = 1.5
  } else if (monsterNumber > 2 && monsterNumber < 7) {
    multiplier = 2
  } else if (monsterNumber > 6 && monsterNumber < 11) {
    multiplier = 2.5
  } else if (monsterNumber > 10 && monsterNumber < 14) {
    multiplier = 3
  } else {
    multiplier = 4
  }

  output = toCalc * multiplier
  return output
}
for (let i = 1; i < 7; i++) {
  let partyNumButtons = document.createElement('button')
  partyNumButtons.innerText = `${i}`
  partyNumButtons.classList.add('party-size-button')
  bubbleDiv.appendChild(partyNumButtons)
  partyNumButtons.addEventListener('click', makeSelectedPartySize)
}

function resetFight() {
  monsterComp.innerHTML = ''
  typeSelector.selectedIndex = 0
  nameSelector.selectedIndex = 0
  ratingSelector.selectedIndex = 0;
  resetChoices(ratingSelector)
  resetChoices(nameSelector)
  resultsArea.innerHTML = ''
}


for (let i = 1; i < 21; i++) {
  let levelNumButtons = document.createElement('button')
  levelNumButtons.innerText = `${i}`
  levelNumButtons.classList.add('party-level-button')
  partySizeDiv.appendChild(levelNumButtons)
  levelNumButtons.addEventListener('click', makeSelectedLevel)
}


resultsButton.addEventListener('click', findTotalMonsterXP)

//LEFT FUNCTIONS
function makeSelectedPartySize(event) {
  event.target.classList.toggle('selected-party-size')
  let forRemoval = getSiblings(event.target)
  removeSelected(forRemoval)
  firstCompDiv.innerHTML = ''
  let partySizeDisplay = document.createElement('p')
  let partySizeWord = document.createElement('h3')
  partySizeWord.innerText = 'Number Of Adventurers'
  partySizeWord.setAttribute('id', 'size-word')
  partySizeDisplay.setAttribute('id', 'size-to-display')
  partySizeDisplay.innerText = selectedPartySize[0].innerText
  firstCompDiv.appendChild(partySizeWord)
  firstCompDiv.appendChild(partySizeDisplay)
}
function makeSelectedLevel(event) {
  event.target.classList.toggle('selected-level')
  let forRemoval = getSiblings(event.target)
  secondCompDiv.innerHTML = ''
  removeSelected(forRemoval)
  let partyLevelDisplay = document.createElement('p')
  let partyLevelWord = document.createElement('h3')
  partyLevelWord.innerText = 'Level of Party'
  partyLevelWord.setAttribute('id', 'level-word')
  partyLevelDisplay.setAttribute('id', 'level-to-display')
  partyLevelDisplay.innerText = selectedLevel[0].innerText
  secondCompDiv.appendChild(partyLevelWord)
  secondCompDiv.appendChild(partyLevelDisplay)

}
function removeSelected(arr) {
  arr.forEach((button) => {
    button.classList.remove('selected-level')
    button.classList.remove('selected-party-size')
  })
}

// Source - https://www.javascripttutorial.net/javascript-dom/javascript-siblings/
let getSiblings = function (e) {
  let siblings = [];
  if (!e.parentNode) {
    return siblings;
  }
  let sibling = e.parentNode.firstChild;
  while (sibling) {
    if (sibling.nodeType === 1 && sibling !== e) {
      siblings.push(sibling);
    }
    sibling = sibling.nextSibling;
  }
  return (siblings);
};




//MONSTER PART


addToFight.addEventListener('click', getMonsterStats)

async function fetchData() {
  let i = 1;
  let monsters = [];
  let monsterTypes = []
  while (i) {
    const url = `https://api.open5e.com/monsters/?format=json&page=${i}`;

    try {
      const res = await axios.get(url)
      monsters = [...monsters, ...res.data.results];
      if (!res.data.next) {
        break;
      }

    } catch (error) {
      console.log(error);
    }
    i++;
  }
  monsters.forEach(monster => {
    monsterTypes.push(monster.type)

  })

  getTypeList(monsterTypes)
}

fetchData();

function getTypeList(typeList) {


  let distictTypes = [...new Set(typeList)].sort();
  distictTypes.forEach((type) => {
    let typeOption = document.createElement('option')

    typeOption.value = type
    typeOption.textContent = type
    typeSelector.appendChild(typeOption)
  })
}
typeSelector.addEventListener('change', getCR)
async function getCR(event) {
  nameSelector.selectedIndex = 0
  ratingSelector.selectedIndex = 0;
  resetChoices(ratingSelector)
  resetChoices(nameSelector)
  let type = event.target.value
  let i = 1
  let monsters = [];
  let monsterCR = []
  while (i) {
    const url = `https://api.open5e.com/monsters/?format=json&page=${i}&type=${type}`;
    try {
      const res = await axios.get(url)
      monsters = [...monsters, ...res.data.results];
      if (!res.data.next) {
        break;
      }

    } catch (error) {
      console.log(error);
    }
    i++;
  }
  monsters.forEach(monster => {
    monsterCR.push(monster.challenge_rating)
  })

  populateCrSelector(monsterCR)
}

function populateCrSelector(crList) {

  resetChoices(nameSelector)
  nameSelector.selectedIndex = 0
  let distictCR = [...new Set(crList)].sort(function (a, b) { return a - b })

  distictCR.forEach((cr) => {
    let crOption = document.createElement('option')

    crOption.value = cr
    crOption.textContent = cr
    ratingSelector.appendChild(crOption)
  })
}

ratingSelector.addEventListener('change', getMonsterName)

async function getMonsterName(event) {
  let type = typeSelector.value
  let cr = event.target.value
  let i = 1
  let monsters = [];
  let monsterName = []
  while (i) {
    const url = `https://api.open5e.com/monsters/?format=json&page=${i}&type=${type}&challenge_rating=${cr}`;
    try {
      const res = await axios.get(url)
      monsters = [...monsters, ...res.data.results];
      if (!res.data.next) {
        break;
      }
    } catch (error) {
      console.log(error);
    }
    i++;
  }
  monsters.forEach(monster => {
    monsterName.push(monster.name)
  })

  populateNameSelector(monsterName)
}

function populateNameSelector(nameList) {
  resetChoices(nameSelector)
  let distictName = [...new Set(nameList)].sort()

  distictName.forEach((name) => {
    let nameOption = document.createElement('option')
    nameOption.value = name
    nameOption.textContent = name
    nameSelector.appendChild(nameOption)
  })
}


async function getMonsterStats() {
  let url = `https://api.open5e.com/monsters/?search=${nameSelector.value}&challenge_rating=${ratingSelector.value}&type=${typeSelector.value}`
  try {
    const res = await axios.get(url)
    let monster = res.data.results[0]

    addMonsterToPage(monster)
  } catch (error) {
    console.log(error);
  }
}


function addMonsterToPage(monster) {
  let nameStat = document.createElement('p')
  let monsterCard = document.createElement('div')
  let acStat = document.createElement('p')
  let hpStat = document.createElement('p')
  let crHolder = document.createElement('div')
  let crDeclare = document.createElement('p')
  let crStat = document.createElement('p')


  const { name, armor_class, hit_points, challenge_rating } = monster
  nameStat.innerText = name.toUpperCase()
  acStat.innerText = `Armor Class : ${armor_class}`
  hpStat.innerText = `Hit Points : ${hit_points}`
  crDeclare.innerText = 'Challenge Rating :  '

  crStat.innerText = challenge_rating
  starterP.forEach(p => {
    p.classList.add('hidden')
  })

  monsterCard.classList.add('monster-card')
  crHolder.classList.add('cr')
  crStat.classList.add('get-this')
  monsterComp.appendChild(monsterCard)
  monsterCard.appendChild(nameStat)
  monsterCard.appendChild(acStat)
  monsterCard.appendChild(hpStat)
  monsterCard.appendChild(crHolder)
  crHolder.appendChild(crDeclare)
  crHolder.appendChild(crStat)
}


//XP Values
let lvl1XP = [
  25,
  50,
  75,
  100,
]
let lvl2XP = [
  50,
  100,
  150,
  200,
]
let lvl3XP = [
  75,
  150,
  225,
  400,
]
let lvl4XP = [
  125,
  250,
  375,
  500,
]
let lvl5XP = [
  250,
  500,
  750,
  1100,
]
let lvl6XP = [
  300,
  600,
  900,
  1400,
]
let lvl7XP = [
  350,
  750,
  1100,
  1700,
]
let lvl8XP = [
  450,
  900,
  1400,
  2100,
]
let lvl9XP = [
  550,
  1100,
  1600,
  2400,
]
let lvl10XP = [
  600,
  1200,
  1900,
  2800,
]
let lvl11XP = [
  800,
  1600,
  2400,
  3600,
]
let lvl12XP = [
  1000,
  2000,
  3000,
  4500,
]
let lvl13XP = [
  1100,
  2200,
  3400,
  5100,
]
let lvl14XP = [
  1250,
  2500,
  3800,
  5700,
]
let lvl15XP = [
  1400,
  2800,
  4300,
  6400,
]
let lvl16XP = [
  1600,
  3200,
  4800,
  7200,
]
let lvl17XP = [
  2000,
  3900,
  5900,
  8800,
]
let lvl18XP = [
  2100,
  4200,
  6300,
  9500,
]
let lvl19XP = [
  2400,
  4900,
  7300,
  10900,
]
let lvl20XP = [
  2800,
  5700,
  8500,
  12700,
]
let xpArray = [lvl1XP, lvl2XP, lvl3XP, lvl4XP, lvl5XP, lvl6XP, lvl7XP, lvl8XP, lvl9XP, lvl10XP, lvl11XP, lvl12XP, lvl13XP, lvl14XP, lvl15XP, lvl16XP, lvl17XP, lvl18XP, lvl19XP, lvl20XP]




let cr0xp = [0, 10]
let croneEigth = [.125, 25]
let crOneFourth = [.25, 50]
let crOneHalf = [.5, 100]
let crOne = [1, 200]
let crTwo = [2, 450]
let crThree = [3, 700]
let crFour = [4, 1100]
let crFive = [5, 1800]
let crSix = [6, 2300]
let crSeven = [7, 2900]
let crEight = [8, 3900]
let crNine = [9, 5000]
let crTen = [10, 5900]
let crEleven = [11, 7200]
let crTwelve = [12, 8400]
let crThirteen = [13, 10000]
let crFourteen = [14, 11500]
let crFifteen = [15, 13000]
let crSixteen = [16, 15000]
let crSeventeen = [17, 18000]
let crEighteen = [18, 20000]
let crNineteen = [19, 22000]
let crTwenty = [20, 25000]
let crTwentyOne = [21, 33000]
let crTwentyTwo = [22, 41000]
let crTwentyThree = [23, 50000]
let crTwentyFour = [24, 62000]
let crThirty = [30, 155000]
let crArray = [cr0xp, croneEigth, crOneFourth, crOneHalf, crOne, crTwo, crThree, crFour, crFive, crSix, crSeven, crEight, crNine, crTen, crEleven, crTwelve, crThirteen, crFourteen, crFifteen, crSixteen, crSeventeen, crEighteen, crNineteen, crTwenty, crTwentyOne, crTwentyTwo, crTwentyThree, crTwentyFour, crThirty]



function findTotalMonsterXP() {
  let totalMonsterXp = 0
  for (let i = 0; i < allMonsterCr.length; i++) {
    for (let j = 0; j < crArray.length; j++) {
      if (eval(allMonsterCr[i].innerText) == crArray[j][0]) {
        totalMonsterXp += crArray[j][1]
      }
    }

  }

  resultsArea.classList.remove('hidden')
  calculateResults(totalMonsterXp)
}

function calculateResults(total) {

  let easy = selectedPartySize[0].innerText * xpArray[`${selectedLevel[0].innerText}`][0]
  let medium = selectedPartySize[0].innerText * xpArray[`${selectedLevel[0].innerText}`][1]
  let hard = selectedPartySize[0].innerText * xpArray[`${selectedLevel[0].innerText}`][2]
  let deadly = selectedPartySize[0].innerText * xpArray[`${selectedLevel[0].innerText}`][3]
  let multipliedTotal = calculateMultiplier(total)
  if (multipliedTotal <= easy) {
    displayResults('easy')
  } else if (multipliedTotal <= medium) {
    displayResults('medium')
  } else if (multipliedTotal <= hard) {
    displayResults('hard')
  } else if (multipliedTotal >= deadly) {
    displayResults('deadly')
  } else {
    displayResults('error')
  }




}

function displayResults(res) {
  let result = document.createElement('h1')
  let resultText = document.createElement('p')
  resultsArea.innerHTML = ''
  if (res === 'easy') {
    result.innerText = 'EASY '
    resultText.innerText = `Hoo boy, that's going to be too easy. Your party only needed ${selectedPartySize[0].innerText * xpArray[`${selectedLevel[0].innerText}`][0]} experience for it to be a cakewalk, and you managed to not beat that. Make it HARDER!`
    result.classList.add('result-title')
    resultText.classList.add('result-snark')
    resultsArea.appendChild(result)
    resultsArea.appendChild(resultText)
  } else if (res === 'medium') {
    result.innerText = 'MEDIUM'
    resultText.innerText = `The fight should be done quickly, and it will net a small chunk of experience for the party. Consider running another encounter in addition to this before they rest.`
    result.classList.add('result-title')
    resultText.classList.add('result-snark')
    resultsArea.appendChild(result)
    resultsArea.appendChild(resultText)
  } else if (res === 'hard') {
    result.innerText = 'HARD '
    resultText.innerText = `Now we're talking. This will challenge the party and its resources.`
    result.classList.add('result-title')
    resultText.classList.add('result-snark')
    resultsArea.appendChild(result)
    resultsArea.appendChild(resultText)
  } else if (res === 'deadly') {
    result.innerText = 'DEADLY'
    resultText.innerText = `Perfect! This is the reason you DM, to kill your friends with make believe monsters. Now go out there and get em!`
    result.classList.add('result-title')
    resultText.classList.add('result-snark')
    resultsArea.appendChild(result)
    resultsArea.appendChild(resultText)
  } else {
    result.innerText = 'Whoops'
    resultText.innerText = "I don't know what happened, reload the page and try again. It's probably your fault, not mine."
    result.classList.add('result-title')
    resultText.classList.add('result-snark')
    resultsArea.appendChild(result)
    resultsArea.appendChild(resultText)
  }
}
function resetChoices(div) {

  while (div.childNodes.length > 2) {
    div.removeChild(div.lastChild);
  }
}