import axios from 'axios';

const updateComment = document.getElementsByClassName('updateComment');
const commentGroup = document.getElementsByClassName('comment__group');
const updateC = async (event) => {
  event.preventDefault();
  const videoId = window.location.href.split('/videos/')[1];
  const commentId = event.target.closest('.comment__group').childNodes[2]
    .childNodes[1].childNodes[0].id;
  const comment = document.getElementsByClassName('commentUpdateInput').comment
    .value;

  const response = await axios({
    url: `/api/${videoId}/comment/update`,
    method: 'POST',
    data: { commentId, comment }
  });
  if (response.status === 200) {
    complete(event, comment);
  }
};

const updateCAjax = async (event) => {
  event.preventDefault();

  let index = 0;
  for (const item of commentGroup) {
    if (event.target.closest('.comment__group') === item) {
      break;
    }
    index += 1;
  }
  const userId = document.getElementById('userId').value;
  const videoId = window.location.href.split('/videos/')[1];
  const comment = document.getElementsByClassName('commentUpdateInput').comment
    .value;
  const response = await axios({
    url: `/api/${videoId}/comment/updateajax`,
    method: 'POST',
    data: {
      videoId,
      userId,
      index,
      comment
    }
  });
  if (response.status === 200) {
    complete(event, comment);
  }
};

const inputNode = (event) => {
  const updateSource = event.path[1].id !== '' ? updateC : updateCAjax;

  const targetNode = event.target.closest('.comment__group');
  const haveToChange = targetNode.childNodes[1];
  const dot = targetNode.childNodes[2];
  const comment = haveToChange.childNodes[1].innerHTML;
  const span = document.createElement('span');
  const input = document.createElement('input');
  const form = document.createElement('form');
  const div = document.createElement('div');
  const div1 = document.createElement('div');
  const i1 = document.createElement('i');
  const div2 = document.createElement('div');
  const i2 = document.createElement('i');
  form.className = 'commentUpdateForm';
  form.id = 'commentUpdateForm';
  input.type = 'text';
  input.name = 'comment';
  input.className = 'commentUpdateInput';
  input.placeholder = comment;
  input.value = comment;
  form.appendChild(input);
  form.addEventListener('submit', updateSource);

  i1.className = 'far fa-check-circle';
  i2.className = 'far fa-times-circle';
  div1.appendChild(i1);
  div1.className = 'checkBtn';
  div1.title = '등록';
  div1.addEventListener('click', updateSource);
  div2.title = '취소';
  div2.className = 'cancelBtn';
  div2.appendChild(i2);
  div.appendChild(div1);
  div.appendChild(div2);
  div.className = 'checkCancelBtn';
  div2.addEventListener('click', updateCancel);

  dot.after(div);
  dot.after(form);
  haveToChange.appendChild(span);
  haveToChange.style.display = 'none';
  dot.style.display = 'none';
};

const updateCancel = (event) => {
  const parent = event.target.parentNode.parentNode.parentNode;

  const targetDiv1 = parent.childNodes[1];
  const targetDiv2 = parent.childNodes[2];
  const targetDiv3 = parent.childNodes[3];
  const targetDiv4 = parent.childNodes[4];
  const beforeComment = targetDiv1.childNodes[1].innerHTML;
  const afterComment = targetDiv3.childNodes[0].value;
  if (beforeComment !== afterComment) {
    if (confirm('내용이 수정되었습니다 취소할까요?') === false) {
      targetDiv1.childNodes[2].remove();
      targetDiv3.remove();
      targetDiv4.remove();
      targetDiv1.style.display = 'flex';
      targetDiv2.style.display = 'flex';
    }
  } else {
    targetDiv1.childNodes[2].remove();
    targetDiv3.remove();
    targetDiv4.remove();
    targetDiv1.style.display = 'flex';
    targetDiv2.style.display = 'flex';
  }
};

const complete = (event, comment) => {
  const parent = event.target.closest('.comment__group');
  parent.childNodes[1].childNodes[1].innerHTML = comment;
  parent.childNodes[1].childNodes[2].remove();
  parent.childNodes[1].style.display = 'flex';
  parent.childNodes[2].style.display = 'flex';
  parent.childNodes[4].remove();
  parent.childNodes[3].remove();
  //   parent.childNodes[4].remove();
};

function init() {
  Array.from(updateComment).forEach((element) => {
    element.addEventListener('click', inputNode);
  });
}

if (updateComment) {
  init();
}

export default inputNode;
