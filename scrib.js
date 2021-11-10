let partySizeDiv = document.querySelector('#party-size-buttons')
let bubbleDiv = document.querySelector('#bubbles')
let selected = document.getElementsByClassName("selected")
let resultsButton = document.querySelector('#results-button')


resultsButton.addEventListener('click', testFunction)


function testFunction() {
  let easy = selected[0].innerText * xpArray[`${selected[1].innerText}`][0]
  let medium = selected[0].innerText * xpArray[`${selected[1].innerText}`][1]
  let hard = selected[0].innerText * xpArray[`${selected[1].innerText}`][2]
  let deadly = selected[0].innerText * xpArray[`${selected[1].innerText}`][3]
  console.log(easy)
  console.log(easy * multiplier)

}
let monsterNumber
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




for (let i = 1; i < 7; i++) {
  let partyNumButtons = document.createElement('button')
  partyNumButtons.innerText = `${i}`
  partyNumButtons.classList.add('party-size-button')
  bubbleDiv.appendChild(partyNumButtons)
  partyNumButtons.addEventListener('click', makeSelected)
}




for (let i = 1; i < 21; i++) {
  let levelNumButtons = document.createElement('button')
  levelNumButtons.innerText = `${i}`
  levelNumButtons.classList.add('party-level-button')
  partySizeDiv.appendChild(levelNumButtons)
  levelNumButtons.addEventListener('click', makeSelected)
}



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

function makeSelected(event) {
  event.target.classList.toggle('selected')
  let forRemoval = getSiblings(event.target)
  removeSelected(forRemoval)
}
function removeSelected(arr) {
  arr.forEach((button) => {
    button.classList.remove('selected')
  })
}



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
let typeSelector = document.querySelector('#monster-type')
let ratingSelector = document.querySelector('#monster-cr')
let nameSelector = document.querySelector('#monster-name')
let addToFight = document.querySelector('#add-to-fight')
let monsterComp = document.querySelector('#monster-comp')

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
  console.log(monsterTypes)
  getTypeList(monsterTypes)
}

fetchData();

function getTypeList(typeList) {

  let distictTypes = [...new Set(typeList)].sort();
  console.log(distictTypes)
  distictTypes.forEach((type) => {
    let typeOption = document.createElement('option')

    typeOption.value = type
    typeOption.textContent = type
    typeSelector.appendChild(typeOption)
  })
}
typeSelector.addEventListener('change', getCR)
async function getCR(event) {
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
  console.log(monsterCR)
  populateCrSelector(monsterCR)
}

function populateCrSelector(crList) {

  let distictCR = [...new Set(crList)].sort(function (a, b) { return a - b })
  console.log(distictCR)
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
  console.log(monsterName)
  populateNameSelector(monsterName)
}

function populateNameSelector(nameList) {

  let distictName = [...new Set(nameList)].sort()
  console.log(distictName)
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
function defaultOption() {
  typeSelector.selectedIndex = 0;
  nameSelector.selectedIndex = 0
  ratingSelector.selectedIndex = 0;
  resetChoices(nameSelector)
  resetChoices(ratingSelector)
}

function resetChoices(div) {
  while (div.childNodes.length > 2) {
    div.removeChild(div.lastChild);
  }
}


//Change this

function addMonsterToPage(monster) {
  let nameStat = document.createElement('p')
  let typeStat = document.createElement('p')
  let acStat = document.createElement('p')
  let hpStat = document.createElement('p')
  let crStat = document.createElement('p')


  const { name, type, armor_class, hit_points, challenge_rating } = monster
  nameStat.innerText = name.toUpperCase()
  typeStat.innerText = type.toUpperCase()
  acStat.innerText = `Armor Class : ${armor_class}`
  hpStat.innerText = `Hit Points : ${hit_points}`
  crStat.innerText = `Challenge Rating : ${challenge_rating}`



  monsterComp.appendChild(nameStat)
  monsterComp.appendChild(typeStat)
  monsterComp.appendChild(acStat)
  monsterComp.appendChild(hpStat)
  monsterComp.appendChild(crStat)
  defaultOption()

}

