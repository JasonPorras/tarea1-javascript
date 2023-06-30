function insertElementsBefore(parentElement, elements, referenceElement) {
  elements.forEach((element) => {
    parentElement.insertBefore(element, referenceElement);
  });
}

function removeElements(elements) {
  elements.forEach((element) => {
    element.remove();
  });
}

export {insertElementsBefore,removeElements}