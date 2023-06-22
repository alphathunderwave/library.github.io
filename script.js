function createD(Library) {
  library.innerHTML = "";
  Library.library.forEach((book) => {
    var div = document.createElement("div");
    var t = document.createElement("h1");
    var a = document.createElement("h2");
    var p = document.createElement("h3");
    var b = document.createElement("button");
    div.classList.add("book");
    t.textContent = book.title;
    a.textContent = book.author;
    p.textContent = book.pages;
    b.classList.add("removeBook");
    b.onclick = function () {
      Library.removeBookFromLibrary(book);
    };
    var s = document.createElement("span");
    s.classList.add("material-symbols-outlined");
    s.textContent = "close";
    b.appendChild(s);
    div.appendChild(t);
    div.appendChild(a);
    div.appendChild(p);
    div.appendChild(b);
    div.classList.add(Library.library.indexOf(book));
    library.appendChild(div);
  });
}

class myLibrary {
  constructor() {
    this.library = [];
  }
  addBookToLibrary(book) {
    var count = 0;
    this.library.forEach((libBook) => {
      if (
        book.author == libBook.author &&
        book.title == libBook.title &&
        book.pages == libBook.pages
      ) {
        count++;
      }
    });
    if (count == 0) {
      this.library.push(book);
    }
    createD(this);
  }
  removeBookFromLibrary(book) {
    var index = this.library.indexOf(book);
    if (index !== -1) {
      this.library.splice(index, 1);
    }
    createD(this);
  }
  sortLibrary() {
    this.library.sort(function (a, b) {
      return a.author.localeCompare(b.author);
    });

    console.log(this.library);
    createD(this);
  }
}

class Book {
  constructor(author, title, pages) {
    this.author = author;
    this.title = title;
    this.pages = pages;
  }
}

const library = document.querySelector(".library");
const form = document.getElementById("bookForm");
var myLib = new myLibrary();
function openForm() {
  document.getElementById("myForm").style.display = "block";
  document.getElementById("blur").style.display = "block";
}
function closeForm() {
  form.reset();
  document.getElementById("myForm").style.display = "none";
  document.getElementById("blur").style.display = "none";
}
function submitBook() {
  var book = new Book(
    document.getElementById("author").value,
    document.getElementById("title").value,
    document.getElementById("pages").value
  );
  myLib.addBookToLibrary(book);
  closeForm();
}

function sort() {
  myLib.sortLibrary();
}
form.addEventListener("submit", (e) => {
  e.preventDefault();
  submitBook();
});
form.addEventListener("close", (e) => {
  e.preventDefault();
  closeForm();
});

for (let index = 0; index < 14; index++) {
  var book = new Book("james", index, 123);
  myLib.addBookToLibrary(book);
}

var book = new Book("adam", "water", 123);
myLib.addBookToLibrary(book);
