const hourEl = document.querySelector('.hour');
const minEl = document.querySelector('.min');
const secEl = document.querySelector('.sec');
const millisecEl = document.querySelector('.millisec');

const startStopBtn = document.querySelector('.start-stop');
const resetBtn = document.querySelector('.reset');

let paused = false;
let prevTime, stopwatchInterval, elapsedTime = 0;

const updateTime = () => {
  let tempTime = elapsedTime;
  let milliseconds = tempTime % 1000;
  tempTime = Math.floor(tempTime / 1000);
  const seconds = tempTime % 60;
  tempTime = Math.floor(tempTime / 60);
  const minutes = tempTime % 60;
  tempTime = Math.floor(tempTime / 60);
  const hours = tempTime % 60;
  
  milliseconds = Math.floor(milliseconds / 10)
  millisecEl.innerText = milliseconds < 10 ? "0" + milliseconds : milliseconds;
  secEl.innerText = seconds < 10 ? "0" + seconds : seconds;
  minEl.innerText = minutes < 10 ? "0" + minutes : minutes;
  hourEl.innerText = hours < 10 ? "0" + hours : hours;
};

startStopBtn.addEventListener('click', 
() => {

    if (stopwatchInterval) {
        pause();
        startStopBtn.innerText = "Resume"
        
    } else if (!stopwatchInterval) {
        startResume();
        startStopBtn.innerText = "Pause"
    }

    updateTime();
  }
) 


function pause() {
    clearInterval(stopwatchInterval);
    stopwatchInterval = null;
    prevTime = null;
}

function startResume() {
    stopwatchInterval = setInterval(() => {
        if (!prevTime) {
          prevTime = Date.now();
        }
        
        elapsedTime += Date.now() - prevTime;
        prevTime = Date.now();
        
        updateTime();
      }, 50);
}


resetBtn.addEventListener('click', 
() => {
    pause();
    elapsedTime = 0;
    updateTime();
    startStopBtn.innerText = "Start"
  }
) 
