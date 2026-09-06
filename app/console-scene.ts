import * as THREE from 'three';
import {
  CSS3DObject,
  CSS3DRenderer,
} from 'three/addons/renderers/CSS3DRenderer.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { createConsoleHardware } from './console-hardware';

export type Finish = 'classic' | 'oxblood' | 'graphite';
export type SceneMode = 'play' | 'inspect' | 'inside';
export type Detail = 'assembly' | 'display' | 'board' | 'back';
type Settings = {
  mode: SceneMode;
  finish: Finish;
  power: boolean;
  paused: boolean;
  detail: Detail;
  separation: number;
  pressed: string | null;
};
export type ConsoleScene = {
  update: (settings: Settings) => void;
  pulse: () => void;
  reset: () => void;
  rotate: (horizontal: number, vertical: number) => void;
  dispose: () => void;
};

// One world unit equals 100 CSS pixels. The live DOM face and the physical
// shell share a camera and transform, so existing game controls stay native.
export function createConsoleScene(
  host: HTMLElement,
  surface: HTMLElement,
  onLost: () => void,
): ConsoleScene {
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: 'low-power',
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
  renderer.setClearColor(0x000000, 0);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.88;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  renderer.domElement.className = 'scene-canvas';
  renderer.domElement.setAttribute('aria-hidden', 'true');
  const world = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
  camera.position.set(0, 1.05, 14.4);
  camera.lookAt(0, -0.1, 0);
  const css = new CSS3DRenderer();
  css.domElement.className = 'scene-dom';
  const home = surface.parentElement!;
  const originalStyle = surface.getAttribute('style');
  const originalDraggable = surface.getAttribute('draggable');
  const domWorld = new THREE.Scene();
  const domGroup = new THREE.Group();
  const domFace = new CSS3DObject(surface);
  domFace.scale.setScalar(0.01);
  domGroup.add(domFace);
  domWorld.add(domGroup);

  const pmrem = new THREE.PMREMGenerator(renderer);
  const room = new RoomEnvironment();
  const environment = pmrem.fromScene(room, 0.04);
  world.environment = environment.texture;
  world.environmentIntensity = 0.8;
  room.dispose();
  pmrem.dispose();
  const hardware = createConsoleHardware();
  const {
    model,
    parts,
    stand,
    plastic: shellMaterial,
    textures,
    buttons,
  } = hardware;
  const { front } = parts;
  world.add(model, stand);
  for (const button of new Set(Object.values(buttons)))
    button.userData.restZ = button.position.z;

  const key = new THREE.DirectionalLight('#fff5e6', 1.8);
  key.position.set(-3, 12, 5);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  key.shadow.camera.left = -8;
  key.shadow.camera.right = 8;
  key.shadow.camera.top = 9;
  key.shadow.camera.bottom = -6;
  key.shadow.camera.far = 30;
  key.shadow.normalBias = 0.018;
  key.shadow.bias = -0.0003;
  key.shadow.radius = 5;
  world.add(key);
  const rim = new THREE.DirectionalLight('#f5edda', 0.7);
  rim.position.set(5, 2, -3);
  world.add(rim);
  const fill = new THREE.DirectionalLight('#dce4d7', 0.4);
  fill.position.set(-5, -2, 3);
  world.add(fill);
  world.add(new THREE.AmbientLight('#e7dfce', 0.25));

  let settings: Settings = {
    mode: 'play',
    finish: 'classic',
    power: true,
    paused: false,
    detail: 'assembly',
    separation: 100,
    pressed: null,
  };
  let targetX = -0.055,
    targetY = -0.18;
  let x = -0.055,
    y = -0.28,
    explosion = 0;
  let pointerX = 0;
  let dragging = false,
    pointerId = -1,
    lastX = 0,
    lastY = 0;
  let visible = true,
    frame = 0,
    disposed = false;
  let cameraDistance = 13.8;
  let cameraFocusY = -0.1;
  let assemblyDistance = 2.5;
  let last = performance.now();
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const isStill = () => reduced.matches || settings.paused;
  const palettes = {
    classic: '#b9b5a7',
    oxblood: '#78474a',
    graphite: '#444a42',
  };
  const color = new THREE.Color(palettes.classic);
  const direction = new THREE.Vector3();
  const facing = new THREE.Vector3();
  const bounds = new THREE.Box3();
  const rest = {
    front: [0.0, 0.0, 0.3],
    display: [0.0, 0.0, 0.17],
    board: [0.0, 0.0, -0.07],
    back: [0.0, 0.0, -0.3],
  };
  const spread = {
    front: [-1.4, 0.3, 2.45],
    display: [-0.45, 0.12, 1.12],
    board: [0.45, 0, -0.12],
    back: [1.4, -0.1, -1.65],
  };

  function render(now: number) {
    frame = 0;
    if (disposed || !visible || document.hidden) return;
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    const ease = isStill() ? 1 : 1 - Math.exp(-dt * 9);
    const isolated =
      settings.mode === 'inside' && settings.detail !== 'assembly';
    const desiredExplosion =
      settings.mode === 'inside' && !isolated ? settings.separation / 100 : 0;
    let remaining =
      Math.abs(targetX - x) +
      Math.abs(targetY - y) +
      Math.abs(desiredExplosion - explosion);
    x += (targetX - x) * ease;
    y += (targetY - y) * ease;
    explosion += (desiredExplosion - explosion) * ease;
    model.rotation.set(x, y, 0);
    for (const name of Object.keys(parts) as (keyof typeof parts)[]) {
      const part = parts[name];
      part.visible = !isolated || name === settings.detail;
      const base = isolated ? [0, 0, 0] : rest[name];
      const offset = isolated ? [0, 0, 0] : spread[name];
      const goals = base.map((value, i) => value + offset[i] * explosion);
      remaining +=
        Math.abs(goals[0] - part.position.x) +
        Math.abs(goals[1] - part.position.y) +
        Math.abs(goals[2] - part.position.z);
      part.position.x += (goals[0] - part.position.x) * ease;
      part.position.y += (goals[1] - part.position.y) * ease;
      part.position.z += (goals[2] - part.position.z) * ease;
    }
    // Rotation pivots on the object; its lowest visible surface stays on the tray.
    model.position.y = 0;
    model.updateMatrixWorld(true);
    bounds.makeEmpty();
    for (const part of Object.values(parts))
      if (part.visible) bounds.expandByObject(part);
    model.position.y = -3.3 - bounds.min.y;
    const desiredDistance =
      (isolated && settings.detail === 'display'
        ? Math.max(
            10.5,
            5.45 / (2 * Math.tan(THREE.MathUtils.degToRad(17)) * camera.aspect),
          )
        : cameraDistance) +
      desiredExplosion * assemblyDistance;
    remaining += Math.abs(desiredDistance - camera.position.z);
    camera.position.z += (desiredDistance - camera.position.z) * ease;
    const focusY = isolated && settings.detail === 'display' ? -1.1 : -0.1;
    remaining += Math.abs(focusY - cameraFocusY);
    cameraFocusY += (focusY - cameraFocusY) * ease;
    camera.lookAt(0, cameraFocusY, 0);
    for (const button of new Set(Object.values(buttons))) {
      const z =
        button.userData.restZ -
        (settings.pressed && buttons[settings.pressed] === button ? 0.055 : 0);
      remaining += Math.abs(z - button.position.z);
      button.position.z += (z - button.position.z) * ease;
    }
    domGroup.position.copy(model.position);
    domGroup.quaternion.copy(model.quaternion);
    domFace.position.copy(front.position);
    domFace.position.z += 0.15;
    model.updateMatrixWorld();
    facing.set(0, 0, 1).applyQuaternion(model.quaternion);
    direction.copy(camera.position).sub(model.position).normalize();
    const frontVisible = front.visible && facing.dot(direction) > 0.08;
    domFace.visible = frontVisible;
    surface.inert = settings.mode !== 'play' || !frontVisible;
    surface.style.setProperty(
      '--glint-x',
      `${48 + pointerX * 10 + Math.sin(y) * 15}%`,
    );
    color.set(palettes[settings.finish]);
    remaining +=
      Math.abs(shellMaterial.color.r - color.r) +
      Math.abs(shellMaterial.color.g - color.g) +
      Math.abs(shellMaterial.color.b - color.b);
    shellMaterial.color.lerp(color, ease);
    renderer.render(world, camera);
    css.render(domWorld, camera);
    // No perpetual floating or idle rendering: motion ends when the object settles.
    if (!isStill() && remaining > 0.0003) frame = requestAnimationFrame(render);
  }
  function wake() {
    if (!frame && !disposed && visible && !document.hidden) {
      last = performance.now();
      frame = requestAnimationFrame(render);
    }
  }
  function resize() {
    const { width, height: hostHeight } = host.getBoundingClientRect();
    const height = Math.max(hostHeight - 48, 1);
    camera.aspect = width / Math.max(height, 1);
    assemblyDistance = width < 540 ? 8.5 : 2.5;
    // Fit the complete handheld on narrow displays without cropping controls.
    cameraDistance = Math.max(
      13.8,
      5.45 / (2 * Math.tan(THREE.MathUtils.degToRad(17)) * camera.aspect),
    );
    camera.position.z = cameraDistance + explosion * assemblyDistance;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    css.setSize(width, height);
    wake();
  }
  function down(event: PointerEvent) {
    if (
      settings.mode === 'play' ||
      event.button !== 0 ||
      (event.target as HTMLElement).closest('[data-stage-controls]')
    )
      return;
    dragging = true;
    pointerId = event.pointerId;
    lastX = event.clientX;
    lastY = event.clientY;
    host.setPointerCapture(event.pointerId);
    host.classList.add('is-dragging');
  }
  function move(event: PointerEvent) {
    const rect = host.getBoundingClientRect();
    pointerX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    if (dragging) {
      targetY += (event.clientX - lastX) * 0.009;
      targetX = THREE.MathUtils.clamp(
        targetX + (event.clientY - lastY) * 0.005,
        -0.85,
        0.85,
      );
      lastX = event.clientX;
      lastY = event.clientY;
    }
    wake();
  }
  function up() {
    if (host.hasPointerCapture(pointerId))
      host.releasePointerCapture(pointerId);
    dragging = false;
    host.classList.remove('is-dragging');
  }
  function leave() {
    if (!dragging) {
      pointerX = 0;
      wake();
    }
  }
  function visibility() {
    if (document.hidden) {
      cancelAnimationFrame(frame);
      frame = 0;
    } else wake();
  }

  const observer = new ResizeObserver(resize);
  const intersection = new IntersectionObserver(
    ([entry]) => {
      visible = entry.isIntersecting;
      if (visible) wake();
      else {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    },
    { rootMargin: '80px' },
  );

  function dispose() {
    if (disposed) return;
    disposed = true;
    cancelAnimationFrame(frame);
    observer.disconnect();
    intersection.disconnect();
    host.removeEventListener('pointerdown', down);
    host.removeEventListener('pointermove', move);
    host.removeEventListener('pointerup', up);
    host.removeEventListener('pointercancel', up);
    host.removeEventListener('lostpointercapture', up);
    host.removeEventListener('pointerleave', leave);
    document.removeEventListener('visibilitychange', visibility);
    reduced.removeEventListener('change', wake);
    renderer.domElement.removeEventListener('webglcontextlost', lost);
    home.appendChild(surface);
    if (originalStyle === null) surface.removeAttribute('style');
    else surface.setAttribute('style', originalStyle);
    if (originalDraggable === null) surface.removeAttribute('draggable');
    else surface.setAttribute('draggable', originalDraggable);
    surface.inert = false;
    host.classList.remove('has-webgl', 'is-dragging');
    renderer.domElement.remove();
    css.domElement.remove();
    const materials = new Set<THREE.Material>();
    const geometries = new Set<THREE.BufferGeometry>();
    world.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        geometries.add(object.geometry);
        for (const material of Array.isArray(object.material)
          ? object.material
          : [object.material])
          materials.add(material);
      }
    });
    geometries.forEach((geometry) => geometry.dispose());
    materials.forEach((material) => material.dispose());
    textures.forEach((texture) => texture.dispose());
    environment.dispose();
    key.shadow.dispose();
    renderer.dispose();
  }
  function lost(event: Event) {
    event.preventDefault();
    dispose();
    onLost();
  }

  host.append(renderer.domElement, css.domElement);
  host.classList.add('has-webgl');
  observer.observe(host);
  intersection.observe(host);
  host.addEventListener('pointerdown', down);
  host.addEventListener('pointermove', move);
  host.addEventListener('pointerup', up);
  host.addEventListener('pointercancel', up);
  host.addEventListener('lostpointercapture', up);
  host.addEventListener('pointerleave', leave);
  document.addEventListener('visibilitychange', visibility);
  reduced.addEventListener('change', wake);
  renderer.domElement.addEventListener('webglcontextlost', lost);
  resize();
  return {
    update(next) {
      if (settings.mode !== next.mode || settings.detail !== next.detail) {
        targetX = next.mode === 'inside' ? -0.035 : -0.055;
        targetY =
          next.mode === 'inside' && next.detail === 'assembly'
            ? -0.72
            : next.mode === 'inspect'
              ? -0.48
              : -0.18;
      }
      settings = next;
      wake();
    },
    pulse() {
      wake();
    },
    reset() {
      targetX = -0.055;
      targetY =
        settings.mode === 'inside' && settings.detail === 'assembly'
          ? -0.72
          : -0.18;
      pointerX = 0;
      wake();
    },
    rotate(horizontal, vertical) {
      targetY += horizontal;
      targetX = THREE.MathUtils.clamp(targetX + vertical, -0.65, 0.65);
      wake();
    },
    dispose,
  };
}
