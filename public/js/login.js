const BASE_URL = 'http://localhost:3000';

const formEl = document.getElementById('login');
const errEl = document.getElementById('err');

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

formEl.addEventListener('submit', async (event) => {
  event.preventDefault();
  console.log('js submit form');
  const loginObj = {
    email: formEl.elements.email.value.trim(),
    password: formEl.elements.password.value.trim(),
  };
  console.log('loginObj ===', loginObj);

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