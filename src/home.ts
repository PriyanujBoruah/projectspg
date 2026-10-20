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

<!-- AI Model Provider Ecosystem Logo Ribbon (Matching reference screenshot) -->
      <div class="pt-10 sm:pt-14 lg:pt-16 mt-10 sm:mt-14 border-t border-gray-200/60">
        <div class="flex flex-wrap items-center justify-center sm:justify-between gap-8 sm:gap-6 lg:gap-10 px-2 sm:px-4">
          
          <!-- Google DeepMind -->
          <div class="flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity duration-200 cursor-default select-none" title="Google DeepMind">
            <img src="data:image/png;base64,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" alt="Google DeepMind" class="h-5 sm:h-5.5 lg:h-6 w-auto object-contain" />
          </div>

          <!-- OpenAI -->
          <div class="flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity duration-200 cursor-default select-none" title="OpenAI">
            <img src="data:image/png;base64,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" alt="OpenAI" class="h-5 sm:h-5.5 lg:h-6 w-auto object-contain" />
          </div>

          <!-- ANTHROP\C -->
          <div class="flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity duration-200 cursor-default select-none" title="Anthropic">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIoAAAAQCAYAAADJeudBAAAIr0lEQVRoBZ3BAWjVh50A4C8kJPhYwGDJIwHDpDnf4VHvwlItSot38XhSMZubD127axdpbi/nSGtRtFUsijbeKhv1pjVL0WvalCv2jOmuh3Lt2XmXIfVyCcqWVsoqFSYGRaEjkpAHV/gJ/2b/5NR9X1m+0GEWz2E5KlHCfnxsZnXYhIeEaziAS9L+DmuF0+hFNXZgPsolSigXSkK5MI4DGMIKtKEa17ATN6TNwSuYjxKexRXhG9iPeqFcooQSruPXOI0xs5uL7yCPapRQjjG8h5Nm9gTWIGNm47iE0/gfTArfwzpkcAUv4Ya7W4O1qJW4hXfx75h0R1m+0GEGD+Is6iX68RT+IG0JjmGRRC+exS2JSvwc7UI/ipiHQdS4P0Ucwy5sQZWQwyVptTiPBqEJI8I8/AZZd3cNT+JDaUvQh0azG8T3ccV0A2h1b/rRjht4Bq8iI6zEh2ZXi/fRbHansBFXfaUsX+gwg23YjSqJz/BdXJS2DEeRM906/KtEJY6gTehHEVn8CjXuzya8jl3YjIywCKPS6nAODUITRoQ6DCPr3nyKDRiRaMEh5NzdB3geFyUG0OreHcQeTGAQi4Uz2IAxaQvRg8fc3bvoxNWyfKHDH5mLt7DadOPYjn+StgxHkTPdb/EUhoQ5OIQ2oR9FTOKHqEaF8CDWIiOcwhBKwgR+id9iNzYjIyzCqLQ6nEOD0IQRoQ7DyAo9uCoxD49jgUQ7XhdqcQpNEp/hHVzDAvwQNRIHsRWTwgBaJXpwFVOowEPIIyP8HhtxGs9hP6pwDUWcNF05juIpiet4E18gh/WokdiKg2X5Qoc/8j0cQlZaP9pxw3RL0IuctIN4HiVU4gjahH4UMSatBX3ICkW8jpK0LnQiIyzCqLRanEeD0IQRoQ7DyArL8WuJcnwT/4kG4RR+gBvYjRdRIQyiHaMSj+NVNAo38TcYEQbQKoxjOUYkKrEZu1ElFNGNFvQhK+zHTpQkFmIQDwifYyM+kliDN1AjXMfisnyhw9fMwT5sFr7AGJqFCXwbp023BL3ISfsCf4/TmINDaBP6UcSYtBXoQ71QRLeZdaETGWExLkqbj/9Gg9CMIaEOw8gKS/Gx6WoxiEZhEAXcwABWCTfxtxiSthvbUCW04W1MYgCtwjgewUXTrcdrqBGK6MZ8vIbVwvvowBWJn+MZVAmb0I2S6X6C1ZgjLC/LFzp8zTdxHM3CKbyDn6JG2IWXUZJYgl7khDOYj0bhLDbgFg6hTehHEWPSVqAP9UIR3WbWhU5khCMYE6ZQIcxFG6qFJowIdRhGVujBZZSEcixFHlXCdhzAt9CLnHAIz2NS2jycxwLhAzyJMZzAWmEKT+OixDz8COtQgSm045+FLehCBSawEW9L/AaLhCksxqiZVUpMluULHb5mDfpQjSn8GP04hSbhOh7GZYkl6EVOeAW3sAMZYTuOYT/ahH6044a0FvSiXiii28z2YjMy7k8TRoQ6DCPr3nyJVnyE9XgNNcIevGR2v8MCYRx/gcsYQKvETUxKVKJGYhjtGBLm4RwahffQjjHhE+SEC1iFq+5BWb7Q4Y45OIOlwk38Ja7gcbyFGqEdx1ASluEocsJ+7MEpPCaxDq14SuhHEWPSWtCLemETDptZFzqRcX+aMCLUYRhZdzeBfXgZJaxHD6qFPXjJ7H6HBcIE/hyXMYBW92YcO3AYkxLHsU6YwsMYET5BTriAVbjqHpTlCx3uWIETqBGG8Q7GkcEOVAvDWI2rwhL0Iifsw048hBNoFM6ghJXCe9iIG9Ja0IesUES3me3FZmSE9zEmUS5U43FUCU0YEeowjKwwiFvCXCyXeAUv4bbwKN7AAuFn2I5JaXPxv1ggnEUBYxhAq//fNQzjbbyDSdM9igHUCNvxM0ziE+SECTRh1MwqUS7cLssXOtzxC7S7NzfxXXwkLEEvcsI+7EQldmAbqjCFEqqEfhQxJm0F/gVZoYhuM+tCJzLCIoxKq8M5NAhNGBHqMIyssBJDmMIC/BsahDPYgDFhDk5glXANqzAibQv2okpow5so4QTWSmzHZUwJk7iFYfzB7AbQKnyOVbiEX6ANFUI7jqFkuhexEpXCt8vyhQ5fmY8BNLl3R/AsJrEMR5ET9uMFYS7ewmpp/ShiTFoLelEvbMJhM+tCJzLCIoxKq8M5NAjNGBLm4zyyQjOGJLZhN6qE7fhHiZ9gq8RZ/ABXJJbhDTQK43gMQ8IAWoVxPIKL7l8ex1GNCWzFYSzCr1AjfIYnMYSS0ILjqBEm8Gdl+UKHr2zDLmSEQVxBCeVCBf4KjcIwnsZFLMNR5IR92CmxHj2oNl0/ihiTtgJ9qBeK6DazLnQiI+RwSVotzqNBaMKIUIsLyArNGJJYiD40CxdQwCWhFv+BxRKf4SAuoxn/gAckjuDHKAknsFaYwMO46P4tRD8WCX0o4jaOY63EdRzECJbiR3hAYg/2leULHfPQg7XCBTyNEWnPYR8yQjtexzIcRU7YjxckyrEL21Al0Y8ixqS1oBf1QhHdZrYXm5ERcrgkrQ7n0CA0YUSowzCyQjOGTLcbL6JC6MRhlIQ1eAU5d3cWz2NIYgCtwjgewUX3rxI/xSbhU7Tjv/AQerDU3Z1CBy6X5Qsd38IJNAi9KOK2tCXoQ6NwEFvRjKPICfuw03S1OIUmifdQxFVpK/AGGoQius1sL7agSsjhkrRaDKNeaMKIUIdhZIVmDJluLs6jUWIpPpZowRE0mt0g2jFqugG0CuNoxqg/zRr0ICvswMvCgziBxWb3ATox6itl+ULHQryKGtzEAXxoZuXYi78WLuAFZLAFS/ElDuGktDy2oBpT+CUO4ra0+ehCI77EPnxkZi3Yghr8Hu24IW0O+lCPKXwfV4RvoAfzUYENuCztUbyIGkzhAE6abi6ewHo8IJTjU/TiJErSnsETyOBTbMWYP91erMQU3sVhTEp8B8+gESWU43O8iXcx6Y7/A9A5Z+0DjUWtAAAAAElFTkSuQmCC" alt="ANTHROP\C" class="h-4 sm:h-4.5 lg:h-5 w-auto object-contain" />
          </div>

          <!-- Gemini -->
          <div class="flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity duration-200 cursor-default select-none" title="Google Gemini">
            <img src="data:image/png;base64,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" alt="Gemini" class="h-5 sm:h-5.5 lg:h-6 w-auto object-contain" />
          </div>

          <!-- OpenRouter -->
          <div class="flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity duration-200 cursor-default select-none" title="OpenRouter">
            <img src="data:image/png;base64,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" alt="OpenRouter" class="h-4.5 sm:h-5 lg:h-5.5 w-auto object-contain" />
          </div>

          <!-- groq -->
          <div class="flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity duration-200 cursor-default select-none" title="Groq">
            <img src="data:image/png;base64,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" alt="groq" class="h-5 sm:h-5.5 lg:h-6 w-auto object-contain" />
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

          <!-- Right Column: Interactive Illustration with Full Rehydration Showcase (Architectural Sketch Style) -->
          <div class="lg:col-span-7 relative flex flex-col items-center justify-center py-4 select-none">
            
            <!-- Sketch Shadow Wrapper: Sharp Hatch Shadow Layer behind the main stage -->
            <div class="relative w-full max-w-[510px]">

              <!-- Behind Card: Competitors / Direct API (Sketch Styled with Red Cast Hatching) -->
              <div class="hidden sm:block absolute -left-8 -top-6 w-[280px] rounded-xl bg-[#14080a] border-2 border-rose-900/80 p-4 transform -rotate-2 opacity-85 pointer-events-none z-0"
                   style="box-shadow: 6px 6px 0px 0px rgba(159, 18, 57, 0.45);">
                
                <!-- Cross-hatch sketch texture inside competitor card -->
                <div class="absolute inset-0 rounded-xl overflow-hidden pointer-events-none opacity-15"
                     style="background: repeating-linear-gradient(45deg, #f43f5e, #f43f5e 1.2px, transparent 1.2px, transparent 7px);"></div>

                <div class="relative z-10 flex items-center justify-between pb-2 border-b border-rose-900/60 mb-2">
                  <div class="flex items-center gap-1.5">
                    <i data-lucide="shield-alert" class="w-3.5 h-3.5 text-rose-400"></i>
                    <span class="text-[11px] font-semibold text-rose-300 font-mono">Competitors & Direct API</span>
                  </div>
                  <span class="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40">
                    Rehydration Fails
                  </span>
                </div>
                <div class="relative z-10 text-[10px] font-mono text-rose-300/80 space-y-1.5">
                  <p class="text-[9px] text-rose-400 uppercase font-sans font-semibold tracking-wider">Broken Model Output:</p>
                  <div class="p-2 rounded bg-rose-950/60 border border-rose-900/60 text-rose-200 leading-relaxed font-mono">
                    "Approved salary for <span class="bg-rose-900/90 text-white px-1 py-0.5 rounded font-bold border border-rose-500/60">[PERSON_1]</span>..."
                    <span class="text-rose-400 text-[9px] block pt-1 font-sans">❌ Tokens never restored. Application code breaks.</span>
                  </div>
                </div>
              </div>

              <!-- Sharp Sketch Cast Shadow (45-degree diagonal ink hatching offset 10px, 10px with crisp border) -->
              <div class="absolute inset-0 rounded-2xl transform translate-x-2.5 translate-y-2.5 z-0 pointer-events-none border-2 border-slate-600/70"
                   style="background: repeating-linear-gradient(45deg, #475569, #475569 1.3px, transparent 1.3px, transparent 7px);"></div>

              <!-- Foreground Card: ProjectSPG Complete 3-Stage Pipeline (Solid Obsidian Body) -->
              <div class="relative z-10 w-full rounded-2xl bg-[#09090b] border-2 border-slate-600 p-5 sm:p-6 text-left">
                
                <!-- Technical Corner Registration Ticks (+) for architectural drafting look -->
                <div class="absolute top-2 left-2 text-slate-600 font-mono text-[10px] select-none leading-none">+</div>
                <div class="absolute top-2 right-2 text-slate-600 font-mono text-[10px] select-none leading-none">+</div>
                <div class="absolute bottom-2 left-2 text-slate-600 font-mono text-[10px] select-none leading-none">+</div>
                <div class="absolute bottom-2 right-2 text-slate-600 font-mono text-[10px] select-none leading-none">+</div>

                <!-- Inset Dashed Drafting Contour -->
                <div class="absolute inset-1.5 rounded-[12px] border border-dashed border-slate-800/80 pointer-events-none"></div>

                <!-- Front Window Top Bar -->
                <div class="relative z-10 flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                  <div class="flex items-center gap-2">
                    <div class="w-2.5 h-2.5 rounded-full bg-emerald-400 border border-emerald-300"></div>
                    <span class="text-xs font-semibold text-slate-100 font-mono tracking-tight">ProjectSPG Reversible Privacy Engine</span>
                  </div>
                  <div class="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-700/80"
                       style="box-shadow: 2px 2px 0px 0px rgba(16, 185, 129, 0.3);">
                    <i data-lucide="refresh-cw" class="w-3 h-3"></i>
                    <span>Two-Way Transit</span>
                  </div>
                </div>

                <!-- 3-Stage Demonstration -->
                <div class="relative z-10 space-y-3.5">
                  
                  <!-- Stage 1: Unprotected User Prompt -->
                  <div class="rounded-xl bg-slate-950 border border-slate-800 p-3 space-y-1.5"
                       style="box-shadow: 3px 3px 0px 0px rgba(30, 41, 59, 0.8);">
                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                        <span class="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                        <span>1. Unprotected User Prompt (Client Input)</span>
                      </div>
                      <span class="text-[9px] font-mono font-semibold px-2 py-0.5 rounded bg-rose-950/80 text-rose-300 border border-rose-800">
                        Raw PII
                      </span>
                    </div>
                    <p class="text-[11px] font-mono text-slate-300 leading-relaxed">
                      "Audit compensation for <span class="bg-rose-950 text-rose-200 border border-rose-700 px-1 py-0.5 rounded font-medium">Alice Walker</span> (SSN: <span class="bg-rose-950 text-rose-200 border border-rose-700 px-1 py-0.5 rounded font-medium">82-9102834</span>, <span class="bg-rose-950 text-rose-200 border border-rose-700 px-1 py-0.5 rounded font-medium">alice@megacorp.io</span>), verify salary of <span class="bg-rose-950 text-rose-200 border border-rose-700 px-1 py-0.5 rounded font-medium">$185,000</span>."
                    </p>
                  </div>

                  <!-- Stage 2: What AI Model Receives -->
                  <div class="rounded-xl bg-[#08131e] border border-cyan-800/80 p-3 space-y-1.5"
                       style="box-shadow: 3px 3px 0px 0px rgba(8, 145, 178, 0.3);">
                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400">
                        <span class="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                        <span>2. What AI Model Receives (Sanitized Payload)</span>
                      </div>
                      <span class="text-[9px] font-mono font-semibold px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-700">
                        Zero Upstream Leak
                      </span>
                    </div>
                    <p class="text-[11px] font-mono text-slate-200 leading-relaxed">
                      "Audit compensation for <span class="bg-cyan-950 text-cyan-300 border border-cyan-700 px-1 py-0.5 rounded font-medium">[PERSON_1]</span> (SSN: <span class="bg-amber-950 text-amber-300 border border-amber-700 px-1 py-0.5 rounded font-medium">[SSN_1]</span>, <span class="bg-purple-950 text-purple-300 border border-purple-700 px-1 py-0.5 rounded font-medium">[EMAIL_1]</span>), verify salary of <span class="bg-emerald-950 text-emerald-300 border border-emerald-700 px-1 py-0.5 rounded font-medium">[COMP_1]</span>."
                    </p>
                    <p class="text-[10px] font-mono text-slate-400">
                      LLM output: "Confirmed: <span class="text-cyan-300 font-semibold">[PERSON_1]</span> compensation of <span class="text-emerald-300 font-semibold">[COMP_1]</span> approved."
                    </p>
                  </div>

                  <!-- Stage 3: Rehydrated Output (Application Receives) - WHERE COMPETITORS FAIL -->
                  <div class="rounded-xl bg-[#061c14] border-2 border-emerald-500 p-3.5 space-y-1.5 relative overflow-hidden"
                       style="box-shadow: 4px 4px 0px 0px rgba(16, 185, 129, 0.5);">
                    
                    <!-- Subtle sketch hatching inside highlight frame -->
                    <div class="absolute -right-4 -bottom-4 w-28 h-28 pointer-events-none opacity-10"
                         style="background: repeating-linear-gradient(45deg, #10b981, #10b981 1.5px, transparent 1.5px, transparent 6px);"></div>

                    <div class="relative z-10 flex items-center justify-between">
                      <div class="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-300">
                        <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                        <span>3. Rehydrated Output (What Your App Receives)</span>
                      </div>
                      <span class="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500 text-slate-950 border border-emerald-400">
                        100% Rehydrated
                      </span>
                    </div>
                    <p class="relative z-10 text-[11px] font-mono text-emerald-100 leading-relaxed">
                      "Confirmed: <span class="bg-emerald-900/90 text-emerald-100 border border-emerald-400 px-1.5 py-0.5 rounded font-bold">Alice Walker</span> compensation of <span class="bg-emerald-900/90 text-emerald-100 border border-emerald-400 px-1.5 py-0.5 rounded font-bold">$185,000</span> approved."
                    </p>
                    <div class="relative z-10 flex items-center justify-between pt-1.5 border-t border-emerald-800/80 text-[10px] text-emerald-300 font-mono">
                      <span>✓ Tokens restored into original PII on the fly</span>
                      <span class="text-white font-semibold">Sub-1ms Overhead</span>
                    </div>
                  </div>

                </div>

              </div>

              <!-- Architectural Drafting Ground Lines beneath the Card (stepped horizontal pen strokes) -->
              <div class="mt-4 flex flex-col items-center justify-center space-y-1 opacity-70">
                <div class="w-3/4 h-[1.6px] bg-slate-600 rounded-full"></div>
                <div class="w-3/5 h-[1.2px] bg-slate-700 rounded-full"></div>
                <div class="w-2/5 h-[1.0px] bg-slate-800 rounded-full"></div>
                <div class="w-1/4 h-[0.8px] bg-slate-800/60 rounded-full"></div>
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
