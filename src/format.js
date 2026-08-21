// Token amount and showdown-result copy. Pure: no DOM, no table state.

export function fmt(n) {
  n = Math.floor(Number(n) || 0)
  const abs = Math.abs(n)
  if (abs >= 1000000) {
    const v = n / 1000000
    const s = abs >= 10000000 ? String(Math.round(v)) : String(Math.round(v * 100) / 100)
    return s + 'M'
  }
  if (abs >= 1000) {
    const v = n / 1000
    const s = abs >= 10000 ? String(Math.round(v)) : String(Math.round(v * 100) / 100)
    return s + 'K'
  }
  return String(n)
}

function namesOf(w) {
  return (w.names || []).join('、')
}

function potLabel(i, n) {
  if (i === 0) return '主池'
  if (n === 2) return '边池'
  return '边池' + i
}

function verbOf(w) {
  return (w.names && w.names.length > 1) ? '平分' : '赢下'
}

function sameResult(a, b) {
  return namesOf(a) === namesOf(b) && a.handName === b.handName
}

// Turn per-pot winner records into banner lines. Side pots are labeled so
// a scoop no longer reads as the same name pasted twice with mid-dots.
export function formatWinnerLines(winners) {
  if (!winners || !winners.length) return []

  if (winners.length === 1 && winners[0].handName === '无人跟注') {
    return [namesOf(winners[0]) + ' 收走底池 ' + fmt(winners[0].amount) + ' 筹码']
  }

  const allSame = winners.every(function (w) { return sameResult(w, winners[0]) })
  if (allSame) {
    const w = winners[0]
    let total = 0
    for (let i = 0; i < winners.length; i++) total += winners[i].amount || 0
    const headline = namesOf(w) + ' 以' + w.handName + verbOf(w) + ' ' + fmt(total) + ' 筹码'
    if (winners.length === 1) return [headline]
    const pots = winners.map(function (x, i) {
      return potLabel(i, winners.length) + ' ' + fmt(x.amount)
    }).join(' · ')
    return [headline, pots]
  }

  return winners.map(function (w, i) {
    return potLabel(i, winners.length) + ' ' + fmt(w.amount) + ' · ' + namesOf(w) + ' 以' + w.handName + verbOf(w)
  })
}
