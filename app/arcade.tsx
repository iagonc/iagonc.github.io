'use client';

import {
  Activity,
  ArrowUpRight,
  BadgeCheck,
  Boxes,
  BrainCircuit,
  Check,
  ChevronRight,
  Database,
  FileText,
  GitBranch,
  LockKeyhole,
  Server,
  ShieldCheck,
} from 'lucide-react';
import {
  missions,
  missionOptions,
  missionGuidance,
  type ArcadeAction,
  type ArcadeState,
} from './arcade-model';
import type { Dispatch } from 'react';

const missionIcons = [Boxes, Activity, BrainCircuit];

export function CartridgeShelf({
  state,
  active,
  onInsert,
}: {
  state: ArcadeState;
  active: boolean;
  onInsert: (index: number) => void;
}) {
  return (
    <div className="cartridge-shelf" aria-label="Playable work cartridges">
      <p className="shelf-label">THREE CHAPTERS. YOUR MOVE.</p>
      {missions.map((mission, index) => {
        const Icon = missionIcons[index];
        const selected = active && state.mission === index;
        const done = state.completed.includes(mission.id);
        return (
          <button
            className={`cartridge ${selected ? 'is-inserted' : ''} cartridge-${mission.id}`}
            key={mission.id}
            onClick={() => onInsert(index)}
            aria-label={`Insert ${mission.title} cartridge`}
            aria-pressed={selected}
          >
            <span className="cartridge-grip" aria-hidden="true" />
            <span className="cartridge-label">
              <span className="cartridge-serial">
                IAGO / VOL. {mission.number}
                <span>{done ? 'CLEARED' : 'INTERACTIVE'}</span>
              </span>
              <span className="cartridge-title">
                <Icon size={23} strokeWidth={1.5} />
                <strong>{mission.title}</strong>
                {done ? <Check size={15} /> : <ChevronRight size={15} />}
              </span>
              <span className="cartridge-subtitle">{mission.category}</span>
            </span>
            <span className="cartridge-notch" aria-hidden="true" />
          </button>
        );
      })}
      <p className="shelf-footnote">
        Pick a cartridge. Play a little.
        <br />
        Meet the engineer behind it.
      </p>
    </div>
  );
}

function CloudDiagram({
  state,
  preview = false,
}: {
  state: ArcadeState;
  preview?: boolean;
}) {
  const pods = preview ? 2 : state.pods;
  const done = state.phase === 'complete';
  return (
    <svg
      className={`mission-diagram cloud-diagram ${done ? 'diagram-cleared' : ''}`}
      viewBox="0 0 220 104"
      aria-label={`${pods} of 4 pods online. Add capacity to handle incoming traffic.`}
    >
      <path
        className="diagram-wire"
        d="M42 49H77V14H124M77 49V39H124M77 49V64H124M77 49V89H124"
      />
      <path className="packet-flow" d="M42 49H77V14H124" />
      <rect
        className="diagram-node"
        x="3"
        y="32"
        width="39"
        height="33"
        rx="2"
      />
      <Server x="13" y="38" width="18" height="18" strokeWidth="1.5" />
      <text x="22" y="81" textAnchor="middle">
        LOAD
      </text>
      {[0, 1, 2, 3].map((i) => (
        <g key={i} className={i < pods ? 'pod-online' : 'pod-offline'}>
          <path
            className={i < pods ? 'packet-flow' : 'diagram-wire'}
            d={`M77 ${14 + i * 25}H124`}
          />
          <rect x="124" y={4 + i * 25} width="80" height="19" rx="1" />
          <rect
            className="pod-light"
            x="131"
            y={10 + i * 25}
            width="5"
            height="5"
          />
          <text x="145" y={18 + i * 25}>
            POD 0{i + 1} {i < pods ? 'ON' : '--'}
          </text>
        </g>
      ))}
    </svg>
  );
}

function SignalDiagram({ state }: { state: ArcadeState }) {
  const nodes = [Server, GitBranch, Database];
  return (
    <svg
      className="mission-diagram"
      viewBox="0 0 220 104"
      aria-label={
        state.diagnosed
          ? 'The database connection pool is the bottleneck.'
          : 'Trace: API to worker to database. Inspect each service.'
      }
    >
      <path className="diagram-wire" d="M36 43H187" />
      <path className="packet-flow" d="M36 43H187" />
      {nodes.map((Icon, i) => (
        <g
          key={i}
          className={`trace-node ${state.selected === i && !state.diagnosed ? 'trace-selected' : ''} ${state.inspected.includes(i) ? 'trace-inspected' : ''} ${i === 2 && state.diagnosed ? 'trace-found' : ''}`}
        >
          <rect x={8 + i * 77} y="23" width="48" height="39" rx="2" />
          <Icon
            x={21 + i * 77}
            y="32"
            width="21"
            height="21"
            strokeWidth="1.5"
          />
          <text x={32 + i * 77} y="78" textAnchor="middle">
            {['API', 'WORKER', 'DATABASE'][i]}
          </text>
          {state.inspected.includes(i) && (
            <text x={32 + i * 77} y="94" textAnchor="middle">
              {i === 2 ? '800ms !' : i === 0 ? '12ms OK' : 'WAITING'}
            </text>
          )}
        </g>
      ))}
    </svg>
  );
}

function AgentDiagram({ state }: { state: ArcadeState }) {
  const icons = [FileText, BrainCircuit, ShieldCheck, GitBranch, LockKeyhole];
  return (
    <svg
      className="mission-diagram agent-diagram"
      viewBox="0 0 220 104"
      aria-label={`Workflow step ${state.agentStep + 1} of 5: ${['Read document', 'Draft plan', 'Human review', 'Execute', 'Audit'][state.agentStep]}. Execution requires human approval.`}
    >
      <path className="diagram-wire" d="M20 43H200" />
      {icons.map((Icon, i) => (
        <g
          key={i}
          className={`agent-node ${i < state.agentStep ? 'agent-done' : ''} ${i === state.agentStep ? 'agent-current' : ''}`}
        >
          <rect x={2 + i * 44} y="25" width="38" height="36" rx="2" />
          <Icon
            x={12 + i * 44}
            y="34"
            width="18"
            height="18"
            strokeWidth="1.5"
          />
          <text x={21 + i * 44} y="78" textAnchor="middle">
            {['READ', 'PLAN', 'HUMAN', 'RUN', 'AUDIT'][i]}
          </text>
          {i < state.agentStep && (
            <path
              d={`M${17 + i * 44} 87l3 3 6-6`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
          )}
        </g>
      ))}
      {state.agentStep === 2 && (
        <text className="human-gate" x="110" y="99" textAnchor="middle">
          YOUR APPROVAL IS THE GATE
        </text>
      )}
    </svg>
  );
}

export function ArcadeScreen({
  state,
  dispatch,
}: {
  state: ArcadeState;
  dispatch: Dispatch<ArcadeAction>;
}) {
  const mission = missions[state.mission];
  const options = missionOptions(state);
  if (state.phase === 'select')
    return (
      <div className="arcade-screen mission-picker">
        <div className="arcade-heading">
          <span>IAGO’S</span>
          <h2>PLAYABLE WORK.</h2>
        </div>
        <p className="arcade-small">REAL EXPERIENCE. SMALL ADVENTURES.</p>
        <div className="mission-menu">
          {missions.map((item, index) => (
            <button
              key={item.id}
              className={index === state.mission ? 'selected' : ''}
              onClick={() => dispatch({ type: 'insert', mission: index })}
            >
              <span>{index === state.mission ? '▶' : item.number}</span>
              <strong>{item.title}</strong>
              {state.completed.includes(item.id) ? (
                <Check size={13} />
              ) : (
                <ChevronRight size={13} />
              )}
            </button>
          ))}
        </div>
        <div className="mission-picker-footer">
          <span>BADGES {state.completed.length}/3</span>
          <span>↑↓ CHOOSE · A PLAY</span>
        </div>
      </div>
    );
  if (state.phase === 'complete')
    return (
      <div className="arcade-screen quest-complete">
        <span className="arcade-small">
          {state.completed.length === 3 ? 'ALL SYSTEMS GO' : 'QUEST CLEAR!'}
        </span>
        <div className="badge-reveal">
          <span aria-hidden="true">✦</span>
          <BadgeCheck strokeWidth={1.3} />
          <span aria-hidden="true">✦</span>
        </div>
        <h2>{mission.win}</h2>
        <p>{mission.badge.toUpperCase()}</p>
        <span className="arcade-small">
          {state.completed.length}/3 BADGES COLLECTED
        </span>
        <button
          className="arcade-primary"
          onClick={() => dispatch({ type: 'next' })}
        >
          NEXT CARTRIDGE →
        </button>
      </div>
    );
  const status =
    mission.id === 'cloud'
      ? `CAPACITY ${state.pods}/4`
      : mission.id === 'signal'
        ? state.diagnosed
          ? 'BOTTLENECK LOCATED'
          : `${state.inspected.length}/3 SERVICES INSPECTED`
        : `WORKFLOW ${state.agentStep + 1}/5`;
  const message =
    state.message ||
    (mission.id === 'cloud'
      ? 'TRAFFIC SPIKE. SCALE THE CLUSTER.'
      : mission.id === 'signal'
        ? 'REQUEST SLOW. FOLLOW THE TRACE.'
        : 'A DOCUMENT JUST ARRIVED.');
  return (
    <div className={`arcade-screen mission-play mission-${mission.id}`}>
      <div className="mission-status">
        <h2>{mission.title}</h2>
        <span>{status}</span>
      </div>
      {mission.id === 'cloud' ? (
        <CloudDiagram state={state} />
      ) : mission.id === 'signal' ? (
        <SignalDiagram state={state} />
      ) : (
        <AgentDiagram state={state} />
      )}
      <p className="mission-message" key={message}>
        {message}
      </p>
      <div
        className={`mission-actions ${options.length === 3 ? 'three-actions' : ''}`}
      >
        {options.map((option, index) => (
          <button
            key={option}
            className={state.selected === index ? 'selected' : ''}
            onClick={() => dispatch({ type: 'choose', index })}
          >
            {state.selected === index ? '▶ ' : ''}
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export function MissionNotes({
  state,
  onResume,
  onInsert,
}: {
  state: ArcadeState;
  onResume: () => void;
  onInsert: (index: number) => void;
}) {
  const mission = missions[state.mission];
  const Icon = missionIcons[state.mission];
  const done = state.phase === 'complete';
  return (
    <aside className={`mission-notes ${done ? 'notes-complete' : ''}`}>
      <div className="notes-heading">
        <Icon size={19} strokeWidth={1.4} />
        <span>
          {done
            ? 'MISSION ACCOMPLISHED'
            : `MISSION ${mission.number} / FIELD NOTES`}
        </span>
      </div>
      <h2>{done ? mission.outcome : mission.verb + '.'}</h2>
      <p className="mission-instruction">{missionGuidance(state)}</p>
      <div className="real-experience">
        <span className="notes-kicker">THE REAL-WORLD CHAPTER</span>
        <div className="experience-stat">
          <strong>{mission.fact}</strong>
          <span>{mission.factLabel}</span>
        </div>
        <p>{mission.evidence}</p>
        <ul className="mission-scope" aria-label="Areas of my work">
          {mission.scope.map((area) => (
            <li key={area}>{area}</li>
          ))}
        </ul>
        <span className="notes-employer">{mission.employer}</span>
        <p className="notes-tools">{mission.tools}</p>
        <a
          className="notes-career"
          href={`#${['platform-engineering', 'observability', 'ai-infrastructure'][state.mission]}`}
        >
          Explore my full scope <ArrowUpRight size={13} />
        </a>
      </div>
      <p className="simulation-note">
        Interactive simulation. Career facts from my résumé.
        <br />
        The scenarios and live numbers are illustrative.
      </p>
      <div className="badge-collection">
        <div>
          <span>YOUR COLLECTION</span>
          <span>{state.completed.length}/3</span>
        </div>
        <div className="collection-slots">
          {missions.map((item, index) => {
            const earned = state.completed.includes(item.id);
            const BadgeIcon = missionIcons[index];
            return (
              <button
                key={item.id}
                className={earned ? 'badge-earned' : ''}
                onClick={() => onInsert(index)}
                aria-label={`${item.badge}: ${earned ? 'earned. Replay' : 'not earned. Play'} ${item.title}`}
                title={item.badge}
              >
                <BadgeIcon size={20} strokeWidth={1.4} />
                {earned && <Check size={10} />}
              </button>
            );
          })}
          <p>
            {state.completed.length === 3 ? (
              <>
                All three. Nicely played.
                <br />
                Let’s build the next one.
              </>
            ) : (
              <>
                A little curiosity.
                <br />
                Three badges to earn.
              </>
            )}
          </p>
        </div>
      </div>
      <div className="mission-key-hints">
        <span>
          ↑↓ <b>Choose</b>
        </span>
        <span>
          Ⓐ <b>Act</b>
        </span>
        <span>
          Ⓑ <b>Eject</b>
        </span>
      </div>
      <button className="resume-link" onClick={onResume}>
        The classic résumé <ArrowUpRight size={14} />
      </button>
    </aside>
  );
}
