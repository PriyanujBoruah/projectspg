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
  <style>
    body { font-family: 'Inter', sans-serif; }
    pre, code, .font-mono { font-family: 'JetBrains Mono', monospace; }
    .bg-grid {
      background-size: 32px 32px;
      background-image: 
        linear-gradient(to right, rgba(0, 0, 0, 0.03) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(0, 0, 0, 0.03) 1px, transparent 1px);
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

  <!-- ========================================================================= -->
  <!-- HERO SECTION                                                              -->
  <!-- ========================================================================= -->
  <main class="flex-1 bg-grid">
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 text-center">
      
      <!-- Top Announcement Pill -->
      <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-[#f0523d] text-xs font-medium mb-6 shadow-2xs">
        <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        <span>Sub-20ms Zero-Trust Privacy Layer for Enterprise LLMs</span>
        <span class="text-gray-300">|</span>
        <span class="text-slate-600 font-normal">109 Jurisdictions Supported</span>
      </div>

      <!-- Main Headline -->
      <h1 class="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight max-w-4xl mx-auto leading-tight sm:leading-none mb-6">
        Never Leak Customer Data or Secrets to <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#f0523d] to-amber-600">Foreign AI Models.</span>
      </h1>

      <!-- Subheadline -->
      <p class="text-sm sm:text-base lg:text-lg text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
        ProjectSPG intercepts prompts at the network edge, sanitizes names, SSNs, cards, and medical records in 14ms, and securely rehydrates the model's output on the return trip. 100% wire-compatible with OpenAI.
      </p>

      <!-- ===================================================================== -->
      <!-- INTERACTIVE HERO DEMO WIDGET                                          -->
      <!-- ===================================================================== -->
      <div id="demo" class="max-w-4xl mx-auto bg-white rounded-2xl border border-gray-200/90 shadow-xl overflow-hidden text-left scroll-mt-24">
        
        <!-- Demo Header & Sector Tabs -->
        <div class="bg-slate-50/80 px-4 sm:px-6 py-3 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div class="flex items-center gap-2">
            <div class="flex gap-1.5">
              <span class="w-3 h-3 rounded-full bg-rose-400 inline-block"></span>
              <span class="w-3 h-3 rounded-full bg-amber-400 inline-block"></span>
              <span class="w-3 h-3 rounded-full bg-emerald-400 inline-block"></span>
            </div>
            <span class="text-xs font-semibold text-slate-700 ml-2">Live Privacy Gateway Inspector</span>
          </div>

          <!-- Quick Presets -->
          <div class="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            <span class="text-[11px] font-medium text-slate-500 mr-1 hidden md:inline">Presets:</span>
            <button onclick="setDemoPreset('healthcare')" id="preset-healthcare" class="demo-preset px-2.5 py-1 rounded-md text-[11px] font-semibold bg-orange-100 text-[#f0523d] border border-orange-200 cursor-pointer transition">
              🏥 Healthcare (HIPAA)
            </button>
            <button onclick="setDemoPreset('fintech')" id="preset-fintech" class="demo-preset px-2.5 py-1 rounded-md text-[11px] font-medium text-slate-600 hover:bg-gray-100 border border-gray-200 cursor-pointer transition">
              💳 Banking (PCI)
            </button>
            <button onclick="setDemoPreset('hr')" id="preset-hr" class="demo-preset px-2.5 py-1 rounded-md text-[11px] font-medium text-slate-600 hover:bg-gray-100 border border-gray-200 cursor-pointer transition">
              💼 HR / PII
            </button>
            <button onclick="setDemoPreset('devops')" id="preset-devops" class="demo-preset px-2.5 py-1 rounded-md text-[11px] font-medium text-slate-600 hover:bg-gray-100 border border-gray-200 cursor-pointer transition">
              💻 Secrets (API Keys)
            </button>
          </div>
        </div>

        <!-- Demo Input Body -->
        <div class="p-4 sm:p-6 bg-white space-y-4">
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center justify-between">
              <span>Your Prompt (Contains raw sensitive data):</span>
              <span class="text-[11px] text-slate-400 font-normal">Editable</span>
            </label>
            <textarea id="demo-prompt-input" rows="3" class="w-full text-xs font-mono p-3 bg-slate-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#f0523d] focus:bg-white transition text-slate-800 leading-relaxed resize-none">Patient Eleanor Vance (SSN: 902-48-1229, DOB: 04/18/1972) admitted to St. Jude ICU. Prescribed 50mg Metoprolol. Contact doctor at dr.marcus@hospital.org.</textarea>
          </div>

          <!-- Controls Bar -->
          <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
            <div class="flex items-center gap-2 text-xs text-slate-600">
              <span class="font-medium text-slate-500">Upstream Model:</span>
              <span class="px-2 py-0.5 rounded-md bg-slate-100 border border-gray-200 font-mono text-[11px] font-semibold text-slate-800 flex items-center gap-1.5">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>ministral-8b-2512</span>
              </span>
            </div>

            <button onclick="runHeroDemo()" id="btn-run-demo" class="px-5 py-2.5 rounded-xl bg-[#f0523d] hover:bg-[#e0422d] text-white text-xs font-semibold shadow-sm transition flex items-center justify-center gap-2 cursor-pointer">
              <i data-lucide="play" class="w-4 h-4 fill-white"></i>
              <span>Sanitize & Run Live Demo</span>
            </button>
          </div>

          <!-- Results Split View Container (Hidden until first run) -->
          <div id="demo-results-container" class="hidden pt-4 border-t border-gray-100 space-y-4">
            
            <!-- Live Performance Metrics Strip -->
            <div class="flex flex-wrap items-center justify-between gap-2 p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl text-xs text-emerald-900">
              <div class="flex items-center gap-2">
                <i data-lucide="shield-check" class="w-4 h-4 text-emerald-600"></i>
                <span class="font-semibold" id="demo-metric-status">De-identification Complete</span>
              </div>
              <div class="flex items-center gap-4 text-[11px] font-mono">
                <div>Protected Entities: <span id="demo-metric-entities" class="font-bold text-emerald-800">4</span></div>
                <div>Engine Latency: <span id="demo-metric-latency" class="font-bold text-emerald-800">14 ms</span></div>
                <div>Model: <span class="font-bold text-slate-700">ministral-8b-2512</span></div>
              </div>
            </div>

            <!-- Split Comparison Cards -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              
              <!-- Card 1: What Upstream Mistral Saw -->
              <div class="p-4 bg-slate-900 text-slate-100 rounded-xl border border-slate-800 space-y-2">
                <div class="flex items-center justify-between text-[11px] text-slate-400 border-b border-slate-800 pb-2">
                  <span class="font-semibold text-amber-400 flex items-center gap-1.5">
                    <i data-lucide="eye-off" class="w-3.5 h-3.5"></i>
                    What Foreign AI Provider Received
                  </span>
                  <span>Zero PII Exposed</span>
                </div>
                <div id="demo-sanitized-output" class="text-[11.5px] leading-relaxed text-slate-300 font-mono whitespace-pre-wrap"></div>
              </div>

              <!-- Card 2: What You Receive (Rehydrated) -->
              <div class="p-4 bg-white text-slate-900 rounded-xl border border-emerald-200 shadow-xs space-y-2">
                <div class="flex items-center justify-between text-[11px] text-slate-500 border-b border-gray-100 pb-2">
                  <span class="font-semibold text-emerald-600 flex items-center gap-1.5">
                    <i data-lucide="check-circle" class="w-3.5 h-3.5"></i>
                    What Your Application Received
                  </span>
                  <span>100% Rehydrated</span>
                </div>
                <div id="demo-rehydrated-output" class="text-[11.5px] leading-relaxed text-slate-700 font-sans whitespace-pre-wrap"></div>
              </div>

            </div>

            <!-- Follow-up action banner -->
            <div class="text-center pt-2">
              <button onclick="handleSecondTestTrigger()" class="text-xs font-medium text-[#f0523d] hover:text-[#e0422d] underline cursor-pointer">
                Want to run another custom prompt or test with your own API? Click here →
              </button>
            </div>
          </div>

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
    <span class="text-emerald-400">model</span>=<span class="text-amber-300">"ministral-8b-2512"</span>,
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
      healthcare: "Patient Eleanor Vance (SSN: 902-48-1229, DOB: 04/18/1972) admitted to St. Jude ICU. Prescribed 50mg Metoprolol. Contact doctor at dr.marcus@hospital.org.",
      fintech: "Authorize transaction of $4,850.00 for cardholder David Chen (Card: 4532-8901-2345-6789, Exp: 09/28, CVV: 842). Billing zip: 94103.",
      hr: "Employee audit for Alice Walker (Email: alice.walker@megacorp.io, Phone: +1-415-555-0199, Tax ID: 82-9102834). Salary grade: L6 Senior Engineer.",
      devops: "Deployment script failure: AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY for user admin@production.internal. Investigate IAM role."
    };

    let demoRunCount = 0;

    function setDemoPreset(key) {
      document.querySelectorAll('.demo-preset').forEach(b => {
        b.className = 'demo-preset px-2.5 py-1 rounded-md text-[11px] font-medium text-slate-600 hover:bg-gray-100 border border-gray-200 cursor-pointer transition';
      });
      const activeBtn = document.getElementById('preset-' + key);
      if (activeBtn) {
        activeBtn.className = 'demo-preset px-2.5 py-1 rounded-md text-[11px] font-semibold bg-orange-100 text-[#f0523d] border border-orange-200 cursor-pointer transition';
      }
      const promptEl = document.getElementById('demo-prompt-input');
      if (promptEl) {
        promptEl.value = DEMO_PRESETS[key] || DEMO_PRESETS.healthcare;
      }
    }

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

      const btn = document.getElementById('btn-run-demo');
      const origBtnHtml = btn ? btn.innerHTML : '';
      if (btn) {
        btn.disabled = true;
        btn.innerHTML = '<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i><span>Intercepting & Sanitizing...</span>';
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
            model: 'ministral-8b-2512',
            messages: [{ role: 'user', content: text }]
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
          : 'Processing complete.';

        // Update results display
        const resultsEl = document.getElementById('demo-results-container');
        if (resultsEl) resultsEl.classList.remove('hidden');

        const sanitizedEl = document.getElementById('demo-sanitized-output');
        if (sanitizedEl) sanitizedEl.textContent = sanitizedPrompt;

        const rehydratedEl = document.getElementById('demo-rehydrated-output');
        if (rehydratedEl) rehydratedEl.textContent = reply;

        const latencyEl = document.getElementById('demo-metric-latency');
        if (latencyEl) latencyEl.textContent = durationMs + ' ms';

        const entitiesEl = document.getElementById('demo-metric-entities');
        if (entitiesEl) entitiesEl.textContent = entitiesCount;

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

    document.addEventListener('DOMContentLoaded', () => {
      if (window.lucide) lucide.createIcons();
    });
  </script>

</body>
</html>
`;
