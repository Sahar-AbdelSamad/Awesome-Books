class Collection {
  constructor(title,author) {
    this.title = title;
    this.author = author;
  }
}

let book = [];

const data = JSON.parse(localStorage.getItem('list'));
window.onload = () => {
  if (data) {
    book = data;
    init();
  } 
  else {
    book = [
      book1 = {
        title: 'Book1',
        author: 'Author1'
      },
      book2 = {
        title: 'Book2',
        author: 'Author2'
      },
      book3 = {
        title: 'Book3',
        author: 'Author3'
      }
    ]
    init();
    localStorage.setItem('list', JSON.stringify(book));
  } 
 };

//Book displayed on the page

 function init() {
  for(let i=0 ;i<book.length; i++) {
    const section = document.querySelector('.bookSection');
    const div = document.createElement('div');
    div.className = ('bookList');
    const title = document.createElement('p');
    title.textContent = (book[i].title);
    title.className = ('classTitle');
    div.appendChild(title);
    const author = document.createElement('p');
    author.textContent = (book[i].author);
    author.className = ('classAuthor');
    div.appendChild(author);
    const removeBtn = document.createElement('button');
    removeBtn.textContent = ('Remove');
    removeBtn.className = ('remove');
    removeBtn.addEventListener('click', () => {
      div.style.display = ('none');
      for(let i=0; i<book.length; i++) {
        if(book[i].title===title.textContent) {
          book.splice(i,1);
          localStorage.setItem('list', JSON.stringify(book));
        }
      }
    });
    div.appendChild(removeBtn);
    const hr = document.createElement('hr');
    div.appendChild(hr);
    section.appendChild(div);
  }  
 }

//Add button
const addBtn = document.querySelector('.btn');
addBtn.addEventListener('click', addNewBook);

function addNewBook() {
  const bookTitle = document.querySelector('.title');
  const bookAuthor = document.querySelector('.author');
  const newBook = new Collection(bookTitle.value, bookAuthor.value);
  book.push(newBook);

  localStorage.setItem('list', JSON.stringify(book));

  //New book displayed in the page
  if(bookTitle.value&&bookAuthor.value) {
    const section = document.querySelector('.bookSection');
    const div = document.createElement('div');
    div.className = ('bookList');
    section.appendChild(div);
    const title = document.createElement('p');
    title.textContent = (newBook.title);
    title.className = ('classTitle');
    div.appendChild(title);
    const author = document.createElement('p');
    author.textContent = (newBook.author);
    title.className = ('classAuthor');
    div.appendChild(author);
    const removeBtn = document.createElement('button');
    removeBtn.textContent = ('Remove');
    removeBtn.className = ('remove');
    removeBtn.addEventListener('click', () => {
      div.style.display = ('none');
      //Remove the book from the collection
      for(let i=0; i<book.length; i++) {
        if(book[i].title===newBook.title) {
          book.splice(i,1);
        }
      }
    });
    div.appendChild(removeBtn);
    const hr = document.createElement('hr');
    div.appendChild(hr);
    //Empty input values
    bookTitle.value = ('');
    bookAuthor.value = ('');
  }
}
