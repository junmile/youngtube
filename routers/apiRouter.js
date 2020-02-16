import express from 'express';
import routes from '../routes';
import {
  videoDetail,
  postAddComment,
  postDeleteComment,
  postDeleteCommentAjax,
  postUpdateComment,
  postUpdateCommentAjax
} from '../controllers/videoController';

const apiRouter = express.Router();

apiRouter.get(routes.registerView, videoDetail);
apiRouter.post(routes.addComment, postAddComment);
apiRouter.post(routes.deleteComment, postDeleteComment);
apiRouter.post(routes.deleteCommentAjax, postDeleteCommentAjax);
apiRouter.post(routes.updateComment, postUpdateComment);
apiRouter.post(routes.updateCommentAjax, postUpdateCommentAjax);

export default apiRouter;
