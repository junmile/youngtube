import axios from 'axios';

const addCommentForm = document.getElementById('jsAddComment');
const commentList = document.getElementById('jsCommentList');
const commentNumber = document.getElementById('jsCommentNumber');

const increaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) + 1;
};
let avatar;
const addComment = (comment) => {
  const li = document.createElement('li');
  const span = document.createElement('span');
  const img = document.createElement('img');
  const commentGroup = document.createElement('div');
  commentGroup.className = 'comment__group';
  img.src = avatar;
  span.innerHTML = comment;
  li.appendChild(span);
  commentGroup.appendChild(img);
  commentGroup.appendChild(li);
  commentList.prepend(commentGroup);
  increaseNumber();
};

const sendComment = async (comment) => {
  const videoId = window.location.href.split('/videos/')[1];
  const response = await axios({
    url: `/api/${videoId}/comment`,
    method: 'POST',
    data: {
      comment
    }
  });
  if (response.status === 200) {
    addComment(comment);
  }
};

const handleSubmit = (event) => {
  event.preventDefault();
  const commentInput = addCommentForm.querySelector('input');
  const comment = commentInput.value;
  avatar = document.getElementById('hiddenImg').value;
  sendComment(comment);
  commentInput.value = '';
};

function init() {
  addCommentForm.addEventListener('submit', handleSubmit);
}

if (addCommentForm) {
  init();
}
