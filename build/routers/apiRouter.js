"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _routes = _interopRequireDefault(require("../routes"));

var _videoController = require("../controllers/videoController");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var apiRouter = _express["default"].Router();

apiRouter.get(_routes["default"].registerView, _videoController.videoDetail);
apiRouter.post(_routes["default"].addComment, _videoController.postAddComment);
apiRouter.post(_routes["default"].deleteComment, _videoController.postDeleteComment);
apiRouter.post(_routes["default"].deleteCommentAjax, _videoController.postDeleteCommentAjax);
apiRouter.post(_routes["default"].updateComment, _videoController.postUpdateComment);
apiRouter.post(_routes["default"].updateCommentAjax, _videoController.postUpdateCommentAjax);
var _default = apiRouter;
exports["default"] = _default;