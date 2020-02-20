"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var deleteComment = document.getElementsByClassName('deleteComment');
var deleteCommentAjax = document.getElementsByClassName('deleteCommentAjax');
var jsCountNumber = document.getElementById('jsCommentNumber');
var comments = document.getElementById('word');

var deleteCAjax =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(event) {
    var userId, videoId, index, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, item, response;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            userId = document.getElementById('userId').value;
            videoId = window.location.href.split('/videos/')[1];
            index = 0;
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 6;
            _iterator = deleteCommentAjax[Symbol.iterator]();

          case 8:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context.next = 16;
              break;
            }

            item = _step.value;

            if (!(item === event.target)) {
              _context.next = 12;
              break;
            }

            return _context.abrupt("break", 16);

          case 12:
            index += 1;

          case 13:
            _iteratorNormalCompletion = true;
            _context.next = 8;
            break;

          case 16:
            _context.next = 22;
            break;

          case 18:
            _context.prev = 18;
            _context.t0 = _context["catch"](6);
            _didIteratorError = true;
            _iteratorError = _context.t0;

          case 22:
            _context.prev = 22;
            _context.prev = 23;

            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }

          case 25:
            _context.prev = 25;

            if (!_didIteratorError) {
              _context.next = 28;
              break;
            }

            throw _iteratorError;

          case 28:
            return _context.finish(25);

          case 29:
            return _context.finish(22);

          case 30:
            _context.next = 32;
            return (0, _axios["default"])({
              url: "/api/".concat(videoId, "/comment/deleteajax"),
              method: 'POST',
              data: {
                index: index,
                userId: userId,
                videoId: videoId
              }
            });

          case 32:
            response = _context.sent;

            if (response.status === 200) {
              jsCountNumber.innerHTML = Number(jsCountNumber.innerHTML) - 1;

              if (Number(jsCountNumber.innerHTML) <= 1) {
                comments.innerHTML = ' comment';
              }

              event.target.parentNode.parentNode.parentNode.parentNode.remove();
            }

          case 34:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[6, 18, 22, 30], [23,, 25, 29]]);
  }));

  return function deleteCAjax(_x) {
    return _ref.apply(this, arguments);
  };
}();

var deleteC =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(event) {
    var commentId, videoId, response;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            commentId = event.target.parentNode.getAttribute('id');
            videoId = window.location.href.split('/videos/')[1];
            _context2.next = 4;
            return (0, _axios["default"])({
              url: "/api/".concat(commentId, "/comment/delete"),
              method: 'POST',
              data: {
                commentId: commentId,
                videoId: videoId
              }
            });

          case 4:
            response = _context2.sent;

            if (response.status === 200) {
              jsCountNumber.innerHTML = Number(jsCountNumber.innerHTML) - 1;

              if (Number(jsCountNumber.innerHTML) <= 1) {
                comments.innerHTML = ' comment';
              }

              event.target.parentNode.parentNode.parentNode.parentNode.remove();
            }

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function deleteC(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

function init() {
  Array.from(deleteComment).forEach(function (element) {
    element.addEventListener('click', deleteC);
  });
  Array.from(deleteCommentAjax).forEach(function (element) {
    element.addEventListener('click', deleteCAjax);
  });
}

if (deleteComment) {
  init();
}

var _default = deleteCAjax;
exports["default"] = _default;