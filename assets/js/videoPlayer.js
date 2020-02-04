const videoContainer = document.getElementById('jsVideoPlayer');
const videoPlayer = document.querySelector('#jsVideoPlayer video');
const playBtn = document.getElementById('jsPlayButton');
const volumeBtn = document.getElementById('jsVolumeButton');
const fullScrnBtn = document.getElementById('jsFullScreen');
const currentTime = document.getElementById('currentTime');
const totalTime = document.getElementById('totalTime');
const volume = document.getElementById('jsVolume');
const volumeController = document.getElementById('volumeController');

function handlePlayClick() {
  if (videoPlayer.paused) {
    videoPlayer.play();
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
  } else {
    videoPlayer.pause();
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
  }
}

function handleVolumeClick() {
  if (videoPlayer.muted) {
    videoPlayer.muted = false;
    volume.value = videoPlayer.volume;
    changeVolumeIcon(videoPlayer.volume);
  } else {
    videoPlayer.muted = true;
    volume.value = 0;
    volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
  }
}

function exitFullScreen() {
  fullScrnBtn.innerHTML = '<i class="fas fa-expand"></i>';
  fullScrnBtn.addEventListener('click', goFullScreen);
  if (document.exitFullScreen) {
    document.exitFullScreen();
  } else if (document.mozCancelFullscreen) {
    document.mozCancelFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullScreen();
  }
}

function goFullScreen() {
  if (videoContainer.requestFullScreen) {
    videoContainer.requestFullscreen();
  } else if (videoContainer.mozRequestFullscreen) {
    videoContainer.mozRequestFullscreen();
  } else if (videoContainer.webkitRequestFullscreen) {
    videoContainer.webkitRequestFullscreen();
  } else if (videoContainer.msRequestFullscreen) {
    videoContainer.msRequestFullscreen();
  }
  fullScrnBtn.innerHTML = '<i class="fas fa-compress"></i>';
  fullScrnBtn.removeEventListener('clcik', goFullScreen);
  fullScrnBtn.addEventListener('click', exitFullScreen);
}

const formatDate = (seconds) => {
  const secondsNumber = parseInt(seconds, 10);
  let hours = Math.floor(secondsNumber / 3600);
  let minutes = Math.floor((secondsNumber - hours * 3600) / 60);
  let totalSeconds = secondsNumber - hours * 3600 - minutes * 60;

  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (totalSeconds < 10) {
    totalSeconds = `0${totalSeconds}`;
  }
  return `${hours}:${minutes}:${totalSeconds}`;
};

function getCurrentTime() {
  currentTime.innerHTML = formatDate(Math.floor(videoPlayer.currentTime));
  if (currentTime.innerHTML === totalTime.innerHTML) {
    clearInterval();
  }
}

function setTotalTime() {
  console.log('setTotalTime 실행! ');
  console.log(Math.round(videoPlayer.duration));
  totalTime.innerHTML = formatDate(videoPlayer.duration);
  setInterval(getCurrentTime, 500);
}

function handleEnded() {
  videoPlayer.currentTime = 0;
  playBtn.innerHTML = '<i class="fas fa-play"></i>';
}

function showSlider() {
  volume.style.display = 'block';
}
function hideSlider() {
  volume.style.display = 'none';
}

function handleDrag(event) {
  const {
    target: { value }
  } = event;
  changeVolumeIcon(videoPlayer.volume);
  videoPlayer.volume = value;
  if (value >= 0.8) {
    volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
  } else if (value >= 0.4) {
    volumeBtn.innerHTML = '<i class="fas fa-volume-down"></i>';
  } else if (value > 0) {
    volumeBtn.innerHTML = '<i class="fas fa-volume-off"></i>';
  } else {
    volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
  }
}

function changeVolumeIcon(value) {
  videoPlayer.volume = value;
  if (value >= 0.8) {
    volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
  } else if (value >= 0.4) {
    volumeBtn.innerHTML = '<i class="fas fa-volume-down"></i>';
  } else if (value > 0) {
    volumeBtn.innerHTML = '<i class="fas fa-volume-off"></i>';
  } else {
    volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
  }
}

function init() {
  videoPlayer.volume = 0.5;
  document.getElementById('video').addEventListener('click', handlePlayClick);
  playBtn.addEventListener('click', handlePlayClick);
  volumeBtn.addEventListener('click', handleVolumeClick);
  fullScrnBtn.addEventListener('click', goFullScreen);
  videoPlayer.addEventListener('durationchange', setTotalTime());
  videoPlayer.addEventListener('ended', handleEnded);
  volumeController.addEventListener('mouseover', showSlider);
  volumeController.addEventListener('mouseleave', hideSlider);
  volume.addEventListener('input', handleDrag);
}

if (videoContainer) {
  init();
}
