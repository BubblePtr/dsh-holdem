# 议题跟踪：GitHub

本仓库的议题与规格（spec）都放在 GitHub Issues，一律用 `gh` CLI 操作。

## 约定

- **创建议题**：`gh issue create --title "..." --body "..."`，多行正文用 heredoc。
- **读取议题**：`gh issue view <number> --comments`，用 `jq` 过滤评论并同时取标签。
- **列出议题**：`gh issue list --state open --json number,title,body,labels,comments --jq '[.[] | {number, title, body, labels: [.labels[].name], comments: [.comments[].body]}]'`，按需加 `--label` 和 `--state` 过滤。
- **评论**：`gh issue comment <number> --body "..."`
- **加/减标签**：`gh issue edit <number> --add-label "..."` / `--remove-label "..."`
- **关闭**：`gh issue close <number> --comment "..."`

仓库从 `git remote -v` 推断——在 clone 内运行时 `gh` 会自动处理。

## PR 作为 triage 入口

**PRs as a request surface: no.**（若本仓库把外部 PR 当作功能请求处理，改为 `yes`；`/triage` 会读取此开关。）

设为 `yes` 时，PR 走与议题相同的标签与状态，使用 `gh pr` 对应命令：

- **读取 PR**：`gh pr view <number> --comments`，diff 用 `gh pr diff <number>`。
- **列出待 triage 的外部 PR**：`gh pr list --state open --json number,title,body,labels,author,authorAssociation,comments`，只保留 `authorAssociation` 为 `CONTRIBUTOR`、`FIRST_TIME_CONTRIBUTOR` 或 `NONE` 的（丢弃 `OWNER`/`MEMBER`/`COLLABORATOR`）。
- **评论 / 标签 / 关闭**：`gh pr comment`、`gh pr edit --add-label`/`--remove-label`、`gh pr close`。

GitHub 的议题和 PR 共用编号空间，裸写的 `#42` 可能是任一种——先 `gh pr view 42`，失败再回退 `gh issue view 42`。

## 当某个 skill 说「发布到议题跟踪」

创建一个 GitHub issue。

## 当某个 skill 说「取相关工单」

运行 `gh issue view <number> --comments`。

## Wayfinding 操作

供 `/wayfinder` 使用。**map** 是一个议题，**child** 议题作为工单。

- **Map**：带 `wayfinder:map` 标签的单个议题，正文承载 Notes / Decisions-so-far / Fog。`gh issue create --label wayfinder:map`。
- **子工单**：通过 GitHub sub-issue（`gh api` 调 sub-issues 端点）挂到 map 下的议题。sub-issues 不可用时，把子项加进 map 正文的任务列表，并在子议题正文顶部写 `Part of #<map>`。标签：`wayfinder:<type>`（`research`/`prototype`/`grilling`/`task`）。被认领后工单 assign 给该开发者。
- **阻塞**：用 GitHub **原生议题依赖**（UI 可见的规范表示）。加边：`gh api --method POST repos/<owner>/<repo>/issues/<child>/dependencies/blocked_by -F issue_id=<blocker-db-id>`，其中 `<blocker-db-id>` 是阻塞者的**数据库 id**（`gh api repos/<owner>/<repo>/issues/<n> --jq .id`，不是 `#number` 或 `node_id`）。GitHub 通过 `issue_dependencies_summary.blocked_by` 报告未关闭的阻塞者（活的闸门）。依赖不可用时，回退为子议题正文顶部的 `Blocked by: #<n>, #<n>` 行。所有阻塞者关闭即解除阻塞。
- **前沿查询**：列出 map 的开放子项（`gh issue list --state open`，限定在 map 的 sub-issues / 任务列表内），丢弃有开放阻塞者（`issue_dependencies_summary.blocked_by > 0`，或 `Blocked by` 行里有开放议题）或已有 assignee 的；按 map 顺序取第一个。
- **认领**：`gh issue edit <n> --add-assignee @me`——会话的第一次写操作。
- **解决**：`gh issue comment <n> --body "<answer>"`，然后 `gh issue close <n>`，再把上下文指针（gist + 链接）追加到 map 的 Decisions-so-far。
