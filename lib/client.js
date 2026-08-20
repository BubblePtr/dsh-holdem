/* dsh-holdem client bundle — generated from src/client.cjs */
window.__ModuleLoader__.load({
  id: "dsh-holdem",
  factory: (require) => {
    var module = { exports: {} };
    var exports = module.exports;
// src/client.cjs
var React = require("react");
var h = React.createElement;
var API = "/dsh-holdem";
function rpc(method, args) {
  const isGet = method === "get-state";
  return fetch(API + "/" + method, {
    method: isGet ? "GET" : "POST",
    headers: isGet ? void 0 : { "content-type": "application/json" },
    body: isGet ? void 0 : JSON.stringify(args || {})
  }).then(function(res) {
    return res.json().then(function(body) {
      if (!res.ok) throw new Error(body && body.error || "holdem " + res.status);
      return body;
    });
  });
}
var CSS = `
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
`;
var SUIT = { s: "\u2660", h: "\u2665", d: "\u2666", c: "\u2663" };
var RANK = { 14: "A", 13: "K", 12: "Q", 11: "J", 10: "10", 9: "9", 8: "8", 7: "7", 6: "6", 5: "5", 4: "4", 3: "3", 2: "2" };
var STREET = { idle: "\u5927\u5385", preflop: "\u7FFB\u524D", flop: "\u7FFB\u724C", turn: "\u8F6C\u724C", river: "\u6CB3\u724C", showdown: "\u644A\u724C", "hand-over": "\u672C\u624B\u7ED3\u675F" };
function fmt(n) {
  n = Math.floor(Number(n) || 0);
  const abs = Math.abs(n);
  if (abs >= 1e6) {
    const v = n / 1e6;
    const s = abs >= 1e7 ? String(Math.round(v)) : String(Math.round(v * 100) / 100);
    return s + "M";
  }
  if (abs >= 1e3) {
    const v = n / 1e3;
    const s = abs >= 1e4 ? String(Math.round(v)) : String(Math.round(v * 100) / 100);
    return s + "K";
  }
  return String(n);
}
function clamp(n, a, b) {
  return Math.max(a, Math.min(b, n));
}
var TABLE_ASPECT = 2.15;
function seatPos(seat) {
  const rx = 50 / TABLE_ASPECT;
  if (seat === 0) return { left: "50%", top: "100%", transform: "translate(-50%, -50%)" };
  if (seat === 3) return { left: "50%", top: "0%", transform: "translate(-50%, -50%)" };
  const spec = {
    1: { cx: 100 - rx, ang: 38 },
    2: { cx: 100 - rx, ang: -38 },
    4: { cx: rx, ang: 218 },
    5: { cx: rx, ang: 142 }
  }[seat];
  const rad = spec.ang * Math.PI / 180;
  return {
    left: spec.cx + rx * Math.cos(rad) + "%",
    top: 50 + 50 * Math.sin(rad) + "%",
    transform: "translate(-50%, -50%)"
  };
}
function seatIsTop(seat) {
  return seat === 2 || seat === 3 || seat === 4;
}
function Timeline(props) {
  const items = props.items || [];
  const ref = React.useRef(null);
  React.useEffect(function() {
    const el = ref.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [items.length]);
  const nodes = [];
  let lastHand = null;
  for (let i = 0; i < items.length; i++) {
    const ev = items[i];
    if (ev.handNo && ev.handNo !== lastHand) {
      lastHand = ev.handNo;
      nodes.push(h("div", { key: "h" + ev.id, className: "hk-tl-hand" }, "\u7B2C " + ev.handNo + " \u624B"));
    }
    if (ev.kind === "street") {
      nodes.push(h("div", { key: ev.id, className: "hk-tl-street" }, ev.action || ev.street));
      continue;
    }
    nodes.push(h(
      "div",
      { key: ev.id, className: "hk-tl-row" },
      h("div", { className: "hk-tl-ico" }, ev.emoji || "\u2022"),
      h(
        "div",
        { className: "hk-tl-main" },
        h("div", { className: "hk-tl-name" }, ev.name || "\u724C\u684C"),
        ev.action ? h("div", { className: "hk-tl-act" }, ev.action) : null,
        ev.talk ? h("div", { className: "hk-tl-talk" }, ev.talk) : null
      )
    ));
  }
  return h(
    "aside",
    { className: "hk-rail" },
    h("div", { className: "hk-rail-h" }, "\u724C\u5C40\u8BB0\u5F55"),
    h("div", { className: "hk-rail-sub" }, "\u884C\u52A8\u4E0E\u684C\u8FB9\u95F2\u8BDD"),
    h(
      "div",
      { className: "hk-tl", ref },
      nodes.length ? nodes : h("div", { className: "hk-tl-empty" }, "\u5F00\u59CB\u4E00\u624B\u724C\u540E\uFF0C\u884C\u52A8\u548C\u95F2\u8BDD\u4F1A\u51FA\u73B0\u5728\u8FD9\u91CC\u3002")
    )
  );
}
function OaiMark(size, color) {
  const petals = [];
  for (let i = 0; i < 6; i++) {
    petals.push(h("ellipse", {
      key: i,
      cx: 12,
      cy: 6.15,
      rx: 3.05,
      ry: 5.15,
      fill: color || "#9a9aa1",
      transform: "rotate(" + i * 60 + " 12 12)"
    }));
  }
  return h("svg", { width: size, height: size, viewBox: "0 0 24 24", "aria-hidden": "true" }, petals);
}
function Verified() {
  return h(
    "svg",
    { className: "hk-v", viewBox: "0 0 16 16", "aria-hidden": "true" },
    h("circle", { cx: 8, cy: 8, r: 7, fill: "#3b82f6" }),
    h("path", { d: "M4.8 8.15l2.05 2.05 4.35-4.4", stroke: "#fff", strokeWidth: 1.6, fill: "none", strokeLinecap: "round", strokeLinejoin: "round" })
  );
}
function cardView(card, small) {
  const cls = "hk-card" + (small ? " sm" : "");
  if (!card) return h("div", { className: cls + " empty" });
  if (card === "back") {
    return h("div", { className: cls + " back" }, OaiMark(small ? 14 : 18, "#9a9aa1"));
  }
  const red = card.s === "h" || card.s === "d";
  return h(
    "div",
    { className: cls + (red ? " red" : "") },
    h("span", {}, RANK[card.r] || card.r),
    h("span", { style: { fontSize: small ? 12 : 16, alignSelf: "flex-end" } }, SUIT[card.s] || "")
  );
}
function seatView(p, thinkLabel) {
  const cards = [];
  if (p.hasCards) {
    if (p.folded) {
      cards.push(cardView("back", true), cardView("back", true));
    } else if (p.cards && p.cards.length === 2) {
      cards.push(cardView(p.cards[0], p.seat !== 0), cardView(p.cards[1], p.seat !== 0));
    } else {
      cards.push(cardView("back", true), cardView("back", true));
    }
  }
  const thinking = !!(p.isToAct && p.kind === "ai");
  const statusText = thinking ? thinkLabel || "\u601D\u8003\u4E2D" : p.talk || "";
  const top = seatIsTop(p.seat);
  const rim = p.seat === 0 || p.seat === 3;
  const bet = h("div", { className: "hk-betcap" + (p.bet > 0 ? "" : " off") }, p.bet > 0 ? "\u4E0B\u6CE8 " + fmt(p.bet) : "\xB7");
  const cardRow = h("div", { className: "hk-cards" }, cards);
  const pill = h(
    "div",
    { className: "hk-pill" },
    h("div", { className: "hk-avatar" }, p.emoji || "\u2022"),
    h(
      "div",
      { className: "hk-id" },
      h(
        "div",
        { className: "hk-name" },
        h("span", {}, p.id === "hero" ? "you" : p.name || p.id),
        p.isDealer ? h("span", { className: "hk-d", title: "\u5E84\u5BB6" }, "\u5E84") : Verified()
      ),
      h("div", { className: "hk-stack" }, fmt(p.stack) + " \u7B79\u7801")
    )
  );
  const status = h("div", { className: "hk-status" + (statusText ? thinking ? "" : " talk" : " off") }, statusText || "idle");
  return h(
    "div",
    {
      key: p.id,
      className: "hk-seat s" + p.seat + (top ? " top" : "") + (rim ? " rim" : "") + (p.isToAct ? " toact" : "") + (p.folded ? " folded" : ""),
      style: seatPos(p.seat)
    },
    rim ? h("div", { className: "hk-inward" }, bet, cardRow) : [bet, cardRow],
    pill,
    status
  );
}
function findScrollPort(el) {
  var p = el.parentElement;
  while (p && p !== document.documentElement) {
    var oy = window.getComputedStyle(p).overflowY;
    if (oy === "auto" || oy === "scroll") return p;
    p = p.parentElement;
  }
  return el.parentElement;
}
function useLockToScrollPort(root) {
  React.useLayoutEffect(function() {
    if (!root) return;
    var port = findScrollPort(root);
    function fit() {
      var h2 = port && port.clientHeight || root.parentElement && root.parentElement.clientHeight || 0;
      if (h2 > 0) {
        root.style.height = h2 + "px";
        root.style.maxHeight = h2 + "px";
      }
    }
    fit();
    var ro = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(fit);
    if (ro) {
      if (port) ro.observe(port);
      if (root.parentElement) ro.observe(root.parentElement);
    }
    function onWheel(e) {
      var tl = root.querySelector(".hk-tl");
      if (tl && (e.target === tl || tl.contains(e.target))) {
        var dy = e.deltaY;
        if (e.deltaMode === 1) dy *= 16;
        if (e.deltaMode === 2) dy *= tl.clientHeight;
        var max = Math.max(0, tl.scrollHeight - tl.clientHeight);
        tl.scrollTop = Math.min(max, Math.max(0, tl.scrollTop + dy));
      }
      e.preventDefault();
      e.stopPropagation();
    }
    root.addEventListener("wheel", onWheel, { passive: false, capture: true });
    return function() {
      if (ro) ro.disconnect();
      root.removeEventListener("wheel", onWheel, { capture: true });
    };
  }, [root]);
}
function Table(props) {
  const [rootEl, setRootEl] = React.useState(null);
  useLockToScrollPort(rootEl);
  const state = props.state;
  const busy = props.busy;
  const now = props.now || 0;
  const onStart = props.onStart;
  const onNext = props.onNext;
  const onReset = props.onReset;
  const onAct = props.onAct;
  const legal = state && state.legal || {};
  const minR = legal.minRaiseTo || 0;
  const maxR = legal.maxRaiseTo || 0;
  const [raiseTo, setRaiseTo] = React.useState(minR);
  React.useEffect(function() {
    setRaiseTo(minR);
  }, [minR, state && state.handNo, state && state.street]);
  if (!state) return h("div", { className: "hk-root", ref: setRootEl }, h("div", { className: "hk-wait", style: { padding: 24 } }, "\u8FDE\u63A5\u4E2D\u2026"));
  const acting = (state.players || []).find(function(p) {
    return p.isToAct;
  });
  const winnerText = (state.winners || []).map(function(w) {
    return w.names.join("\u3001") + " \xB7 " + w.handName + " \xB7 " + fmt(w.amount) + " \u7B79\u7801";
  }).join(" \xB7 ");
  const idle = state.status === "idle";
  const over = state.status === "hand-over";
  const myTurn = state.status === "playing" && state.toAct === 0;
  const board = state.board || [];
  const boardSlots = [0, 1, 2, 3, 4].map(function(i) {
    return board[i] || null;
  });
  const pot = state.pot || 0;
  const pcts = [25, 33, 75, 133];
  const presets = pcts.map(function(pct) {
    return { label: pct + "%", v: clamp(Math.floor((state.currentBet || 0) + pot * (pct / 100)), minR || 0, maxR || 0) };
  });
  const chosen = clamp(raiseTo || minR, minR || 0, maxR || 0);
  let thinkLabel = "";
  if (acting && acting.kind === "ai" && state.thinkEndsAt) {
    const left = Math.max(0, Math.ceil((state.thinkEndsAt - now) / 1e3));
    thinkLabel = "\u601D\u8003\u4E2D \xB7 " + left + "\u79D2";
  }
  return h(
    "div",
    { className: "hk-root", ref: setRootEl },
    h(
      "div",
      { className: "hk-body" },
      h(
        "div",
        { className: "hk-main" },
        h(
          "div",
          { className: "hk-top" },
          h("div", { className: "hk-title" }, "No-Limit Inference"),
          h(
            "div",
            { className: "hk-meta" },
            idle ? "\u516D\u4EBA\u684C \xB7 \u771F\u4EBA\u667A\u80FD\u4F53" : "\u7B2C " + state.handNo + " \u624B \xB7 " + (STREET[state.street] || state.street) + (state.agentModel ? " \xB7 " + state.agentModel : "")
          ),
          idle ? h("button", { className: "hk-chipbtn go", disabled: busy, onClick: onStart }, "Start") : null,
          h("button", { className: "hk-chipbtn", onClick: onReset }, "Reset")
        ),
        h(
          "div",
          { className: "hk-stage" },
          h(
            "div",
            { className: "hk-play" },
            h(
              "div",
              { className: "hk-table" },
              h(
                "div",
                { className: "hk-center" },
                idle ? null : h("div", { className: "hk-pot" }, "\u5E95\u6C60 " + fmt(state.pot || state.lastPot || 0) + " \u7B79\u7801"),
                h(
                  "div",
                  { className: "hk-board" },
                  idle ? null : boardSlots.map(function(c, i) {
                    return h("div", { key: i }, cardView(c || "back", false));
                  })
                ),
                idle ? h("div", { className: "hk-banner" }, "\u4E94\u4F4D\u667A\u80FD\u4F53\u5165\u5EA7\u3002\u6BCF\u4EBA\u53EA\u80FD\u770B\u89C1\u81EA\u5DF1\u7684\u5E95\u724C\u3002") : null,
                over && winnerText ? h("div", { className: "hk-banner" }, winnerText) : null
              ),
              (state.players || []).map(function(p) {
                return seatView(p, thinkLabel);
              })
            ),
            idle ? null : h(
              "div",
              { className: "hk-dock" },
              over ? h(
                "div",
                { className: "hk-actions" },
                h("button", { className: "hk-btn hk-go", disabled: busy, onClick: onNext }, "\u4E0B\u4E00\u624B")
              ) : myTurn ? [
                legal.raise ? h(
                  "div",
                  { key: "panel", className: "hk-panel" },
                  presets.map(function(p) {
                    return h("button", {
                      key: p.label,
                      className: "hk-pre" + (chosen === p.v ? " on" : ""),
                      onClick: function() {
                        setRaiseTo(p.v);
                      }
                    }, p.label);
                  }),
                  h("input", {
                    className: "hk-slider",
                    type: "range",
                    min: minR,
                    max: Math.max(minR, maxR),
                    value: chosen,
                    onChange: function(e) {
                      setRaiseTo(Number(e.target.value));
                    }
                  }),
                  h("div", { className: "hk-amt" }, fmt(chosen) + " \u7B79\u7801")
                ) : null,
                h(
                  "div",
                  { key: "act", className: "hk-actions" },
                  h("button", { className: "hk-btn", disabled: busy || !legal.fold, onClick: function() {
                    onAct({ type: "fold" });
                  } }, "Fold"),
                  legal.check ? h("button", { className: "hk-btn", disabled: busy, onClick: function() {
                    onAct({ type: "check" });
                  } }, "Check") : h("button", { className: "hk-btn", disabled: busy || !legal.call, onClick: function() {
                    onAct({ type: "call" });
                  } }, "Call " + fmt(legal.callAmount || 0)),
                  legal.raise ? h("button", {
                    className: "hk-btn hk-raise",
                    disabled: busy,
                    onClick: function() {
                      onAct({ type: "raise", amount: chosen });
                    }
                  }, (chosen >= maxR ? "All-in " : "Bet ") + fmt(chosen)) : null
                )
              ] : h("div", { className: "hk-wait" }, acting ? (acting.name || acting.id) + " \u6B63\u5728\u601D\u8003\u2026" : "\u53D1\u724C\u4E2D\u2026")
            )
          )
        )
      ),
      h(Timeline, { items: state.timeline || [] })
    )
  );
}
function PokerView() {
  const [state, setState] = React.useState(null);
  const [err, setErr] = React.useState("");
  const [busy, setBusy] = React.useState(false);
  const [now, setNow] = React.useState(Date.now());
  React.useEffect(function() {
    let alive = true;
    const load = function() {
      rpc("get-state").then(function(next) {
        if (alive) {
          setState(next);
          setNow(Date.now());
          setErr("");
        }
      }).catch(function(e) {
        if (alive) setErr(String(e && e.message || e));
      });
    };
    load();
    const timer = setInterval(load, 280);
    return function() {
      alive = false;
      clearInterval(timer);
    };
  }, []);
  const call = function(method, args) {
    setBusy(true);
    return rpc(method, args || {}).then(function(next) {
      setState(next);
      setNow(Date.now());
      setErr("");
      return next;
    }).catch(function(e) {
      setErr(String(e && e.message || e));
    }).then(function(v) {
      setBusy(false);
      return v;
    });
  };
  return h(
    "div",
    { style: { flex: 1, minHeight: 0, height: "100%", display: "flex", flexDirection: "column", overflow: "hidden" } },
    err ? h("div", { className: "hk-err" }, err) : null,
    h(Table, {
      state,
      busy,
      now,
      onStart: function() {
        call("start", {});
      },
      onNext: function() {
        call("next-hand", {});
      },
      onReset: function() {
        call("reset", {});
      },
      onAct: function(a) {
        call("act", a);
      }
    })
  );
}
function apply(ctx) {
  ctx.effect(function() {
    const style = document.createElement("style");
    style.dataset.plugin = "dsh-holdem";
    style.textContent = CSS;
    document.head.appendChild(style);
    return function() {
      style.remove();
    };
  });
  ctx.slots.inject("conversation.view", function() {
    return ctx.slots.register(
      { name: "conversation.view", id: "holdem", order: 20, label: "\u5FB7\u5DDE\u6251\u514B" },
      PokerView
    );
  });
}
module.exports = {
  name: "dsh-holdem",
  inject: ["slots"],
  apply
};
    return module.exports;
  },
});
