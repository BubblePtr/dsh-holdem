// Raise-to sizing for the action bar. Pure: no DOM, no table state.

function clamp(n, a, b) {
  return Math.max(a, Math.min(b, n))
}

const DEFAULT_PCTS = [25, 33, 75, 133]

// Pot-relative raise-to (currentBet + pot * pct). If that already shoves,
// fall back to the same fraction of remaining chips so a 25% chip is never
// a silent all-in.
export function raiseSizeForPct(pct, opts) {
  const pot = Number(opts.pot) || 0
  const currentBet = Number(opts.currentBet) || 0
  const minR = Number(opts.minR) || 0
  const maxR = Number(opts.maxR) || 0
  if (maxR <= 0) return 0
  let raw = Math.floor(currentBet + pot * (pct / 100))
  if (raw >= maxR) raw = Math.floor(maxR * (pct / 100))
  return clamp(raw, minR, maxR)
}

export function raisePresets(opts) {
  const pcts = opts.pcts || DEFAULT_PCTS
  const maxR = Number(opts.maxR) || 0
  const seen = Object.create(null)
  const out = []
  for (let i = 0; i < pcts.length; i++) {
    const pct = pcts[i]
    const v = raiseSizeForPct(pct, opts)
    if (v <= 0 || v >= maxR) continue
    if (seen[v]) continue
    seen[v] = true
    out.push({ label: pct + '%', v: v })
  }
  return out
}
