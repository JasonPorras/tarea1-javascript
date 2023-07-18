import { renderStructureTabs, buttonSelected } from "../modules/initPage.js";
import { tabListId, tabsButton } from "../config/config.js";

renderStructureTabs(tabListId, tabsButton);
buttonSelected();


const state = {
  favorites: [],
  interested: [],
  going: [],
};

function getState() {
  return { ...state };
}

function setStateFavorites(newState) {
  state.favorites = [...state.favorites, newState];
}



  export {getState, setStateFavorites };



