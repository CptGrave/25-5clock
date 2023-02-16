let sessionMode = true;
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

function addZero(number) {
  if(number.toString() < 10) {
    return "0" + number.toString()
  } else { return number.toString()}
}

breakIncrement.addEventListener("click", () => {
  if(sessionMode && breakLength < 3600) {
    breakLength += 60;
    breakElement.textContent = breakLength /60
  }
})

breakDecrement.addEventListener("click", () => {
  if(sessionMode && breakLength > 60) {
    breakLength -= 60;
    breakElement.textContent = breakLength /60
  }
})

sessionDecrement.addEventListener("click", () => {
  if(sessionMode && sessionLength > 60) {
    sessionLength -= 60;
    timerMinutes.textContent = sessionLength /60
    sessionElement.textContent = sessionLength /60
  }
})


sessionIncrement.addEventListener("click", () => {
  if(sessionMode && sessionLength < 3600) {
    sessionLength += 60;
    timerMinutes.textContent = sessionLength /60
    sessionElement.textContent = sessionLength /60
  }
})

playPause.addEventListener("click", startInterval ) 

reset.addEventListener('click', ()=>{
  sessionMode = true;
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
  if(sessionL === 0 & breakL === 0){
    console.log("zlapalo zmien czasy na to co jest w inpucie i wyczysc interval")
    breakLength = Number(breakElement.textContent)
    sessionLength = Number(sessionElement.textContent)
    clearInterval(clock);
    startInterval()
  }

}
function breakTime(sessionL) {
  if(sessionL === 0) {
    console.log("its break time")
    clearInterval(clock)
      clock = setInterval(()=>{
      breakLength -= 1
      timerMinutes.textContent = addZero(Math.floor(breakLength / 60))
      timerSeconds.textContent = addZero(breakLength % 60)
      
      switchInterval(breakLength,sessionLength)
      },1000)
      flag = !flag
      
  } 
  
}



function startInterval() {
  if(flag) {
      clock = setInterval(()=>{
      sessionLength -= 1
      timerMinutes.textContent = addZero(Math.floor(sessionLength / 60))
      timerSeconds.textContent = addZero(sessionLength % 60)
      breakTime(sessionLength)
      },1000)
      flag = !flag
  } else {
      clearInterval(clock)
      sessionMode = true;
      flag = !flag
  }
sessionMode = false;
}
