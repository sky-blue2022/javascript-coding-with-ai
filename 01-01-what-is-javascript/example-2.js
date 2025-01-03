const video = document.getElementById("video");
const playPauseButton = document.getElementById("play-pause");
const progress = document.getElementById("progress");
const timeDisplay = document.getElementById("time-display");
const volumeSlider = document.getElementById("volume");
const fullscreenButton = document.getElementById("fullscreen");

// Play/Pause functionality
playPauseButton.addEventListener("click", () => {
  if (video.paused) {
    video.play();
    playPauseButton.textContent = "Pause";
  } else {
    video.pause();
    playPauseButton.textContent = "Play";
  }
});

// Update progress bar and time display
video.addEventListener("timeupdate", () => {
  const progressValue = (video.currentTime / video.duration) * 100;
  progress.value = progressValue;

  const currentTime = formatTime(video.currentTime);
  const duration = formatTime(video.duration);
  timeDisplay.textContent = `${currentTime} / ${duration}`;
});

// Seek video when progress bar is adjusted
progress.addEventListener("input", () => {
  const seekTime = (progress.value / 100) * video.duration;
  video.currentTime = seekTime;
});

// Adjust volume
volumeSlider.addEventListener("input", () => {
  video.volume = volumeSlider.value;
});

// Fullscreen functionality
fullscreenButton.addEventListener("click", () => {
  if (!document.fullscreenElement) {
    video.parentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});

// Utility to format time in MM:SS
function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${seconds}`;
}
