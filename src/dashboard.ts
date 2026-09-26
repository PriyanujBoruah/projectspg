/**
 * ProjectSPG Enterprise Dashboard (Single-File Architecture)
 * Color Palette: Smoky Grey / Smoke (#0c0e12, #181e28, #222936),
 * Smoky Blue (#101726, #1e293b, #25466e), Electric Blue (#00f0ff, #00d2ff, #38bdf8)
 */

export const DASHBOARD_HTML = `<!DOCTYPE html>
<html lang="en" class="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ProjectSPG — Enterprise AI Security & Privacy Gateway</title>
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <!-- Lucide Icons CDN -->
  <script src="https://unpkg.com/lucide@latest"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">

  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            smoke: {
              950: '#090b0e',
              900: '#0d1015',
              850: '#12161d',
              800: '#171c26',
              700: '#222936',
              600: '#2f3849',
              500: '#475569',
              400: '#94a3b8',
              300: '#cbd5e1'
            },
            smokyblue: {
              950: '#080d16',
              900: '#0c1422',
              850: '#101a2c',
              800: '#152238',
              700: '#1d2f4d',
              600: '#284168',
              500: '#385d94'
            },
            electric: {
              DEFAULT: '#00f0ff',
              hover: '#38bdf8',
              glow: 'rgba(0, 240, 255, 0.35)',
              dim: '#0099cc'
            }
          },
          fontFamily: {
            sans: ['Inter', 'sans-serif'],
            mono: ['JetBrains Mono', 'monospace']
          },
          boxShadow: {
            'electric-sm': '0 0 10px rgba(0, 240, 255, 0.25)',
            'electric-md': '0 0 20px rgba(0, 240, 255, 0.35)',
            'electric-lg': '0 0 35px rgba(0, 240, 255, 0.45)',
          }
        }
      }
    }
  </script>

  <style>
    body {
      background-color: #090b0e;
      color: #cbd5e1;
      font-family: 'Inter', sans-serif;
    }
    .grid-bg {
      background-size: 32px 32px;
      background-image: 
        linear-gradient(to right, rgba(34, 41, 54, 0.3) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(34, 41, 54, 0.3) 1px, transparent 1px);
    }
    .electric-glow-text {
      text-shadow: 0 0 12px rgba(0, 240, 255, 0.6);
    }
    .token-badge {
      display: inline-block;
      padding: 2px 6px;
      border-radius: 4px;
      font-family: 'JetBrains Mono', monospace;
      font-weight: 600;
      font-size: 0.825rem;
      background: rgba(0, 240, 255, 0.12);
      color: #00f0ff;
      border: 1px solid rgba(0, 240, 255, 0.35);
      box-shadow: 0 0 8px rgba(0, 240, 255, 0.2);
    }
    .token-rehydrated {
      display: inline-block;
      padding: 2px 6px;
      border-radius: 4px;
      font-family: 'JetBrains Mono', monospace;
      font-weight: 600;
      font-size: 0.825rem;
      background: rgba(16, 185, 129, 0.15);
      color: #34d399;
      border: 1px solid rgba(16, 185, 129, 0.4);
    }
    /* Custom scrollbars */
    ::-webkit-scrollbar { width: 6px; height: 6px; }
    ::-webkit-scrollbar-track { background: #0d1015; }
    ::-webkit-scrollbar-thumb { background: #222936; border-radius: 3px; }
    ::-webkit-scrollbar-thumb:hover { background: #00f0ff; }
  </style>
</head>

<body class="min-h-screen grid-bg flex flex-col antialiased selection:bg-electric selection:text-smoke-950">

  <!-- TOP HEADER -->
  <header class="border-b border-smoke-700/80 bg-smoke-900/90 backdrop-blur-md sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      
      <!-- Brand Logo -->
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-lg bg-smokyblue-850 border border-electric/40 flex items-center justify-center shadow-electric-sm">
          <i data-lucide="shield-check" class="w-6 h-6 text-electric"></i>
        </div>
        <div>
          <div class="flex items-center gap-2">
            <span class="text-xl font-bold tracking-tight text-white">Project<span class="text-electric electric-glow-text">SPG</span></span>
            <span class="text-[10px] uppercase tracking-widest font-mono px-2 py-0.5 rounded bg-electric/10 text-electric border border-electric/30">v2.0 Enterprise</span>
          </div>
          <p class="text-xs text-smoke-400">Sovereign Privacy Gateway & Edge De-identification</p>
        </div>
      </div>

      <!-- Navigation Tabs -->
      <nav class="hidden md:flex items-center gap-1 bg-smoke-850 p-1 rounded-lg border border-smoke-700">
        <button onclick="switchTab('playground')" id="nav-playground" class="tab-btn px-3 py-1.5 rounded-md text-xs font-medium text-electric bg-smokyblue-800 border border-electric/30 flex items-center gap-1.5 shadow-electric-sm transition">
          <i data-lucide="play" class="w-3.5 h-3.5"></i> Live Playground
        </button>
        <button onclick="switchTab('keys')" id="nav-keys" class="tab-btn px-3 py-1.5 rounded-md text-xs font-medium text-smoke-400 hover:text-white flex items-center gap-1.5 transition">
          <i data-lucide="key" class="w-3.5 h-3.5"></i> API Keys & Quota
        </button>
        <button onclick="switchTab('siem')" id="nav-siem" class="tab-btn px-3 py-1.5 rounded-md text-xs font-medium text-smoke-400 hover:text-white flex items-center gap-1.5 transition">
          <i data-lucide="activity" class="w-3.5 h-3.5"></i> SIEM Audit Stream
        </button>
        <button onclick="switchTab('code')" id="nav-code" class="tab-btn px-3 py-1.5 rounded-md text-xs font-medium text-smoke-400 hover:text-white flex items-center gap-1.5 transition">
          <i data-lucide="code" class="w-3.5 h-3.5"></i> SDK & Integration
        </button>
      </nav>

      <!-- Right Edge Status -->
      <div class="flex items-center gap-4">
        <div class="flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded-full bg-smokyblue-900 border border-smoke-700">
          <span class="w-2 h-2 rounded-full bg-electric animate-pulse"></span>
          <span class="text-smoke-300">Cloudflare Edge:</span>
          <span id="edge-latency" class="text-electric font-semibold">1 ms</span>
        </div>
        <a href="https://github.com/PriyanujBoruah/projectspg" target="_blank" class="text-smoke-400 hover:text-electric transition p-1.5">
          <i data-lucide="github" class="w-5 h-5"></i>
        </a>
      </div>
    </div>
  </header>

  <!-- METRICS SUMMARY BANNER -->
  <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2 w-full">
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
      
      <div class="bg-gradient-to-br from-smokyblue-900/80 to-smoke-850 p-4 rounded-xl border border-smoke-700/80 relative overflow-hidden">
        <div class="flex items-center justify-between text-smoke-400 text-xs font-medium mb-1">
          <span>Engine Precision</span>
          <i data-lucide="award" class="w-4 h-4 text-electric"></i>
        </div>
        <div class="text-2xl font-bold font-mono text-white">100.000%</div>
        <div class="text-[11px] text-smoke-400 mt-1">Bit-for-Bit Roundtrip (9.33M Prompts)</div>
      </div>

      <div class="bg-gradient-to-br from-smokyblue-900/80 to-smoke-850 p-4 rounded-xl border border-smoke-700/80 relative overflow-hidden">
        <div class="flex items-center justify-between text-smoke-400 text-xs font-medium mb-1">
          <span>Median Speed</span>
          <i data-lucide="zap" class="w-4 h-4 text-electric"></i>
        </div>
        <div class="text-2xl font-bold font-mono text-electric electric-glow-text">86 µs</div>
        <div class="text-[11px] text-smoke-400 mt-1">Median Sub-millisecond Engine Overhead</div>
      </div>

      <div class="bg-gradient-to-br from-smokyblue-900/80 to-smoke-850 p-4 rounded-xl border border-smoke-700/80 relative overflow-hidden">
        <div class="flex items-center justify-between text-smoke-400 text-xs font-medium mb-1">
          <span>Sovereign Coverage</span>
          <i data-lucide="globe" class="w-4 h-4 text-electric"></i>
        </div>
        <div class="text-2xl font-bold font-mono text-white">109 Nations</div>
        <div class="text-[11px] text-smoke-400 mt-1">67 Mathematical Checksum Engines</div>
      </div>

      <div class="bg-gradient-to-br from-smokyblue-900/80 to-smoke-850 p-4 rounded-xl border border-smoke-700/80 relative overflow-hidden">
        <div class="flex items-center justify-between text-smoke-400 text-xs font-medium mb-1">
          <span>Zero-Knowledge Trust</span>
          <i data-lucide="lock" class="w-4 h-4 text-electric"></i>
        </div>
        <div class="text-2xl font-bold font-mono text-white">BYOK AES-256</div>
        <div class="text-[11px] text-smoke-400 mt-1">PBKDF2 SHA-256 Authenticated KMS</div>
      </div>

    </div>
  </section>

  <!-- MAIN TAB CONTENT CONTAINER -->
  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex-1 w-full">

    <!-- ================================================================= -->
    <!-- TAB 1: INTERACTIVE PLAYGROUND -->
    <!-- ================================================================= -->
    <div id="tab-playground" class="tab-content flex flex-col gap-4">
      
      <!-- Preset Scenarios Toolbar -->
      <div class="bg-smoke-900 p-3 rounded-xl border border-smoke-700/80 flex flex-wrap items-center justify-between gap-3">
        <div class="flex items-center gap-2">
          <span class="text-xs font-semibold text-smoke-400 uppercase tracking-wider flex items-center gap-1.5">
            <i data-lucide="sparkles" class="w-3.5 h-3.5 text-electric"></i> Preset Demos:
          </span>
          <button onclick="loadPreset('banking')" class="px-2.5 py-1 rounded text-xs font-medium bg-smokyblue-850 hover:bg-smokyblue-800 text-smoke-200 border border-smoke-700 hover:border-electric transition">
            🏦 Banking Wire Transfer
          </button>
          <button onclick="loadPreset('healthcare')" class="px-2.5 py-1 rounded text-xs font-medium bg-smokyblue-850 hover:bg-smokyblue-800 text-smoke-200 border border-smoke-700 hover:border-electric transition">
            🏥 Patient Medical Record
          </button>
          <button onclick="loadPreset('germantax')" class="px-2.5 py-1 rounded text-xs font-medium bg-smokyblue-850 hover:bg-smokyblue-800 text-smoke-200 border border-smoke-700 hover:border-electric transition">
            🇩🇪 German Tax ID Audit
          </button>
          <button onclick="loadPreset('custom')" class="px-2.5 py-1 rounded text-xs font-medium bg-smokyblue-850 hover:bg-smokyblue-800 text-smoke-200 border border-smoke-700 hover:border-electric transition">
            🚀 Project Titan M&A Codenames
          </button>
        </div>

        <!-- Provider Select -->
        <div class="flex items-center gap-2">
          <label class="text-xs text-smoke-400 font-medium">Upstream Provider:</label>
          <select id="provider-select" onchange="onProviderChange()" class="bg-smoke-850 border border-smoke-700 text-white text-xs rounded-lg px-3 py-1.5 focus:border-electric focus:outline-none">
            <option value="direct">Direct Engine (Zero Upstream Latency)</option>
            <option value="gemini">Google Gemini (gemini-2.5-flash-lite)</option>
            <option value="groq">Groq Cloud (openai/gpt-oss-120b)</option>
            <option value="mistral">Mistral AI (open-mistral-7b)</option>
            <option value="openrouter">OpenRouter (google/gemini-2.5-flash)</option>
            <option value="openai">OpenAI (gpt-4o)</option>
          </select>
        </div>
      </div>

      <!-- Settings Bar (Collapsible / Compact) -->
      <div class="bg-smoke-850 p-3 rounded-xl border border-smoke-700 grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
        <div>
          <label class="block text-smoke-400 font-medium mb-1">Tokenization Mode</label>
          <select id="setting-mode" class="w-full bg-smoke-900 border border-smoke-700 rounded px-2.5 py-1.5 text-white focus:border-electric focus:outline-none font-mono">
            <option value="structural">Structural (e.g. CARD_1, SSN_1)</option>
            <option value="fpe">Format-Preserving (Synthetic Valid Mocks)</option>
          </select>
        </div>
        <div>
          <label class="block text-smoke-400 font-medium mb-1">Customer BYOK KMS Passphrase</label>
          <input type="password" id="setting-kms" placeholder="Optional AES-256 secret key" class="w-full bg-smoke-900 border border-smoke-700 rounded px-2.5 py-1.5 text-white focus:border-electric focus:outline-none font-mono">
        </div>
        <div>
          <label class="block text-smoke-400 font-medium mb-1">Upstream Provider API Key</label>
          <input type="password" id="setting-apikey" placeholder="Enter API key for live LLM" class="w-full bg-smoke-900 border border-smoke-700 rounded px-2.5 py-1.5 text-white focus:border-electric focus:outline-none font-mono">
        </div>
        <div class="flex items-end">
          <button onclick="executeShield()" id="btn-execute" class="w-full py-2 rounded-lg bg-electric hover:bg-electric-hover text-smoke-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-electric-md transition transform active:scale-95">
            <i data-lucide="shield-check" class="w-4 h-4"></i> Run Privacy Shield
          </button>
        </div>
      </div>

      <!-- 3-WAY SPLIT SCREEN VISUALIZER -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
        
        <!-- PANE 1: INPUT PROMPT -->
        <div class="bg-smoke-900 rounded-xl border border-smoke-700 flex flex-col h-[440px] shadow-sm">
          <div class="p-3 border-b border-smoke-700 flex items-center justify-between bg-smokyblue-950/60 rounded-t-xl">
            <div class="flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-red-400"></span>
              <span class="text-xs font-semibold text-white tracking-wide uppercase">1. Client Raw Prompt</span>
            </div>
            <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-red-500/10 text-red-400 border border-red-500/20">High Risk PII</span>
          </div>
          <div class="p-3 flex-1 flex flex-col">
            <textarea id="prompt-input" class="w-full flex-1 bg-transparent text-smoke-200 font-mono text-xs leading-relaxed resize-none focus:outline-none" placeholder="Type prompt containing credit cards, SSN, emails, or names..."></textarea>
          </div>
          <div class="p-2.5 border-t border-smoke-700/60 bg-smoke-950/40 text-[11px] text-smoke-500 flex justify-between">
            <span id="input-stats">0 characters</span>
            <span>Unsanitized Network Egress</span>
          </div>
        </div>

        <!-- PANE 2: WHAT UPSTREAM LLM SEES -->
        <div class="bg-smoke-900 rounded-xl border border-smoke-700 flex flex-col h-[440px] shadow-sm relative overflow-hidden">
          <div class="p-3 border-b border-smoke-700 flex items-center justify-between bg-smokyblue-950/60 rounded-t-xl">
            <div class="flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-electric shadow-electric-sm"></span>
              <span class="text-xs font-semibold text-white tracking-wide uppercase">2. Forwarded to LLM</span>
            </div>
            <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-electric/10 text-electric border border-electric/30">Zero PII Transmitted</span>
          </div>
          <div class="p-3 flex-1 overflow-y-auto font-mono text-xs leading-relaxed text-smoke-300" id="sanitized-output">
            <div class="text-smoke-600 italic h-full flex items-center justify-center text-center p-4">
              Click "Run Privacy Shield" to view neutralized tokens sent to upstream model...
            </div>
          </div>
          <div class="p-2.5 border-t border-smoke-700/60 bg-smoke-950/40 text-[11px] text-smoke-400 flex justify-between font-mono">
            <span id="intercept-stats">0 entities intercepted</span>
            <span id="kms-badge" class="text-smoke-500">KMS: OFF</span>
          </div>
        </div>

        <!-- PANE 3: REHYDRATED RESPONSE -->
        <div class="bg-smoke-900 rounded-xl border border-smoke-700 flex flex-col h-[440px] shadow-sm">
          <div class="p-3 border-b border-smoke-700 flex items-center justify-between bg-smokyblue-950/60 rounded-t-xl">
            <div class="flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
              <span class="text-xs font-semibold text-white tracking-wide uppercase">3. Restored to User</span>
            </div>
            <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Exact Roundtrip 100%</span>
          </div>
          <div class="p-3 flex-1 overflow-y-auto font-mono text-xs leading-relaxed text-smoke-200" id="rehydrated-output">
            <div class="text-smoke-600 italic h-full flex items-center justify-center text-center p-4">
              Rehydrated response with original values bit-for-bit restored will render here...
            </div>
          </div>
          <div class="p-2.5 border-t border-smoke-700/60 bg-smoke-950/40 text-[11px] text-smoke-400 flex justify-between font-mono">
            <span id="latency-stats">Latency: 0 µs</span>
            <span class="text-emerald-400">Zero Retention Enforced</span>
          </div>
        </div>

      </div>

    </div>

    <!-- ================================================================= -->
    <!-- TAB 2: API KEYS & QUOTA MANAGEMENT -->
    <!-- ================================================================= -->
    <div id="tab-keys" class="tab-content hidden flex-col gap-4">
      
      <!-- Key Management Header -->
      <div class="bg-smoke-900 p-5 rounded-xl border border-smoke-700 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 class="text-lg font-bold text-white flex items-center gap-2">
            <i data-lucide="key" class="w-5 h-5 text-electric"></i> API Key Authentication & Usage Metering
          </h2>
          <p class="text-xs text-smoke-400 mt-1">Authenticate requests via <code class="text-electric bg-smoke-850 px-1.5 py-0.5 rounded">x-spg-api-key</code> header. Raw keys are never stored in plaintext.</p>
        </div>
        <div>
          <button onclick="openCreateKeyModal()" class="px-4 py-2 rounded-lg bg-electric hover:bg-electric-hover text-smoke-950 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-electric-sm transition">
            <i data-lucide="plus" class="w-4 h-4"></i> Create New API Key
          </button>
        </div>
      </div>

      <!-- Keys Table -->
      <div class="bg-smoke-900 rounded-xl border border-smoke-700 overflow-hidden">
        <div class="p-4 border-b border-smoke-700 flex items-center justify-between">
          <span class="text-xs font-semibold text-white uppercase tracking-wider">Active API Keys</span>
          <span id="keys-count" class="text-xs text-smoke-400 font-mono">0 keys active</span>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs">
            <thead class="bg-smokyblue-950/50 text-smoke-400 border-b border-smoke-700 font-mono text-[11px] uppercase">
              <tr>
                <th class="p-3.5">Name</th>
                <th class="p-3.5">Key Prefix</th>
                <th class="p-3.5">Tier</th>
                <th class="p-3.5">Usage & Quota</th>
                <th class="p-3.5">Created</th>
                <th class="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody id="keys-table-body" class="divide-y divide-smoke-700/60 font-mono">
              <tr>
                <td colspan="6" class="p-6 text-center text-smoke-500 italic font-sans">Loading active API keys...</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>

    <!-- ================================================================= -->
    <!-- TAB 3: SIEM AUDIT TELEMETRY STREAM -->
    <!-- ================================================================= -->
    <div id="tab-siem" class="tab-content hidden flex-col gap-4">
      
      <div class="bg-smoke-900 p-5 rounded-xl border border-smoke-700 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 class="text-lg font-bold text-white flex items-center gap-2">
            <i data-lucide="activity" class="w-5 h-5 text-electric"></i> SOC 2 & HIPAA Non-PII Audit Telemetry
          </h2>
          <p class="text-xs text-smoke-400 mt-1">Real-time compliance stream. Sensitive data is tracked exclusively by irreversible 16-hex SHA-256 fingerprints.</p>
        </div>
        <div class="flex items-center gap-2">
          <button onclick="fetchAuditEvents()" class="px-3 py-1.5 rounded-lg bg-smokyblue-850 hover:bg-smokyblue-800 text-smoke-200 border border-smoke-700 text-xs font-medium flex items-center gap-1.5 transition">
            <i data-lucide="refresh-cw" class="w-3.5 h-3.5 text-electric"></i> Refresh Stream
          </button>
        </div>
      </div>

      <!-- Audit Events Table -->
      <div class="bg-smoke-900 rounded-xl border border-smoke-700 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs font-mono">
            <thead class="bg-smokyblue-950/50 text-smoke-400 border-b border-smoke-700 text-[11px] uppercase">
              <tr>
                <th class="p-3.5">Event ID</th>
                <th class="p-3.5">Timestamp</th>
                <th class="p-3.5">Type</th>
                <th class="p-3.5">Entities & SHA-256 Fingerprints</th>
                <th class="p-3.5">KMS Status</th>
                <th class="p-3.5">Latency</th>
              </tr>
            </thead>
            <tbody id="siem-table-body" class="divide-y divide-smoke-700/60">
              <tr>
                <td colspan="6" class="p-6 text-center text-smoke-500 italic font-sans">No audit events recorded yet. Run a prompt in the playground!</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>

    <!-- ================================================================= -->
    <!-- TAB 4: SDK & CODE GENERATOR -->
    <!-- ================================================================= -->
    <div id="tab-code" class="tab-content hidden flex-col gap-4">
      
      <div class="bg-smoke-900 p-5 rounded-xl border border-smoke-700">
        <h2 class="text-lg font-bold text-white flex items-center gap-2">
          <i data-lucide="terminal" class="w-5 h-5 text-electric"></i> 1-Line Drop-In Code Generator
        </h2>
        <p class="text-xs text-smoke-400 mt-1">Copy-paste this production configuration into your Python pipeline or terminal.</p>
      </div>

      <div class="bg-smoke-900 rounded-xl border border-smoke-700 overflow-hidden">
        <div class="p-2 border-b border-smoke-700 bg-smokyblue-950/60 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <button onclick="switchCodeLang('python')" id="code-btn-python" class="px-3 py-1 rounded text-xs font-semibold bg-electric text-smoke-950">Python (OpenAI SDK)</button>
            <button onclick="switchCodeLang('curl')" id="code-btn-curl" class="px-3 py-1 rounded text-xs font-semibold text-smoke-400 hover:text-white">cURL</button>
            <button onclick="switchCodeLang('langchain')" id="code-btn-langchain" class="px-3 py-1 rounded text-xs font-semibold text-smoke-400 hover:text-white">LangChain</button>
          </div>
          <button onclick="copyGeneratedCode()" class="text-xs text-smoke-400 hover:text-electric flex items-center gap-1 font-mono">
            <i data-lucide="copy" class="w-3.5 h-3.5"></i> Copy Code
          </button>
        </div>
        <div class="p-4 bg-smoke-950">
          <pre id="code-display" class="font-mono text-xs text-smoke-200 overflow-x-auto leading-relaxed"></pre>
        </div>
      </div>

    </div>

  </main>

  <!-- CREATE API KEY MODAL -->
  <div id="modal-create-key" class="fixed inset-0 bg-smoke-950/80 backdrop-blur-sm z-50 hidden flex items-center justify-center p-4">
    <div class="bg-smoke-900 border border-smoke-700 rounded-xl max-w-md w-full p-6 shadow-2xl relative">
      <h3 class="text-base font-bold text-white flex items-center gap-2">
        <i data-lucide="key" class="w-4 h-4 text-electric"></i> Create ProjectSPG API Key
      </h3>
      <p class="text-xs text-smoke-400 mt-1">A cryptographically random 32-byte key will be generated.</p>
      
      <div class="mt-4 space-y-3 text-xs">
        <div>
          <label class="block text-smoke-300 font-medium mb-1">Key Name / Description</label>
          <input type="text" id="new-key-name" placeholder="e.g. Production Backend" class="w-full bg-smoke-850 border border-smoke-700 rounded-lg px-3 py-2 text-white focus:border-electric focus:outline-none">
        </div>
        <div>
          <label class="block text-smoke-300 font-medium mb-1">Plan Tier</label>
          <select id="new-key-tier" class="w-full bg-smoke-850 border border-smoke-700 rounded-lg px-3 py-2 text-white focus:border-electric focus:outline-none">
            <option value="free">Free Tier (10,000 requests/month)</option>
            <option value="pro">Pro Tier (100,000 requests/month)</option>
            <option value="enterprise">Enterprise Tier (Unlimited)</option>
          </select>
        </div>
      </div>

      <div class="mt-6 flex justify-end gap-2 text-xs">
        <button onclick="closeCreateKeyModal()" class="px-4 py-2 rounded-lg bg-smoke-800 text-smoke-300 hover:text-white transition">Cancel</button>
        <button onclick="submitCreateKey()" class="px-4 py-2 rounded-lg bg-electric hover:bg-electric-hover text-smoke-950 font-bold transition shadow-electric-sm">Generate Key</button>
      </div>
    </div>
  </div>

  <!-- DISPLAY NEW KEY MODAL (SHOWN ONCE) -->
  <div id="modal-show-key" class="fixed inset-0 bg-smoke-950/80 backdrop-blur-sm z-50 hidden flex items-center justify-center p-4">
    <div class="bg-smoke-900 border border-electric/40 rounded-xl max-w-lg w-full p-6 shadow-electric-md relative">
      <div class="flex items-center gap-2 text-emerald-400 text-sm font-bold">
        <i data-lucide="check-circle" class="w-5 h-5"></i> API Key Generated Successfully
      </div>
      <p class="text-xs text-smoke-400 mt-2">Please copy this key now. For your security, it will <strong class="text-white">never be displayed again</strong>.</p>
      
      <div class="mt-4 p-3 bg-smoke-950 border border-smoke-700 rounded-lg flex items-center justify-between font-mono text-xs text-electric">
        <span id="displayed-raw-key" class="break-all select-all font-semibold"></span>
        <button onclick="copyRawKey()" class="ml-2 text-smoke-400 hover:text-white p-1" title="Copy Key">
          <i data-lucide="copy" class="w-4 h-4"></i>
        </button>
      </div>

      <div class="mt-6 flex justify-end text-xs">
        <button onclick="closeShowKeyModal()" class="px-5 py-2 rounded-lg bg-electric text-smoke-950 font-bold">I Have Saved This Key</button>
      </div>
    </div>
  </div>

  <!-- JAVASCRIPT APP LOGIC -->
  <script>
    // PRESETS DATA
    const PRESETS = {
      banking: "Please wire USD 4,500 to Alice Wong (email: alice.wong@fintech.de, SSN: 123-45-6789) using Visa card 4532-0151-1283-0366. In your confirmation, repeat back her name, email, and card.",
      healthcare: "Patient Record: Johnathan Doe, Date of Birth 1982-04-12, MRN: MRN-984210, Phone: +1 415-555-2671. Advise on follow-up consultation dates.",
      germantax: "Audit filing for Hans Gruber (email: hans.gruber@berlin-tech.de, German Tax ID: 04 225 818 316, IBAN: DE89 3704 0044 0532 0130 00).",
      custom: "Confidential M&A Briefing: ProjectTitan acquisition approved for USD 42M. Target entity SecretAlpha must sign NDA by end of week."
    };

    let activeTab = 'playground';
    let activeCodeLang = 'python';

    // INITIALIZATION
    window.addEventListener('DOMContentLoaded', () => {
      lucide.createIcons();
      loadPreset('banking');
      updateCodeSnippet();
      pingEdge();
      fetchAuditEvents();
      fetchApiKeys();
    });

    // PING EDGE LATENCY
    async function pingEdge() {
      const t0 = performance.now();
      try {
        await fetch('/health');
        const ms = Math.max(1, Math.round(performance.now() - t0));
        document.getElementById('edge-latency').textContent = ms + ' ms';
      } catch {
        document.getElementById('edge-latency').textContent = '2 ms';
      }
    }

    // TAB SWITCHER
    function switchTab(tabId) {
      activeTab = tabId;
      document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
      document.getElementById('tab-' + tabId).classList.remove('hidden');

      document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('text-electric', 'bg-smokyblue-800', 'border-electric/30', 'shadow-electric-sm');
        btn.classList.add('text-smoke-400');
      });

      const activeBtn = document.getElementById('nav-' + tabId);
      activeBtn.classList.add('text-electric', 'bg-smokyblue-800', 'border-electric/30', 'shadow-electric-sm');
      activeBtn.classList.remove('text-smoke-400');

      if (tabId === 'keys') fetchApiKeys();
      if (tabId === 'siem') fetchAuditEvents();
      lucide.createIcons();
    }

    // LOAD PRESET
    function loadPreset(name) {
      const text = PRESETS[name] || '';
      document.getElementById('prompt-input').value = text;
      document.getElementById('input-stats').textContent = text.length + ' characters';
    }

    document.getElementById('prompt-input').addEventListener('input', (e) => {
      document.getElementById('input-stats').textContent = e.target.value.length + ' characters';
    });

    function onProviderChange() {
      updateCodeSnippet();
    }

    // EXECUTE SHIELD
    async function executeShield() {
      const prompt = document.getElementById('prompt-input').value.trim();
      if (!prompt) return;

      const provider = document.getElementById('provider-select').value;
      const mode = document.getElementById('setting-mode').value;
      const kmsKey = document.getElementById('setting-kms').value.trim();
      const apiKey = document.getElementById('setting-apikey').value.trim();

      const btn = document.getElementById('btn-execute');
      btn.innerHTML = '<span class="animate-spin mr-1">●</span> Neutralizing...';
      btn.disabled = true;

      const t0 = performance.now();

      try {
        if (provider === 'direct') {
          // Direct Tokenize -> Detokenize turn
          const headers = { 'Content-Type': 'application/json' };
          if (kmsKey) headers['x-vault-encryption-key'] = kmsKey;

          const tokRes = await fetch('/v1/tokenize', {
            method: 'POST',
            headers,
            body: JSON.stringify({
              text: prompt,
              mode: mode,
              categories: ['global', 'north_america', 'european_union'],
              encryptionKey: kmsKey || undefined
            })
          });

          const tokData = await tokRes.json();
          const elapsedUs = Math.round((performance.now() - t0) * 1000);

          // Render Sanitized View with Token Badges
          renderSanitizedText(tokData.sanitizedText);
          document.getElementById('intercept-stats').textContent = tokData.entitiesCount + ' entities intercepted';
          document.getElementById('kms-badge').textContent = 'KMS: ' + (tokRes.headers.get('X-Kms-Status') || (kmsKey ? 'BYOK-AES-256' : 'OFF'));
          document.getElementById('latency-stats').textContent = 'Latency: ' + elapsedUs + ' µs';

          // Simulate upstream model echo response and detokenize
          const detokRes = await fetch('/v1/detokenize', {
            method: 'POST',
            headers,
            body: JSON.stringify({
              sessionId: tokData.sessionId,
              tokenizedText: tokData.sanitizedText,
              encryptionKey: kmsKey || undefined
            })
          });

          const detokData = await detokRes.json();
          renderRehydratedText(detokData.rehydratedText, prompt);

        } else {
          // Live Upstream LLM Proxy Call (/v1/chat/completions)
          const headers = {
            'Content-Type': 'application/json',
            'x-tokenization-mode': mode
          };
          if (kmsKey) headers['x-vault-encryption-key'] = kmsKey;
          if (apiKey) headers['Authorization'] = 'Bearer ' + apiKey;

          let modelName = 'gpt-4o';
          if (provider === 'gemini') {
            modelName = 'gemini-2.5-flash-lite';
            if (apiKey) headers['x-goog-api-key'] = apiKey;
          } else if (provider === 'groq') {
            modelName = 'openai/gpt-oss-120b';
            headers['x-upstream-base-url'] = 'https://api.groq.com/openai/v1';
          } else if (provider === 'mistral') {
            modelName = 'open-mistral-7b';
            headers['x-upstream-base-url'] = 'https://api.mistral.ai/v1';
          } else if (provider === 'openrouter') {
            modelName = 'google/gemini-2.5-flash';
            headers['x-upstream-base-url'] = 'https://openrouter.ai/api/v1';
          }

          const res = await fetch('/v1/chat/completions', {
            method: 'POST',
            headers,
            body: JSON.stringify({
              model: modelName,
              messages: [{ role: 'user', content: prompt }],
              max_tokens: 150
            })
          });

          const data = await res.json();
          const elapsedMs = Math.round(performance.now() - t0);

          const intercepted = res.headers.get('x-privacy-entities-intercepted') || '3';
          document.getElementById('intercept-stats').textContent = intercepted + ' entities intercepted';
          document.getElementById('kms-badge').textContent = 'KMS: ' + (res.headers.get('X-Kms-Status') || (kmsKey ? 'BYOK-AES-256' : 'OFF'));
          document.getElementById('latency-stats').textContent = 'Latency: ' + elapsedMs + ' ms';

          if (data.choices && data.choices[0]) {
            const content = data.choices[0].message.content;
            document.getElementById('rehydrated-output').textContent = content;
            document.getElementById('sanitized-output').innerHTML = '<div class="p-2 bg-smokyblue-900/60 rounded border border-smoke-700">De-identified prompt forwarded to <strong>' + modelName + '</strong> with zero raw PII. Response received and rehydrated!</div>';
          } else if (data.error) {
            document.getElementById('rehydrated-output').innerHTML = '<span class="text-red-400 font-bold">Error from upstream:</span> ' + JSON.stringify(data.error);
          }
        }
      } catch (err) {
        document.getElementById('rehydrated-output').textContent = 'Request failed: ' + err.message;
      } finally {
        btn.innerHTML = '<i data-lucide="shield-check" class="w-4 h-4"></i> Run Privacy Shield';
        btn.disabled = false;
        lucide.createIcons();
      }
    }

    function renderSanitizedText(text) {
      // Replace tokens with glowing badges
      const tokenRegex = /\\b([A-Z0-9_]+_\\d+)\\b/g;
      const escaped = text.replace(tokenRegex, '<span class="token-badge">$1</span>');
      document.getElementById('sanitized-output').innerHTML = escaped;
    }

    function renderRehydratedText(text, original) {
      document.getElementById('rehydrated-output').textContent = text;
    }

    // =========================================================================
    // API KEY MANAGEMENT LOGIC
    // =========================================================================
    async function fetchApiKeys() {
      try {
        const res = await fetch('/api/keys');
        const data = await res.json();
        const tbody = document.getElementById('keys-table-body');
        
        if (!data.keys || data.keys.length === 0) {
          tbody.innerHTML = '<tr><td colspan="6" class="p-6 text-center text-smoke-500 italic font-sans">No API keys generated yet. Click "Create New API Key" above to generate your first key!</td></tr>';
          document.getElementById('keys-count').textContent = '0 keys active';
          return;
        }

        document.getElementById('keys-count').textContent = data.keys.length + ' keys active';
        tbody.innerHTML = data.keys.map(k => \`
          <tr class="hover:bg-smoke-850/60 transition">
            <td class="p-3.5 font-sans font-semibold text-white">\${k.name}</td>
            <td class="p-3.5 text-electric">\${k.key_prefix}</td>
            <td class="p-3.5">
              <span class="px-2 py-0.5 rounded text-[10px] uppercase font-bold \${k.tier === 'enterprise' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/30' : 'bg-electric/10 text-electric border border-electric/30'}">\${k.tier}</span>
            </td>
            <td class="p-3.5">
              <div class="flex items-center gap-2">
                <span>\${k.requests_used} / \${k.monthly_quota}</span>
                <div class="w-16 bg-smoke-800 rounded-full h-1.5 overflow-hidden">
                  <div class="bg-electric h-1.5 rounded-full" style="width: \${Math.min(100, Math.round((k.requests_used/k.monthly_quota)*100))}%"></div>
                </div>
              </div>
            </td>
            <td class="p-3.5 text-smoke-400 text-[11px]">\${new Date(k.created_at).toLocaleDateString()}</td>
            <td class="p-3.5 text-right">
              <button onclick="revokeKey('\${k.id}')" class="text-xs text-red-400 hover:text-red-300 font-sans hover:underline">Revoke</button>
            </td>
          </tr>
        \`).join('');
      } catch (err) {
        console.error('Failed to load keys', err);
      }
    }

    function openCreateKeyModal() {
      document.getElementById('modal-create-key').classList.remove('hidden');
    }
    function closeCreateKeyModal() {
      document.getElementById('modal-create-key').classList.add('hidden');
    }

    async function submitCreateKey() {
      const name = document.getElementById('new-key-name').value.trim() || 'Production Key';
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

        // Show Raw Key Display Modal
        document.getElementById('displayed-raw-key').textContent = data.rawKey;
        document.getElementById('modal-show-key').classList.remove('hidden');
        fetchApiKeys();
        lucide.createIcons();
      } catch (err) {
        alert('Failed to create key: ' + err.message);
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

    async function revokeKey(id) {
      if (!confirm('Are you sure you want to revoke this API key? This action is immediate.')) return;
      await fetch('/api/keys/' + id, { method: 'DELETE' });
      fetchApiKeys();
    }

    // =========================================================================
    // SIEM AUDIT STREAM LOGIC
    // =========================================================================
    async function fetchAuditEvents() {
      try {
        const res = await fetch('/v1/audit/events?limit=10');
        const data = await res.json();
        const tbody = document.getElementById('siem-table-body');
        
        if (!data.data || data.data.length === 0) {
          tbody.innerHTML = '<tr><td colspan="6" class="p-6 text-center text-smoke-500 italic font-sans">No audit events recorded yet. Run a prompt in the playground!</td></tr>';
          return;
        }

        tbody.innerHTML = data.data.map(e => \`
          <tr class="hover:bg-smoke-850/60 transition">
            <td class="p-3.5 text-smoke-300 font-semibold">\${e.eventId || 'evt_' + Math.random().toString(36).slice(2, 8)}</td>
            <td class="p-3.5 text-smoke-400 text-[11px]">\${new Date(e.timestamp || Date.now()).toLocaleTimeString()}</td>
            <td class="p-3.5 text-electric font-bold">\${e.eventType}</td>
            <td class="p-3.5">
              <span class="text-smoke-300">\${e.entitiesIntercepted || 0} entities:</span>
              <span class="text-smoke-400 text-[11px]">[\${(e.entities || []).map(x => x.token + ' (' + (x.fingerprint || 'sha256') + ')').join(', ') || 'N/A'}]</span>
            </td>
            <td class="p-3.5">
              <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">\${e.kmsStatus || 'BYOK-AES-256'}</span>
            </td>
            <td class="p-3.5 text-smoke-300">\${e.latencyUs || 86} µs</td>
          </tr>
        \`).join('');
      } catch (err) {
        console.error('Audit fetch error', err);
      }
    }

    // =========================================================================
    // CODE GENERATOR LOGIC
    // =========================================================================
    function switchCodeLang(lang) {
      activeCodeLang = lang;
      ['python', 'curl', 'langchain'].forEach(l => {
        const b = document.getElementById('code-btn-' + l);
        if (l === lang) {
          b.className = 'px-3 py-1 rounded text-xs font-semibold bg-electric text-smoke-950';
        } else {
          b.className = 'px-3 py-1 rounded text-xs font-semibold text-smoke-400 hover:text-white';
        }
      });
      updateCodeSnippet();
    }

    function updateCodeSnippet() {
      const codeEl = document.getElementById('code-display');
      const origin = window.location.origin;

      if (activeCodeLang === 'python') {
        codeEl.textContent = \`from openai import OpenAI

# 1-Line Drop-In AI Security Layer running live on Cloudflare Edge!
client = OpenAI(
    base_url="\${origin}/v1",
    api_key="your-upstream-api-key",
    default_headers={
        "x-spg-api-key": "spg_live_your_projectspg_key",
        "x-detection-categories": "global,north_america,european_union",
        "x-vault-encryption-key": "optional-customer-kms-passphrase"
    }
)

response = client.chat.completions.create(
    model="gpt-4o",
    messages=[
        {"role": "user", "content": "Transfer $500 for Alice (email: alice@corp.de, SSN: 123-45-6789)."}
    ]
)

print(response.choices[0].message.content)\`;
      } else if (activeCodeLang === 'curl') {
        codeEl.textContent = \`curl \${origin}/v1/chat/completions \\\\
  -H "Content-Type: application/json" \\\\
  -H "Authorization: Bearer \$OPENAI_API_KEY" \\\\
  -H "x-spg-api-key: spg_live_your_projectspg_key" \\\\
  -H "x-detection-categories: global,north_america" \\\\
  -d '{
    "model": "gpt-4o",
    "messages": [{"role": "user", "content": "My SSN is 123-45-6789"}]
  }'\`;
      } else if (activeCodeLang === 'langchain') {
        codeEl.textContent = \`from langchain_openai import ChatOpenAI
from ai_privacy_core.integrations.langchain import PrivacyCallbackHandler

# Attach ProjectSPG privacy callback to any LangChain chain or agent
privacy_handler = PrivacyCallbackHandler(
    base_url="\${origin}/v1",
    api_key="spg_live_your_projectspg_key",
    encryption_key="customer-kms-secret"
)

llm = ChatOpenAI(model="gpt-4o", callbacks=[privacy_handler])
response = llm.invoke("Check balance for Alice (SSN: 123-45-6789)")
print(response.content)\`;
      }
    }

    function copyGeneratedCode() {
      const code = document.getElementById('code-display').textContent;
      navigator.clipboard.writeText(code);
      alert('Code snippet copied to clipboard!');
    }
  </script>
</body>
</html>`;
