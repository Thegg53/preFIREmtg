import { makeNav               } from "./modules/nav.js"
import { getJSON               } from "./modules/getJSON.js"
import { addHoverCardToElement } from "./modules/hoverCard.js"
import { makeDownloadLink, elementWithText } from "./modules/utils.js";

makeNav();
getJSON("lists/decks").then(deckData=>makeSearchBoxes(deckData));


function makeSearchBoxes(deckData){

  const output   = document.getElementById("search-output");
  const input    = document.getElementById("search-input" );
  const goButton = document.getElementById("goButton"     );

  [
    //["name", "Deck Name:    ", "Zoo"      ],
    ["main", "Main:" , "Tarmogoyf"       ],
    ["main", "And:"  , "Stomping Ground" ],
    ["main", "And:"  , "Noble Heirarch"  ],
    ["side", "Side:" , "Silence"         ],
    ["side", "And:"  , "Supreme Verdict" ],
    ["side", "And:"  , "Mana Leak"       ],
    //["arch", "Archetype:    ", "Control"  ],
    //["cols", "Colors:       ", "UR"       ]
  ].forEach(arr=>input.appendChild(makeTextInput(...arr)));

  goButton.addEventListener("click", ()=>buildResults(performSearch(input, deckData), output));
}

function makeTextInput(term, labelText, placeholder){
  const label       = document.createElement("label");
  label.htmlFor     = term;
  label.innerText   = labelText;

  const input       = document.createElement("input");
  input.placeholder = placeholder;
  input.id          = term;
  input.type        = "text";
  input.spellcheck  = false;


  const container   = document.createElement("div");
  [label, input].forEach(e=>container.appendChild(e));
  return container;
}

function performSearch(input, deckData) {
  const params = Array.from(input.querySelectorAll("input")).map(inp => ({
    key: inp.id,
    val: inp.value.trim().toLowerCase()
  }));

  const isMatch = (deck) => params
    .filter(param=>param.val!=="")
    .some  (param=>deck[param.key].some(item => item.toLowerCase().includes(param.val.toLowerCase())))

  return deckData.filter(deck => isMatch(deck));
}

function buildResults(matches, output){

  output.innerHTML = "";

  const zipPairs   = (names = [], counts = []) => { return names.map((name, i) => [name, counts[i] ?? 0]) };
  const renderList = (label, pairs) => {
    const wrap = document.createElement("div");
    wrap.appendChild(elementWithText("h4", label));
    const ul   = document.createElement("ul");
    pairs.forEach(([name, count]) => {
      const li = elementWithText("li", `${count} ${name}`)
      addHoverCardToElement(li, name);
      ul.appendChild(li);
    });
    wrap.appendChild(ul);
    return wrap;
  };

  const displayResult = ({ name, arch, cols, main, main_amnt, side, side_amnt }) => {
    const container = document.createElement("span");
    const mainPairs = zipPairs(main, main_amnt);
    const sidePairs = zipPairs(side, side_amnt);
    container.appendChild(elementWithText("h3"        , name     ));
    container.appendChild(renderList     ("Main"      , mainPairs));
    container.appendChild(renderList     ("Sideboard:", sidePairs));
    container.appendChild(makeDownloadLink(`INPUT/${name}.txt`, "Download"));
    output.appendChild(container);
  };

  if (matches.length === 0) output.appendChild(elementWithText("p", "No Results found."));
  else matches.forEach((match) => displayResult(match));

}
