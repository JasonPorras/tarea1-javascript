import { renderStructureTabs, buttonSelected } from "../modules/initPage.js";
import { tabListId, tabsAccount } from "../config/config.js";
import { createLinkPages } from "./main.js";

renderStructureTabs(tabListId, tabsAccount);
buttonSelected();

createLinkPages();