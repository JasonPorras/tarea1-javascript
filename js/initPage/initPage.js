import { cacheProxy } from "../api/cacheProxy.js";
import { tabsButton } from "../../js/config/config.js";

function renderStructureTabs() {
  const tabList = document.getElementById("tabList");

  tabsButton.forEach(function ({label, category}) {
    const li = document.createElement("li");
    const button = document.createElement("button");

    button.classList.add("tab");
    button.textContent = label;
    button.setAttribute("dataCategory", category);

    li.appendChild(button);
    tabList.appendChild(li);
  });
}

async function updateEventInformation(eventData) {

  const data = await cacheProxy[eventData];
  
  const tabContent = document.getElementById("tabContent");
  tabContent.innerHTML = ""; 

  data.forEach(function ({ date, id, image, location: { address, city, state }, price, title }) {

    const imageElement = document.createElement("img");
    imageElement.src = image;
    imageElement.alt = title;

    const locationElement = document.createElement("h2");
    locationElement.textContent = `${address}${city}${state}`;

    tabContent.appendChild(imageElement);
    tabContent.appendChild(locationElement);
  });
}

function bottonSelected() {
  const tabs = document.getElementsByClassName("tab");
  const tabsArray = [...tabs];

  tabsArray.forEach((tab, index) => {
    tab.addEventListener("click", async function () {

      const eventData = tab.id;
      updateEventInformation(eventData);

      tabsArray.forEach((tab) => {
        tab.classList.remove("selected");
      });
      tab.classList.add("selected");
    });

    if (index === 0) {
      tab.classList.add("selected");
      const eventData = tab.id;
      updateEventInformation(eventData);
    }
  });

}
export { renderStructureTabs, bottonSelected };
