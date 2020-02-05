import express from 'express';
import routes from '../routes';
import { videoDetail } from '../controllers/videoController';

const apiRouter = express.Router();

apiRouter.get(routes.registerView, videoDetail);

export default apiRouter;
