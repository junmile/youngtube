import express from 'express';
import routes from '../routes';
import { videoDetail, postAddComment } from '../controllers/videoController';

const apiRouter = express.Router();

apiRouter.get(routes.registerView, videoDetail);
apiRouter.post(routes.addComment, postAddComment);

export default apiRouter;
