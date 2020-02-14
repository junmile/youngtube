import axios from 'axios';

const updateComment = document.getElementsByClassName('updateComment');

const updateC = async (event) => {
  let index = 0;
  for (const item of updateComment) {
    if (event.target === item) {
      break;
    }
    index += 1;
  }
  const videoId = window.location.href.split('/videos/')[1];
  const commentId = document.getElementsByClassName('drop__menu')[index].id;
  inputNode(event.target);

  const response = await axios({
    url: `/api/${videoId}/comment/update`,
    method: 'POST',
    data: { videoId, commentId }
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
  if (response.status === 200) {
  }
};

const inputNode = (target) => {
  const haveToChange =
    target.parentNode.parentNode.parentNode.parentNode.childNodes[1];
  const img = target.parentNode.parentNode.parentNode.parentNode.childNodes[0];
  const dot = target.parentNode.parentNode.parentNode.parentNode.childNodes[2];
  const commentValue = haveToChange.childNodes[1].innerHTML;
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
  input.placeholder = commentValue;
  input.value = commentValue;
  form.appendChild(input);

  haveToChange.remove();
  dot.remove();
  i1.className = 'far fa-check-circle';
  i2.className = 'far fa-times-circle';
  div1.appendChild(i1);
  div1.className = 'checkBtn';
  div1.title = '등록';
  div2.title = '취소';
  div2.className = 'cancelBtn';
  div2.appendChild(i2);
  div.appendChild(div1);
  div.appendChild(div2);
  div.className = 'checkCancelBtn';

  img.after(div);
  img.after(form);
  haveToChange.appendChild(span);
};

function init() {
  Array.from(updateComment).forEach((element) => {
    element.addEventListener('click', updateC);
  });
}

if (updateComment) {
  init();
}

export default updateCAjax;
