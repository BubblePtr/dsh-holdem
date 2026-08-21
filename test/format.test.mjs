import { test } from 'node:test'
import assert from 'node:assert/strict'
import { fmt, formatWinnerLines } from '../src/format.js'

test('fmt uses K and M for token stacks', () => {
  assert.equal(fmt(580000), '580K')
  assert.equal(fmt(3770000), '3.77M')
  assert.equal(fmt(4350000), '4.35M')
  assert.equal(fmt(20000), '20K')
  assert.equal(fmt(900), '900')
})

test('empty winners yield no banner lines', () => {
  assert.deepEqual(formatWinnerLines([]), [])
  assert.deepEqual(formatWinnerLines(null), [])
})

test('uncontested pot is a single take-down line', () => {
  assert.deepEqual(
    formatWinnerLines([{ names: ['马斯克'], amount: 4350000, handName: '无人跟注' }]),
    ['马斯克 收走底池 4.35M 筹码'],
  )
})

test('single showdown pot names the winner, hand and amount', () => {
  assert.deepEqual(
    formatWinnerLines([{ names: ['马斯克'], amount: 4350000, handName: '一对' }]),
    ['马斯克 以一对赢下 4.35M 筹码'],
  )
})

test('same player scooping main and side pots collapses into one headline', () => {
  assert.deepEqual(
    formatWinnerLines([
      { names: ['马斯克'], amount: 580000, handName: '一对' },
      { names: ['马斯克'], amount: 3770000, handName: '一对' },
    ]),
    ['马斯克 以一对赢下 4.35M 筹码', '主池 580K · 边池 3.77M'],
  )
})

test('split pot uses 平分', () => {
  assert.deepEqual(
    formatWinnerLines([{ names: ['马斯克', '达里奥'], amount: 400000, handName: '同花' }]),
    ['马斯克、达里奥 以同花平分 400K 筹码'],
  )
})

test('different winners get one labeled line per pot', () => {
  assert.deepEqual(
    formatWinnerLines([
      { names: ['马斯克'], amount: 580000, handName: '一对' },
      { names: ['达里奥'], amount: 3770000, handName: '两对' },
    ]),
    [
      '主池 580K · 马斯克 以一对赢下',
      '边池 3.77M · 达里奥 以两对赢下',
    ],
  )
})

test('three pots number the later side pots', () => {
  assert.deepEqual(
    formatWinnerLines([
      { names: ['you'], amount: 150000, handName: '三条' },
      { names: ['马斯克'], amount: 200000, handName: '葫芦' },
      { names: ['马斯克'], amount: 250000, handName: '葫芦' },
    ]),
    [
      '主池 150K · you 以三条赢下',
      '边池1 200K · 马斯克 以葫芦赢下',
      '边池2 250K · 马斯克 以葫芦赢下',
    ],
  )
})
