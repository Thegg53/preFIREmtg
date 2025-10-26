import { makeNav } from "./modules/nav.js"
import { getJSON } from "./modules/getJSON.js"


makeNav();
getJSON("lists/decks").then(deckData=>makeSearchBoxes(deckData));


function makeSearchBoxes(deckData){

  const output   = document.getElementById("search-output");
  const input    = document.getElementById("search-input" );
  const goButton = document.getElementById("goButton"     );

  [
    ["name", "Deck Name:    ", "Zoo"      ],
    ["main", "Main Includes:", "Tarmogoyf"],
    ["side", "Side Includes:", "Silence"  ],
    ["arch", "Archetype:    ", "Control"  ],
    ["cols", "Colors:       ", "UR"       ]
  ].forEach(arr=>input.appendChild(makeTextInput(...arr)));

  goButton.addEventListener("click", ()=>buildResults(
    performSearch(input, deckData),
    output)
  );
}

function makeTextInput(term, labelText, placeholder){
  const label       = document.createElement("label");
  label.htmlFor     = term;
  label.innerText   = labelText;

  const input       = document.createElement("input");
  input.placeholder = placeholder;
  input.id          = term;
  input.type        = "text";


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

  const elementWithText = (elementType, text) => {
    const element = document.createElement(elementType);
    element.textContent = text;
    return element;
  }

  const zipPairs   = (names = [], counts = []) => names.map((name, i) => [name, counts[i] ?? 0]);
  const renderList = (label, pairs) => {
    const wrap = document.createElement("div");
    wrap.appendChild(elementWithText("h4", label));
    const ul   = document.createElement("ul");
    pairs.forEach(([name, count]) => ul.appendChild(elementWithText("li", `${count} ${name}`)));
    wrap.appendChild(ul);
    return wrap;
  };

  const displayResult = ({ name, arch, cols, main, main_amnt, side, side_amnt }) => {
    const container = document.createElement("span");
    const mainPairs = zipPairs(main, main_amnt);
    const sidePairs = zipPairs(side, side_amnt);
    container.appendChild(elementWithText("h3"  , name     ));
    container.appendChild(renderList     ("Main", mainPairs));
    container.appendChild(renderList     ("Side", sidePairs));
    output.appendChild(container);
  };

  matches.forEach((match) => displayResult(match));

}
