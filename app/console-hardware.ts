import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

// The shell matches the live 400 × 628.6 px control surface (100 px per unit).
// Manufacturing details are an original, illustrative handheld design.
export function createConsoleHardware() {
  const model = new THREE.Group();
  const front = new THREE.Group();
  const display = new THREE.Group();
  const board = new THREE.Group();
  const back = new THREE.Group();
  const parts = { front, display, board, back };
  model.add(...Object.values(parts));
  const textures: THREE.Texture[] = [];
  const plastic = new THREE.MeshPhysicalMaterial({
    color: '#b9b5a7',
    roughness: 0.62,
    metalness: 0.02,
    clearcoat: 0.08,
  });
  const charcoal = new THREE.MeshStandardMaterial({
    color: '#292c27',
    roughness: 0.65,
  });
  const rubber = new THREE.MeshStandardMaterial({
    color: '#4d5147',
    roughness: 0.93,
  });
  const silver = new THREE.MeshStandardMaterial({
    color: '#9b9c91',
    metalness: 0.85,
    roughness: 0.33,
  });
  const copper = new THREE.MeshStandardMaterial({
    color: '#c19b51',
    metalness: 0.72,
    roughness: 0.32,
  });
  const wine = new THREE.MeshPhysicalMaterial({
    color: '#652138',
    roughness: 0.34,
    clearcoat: 0.3,
  });
  const pcb = new THREE.MeshStandardMaterial({
    color: '#465d40',
    roughness: 0.7,
    metalness: 0.12,
  });

  const noise = new Uint8Array(128 * 128 * 4);
  let seed = 19;
  for (let i = 0; i < noise.length; i += 4) {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    noise[i] = noise[i + 1] = noise[i + 2] = 112 + (seed % 32);
    noise[i + 3] = 255;
  }
  const grain = new THREE.DataTexture(noise, 128, 128);
  grain.wrapS = grain.wrapT = THREE.RepeatWrapping;
  grain.repeat.set(5, 5);
  grain.needsUpdate = true;
  plastic.bumpMap = grain;
  plastic.bumpScale = 0.016;
  textures.push(grain);

  function mesh(
    parent: THREE.Object3D,
    geometry: THREE.BufferGeometry,
    material: THREE.Material,
    x = 0,
    y = 0,
    z = 0,
  ) {
    const item = new THREE.Mesh(geometry, material);
    item.position.set(x, y, z);
    item.castShadow = item.receiveShadow = true;
    parent.add(item);
    return item;
  }
  function box(
    parent: THREE.Object3D,
    w: number,
    h: number,
    d: number,
    x: number,
    y: number,
    z: number,
    material: THREE.Material,
    r = 0,
  ) {
    return mesh(
      parent,
      r
        ? new RoundedBoxGeometry(w, h, d, 3, r)
        : new THREE.BoxGeometry(w, h, d),
      material,
      x,
      y,
      z,
    );
  }
  function round(
    parent: THREE.Object3D,
    radius: number,
    depth: number,
    x: number,
    y: number,
    z: number,
    material: THREE.Material,
  ) {
    const item = mesh(
      parent,
      new THREE.CylinderGeometry(radius, radius, depth, 48),
      material,
      x,
      y,
      z,
    );
    item.rotation.x = Math.PI / 2;
    return item;
  }
  function ring(
    parent: THREE.Object3D,
    radius: number,
    tube: number,
    x: number,
    y: number,
    z: number,
    material: THREE.Material,
  ) {
    return mesh(
      parent,
      new THREE.TorusGeometry(radius, tube, 8, 48),
      material,
      x,
      y,
      z,
    );
  }
  function batch(
    parent: THREE.Object3D,
    size: [number, number, number],
    positions: number[][],
    material: THREE.Material,
  ) {
    const item = new THREE.InstancedMesh(
      new THREE.BoxGeometry(...size),
      material,
      positions.length,
    );
    const matrix = new THREE.Matrix4();
    positions.forEach(([x, y, z], i) =>
      item.setMatrixAt(i, matrix.makeTranslation(x, y, z)),
    );
    item.castShadow = item.receiveShadow = true;
    parent.add(item);
    return item;
  }
  function rectangle(w: number, h: number, r: number, x = 0, y = 0) {
    const path = new THREE.Path();
    path.moveTo(x - w / 2 + r, y - h / 2);
    path.lineTo(x + w / 2 - r, y - h / 2);
    path.quadraticCurveTo(x + w / 2, y - h / 2, x + w / 2, y - h / 2 + r);
    path.lineTo(x + w / 2, y + h / 2 - r);
    path.quadraticCurveTo(x + w / 2, y + h / 2, x + w / 2 - r, y + h / 2);
    path.lineTo(x - w / 2 + r, y + h / 2);
    path.quadraticCurveTo(x - w / 2, y + h / 2, x - w / 2, y + h / 2 - r);
    path.lineTo(x - w / 2, y - h / 2 + r);
    path.quadraticCurveTo(x - w / 2, y - h / 2, x - w / 2 + r, y - h / 2);
    return path;
  }
  function silhouette() {
    const shape = new THREE.Shape();
    shape.moveTo(-1.72, 3.143);
    shape.lineTo(1.72, 3.143);
    shape.quadraticCurveTo(2, 3.143, 2, 2.863);
    shape.lineTo(2, -2.183);
    shape.quadraticCurveTo(2, -3.143, 1.04, -3.143);
    shape.lineTo(-1.72, -3.143);
    shape.quadraticCurveTo(-2, -3.143, -2, -2.863);
    shape.lineTo(-2, 2.863);
    shape.quadraticCurveTo(-2, 3.143, -1.72, 3.143);
    return shape;
  }
  function extrude(
    parent: THREE.Object3D,
    shape: THREE.Shape,
    depth: number,
    z: number,
    material: THREE.Material,
    bevel = 0.035,
  ) {
    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth,
      steps: 1,
      bevelEnabled: true,
      bevelSegments: 3,
      bevelSize: bevel,
      bevelThickness: bevel,
      curveSegments: 24,
    });
    geometry.translate(0, 0, -depth / 2);
    return mesh(parent, geometry, material, 0, 0, z);
  }
  function texturePlane(
    parent: THREE.Object3D,
    canvas: HTMLCanvasElement,
    w: number,
    h: number,
    x: number,
    y: number,
    z: number,
    reverse = false,
  ) {
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 4;
    textures.push(texture);
    const material = new THREE.MeshStandardMaterial({
      map: texture,
      transparent: true,
      roughness: 0.75,
      depthWrite: false,
    });
    const plane = mesh(
      parent,
      new THREE.PlaneGeometry(w, h),
      material,
      x,
      y,
      z,
    );
    plane.castShadow = false;
    if (reverse) plane.rotation.y = Math.PI;
    return plane;
  }
  function label(
    parent: THREE.Object3D,
    text: string,
    w: number,
    x: number,
    y: number,
    z: number,
    reverse = false,
    ink = '#d7d7bd',
  ) {
    const canvas = document.createElement('canvas');
    canvas.width = 768;
    canvas.height = 160;
    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = ink;
    const lines = text.split('\n');
    const size = Math.min(
      52,
      Math.floor(700 / (Math.max(...lines.map((line) => line.length)) * 0.61)),
    );
    ctx.font = `${size}px monospace`;
    ctx.textAlign = 'center';
    lines.forEach((line, i) => ctx.fillText(line, 384, 65 + i * 65));
    return texturePlane(parent, canvas, w, (w * 160) / 768, x, y, z, reverse);
  }

  // Front moulding: a real aperture and a raised lip, rather than a solid slab.
  const faceShape = silhouette();
  faceShape.holes.push(rectangle(3.28, 2.7, 0.12, 0, 1.04));
  extrude(front, faceShape, 0.2, 0, plastic);
  const rimShape = silhouette();
  rimShape.holes.push(rectangle(3.75, 5.95, 0.22));
  extrude(front, rimShape, 0.24, -0.15, plastic, 0.015);
  const gasket = silhouette();
  gasket.holes.push(rectangle(3.8, 6, 0.24));
  extrude(front, gasket, 0.022, -0.285, charcoal, 0.005);

  const buttons: Record<string, THREE.Object3D> = {};
  const cross = new THREE.Shape();
  cross.moveTo(-0.16, 0.5);
  cross.lineTo(0.16, 0.5);
  cross.lineTo(0.16, 0.16);
  cross.lineTo(0.5, 0.16);
  cross.lineTo(0.5, -0.16);
  cross.lineTo(0.16, -0.16);
  cross.lineTo(0.16, -0.5);
  cross.lineTo(-0.16, -0.5);
  cross.lineTo(-0.16, -0.16);
  cross.lineTo(-0.5, -0.16);
  cross.lineTo(-0.5, 0.16);
  cross.lineTo(-0.16, 0.16);
  cross.closePath();
  const dpad = extrude(front, cross, 0.17, 0.065, charcoal, 0.015);
  dpad.position.set(-1.132, -1.525, 0.065);
  for (const key of ['up', 'down', 'left', 'right']) buttons[key] = dpad;
  buttons.b = round(front, 0.278, 0.17, 0.6394, -1.6452, 0.065, wine);
  buttons.a = round(front, 0.278, 0.17, 1.2787, -1.3053, 0.065, wine);
  buttons.select = box(
    front,
    0.52,
    0.172,
    0.15,
    -0.4612,
    -2.5046,
    0.075,
    rubber,
    0.07,
  );
  buttons.start = box(
    front,
    0.52,
    0.172,
    0.15,
    0.1732,
    -2.1814,
    0.075,
    rubber,
    0.07,
  );
  buttons.select.rotation.z = buttons.start.rotation.z = 0.47;
  for (const [x, y] of [
    [-1.132, -1.525],
    [0.6394, -1.6452],
    [1.2787, -1.3053],
  ]) {
    ring(front, x < 0 ? 0.54 : 0.32, 0.018, x, y, 0.115, charcoal);
  }

  // LCD carrier, elastomer contacts and flex ribbon are a separate assembly.
  box(display, 3.48, 3.05, 0.11, 0, 1.04, 0, silver, 0.075);
  box(display, 3.22, 2.77, 0.12, 0, 1.04, 0.1, charcoal, 0.08);
  const lcdMaterial = new THREE.MeshPhysicalMaterial({
    color: '#889751',
    roughness: 0.27,
    clearcoat: 0.5,
    clearcoatRoughness: 0.22,
  });
  box(display, 2.71, 2.35, 0.045, 0.1, 0.98, 0.178, lcdMaterial, 0.045);
  const lcdCanvas = document.createElement('canvas');
  lcdCanvas.width = 512;
  lcdCanvas.height = 448;
  const lc = lcdCanvas.getContext('2d')!;
  lc.fillStyle = '#8d9e5d';
  lc.fillRect(0, 0, 512, 448);
  lc.fillStyle = '#3e5029';
  lc.font = 'bold 42px monospace';
  lc.fillText('IAGO POCKET', 48, 92);
  lc.font = '19px monospace';
  lc.fillText('DOT MATRIX / DISPLAY UNIT', 48, 130);
  for (let row = 0; row < 10; row++)
    for (let col = 0; col < 22; col++) {
      lc.globalAlpha = (col + row) % 5 ? 0.22 : 0.6;
      lc.fillRect(49 + col * 19, 180 + row * 17, 14, 12);
    }
  lc.globalAlpha = 1;
  lc.font = '18px monospace';
  lc.fillText('CONTRAST  ▪▪▪▪▫  /  IC-01', 48, 398);
  texturePlane(display, lcdCanvas, 2.66, 2.29, 0.1, 0.98, 0.205);
  batch(
    display,
    [0.025, 0.19, 0.018],
    Array.from({ length: 40 }, (_, i) => [-1.24 + i * 0.065, -0.38, 0.082]),
    copper,
  );
  box(
    display,
    0.72,
    0.85,
    0.024,
    0.9,
    -0.86,
    -0.04,
    new THREE.MeshStandardMaterial({
      color: '#a9682b',
      roughness: 0.48,
      metalness: 0.18,
    }),
  );
  batch(
    display,
    [0.015, 0.78, 0.012],
    Array.from({ length: 14 }, (_, i) => [0.59 + i * 0.048, -0.86, -0.019]),
    copper,
  );
  box(display, 0.87, 0.12, 0.09, 0.9, -1.32, -0.03, charcoal, 0.015);
  box(display, 1.12, 0.52, 0.1, -0.7, 0.9, -0.13, charcoal, 0.025);
  label(display, 'LCD DRIVER / 01', 1, -0.7, 0.9, -0.185, true);
  label(display, 'DISPLAY CARRIER  /  IC-01', 2.7, 0, 2.37, 0.07);

  // Silkscreen, solder mask, plated vias and routed copper, baked into one map.
  box(board, 3.59, 5.79, 0.09, 0, 0, 0, pcb, 0.12);
  const boardCanvas = document.createElement('canvas');
  boardCanvas.width = 768;
  boardCanvas.height = 1240;
  const ctx = boardCanvas.getContext('2d')!;
  ctx.fillStyle = '#40583b';
  ctx.fillRect(0, 0, 768, 1240);
  ctx.lineWidth = 2;
  for (let i = 0; i < 65; i++) {
    const side = i % 2;
    const start = side ? 728 : 40;
    const y = 68 + (i % 32) * 34;
    const inner = side ? 390 + (i % 5) * 34 : 360 - (i % 5) * 37;
    ctx.strokeStyle = i % 3 ? '#72905d' : '#b3a667';
    ctx.globalAlpha = 0.65;
    ctx.beginPath();
    ctx.moveTo(start, y);
    ctx.lineTo(inner, y);
    ctx.lineTo(inner + (side ? -26 : 26), y + 26);
    ctx.lineTo(inner + (side ? -26 : 26), y + 65);
    ctx.stroke();
    ctx.strokeStyle = '#c8b881';
    ctx.beginPath();
    ctx.arc(start, y, 5, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
  ctx.strokeStyle = '#d7d9b8';
  ctx.lineWidth = 2;
  ctx.strokeRect(210, 350, 330, 240);
  ctx.strokeRect(68, 702, 250, 168);
  ctx.strokeRect(491, 180, 162, 205);
  ctx.fillStyle = '#dee0be';
  ctx.font = '24px monospace';
  ctx.fillText('IC–01  /  MAIN BOARD', 52, 62);
  ctx.font = '14px monospace';
  ctx.fillText('REV. B   •   PERSONAL SYSTEMS', 52, 91);
  ['CPU', 'WORK RAM', 'CARTRIDGE BUS', 'AUDIO OUT', 'CLOCK', 'POWER'].forEach(
    (text, i) =>
      ctx.fillText(
        text,
        [255, 86, 438, 467, 81, 81][i],
        [329, 687, 139, 1007, 969, 1140][i],
      ),
  );
  ctx.font = '17px monospace';
  ctx.fillText('BUILT WITH CURIOSITY', 150, 1190);
  for (let i = 0; i < 35; i++) {
    ctx.font = '11px monospace';
    ctx.fillText(
      `R${i + 1}`,
      42 + (i % 5) * 141,
      174 + Math.floor(i / 5) * 139,
    );
  }
  texturePlane(board, boardCanvas, 3.53, 5.73, 0, 0, 0.049);
  texturePlane(board, boardCanvas, 3.53, 5.73, 0, 0, -0.049, true);

  function chip(w: number, h: number, x: number, y: number, name: string) {
    box(board, w, h, 0.16, x, y, 0.16, charcoal, 0.025);
    const contacts: number[][] = [];
    const count = Math.max(7, Math.floor(w / 0.09));
    for (let i = 0; i < count; i++) {
      const at = x - w / 2 + 0.055 + (i * (w - 0.11)) / (count - 1);
      contacts.push(
        [at, y + h / 2 + 0.055, 0.115],
        [at, y - h / 2 - 0.055, 0.115],
      );
    }
    batch(board, [0.035, 0.12, 0.045], contacts, silver);
    label(board, name, w * 0.84, x, y, 0.247);
    round(
      board,
      0.025,
      0.008,
      x - w / 2 + 0.085,
      y + h / 2 - 0.08,
      0.245,
      silver,
    );
  }
  chip(1.33, 1.04, -0.02, 0.6, 'IAGO / CORE\nIC-01 • CPU');
  chip(0.93, 0.61, -0.85, -0.83, 'WORK RAM');
  chip(0.64, 0.79, 1.03, 1.5, 'I/O');
  const passive: number[][] = [];
  for (let i = 0; i < 36; i++)
    passive.push([
      (i % 2 ? 1 : -1) * (1.45 - (i % 3) * 0.13),
      -2.5 + (i % 18) * 0.28,
      0.09,
    ]);
  batch(board, [0.13, 0.075, 0.075], passive, charcoal);
  batch(
    board,
    [0.036, 0.08, 0.08],
    passive.flatMap(([x, y, z]) => [
      [x - 0.07, y, z],
      [x + 0.07, y, z],
    ]),
    silver,
  );
  batch(
    board,
    [0.095, 0.3, 0.012],
    Array.from({ length: 24 }, (_, i) => [-1.44 + i * 0.125, 2.64, 0.054]),
    copper,
  );
  box(board, 3.2, 0.12, 0.19, 0, 2.41, 0.1, charcoal, 0.015);
  for (const [x, y] of [
    [-0.94, -2.07],
    [-0.52, -2.08],
    [1.38, 0.37],
  ]) {
    round(
      board,
      0.14,
      0.24,
      x,
      y,
      0.17,
      new THREE.MeshStandardMaterial({ color: '#556b71', roughness: 0.46 }),
    );
    round(board, 0.127, 0.013, x, y, 0.3, silver);
    box(board, 0.13, 0.012, 0.005, x, y, 0.311, charcoal);
  }
  // Speaker cone with concentric suspension, basket and soldered leads.
  round(board, 0.57, 0.095, 0.83, -1.85, 0.13, silver);
  round(board, 0.49, 0.13, 0.83, -1.85, 0.21, charcoal);
  for (let r = 0.24; r < 0.49; r += 0.055)
    ring(board, r, 0.017, 0.83, -1.85, 0.283, rubber);
  const dome = mesh(
    board,
    new THREE.SphereGeometry(0.21, 32, 16),
    rubber,
    0.83,
    -1.85,
    0.25,
  );
  dome.scale.z = 0.4;
  const wireMaterial = new THREE.MeshStandardMaterial({
    color: '#8a352e',
    roughness: 0.65,
  });
  for (const shift of [0, 0.07]) {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.7 + shift, -1.36, 0.2),
      new THREE.Vector3(0.38 + shift, -1.16, 0.2),
      new THREE.Vector3(0.3 + shift, -0.68, 0.1),
    ]);
    mesh(
      board,
      new THREE.TubeGeometry(curve, 18, 0.015, 6, false),
      shift ? charcoal : wireMaterial,
    );
  }
  box(board, 0.51, 0.2, 0.13, -0.9, -1.57, 0.15, silver, 0.08);
  label(board, 'XTAL', 0.42, -0.9, -1.57, 0.218, false, '#33392f');
  for (const [x, y] of [
    [-1.55, 2.62],
    [1.55, 2.62],
    [-1.55, -2.56],
    [1.32, -2.56],
  ]) {
    ring(board, 0.082, 0.025, x, y, 0.055, copper);
    round(board, 0.047, 0.015, x, y, 0.055, charcoal);
  }

  // Rear tub: outer floor, thick walls, screw bosses, four cells and cartridge.
  extrude(back, silhouette(), 0.095, -0.28, plastic);
  const tub = silhouette();
  tub.holes.push(rectangle(3.66, 5.94, 0.23));
  extrude(back, tub, 0.53, 0.02, plastic, 0.018);
  box(back, 3.25, 2.14, 0.075, 0, -1.78, -0.12, charcoal, 0.08);
  const cellMaterial = new THREE.MeshStandardMaterial({
    color: '#8f7750',
    roughness: 0.43,
    metalness: 0.36,
  });
  for (let i = 0; i < 4; i++) {
    const x = -1.13 + i * 0.75;
    mesh(
      back,
      new THREE.CylinderGeometry(0.29, 0.29, 1.75, 40),
      cellMaterial,
      x,
      -1.78,
      0.035,
    );
    mesh(
      back,
      new THREE.CylinderGeometry(0.293, 0.293, 0.42, 40),
      charcoal,
      x,
      -2.37,
      0.035,
    );
    mesh(
      back,
      new THREE.CylinderGeometry(0.245, 0.245, 0.09, 32),
      silver,
      x,
      -0.86,
      0.035,
    );
    mesh(
      back,
      new THREE.CylinderGeometry(0.09, 0.09, 0.08, 24),
      silver,
      x,
      -0.79,
      0.035,
    );
    label(back, '+\nCELL', 0.35, x, -1.45, 0.333, false, '#e4d8ad');
  }
  const cover = box(back, 2.85, 2.2, 0.065, 0, -1.68, -0.35, plastic, 0.09);
  cover.userData.cover = true;
  for (let i = 0; i < 5; i++)
    box(back, 0.72, 0.024, 0.022, 0, -0.93 - i * 0.11, -0.39, charcoal, 0.009);
  box(back, 3.1, 1.43, 0.13, 0, 2.05, -0.39, charcoal, 0.08);
  box(back, 2.83, 1.49, 0.2, 0, 2.23, -0.5, plastic, 0.07);
  box(back, 2.36, 0.83, 0.018, 0, 2.21, -0.615, charcoal, 0.03);
  label(
    back,
    'IAGO POCKET\nPERSONAL WORK / VOL. 01',
    2.25,
    0,
    2.2,
    -0.63,
    true,
  );
  for (let i = 0; i < 8; i++)
    box(
      back,
      0.06,
      0.38,
      0.017,
      -1.24 + i * 0.075,
      2.62,
      -0.615,
      charcoal,
      0.005,
    );
  box(back, 2.66, 0.38, 0.21, 0, 1.56, 0.13, charcoal, 0.03);
  batch(
    back,
    [0.048, 0.3, 0.04],
    Array.from({ length: 28 }, (_, i) => [-1.2 + i * 0.087, 1.56, 0.254]),
    copper,
  );
  label(
    back,
    'IAGO POCKET / IC–01\nDESIGNED TO BE PLAYED',
    2.72,
    0,
    0.55,
    -0.342,
    true,
    '#686759',
  );
  for (const [x, y] of [
    [-1.68, 2.78],
    [1.68, 2.78],
    [-1.68, -2.74],
    [1.29, -2.63],
    [-1.68, 0.05],
    [1.68, 0.05],
  ]) {
    round(back, 0.12, 0.43, x, y, 0.02, plastic);
    round(back, 0.063, 0.025, x, y, 0.249, charcoal);
    round(back, 0.084, 0.022, x, y, -0.348, silver);
    box(back, 0.1, 0.017, 0.008, x, y, -0.363, charcoal);
    box(back, 0.017, 0.1, 0.008, x, y, -0.363, charcoal);
  }
  // Ports are recessed in the edge and stay readable from the side.
  const port = round(back, 0.105, 0.075, -2.026, -1, 0.04, charcoal);
  port.rotation.set(0, 0, Math.PI / 2);
  const portRim = ring(back, 0.105, 0.021, -2.07, -1, 0.04, silver);
  portRim.rotation.y = Math.PI / 2;
  box(back, 0.09, 0.42, 0.3, -2.018, 1.2, 0.06, charcoal, 0.015);
  batch(
    back,
    [0.07, 0.025, 0.26],
    Array.from({ length: 7 }, (_, i) => [-2.08, 0.99 + i * 0.059, 0.07]),
    rubber,
  );

  // One stationary turntable and a real shadow receiver anchor every view.
  const stand = new THREE.Group();
  const stone = new THREE.MeshStandardMaterial({
    color: '#b9b5a6',
    roughness: 0.9,
  });
  const pedestal = mesh(
    stand,
    new THREE.CylinderGeometry(2.32, 2.38, 0.16, 96),
    stone,
    0,
    -3.39,
    0,
  );
  pedestal.receiveShadow = true;
  const groove = ring(
    stand,
    2.16,
    0.011,
    0,
    -3.302,
    0,
    new THREE.MeshStandardMaterial({ color: '#918c7b', roughness: 0.85 }),
  );
  groove.rotation.x = -Math.PI / 2;
  const floor = mesh(
    stand,
    new THREE.PlaneGeometry(60, 60),
    new THREE.ShadowMaterial({ opacity: 0.1 }),
    0,
    -3.48,
    0,
  );
  floor.rotation.x = -Math.PI / 2;
  floor.castShadow = false;
  const makerMark = label(
    stand,
    'IAGO POCKET  /  001',
    1.8,
    0,
    -3.292,
    1.7,
    false,
    '#625e51',
  );
  makerMark.rotation.x = -Math.PI / 2;

  return { model, parts, stand, plastic, buttons, textures };
}
