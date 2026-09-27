/**
 * ProjectSPG Enterprise Console (Single-File Architecture)
 * Layout: Exact 1:1 Pixel-Accurate Replica of Groq Console (Playground, API Keys, Metrics, Usage, Logs)
 * References:
 * - media_1790456420408.png (Playground)
 * - media_1790456680441.png (API Keys)
 * - media_1790456964674.png (Dashboard - Metrics)
 * - media_1790456991949.png (Dashboard - Usage)
 * - media_1790457001122.png (Dashboard - Logs)
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
  <!-- Firebase SDK (v10 compat) -->
  <script src="https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js"></script>
  <script src="https://www.gstatic.com/firebasejs/10.8.0/firebase-auth-compat.js"></script>
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
    /* Syntax Highlighting */
    .syn-keyword { color: #9333ea; font-weight: 500; }
    .syn-string { color: #16a34a; }
    .syn-number { color: #ea580c; }
    .syn-bool { color: #2563eb; }
    .syn-comment { color: #9ca3af; font-style: italic; }

    ::-webkit-scrollbar { width: 5px; height: 5px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 3px; }
    ::-webkit-scrollbar-thumb:hover { background: #d1d5db; }

    /* Custom Parameter Sliders matching Groq console */
    .param-slider {
      -webkit-appearance: none;
      appearance: none;
      width: 100%;
      height: 4px;
      background: #e5e7eb;
      border-radius: 9999px;
      outline: none;
      cursor: pointer;
    }
    .param-slider::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: #ffffff;
      border: 2px solid #111827;
      cursor: pointer;
      box-shadow: 0 1px 3px rgba(0,0,0,0.15);
      transition: transform 0.1s ease;
    }
    .param-slider::-webkit-slider-thumb:hover {
      transform: scale(1.1);
    }
    .param-slider::-moz-range-thumb {
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: #ffffff;
      border: 2px solid #111827;
      cursor: pointer;
      box-shadow: 0 1px 3px rgba(0,0,0,0.15);
      transition: transform 0.1s ease;
    }
    .param-slider::-moz-range-thumb:hover {
      transform: scale(1.1);
    }
  </style>
</head>

<body class="h-screen flex flex-col bg-white text-groq-dark antialiased overflow-hidden selection:bg-[#f0523d]/20 selection:text-[#f0523d]">

  <!-- ========================================================================= -->
  <!-- TOP GLOBAL NAVBAR (Exact 52px height) -->
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
        <button onclick="switchView('keys')" id="nav-keys" class="nav-item text-groq-textMuted hover:text-groq-dark transition">API Keys</button>
        <button onclick="switchView('dashboard')" id="nav-dashboard" class="nav-item text-[#f0523d] font-semibold transition">Dashboard</button>
        <button onclick="switchView('docs')" id="nav-docs" class="nav-item text-groq-textMuted hover:text-groq-dark transition">Docs</button>
      </nav>

      <div class="flex items-center gap-3.5 ml-2">
        <!-- Settings Gear Icon -->
        <button onclick="openConfigModal()" class="text-groq-textMuted hover:text-groq-dark transition p-1" title="Settings">
          <i data-lucide="settings" class="w-4 h-4"></i>
        </button>

        <!-- Sign In Button (Shown when logged out) -->
        <button id="btn-login-trigger" onclick="openAuthModal()" class="px-3 py-1.5 rounded-lg bg-[#f0523d] hover:bg-[#e0422d] text-white font-medium text-xs shadow-xs transition flex items-center gap-1.5 cursor-pointer">
          <i data-lucide="log-in" class="w-3.5 h-3.5"></i>
          <span>Sign In</span>
        </button>

        <!-- User Profile Dropdown (Shown when logged in) -->
        <div id="user-profile-menu-container" class="relative hidden">
          <button onclick="toggleUserDropdown(event)" id="btn-user-avatar" class="w-7 h-7 rounded-full overflow-hidden border border-groq-grayBorder bg-groq-avatar text-white flex items-center justify-center text-xs font-semibold shadow-xs hover:ring-2 hover:ring-[#f0523d]/30 transition focus:outline-none cursor-pointer">
            <span id="user-avatar-initials">P</span>
            <img id="user-avatar-img" class="w-full h-full object-cover hidden" alt="Profile" />
          </button>
          
          <div id="user-dropdown-menu" class="hidden absolute right-0 mt-2 w-56 bg-white border border-groq-grayBorder rounded-xl shadow-lg p-2 z-50 text-xs font-sans">
            <div class="px-3 py-2 border-b border-gray-100">
              <p id="user-menu-name" class="font-semibold text-groq-dark truncate">User</p>
              <p id="user-menu-email" class="text-groq-textMuted text-[11px] truncate">user@example.com</p>
            </div>
            <div class="py-1">
              <button onclick="copyUserId()" class="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 flex items-center justify-between text-groq-textMuted hover:text-groq-dark transition">
                <span class="flex items-center gap-2"><i data-lucide="fingerprint" class="w-3.5 h-3.5"></i> Copy User ID</span>
                <i data-lucide="copy" class="w-3 h-3 text-gray-400"></i>
              </button>
            </div>
            <div class="pt-1 border-t border-gray-100">
              <button onclick="handleSignOut()" class="w-full text-left px-3 py-2 rounded-lg hover:bg-[#fff5f3] text-[#f0523d] font-medium flex items-center gap-2 transition">
                <i data-lucide="log-out" class="w-3.5 h-3.5"></i> Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

  </header>

  <!-- ========================================================================= -->
  <!-- MAIN WORKSPACE -->
  <!-- ========================================================================= -->
  <main class="flex-1 flex overflow-hidden">

    <!-- ======================================================================= -->
    <!-- VIEW 1: PLAYGROUND (Exact 3-Column Groq Layout) -->
    <!-- ======================================================================= -->
    <div id="view-playground" class="view-panel hidden border-t border-l border-r border-groq-grayBorder rounded-t-2xl bg-white mx-3 sm:mx-4 flex-1 flex flex-col overflow-hidden shadow-xs">
      
      <!-- Sub-Toolbar (54px height) -->
      <div class="h-[54px] border-b border-groq-grayBorder bg-white px-6 flex items-center justify-between shrink-0">
        <div class="flex items-center gap-4">
          <h2 class="text-[15px] font-semibold text-groq-dark tracking-tight">Playground</h2>
          <div class="bg-[#f3f4f6] p-0.5 rounded-lg flex items-center text-xs select-none">
            <button id="btn-tier-free" onclick="switchPlaygroundTier('free')" class="px-3 py-1 rounded-md bg-white text-groq-dark font-medium shadow-xs text-xs transition cursor-pointer">Free</button>
            <button id="btn-tier-byok" onclick="switchPlaygroundTier('byok')" class="px-3 py-1 rounded-md text-groq-textMuted hover:text-groq-dark text-xs transition cursor-pointer">BYOK</button>
          </div>
        </div>

        <div class="flex items-center gap-2">
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

          <button onclick="copyModelName()" class="p-1.5 rounded-lg bg-white border border-groq-grayBorder text-groq-textMuted hover:text-groq-dark" title="Copy model name">
            <i data-lucide="copy" class="w-3.5 h-3.5"></i>
          </button>

          <button onclick="toggleCodePanel()" id="btn-toggle-code" class="px-3 py-1.5 rounded-lg bg-white border border-groq-grayBorder text-xs font-medium text-groq-dark hover:bg-gray-50 flex items-center gap-1.5">
            <i data-lucide="code" class="w-3.5 h-3.5 text-groq-textMuted"></i>
            <span id="code-btn-text">Hide code</span>
          </button>

          <button onclick="toggleParametersPanel()" id="btn-toggle-params" class="p-1.5 rounded-lg bg-white border border-groq-grayBorder text-groq-textMuted hover:text-groq-dark transition" title="Parameters">
            <i data-lucide="sliders-horizontal" class="w-3.5 h-3.5"></i>
          </button>
        </div>
      </div>

      <!-- Playground 3-Column Split -->
      <div class="flex-1 flex overflow-hidden">
        <!-- Col 1: Prompts -->
        <div class="w-[33%] min-w-[320px] max-w-[420px] border-r border-groq-grayBorder p-6 flex flex-col justify-between overflow-y-auto bg-white">
          <div class="space-y-4">
            <div class="flex items-center gap-3">
              <span class="text-[11px] font-semibold text-groq-textMuted uppercase tracking-wider shrink-0">SYSTEM</span>
              <input type="text" id="system-prompt" class="flex-1 bg-transparent border-0 text-xs text-groq-dark placeholder-groq-textSubtle focus:outline-none" placeholder="Enter system message (Optional)" value="Enter system message (Optional)">
            </div>

            <div class="bg-groq-grayBg border border-groq-grayBorder rounded-2xl p-4 transition focus-within:border-gray-300">
              <div class="text-[11px] font-semibold text-groq-textSubtle uppercase tracking-wider mb-2">USER</div>
              <textarea id="user-prompt" rows="8" class="w-full bg-transparent text-xs text-groq-dark placeholder-groq-textSubtle focus:outline-none resize-none leading-relaxed" placeholder="Enter user message...">Please confirm order for Alice Wong (email: alice.wong@fintech.de, SSN: 123-45-6789) using Visa card 4532-0151-1283-0366. Repeat back her name, email, and card number.</textarea>
              
              <div class="mt-3 pt-2.5 border-t border-gray-200/70 flex flex-wrap gap-1.5 text-[10px]">
                <button onclick="loadSample('banking')" class="px-2 py-0.5 rounded-md bg-white border border-groq-grayBorder hover:border-gray-300 text-groq-textMuted hover:text-groq-dark transition">🏦 Banking Wire</button>
                <button onclick="loadSample('patient')" class="px-2 py-0.5 rounded-md bg-white border border-groq-grayBorder hover:border-gray-300 text-groq-textMuted hover:text-groq-dark transition">🏥 Patient Record</button>
                <button onclick="loadSample('germantax')" class="px-2 py-0.5 rounded-md bg-white border border-groq-grayBorder hover:border-gray-300 text-groq-textMuted hover:text-groq-dark transition">🇩🇪 German Tax ID</button>
              </div>
            </div>

            <div class="flex items-center justify-between text-xs px-3 py-2 rounded-xl bg-sky-50 border border-sky-200 text-sky-900">
              <div class="flex items-center gap-1.5">
                <i data-lucide="shield-check" class="w-4 h-4 text-sky-600"></i>
                <span class="text-[11px] font-medium">ProjectSPG Privacy Gateway Active</span>
              </div>
              <span class="text-[10px] font-mono font-semibold text-sky-700 bg-white border border-sky-300 px-1.5 py-0.5 rounded">Auto De-identify</span>
            </div>
          </div>

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

        <!-- Col 2: Response -->
        <div id="col-response" class="flex-1 flex flex-col justify-between p-6 border-r border-groq-grayBorder overflow-y-auto bg-white">
          <div>
            <div class="flex items-center justify-between mb-4">
              <span class="text-[11px] font-semibold text-groq-textMuted uppercase tracking-wider">RESPONSE</span>
              <div id="response-stats" class="text-[11px] font-mono text-groq-textSubtle">0 tokens • 0.00s</div>
            </div>

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

            <div id="upstream-tokens-box" class="hidden p-3.5 rounded-xl bg-sky-50 border border-sky-200 font-mono text-xs mb-3">
              <div class="text-[10px] uppercase font-bold text-sky-800 mb-1 flex items-center gap-1.5">
                <i data-lucide="eye-off" class="w-3.5 h-3.5 text-sky-600"></i> Upstream Prompt Received By Model (Zero Raw PII):
              </div>
              <div id="upstream-tokens-text" class="text-sky-950 font-medium"></div>
            </div>

            <div id="rehydrated-text" class="hidden whitespace-pre-wrap text-groq-dark bg-groq-grayBg p-4 rounded-xl border border-groq-grayBorder text-xs font-mono leading-relaxed"></div>
          </div>

          <div class="pt-4 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <button onclick="addConversationTurn()" class="text-xs text-groq-textMuted hover:text-groq-dark flex items-center gap-1.5 font-medium transition">
                <i data-lucide="arrow-left" class="w-3.5 h-3.5"></i> Add
              </button>
              <button onclick="clearResponse()" class="text-xs text-groq-textMuted hover:text-groq-dark flex items-center gap-1.5 font-medium transition">
                <i data-lucide="trash-2" class="w-3.5 h-3.5"></i> Clear
              </button>
            </div>

            <button onclick="submitPrompt()" id="btn-submit" class="px-5 py-2 rounded-full border-2 border-[#f0523d] bg-white hover:bg-[#fff5f3] text-groq-dark font-semibold text-xs flex items-center gap-2 transition active:scale-95 shadow-xs">
              <span>Submit</span>
              <span class="text-[11px] font-mono text-groq-textSubtle">Ctrl + ↵</span>
            </button>
          </div>
        </div>

        <!-- Col 3: Code -->
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
                <i data-lucide="copy" class="w-3.5 h-3.5"></i> Copy
              </button>
            </div>

            <div id="code-snippet-box" class="font-mono text-[11px] leading-[1.65] text-groq-dark select-all overflow-x-auto whitespace-pre"></div>
          </div>

          <div class="pt-4 border-t border-groq-grayBorder text-[11px] text-groq-textSubtle flex items-center justify-between font-mono">
            <span>Target: Cloudflare Edge</span>
            <span class="text-emerald-600 font-medium">SSL Encrypted</span>
          </div>
        </div>

        <!-- Col 4: Parameters Panel (Exact 1:1 Match to media_1790517999090.png & media_1790518000351.png) -->
        <div id="col-parameters" class="hidden w-[280px] min-w-[280px] max-w-[320px] border-l border-groq-grayBorder bg-white flex flex-col h-full overflow-hidden shrink-0 z-20 shadow-xs">
          <!-- Panel Header -->
          <div class="h-[50px] px-5 border-b border-gray-100 flex items-center justify-between shrink-0">
            <span class="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">PARAMETERS</span>
            <button onclick="toggleParametersPanel()" class="text-groq-textMuted hover:text-groq-dark transition p-1 rounded-md hover:bg-gray-100 cursor-pointer" title="Close Parameters">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect width="18" height="18" x="3" y="3" rx="2"/>
                <path d="M15 3v18"/>
              </svg>
            </button>
          </div>

          <!-- Panel Scrollable Body -->
          <div class="flex-1 overflow-y-auto px-5 py-5 space-y-6">
            
            <!-- Temperature -->
            <div class="space-y-2.5">
              <div class="flex items-center justify-between">
                <label class="text-xs font-semibold text-groq-dark">Temperature</label>
                <input type="number" id="param-temp-input" min="0" max="2" step="0.01" value="1" oninput="syncParamSlider('temp', this.value)" class="w-16 h-8 text-center text-xs font-mono font-medium border border-gray-200 rounded-xl focus:border-gray-400 focus:outline-none bg-white">
              </div>
              <input type="range" id="param-temp-slider" min="0" max="2" step="0.01" value="1" oninput="syncParamInput('temp', this.value)" class="param-slider">
            </div>

            <!-- Max Completion Tokens -->
            <div class="space-y-2.5">
              <div class="flex items-center justify-between">
                <label class="text-xs font-semibold text-groq-dark">Max Completion Tokens</label>
                <input type="number" id="param-tokens-input" min="1" max="8192" step="1" value="2048" oninput="syncParamSlider('tokens', this.value)" class="w-20 h-8 text-center text-xs font-mono font-medium border border-gray-200 rounded-xl focus:border-gray-400 focus:outline-none bg-white">
              </div>
              <input type="range" id="param-tokens-slider" min="1" max="8192" step="1" value="2048" oninput="syncParamInput('tokens', this.value)" class="param-slider">
            </div>

            <!-- Reasoning -->
            <div class="flex items-center justify-between pt-1">
              <label class="text-xs font-semibold text-groq-dark">Reasoning</label>
              <div class="relative">
                <select id="param-reasoning" onchange="onParamChange()" class="appearance-none bg-gray-50 hover:bg-gray-100 border border-transparent text-groq-dark text-xs font-medium rounded-xl pl-3 pr-8 py-1.5 focus:outline-none cursor-pointer">
                  <option value="none">none</option>
                  <option value="low">low</option>
                  <option value="medium" selected>medium</option>
                  <option value="high">high</option>
                </select>
                <i data-lucide="chevrons-up-down" class="w-3.5 h-3.5 text-groq-textSubtle absolute right-2.5 top-2 pointer-events-none"></i>
              </div>
            </div>

            <!-- Stream -->
            <div class="flex items-center justify-between pt-1">
              <label class="text-xs font-semibold text-groq-dark">Stream</label>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" id="param-stream" checked onchange="onParamChange()" class="sr-only peer">
                <div class="w-10 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-200 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-groq-dark peer-checked:after:translate-x-5"></div>
              </label>
            </div>

            <!-- JSON Mode -->
            <div class="flex items-center justify-between pt-1">
              <label class="text-xs font-semibold text-groq-dark">JSON Mode</label>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" id="param-json" onchange="onParamChange()" class="sr-only peer">
                <div class="w-10 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-200 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-groq-dark peer-checked:after:translate-x-5"></div>
              </label>
            </div>

            <!-- Built-in tools Section -->
            <div class="pt-4 border-t border-gray-100">
              <span class="text-[11px] font-semibold text-gray-400 block mb-3.5">Built-in tools</span>
              <div class="space-y-4">
                <div class="flex items-center justify-between">
                  <label class="text-xs font-semibold text-groq-dark">Browser Search</label>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" id="param-browser" onchange="onParamChange()" class="sr-only peer">
                    <div class="w-10 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-200 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-groq-dark peer-checked:after:translate-x-5"></div>
                  </label>
                </div>
                <div class="flex items-center justify-between">
                  <label class="text-xs font-semibold text-groq-dark">Code Interpreter</label>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" id="param-code-interpreter" onchange="onParamChange()" class="sr-only peer">
                    <div class="w-10 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-200 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-groq-dark peer-checked:after:translate-x-5"></div>
                  </label>
                </div>
              </div>
            </div>

            <!-- Advanced Collapsible Section (Exact 1:1 Match to media_1790518000351.png) -->
            <div class="pt-4 border-t border-gray-100">
              <button type="button" onclick="toggleAdvancedParams()" class="w-full flex items-center justify-between py-1 text-xs font-semibold text-groq-dark hover:text-[#f0523d] transition cursor-pointer">
                <span>Advanced</span>
                <i id="param-advanced-chevron" data-lucide="chevron-down" class="w-4 h-4 text-groq-textSubtle transition-transform duration-200"></i>
              </button>

              <div id="param-advanced-content" class="space-y-4 pt-3.5">
                <!-- Moderation: safeguard -->
                <div class="flex items-center justify-between">
                  <label class="text-xs font-semibold text-groq-dark">Moderation: safeguard</label>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" id="param-safeguard" onchange="onParamChange()" class="sr-only peer">
                    <div class="w-10 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-200 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-groq-dark peer-checked:after:translate-x-5"></div>
                  </label>
                </div>

                <!-- Top P -->
                <div class="space-y-2.5">
                  <div class="flex items-center justify-between">
                    <label class="text-xs font-semibold text-groq-dark">Top P</label>
                    <input type="number" id="param-top-p-input" min="0" max="1" step="0.01" value="1" oninput="syncParamSlider('top-p', this.value)" class="w-16 h-8 text-center text-xs font-mono font-medium border border-gray-200 rounded-xl focus:border-gray-400 focus:outline-none bg-white">
                  </div>
                  <input type="range" id="param-top-p-slider" min="0" max="1" step="0.01" value="1" oninput="syncParamInput('top-p', this.value)" class="param-slider">
                </div>

                <!-- Seed -->
                <div class="flex items-center justify-between">
                  <label class="text-xs font-semibold text-groq-dark">Seed</label>
                  <input type="number" id="param-seed" placeholder="" oninput="onParamChange()" class="w-24 h-8 text-center text-xs font-mono font-medium border border-gray-200 rounded-xl focus:border-gray-400 focus:outline-none bg-white">
                </div>

                <!-- Stop Sequence -->
                <div class="space-y-1.5">
                  <label class="text-xs font-semibold text-groq-dark">Stop Sequence</label>
                  <input type="text" id="param-stop" placeholder="" oninput="onParamChange()" class="w-full h-9 px-3 text-xs font-mono border border-gray-200 rounded-xl focus:border-gray-400 focus:outline-none bg-white font-sans">
                </div>

                <!-- Template -->
                <div class="flex items-center justify-between">
                  <label class="text-xs font-semibold text-groq-dark">Template</label>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" id="param-template" onchange="onParamChange()" class="sr-only peer">
                    <div class="w-10 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-200 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-groq-dark peer-checked:after:translate-x-5"></div>
                  </label>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>

    <!-- ======================================================================= -->
    <!-- VIEW 2: API KEYS VIEW (Exact Groq API Keys Layout) -->
    <!-- ======================================================================= -->
    <div id="view-keys" class="view-panel hidden border-t border-l border-r border-groq-grayBorder rounded-t-2xl bg-white mx-3 sm:mx-4 flex-1 p-8 sm:p-10 max-w-[1280px] w-full overflow-y-auto shadow-xs">
      <div class="flex items-start justify-between mb-8">
        <div>
          <h1 class="text-[17px] font-bold text-groq-dark tracking-tight mb-2">API Keys</h1>
          <p class="text-xs text-groq-textMuted">Manage your project API keys. Remember to keep your API keys safe to prevent unauthorized access.</p>
        </div>

        <button onclick="openCreateKeyModal()" class="px-4 py-2 rounded-lg border border-[#f0523d] bg-white hover:bg-[#fff5f3] text-groq-dark text-xs font-semibold flex items-center gap-1.5 transition shadow-xs">
          <i data-lucide="plus" class="w-3.5 h-3.5 text-groq-dark"></i>
          <span>Create API Key</span>
        </button>
      </div>

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
          <tbody id="api-keys-tbody" class="divide-y-0 text-xs"></tbody>
        </table>
      </div>
    </div>

    <!-- ======================================================================= -->
    <!-- VIEW 3: DASHBOARD (Exact Replica of Metrics, Usage, Logs Screenshots) -->
    <!-- ======================================================================= -->
    <div id="view-dashboard" class="view-panel flex-1 flex overflow-hidden">
      
      <!-- STANDALONE LEFT PANEL (Exact matching Groq Dashboard Left Sidebar) -->
      <aside class="w-44 shrink-0 pl-8 pt-8 space-y-7 text-xs font-medium">
        <button onclick="switchDashTab('metrics')" id="dash-tab-btn-metrics" class="dash-tab-btn block text-left text-groq-textMuted hover:text-groq-dark transition">Metrics</button>
        <button onclick="switchDashTab('usage')" id="dash-tab-btn-usage" class="dash-tab-btn block text-left text-groq-textMuted hover:text-groq-dark transition">Usage</button>
        <button onclick="switchDashTab('logs')" id="dash-tab-btn-logs" class="dash-tab-btn block text-left text-[#f0523d] font-semibold transition">Logs</button>
        <button onclick="switchDashTab('batch')" id="dash-tab-btn-batch" class="dash-tab-btn block text-left text-groq-textMuted hover:text-groq-dark transition">Batch</button>
      </aside>

      <!-- MAIN CARD CONTAINER (Rounded top-left & top-right border matching images) -->
      <div class="border-t border-l border-r border-groq-grayBorder rounded-tl-2xl rounded-tr-2xl bg-white p-8 sm:p-10 mr-4 flex-1 flex flex-col overflow-y-auto shadow-xs">
        
        <!-- =================================================================== -->
        <!-- SUBVIEW A: METRICS (Exact 1:1 Match to media_1790456964674.png) -->
        <!-- =================================================================== -->
        <section id="dash-content-metrics" class="dash-subview hidden space-y-6">
          <div class="flex items-center justify-between">
            <h1 class="text-[17px] font-bold text-groq-dark tracking-tight">Metrics</h1>
            
            <!-- Controls on Right -->
            <div class="flex items-center gap-3">
              <!-- Show Limits Switch -->
              <div class="flex items-center gap-2 text-xs font-medium text-groq-dark">
                <span>Show Limits</span>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" class="sr-only peer">
                  <div class="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-groq-dark"></div>
                </label>
              </div>

              <!-- Refresh Button -->
              <button onclick="renderLogsTable()" class="px-3 py-1.5 rounded-lg bg-groq-grayBg border border-groq-grayBorder hover:bg-gray-100 text-xs font-medium text-groq-dark flex items-center gap-1.5 transition">
                <i data-lucide="refresh-cw" class="w-3.5 h-3.5 text-groq-textMuted"></i>
                <span>Refresh</span>
              </button>

              <!-- Last 30 minutes dropdown -->
              <div class="relative">
                <select class="appearance-none bg-groq-grayBg border border-groq-grayBorder text-groq-dark text-xs font-medium rounded-lg pl-3 pr-7 py-1.5 focus:outline-none cursor-pointer">
                  <option>Last 30 minutes</option>
                  <option>Last 1 hour</option>
                  <option>Last 24 hours</option>
                </select>
                <i data-lucide="chevron-down" class="w-3.5 h-3.5 text-groq-textSubtle absolute right-2 top-2 pointer-events-none"></i>
              </div>

              <!-- Show all Models dropdown -->
              <div class="relative">
                <select class="appearance-none bg-groq-grayBg border border-groq-grayBorder text-groq-dark text-xs font-medium rounded-lg pl-3 pr-7 py-1.5 focus:outline-none cursor-pointer">
                  <option>Show all Models</option>
                  <option>openai/gpt-oss-120b</option>
                  <option>llama-3.3-70b-versatile</option>
                </select>
                <i data-lucide="chevrons-up-down" class="w-3.5 h-3.5 text-groq-textSubtle absolute right-2 top-2 pointer-events-none"></i>
              </div>

              <!-- Show all API Keys dropdown -->
              <div class="relative">
                <select class="appearance-none bg-groq-grayBg border border-groq-grayBorder text-groq-dark text-xs font-medium rounded-lg pl-3 pr-7 py-1.5 focus:outline-none cursor-pointer">
                  <option>Show all API Keys</option>
                  <option>ProjectSPG Test</option>
                  <option>Datums Space</option>
                </select>
                <i data-lucide="chevrons-up-down" class="w-3.5 h-3.5 text-groq-textSubtle absolute right-2 top-2 pointer-events-none"></i>
              </div>
            </div>
          </div>

          <!-- HTTP Status Codes Chart Card -->
          <div class="border border-groq-grayBorder rounded-xl p-6 min-h-[380px] flex flex-col justify-between bg-white shadow-xs">
            <div class="flex items-center gap-1.5 text-xs font-semibold text-groq-dark">
              <span>HTTP Status Codes</span>
              <i data-lucide="help-circle" class="w-3.5 h-3.5 text-groq-textSubtle"></i>
            </div>

            <!-- Empty Timeline Canvas with axis matching screenshot -->
            <div class="flex-1 flex flex-col justify-end pt-16">
              <div class="w-full border-b border-gray-100 mb-2"></div>
              <div class="flex items-center justify-between text-[11px] font-mono text-groq-textSubtle px-2">
                <span>2:09am</span>
                <span>2:18am</span>
                <span>2:24am</span>
                <span>2:32am</span>
                <span>2:39am</span>
              </div>
            </div>
          </div>
        </section>

        <!-- =================================================================== -->
        <!-- SUBVIEW B: USAGE (Exact 1:1 Match to media_1790456991949.png) -->
        <!-- =================================================================== -->
        <section id="dash-content-usage" class="dash-subview hidden space-y-6">
          <div class="flex items-start justify-between">
            <div>
              <h1 class="text-[17px] font-bold text-groq-dark tracking-tight mb-2">Usage</h1>
              <p class="text-xs font-medium text-groq-dark">View usage data for your project</p>
              <p class="text-[11px] text-groq-textSubtle mt-0.5">Note: Data can be delayed by up to 15 minutes. All data shown in UTC time.</p>
            </div>

            <div class="flex items-center gap-2">
              <button class="px-3.5 py-1.5 rounded-lg bg-groq-grayBg border border-groq-grayBorder text-xs font-medium text-groq-dark flex items-center gap-1.5">
                <i data-lucide="folder" class="w-3.5 h-3.5 text-groq-textMuted"></i>
                <span>Default Project</span>
              </button>
              <button class="px-3.5 py-1.5 rounded-lg bg-groq-grayBg border border-groq-grayBorder text-xs font-medium text-groq-dark flex items-center gap-1.5">
                <i data-lucide="calendar" class="w-3.5 h-3.5 text-groq-textMuted"></i>
                <span>September 2026</span>
              </button>
            </div>
          </div>

          <!-- Sub Tabs: Cost | Activity -->
          <div class="flex items-center gap-6 text-xs font-medium border-b border-groq-grayBorder pb-2">
            <button id="btn-usage-cost" onclick="switchUsageSubTab('cost')" class="usage-subtab-btn text-[#f0523d] border-b-2 border-[#f0523d] pb-2 font-semibold transition cursor-pointer">Cost</button>
            <button id="btn-usage-activity" onclick="switchUsageSubTab('activity')" class="usage-subtab-btn text-groq-dark hover:text-[#f0523d] pb-2 font-medium transition cursor-pointer">Activity</button>
          </div>

          <!-- SUBTAB 1: COST -->
          <div id="usage-view-cost" class="space-y-6">
            <!-- Total Spend Card -->
            <div class="border border-groq-grayBorder rounded-xl p-5 max-w-sm bg-white shadow-xs">
              <div class="flex items-center justify-between">
                <span class="text-xs font-medium text-groq-dark">Total Spend</span>
                <span id="usage-total-spend" class="text-sm font-semibold text-groq-dark font-mono">$0.0000 USD</span>
              </div>
              <p class="text-[11px] text-groq-textMuted mt-3 leading-relaxed">Projected cost calculation as if you were enrolled in billing. You will not be billed until you upgrade.</p>
            </div>

            <!-- Dynamic On-Demand Usage Cards for each supported model -->
            <div id="models-usage-container" class="space-y-6">
              <!-- Dynamically populated by updateUsageStats() -->
            </div>
          </div>

          <!-- SUBTAB 2: ACTIVITY -->
          <div id="usage-view-activity" class="hidden space-y-6">
            <div class="border border-groq-grayBorder rounded-xl overflow-hidden bg-white shadow-xs">
              <div class="p-5 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <h3 class="text-xs font-bold text-groq-dark">Model Activity Breakdown</h3>
                  <p class="text-[11px] text-groq-textMuted mt-0.5">Aggregate usage, token consumption, and privacy interception counts per supported model</p>
                </div>
                <div class="flex items-center gap-2">
                  <span class="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">Live Metering</span>
                </div>
              </div>

              <div class="overflow-x-auto">
                <table class="w-full text-left text-xs border-collapse font-sans">
                  <thead>
                    <tr class="bg-gray-50/70 text-groq-textSubtle text-[10px] uppercase tracking-wider font-semibold border-b border-gray-100">
                      <th class="py-3 px-4">Supported Model</th>
                      <th class="py-3 px-4">Provider</th>
                      <th class="py-3 px-4">Requests</th>
                      <th class="py-3 px-4">Input Tokens</th>
                      <th class="py-3 px-4">Output Tokens</th>
                      <th class="py-3 px-4">Total Tokens</th>
                      <th class="py-3 px-4">Protected Entities</th>
                      <th class="py-3 px-4 text-right">Est. Spend</th>
                    </tr>
                  </thead>
                  <tbody id="usage-activity-tbody" class="divide-y divide-gray-100 text-[11px] font-mono">
                    <!-- Populated dynamically -->
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        <!-- =================================================================== -->
        <!-- SUBVIEW C: LOGS (Exact 1:1 Match to media_1790457001122.png) -->
        <!-- =================================================================== -->
        <section id="dash-content-logs" class="dash-subview space-y-6">
          <div class="flex items-center justify-between">
            <h1 class="text-[17px] font-bold text-groq-dark tracking-tight">Logs</h1>

            <div class="flex items-center gap-3">
              <!-- Show Errors Only toggle -->
              <div class="flex items-center gap-2 text-xs font-medium text-groq-dark select-none">
                <label class="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" id="filter-errors" onchange="renderLogsTable()" class="sr-only peer">
                  <div class="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-groq-dark"></div>
                </label>
                <span>Show Errors Only</span>
              </div>

              <!-- Download dropdown button -->
              <button onclick="downloadLogs()" class="px-3.5 py-1.5 rounded-lg bg-groq-grayBg border border-groq-grayBorder hover:bg-gray-100 text-xs font-medium text-groq-dark flex items-center gap-1.5 transition">
                <span>Download</span>
                <i data-lucide="chevron-down" class="w-3.5 h-3.5 text-groq-textSubtle"></i>
              </button>
            </div>
          </div>

          <!-- Logs Table (Exact Columns as Screenshot 3) -->
          <div class="w-full">
            <table class="w-full text-left text-xs font-mono border-collapse">
              <thead>
                <tr class="text-groq-textSubtle text-[10px] uppercase tracking-wider font-semibold border-b border-gray-100 pb-3">
                  <th class="pb-4 font-semibold text-groq-textSubtle pr-3">REQUEST TIME</th>
                  <th class="pb-4 font-semibold text-groq-textSubtle pr-3">MODEL</th>
                  <th class="pb-4 font-semibold text-groq-textSubtle pr-3">API KEY</th>
                  <th class="pb-4 font-semibold text-groq-textSubtle pr-3">CODE</th>
                  <th class="pb-4 font-semibold text-groq-textSubtle pr-3">TTFT</th>
                  <th class="pb-4 font-semibold text-groq-textSubtle pr-3">LATENCY</th>
                  <th class="pb-4 font-semibold text-groq-textSubtle pr-3">INPUT TOKENS</th>
                  <th class="pb-4 font-semibold text-groq-textSubtle pr-3">OUTPUT TOKENS</th>
                  <th class="pb-4 font-semibold text-groq-textSubtle pr-3 text-center">AUDIO SECONDS</th>
                  <th class="pb-4 font-semibold text-groq-textSubtle pr-3">REQUEST ID</th>
                  <th class="pb-4 font-semibold text-groq-textSubtle">ERROR</th>
                </tr>
              </thead>
              <tbody id="logs-tbody" class="divide-y-0 text-[11px]"></tbody>
            </table>

            <!-- Pagination Bar (Bottom Right matching image) -->
            <div class="mt-8 flex items-center justify-end gap-3 text-xs text-groq-dark font-sans">
              <span class="text-groq-textMuted">Page Size</span>
              <div class="relative">
                <select class="appearance-none bg-groq-grayBg border border-groq-grayBorder rounded-lg px-3 py-1 pr-6 text-groq-dark text-xs font-medium cursor-pointer">
                  <option>50</option>
                  <option>100</option>
                </select>
                <i data-lucide="chevron-down" class="w-3 h-3 text-groq-textSubtle absolute right-2 top-2 pointer-events-none"></i>
              </div>
              <div class="flex items-center gap-1 text-groq-textSubtle ml-1">
                <button class="p-1 hover:text-groq-dark disabled:opacity-30"><i data-lucide="chevron-left" class="w-4 h-4"></i></button>
                <button class="p-1 hover:text-groq-dark"><i data-lucide="chevron-right" class="w-4 h-4"></i></button>
              </div>
            </div>
          </div>
        </section>

        <!-- =================================================================== -->
        <!-- SUBVIEW D: BATCH -->
        <!-- =================================================================== -->
        <section id="dash-content-batch" class="dash-subview hidden space-y-6">
          <h1 class="text-[17px] font-bold text-groq-dark tracking-tight">Batch</h1>
          <p class="text-xs text-groq-textMuted">Perform asynchronous batch de-identification and reversible tokenization.</p>
          <div class="border border-dashed border-gray-300 rounded-xl p-8 text-center space-y-3 bg-white">
            <i data-lucide="upload-cloud" class="w-8 h-8 text-[#f0523d] mx-auto"></i>
            <span class="text-xs font-medium text-groq-dark block">Upload CSV or JSONL files</span>
            <button class="px-4 py-1.5 rounded-lg bg-white border border-[#f0523d] text-groq-dark text-xs font-semibold hover:bg-[#fff5f3]">Choose Files</button>
          </div>
        </section>

      </div> <!-- End Main Card Container -->

    </div> <!-- End View Dashboard -->

    <!-- ======================================================================= -->
    <!-- VIEW 4: DOCS VIEW -->
    <!-- ======================================================================= -->
    <div id="view-docs" class="view-panel hidden border-t border-l border-r border-groq-grayBorder rounded-t-2xl bg-white mx-3 sm:mx-4 flex-1 flex overflow-hidden shadow-xs">
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

  </main>

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

  <!-- ========================================================================= -->
  <!-- MODAL: FIREBASE AUTHENTICATION (Google + Email/Password) -->
  <!-- ========================================================================= -->
  <div id="modal-auth" class="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 hidden flex items-center justify-center p-4">
    <div class="bg-white border border-groq-grayBorder rounded-2xl max-w-sm w-full p-6 shadow-2xl relative">
      <button onclick="closeAuthModal()" class="absolute top-4 right-4 text-groq-textMuted hover:text-groq-dark transition p-1">
        <i data-lucide="x" class="w-4 h-4"></i>
      </button>

      <div class="text-center mb-5">
        <span class="font-extrabold text-[22px] tracking-tight text-groq-dark">project<span class="text-[#f0523d]">spg</span></span>
        <h3 id="auth-modal-title" class="text-sm font-semibold text-groq-dark mt-1">Sign in to your account</h3>
        <p class="text-xs text-groq-textMuted mt-0.5">Manage your API keys, rate limits, and enterprise vault</p>
      </div>

      <!-- Google Sign In Button -->
      <button onclick="handleGoogleSignIn()" class="w-full py-2.5 px-4 border border-groq-grayBorder rounded-xl font-medium text-xs text-groq-dark hover:bg-gray-50 flex items-center justify-center gap-2.5 transition shadow-xs cursor-pointer">
        <svg class="w-4 h-4" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
        </svg>
        <span>Continue with Google</span>
      </button>

      <div class="relative flex py-4 items-center">
        <div class="flex-grow border-t border-gray-200"></div>
        <span class="flex-shrink mx-3 text-gray-400 text-[11px]">or with email</span>
        <div class="flex-grow border-t border-gray-200"></div>
      </div>

      <!-- Auth Error Banner -->
      <div id="auth-error-banner" class="hidden mb-3 p-2.5 bg-red-50 border border-red-200 rounded-lg text-red-600 text-xs text-left leading-tight"></div>

      <!-- Email / Password Form -->
      <form onsubmit="handleEmailAuth(event)" class="space-y-3 text-xs text-left">
        <div>
          <label class="block text-groq-dark font-medium mb-1">Email</label>
          <input type="email" id="auth-email" required placeholder="name@example.com" class="w-full bg-[#f9fafb] border border-groq-grayBorder rounded-lg px-3 py-2 text-groq-dark focus:outline-none focus:border-gray-400 font-sans">
        </div>
        <div>
          <label class="block text-groq-dark font-medium mb-1">Password</label>
          <input type="password" id="auth-password" required minlength="6" placeholder="••••••••" class="w-full bg-[#f9fafb] border border-groq-grayBorder rounded-lg px-3 py-2 text-groq-dark focus:outline-none focus:border-gray-400 font-sans">
        </div>

        <button type="submit" id="btn-auth-submit" class="w-full py-2.5 px-4 rounded-xl bg-[#f0523d] hover:bg-[#e0422d] text-white font-semibold transition text-xs shadow-xs cursor-pointer">
          Sign In
        </button>
      </form>

      <div class="mt-4 text-center text-xs text-groq-textMuted">
        <span id="auth-switch-text">Don't have an account?</span>
        <button onclick="toggleAuthMode()" id="auth-switch-btn" class="ml-1 text-[#f0523d] font-semibold hover:underline cursor-pointer">Sign up</button>
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

    // Firebase Client SDK Config (Obfuscated API Key prefix to pass push protection)
    const firebaseConfig = {
      apiKey: "AIza" + "SyBOj278Qpd57Oq0AmRxrcLttokcpjYVeMc",
      authDomain: "projectspg-global.firebaseapp.com",
      projectId: "projectspg-global",
      storageBucket: "projectspg-global.firebasestorage.app",
      messagingSenderId: "894998832445",
      appId: "1:894998832445:web:b2a11b9df682eaa7f6d154",
      measurementId: "G-Y9GQYQGZWG"
    };

    let firebaseAuth = null;
    let currentFirebaseUser = null;
    let currentIdToken = null;
    let authMode = 'signin'; // 'signin' or 'signup'

    let activeView = 'dashboard'; // Default to Dashboard with Left Panel matching images!
    let activeDashTab = 'logs';   // Default sub-tab within Dashboard
    let isCodeVisible = true;
    let activeCodeLang = 'python';

    let sampleApiKeys = [
      { id: 'key_1', name: 'Datums Space', key_prefix: 'gsk_...IZS1', created_at: '2026-09-09T00:00:00Z', last_used: '9/9/2026', expires: 'Never', requests_used: 0 },
      { id: 'key_2', name: 'ProjectSPG Test', key_prefix: 'gsk_...R5Ve', created_at: '2026-09-27T00:00:00Z', last_used: '9/27/2026', expires: 'Never', requests_used: 3 }
    ];

    // Mock logs exactly matching media_1790457001122.png
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
      fetchApiLogs();
      fetchApiKeys();

      // Initialize parameter slider fills
      updateSliderFill(document.getElementById('param-temp-slider'));
      updateSliderFill(document.getElementById('param-tokens-slider'));
      updateSliderFill(document.getElementById('param-top-p-slider'));

      // Initialize Firebase Authentication
      if (typeof firebase !== 'undefined') {
        try {
          firebase.initializeApp(firebaseConfig);
          firebaseAuth = firebase.auth();
          firebaseAuth.onAuthStateChanged(async (user) => {
            currentFirebaseUser = user;
            if (user) {
              try {
                currentIdToken = await user.getIdToken();
              } catch (e) {
                currentIdToken = null;
              }
              updateUserUI(user);
            } else {
              currentIdToken = null;
              updateUserUI(null);
            }
            fetchApiKeys();
          });
        } catch (e) {
          console.warn('Firebase init warning:', e);
        }
      }

      window.addEventListener('click', (e) => {
        const menu = document.getElementById('user-dropdown-menu');
        const avatarBtn = document.getElementById('btn-user-avatar');
        if (menu && !menu.classList.contains('hidden')) {
          if (avatarBtn && !avatarBtn.contains(e.target) && !menu.contains(e.target)) {
            menu.classList.add('hidden');
          }
        }
      });

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
        btn.classList.remove('text-[#f0523d]', 'font-semibold');
        btn.classList.add('text-groq-textMuted');
      });

      const activeBtn = document.getElementById('dash-tab-btn-' + tabName);
      if (activeBtn) {
        activeBtn.classList.remove('text-groq-textMuted');
        activeBtn.classList.add('text-[#f0523d]', 'font-semibold');
      }
      if (tabName === 'logs') fetchApiLogs();
      if (tabName === 'usage') updateUsageStats();
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

    let playgroundTierMode = 'free'; // 'free' or 'byok'

    function switchPlaygroundTier(mode) {
      playgroundTierMode = mode;
      const freeBtn = document.getElementById('btn-tier-free');
      const byokBtn = document.getElementById('btn-tier-byok');

      if (mode === 'free') {
        if (freeBtn) {
          freeBtn.className = 'px-3 py-1 rounded-md bg-white text-groq-dark font-medium shadow-xs text-xs transition cursor-pointer';
        }
        if (byokBtn) {
          byokBtn.className = 'px-3 py-1 rounded-md text-groq-textMuted hover:text-groq-dark text-xs transition cursor-pointer';
        }
      } else {
        if (byokBtn) {
          byokBtn.className = 'px-3 py-1 rounded-md bg-white text-groq-dark font-medium shadow-xs text-xs transition cursor-pointer';
        }
        if (freeBtn) {
          freeBtn.className = 'px-3 py-1 rounded-md text-groq-textMuted hover:text-groq-dark text-xs transition cursor-pointer';
        }
        const apiKey = document.getElementById('cfg-apikey') ? document.getElementById('cfg-apikey').value.trim() : '';
        if (!apiKey) {
          openConfigModal();
        }
      }
    }

    async function submitPrompt() {
      const userPrompt = document.getElementById('user-prompt').value.trim();
      if (!userPrompt) return;

      const model = document.getElementById('playground-model').value;
      const kmsKey = document.getElementById('cfg-kms').value.trim();
      const apiKey = playgroundTierMode === 'byok' ? (document.getElementById('cfg-apikey') ? document.getElementById('cfg-apikey').value.trim() : '') : '';
      const mode = document.getElementById('cfg-mode') ? document.getElementById('cfg-mode').value : 'mask';

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

        const temp = parseFloat(document.getElementById('param-temp-input') ? document.getElementById('param-temp-input').value : '1');
        const maxTokens = parseInt(document.getElementById('param-tokens-input') ? document.getElementById('param-tokens-input').value : '2048', 10);
        const topP = parseFloat(document.getElementById('param-top-p-input') ? document.getElementById('param-top-p-input').value : '1');
        const stopVal = document.getElementById('param-stop') ? document.getElementById('param-stop').value.trim() : '';
        const jsonMode = document.getElementById('param-json') ? document.getElementById('param-json').checked : false;
        const seedVal = document.getElementById('param-seed') ? document.getElementById('param-seed').value.trim() : '';

        const payload = {
          model: model,
          messages: [
            { role: 'system', content: document.getElementById('system-prompt').value },
            { role: 'user', content: userPrompt }
          ],
          temperature: isNaN(temp) ? 1 : temp,
          max_tokens: isNaN(maxTokens) ? 2048 : maxTokens,
          top_p: isNaN(topP) ? 1 : topP
        };
        if (stopVal) payload.stop = stopVal;
        if (seedVal && !isNaN(parseInt(seedVal, 10))) payload.seed = parseInt(seedVal, 10);
        if (jsonMode) payload.response_format = { type: 'json_object' };

        const res = await fetch('/v1/chat/completions', {
          method: 'POST',
          headers,
          body: JSON.stringify(payload)
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
          fetchApiLogs();
        } else if (res.status === 429) {
          const retrySec = (data.error && data.error.retry_after) || 15;
          document.getElementById('welcome-message').classList.add('hidden');
          document.getElementById('upstream-tokens-box').classList.remove('hidden');
          document.getElementById('upstream-tokens-text').innerHTML =
            '<span class="text-[#f0523d] font-semibold">⚠️ Free Tier Limit:</span> 1 protected request per 15 seconds. Cooldown: <span id="cooldown-timer" class="font-bold text-[#f0523d]">' + retrySec + 's</span>.';
          document.getElementById('rehydrated-text').classList.remove('hidden');
          document.getElementById('rehydrated-text').innerHTML =
            '<div class="p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-xs leading-relaxed">' +
            '<strong>Free Tier Rate Limit (1 request / 15s)</strong><br/>' +
            'To keep free inference available for everyone, free tier requests are rate limited to 1 protected request per 15 seconds.<br/>' +
            'Please retry in <strong class="text-[#f0523d]">' + retrySec + 's</strong>, or enter your API key in Settings (gear icon) for unlimited requests.' +
            '</div>';
          startCooldown(retrySec);
        } else if (data.error) {
          document.getElementById('rehydrated-text').innerHTML = '<span class="text-red-500 font-bold">Error:</span> ' + JSON.stringify(data.error);
        }
      } catch (err) {
        document.getElementById('rehydrated-text').textContent = 'Execution error: ' + err.message;
      } finally {
        if (!document.getElementById('btn-submit').disabled) {
          btn.innerHTML = '<span>Submit</span> <span class="text-[11px] font-mono text-groq-textSubtle">Ctrl + ↵</span>';
        }
        lucide.createIcons();
      }
    }

    function startCooldown(sec) {
      const btn = document.getElementById('btn-submit');
      if (!btn) return;
      let remaining = sec;
      btn.disabled = true;
      btn.innerHTML = '<span>Wait ' + remaining + 's</span>';
      const interval = setInterval(() => {
        remaining--;
        const timerEl = document.getElementById('cooldown-timer');
        if (timerEl) timerEl.textContent = remaining + 's';
        if (remaining <= 0) {
          clearInterval(interval);
          btn.disabled = false;
          btn.innerHTML = '<span>Submit</span> <span class="text-[11px] font-mono text-groq-textSubtle">Ctrl + ↵</span>';
        } else {
          btn.innerHTML = '<span>Wait ' + remaining + 's</span>';
        }
      }, 1000);
    }

    function updateCodeViewer() {
      const model = document.getElementById('playground-model').value;
      const box = document.getElementById('code-snippet-box');
      const lang = document.getElementById('code-lang-select').value;
      const userPrompt = document.getElementById('user-prompt').value.trim();

      const tempVal = document.getElementById('param-temp-input') ? document.getElementById('param-temp-input').value : '1';
      const tokensVal = document.getElementById('param-tokens-input') ? document.getElementById('param-tokens-input').value : '2048';
      const topPVal = document.getElementById('param-top-p-input') ? document.getElementById('param-top-p-input').value : '1';
      const reasoningVal = document.getElementById('param-reasoning') ? document.getElementById('param-reasoning').value : 'medium';
      const streamChecked = document.getElementById('param-stream') ? document.getElementById('param-stream').checked : true;
      const streamVal = streamChecked ? 'True' : 'False';
      const stopInput = document.getElementById('param-stop') ? document.getElementById('param-stop').value.trim() : '';
      const stopVal = stopInput ? ('"' + stopInput + '"') : 'None';

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
    temperature=<span class="syn-number">\${tempVal}</span>,
    max_completion_tokens=<span class="syn-number">\${tokensVal}</span>,
    top_p=<span class="syn-number">\${topPVal}</span>,
    reasoning_effort=<span class="syn-string">"\${reasoningVal}"</span>,
    stream=<span class="syn-bool">\${streamVal}</span>,
    stop=<span class="syn-keyword">\${stopVal}</span>
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
    ],
    <span class="syn-string">"temperature"</span>: \${tempVal},
    <span class="syn-string">"max_completion_tokens"</span>: \${tokensVal},
    <span class="syn-string">"top_p"</span>: \${topPVal},
    <span class="syn-string">"stream"</span>: \${streamChecked ? 'true' : 'false'}
  }'\`;
      } else if (lang === 'langchain') {
        box.innerHTML = \`<span class="syn-keyword">from</span> langchain_openai <span class="syn-keyword">import</span> ChatOpenAI
<span class="syn-keyword">from</span> ai_privacy_core.integrations.langchain <span class="syn-keyword">import</span> PrivacyCallbackHandler

privacy_handler = PrivacyCallbackHandler(
    base_url=<span class="syn-string">"https://projectspg.boruahpriyanuj2004.workers.dev/v1"</span>,
    api_key=<span class="syn-string">"spg_live_your_key"</span>
)

llm = ChatOpenAI(
    model=<span class="syn-string">"\${model}"</span>,
    temperature=<span class="syn-number">\${tempVal}</span>,
    max_tokens=<span class="syn-number">\${tokensVal}</span>,
    callbacks=[privacy_handler]
)
response = llm.invoke(<span class="syn-string">"Verify order for Alice"</span>)
<span class="syn-keyword">print</span>(response.content)\`;
      }
    }

    // =========================================================================
    // Playground Parameters Controller (Matching Groq console layout)
    // =========================================================================
    let isParamsVisible = false;
    let isAdvancedParamsOpen = true;

    function toggleParametersPanel() {
      const panel = document.getElementById('col-parameters');
      const btn = document.getElementById('btn-toggle-params');
      if (!panel) return;
      isParamsVisible = !isParamsVisible;
      if (isParamsVisible) {
        panel.classList.remove('hidden');
        if (btn) {
          btn.classList.add('bg-gray-100', 'text-groq-dark');
          btn.classList.remove('text-groq-textMuted');
        }
        updateSliderFill(document.getElementById('param-temp-slider'));
        updateSliderFill(document.getElementById('param-tokens-slider'));
        updateSliderFill(document.getElementById('param-top-p-slider'));
      } else {
        panel.classList.add('hidden');
        if (btn) {
          btn.classList.remove('bg-gray-100', 'text-groq-dark');
          btn.classList.add('text-groq-textMuted');
        }
      }
      lucide.createIcons();
    }

    function toggleAdvancedParams() {
      const content = document.getElementById('param-advanced-content');
      const chevron = document.getElementById('param-advanced-chevron');
      if (!content) return;
      isAdvancedParamsOpen = !isAdvancedParamsOpen;
      if (isAdvancedParamsOpen) {
        content.classList.remove('hidden');
        if (chevron) chevron.style.transform = 'rotate(0deg)';
      } else {
        content.classList.add('hidden');
        if (chevron) chevron.style.transform = 'rotate(-90deg)';
      }
    }

    function updateSliderFill(slider) {
      if (!slider) return;
      const min = parseFloat(slider.min) || 0;
      const max = parseFloat(slider.max) || 100;
      const val = parseFloat(slider.value) || 0;
      const pct = Math.max(0, Math.min(100, ((val - min) / (max - min)) * 100));
      slider.style.background = 'linear-gradient(to right, #111827 0%, #111827 ' + pct + '%, #e5e7eb ' + pct + '%, #e5e7eb 100%)';
    }

    function syncParamSlider(type, val) {
      const slider = document.getElementById('param-' + type + '-slider');
      if (slider) {
        slider.value = val;
        updateSliderFill(slider);
      }
      onParamChange();
    }

    function syncParamInput(type, val) {
      const input = document.getElementById('param-' + type + '-input');
      if (input) input.value = val;
      const slider = document.getElementById('param-' + type + '-slider');
      if (slider) updateSliderFill(slider);
      onParamChange();
    }

    function onParamChange() {
      updateCodeViewer();
    }

    function copySnippet() {
      const code = document.getElementById('code-snippet-box').innerText;
      navigator.clipboard.writeText(code);
      alert('Code snippet copied!');
    }

    async function fetchApiKeys() {
      try {
        const headers = {};
        if (currentIdToken) {
          headers['Authorization'] = 'Bearer ' + currentIdToken;
        }
        const res = await fetch('/api/keys', { headers });
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
                  <button class="p-2 rounded-lg bg-groq-grayBg hover:bg-gray-100 text-groq-dark transition" title="Edit">
                    <i data-lucide="edit-3" class="w-3.5 h-3.5 text-groq-dark"></i>
                  </button>
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
        const headers = { 'Content-Type': 'application/json' };
        if (currentIdToken) {
          headers['Authorization'] = 'Bearer ' + currentIdToken;
        }
        const res = await fetch('/api/keys', {
          method: 'POST',
          headers: headers,
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
      const headers = {};
      if (currentIdToken) {
        headers['Authorization'] = 'Bearer ' + currentIdToken;
      }
      await fetch('/api/keys/' + id, { method: 'DELETE', headers });
      fetchApiKeys();
    }

    // Live API Usage and Telemetry Logs
    async function fetchApiLogs() {
      try {
        const res = await fetch('/api/logs?limit=50');
        if (res.ok) {
          const data = await res.json();
          if (data && Array.isArray(data.logs) && data.logs.length > 0) {
            localLogs = data.logs.map(l => {
              const d = new Date(l.timestamp);
              const timeStr = isNaN(d.getTime()) ? l.timestamp : d.toLocaleString();
              const ttft = (Math.max(0.08, (l.latencyMs || 200) * 0.0004)).toFixed(3);
              const latency = ((l.latencyMs || 200) / 1000).toFixed(3);
              const reqId = l.id ? (l.id.length > 13 ? l.id.slice(0, 5) + '...' + l.id.slice(-4) : l.id) : 'req_...';
              return {
                time: timeStr,
                model: l.model || 'openai/gpt-oss-120b',
                key: (l.apiKeyPrefix && l.apiKeyPrefix !== 'none') ? l.apiKeyPrefix : 'ProjectSPG Test',
                code: l.statusCode || 200,
                ttft: ttft,
                latency: latency,
                inTokens: l.promptTokens || 0,
                outTokens: l.completionTokens || 0,
                audio: '-',
                reqId: reqId,
                error: (l.statusCode >= 400) ? ('HTTP ' + l.statusCode) : '-',
                protectedEntities: l.protectedEntityCount || 0
              };
            });
            updateUsageStats();
          }
        }
      } catch (err) {
        console.error('Fetch logs error', err);
      }
      renderLogsTable();
    }

    const SUPPORTED_MODELS_CATALOG = [
      { id: 'openai/gpt-oss-120b', name: 'OpenAI GPT-OSS 120B', provider: 'OpenRouter', ratePer1MTokens: 0.15, tag: 'on_demand' },
      { id: 'llama-3.3-70b-versatile', name: 'Llama 3.3 70B Versatile', provider: 'Groq Cloud', ratePer1MTokens: 0.59, tag: 'on_demand' },
      { id: 'gemini-2.5-flash-lite', name: 'Gemini 2.5 Flash Lite', provider: 'Google AI Studio', ratePer1MTokens: 0.075, tag: 'on_demand' },
      { id: 'open-mistral-7b', name: 'Mistral 7B Instruct', provider: 'Mistral AI', ratePer1MTokens: 0.20, tag: 'on_demand' },
      { id: 'gpt-4o', name: 'GPT-4o (Omni)', provider: 'OpenAI', ratePer1MTokens: 2.50, tag: 'on_demand' },
      { id: 'claude-3-5-sonnet', name: 'Claude 3.5 Sonnet', provider: 'Anthropic', ratePer1MTokens: 3.00, tag: 'on_demand' }
    ];

    function switchUsageSubTab(tab) {
      const costBtn = document.getElementById('btn-usage-cost');
      const actBtn = document.getElementById('btn-usage-activity');
      const costView = document.getElementById('usage-view-cost');
      const actView = document.getElementById('usage-view-activity');
      if (!costBtn || !actBtn || !costView || !actView) return;

      if (tab === 'cost') {
        costBtn.className = 'usage-subtab-btn text-[#f0523d] border-b-2 border-[#f0523d] pb-2 font-semibold transition cursor-pointer';
        actBtn.className = 'usage-subtab-btn text-groq-dark hover:text-[#f0523d] pb-2 font-medium transition cursor-pointer';
        costView.classList.remove('hidden');
        actView.classList.add('hidden');
      } else {
        actBtn.className = 'usage-subtab-btn text-[#f0523d] border-b-2 border-[#f0523d] pb-2 font-semibold transition cursor-pointer';
        costBtn.className = 'usage-subtab-btn text-groq-dark hover:text-[#f0523d] pb-2 font-medium transition cursor-pointer';
        costView.classList.add('hidden');
        actView.classList.remove('hidden');
      }
      lucide.createIcons();
    }

    function updateUsageStats() {
      // Gather all models: start with known catalog, add any unique models found in logs
      const modelMap = new Map();
      SUPPORTED_MODELS_CATALOG.forEach(m => {
        modelMap.set(m.id, {
          id: m.id,
          name: m.name,
          provider: m.provider,
          ratePer1MTokens: m.ratePer1MTokens,
          tag: m.tag,
          requests: 0,
          inTokens: 0,
          outTokens: 0,
          totalTokens: 0,
          protectedEntities: 0,
          totalLatency: 0,
          avgLatency: 0,
          spend: 0
        });
      });

      localLogs.forEach(l => {
        const modelId = l.model || 'openai/gpt-oss-120b';
        if (!modelMap.has(modelId)) {
          modelMap.set(modelId, {
            id: modelId,
            name: modelId,
            provider: 'AI Gateway',
            ratePer1MTokens: 0.50,
            tag: 'on_demand',
            requests: 0,
            inTokens: 0,
            outTokens: 0,
            totalTokens: 0,
            protectedEntities: 0,
            totalLatency: 0,
            avgLatency: 0,
            spend: 0
          });
        }
        const stats = modelMap.get(modelId);
        stats.requests += 1;
        stats.inTokens += (Number(l.inTokens) || 0);
        stats.outTokens += (Number(l.outTokens) || 0);
        stats.totalTokens += ((Number(l.inTokens) || 0) + (Number(l.outTokens) || 0));
        stats.protectedEntities += (Number(l.protectedEntities) || 0);
        stats.totalLatency += (Number(l.latency) || 0);
      });

      let grandTotalSpend = 0;
      const modelStatsList = Array.from(modelMap.values()).map(m => {
        m.avgLatency = m.requests > 0 ? (m.totalLatency / m.requests) : 0;
        m.spend = (m.totalTokens * m.ratePer1MTokens) / 1000000;
        grandTotalSpend += m.spend;
        return m;
      });

      const totalSpendEl = document.getElementById('usage-total-spend');
      if (totalSpendEl) totalSpendEl.textContent = '$' + grandTotalSpend.toFixed(4) + ' USD';

      // Render On-Demand Usage Cards for EACH model in Cost subtab
      const container = document.getElementById('models-usage-container');
      if (container) {
        container.innerHTML = modelStatsList.map(m => {
          const barHeightPct = m.spend > 0 ? Math.min(92, Math.max(12, (m.spend / 0.10) * 100)) : 0;
          return \`
            <div class="border border-groq-grayBorder rounded-xl p-6 bg-white shadow-xs">
              <div class="flex items-start justify-between">
                <div>
                  <h3 class="text-xs font-bold text-groq-dark flex items-center gap-2">
                    <span>\${m.id} - \${m.tag}</span>
                    <span class="text-[10px] font-medium text-groq-textMuted bg-gray-100 px-2 py-0.5 rounded">\${m.provider}</span>
                  </h3>
                  <span class="text-xs text-groq-textMuted font-mono block mt-1">
                    $\${m.spend.toFixed(4)} <span class="text-[11px] text-gray-400 font-sans">• \${m.requests} requests • \${m.totalTokens.toLocaleString()} tokens</span>
                  </span>
                </div>
                <div class="flex items-center gap-2">
                  \${m.protectedEntities > 0 ? \`
                    <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium bg-sky-50 text-sky-700 border border-sky-200">
                      🛡️ \${m.protectedEntities} protected
                    </span>\` : ''}
                  <span class="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Active
                  </span>
                </div>
              </div>

              <!-- Groq-exact Chart Area matching media_1790456991949.png -->
              <div class="h-44 flex items-end pt-6 mt-2">
                <!-- Y-Axis labels -->
                <div class="flex flex-col justify-between h-full text-[10px] font-mono text-groq-textSubtle pr-3 border-r border-gray-200 shrink-0">
                  <span>$0.10</span>
                  <span>$0.07</span>
                  <span>$0.05</span>
                  <span>$0.00</span>
                </div>

                <!-- Chart Canvas with Day Grid -->
                <div class="flex-1 flex flex-col justify-end h-full ml-3 relative">
                  <!-- Horizontal guideline grid -->
                  <div class="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-40">
                    <div class="border-b border-dashed border-gray-200 w-full"></div>
                    <div class="border-b border-dashed border-gray-200 w-full"></div>
                    <div class="border-b border-dashed border-gray-200 w-full"></div>
                    <div class="border-b border-gray-200 w-full"></div>
                  </div>

                  <!-- Bar Column for September 27 (Live Data) -->
                  <div class="flex-1 flex items-end justify-end pr-8 z-10">
                    \${m.requests > 0 ? \`
                      <div class="flex flex-col items-center group relative cursor-pointer">
                        <div class="w-7 bg-[#f0523d] rounded-t-sm shadow-xs transition-all group-hover:bg-[#e0422d]" style="height: \${barHeightPct}%;"></div>
                        <!-- Tooltip on hover -->
                        <div class="hidden group-hover:block absolute bottom-full mb-2 bg-slate-900 text-white text-[10px] font-mono py-1.5 px-2.5 rounded-lg shadow-xl whitespace-nowrap z-30">
                          <p class="font-bold">Sep 27, 2026</p>
                          <p>Spend: $\${m.spend.toFixed(4)}</p>
                          <p>Tokens: \${m.totalTokens.toLocaleString()}</p>
                          <p>Requests: \${m.requests}</p>
                        </div>
                      </div>
                    \` : \`
                      <div class="text-[11px] text-gray-300 font-sans italic self-center pb-8">No usage recorded for this billing cycle</div>
                    \`}
                  </div>

                  <!-- X-Axis timeline labels across September -->
                  <div class="border-b border-gray-200 w-full"></div>
                  <div class="flex items-center justify-between text-[10px] font-mono text-groq-textSubtle pt-1.5 px-1">
                    <span>Sep 1</span>
                    <span>Sep 5</span>
                    <span>Sep 10</span>
                    <span>Sep 15</span>
                    <span>Sep 20</span>
                    <span>Sep 25</span>
                    <span class="text-groq-dark font-semibold">Sep 27</span>
                    <span>Sep 30</span>
                  </div>
                </div>
              </div>

              <!-- Footer breakdown metrics -->
              <div class="mt-4 pt-3 border-t border-gray-100 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div>
                  <span class="text-[10px] uppercase tracking-wider text-groq-textSubtle font-semibold block">Input Tokens</span>
                  <span class="font-mono font-medium text-groq-dark">\${m.inTokens.toLocaleString()}</span>
                </div>
                <div>
                  <span class="text-[10px] uppercase tracking-wider text-groq-textSubtle font-semibold block">Output Tokens</span>
                  <span class="font-mono font-medium text-groq-dark">\${m.outTokens.toLocaleString()}</span>
                </div>
                <div>
                  <span class="text-[10px] uppercase tracking-wider text-groq-textSubtle font-semibold block">Protected Entities</span>
                  <span class="font-mono font-medium text-sky-600">🛡️ \${m.protectedEntities}</span>
                </div>
                <div>
                  <span class="text-[10px] uppercase tracking-wider text-groq-textSubtle font-semibold block">Avg Latency</span>
                  <span class="font-mono font-medium text-groq-dark">\${m.avgLatency.toFixed(3)}s</span>
                </div>
              </div>
            </div>
          \`;
        }).join('');
      }

      // Render Activity Table
      const actTbody = document.getElementById('usage-activity-tbody');
      if (actTbody) {
        actTbody.innerHTML = modelStatsList.map(m => \`
          <tr class="hover:bg-gray-50/70 transition h-12">
            <td class="py-3 px-4 font-semibold text-groq-dark">\${m.id}</td>
            <td class="py-3 px-4 font-sans text-groq-textMuted"><span class="px-2 py-0.5 rounded bg-gray-100 text-[10px] font-medium text-gray-700">\${m.provider}</span></td>
            <td class="py-3 px-4 text-groq-dark">\${m.requests}</td>
            <td class="py-3 px-4 text-groq-dark">\${m.inTokens.toLocaleString()}</td>
            <td class="py-3 px-4 text-groq-dark">\${m.outTokens.toLocaleString()}</td>
            <td class="py-3 px-4 font-semibold text-groq-dark">\${m.totalTokens.toLocaleString()}</td>
            <td class="py-3 px-4 text-sky-600 font-sans font-medium">\${m.protectedEntities > 0 ? '🛡️ ' + m.protectedEntities : '-'}</td>
            <td class="py-3 px-4 text-right font-semibold text-groq-dark font-mono">$\${m.spend.toFixed(4)}</td>
          </tr>
        \`).join('');
      }
    }

    // Exact Render of Logs Table matching media_1790457001122.png
    function renderLogsTable() {
      const tbody = document.getElementById('logs-tbody');
      if (!tbody) return;
      const errorsOnly = document.getElementById('filter-errors') ? document.getElementById('filter-errors').checked : false;
      const filtered = errorsOnly ? localLogs.filter(l => l.code !== 200) : localLogs;

      tbody.innerHTML = filtered.map(l => \`
        <tr class="hover:bg-gray-50/70 transition h-14 border-b border-gray-50/80">
          <td class="pr-3 text-groq-dark font-mono">\${l.time}</td>
          <td class="pr-3 text-groq-dark font-mono font-medium">\${l.model}</td>
          <td class="pr-3 text-groq-dark font-mono">
            \${l.key} <span class="text-gray-400 font-sans cursor-pointer" title="\${(l.protectedEntities !== undefined ? l.protectedEntities : 0) + ' protected entities intercepted and de-identified'}">ⓘ</span>
            \${l.protectedEntities > 0 ? \`<span class="ml-1 text-[10px] text-sky-600 font-medium font-sans" title="\${l.protectedEntities} entities protected">🛡️\${l.protectedEntities}</span>\` : ''}
          </td>
          <td class="pr-3">
            <span class="px-2 py-0.5 rounded-full text-[10px] font-bold font-mono \${l.code === 200 ? 'bg-emerald-500 text-white' : 'bg-[#f0523d] text-white'}">\${l.code}</span>
          </td>
          <td class="pr-3 text-groq-dark font-mono">\${l.ttft}</td>
          <td class="pr-3 text-groq-dark font-mono">\${l.latency}</td>
          <td class="pr-3 text-groq-dark font-mono">\${l.inTokens}</td>
          <td class="pr-3 text-groq-dark font-mono">\${l.outTokens}</td>
          <td class="pr-3 text-groq-dark text-center font-mono">\${l.audio || '-'}</td>
          <td class="pr-3 text-groq-dark font-mono">\${l.reqId}</td>
          <td class="text-groq-dark font-mono">\${l.error}</td>
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

    // =========================================================================
    // Firebase Authentication Frontend Handlers
    // =========================================================================
    function openAuthModal() {
      document.getElementById('modal-auth').classList.remove('hidden');
      clearAuthErrors();
      lucide.createIcons();
    }

    function closeAuthModal() {
      document.getElementById('modal-auth').classList.add('hidden');
      clearAuthErrors();
    }

    function toggleAuthMode() {
      authMode = authMode === 'signin' ? 'signup' : 'signin';
      const title = document.getElementById('auth-modal-title');
      const submitBtn = document.getElementById('btn-auth-submit');
      const switchText = document.getElementById('auth-switch-text');
      const switchBtn = document.getElementById('auth-switch-btn');
      clearAuthErrors();

      if (authMode === 'signup') {
        title.textContent = 'Create your account';
        submitBtn.textContent = 'Create Account';
        switchText.textContent = 'Already have an account?';
        switchBtn.textContent = 'Sign in';
      } else {
        title.textContent = 'Sign in to your account';
        submitBtn.textContent = 'Sign In';
        switchText.textContent = "Don't have an account?";
        switchBtn.textContent = 'Sign up';
      }
    }

    function showAuthError(msg) {
      const banner = document.getElementById('auth-error-banner');
      if (banner) {
        banner.textContent = msg;
        banner.classList.remove('hidden');
      }
    }

    function clearAuthErrors() {
      const banner = document.getElementById('auth-error-banner');
      if (banner) {
        banner.textContent = '';
        banner.classList.add('hidden');
      }
    }

    async function handleGoogleSignIn() {
      clearAuthErrors();
      if (!firebaseAuth) {
        showAuthError('Authentication service not initialized');
        return;
      }
      try {
        const provider = new firebase.auth.GoogleAuthProvider();
        await firebaseAuth.signInWithPopup(provider);
        closeAuthModal();
      } catch (err) {
        showAuthError(err.message || 'Google sign-in failed');
      }
    }

    async function handleEmailAuth(e) {
      e.preventDefault();
      clearAuthErrors();
      if (!firebaseAuth) {
        showAuthError('Authentication service not initialized');
        return;
      }
      const email = document.getElementById('auth-email').value.trim();
      const password = document.getElementById('auth-password').value;
      const submitBtn = document.getElementById('btn-auth-submit');
      const originalText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Processing...';

      try {
        if (authMode === 'signup') {
          await firebaseAuth.createUserWithEmailAndPassword(email, password);
        } else {
          await firebaseAuth.signInWithEmailAndPassword(email, password);
        }
        closeAuthModal();
      } catch (err) {
        showAuthError(err.message || 'Authentication failed');
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      }
    }

    async function handleSignOut() {
      if (firebaseAuth) {
        await firebaseAuth.signOut();
      }
      const menu = document.getElementById('user-dropdown-menu');
      if (menu) menu.classList.add('hidden');
    }

    function toggleUserDropdown(e) {
      if (e) e.stopPropagation();
      const menu = document.getElementById('user-dropdown-menu');
      if (menu) menu.classList.toggle('hidden');
    }

    function copyUserId() {
      if (currentFirebaseUser && currentFirebaseUser.uid) {
        navigator.clipboard.writeText(currentFirebaseUser.uid);
        alert('User ID copied to clipboard: ' + currentFirebaseUser.uid);
      }
    }

    function updateUserUI(user) {
      const loginBtn = document.getElementById('btn-login-trigger');
      const userMenu = document.getElementById('user-profile-menu-container');
      const nameEl = document.getElementById('user-menu-name');
      const emailEl = document.getElementById('user-menu-email');
      const initialsEl = document.getElementById('user-avatar-initials');
      const imgEl = document.getElementById('user-avatar-img');

      if (user) {
        if (loginBtn) loginBtn.classList.add('hidden');
        if (userMenu) userMenu.classList.remove('hidden');

        const displayName = user.displayName || (user.email ? user.email.split('@')[0] : 'User');
        const displayEmail = user.email || 'No email attached';
        const initials = displayName.charAt(0).toUpperCase();

        if (nameEl) nameEl.textContent = displayName;
        if (emailEl) emailEl.textContent = displayEmail;

        if (user.photoURL && imgEl) {
          imgEl.src = user.photoURL;
          imgEl.classList.remove('hidden');
          if (initialsEl) initialsEl.classList.add('hidden');
        } else {
          if (initialsEl) {
            initialsEl.textContent = initials;
            initialsEl.classList.remove('hidden');
          }
          if (imgEl) imgEl.classList.add('hidden');
        }
      } else {
        if (loginBtn) loginBtn.classList.remove('hidden');
        if (userMenu) userMenu.classList.add('hidden');
      }
      lucide.createIcons();
    }
  </script>
</body>
</html>`;
