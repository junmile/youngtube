"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var updateComment = document.getElementsByClassName('updateComment');
var commentGroup = document.getElementsByClassName('comment__group');

var updateC =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(event) {
    var videoId, commentId, comment, response;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            event.preventDefault();
            videoId = window.location.href.split('/videos/')[1];
            commentId = event.target.closest('.comment__group').childNodes[2].childNodes[1].childNodes[0].id;
            comment = event.target.closest('.comment__group').childNodes[3].comment.value;
            _context.next = 6;
            return (0, _axios["default"])({
              url: "/api/".concat(videoId, "/comment/update"),
              method: 'POST',
              data: {
                commentId: commentId,
                comment: comment
              }
            });

          case 6:
            response = _context.sent;

            if (response.status === 200) {
              complete(event, comment);
            }

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function updateC(_x) {
    return _ref.apply(this, arguments);
  };
}();

var updateCAjax =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(event) {
    var index, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, item, userId, videoId, comment, response;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            event.preventDefault();
            index = 0;
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context2.prev = 5;
            _iterator = commentGroup[Symbol.iterator]();

          case 7:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context2.next = 15;
              break;
            }

            item = _step.value;

            if (!(event.target.closest('.comment__group') === item)) {
              _context2.next = 11;
              break;
            }

            return _context2.abrupt("break", 15);

          case 11:
            index += 1;

          case 12:
            _iteratorNormalCompletion = true;
            _context2.next = 7;
            break;

          case 15:
            _context2.next = 21;
            break;

          case 17:
            _context2.prev = 17;
            _context2.t0 = _context2["catch"](5);
            _didIteratorError = true;
            _iteratorError = _context2.t0;

          case 21:
            _context2.prev = 21;
            _context2.prev = 22;

            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }

          case 24:
            _context2.prev = 24;

            if (!_didIteratorError) {
              _context2.next = 27;
              break;
            }

            throw _iteratorError;

          case 27:
            return _context2.finish(24);

          case 28:
            return _context2.finish(21);

          case 29:
            userId = document.getElementById('userId').value;
            videoId = window.location.href.split('/videos/')[1];
            comment = document.getElementsByClassName('commentUpdateInput').comment.value;
            _context2.next = 34;
            return (0, _axios["default"])({
              url: "/api/".concat(videoId, "/comment/updateajax"),
              method: 'POST',
              data: {
                videoId: videoId,
                userId: userId,
                index: index,
                comment: comment
              }
            });

          case 34:
            response = _context2.sent;

            if (response.status === 200) {
              complete(event, comment);
            }

          case 36:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[5, 17, 21, 29], [22,, 24, 28]]);
  }));

  return function updateCAjax(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var inputNode = function inputNode(event) {
  var updateSource = event.path[1].id !== '' ? updateC : updateCAjax;
  var targetNode = event.target.closest('.comment__group');
  var haveToChange = targetNode.childNodes[1];
  var dot = targetNode.childNodes[2];
  var comment = haveToChange.childNodes[1].innerHTML;
  var span = document.createElement('span');
  var input = document.createElement('input');
  var form = document.createElement('form');
  var div = document.createElement('div');
  var div1 = document.createElement('div');
  var i1 = document.createElement('i');
  var div2 = document.createElement('div');
  var i2 = document.createElement('i');
  form.className = 'commentUpdateForm';
  form.id = 'commentUpdateForm';
  input.type = 'text';
  input.name = 'comment';
  input.className = 'commentUpdateInput';
  input.placeholder = comment;
  input.value = comment;
  form.appendChild(input);
  form.addEventListener('submit', updateSource);
  i1.className = 'far fa-check-circle';
  i2.className = 'far fa-times-circle';
  div1.appendChild(i1);
  div1.className = 'checkBtn';
  div1.title = '등록';
  div1.addEventListener('click', updateSource);
  div2.title = '취소';
  div2.className = 'cancelBtn';
  div2.appendChild(i2);
  div.appendChild(div1);
  div.appendChild(div2);
  div.className = 'checkCancelBtn';
  div2.addEventListener('click', updateCancel);
  dot.after(div);
  dot.after(form);
  haveToChange.appendChild(span);
  haveToChange.style.display = 'none';
  dot.style.display = 'none';
};

var updateCancel = function updateCancel(event) {
  var parent = event.target.parentNode.parentNode.parentNode;
  var targetDiv1 = parent.childNodes[1];
  var targetDiv2 = parent.childNodes[2];
  var targetDiv3 = parent.childNodes[3];
  var targetDiv4 = parent.childNodes[4];
  var beforeComment = targetDiv1.childNodes[1].innerHTML;
  var afterComment = targetDiv3.childNodes[0].value;

  if (beforeComment !== afterComment) {
    if (confirm('내용이 수정되었습니다 취소할까요?') === false) {
      targetDiv1.childNodes[2].remove();
      targetDiv3.remove();
      targetDiv4.remove();
      targetDiv1.style.display = 'flex';
      targetDiv2.style.display = 'flex';
    }
  } else {
    targetDiv1.childNodes[2].remove();
    targetDiv3.remove();
    targetDiv4.remove();
    targetDiv1.style.display = 'flex';
    targetDiv2.style.display = 'flex';
  }
};

var complete = function complete(event, comment) {
  var parent = event.target.closest('.comment__group');
  parent.childNodes[1].childNodes[1].innerHTML = comment;
  parent.childNodes[1].childNodes[2].remove();
  parent.childNodes[1].style.display = 'flex';
  parent.childNodes[2].style.display = 'flex';
  parent.childNodes[4].remove();
  parent.childNodes[3].remove(); //   parent.childNodes[4].remove();
};

function init() {
  Array.from(updateComment).forEach(function (element) {
    element.addEventListener('click', inputNode);
  });
}

if (updateComment) {
  init();
}

var _default = inputNode;
exports["default"] = _default;