// ------------- STROKE RATE CODE ----------------//

// stroke rate elements
const rateButton = document.getElementById('stroke-button')
const resetButton = document.getElementById('reset-button')
const rateDisplay = document.getElementById('rate-display')
const infoButtonEl = document.getElementById('more-info-click')
// const instructionsEl = document.getElementById('instructions')

// stroke rate variables
let count = 0
let startCount = false
let startTime = 0
let endTime = 0
let strokesBetween = 4

rateButton.addEventListener('click', handleRateButton)
resetButton.addEventListener('click', handleResetButton)
// infoButtonEl.addEventListener('click', handleInfoToggle)

function handleRateButton() {
    startCount = !startCount
    if (startCount == true) {
        startTime = new Date()
    }
    else {
        endTime = new Date()
        let interval = (endTime - startTime) / 1000
        let rate = Math.round((((strokesBetween - 1) / interval) * 60) * 10) / 10

        rateDisplay.innerHTML = `${rate}`
    }
}

function handleResetButton() {
    count = 0
    rateDisplay.innerHTML = `00.0`
}

function handleInfoToggle() {
    console.log('clicked')
    if (instructionsEl.classList.contains('show-instructions')) {
        instructionsEl.classList.remove('show-instructions')
    } else {
        instructionsEl.classList.add('show-instructions')
    }
}

// METRONOME 
const quantityEl = document.getElementById('quantity')
const startStopEl = document.getElementById('start-metronome')
const audio = new Audio('assets/metronome.m4a')
const volumeEl = document.getElementById('volume-slider')

var bpm = 50
var turnOn = false
var timerID = 0
audio.volume = 0.5

quantityEl.addEventListener('change', () => {
    bpm = parseInt(quantityEl.value)
})

startStopEl.addEventListener('click', function() {
    turnOn = !turnOn
    startStopEl.innerHTML == 'Start' ?
        startStopEl.innerHTML = 'Stop'
        :
        startStopEl.innerHTML = 'Start'
    audioMetronome(turnOn)
})

function audioMetronome(turnOn) {
    if(turnOn){
        timerID = setTimeout(() => {
            audio.currentTime = 0
            audio.play()
            audioMetronome(turnOn)
        }, 60000 / bpm);
    } else {
        clearTimeout(timerID)
    }
}

volumeEl.addEventListener('change', (e) => {
    audio.volume = e.target.value/100
})

