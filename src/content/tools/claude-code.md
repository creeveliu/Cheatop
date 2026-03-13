---
title: "Claude Code"
category: "CLI"
summary: "Claude Code cheatsheet，覆盖安装、命令、flags、快捷键、权限模式和 slash commands。"
officialDocs: "https://docs.anthropic.com/en/docs/claude-code/overview"
updatedAt: "2026-03-13"
tags: ["cli", "agent", "coding"]
sheet:
  title: "Claude Code CLI 中文速查表"
  dek: "面向终端高频工作流的紧凑打印版。基于官方文档整理，兼顾速查密度与可读版式。"
  pills:
    - "安装"
    - "核心命令"
    - "关键 Flags"
    - "权限模式"
    - "快捷键"
    - "Slash Commands"
  meta:
    - label: "核对日期"
      value: "2026-03-13"
    - label: "官方来源"
      value: "Anthropic 官网产品页 + Claude Code 官方文档"
    - label: "安装方式"
      value: "推荐：`curl -fsSL claude.ai/install.sh | bash`；说明：`npm` 安装已弃用"
    - label: "当前官网提到的模型"
      value: "Opus 4.6、Sonnet 4.6、Haiku 4.5"
  left:
    - title: "安装与起步"
      type: "table"
      headers: ["场景", "命令 / 说明"]
      rows:
        - ["推荐安装", "`curl -fsSL claude.ai/install.sh | bash`"]
        - ["Windows PowerShell", "`irm https://claude.ai/install.ps1 | iex`"]
        - ["启动交互模式", "`claude`"]
        - ["带初始提示进入", "`claude \"review this repo\"`"]
        - ["一次性输出", "`claude -p \"总结 git diff\"`"]
        - ["继续最近会话", "`claude --continue` / `claude -c`"]
        - ["恢复会话", "`claude --resume` 或 `claude --resume <session-id>`"]
        - ["版本 / 更新", "`claude --version` / `claude update`"]
      note: "按最新官方说明，`npm` 安装已弃用；尽可能使用 native installation。"
    - title: "核心命令"
      type: "table"
      headers: ["命令", "用途", "备注"]
      rows:
        - ["`claude`", "启动 REPL", "最常用入口"]
        - ["`claude -p`", "非交互打印模式", "适合脚本与 CI"]
        - ["`claude config`", "配置管理", "`claude config list`"]
        - ["`claude mcp`", "MCP 管理", "`claude mcp list`"]
        - ["`claude auth status`", "查看认证状态", "`--text` 纯文本输出"]
        - ["`claude remote-control`", "远程控制会话", "与网页/App 联动"]
        - ["`claude doctor`", "环境诊断", "安装/权限排障"]
    - title: "关键 Flags"
      type: "table"
      headers: ["参数", "用途"]
      rows:
        - ["`-p`, `--print`", "输出后退出"]
        - ["`--output-format text`", "纯文本输出"]
        - ["`--output-format json`", "结构化输出，适合程序消费"]
        - ["`--verbose`", "详细输出"]
        - ["`--max-turns N`", "限制代理轮数"]
        - ["`--append-system-prompt`", "附加系统提示"]
        - ["`--model`", "指定模型"]
        - ["`--session-id`", "绑定会话"]
        - ["`--print-session-id`", "打印会话 ID"]
        - ["`--add-dir <path>`", "加入额外工作目录"]
        - ["`--allowedTools`", "白名单工具"]
        - ["`--disallowedTools`", "黑名单工具"]
        - ["`--agent`, `--agents`", "子代理定义/调用"]
    - title: "权限模式与危险开关"
      type: "table"
      headers: ["项", "说明"]
      rows:
        - ["`default`", "标准授权模式"]
        - ["`acceptEdits`", "自动接受编辑，但副作用命令仍会提示"]
        - ["`plan`", "只分析规划，不改文件、不执行命令"]
        - ["`dontAsk`", "除预批准外默认拒绝工具"]
        - ["`bypassPermissions`", "跳过全部权限检查"]
        - ["`--permission-mode`", "显式指定权限模式"]
        - ["`--dangerously-skip-permissions`", "跳过所有权限提示"]
      note: "危险权限只适合隔离容器、VM、临时沙箱等安全环境。"
  right:
    - title: "内建 Slash Commands"
      type: "table"
      headers: ["命令", "作用"]
      rows:
        - ["`/help`", "帮助"]
        - ["`/clear`", "清空会话历史"]
        - ["`/compact [instructions]`", "压缩上下文，可带压缩指令"]
        - ["`/config`", "查看/修改配置"]
        - ["`/cost`", "查看 token 用量与成本"]
        - ["`/doctor`", "健康检查与排障"]
        - ["`/init`", "初始化 `CLAUDE.md`"]
        - ["`/memory`", "编辑记忆文件"]
        - ["`/model`", "切换模型"]
        - ["`/permissions`", "查看/修改权限设置"]
        - ["`/status`", "查看账户与系统状态"]
        - ["`/terminal-setup`", "安装终端换行增强"]
        - ["`/vim`", "开启 Vim 模式"]
      note: "并非所有 slash commands 都会对所有用户显示；一部分依赖平台或环境。"
    - title: "快捷键与输入方式"
      type: "table"
      headers: ["按键 / 方式", "作用"]
      rows:
        - ["`Enter`", "发送消息"]
        - ["`Shift+Enter`", "换行；需先运行 `/terminal-setup`"]
        - ["`Ctrl+J`", "换行，不依赖终端配置"]
        - ["`Ctrl+C`", "取消当前输入或生成"]
        - ["`Ctrl+D`", "退出会话"]
        - ["`Ctrl+G`", "在默认编辑器中编辑 prompt"]
        - ["`Ctrl+L`", "清屏，保留历史"]
        - ["`Ctrl+R`", "反向搜索命令历史"]
        - ["`Ctrl+B`", "将 Bash 命令或 agent 任务转入后台"]
        - ["`Esc` + `Esc`", "编辑上一条消息"]
        - ["`Shift+Tab`", "切换权限模式：正常 / Plan / Auto-Accept"]
        - ["`/` 开头", "触发 slash 命令"]
        - ["`@` 开头", "触发文件路径自动补全"]
        - ["`!` 开头", "进入 Bash 模式"]
    - title: "配置与环境变量"
      type: "table"
      headers: ["项", "说明"]
      rows:
        - ["`CLAUDE.md`", "项目规则、记忆、协作约束入口"]
        - ["`settings.json`", "用户级 / 项目级 / 本地项目级配置"]
        - ["`ANTHROPIC_API_KEY`", "Anthropic API Key"]
        - ["`ANTHROPIC_AUTH_TOKEN`", "登录与认证 token"]
        - ["`ANTHROPIC_BASE_URL`", "自定义 API 地址"]
        - ["`ANTHROPIC_MODEL`", "默认模型"]
        - ["`ANTHROPIC_SMALL_FAST_MODEL`", "轻量快速模型"]
        - ["`BASH_DEFAULT_TIMEOUT_MS`", "Bash 默认超时"]
        - ["`BASH_MAX_TIMEOUT_MS`", "Bash 最大超时"]
        - ["`CLAUDE_CODE_USE_BEDROCK`", "走 AWS Bedrock"]
        - ["`CLAUDE_CODE_USE_VERTEX`", "走 Google Vertex AI"]
    - title: "高频工作流"
      type: "list"
      items:
        - "`claude`：本地交互开发、重构、审查、调试。"
        - "`claude -p \"总结 git diff\" --output-format text`：快速生成变更摘要。"
        - "`claude -p \"审查最近提交风险\" --output-format json --max-turns 4`：给 CI / 机器人消费。"
        - "`claude --continue`：接着最近一次会话继续。"
        - "`claude --resume <session-id>`：切回指定历史主题。"
        - "`/init`：为仓库建立 `CLAUDE.md`。"
        - "`/compact`：长会话压缩上下文、降低噪音。"
      note: "团队场景里，把规范写进 `CLAUDE.md` 比靠临时 prompt 稳定。"
  footer:
    - "来源：Anthropic 官方网站与官方文档，核对日期 2026-03-13。"
    - "主参考：Claude Code product page、Getting Started、CLI Reference、Interactive Mode、Settings。"
    - "本版优先兼顾可打印与信息完整度。"
---
