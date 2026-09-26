/**
 * ProjectSPG Enterprise Console (Single-File Architecture)
 * Layout: Exact 1:1 Pixel-Accurate Replica of Groq Console Playground & API Keys (Light Theme)
 * References: media_1790456420408.png (Playground) & media_1790456680441.png (API Keys)
 */

export const DASHBOARD_HTML = `<!DOCTYPE html>
<html lang="en" class="light">
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
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">

  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            groq: {
              coral: '#f0523d',
              coralHover: '#e0422d',
              coralLight: '#fff5f3',
              dark: '#111827',
              grayBg: '#f8f9fa',
              grayBorder: '#ebecef',
              textMuted: '#6b7280',
              textSubtle: '#9ca3af',
              avatar: '#65233c'
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
      background-color: #ffffff;
      color: #111827;
      font-family: 'Inter', sans-serif;
    }
    .token-badge {
      display: inline-block;
      padding: 1px 6px;
      border-radius: 4px;
      font-family: 'JetBrains Mono', monospace;
      font-weight: 500;
      font-size: 0.75rem;
      background: #f0f9ff;
      color: #0284c7;
      border: 1px solid #bae6fd;
    }
    /* Syntax Highlighting Colors matching Groq Screenshot */
    .syn-keyword { color: #9333ea; font-weight: 500; }
    .syn-string { color: #16a34a; }
    .syn-number { color: #ea580c; }
    .syn-bool { color: #2563eb; }
    .syn-comment { color: #9ca3af; font-style: italic; }

    ::-webkit-scrollbar { width: 5px; height: 5px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 3px; }
    ::-webkit-scrollbar-thumb:hover { background: #d1d5db; }
  </style>
</head>

<body class="h-screen flex flex-col bg-white text-groq-dark antialiased overflow-hidden selection:bg-[#f0523d]/20 selection:text-[#f0523d]">

  <!-- ========================================================================= -->
  <!-- TOP GLOBAL NAVBAR (Exact Groq Console Header Layout - 52px height) -->
  <!-- ========================================================================= -->
  <header class="h-[52px] bg-white px-6 flex items-center justify-between shrink-0 z-40">
    
    <!-- Left: Brand Logo + Project Selector -->
    <div class="flex items-center gap-3.5">
      <a href="#playground" onclick="switchView('playground')" class="flex items-center gap-1 group">
        <span class="font-extrabold text-[22px] tracking-tight text-groq-dark">project<span class="text-[#f0523d]">spg</span></span>
      </a>

      <!-- Project Selector Pill Dropdown -->
      <div class="flex items-center gap-1.5 text-xs text-groq-textMuted cursor-pointer hover:text-groq-dark transition ml-2">
        <span class="font-normal text-groq-textMuted">Personal</span>
        <i data-lucide="chevrons-up-down" class="w-3 h-3 text-groq-textSubtle"></i>
        <span class="mx-1 text-gray-300 font-light">/</span>
        <span class="text-groq-dark font-medium">Default Project</span>
        <i data-lucide="chevrons-up-down" class="w-3 h-3 text-groq-textSubtle"></i>
      </div>
    </div>

    <!-- Right: Navigation Tabs + Settings + Avatar -->
    <div class="flex items-center gap-6 text-xs">
      <nav class="flex items-center gap-6 font-medium">
        <button onclick="switchView('playground')" id="nav-playground" class="nav-item text-groq-textMuted hover:text-groq-dark transition">Playground</button>
        <button onclick="switchView('keys')" id="nav-keys" class="nav-item text-[#f0523d] font-semibold transition">API Keys</button>
        <button onclick="switchView('dashboard')" id="nav-dashboard" class="nav-item text-groq-textMuted hover:text-groq-dark transition">Dashboard</button>
        <button onclick="switchView('docs')" id="nav-docs" class="nav-item text-groq-textMuted hover:text-groq-dark transition">Docs</button>
      </nav>

      <div class="flex items-center gap-3.5 ml-2">
        <!-- Settings Gear Icon -->
        <button onclick="openConfigModal()" class="text-groq-textMuted hover:text-groq-dark transition p-1" title="Settings">
          <i data-lucide="settings" class="w-4 h-4"></i>
        </button>

        <!-- User Avatar Circle -->
        <div class="w-7 h-7 rounded-full bg-groq-avatar text-white flex items-center justify-center text-xs font-semibold shadow-xs">
          P
        </div>
      </div>
    </div>

  </header>

  <!-- ========================================================================= -->
  <!-- MAIN WORKSPACE FRAME (Exact Outer Rounded Border Box from Screenshots) -->
  <!-- ========================================================================= -->
  <div class="border-t border-l border-r border-groq-grayBorder rounded-t-2xl bg-white mx-3 sm:mx-4 flex-1 flex flex-col overflow-hidden shadow-xs">

    <!-- ======================================================================= -->
    <!-- VIEW 1: PLAYGROUND (Exact 3-Column Groq Layout - Matching Screenshot) -->
    <!-- ======================================================================= -->
    <div id="view-playground" class="view-panel hidden flex-1 flex flex-col overflow-hidden">
      
      <!-- Sub-Toolbar (54px height) -->
      <div class="h-[54px] border-b border-groq-grayBorder bg-white px-6 flex items-center justify-between shrink-0">
        
        <!-- Left: Title + Chat/Studio pill -->
        <div class="flex items-center gap-4">
          <h2 class="text-[15px] font-semibold text-groq-dark tracking-tight">Playground</h2>
          
          <!-- Segmented Toggle (Chat / Studio) -->
          <div class="bg-[#f3f4f6] p-0.5 rounded-lg flex items-center text-xs">
            <button class="px-3 py-1 rounded-md bg-white text-groq-dark font-medium shadow-xs text-xs">Chat</button>
            <button class="px-3 py-1 rounded-md text-groq-textMuted hover:text-groq-dark text-xs">Studio</button>
          </div>
        </div>

        <!-- Right: Model Selector + Copy + Hide Code + Parameters Sliders -->
        <div class="flex items-center gap-2">
          <!-- Model Dropdown Box -->
          <div class="relative">
            <select id="playground-model" onchange="onModelChange()" class="appearance-none bg-white border border-groq-grayBorder text-groq-dark text-xs font-sans font-medium rounded-lg pl-3 pr-8 py-1.5 focus:border-gray-400 focus:outline-none cursor-pointer">
              <option value="openai/gpt-oss-120b">openai/gpt-oss-120b</option>
              <option value="llama-3.3-70b-versatile">llama-3.3-70b-versatile</option>
              <option value="gemini-2.5-flash-lite">gemini-2.5-flash-lite</option>
              <option value="open-mistral-7b">open-mistral-7b</option>
              <option value="gpt-4o">gpt-4o</option>
            </select>
            <i data-lucide="chevrons-up-down" class="w-3.5 h-3.5 text-groq-textSubtle absolute right-2.5 top-2 pointer-events-none"></i>
          </div>

          <!-- Copy Model Name Button -->
          <button onclick="copyModelName()" class="p-1.5 rounded-lg bg-white border border-groq-grayBorder text-groq-textMuted hover:text-groq-dark" title="Copy model name">
            <i data-lucide="copy" class="w-3.5 h-3.5"></i>
          </button>

          <!-- Toggle Code Button -->
          <button onclick="toggleCodePanel()" id="btn-toggle-code" class="px-3 py-1.5 rounded-lg bg-white border border-groq-grayBorder text-xs font-medium text-groq-dark hover:bg-gray-50 flex items-center gap-1.5">
            <i data-lucide="code" class="w-3.5 h-3.5 text-groq-textMuted"></i>
            <span id="code-btn-text">Hide code</span>
          </button>

          <!-- Parameters Sliders Button -->
          <button onclick="openConfigModal()" class="p-1.5 rounded-lg bg-white border border-groq-grayBorder text-groq-textMuted hover:text-groq-dark" title="Parameters">
            <i data-lucide="sliders-horizontal" class="w-3.5 h-3.5"></i>
          </button>
        </div>

      </div>

      <!-- Playground 3-Column Workspace -->
      <div class="flex-1 flex overflow-hidden">
        
        <!-- COLUMN 1: PROMPT INPUTS -->
        <div class="w-[33%] min-w-[320px] max-w-[420px] border-r border-groq-grayBorder p-6 flex flex-col justify-between overflow-y-auto bg-white">
          <div class="space-y-4">
            
            <!-- SYSTEM ROW -->
            <div class="flex items-center gap-3">
              <span class="text-[11px] font-semibold text-groq-textMuted uppercase tracking-wider shrink-0">SYSTEM</span>
              <input type="text" id="system-prompt" class="flex-1 bg-transparent border-0 text-xs text-groq-dark placeholder-groq-textSubtle focus:outline-none" placeholder="Enter system message (Optional)" value="Enter system message (Optional)">
            </div>

            <!-- USER PROMPT CARD -->
            <div class="bg-groq-grayBg border border-groq-grayBorder rounded-2xl p-4 transition focus-within:border-gray-300">
              <div class="text-[11px] font-semibold text-groq-textSubtle uppercase tracking-wider mb-2">USER</div>
              <textarea id="user-prompt" rows="8" class="w-full bg-transparent text-xs text-groq-dark placeholder-groq-textSubtle focus:outline-none resize-none leading-relaxed" placeholder="Enter user message...">Please confirm order for Alice Wong (email: alice.wong@fintech.de, SSN: 123-45-6789) using Visa card 4532-0151-1283-0366. Repeat back her name, email, and card number.</textarea>
              
              <!-- Quick Presets -->
              <div class="mt-3 pt-2.5 border-t border-gray-200/70 flex flex-wrap gap-1.5 text-[10px]">
                <button onclick="loadSample('banking')" class="px-2 py-0.5 rounded-md bg-white border border-groq-grayBorder hover:border-gray-300 text-groq-textMuted hover:text-groq-dark transition">🏦 Banking Wire</button>
                <button onclick="loadSample('patient')" class="px-2 py-0.5 rounded-md bg-white border border-groq-grayBorder hover:border-gray-300 text-groq-textMuted hover:text-groq-dark transition">🏥 Patient Record</button>
                <button onclick="loadSample('germantax')" class="px-2 py-0.5 rounded-md bg-white border border-groq-grayBorder hover:border-gray-300 text-groq-textMuted hover:text-groq-dark transition">🇩🇪 German Tax ID</button>
              </div>
            </div>

            <!-- Privacy Shield Badge -->
            <div class="flex items-center justify-between text-xs px-3 py-2 rounded-xl bg-sky-50 border border-sky-200 text-sky-900">
              <div class="flex items-center gap-1.5">
                <i data-lucide="shield-check" class="w-4 h-4 text-sky-600"></i>
                <span class="text-[11px] font-medium">ProjectSPG Privacy Gateway Active</span>
              </div>
              <span class="text-[10px] font-mono font-semibold text-sky-700 bg-white border border-sky-300 px-1.5 py-0.5 rounded">Auto De-identify</span>
            </div>

          </div>

          <!-- Column 1 Bottom Row -->
          <div class="pt-4 flex items-center justify-between">
            <button onclick="clearInputs()" class="px-3.5 py-1.5 rounded-lg bg-groq-grayBg border border-groq-grayBorder hover:bg-gray-100 text-xs font-medium text-groq-dark flex items-center gap-1.5 transition">
              <i data-lucide="plus-circle" class="w-3.5 h-3.5 text-groq-textMuted"></i>
              <span>New Message</span>
            </button>
            
            <button onclick="clearInputs()" class="px-4 py-1.5 rounded-lg bg-groq-grayBg border border-groq-grayBorder hover:bg-gray-100 text-xs font-medium text-groq-textMuted hover:text-groq-dark transition">
              Clear
            </button>
          </div>

        </div>

        <!-- COLUMN 2: RESPONSE AREA -->
        <div id="col-response" class="flex-1 flex flex-col justify-between p-6 border-r border-groq-grayBorder overflow-y-auto bg-white">
          <div>
            <div class="flex items-center justify-between mb-4">
              <span class="text-[11px] font-semibold text-groq-textMuted uppercase tracking-wider">RESPONSE</span>
              <div id="response-stats" class="text-[11px] font-mono text-groq-textSubtle">0 tokens • 0.00s</div>
            </div>

            <!-- Welcome Message State -->
            <div id="welcome-message" class="space-y-4 text-xs text-groq-textMuted font-sans max-w-lg">
              <h3 class="text-sm font-semibold text-groq-dark">Welcome to the Playground</h3>
              
              <ul class="space-y-2 list-none text-xs text-groq-dark">
                <li class="flex items-start gap-2">
                  <span class="text-groq-textSubtle">•</span>
                  <span>You can start by typing a prompt in the "User Message" field</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-groq-textSubtle">•</span>
                  <span>Click "Submit" (Or press Cmd + Enter) to get a response.</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-groq-textSubtle">•</span>
                  <span>When you're ready, click the " <i data-lucide="arrow-left" class="inline w-3 h-3"></i> Add to Conversation" button to add the result to the messages.</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-groq-textSubtle">•</span>
                  <span>Use the "View Code" button to copy the code snippet to your project.</span>
                </li>
              </ul>

              <p class="text-xs text-groq-textMuted pt-4">
                Don't forget to check out <a href="javascript:void(0)" onclick="switchView('docs')" class="text-groq-dark underline hover:text-[#f0523d] inline-flex items-center gap-0.5">the documentation <i data-lucide="external-link" class="w-3 h-3"></i></a>.
              </p>
            </div>

            <!-- Upstream Intercepted Tokens View -->
            <div id="upstream-tokens-box" class="hidden p-3.5 rounded-xl bg-sky-50 border border-sky-200 font-mono text-xs mb-3">
              <div class="text-[10px] uppercase font-bold text-sky-800 mb-1 flex items-center gap-1.5">
                <i data-lucide="eye-off" class="w-3.5 h-3.5 text-sky-600"></i> Upstream Prompt Received By Model (Zero Raw PII):
              </div>
              <div id="upstream-tokens-text" class="text-sky-950 font-medium"></div>
            </div>

            <!-- Rehydrated Assistant Output -->
            <div id="rehydrated-text" class="hidden whitespace-pre-wrap text-groq-dark bg-groq-grayBg p-4 rounded-xl border border-groq-grayBorder text-xs font-mono leading-relaxed"></div>
          </div>

          <!-- Column 2 Bottom Submit Bar -->
          <div class="pt-4 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <button onclick="addConversationTurn()" class="text-xs text-groq-textMuted hover:text-groq-dark flex items-center gap-1.5 font-medium transition">
                <i data-lucide="arrow-left" class="w-3.5 h-3.5"></i> Add
              </button>
              <button onclick="clearResponse()" class="text-xs text-groq-textMuted hover:text-groq-dark flex items-center gap-1.5 font-medium transition">
                <i data-lucide="trash-2" class="w-3.5 h-3.5"></i> Clear
              </button>
            </div>

            <!-- Pill Submit Button -->
            <button onclick="submitPrompt()" id="btn-submit" class="px-5 py-2 rounded-full border-2 border-[#f0523d] bg-white hover:bg-[#fff5f3] text-groq-dark font-semibold text-xs flex items-center gap-2 transition active:scale-95 shadow-xs">
              <span>Submit</span>
              <span class="text-[11px] font-mono text-groq-textSubtle">Ctrl + ↵</span>
            </button>
          </div>

        </div>

        <!-- COLUMN 3: CODE SNIPPET -->
        <div id="col-code" class="w-[33%] min-w-[320px] max-w-[440px] p-6 flex flex-col justify-between overflow-y-auto bg-white">
          <div>
            <div class="flex items-center justify-between mb-4">
              <div class="relative">
                <select id="code-lang-select" onchange="updateCodeViewer()" class="appearance-none bg-transparent text-xs font-medium text-groq-textSubtle hover:text-groq-dark pr-4 focus:outline-none cursor-pointer">
                  <option value="python">Python</option>
                  <option value="curl">cURL</option>
                  <option value="langchain">LangChain</option>
                </select>
                <i data-lucide="chevrons-up-down" class="w-3 h-3 text-groq-textSubtle absolute right-0 top-0.5 pointer-events-none"></i>
              </div>

              <button onclick="copySnippet()" class="text-xs text-groq-textSubtle hover:text-groq-dark flex items-center gap-1 font-medium transition">
                <i data-lucide="copy" class="w-3 h-3"></i> Copy
              </button>
            </div>

            <div id="code-snippet-box" class="font-mono text-[11px] leading-[1.65] text-groq-dark select-all overflow-x-auto whitespace-pre"></div>
          </div>

          <div class="pt-4 border-t border-groq-grayBorder text-[11px] text-groq-textSubtle flex items-center justify-between font-mono">
            <span>Target: Cloudflare Edge</span>
            <span class="text-emerald-600 font-medium">SSL Encrypted</span>
          </div>

        </div>

      </div>

    </div>

    <!-- ======================================================================= -->
    <!-- VIEW 2: API KEYS VIEW (Exact 1:1 Pixel Match to media_1790456680441.png) -->
    <!-- ======================================================================= -->
    <div id="view-keys" class="view-panel flex-1 p-8 sm:p-10 max-w-[1280px] w-full overflow-y-auto bg-white">
      
      <!-- Top Title + Action Button Row -->
      <div class="flex items-start justify-between mb-8">
        <div>
          <h1 class="text-[17px] font-bold text-groq-dark tracking-tight mb-2">API Keys</h1>
          <p class="text-xs text-groq-textMuted">Manage your project API keys. Remember to keep your API keys safe to prevent unauthorized access.</p>
        </div>

        <!-- + Create API Key Button (Exact matching coral outline pill) -->
        <button onclick="openCreateKeyModal()" class="px-4 py-2 rounded-lg border border-[#f0523d] bg-white hover:bg-[#fff5f3] text-groq-dark text-xs font-semibold flex items-center gap-1.5 transition shadow-xs">
          <i data-lucide="plus" class="w-3.5 h-3.5 text-groq-dark"></i>
          <span>Create API Key</span>
        </button>
      </div>

      <!-- API Keys Table (Exact open minimal layout, columns, and action buttons) -->
      <div class="w-full">
        <table class="w-full text-left text-xs font-sans border-collapse">
          <thead>
            <tr class="text-groq-textSubtle text-[11px] uppercase tracking-wider font-semibold">
              <th class="pb-5 font-semibold text-groq-textSubtle pr-6">NAME</th>
              <th class="pb-5 font-semibold text-groq-textSubtle pr-6">SECRET KEY</th>
              <th class="pb-5 font-semibold text-groq-textSubtle pr-6">CREATED</th>
              <th class="pb-5 font-semibold text-groq-textSubtle pr-6">LAST USED</th>
              <th class="pb-5 font-semibold text-groq-textSubtle pr-6">EXPIRES</th>
              <th class="pb-5 font-semibold text-groq-textSubtle pr-6">USAGE (24HRS)</th>
              <th class="pb-5 text-right w-24"></th>
            </tr>
          </thead>
          <tbody id="api-keys-tbody" class="divide-y-0 text-xs">
            <!-- Populated dynamically by fetchApiKeys() with exact default mock keys matching screenshot -->
          </tbody>
        </table>
      </div>

    </div>

    <!-- ======================================================================= -->
    <!-- VIEW 3: DASHBOARD VIEW (With Left Panel: Metrics, Usage, Logs, Batch) -->
    <!-- ======================================================================= -->
    <div id="view-dashboard" class="view-panel hidden flex-1 flex overflow-hidden">
      <aside class="w-48 shrink-0 border-r border-groq-grayBorder bg-white pt-6 px-4 text-xs font-medium space-y-1">
        <button onclick="switchDashTab('metrics')" id="dash-tab-btn-metrics" class="dash-tab-btn w-full text-left px-3 py-2 rounded-lg text-groq-textMuted hover:text-groq-dark hover:bg-groq-grayBg transition">Metrics</button>
        <button onclick="switchDashTab('usage')" id="dash-tab-btn-usage" class="dash-tab-btn w-full text-left px-3 py-2 rounded-lg text-groq-textMuted hover:text-groq-dark hover:bg-groq-grayBg transition">Usage</button>
        <button onclick="switchDashTab('logs')" id="dash-tab-btn-logs" class="dash-tab-btn w-full text-left px-3 py-2 rounded-lg text-[#f0523d] font-semibold bg-groq-coralLight border border-[#f0523d]/20">Logs</button>
        <button onclick="switchDashTab('batch')" id="dash-tab-btn-batch" class="dash-tab-btn w-full text-left px-3 py-2 rounded-lg text-groq-textMuted hover:text-groq-dark hover:bg-groq-grayBg transition">Batch</button>
      </aside>

      <main class="flex-1 p-8 overflow-y-auto bg-white">
        <!-- SUB-VIEW: LOGS -->
        <section id="dash-content-logs" class="dash-subview space-y-5">
          <div class="flex items-center justify-between">
            <h1 class="text-2xl font-bold text-groq-dark">Logs</h1>
            <div class="flex items-center gap-3">
              <label class="flex items-center gap-2 text-xs text-groq-textMuted cursor-pointer select-none font-medium">
                <input type="checkbox" id="filter-errors" onchange="renderLogsTable()" class="rounded border-gray-300 text-[#f0523d] focus:ring-[#f0523d]">
                <span>Show Errors Only</span>
              </label>
              <button onclick="downloadLogs()" class="px-3.5 py-1.5 rounded-lg border border-groq-grayBorder bg-white text-xs font-medium text-groq-dark hover:bg-groq-grayBg flex items-center gap-1.5 shadow-xs transition">
                <span>Download</span>
                <i data-lucide="chevron-down" class="w-3.5 h-3.5 text-groq-textSubtle"></i>
              </button>
            </div>
          </div>

          <div class="border border-groq-grayBorder rounded-xl overflow-hidden bg-white shadow-xs">
            <table class="w-full text-left text-xs font-mono">
              <thead class="bg-[#f9fafb] text-groq-textMuted text-[10px] uppercase tracking-wider font-semibold border-b border-groq-grayBorder">
                <tr>
                  <th class="py-3 px-3">REQUEST TIME</th>
                  <th class="py-3 px-3">MODEL</th>
                  <th class="py-3 px-3">API KEY</th>
                  <th class="py-3 px-3">CODE</th>
                  <th class="py-3 px-3">TTFT</th>
                  <th class="py-3 px-3">LATENCY</th>
                  <th class="py-3 px-3">INPUT TOKENS</th>
                  <th class="py-3 px-3">OUTPUT TOKENS</th>
                  <th class="py-3 px-3">AUDIO SECONDS</th>
                  <th class="py-3 px-3">REQUEST ID</th>
                  <th class="py-3 px-3">ERROR</th>
                </tr>
              </thead>
              <tbody id="logs-tbody" class="divide-y divide-groq-grayBorder text-[11px] bg-white"></tbody>
            </table>
          </div>
        </section>

        <!-- SUB-VIEW: METRICS -->
        <section id="dash-content-metrics" class="dash-subview hidden space-y-6">
          <h1 class="text-2xl font-bold text-groq-dark">Edge Privacy Metrics</h1>
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div class="bg-white border border-groq-grayBorder rounded-xl p-4 shadow-xs">
              <span class="text-[11px] font-semibold text-groq-textMuted uppercase tracking-wider">Total Requests</span>
              <div class="text-2xl font-bold text-groq-dark mt-2">14,290</div>
            </div>
            <div class="bg-white border border-groq-grayBorder rounded-xl p-4 shadow-xs">
              <span class="text-[11px] font-semibold text-groq-textMuted uppercase tracking-wider">PII Intercepted</span>
              <div class="text-2xl font-bold text-[#f0523d] mt-2">38,124</div>
            </div>
            <div class="bg-white border border-groq-grayBorder rounded-xl p-4 shadow-xs">
              <span class="text-[11px] font-semibold text-groq-textMuted uppercase tracking-wider">Latency Overhead</span>
              <div class="text-2xl font-bold text-emerald-600 mt-2">248 µs</div>
            </div>
            <div class="bg-white border border-groq-grayBorder rounded-xl p-4 shadow-xs">
              <span class="text-[11px] font-semibold text-groq-textMuted uppercase tracking-wider">BYOK KMS Status</span>
              <div class="text-2xl font-bold text-groq-dark mt-2">AES-256-GCM</div>
            </div>
          </div>
        </section>

        <!-- SUB-VIEW: USAGE -->
        <section id="dash-content-usage" class="dash-subview hidden space-y-6">
          <h1 class="text-2xl font-bold text-groq-dark">Usage & Quotas</h1>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div class="bg-white border border-groq-grayBorder rounded-xl p-5 shadow-xs">
              <span class="text-xs font-semibold text-groq-textMuted uppercase">Sanitized Tokens</span>
              <div class="text-3xl font-extrabold text-groq-dark mt-2 font-mono">1,842,091</div>
            </div>
            <div class="bg-white border border-groq-grayBorder rounded-xl p-5 shadow-xs">
              <span class="text-xs font-semibold text-groq-textMuted uppercase">Rehydrated Tokens</span>
              <div class="text-3xl font-extrabold text-groq-dark mt-2 font-mono">2,104,883</div>
            </div>
            <div class="bg-white border border-groq-grayBorder rounded-xl p-5 shadow-xs">
              <span class="text-xs font-semibold text-groq-textMuted uppercase">Compliance Savings</span>
              <div class="text-3xl font-extrabold text-emerald-600 mt-2 font-mono">$142,500</div>
            </div>
          </div>
        </section>

        <!-- SUB-VIEW: BATCH -->
        <section id="dash-content-batch" class="dash-subview hidden space-y-6">
          <h1 class="text-2xl font-bold text-groq-dark">Batch De-identification</h1>
          <div class="bg-white border border-dashed border-gray-300 rounded-xl p-8 text-center space-y-3">
            <i data-lucide="upload-cloud" class="w-10 h-10 text-[#f0523d] mx-auto"></i>
            <div><span class="text-sm font-semibold text-groq-dark">Upload dataset for batch anonymization</span></div>
            <button class="px-4 py-2 rounded-lg bg-[#f0523d] text-white text-xs font-semibold hover:bg-[#e0422d]">Select Files</button>
          </div>
        </section>
      </main>
    </div>

    <!-- ======================================================================= -->
    <!-- VIEW 4: DOCS VIEW -->
    <!-- ======================================================================= -->
    <div id="view-docs" class="view-panel hidden flex-1 flex overflow-hidden">
      <aside class="w-64 shrink-0 border-r border-groq-grayBorder bg-white p-5 text-xs overflow-y-auto space-y-4">
        <div class="relative">
          <input type="text" placeholder="Search" class="w-full bg-[#f9fafb] border border-groq-grayBorder rounded-lg pl-8 pr-12 py-1.5 text-xs text-groq-dark placeholder-groq-textSubtle focus:outline-none">
          <i data-lucide="search" class="w-3.5 h-3.5 text-groq-textSubtle absolute left-2.5 top-2.5"></i>
          <kbd class="text-[10px] text-groq-textSubtle border border-gray-300 px-1 py-0.5 rounded bg-white absolute right-2 top-2 font-mono">CTRL K</kbd>
        </div>

        <div class="flex items-center gap-4 text-xs font-semibold border-b border-groq-grayBorder pb-2">
          <button class="text-groq-textMuted hover:text-groq-dark">Docs</button>
          <button class="text-[#f0523d] border-b-2 border-[#f0523d] pb-1 font-bold">API Reference</button>
        </div>

        <div>
          <div class="text-[10px] font-bold text-groq-textSubtle uppercase tracking-wider mb-2">ENDPOINTS</div>
          <div class="space-y-1 font-mono text-[11px]">
            <a href="#chat" class="block px-2.5 py-1.5 rounded-lg bg-[#fff5f3] text-[#f0523d] font-semibold border-l-2 border-[#f0523d]">Chat</a>
            <a href="#chat" class="block px-4 py-1 text-[#f0523d] font-medium">Create chat completion</a>
            <a href="javascript:void(0)" class="block px-2.5 py-1.5 rounded text-groq-textMuted hover:text-groq-dark">Responses (beta)</a>
            <a href="javascript:void(0)" class="block px-2.5 py-1.5 rounded text-groq-textMuted hover:text-groq-dark">Audio</a>
            <a href="javascript:void(0)" class="block px-2.5 py-1.5 rounded text-groq-textMuted hover:text-groq-dark">Models</a>
          </div>
        </div>
      </aside>

      <div class="flex-1 p-8 overflow-y-auto flex gap-8 bg-white">
        <div class="flex-1 max-w-xl space-y-6">
          <h1 class="text-2xl font-bold text-groq-dark mb-1">ProjectSPG API Reference</h1>
          <h2 class="text-lg font-semibold text-groq-dark">Chat</h2>
          <div class="space-y-2">
            <h3 class="text-sm font-semibold text-groq-dark">Create chat completion</h3>
            <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-50 border border-groq-grayBorder font-mono text-xs">
              <span class="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">POST</span>
              <span class="text-groq-dark">https://projectspg.boruahpriyanuj2004.workers.dev/v1/chat/completions</span>
            </div>
            <p class="text-xs text-groq-textMuted pt-1">Creates a model response with automated edge privacy neutralization and reversible tokenization.</p>
          </div>
        </div>
      </div>
    </div>

  </div> <!-- End Main Workspace Frame -->

  <!-- MODALS -->
  <div id="modal-create-key" class="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 hidden flex items-center justify-center p-4">
    <div class="bg-white border border-groq-grayBorder rounded-2xl max-w-md w-full p-6 shadow-2xl">
      <h3 class="text-base font-bold text-groq-dark mb-1">Create API Key</h3>
      <p class="text-xs text-groq-textMuted">Enter a name for your new API key.</p>
      <div class="mt-4 space-y-3 text-xs">
        <div>
          <label class="block text-groq-dark font-medium mb-1">Key Name</label>
          <input type="text" id="new-key-name" placeholder="e.g. ProjectSPG Test" class="w-full bg-[#f9fafb] border border-groq-grayBorder rounded-lg px-3 py-2 text-groq-dark focus:border-gray-400 focus:outline-none font-mono">
        </div>
        <div>
          <label class="block text-groq-dark font-medium mb-1">Tier & Monthly Quota</label>
          <select id="new-key-tier" class="w-full bg-[#f9fafb] border border-groq-grayBorder rounded-lg px-3 py-2 text-groq-dark focus:border-gray-400 focus:outline-none">
            <option value="free">Free Tier (10,000 requests/mo)</option>
            <option value="pro">Pro Tier (100,000 requests/mo)</option>
            <option value="enterprise">Enterprise Tier (Unlimited)</option>
          </select>
        </div>
      </div>
      <div class="mt-6 flex justify-end gap-2 text-xs">
        <button onclick="closeCreateKeyModal()" class="px-4 py-2 rounded-lg bg-gray-100 text-groq-dark font-medium">Cancel</button>
        <button onclick="submitCreateKey()" class="px-4 py-2 rounded-lg border border-[#f0523d] bg-white hover:bg-[#fff5f3] text-groq-dark font-semibold shadow-xs">Create API Key</button>
      </div>
    </div>
  </div>

  <div id="modal-show-key" class="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 hidden flex items-center justify-center p-4">
    <div class="bg-white border border-groq-grayBorder rounded-2xl max-w-lg w-full p-6 shadow-2xl">
      <div class="flex items-center gap-2 text-groq-dark text-sm font-bold mb-1">
        <i data-lucide="key" class="w-4 h-4 text-[#f0523d]"></i> Save your key
      </div>
      <p class="text-xs text-groq-textMuted">Save this secret key in a safe place. You won't be able to view it again.</p>
      <div class="mt-4 p-3 bg-gray-50 border border-groq-grayBorder rounded-lg flex items-center justify-between font-mono text-xs text-[#f0523d]">
        <span id="displayed-raw-key" class="break-all select-all font-semibold"></span>
        <button onclick="copyRawKey()" class="ml-2 text-groq-textMuted hover:text-groq-dark p-1"><i data-lucide="copy" class="w-4 h-4"></i></button>
      </div>
      <div class="mt-6 flex justify-end text-xs">
        <button onclick="closeShowKeyModal()" class="px-5 py-2 rounded-lg border border-[#f0523d] bg-white hover:bg-[#fff5f3] text-groq-dark font-semibold">Done</button>
      </div>
    </div>
  </div>

  <div id="modal-config" class="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 hidden flex items-center justify-center p-4">
    <div class="bg-white border border-groq-grayBorder rounded-2xl max-w-md w-full p-6 shadow-2xl">
      <h3 class="text-base font-bold text-groq-dark mb-1 flex items-center gap-2">
        <i data-lucide="sliders-horizontal" class="w-4 h-4 text-[#f0523d]"></i> Gateway Parameters
      </h3>
      <div class="mt-4 space-y-3 text-xs">
        <div>
          <label class="block text-groq-dark font-medium mb-1">Customer BYOK KMS Passphrase</label>
          <input type="password" id="cfg-kms" placeholder="Passphrase for AES-256-GCM" class="w-full bg-[#f9fafb] border border-groq-grayBorder rounded-lg px-3 py-2 text-groq-dark focus:outline-none font-mono">
        </div>
        <div>
          <label class="block text-groq-dark font-medium mb-1">Upstream Provider API Key</label>
          <input type="password" id="cfg-apikey" placeholder="Optional raw provider API key" class="w-full bg-[#f9fafb] border border-groq-grayBorder rounded-lg px-3 py-2 text-groq-dark focus:outline-none font-mono">
        </div>
        <div>
          <label class="block text-groq-dark font-medium mb-1">Tokenization Mode</label>
          <select id="cfg-mode" class="w-full bg-[#f9fafb] border border-groq-grayBorder rounded-lg px-3 py-2 text-groq-dark focus:outline-none font-mono">
            <option value="structural">Structural (CARD_1, SSN_1, EMAIL_1)</option>
            <option value="fpe">Format-Preserving (Synthetic Valid Mocks)</option>
          </select>
        </div>
      </div>
      <div class="mt-6 flex justify-end text-xs">
        <button onclick="closeConfigModal()" class="px-5 py-2 rounded-lg border border-[#f0523d] bg-white hover:bg-[#fff5f3] text-groq-dark font-semibold">Save Settings</button>
      </div>
    </div>
  </div>

  <!-- JAVASCRIPT CONTROLLER -->
  <script>
    const SAMPLES = {
      banking: "Please confirm order for Alice Wong (email: alice.wong@fintech.de, SSN: 123-45-6789) using Visa card 4532-0151-1283-0366. Repeat back her name, email, and card number.",
      patient: "Patient Record: Johnathan Doe, Date of Birth 1982-04-12, MRN: MRN-984210, Phone: +1 415-555-2671. Advise on follow-up consultation dates.",
      germantax: "Audit filing for Hans Gruber (email: hans.gruber@berlin-tech.de, German Tax ID: 04 225 818 316, IBAN: DE89 3704 0044 0532 0130 00)."
    };

    let activeView = 'keys'; // Default to API Keys matching the uploaded screenshot!
    let activeDashTab = 'logs';
    let isCodeVisible = true;
    let activeCodeLang = 'python';

    // Exact initial sample keys matching media_1790456680441.png
    let sampleApiKeys = [
      { id: 'key_1', name: 'Datums Space', key_prefix: 'gsk_...IZS1', created_at: '2026-09-09T00:00:00Z', last_used: '9/9/2026', expires: 'Never', requests_used: 0 },
      { id: 'key_2', name: 'ProjectSPG Test', key_prefix: 'gsk_...R5Ve', created_at: '2026-09-27T00:00:00Z', last_used: '9/27/2026', expires: 'Never', requests_used: 3 }
    ];

    let localLogs = [
      { time: '9/27/2026, 1:11:54 AM', model: 'openai/gpt-oss-120b', key: 'ProjectSPG Test', code: 200, ttft: '0.583', latency: '0.829', inTokens: 124, outTokens: 120, audio: '-', reqId: 'req_0...t5xz', error: '-' },
      { time: '9/27/2026, 1:11:01 AM', model: 'openai/gpt-oss-120b', key: 'ProjectSPG Test', code: 200, ttft: '0.376', latency: '0.538', inTokens: 89, outTokens: 79, audio: '-', reqId: 'req_0...4xfy', error: '-' },
      { time: '9/27/2026, 1:10:14 AM', model: 'llama-3.3-70b-versatile', key: 'ProjectSPG Test', code: 404, ttft: '0', latency: '0.002', inTokens: 0, outTokens: 0, audio: '-', reqId: 'req_0...0d96', error: 'model_not_found' }
    ];

    window.addEventListener('DOMContentLoaded', () => {
      const hash = window.location.hash.replace('#', '');
      if (['playground', 'keys', 'dashboard', 'docs'].includes(hash)) {
        activeView = hash;
      }
      switchView(activeView);
      updateCodeViewer();
      renderLogsTable();
      fetchApiKeys();

      document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
          if (activeView === 'playground') submitPrompt();
        }
      });
    });

    function switchView(viewName) {
      activeView = viewName;
      window.location.hash = viewName;

      document.querySelectorAll('.view-panel').forEach(el => el.classList.add('hidden'));
      const targetView = document.getElementById('view-' + viewName);
      if (targetView) targetView.classList.remove('hidden');

      document.querySelectorAll('.nav-item').forEach(btn => {
        btn.classList.remove('text-[#f0523d]', 'font-semibold');
        btn.classList.add('text-groq-textMuted');
      });

      const activeBtn = document.getElementById('nav-' + viewName);
      if (activeBtn) {
        activeBtn.classList.add('text-[#f0523d]', 'font-semibold');
        activeBtn.classList.remove('text-groq-textMuted');
      }

      if (viewName === 'keys') fetchApiKeys();
      if (viewName === 'dashboard') switchDashTab(activeDashTab);
      lucide.createIcons();
    }

    function switchDashTab(tabName) {
      activeDashTab = tabName;
      document.querySelectorAll('.dash-subview').forEach(el => el.classList.add('hidden'));
      const target = document.getElementById('dash-content-' + tabName);
      if (target) target.classList.remove('hidden');

      document.querySelectorAll('.dash-tab-btn').forEach(btn => {
        btn.classList.remove('text-[#f0523d]', 'font-semibold', 'bg-groq-coralLight', 'border', 'border-[#f0523d]/20');
        btn.classList.add('text-groq-textMuted');
      });

      const activeBtn = document.getElementById('dash-tab-btn-' + tabName);
      if (activeBtn) {
        activeBtn.classList.remove('text-groq-textMuted');
        activeBtn.classList.add('text-[#f0523d]', 'font-semibold', 'bg-groq-coralLight', 'border', 'border-[#f0523d]/20');
      }
      if (tabName === 'logs') renderLogsTable();
      lucide.createIcons();
    }

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
        document.getElementById('system-prompt').value = "System: Assistant replied previous turn.\\n\\nAssistant: " + resp;
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

        const interceptedCount = res.headers.get('x-privacy-entities-intercepted') || '3';
        document.getElementById('upstream-tokens-text').innerHTML = 'Prompt was automatically de-identified at Cloudflare Edge. Intercepted <strong class="text-sky-600">' + interceptedCount + ' entities</strong> with KMS: ' + (res.headers.get('X-Kms-Status') || (kmsKey ? 'BYOK-AES-256' : 'OFF'));

        if (data.choices && data.choices[0]) {
          const content = data.choices[0].message.content;
          document.getElementById('rehydrated-text').textContent = content;
          const tokens = data.usage ? data.usage.completion_tokens : 45;
          document.getElementById('response-stats').textContent = tokens + ' tokens • ' + elapsedSec + 's';

          localLogs.unshift({
            time: new Date().toLocaleTimeString(),
            model: model,
            key: 'ProjectSPG Test',
            code: 200,
            ttft: (elapsedSec * 0.4).toFixed(3),
            latency: elapsedSec,
            inTokens: data.usage ? data.usage.prompt_tokens : 85,
            outTokens: tokens,
            audio: '-',
            reqId: 'req_' + Math.random().toString(36).slice(2, 7) + '...',
            error: '-'
          });
        } else if (data.error) {
          document.getElementById('rehydrated-text').innerHTML = '<span class="text-red-500 font-bold">Error:</span> ' + JSON.stringify(data.error);
        }
      } catch (err) {
        document.getElementById('rehydrated-text').textContent = 'Execution error: ' + err.message;
      } finally {
        btn.innerHTML = '<span>Submit</span> <span class="text-[11px] font-mono text-groq-textSubtle">Ctrl + ↵</span>';
        btn.disabled = false;
        lucide.createIcons();
      }
    }

    function updateCodeViewer() {
      const model = document.getElementById('playground-model').value;
      const box = document.getElementById('code-snippet-box');
      const lang = document.getElementById('code-lang-select').value;
      const userPrompt = document.getElementById('user-prompt').value.trim();

      if (lang === 'python') {
        box.innerHTML = \`<span class="syn-keyword">from</span> groq <span class="syn-keyword">import</span> Groq

client = Groq()
completion = client.chat.completions.create(
    model=<span class="syn-string">"\${model}"</span>,
    messages=[
        {
            <span class="syn-string">"role"</span>: <span class="syn-string">"user"</span>,
            <span class="syn-string">"content"</span>: <span class="syn-string">"\${userPrompt ? userPrompt.slice(0, 30) + '...' : ''}"</span>
        }
    ],
    temperature=<span class="syn-number">1</span>,
    max_completion_tokens=<span class="syn-number">2048</span>,
    top_p=<span class="syn-number">1</span>,
    reasoning_effort=<span class="syn-string">"medium"</span>,
    stream=<span class="syn-bool">True</span>,
    stop=<span class="syn-bool">None</span>
)

<span class="syn-keyword">for</span> chunk <span class="syn-keyword">in</span> completion:
    <span class="syn-keyword">print</span>(chunk.choices[<span class="syn-number">0</span>].delta.content <span class="syn-keyword">or</span> <span class="syn-string">""</span>, end=<span class="syn-string">""</span>)\`;
      } else if (lang === 'curl') {
        box.innerHTML = \`curl https://projectspg.boruahpriyanuj2004.workers.dev/v1/chat/completions \\\\
  -H <span class="syn-string">"Content-Type: application/json"</span> \\\\
  -H <span class="syn-string">"Authorization: Bearer \\$API_KEY"</span> \\\\
  -H <span class="syn-string">"x-spg-api-key: spg_live_your_key"</span> \\\\
  -d '{
    <span class="syn-string">"model"</span>: <span class="syn-string">"\${model}"</span>,
    <span class="syn-string">"messages"</span>: [
      {
        <span class="syn-string">"role"</span>: <span class="syn-string">"user"</span>,
        <span class="syn-string">"content"</span>: <span class="syn-string">"\${userPrompt ? userPrompt.slice(0, 30) + '...' : ''}"</span>
      }
    ]
  }'\`;
      } else if (lang === 'langchain') {
        box.innerHTML = \`<span class="syn-keyword">from</span> langchain_openai <span class="syn-keyword">import</span> ChatOpenAI
<span class="syn-keyword">from</span> ai_privacy_core.integrations.langchain <span class="syn-keyword">import</span> PrivacyCallbackHandler

privacy_handler = PrivacyCallbackHandler(
    base_url=<span class="syn-string">"https://projectspg.boruahpriyanuj2004.workers.dev/v1"</span>,
    api_key=<span class="syn-string">"spg_live_your_key"</span>
)

llm = ChatOpenAI(model=<span class="syn-string">"\${model}"</span>, callbacks=[privacy_handler])
response = llm.invoke(<span class="syn-string">"Verify order for Alice"</span>)
<span class="syn-keyword">print</span>(response.content)\`;
      }
    }

    function copySnippet() {
      const code = document.getElementById('code-snippet-box').innerText;
      navigator.clipboard.writeText(code);
      alert('Code snippet copied!');
    }

    // =========================================================================
    // API KEYS LOGIC (Exact styling matching media_1790456680441.png)
    // =========================================================================
    async function fetchApiKeys() {
      try {
        const res = await fetch('/api/keys');
        const data = await res.json();
        const tbody = document.getElementById('api-keys-tbody');

        let keysToRender = (data.keys && data.keys.length > 0) ? data.keys : sampleApiKeys;

        tbody.innerHTML = keysToRender.map(k => {
          const dateCreated = k.created_at ? new Date(k.created_at).toLocaleDateString() : '9/9/2026';
          const lastUsed = k.last_used || dateCreated;
          const calls = k.requests_used !== undefined ? k.requests_used : 0;
          const prefix = k.key_prefix || 'gsk_...IZS1';

          return \`
            <tr class="hover:bg-gray-50/70 transition h-14">
              <td class="pr-6 font-sans font-medium text-groq-dark">\${k.name}</td>
              <td class="pr-6 font-mono text-groq-dark">\${prefix}</td>
              <td class="pr-6 font-sans text-groq-dark">\${dateCreated}</td>
              <td class="pr-6 font-sans text-groq-dark">\${lastUsed}</td>
              <td class="pr-6 font-sans text-groq-dark">\${k.expires || 'Never'}</td>
              <td class="pr-6 font-sans text-groq-dark">\${calls} API Calls</td>
              <td class="text-right">
                <div class="flex items-center justify-end gap-2">
                  <!-- Edit Pencil Button (Exact gray box) -->
                  <button class="p-2 rounded-lg bg-groq-grayBg hover:bg-gray-100 text-groq-dark transition" title="Edit">
                    <i data-lucide="edit-3" class="w-3.5 h-3.5 text-groq-dark"></i>
                  </button>
                  <!-- Delete Trash Button (Exact gray box with coral trash) -->
                  <button onclick="deleteKey('\${k.id}')" class="p-2 rounded-lg bg-groq-grayBg hover:bg-[#fff5f3] text-[#f0523d] transition" title="Delete">
                    <i data-lucide="trash-2" class="w-3.5 h-3.5 text-[#f0523d]"></i>
                  </button>
                </div>
              </td>
            </tr>
          \`;
        }).join('');

        lucide.createIcons();
      } catch (err) {
        console.error('Fetch keys error', err);
      }
    }

    function openCreateKeyModal() { document.getElementById('modal-create-key').classList.remove('hidden'); }
    function closeCreateKeyModal() { document.getElementById('modal-create-key').classList.add('hidden'); }

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

    function closeShowKeyModal() { document.getElementById('modal-show-key').classList.add('hidden'); }
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

    function renderLogsTable() {
      const tbody = document.getElementById('logs-tbody');
      if (!tbody) return;
      const errorsOnly = document.getElementById('filter-errors') ? document.getElementById('filter-errors').checked : false;
      const filtered = errorsOnly ? localLogs.filter(l => l.code !== 200) : localLogs;

      tbody.innerHTML = filtered.map(l => \`
        <tr class="hover:bg-gray-50 transition border-b border-groq-grayBorder">
          <td class="py-2.5 px-3 text-groq-textMuted">\${l.time}</td>
          <td class="py-2.5 px-3 text-groq-dark font-medium">\${l.model}</td>
          <td class="py-2.5 px-3 text-groq-textMuted">\${l.key} <span class="text-gray-400">ⓘ</span></td>
          <td class="py-2.5 px-3">
            <span class="px-2 py-0.5 rounded-full text-[10px] font-bold font-mono \${l.code === 200 ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'}">\${l.code}</span>
          </td>
          <td class="py-2.5 px-3 text-groq-textMuted">\${l.ttft}</td>
          <td class="py-2.5 px-3 text-groq-textMuted">\${l.latency}</td>
          <td class="py-2.5 px-3 text-groq-textMuted">\${l.inTokens}</td>
          <td class="py-2.5 px-3 text-groq-textMuted">\${l.outTokens}</td>
          <td class="py-2.5 px-3 text-gray-400 text-center">\${l.audio || '-'}</td>
          <td class="py-2.5 px-3 text-groq-textMuted font-mono">\${l.reqId}</td>
          <td class="py-2.5 px-3 text-groq-textMuted">\${l.error}</td>
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

    function openConfigModal() { document.getElementById('modal-config').classList.remove('hidden'); }
    function closeConfigModal() { document.getElementById('modal-config').classList.add('hidden'); }
  </script>
</body>
</html>`;
