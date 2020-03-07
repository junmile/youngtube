import getBlobDuration from 'get-blob-duration';
const addCommentForm = document.getElementById('jsAddComment');
const videoContainer = document.getElementById('jsVideoPlayer');
const videoPlayer = document.querySelector('#jsVideoPlayer video');
const playBtn = document.getElementById('jsPlayButton');
const volumeBtn = document.getElementById('jsVolumeButton');
const fullScrnBtn = document.getElementById('jsFullScreen');
const currentTime = document.getElementById('currentTime');
const totalTime = document.getElementById('totalTime');
const volume = document.getElementById('jsVolume');
const volumeController = document.getElementById('volumeController');
const playBarBody = document.getElementById('playBarBody');
const playBar = document.getElementById('playBar');
const infi = document.getElementById('jsInfinity');

const registerView = () => {
  const videoId = window.location.href.split('/videos/')[1];
  fetch(`/api/${videoId}/view`, { method: 'POST' });
};

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
let duration;

async function setTotalTime() {
  const blob = await fetch(videoPlayer.src).then((response) => response.blob());

  duration = await getBlobDuration(blob);
  totalTime.innerHTML = formatDate(duration);
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
  videoPlayer.muted = false;
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

function changePlayBar() {
  const barWidth = videoPlayer.currentTime / duration;
  playBar.style.width = `${barWidth * 100}%`;
}

function moveCurrentTime(event) {
  videoPlayer.currentTime =
    (event.offsetX * duration) / event.target.offsetWidth;
  playBar.style.width = `${(event.offsetX / event.target.offsetWidth) * 100}%`;
}

function pressEvent(event) {
  const keyCode = event.keyCode;
  const moveValue = duration / 100;

  if (keyCode === 37) {
    videoPlayer.currentTime -= moveValue;
  } else if (keyCode === 38) {
    event.preventDefault();
    if (videoPlayer.volume + 0.1 >= 0.9) {
      videoPlayer.volume = 1;
    } else {
      videoPlayer.volume += 0.1;
    }
  } else if (keyCode === 39) {
    videoPlayer.currentTime += moveValue;
  } else if (keyCode === 40) {
    event.preventDefault();
    if (videoPlayer.volume - 0.1 <= 0.1) {
      videoPlayer.volume = 0;
    } else {
      videoPlayer.volume -= 0.1;
    }
  } else if (keyCode === 32) {
    if (addCommentForm.childNodes[0].value == '') {
      event.preventDefault();
      handlePlayClick();
    }
  }
}
function restart() {
  videoPlayer.currentTime = 0;
  videoPlayer.play();
}

function infinity(event) {
  if (infi.style.color !== 'rgb(252, 193, 89)') {
    infi.style.color = 'rgb(252, 193, 89)';
    videoPlayer.addEventListener('ended', restart);
  } else {
    videoPlayer.removeEventListener('ended', restart);
    infi.style.color = 'white';
  }
}
function eventRemove(event) {
  event.preventDefault();
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
  videoPlayer.addEventListener('timeupdate', changePlayBar);
  playBarBody.addEventListener('click', moveCurrentTime);
  document.addEventListener('keydown', pressEvent);
  infi.addEventListener('click', infinity);
}

if (videoContainer) {
  init();
  registerView();
}
