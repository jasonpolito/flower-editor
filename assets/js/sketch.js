let v = [];
let rows = 60,
  cols = 120;

let canvas;

let pNumSlider, pLenSlider, diameterSlider, pSharpSlider;
let petalNum, pLength, diameter, pSharpness;

let heightSlider, curvatureSlider1, curvatureSlider2;
let flowerHeight, curvature1, curvature2;

let bumpSlider, bumpNumSlider;
let bump, bumpNum;

let pNum, fD, pLen, pSharp;
let fHeight, curve1, curve2;
let b, bNum;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight * 0.66, WEBGL);
  canvas.class("canvas relative");
  const uiContainer = "ui-container";

  colorMode(HSB, 360, 100, 100);
  angleMode(DEGREES);
  noStroke();

  petalNum = createDiv().parent(uiContainer);
  petalNum.class("valueDisplay");
  pNumSlider = createSlider(1, 20, 5, 1).parent(uiContainer);
  pNumSlider.class("Slider");

  diameter = createDiv().parent(uiContainer);
  diameter.class("valueDisplay");
  diameterSlider = createSlider(20, 250, 200, 10).parent(uiContainer);
  diameterSlider.class("Slider");

  pLength = createDiv().parent(uiContainer);
  pLength.class("valueDisplay");
  pLenSlider = createSlider(0, 300, 60, 10).parent(uiContainer);
  pLenSlider.class("Slider");

  pSharpness = createDiv().parent(uiContainer);
  pSharpness.class("valueDisplay");
  pSharpSlider = createSlider(0.0, 10.0, 0.4, 0.1).parent(uiContainer);
  pSharpSlider.class("Slider");

  flowerHeight = createDiv().parent(uiContainer);
  flowerHeight.class("valueDisplay");
  heightSlider = createSlider(0, 600, 300, 10).parent(uiContainer);
  heightSlider.class("Slider");

  curvature1 = createDiv().parent(uiContainer);
  curvature1.class("valueDisplay");
  curvatureSlider1 = createSlider(0.0, 4.0, 0.8, 0.1).parent(uiContainer);
  curvatureSlider1.class("Slider");

  curvature2 = createDiv().parent(uiContainer);
  curvature2.class("valueDisplay");
  curvatureSlider2 = createSlider(0.0, 1.0, 0.2, 0.05).parent(uiContainer);
  curvatureSlider2.class("Slider");

  bump = createDiv().parent(uiContainer);
  bump.class("valueDisplay");
  bumpSlider = createSlider(0.0, 5.0, 2.5, 0.5).parent(uiContainer);
  bumpSlider.class("Slider");

  bumpNum = createDiv().parent(uiContainer);
  bumpNum.class("valueDisplay");
  bumpNumSlider = createSlider(0, 20, 10, 1).parent(uiContainer);
  bumpNumSlider.class("Slider");
}

function draw() {
  clear();
  orbitControl(4, 4);

  rotateX(60);

  pNum = pNumSlider.value();
  fD = diameterSlider.value();
  pLen = pLenSlider.value();
  pSharp = pSharpSlider.value();

  fHeight = heightSlider.value();
  curve1 = curvatureSlider1.value();
  curve2 = curvatureSlider2.value();

  b = bumpSlider.value();
  bNum = bumpNumSlider.value();

  for (theta = 0; theta < rows; theta += 1) {
    v.push([]);
    for (let phi = 0; phi < cols; phi += 1) {
      let r =
        ((pLen * pow(abs(sin(((pNum / 2) * phi * 360) / cols)), pSharp) + fD) *
          theta) /
        rows;
      let x = r * cos((phi * 360) / cols);
      let y = r * sin((phi * 360) / cols);
      let z =
        vShape(fHeight, r / 100, curve1, curve2, 1.5) -
        200 +
        bumpiness(b, r / 100, bNum, (phi * 360) / cols);

      let pos = createVector(x, y, z);
      v[theta].push(pos);
    }
  }

  for (let theta = 0; theta < v.length; theta++) {
    fill(340, 100 - theta, 100);
    for (let phi = 0; phi < v[theta].length; phi++) {
      if (theta < v.length - 1 && phi < v[theta].length - 1) {
        beginShape();
        vertex(v[theta][phi].x, v[theta][phi].y, v[theta][phi].z);
        vertex(v[theta + 1][phi].x, v[theta + 1][phi].y, v[theta + 1][phi].z);
        vertex(
          v[theta + 1][phi + 1].x,
          v[theta + 1][phi + 1].y,
          v[theta + 1][phi + 1].z
        );
        vertex(v[theta][phi + 1].x, v[theta][phi + 1].y, v[theta][phi + 1].z);
        endShape(CLOSE);
      } else if (theta < v.length - 1 && phi == v[theta].length - 1) {
        beginShape();
        vertex(v[theta][phi].x, v[theta][phi].y, v[theta][phi].z);
        vertex(v[theta][0].x, v[theta][0].y, v[theta][0].z);
        vertex(v[theta + 1][0].x, v[theta + 1][0].y, v[theta + 1][0].z);
        vertex(v[theta + 1][phi].x, v[theta + 1][phi].y, v[theta + 1][phi].z);
        endShape(CLOSE);
      }
    }
  }

  petalNum.html("Number of the petals: " + pNumSlider.value());
  diameter.html("Diameter: " + diameterSlider.value());
  pLength.html("Petal length: " + pLenSlider.value());
  pSharpness.html("Petal sharpness: " + pSharpSlider.value());

  flowerHeight.html("Flower height: " + heightSlider.value());
  curvature1.html("Curvature 1: " + curvatureSlider1.value());
  curvature2.html("Curvature 2: " + curvatureSlider2.value());

  bump.html("Bumpiness: " + bumpSlider.value());
  bumpNum.html("Bumpiness number: " + bumpNumSlider.value());

  v = [];
}

function vShape(A, r, a, b, c) {
  return A * pow(Math.E, -b * pow(abs(r), c)) * pow(abs(r), a);
}

function bumpiness(A, r, f, angle) {
  return 1 + A * pow(r, 2) * sin(f * angle);
}

//allows for dynamic change in canvas size. This allows user to change the size of the window in any way and the code will adjust for it.
function windowResized() {
  resizeCanvas(windowWidth, windowHeight * 0.66);
}
