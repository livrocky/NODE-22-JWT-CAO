import { getFetch } from './modules/fetch.js';

/* eslint-disable no-param-reassign */
const articlesListEl = document.getElementById('articles');

// REGISTRUOTIEMS VARTOTOJAMS
const token = localStorage.getItem('articleUserToken');
console.log('token===', token);

if (!token) {
  // NEREGISTRUOTAS VARTOTOJAS , ATE
  window.location.replace('login.html');
}

function renderArticles(arr, dest) {
  dest.innerHTML = '';
  arr.forEach((articleObj) => {
    const liEl = document.createElement('li');
    liEl.textContent = `${articleObj.title} - ${articleObj.content}`;
    dest.append(liEl);
  });
}

// GET and CONSOLE ALL ARTICLES

async function getArticles(userToken) {
  const articlesArr = await getFetch('allArticle', userToken);
  console.log('articlesArr===', articlesArr);
  renderArticles(articlesArr, articlesListEl);
}
getArticles(token);
