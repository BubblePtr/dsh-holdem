import { test } from 'node:test'
import assert from 'node:assert/strict'
import { createTable } from '../src/host.js'

// Minimal ctx stub: timeout returns a disposer, effect just runs for its
// registration side effect, get() reports no llm so bots stay heuristic.
function stubCtx() {
  return {
    effect(fn) { fn() },
    timeout() { return function () {} },
    get() { return undefined },
  }
}

// Next seat clockwise on the drawn table (hero at bottom, seats increase right).
const CLOCKWISE = { 0: 5, 5: 4, 4: 3, 3: 2, 2: 1, 1: 0 }

test('blinds sit clockwise from the dealer button', () => {
  const table = createTable(stubCtx())
  const snap = table.start()
  const dealer = snap.players.find(p => p.isDealer)
  const sb = snap.players.filter(p => p.isSb)
  const bb = snap.players.filter(p => p.isBb)
  assert.equal(sb.length, 1)
  assert.equal(bb.length, 1)
  assert.equal(sb[0].seat, CLOCKWISE[dealer.seat])
  assert.equal(bb[0].seat, CLOCKWISE[sb[0].seat])
  assert.equal(new Set([dealer.seat, sb[0].seat, bb[0].seat]).size, 3)
})

test('preflop action starts clockwise from the big blind', () => {
  const table = createTable(stubCtx())
  const snap = table.start()
  const bb = snap.players.find(p => p.isBb)
  assert.equal(snap.toAct, CLOCKWISE[bb.seat])
})
