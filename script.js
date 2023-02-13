/* eslint-disable no-unused-vars */
const addButton = document.getElementById('add-btn');
const library = document.getElementById('library');

let books = JSON.parse(localStorage.getItem('books'));

function displayBooks() {
  books.forEach((book) => {
    library.insertAdjacentHTML('beforeend', `
      <div>
        <p>${book.Title}</p>
        <p>${book.Author}</p>
        <button onclick="removeBook('${book.Title}')">Remove</button>
      </div>
    `);
  });
}

function updateLocalStorage() {
  localStorage.setItem('books', JSON.stringify(books));
}

function reloadPage() {
  document.location.reload(true);
}

function addBook(title, author) {
  books.push({ Title: title, Author: author });
  updateLocalStorage();
  reloadPage();
}

function removeBook(title) {
  books = books.filter((book) => book.Title !== title);
  updateLocalStorage();
  reloadPage();
}

function validateForm() {
  const inputTitle = document.getElementById('input-title').value;
  const inputAuthor = document.getElementById('input-author').value;
  if (inputTitle && inputAuthor) {
    addBook(inputTitle, inputAuthor);
  }
}

displayBooks();

addButton.addEventListener('click', validateForm);