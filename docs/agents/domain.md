# 领域文档

工程类 skill 在探索代码库时应如何消费本仓库的领域文档。

## 探索前先读

- 仓库根目录的 **`CONTEXT.md`**；或
- 根目录存在 **`CONTEXT-MAP.md`** 时读它——它指向每个上下文各自的 `CONTEXT.md`，读与主题相关的那些。
- **`docs/adr/`**——读与将要动的区域相关的 ADR。多上下文仓库还要看 `src/<context>/docs/adr/` 的局部决策。

这些文件不存在时**静默继续**：不要提示缺失，也不要主动建议创建。`/domain-modeling`（经 `/grill-with-docs` 与 `/improve-codebase-architecture` 到达）会在术语或决策真正落定时惰性创建它们。

## 目录结构

单上下文仓库（本仓库即此布局）：

```
/
├── CONTEXT.md
├── docs/adr/
│   ├── 0001-event-sourced-orders.md
│   └── 0002-postgres-for-write-model.md
└── src/
```

## 使用词汇表的词汇

输出中出现领域概念时（议题标题、重构提案、假设、测试名），用 `CONTEXT.md` 定义的术语，不要漂移到词汇表明确避开的同义词。

需要的概念不在词汇表里时，这本身是信号——要么你在发明项目不用的语言（重新考虑），要么存在真实缺口（记下来交给 `/domain-modeling`）。

## 标记 ADR 冲突

输出与既有 ADR 矛盾时，显式指出而不是悄悄推翻：

> _与 ADR-0007（event-sourced orders）矛盾——但值得重开，因为……_
