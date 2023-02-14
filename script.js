class Library {
  constructor() {
    this.books = [];
    if (localStorage.getItem('books')) {
      this.books = JSON.parse(localStorage.getItem('books'));
    }
  }

  updateLocalStorage() {
    localStorage.setItem('books', JSON.stringify(this.books));
  }

  displayBooks() {
    const library = document.getElementById('library');
    let count = 1;
    this.books.forEach((book) => {
      if (count % 2) {
        book.Number = JSON.stringify(count);
        library.insertAdjacentHTML('beforeend', `
          <div class="book gray">
            <span>"${book.title}" by ${book.author}</span>
            <button class="remove-btn" data-id="${book.Number}">Remove</button>
          </div>
        `);
        count += 1;
      } else {
        book.Number = JSON.stringify(count);
        library.insertAdjacentHTML('beforeend', `
          <div class="book">
            <span>"${book.title}" by ${book.author}</span>
            <button class="remove-btn" data-id="${book.Number}">Remove</button>
          </div>
        `);
        count += 1;
      }
    });

    const removeBook = (id) => {
      this.books = this.books.filter((book) => book.Number !== id);
      this.updateLocalStorage();
      window.location.reload(true);
    };

    const removeButtons = document.querySelectorAll('.remove-btn');
    removeButtons.forEach((button) => button.addEventListener('click', (e) => {
      removeBook(e.target.dataset.id);
    }));
  }

  addBook(title, author) {
    this.books.push({ title, author });
    this.updateLocalStorage();
    window.location.reload(true);
  }
}

const myLibrary = new Library();

const addButton = document.getElementById('add-btn');
addButton.addEventListener('click', () => {
  const inputTitle = document.getElementById('input-title').value;
  const inputAuthor = document.getElementById('input-author').value;
  if (inputTitle && inputAuthor) {
    myLibrary.addBook(inputTitle, inputAuthor);
  }
});

myLibrary.displayBooks();
