import axios from 'axios';

const deleteComment = document.getElementsByClassName('deleteComment');

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
}

if (deleteComment) {
  init();
}

export default deleteC;
