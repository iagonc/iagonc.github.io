'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import {
  Box,
  Gamepad2,
  Layers3,
  ArrowLeft,
  ArrowRight,
  Pause,
  Play,
  RotateCcw,
} from 'lucide-react';
import type { ConsoleScene, Detail, Finish, SceneMode } from './console-scene';

const finishes: { id: Finish; name: string }[] = [
  { id: 'classic', name: 'Original' },
  { id: 'oxblood', name: 'Burgundy' },
  { id: 'graphite', name: 'Graphite' },
];
const details: { id: Detail; name: string; description: string }[] = [
  {
    id: 'assembly',
    name: 'Assembly',
    description:
      'Four assemblies. One pocket-sized world. Slide to take it apart.',
  },
  {
    id: 'display',
    name: 'Display',
    description:
      'Glass, a dot-matrix panel, metal carrier and a copper flex ribbon.',
  },
  {
    id: 'board',
    name: 'Logic board',
    description:
      'Follow the copper traces: processor, memory, clock and speaker.',
  },
  {
    id: 'back',
    name: 'Power & shell',
    description:
      'Four cells, spring contacts, screw bosses and the cartridge connector.',
  },
];

export default function ConsoleStage({
  children,
  power,
  feedback,
  pressed,
}: {
  children: ReactNode;
  power: boolean;
  feedback: string;
  pressed: string | null;
}) {
  const mount = useRef<HTMLDivElement>(null);
  const face = useRef<HTMLDivElement>(null);
  const scene = useRef<ConsoleScene | null>(null);
  const [ready, setReady] = useState(false);
  const [unavailable, setUnavailable] = useState(false);
  const [mode, setMode] = useState<SceneMode>('play');
  const [finish, setFinish] = useState<Finish>('classic');
  const [paused, setPaused] = useState(false);
  const [detail, setDetail] = useState<Detail>('assembly');
  const [separation, setSeparation] = useState(100);

  useEffect(() => {
    let disposed = false;
    const host = mount.current!;
    const surface = face.current!;
    import('./console-scene')
      .then(({ createConsoleScene }) => {
        if (disposed) return;
        try {
          scene.current = createConsoleScene(host, surface, () => {
            setReady(false);
            setUnavailable(true);
          });
          setReady(true);
        } catch {
          setUnavailable(true);
        }
      })
      .catch(() => {
        if (!disposed) setUnavailable(true);
      });
    return () => {
      disposed = true;
      scene.current?.dispose();
      scene.current = null;
    };
  }, []);

  useEffect(() => {
    scene.current?.update({
      mode,
      finish,
      power,
      paused,
      detail,
      separation,
      pressed,
    });
  }, [ready, mode, finish, power, paused, detail, separation, pressed]);

  useEffect(() => {
    scene.current?.pulse();
  }, [feedback]);

  return (
    <div
      className="scene-stage"
      data-mode={ready ? mode : 'play'}
      data-finish={finish}
      data-ready={ready}
      data-detail={detail}
    >
      <div className="scene-caption" aria-hidden="true">
        <span>
          <i /> IAGO POCKET / OBJECT NO. 001
        </span>
        <span>THE ORIGINAL EDITION</span>
      </div>
      <div
        className="scene-viewport"
        ref={mount}
        aria-label="Interactive 3D handheld"
      >
        <div className="scene-registration" aria-hidden="true" />
        <div className="scene-fallback">
          <div className="console-face" ref={face}>
            {children}
          </div>
        </div>
        {ready && mode !== 'play' && (
          <span className="scene-drag-hint" data-stage-controls="">
            <button
              aria-label="Rotate left"
              onClick={() => scene.current?.rotate(-0.3, 0)}
            >
              <ArrowLeft size={15} />
            </button>
            DRAG TO ROTATE
            <button
              aria-label="Rotate right"
              onClick={() => scene.current?.rotate(0.3, 0)}
            >
              <ArrowRight size={15} />
            </button>
          </span>
        )}
      </div>
      {ready && (
        <>
          <div className="scene-toolbar" data-stage-controls="">
            <fieldset className="scene-modes" aria-label="Console view">
              <button
                aria-pressed={mode === 'play'}
                onClick={() => setMode('play')}
              >
                <Gamepad2 size={15} /> Play
              </button>
              <button
                aria-pressed={mode === 'inspect'}
                onClick={() => setMode('inspect')}
              >
                <Box size={15} /> Inspect
              </button>
              <button
                aria-pressed={mode === 'inside'}
                onClick={() => {
                  setMode('inside');
                  setDetail('assembly');
                }}
              >
                <Layers3 size={15} /> Inside
              </button>
            </fieldset>
            <button
              className="scene-reset"
              aria-label="Reset console angle"
              onClick={() => scene.current?.reset()}
            >
              <RotateCcw size={15} />
            </button>
            <button
              className="scene-pause"
              aria-label={
                paused ? 'Resume ambient motion' : 'Pause ambient motion'
              }
              aria-pressed={paused}
              onClick={() => setPaused(!paused)}
            >
              {paused ? <Play size={14} /> : <Pause size={14} />}
            </button>
          </div>
          {mode === 'inside' && (
            <div className="scene-inspector" data-stage-controls="">
              <fieldset
                aria-label="Inspect a component"
                className="scene-part-selector"
              >
                {details.map((item, index) => (
                  <button
                    key={item.id}
                    aria-pressed={detail === item.id}
                    onClick={() => setDetail(item.id)}
                  >
                    <span>0{index + 1}</span>
                    {item.name}
                  </button>
                ))}
              </fieldset>
              <p className="scene-part-description" aria-live="polite">
                {details.find((item) => item.id === detail)?.description}
              </p>
              {detail === 'assembly' && (
                <label className="scene-separation">
                  <span>ASSEMBLED</span>
                  <input
                    aria-label="Assembly separation"
                    type="range"
                    min="0"
                    max="100"
                    value={separation}
                    onChange={(event) =>
                      setSeparation(Number(event.target.value))
                    }
                  />
                  <span>EXPLODED</span>
                </label>
              )}
              <span className="scene-design-note">
                An original handheld concept. Explore every side.
              </span>
            </div>
          )}
          <div className="scene-finish" data-stage-controls="">
            <fieldset aria-label="Console finish">
              {finishes.map((item) => (
                <button
                  key={item.id}
                  className={`finish-swatch finish-${item.id}`}
                  aria-label={item.name}
                  aria-pressed={finish === item.id}
                  onClick={() => setFinish(item.id)}
                >
                  <i />
                </button>
              ))}
            </fieldset>
            <span>{finishes.find((item) => item.id === finish)?.name}</span>
            <span className="scene-finish-edition">NO. 001 — ∞</span>
          </div>
        </>
      )}
      {unavailable && (
        <p className="scene-fallback-note">
          Classic edition. All games and controls are ready to play.
        </p>
      )}
      <output className="sr-only">
        {ready
          ? `${mode === 'inside' ? `${details.find((item) => item.id === detail)?.name} view` : mode === 'inspect' ? 'Inspect view' : 'Play view'}. ${finishes.find((item) => item.id === finish)?.name}.`
          : ''}
      </output>
    </div>
  );
}
