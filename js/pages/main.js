import { renderStructureTabs, buttonSelected } from "../modules/initPage.js";
import { tabListId, tabsButton } from "../config/config.js";

renderStructureTabs(tabListId, tabsButton);
buttonSelected();


const containerMain = document.querySelector(".container-main");


const containerLinkMyAccount = document.createElement("div")
containerLinkMyAccount.className = ("linkMyAccount")
containerLinkMyAccount.className = ("linkMyAccount")
containerMain.appendChild(containerLinkMyAccount);
console.log(containerLinkMyAccount);
console.log(containerMain);


