/* eslint-disable no-use-before-define */
const BASE_URL = 'http://localhost:3000';

const formEl = document.getElementById('register');
const errEl = document.getElementById('err');

formEl.addEventListener('submit', (event) => {
  event.preventDefault();
  console.log('registruota');

  // pasigaunam formos input values
  const formData = {
    email: formEl.elements.email.value,
    password: formEl.elements.password.value,
    repeatPassword: formEl.elements.repeat_password.value,
  };
  console.log('formData ===', formData);

  // tikrinam ar sutampa slaptazodziai
  if (formData.password !== formData.repeatPassword) {
    handleError('Nesutampa slaptazodziai');
    return;
  }
  registerFetch(formData.email, formData.password);
});

// pranesam apie klaida jei tokia ivyks
function handleError(msg) {
  errEl.textContent = '';
  if (typeof msg === 'string') {
    errEl.textContent = msg;
  }
  if (Array.isArray(msg)) {
    msg.forEach((eObj) => {
      errEl.innerHTML += `${eObj.message}<br>`;
    });
  }
}

async function registerFetch(email, password) {
  const registerObj = { email, password };
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
