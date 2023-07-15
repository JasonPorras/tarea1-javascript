import { insertElementsBefore, removeElements, } from "../utils/formatClickButtonEvents.js";
import { checkImage, defaultImage, alternateImage } from "../config/config.js";
import { addToFavorites, addToGoing, addToInterested, } from "../stateEvents/stateEvents.js";

function changesClickButtonInterested(buttonInterested, buttonGoing, contentbuttonActivities, id, title) {
  buttonInterested.addEventListener("click", function () {
    const paragraphInterested = createParagraph("You're interested in going.");
    const linkReturnInterested = createLink("Changed your mind?", "#");

    buttonGoing.classList.add("changeGoing");
    buttonInterested.style.display = "none";
    contentbuttonActivities.style.display = "block";

    insertElementsBefore(contentbuttonActivities, [paragraphInterested, linkReturnInterested], buttonGoing);

    changesClicklinkReturnInterested(linkReturnInterested, paragraphInterested, buttonInterested, buttonGoing, contentbuttonActivities);

    addToInterested("interested");
  });
}

function changesClicklinkReturnInterested(linkReturnInterested, paragraphInterested, buttonInterested, buttonGoing, contentbuttonActivities) {
  linkReturnInterested.addEventListener("click", function (event) {
    event.preventDefault();
    removeElements([paragraphInterested, linkReturnInterested]);
    buttonGoing.classList.remove("changeGoing");
    buttonGoing.classList.add("settingButtonActivities");
    buttonInterested.style.display = "flex";
    contentbuttonActivities.style.display = "flex";
    buttonInterested.style.justifyContent = "center";
  });
}

function changesClickButtonGoing(buttonGoing, buttonInterested) {
  buttonGoing.addEventListener("click", function () {
    const contentbuttonActivities = buttonGoing.parentNode;

    const paragraphInterested =
      contentbuttonActivities.querySelector(".paragraph");
    const linkReturnInterested =
      contentbuttonActivities.querySelector(".linkReturn");
    if (paragraphInterested && linkReturnInterested) {
      removeElements([paragraphInterested, linkReturnInterested]);
    }

    const containerTextGoing = document.createElement("div");
    containerTextGoing.classList.add("containerTextGoing");

    const paragraphGoing = createParagraph("You're going to this event!");
    const linkReturnGoing = createLink("Changed your mind?", "#", "linkReturn");
    const validationGoing = createImage(checkImage);

    containerTextGoing.appendChild(paragraphGoing);
    containerTextGoing.appendChild(linkReturnGoing);

    buttonGoing.style.display = "none";
    buttonGoing.classList.remove("changeGoing");
    buttonInterested.style.display = "none";
    contentbuttonActivities.style.display = "flex";
    contentbuttonActivities.style.justifyContent = "left";
    insertElementsBefore(contentbuttonActivities, [validationGoing, containerTextGoing], buttonGoing);

    changesClicklinkReturnGoing(linkReturnGoing, paragraphGoing, buttonInterested, buttonGoing, contentbuttonActivities);

    addToGoing("Going");
  });
}

function changesClicklinkReturnGoing(linkReturnGoing, paragraphGoing, buttonInterested, buttonGoing, contentbuttonActivities) {
  const selectContainerText = contentbuttonActivities.querySelector(".containerTextGoing");
  const selectImageValidation = contentbuttonActivities.querySelector(".imageValidation");

  linkReturnGoing.addEventListener("click", function (event) {
    event.preventDefault();
    removeElements([selectContainerText, selectImageValidation]);
    buttonGoing.style.display = "flex";
    buttonInterested.style.display = "flex";
    contentbuttonActivities.style.display = "flex";
    contentbuttonActivities.style.justifyContent = "space-around";
    buttonGoing.style.justifyContent = "center";
    buttonInterested.style.justifyContent = "center";
  });
}

function createParagraph(text) {
  const paragraph = document.createElement("p");
  paragraph.classList.add("paragraph");
  paragraph.textContent = text;
  return paragraph;
}

function createLink(text, href,pato) {
  const link = document.createElement("a");
  link.classList.add = pato;
  link.textContent = text;
  link.href = href;
  return link;
}

function createImage(checkImage) {
  const imagesLink = document.createElement("img");
  imagesLink.classList.add("imageValidation");
  imagesLink.src = checkImage;
  imagesLink.alt = "Imagen validation green";
  return imagesLink;
}

function clickbuttonLike(buttonContent) {
  buttonContent.addEventListener("click", function () {
    const image = buttonContent.querySelector("img");
    const isLiked = image.classList.contains("liked");

    if (isLiked) {
      image.src = defaultImage;
      image.classList.remove("liked");
    } else {
      image.src = alternateImage;
      image.classList.add("liked");
      addToFavorites("Favorite");
    }
  });
}

export { changesClickButtonInterested, changesClickButtonGoing, clickbuttonLike, createLink };
