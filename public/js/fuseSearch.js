const Fuse = require("fuse");

function searchByTag(e) {
  e.preventDefault();

  const searchInput = document.getElementById("#search").value;
  const fuseOptions = {
    shouldSort: true,
    id: "userInput",
    keys: ["message"],
  };

  fetch("/api/note/all", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(function (response) {
    const fuse = new Fuse(response, fuseOptions);
    // search input should be a string
    const result = fuse.search(searchInput);
    // result contain all notes with searched tag
    // getting back note
  });
}

document.querySelector("").addEventListener("submit", searchByTag);

// you can access original objects using the item property in each result:
// console.log(result[0].item);
// search result would be something like this
// [
//   {
//     "item": {
//       "title": "One Hundred Years of Solitude",
//       "author": "Gabriel García Márquez",
//     },
//   },
//   {
//     "item": {
//       "title": "The Great Gatsby",
//       "author": "F. Scott Fitzgerald",
//     },
//   },
//   {
//     "item": {
//       "title": "Pride and Prejudice",
//       "author": "Jane Austen",
//     },
//   },
// ];



