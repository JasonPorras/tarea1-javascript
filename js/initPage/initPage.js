import { cacheProxy } from "../api/cacheProxy.js";
import { tabsButton } from "../../js/config/config.js";
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
  const tabContent = document.getElementById("tabContent");
  tabContent.innerHTML = "";

  data.forEach(({ image, title, location: { address, city, state }, date, price }) => {
    const tabContentCard = document.createElement("div");
    tabContentCard.classList.add("tabContentCard");

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

    tabContentCard.appendChild(imgContent);
    tabContentCard.appendChild(titleContent);
    tabContentCard.appendChild(timeContent);
    tabContentCard.appendChild(locationContent);
    tabContentCard.appendChild(priceContent);

    tabContent.appendChild(tabContentCard);
  });
}

function bottonSelected() {
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

export { renderStructureTabs, bottonSelected };