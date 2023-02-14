class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

class Library {
  constructor(books) {
    this.books = [];
    if (localStorage.getItem('books')) {
      this.books = JSON.parse(localStorage.getItem('books'));
    }
  }

  updateLocalStorage() {
    localStorage.setItem('books', JSON.stringify(this.books));
  }

  reloadPage() {
    document.location.reload(true);
  }

  displayBooks() {
    const library = document.getElementById('library');
    let count = 0;
    this.books.forEach((book) => {
      book.Number = JSON.stringify(count);
      library.insertAdjacentHTML('beforeend', `
        <div>
          <p>${book.title}</p>
          <p>${book.author}</p>
          <button class="remove-btn" data-id="${book.Number}">Remove</button>
        </div>
      `);
      count += 1;
    });

    const removeBook = (id) => {
      this.books = this.books.filter((book) => book.Number !== id);
      this.updateLocalStorage();
      this.reloadPage();
    };

    const removeButtons = document.querySelectorAll('.remove-btn');
    removeButtons.forEach((button) => button.addEventListener('click', (e) => {
      removeBook(e.target.dataset.id);
    }));
  }

  addBook(title, author) {
    const newBook = new Book(title, author);
    this.books.push(newBook);
    this.updateLocalStorage();
    this.reloadPage();
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
