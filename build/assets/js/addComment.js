"use strict";

var _axios = _interopRequireDefault(require("axios"));

var _deleteComment = _interopRequireDefault(require("./deleteComment"));

var _updateComment = _interopRequireDefault(require("./updateComment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var addCommentForm = document.getElementById('jsAddComment');
var commentList = document.getElementById('jsCommentList');
var commentNumber = document.getElementById('jsCommentNumber');
var shortCut = document.getElementsByClassName('jsShortCut');
var dropDiv = document.getElementsByClassName('drop__div');
var avatar;
var name;

var increaseNumber = function increaseNumber() {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) + 1;
};

var addComment = function addComment(comment) {
  var li = document.createElement('li');
  var span = document.createElement('span');
  var span1 = document.createElement('span');
  var img = document.createElement('img');
  var commentGroup = document.createElement('div');
  var menuIcon = document.createElement('div');
  var i = document.createElement('i');
  var dropdiv = document.createElement('div');
  var dropmenu = document.createElement('div');
  var span2 = document.createElement('span');
  var span3 = document.createElement('span');
  var a1 = document.createElement('a');
  var a2 = document.createElement('a');
  var i1 = document.createElement('i');
  var i2 = document.createElement('i');
  commentGroup.className = 'comment__group';
  img.src = avatar;
  span.innerHTML = name;
  li.appendChild(span);
  span1.innerHTML = comment;
  li.appendChild(span1);
  commentGroup.appendChild(img);
  commentGroup.appendChild(li);
  i1.className = 'fas fa-pencil-alt';
  i2.className = 'fas fa-trash-alt';
  a1.appendChild(i1);
  a2.appendChild(i2);
  a1.innerHTML += '수정하기';
  a2.innerHTML += '삭제하기';
  span2.appendChild(a1);
  span2.className = 'updateComment';
  span2.addEventListener('click', _updateComment["default"]);
  span3.appendChild(a2);
  span3.className = 'deleteCommentAjax';
  span3.addEventListener('click', _deleteComment["default"]);
  dropdiv.appendChild(span2);
  dropdiv.appendChild(span3);
  dropdiv.className = 'drop__menu';
  dropmenu.appendChild(dropdiv);
  dropmenu.className = 'drop__div';
  i.className = 'jsShortCut fas fa-ellipsis-v';
  menuIcon.appendChild(i);
  menuIcon.appendChild(dropmenu);
  menuIcon.className = 'menuIcon';
  commentGroup.appendChild(menuIcon);
  menuIcon.addEventListener('click', toggleDropDown);
  commentList.prepend(commentGroup);
  increaseNumber();
};

var sendComment =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(comment) {
    var videoId, response;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            videoId = window.location.href.split('/videos/')[1];
            _context.next = 3;
            return (0, _axios["default"])({
              url: "/api/".concat(videoId, "/comment"),
              method: 'POST',
              data: {
                comment: comment,
                videoId: videoId
              }
            });

          case 3:
            response = _context.sent;

            if (response.status === 200) {
              addComment(comment);
            }

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function sendComment(_x) {
    return _ref.apply(this, arguments);
  };
}();

var handleSubmit = function handleSubmit(event) {
  event.preventDefault();
  var commentInput = addCommentForm.querySelector('input');
  var comment = commentInput.value;
  name = document.getElementById('hiddenName').value;
  avatar = document.getElementById('hiddenImg').value;
  sendComment(comment);
  commentInput.value = '';
};

var toggleDropDown = function toggleDropDown(event) {
  event.stopPropagation();
  var index = 0;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = shortCut[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var item = _step.value;

      if (item === event.target) {
        break;
      }

      index += 1;
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  var target = dropDiv[index].style;

  if (target.display !== 'block') {
    for (var i = 0; i < dropDiv.length; i++) {
      dropDiv[i].style.display = '';
    }

    target.display = 'block';
  } else {
    target.display = '';
  }
};

var toggleClose = function toggleClose() {
  var closeTarget = document.getElementsByClassName('drop__div');
  Array.from(closeTarget).forEach(function (element) {
    element.style.display = '';
  });
};

function init() {
  addCommentForm.addEventListener('submit', handleSubmit);
  window.addEventListener('click', toggleClose);
  Array.from(shortCut).forEach(function (element) {
    element.addEventListener('click', toggleDropDown);
  });
}

if (addCommentForm) {
  init();
}