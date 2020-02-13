import axios from 'axios';

const updateComment = document.getElementsByClassName('updateComment');

const updateC = (event) => {
  let index = 0;
  for (const item of updateComment) {
    if (event.target === item) {
      break;
    }
    index += 1;
  }
  console.log(index);
};

const updateCAjax = (event) => {
  let index = 0;
  for (const item of updateComment) {
    if (event.target === item) {
      break;
    }
    index += 1;
  }
  console.log(index);
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
