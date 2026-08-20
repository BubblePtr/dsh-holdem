// Side-pot layering from per-player committed chips. Pure: reads only
// { committed, folded } off each player and never mutates.
export function makePots(players) {
  const levels = []
  for (let i = 0; i < players.length; i++) {
    const c = players[i].committed
    if (c > 0 && levels.indexOf(c) === -1) levels.push(c)
  }
  levels.sort(function (a, b) { return a - b })
  const pots = []
  let prev = 0
  for (let i = 0; i < levels.length; i++) {
    const level = levels[i]
    let amount = 0
    const eligible = []
    for (let j = 0; j < players.length; j++) {
      const p = players[j]
      if (p.committed > prev) amount += Math.min(p.committed, level) - prev
      if (!p.folded && p.committed >= level) eligible.push(p)
    }
    if (amount > 0 && eligible.length) pots.push({ amount: amount, eligible: eligible })
    prev = level
  }
  return pots
}
