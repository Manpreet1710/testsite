console.log('connected')

let audio = document.querySelector('#audio')
let playButton = document.querySelector('.playButton')
let playButton2 = document.querySelector('.playButton2')

let hours = document.querySelector('#hours')
let minutes = document.querySelector('#minutes')
let AMPM = document.querySelector('#AMPM')

let activeAlarm = false
let currentTime
let alarmElement

async function getUserAsync(id) {
  let select = id
  let response = await fetch('sound.json')
  let data = await response.json()
  for (i = 0; i < data.length; i++) {
    // select.options[select.options.length] = new Option(data[i].sound_name)
    select.options[select.options.length] = new Option(data[i].sound_path)
  }
}
getUserAsync(audio)
playButton.addEventListener('click', () => {
  let sound = new Audio(audio.value)
  playButton.style.display = 'none'
  playButton2.style.display = 'block'
  sound.play()
})

playButton2.addEventListener('click', () => {
  playButton.style.display = 'block'
  playButton2.style.display = 'none'
  sound.pause()
})

// sound randomly now
let sound = new Audio('sounds/xylophone.mp3')

function startTime() {
  var today = new Date()
  var hr = today.getHours() //for hours
  var min = today.getMinutes() //for mins
  var sec = today.getSeconds() //for sec

  //Add a zero in front of numbers<10
  min = checkTime(min)
  sec = checkTime(sec)

  // AMPM LOGIC here
  ap = hr < 12 ? 'AM' : 'PM'
  hr = hr == 0 ? 12 : hr
  hr = hr > 12 ? hr - 12 : hr

  //alaram set logic function calling
  currentTime = hr + ':' + min + ' ' + ap
  let alarmSet = localStorage.getItem('alarm')
  if (currentTime == alarmSet) {
    sound.play()
  }

  // today date and time printing...
  document.getElementById('clock').innerHTML =
    hr + ':' + min + ':' + sec + ' ' + `<span> ${ap} </span>`

  var time = setTimeout(function () {
    startTime()
  }, 500)
}

// calling function
startTime()

function checkTime(i) {
  if (i < 10) {
    i = '0' + i
  }
  return i
}
function addMinSec(id) {
  let select = id
  let min = 59
  for (i = 0; i <= min; i++) {
    select.options[select.options.length] = new Option(i < 10 ? '0' + i : i)
  }
}
function addHour(id) {
  let select = id
  let hrs = 12
  for (i = 1; i <= hrs; i++) {
    select.options[select.options.length] = new Option(i)
  }
}

//add
addHour(hours)
addMinSec(minutes)

function onEnter() {
  if (activeAlarm == false) {
    hours.disabled = true
    minutes.disabled = true
    alarmElement = hours.value + ':' + minutes.value + ' ' + AMPM.value
    localStorage.setItem('alarm', alarmElement)
  }
}

let btn = document.querySelector('.btn2')
btn.addEventListener('click', () => {
  localStorage.removeItem('alarm')
  sound.pause()
})

// alarm
// let exampleModal = document.querySelector('#exampleModal')
// let results = document.querySelector('#results')
// let inpt = document.querySelector('.val')
// // console.log(inpt.value)
// //

// console.log(inpt.value)
// let getVal = localStorage.getItem('title')
// exampleModal.style.display = 'none'
// location.reload()
// results.innerHTML += `
// <h1>${getVal}</h1>
// `
