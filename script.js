// ----- Analog Clock -----
function updateClock() {
    const now = new Date();
    const second = now.getSeconds();
    const minute = now.getMinutes();
    const hour = now.getHours();

    document.getElementById("second").style.transform = `rotate(${second * 6}deg)`;
    document.getElementById("minute").style.transform = `rotate(${minute * 6}deg)`;
    document.getElementById("hour").style.transform = `rotate(${(hour % 12) * 30 + minute / 2}deg)`;

    document.getElementById("datetime").innerText = now.toLocaleTimeString();
}
setInterval(updateClock, 1000);
updateClock();

// ----- Adjustable Timer -----
let timerDuration = 25 * 60; // default 25 minutes
let timerRemaining = timerDuration;
let timerInterval = null;

function updateTimerDisplay() {
    const minutes = Math.floor(timerRemaining / 60);
    const seconds = timerRemaining % 60;
    document.getElementById("timer").innerText =
        `${minutes.toString().padStart(2,"0")}:${seconds.toString().padStart(2,"0")}`;
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
    stopTimer();
    timerRemaining = timerDuration;
    updateTimerDisplay();
}

updateTimerDisplay();
// 声音对象，初始静音
const sounds = {
  sound1: new Audio('sounds/sound1.mp3'),
  sound2: new Audio('sounds/sound2.mp3'),
  sound3: new Audio('sounds/sound3.mp3'),
  sound4: new Audio('sounds/sound4.mp3'),
  sound5: new Audio('sounds/sound5.mp3'),
  sound6: new Audio('sounds/sound6.mp3'),
  sound7: new Audio('sounds/sound7.mp3'),
  sound8: new Audio('sounds/sound8.mp3'),
  sound9: new Audio('sounds/sound9.mp3'),
  sound10: new Audio('sounds/sound10.mp3')
};

// 初始化循环播放、静音
for (let key in sounds) {
  sounds[key].loop = true;
  sounds[key].volume = 0;
  sounds[key].muted = true;
  // sounds[key].play(); // 如果需要自动播放可以取消注释
}

// 滑块控制音量
function updateSoundVolume(id) {
  const slider = document.getElementById(id);
  const volume = slider.value / 100;
  if (!sounds[id].muted) {
    sounds[id].volume = volume;
  }
}

// 静音开关（图标变化）
function toggleSound(id, btn) {
  const sound = sounds[id];
  if (sound.muted) {
    sound.muted = false;
    sound.volume = document.getElementById(id).value / 100;
    btn.textContent = "🔊"; // 打开声音图标
    sound.play();
  } else {
    sound.muted = true;
    sound.volume = 0;
    btn.textContent = "🔇"; // 静音图标
  }
}
