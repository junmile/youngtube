"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postUpdateCommentAjax = exports.postUpdateComment = exports.postDeleteCommentAjax = exports.postDeleteComment = exports.postAddComment = exports.deleteVideo = exports.postEditVideo = exports.getEditVideo = exports.videoDetail = exports.postUpload = exports.getUpload = exports.search = exports.home = void 0;

var _express = require("express");

var _routes = _interopRequireDefault(require("../routes"));

var _Video = _interopRequireDefault(require("../models/Video"));

var _User = _interopRequireDefault(require("../models/User"));

var _Comment = _interopRequireDefault(require("../models/Comment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// Home
var home =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var videos;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _Video["default"].find({}).sort({
              _id: -1
            }).populate('creator');

          case 3:
            videos = _context.sent;
            res.render('home', {
              pageTitle: 'Home',
              videos: videos
            });
            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            res.render('home', {
              pageTitle: 'Home',
              videos: []
            });

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));

  return function home(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}(); // Search


exports.home = home;

var search =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res) {
    var searchingBy, videos;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            searchingBy = req.query.term;
            videos = [];
            _context2.prev = 2;
            _context2.next = 5;
            return _Video["default"].find({
              title: {
                $regex: searchingBy,
                $options: 'i'
              }
            }).populate('creator');

          case 5:
            videos = _context2.sent;
            _context2.next = 11;
            break;

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](2);
            console.log(_context2.t0);

          case 11:
            res.render('search', {
              pageTitle: 'Search',
              searchingBy: searchingBy,
              videos: videos
            });

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[2, 8]]);
  }));

  return function search(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}(); // Upload


exports.search = search;

var getUpload = function getUpload(req, res) {
  return res.render('upload', {
    pageTitle: 'Upload'
  });
};

exports.getUpload = getUpload;

var postUpload =
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(req, res) {
    var _req$body, title, description, location, newVideo;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _req$body = req.body, title = _req$body.title, description = _req$body.description, location = req.file.location;
            _context3.next = 3;
            return _Video["default"].create({
              fileUrl: location,
              title: title,
              description: description,
              creator: req.user.id
            });

          case 3:
            newVideo = _context3.sent;
            req.user.videos.push(newVideo.id);
            req.user.save();
            res.redirect(_routes["default"].videoDetail(newVideo.id));

          case 7:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function postUpload(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}(); // Video Detail


exports.postUpload = postUpload;

var videoDetail =
/*#__PURE__*/
function () {
  var _ref4 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(req, res) {
    var id, video, user;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            id = req.params.id;
            _context4.prev = 1;
            _context4.next = 4;
            return _Video["default"].findById(id).populate('creator').populate({
              path: 'comments',
              populate: {
                path: 'creator'
              }
            });

          case 4:
            video = _context4.sent;
            _context4.next = 7;
            return _User["default"].findById(req.user.id);

          case 7:
            user = _context4.sent;
            video.views += 1;
            video.save();
            res.status(200);
            res.render('videoDetail', {
              pageTitle: video.title,
              video: video,
              user: user
            });
            _context4.next = 18;
            break;

          case 14:
            _context4.prev = 14;
            _context4.t0 = _context4["catch"](1);
            res.status(400);
            res.redirect(_routes["default"].home);

          case 18:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[1, 14]]);
  }));

  return function videoDetail(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}(); // Edit Video


exports.videoDetail = videoDetail;

var getEditVideo =
/*#__PURE__*/
function () {
  var _ref5 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5(req, res) {
    var id, video;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            id = req.params.id;
            _context5.prev = 1;
            _context5.next = 4;
            return _Video["default"].findById(id);

          case 4:
            video = _context5.sent;
            res.render('editVideo', {
              pageTitle: "Edit ".concat(video.title),
              video: video
            });
            _context5.next = 11;
            break;

          case 8:
            _context5.prev = 8;
            _context5.t0 = _context5["catch"](1);
            res.redirect(_routes["default"].home);

          case 11:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[1, 8]]);
  }));

  return function getEditVideo(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.getEditVideo = getEditVideo;

var postEditVideo =
/*#__PURE__*/
function () {
  var _ref6 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee6(req, res) {
    var id, _req$body2, title, description;

    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            id = req.params.id, _req$body2 = req.body, title = _req$body2.title, description = _req$body2.description;
            _context6.prev = 1;
            _context6.next = 4;
            return _Video["default"].findOneAndUpdate({
              _id: id
            }, {
              title: title,
              description: description
            });

          case 4:
            res.redirect(_routes["default"].videoDetail(id));
            _context6.next = 10;
            break;

          case 7:
            _context6.prev = 7;
            _context6.t0 = _context6["catch"](1);
            res.redirect(_routes["default"].home);

          case 10:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[1, 7]]);
  }));

  return function postEditVideo(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}(); // Delete Video


exports.postEditVideo = postEditVideo;

var deleteVideo =
/*#__PURE__*/
function () {
  var _ref7 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee7(req, res) {
    var id;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            id = req.params.id;
            _context7.prev = 1;
            _context7.next = 4;
            return _Video["default"].findOneAndRemove({
              _id: id
            });

          case 4:
            _context7.next = 6;
            return _User["default"].update({
              _id: req.user.id
            }, {
              $pull: {
                videos: id
              }
            });

          case 6:
            _context7.next = 11;
            break;

          case 8:
            _context7.prev = 8;
            _context7.t0 = _context7["catch"](1);
            console.log(_context7.t0);

          case 11:
            res.redirect(_routes["default"].home);

          case 12:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[1, 8]]);
  }));

  return function deleteVideo(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}(); // Add Comment


exports.deleteVideo = deleteVideo;

var postAddComment =
/*#__PURE__*/
function () {
  var _ref8 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee8(req, res) {
    var id, _req$body3, comment, videoId, user, video, newComment;

    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            id = req.params.id, _req$body3 = req.body, comment = _req$body3.comment, videoId = _req$body3.videoId, user = req.user;
            _context8.prev = 1;
            _context8.next = 4;
            return _Video["default"].findById(id);

          case 4:
            video = _context8.sent;
            _context8.next = 7;
            return _Comment["default"].create({
              text: comment,
              creator: user,
              video: videoId
            });

          case 7:
            newComment = _context8.sent;
            video.comments.push(newComment.id);
            video.save();
            _context8.next = 16;
            break;

          case 12:
            _context8.prev = 12;
            _context8.t0 = _context8["catch"](1);
            console.log(_context8.t0);
            res.status(400);

          case 16:
            _context8.prev = 16;
            res.end();
            return _context8.finish(16);

          case 19:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[1, 12, 16, 19]]);
  }));

  return function postAddComment(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();

exports.postAddComment = postAddComment;

var postDeleteComment =
/*#__PURE__*/
function () {
  var _ref9 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee9(req, res) {
    var _req$body4, commentId, videoId;

    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _req$body4 = req.body, commentId = _req$body4.commentId, videoId = _req$body4.videoId;
            _context9.prev = 1;
            _context9.next = 4;
            return _Comment["default"].deleteOne({
              _id: commentId
            });

          case 4:
            _context9.next = 6;
            return _Video["default"].update({
              _id: videoId
            }, {
              $pull: {
                comments: commentId
              }
            });

          case 6:
            res.status(200);
            res.send();
            _context9.next = 13;
            break;

          case 10:
            _context9.prev = 10;
            _context9.t0 = _context9["catch"](1);
            res.status(400);

          case 13:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, null, [[1, 10]]);
  }));

  return function postDeleteComment(_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}();

exports.postDeleteComment = postDeleteComment;

var postDeleteCommentAjax =
/*#__PURE__*/
function () {
  var _ref10 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee10(req, res) {
    var _req$body5, index, userId, videoId, arr, idByIndex;

    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _req$body5 = req.body, index = _req$body5.index, userId = _req$body5.userId, videoId = _req$body5.videoId;
            _context10.prev = 1;
            _context10.next = 4;
            return _Comment["default"].find().where('creator').equals(userId).where('video').equals(videoId).sort('-createdAt');

          case 4:
            arr = _context10.sent;
            idByIndex = arr[index].id;
            _context10.next = 8;
            return _Comment["default"].findOneAndDelete({
              _id: idByIndex
            });

          case 8:
            _context10.next = 10;
            return _Video["default"].update({
              _id: videoId
            }, {
              $pull: {
                comments: idByIndex
              }
            });

          case 10:
            res.status(200);
            res.send();
            _context10.next = 17;
            break;

          case 14:
            _context10.prev = 14;
            _context10.t0 = _context10["catch"](1);
            res.status(400);

          case 17:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10, null, [[1, 14]]);
  }));

  return function postDeleteCommentAjax(_x19, _x20) {
    return _ref10.apply(this, arguments);
  };
}();

exports.postDeleteCommentAjax = postDeleteCommentAjax;

var postUpdateComment =
/*#__PURE__*/
function () {
  var _ref11 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee11(req, res) {
    var _req$body6, commentId, comment;

    return regeneratorRuntime.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _req$body6 = req.body, commentId = _req$body6.commentId, comment = _req$body6.comment;
            _context11.prev = 1;
            _context11.next = 4;
            return _Comment["default"].findByIdAndUpdate(commentId, {
              text: comment
            });

          case 4:
            res.status(200);
            res.send();
            _context11.next = 11;
            break;

          case 8:
            _context11.prev = 8;
            _context11.t0 = _context11["catch"](1);
            res.status(400);

          case 11:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11, null, [[1, 8]]);
  }));

  return function postUpdateComment(_x21, _x22) {
    return _ref11.apply(this, arguments);
  };
}();

exports.postUpdateComment = postUpdateComment;

var postUpdateCommentAjax =
/*#__PURE__*/
function () {
  var _ref12 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee12(req, res) {
    var _req$body7, videoId, userId, index, comment, arr, idByIndex;

    return regeneratorRuntime.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            _req$body7 = req.body, videoId = _req$body7.videoId, userId = _req$body7.userId, index = _req$body7.index, comment = _req$body7.comment;
            _context12.prev = 1;
            _context12.next = 4;
            return _Comment["default"].find().where('creator').equals(userId).where('video').equals(videoId).sort('-createdAt');

          case 4:
            arr = _context12.sent;
            idByIndex = arr[index].id;
            _context12.next = 8;
            return _Comment["default"].findByIdAndUpdate(idByIndex, {
              text: comment
            });

          case 8:
            res.status(200);
            res.send();
            _context12.next = 15;
            break;

          case 12:
            _context12.prev = 12;
            _context12.t0 = _context12["catch"](1);
            res.status(400);

          case 15:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12, null, [[1, 12]]);
  }));

  return function postUpdateCommentAjax(_x23, _x24) {
    return _ref12.apply(this, arguments);
  };
}();

exports.postUpdateCommentAjax = postUpdateCommentAjax;