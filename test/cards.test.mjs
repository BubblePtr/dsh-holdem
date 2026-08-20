import { test } from 'node:test'
import assert from 'node:assert/strict'
import { cardTxt, eval5, evalBest, makeDeck, preflopScore, strength } from '../src/cards.js'

// 'As' -> { r: 14, s: 's' }
const R = { A: 14, K: 13, Q: 12, J: 11, T: 10 }
function c(txt) {
  const r = R[txt[0]] || Number(txt[0])
  return { r, s: txt[1] }
}
function hand(txt) {
  return txt.split(' ').map(c)
}

test('makeDeck yields 52 unique cards', () => {
  const deck = makeDeck()
  assert.equal(deck.length, 52)
  assert.equal(new Set(deck.map(cardTxt)).size, 52)
})

test('eval5 assigns every category and Chinese name', () => {
  const cases = [
    ['As Ks Qs Js Ts', 9, '皇家同花顺'],
    ['9h 8h 7h 6h 5h', 8, '同花顺'],
    ['9h 9s 9d 9c 2h', 7, '四条'],
    ['9h 9s 9d 2c 2h', 6, '葫芦'],
    ['Ah Kh 9h 6h 3h', 5, '同花'],
    ['9h 8s 7d 6c 5h', 4, '顺子'],
    ['9h 9s 9d Kc 2h', 3, '三条'],
    ['9h 9s 5d 5c Kh', 2, '两对'],
    ['9h 9s Kd 7c 2h', 1, '一对'],
    ['Ah Ks 9d 7c 2h', 0, '高牌'],
  ]
  for (const [txt, cat, name] of cases) {
    const ev = eval5(hand(txt))
    assert.equal(ev.cat, cat, txt)
    assert.equal(ev.name, name, txt)
  }
})

test('eval5 category scores are strictly ordered', () => {
  const ladder = [
    'Ah Ks 9d 7c 2h',
    '9h 9s Kd 7c 2h',
    '9h 9s 5d 5c Kh',
    '9h 9s 9d Kc 2h',
    '9h 8s 7d 6c 5h',
    'Ah Kh 9h 6h 3h',
    '9h 9s 9d 2c 2h',
    '9h 9s 9d 9c 2h',
    '9h 8h 7h 6h 5h',
    'As Ks Qs Js Ts',
  ]
  for (let i = 1; i < ladder.length; i++) {
    assert.ok(
      eval5(hand(ladder[i])).score > eval5(hand(ladder[i - 1])).score,
      `${ladder[i]} should beat ${ladder[i - 1]}`,
    )
  }
})

test('kickers break ties inside a category', () => {
  assert.ok(eval5(hand('Kh Ks 9d 7c 2h')).score > eval5(hand('Qh Qs 9d 7c 2h')).score)
  assert.ok(eval5(hand('Ah Ks Qd Jc 9h')).score > eval5(hand('Ah Ks Qd Jc 8h')).score)
  assert.ok(eval5(hand('9h 9s 5d 5c Kh')).score > eval5(hand('9h 9s 5d 5c Qh')).score)
})

test('the wheel counts as a 5-high straight', () => {
  const wheel = eval5(hand('Ah 2s 3d 4c 5h'))
  assert.equal(wheel.cat, 4)
  assert.ok(eval5(hand('6h 5s 4d 3c 2h')).score > wheel.score)
})

test('evalBest picks the best five of seven', () => {
  // Board pairs with a flush: the flush must win over the straight.
  const ev = evalBest(hand('Ah Kh 9h 6h 3h 7s 8s'))
  assert.equal(ev.cat, 5)
  // Fewer than five cards cannot be evaluated.
  assert.equal(evalBest(hand('Ah Kh')).cat, -1)
})

test('preflop and postflop strength stay within (0, 1)', () => {
  assert.ok(preflopScore(hand('Ah As')) > preflopScore(hand('7h 2s')))
  const s = strength(hand('Ah As'), hand('Kd 8c 3s'))
  assert.ok(s > 0 && s < 1)
})
