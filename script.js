let interfaceUnlocked = true;
let breakLength = 5*60;
let sessionLength = 25*60;
let clock;
let flag = true;

const breakIncrement = document.getElementById("break-increment");
const breakDecrement = document.getElementById("break-decrement");
const breakElement = document.getElementById("break-length");
const sessionIncrement = document.getElementById("session-increment");
const sessionDecrement = document.getElementById("session-decrement");
const sessionElement = document.getElementById("session-length");
const timerSeconds = document.getElementById("timer-seconds");
const timerMinutes = document.getElementById("timer-minutes");
const playPause = document.getElementById("start_stop")
const reset = document.getElementById("reset")
const timerLabel = document.getElementById("timer-label")

function addZero(number) {
  if(number.toString() < 10) {
    return "0" + number.toString()
  } else { return number.toString()}
}

breakIncrement.addEventListener("click", () => {
  if(interfaceUnlocked && breakLength < 3600) {
    breakLength += 60;
    breakElement.textContent = breakLength /60
  }
})

breakDecrement.addEventListener("click", () => {
  if(interfaceUnlocked && breakLength > 60) {
    breakLength -= 60;
    breakElement.textContent = breakLength /60
  }
})

sessionDecrement.addEventListener("click", () => {
  if(interfaceUnlocked && sessionLength > 60) {
    sessionLength -= 60;
    timerMinutes.textContent = sessionLength /60
    sessionElement.textContent = sessionLength /60
  }
})

sessionIncrement.addEventListener("click", () => {
  if(interfaceUnlocked && sessionLength < 3600) {
    sessionLength += 60;
    timerMinutes.textContent = sessionLength /60
    sessionElement.textContent = sessionLength /60
  }
})

playPause.addEventListener("click", startInterval) 

reset.addEventListener('click', ()=>{
  interfaceUnlocked = true;
  timerLabel.textContent = "Current session time"
  flag = true;
  clearInterval(clock);
  breakLength = 5*60;
  sessionLength = 25*60;
  timerMinutes.textContent = sessionLength /60
  timerSeconds.textContent = addZero(sessionLength % 60)
  breakElement.textContent = breakLength / 60
  sessionElement.textContent = sessionLength / 60
})

function switchInterval(breakL,sessionL){
  if(sessionL === 0 && breakL === 0){
    breakLength = Number(breakElement.textContent) * 60
    sessionLength = Number(sessionElement.textContent) * 60
    clearInterval(clock);
    startInterval()
  }
}

function breakTime(sessionL) {
  if(sessionL === 0) {
    clearInterval(clock)
    setTimeout(() => {
      timerMinutes.textContent = addZero(Math.floor(breakLength / 60))
      timerSeconds.textContent = addZero(breakLength % 60)
      clock = setInterval(
        () => {
          breakLength -= 1
          timerMinutes.textContent = addZero(Math.floor(breakLength / 60))
          timerSeconds.textContent = addZero(breakLength % 60)
          switchInterval(breakLength,sessionLength)
        },
        1000
      )
      timerLabel.textContent = "Current break time"
      flag = !flag
    }, 1000)
  } 
}

function startInterval() {
  if(flag) {
    setTimeout(() => {
      timerMinutes.textContent = addZero(Math.floor(sessionLength / 60))
      timerSeconds.textContent = addZero(sessionLength % 60)
      clock = setInterval(
        () => {
          sessionLength -= 1
          timerMinutes.textContent = addZero(Math.floor(sessionLength / 60))
          timerSeconds.textContent = addZero(sessionLength % 60)
          breakTime(sessionLength)
        },
        1000
      )
      timerLabel.textContent = "Current session time"
      interfaceUnlocked = false;
      flag = !flag
    }, 1000)
  } else {
    clearInterval(clock)
    interfaceUnlocked = true;
    flag = !flag
  }
}
