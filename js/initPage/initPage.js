import { cacheProxy } from "../api/cacheProxy.js";
import { tabsButton, defaultImage, alternateImage } from "../../js/config/config.js";
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

  data.forEach(({ image, title, location: { address, city, state }, date, price }) => {
    const contentCard = document.createElement("div");
    contentCard.classList.add("contentCard");

    //card
    const imgContent = document.createElement("img");
    imgContent.classList.add('imgContent');
    imgContent.src = image;
    imgContent.alt = title;

    const titleContent = document.createElement('h3');
    titleContent.classList.add('titleContent');
    titleContent.textContent = title;

    const timeContent = document.createElement('p');
    timeContent.classList.add('timeContent');
    timeContent.textContent = formatDate(date);

    const locationContent = document.createElement("p");
    locationContent.classList.add('locationContent');
    locationContent.textContent = formatLocation(address, city, state);

    const priceContent = document.createElement("p");
    priceContent.classList.add("priceContent");
    priceContent.textContent = formatPrice(price);

    //button like
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

    //buttons activities
    const contentbuttonActivities = document.createElement("div");
    contentbuttonActivities.classList.add("contentbuttonActivities");

    const buttonInterested = document.createElement("button");
    buttonInterested.classList.add("buttonInterested", "settingButtonActivities");
    buttonInterested.type = "button";
    buttonInterested.textContent = "Interested";

    const buttonGoing = document.createElement("button");
    buttonGoing.classList.add("buttonGoing", "settingButtonActivities");
    buttonGoing.type = "button";
    buttonGoing.textContent = "Going!";

    contentbuttonActivities.appendChild(buttonInterested);
    contentbuttonActivities.appendChild(buttonGoing);

    contentCard.append(
      imgContent,
      containerBtnLike,
      titleContent,
      timeContent,
      locationContent,
      priceContent,
      contentbuttonActivities
    );
    containerEventsCards.appendChild(contentCard);

    clickbuttonLike(buttonContent);
    changesClickButtonInterested(buttonInterested, buttonGoing,contentbuttonActivities);

  });
}

function changesClickButtonInterested(buttonInterested, buttonGoing,contentbuttonActivities) {
  buttonInterested.addEventListener("click", function () {
    const paragraph = document.createElement("p");
    paragraph.textContent = "You're interested in going.";
    const linkreturn = document.createElement("a");
    linkreturn.textContent = "Changed your mind?";
    paragraph.style.textAlign = "left"
    linkreturn.style.textAlign = "left"

    buttonGoing.classList.remove("settingButtonActivities");
    buttonGoing.classList.add("changeGoing");
    buttonInterested.style.display = "none";
    contentbuttonActivities.style.display = "block"
    contentbuttonActivities.style.textAlign = "center"


    contentbuttonActivities.appendChild(paragraph);
    contentbuttonActivities.appendChild(linkreturn);

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
