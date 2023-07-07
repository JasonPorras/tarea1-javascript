// async function fetchEventsByCategory(category) {
//   const originUrl = "https://knassbani2.execute-api.us-east-2.amazonaws.com/events/";
//   const url = `${originUrl}${category}`;

//   return await fetch(url)
//     .then(response => response.json())
//     .catch(error => console.log(error));
// }


// const cache = {};

// const handler = {
//   get: async (obj, prop) => {
//     if (obj[prop]) {
//       return Reflect.get(obj, prop);
//     } else {
//       try {
//         obj[prop] = await fetchEventsByCategory(prop);
//         return Reflect.get(obj, prop);
//       } catch (error) {
//         throw new Error("Error al obtener los eventos por categoría: " + error.message);
//       }
//     }
//   },
// };

// const cacheProxy = new Proxy(cache, handler);

// const tabListId = "tabList";

// const tabsButton = [
//   {
//     label: "Music",
//     category: "music"
//   },
//   {
//     label: "Sports",
//     category: "sports"
//   },
//   {
//     label: "Business",
//     category: "business"
//   },
//   {
//     label: "Food",
//     category: "food"
//   },
//   {
//     label: "Art",
//     category: "art"
//   }
// ];

// //path and image name for the like.

// const defaultImage = "/images/likeDefault.png";
// const alternateImage = "/images/likeCardEventBlue.png";

// //Attendance Check Image.

// const checkImage = "/images/validation.png";

// //this tabs are of page MyAccount.

// const tabsAccount = [
//   {
//     label: "Favorites",
//     category: "favorites"
//   },
//   {
//     label: "Interested",
//     category: "interested"
//   },
//   {
//     label: "Going",
//     category: "going"
//   },
//   {
//     label: "Calendar",
//     category: "calendar"
//   }
// ]

// function changesClickButtonInterested(buttonInterested, buttonGoing, contentbuttonActivities,id,title) {
//   buttonInterested.addEventListener("click", function () {
//     const paragraphInterested = createParagraph("You're interested in going.");
//     const linkReturnInterested = createLink("Changed your mind?", "#");

//     buttonGoing.classList.add("changeGoing");
//     buttonInterested.style.display = "none";
//     contentbuttonActivities.style.display = "block";

//     insertElementsBefore(contentbuttonActivities, [paragraphInterested, linkReturnInterested], buttonGoing);

//     changesClicklinkReturnInterested(linkReturnInterested, paragraphInterested, buttonInterested, buttonGoing, contentbuttonActivities);
  
//     addToInterested("interested")
//   });
// }

// function changesClicklinkReturnInterested(linkReturnInterested, paragraphInterested, buttonInterested, buttonGoing, contentbuttonActivities) {
//   linkReturnInterested.addEventListener("click", function (event) {
//     event.preventDefault();
//     removeElements([paragraphInterested, linkReturnInterested]);
//     buttonGoing.classList.remove("changeGoing");
//     buttonGoing.classList.add("settingButtonActivities");
//     buttonInterested.style.display = "flex";
//     contentbuttonActivities.style.display = "flex";
//     buttonInterested.style.justifyContent = "center";
//   });
// }

// function changesClickButtonGoing(buttonGoing, buttonInterested) {
//   buttonGoing.addEventListener("click", function () {
//     const contentbuttonActivities = buttonGoing.parentNode;

//     const paragraphInterested = contentbuttonActivities.querySelector(".paragraph");
//     const linkReturnInterested = contentbuttonActivities.querySelector(".linkReturn");
//     if (paragraphInterested && linkReturnInterested) {
//       removeElements([paragraphInterested, linkReturnInterested]);
//     }

//     const containerTextGoing = document.createElement("div");
//     containerTextGoing.classList.add("containerTextGoing");

//     const paragraphGoing = createParagraph("You're going to this event!");
//     const linkReturnGoing = createLink("Changed your mind?", "#");
//     const validationGoing = imageValidationGoing(checkImage);

//     containerTextGoing.appendChild(paragraphGoing);
//     containerTextGoing.appendChild(linkReturnGoing);

//     buttonGoing.style.display = "none";
//     buttonGoing.classList.remove("changeGoing");
//     buttonInterested.style.display = "none";
//     contentbuttonActivities.style.display = "flex";
//     contentbuttonActivities.style.justifyContent = "left";
//     insertElementsBefore(contentbuttonActivities, [validationGoing, containerTextGoing], buttonGoing);

//     changesClicklinkReturnGoing(linkReturnGoing, paragraphGoing, buttonInterested, buttonGoing, contentbuttonActivities);
  
//     addToGoing("Going")
//   });
// }

// function changesClicklinkReturnGoing(linkReturnGoing, paragraphGoing, buttonInterested, buttonGoing, contentbuttonActivities) {
//   const selectContainerText = contentbuttonActivities.querySelector(".containerTextGoing");
//   const selectImageValidation = contentbuttonActivities.querySelector(".imageValidation");

//   linkReturnGoing.addEventListener("click", function (event) {
//     event.preventDefault();
//     removeElements([selectContainerText, selectImageValidation]);
//     buttonGoing.style.display = "flex";
//     buttonInterested.style.display = "flex";
//     contentbuttonActivities.style.display = "flex"
//     contentbuttonActivities.style.justifyContent = "space-around";
//     buttonGoing.style.justifyContent = "center";
//     buttonInterested.style.justifyContent = "center";
//   });
// }

// function createParagraph(text) {
//   const paragraph = document.createElement("p");
//   paragraph.classList.add("paragraph");
//   paragraph.textContent = text;
//   return paragraph;
// }

// function createLink(text, href) {
//   const link = document.createElement("a");
//   link.classList.add("linkReturn");
//   link.textContent = text;
//   link.href = href;
//   return link;
// }

// function imageValidationGoing(checkImage) {
//   const imageValidation = document.createElement("img");
//   imageValidation.classList.add('imageValidation');
//   imageValidation.src = checkImage;
//   imageValidation.alt = "Imagen validation green";
//   return imageValidation;
// }

// function clickbuttonLike(buttonContent) {
//   buttonContent.addEventListener("click", function () {
//     const image = buttonContent.querySelector("img");
//     const isLiked = image.classList.contains("liked");

//     if (isLiked) {
//       image.src = defaultImage;
//       image.classList.remove("liked");
//     } else {
//       image.src = alternateImage;
//       image.classList.add("liked");
//       addToFavorites("Favorite")
//     }
//   });
// }

// function renderStructureTabs(tabListId, tabsButton) {
//   const tabList = document.getElementById(tabListId);

//   tabsButton.forEach(function ({ label, category }) {
//     const li = document.createElement("li");
//     const button = document.createElement("button");

//     button.classList.add("tab");
//     button.textContent = label;
//     button.setAttribute("data-category", category);

//     li.appendChild(button);
//     tabList.appendChild(li);
//   });
// }

// function buttonSelected() {
//   const tabs = document.getElementsByClassName("tab");
//   const tabsArray = [...tabs];

//   tabsArray.forEach((tab, index) => {
//     tab.addEventListener("click", async function () {
//       const eventData = this.getAttribute("data-category");
//       renderEventsCards(eventData);

//       tabsArray.forEach((tab) => {
//         tab.classList.remove("selected");
//       });
//       tab.classList.add("selected");
//     });

//     if (index === 0) {
//       tab.classList.add("selected");
//       const eventData = tab.getAttribute("data-category");
//       renderEventsCards(eventData);
//     }
//   });
// }


// async function renderEventsCards(eventData) {
//   const data = await cacheProxy[eventData];
//   const containerEventsCards = document.getElementById("containerEventsCards");
//   containerEventsCards.innerHTML = "";

//   data.forEach(({id, image, title, location: { address, city, state }, date, price }) => {
//     const contentCard = createContentCard(id,image, title, address, city, state, date, price);
//     containerEventsCards.appendChild(contentCard);
//   });
// }

// function createContentCard(id,image, title, address, city, state, date, price) {
//   const contentCard = document.createElement("div");
//   contentCard.classList.add("contentCard");

//   const imgContent = createImage(image, title);
//   const titleContent = createTitle(title);
//   const timeContent = createTime(date);
//   const locationContent = createLocation(address, city, state);
//   const priceContent = createPrice(price);
//   const containerBtnLike = createButtonLike();
//   const contentbuttonActivities = createButtonActivities();

//   contentCard.append(
//     imgContent,
//     containerBtnLike,
//     titleContent,
//     timeContent,
//     locationContent,
//     priceContent,
//     contentbuttonActivities,
//   );

//   return contentCard;
// }

// function createImage(image, title) {
//   const imgContent = document.createElement("img");
//   imgContent.classList.add('imgContent');
//   imgContent.src = image;
//   imgContent.alt = title;
//   return imgContent;
// }

// function createTitle(title) {
//   const titleContent = document.createElement('h3');
//   titleContent.classList.add('titleContent');
//   titleContent.textContent = title;
//   return titleContent;
// }

// function createTime(date) {
//   const timeContent = document.createElement('p');
//   timeContent.classList.add('timeContent');
//   timeContent.textContent = formatDate(date);
//   return timeContent;
// }

// function createLocation(address, city, state) {
//   const locationContent = document.createElement("p");
//   locationContent.classList.add('locationContent');
//   locationContent.textContent = formatLocation(address, city, state);
//   return locationContent;
// }

// function createPrice(price) {
//   const priceContent = document.createElement("p");
//   priceContent.classList.add("priceContent");
//   priceContent.textContent = formatPrice(price);
//   return priceContent;
// }

// function createButtonLike() {
//   const containerBtnLike = document.createElement("div");
//   containerBtnLike.classList.add("containerBtnLike");

//   const buttonContent = document.createElement("button");
//   buttonContent.classList.add("btnLike");
//   buttonContent.type = "button";

//   const imgContentLike = document.createElement('img');
//   imgContentLike.classList.add('imgContentLike');
//   imgContentLike.src = "/images/likeDefault.png";
//   imgContentLike.alt = "like card events";

//   buttonContent.appendChild(imgContentLike);
//   containerBtnLike.appendChild(buttonContent);

//   clickbuttonLike(buttonContent);

//   return containerBtnLike;
// }

// function createButtonActivities() {
//   const contentbuttonActivities = document.createElement("div");
//   contentbuttonActivities.classList.add("contentbuttonActivities");

//   const buttonInterested = createButton("Interested", "buttonInterested settingButtonActivities");
//   const buttonGoing = createButton("Going!", "buttonGoing settingButtonActivities");

//   contentbuttonActivities.appendChild(buttonInterested);
//   contentbuttonActivities.appendChild(buttonGoing);

//   changesClickButtonInterested(buttonInterested, buttonGoing, contentbuttonActivities);
//   changesClickButtonGoing(buttonGoing, buttonInterested);

//   return contentbuttonActivities;
// }

// function createButton(text, className) {
//   const button = document.createElement("button");
//   button.classList.add(...className.split(" "));
//   button.type = "button";
//   button.textContent = text;
//   return button;
// }

// const state = {
//   favoritos: [],
//   interesados: [],
//   going: []
// };

// function addToFavorites(nombre) {
//   state.favoritos.push(nombre);
//   saveState();
// }

// function addToInterested(nombre) {
//   state.interesados.push(nombre);
//   saveState();
// }

// function addToGoing(nombre) {
//   state.going.push(nombre);
//   saveState();
// }

// function saveState() {
//   localStorage.setItem("myState", JSON.stringify(state));
// }

// // Recuperar el estado almacenado, si existe
// const storedState = localStorage.getItem("myState");
// if (storedState) {
// const state = JSON.parse(storedState);
// }

// // console.log(storedState);
// // console.log(state);

// function formatLocation(address, city, state) {
//   return `${address} • ${city}, ${state}`;
// }

// function formatDate(dateString) {
//   return new Date(dateString).toLocaleString('en-US', {
//     weekday: 'long',
//     month: 'long',
//     day: 'numeric',
//     hour: 'numeric',
//     minute: 'numeric',
//     hour12: true
//   });
// }

// function formatPrice(price) {
//   return price === 0 ? "Free" : "$" + price.toFixed(2);
// }

// function insertElementsBefore(parentElement, elements, referenceElement) {
//   elements.forEach((element) => {
//     parentElement.insertBefore(element, referenceElement);
//   });
// }

// function removeElements(elements) {
//   elements.forEach((element) => {
//     element.remove();
//   });
// }