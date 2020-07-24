"use strict";

var _getBlobDuration = _interopRequireDefault(require("get-blob-duration"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var addCommentForm = document.getElementById('jsAddComment');
var videoContainer = document.getElementById('jsVideoPlayer');
var videoPlayer = document.querySelector('#jsVideoPlayer video');
var playBtn = document.getElementById('jsPlayButton');
var volumeBtn = document.getElementById('jsVolumeButton');
var fullScrnBtn = document.getElementById('jsFullScreen');
var currentTime = document.getElementById('currentTime');
var totalTime = document.getElementById('totalTime');
var volume = document.getElementById('jsVolume');
var volumeController = document.getElementById('volumeController');
var playBarBody = document.getElementById('playBarBody');
var playBar = document.getElementById('playBar');
var infi = document.getElementById('jsInfinity');

var registerView = function registerView() {
  var videoId = window.location.href.split('/videos/')[1];
  fetch("/api/".concat(videoId, "/view"), {
    method: 'POST'
  });
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

var formatDate = function formatDate(seconds) {
  var secondsNumber = parseInt(seconds, 10);
  var hours = Math.floor(secondsNumber / 3600);
  var minutes = Math.floor((secondsNumber - hours * 3600) / 60);
  var totalSeconds = secondsNumber - hours * 3600 - minutes * 60;

  if (hours < 10) {
    hours = "0".concat(hours);
  }

  if (minutes < 10) {
    minutes = "0".concat(minutes);
  }

  if (totalSeconds < 10) {
    totalSeconds = "0".concat(totalSeconds);
  }

  return "".concat(hours, ":").concat(minutes, ":").concat(totalSeconds);
};

function getCurrentTime() {
  currentTime.innerHTML = formatDate(Math.floor(videoPlayer.currentTime));

  if (currentTime.innerHTML === totalTime.innerHTML) {
    clearInterval();
  }
}

var duration;

function setTotalTime() {
  return _setTotalTime.apply(this, arguments);
}

function _setTotalTime() {
  _setTotalTime = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var blob;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return fetch(videoPlayer.src).then(function (response) {
              return response.blob();
            });

          case 2:
            blob = _context.sent;
            _context.next = 5;
            return (0, _getBlobDuration["default"])(blob);

          case 5:
            duration = _context.sent;
            totalTime.innerHTML = formatDate(duration);
            setInterval(getCurrentTime, 500);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _setTotalTime.apply(this, arguments);
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
  var value = event.target.value;
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
  var barWidth = videoPlayer.currentTime / duration;
  playBar.style.width = "".concat(barWidth * 100, "%");
}

function moveCurrentTime(event) {
  videoPlayer.currentTime = event.offsetX * duration / event.target.offsetWidth;
  playBar.style.width = "".concat(event.offsetX / event.target.offsetWidth * 100, "%");
}

function pressEvent(event) {
  var keyCode = event.keyCode;
  var moveValue = duration / 100;

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