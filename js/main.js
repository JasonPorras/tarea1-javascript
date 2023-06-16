import { selectedNav } from "./selectedMenu.js"

const buttonValues = ["Music", "Sports", "Business", "Food", "Art","hola"];

const tabList = document.getElementById("tabList");

buttonValues.forEach(function(value) {
  const li = document.createElement("li");
  const button = document.createElement("button");

  button.classList.add("tab");
  button.textContent = value;
  
  li.appendChild(button);
  tabList.appendChild(li);

  console.log(value);
});


selectedNav();


// const url = `https://knassbani2.execute-api.us-east-2.amazonaws.com/events/music`;

// function changeCategory() {
//   console.log(url);

//   fetch(url)
//     .then(response => response.json())
//     .then((data) => {
//       data.forEach(evento => {
//       });
//       console.log(data);
//     })
//     .catch(error => console.log(error));
// }

// changeCategory();


