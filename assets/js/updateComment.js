import axios from 'axios';

const updateComment = document.getElementsByClassName('updateComment');

const updateC = async (event) => {
  event.preventDefault();
  console.log('시작');
  const videoId = window.location.href.split('/videos/')[1];
  const commentId = event.target.closest('.comment__group').childNodes[2]
    .childNodes[1].childNodes[0].id;
  inputNode(event.target);
  const comment = document.getElementsByClassName('commentUpdateInput');
  console.log(comment);
  const response = await axios({
    url: `/api/${videoId}/comment/update`,
    method: 'POST',
    data: { videoId, commentId, comment }
  });
};

const updateCAjax = async (event) => {
  let index = 0;
  for (const item of updateComment) {
    if (event.target === item) {
      break;
    }
    index += 1;
  }
  const userId = document.getElementById('userId').value;
  const videoId = window.location.href.split('/videos/')[1];
  const response = await axios({
    url: `/api/${videoId}/comment/updateajax`,
    method: 'POST',
    data: {
      userId,
      videoId,
      index
    }
  });
};

const inputNode = (event) => {
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
  form.addEventListener('submit', updateC);

  i1.className = 'far fa-check-circle';
  i2.className = 'far fa-times-circle';
  div1.appendChild(i1);
  div1.className = 'checkBtn';
  div1.title = '등록';
  div1.addEventListener('click', updateC);
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

function init() {
  Array.from(updateComment).forEach((element) => {
    element.addEventListener('click', inputNode);
  });
}

if (updateComment) {
  init();
}

export default updateCAjax;
