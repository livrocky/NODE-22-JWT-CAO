import { checkInput, clearErrorsArr, errorsArr } from './modules/validation.js';

/* eslint-disable no-use-before-define */
const BASE_URL = 'http://localhost:3000';

const formEl = document.getElementById('login');
const errEl = document.getElementById('err');
const errorMsg = document.querySelectorAll('.error-msg');
const emailEl = formEl.elements.email;
// const emailInputEl = formEl.elements.email;
// const passwordInputEl = formEl.elements.password;

emailEl.addEventListener('blur', (event) => {
  clearErrors();
  const el = event.currentTarget;
  checkInput(el.value, el.name, ['required', 'minLength-4', 'email']);
  handleError(errorsArr);
});

formEl.addEventListener('submit', async (event) => {
  event.preventDefault();
  console.log('js submit form');

  const loginObj = {
    email: formEl.elements.email.value.trim(),
    password: formEl.elements.password.value.trim(),
  };
  clearErrors();

  // TODO front end validation
  checkInput(loginObj.email, 'email', ['required', 'minLength-4', 'email']);
  checkInput(loginObj.password, 'password', ['required', 'minLength-5', 'maxLength-10']);

  // console.log('FE errorsArr ===', errorsArr);
  console.log('loginObj ===', loginObj);

  if (errorsArr.length) {
    handleError(errorsArr);
    return;
  }

  const resp = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginObj),
  });
  const dataInJs = await resp.json();
  console.log('dataInJs ===', dataInJs);

  if (dataInJs.success === true) {
    console.log('login success');
    errEl.textContent = '';
    // issaugoti reiksme localStorage
    // eslint-disable-next-line prefer-destructuring
    const token = dataInJs.token;
    localStorage.setItem('articleUserToken', token);
    window.location.href = 'articles.html';
  } else {
    console.log('login fail');
    handleError(dataInJs);
  }
});

function handleError(msg) {
  errEl.textContent = '';
  if (typeof msg === 'string') {
    errEl.textContent = msg;
  }
  if (Array.isArray(msg)) {
    // msg.forEach((eObj) => {
    //   if (eObj.field === 'email') {
    //     emailInputEl.style.border = '2px solid red ';
    //     emailInputEl.nextElementSibling.textContent = eObj.message;
    //   }
    //   if (eObj.field === 'password') {
    //     passwordInputEl.style.border = '2px solid red ';
    //     passwordInputEl.nextElementSibling.textContent = eObj.message;
    //   }
    // });
    msg.forEach((eObj) => {
      const elWithError = formEl.elements[eObj.field];
      elWithError.classList.add('invalid-input');
      elWithError.nextElementSibling.textContent = eObj.message;
    });
  }
}

// async function clearErrors() {
//   emailInputEl.style.border = 'none';
//   passwordInputEl.style.border = 'none';
//   passwordInputEl.nextElementSibling.textContent = '';
//   emailInputEl.nextElementSibling.textContent = '';
// }

function clearErrors() {
  // errorsArr = [];
  clearErrorsArr();
  errorMsg.forEach((htmlElement) => {
    // eslint-disable-next-line no-param-reassign
    htmlElement.textContent = '';
    htmlElement.previousElementSibling.classList.remove('invalid-input');
  });
}
