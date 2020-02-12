import axios from 'axios';

const deleteComment = document.getElementsByClassName('deleteComment');
const deleteCommentAjax = document.getElementsByClassName('deleteCommentAjax');

const deleteCAjax = async (event) => {
  const userId = document.getElementById('userId').value;
  const videoId = window.location.href.split('/videos/')[1];
  let index = 0;
  for (const item of deleteCommentAjax) {
    if (item === event.target) {
      break;
    }
    index += 1;
  }
  console.log(index);
  console.log(userId);
  console.log(videoId);
  const response = await axios({
    url: `/api/${videoId}/comment/deleteajax`,
    method: 'POST',
    data: {
      index,
      userId,
      videoId
    }
  });
};

const deleteC = async (event) => {
  const commentId = event.target.parentNode.getAttribute('id');
  const videoId = window.location.href.split('/videos/')[1];
  console.log('1번');
  console.log(commentId);
  console.log(videoId);
  const response = await axios({
    url: `/api/${commentId}/comment/delete`,
    method: 'POST',
    data: {
      commentId,
      videoId
    }
  });
  if (response.status === 200) {
  }
};

function init() {
  Array.from(deleteComment).forEach((element) => {
    element.addEventListener('click', deleteC);
  });
  Array.from(deleteCommentAjax).forEach((element) => {
    element.addEventListener('click', deleteCAjax);
  });
}

if (deleteComment) {
  init();
}

export default deleteCAjax;
