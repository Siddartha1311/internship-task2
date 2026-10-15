const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('laps');

let startTime = 0;
let elapsedTime = 0;
let timerId = null;
let isRunning = false;
let lapCounter = 0;

function formatTime(milliseconds) {
  const totalMilliseconds = Math.floor(milliseconds);
  const hours = String(Math.floor(totalMilliseconds / 3600000)).padStart(2, '0');
  const minutes = String(Math.floor((totalMilliseconds % 3600000) / 60000)).padStart(2, '0');
  const seconds = String(Math.floor((totalMilliseconds % 60000) / 1000)).padStart(2, '0');
  const ms = String(totalMilliseconds % 1000).padStart(3, '0');

  return `${hours}:${minutes}:${seconds}:${ms}`;
}

function updateDisplay() {
  display.textContent = formatTime(elapsedTime);
}

function startTimer() {
  if (isRunning) return;

  startTime = Date.now() - elapsedTime;
  isRunning = true;
  timerId = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    updateDisplay();
  }, 10);

  syncButtonStates();
}

function pauseTimer() {
  if (!isRunning) return;

  clearInterval(timerId);
  isRunning = false;
  timerId = null;
  syncButtonStates();
}

function resetTimer() {
  pauseTimer();
  elapsedTime = 0;
  lapCounter = 0;
  lapsList.innerHTML = '';
  updateDisplay();
  syncButtonStates();
}

function recordLap() {
  if (elapsedTime === 0 && !isRunning) {
    return;
  }

  lapCounter += 1;
  const lapItem = document.createElement('li');
  lapItem.textContent = `Lap ${lapCounter}: ${formatTime(elapsedTime)}`;
  lapsList.prepend(lapItem);
}

function syncButtonStates() {
  startBtn.disabled = isRunning;
  pauseBtn.disabled = !isRunning;
  lapBtn.disabled = !isRunning && elapsedTime === 0;
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', recordLap);

updateDisplay();
syncButtonStates();
