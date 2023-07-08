import { createCalendar } from "../calendar/createdCalendar.js";
import { renderEventsCards } from "../modules/renderEventsCard.js";

function renderStructureTabs(tabListId, tabsButton) {
  const tabList = document.getElementById(tabListId);

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

function buttonSelected() {
  const tabs = document.getElementsByClassName("tab");
  const tabsArray = [...tabs];

  tabsArray.forEach((tab, index) => {
    tab.addEventListener("click", async function () {
      const eventData = this.getAttribute("data-category");
      const calendarContainer = document.getElementById("calendarContainer");

      if (eventData === "calendar") {
        createCalendar();
        calendarContainer.style.display = "block";
      } else {
        renderEventsCards(eventData);
        calendarContainer.style.display = "none";
      }

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

export { renderStructureTabs, buttonSelected };
