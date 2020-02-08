/* eslint-disable no-plusplus */
/* eslint-disable no-continue */
/* eslint-disable no-restricted-syntax */
import axios from 'axios';

const addCommentForm = document.getElementById('jsAddComment');
const commentList = document.getElementById('jsCommentList');
const commentNumber = document.getElementById('jsCommentNumber');
const shortCut = document.getElementsByClassName('jsShortCut');
const dropDiv = document.getElementsByClassName('drop__div');
const updateComment = document.getElementsByClassName('updateComment');
const deleteComment = document.getElementsByClassName('deleteComment');
const commentArray = document.getElementsByClassName('commentId');
let avatar;
let name;

const increaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) + 1;
};

const addComment = (comment) => {
  const li = document.createElement('li');
  const span = document.createElement('span');
  const span1 = document.createElement('span');
  const img = document.createElement('img');
  const commentGroup = document.createElement('div');
  const menuIcon = document.createElement('div');
  const i = document.createElement('i');
  const dropdiv = document.createElement('div');
  const dropmenu = document.createElement('div');

  const span2 = document.createElement('span');
  const span3 = document.createElement('span');
  const a1 = document.createElement('a');
  const a2 = document.createElement('a');
  const i1 = document.createElement('i');
  const i2 = document.createElement('i');
  commentGroup.className = 'comment__group';
  img.src = avatar;
  span.innerHTML = name;
  li.appendChild(span);
  span1.innerHTML = comment;
  li.appendChild(span1);
  commentGroup.appendChild(img);
  commentGroup.appendChild(li);
  i1.className = 'fas fa-pencil-alt';
  i2.className = 'fas fa-trash-alt';
  a1.appendChild(i1);
  a2.appendChild(i2);
  a1.innerHTML += '수정하기';
  a2.innerHTML += '삭제하기';
  span2.appendChild(a1);
  span2.className = 'updateComment';
  span3.appendChild(a2);
  span3.className = 'deleteComment';
  dropdiv.appendChild(span2);
  dropdiv.appendChild(span3);
  dropdiv.className = 'drop__menu';
  dropmenu.appendChild(dropdiv);
  dropmenu.className = 'drop__div';
  i.className = 'jsShortCut fas fa-ellipsis-v';
  menuIcon.appendChild(i);
  menuIcon.appendChild(dropmenu);
  menuIcon.className = 'menuIcon';
  commentGroup.appendChild(menuIcon);
  menuIcon.addEventListener('click', toggleDropDown);

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
  name = document.getElementById('hiddenName').value;
  avatar = document.getElementById('hiddenImg').value;
  sendComment(comment);
  commentInput.value = '';
};

const toggleDropDown = (event) => {
  let index = 0;
  for (const item of shortCut) {
    if (item === event.target) {
      break;
    }
    index += 1;
  }

  const target = dropDiv[index].style;
  if (target.display === '') {
    for (let i = 0; i < dropDiv.length; i++) {
      dropDiv[i].style.display = '';
    }
    target.display = 'block';
  } else {
    target.display = '';
  }
};

const deleteC = async (event) => {
  const commentId = event.target.parentNode.getAttribute('id');
  const videoId = window.location.href.split('/videos/')[1];
  const response = await axios({
    url: `/api/${commentId}/comment/delete`,
    method: 'POST',
    data: {
      commentId,
      videoId
    }
  });
  if (response.status === 200) {
    alert('악!!!');
  }
};

function init() {
  addCommentForm.addEventListener('submit', handleSubmit);
  Array.from(shortCut).forEach((element) => {
    element.addEventListener('click', toggleDropDown);
  });

  Array.from(deleteComment).forEach((element) => {
    element.addEventListener('click', deleteC);
  });
}

if (addCommentForm) {
  init();
}
