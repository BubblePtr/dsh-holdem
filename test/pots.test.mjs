import { test } from 'node:test'
import assert from 'node:assert/strict'
import { makePots } from '../src/pots.js'

function p(name, committed, folded = false) {
  return { name, committed, folded }
}

test('equal commitments make one pot with everyone eligible', () => {
  const pots = makePots([p('a', 300), p('b', 300), p('c', 300)])
  assert.equal(pots.length, 1)
  assert.equal(pots[0].amount, 900)
  assert.deepEqual(pots[0].eligible.map(x => x.name), ['a', 'b', 'c'])
})

test('an all-in short stack splits main pot and side pot', () => {
  const pots = makePots([p('short', 100), p('b', 300), p('c', 300)])
  assert.deepEqual(
    pots.map(x => ({ amount: x.amount, who: x.eligible.map(e => e.name) })),
    [
      { amount: 300, who: ['short', 'b', 'c'] },
      { amount: 400, who: ['b', 'c'] },
    ],
  )
})

test('a folded player funds pots but is never eligible', () => {
  const pots = makePots([p('quitter', 100, true), p('b', 300), p('c', 300)])
  assert.deepEqual(
    pots.map(x => ({ amount: x.amount, who: x.eligible.map(e => e.name) })),
    [
      { amount: 300, who: ['b', 'c'] },
      { amount: 400, who: ['b', 'c'] },
    ],
  )
})

test('players with nothing committed are ignored', () => {
  const pots = makePots([p('a', 0), p('b', 200), p('c', 200)])
  assert.equal(pots.length, 1)
  assert.equal(pots[0].amount, 400)
  assert.deepEqual(pots[0].eligible.map(x => x.name), ['b', 'c'])
})

test('three different stack sizes make three tiers', () => {
  const pots = makePots([p('a', 50), p('b', 150), p('c', 400)])
  assert.deepEqual(
    pots.map(x => ({ amount: x.amount, who: x.eligible.map(e => e.name) })),
    [
      { amount: 150, who: ['a', 'b', 'c'] },
      { amount: 200, who: ['b', 'c'] },
      { amount: 250, who: ['c'] },
    ],
  )
})

test('pot totals always equal total committed', () => {
  const players = [p('a', 37, true), p('b', 512), p('c', 512), p('d', 90)]
  const pots = makePots(players)
  const total = pots.reduce((s, x) => s + x.amount, 0)
  assert.equal(total, 37 + 512 + 512 + 90)
})
