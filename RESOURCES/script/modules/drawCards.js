export function appendCardImage(parent, cardName) {
  const fileName  = cardName.replaceAll(" ","_").replaceAll("'","_").replaceAll(",","_");
  const p         = document.createElement("p");
  p.innerText     = cardName;
  const img       = document.createElement("img");
  const src       = `RESOURCES/img/card/large/${fileName}.webp`;
  img.classList.add("card");
  img.src = src;
  img.alt = cardName;


  const container = document.createElement("span");
  container.classList.add("card-container");
  container.appendChild(img);
  container.appendChild(p);

  parent.appendChild(container);
}
