let partySizeDiv = document.querySelector('#party-size-buttons')
let bubbleDiv = document.querySelector('#bubbles')
let selected = document.getElementsByClassName("selected")
let test = document.createElement('button')


test.innerText = 'test'
test.addEventListener('click', testFunction)
partySizeDiv.appendChild(test)

function testFunction() {
  let easy = selected[0].innerText * xpArray[`${selected[1].innerText}`][0]
  let medium = selected[0].innerText * xpArray[`${selected[1].innerText}`][1]
  let hard = selected[0].innerText * xpArray[`${selected[1].innerText}`][2]
  let deadly = selected[0].innerText * xpArray[`${selected[1].innerText}`][3]
  console.log(easy)
  console.log(medium)
  console.log(hard)
  console.log(deadly)
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
