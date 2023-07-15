import { renderStructureTabs, buttonSelected } from "../modules/initPage.js";
import { tabListId, tabsButton } from "../config/config.js";
import { createLink } from "../modules/changeClickButtonEvents.js";

renderStructureTabs(tabListId, tabsButton);
buttonSelected();

const hola = createLink("My account", "/account.html", "linkMyAccount");

const containerMain = document.querySelector(".container-main");
const containerUlTabs = document.querySelector(".containerUlTabs");

const containerLinkMyAccount = document.createElement("div")
containerLinkMyAccount.className = ("containerLinkMyAccount")

const arrowLink = document.createElement("img");
arrowLink.classList.add("arrowLink");
arrowLink.src = "/images/rightArrowLink.png";
arrowLink.alt = "link para otra página";

containerLinkMyAccount.appendChild(hola);
containerLinkMyAccount.appendChild(arrowLink);

containerMain.insertBefore(containerLinkMyAccount, containerUlTabs);


