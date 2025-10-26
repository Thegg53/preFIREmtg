import { banlist            } from "../data/lists/banlist.js"
import { watchlist          } from "../data/lists/watchlist.js"
import { makeNav            } from "./modules/nav.js"
import { appendCardImage    } from "./modules/drawCards.js"
import { applyCardPreviews  } from "./modules/card3d.js"

makeNav();
createBanlistCards();
applyCardPreviews("banlist", "watchlist");



function createBanlistCards(){
  const banlistElement       = document.getElementById("banlist"  );
  const watchlistElement     = document.getElementById("watchlist");
  banlist  .forEach(cardName => appendCardImage(banlistElement  , cardName));
  watchlist.forEach(cardName => appendCardImage(watchlistElement, cardName));
}

