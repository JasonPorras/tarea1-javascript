import { cacheProxy } from "../api/cacheProxy.js";
import { formatLocation, formatDate, formatPrice } from "../utils/fomatEventsCards.js"
import { changesClickButtonInterested, changesClickButtonGoing, clickbuttonLike } from "./changeClickButtonEvents.js";

async function renderEventsCards(eventData) {
  const data = await cacheProxy[eventData];
  const containerEventsCards = document.getElementById("containerEventsCards");

  if (!data || data.length === 0) {
    return;
  }

  containerEventsCards.innerHTML = "";

  data.forEach(({ id, image, title, location: { address, city, state }, date, price }) => {
    const contentCard = createContentCard(id, image, title, address, city, state, date, price);
    containerEventsCards.appendChild(contentCard);
  });
}

function createContentCard(id, image, title, address, city, state, date, price) {
  const contentCard = document.createElement("div");
  contentCard.classList.add("contentCard");

  const imgContent = createImage(image, title);
  const titleContent = createTitle(title);
  const timeContent = createTime(date);
  const locationContent = createLocation(address, city, state);
  const priceContent = createPrice(price);
  const containerBtnLike = createButtonLike();
  const contentbuttonActivities = createButtonActivities();

  contentCard.append(
    imgContent,
    containerBtnLike,
    titleContent,
    timeContent,
    locationContent,
    priceContent,
    contentbuttonActivities,
  );

  return contentCard;
}

function createImage(image, title) {
  const imgContent = document.createElement("img");
  imgContent.classList.add('imgContent');
  imgContent.src = image;
  imgContent.alt = title;
  return imgContent;
}

function createTitle(title) {
  const titleContent = document.createElement('h3');
  titleContent.classList.add('titleContent');
  titleContent.textContent = title;
  return titleContent;
}

function createTime(date) {
  const timeContent = document.createElement('p');
  timeContent.classList.add('timeContent');
  timeContent.textContent = formatDate(date);
  return timeContent;
}

function createLocation(address, city, state) {
  const locationContent = document.createElement("p");
  locationContent.classList.add('locationContent');
  locationContent.textContent = formatLocation(address, city, state);
  return locationContent;
}

function createPrice(price) {
  const priceContent = document.createElement("p");
  priceContent.classList.add("priceContent");
  priceContent.textContent = formatPrice(price);
  return priceContent;
}

function createButtonLike() {
  const containerBtnLike = document.createElement("div");
  containerBtnLike.classList.add("containerBtnLike");

  const buttonContent = document.createElement("button");
  buttonContent.classList.add("btnLike");
  buttonContent.type = "button";

  const imgContentLike = document.createElement('img');
  imgContentLike.classList.add('imgContentLike');
  imgContentLike.src = "/images/likeDefault.png";
  imgContentLike.alt = "like card events";

  buttonContent.appendChild(imgContentLike);
  containerBtnLike.appendChild(buttonContent);

  clickbuttonLike(buttonContent);

  return containerBtnLike;
}

function createButtonActivities() {
  const contentbuttonActivities = document.createElement("div");
  contentbuttonActivities.classList.add("contentbuttonActivities");

  const buttonInterested = createButton("Interested", "buttonInterested settingButtonActivities");
  const buttonGoing = createButton("Going!", "buttonGoing settingButtonActivities");

  contentbuttonActivities.appendChild(buttonInterested);
  contentbuttonActivities.appendChild(buttonGoing);

  changesClickButtonInterested(buttonInterested, buttonGoing, contentbuttonActivities);
  changesClickButtonGoing(buttonGoing, buttonInterested);

  return contentbuttonActivities;
}

function createButton(text, className) {
  const button = document.createElement("button");
  button.classList.add(...className.split(" "));
  button.type = "button";
  button.textContent = text;
  return button;
}

export { renderEventsCards }