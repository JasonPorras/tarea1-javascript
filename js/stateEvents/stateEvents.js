const state = {
  favoritos: [],
  interesados: [],
  going: []
};

function addToFavorites(nombre) {
  state.favoritos.push(nombre);
  saveState();
}

function addToInterested(nombre) {
  state.interesados.push(nombre);
  saveState();
}

function addToGoing(nombre) {
  state.going.push(nombre);
  saveState();
}

function saveState() {
  localStorage.setItem("myState", JSON.stringify(state));
}

// Recuperar el estado almacenado, si existe
const storedState = localStorage.getItem("myState");
if (storedState) {
const state = JSON.parse(storedState);
}

console.log(storedState);
console.log(state);

export {addToFavorites,addToInterested,addToGoing}
