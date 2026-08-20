// Pure card & hand-evaluation library: no table state, no side effects.
export const RANKS = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
export const SUITS = ['s', 'h', 'd', 'c']
export const HAND_NAMES = ['高牌', '一对', '两对', '三条', '顺子', '同花', '葫芦', '四条', '同花顺', '皇家同花顺']

export const RANK_TXT = { 14: 'A', 13: 'K', 12: 'Q', 11: 'J', 10: 'T', 9: '9', 8: '8', 7: '7', 6: '6', 5: '5', 4: '4', 3: '3', 2: '2' }
export const SUIT_TXT = { s: 's', h: 'h', d: 'd', c: 'c' }

export function cardTxt(c) {
  if (!c) return '?'
  return (RANK_TXT[c.r] || c.r) + (SUIT_TXT[c.s] || c.s)
}

export function makeDeck() {
  const deck = []
  for (let s = 0; s < SUITS.length; s++) {
    for (let r = 0; r < RANKS.length; r++) deck.push({ r: RANKS[r], s: SUITS[s] })
  }
  return deck
}

export function shuffle(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const t = deck[i]
    deck[i] = deck[j]
    deck[j] = t
  }
  return deck
}

export function eval5(cards) {
  const ranks = cards.map(function (c) { return c.r }).sort(function (a, b) { return b - a })
  const flush = cards.every(function (c) { return c.s === cards[0].s })
  const uniq = []
  for (let i = 0; i < ranks.length; i++) {
    if (uniq[uniq.length - 1] !== ranks[i]) uniq.push(ranks[i])
  }
  let straightHigh = 0
  if (uniq.length === 5) {
    if (uniq[0] - uniq[4] === 4) straightHigh = uniq[0]
    else if (uniq[0] === 14 && uniq[1] === 5 && uniq[2] === 4 && uniq[3] === 3 && uniq[4] === 2) straightHigh = 5
  }
  const counts = {}
  for (let i = 0; i < ranks.length; i++) counts[ranks[i]] = (counts[ranks[i]] || 0) + 1
  const groups = Object.keys(counts).map(Number).sort(function (a, b) {
    const d = counts[b] - counts[a]
    return d !== 0 ? d : b - a
  })
  let cat = 0
  let kick = ranks
  if (straightHigh && flush) {
    cat = straightHigh === 14 ? 9 : 8
    kick = [straightHigh]
  } else if (counts[groups[0]] === 4) {
    cat = 7
    kick = groups
  } else if (counts[groups[0]] === 3 && counts[groups[1]] === 2) {
    cat = 6
    kick = groups
  } else if (flush) {
    cat = 5
    kick = ranks
  } else if (straightHigh) {
    cat = 4
    kick = [straightHigh]
  } else if (counts[groups[0]] === 3) {
    cat = 3
    kick = groups
  } else if (counts[groups[0]] === 2 && counts[groups[1]] === 2) {
    cat = 2
    kick = groups
  } else if (counts[groups[0]] === 2) {
    cat = 1
    kick = groups
  }
  let score = cat
  for (let i = 0; i < 5; i++) score = score * 16 + (kick[i] || 0)
  const name = cat === 9 ? HAND_NAMES[9] : HAND_NAMES[cat]
  return { cat: cat, kick: kick, score: score, name: name }
}

export function combos5(cards) {
  const out = []
  const n = cards.length
  for (let a = 0; a < n - 4; a++) {
    for (let b = a + 1; b < n - 3; b++) {
      for (let c = b + 1; c < n - 2; c++) {
        for (let d = c + 1; d < n - 1; d++) {
          for (let e = d + 1; e < n; e++) out.push([cards[a], cards[b], cards[c], cards[d], cards[e]])
        }
      }
    }
  }
  return out
}

export function evalBest(cards) {
  if (!cards || cards.length < 5) return { cat: -1, score: -1, name: '—', kick: [] }
  if (cards.length === 5) return eval5(cards)
  const list = combos5(cards)
  let best = null
  for (let i = 0; i < list.length; i++) {
    const ev = eval5(list[i])
    if (!best || ev.score > best.score) best = ev
  }
  return best
}

export function preflopScore(cards) {
  const a = cards[0].r >= cards[1].r ? cards[0] : cards[1]
  const b = cards[0].r >= cards[1].r ? cards[1] : cards[0]
  if (a.r === b.r) return Math.min(0.96, 0.46 + a.r / 28)
  const gap = a.r - b.r
  let s = (a.r + b.r) / 42
  if (a.s === b.s) s += 0.08
  if (gap === 1) s += 0.09
  else if (gap === 2) s += 0.04
  else s -= gap * 0.016
  if (a.r >= 13 && b.r >= 10) s += 0.08
  return Math.max(0.06, Math.min(0.9, s))
}

export function strength(hole, board) {
  if (!board || board.length === 0) return preflopScore(hole)
  const ev = evalBest(hole.concat(board))
  const boardEv = board.length >= 5 ? evalBest(board.slice()) : null
  let s = 0.12 + ev.cat * 0.09
  if (boardEv && ev.score <= boardEv.score) s *= 0.55
  if (ev.cat >= 4) s += 0.12
  return Math.max(0.06, Math.min(0.98, s))
}
