import { renderStructureTabs, tabsSelected } from "./initPage/initPage.js";
import { tabsButton } from "../config/config.js";

renderStructureTabs();
tabsSelected();

function getIdBottonSelected() {
  const botones = document.querySelectorAll(".tab");
  let ultimoIdClickeado = "";

  botones.forEach(boton => {
    boton.addEventListener('click', function() {
      const valorBoton = boton.id;
      if (valorBoton !== ultimoIdClickeado) {
        ultimoIdClickeado = valorBoton;
        fetchEventsByCategory(valorBoton);
      }
    });
  });
}

function fetchEventsByCategory(valorBoton) {
  const originUrl = "https://knassbani2.execute-api.us-east-2.amazonaws.com/events/";
  const url = originUrl + valorBoton;

  fetch(url)
    .then(response => response.json())
    .then((data) => {
      data.forEach(evento => {
      });
      console.log(data);
    })
    .catch(error => console.log(error));
}

getIdBottonSelected();

