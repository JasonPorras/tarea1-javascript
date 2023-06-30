import { cacheProxy } from "../api/cacheProxy.js";
import { tabsButton, defaultImage, alternateImage,checkImage } from "../../js/config/config.js";
import { formatLocation, formatDate, formatPrice } from "../utils/fomatEventsCards.js"

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

  const fragment = document.createDocumentFragment(); // Crear un fragmento para mejorar la eficiencia al agregar elementos

  data.forEach(({ image, title, location: { address, city, state }, date, price }) => {
    const contentCard = createContentCard(image, title, address, city, state, date, price);
    fragment.appendChild(contentCard);
  });

  containerEventsCards.appendChild(fragment);
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

function changesClickButtonInterested(buttonInterested, buttonGoing, contentbuttonActivities) {
  buttonInterested.addEventListener("click", function () {
    const paragraphInterested = createParagraph("You're interested in going.");
    const linkReturnInterested = createLink("Changed your mind?", "#");

    buttonGoing.classList.add("changeGoing");
    buttonInterested.style.display = "none";
    contentbuttonActivities.style.display = "block";

    insertElementsBefore(contentbuttonActivities, [paragraphInterested, linkReturnInterested], buttonGoing);

    changesClicklinkReturnInterested(linkReturnInterested, paragraphInterested, buttonInterested, buttonGoing, contentbuttonActivities);
  });
}

function changesClicklinkReturnInterested(linkReturnInterested, paragraphInterested, buttonInterested, buttonGoing, contentbuttonActivities) {
  linkReturnInterested.addEventListener("click", function (event) {
    event.preventDefault();
    removeElements([paragraphInterested, linkReturnInterested]);
    buttonGoing.classList.remove("changeGoing");
    buttonGoing.classList.add("settingButtonActivities");
    buttonInterested.style.display = "flex";
    contentbuttonActivities.style.display = "flex";
    buttonInterested.style.justifyContent = "center";
  });
}

function changesClickButtonGoing(buttonGoing, buttonInterested) {
  buttonGoing.addEventListener("click", function () {
    const contentbuttonActivities = buttonGoing.parentNode;

    const paragraphInterested = contentbuttonActivities.querySelector(".paragraph");
    const linkReturnInterested = contentbuttonActivities.querySelector(".linkReturn");
    if (paragraphInterested && linkReturnInterested) {
      removeElements([paragraphInterested, linkReturnInterested]);
    }

    const containerTextGoing = document.createElement("div");
    containerTextGoing.classList.add("containerTextGoing");

    const paragraphGoing = createParagraph("You're going to this event!");
    const linkReturnGoing = createLink("Changed your mind?", "#");
    const validationGoing = imageValidationGoing(checkImage);

    containerTextGoing.appendChild(paragraphGoing);
    containerTextGoing.appendChild(linkReturnGoing);

    buttonGoing.style.display = "none";
    buttonGoing.classList.remove("changeGoing");
    buttonInterested.style.display = "none";
    contentbuttonActivities.style.justifyContent = "left";
    insertElementsBefore(contentbuttonActivities, [validationGoing,containerTextGoing], buttonGoing);

    changesClicklinkReturnGoing(linkReturnGoing, paragraphGoing, buttonInterested, buttonGoing, contentbuttonActivities);
  });
}

function changesClicklinkReturnGoing(linkReturnGoing, paragraphGoing,validationGoing, buttonInterested, buttonGoing, contentbuttonActivities) {
  linkReturnGoing.addEventListener("click", function (event) {
    event.preventDefault();
    removeElements([validationGoing,paragraphGoing, linkReturnGoing]);
    buttonGoing.style.display = "flex";
    buttonInterested.style.display = "flex";
    buttonGoing.style.justifyContent = "center";
    buttonInterested.style.justifyContent = "center";
  });
}

function createParagraph(text) {
  const paragraph = document.createElement("p");
  paragraph.classList.add("paragraph");
  paragraph.textContent = text;
  return paragraph;
}

function createLink(text, href) {
  const link = document.createElement("a");
  link.classList.add("linkReturn");
  link.textContent = text;
  link.href = href;
  return link;
}

function imageValidationGoing( checkImage) {
  const imageValidation = document.createElement("img");
  imageValidation.classList.add('imageValidation');
  imageValidation.src = checkImage;
  imageValidation.alt = "Imagen validation green" ;
  return imageValidation;
}

function insertElementsBefore(parentElement, elements, referenceElement) {
  elements.forEach((element) => {
    parentElement.insertBefore(element, referenceElement);
  });
}

function removeElements(elements) {
  elements.forEach((element) => {
    element.remove();
  });
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
