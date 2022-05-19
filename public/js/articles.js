import { getFetch } from './modules/fetch.js';

/* eslint-disable no-param-reassign */
// const articlesListEl = document.getElementById('articles');
const headerEl = document.querySelector('.header');

// REGISTRUOTIEMS VARTOTOJAMS
const token = localStorage.getItem('articleUserToken');
console.log('token===', token);

if (!token) {
  // NEREGISTRUOTAS VARTOTOJAS , ATE
  window.location.replace('login.html');
}

function makeEl(tagName, text, dest, elClass = null) {
  const el = document.createElement(tagName);
  el.textContent = text;
  if (elClass) el.className = elClass;
  dest.appendChild(el);
  return el;
}

function createBookCard(newBookObj) {
  const sectionEl = document.createElement('section');

  sectionEl.className = 'books-card';
  makeEl('h3', `${newBookObj.title}`, sectionEl, 'title');
  makeEl('p', `${newBookObj.content}`, sectionEl, 'content');
  makeEl('p', `${newBookObj.date}`, sectionEl, 'date');
  const viewMoreButton = makeEl('button', 'VIEW MORE', sectionEl, 'view-more-button');
  viewMoreButton.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('click');
  });

  return sectionEl;
}

function renderArticles(arr, dest) {
  dest.innerHTML = '';
  arr.forEach((bObj) => {
    // const liEl = document.createElement('li');
    // liEl.textContent = `${bObj.title} - ${bObj.content}`;
    const card = createBookCard(bObj);
    dest.append(card);
  });
}
// GET and CONSOLE ALL ARTICLES

async function getArticles(userToken) {
  const articlesListEl = document.createElement('article');
  articlesListEl.className = 'books-article';
  // document.body.append(articlesListEl);
  headerEl.insertAdjacentElement('afterend', articlesListEl);
  const articlesArr = await getFetch('allArticle', userToken);
  console.log('articlesArr===', articlesArr);
  renderArticles(articlesArr, articlesListEl);
}
getArticles(token);
