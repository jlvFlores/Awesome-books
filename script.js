// An array to keep the books in the collection
let books = [];

// Load the books from local storage if they exist
if (localStorage.getItem('books')) {
  books = JSON.parse(localStorage.getItem('books'));
}

// Function to add a new book to the collection
function addBook(title, author) {
  books.push({ title, author });
  updateLocalStorage();
  displayBooks();
}

// Function to remove a book from the collection
function removeBook(title) {
  books = books.filter(book => book.title !== title);
  updateLocalStorage();
  displayBooks();
}

// Function to display all books in the collection
function displayBooks() {
  const booksList = document.getElementById('books-list');
  booksList.innerHTML = '';
  books.forEach(book => {
    const bookElement = document.createElement('div');
    bookElement.innerHTML = `<p>${book.title}</p> <br> <p>${book.author}</p> <br>
                             <button onclick="removeBook('${book.title}')">Remove</button>`;
    booksList.appendChild(bookElement);
  });
}

// Function to update the books in local storage
function updateLocalStorage() {
  localStorage.setItem('books', JSON.stringify(books));
}

// Add event listener to the "Add" button
const addButton = document.getElementById('add-button');
addButton.addEventListener('click', function() {
  const titleInput = document.getElementById('title-input');
  const authorInput = document.getElementById('author-input');
  addBook(titleInput.value, authorInput.value);
  titleInput.value = '';
  authorInput.value = '';
});

// Display the books when the page loads
displayBooks();
