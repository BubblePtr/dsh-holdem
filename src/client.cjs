const React = require('react')
const h = React.createElement

const API = '/dsh-holdem'

function rpc(method, args) {
  const isGet = method === 'get-state'
  return fetch(API + '/' + method, {
    method: isGet ? 'GET' : 'POST',
    headers: isGet ? undefined : { 'content-type': 'application/json' },
    body: isGet ? undefined : JSON.stringify(args || {}),
  }).then(function (res) {
    return res.json().then(function (body) {
      if (!res.ok) throw new Error((body && body.error) || ('holdem ' + res.status))
      return body
    })
  })
}

const CSS = `
.hk-root{position:relative;flex:1;width:100%;min-height:0;height:100%;display:flex;flex-direction:column;background:#fff;color:#111;overflow:hidden;user-select:none;font-family:ui-sans-serif,system-ui,-apple-system,"SF Pro Text",sans-serif}
.hk-main{flex:1;min-width:0;min-height:0;display:flex;flex-direction:column;overflow:hidden}
.hk-top{flex:none;display:flex;align-items:center;gap:10px;padding:10px 16px 0}
.hk-title{font-size:13px;color:#111;font-weight:650}
.hk-meta{flex:1;min-width:0;font-size:12px;color:#8a8a8e;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.hk-chipbtn{cursor:pointer;border:1px solid #e7e7ea;background:#fff;color:#444;border-radius:999px;padding:5px 11px;font-size:12px}
.hk-chipbtn:hover{background:#fafafa}
.hk-chipbtn.go{background:#111;border-color:#111;color:#fff;padding:5px 14px;font-weight:650}
.hk-chipbtn.go:hover{background:#222}
.hk-chipbtn:disabled{opacity:.35;cursor:default}
.hk-body{flex:1;min-height:0;display:flex;overflow:hidden}
.hk-stage{flex:1;min-height:0;display:flex;align-items:center;justify-content:center;padding:72px 112px 40px;container-type:size;overflow:visible}
.hk-play{display:flex;flex-direction:column;align-items:center;justify-content:center;width:min(1080px,100%,calc(100cqh * 2.15));max-width:100%;height:100%;min-height:0;padding:0;overflow:visible}
.hk-rail{flex:none;width:280px;min-width:240px;height:100%;border-left:1px solid #ececee;background:#fafafa;display:flex;flex-direction:column;min-height:0;overflow:hidden}
.hk-rail-h{flex:none;padding:14px 16px 2px;font-size:12px;font-weight:650;color:#111}
.hk-rail-sub{flex:none;padding:0 16px 10px;font-size:11px;color:#8a8a8e}
.hk-tl{flex:1;min-height:0;overflow-y:auto;overflow-x:hidden;overscroll-behavior:contain;padding:0 10px 18px}
[data-slot="conversation.session"]:has(.hk-root){flex:1 1 0!important;min-height:0!important;overflow:hidden!important;display:flex!important;flex-direction:column!important}
[data-slot="conversation.session"]:has(.hk-root)>*{flex:1 1 0!important;min-height:0!important;overflow:hidden!important;max-height:100%!important}
.hk-tl-hand{font-size:10px;letter-spacing:.06em;color:#9a9aa1;padding:12px 6px 4px}
.hk-tl-street{display:flex;align-items:center;gap:8px;margin:8px 4px;font-size:11px;color:#8a8a8e}
.hk-tl-street:before,.hk-tl-street:after{content:"";flex:1;height:1px;background:#e7e7ea}
.hk-tl-row{display:flex;gap:8px;padding:7px 6px;border-radius:10px}
.hk-tl-ico{width:20px;flex:none;text-align:center;font-size:13px;line-height:18px}
.hk-tl-main{min-width:0}
.hk-tl-name{font-size:12px;font-weight:650;color:#111}
.hk-tl-act{font-size:11px;color:#6f6f73;margin-top:1px}
.hk-tl-talk{margin-top:5px;font-size:12px;line-height:1.35;color:#111;background:#fff;border:1px solid #ececee;border-radius:10px;padding:6px 8px}
.hk-tl-empty{padding:28px 10px;font-size:12px;color:#9a9aa1;line-height:1.5}
.hk-table{position:relative;width:100%;height:auto;max-height:min(520px,calc(100cqh - 180px));aspect-ratio:2.15 / 1;background:#fafafa;border:1px solid #e7e7e7;border-radius:9999px;margin-bottom:52px}
.hk-center{position:absolute;left:50%;top:52%;transform:translate(-50%,-50%);display:flex;flex-direction:column;align-items:center;gap:10px}
.hk-pot{font-size:12px;color:#5b5b60;font-weight:600;background:#fff;border:1px solid #e7e7ea;border-radius:999px;padding:5px 10px}
.hk-board{display:flex;gap:8px;min-height:72px;align-items:center;justify-content:center}
.hk-banner{max-width:360px;text-align:center;font-size:12px;line-height:1.45;color:#666;background:#fff;border:1px solid #ececee;border-radius:12px;padding:8px 12px}
.hk-seat{position:absolute;width:168px;display:flex;flex-direction:column;align-items:center;gap:6px;z-index:2}
.hk-seat.top{flex-direction:column-reverse}
.hk-seat.rim{gap:0}
.hk-seat.folded{opacity:.4}
.hk-inward{position:absolute;left:50%;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:6px;pointer-events:none}
.hk-seat.s0 .hk-inward{bottom:calc(100% + 6px)}
.hk-seat.s3 .hk-inward{top:calc(100% + 6px)}
.hk-seat.s3 .hk-status{position:absolute;left:50%;bottom:calc(100% + 6px);transform:translateX(-50%)}
.hk-seat.s0 .hk-status{position:absolute;left:50%;top:calc(100% + 6px);transform:translateX(-50%)}
.hk-cards{display:flex;gap:5px;min-height:40px}
.hk-card{width:42px;height:58px;border-radius:8px;background:#fff;color:#171717;display:flex;flex-direction:column;justify-content:space-between;padding:4px 5px 5px;font-weight:750;border:1px solid #e8e8eb;font-size:13px;line-height:1.05;box-shadow:0 1px 2px rgba(0,0,0,.04)}
.hk-card.sm{width:30px;height:42px;font-size:11px;padding:2px 3px;border-radius:6px}
.hk-seat.s0 .hk-card{width:44px;height:62px}
.hk-card.red{color:#e11d48}
.hk-card.back{background:#fff;display:flex;align-items:center;justify-content:center;padding:0}
.hk-card.empty{background:#f3f3f4;border:1px dashed #ddd;box-shadow:none;color:transparent}
.hk-betcap{min-height:18px;font-size:11px;font-weight:650;color:#111;background:#fff;border:1px solid #e7e7ea;border-radius:999px;padding:3px 8px}
.hk-betcap.off{background:transparent;border-color:transparent;color:transparent}
.hk-pill{display:flex;align-items:center;gap:8px;min-width:148px;background:#fff;border:1px solid #e7e7ea;border-radius:999px;padding:5px 10px 5px 5px}
.hk-seat.toact .hk-pill{border-color:#3b82f6;box-shadow:0 0 0 2px rgba(59,130,246,.18)}
.hk-avatar{width:34px;height:34px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:16px;background:#f4f4f5;flex:none}
.hk-id{min-width:0;display:flex;flex-direction:column;line-height:1.15}
.hk-name{font-size:12px;font-weight:650;color:#111;display:flex;align-items:center;gap:4px;max-width:110px}
.hk-name span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.hk-d{flex:none;width:16px;height:16px;border-radius:50%;background:#111;color:#fff;font-size:9px;font-weight:750;display:flex;align-items:center;justify-content:center;letter-spacing:0}
.hk-stack{font-size:11px;color:#8a8a8e}
.hk-status{max-width:168px;font-size:11px;font-weight:600;color:#3b82f6;background:#eef4ff;border-radius:999px;padding:3px 8px;line-height:1.25;text-align:center}
.hk-status.talk{color:#444;background:#f4f4f5}
.hk-status.off{visibility:hidden}
.hk-dock{flex:none;width:100%;padding:0 8px 4px;display:flex;flex-direction:column;align-items:center;gap:10px;position:relative;z-index:6}
.hk-panel{display:flex;align-items:center;gap:10px;background:#f4f4f5;border-radius:999px;padding:7px 10px 7px 8px}
.hk-pre{cursor:pointer;border:0;background:transparent;color:#444;border-radius:999px;padding:6px 10px;font-size:12px;font-weight:650}
.hk-pre.on{background:#e7e7ea;color:#111}
.hk-slider{width:168px;accent-color:#3b82f6}
.hk-amt{font-size:12px;color:#6f6f73;font-weight:650;min-width:92px;text-align:right}
.hk-actions{display:flex;align-items:center;justify-content:center;gap:10px}
.hk-btn{cursor:pointer;border:1px solid #e5e5e7;background:#fff;color:#111;border-radius:14px;padding:12px 18px;font-size:15px;font-weight:700;min-width:132px}
.hk-btn:disabled{opacity:.35;cursor:default}
.hk-raise,.hk-go{background:#111;border-color:#111;color:#fff}
.hk-wait{font-size:13px;color:#8a8a8e;padding:10px 0}
.hk-err{color:#e11d48;font-size:12px;padding:0 16px 8px}
.hk-v{width:12px;height:12px;flex:none}
`

const SUIT = { s: '♠', h: '♥', d: '♦', c: '♣' }
const RANK = { 14: 'A', 13: 'K', 12: 'Q', 11: 'J', 10: '10', 9: '9', 8: '8', 7: '7', 6: '6', 5: '5', 4: '4', 3: '3', 2: '2' }
const STREET = { idle: '大厅', preflop: '翻前', flop: '翻牌', turn: '转牌', river: '河牌', showdown: '摊牌', 'hand-over': '本手结束' }

function fmt(n) {
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

function clamp(n, a, b) {
  return Math.max(a, Math.min(b, n))
}

const TABLE_ASPECT = 2.15

function seatPos(seat) {
  const rx = 50 / TABLE_ASPECT
  if (seat === 0) return { left: '50%', top: '100%', transform: 'translate(-50%, -50%)' }
  if (seat === 3) return { left: '50%', top: '0%', transform: 'translate(-50%, -50%)' }
  const spec = {
    1: { cx: 100 - rx, ang: 38 },
    2: { cx: 100 - rx, ang: -38 },
    4: { cx: rx, ang: 218 },
    5: { cx: rx, ang: 142 },
  }[seat]
  const rad = (spec.ang * Math.PI) / 180
  return {
    left: (spec.cx + rx * Math.cos(rad)) + '%',
    top: (50 + 50 * Math.sin(rad)) + '%',
    transform: 'translate(-50%, -50%)',
  }
}

function seatIsTop(seat) {
  return seat === 2 || seat === 3 || seat === 4
}

function Timeline(props) {
  const items = props.items || []
  const ref = React.useRef(null)
  React.useEffect(function () {
    const el = ref.current
    if (el) el.scrollTop = el.scrollHeight
  }, [items.length])

  const nodes = []
  let lastHand = null
  for (let i = 0; i < items.length; i++) {
    const ev = items[i]
    if (ev.handNo && ev.handNo !== lastHand) {
      lastHand = ev.handNo
      nodes.push(h('div', { key: 'h' + ev.id, className: 'hk-tl-hand' }, '第 ' + ev.handNo + ' 手'))
    }
    if (ev.kind === 'street') {
      nodes.push(h('div', { key: ev.id, className: 'hk-tl-street' }, ev.action || ev.street))
      continue
    }
    nodes.push(h('div', { key: ev.id, className: 'hk-tl-row' },
      h('div', { className: 'hk-tl-ico' }, ev.emoji || '•'),
      h('div', { className: 'hk-tl-main' },
        h('div', { className: 'hk-tl-name' }, ev.name || '牌桌'),
        ev.action ? h('div', { className: 'hk-tl-act' }, ev.action) : null,
        ev.talk ? h('div', { className: 'hk-tl-talk' }, ev.talk) : null,
      ),
    ))
  }

  return h('aside', { className: 'hk-rail' },
    h('div', { className: 'hk-rail-h' }, '牌局记录'),
    h('div', { className: 'hk-rail-sub' }, '行动与桌边闲话'),
    h('div', { className: 'hk-tl', ref: ref },
      nodes.length ? nodes : h('div', { className: 'hk-tl-empty' }, '开始一手牌后，行动和闲话会出现在这里。'),
    ),
  )
}

function OaiMark(size, color) {
  const petals = []
  for (let i = 0; i < 6; i++) {
    petals.push(h('ellipse', {
      key: i,
      cx: 12,
      cy: 6.15,
      rx: 3.05,
      ry: 5.15,
      fill: color || '#9a9aa1',
      transform: 'rotate(' + (i * 60) + ' 12 12)',
    }))
  }
  return h('svg', { width: size, height: size, viewBox: '0 0 24 24', 'aria-hidden': 'true' }, petals)
}

function Verified() {
  return h('svg', { className: 'hk-v', viewBox: '0 0 16 16', 'aria-hidden': 'true' },
    h('circle', { cx: 8, cy: 8, r: 7, fill: '#3b82f6' }),
    h('path', { d: 'M4.8 8.15l2.05 2.05 4.35-4.4', stroke: '#fff', strokeWidth: 1.6, fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round' }),
  )
}

function cardView(card, small) {
  const cls = 'hk-card' + (small ? ' sm' : '')
  if (!card) return h('div', { className: cls + ' empty' })
  if (card === 'back') {
    return h('div', { className: cls + ' back' }, OaiMark(small ? 14 : 18, '#9a9aa1'))
  }
  const red = card.s === 'h' || card.s === 'd'
  return h('div', { className: cls + (red ? ' red' : '') },
    h('span', {}, RANK[card.r] || card.r),
    h('span', { style: { fontSize: small ? 12 : 16, alignSelf: 'flex-end' } }, SUIT[card.s] || ''),
  )
}

function seatView(p, thinkLabel) {
  const cards = []
  if (p.hasCards) {
    if (p.folded) {
      cards.push(cardView('back', true), cardView('back', true))
    } else if (p.cards && p.cards.length === 2) {
      cards.push(cardView(p.cards[0], p.seat !== 0), cardView(p.cards[1], p.seat !== 0))
    } else {
      cards.push(cardView('back', true), cardView('back', true))
    }
  }
  const thinking = !!(p.isToAct && p.kind === 'ai')
  const statusText = thinking ? (thinkLabel || '思考中') : (p.talk || '')
  const top = seatIsTop(p.seat)
  const rim = p.seat === 0 || p.seat === 3
  const bet = h('div', { className: 'hk-betcap' + (p.bet > 0 ? '' : ' off') }, p.bet > 0 ? ('下注 ' + fmt(p.bet)) : '·')
  const cardRow = h('div', { className: 'hk-cards' }, cards)
  const pill = h('div', { className: 'hk-pill' },
    h('div', { className: 'hk-avatar' }, p.emoji || '•'),
    h('div', { className: 'hk-id' },
      h('div', { className: 'hk-name' },
        h('span', {}, p.id === 'hero' ? 'you' : (p.name || p.id)),
        p.isDealer ? h('span', { className: 'hk-d', title: '庄家' }, '庄') : Verified(),
      ),
      h('div', { className: 'hk-stack' }, fmt(p.stack) + ' 筹码'),
    ),
  )
  const status = h('div', { className: 'hk-status' + (statusText ? (thinking ? '' : ' talk') : ' off') }, statusText || 'idle')
  return h('div', {
    key: p.id,
    className: 'hk-seat s' + p.seat + (top ? ' top' : '') + (rim ? ' rim' : '') + (p.isToAct ? ' toact' : '') + (p.folded ? ' folded' : ''),
    style: seatPos(p.seat),
  },
    rim ? h('div', { className: 'hk-inward' }, bet, cardRow) : [bet, cardRow],
    pill,
    status,
  )
}

function findScrollPort(el) {
  var p = el.parentElement
  while (p && p !== document.documentElement) {
    var oy = window.getComputedStyle(p).overflowY
    if (oy === 'auto' || oy === 'scroll') return p
    p = p.parentElement
  }
  return el.parentElement
}

function useLockToScrollPort(root) {
  React.useLayoutEffect(function () {
    if (!root) return
    var port = findScrollPort(root)
    function fit() {
      var h = (port && port.clientHeight) || (root.parentElement && root.parentElement.clientHeight) || 0
      if (h > 0) {
        root.style.height = h + 'px'
        root.style.maxHeight = h + 'px'
      }
    }
    fit()
    var ro = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(fit)
    if (ro) {
      if (port) ro.observe(port)
      if (root.parentElement) ro.observe(root.parentElement)
    }
    function onWheel(e) {
      var tl = root.querySelector('.hk-tl')
      if (tl && (e.target === tl || tl.contains(e.target))) {
        var dy = e.deltaY
        if (e.deltaMode === 1) dy *= 16
        if (e.deltaMode === 2) dy *= tl.clientHeight
        var max = Math.max(0, tl.scrollHeight - tl.clientHeight)
        tl.scrollTop = Math.min(max, Math.max(0, tl.scrollTop + dy))
      }
      e.preventDefault()
      e.stopPropagation()
    }
    root.addEventListener('wheel', onWheel, { passive: false, capture: true })
    return function () {
      if (ro) ro.disconnect()
      root.removeEventListener('wheel', onWheel, { capture: true })
    }
  }, [root])
}

function Table(props) {
  const [rootEl, setRootEl] = React.useState(null)
  useLockToScrollPort(rootEl)
  const state = props.state
  const busy = props.busy
  const now = props.now || 0
  const onStart = props.onStart
  const onNext = props.onNext
  const onReset = props.onReset
  const onAct = props.onAct
  const legal = (state && state.legal) || {}
  const minR = legal.minRaiseTo || 0
  const maxR = legal.maxRaiseTo || 0
  const [raiseTo, setRaiseTo] = React.useState(minR)

  React.useEffect(function () {
    setRaiseTo(minR)
  }, [minR, state && state.handNo, state && state.street])

  if (!state) return h('div', { className: 'hk-root', ref: setRootEl }, h('div', { className: 'hk-wait', style: { padding: 24 } }, '连接中…'))

  const acting = (state.players || []).find(function (p) { return p.isToAct })
  const winnerText = (state.winners || []).map(function (w) {
    return w.names.join('、') + ' · ' + w.handName + ' · ' + fmt(w.amount) + ' 筹码'
  }).join(' · ')
  const idle = state.status === 'idle'
  const over = state.status === 'hand-over'
  const myTurn = state.status === 'playing' && state.toAct === 0
  const board = state.board || []
  const boardSlots = [0, 1, 2, 3, 4].map(function (i) { return board[i] || null })
  const pot = state.pot || 0
  const pcts = [25, 33, 75, 133]
  const presets = pcts.map(function (pct) {
    return { label: pct + '%', v: clamp(Math.floor((state.currentBet || 0) + pot * (pct / 100)), minR || 0, maxR || 0) }
  })
  const chosen = clamp(raiseTo || minR, minR || 0, maxR || 0)
  let thinkLabel = ''
  if (acting && acting.kind === 'ai' && state.thinkEndsAt) {
    const left = Math.max(0, Math.ceil((state.thinkEndsAt - now) / 1000))
    thinkLabel = '思考中 · ' + left + '秒'
  }

  return h('div', { className: 'hk-root', ref: setRootEl },
    h('div', { className: 'hk-body' },
    h('div', { className: 'hk-main' },
    h('div', { className: 'hk-top' },
      h('div', { className: 'hk-title' }, 'No-Limit Inference'),
      h('div', { className: 'hk-meta' },
        idle
          ? '六人桌 · 真人智能体'
          : ('第 ' + state.handNo + ' 手 · ' + (STREET[state.street] || state.street) + (state.agentModel ? ' · ' + state.agentModel : '')),
      ),
      idle
        ? h('button', { className: 'hk-chipbtn go', disabled: busy, onClick: onStart }, 'Start')
        : null,
      h('button', { className: 'hk-chipbtn', onClick: onReset }, 'Reset'),
    ),
    h('div', { className: 'hk-stage' },
      h('div', { className: 'hk-play' },
      h('div', { className: 'hk-table' },
        h('div', { className: 'hk-center' },
          idle ? null : h('div', { className: 'hk-pot' }, '底池 ' + fmt(state.pot || state.lastPot || 0) + ' 筹码'),
          h('div', { className: 'hk-board' },
            idle ? null : boardSlots.map(function (c, i) { return h('div', { key: i }, cardView(c || 'back', false)) }),
          ),
          idle ? h('div', { className: 'hk-banner' }, '五位智能体入座。每人只能看见自己的底牌。') : null,
          over && winnerText ? h('div', { className: 'hk-banner' }, winnerText) : null,
        ),
        (state.players || []).map(function (p) { return seatView(p, thinkLabel) }),
      ),
      idle ? null : h('div', { className: 'hk-dock' },
      over
          ? h('div', { className: 'hk-actions' },
              h('button', { className: 'hk-btn hk-go', disabled: busy, onClick: onNext }, '下一手'),
            )
          : myTurn
            ? [
                legal.raise
                  ? h('div', { key: 'panel', className: 'hk-panel' },
                      presets.map(function (p) {
                        return h('button', {
                          key: p.label,
                          className: 'hk-pre' + (chosen === p.v ? ' on' : ''),
                          onClick: function () { setRaiseTo(p.v) },
                        }, p.label)
                      }),
                      h('input', {
                        className: 'hk-slider',
                        type: 'range',
                        min: minR,
                        max: Math.max(minR, maxR),
                        value: chosen,
                        onChange: function (e) { setRaiseTo(Number(e.target.value)) },
                      }),
                      h('div', { className: 'hk-amt' }, fmt(chosen) + ' 筹码'),
                    )
                  : null,
                h('div', { key: 'act', className: 'hk-actions' },
                  h('button', { className: 'hk-btn', disabled: busy || !legal.fold, onClick: function () { onAct({ type: 'fold' }) } }, 'Fold'),
                  legal.check
                    ? h('button', { className: 'hk-btn', disabled: busy, onClick: function () { onAct({ type: 'check' }) } }, 'Check')
                    : h('button', { className: 'hk-btn', disabled: busy || !legal.call, onClick: function () { onAct({ type: 'call' }) } }, 'Call ' + fmt(legal.callAmount || 0)),
                  legal.raise
                    ? h('button', {
                        className: 'hk-btn hk-raise',
                        disabled: busy,
                        onClick: function () { onAct({ type: 'raise', amount: chosen }) },
                      }, (chosen >= maxR ? 'All-in ' : 'Bet ') + fmt(chosen))
                    : null,
                ),
              ]
            : h('div', { className: 'hk-wait' }, acting ? ((acting.name || acting.id) + ' 正在思考…') : '发牌中…'),
      ),
      ),
    ),
    ),
    h(Timeline, { items: state.timeline || [] }),
    ),
  )
}

function PokerView() {
    const [state, setState] = React.useState(null)
    const [err, setErr] = React.useState('')
    const [busy, setBusy] = React.useState(false)
    const [now, setNow] = React.useState(Date.now())

    React.useEffect(function () {
      let alive = true
      const load = function () {
        rpc('get-state').then(function (next) {
          if (alive) { setState(next); setNow(Date.now()); setErr('') }
        }).catch(function (e) {
          if (alive) setErr(String((e && e.message) || e))
        })
      }
      load()
      const timer = setInterval(load, 280)
      return function () {
        alive = false
        clearInterval(timer)
      }
    }, [])

    const call = function (method, args) {
      setBusy(true)
      return rpc(method, args || {}).then(function (next) {
        setState(next)
        setNow(Date.now())
        setErr('')
        return next
      }).catch(function (e) {
        setErr(String((e && e.message) || e))
      }).then(function (v) {
        setBusy(false)
        return v
      })
    }

    return h('div', { style: { flex: 1, minHeight: 0, height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' } },
      err ? h('div', { className: 'hk-err' }, err) : null,
      h(Table, {
        state: state,
        busy: busy,
        now: now,
        onStart: function () { call('start', {}) },
        onNext: function () { call('next-hand', {}) },
        onReset: function () { call('reset', {}) },
        onAct: function (a) { call('act', a) },
      }),
    )
}

function apply(ctx) {
  ctx.effect(function () {
    const style = document.createElement('style')
    style.dataset.plugin = 'dsh-holdem'
    style.textContent = CSS
    document.head.appendChild(style)
    return function () { style.remove() }
  })
  ctx.slots.inject('conversation.view', function () {
    return ctx.slots.register(
      { name: 'conversation.view', id: 'holdem', order: 20, label: '德州扑克' },
      PokerView,
    )
  })
}

module.exports = {
  name: 'dsh-holdem',
  inject: ['slots'],
  apply: apply,
}
