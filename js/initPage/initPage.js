import { cacheProxy } from "../api/cacheProxy.js";
import { tabsButton, defaultImage, alternateImage} from "../../js/config/config.js";
import { formatLocation, formatDate, formatPrice } from "../utils/fomatEventsCards.js"
import { changesClickButtonInterested,changesClickButtonGoing } from "../changeClickButtonEvents/changeClickButtonEvents.js";



function renderStructureTabs() {
  const tabList = document.getElementById("tabList");

  tabsButton.forEach(function ({ label, category }) {
    const li = document.createElement("li");
    const button = document.createElement("button");

    button.classList.add("tab");
    button.textContent = label;
    button.setAttribute("data-category", category);

    li.appendChild(button);
    tabList.appendChild(li);
  });
}

async function renderEventsCards(eventData) {
  const data = await cacheProxy[eventData];
  const containerEventsCards = document.getElementById("containerEventsCards");
  containerEventsCards.innerHTML = "";

  data.forEach(({ image, title, location: { address, city, state }, date, price }) => {
    const contentCard = createContentCard(image, title, address, city, state, date, price);
    
    containerEventsCards.appendChild(contentCard);
  });
}

function createContentCard(image, title, address, city, state, date, price) {
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
    contentbuttonActivities
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

function clickbuttonLike(buttonContent) {
  buttonContent.addEventListener("click", function () {
    const image = buttonContent.querySelector("img");
    const isLiked = image.classList.contains("liked");

    if (isLiked) {
      image.src = defaultImage;
      image.classList.remove("liked");
    } else {
      image.src = alternateImage;
      image.classList.add("liked");
    }
  });
}

function buttonSelected() {
  const tabs = document.getElementsByClassName("tab");
  const tabsArray = [...tabs];

  tabsArray.forEach((tab, index) => {
    tab.addEventListener("click", async function () {
      const eventData = this.getAttribute("data-category");
      renderEventsCards(eventData);

      tabsArray.forEach((tab) => {
        tab.classList.remove("selected");
      });
      tab.classList.add("selected");
    });

    if (index === 0) {
      tab.classList.add("selected");
      const eventData = tab.getAttribute("data-category");
      renderEventsCards(eventData);
    }
  });
}

export { renderStructureTabs, buttonSelected, };
