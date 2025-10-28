/**
 * Returns a scryfall-compliant cardname. 
 * eg Jace, the Mind Scultptor => Jace__the_Mind_Sculptor
 * */
export function makeCleanCardName(cardName) {
  return cardName.replaceAll(" ","_").replaceAll("'","_").replaceAll(",","_");
}

function getCardSRC(cardName, size) {
  console.log(cardName)
  return `RESOURCES/img/card/${size}/${makeCleanCardName(cardName)}.webp`;
}

export function getSmallCardSRC(cardName) { return getCardSRC(cardName, "small"); }
export function getLargeCardSRC(cardName) { return getCardSRC(cardName, "large"); }

export function elementWithText(elementType, text) {
  const element = document.createElement(elementType);
  element.textContent = text;
  return element;
}

export function makeDownloadLink (filePath, text="Download") {
  const element = elementWithText("button", text);
  element.addEventListener("click", () => {
    const link    = document.createElement("a");
    link.href     = filePath;
    link.download = filePath.split("/").pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
  return element;
}
