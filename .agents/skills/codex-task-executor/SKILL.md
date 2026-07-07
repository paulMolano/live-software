---
name: codex-task-executor
description: Use this skill when Codex executes a GitHub issue.
---

# Codex Task Executor

Use this skill to execute a GitHub issue only when the issue is scoped and ready.

Workflow:

1. Read issue.
2. Read `AGENTS.md`, `PLANS.md` and `docs/github/project-fields.md`.
3. Read relevant docs.
4. Read GitHub Project fields when available.
5. Plan.
6. Implement small diff.
7. Run checks.
8. Summarize.
9. Declare risks.
10. Suggest next issue.

Project field rules:

- If `Work type` is `Epic`, do not implement it directly. Propose child tasks.
- If `Size` is `XL`, do not implement it directly. Propose a split.
- If `Codex ready` is not `Ready`, stop and ask for refinement or propose a clearer issue.
- If `Guide update` is `Required`, update internal docs, update the future guide or explain why the docs update was deferred.

PR output must include:

- summary
- files changed
- commands run
- validation result
- guide/docs update decision
- risks
- recommended next issue.
