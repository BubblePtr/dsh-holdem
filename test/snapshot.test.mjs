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

test('after dealing, blind seats follow the dealer button', () => {
  const table = createTable(stubCtx())
  const snap = table.start()
  const n = snap.players.length
  const dealer = snap.players.find(p => p.isDealer)
  const sb = snap.players.filter(p => p.isSb)
  const bb = snap.players.filter(p => p.isBb)
  assert.equal(sb.length, 1)
  assert.equal(bb.length, 1)
  assert.equal(sb[0].seat, (dealer.seat + 1) % n)
  assert.equal(bb[0].seat, (dealer.seat + 2) % n)
  // The three buttons sit on three different seats at a six-max table.
  assert.equal(new Set([dealer.seat, sb[0].seat, bb[0].seat]).size, 3)
})
