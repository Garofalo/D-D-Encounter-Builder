let typeSelector = document.querySelector('#monster-type')
let ratingSelector = document.querySelector('#monster-cr')
let nameSelector = document.querySelector('#monster-name')
let getStats = document.querySelector('#get-stats')
let monsterBody = document.querySelector('#monster-body')
//Access the API
async function fetchData() {
  let i = 1;
  let monsters = [];
  let monsterTypes = []
  while (i) {
    const url = `https://api.open5e.com/monsters/?format=json&page=${i}`;
    // const url = `https://api.open5e.com/monsters/?format=json&page=1`;
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
// Get unique types from fetchdata and use it to add the types to the selector

function getTypeList(typeList) {

  let distictTypes = [...new Set(typeList)]

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
    // const url = `https://api.open5e.com/monsters/?format=json&page=1`;
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
    // const url = `https://api.open5e.com/monsters/?format=json&page=1`;
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
}

function addStatsToPage(monster) {
  let nameStat = document.createElement('p')
  let typeStat = document.createElement('p')
  let acStat = document.createElement('p')
  let hpStat = document.createElement('p')
  let crStat = document.createElement('p')

  const { name, type, armor_class, hit_points, challenge_rating } = monster
  nameStat.innerText = name
  typeStat.innerText = type
  acStat.innerText = `Armor Class : ${armor_class}`
  hpStat.innerText = `Hit Points : ${hit_points}`
  crStat.innerText = `Challenge Rating : ${challenge_rating}`

  monsterBody.appendChild(nameStat)
  monsterBody.appendChild(typeStat)
  monsterBody.appendChild(acStat)
  monsterBody.appendChild(hpStat)
  monsterBody.appendChild(crStat)


}
