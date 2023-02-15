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

const menuListOption = document.getElementById('menu-list');
const menuAddOption = document.getElementById('menu-add');
const menuContactOption = document.getElementById('menu-contact');

const librarySection = document.querySelector('.library-section');
const addaBook = document.querySelector('.add-section');
const contactSection = document.querySelector('.contact-section');

window.onload = () => {
  menuListOption.classList.add('blue');

  addaBook.classList.add('hide');
  contactSection.classList.add('hide');
};

menuListOption.addEventListener('click', () => {
  menuListOption.classList.add('blue');
  menuAddOption.classList.remove('blue');
  menuContactOption.classList.remove('blue');

  librarySection.classList.remove('hide');
  addaBook.classList.add('hide');
  contactSection.classList.add('hide');
});

menuAddOption.addEventListener('click', () => {
  menuListOption.classList.remove('blue');
  menuAddOption.classList.add('blue');
  menuContactOption.classList.remove('blue');

  librarySection.classList.add('hide');
  addaBook.classList.remove('hide');
  contactSection.classList.add('hide');
});

menuContactOption.addEventListener('click', () => {
  menuListOption.classList.remove('blue');
  menuAddOption.classList.remove('blue');
  menuContactOption.classList.add('blue');

  librarySection.classList.add('hide');
  addaBook.classList.add('hide');
  contactSection.classList.remove('hide');
});
