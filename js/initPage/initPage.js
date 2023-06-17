import { tabsButton } from "../../config/config.js";

function renderStructureTabs() {
  const tabList = document.getElementById("tabList");

  tabsButton.forEach(function (value) {
    const li = document.createElement("li");
    const button = document.createElement("button");

    button.classList.add("tab");
    button.textContent = value.name;
    button.setAttribute("id", "" + value.id.toLowerCase());

    li.appendChild(button);
    tabList.appendChild(li);
  });
}

function tabsSelected() {
  const tabs = document.getElementsByClassName("tab");
  const tabsArray = [...tabs];

  tabsArray.forEach((tab) => {
    tab.addEventListener("click", function () {
      const selectedTab = this;

      tabsArray.forEach((tab) => {
        tab.classList.remove("selected");
      });

      selectedTab.classList.add("selected");
    });
  });
}

export { renderStructureTabs, tabsSelected };