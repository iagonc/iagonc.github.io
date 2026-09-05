'use client';
import { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { ArrowUpRight, Volume2, VolumeX, Download } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { experience, projects, toolkit, profile } from './portfolio';
import { linkedInUrl } from './site-config';
import ResumeContent from './resume-content';
import { ArcadeScreen, CartridgeShelf, MissionNotes } from './arcade';
import {
  arcadeReducer,
  initialArcade,
  arcadeAnnouncement,
  type ArcadeAction,
} from './arcade-model';

type View = 'arcade' | 'menu' | 'profile' | 'work' | 'toolkit' | 'contact';
type Control =
  | 'up'
  | 'down'
  | 'left'
  | 'right'
  | 'a'
  | 'b'
  | 'start'
  | 'select';
const menu: { label: string; view: View }[] = [
  { label: 'PLAY MY WORK', view: 'arcade' },
  { label: 'PROFILE', view: 'profile' },
  { label: 'QUEST LOG', view: 'work' },
  { label: 'TOOLKIT', view: 'toolkit' },
  { label: 'CONNECT', view: 'contact' },
];
const quests = [...experience, ...projects];
function Battery() {
  return (
    <span className="lcd-battery" aria-hidden="true">
      <i />
      <i />
      <i />
      <i />
    </span>
  );
}

function Resume({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="resume-dialog" initialFocus={titleRef}>
        <div className="resume-intro">
          <span className="resume-kicker">PLAYER 01 / THE CLASSIC EDITION</span>
          <DialogTitle className="resume-title" ref={titleRef} tabIndex={-1}>
            Iago Caldeira
          </DialogTitle>
          <DialogDescription>
            Senior SRE · Platform Engineer · AI Engineer
            <br />
            Belo Horizonte, Brazil · LATAM · UTC−3
          </DialogDescription>
        </div>
        <ResumeContent />
        <div className="resume-end">
          <a href={linkedInUrl} target="_blank" rel="me noopener">
            Connect on LinkedIn <ArrowUpRight size={15} />
          </a>
          <a href="/resume">Open printable résumé</a>
          <a href="/resume.txt" download="Iago-Caldeira-Resume.txt">
            <Download size={15} /> Download full résumé
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function ConsolePortfolio() {
  const [power, setPower] = useState(true);
  const [booting, setBooting] = useState(false);
  const [sound, setSound] = useState(false);
  const [view, setView] = useState<View>('arcade');
  const [arcade, dispatchArcade] = useReducer(arcadeReducer, initialArcade);
  const [selected, setSelected] = useState(0);
  const [page, setPage] = useState(0);
  const [pressed, setPressed] = useState<Control | null>(null);
  const [resume, setResume] = useState(false);
  const contactLink = useRef<HTMLAnchorElement>(null);
  const audio = useRef<AudioContext | null>(null);
  const pressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const bootTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const previousBadges = useRef(0);
  const beep = useCallback(
    (frequency = 440) => {
      if (!sound) return;
      try {
        audio.current ??= new AudioContext();
        const ctx = audio.current;
        void ctx.resume().catch(() => {});
        const oscillator = ctx.createOscillator();
        const gain = ctx.createGain();
        oscillator.type = 'square';
        oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);
        gain.gain.setValueAtTime(0.035, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.07);
        oscillator.connect(gain);
        gain.connect(ctx.destination);
        oscillator.start();
        oscillator.stop(ctx.currentTime + 0.08);
      } catch {
        /* Optional audio is unavailable in some browsers. */
      }
    },
    [sound],
  );
  useEffect(
    () => () => {
      if (pressTimer.current) clearTimeout(pressTimer.current);
      if (bootTimer.current) clearTimeout(bootTimer.current);
      void audio.current?.close().catch(() => {});
    },
    [],
  );
  useEffect(() => {
    const earned = arcade.completed.length > previousBadges.current;
    previousBadges.current = arcade.completed.length;
    if (!earned) return;
    const notes = [660, 880, 1320].map((frequency, index) =>
      setTimeout(() => beep(frequency), index * 110),
    );
    return () => notes.forEach(clearTimeout);
  }, [arcade.completed.length, beep]);
  function togglePower(on: boolean) {
    setPower(on);
    setBooting(on);
    setView('arcade');
    dispatchArcade({ type: 'eject' });
    setPage(0);
    if (bootTimer.current) clearTimeout(bootTimer.current);
    if (on) {
      beep(880);
      bootTimer.current = setTimeout(() => setBooting(false), 850);
    }
  }
  const navigate = useCallback(
    (next: View) => {
      if (!power) setPower(true);
      if (bootTimer.current) clearTimeout(bootTimer.current);
      setBooting(false);
      setView(next);
      if (next === 'arcade') dispatchArcade({ type: 'eject' });
      setPage(0);
      beep(660);
    },
    [power, beep],
  );
  const arcadeInput = useCallback(
    (action: ArcadeAction) => {
      beep(action.type === 'choose' ? 660 : 440);
      dispatchArcade(action);
    },
    [beep],
  );
  const insertCartridge = useCallback(
    (index: number) => {
      navigate('arcade');
      dispatchArcade({ type: 'insert', mission: index });
    },
    [navigate],
  );
  const act = useCallback(
    (control: Control) => {
      setPressed(control);
      if (pressTimer.current) clearTimeout(pressTimer.current);
      pressTimer.current = setTimeout(() => setPressed(null), 140);
      if (!power || booting) return;
      beep(control === 'b' ? 220 : control === 'a' ? 660 : 440);
      if (view === 'arcade') {
        if (control === 'b') {
          if (arcade.phase === 'select') navigate('menu');
          else dispatchArcade({ type: 'eject' });
        } else if (control === 'a' || control === 'start')
          dispatchArcade({ type: 'choose' });
        else if (control === 'select') dispatchArcade({ type: 'next' });
        else
          dispatchArcade({
            type: 'move',
            delta: control === 'up' || control === 'left' ? -1 : 1,
          });
        return;
      }
      if (control === 'b') {
        navigate('menu');
        return;
      }
      if (control === 'start') {
        navigate(view === 'menu' ? menu[selected].view : 'menu');
        return;
      }
      if (control === 'select') {
        setView('menu');
        setSelected((value) => (value + 1) % menu.length);
        return;
      }
      if (control === 'a') {
        if (view === 'menu') navigate(menu[selected].view);
        else if (view === 'contact') contactLink.current?.click();
        else {
          const length =
            view === 'profile'
              ? profile.length
              : view === 'work'
                ? quests.length
                : toolkit.length;
          setPage((value) => (value + 1) % length);
        }
        return;
      }
      const step = control === 'up' || control === 'left' ? -1 : 1;
      if (view === 'menu')
        setSelected((value) => (value + step + menu.length) % menu.length);
      else if (view !== 'contact') {
        const length =
          view === 'profile'
            ? profile.length
            : view === 'work'
              ? quests.length
              : toolkit.length;
        setPage((value) => (value + step + length) % length);
      }
    },
    [power, booting, beep, view, selected, navigate, arcade.phase],
  );
  useEffect(() => {
    function handleKey(event: KeyboardEvent) {
      if (resume || event.metaKey || event.ctrlKey || event.altKey) return;
      const consoleRect = document
        .getElementById('console')
        ?.getBoundingClientRect();
      if (
        !consoleRect ||
        consoleRect.bottom < 0 ||
        consoleRect.top > window.innerHeight
      )
        return;
      if (
        event.target instanceof HTMLElement &&
        event.target.closest(
          'input, textarea, select, [role="switch"], [contenteditable="true"], .professional-profile',
        )
      )
        return;
      if (
        event.key === 'Enter' &&
        event.target instanceof HTMLElement &&
        event.target.closest('button, a')
      )
        return;
      const bindings: Record<string, Control> = {
        ArrowUp: 'up',
        ArrowDown: 'down',
        ArrowLeft: 'left',
        ArrowRight: 'right',
        a: 'a',
        A: 'a',
        x: 'a',
        X: 'a',
        b: 'b',
        B: 'b',
        z: 'b',
        Z: 'b',
        Escape: 'b',
        Enter: 'start',
        s: 'select',
        S: 'select',
      };
      const control = bindings[event.key];
      if (!control) return;
      event.preventDefault();
      if (!event.repeat) act(control);
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [act, resume]);
  const count =
    view === 'profile'
      ? profile.length
      : view === 'work'
        ? quests.length
        : toolkit.length;
  const activeJob = quests[page % quests.length];
  const activeProfile = profile[page % profile.length];
  const activeTools = toolkit[page % toolkit.length];
  return (
    <div className="portfolio-shell">
      <a className="skip-link" href="#profile">
        Skip to professional profile
      </a>
      <header className="site-header">
        <button
          className="wordmark"
          onClick={() => navigate('arcade')}
          aria-label="Iago Caldeira, home"
        >
          <span className="monogram">IC</span>
          <span>IAGO CALDEIRA</span>
        </button>
        <nav aria-label="Portfolio">
          <button
            className={`play-nav ${view === 'arcade' ? 'nav-active' : ''}`}
            onClick={() => navigate('arcade')}
          >
            Play my work <span aria-hidden="true">↗</span>
          </button>
          <a href="/infrastructure-engineer">For hiring teams</a>
          <a href="#selected-work">Work</a>
          <a href="/consulting">Consulting</a>
          <a className="header-resume" href="/resume">
            Résumé
          </a>
          <a
            className="header-linkedin"
            href={linkedInUrl}
            target="_blank"
            rel="me noopener"
          >
            LinkedIn <ArrowUpRight size={14} aria-hidden="true" />
          </a>
          <button
            className="sound-button"
            aria-label={sound ? 'Mute sound' : 'Enable sound'}
            aria-pressed={sound}
            onClick={() => setSound((value) => !value)}
          >
            {sound ? <Volume2 size={19} /> : <VolumeX size={19} />}
          </button>
        </nav>
      </header>
      <section className="main-stage" aria-label="Playable portfolio">
        <aside className="intro-note">
          <p className="intro-profession">
            SENIOR SRE / INFRASTRUCTURE ENGINEER
          </p>
          <h2>
            Serious systems.
            <br />
            Playful thinking.
          </h2>
          <p>
            Cloud infrastructure, platform engineering, observability & AI.
            <br />
            Brazil · LATAM · UTC−3.
          </p>
          <a
            className="profile-text-link"
            href={linkedInUrl}
            target="_blank"
            rel="me noopener"
          >
            Let’s connect on LinkedIn{' '}
            <ArrowUpRight size={14} aria-hidden="true" />
          </a>
          <CartridgeShelf
            state={arcade}
            active={view === 'arcade'}
            onInsert={insertCartridge}
          />
        </aside>
        <div className="console-column">
          <div className="console-stage">
            <section
              id="console"
              data-nosnippet=""
              className={`console ${power ? 'powered' : ''}`}
              tabIndex={-1}
              aria-label="Iago pocket interactive portfolio"
            >
              <div className="case-seam" aria-hidden="true" />
              <div className="power-control">
                <span>OFF</span>
                <Switch
                  checked={power}
                  onCheckedChange={togglePower}
                  aria-label="Console power"
                  className="power-switch"
                />
                <span>ON</span>
              </div>
              <div className="screen-bezel">
                <div className="bezel-heading">
                  <span />
                  <p>DOT MATRIX · PERSONAL SYSTEM</p>
                  <span />
                </div>
                <div className="battery-light">
                  <i />
                  <span>BATTERY</span>
                </div>
                <div className={`lcd ${power ? '' : 'lcd-off'}`}>
                  {power && (
                    <div
                      className={`lcd-content ${booting ? 'boot-screen' : ''}`}
                    >
                      {booting ? (
                        <>
                          <div className="boot-monogram">IC</div>
                          <p>PERSONAL SYSTEM</p>
                          <span className="boot-loading">■ ■ ■ ■</span>
                        </>
                      ) : (
                        <>
                          <div className="lcd-topline">
                            <span>
                              {view === 'arcade'
                                ? arcade.phase === 'select'
                                  ? 'SELECT CARTRIDGE'
                                  : `SIMULATION / 0${arcade.mission + 1}`
                                : view === 'menu'
                                  ? 'PLAYER 01'
                                  : menu.find((item) => item.view === view)
                                      ?.label}
                            </span>
                            <Battery />
                          </div>
                          <div className="screen-page" key={`${view}-${page}`}>
                            {view === 'arcade' && (
                              <ArcadeScreen
                                key={`${arcade.mission}-${arcade.phase}`}
                                state={arcade}
                                dispatch={arcadeInput}
                              />
                            )}
                            {view === 'menu' && (
                              <>
                                <div className="player-name">
                                  IAGO
                                  <br />
                                  CALDEIRA
                                </div>
                                <p className="player-role">
                                  SRE / PLATFORM / AI
                                </p>
                                <div
                                  className="screen-menu"
                                  aria-label="Console menu"
                                >
                                  {menu.map((item, index) => (
                                    <button
                                      key={item.view}
                                      className={
                                        selected === index ? 'selected' : ''
                                      }
                                      aria-current={
                                        selected === index ? 'true' : undefined
                                      }
                                      onPointerEnter={() => setSelected(index)}
                                      onClick={() => navigate(item.view)}
                                    >
                                      <span aria-hidden="true">
                                        {selected === index ? '▶' : ' '}
                                      </span>
                                      {item.label}
                                    </button>
                                  ))}
                                </div>
                              </>
                            )}
                            {view === 'profile' && (
                              <div className="detail-screen">
                                <span className="screen-eyebrow">
                                  {activeProfile.label}
                                </span>
                                <h2>{activeProfile.title}</h2>
                                <p>{activeProfile.text}</p>
                                <div className="screen-stamp">
                                  {activeProfile.footer}
                                </div>
                              </div>
                            )}
                            {view === 'work' && (
                              <div className="detail-screen">
                                <span className="screen-eyebrow">
                                  {activeJob.date}
                                  {activeJob.demo ? ' / DEMO' : ''}
                                </span>
                                <h2>{activeJob.title}</h2>
                                <span className="screen-job-role">
                                  {activeJob.role}
                                </span>
                                <p>{activeJob.summary}</p>
                                <div className="screen-stamp">
                                  {activeJob.stack}
                                </div>
                              </div>
                            )}
                            {view === 'toolkit' && (
                              <div className="detail-screen toolkit-screen">
                                <span className="screen-eyebrow">
                                  INVENTORY /{' '}
                                  {String(page + 1).padStart(2, '0')}
                                </span>
                                <h2>{activeTools.title}</h2>
                                <ul>
                                  {activeTools.items.map((item) => (
                                    <li key={item}>
                                      <span aria-hidden="true">✦</span>
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            {view === 'contact' && (
                              <div className="detail-screen contact-screen">
                                <span className="screen-eyebrow">
                                  NEXT QUEST?
                                </span>
                                <h2>
                                  LET’S BUILD
                                  <br />
                                  SOMETHING.
                                </h2>
                                <p>
                                  Good systems start with a good conversation.
                                </p>
                                <a
                                  className="contact-link"
                                  ref={contactLink}
                                  href={linkedInUrl}
                                  target="_blank"
                                  rel="me noopener"
                                >
                                  OPEN LINKEDIN ↗
                                </a>
                                <span className="contact-handle">
                                  IAGO NEVES CALDEIRA
                                </span>
                              </div>
                            )}
                          </div>
                          {view !== 'menu' && (
                            <div className="lcd-pagination">
                              <button onClick={() => act('b')}>B: BACK</button>
                              {view === 'arcade' ? (
                                <span>
                                  {arcade.phase === 'select'
                                    ? 'A: PLAY'
                                    : arcade.phase === 'complete'
                                      ? 'A: NEXT'
                                      : 'A: ACT'}
                                </span>
                              ) : view !== 'contact' ? (
                                <div>
                                  <button
                                    onClick={() => act('left')}
                                    aria-label="Previous page"
                                  >
                                    ◀
                                  </button>
                                  <span>
                                    {page + 1}/{count}
                                  </span>
                                  <button
                                    onClick={() => act('right')}
                                    aria-label="Next page"
                                  >
                                    ▶
                                  </button>
                                </div>
                              ) : (
                                <span>A: LINKEDIN</span>
                              )}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  )}
                  <div className="lcd-glass" aria-hidden="true" />
                </div>
              </div>
              <div className="device-brand" aria-hidden="true">
                <strong>IAGO</strong> <span>pocket</span>
              </div>
              <div className="controls">
                <div className="dpad-base">
                  <div className="dpad">
                    <div className="dpad-horizontal" />
                    <div className="dpad-vertical" />
                    <div className="dpad-center" />
                    {(['up', 'left', 'right', 'down'] as const).map(
                      (direction) => (
                        <button
                          key={direction}
                          className={`dpad-key dpad-${direction} ${pressed === direction ? 'is-pressed' : ''}`}
                          aria-label={`D-pad ${direction}`}
                          onClick={() => act(direction)}
                        >
                          <i />
                        </button>
                      ),
                    )}
                  </div>
                </div>
                <div className="action-buttons">
                  {(['b', 'a'] as const).map((key) => (
                    <div className="action-wrap" key={key}>
                      <button
                        className={`action-key ${pressed === key ? 'is-pressed' : ''}`}
                        aria-label={
                          key === 'a' ? 'A — open or next' : 'B — go back'
                        }
                        onClick={() => act(key)}
                      />
                      <span>{key.toUpperCase()}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="system-buttons">
                {(['select', 'start'] as const).map((key) => (
                  <div className="system-wrap" key={key}>
                    <button
                      className={`system-key ${pressed === key ? 'is-pressed' : ''}`}
                      aria-label={key === 'start' ? 'Start' : 'Select'}
                      onClick={() => act(key)}
                    />
                    <span>{key.toUpperCase()}</span>
                  </div>
                ))}
              </div>
              <div className="speaker" aria-hidden="true">
                {Array.from({ length: 6 }, (_, index) => (
                  <i key={index} />
                ))}
              </div>
              <div className="headphone-mark" aria-hidden="true">
                PHONES
              </div>
            </section>
          </div>
          <p className="under-console">
            {!power
              ? 'FLIP THE SWITCH. BEGIN AGAIN.'
              : booting
                ? 'A LITTLE NOSTALGIA IS LOADING…'
                : view === 'arcade'
                  ? arcade.phase === 'select'
                    ? 'PRESS START. PLAY MY WORK.'
                    : arcade.phase === 'complete'
                      ? 'A LITTLE CURIOSITY. A NEW BADGE.'
                      : '↑↓ CHOOSE · A ACT · B EJECT'
                  : view === 'menu'
                    ? 'PRESS START TO EXPLORE'
                    : 'EVERY GOOD SYSTEM HAS A STORY.'}
          </p>
          <output className="sr-only">
            {!power
              ? 'Power off'
              : booting
                ? 'Starting console'
                : view === 'arcade'
                  ? arcadeAnnouncement(arcade)
                  : view === 'menu'
                    ? `Menu. ${menu[selected].label} selected.`
                    : `${menu.find((item) => item.view === view)?.label}. ${view === 'contact' ? 'Connect with Iago Neves Caldeira on LinkedIn.' : `Page ${page + 1} of ${count}.`}`}
          </output>
        </div>
        {view === 'arcade' ? (
          <MissionNotes
            state={arcade}
            onResume={() => setResume(true)}
            onInsert={insertCartridge}
          />
        ) : (
          <aside className="how-to">
            <h2>A LITTLE HOW-TO</h2>
            <dl>
              <div>
                <dt className="mini-dpad" aria-hidden="true">
                  ✛
                </dt>
                <dd>Explore</dd>
              </div>
              <div>
                <dt>
                  <kbd className="round-key">A</kbd>
                </dt>
                <dd>Open / next</dd>
              </div>
              <div>
                <dt>
                  <kbd className="round-key">B</kbd>
                </dt>
                <dd>Go back</dd>
              </div>
              <div>
                <dt>
                  <kbd className="enter-key">ENTER</kbd>
                </dt>
                <dd>Start</dd>
              </div>
            </dl>
            <p className="keyboard-note">
              Click the buttons or
              <br />
              use your keyboard.
            </p>
            <button className="resume-link" onClick={() => setResume(true)}>
              Prefer the classic résumé? <ArrowUpRight size={15} />
            </button>
          </aside>
        )}
      </section>
      <div className="site-footer">
        <span>EST. 2018 · BUILT WITH CURIOSITY</span>
        <a href="#profile">MEET THE ENGINEER ↓</a>
      </div>
      <Resume open={resume} onOpenChange={setResume} />
    </div>
  );
}
