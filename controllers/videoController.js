import { response } from 'express';
import routes from '../routes';
import Video from '../models/Video';
import User from '../models/User';
import Comment from '../models/Comment';

// Home

export const home = async (req, res) => {
  try {
    const videos = await Video.find({})
      .sort({ _id: -1 })
      .populate('creator');
    res.render('home', { pageTitle: 'Home', videos });
  } catch (error) {
    res.render('home', { pageTitle: 'Home', videos: [] });
  }
};

// Search

export const search = async (req, res) => {
  const {
    query: { term: searchingBy }
  } = req;
  let videos = [];
  try {
    videos = await Video.find({
      title: { $regex: searchingBy, $options: 'i' }
    });
    console.log(`비디오배열: ${videos}`);
  } catch (error) {
    console.log(error);
  }

  res.render('search', { pageTitle: 'Search', searchingBy, videos });
};

// Upload

export const getUpload = (req, res) =>
  res.render('upload', { pageTitle: 'Upload' });

export const postUpload = async (req, res) => {
  const {
    body: { title, description },
    file: { path }
  } = req;
  const newVideo = await Video.create({
    fileUrl: path,
    title,
    description,
    creator: req.user.id
  });
  req.user.videos.push(newVideo.id);
  req.user.save();
  res.redirect(routes.videoDetail(newVideo.id));
};

// Video Detail

export const videoDetail = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const video = await Video.findById(id)
      .populate('creator')
      .populate({
        path: 'comments',
        populate: { path: 'creator' }
      });
    const user = await User.findById(req.user.id);
    video.views += 1;
    video.save();
    res.status(200);
    res.render('videoDetail', {
      pageTitle: video.title,
      video,
      user
    });
  } catch (error) {
    res.status(400);
    res.redirect(routes.home);
  }
};

// Edit Video

export const getEditVideo = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const video = await Video.findById(id);
    res.render('editVideo', { pageTitle: `Edit ${video.title}`, video });
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const postEditVideo = async (req, res) => {
  const {
    params: { id },
    body: { title, description }
  } = req;
  try {
    await Video.findOneAndUpdate({ _id: id }, { title, description });
    res.redirect(routes.videoDetail(id));
  } catch (error) {
    res.redirect(routes.home);
  }
};

// Delete Video

export const deleteVideo = async (req, res) => {
  const {
    params: { id }
  } = req;

  try {
    await Video.findOneAndRemove({ _id: id });

    // req.user.videos.remove(id);
    // req.user.save();

    // const deleteElements = await User.findByIdAndUpdate(req.user.id, {
    //   $pull: { videos: id }
    // });

    await User.update({ _id: req.user.id }, { $pull: { videos: id } });
  } catch (error) {
    console.log(error);
  }

  res.redirect(routes.home);
};

// Add Comment
export const postAddComment = async (req, res) => {
  const {
    params: { id },
    body: { comment },
    user
  } = req;
  try {
    const video = await Video.findById(id);
    const newComment = await Comment.create({
      text: comment,
      creator: user
    });
    video.comments.push(newComment.id);
    video.save();
  } catch (error) {
    console.log(error);
    res.status(400);
  } finally {
    res.end();
  }
};
