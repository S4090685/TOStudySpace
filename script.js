
// welcoming message
window.onload = function() {
  document.getElementById('welcomeInfo').style.display = 'flex';
}

// Close the popup when button is clicked
document.getElementById('okBtn').onclick = function() {
  document.getElementById('welcomeInfo').style.display = 'none';
}

// ----------- TIMER -------------
let timerDuration = 30 * 60; 
let timerRemaining = timerDuration;
let timerInterval = null;

function updateTimerDisplay() {
  const minutes = Math.floor(timerRemaining / 60);
  const seconds = timerRemaining % 60;
  document.getElementById("timer").innerText =
    `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function setTimer() {
  const minutes = parseInt(document.getElementById("setTime").value);
  if (!isNaN(minutes) && minutes > 0) {
    timerDuration = minutes * 60;
    timerRemaining = timerDuration;
    updateTimerDisplay();
  }
}

function startTimer() {
  if (timerInterval) return; 
  timerInterval = setInterval(() => {
    if (timerRemaining > 0) {
      timerRemaining--;
      updateTimerDisplay();
    } else {
      clearInterval(timerInterval);
      timerInterval = null;
      alert("Time’s up!");
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
}

function resetTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  timerRemaining = timerDuration;
  updateTimerDisplay();
}


updateTimerDisplay();

// ----------- CLOCK -------------
function updateClock() {
  const now = new Date();
  const seconds = now.getSeconds() + now.getMilliseconds() / 1000;
  const minutes = now.getMinutes() + seconds / 60;
  const hours   = (now.getHours() % 12) + minutes / 60;

 const offset = -90;
document.getElementById("second").style.transform = `rotate(${seconds * 6 + offset}deg)`;
document.getElementById("minute").style.transform = `rotate(${minutes * 6 + offset}deg)`;
document.getElementById("hour").style.transform   = `rotate(${hours * 30 + offset}deg)`;

  const dateStr = now.toISOString().split("T")[0];
  const timeStr = now.toLocaleTimeString();
  document.getElementById("datetime").innerText = `${dateStr} ${timeStr}`;

  requestAnimationFrame(updateClock);
}
updateClock();
function createNumbers() {
  const numbersContainer = document.getElementById("numbers");
  for (let i = 1; i <= 12; i++) {
    const number = document.createElement("div");
    number.className = "number";
    number.innerText = i;

    const angle = (i / 12) * 2 * Math.PI;
    const radius = 90;
    const x = 100 + radius * Math.sin(angle);
    const y = 100 - radius * Math.cos(angle);

    number.style.left = `${x}px`;
    number.style.top = `${y}px`;

    numbersContainer.appendChild(number);
  }
}
createNumbers();

// ----------- SOUND CONTROLS -------------
const soundMap = {
  sound1: "rain",
  sound2: "bird",
  sound3: "talking",
  sound4: "waves",
  sound5: "snow",
  sound6: "thunder",
  sound7: "wind",
  sound8: "pencil",
  sound9: "city",
  sound10: "cricket",
  sound11: "guitar",
  sound12: "piano"
};
window.addEventListener("DOMContentLoaded", () => {
  const birdAudio = document.getElementById("bird");
  birdAudio.volume = 0.8;
});

window.addEventListener("DOMContentLoaded", () => {
  const cityAudio = document.getElementById("city");
  cityAudio.volume = 0.8;
});

function toggleSound(soundId, btn) {
  const audio = document.getElementById(soundMap[soundId]);
  if (!audio) return;

  if (audio.paused) {
    audio.loop = true;
    audio.muted = false;
    audio.play();
    btn.textContent = "🔊";
  } else {
    audio.muted = !audio.muted;
    btn.textContent = audio.muted ? "🔇" : "🔊";
  }
}

function updateSoundVolume(soundId) {
  const audio = document.getElementById(soundMap[soundId]);
  if (!audio) return;

  if (audio.paused) {
    audio.loop = true;
    audio.play();
  }

  const slider = document.getElementById(soundId);
  audio.volume = slider.value / 100;

  audio.muted = false;

  const btn = slider.previousElementSibling;
  if (btn && btn.classList.contains("mute-btn")) {
    btn.textContent = "🔊";
  }
}
const musicToggleBtn = document.getElementById('toggleBtn');
const soundPanel = document.getElementById('soundPanel');

musicToggleBtn.addEventListener('click', () => {
  soundPanel.classList.toggle('open');
  musicToggleBtn.textContent = soundPanel.classList.contains('open')
    ? "x"
    : "🎶";
});

// video panel 
const toggleBtn = document.getElementById('togglePanelBtn');
const videoPanel = document.getElementById('videoPanel');

toggleBtn.addEventListener('click', () => {
  videoPanel.classList.toggle('open');
  toggleBtn.textContent = videoPanel.classList.contains('open')
    ? "x"
    : "🎬";

});

function changeVideo(fileName) {
  const bgVideo = document.getElementById('bgVideo');
  bgVideo.src = fileName;
  bgVideo.load();
  bgVideo.play();
}
