import { test } from 'node:test'
import assert from 'node:assert/strict'
import { raisePresets, raiseSizeForPct } from '../src/bets.js'

// Screenshot: check-available, 1.11M behind, a built pot. 25% of pot is
// already more than the stack, so a naive clamp turns every chip into all-in.

test('25% of a large pot is a quarter of remaining chips, not a silent all-in', () => {
  const v = raiseSizeForPct(25, {
    pot: 4500000,
    currentBet: 0,
    minR: 20000,
    maxR: 1110000,
  })
  assert.equal(v, 277500)
  assert.ok(v < 1110000)
})

test('25% of a small pot stays pot-relative', () => {
  const v = raiseSizeForPct(25, {
    pot: 800000,
    currentBet: 0,
    minR: 20000,
    maxR: 2000000,
  })
  assert.equal(v, 200000)
})

test('sizes below the min raise bump to min, not to all-in', () => {
  const v = raiseSizeForPct(25, {
    pot: 40000,
    currentBet: 0,
    minR: 20000,
    maxR: 2000000,
  })
  assert.equal(v, 20000)
})

test('percent chips that would still be all-in are omitted', () => {
  const chips = raisePresets({
    pot: 4500000,
    currentBet: 0,
    minR: 20000,
    maxR: 1110000,
  })
  assert.deepEqual(chips.map((c) => c.label), ['25%', '33%', '75%'])
  assert.deepEqual(chips.map((c) => c.v), [277500, 366300, 832500])
  assert.ok(chips.every((c) => c.v < 1110000))
})

test('all four chips stay when every pot fraction fits', () => {
  const chips = raisePresets({
    pot: 400000,
    currentBet: 0,
    minR: 20000,
    maxR: 2000000,
  })
  assert.deepEqual(
    chips.map((c) => [c.label, c.v]),
    [
      ['25%', 100000],
      ['33%', 132000],
      ['75%', 300000],
      ['133%', 532000],
    ],
  )
})
