import { renderStructureTabs, buttonSelected } from "../modules/initPage.js";
import { tabListId, tabsButton } from "../config/config.js";
import { createImage, createLink } from "../modules/changeClickButtonEvents.js";

renderStructureTabs(tabListId, tabsButton);
buttonSelected();


function createLinkPages() {
    const arrowLink = createImage("/images/rightArrowLink.png", "arrowLink", "link para otra página");
    const accountLink = createLink("My account", "/account.html", "linkMyAccount");

    const containerMain = document.querySelector(".container-main");
    const containerUlTabs = document.querySelector(".containerUlTabs");

    const containerLinkMyAccount = document.createElement("div")
    containerLinkMyAccount.className = ("containerLinkMyAccount")

    containerLinkMyAccount.appendChild(accountLink);
    containerLinkMyAccount.appendChild(arrowLink);

    containerMain.insertBefore(containerLinkMyAccount, containerUlTabs);
}

createLinkPages()

export { createLinkPages }