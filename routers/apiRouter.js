import express from 'express';
import routes from '../routes';
import {
  videoDetail,
  postAddComment,
  postDeleteComment,
  postDeleteCommentAjax
} from '../controllers/videoController';

const apiRouter = express.Router();

apiRouter.get(routes.registerView, videoDetail);
apiRouter.post(routes.addComment, postAddComment);
apiRouter.post(routes.deleteComment, postDeleteComment);
apiRouter.post(routes.deleteCommentAjax, postDeleteCommentAjax);

export default apiRouter;
