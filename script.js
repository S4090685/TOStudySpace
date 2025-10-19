// ---------- WELCOME MESSAGE ----------
window.onload = function() {
  document.getElementById('welcomeInfo').style.display = 'flex';
};

// Close the popup when button is clicked
document.getElementById('okBtn').onclick = function() {
  document.getElementById('welcomeInfo').style.display = 'none';
};

// ---------- TIMER ----------
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


// ---------- CLOCK ----------
function updateClock() {
  const now = new Date();
  const seconds = now.getSeconds() + now.getMilliseconds() / 1000;
  const minutes = now.getMinutes() + seconds / 60;
  const hours = (now.getHours() % 12) + minutes / 60;

  const offset = -90;
  document.getElementById("second").style.transform = `rotate(${seconds * 6 + offset}deg)`;
  document.getElementById("minute").style.transform = `rotate(${minutes * 6 + offset}deg)`;
  document.getElementById("hour").style.transform = `rotate(${hours * 30 + offset}deg)`;

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


// ---------- SOUND CONTROLS ----------
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

const activeSounds = new Set();
let isPausedAll = true; 
let rainStarted = false;

const okBtn = document.getElementById("okBtn");
okBtn.addEventListener("click", () => {
  const rainAudio = document.getElementById("rain");
  if (rainAudio && !rainStarted) {
    rainAudio.loop = true;
    rainAudio.volume = 0.5;
    rainAudio.play().catch(err => console.warn("Autoplay blocked:", err));
    rainStarted = true;
    activeSounds.add("sound1");
    const btn = document.querySelector(`[onclick*="sound1"]`);
    if (btn) btn.textContent = "🔊";
  }
  document.getElementById("welcomeInfo").style.display = "none";
});

function toggleSound(soundId, btn) {
  const audio = document.getElementById(soundMap[soundId]);
  if (!audio) return;

  if (activeSounds.has(soundId)) {
    activeSounds.delete(soundId);
    audio.pause();
    audio.currentTime = 0;
    btn.textContent = "🔇";
  } else {
    activeSounds.add(soundId);
    audio.loop = true;
    audio.muted = false;

    if (!isPausedAll) {
      audio.play().catch(err => console.warn("Playback error:", err));
    }
    btn.textContent = "🔊";
  }
}

function updateSoundVolume(soundId) {
  const audio = document.getElementById(soundMap[soundId]);
  if (!audio) return;
  const slider = document.getElementById(soundId);

  audio.volume = slider.value / 100;

  if (activeSounds.has(soundId) && !isPausedAll) {
    audio.play().catch(err => console.warn("Playback error:", err));
  }
}


const playPauseBtn = document.getElementById('playPause');
console.log("playPause");

isPausedAll = !isPausedAll;

playPauseBtn.addEventListener('click', () => {
  if (isPausedAll) {
    activeSounds.forEach(soundId => {
      const audio = document.getElementById(soundMap[soundId]);
      if (audio) {
        audio.loop = true;
        audio.play().catch(err => console.warn("Playback error:", err));
      }
      const btn = document.querySelector(`[onclick*="${soundId}"]`);
      if (btn) btn.textContent = "🔊";
    });
    playPauseBtn.textContent = "⏸";
  } else {
    activeSounds.forEach(soundId => {
      const audio = document.getElementById(soundMap[soundId]);
      if (audio) audio.pause();
    });
    playPauseBtn.textContent = "▶";
  }
isPausedAll = !isPausedAll;

  
});

// Sound panel toggle
const musicToggleBtn = document.getElementById('toggleBtn');
const soundPanel = document.getElementById('soundPanel');

musicToggleBtn.addEventListener('click', () => {
  soundPanel.classList.toggle('open');
  musicToggleBtn.textContent = soundPanel.classList.contains('open') ? "x" : "🎶";
});


// ---------- VIDEO PANEL ----------
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
