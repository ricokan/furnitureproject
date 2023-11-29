//example with multiple models
var mybed = ["./models/bed.glb", "./models/bed2.glb"]
var counterBed = 0;
document.getElementById("change-bed").addEventListener("click", function() {
    counterBed++;
    if (counterBed==2) { 
        counterBed = 0;
    }
    document.getElementById("bed").src = mybed[counterBed];
});

var mybeanbag = ["./models/bean_bag.glb", "./models/bean_bag2.glb", "./models/bean_bag3.glb"]
var counterBeanBag = 0;
document.getElementById("change-beanbag").addEventListener("click", function() {
    counterBeanBag++;
    if (counterBeanBag==3) { 
        counterBeanBag = 0;
    }
    document.getElementById("beanbag").src = mybeanbag[counterBeanBag];
});

var myBeanBagcolour = ["./models/bean_bag.glb", "./models/bean_bag_green.glb", "./models/bean_bag_pink.glb"]
var counterBeanBagcolour = 0;
document.getElementById("change-colour").addEventListener("click", function() {
    counterBeanBagcolour++;
    if (counterBeanBagcolour==3) { 
        counterBeanBagcolour = 0;
    }
    document.getElementById("beanbag").src = myBeanBagcolour[counterBeanBagcolour];
});

const modelViewer = document.querySelector('#dimension-demo');

modelViewer.querySelector('#src').addEventListener('input', (event) => {
  modelViewer.src = event.target.value;
});

const checkbox = modelViewer.querySelector('#show-dimensions');

const dimElements = [...modelViewer.querySelectorAll('button'), modelViewer.querySelector('#dimLines')];

function setVisibility(visible) {
  dimElements.forEach((element) => {
    if (visible) {
      element.classList.remove('hide');
    } else {
      element.classList.add('hide');
    }
  });
}

checkbox.addEventListener('change', () => {
  setVisibility(checkbox.checked);
});

modelViewer.addEventListener('ar-status', (event) => {
  setVisibility(event.detail.status !== 'session-started');
});

// update svg
function drawLine(svgLine, dotHotspot1, dotHotspot2, dimensionHotspot) {
  if (dotHotspot1 && dotHotspot2) {
    svgLine.setAttribute('x1', dotHotspot1.canvasPosition.x);
    svgLine.setAttribute('y1', dotHotspot1.canvasPosition.y);
    svgLine.setAttribute('x2', dotHotspot2.canvasPosition.x);
    svgLine.setAttribute('y2', dotHotspot2.canvasPosition.y);

    // use provided optional hotspot to tie visibility of this svg line to
    if (dimensionHotspot && !dimensionHotspot.facingCamera) {
      svgLine.classList.add('hide');
    }
    else {
      svgLine.classList.remove('hide');
    }
  }
}

const dimLines = modelViewer.querySelectorAll('line');

const renderSVG = () => {
  drawLine(dimLines[0], modelViewer.queryHotspot('hotspot-dot+X-Y+Z'), modelViewer.queryHotspot('hotspot-dot+X-Y-Z'), modelViewer.queryHotspot('hotspot-dim+X-Y'));
  drawLine(dimLines[1], modelViewer.queryHotspot('hotspot-dot+X-Y-Z'), modelViewer.queryHotspot('hotspot-dot+X+Y-Z'), modelViewer.queryHotspot('hotspot-dim+X-Z'));
  drawLine(dimLines[2], modelViewer.queryHotspot('hotspot-dot+X+Y-Z'), modelViewer.queryHotspot('hotspot-dot-X+Y-Z')); // always visible
  drawLine(dimLines[3], modelViewer.queryHotspot('hotspot-dot-X+Y-Z'), modelViewer.queryHotspot('hotspot-dot-X-Y-Z'), modelViewer.queryHotspot('hotspot-dim-X-Z'));
  drawLine(dimLines[4], modelViewer.queryHotspot('hotspot-dot-X-Y-Z'), modelViewer.queryHotspot('hotspot-dot-X-Y+Z'), modelViewer.queryHotspot('hotspot-dim-X-Y'));
};

modelViewer.addEventListener('load', () => {
  const center = modelViewer.getBoundingBoxCenter();
  const size = modelViewer.getDimensions();
  const x2 = size.x / 2;
  const y2 = size.y / 2;
  const z2 = size.z / 2;

  modelViewer.updateHotspot({
    name: 'hotspot-dot+X-Y+Z',
    position: `${center.x + x2} ${center.y - y2} ${center.z + z2}`
  });

  modelViewer.updateHotspot({
    name: 'hotspot-dim+X-Y',
    position: `${center.x + x2 * 1.2} ${center.y - y2 * 1.1} ${center.z}`
  });
  modelViewer.querySelector('button[slot="hotspot-dim+X-Y"]').textContent =
      `${(size.z * 100).toFixed(0)} cm`;

  modelViewer.updateHotspot({
    name: 'hotspot-dot+X-Y-Z',
    position: `${center.x + x2} ${center.y - y2} ${center.z - z2}`
  });

  modelViewer.updateHotspot({
    name: 'hotspot-dim+X-Z',
    position: `${center.x + x2 * 1.2} ${center.y} ${center.z - z2 * 1.2}`
  });
  modelViewer.querySelector('button[slot="hotspot-dim+X-Z"]').textContent =
      `${(size.y * 100).toFixed(0)} cm`;

  modelViewer.updateHotspot({
    name: 'hotspot-dot+X+Y-Z',
    position: `${center.x + x2} ${center.y + y2} ${center.z - z2}`
  });

  modelViewer.updateHotspot({
    name: 'hotspot-dim+Y-Z',
    position: `${center.x} ${center.y + y2 * 1.1} ${center.z - z2 * 1.1}`
  });
  modelViewer.querySelector('button[slot="hotspot-dim+Y-Z"]').textContent =
      `${(size.x * 100).toFixed(0)} cm`;

  modelViewer.updateHotspot({
    name: 'hotspot-dot-X+Y-Z',
    position: `${center.x - x2} ${center.y + y2} ${center.z - z2}`
  });

  modelViewer.updateHotspot({
    name: 'hotspot-dim-X-Z',
    position: `${center.x - x2 * 1.2} ${center.y} ${center.z - z2 * 1.2}`
  });
  modelViewer.querySelector('button[slot="hotspot-dim-X-Z"]').textContent =
      `${(size.y * 100).toFixed(0)} cm`;

  modelViewer.updateHotspot({
    name: 'hotspot-dot-X-Y-Z',
    position: `${center.x - x2} ${center.y - y2} ${center.z - z2}`
  });

  modelViewer.updateHotspot({
    name: 'hotspot-dim-X-Y',
    position: `${center.x - x2 * 1.2} ${center.y - y2 * 1.1} ${center.z}`
  });
  modelViewer.querySelector('button[slot="hotspot-dim-X-Y"]').textContent =
      `${(size.z * 100).toFixed(0)} cm`;

  modelViewer.updateHotspot({
    name: 'hotspot-dot-X-Y+Z',
    position: `${center.x - x2} ${center.y - y2} ${center.z + z2}`
  });

  renderSVG();

  modelViewer.addEventListener('camera-change', renderSVG);
});

(() => {
    const modelViewer = document.querySelector('#neutral-demo');
    const checkbox = document.querySelector('#neutral');
    
    checkbox.addEventListener('change',() => {
      modelViewer.environmentImage = checkbox.checked ? '' : 'legacy';
    });
  })();