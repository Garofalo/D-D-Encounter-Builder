let typeSelector = document.querySelector('#monster-type')
let ratingSelector = document.querySelector('#monster-cr')
let nameSelector = document.querySelector('#monster-name')
let getStats = document.querySelector('#get-stats')
let monsterBody = document.querySelector('#monster-body')
let monsterStats = document.querySelector('#monster-stats')

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

  let distictName = [...new Set(nameList)].sort()

  distictName.forEach((name) => {
    let nameOption = document.createElement('option')

    nameOption.value = name
    nameOption.textContent = name
    nameSelector.appendChild(nameOption)
  })
}
getStats.addEventListener('click', getMonsterStats)

async function getMonsterStats() {
  let url = `https://api.open5e.com/monsters/?search=${nameSelector.value}&challenge_rating=${ratingSelector.value}&type=${typeSelector.value}`
  try {
    const res = await axios.get(url)
    let monster = res.data.results[0]
    removeBoilerPlate()
    addStatsToPage(monster)
  } catch (error) {
    console.log(error);
  }
}

function removeBoilerPlate() {
  monsterBody.innerHTML = ''
  monsterStats.innerHTML = ''
}

function addStatsToPage(monster) {
  let nameStat = document.createElement('p')
  let typeStat = document.createElement('p')
  let acStat = document.createElement('p')
  let hpStat = document.createElement('p')
  let crStat = document.createElement('p')
  let statSTR = document.createElement('p')
  let statDEX = document.createElement('p')
  let statCHA = document.createElement('p')
  let statINT = document.createElement('p')
  let statCON = document.createElement('p')
  let statWIS = document.createElement('p')
  let statP = document.createElement('p')

  const { name, type, armor_class, hit_points, challenge_rating, strength, dexterity, charisma, intelligence, constitution, wisdom } = monster
  nameStat.innerText = name.toUpperCase()
  typeStat.innerText = type.toUpperCase()
  acStat.innerText = `Armor Class : ${armor_class}`
  hpStat.innerText = `Hit Points : ${hit_points}`
  crStat.innerText = `Challenge Rating : ${challenge_rating}`
  statDEX.innerText = `DEXTERITY: ${dexterity}`
  statSTR.innerText = `STRENGTH: ${strength}`
  statCON.innerText = `CONSTITUTION: ${constitution}`
  statWIS.innerText = `WISDOM: ${wisdom}`
  statINT.innerText = `INTELLIGENCE: ${intelligence}`
  statCHA.innerText = `CHARISMA: ${charisma}`
  statP.innerText = 'STATS'
  monsterStats.appendChild(statP)
  monsterStats.appendChild(statSTR)
  monsterStats.appendChild(statDEX)
  monsterStats.appendChild(statCON)
  monsterStats.appendChild(statWIS)
  monsterStats.appendChild(statINT)
  monsterStats.appendChild(statCHA)

  monsterBody.appendChild(nameStat)
  monsterBody.appendChild(typeStat)
  monsterBody.appendChild(acStat)
  monsterBody.appendChild(hpStat)
  monsterBody.appendChild(crStat)
  defaultOption()

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