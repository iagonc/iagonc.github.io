import test from 'node:test';
import assert from 'node:assert/strict';
import {
  arcadeReducer as reduce,
  initialArcade,
  missionOptions,
} from '../app/arcade-model.ts';

const start = (mission) => reduce(initialArcade, { type: 'insert', mission });
const choose = (state, index = 0) => reduce(state, { type: 'choose', index });

test('cloud: routing early is rejected; adding capacity allows routing', () => {
  let state = start(0);
  state = choose(state, 1);
  assert.equal(state.phase, 'play');
  assert.equal(state.completed.length, 0);
  assert.match(state.message, /NOT ENOUGH CAPACITY/);
  for (let i = 0; i < 3; i++) state = choose(state, 0);
  assert.equal(state.pods, 4);
  assert.equal(choose(state, 0).pods, 4);
  state = choose(state, 1);
  assert.equal(state.phase, 'complete');
  assert.deepEqual(state.completed, ['cloud']);
});
test('signal: healthy services cannot complete the incident; diagnosis precedes remediation', () => {
  let state = choose(start(1), 0);
  assert.equal(state.diagnosed, false);
  state = choose(state, 1);
  assert.match(state.message, /WAITING ON DATABASE/);
  assert.equal(state.completed.length, 0);
  state = choose(state, 2);
  assert.equal(state.diagnosed, true);
  assert.equal(state.phase, 'play');
  assert.deepEqual(missionOptions(state), ['TUNE DB POOL']);
  assert.deepEqual(choose(state).completed, ['signal']);
});
test('agent: rejecting a plan returns to planning; approval is required before execution', () => {
  let state = choose(choose(start(2)));
  assert.equal(state.agentStep, 2);
  assert.deepEqual(missionOptions(state), ['APPROVE', 'REVISE']);
  state = choose(state, 1);
  assert.equal(state.agentStep, 1);
  assert.equal(state.completed.length, 0);
  state = choose(state);
  assert.equal(state.agentStep, 2);
  state = choose(state, 0);
  assert.equal(state.agentStep, 3);
  state = choose(state);
  assert.equal(state.agentStep, 4);
  assert.equal(state.phase, 'play');
  state = choose(state);
  assert.equal(state.phase, 'complete');
  assert.deepEqual(state.completed, ['agent']);
});
test('eject discards in-flight simulation state but retains earned badges', () => {
  let state = choose(choose(start(1), 2));
  state = reduce(state, { type: 'insert', mission: 0 });
  state = choose(state);
  state = reduce(state, { type: 'eject' });
  assert.equal(state.phase, 'select');
  assert.equal(state.pods, 1);
  assert.deepEqual(state.completed, ['signal']);
});
test('replaying a completed mission does not duplicate its badge', () => {
  let state = choose(choose(start(1), 2));
  state = reduce(state, { type: 'insert', mission: 1 });
  state = choose(choose(state, 2));
  assert.deepEqual(state.completed, ['signal']);
});
test('directional controls wrap mission and action selection correctly', () => {
  assert.equal(reduce(initialArcade, { type: 'move', delta: -1 }).mission, 2);
  let state = reduce(start(0), { type: 'move', delta: -1 });
  assert.equal(state.selected, 1);
  state = reduce(state, { type: 'move', delta: 1 });
  assert.equal(state.selected, 0);
});
test('all three badges remain collected when selecting the next cartridge', () => {
  let state = start(0);
  for (let i = 0; i < 3; i++) state = choose(state);
  state = choose(state, 1);
  state = reduce(state, { type: 'insert', mission: 1 });
  state = choose(choose(state, 2));
  state = reduce(state, { type: 'insert', mission: 2 });
  for (let i = 0; i < 5; i++) state = choose(state);
  assert.deepEqual(state.completed, ['cloud', 'signal', 'agent']);
  state = reduce(state, { type: 'next' });
  assert.equal(state.phase, 'select');
  assert.equal(state.mission, 0);
  assert.equal(state.completed.length, 3);
});
