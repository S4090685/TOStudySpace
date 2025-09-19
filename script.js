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
  const second = now.getSeconds();
  const minute = now.getMinutes();
  const hour = now.getHours();

  document.getElementById("second").style.transform = `rotate(${second * 6}deg)`;
  document.getElementById("minute").style.transform = `rotate(${minute * 6}deg)`;
  document.getElementById("hour").style.transform = `rotate(${(hour % 12) * 30 + minute / 2}deg)`;

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); 
  const day = String(now.getDate()).padStart(2, "0");

  const dateStr = `${year}-${month}-${day}`;
  const timeStr = now.toLocaleTimeString();

  document.getElementById("datetime").innerText = `${dateStr} ${timeStr}`;
}

setInterval(updateClock, 1000);
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
const toggleBtn = document.getElementById('togglePanelBtn');
const panel = document.querySelector('.video-list');

toggleBtn.addEventListener('click', () => {
  panel.style.display = panel.style.display === 'none' ? 'flex' : 'none';
});

function changeVideo(fileName) {
  const bgVideo = document.getElementById('bgVideo');
  bgVideo.src = fileName;
  bgVideo.load();
  bgVideo.play();
}
