let showPreview = false;

export function applyCardPreviews(...parentIds){
  if (!showPreview) showPreview = makeCardPreviewDialog();
  parentIds.forEach(parentElementId =>{
    const parentElement = document.getElementById(parentElementId);
    // ensure this function only applies once per block
    if  (parentElement.dataset.previewUsed) throw new Error("Parent already has preview effect applied"); 
    else parentElement.dataset.previewUsed = "true";
    parentElement.querySelectorAll("img.card").forEach(e=>e.addEventListener("click",()=>showPreview(e.src)));
  });
}

function makeCardPreviewDialog() {
  const diaImg      = document.createElement("img"   ); 
        diaImg.classList.add( "card" );
        diaImg.addEventListener("mouseleave", (     ) => diaImg.style.transform="none");
        diaImg.addEventListener("mousemove" , (event) => {effect3d(event, diaImg)}    );
  const dia         = document.createElement("dialog"); 
        dia.id      = "card-preview-dialog";
        dia.appendChild(diaImg );                         
  document.body.appendChild(dia);

  const hidePreview = (   ) => { diaImg.src = "" ; dia.close();     dia.style.display="none"; };
  const showPreview = (src) => { diaImg.src = src; dia.showModal(); dia.style.display="flex"; };
  dia.addEventListener("click", hidePreview);
  return showPreview;
}

const maxRotation =  10;
const minRotation = -10;
function effect3d(event, element){
  const { left, top, width, height } = element.getBoundingClientRect();
  const offsetX = event.clientX - left;
  const offsetY = event.clientY - top;
  // normalize to [-0.5, 0.5]
  const nx = offsetX / width  - 0.5;
  const ny = offsetY / height - 0.5;
  // map to degrees, clamp
  let rotateY =  nx * 2 * maxRotation; // left/right
  let rotateX = -ny * 2 * maxRotation; // up/down (invert Y)
  //enforce within bounds
  rotateX = Math.max(minRotation, Math.min(maxRotation, rotateX));
  rotateY = Math.max(minRotation, Math.min(maxRotation, rotateY));
  //apply
  element.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
}
