let books = [];

if (localStorage.getItem('books')) {
  books = JSON.parse(localStorage.getItem('books'));
}

const updateLocalStorage = () => localStorage.setItem('books', JSON.stringify(books));

const reloadPage = () => document.location.reload(true);

const displayBooks = () => {
  const library = document.getElementById('library');
  let count = 0;
  books.forEach((book) => {
    book.Number = JSON.stringify(count);
    library.insertAdjacentHTML('beforeend', `
      <div>
        <p>${book.Title}</p>
        <p>${book.Author}</p>
        <button class="remove-btn" data-id="${book.Number}">Remove</button>
      </div>
    `);
    count = count + 1;
  });

  const removeBook = (id) => {
    books = books.filter((book) => book.Number !== id);
    updateLocalStorage();
    reloadPage();
  };

  const removeButtons = document.querySelectorAll('.remove-btn');
  removeButtons.forEach((button) => button.addEventListener('click', (e) => {
    removeBook(e.target.dataset.id);
  }));
};

const addBook = (title, author) => {
  books.push({ Title: title, Author: author });
  updateLocalStorage();
  reloadPage();
};

const addButton = document.getElementById('add-btn');
addButton.addEventListener('click', () => {
  const inputTitle = document.getElementById('input-title').value;
  const inputAuthor = document.getElementById('input-author').value;
  if (inputTitle && inputAuthor) {
    addBook(inputTitle, inputAuthor);
  }
});

displayBooks();