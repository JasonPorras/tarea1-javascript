function createCalendar() {
  const currentDate = new Date();
  let currentMonth = currentDate.getMonth();
  let currentYear = currentDate.getFullYear();
  const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const calendarContainer = document.getElementById("calendarContainer");

  function renderCalendar(month, year) {
    const monthYearElement = createMonthYearElement(month, year);
    const previousButton = createPreviousButton();
    const nextButton = createNextButton();
    const calendarTable = createCalendarTable(month, year);

    calendarContainer.innerHTML = "";

    const calendarHeader = document.createElement("div");
    calendarHeader.classList.add("calendarHeader");

    calendarHeader.appendChild(previousButton);
    calendarHeader.appendChild(monthYearElement);
    calendarHeader.appendChild(nextButton);

    calendarContainer.appendChild(calendarHeader);
    calendarContainer.appendChild(calendarTable);
  }

  function createMonthYearElement(month, year) {
    const monthYearElement = document.createElement("h2");
    monthYearElement.classList.add("monthYearElement");
    monthYearElement.textContent = `${monthNames[month]} ${year}`;
    return monthYearElement;
  }

  function createPreviousButton() {
    const previousButton = document.createElement("button");
    const previousButtonImg = document.createElement("img");
    previousButtonImg.src = "images/arrowLeft.png";
    previousButtonImg.alt = "Mes anterior";
    previousButtonImg.classList.add("buttonImg");
    previousButton.appendChild(previousButtonImg);
    previousButton.addEventListener("click", previousMonth);
    return previousButton;
  }

  function createNextButton() {
    const nextButton = document.createElement("button");
    const nextButtonImg = document.createElement("img");
    nextButtonImg.src = "images/arrowRight.png";
    nextButton.alt = "Mes siguiente";
    nextButtonImg.classList.add("buttonImg");
    nextButton.appendChild(nextButtonImg);
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
    const daysOfWeek = [
      "Domingo",
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
    ];

    for (let i = 0; i < daysOfWeek.length; i++) {
      const headerCell = document.createElement("th");
      headerCell.textContent = daysOfWeek[i];
      headerRow.appendChild(headerCell);
    }

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

export { createCalendar };
