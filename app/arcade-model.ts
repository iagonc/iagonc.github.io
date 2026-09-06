export const missions = [
  {
    id: 'cloud',
    number: '01',
    title: 'Cloud keeper',
    verb: 'Scale the cloud',
    category: 'PLATFORM ENGINEERING',
    employer: 'PicPay · 2021–2022',
    goal: 'Traffic is climbing. Add enough capacity, then send it through the cluster.',
    lesson:
      'Scaling should follow demand. Build capacity before the queue becomes an incident.',
    fact: '300+',
    factLabel: 'Kubernetes clusters',
    evidence:
      'Operated Kubernetes and AWS infrastructure, implemented queue-driven autoscaling and supported developers and production incidents at PicPay.',
    scope: [
      'Cloud foundations & cluster operations',
      'Autoscaling & production observability',
      'Delivery automation & developer support',
    ],
    tools: 'Kubernetes · KEDA · AWS · Terraform · New Relic',
    badge: 'Scale guardian',
    win: 'LOAD BALANCED',
    outcome: 'Capacity is ready. Traffic can flow.',
  },
  {
    id: 'signal',
    number: '02',
    title: 'Signal hunter',
    verb: 'Find the bottleneck',
    category: 'OBSERVABILITY',
    employer: 'iFood · 2022–2025',
    goal: 'A request is slow. Follow the trace, inspect each service, and find the bottleneck.',
    lesson:
      'A slow request is a clue. Follow the evidence across service boundaries before changing anything.',
    fact: '50+',
    factLabel: 'AWS accounts observed',
    evidence:
      'Led Datadog adoption, built developer platforms and redesigned internal services and cloud networking at iFood.',
    scope: [
      'Observability across 3,000+ EC2 instances',
      'GitLab CI for 5,000+ developers',
      'Multi-region recovery & cloud networking',
    ],
    tools: 'Datadog · Terraform · Kubernetes · Python · Go',
    badge: 'Signal detective',
    win: 'SIGNAL FOUND',
    outcome: 'The bottleneck is isolated. Service restored.',
  },
  {
    id: 'agent',
    number: '03',
    title: 'Agent forge',
    verb: 'Build with trust',
    category: 'PLATFORM & AI',
    employer: 'Alloy / Kinter · 2025–present',
    goal: 'Move a document through an AI workflow. Review the plan before allowing execution.',
    lesson:
      'An agent needs more than a model. Human review and an inspectable audit trail are part of the system.',
    fact: '24/7',
    factLabel: 'production platform operations',
    evidence:
      'Lead cloud infrastructure and production AI at Alloy / Kinter: from AWS and EKS operations to the agent engine I architected and shipped.',
    scope: [
      'Cloud infrastructure & GitOps delivery',
      'Observability & large-scale logging',
      'Agent orchestration, model routing & MCP',
    ],
    tools: 'AWS · Terraform · LangGraph · Bedrock · Go · Python',
    badge: 'Agent architect',
    win: 'WORKFLOW COMPLETE',
    outcome: 'Reviewed, executed, and recorded.',
  },
] as const;

export type MissionId = (typeof missions)[number]['id'];
export type ArcadeState = {
  mission: number;
  phase: 'select' | 'play' | 'complete';
  selected: number;
  pods: number;
  diagnosed: boolean;
  agentStep: number;
  inspected: number[];
  message: string;
  completed: MissionId[];
};
export type ArcadeAction =
  | { type: 'insert'; mission: number }
  | { type: 'move'; delta: number }
  | { type: 'choose'; index?: number }
  | { type: 'eject' }
  | { type: 'next' };

export const initialArcade: ArcadeState = {
  mission: 0,
  phase: 'select',
  selected: 0,
  pods: 1,
  diagnosed: false,
  agentStep: 0,
  inspected: [],
  message: '',
  completed: [],
};
const wrap = (value: number, length: number) =>
  ((value % length) + length) % length;
function freshRun(state: ArcadeState, mission = state.mission): ArcadeState {
  return {
    ...initialArcade,
    mission: wrap(mission, missions.length),
    completed: state.completed,
  };
}
function complete(state: ArcadeState): ArcadeState {
  const id = missions[state.mission].id;
  return {
    ...state,
    phase: 'complete',
    completed: state.completed.includes(id)
      ? state.completed
      : [...state.completed, id],
  };
}
export function missionOptions(state: ArcadeState): string[] {
  if (state.phase === 'select') return ['INSERT CARTRIDGE'];
  if (state.phase === 'complete') return ['NEXT CARTRIDGE'];
  const id = missions[state.mission].id;
  if (id === 'cloud') return ['ADD POD', 'ROUTE LOAD'];
  if (id === 'signal')
    return state.diagnosed
      ? ['TUNE DB POOL']
      : ['SCAN API', 'SCAN WORKER', 'SCAN DB'];
  if (state.agentStep === 2) return ['APPROVE', 'REVISE'];
  return [
    ['READ DOCUMENT', 'DRAFT PLAN', '', 'EXECUTE PLAN', 'WRITE AUDIT'][
      state.agentStep
    ],
  ];
}
export function arcadeReducer(
  state: ArcadeState,
  action: ArcadeAction,
): ArcadeState {
  if (action.type === 'insert')
    return { ...freshRun(state, action.mission), phase: 'play' };
  if (action.type === 'eject') return freshRun(state);
  if (action.type === 'next') return freshRun(state, state.mission + 1);
  if (action.type === 'move') {
    if (state.phase === 'select')
      return freshRun(state, state.mission + action.delta);
    if (state.phase === 'complete') return state;
    return {
      ...state,
      selected: wrap(
        state.selected + action.delta,
        missionOptions(state).length,
      ),
    };
  }
  if (state.phase === 'select') return { ...state, phase: 'play' };
  if (state.phase === 'complete') return freshRun(state, state.mission + 1);
  const selected = wrap(
    action.index ?? state.selected,
    missionOptions(state).length,
  );
  const id = missions[state.mission].id;
  if (id === 'cloud') {
    if (selected === 0)
      return {
        ...state,
        selected,
        pods: Math.min(4, state.pods + 1),
        message:
          state.pods >= 3
            ? 'CAPACITY READY. ROUTE THE LOAD.'
            : 'NEW POD ONLINE.',
      };
    if (state.pods < 4)
      return { ...state, selected, message: 'NOT ENOUGH CAPACITY. ADD PODS.' };
    return complete({ ...state, selected });
  }
  if (id === 'signal') {
    if (state.diagnosed) return complete(state);
    const inspected = state.inspected.includes(selected)
      ? state.inspected
      : [...state.inspected, selected];
    return {
      ...state,
      inspected,
      selected: selected === 2 ? 0 : selected,
      diagnosed: selected === 2,
      message: [
        'API HEALTHY. FOLLOW THE TRACE.',
        'WORKER WAITING ON DATABASE.',
        'FOUND: DATABASE POOL SATURATED.',
      ][selected],
    };
  }
  if (state.agentStep === 2 && selected === 1)
    return {
      ...state,
      agentStep: 1,
      selected: 0,
      message: 'PLAN RETURNED FOR REVISION.',
    };
  if (state.agentStep === 4) return complete(state);
  return {
    ...state,
    agentStep: state.agentStep + 1,
    selected: 0,
    message: [
      'DOCUMENT READ. DRAFT A PLAN.',
      'HUMAN REVIEW REQUIRED.',
      'APPROVED. SAFE TO EXECUTE.',
      'EXECUTED. RECORD THE AUDIT.',
    ][state.agentStep],
  };
}
export function arcadeAnnouncement(state: ArcadeState) {
  const mission = missions[state.mission];
  if (state.phase === 'complete')
    return `${mission.title} complete. ${mission.badge} earned. ${state.completed.length} of 3 badges. A: next cartridge.`;
  if (state.phase === 'select')
    return `${mission.title} selected. ${mission.goal} A or Start to play.`;
  return `${mission.title}. ${state.message || mission.goal} ${missionOptions(state)[state.selected]} selected.`;
}

export function missionGuidance(state: ArcadeState): string {
  const mission = missions[state.mission];
  if (state.phase === 'select') return mission.goal;
  if (state.phase === 'complete') return mission.lesson;
  if (mission.id === 'cloud') {
    if (state.pods === 4)
      return 'Four pods are online. The cluster has enough capacity. Select ROUTE LOAD to distribute the traffic.';
    if (state.message.startsWith('NOT ENOUGH'))
      return 'The load would overwhelm this cluster. Bring all four pods online before routing the traffic.';
    return `${state.pods} of 4 pods online. Each new replica adds capacity. Keep scaling, then route the load.`;
  }
  if (mission.id === 'signal') {
    if (state.diagnosed)
      return 'Found it: the database connection pool is saturated. Tune the pool to complete this simulated incident.';
    if (state.message.startsWith('WORKER'))
      return 'The worker is waiting, not processing. Its dependency is the next place to look. Inspect the database.';
    if (state.message.startsWith('API'))
      return 'The API responds in 12 ms. The delay is downstream. Follow the trace to the worker and database.';
    return mission.goal;
  }
  if (state.message.includes('REVISION'))
    return 'You sent the plan back. The agent must draft it again and return for another human review.';
  return [
    'A document has arrived. Start by reading it, then let the agent draft a plan.',
    'The document is understood. Draft an execution plan that a person can inspect.',
    'Your move: approve the plan or send it back for revision. The agent cannot execute without your approval.',
    'The plan is approved. Now the agent can carry out the reviewed action.',
    'Execution is done. Write the audit trail so someone can inspect what happened later.',
  ][state.agentStep];
}
