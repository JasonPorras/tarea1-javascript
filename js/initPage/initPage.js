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

async function getIdBottonSelected() {
  const botones = document.querySelectorAll(".tab");
  let ultimoIdClickeado = "";

  botones.forEach(boton => {
    boton.addEventListener('click', async function () {
      const valorBoton = boton.id;
      if (valorBoton !== ultimoIdClickeado) {
        ultimoIdClickeado = valorBoton;
      }
      console.log(await cacheProxy[valorBoton])
    });
  });

  const primerBoton = botones[0];
  const valorPrimerBoton = primerBoton.id;

}

export { renderStructureTabs, tabsSelected, getIdBottonSelected };