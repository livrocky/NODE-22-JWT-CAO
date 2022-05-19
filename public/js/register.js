import { clearErrorsArr, checkInput, errorsArr } from './modules/validation.js';

/* eslint-disable no-use-before-define */
const BASE_URL = 'http://localhost:3000';

const formEl = document.getElementById('register');
const errEl = document.getElementById('err');
// pasiimti visus el su klase error-msg
const errorMsg = document.querySelectorAll('.error-msg');

formEl.addEventListener('submit', (event) => {
  event.preventDefault();
  console.log('registruota');

  // pasigaunam formos input values
  const formData = {
    email: formEl.elements.email.value.trim(),
    password: formEl.elements.password.value.trim(),
    repeatPassword: formEl.elements.repeatPassword.value.trim(),
  };
  console.log('formData ===', formData);
  clearErrors();

  // TODO front end validation
  checkInput(formData.email, 'email', ['required', 'minLength-4', 'email']);
  checkInput(formData.password, 'password', ['required', 'minLength-5', 'maxLength-10']);
  checkInput(formData.repeatPassword, 'repeatPassword', ['required', 'minLength-5', 'maxLength-10']);

  if (errorsArr.length) {
    handleError(errorsArr);
    return;
  }

  // tikrinam ar sutampa slaptazodziai
  if (formData.password !== formData.repeatPassword) {
    handleError('Nesutampa slaptazodziai');
    return;
  }
  registerFetch(formData.email, formData.password, formData.repeatPassword);
});

// pranesam apie klaida jei tokia ivyks
function handleError(msg) {
  errEl.textContent = '';
  if (typeof msg === 'string') {
    errEl.textContent = msg;
  }
  if (Array.isArray(msg)) {
    // msg.forEach((eObj) => {
    //   errEl.innerHTML += `${eObj.message}<br>`;
    // });
    msg.forEach((eObj) => {
      const elWithError = formEl.elements[eObj.field];
      elWithError.classList.add('invalid-input');
      elWithError.nextElementSibling.textContent = eObj.message;
    });
  }
}

async function registerFetch(email, password, repeatPassword) {
  const registerObj = { email, password, repeatPassword };
  const resp = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(registerObj),
  });
  if (resp.status === 201) {
    // success
    handleError('Vartotojas sukurtas sekmingai');
    window.location.href = 'login.html';
  } else {
    // fail
    handleError(await resp.json());
  }
}

function clearErrors() {
  // errorsArr = [];
  clearErrorsArr();
  errorMsg.forEach((htmlElement) => {
    // eslint-disable-next-line no-param-reassign
    htmlElement.textContent = '';
    htmlElement.previousElementSibling.classList.remove('invalid-input');
  });
}
