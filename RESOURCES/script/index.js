import { makeNav             } from "./modules/nav.js"
import { addPreviewToElementFromCardName } from "./modules/card3d.js"
import { cardImage } from "./modules/drawCards.js"

makeNav();
const container = document.getElementById("image-container-pillars");
const pillars   = ["Splinter_Twin", "Faithless_Looting", "Tarmogoyf", "Birthing_Pod", "Mox_Opal"]
container.classList.add(`enforcedGrid-${pillars.length}`);
pillars.forEach(cardName=>{
  const img = cardImage(cardName);
  addPreviewToElementFromCardName(img, cardName);
  container.appendChild(img);
})
