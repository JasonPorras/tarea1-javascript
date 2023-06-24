import { cacheProxy } from "../api/cacheProxy.js";
import { tabsButton } from "../../js/config/config.js";

function renderStructureTabs() {
  const tabList = document.getElementById("tabList");

  tabsButton.forEach(function (value) {
    const li = document.createElement("li");
    const button = document.createElement("button");

    button.classList.add("tab");
    button.textContent = value;
    button.setAttribute("id", "" + value.toLowerCase());

    li.appendChild(button);
    tabList.appendChild(li);
  });
}

async function updateEventInformation(eventData) {
  console.log(eventData);

  const data = await cacheProxy[eventData]
  console.log(data);
  const tabContent = document.getElementById("tabContent");

  data.forEach(function ({date,id,image,location:{address,city,state},price,title}) {
    console.log(id);
  tabContent.innerHTML = "";

  const imageElement = document.createElement("img");
  imageElement.src = image;
  imageElement.alt = title;

  const locationElement = document.createElement("h2");
  locationElement.textContent = `${address}${city}${state}`;

  tabContent.appendChild(imageElement);
  tabContent.appendChild(locationElement);

})

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
