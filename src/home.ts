export const HOME_HTML = `<!DOCTYPE html>
<html lang="en" class="h-full">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ProjectSPG — The Zero-Trust Privacy Gateway for Enterprise AI</title>
  <meta name="description" content="De-identify PII, health records, financial data, and secrets in sub-20ms before foreign LLM providers see it. Wire-compatible with OpenAI, Mistral, and Google AI.">
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23f0523d'><path d='M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5'/></svg>">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
  <script src="https://unpkg.com/lucide@latest"></script>
  <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
  <style>
    body { font-family: 'Inter', sans-serif; }
    pre, code, .font-mono { font-family: 'JetBrains Mono', monospace; }
    .bg-grid {
      background-size: 32px 32px;
      background-image: 
        linear-gradient(to right, rgba(0, 0, 0, 0.03) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(0, 0, 0, 0.03) 1px, transparent 1px);
    }
    .custom-scrollbar::-webkit-scrollbar {
      width: 5px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
      background: transparent;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background: rgba(148, 163, 184, 0.4);
      border-radius: 9999px;
    }
    /* Markdown Output Styling */
    #demo-rehydrated-output p {
      margin-bottom: 0.5rem;
    }
    #demo-rehydrated-output p:last-child {
      margin-bottom: 0;
    }
    #demo-rehydrated-output strong {
      font-weight: 600;
      color: #0f172a;
    }
    #demo-rehydrated-output ul, #demo-rehydrated-output ol {
      margin-top: 0.35rem;
      margin-bottom: 0.5rem;
      padding-left: 1.25rem;
    }
    #demo-rehydrated-output ul {
      list-style-type: disc;
    }
    #demo-rehydrated-output ol {
      list-style-type: decimal;
    }
    #demo-rehydrated-output li {
      margin-bottom: 0.2rem;
      line-height: 1.5;
    }
    #demo-rehydrated-output h1, #demo-rehydrated-output h2, #demo-rehydrated-output h3, #demo-rehydrated-output h4 {
      font-weight: 700;
      color: #0f172a;
      margin-top: 0.75rem;
      margin-bottom: 0.35rem;
      line-height: 1.3;
    }
    #demo-rehydrated-output h1 { font-size: 1rem; }
    #demo-rehydrated-output h2 { font-size: 0.925rem; }
    #demo-rehydrated-output h3 { font-size: 0.85rem; }
    #demo-rehydrated-output code {
      background-color: #f1f5f9;
      color: #0f172a;
      padding: 0.1rem 0.3rem;
      border-radius: 0.25rem;
      font-size: 0.9em;
      font-family: 'JetBrains Mono', monospace;
    }
    #demo-rehydrated-output hr {
      border: 0;
      border-top: 1px solid #e2e8f0;
      margin: 0.6rem 0;
    }
    /* Keyhole Edge-Hugging Beam Sweep Animation */
    @keyframes keyholeEdgeSweep {
      0% { stroke-dashoffset: 550; }
      100% { stroke-dashoffset: 0; }
    }
    .animate-keyhole-edge-sweep {
      animation: keyholeEdgeSweep 7s linear infinite;
    }
  </style>
</head>
<body class="min-h-full bg-[#fafafa] text-[#1e1e2e] flex flex-col antialiased">

  <!-- ========================================================================= -->
  <!-- NAVIGATION BAR                                                            -->
  <!-- ========================================================================= -->
  <header class="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-200/80">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      <div class="flex items-center gap-8">
        <a href="/home" class="flex items-center gap-2.5">
          <div class="w-8 h-8 rounded-lg bg-[#f0523d] flex items-center justify-center text-white shadow-xs">
            <i data-lucide="shield-check" class="w-5 h-5"></i>
          </div>
          <span class="font-bold text-lg text-slate-900 tracking-tight">projectspg</span>
          <span class="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-orange-50 text-[#f0523d] border border-orange-200">Gateway v2.0</span>
        </a>

        <nav class="hidden md:flex items-center gap-6 text-xs font-medium text-slate-600">
          <a href="#demo" class="hover:text-slate-900 transition">Live Demo</a>
          <a href="#features" class="hover:text-slate-900 transition">Architecture</a>
          <a href="#platform" class="hover:text-slate-900 transition">Platform</a>
          <a href="#code" class="hover:text-slate-900 transition">Code Examples</a>
          <a href="/#docs" class="hover:text-slate-900 transition">API Docs</a>
        </nav>
      </div>

      <div class="flex items-center gap-3">
        <a href="/" class="text-xs font-medium text-slate-700 hover:text-slate-900 px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition flex items-center gap-1.5">
          <i data-lucide="terminal" class="w-3.5 h-3.5 text-slate-500"></i>
          <span>Playground</span>
        </a>
        <a href="/" class="text-xs font-semibold text-white bg-[#f0523d] hover:bg-[#e0422d] px-3.5 py-1.5 rounded-lg shadow-xs transition flex items-center gap-1.5">
          <span>Open Console</span>
          <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
        </a>
      </div>
    </div>
  </header>

  <main class="flex-1 bg-grid">

    <!-- ========================================================================= -->
    <!-- HERO SECTION: Agentic Infrastructure (with Grid Background & Glowing Keyhole) -->
    <!-- ========================================================================= -->
    <section id="agentic-hero-section" class="relative overflow-hidden py-16 sm:py-20 lg:py-24 border-b border-gray-200/60">
    
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
        
        <!-- Left Column: Typography & CTAs -->
        <div class="lg:col-span-5 text-center lg:text-left space-y-6">
          <h1 class="text-4xl sm:text-6xl lg:text-[64px] font-extrabold tracking-tight text-slate-900 leading-[1.05]">
            Agentic<br />
            Infrastructure
          </h1>

          <div class="flex items-center justify-center lg:justify-start gap-3 pt-2">
            <a href="#demo" class="px-5 py-2.5 rounded-full bg-slate-900 hover:bg-black text-white text-xs font-semibold transition cursor-pointer shadow-xs">
              Deploy now
            </a>
            <a href="/#docs" class="px-5 py-2.5 rounded-full bg-white hover:bg-slate-50 text-slate-800 text-xs font-semibold border border-gray-300 hover:border-gray-400 transition cursor-pointer">
              Talk to sales
            </a>
          </div>
        </div>

        <!-- Center Column: Artistic Sketch-Styled Keyhole with Sharp Shadows & Sharp Rotating Line -->
        <div class="lg:col-span-4 flex items-center justify-center py-6 lg:py-0">
          <div id="keyhole-stage" class="relative flex flex-col items-center justify-center select-none">
            
            <svg viewBox="0 0 260 320" class="w-64 h-[315px] sm:w-80 sm:h-[394px] lg:w-[330px] lg:h-[406px] xl:w-[360px] xl:h-[443px] overflow-visible">
              <defs>
                <!-- Sharp Diagonal Cross-Hatching Pattern for Sketch Shadows (No blur) -->
                <pattern id="sketchHatch" width="6" height="6" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                  <line x1="0" y1="0" x2="0" y2="6" stroke="#94a3b8" stroke-width="1.3" stroke-linecap="square" />
                </pattern>

                <!-- Razor-Sharp Edge Beam Gradient (Vibrant high-contrast laser edge) -->
                <linearGradient id="sharpBeamGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#ffffff" />
                  <stop offset="25%" stop-color="#00d2ff" />
                  <stop offset="65%" stop-color="#a855f7" />
                  <stop offset="100%" stop-color="#ec4899" />
                </linearGradient>

                <!-- Perfectly Circular Top Keyhole Silhouette Path -->
                <path id="keyholeShape"
                  d="M 103.5 135 A 48 48 0 1 1 156.5 135 L 178 248 Q 178 258 168 258 L 92 258 Q 82 258 82 248 Z"
                />
              </defs>

              <!-- ================= SHARP SKETCH CAST SHADOW ================= -->
              <!-- Offset silhouette filled with crisp architectural hatching and sharp pen perimeter -->
              <use href="#keyholeShape" fill="url(#sketchHatch)" stroke="#64748b" stroke-width="1.5" transform="translate(10, 10)" />

              <!-- ================= SHARP SKETCH GROUND LINES ================= -->
              <!-- Architectural drafting ground hatching beneath the base (no blur) -->
              <g class="sketch-ground-lines" opacity="0.75">
                <line x1="68" y1="266" x2="202" y2="266" stroke="#475569" stroke-width="1.6" stroke-linecap="round" />
                <line x1="82" y1="271" x2="188" y2="271" stroke="#64748b" stroke-width="1.2" stroke-linecap="round" />
                <line x1="98" y1="276" x2="172" y2="276" stroke="#94a3b8" stroke-width="1.0" stroke-linecap="round" />
                <line x1="116" y1="280" x2="154" y2="280" stroke="#cbd5e1" stroke-width="0.8" stroke-linecap="round" />
              </g>

              <!-- ================= SOLID OBSIDIAN KEYHOLE BODY ================= -->
              <!-- Crisp ink silhouette that punches out cleanly against the grid background -->
              <use href="#keyholeShape" fill="#09090b" stroke="#09090b" stroke-width="1.5" />

              <!-- Subtle Technical / Architectural Inset Drafting Line -->
              <path
                d="M 114 136 A 44 44 0 1 1 146 136 L 168 246 Q 168 252 160 252 L 100 252 Q 92 252 92 246 Z"
                fill="none"
                stroke="#27272a"
                stroke-width="1"
                stroke-dasharray="5 4"
              />

              <!-- Architectural Drafting Center Crosshair at Circle Center (130, 95) -->
              <g stroke="#3f3f46" stroke-width="1" opacity="0.65">
                <line x1="124" y1="95" x2="136" y2="95" stroke-linecap="round" />
                <line x1="130" y1="89" x2="130" y2="101" stroke-linecap="round" />
                <circle cx="130" cy="95" r="3" fill="none" stroke="#3f3f46" stroke-width="0.8" />
              </g>

              <!-- ================= SHARP ROTATING LINE ================= -->
              <!-- Static subtle guide ink stroke along the rim -->
              <use href="#keyholeShape" fill="none" stroke="#27272a" stroke-width="1.5" opacity="0.5" />

              <!-- Primary sharp rotating beam (Zero blur, crisp 3px stroke tracing perimeter) -->
              <use href="#keyholeShape"
                   fill="none"
                   stroke="url(#sharpBeamGrad)"
                   stroke-width="3"
                   stroke-dasharray="130 420"
                   stroke-linecap="round"
                   class="animate-keyhole-edge-sweep" />

              <!-- Sharp white leading tip (Zero blur, razor-sharp white focal point) -->
              <use href="#keyholeShape"
                   fill="none"
                   stroke="#ffffff"
                   stroke-width="3"
                   stroke-dasharray="24 526"
                   stroke-linecap="round"
                   class="animate-keyhole-edge-sweep" />
            </svg>

          </div>
        </div>

        <!-- Right Column: 3-line bullet copy (matching screenshot) -->
        <div class="lg:col-span-3 text-center lg:text-left">
          <div class="text-sm sm:text-base text-slate-600 font-medium leading-relaxed space-y-2">
            <p>For coding agents</p>
            <p>To ship apps and agents</p>
            <p>Automated by agents</p>
          </div>
        </div>

      </div>
    </div>
  </section>

  <!-- ========================================================================= -->
  <!-- HERO DEMO SECTION (v0-Style Input Bar in Light Theme)                     -->
  <!-- ========================================================================= -->
  <section class="max-w-4xl mx-auto px-4 sm:px-6 pt-12 pb-16 text-center">
      
      <!-- Top Announcement Pill (Matching v0 style) -->
      <a href="/#docs" class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-gray-200/90 hover:border-gray-300 text-slate-700 text-xs font-medium mb-8 shadow-2xs transition group">
        <span class="w-4 h-4 rounded-full bg-[#f0523d] flex items-center justify-center text-white text-[9px]">⚡</span>
        <span>Drop-in OpenAI wire compatibility</span>
        <span class="text-slate-400 group-hover:translate-x-0.5 transition-transform">›</span>
      </a>

      <!-- Main Headline (Matching v0 style) -->
      <h1 class="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-8">
        What do you want to protect?
      </h1>

      <!-- ===================================================================== -->
      <!-- v0-STYLE PROMPT CONTAINER CARD                                        -->
      <!-- ===================================================================== -->
      <div id="demo" class="w-full bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md focus-within:shadow-md focus-within:border-[#f0523d]/50 transition-all p-3 sm:p-4 text-left scroll-mt-24 mb-4">
        
        <!-- Textarea input area -->
        <textarea id="demo-prompt-input" rows="3" placeholder="Enter a prompt with patient data, SSNs, credit cards, or customer PII..." class="w-full text-xs sm:text-sm font-sans p-1 bg-transparent border-0 focus:outline-none text-slate-800 placeholder-slate-400 leading-relaxed resize-none">Patient Eleanor Vance (SSN: 902-48-1229, DOB: 04/18/1972) admitted to St. Jude ICU. Prescribed 50mg Metoprolol. Contact doctor at dr.marcus@hospital.org.</textarea>

        <!-- Bottom action strip inside the prompt container -->
        <div class="flex items-center justify-between pt-3 border-t border-gray-100 mt-2">
          
          <!-- Left: Model selector pill & dropdown (v0-style) -->
          <div class="relative" id="model-dropdown-container">
            <!-- Trigger button -->
            <button
              type="button"
              id="model-dropdown-trigger"
              onclick="toggleModelDropdown(event)"
              class="flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-gray-200 bg-slate-50 hover:bg-slate-100 text-slate-800 text-xs font-medium transition cursor-pointer shadow-2xs"
            >
              <div class="w-4 h-4 rounded bg-[#f0523d]/10 text-[#f0523d] flex items-center justify-center font-bold text-[10px]">
                <i data-lucide="cpu" class="w-3 h-3 text-[#f0523d]"></i>
              </div>
              <span id="selected-model-name" class="font-semibold text-slate-800">SPG Pro</span>
              <i data-lucide="chevron-down" id="model-dropdown-chevron" class="w-3.5 h-3.5 text-slate-400 transition-transform duration-150"></i>
            </button>

            <!-- Dropdown Menu Floating Card (matching uploaded design) -->
            <div
              id="model-dropdown-menu"
              class="hidden absolute left-0 bottom-full mb-2 w-72 sm:w-80 bg-white rounded-xl border border-gray-200 shadow-xl p-2 z-50 text-left"
            >
              <!-- Search bar inside menu -->
              <div class="relative mb-2">
                <i data-lucide="search" class="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none"></i>
                <input
                  type="text"
                  id="model-search-input"
                  oninput="filterModelDropdown(this.value)"
                  placeholder="Search models..."
                  class="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-gray-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#f0523d] focus:bg-white"
                />
              </div>

              <!-- Model items list -->
              <div id="model-items-list" class="space-y-1 max-h-56 overflow-y-auto">
                
                <!-- SPG Pro (Default) -->
                <div
                  onclick="selectDemoModel('SPG Pro', 'ministral-8b-2512')"
                  data-model-id="ministral-8b-2512"
                  data-model-name="SPG Pro"
                  class="model-option flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 cursor-pointer transition group"
                >
                  <div class="flex items-center gap-2.5 min-w-0">
                    <div class="w-7 h-7 rounded-lg bg-orange-50 border border-orange-200/60 flex items-center justify-center text-[#f0523d] shrink-0">
                      <i data-lucide="sparkles" class="w-3.5 h-3.5"></i>
                    </div>
                    <div class="min-w-0">
                      <div class="flex items-center gap-1.5">
                        <span class="text-xs font-semibold text-slate-800 group-hover:text-[#f0523d] transition">SPG Pro</span>
                        <span class="text-[9px] font-medium px-1.5 py-0.2 rounded bg-orange-50 text-[#f0523d] border border-orange-200/80">Default</span>
                      </div>
                      <p class="text-[11px] text-slate-500 truncate">Balanced reasoning • 8B</p>
                    </div>
                  </div>
                  <i data-lucide="check" class="model-check-icon w-4 h-4 text-[#f0523d]"></i>
                </div>

                <!-- SPG Mini -->
                <div
                  onclick="selectDemoModel('SPG Mini', 'ministral-3b-2512')"
                  data-model-id="ministral-3b-2512"
                  data-model-name="SPG Mini"
                  class="model-option flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 cursor-pointer transition group"
                >
                  <div class="flex items-center gap-2.5 min-w-0">
                    <div class="w-7 h-7 rounded-lg bg-blue-50 border border-blue-200/60 flex items-center justify-center text-blue-600 shrink-0">
                      <i data-lucide="zap" class="w-3.5 h-3.5"></i>
                    </div>
                    <div class="min-w-0">
                      <div class="flex items-center gap-1.5">
                        <span class="text-xs font-semibold text-slate-800 group-hover:text-[#f0523d] transition">SPG Mini</span>
                        <span class="text-[9px] font-medium px-1.5 py-0.2 rounded bg-blue-50 text-blue-600 border border-blue-200/80">Fast</span>
                      </div>
                      <p class="text-[11px] text-slate-500 truncate">Fastest latency • 3B</p>
                    </div>
                  </div>
                  <i data-lucide="check" class="model-check-icon hidden w-4 h-4 text-[#f0523d]"></i>
                </div>

                <!-- SPG Code -->
                <div
                  onclick="selectDemoModel('SPG Code', 'codestral-2508')"
                  data-model-id="codestral-2508"
                  data-model-name="SPG Code"
                  class="model-option flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 cursor-pointer transition group"
                >
                  <div class="flex items-center gap-2.5 min-w-0">
                    <div class="w-7 h-7 rounded-lg bg-purple-50 border border-purple-200/60 flex items-center justify-center text-purple-600 shrink-0">
                      <i data-lucide="code-2" class="w-3.5 h-3.5"></i>
                    </div>
                    <div class="min-w-0">
                      <div class="flex items-center gap-1.5">
                        <span class="text-xs font-semibold text-slate-800 group-hover:text-[#f0523d] transition">SPG Code</span>
                      </div>
                      <p class="text-[11px] text-slate-500 truncate">Specialized coding & agentic</p>
                    </div>
                  </div>
                  <i data-lucide="check" class="model-check-icon hidden w-4 h-4 text-[#f0523d]"></i>
                </div>

                <!-- SPG Max -->
                <div
                  onclick="selectDemoModel('SPG Max', 'mistral-large-2512')"
                  data-model-id="mistral-large-2512"
                  data-model-name="SPG Max"
                  class="model-option flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 cursor-pointer transition group"
                >
                  <div class="flex items-center gap-2.5 min-w-0">
                    <div class="w-7 h-7 rounded-lg bg-emerald-50 border border-emerald-200/60 flex items-center justify-center text-emerald-600 shrink-0">
                      <i data-lucide="brain-circuit" class="w-3.5 h-3.5"></i>
                    </div>
                    <div class="min-w-0">
                      <div class="flex items-center gap-1.5">
                        <span class="text-xs font-semibold text-slate-800 group-hover:text-[#f0523d] transition">SPG Max</span>
                        <span class="text-[9px] font-medium px-1.5 py-0.2 rounded bg-emerald-50 text-emerald-600 border border-emerald-200/80">Flagship</span>
                      </div>
                      <p class="text-[11px] text-slate-500 truncate">Deep reasoning • Large</p>
                    </div>
                  </div>
                  <i data-lucide="check" class="model-check-icon hidden w-4 h-4 text-[#f0523d]"></i>
                </div>

              </div>

              <!-- No results state -->
              <div id="model-no-results" class="hidden text-center py-4 text-xs text-slate-400">
                No matching models
              </div>
            </div>

            <!-- Hidden input to store chosen model id -->
            <input type="hidden" id="demo-model-value" value="ministral-8b-2512" />
          </div>

          <!-- Right: Clear + Submit button -->
          <div class="flex items-center gap-2">
            <button onclick="clearDemoPrompt()" class="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition cursor-pointer" title="Clear prompt">
              <i data-lucide="eraser" class="w-4 h-4"></i>
            </button>
            <button onclick="runHeroDemo()" id="btn-run-demo" class="w-8 h-8 rounded-lg bg-[#f0523d] hover:bg-[#e0422d] text-white flex items-center justify-center shadow-xs transition cursor-pointer disabled:opacity-50" title="Run Sanitize & Inference">
              <i data-lucide="arrow-up" class="w-4 h-4 stroke-[2.5]"></i>
            </button>
          </div>

        </div>

      </div>

      <!-- ===================================================================== -->
      <!-- PRESET SUGGESTION PILLS (v0-Style Pill Strip)                        -->
      <!-- ===================================================================== -->
      <div class="flex flex-wrap items-center justify-center gap-2 mb-10">
        <button onclick="setDemoPreset('healthcare')" class="demo-pill px-3.5 py-1.5 rounded-full bg-white hover:bg-gray-50 border border-gray-200 text-slate-700 text-xs font-medium shadow-2xs flex items-center gap-1.5 transition cursor-pointer">
          <i data-lucide="heart-pulse" class="w-3.5 h-3.5 text-rose-500"></i>
          <span>Patient Records (HIPAA)</span>
        </button>

        <button onclick="setDemoPreset('fintech')" class="demo-pill px-3.5 py-1.5 rounded-full bg-white hover:bg-gray-50 border border-gray-200 text-slate-700 text-xs font-medium shadow-2xs flex items-center gap-1.5 transition cursor-pointer">
          <i data-lucide="credit-card" class="w-3.5 h-3.5 text-blue-500"></i>
          <span>Credit Cards (PCI)</span>
        </button>

        <button onclick="setDemoPreset('hr')" class="demo-pill px-3.5 py-1.5 rounded-full bg-white hover:bg-gray-50 border border-gray-200 text-slate-700 text-xs font-medium shadow-2xs flex items-center gap-1.5 transition cursor-pointer">
          <i data-lucide="user-check" class="w-3.5 h-3.5 text-amber-500"></i>
          <span>Employee HR (PII)</span>
        </button>

        <button onclick="setDemoPreset('devops')" class="demo-pill px-3.5 py-1.5 rounded-full bg-white hover:bg-gray-50 border border-gray-200 text-slate-700 text-xs font-medium shadow-2xs flex items-center gap-1.5 transition cursor-pointer">
          <i data-lucide="key-round" class="w-3.5 h-3.5 text-purple-500"></i>
          <span>API Keys & Secrets</span>
        </button>

        <button onclick="cycleDemoPreset()" class="p-1.5 rounded-full bg-white hover:bg-gray-50 border border-gray-200 text-slate-400 hover:text-slate-700 shadow-2xs transition cursor-pointer" title="Shuffle prompt sample">
          <i data-lucide="rotate-cw" class="w-3.5 h-3.5"></i>
        </button>
      </div>

      <!-- ===================================================================== -->
      <!-- RESULTS DISPLAY CARD (Revealed when user hits submit)                 -->
      <!-- ===================================================================== -->
      <div id="demo-results-container" class="hidden text-left bg-white rounded-2xl border border-gray-200/90 shadow-md p-4 sm:p-6 space-y-4 mb-12">
        
        <!-- Status Bar -->
        <div class="flex flex-wrap items-center justify-between gap-2 p-3 bg-emerald-50/80 border border-emerald-200 rounded-xl text-xs text-emerald-900">
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span class="font-semibold">De-identification & Inference Succeeded</span>
          </div>
          <div class="flex items-center gap-4 text-[11px] font-mono">
            <div>Protected Entities: <span id="demo-metric-entities" class="font-bold text-emerald-800">4</span></div>
            <div>Latency: <span id="demo-metric-latency" class="font-bold text-emerald-800">14 ms</span></div>
            <div>Model: <span id="demo-metric-model" class="font-bold text-slate-700">ministral-8b-2512</span></div>
          </div>
        </div>

        <!-- Split Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          
          <!-- Left: What Upstream Mistral Received -->
          <div class="p-4 bg-slate-900 text-slate-100 rounded-xl border border-slate-800 space-y-2 flex flex-col">
            <div class="flex items-center justify-between text-[11px] text-slate-400 border-b border-slate-800 pb-2">
              <span class="font-semibold text-amber-400 flex items-center gap-1.5">
                <i data-lucide="eye-off" class="w-3.5 h-3.5"></i>
                What Mistral AI Saw
              </span>
              <span class="text-emerald-400 text-[10px] bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-800">Zero PII Leaked</span>
            </div>
            <div id="demo-sanitized-output" class="text-[11.5px] leading-relaxed text-slate-300 font-mono whitespace-pre-wrap max-h-72 overflow-y-auto pr-2 custom-scrollbar"></div>
          </div>

          <!-- Right: What You Received (Rehydrated) -->
          <div class="p-4 bg-slate-50 text-slate-900 rounded-xl border border-gray-200 space-y-2 flex flex-col">
            <div class="flex items-center justify-between text-[11px] text-slate-500 border-b border-gray-200 pb-2">
              <span class="font-semibold text-emerald-600 flex items-center gap-1.5">
                <i data-lucide="check-circle" class="w-3.5 h-3.5"></i>
                What Your Application Received
              </span>
              <span class="text-slate-500 text-[10px]">100% Rehydrated</span>
            </div>
            <div id="demo-rehydrated-output" class="text-[12px] leading-relaxed text-slate-800 font-sans max-h-72 overflow-y-auto pr-2 custom-scrollbar"></div>
          </div>

        </div>

        <div class="text-center pt-2">
          <button onclick="handleSecondTestTrigger()" class="text-xs font-medium text-[#f0523d] hover:text-[#e0422d] underline cursor-pointer">
            Run another prompt or switch to full developer console →
          </button>
        </div>

      </div>

    </section>

    <!-- ======================================================================= -->
    <!-- VALUE PROPS & ARCHITECTURE SECTION                                      -->
    <!-- ======================================================================= -->
    <section id="features" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-gray-200/80">
      <div class="text-center max-w-3xl mx-auto mb-12">
        <h2 class="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-3">
          Enterprise Security without Changing Your Code
        </h2>
        <p class="text-sm text-slate-600">
          Switch one baseURL parameter in your OpenAI SDK to immediately achieve HIPAA, GDPR, and PCI-DSS compliance.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div class="p-6 bg-white rounded-2xl border border-gray-200 shadow-2xs space-y-3">
          <div class="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-[#f0523d]">
            <i data-lucide="zap" class="w-5 h-5"></i>
          </div>
          <h3 class="text-base font-bold text-slate-900">Sub-20ms Edge Latency</h3>
          <p class="text-xs text-slate-600 leading-relaxed">
            Runs natively on Cloudflare Workers across 300+ global edge locations. Intercepts and masks text at lightning speed with zero measurable impact on end-user streaming.
          </p>
        </div>

        <div class="p-6 bg-white rounded-2xl border border-gray-200 shadow-2xs space-y-3">
          <div class="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
            <i data-lucide="globe" class="w-5 h-5"></i>
          </div>
          <h3 class="text-base font-bold text-slate-900">109 Sovereign Jurisdictions</h3>
          <p class="text-xs text-slate-600 leading-relaxed">
            Recognizes country-specific IDs out-of-the-box: US SSN, UK NHS, German Steuer-ID, Singapore NRIC, Indian PAN/Aadhaar, Brazilian CPF, and European IBANs.
          </p>
        </div>

        <div class="p-6 bg-white rounded-2xl border border-gray-200 shadow-2xs space-y-3">
          <div class="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
            <i data-lucide="key" class="w-5 h-5"></i>
          </div>
          <h3 class="text-base font-bold text-slate-900">Bring Your Own Key (BYOK)</h3>
          <p class="text-xs text-slate-600 leading-relaxed">
            Supply your own Google AI Studio, Groq, Mistral, or OpenAI API keys directly in standard headers. Enjoy enterprise privacy with zero markup on model tokens.
          </p>
        </div>

      </div>
    </section>

    <!-- ======================================================================= -->
    <!-- THE PROJECTSPG PLATFORM SECTION                                         -->
    <!-- ======================================================================= -->
    <section id="platform" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 border-t border-gray-200/80">
      
      <!-- Section Header -->
      <div class="text-center max-w-3xl mx-auto mb-10">
        <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
          The ProjectSPG Platform
        </h2>
        <p class="text-sm sm:text-base text-slate-600 leading-relaxed">
          End-to-end data de-identification, zero-retention privacy routing, and continuous enterprise compliance.
        </p>
      </div>

      <!-- Platform Pill Tabs (De-Identify, Privacy, Compliance) -->
      <div class="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-12">
        <button
          onclick="selectPlatformTab('deidentify')"
          id="tab-btn-deidentify"
          class="platform-tab-btn px-7 sm:px-9 py-2.5 sm:py-3 rounded-2xl text-xs sm:text-sm font-semibold transition cursor-pointer bg-[#d6f5f0] text-slate-900 border border-[#b2ebe1] shadow-2xs"
        >
          De-Identify
        </button>
        <button
          onclick="selectPlatformTab('privacy')"
          id="tab-btn-privacy"
          class="platform-tab-btn px-7 sm:px-9 py-2.5 sm:py-3 rounded-2xl text-xs sm:text-sm font-medium transition cursor-pointer bg-white hover:bg-slate-50 text-slate-700 border border-gray-200 shadow-2xs"
        >
          Privacy
        </button>
        <button
          onclick="selectPlatformTab('compliance')"
          id="tab-btn-compliance"
          class="platform-tab-btn px-7 sm:px-9 py-2.5 sm:py-3 rounded-2xl text-xs sm:text-sm font-medium transition cursor-pointer bg-white hover:bg-slate-50 text-slate-700 border border-gray-200 shadow-2xs"
        >
          Compliance
        </button>
      </div>

      <!-- ==================== PANEL 1: DE-IDENTIFY ==================== -->
      <div id="panel-deidentify" class="platform-tab-panel">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <!-- Left: Accordion / Feature List -->
          <div class="lg:col-span-5 space-y-3">
            
            <!-- Item 1: Automatic Data Redaction (Active) -->
            <div
              id="feat-deidentify-1"
              onclick="selectPlatformFeature('deidentify', 1)"
              class="platform-feature-card p-6 bg-white rounded-2xl border border-gray-200 shadow-2xs cursor-pointer transition-all duration-200"
            >
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-lg bg-cyan-50 border border-cyan-200/60 flex items-center justify-center text-cyan-600 shrink-0">
                  <i data-lucide="shield-check" class="w-4 h-4"></i>
                </div>
                <h3 class="text-base font-bold text-slate-900">Automatic Data Redaction</h3>
              </div>
              <div id="feat-content-deidentify-1" class="pt-3">
                <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Automatically redact customer PII and confidential records before prompts reach AI models, preventing data leaks without slowing development.
                </p>
                <div class="pt-4">
                  <a href="#demo" class="inline-flex items-center px-4 py-2 bg-black hover:bg-slate-800 text-white text-[11px] font-bold tracking-wider rounded-md uppercase transition cursor-pointer shadow-2xs">
                    TRY IN PLAYGROUND
                  </a>
                </div>
              </div>
            </div>

            <!-- Item 2: Context-Preserving Masking -->
            <div
              id="feat-deidentify-2"
              onclick="selectPlatformFeature('deidentify', 2)"
              class="platform-feature-card p-5 bg-white/70 hover:bg-white rounded-2xl border border-gray-200/80 shadow-2xs cursor-pointer transition-all duration-200"
            >
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                  <i data-lucide="hash" class="w-4 h-4"></i>
                </div>
                <h3 class="text-base font-bold text-slate-800">Context-Preserving Masking</h3>
              </div>
              <div id="feat-content-deidentify-2" class="hidden pt-3">
                <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Synthesizes grammatically-typed placeholders (e.g. PERSON_1, EMAIL_1) preserving syntactic role and meaning so downstream LLMs maintain optimal reasoning and code accuracy.
                </p>
                <div class="pt-4">
                  <a href="#demo" class="inline-flex items-center px-4 py-2 bg-black hover:bg-slate-800 text-white text-[11px] font-bold tracking-wider rounded-md uppercase transition cursor-pointer shadow-2xs">
                    TRY IN PLAYGROUND
                  </a>
                </div>
              </div>
            </div>

            <!-- Item 3: Global Privacy Scanner -->
            <div
              id="feat-deidentify-3"
              onclick="selectPlatformFeature('deidentify', 3)"
              class="platform-feature-card p-5 bg-white/70 hover:bg-white rounded-2xl border border-gray-200/80 shadow-2xs cursor-pointer transition-all duration-200"
            >
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                  <i data-lucide="scan" class="w-4 h-4"></i>
                </div>
                <h3 class="text-base font-bold text-slate-800">Global Privacy Scanner</h3>
              </div>
              <div id="feat-content-deidentify-3" class="hidden pt-3">
                <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Zero-configuration multi-jurisdictional detection engine covering 109 countries: HIPAA identifiers, GDPR national IDs, PCI-DSS cards, IBANs, and custom enterprise rules.
                </p>
                <div class="pt-4">
                  <a href="#demo" class="inline-flex items-center px-4 py-2 bg-black hover:bg-slate-800 text-white text-[11px] font-bold tracking-wider rounded-md uppercase transition cursor-pointer shadow-2xs">
                    TRY IN PLAYGROUND
                  </a>
                </div>
              </div>
            </div>

            <!-- Item 4: Secure Enterprise Vault -->
            <div
              id="feat-deidentify-4"
              onclick="selectPlatformFeature('deidentify', 4)"
              class="platform-feature-card p-5 bg-white/70 hover:bg-white rounded-2xl border border-gray-200/80 shadow-2xs cursor-pointer transition-all duration-200"
            >
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                  <i data-lucide="database" class="w-4 h-4"></i>
                </div>
                <h3 class="text-base font-bold text-slate-800">Secure Enterprise Vault</h3>
              </div>
              <div id="feat-content-deidentify-4" class="hidden pt-3">
                <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  In-memory, zero-retention AES-256-GCM token storage with optional Cloud KMS key envelopes. Ephemeral rehydration mappings never touch persistent disk.
                </p>
                <div class="pt-4">
                  <a href="#demo" class="inline-flex items-center px-4 py-2 bg-black hover:bg-slate-800 text-white text-[11px] font-bold tracking-wider rounded-md uppercase transition cursor-pointer shadow-2xs">
                    TRY IN PLAYGROUND
                  </a>
                </div>
              </div>
            </div>

          </div>

          <!-- Right: Vibrant Mesh Backdrop + Overlapping Mockup Windows -->
          <div class="lg:col-span-7">
            <div
              class="relative rounded-3xl p-4 sm:p-7 lg:p-8 overflow-hidden shadow-2xl min-h-[460px] sm:min-h-[500px] flex items-center justify-center"
              style="background: radial-gradient(circle at 10% 45%, #f43f5e 0%, rgba(244, 63, 94, 0.45) 30%, transparent 60%), radial-gradient(circle at 85% 20%, #06b6d4 0%, rgba(14, 165, 233, 0.6) 35%, transparent 65%), linear-gradient(135deg, #0f172a 0%, #090d16 100%);"
            >
              <!-- Background Decorative Lighting Accents -->
              <div class="absolute -top-12 -right-12 w-64 h-64 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none"></div>
              <div class="absolute -bottom-12 -left-12 w-64 h-64 bg-rose-500/20 rounded-full blur-3xl pointer-events-none"></div>

              <!-- Main Behind Window: Playground Console Mockup -->
              <div class="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-white/40 overflow-hidden transform translate-x-2 -translate-y-6 sm:translate-x-6 sm:-translate-y-8">
                
                <!-- Console Top Header -->
                <div class="px-4 py-2.5 border-b border-gray-100 flex items-center justify-between bg-slate-50/60">
                  <div class="flex items-center gap-2">
                    <span class="font-bold text-xs text-slate-900 tracking-tight">projectspg</span>
                    <span class="text-[10px] text-slate-400 font-medium">Personal / Default Project</span>
                  </div>
                  <div class="flex items-center gap-1.5">
                    <span class="w-2 h-2 rounded-full bg-slate-300"></span>
                    <span class="w-2 h-2 rounded-full bg-slate-300"></span>
                    <span class="w-2 h-2 rounded-full bg-slate-300"></span>
                  </div>
                </div>

                <!-- Navigation Sub-Pills inside Console -->
                <div class="px-4 py-2 border-b border-gray-100 flex items-center gap-4 text-xs font-semibold">
                  <span class="text-slate-900 border-b-2 border-slate-900 pb-1 -mb-2.5">Playground</span>
                  <span class="text-slate-400 font-medium">Free</span>
                  <span class="text-slate-400 font-medium">BYOK</span>
                </div>

                <!-- Console Body Input Form -->
                <div class="p-4 space-y-3 text-left">
                  <div>
                    <div class="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">SYSTEM</div>
                    <div class="text-[11px] text-slate-400 italic bg-slate-50 border border-slate-100 rounded-lg p-2">
                      Enter system message (Optional)
                    </div>
                  </div>
                  <div>
                    <div class="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">USER</div>
                    <div class="text-[11px] text-slate-700 bg-slate-50/80 border border-slate-200/80 rounded-lg p-2.5 leading-relaxed font-sans select-none">
                      Draft a formal account confirmation email for Dr. Elena Rostova (SSN: 942-81-6720, phone: +1-415-555-0184, elena.rostova@biotech.org). Summarize her recent wire transfer of $14,850 to credit account 4829-1039-5582 on October 14, and ask her to review all listed contact and payment records before our compliance audit team approves the release.
                    </div>
                  </div>
                </div>
              </div>

              <!-- Foreground Overlapping Card: Protected Prompt -->
              <div class="absolute bottom-4 left-3 sm:left-6 max-w-md w-[92%] sm:w-[86%] bg-white/95 backdrop-blur-md rounded-2xl border border-cyan-200/90 shadow-2xl p-4 sm:p-5 text-left">
                <div class="flex items-center justify-between pb-2 mb-2.5 border-b border-slate-100">
                  <div class="flex items-center gap-2 min-w-0">
                    <div class="w-4 h-4 rounded-full bg-cyan-50 flex items-center justify-center text-cyan-600 shrink-0">
                      <i data-lucide="shield" class="w-3 h-3"></i>
                    </div>
                    <span class="text-[10px] font-bold tracking-wider text-slate-800 uppercase truncate">
                      PROTECTED PROMPT (SENT TO AI)
                    </span>
                    <span class="text-[9px] font-semibold px-2 py-0.5 rounded-full bg-sky-50 text-sky-600 border border-sky-200/80 shrink-0">
                      4 Entities Masked
                    </span>
                  </div>
                  <div class="flex items-center gap-1 text-[10px] text-slate-400 hover:text-slate-600 cursor-pointer shrink-0">
                    <i data-lucide="copy" class="w-3 h-3"></i>
                    <span>Copy</span>
                  </div>
                </div>
                <p class="text-[11px] sm:text-xs text-slate-700 leading-relaxed font-sans">
                  Draft a formal account confirmation email for Dr.
                  <span class="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded bg-amber-50 text-amber-900 border border-amber-200 font-mono text-[10px]">
                    <i data-lucide="lock" class="w-2.5 h-2.5 text-amber-600"></i>PERSON_1
                  </span>
                  (SSN:
                  <span class="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded bg-sky-50 text-sky-900 border border-sky-200 font-mono text-[10px]">
                    <i data-lucide="lock" class="w-2.5 h-2.5 text-sky-600"></i>ITIN_1
                  </span>, phone:
                  <span class="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded bg-emerald-50 text-emerald-900 border border-emerald-200 font-mono text-[10px]">
                    <i data-lucide="lock" class="w-2.5 h-2.5 text-emerald-600"></i>PHONE_1
                  </span>,
                  <span class="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded bg-purple-50 text-purple-900 border border-purple-200 font-mono text-[10px]">
                    <i data-lucide="lock" class="w-2.5 h-2.5 text-purple-600"></i>EMAIL_1
                  </span>). Summarize her recent wire transfer of $14,850 to credit account 4829-1039-5582 on October 14, and ask her to review all listed contact and payment records before our compliance audit team approves the release.
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>

      <!-- ==================== PANEL 2: PRIVACY ==================== -->
      <div id="panel-privacy" class="platform-tab-panel hidden">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <!-- Left: Accordion / Feature List -->
          <div class="lg:col-span-5 space-y-3">
            
            <!-- Item 1: Zero-Retention Routing (Active) -->
            <div
              id="feat-privacy-1"
              onclick="selectPlatformFeature('privacy', 1)"
              class="platform-feature-card p-6 bg-white rounded-2xl border border-gray-200 shadow-2xs cursor-pointer transition-all duration-200"
            >
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200/60 flex items-center justify-center text-emerald-600 shrink-0">
                  <i data-lucide="shield-alert" class="w-4 h-4"></i>
                </div>
                <h3 class="text-base font-bold text-slate-900">Zero-Retention Routing</h3>
              </div>
              <div id="feat-content-privacy-1" class="pt-3">
                <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Neither raw prompts nor sensitive payload records are ever written to disk or logged in databases. Session mappings exist solely in volatile RAM and vanish instantly.
                </p>
                <div class="pt-4">
                  <a href="#demo" class="inline-flex items-center px-4 py-2 bg-black hover:bg-slate-800 text-white text-[11px] font-bold tracking-wider rounded-md uppercase transition cursor-pointer shadow-2xs">
                    TEST ZERO RETENTION
                  </a>
                </div>
              </div>
            </div>

            <!-- Item 2: Sovereign Edge Isolation -->
            <div
              id="feat-privacy-2"
              onclick="selectPlatformFeature('privacy', 2)"
              class="platform-feature-card p-5 bg-white/70 hover:bg-white rounded-2xl border border-gray-200/80 shadow-2xs cursor-pointer transition-all duration-200"
            >
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                  <i data-lucide="globe" class="w-4 h-4"></i>
                </div>
                <h3 class="text-base font-bold text-slate-800">Sovereign Edge Isolation</h3>
              </div>
              <div id="feat-content-privacy-2" class="hidden pt-3">
                <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Pin AI inference processing strictly within GDPR-compliant EU zones, US sovereign federal perimeters, or local data residency zones without cross-border transit.
                </p>
                <div class="pt-4">
                  <a href="#demo" class="inline-flex items-center px-4 py-2 bg-black hover:bg-slate-800 text-white text-[11px] font-bold tracking-wider rounded-md uppercase transition cursor-pointer shadow-2xs">
                    TEST ZERO RETENTION
                  </a>
                </div>
              </div>
            </div>

            <!-- Item 3: Customer KMS Envelopes -->
            <div
              id="feat-privacy-3"
              onclick="selectPlatformFeature('privacy', 3)"
              class="platform-feature-card p-5 bg-white/70 hover:bg-white rounded-2xl border border-gray-200/80 shadow-2xs cursor-pointer transition-all duration-200"
            >
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                  <i data-lucide="key" class="w-4 h-4"></i>
                </div>
                <h3 class="text-base font-bold text-slate-800">Customer KMS Envelopes</h3>
              </div>
              <div id="feat-content-privacy-3" class="hidden pt-3">
                <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Bring your own AWS KMS, Google Cloud KMS, or HashiCorp Vault root keys to seal session tokenization vaults. Nobody—not even the infrastructure—can decrypt without your key.
                </p>
                <div class="pt-4">
                  <a href="#demo" class="inline-flex items-center px-4 py-2 bg-black hover:bg-slate-800 text-white text-[11px] font-bold tracking-wider rounded-md uppercase transition cursor-pointer shadow-2xs">
                    TEST ZERO RETENTION
                  </a>
                </div>
              </div>
            </div>

            <!-- Item 4: BYOK Direct Upstream Routing -->
            <div
              id="feat-privacy-4"
              onclick="selectPlatformFeature('privacy', 4)"
              class="platform-feature-card p-5 bg-white/70 hover:bg-white rounded-2xl border border-gray-200/80 shadow-2xs cursor-pointer transition-all duration-200"
            >
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                  <i data-lucide="lock" class="w-4 h-4"></i>
                </div>
                <h3 class="text-base font-bold text-slate-800">Bring Your Own Key (BYOK)</h3>
              </div>
              <div id="feat-content-privacy-4" class="hidden pt-3">
                <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Supply your own OpenAI, Anthropic, Mistral, or Groq API credentials. Your keys pass directly to verified providers with strict zero-markup and tenant isolation.
                </p>
                <div class="pt-4">
                  <a href="#demo" class="inline-flex items-center px-4 py-2 bg-black hover:bg-slate-800 text-white text-[11px] font-bold tracking-wider rounded-md uppercase transition cursor-pointer shadow-2xs">
                    TEST ZERO RETENTION
                  </a>
                </div>
              </div>
            </div>

          </div>

          <!-- Right: Vibrant Mesh Backdrop + Privacy Mockup Windows -->
          <div class="lg:col-span-7">
            <div
              class="relative rounded-3xl p-4 sm:p-7 lg:p-8 overflow-hidden shadow-2xl min-h-[460px] sm:min-h-[500px] flex items-center justify-center"
              style="background: radial-gradient(circle at 10% 45%, #059669 0%, rgba(5, 150, 105, 0.45) 30%, transparent 60%), radial-gradient(circle at 85% 20%, #0284c7 0%, rgba(2, 132, 199, 0.6) 35%, transparent 65%), linear-gradient(135deg, #022c22 0%, #061e29 100%);"
            >
              <div class="absolute -top-12 -right-12 w-64 h-64 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none"></div>
              <div class="absolute -bottom-12 -left-12 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none"></div>

              <!-- Main Behind Window: Privacy Security Pipeline -->
              <div class="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-white/40 overflow-hidden transform translate-x-2 -translate-y-6 sm:translate-x-6 sm:-translate-y-8">
                <div class="px-4 py-2.5 border-b border-gray-100 flex items-center justify-between bg-slate-50/60">
                  <div class="flex items-center gap-2">
                    <span class="font-bold text-xs text-slate-900 tracking-tight">projectspg</span>
                    <span class="text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">Zero-Retention Gateway</span>
                  </div>
                  <div class="flex items-center gap-1.5">
                    <span class="w-2 h-2 rounded-full bg-slate-300"></span>
                    <span class="w-2 h-2 rounded-full bg-slate-300"></span>
                    <span class="w-2 h-2 rounded-full bg-slate-300"></span>
                  </div>
                </div>
                <div class="px-4 py-2 border-b border-gray-100 flex items-center gap-4 text-xs font-semibold">
                  <span class="text-slate-900 border-b-2 border-emerald-600 pb-1 -mb-2.5">Gateway Policy</span>
                  <span class="text-slate-400 font-medium">Residency</span>
                  <span class="text-slate-400 font-medium">Audit Pipe</span>
                </div>
                <div class="p-4 space-y-2.5 text-left font-mono text-[11px]">
                  <div class="p-2 rounded-lg bg-slate-50 border border-slate-200/70 flex justify-between items-center">
                    <span class="text-slate-500">Volatile In-Memory Buffer:</span>
                    <span class="text-emerald-700 font-bold">ACTIVE (Purged on Stream EOF)</span>
                  </div>
                  <div class="p-2 rounded-lg bg-slate-50 border border-slate-200/70 flex justify-between items-center">
                    <span class="text-slate-500">Persistent Disk Write:</span>
                    <span class="text-rose-600 font-bold">HARDWARE BLOCKED (0 B)</span>
                  </div>
                  <div class="p-2 rounded-lg bg-slate-50 border border-slate-200/70 flex justify-between items-center">
                    <span class="text-slate-500">Edge Transit Region:</span>
                    <span class="text-slate-800 font-semibold">eu-central-1 (Frankfurt)</span>
                  </div>
                  <div class="p-2 rounded-lg bg-slate-50 border border-slate-200/70 flex justify-between items-center">
                    <span class="text-slate-500">Envelope Cryptography:</span>
                    <span class="text-slate-800 font-semibold">AES-256-GCM Hardware Enc</span>
                  </div>
                </div>
              </div>

              <!-- Foreground Overlapping Card: Zero Retention Verification -->
              <div class="absolute bottom-4 left-3 sm:left-6 max-w-md w-[92%] sm:w-[86%] bg-white/95 backdrop-blur-md rounded-2xl border border-emerald-200/90 shadow-2xl p-4 sm:p-5 text-left">
                <div class="flex items-center justify-between pb-2 mb-2.5 border-b border-slate-100">
                  <div class="flex items-center gap-2 min-w-0">
                    <div class="w-4 h-4 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
                      <i data-lucide="shield-check" class="w-3 h-3"></i>
                    </div>
                    <span class="text-[10px] font-bold tracking-wider text-slate-800 uppercase truncate">
                      CRYPTOGRAPHIC PRIVACY ATTESTATION
                    </span>
                    <span class="text-[9px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                      Zero Retention Verified
                    </span>
                  </div>
                  <div class="flex items-center gap-1 text-[10px] text-slate-400 hover:text-slate-600 cursor-pointer shrink-0">
                    <i data-lucide="check" class="w-3 h-3 text-emerald-600"></i>
                  </div>
                </div>
                <p class="text-[11px] sm:text-xs text-slate-700 leading-relaxed font-sans">
                  The upstream AI provider received de-identified tokens only. All session rehydration keys were automatically wiped from transient worker memory immediately after stream finalization. Zero customer records persisted.
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>

      <!-- ==================== PANEL 3: COMPLIANCE ==================== -->
      <div id="panel-compliance" class="platform-tab-panel hidden">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <!-- Left: Accordion / Feature List -->
          <div class="lg:col-span-5 space-y-3">
            
            <!-- Item 1: Automated Regulatory Enforcement (Active) -->
            <div
              id="feat-compliance-1"
              onclick="selectPlatformFeature('compliance', 1)"
              class="platform-feature-card p-6 bg-white rounded-2xl border border-gray-200 shadow-2xs cursor-pointer transition-all duration-200"
            >
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200/60 flex items-center justify-center text-blue-600 shrink-0">
                  <i data-lucide="file-check-2" class="w-4 h-4"></i>
                </div>
                <h3 class="text-base font-bold text-slate-900">Regulatory Framework Enforcement</h3>
              </div>
              <div id="feat-content-compliance-1" class="pt-3">
                <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Turnkey compliance mapping across HIPAA Title II, GDPR Art. 9, PCI-DSS v4.0, and CCPA/CPRA. Eliminate costly compliance refactoring across your AI pipeline.
                </p>
                <div class="pt-4">
                  <a href="#demo" class="inline-flex items-center px-4 py-2 bg-black hover:bg-slate-800 text-white text-[11px] font-bold tracking-wider rounded-md uppercase transition cursor-pointer shadow-2xs">
                    VIEW AUDIT LOGS
                  </a>
                </div>
              </div>
            </div>

            <!-- Item 2: SIEM & Observability Feeds -->
            <div
              id="feat-compliance-2"
              onclick="selectPlatformFeature('compliance', 2)"
              class="platform-feature-card p-5 bg-white/70 hover:bg-white rounded-2xl border border-gray-200/80 shadow-2xs cursor-pointer transition-all duration-200"
            >
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                  <i data-lucide="activity" class="w-4 h-4"></i>
                </div>
                <h3 class="text-base font-bold text-slate-800">SIEM & Observability Feeds</h3>
              </div>
              <div id="feat-content-compliance-2" class="hidden pt-3">
                <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Stream structured CEF, JSON, and Syslog audit events directly to Datadog, Splunk, AWS CloudWatch, and Sumo Logic for enterprise SecOps monitoring.
                </p>
                <div class="pt-4">
                  <a href="#demo" class="inline-flex items-center px-4 py-2 bg-black hover:bg-slate-800 text-white text-[11px] font-bold tracking-wider rounded-md uppercase transition cursor-pointer shadow-2xs">
                    VIEW AUDIT LOGS
                  </a>
                </div>
              </div>
            </div>

            <!-- Item 3: Tamper-Evident Audit Trails -->
            <div
              id="feat-compliance-3"
              onclick="selectPlatformFeature('compliance', 3)"
              class="platform-feature-card p-5 bg-white/70 hover:bg-white rounded-2xl border border-gray-200/80 shadow-2xs cursor-pointer transition-all duration-200"
            >
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                  <i data-lucide="clipboard-check" class="w-4 h-4"></i>
                </div>
                <h3 class="text-base font-bold text-slate-800">Tamper-Evident Audit Trails</h3>
              </div>
              <div id="feat-content-compliance-3" class="hidden pt-3">
                <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Every redaction event carries SHA-256 fingerprint hashes without exposing plaintext, producing mathematical proof of compliance for SOC 2 Type II audits.
                </p>
                <div class="pt-4">
                  <a href="#demo" class="inline-flex items-center px-4 py-2 bg-black hover:bg-slate-800 text-white text-[11px] font-bold tracking-wider rounded-md uppercase transition cursor-pointer shadow-2xs">
                    VIEW AUDIT LOGS
                  </a>
                </div>
              </div>
            </div>

            <!-- Item 4: Policy Drift & Exfiltration Alarms -->
            <div
              id="feat-compliance-4"
              onclick="selectPlatformFeature('compliance', 4)"
              class="platform-feature-card p-5 bg-white/70 hover:bg-white rounded-2xl border border-gray-200/80 shadow-2xs cursor-pointer transition-all duration-200"
            >
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                  <i data-lucide="shield-alert" class="w-4 h-4"></i>
                </div>
                <h3 class="text-base font-bold text-slate-800">Policy Drift Alarms</h3>
              </div>
              <div id="feat-content-compliance-4" class="hidden pt-3">
                <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Trigger instant Webhook, PagerDuty, or Slack notifications if an application attempt tries to send unclassified sensitive records through unapproved gateways.
                </p>
                <div class="pt-4">
                  <a href="#demo" class="inline-flex items-center px-4 py-2 bg-black hover:bg-slate-800 text-white text-[11px] font-bold tracking-wider rounded-md uppercase transition cursor-pointer shadow-2xs">
                    VIEW AUDIT LOGS
                  </a>
                </div>
              </div>
            </div>

          </div>

          <!-- Right: Vibrant Mesh Backdrop + Compliance Mockup Windows -->
          <div class="lg:col-span-7">
            <div
              class="relative rounded-3xl p-4 sm:p-7 lg:p-8 overflow-hidden shadow-2xl min-h-[460px] sm:min-h-[500px] flex items-center justify-center"
              style="background: radial-gradient(circle at 10% 45%, #4f46e5 0%, rgba(79, 70, 229, 0.45) 30%, transparent 60%), radial-gradient(circle at 85% 20%, #2563eb 0%, rgba(37, 99, 235, 0.6) 35%, transparent 65%), linear-gradient(135deg, #1e1b4b 0%, #080d1a 100%);"
            >
              <div class="absolute -top-12 -right-12 w-64 h-64 bg-indigo-400/20 rounded-full blur-3xl pointer-events-none"></div>
              <div class="absolute -bottom-12 -left-12 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>

              <!-- Main Behind Window: Continuous Compliance Monitor -->
              <div class="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-white/40 overflow-hidden transform translate-x-2 -translate-y-6 sm:translate-x-6 sm:-translate-y-8">
                <div class="px-4 py-2.5 border-b border-gray-100 flex items-center justify-between bg-slate-50/60">
                  <div class="flex items-center gap-2">
                    <span class="font-bold text-xs text-slate-900 tracking-tight">projectspg</span>
                    <span class="text-[10px] text-blue-600 font-semibold bg-blue-50 px-2 py-0.5 rounded border border-blue-200">Compliance Attestation</span>
                  </div>
                  <div class="flex items-center gap-1.5">
                    <span class="w-2 h-2 rounded-full bg-slate-300"></span>
                    <span class="w-2 h-2 rounded-full bg-slate-300"></span>
                    <span class="w-2 h-2 rounded-full bg-slate-300"></span>
                  </div>
                </div>
                <div class="px-4 py-2 border-b border-gray-100 flex items-center gap-4 text-xs font-semibold">
                  <span class="text-slate-900 border-b-2 border-blue-600 pb-1 -mb-2.5">HIPAA</span>
                  <span class="text-slate-900 border-b-2 border-blue-600 pb-1 -mb-2.5">GDPR</span>
                  <span class="text-slate-900 border-b-2 border-blue-600 pb-1 -mb-2.5">PCI-DSS</span>
                  <span class="text-slate-400 font-medium">SOC 2 Type II</span>
                </div>
                <div class="p-4 space-y-2.5 text-left font-mono text-[11px]">
                  <div class="p-2 rounded-lg bg-slate-50 border border-slate-200/70 flex justify-between items-center">
                    <span class="text-slate-600">HIPAA Safe Harbor (18 Identifiers):</span>
                    <span class="text-emerald-600 font-bold">100% PASS</span>
                  </div>
                  <div class="p-2 rounded-lg bg-slate-50 border border-slate-200/70 flex justify-between items-center">
                    <span class="text-slate-600">GDPR Art. 9 Special Category PII:</span>
                    <span class="text-emerald-600 font-bold">100% PASS</span>
                  </div>
                  <div class="p-2 rounded-lg bg-slate-50 border border-slate-200/70 flex justify-between items-center">
                    <span class="text-slate-600">PCI-DSS v4.0 Requirement 3.4:</span>
                    <span class="text-emerald-600 font-bold">100% PASS</span>
                  </div>
                  <div class="p-2 rounded-lg bg-slate-50 border border-slate-200/70 flex justify-between items-center">
                    <span class="text-slate-600">Cryptographic SHA-256 Signatures:</span>
                    <span class="text-blue-700 font-bold">VERIFIED</span>
                  </div>
                </div>
              </div>

              <!-- Foreground Overlapping Card: Continuous Compliance Attestation -->
              <div class="absolute bottom-4 left-3 sm:left-6 max-w-md w-[92%] sm:w-[86%] bg-white/95 backdrop-blur-md rounded-2xl border border-blue-200/90 shadow-2xl p-4 sm:p-5 text-left">
                <div class="flex items-center justify-between pb-2 mb-2.5 border-b border-slate-100">
                  <div class="flex items-center gap-2 min-w-0">
                    <div class="w-4 h-4 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                      <i data-lucide="check-circle" class="w-3 h-3"></i>
                    </div>
                    <span class="text-[10px] font-bold tracking-wider text-slate-800 uppercase truncate">
                      SOC 2 & REGULATORY ATTESTATION
                    </span>
                    <span class="text-[9px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 shrink-0">
                      Audit Certified
                    </span>
                  </div>
                  <div class="flex items-center gap-1 text-[10px] text-slate-400 hover:text-slate-600 cursor-pointer shrink-0">
                    <i data-lucide="download" class="w-3 h-3 text-blue-600"></i>
                    <span>Export</span>
                  </div>
                </div>
                <p class="text-[11px] sm:text-xs text-slate-700 leading-relaxed font-sans">
                  Automated continuous attestation proves zero protected health information, payment card credentials, or GDPR confidential data reached external upstream models. Export audit logs for internal and third-party compliance review.
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>

    </section>

    <!-- ======================================================================= -->
    <!-- AGENTIC INFRASTRUCTURE COMPARISON SECTION (Dark Showcase)                -->
    <!-- ======================================================================= -->
    <section id="security-comparison" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      
      <!-- Outer Dark Sleek Card -->
      <div class="relative rounded-3xl bg-[#09090b] border border-slate-800 shadow-2xl p-8 sm:p-12 lg:p-14 overflow-hidden text-white">
        
        <!-- Subtle Atmospheric Background Glows -->
        <div class="absolute -top-24 -left-24 w-96 h-96 bg-[#f0523d]/10 rounded-full blur-3xl pointer-events-none"></div>
        <div class="absolute -bottom-24 -right-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <!-- 2-Column Grid: Left (Headline & Features) | Right (End-to-End Rehydration Pipeline) -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          <!-- Left Column: Impact Statement & Features List (Moved to Headline Position) -->
          <div class="lg:col-span-5 space-y-7 text-left">
            
            <h2 class="text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-white leading-[1.15]">
              ProjectSPG secures millions of enterprise agent conversations daily.
            </h2>

            <div class="space-y-4 pt-1">
              <div class="text-xs font-bold text-slate-400 uppercase tracking-widest">
                FEATURES
              </div>
              <ul class="space-y-3.5 text-sm sm:text-base font-medium text-slate-300">
                <li class="flex items-center gap-3 text-slate-200">
                  <span class="w-2 h-2 rounded-full bg-[#f0523d] shrink-0"></span>
                  <span>Context-Preserving Masking</span>
                </li>
                <li class="flex items-center gap-3 text-slate-200">
                  <span class="w-2 h-2 rounded-full bg-cyan-400 shrink-0"></span>
                  <span>Zero Upstream Retention</span>
                </li>
                <li class="flex items-center gap-3 text-slate-200">
                  <span class="w-2 h-2 rounded-full bg-emerald-400 shrink-0"></span>
                  <span>Sub-20ms Edge Sanitization</span>
                </li>
                <li class="flex items-center gap-3 text-slate-200">
                  <span class="w-2 h-2 rounded-full bg-purple-400 shrink-0"></span>
                  <span>Hardware Envelope Cryptography</span>
                </li>
                <li class="flex items-center gap-3 text-emerald-400 font-semibold">
                  <span class="w-2 h-2 rounded-full bg-emerald-400 shrink-0"></span>
                  <span>100% Reversible Response Rehydration</span>
                </li>
              </ul>
            </div>

            <!-- Why Competitors Fail Callout -->
            <div class="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs text-slate-400 space-y-1.5 leading-relaxed">
              <div class="flex items-center gap-1.5 font-semibold text-rose-400">
                <i data-lucide="alert-circle" class="w-3.5 h-3.5"></i>
                <span>Where Competitors Fail</span>
              </div>
              <p>
                Generic tools redact irreversibly or leave broken tokens like <code class="text-rose-300 bg-rose-950/60 px-1 py-0.5 rounded text-[11px]">[REDACTED]</code> in final answers. ProjectSPG dynamically rehydrates protected placeholders back into the original values before delivering the response to your application.
              </p>
            </div>

            <div class="pt-1">
              <a href="#demo" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-900 text-xs font-semibold shadow-xs transition cursor-pointer">
                <span>Test Live Rehydration</span>
                <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
              </a>
            </div>

          </div>

          <!-- Right Column: Interactive Illustration with Full Rehydration Showcase -->
          <div class="lg:col-span-7 relative flex items-center justify-center py-2">
            
            <!-- Behind Card: Competitors / Direct API (Where Competitors Fail) -->
            <div class="hidden sm:block absolute -left-6 -top-4 w-[280px] rounded-2xl bg-[#14080a] border border-rose-900/60 p-4 shadow-2xl transform -rotate-2 opacity-75 select-none pointer-events-none">
              <div class="flex items-center justify-between pb-2 border-b border-rose-900/50 mb-2">
                <div class="flex items-center gap-1.5">
                  <i data-lucide="shield-alert" class="w-3.5 h-3.5 text-rose-400"></i>
                  <span class="text-[11px] font-semibold text-rose-300">Competitors & Direct API</span>
                </div>
                <span class="text-[9px] font-bold px-1.5 py-0.2 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  Rehydration Fails
                </span>
              </div>
              <div class="text-[10px] font-mono text-rose-300/80 space-y-1.5">
                <p class="text-[9px] text-rose-400 uppercase font-sans font-semibold">Broken Model Output:</p>
                <div class="p-2 rounded bg-rose-950/40 border border-rose-900/40 text-rose-200 leading-relaxed">
                  "Approved salary for <span class="bg-rose-900/80 text-white px-1 py-0.2 rounded font-bold">[PERSON_1]</span>..."
                  <span class="text-rose-400 text-[9px] block pt-1 font-sans">❌ Tokens never restored. Application code breaks.</span>
                </div>
              </div>
            </div>

            <!-- Foreground Card: ProjectSPG Complete 3-Stage Pipeline -->
            <div class="relative z-10 w-full max-w-[500px] rounded-2xl bg-[#0c0f17] border border-slate-700/80 shadow-[0_20px_50px_rgba(0,0,0,0.8)] p-5 sm:p-6 text-left">
              
              <!-- Front Window Top Bar -->
              <div class="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                <div class="flex items-center gap-2">
                  <div class="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
                  <span class="text-xs font-semibold text-slate-200">ProjectSPG Reversible Privacy Engine</span>
                </div>
                <div class="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60">
                  <i data-lucide="refresh-cw" class="w-3 h-3"></i>
                  <span>Two-Way Transit</span>
                </div>
              </div>

              <!-- 3-Stage Demonstration -->
              <div class="space-y-3">
                
                <!-- Stage 1: Unprotected User Prompt -->
                <div class="rounded-xl bg-slate-950/90 border border-slate-800/80 p-3 space-y-1.5">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      <span class="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                      <span>1. Unprotected User Prompt (Client Input)</span>
                    </div>
                    <span class="text-[9px] font-semibold px-2 py-0.2 rounded-full bg-rose-950/60 text-rose-300 border border-rose-800/60">
                      Raw PII
                    </span>
                  </div>
                  <p class="text-[11px] font-mono text-slate-300 leading-relaxed">
                    "Audit compensation for <span class="bg-rose-950/80 text-rose-200 border border-rose-800/80 px-1 py-0.2 rounded font-medium">Alice Walker</span> (SSN: <span class="bg-rose-950/80 text-rose-200 border border-rose-800/80 px-1 py-0.2 rounded font-medium">82-9102834</span>, <span class="bg-rose-950/80 text-rose-200 border border-rose-800/80 px-1 py-0.2 rounded font-medium">alice@megacorp.io</span>), verify salary of <span class="bg-rose-950/80 text-rose-200 border border-rose-800/80 px-1 py-0.2 rounded font-medium">$185,000</span>."
                  </p>
                </div>

                <!-- Stage 2: What AI Model Receives -->
                <div class="rounded-xl bg-cyan-950/20 border border-cyan-800/50 p-3 space-y-1.5">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-cyan-400">
                      <span class="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                      <span>2. What AI Model Receives (Sanitized Payload)</span>
                    </div>
                    <span class="text-[9px] font-semibold px-2 py-0.2 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-700/80">
                      Zero Upstream Leak
                    </span>
                  </div>
                  <p class="text-[11px] font-mono text-slate-200 leading-relaxed">
                    "Audit compensation for <span class="bg-cyan-900/60 text-cyan-300 border border-cyan-700/80 px-1 py-0.2 rounded font-medium">[PERSON_1]</span> (SSN: <span class="bg-amber-900/60 text-amber-300 border border-amber-700/80 px-1 py-0.2 rounded font-medium">[SSN_1]</span>, <span class="bg-purple-900/60 text-purple-300 border border-purple-700/80 px-1 py-0.2 rounded font-medium">[EMAIL_1]</span>), verify salary of <span class="bg-emerald-900/60 text-emerald-300 border border-emerald-700/80 px-1 py-0.2 rounded font-medium">[COMP_1]</span>."
                  </p>
                  <p class="text-[10px] font-sans text-slate-400 italic">
                    LLM generates: "Confirmed: <span class="text-cyan-300 font-mono">[PERSON_1]</span> compensation of <span class="text-emerald-300 font-mono">[COMP_1]</span> approved."
                  </p>
                </div>

                <!-- Stage 3: Rehydrated Output (Application Receives) - WHERE COMPETITORS FAIL -->
                <div class="rounded-xl bg-emerald-950/30 border-2 border-emerald-500/80 p-3.5 space-y-1.5 shadow-[0_0_25px_rgba(16,185,129,0.2)]">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-300">
                      <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      <span>3. Rehydrated Output (What Your App Receives)</span>
                    </div>
                    <span class="text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 border border-emerald-400">
                      100% Rehydrated
                    </span>
                  </div>
                  <p class="text-[11px] font-mono text-emerald-100 leading-relaxed">
                    "Confirmed: <span class="bg-emerald-900/90 text-emerald-200 border border-emerald-500 px-1.5 py-0.2 rounded font-bold">Alice Walker</span> compensation of <span class="bg-emerald-900/90 text-emerald-200 border border-emerald-500 px-1.5 py-0.2 rounded font-bold">$185,000</span> approved."
                  </p>
                  <div class="flex items-center justify-between pt-1 border-t border-emerald-900/60 text-[10px] text-emerald-400 font-sans">
                    <span class="font-medium text-emerald-300">Tokens restored into original PII on the fly</span>
                    <span class="text-white font-semibold">Sub-1ms Overhead</span>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>

    <!-- ======================================================================= -->
    <!-- 1-LINE CODE INTEGRATION SECTION                                         -->
    <!-- ======================================================================= -->
    <section id="code" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-gray-200/80">
      <div class="max-w-4xl mx-auto bg-slate-900 rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
        <div class="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <i data-lucide="code" class="w-4 h-4 text-[#f0523d]"></i>
            <span class="text-xs font-semibold text-slate-200">1-Line Drop-in Integration (Python OpenAI SDK)</span>
          </div>
          <button onclick="copyHeroCode()" class="text-xs text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer">
            <i data-lucide="copy" class="w-3.5 h-3.5"></i>
            <span id="copy-code-text">Copy</span>
          </button>
        </div>
        <div class="p-6 text-xs font-mono leading-relaxed text-slate-300 overflow-x-auto">
<pre id="hero-code-block"><span class="text-purple-400">from</span> openai <span class="text-purple-400">import</span> OpenAI

<span class="text-slate-500"># Point the standard OpenAI SDK to ProjectSPG's privacy edge</span>
client = OpenAI(
    <span class="text-emerald-400">base_url</span>=<span class="text-amber-300">"https://api.projectspg.info/v1"</span>,
    <span class="text-emerald-400">api_key</span>=<span class="text-amber-300">"spg_free"</span>  <span class="text-slate-500"># or your personal spg_live_... key</span>
)

<span class="text-slate-500"># PII in prompts is automatically masked before reaching Mistral/OpenAI</span>
response = client.chat.completions.create(
    <span class="text-emerald-400">model</span>=<span class="text-amber-300">"spg-pro"</span>,  <span class="text-slate-500"># or "spg-mini", "spg-code", "spg-max"</span>
    <span class="text-emerald-400">messages</span>=[{<span class="text-amber-300">"role"</span>: <span class="text-amber-300">"user"</span>, <span class="text-amber-300">"content"</span>: <span class="text-amber-300">"Patient Alice Smith SSN 000-11-2222 order confirmation."</span>}]
)

<span class="text-slate-500"># Response arrives back to your client 100% rehydrated and clean</span>
print(response.choices[0].message.content)</pre>
        </div>
      </div>
    </section>

  </main>

  <!-- ========================================================================= -->
  <!-- LEAD CAPTURE / EMAIL GATE MODAL (Triggered on 2nd demo run)               -->
  <!-- ========================================================================= -->
  <div id="modal-lead-gate" class="hidden fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
    <div class="bg-white rounded-2xl border border-gray-200 shadow-2xl max-w-md w-full p-6 text-center space-y-5 relative">
      
      <button onclick="closeLeadModal()" class="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer">
        <i data-lucide="x" class="w-5 h-5"></i>
      </button>

      <div class="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-200 text-[#f0523d] flex items-center justify-center mx-auto shadow-2xs">
        <i data-lucide="sparkles" class="w-6 h-6"></i>
      </div>

      <div class="space-y-1.5">
        <h3 class="text-lg font-bold text-slate-900 tracking-tight">Unlock 5,000 Free Monthly Requests</h3>
        <p class="text-xs text-slate-600 max-w-xs mx-auto leading-relaxed">
          Enter your work email to receive your personal API key and continue testing in the web playground.
        </p>
      </div>

      <form id="lead-form" onsubmit="handleLeadSubmit(event)" class="space-y-3">
        <div>
          <input type="email" id="lead-email-input" required placeholder="you@company.com" class="w-full text-xs p-3 rounded-xl border border-gray-300 focus:outline-none focus:border-[#f0523d] text-slate-800 placeholder-slate-400">
        </div>
        <button type="submit" id="btn-submit-lead" class="w-full py-2.5 rounded-xl bg-[#f0523d] hover:bg-[#e0422d] text-white text-xs font-semibold shadow-xs transition cursor-pointer">
          Claim My Free API Key →
        </button>
      </form>

      <div class="relative flex items-center justify-center">
        <div class="border-t border-gray-200 w-full"></div>
        <span class="bg-white px-2 text-[11px] text-slate-400 uppercase tracking-wider">or</span>
      </div>

      <div>
        <a href="/" class="w-full py-2.5 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 text-slate-800 text-xs font-medium transition flex items-center justify-center gap-2">
          <i data-lucide="log-in" class="w-4 h-4 text-slate-500"></i>
          <span>Continue with Google / Account</span>
        </a>
      </div>

      <p class="text-[10px] text-slate-400">
        No credit card required. Free tier includes 5,000 requests/month on Mistral models.
      </p>

    </div>
  </div>

  <!-- ========================================================================= -->
  <!-- FOOTER                                                                    -->
  <!-- ========================================================================= -->
  <footer class="bg-white border-t border-gray-200 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
      <div class="flex items-center gap-2">
        <div class="w-5 h-5 rounded bg-[#f0523d] flex items-center justify-center text-white text-[10px] font-bold">P</div>
        <span class="font-semibold text-slate-700">ProjectSPG</span>
        <span>• Enterprise AI Privacy Layer</span>
      </div>
      <div class="flex items-center gap-6">
        <a href="/" class="hover:text-slate-800">Playground</a>
        <a href="/#docs" class="hover:text-slate-800">API Documentation</a>
        <a href="/blog/countries" class="hover:text-slate-800">Compliance & Jurisdictions</a>
        <a href="https://github.com/PriyanujBoruah/projectspg" target="_blank" class="hover:text-slate-800">GitHub</a>
      </div>
    </div>
  </footer>

  <!-- ========================================================================= -->
  <!-- CLIENT LOGIC & DEMO RUNNER                                                -->
  <!-- ========================================================================= -->
  <script>
    const DEMO_PRESETS = {
      healthcare: "Patient Eleanor Vance (SSN: 902-48-1229, DOB: 04/18/1972) admitted to St. Jude ICU. Prescribed 50mg Metoprolol. Contact doctor at dr.marcus@hospital.org. Provide a brief care summary.",
      fintech: "Authorize transaction of $4,850.00 for cardholder David Chen (Card: 4532-8901-2345-6789, Exp: 09/28, CVV: 842). Billing zip: 94103. Confirm transaction status and risk rating.",
      hr: "Verify employee record: Alice Walker (Email: alice.walker@megacorp.io, Phone: +1-415-555-0199, Tax ID: 82-9102834). Salary grade: L6 Senior Engineer. Summarize profile and onboarding status.",
      devops: "Deployment script failure: AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY for user admin@production.internal. Provide quick remediation advice."
    };

    const PRESET_KEYS = ['healthcare', 'fintech', 'hr', 'devops'];
    let currentPresetIdx = 0;
    let demoRunCount = 0;

    // --- Markdown Parser Helper ---
    function renderMarkdown(content) {
      if (!content) return '';
      try {
        if (window.marked) {
          if (typeof window.marked.parse === 'function') return window.marked.parse(content);
          if (typeof window.marked === 'function') return window.marked(content);
        }
      } catch (e) {
        console.warn('marked parse error:', e);
      }

      // Safe string-based fallback parser (no template string escape conflicts)
      let escaped = String(content)
        .split('&').join('&amp;')
        .split('<').join('&lt;')
        .split('>').join('&gt;');

      // Handle bold **text**
      let boldParts = escaped.split('**');
      if (boldParts.length > 1) {
        escaped = boldParts.map((part, i) => (i % 2 === 1 ? ('<strong>' + part + '</strong>') : part)).join('');
      }

      let lines = escaped.split(/\\r?\\n/);
      let inList = false;
      let result = [];

      for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        let trimmed = line.trim();

        if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
          if (!inList) {
            result.push('<ul>');
            inList = true;
          }
          result.push('<li>' + trimmed.slice(2) + '</li>');
        } else {
          if (inList) {
            result.push('</ul>');
            inList = false;
          }
          if (trimmed.startsWith('### ')) {
            result.push('<h3>' + trimmed.slice(4) + '</h3>');
          } else if (trimmed.startsWith('## ')) {
            result.push('<h2>' + trimmed.slice(3) + '</h2>');
          } else if (trimmed.startsWith('# ')) {
            result.push('<h1>' + trimmed.slice(2) + '</h1>');
          } else if (trimmed.length > 0) {
            result.push('<p>' + line + '</p>');
          }
        }
      }
      if (inList) result.push('</ul>');
      return result.join('');
    }

    // --- Dropdown Menu Logic (v0-style) ---
    function toggleModelDropdown(event) {
      if (event) event.stopPropagation();
      const menu = document.getElementById('model-dropdown-menu');
      const chevron = document.getElementById('model-dropdown-chevron');
      if (!menu) return;

      const isHidden = menu.classList.contains('hidden');
      if (isHidden) {
        menu.classList.remove('hidden');
        if (chevron) chevron.classList.add('rotate-180');
        const searchInput = document.getElementById('model-search-input');
        if (searchInput) {
          searchInput.value = '';
          filterModelDropdown('');
          setTimeout(() => searchInput.focus(), 50);
        }
      } else {
        closeModelDropdown();
      }
    }

    function closeModelDropdown() {
      const menu = document.getElementById('model-dropdown-menu');
      const chevron = document.getElementById('model-dropdown-chevron');
      if (menu) menu.classList.add('hidden');
      if (chevron) chevron.classList.remove('rotate-180');
    }

    function selectDemoModel(modelName, modelId) {
      const nameEl = document.getElementById('selected-model-name');
      const valueEl = document.getElementById('demo-model-value');
      if (nameEl) nameEl.textContent = modelName;
      if (valueEl) valueEl.value = modelId;

      // Update checkmarks
      const options = document.querySelectorAll('.model-option');
      options.forEach(opt => {
        const checkIcon = opt.querySelector('.model-check-icon');
        if (opt.getAttribute('data-model-id') === modelId) {
          if (checkIcon) checkIcon.classList.remove('hidden');
        } else {
          if (checkIcon) checkIcon.classList.add('hidden');
        }
      });

      closeModelDropdown();
    }

    function filterModelDropdown(query) {
      const q = (query || '').toLowerCase().trim();
      const options = document.querySelectorAll('.model-option');
      let visibleCount = 0;

      options.forEach(opt => {
        const text = (opt.textContent || '').toLowerCase();
        if (!q || text.includes(q)) {
          opt.classList.remove('hidden');
          visibleCount++;
        } else {
          opt.classList.add('hidden');
        }
      });

      const noResults = document.getElementById('model-no-results');
      if (noResults) {
        if (visibleCount === 0) noResults.classList.remove('hidden');
        else noResults.classList.add('hidden');
      }
    }

    // Close dropdown on outside click
    document.addEventListener('click', (e) => {
      const container = document.getElementById('model-dropdown-container');
      if (container && !container.contains(e.target)) {
        closeModelDropdown();
      }
    });

    // --- Preset & Prompt Management ---
    function setDemoPreset(key) {
      currentPresetIdx = Math.max(0, PRESET_KEYS.indexOf(key));
      const promptEl = document.getElementById('demo-prompt-input');
      if (promptEl) {
        promptEl.value = DEMO_PRESETS[key] || DEMO_PRESETS.healthcare;
        promptEl.focus();
      }
    }

    function cycleDemoPreset() {
      currentPresetIdx = (currentPresetIdx + 1) % PRESET_KEYS.length;
      setDemoPreset(PRESET_KEYS[currentPresetIdx]);
    }

    function clearDemoPrompt() {
      const p = document.getElementById('demo-prompt-input');
      if (p) {
        p.value = '';
        p.focus();
      }
    }

    // --- Hero Demo Execution ---
    async function runHeroDemo() {
      demoRunCount++;
      
      // If user has already run the demo once, show the email capture gate!
      if (demoRunCount > 1 && !localStorage.getItem('spg_lead_email')) {
        openLeadModal();
        return;
      }

      const promptInput = document.getElementById('demo-prompt-input');
      const text = promptInput ? promptInput.value.trim() : '';
      if (!text) return;

      const modelValEl = document.getElementById('demo-model-value');
      const modelNameEl = document.getElementById('selected-model-name');
      const selectedModel = modelValEl ? modelValEl.value : 'ministral-8b-2512';
      const selectedModelName = modelNameEl ? modelNameEl.textContent : 'SPG Pro';

      const btn = document.getElementById('btn-run-demo');
      const origBtnHtml = btn ? btn.innerHTML : '';
      if (btn) {
        btn.disabled = true;
        btn.innerHTML = '<i data-lucide="loader-2" class="w-4 h-4 animate-spin text-white"></i>';
        if (window.lucide) lucide.createIcons();
      }

      const startTime = performance.now();

      try {
        const res = await fetch('/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer spg_free'
          },
          body: JSON.stringify({
            model: selectedModel,
            messages: [
              {
                role: 'system',
                content: 'You are an enterprise AI assistant. Provide a direct, professional, and concise response under 120 words. Avoid excessive boilerplate.'
              },
              {
                role: 'user',
                content: text
              }
            ],
            max_tokens: 250
          })
        });

        const data = await res.json();
        const durationMs = Math.round(performance.now() - startTime);

        // Extract privacy metadata
        const privacy = data.privacy || {};
        const sanitizedPrompt = privacy.protected_prompt || text;
        const entitiesCount = privacy.entities_count !== undefined ? privacy.entities_count : 2;
        const reply = data.choices && data.choices[0] && data.choices[0].message
          ? data.choices[0].message.content
          : (data.error ? ('Error: ' + (data.error.message || JSON.stringify(data.error))) : 'Processing complete.');

        // Update results display
        const resultsEl = document.getElementById('demo-results-container');
        if (resultsEl) resultsEl.classList.remove('hidden');

        const sanitizedEl = document.getElementById('demo-sanitized-output');
        if (sanitizedEl) sanitizedEl.textContent = sanitizedPrompt;

        const rehydratedEl = document.getElementById('demo-rehydrated-output');
        if (rehydratedEl) rehydratedEl.innerHTML = renderMarkdown(reply);

        const latencyEl = document.getElementById('demo-metric-latency');
        if (latencyEl) latencyEl.textContent = durationMs + ' ms';

        const entitiesEl = document.getElementById('demo-metric-entities');
        if (entitiesEl) entitiesEl.textContent = entitiesCount;

        const modelMetricEl = document.getElementById('demo-metric-model');
        if (modelMetricEl) modelMetricEl.textContent = selectedModelName + ' (' + selectedModel + ')';

        if (window.lucide) lucide.createIcons();

      } catch (err) {
        console.error('Hero demo error:', err);
        alert('Demo request encountered an error. Please try again.');
      } finally {
        if (btn) {
          btn.disabled = false;
          btn.innerHTML = origBtnHtml;
          if (window.lucide) lucide.createIcons();
        }
      }
    }

    function handleSecondTestTrigger() {
      if (!localStorage.getItem('spg_lead_email')) {
        openLeadModal();
      } else {
        window.location.href = '/';
      }
    }

    function openLeadModal() {
      const modal = document.getElementById('modal-lead-gate');
      if (modal) modal.classList.remove('hidden');
    }

    function closeLeadModal() {
      const modal = document.getElementById('modal-lead-gate');
      if (modal) modal.classList.add('hidden');
    }

    async function handleLeadSubmit(e) {
      e.preventDefault();
      const input = document.getElementById('lead-email-input');
      const email = input ? input.value.trim() : '';
      if (!email) return;

      const submitBtn = document.getElementById('btn-submit-lead');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Unlocking 5,000 Requests...';
      }

      try {
        // Send email to leads tracking endpoint
        await fetch('/api/leads', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, source: 'home_hero_demo' })
        });
      } catch (e) {
        // Continue even if offline
      }

      localStorage.setItem('spg_lead_email', email);
      closeLeadModal();

      // Redirect immediately to full playground console
      window.location.href = '/';
    }

    function copyHeroCode() {
      const code = document.getElementById('hero-code-block').innerText;
      navigator.clipboard.writeText(code);
      const text = document.getElementById('copy-code-text');
      if (text) {
        text.textContent = 'Copied!';
        setTimeout(() => { text.textContent = 'Copy'; }, 2000);
      }
    }

    function selectPlatformTab(tabId) {
      const tabs = ['deidentify', 'privacy', 'compliance'];
      tabs.forEach(t => {
        const btn = document.getElementById('tab-btn-' + t);
        const panel = document.getElementById('panel-' + t);
        if (btn) {
          if (t === tabId) {
            btn.className = 'platform-tab-btn px-7 sm:px-9 py-2.5 sm:py-3 rounded-2xl text-xs sm:text-sm font-semibold transition cursor-pointer bg-[#d6f5f0] text-slate-900 border border-[#b2ebe1] shadow-2xs';
          } else {
            btn.className = 'platform-tab-btn px-7 sm:px-9 py-2.5 sm:py-3 rounded-2xl text-xs sm:text-sm font-medium transition cursor-pointer bg-white hover:bg-slate-50 text-slate-700 border border-gray-200 shadow-2xs';
          }
        }
        if (panel) {
          if (t === tabId) {
            panel.classList.remove('hidden');
          } else {
            panel.classList.add('hidden');
          }
        }
      });
      if (window.lucide) lucide.createIcons();
    }

    function selectPlatformFeature(tab, num) {
      for (let i = 1; i <= 4; i++) {
        const card = document.getElementById('feat-' + tab + '-' + i);
        const content = document.getElementById('feat-content-' + tab + '-' + i);
        if (!card || !content) continue;
        if (i === num) {
          card.className = 'platform-feature-card p-6 bg-white rounded-2xl border border-gray-200 shadow-2xs cursor-pointer transition-all duration-200';
          content.classList.remove('hidden');
        } else {
          card.className = 'platform-feature-card p-5 bg-white/70 hover:bg-white rounded-2xl border border-gray-200/80 shadow-2xs cursor-pointer transition-all duration-200';
          content.classList.add('hidden');
        }
      }
      if (window.lucide) lucide.createIcons();
    }

    document.addEventListener('DOMContentLoaded', () => {
      if (window.lucide) lucide.createIcons();
    });
  </script>

</body>
</html>
`;
