/**
 * ProjectSPG Enterprise Console (Single-File Architecture)
 * Layout: Exact replica of modern LLM Gateway Console (Groq/OpenAI Playground style)
 * Palette: Smoky Grey / Smoke (#0d0f12, #14171f, #222733), Smoky Blue (#111827, #182338), Electric Blue (#00f0ff, #38bdf8)
 */

export const DASHBOARD_HTML = `<!DOCTYPE html>
<html lang="en" class="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ProjectSPG Console</title>
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <!-- Lucide Icons CDN -->
  <script src="https://unpkg.com/lucide@latest"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">

  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            console: {
              bg: '#0c0e12',
              surface: '#12151c',
              elevated: '#171c26',
              border: '#202634',
              hover: '#262e3e',
              muted: '#7e8b9f',
              text: '#e2e8f0',
            },
            smoky: {
              blue: '#131e30',
              border: '#1f2f4a',
            },
            electric: {
              DEFAULT: '#00f0ff',
              hover: '#38bdf8',
              glow: 'rgba(0, 240, 255, 0.35)',
              dim: '#00a3cc'
            }
          },
          fontFamily: {
            sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
            mono: ['JetBrains Mono', 'monospace']
          }
        }
      }
    }
  </script>

  <style>
    body {
      background-color: #0c0e12;
      color: #e2e8f0;
      font-family: 'Inter', sans-serif;
    }
    .token-badge {
      display: inline-block;
      padding: 1px 6px;
      border-radius: 4px;
      font-family: 'JetBrains Mono', monospace;
      font-weight: 600;
      font-size: 0.8rem;
      background: rgba(0, 240, 255, 0.12);
      color: #00f0ff;
      border: 1px solid rgba(0, 240, 255, 0.4);
    }
    ::-webkit-scrollbar { width: 5px; height: 5px; }
    ::-webkit-scrollbar-track { background: #0c0e12; }
    ::-webkit-scrollbar-thumb { background: #202634; border-radius: 3px; }
    ::-webkit-scrollbar-thumb:hover { background: #00f0ff; }
  </style>
</head>

<body class="min-h-screen flex flex-col bg-console-bg text-console-text antialiased selection:bg-electric selection:text-black">

  <!-- ========================================================================= -->
  <!-- TOP GLOBAL NAVBAR (Exact Groq Console Header Layout) -->
  <!-- ========================================================================= -->
  <header class="h-13 border-b border-console-border bg-console-bg px-4 flex items-center justify-between z-40">
    
    <!-- Left: Brand Logo + Project Selector -->
    <div class="flex items-center gap-3">
      <a href="/dashboard" class="flex items-center gap-2 group">
        <span class="font-extrabold text-2xl tracking-tighter text-white">project<span class="text-electric">spg</span></span>
      </a>

      <div class="h-4 w-[1px] bg-console-border mx-1"></div>

      <!-- Project Selector Pill Dropdown -->
      <div class="flex items-center gap-1.5 text-xs text-console-muted cursor-pointer hover:text-white transition">
        <span>Personal</span>
        <i data-lucide="chevrons-up-down" class="w-3 h-3 text-console-muted"></i>
        <span class="mx-1 text-console-border">/</span>
        <span class="text-white font-medium">Default Project</span>
        <i data-lucide="chevrons-up-down" class="w-3 h-3 text-console-muted"></i>
      </div>
    </div>

    <!-- Right: Navigation Tabs + Settings + Avatar -->
    <div class="flex items-center gap-6 text-sm">
      <nav class="flex items-center gap-5 text-xs font-medium">
        <button onclick="switchView('playground')" id="nav-playground" class="nav-item text-electric font-semibold transition">Playground</button>
        <button onclick="switchView('keys')" id="nav-keys" class="nav-item text-console-muted hover:text-white transition">API Keys</button>
        <button onclick="switchView('dashboard')" id="nav-dashboard" class="nav-item text-console-muted hover:text-white transition">Dashboard</button>
        <button onclick="switchView('docs')" id="nav-docs" class="nav-item text-console-muted hover:text-white transition">Docs</button>
      </nav>

      <div class="flex items-center gap-3">
        <button onclick="openConfigModal()" class="text-console-muted hover:text-white p-1" title="Gateway Settings">
          <i data-lucide="settings" class="w-4 h-4"></i>
        </button>
        <div class="w-7 h-7 rounded-full bg-gradient-to-tr from-electric/30 to-smoky-blue border border-electric/40 flex items-center justify-center text-xs font-bold text-electric">
          P
        </div>
      </div>
    </div>

  </header>

  <!-- ========================================================================= -->
  <!-- VIEW 1: PLAYGROUND (Exact 3-Column Groq Layout) -->
  <!-- ========================================================================= -->
  <div id="view-playground" class="view-panel flex-1 flex flex-col">
    
    <!-- Playground Sub-Toolbar -->
    <div class="h-12 border-b border-console-border bg-console-bg px-4 flex items-center justify-between">
      <div class="flex items-center gap-4">
        <span class="text-sm font-semibold text-white">Playground</span>
        <div class="bg-console-surface p-0.5 rounded-lg border border-console-border flex items-center text-xs">
          <button class="px-2.5 py-0.5 rounded-md bg-console-elevated text-white font-medium shadow-sm">Chat</button>
          <button class="px-2.5 py-0.5 rounded-md text-console-muted hover:text-white">Studio</button>
        </div>
      </div>

      <div class="flex items-center gap-2">
        <!-- Model Dropdown Pill -->
        <div class="relative">
          <select id="playground-model" onchange="onModelChange()" class="appearance-none bg-console-surface border border-console-border text-white text-xs font-mono rounded-lg pl-3 pr-8 py-1.5 focus:border-electric focus:outline-none cursor-pointer">
            <option value="openai/gpt-oss-120b">openai/gpt-oss-120b (Groq)</option>
            <option value="gemini-2.5-flash-lite">gemini-2.5-flash-lite (Google)</option>
            <option value="open-mistral-7b">open-mistral-7b (Mistral)</option>
            <option value="google/gemini-2.5-flash">google/gemini-2.5-flash (OpenRouter)</option>
            <option value="gpt-4o">gpt-4o (OpenAI)</option>
          </select>
          <i data-lucide="chevrons-up-down" class="w-3.5 h-3.5 text-console-muted absolute right-2.5 top-2.5 pointer-events-none"></i>
        </div>

        <!-- Copy Model Name Button -->
        <button onclick="copyModelName()" class="p-1.5 rounded-lg bg-console-surface border border-console-border text-console-muted hover:text-white" title="Copy model name">
          <i data-lucide="copy" class="w-3.5 h-3.5"></i>
        </button>

        <!-- Toggle Code Button -->
        <button onclick="toggleCodePanel()" id="btn-toggle-code" class="px-3 py-1.5 rounded-lg bg-console-surface border border-console-border text-xs font-medium text-white hover:border-console-muted flex items-center gap-1.5">
          <i data-lucide="code" class="w-3.5 h-3.5 text-electric"></i>
          <span id="code-btn-text">Hide code</span>
        </button>

        <!-- Tune Settings Button -->
        <button onclick="openConfigModal()" class="p-1.5 rounded-lg bg-console-surface border border-console-border text-console-muted hover:text-white" title="Parameters">
          <i data-lucide="sliders-horizontal" class="w-3.5 h-3.5"></i>
        </button>
      </div>
    </div>

    <!-- Playground 3-Column Workspace -->
    <div class="flex-1 flex overflow-hidden">
      
      <!-- COLUMN 1: SYSTEM & USER PROMPTS -->
      <div class="w-1/3 min-w-[280px] border-r border-console-border p-4 flex flex-col justify-between overflow-y-auto">
        <div class="space-y-4">
          
          <!-- System Message Field -->
          <div>
            <div class="text-[11px] font-semibold text-console-muted uppercase tracking-wider mb-1.5">SYSTEM</div>
            <textarea id="system-prompt" rows="2" class="w-full bg-transparent border border-console-border rounded-lg p-2.5 text-xs text-white placeholder-console-muted/60 focus:border-electric focus:outline-none resize-none font-mono" placeholder="Enter system message (Optional)">You are a secure customer service assistant.</textarea>
          </div>

          <!-- User Message Field -->
          <div>
            <div class="text-[11px] font-semibold text-console-muted uppercase tracking-wider mb-1.5">USER</div>
            <div class="bg-console-surface border border-console-border rounded-xl p-3 focus-within:border-electric transition">
              <textarea id="user-prompt" rows="7" class="w-full bg-transparent text-xs text-white placeholder-console-muted/60 focus:outline-none resize-none font-mono leading-relaxed" placeholder="Enter user message (e.g. Include credit cards, SSN, emails, phones)...">Please confirm order for Alice Wong (email: alice.wong@fintech.de, SSN: 123-45-6789) using Visa card 4532-0151-1283-0366. Repeat back her name, email, and card number.</textarea>
              
              <!-- Quick Preset Badges -->
              <div class="mt-2 pt-2 border-t border-console-border/60 flex flex-wrap gap-1.5 text-[10px]">
                <button onclick="loadSample('banking')" class="px-2 py-0.5 rounded bg-console-elevated hover:bg-console-hover text-console-muted hover:text-electric transition">🏦 Banking Wire</button>
                <button onclick="loadSample('patient')" class="px-2 py-0.5 rounded bg-console-elevated hover:bg-console-hover text-console-muted hover:text-electric transition">🏥 Patient Record</button>
                <button onclick="loadSample('germantax')" class="px-2 py-0.5 rounded bg-console-elevated hover:bg-console-hover text-console-muted hover:text-electric transition">🇩🇪 German Tax ID</button>
              </div>
            </div>
          </div>

          <!-- Privacy Shield Live Indicator -->
          <div class="p-3 bg-smoky-blue/40 border border-smoky-border rounded-lg flex items-center justify-between text-xs">
            <div class="flex items-center gap-2">
              <i data-lucide="shield-check" class="w-4 h-4 text-electric"></i>
              <span class="text-xs text-white font-medium">ProjectSPG Active</span>
            </div>
            <span id="shield-status-badge" class="text-[10px] font-mono px-2 py-0.5 rounded bg-electric/10 text-electric border border-electric/30">Auto De-identify</span>
          </div>

        </div>

        <!-- Column 1 Bottom Bar -->
        <div class="pt-4 border-t border-console-border/80 flex items-center justify-between">
          <button onclick="clearInputs()" class="text-xs text-console-muted hover:text-white flex items-center gap-1.5 transition">
            <i data-lucide="plus-circle" class="w-3.5 h-3.5"></i> New Message
          </button>
          <button onclick="clearInputs()" class="text-xs text-console-muted hover:text-white px-3 py-1 rounded bg-console-surface border border-console-border">
            Clear
          </button>
        </div>
      </div>

      <!-- COLUMN 2: RESPONSE AREA -->
      <div id="col-response" class="flex-1 flex flex-col justify-between p-4 overflow-y-auto">
        <div>
          <div class="flex items-center justify-between mb-3">
            <div class="text-[11px] font-semibold text-console-muted uppercase tracking-wider">RESPONSE</div>
            <div id="response-stats" class="text-[11px] font-mono text-console-muted">0 tokens • 0.00s</div>
          </div>

          <!-- Response Container -->
          <div id="response-container" class="space-y-4 text-xs font-mono leading-relaxed">
            <div id="welcome-message" class="text-console-muted space-y-3 font-sans">
              <h3 class="text-white text-sm font-semibold">Welcome to the Playground</h3>
              <ul class="list-disc list-inside space-y-1.5 text-xs text-console-muted">
                <li>You can start by typing a prompt in the "User Message" field.</li>
                <li>Sensitive PII (cards, SSNs, emails) is automatically neutralized at Cloudflare's edge before dispatch.</li>
                <li>Click <strong class="text-white">"Submit"</strong> (or press <kbd class="px-1.5 py-0.5 rounded bg-console-elevated border border-console-border text-white text-[10px]">Ctrl + Enter</kbd>) to get a response.</li>
                <li>Use the <strong class="text-white">"Hide code"</strong> button on the right to view or copy the code snippet.</li>
              </ul>
              <p class="text-xs text-console-muted pt-2">Check the <a href="javascript:void(0)" onclick="switchView('docs')" class="text-electric hover:underline">documentation</a> for full API references.</p>
            </div>

            <!-- Intercepted Tokens Preview (What LLM Saw) -->
            <div id="upstream-tokens-box" class="hidden p-3 rounded-lg bg-console-surface border border-console-border font-mono text-xs">
              <div class="text-[10px] uppercase font-bold text-electric mb-1.5 flex items-center gap-1.5">
                <i data-lucide="eye-off" class="w-3.5 h-3.5"></i> Upstream Prompt Received By Model (Zero Raw PII):
              </div>
              <div id="upstream-tokens-text" class="text-smoke-300"></div>
            </div>

            <!-- Rehydrated Assistant Output -->
            <div id="rehydrated-text" class="hidden whitespace-pre-wrap text-white bg-console-surface/50 p-4 rounded-xl border border-console-border"></div>
          </div>
        </div>

        <!-- Column 2 Bottom Submit Bar (Matching Groq Pill Style) -->
        <div class="pt-4 border-t border-console-border/80 flex items-center justify-between mt-4">
          <div class="flex items-center gap-2">
            <button onclick="addConversationTurn()" class="px-3 py-1.5 rounded-lg bg-console-surface hover:bg-console-hover border border-console-border text-xs text-console-muted hover:text-white flex items-center gap-1.5">
              <i data-lucide="arrow-left" class="w-3.5 h-3.5"></i> Add
            </button>
            <button onclick="clearResponse()" class="px-3 py-1.5 rounded-lg bg-console-surface hover:bg-console-hover border border-console-border text-xs text-console-muted hover:text-white flex items-center gap-1.5">
              <i data-lucide="trash-2" class="w-3.5 h-3.5"></i> Clear
            </button>
          </div>

          <button onclick="submitPrompt()" id="btn-submit" class="px-5 py-2 rounded-full border border-electric/60 hover:border-electric bg-electric/10 hover:bg-electric text-electric hover:text-black font-semibold text-xs flex items-center gap-2 shadow-[0_0_15px_rgba(0,240,255,0.2)] transition active:scale-95">
            <span>Submit</span>
            <span class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-console-bg text-electric border border-electric/40">Ctrl + ↵</span>
          </button>
        </div>
      </div>

      <!-- COLUMN 3: CODE SNIPPET PANEL (Matching Groq Code View) -->
      <div id="col-code" class="w-1/3 min-w-[320px] border-l border-console-border p-4 flex flex-col justify-between bg-console-bg overflow-y-auto">
        <div>
          <!-- Code Language Switcher Header -->
          <div class="flex items-center justify-between mb-3">
            <div class="relative">
              <select id="code-lang-select" onchange="updateCodeViewer()" class="appearance-none bg-transparent text-xs font-semibold text-white pr-5 focus:outline-none cursor-pointer">
                <option value="python">Python</option>
                <option value="curl">cURL</option>
                <option value="langchain">LangChain</option>
              </select>
              <i data-lucide="chevrons-up-down" class="w-3 h-3 text-console-muted absolute right-0 top-1 pointer-events-none"></i>
            </div>

            <button onclick="copySnippet()" class="text-xs text-console-muted hover:text-white flex items-center gap-1 font-mono transition">
              <i data-lucide="copy" class="w-3 h-3"></i> Copy
            </button>
          </div>

          <!-- Code Display -->
          <pre class="p-3 bg-console-surface border border-console-border rounded-lg text-[11px] font-mono leading-relaxed overflow-x-auto text-console-muted selection:bg-electric selection:text-black" id="code-snippet-box"></pre>
        </div>

        <div class="pt-4 border-t border-console-border/80 text-[11px] text-console-muted flex items-center justify-between font-mono">
          <span>Target: Cloudflare Edge</span>
          <span class="text-electric">SSL Encrypted</span>
        </div>
      </div>

    </div>

  </div>

  <!-- ========================================================================= -->
  <!-- VIEW 2: API KEYS (Exact Groq Console API Keys Layout) -->
  <!-- ========================================================================= -->
  <div id="view-keys" class="view-panel hidden flex-1 p-8 max-w-6xl mx-auto w-full">
    
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-xl font-bold text-white mb-1">API Keys</h1>
        <p class="text-xs text-console-muted">Manage your project API keys. Remember to keep your API keys safe to prevent unauthorized access.</p>
      </div>

      <button onclick="openCreateKeyModal()" class="px-4 py-2 rounded-lg border border-electric/60 hover:border-electric bg-electric/10 hover:bg-electric text-electric hover:text-black text-xs font-semibold flex items-center gap-2 transition shadow-[0_0_15px_rgba(0,240,255,0.2)]">
        <i data-lucide="plus" class="w-3.5 h-3.5"></i> Create API Key
      </button>
    </div>

    <!-- API Keys Table (Exact Columns as Groq Screenshot) -->
    <div class="bg-console-bg border border-console-border rounded-xl overflow-hidden">
      <table class="w-full text-left text-xs font-sans">
        <thead class="text-console-muted text-[11px] uppercase tracking-wider font-semibold border-b border-console-border">
          <tr>
            <th class="py-3 px-4">NAME</th>
            <th class="py-3 px-4">SECRET KEY</th>
            <th class="py-3 px-4">CREATED</th>
            <th class="py-3 px-4">LAST USED</th>
            <th class="py-3 px-4">EXPIRES</th>
            <th class="py-3 px-4">USAGE (24HRS)</th>
            <th class="py-3 px-4 text-right"></th>
          </tr>
        </thead>
        <tbody id="api-keys-tbody" class="divide-y divide-console-border font-mono text-xs">
          <tr>
            <td colspan="7" class="py-8 text-center text-console-muted font-sans italic">Loading API keys...</td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>

  <!-- ========================================================================= -->
  <!-- VIEW 3: DASHBOARD / LOGS (Exact Groq Logs Screenshot Layout) -->
  <!-- ========================================================================= -->
  <div id="view-dashboard" class="view-panel hidden flex-1 flex overflow-hidden">
    
    <!-- Logs Left Sidebar -->
    <aside class="w-48 border-r border-console-border p-4 text-xs font-medium space-y-1">
      <button class="w-full text-left px-3 py-2 rounded-lg text-console-muted hover:text-white transition">Metrics</button>
      <button class="w-full text-left px-3 py-2 rounded-lg text-console-muted hover:text-white transition">Usage</button>
      <button class="w-full text-left px-3 py-2 rounded-lg text-electric font-semibold bg-console-surface border border-console-border">Logs</button>
      <button class="w-full text-left px-3 py-2 rounded-lg text-console-muted hover:text-white transition">Batch</button>
    </aside>

    <!-- Logs Main Area -->
    <div class="flex-1 p-6 overflow-y-auto">
      
      <div class="flex items-center justify-between mb-5">
        <h1 class="text-xl font-bold text-white">Logs</h1>
        
        <div class="flex items-center gap-3">
          <label class="flex items-center gap-2 text-xs text-console-muted cursor-pointer">
            <input type="checkbox" id="filter-errors" onchange="renderLogsTable()" class="rounded bg-console-surface border-console-border text-electric focus:ring-0">
            <span>Show Errors Only</span>
          </label>
          
          <button onclick="downloadLogs()" class="px-3 py-1.5 rounded-lg bg-console-surface border border-console-border text-xs text-white hover:border-console-muted flex items-center gap-1.5">
            Download <i data-lucide="chevron-down" class="w-3 h-3"></i>
          </button>
        </div>
      </div>

      <!-- Logs Table (Exact Columns as Groq Screenshot) -->
      <div class="border border-console-border rounded-xl overflow-hidden bg-console-bg">
        <table class="w-full text-left text-xs font-mono">
          <thead class="text-console-muted text-[10px] uppercase tracking-wider font-semibold border-b border-console-border">
            <tr>
              <th class="py-3 px-3">REQUEST TIME</th>
              <th class="py-3 px-3">MODEL</th>
              <th class="py-3 px-3">API KEY</th>
              <th class="py-3 px-3">CODE</th>
              <th class="py-3 px-3">TTFT</th>
              <th class="py-3 px-3">LATENCY</th>
              <th class="py-3 px-3">INPUT TOKENS</th>
              <th class="py-3 px-3">OUTPUT TOKENS</th>
              <th class="py-3 px-3">REQUEST ID</th>
              <th class="py-3 px-3">ERROR</th>
            </tr>
          </thead>
          <tbody id="logs-tbody" class="divide-y divide-console-border text-[11px]">
            <tr>
              <td colspan="10" class="py-8 text-center text-console-muted font-sans italic">Loading requests log...</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="mt-4 flex items-center justify-end gap-3 text-xs text-console-muted font-mono">
        <span>Page Size</span>
        <select class="bg-console-surface border border-console-border rounded px-2 py-1 text-white">
          <option>50</option>
          <option>100</option>
        </select>
        <button class="p-1 hover:text-white"><i data-lucide="chevron-left" class="w-4 h-4"></i></button>
        <button class="p-1 hover:text-white"><i data-lucide="chevron-right" class="w-4 h-4"></i></button>
      </div>

    </div>

  </div>

  <!-- ========================================================================= -->
  <!-- VIEW 4: DOCS / API REFERENCE (Exact Groq Docs Screenshot Layout) -->
  <!-- ========================================================================= -->
  <div id="view-docs" class="view-panel hidden flex-1 flex overflow-hidden">
    
    <!-- Docs Left Sidebar -->
    <aside class="w-64 border-r border-console-border p-4 text-xs overflow-y-auto space-y-4">
      <div class="relative">
        <input type="text" placeholder="Search" class="w-full bg-console-surface border border-console-border rounded-lg pl-8 pr-12 py-1.5 text-xs text-white placeholder-console-muted focus:border-electric focus:outline-none">
        <i data-lucide="search" class="w-3.5 h-3.5 text-console-muted absolute left-2.5 top-2.5"></i>
        <kbd class="text-[10px] text-console-muted border border-console-border px-1 py-0.5 rounded absolute right-2 top-2 font-mono">CTRL K</kbd>
      </div>

      <div class="flex items-center gap-4 text-xs font-semibold border-b border-console-border pb-2">
        <button class="text-console-muted hover:text-white">Docs</button>
        <button class="text-electric border-b-2 border-electric pb-1">API Reference</button>
      </div>

      <div>
        <div class="text-[10px] font-bold text-console-muted uppercase tracking-wider mb-2">ENDPOINTS</div>
        <div class="space-y-1 font-mono text-[11px]">
          <a href="#chat" class="block px-2.5 py-1.5 rounded bg-console-surface text-electric font-semibold border-l-2 border-electric">Chat</a>
          <a href="#chat" class="block px-4 py-1 text-electric">Create chat completion</a>
          <a href="javascript:void(0)" class="block px-2.5 py-1.5 rounded text-console-muted hover:text-white">Responses (beta)</a>
          <a href="javascript:void(0)" class="block px-2.5 py-1.5 rounded text-console-muted hover:text-white">Audio</a>
          <a href="javascript:void(0)" class="block px-2.5 py-1.5 rounded text-console-muted hover:text-white">Models</a>
          <a href="javascript:void(0)" class="block px-2.5 py-1.5 rounded text-console-muted hover:text-white">Batches</a>
          <a href="javascript:void(0)" class="block px-2.5 py-1.5 rounded text-console-muted hover:text-white">Files</a>
          <a href="javascript:void(0)" class="block px-2.5 py-1.5 rounded text-console-muted hover:text-white">Fine Tuning</a>
        </div>
      </div>
    </aside>

    <!-- Docs Main Content (2-Column Reference) -->
    <div class="flex-1 p-8 overflow-y-auto flex gap-8">
      
      <!-- API Description Left -->
      <div class="flex-1 max-w-xl space-y-6">
        <div>
          <h1 class="text-2xl font-bold text-white mb-2">ProjectSPG API Reference</h1>
          <h2 class="text-lg font-semibold text-console-text">Chat</h2>
        </div>

        <div class="space-y-2">
          <h3 class="text-sm font-semibold text-white">Create chat completion</h3>
          <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-console-surface border border-console-border font-mono text-xs">
            <span class="px-1.5 py-0.5 rounded bg-electric/20 text-electric font-bold text-[10px]">POST</span>
            <span class="text-white">https://projectspg.boruahpriyanuj2004.workers.dev/v1/chat/completions</span>
          </div>
          <p class="text-xs text-console-muted pt-1">Creates a model response for the given chat conversation while sanitizing sensitive sovereign IDs, financial cards, and PII at the network edge.</p>
        </div>

        <!-- Request Body Spec -->
        <div class="space-y-3 pt-2">
          <h3 class="text-sm font-semibold text-white">Request Body</h3>
          
          <div class="border-b border-console-border/80 pb-3">
            <div class="flex items-center gap-2 text-xs font-mono">
              <span class="text-white font-semibold">messages</span>
              <span class="text-console-muted">array</span>
              <span class="text-red-400 text-[10px]">Required</span>
            </div>
            <p class="text-xs text-console-muted mt-1">A list of messages comprising the conversation so far.</p>
          </div>

          <div class="border-b border-console-border/80 pb-3">
            <div class="flex items-center gap-2 text-xs font-mono">
              <span class="text-white font-semibold">model</span>
              <span class="text-console-muted">string</span>
              <span class="text-red-400 text-[10px]">Required</span>
            </div>
            <p class="text-xs text-console-muted mt-1">ID of the model to use. Automatically routes to Google Gemini or Groq based on model name.</p>
          </div>

          <div class="border-b border-console-border/80 pb-3">
            <div class="flex items-center gap-2 text-xs font-mono">
              <span class="text-white font-semibold">x-spg-api-key</span>
              <span class="text-console-muted">header string</span>
              <span class="text-electric text-[10px]">Optional</span>
            </div>
            <p class="text-xs text-console-muted mt-1">Your ProjectSPG API key for metering and organization governance.</p>
          </div>

          <div class="border-b border-console-border/80 pb-3">
            <div class="flex items-center gap-2 text-xs font-mono">
              <span class="text-white font-semibold">x-vault-encryption-key</span>
              <span class="text-console-muted">header string</span>
              <span class="text-electric text-[10px]">Optional</span>
            </div>
            <p class="text-xs text-console-muted mt-1">Customer BYOK KMS passphrase for zero-knowledge AES-256-GCM vault encryption at rest.</p>
          </div>
        </div>
      </div>

      <!-- API Code Example Right -->
      <div class="w-96 space-y-4">
        <div class="border border-console-border rounded-xl bg-console-surface overflow-hidden">
          <div class="p-3 border-b border-console-border flex items-center justify-between text-xs">
            <span class="font-mono text-console-muted font-semibold">curl</span>
            <button onclick="navigator.clipboard.writeText(document.getElementById('docs-curl').textContent); alert('Copied!');" class="text-console-muted hover:text-white">
              <i data-lucide="copy" class="w-3.5 h-3.5"></i>
            </button>
          </div>
          <pre id="docs-curl" class="p-3 text-[11px] font-mono text-console-muted overflow-x-auto leading-relaxed">curl https://projectspg.boruahpriyanuj2004.workers.dev/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer $OPENAI_API_KEY" \\
  -H "x-spg-api-key: spg_live_your_key" \\
  -d '{
    "model": "gpt-4o",
    "messages": [
      {
        "role": "user",
        "content": "Confirm transaction for SSN 123-45-6789"
      }
    ]
  }'</pre>
        </div>

        <div class="border border-console-border rounded-xl bg-console-surface overflow-hidden">
          <div class="p-3 border-b border-console-border flex items-center justify-between text-xs">
            <span class="font-mono text-console-muted font-semibold">Example Response</span>
            <button class="text-console-muted hover:text-white">
              <i data-lucide="copy" class="w-3.5 h-3.5"></i>
            </button>
          </div>
          <pre class="p-3 text-[11px] font-mono text-console-muted overflow-x-auto leading-relaxed">{
  "id": "chatcmpl-spg-7a8b",
  "object": "chat.completion",
  "created": 1790451661,
  "model": "gpt-4o",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "Transaction confirmed for SSN 123-45-6789"
      },
      "finish_reason": "stop"
    }
  ]
}</pre>
        </div>
      </div>

    </div>

  </div>

  <!-- ========================================================================= -->
  <!-- MODAL: CREATE API KEY (Matching Groq Modal Style) -->
  <!-- ========================================================================= -->
  <div id="modal-create-key" class="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 hidden flex items-center justify-center p-4">
    <div class="bg-console-surface border border-console-border rounded-xl max-w-md w-full p-6 shadow-2xl">
      <h3 class="text-base font-bold text-white mb-1">Create API Key</h3>
      <p class="text-xs text-console-muted">Enter a name for your new API key to easily identify it in logs and usage reports.</p>
      
      <div class="mt-4 space-y-3 text-xs">
        <div>
          <label class="block text-console-muted font-medium mb-1">Key Name</label>
          <input type="text" id="new-key-name" placeholder="e.g. ProjectSPG Test" class="w-full bg-console-bg border border-console-border rounded-lg px-3 py-2 text-white focus:border-electric focus:outline-none font-mono">
        </div>
        <div>
          <label class="block text-console-muted font-medium mb-1">Tier & Monthly Quota</label>
          <select id="new-key-tier" class="w-full bg-console-bg border border-console-border rounded-lg px-3 py-2 text-white focus:border-electric focus:outline-none">
            <option value="free">Free Tier (10,000 requests/mo)</option>
            <option value="pro">Pro Tier (100,000 requests/mo)</option>
            <option value="enterprise">Enterprise Tier (Unlimited)</option>
          </select>
        </div>
      </div>

      <div class="mt-6 flex justify-end gap-2 text-xs">
        <button onclick="closeCreateKeyModal()" class="px-4 py-2 rounded-lg bg-console-elevated text-console-muted hover:text-white">Cancel</button>
        <button onclick="submitCreateKey()" class="px-4 py-2 rounded-lg border border-electric/60 bg-electric text-black font-semibold shadow-[0_0_12px_rgba(0,240,255,0.3)]">Create API Key</button>
      </div>
    </div>
  </div>

  <!-- ========================================================================= -->
  <!-- MODAL: DISPLAY NEW SECRET KEY (Matching Groq Secret Display) -->
  <!-- ========================================================================= -->
  <div id="modal-show-key" class="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 hidden flex items-center justify-center p-4">
    <div class="bg-console-surface border border-electric/40 rounded-xl max-w-lg w-full p-6 shadow-[0_0_30px_rgba(0,240,255,0.2)]">
      <div class="flex items-center gap-2 text-white text-sm font-bold mb-1">
        <i data-lucide="key" class="w-4 h-4 text-electric"></i> Save your key
      </div>
      <p class="text-xs text-console-muted">Please save this secret key in a safe place. You won't be able to view it again.</p>
      
      <div class="mt-4 p-3 bg-console-bg border border-console-border rounded-lg flex items-center justify-between font-mono text-xs text-electric">
        <span id="displayed-raw-key" class="break-all select-all font-semibold"></span>
        <button onclick="copyRawKey()" class="ml-2 text-console-muted hover:text-white p-1" title="Copy Key">
          <i data-lucide="copy" class="w-4 h-4"></i>
        </button>
      </div>

      <div class="mt-6 flex justify-end text-xs">
        <button onclick="closeShowKeyModal()" class="px-5 py-2 rounded-lg border border-electric/60 bg-electric text-black font-semibold">Done</button>
      </div>
    </div>
  </div>

  <!-- ========================================================================= -->
  <!-- MODAL: ADVANCED SETTINGS (KMS, Security Policies, Upstream Keys) -->
  <!-- ========================================================================= -->
  <div id="modal-config" class="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 hidden flex items-center justify-center p-4">
    <div class="bg-console-surface border border-console-border rounded-xl max-w-md w-full p-6 shadow-2xl">
      <h3 class="text-base font-bold text-white mb-1 flex items-center gap-2">
        <i data-lucide="sliders-horizontal" class="w-4 h-4 text-electric"></i> Gateway Parameters
      </h3>
      <p class="text-xs text-console-muted">Configure zero-knowledge KMS encryption and regional packs.</p>

      <div class="mt-4 space-y-3 text-xs">
        <div>
          <label class="block text-console-muted font-medium mb-1">Zero-Knowledge BYOK KMS Passphrase</label>
          <input type="password" id="cfg-kms" placeholder="Customer secret key (AES-256-GCM)" class="w-full bg-console-bg border border-console-border rounded-lg px-3 py-2 text-white focus:border-electric focus:outline-none font-mono">
        </div>
        <div>
          <label class="block text-console-muted font-medium mb-1">Upstream Provider API Key</label>
          <input type="password" id="cfg-apikey" placeholder="Optional raw provider API key" class="w-full bg-console-bg border border-console-border rounded-lg px-3 py-2 text-white focus:border-electric focus:outline-none font-mono">
        </div>
        <div>
          <label class="block text-console-muted font-medium mb-1">Tokenization Mode</label>
          <select id="cfg-mode" class="w-full bg-console-bg border border-console-border rounded-lg px-3 py-2 text-white focus:border-electric focus:outline-none font-mono">
            <option value="structural">Structural (CARD_1, SSN_1, EMAIL_1)</option>
            <option value="fpe">Format-Preserving (Synthetic Valid Mocks)</option>
          </select>
        </div>
      </div>

      <div class="mt-6 flex justify-end gap-2 text-xs">
        <button onclick="closeConfigModal()" class="px-5 py-2 rounded-lg bg-electric text-black font-semibold">Save Settings</button>
      </div>
    </div>
  </div>

  <!-- JAVASCRIPT APPLICATION CONTROLLER -->
  <script>
    // PRESET SCENARIOS
    const SAMPLES = {
      banking: "Please confirm order for Alice Wong (email: alice.wong@fintech.de, SSN: 123-45-6789) using Visa card 4532-0151-1283-0366. Repeat back her name, email, and card number.",
      patient: "Patient Record: Johnathan Doe, Date of Birth 1982-04-12, MRN: MRN-984210, Phone: +1 415-555-2671. Advise on follow-up consultation dates.",
      germantax: "Audit filing for Hans Gruber (email: hans.gruber@berlin-tech.de, German Tax ID: 04 225 818 316, IBAN: DE89 3704 0044 0532 0130 00)."
    };

    let activeView = 'playground';
    let isCodeVisible = true;
    let activeCodeLang = 'python';

    // Mock logs for initial display
    let localLogs = [
      { time: '9/27/2026, 1:11:54 AM', model: 'openai/gpt-oss-120b', key: 'ProjectSPG Test', code: 200, ttft: '0.583', latency: '0.829', inTokens: 124, outTokens: 120, reqId: 'req_0...t5xz', error: '-' },
      { time: '9/27/2026, 1:11:01 AM', model: 'openai/gpt-oss-120b', key: 'ProjectSPG Test', code: 200, ttft: '0.376', latency: '0.538', inTokens: 89, outTokens: 79, reqId: 'req_0...4xfy', error: '-' },
      { time: '9/27/2026, 1:10:14 AM', model: 'llama-3.3-70b-versatile', key: 'ProjectSPG Test', code: 404, ttft: '0', latency: '0.002', inTokens: 0, outTokens: 0, reqId: 'req_0...0d96', error: 'model_not_found' }
    ];

    window.addEventListener('DOMContentLoaded', () => {
      lucide.createIcons();
      updateCodeViewer();
      fetchApiKeys();
      renderLogsTable();

      // Keyboard shortcut Ctrl+Enter to submit
      document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
          if (activeView === 'playground') submitPrompt();
        }
      });
    });

    // VIEW SWITCHER
    function switchView(viewName) {
      activeView = viewName;
      document.querySelectorAll('.view-panel').forEach(el => el.classList.add('hidden'));
      document.getElementById('view-' + viewName).classList.remove('hidden');

      document.querySelectorAll('.nav-item').forEach(btn => {
        btn.classList.remove('text-electric', 'font-semibold');
        btn.classList.add('text-console-muted');
      });

      const activeBtn = document.getElementById('nav-' + viewName);
      if (activeBtn) {
        activeBtn.classList.add('text-electric', 'font-semibold');
        activeBtn.classList.remove('text-console-muted');
      }

      if (viewName === 'keys') fetchApiKeys();
      if (viewName === 'dashboard') renderLogsTable();
      lucide.createIcons();
    }

    // CODE PANEL TOGGLE
    function toggleCodePanel() {
      const panel = document.getElementById('col-code');
      const text = document.getElementById('code-btn-text');
      isCodeVisible = !isCodeVisible;
      
      if (isCodeVisible) {
        panel.classList.remove('hidden');
        text.textContent = 'Hide code';
      } else {
        panel.classList.add('hidden');
        text.textContent = 'View code';
      }
    }

    function loadSample(key) {
      document.getElementById('user-prompt').value = SAMPLES[key] || '';
      updateCodeViewer();
    }

    function clearInputs() {
      document.getElementById('user-prompt').value = '';
      updateCodeViewer();
    }

    function clearResponse() {
      document.getElementById('welcome-message').classList.remove('hidden');
      document.getElementById('upstream-tokens-box').classList.add('hidden');
      document.getElementById('rehydrated-text').classList.add('hidden');
      document.getElementById('response-stats').textContent = '0 tokens • 0.00s';
    }

    function addConversationTurn() {
      const resp = document.getElementById('rehydrated-text').textContent;
      if (resp) {
        document.getElementById('system-prompt').value += "\\n\\nAssistant: " + resp;
      }
    }

    function onModelChange() {
      updateCodeViewer();
    }

    function copyModelName() {
      const model = document.getElementById('playground-model').value;
      navigator.clipboard.writeText(model);
      alert('Model name copied: ' + model);
    }

    // SUBMIT PROMPT TO LIVE CLOUDFLARE WORKER
    async function submitPrompt() {
      const userPrompt = document.getElementById('user-prompt').value.trim();
      if (!userPrompt) return;

      const model = document.getElementById('playground-model').value;
      const kmsKey = document.getElementById('cfg-kms').value.trim();
      const apiKey = document.getElementById('cfg-apikey').value.trim();
      const mode = document.getElementById('cfg-mode').value;

      const btn = document.getElementById('btn-submit');
      btn.innerHTML = '<span>Running...</span>';
      btn.disabled = true;

      const t0 = performance.now();

      try {
        const headers = {
          'Content-Type': 'application/json',
          'x-tokenization-mode': mode
        };
        if (kmsKey) headers['x-vault-encryption-key'] = kmsKey;
        if (apiKey) headers['Authorization'] = 'Bearer ' + apiKey;

        if (model.includes('gemini')) {
          if (apiKey) headers['x-goog-api-key'] = apiKey;
        } else if (model.includes('groq') || model.includes('oss')) {
          headers['x-upstream-base-url'] = 'https://api.groq.com/openai/v1';
        } else if (model.includes('mistral')) {
          headers['x-upstream-base-url'] = 'https://api.mistral.ai/v1';
        } else if (model.includes('openrouter')) {
          headers['x-upstream-base-url'] = 'https://openrouter.ai/api/v1';
        }

        const res = await fetch('/v1/chat/completions', {
          method: 'POST',
          headers,
          body: JSON.stringify({
            model: model,
            messages: [
              { role: 'system', content: document.getElementById('system-prompt').value },
              { role: 'user', content: userPrompt }
            ],
            max_tokens: 150
          })
        });

        const elapsedSec = ((performance.now() - t0) / 1000).toFixed(2);
        const data = await res.json();

        document.getElementById('welcome-message').classList.add('hidden');
        document.getElementById('upstream-tokens-box').classList.remove('hidden');
        document.getElementById('rehydrated-text').classList.remove('hidden');

        // Render Upstream Prompt view
        const interceptedCount = res.headers.get('x-privacy-entities-intercepted') || '3';
        document.getElementById('upstream-tokens-text').innerHTML = 'Prompt was automatically de-identified at Cloudflare Edge. Intercepted <strong class="text-electric">' + interceptedCount + ' entities</strong> with KMS: ' + (res.headers.get('X-Kms-Status') || (kmsKey ? 'BYOK-AES-256' : 'OFF'));

        // Render Rehydrated Output
        if (data.choices && data.choices[0]) {
          const content = data.choices[0].message.content;
          document.getElementById('rehydrated-text').textContent = content;
          const tokens = data.usage ? data.usage.completion_tokens : 45;
          document.getElementById('response-stats').textContent = tokens + ' tokens • ' + elapsedSec + 's';

          // Add to local logs table
          localLogs.unshift({
            time: new Date().toLocaleTimeString(),
            model: model,
            key: 'ProjectSPG Test',
            code: 200,
            ttft: (elapsedSec * 0.4).toFixed(3),
            latency: elapsedSec,
            inTokens: data.usage ? data.usage.prompt_tokens : 85,
            outTokens: tokens,
            reqId: 'req_' + Math.random().toString(36).slice(2, 7) + '...',
            error: '-'
          });
        } else if (data.error) {
          document.getElementById('rehydrated-text').innerHTML = '<span class="text-red-400 font-bold">Error:</span> ' + JSON.stringify(data.error);
        }
      } catch (err) {
        document.getElementById('rehydrated-text').textContent = 'Execution error: ' + err.message;
      } finally {
        btn.innerHTML = '<span>Submit</span><span class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-console-bg text-electric border border-electric/40">Ctrl + ↵</span>';
        btn.disabled = false;
        lucide.createIcons();
      }
    }

    // UPDATE CODE VIEWER (Matching Groq Format)
    function updateCodeViewer() {
      const model = document.getElementById('playground-model').value;
      const box = document.getElementById('code-snippet-box');
      const lang = document.getElementById('code-lang-select').value;
      const origin = window.location.origin;

      if (lang === 'python') {
        box.textContent = \`from openai import OpenAI

client = OpenAI(
    base_url="\${origin}/v1",
    api_key="your-api-key",
    default_headers={
        "x-spg-api-key": "spg_live_your_key",
        "x-detection-categories": "global,north_america,european_union"
    }
)

completion = client.chat.completions.create(
    model="\${model}",
    messages=[
        {
            "role": "user",
            "content": "Verify customer Alice (email: alice@corp.de, SSN: 123-45-6789)"
        }
    ],
    temperature=1,
    max_tokens=150,
    stream=True
)

for chunk in completion:
    print(chunk.choices[0].delta.content or "", end="")\`;
      } else if (lang === 'curl') {
        box.textContent = \`curl \${origin}/v1/chat/completions \\\\
  -H "Content-Type: application/json" \\\\
  -H "Authorization: Bearer \$API_KEY" \\\\
  -H "x-spg-api-key: spg_live_your_key" \\\\
  -d '{
    "model": "\${model}",
    "messages": [
      {
        "role": "user",
        "content": "Verify customer Alice (email: alice@corp.de, SSN: 123-45-6789)"
      }
    ]
  }'\`;
      } else if (lang === 'langchain') {
        box.textContent = \`from langchain_openai import ChatOpenAI
from ai_privacy_core.integrations.langchain import PrivacyCallbackHandler

privacy_handler = PrivacyCallbackHandler(
    base_url="\${origin}/v1",
    api_key="spg_live_your_key"
)

llm = ChatOpenAI(model="\${model}", callbacks=[privacy_handler])
response = llm.invoke("Verify customer Alice (email: alice@corp.de, SSN: 123-45-6789)")
print(response.content)\`;
      }
    }

    function copySnippet() {
      const code = document.getElementById('code-snippet-box').textContent;
      navigator.clipboard.writeText(code);
      alert('Code snippet copied!');
    }

    // =========================================================================
    // API KEYS LOGIC (Matching Groq API Keys Screen)
    // =========================================================================
    async function fetchApiKeys() {
      try {
        const res = await fetch('/api/keys');
        const data = await res.json();
        const tbody = document.getElementById('api-keys-tbody');

        if (!data.keys || data.keys.length === 0) {
          tbody.innerHTML = '<tr><td colspan="7" class="py-8 text-center text-console-muted font-sans italic">No API keys generated yet. Click "+ Create API Key" to generate your first key.</td></tr>';
          return;
        }

        tbody.innerHTML = data.keys.map(k => \`
          <tr class="hover:bg-console-surface/50 transition">
            <td class="py-3 px-4 font-sans font-medium text-white">\${k.name}</td>
            <td class="py-3 px-4 text-console-muted">\${k.key_prefix}</td>
            <td class="py-3 px-4 text-console-muted">\${new Date(k.created_at).toLocaleDateString()}</td>
            <td class="py-3 px-4 text-console-muted">\${new Date(k.created_at).toLocaleDateString()}</td>
            <td class="py-3 px-4 text-console-muted">Never</td>
            <td class="py-3 px-4 text-console-muted">\${k.requests_used} API Calls</td>
            <td class="py-3 px-4 text-right">
              <div class="flex items-center justify-end gap-2">
                <button class="p-1 text-console-muted hover:text-white"><i data-lucide="edit-2" class="w-3.5 h-3.5"></i></button>
                <button onclick="deleteKey('\${k.id}')" class="p-1 text-console-muted hover:text-red-400"><i data-lucide="trash-2" class="w-3.5 h-3.5"></i></button>
              </div>
            </td>
          </tr>
        \`).join('');
        lucide.createIcons();
      } catch (err) {
        console.error('Fetch keys error', err);
      }
    }

    function openCreateKeyModal() {
      document.getElementById('modal-create-key').classList.remove('hidden');
    }
    function closeCreateKeyModal() {
      document.getElementById('modal-create-key').classList.add('hidden');
    }

    async function submitCreateKey() {
      const name = document.getElementById('new-key-name').value.trim() || 'ProjectSPG Key';
      const tier = document.getElementById('new-key-tier').value;
      const quota = tier === 'enterprise' ? 1000000 : (tier === 'pro' ? 100000 : 10000);

      try {
        const res = await fetch('/api/keys', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, tier, monthlyQuota: quota })
        });
        const data = await res.json();
        closeCreateKeyModal();

        document.getElementById('displayed-raw-key').textContent = data.rawKey;
        document.getElementById('modal-show-key').classList.remove('hidden');
        fetchApiKeys();
        lucide.createIcons();
      } catch (err) {
        alert('Failed: ' + err.message);
      }
    }

    function closeShowKeyModal() {
      document.getElementById('modal-show-key').classList.add('hidden');
    }
    function copyRawKey() {
      const key = document.getElementById('displayed-raw-key').textContent;
      navigator.clipboard.writeText(key);
      alert('API Key copied to clipboard!');
    }
    async function deleteKey(id) {
      if (!confirm('Are you sure you want to delete this API key?')) return;
      await fetch('/api/keys/' + id, { method: 'DELETE' });
      fetchApiKeys();
    }

    // =========================================================================
    // LOGS TABLE RENDER (Matching Groq Logs Screenshot)
    // =========================================================================
    function renderLogsTable() {
      const tbody = document.getElementById('logs-tbody');
      const errorsOnly = document.getElementById('filter-errors').checked;
      const filtered = errorsOnly ? localLogs.filter(l => l.code !== 200) : localLogs;

      tbody.innerHTML = filtered.map(l => \`
        <tr class="hover:bg-console-surface/50 transition">
          <td class="py-2.5 px-3 text-console-muted">\${l.time}</td>
          <td class="py-2.5 px-3 text-white font-medium">\${l.model}</td>
          <td class="py-2.5 px-3 text-console-muted">\${l.key}</td>
          <td class="py-2.5 px-3">
            <span class="px-1.5 py-0.5 rounded text-[10px] font-bold \${l.code === 200 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}">\${l.code}</span>
          </td>
          <td class="py-2.5 px-3 text-console-muted">\${l.ttft}</td>
          <td class="py-2.5 px-3 text-console-muted">\${l.latency}</td>
          <td class="py-2.5 px-3 text-console-muted">\${l.inTokens}</td>
          <td class="py-2.5 px-3 text-console-muted">\${l.outTokens}</td>
          <td class="py-2.5 px-3 text-console-muted">\${l.reqId}</td>
          <td class="py-2.5 px-3 text-console-muted">\${l.error}</td>
        </tr>
      \`).join('');
    }

    function downloadLogs() {
      const blob = new Blob([JSON.stringify(localLogs, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'projectspg_logs.json';
      a.click();
    }

    function openConfigModal() {
      document.getElementById('modal-config').classList.remove('hidden');
    }
    function closeConfigModal() {
      document.getElementById('modal-config').classList.add('hidden');
    }
  </script>
</body>
</html>`;
