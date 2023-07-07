import { tabsButton} from "../config/config.js";
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
        createCalendar()
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

function createCalendar() {
  const currentDate = new Date();
  let currentMonth = currentDate.getMonth();
  let currentYear = currentDate.getFullYear();
  const monthNames = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  const calendarContainer = document.getElementById("calendarContainer");

  function renderCalendar(month, year) {
    const monthYearElement = createMonthYearElement(month, year);
    const previousButton = createPreviousButton();
    const nextButton = createNextButton();
    const calendarTable = createCalendarTable(month, year);

    calendarContainer.innerHTML = "";
    calendarContainer.appendChild(monthYearElement);
    calendarContainer.appendChild(previousButton);
    calendarContainer.appendChild(nextButton);
    calendarContainer.appendChild(calendarTable);
  }

  function createMonthYearElement(month, year) {
    const monthYearElement = document.createElement("h2");
    monthYearElement.textContent = `${monthNames[month]} ${year}`;
    return monthYearElement;
  }

  function createPreviousButton() {
    const previousButton = document.createElement("button");
    previousButton.textContent = "Mes anterior";
    previousButton.addEventListener("click", previousMonth);
    return previousButton;
  }

  function createNextButton() {
    const nextButton = document.createElement("button");
    nextButton.textContent = "Mes siguiente";
    nextButton.addEventListener("click", nextMonth);
    return nextButton;
  }

  function createCalendarTable(month, year) {
    const calendarTable = document.createElement("table");
    const headerRow = createHeaderRow();
    const firstDay = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const startIndex = firstDay.getDay();
    const rowCount = Math.ceil((startIndex + daysInMonth) / 7);

    let day = 1;
    for (let i = 0; i < rowCount; i++) {
      const row = document.createElement("tr");
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < startIndex) {
          const cell = document.createElement("td");
          row.appendChild(cell);
        } else if (day > daysInMonth) {
          break;
        } else {
          const cell = createCalendarCell(day);
          row.appendChild(cell);
          day++;
        }
      }
      calendarTable.appendChild(row);
    }

    return calendarTable;
  }

  function createHeaderRow() {
    const headerRow = document.createElement("tr");
    ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].forEach((day) => {
      const headerCell = document.createElement("th");
      headerCell.textContent = day;
      headerRow.appendChild(headerCell);
    });
    return headerRow;
  }

  function createCalendarCell(day) {
    const cell = document.createElement("td");
    cell.textContent = day;
    return cell;
  }

  function previousMonth() {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    renderCalendar(currentMonth, currentYear);
  }

  function nextMonth() {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    renderCalendar(currentMonth, currentYear);
  }

  renderCalendar(currentMonth, currentYear);
}

export { renderStructureTabs, buttonSelected, };
