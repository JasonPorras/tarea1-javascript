import { renderStructureTabs, tabsSelected } from "./initPage/initPage.js";
import { tabsButton } from "../config/config.js";

renderStructureTabs();
tabsSelected();

const cache = {};

function getIdBottonSelected() {
  const botones = document.querySelectorAll(".tab");
  let ultimoIdClickeado = "";

  botones.forEach(boton => {
    boton.addEventListener('click', function() {
      const valorBoton = boton.id;
      if (valorBoton !== ultimoIdClickeado) {
        ultimoIdClickeado = valorBoton;

        if (cache[valorBoton]) {
          console.log('Datos cargados desde caché:', cache[valorBoton]);
        } else {
          fetchEventsByCategory(valorBoton);
        }
      }
    });
  });

  const primerBoton = botones[0];
  const valorPrimerBoton = primerBoton.id;
  fetchEventsByCategory(valorPrimerBoton);
}

function fetchEventsByCategory(valorBoton) {
  const originUrl = "https://knassbani2.execute-api.us-east-2.amazonaws.com/events/";
  const url = originUrl + valorBoton;

  fetch(url)
    .then(response => response.json())
    .then((data) => {
      cache[valorBoton] = data; // Guardar los datos en caché
      data.forEach(evento => {
        // Realizar las operaciones necesarias con los datos del evento
      });
      console.log(data);
    })
    .catch(error => console.log(error));
}

getIdBottonSelected();

