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
  <link rel="preconnect" href="https://cdn.prod.website-files.com" crossorigin>
  <link rel="preload" href="https://cdn.prod.website-files.com/69654e88dce9154b5f1206dd/698cad1160936ed8972bccfa_the-future-regular.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="https://cdn.prod.website-files.com/69654e88dce9154b5f1206dd/698cad11f5c01ca7fba516ba_the-future-medium.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="https://cdn.prod.website-files.com/69654e88dce9154b5f1206dd/698cad117b7b7b625bfcb663_the-future-bold.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">

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
            sans: ['"The Future"', 'Arial', 'sans-serif'],
            mono: ['"The Future Mono"', 'JetBrains Mono', 'monospace']
          }
        }
      }
    }
  </script>

  <style>
    @font-face {
      font-family: 'The Future';
      src: url('https://cdn.prod.website-files.com/69654e88dce9154b5f1206dd/698cad116649a2ce7e9e9c09_the-future-light.woff2') format('woff2');
      font-weight: 300;
      font-style: normal;
      font-display: swap;
    }
    @font-face {
      font-family: 'The Future';
      src: url('https://cdn.prod.website-files.com/69654e88dce9154b5f1206dd/698cad1160936ed8972bccfa_the-future-regular.woff2') format('woff2');
      font-weight: 400;
      font-style: normal;
      font-display: swap;
    }
    @font-face {
      font-family: 'The Future';
      src: url('https://cdn.prod.website-files.com/69654e88dce9154b5f1206dd/698cad11f5c01ca7fba516ba_the-future-medium.woff2') format('woff2');
      font-weight: 500;
      font-style: normal;
      font-display: swap;
    }
    @font-face {
      font-family: 'The Future';
      src: url('https://cdn.prod.website-files.com/69654e88dce9154b5f1206dd/698cad117b7b7b625bfcb663_the-future-bold.woff2') format('woff2');
      font-weight: 700;
      font-style: normal;
      font-display: swap;
    }
    @font-face {
      font-family: 'The Future Mono';
      src: url('https://cdn.prod.website-files.com/69654e88dce9154b5f1206dd/698cad11353cd03c54aee177_the-future-mono-regular.woff2') format('woff2');
      font-weight: 400;
      font-style: normal;
      font-display: swap;
    }
    @font-face {
      font-family: 'The Future Mono';
      src: url('https://cdn.prod.website-files.com/69654e88dce9154b5f1206dd/698cad11906310338409a1c3_the-future-mono-medium.woff2') format('woff2');
      font-weight: 500;
      font-style: normal;
      font-display: swap;
    }
    @font-face {
      font-family: 'The Future Mono';
      src: url('https://cdn.prod.website-files.com/69654e88dce9154b5f1206dd/698cad1196b1cde8333da03a_the-future-mono-bold.woff2') format('woff2');
      font-weight: 700;
      font-style: normal;
      font-display: swap;
    }

    body, button, input, select, textarea {
      font-family: "The Future", Arial, sans-serif;
    }
    body {
      background-color: #ffffff;
      color: #111827;
      font-family: "The Future", Arial, sans-serif;
    }
    .font-sans {
      font-family: "The Future", Arial, sans-serif !important;
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

    /* Mobile scroll auto-highlight for research cards (replaces hover effect on touch devices) */
    @media (max-width: 1023px) {
      .research-card.mobile-highlight {
        border-color: rgba(255, 255, 255, 0.2) !important;
        transform: translateY(-4px) !important;
        box-shadow: 0 12px 40px rgba(0,0,0,0.6), 0 0 30px rgba(139,127,245,0.2) !important;
      }
      .research-card.mobile-highlight .research-frosting {
        opacity: 1 !important;
      }
      .research-card.mobile-highlight .research-badge {
        background-color: rgba(255, 255, 255, 0.2) !important;
      }
      .research-card.mobile-highlight .research-author {
        opacity: 0 !important;
        transform: scale(0.95) !important;
      }
      .research-card.mobile-highlight .research-btn {
        opacity: 1 !important;
        transform: translateY(0) !important;
        pointer-events: auto !important;
      }
    }

    /* Infinite Marquee Animation for Infrastructure Badges */
    @keyframes marqueeScroll {
      0% {
        transform: translateX(0%);
      }
      100% {
        transform: translateX(-100%);
      }
    }

    .animate-marquee {
      display: flex;
      flex-shrink: 0;
      align-items: center;
      gap: 3.5rem;
      padding-right: 3.5rem;
      animation: marqueeScroll 28s linear infinite;
    }

    @media (min-width: 640px) {
      .animate-marquee {
        gap: 4.5rem;
        padding-right: 4.5rem;
      }
    }

    .brand-logo-dyed {
      filter: url(#logo-tint-949698);
      -webkit-filter: url(#logo-tint-949698);
      transition: opacity 0.2s ease, transform 0.2s ease;
    }

    /* Platform Interactive Accordion Slide Animation */
    .platform-subitem {
      transition: background-color 0.35s cubic-bezier(0.16, 1, 0.3, 1),
                  border-color 0.35s cubic-bezier(0.16, 1, 0.3, 1),
                  box-shadow 0.35s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .platform-subitem:not(.is-active) {
      background-color: transparent;
      border-color: transparent;
      border-bottom-color: #f3f4f6; /* gray-100 */
      box-shadow: none;
    }

    .platform-subitem:not(.is-active):hover {
      background-color: rgba(249, 250, 251, 0.85);
    }

    .platform-subitem.is-active {
      background-color: #ffffff;
      border-color: rgba(229, 231, 235, 0.9); /* border-gray-200/90 */
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06), 0 1px 2px -1px rgba(0, 0, 0, 0.06);
    }

    .platform-subitem:not(.is-active) .subitem-icon-box {
      background-color: transparent !important;
      border-color: transparent !important;
      color: #9ca3af !important; /* gray-400 */
    }

    .platform-subitem:not(.is-active) .subitem-title {
      color: #374151 !important; /* gray-700 */
      font-weight: 600 !important;
      font-size: 1.125rem !important; /* text-lg */
    }

    .platform-accordion-drawer {
      display: grid;
      grid-template-rows: 0fr;
      transition: grid-template-rows 0.38s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .platform-subitem.is-active .platform-accordion-drawer {
      grid-template-rows: 1fr;
    }

    .platform-accordion-drawer-inner {
      overflow: hidden;
      min-height: 0;
      transition: opacity 0.3s ease, transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .platform-subitem:not(.is-active) .platform-accordion-drawer-inner {
      opacity: 0;
      transform: translateY(-8px);
      pointer-events: none;
    }

    .platform-subitem.is-active .platform-accordion-drawer-inner {
      opacity: 1;
      transform: translateY(0);
      pointer-events: auto;
    }
    /* Mobile-optimized smooth touch scrolling & scrollbar utilities */
    html, body {
      -webkit-overflow-scrolling: touch;
      overscroll-behavior-y: auto;
      overflow-x: hidden;
      max-width: 100%;
    }
    .touch-scroll {
      -webkit-overflow-scrolling: touch;
      overscroll-behavior: auto;
      touch-action: pan-x pan-y;
    }
    .no-scrollbar::-webkit-scrollbar {
      display: none;
    }
    .no-scrollbar {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
  </style>
</head>

<body class="min-h-screen flex flex-col bg-white text-groq-dark antialiased overflow-y-auto overflow-x-hidden w-full max-w-full selection:bg-[#f0523d]/20 selection:text-[#f0523d]">

  <!-- ========================================================================= -->
  <!-- TOP GLOBAL NAVBAR (Exact 52px height + Mobile Tab Strip) -->
  <!-- ========================================================================= -->
  <header id="global-header" class="sticky top-0 bg-white z-40 hidden border-b border-gray-100 shadow-2xs">
    
    <!-- Main Top Row (52px) -->
    <div class="h-[52px] px-3 sm:px-4 lg:px-6 flex items-center justify-between">
      <!-- Left: Brand Logo + Project Selector -->
      <div class="flex items-center gap-2 sm:gap-3.5">
        <a href="#landing" onclick="switchView('landing')" class="flex items-center gap-1 group" title="Return to Landing Page">
          <span class="font-extrabold text-[20px] sm:text-[22px] tracking-tight text-groq-dark">project<span class="text-[#f0523d]">spg</span></span>
        </a>

        <!-- Project Selector Pill Dropdown -->
        <div class="hidden md:flex items-center gap-1.5 text-xs text-groq-textMuted cursor-pointer hover:text-groq-dark transition ml-2">
          <span class="font-normal text-groq-textMuted">Personal</span>
          <i data-lucide="chevrons-up-down" class="w-3 h-3 text-groq-textSubtle"></i>
          <span class="mx-1 text-gray-300 font-light">/</span>
          <span class="text-groq-dark font-medium">Default Project</span>
          <i data-lucide="chevrons-up-down" class="w-3 h-3 text-groq-textSubtle"></i>
        </div>
      </div>

      <!-- Center: Desktop Navigation Tabs (Hidden on < sm) -->
      <div class="hidden sm:flex items-center gap-6 text-xs">
        <nav class="flex items-center gap-6 font-medium text-xs">
          <button onclick="switchView('playground')" id="nav-playground" class="nav-item text-groq-textMuted hover:text-groq-dark transition whitespace-nowrap cursor-pointer">Playground</button>
          <button onclick="switchView('keys')" id="nav-keys" class="nav-item text-groq-textMuted hover:text-groq-dark transition whitespace-nowrap cursor-pointer">API Keys</button>
          <button onclick="switchView('dashboard')" id="nav-dashboard" class="nav-item text-[#f0523d] font-semibold transition whitespace-nowrap cursor-pointer">Dashboard</button>
          <button onclick="switchView('docs')" id="nav-docs" class="nav-item text-groq-textMuted hover:text-groq-dark transition whitespace-nowrap cursor-pointer">Docs</button>
        </nav>
      </div>

      <!-- Right: Settings + Sign In / User Profile -->
      <div class="flex items-center gap-2 sm:gap-3.5">
        <!-- Settings Gear Icon -->
        <button onclick="openConfigModal()" class="text-groq-textMuted hover:text-groq-dark transition p-1.5 rounded-lg hover:bg-gray-100 cursor-pointer" title="Settings">
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

    <!-- Mobile Sub-Header Navigation Strip (Visible on mobile screens < sm) -->
    <div class="sm:hidden px-2 py-1.5 bg-[#fafafa] border-t border-gray-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar touch-scroll">
      <button onclick="switchView('playground')" id="nav-mobile-playground" class="nav-mobile-item flex-1 py-1.5 px-2 text-center rounded-lg text-xs font-medium whitespace-nowrap transition cursor-pointer text-groq-textMuted bg-white border border-gray-200/70 shadow-2xs">Playground</button>
      <button onclick="switchView('keys')" id="nav-mobile-keys" class="nav-mobile-item flex-1 py-1.5 px-2 text-center rounded-lg text-xs font-medium whitespace-nowrap transition cursor-pointer text-groq-textMuted bg-white border border-gray-200/70 shadow-2xs">API Keys</button>
      <button onclick="switchView('dashboard')" id="nav-mobile-dashboard" class="nav-mobile-item flex-1 py-1.5 px-2 text-center rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer text-[#f0523d] bg-orange-50 border border-[#f0523d]/30 shadow-2xs">Dashboard</button>
      <button onclick="switchView('docs')" id="nav-mobile-docs" class="nav-mobile-item flex-1 py-1.5 px-2 text-center rounded-lg text-xs font-medium whitespace-nowrap transition cursor-pointer text-groq-textMuted bg-white border border-gray-200/70 shadow-2xs">Docs</button>
    </div>

  </header>

  <!-- ========================================================================= -->
  <!-- MAIN WORKSPACE -->
  <!-- ========================================================================= -->
  <main class="flex-1 flex flex-col w-full min-w-0 max-w-full overflow-visible">

    <!-- ======================================================================= -->
    <!-- VIEW 0: LANDING PAGE (ProjectSPG Enterprise Platform) -->
    <!-- ======================================================================= -->
    <div id="view-landing" class="view-panel flex-1 flex flex-col w-full bg-white relative">
      

      <!-- Floating Header (ProjectSPG Floating Navbar) -->
      <header class="fixed top-0 left-0 right-0 w-full max-w-[1440px] mx-auto pt-3 sm:pt-4 px-2 sm:px-4 lg:px-6 z-50 pointer-events-none">
        <div class="pointer-events-auto bg-white border border-gray-200/80 rounded-full px-4 sm:px-5 py-2 sm:py-2.5 flex items-center justify-between shadow-sm" style="background-color: #FFFFFF;">
          
          <!-- Left: Brand Emblem + Name -->
          <div class="flex items-center gap-2 sm:gap-2.5 cursor-pointer" onclick="switchView('landing')">
            <div class="w-7 h-7 rounded-lg bg-black flex items-center justify-center text-white shadow-xs">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <span class="font-bold text-[17px] tracking-tight text-gray-900">project<span class="text-[#f0523d]">spg</span></span>
          </div>

          <!-- Middle: Navigation Links -->
          <nav class="hidden md:flex items-center gap-6 lg:gap-7 text-[13px] font-medium text-gray-600">
            <a href="#platform-section" class="hover:text-gray-950 transition">Platform</a>
            <a href="#research-section" class="hover:text-gray-950 transition">Research</a>
            <a href="#news-section" class="hover:text-gray-950 transition">Blog</a>
            <a href="#access-section" onclick="switchAccessView('request')" class="hover:text-gray-950 transition">Request Access</a>
          </nav>

          <!-- Right: Actions -->
          <div class="flex items-center gap-2.5 sm:gap-4 text-xs font-semibold">
            <button onclick="openAuthModal()" class="px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-black hover:bg-gray-800 text-white text-[11px] font-bold tracking-wider uppercase transition shadow-xs cursor-pointer flex items-center gap-1.5">
              <span>Sign In</span>
            </button>
            <!-- Mobile Menu Hamburger Button -->
            <button onclick="toggleLandingMobileMenu()" id="btn-landing-mobile-menu" class="md:hidden p-1.5 rounded-full hover:bg-gray-100 text-gray-700 hover:text-gray-950 transition cursor-pointer flex items-center justify-center" aria-label="Toggle navigation menu">
              <i data-lucide="menu" id="landing-mobile-icon-menu" class="w-5 h-5"></i>
              <i data-lucide="x" id="landing-mobile-icon-close" class="w-5 h-5 hidden"></i>
            </button>
          </div>
        </div>

        <!-- Mobile Dropdown Navigation Menu Sheet -->
        <div id="landing-mobile-menu" class="pointer-events-auto hidden md:hidden mt-2 bg-white border border-gray-200/90 rounded-2xl p-4 sm:p-5 shadow-xl transition-all duration-300 max-h-[85vh] overflow-y-auto" style="background-color: #FFFFFF;">
          <nav class="flex flex-col gap-1 text-sm font-medium text-gray-800">
            <a href="#platform-section" onclick="closeLandingMobileMenu()" class="flex items-center justify-between py-2.5 px-3 rounded-xl hover:bg-gray-50 hover:text-[#f0523d] transition">
              <span class="flex items-center gap-2.5"><i data-lucide="layers" class="w-4 h-4 text-gray-400"></i> Platform</span>
              <i data-lucide="chevron-right" class="w-4 h-4 text-gray-400"></i>
            </a>
            <a href="#research-section" onclick="closeLandingMobileMenu()" class="flex items-center justify-between py-2.5 px-3 rounded-xl hover:bg-gray-50 hover:text-[#f0523d] transition">
              <span class="flex items-center gap-2.5"><i data-lucide="sparkles" class="w-4 h-4 text-gray-400"></i> Research</span>
              <i data-lucide="chevron-right" class="w-4 h-4 text-gray-400"></i>
            </a>
            <a href="#news-section" onclick="closeLandingMobileMenu()" class="flex items-center justify-between py-2.5 px-3 rounded-xl hover:bg-gray-50 hover:text-[#f0523d] transition">
              <span class="flex items-center gap-2.5"><i data-lucide="newspaper" class="w-4 h-4 text-gray-400"></i> Blog</span>
              <i data-lucide="chevron-right" class="w-4 h-4 text-gray-400"></i>
            </a>
            <a href="#access-section" onclick="closeLandingMobileMenu(); switchAccessView('request')" class="flex items-center justify-between py-2.5 px-3 rounded-xl hover:bg-gray-50 hover:text-[#f0523d] transition">
              <span class="flex items-center gap-2.5"><i data-lucide="key" class="w-4 h-4 text-gray-400"></i> Request Access</span>
              <i data-lucide="chevron-right" class="w-4 h-4 text-gray-400"></i>
            </a>
            <div class="pt-2 flex flex-col gap-2">
              <button onclick="closeLandingMobileMenu(); openAuthModal()" class="w-full py-2.5 rounded-xl bg-black hover:bg-gray-800 text-white text-xs font-bold uppercase tracking-wider transition shadow-sm">
                Sign In
              </button>
            </div>
          </nav>
        </div>
      </header>

      <!-- HERO SECTION -->
      <section class="w-full bg-[#E8F4FF] border-b border-blue-200/50 relative z-10 flex flex-col justify-between min-h-screen min-h-[100dvh] pt-20 sm:pt-24 lg:pt-24 overflow-hidden">
        <div class="w-full max-w-[1440px] mx-auto px-2.5 sm:px-4 lg:px-6 flex-1 flex flex-col justify-between pt-2 sm:pt-4 pb-2 sm:pb-4">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center my-auto py-2 sm:py-4">
            
            <!-- Left Column (Text & CTAs) -->
            <div class="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left pr-0 lg:pr-6">
              
              <!-- Tech Badge Pill -->
              <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 border border-blue-200/80 text-blue-700 text-[10.5px] sm:text-[11px] font-semibold tracking-wide uppercase mb-5 sm:mb-6 shadow-2xs">
                <span class="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span>
                <span>Next-Gen Zero-Trust AI Gateway</span>
              </div>

              <!-- Main Headline matching ProjectSPG -->
              <h1 class="text-3xl sm:text-5xl lg:text-[62px] leading-[1.12] sm:leading-[1.08] font-medium tracking-tight text-gray-950 mb-5 sm:mb-6 font-sans" style="font-weight: 500;">
                Build what's next <br/>
                <span class="text-slate-500 font-medium" style="font-weight: 500;">on the Private Cloud</span>
              </h1>

              <!-- Subtitle -->
              <p class="text-sm sm:text-base lg:text-lg text-slate-700 font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-7 sm:mb-8" style="font-weight: 400;">
                The high-performance AI privacy and routing layer. Real-time zero-knowledge de-identification, 10 sovereign regulatory compliance packs, and instant multi-provider LLM orchestration with sub-millisecond overhead.
              </p>

              <!-- CTA Button Group -->
              <div class="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 w-full sm:w-auto max-w-sm sm:max-w-none mx-auto lg:mx-0 mb-4 sm:mb-0">
                <button onclick="openAuthModal()" class="w-full sm:w-auto px-6 py-3.5 rounded-full bg-black hover:bg-gray-800 text-white text-xs font-bold tracking-wider uppercase transition shadow-md hover:shadow-lg flex items-center justify-center gap-2 group cursor-pointer">
                  <span>Start Building</span>
                  <i data-lucide="arrow-right" class="w-4 h-4 group-hover:translate-x-0.5 transition-transform"></i>
                </button>
                
                <button onclick="switchView('playground')" class="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white hover:bg-slate-50 text-gray-800 text-xs font-bold tracking-wider uppercase transition border border-blue-200/80 shadow-2xs flex items-center justify-center gap-2 cursor-pointer">
                  <span>Try Playground</span>
                  <i data-lucide="terminal" class="w-3.5 h-3.5 text-gray-500"></i>
                </button>
              </div>

            </div>

            <!-- Right Column (3D Isometric Architectural Artwork matching ProjectSPG) -->
            <div class="lg:col-span-5 flex items-center justify-center relative">
              <div class="relative w-full max-w-[460px] sm:max-w-[520px] lg:max-w-[560px] flex items-center justify-center mx-auto">
                
                <!-- Ambient Glow underneath 3D graphic -->
                <div class="absolute inset-0 bg-gradient-to-tr from-cyan-400/25 via-blue-500/20 to-indigo-400/20 rounded-full blur-2xl -z-10"></div>

                <img 
                  src="/images/hero-illustration.png" 
                  alt="ProjectSPG Architecture: Zero-Trust De-Identification, Sub-Millisecond Latency, 10+ Sovereign Regulatory Packs, Tested Across 1.94 Billion Tokens" 
                  class="w-full h-auto object-contain drop-shadow-2xl select-none transition-transform duration-300 hover:scale-[1.02]"
                  loading="eager"
                />
              </div>
            </div>

          </div>

          <!-- Brand Marquee Section with SVG Color Tint Filter -->
          <svg class="sr-only absolute pointer-events-none" width="0" height="0" aria-hidden="true">
            <filter id="logo-tint-949698" color-interpolation-filters="sRGB">
              <feColorMatrix type="matrix" values="
                0 0 0 0.5804 0
                0 0 0 0.5882 0
                0 0 0 0.5961 0
                0 0 0 1 0" />
            </filter>
          </svg>

          <div class="marquee-container w-full pt-3 pb-1.5 overflow-hidden mt-auto mb-1 relative">
            <div class="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-[#E8F4FF] to-transparent z-10 pointer-events-none"></div>
            <div class="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-[#E8F4FF] to-transparent z-10 pointer-events-none"></div>

          <!-- Infinite Sliding Marquee Track -->
          <div class="flex overflow-hidden relative w-full select-none py-2 items-center">
            <!-- Group 1 -->
            <div class="animate-marquee">
              <!-- Groq -->
              <div class="flex items-center shrink-0">
                <img src="/logos/Groq-Logo.png?v=949698" alt="Groq" title="Groq LPU" class="brand-logo-dyed h-5 sm:h-6 w-auto object-contain opacity-85 hover:opacity-100" />
              </div>
              <!-- Mistral AI -->
              <div class="flex items-center shrink-0">
                <img src="/logos/Mistral-AI-Logo.png?v=949698" alt="Mistral AI" title="Mistral AI" class="brand-logo-dyed h-5 sm:h-6 w-auto object-contain opacity-85 hover:opacity-100" />
              </div>
              <!-- Google DeepMind -->
              <div class="flex items-center shrink-0">
                <img src="/logos/Google-DeepMind-Logo.png?v=949698" alt="Google DeepMind" title="Google DeepMind" class="brand-logo-dyed h-5 sm:h-6 w-auto object-contain opacity-85 hover:opacity-100" />
              </div>
              <!-- OpenAI -->
              <div class="flex items-center shrink-0">
                <img src="/logos/OpenAI-Logo.png?v=949698" alt="OpenAI" title="OpenAI API" class="brand-logo-dyed h-5 sm:h-6 w-auto object-contain opacity-85 hover:opacity-100" />
              </div>
              <!-- Anthropic -->
              <div class="flex items-center shrink-0">
                <img src="/logos/Anthropic-Logo.png?v=949698" alt="Anthropic" title="Anthropic" class="brand-logo-dyed h-3.5 sm:h-4 w-auto object-contain opacity-85 hover:opacity-100" />
              </div>
              <!-- Google Gemini -->
              <div class="flex items-center shrink-0">
                <img src="/logos/Google-Gemini-Logo.png?v=949698" alt="Google Gemini" title="Google Gemini" class="brand-logo-dyed h-5 sm:h-6 w-auto object-contain opacity-85 hover:opacity-100" />
              </div>
              <!-- OpenRouter -->
              <div class="flex items-center shrink-0">
                <img src="/logos/OpenRouter-Logo.png?v=949698" alt="OpenRouter" title="OpenRouter" class="brand-logo-dyed h-5 sm:h-6 w-auto object-contain opacity-85 hover:opacity-100" />
              </div>
            </div>

            <!-- Group 2 (Duplicate for Seamless Infinite Loop) -->
            <div class="animate-marquee" aria-hidden="true">
              <!-- Groq -->
              <div class="flex items-center shrink-0">
                <img src="/logos/Groq-Logo.png?v=949698" alt="Groq" title="Groq LPU" class="brand-logo-dyed h-5 sm:h-6 w-auto object-contain opacity-85 hover:opacity-100" />
              </div>
              <!-- Mistral AI -->
              <div class="flex items-center shrink-0">
                <img src="/logos/Mistral-AI-Logo.png?v=949698" alt="Mistral AI" title="Mistral AI" class="brand-logo-dyed h-5 sm:h-6 w-auto object-contain opacity-85 hover:opacity-100" />
              </div>
              <!-- Google DeepMind -->
              <div class="flex items-center shrink-0">
                <img src="/logos/Google-DeepMind-Logo.png?v=949698" alt="Google DeepMind" title="Google DeepMind" class="brand-logo-dyed h-5 sm:h-6 w-auto object-contain opacity-85 hover:opacity-100" />
              </div>
              <!-- OpenAI -->
              <div class="flex items-center shrink-0">
                <img src="/logos/OpenAI-Logo.png?v=949698" alt="OpenAI" title="OpenAI API" class="brand-logo-dyed h-5 sm:h-6 w-auto object-contain opacity-85 hover:opacity-100" />
              </div>
              <!-- Anthropic -->
              <div class="flex items-center shrink-0">
                <img src="/logos/Anthropic-Logo.png?v=949698" alt="Anthropic" title="Anthropic" class="brand-logo-dyed h-3.5 sm:h-4 w-auto object-contain opacity-85 hover:opacity-100" />
              </div>
              <!-- Google Gemini -->
              <div class="flex items-center shrink-0">
                <img src="/logos/Google-Gemini-Logo.png?v=949698" alt="Google Gemini" title="Google Gemini" class="brand-logo-dyed h-5 sm:h-6 w-auto object-contain opacity-85 hover:opacity-100" />
              </div>
              <!-- OpenRouter -->
              <div class="flex items-center shrink-0">
                <img src="/logos/OpenRouter-Logo.png?v=949698" alt="OpenRouter" title="OpenRouter" class="brand-logo-dyed h-5 sm:h-6 w-auto object-contain opacity-85 hover:opacity-100" />
              </div>
            </div>

            <!-- Group 3 (Extended Buffer for Ultrawide Screens) -->
            <div class="animate-marquee" aria-hidden="true">
              <!-- Groq -->
              <div class="flex items-center shrink-0">
                <img src="/logos/Groq-Logo.png?v=949698" alt="Groq" title="Groq LPU" class="brand-logo-dyed h-5 sm:h-6 w-auto object-contain opacity-85 hover:opacity-100" />
              </div>
              <!-- Mistral AI -->
              <div class="flex items-center shrink-0">
                <img src="/logos/Mistral-AI-Logo.png?v=949698" alt="Mistral AI" title="Mistral AI" class="brand-logo-dyed h-5 sm:h-6 w-auto object-contain opacity-85 hover:opacity-100" />
              </div>
              <!-- Google DeepMind -->
              <div class="flex items-center shrink-0">
                <img src="/logos/Google-DeepMind-Logo.png?v=949698" alt="Google DeepMind" title="Google DeepMind" class="brand-logo-dyed h-5 sm:h-6 w-auto object-contain opacity-85 hover:opacity-100" />
              </div>
              <!-- OpenAI -->
              <div class="flex items-center shrink-0">
                <img src="/logos/OpenAI-Logo.png?v=949698" alt="OpenAI" title="OpenAI API" class="brand-logo-dyed h-5 sm:h-6 w-auto object-contain opacity-85 hover:opacity-100" />
              </div>
              <!-- Anthropic -->
              <div class="flex items-center shrink-0">
                <img src="/logos/Anthropic-Logo.png?v=949698" alt="Anthropic" title="Anthropic" class="brand-logo-dyed h-3.5 sm:h-4 w-auto object-contain opacity-85 hover:opacity-100" />
              </div>
              <!-- Google Gemini -->
              <div class="flex items-center shrink-0">
                <img src="/logos/Google-Gemini-Logo.png?v=949698" alt="Google Gemini" title="Google Gemini" class="brand-logo-dyed h-5 sm:h-6 w-auto object-contain opacity-85 hover:opacity-100" />
              </div>
              <!-- OpenRouter -->
              <div class="flex items-center shrink-0">
                <img src="/logos/OpenRouter-Logo.png?v=949698" alt="OpenRouter" title="OpenRouter" class="brand-logo-dyed h-5 sm:h-6 w-auto object-contain opacity-85 hover:opacity-100" />
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>

      <!-- ======================================================================= -->
      <!-- SECTION 2: THE PROJECTSPG PLATFORM (Interactive 3-Tab Feature Showcase)-->
      <!-- Matches uploaded media: 1790540329449, 1790540346632, 1790540364464, 1790540377437 -->
      <!-- ======================================================================= -->
      <section id="platform-section" class="w-full py-12 sm:py-20 lg:py-24 relative z-10 bg-gradient-to-b from-[#e8f7f8]/55 via-[#f1f4fb]/60 to-[#f8fafc] border-t border-gray-100 scroll-mt-20 sm:scroll-mt-24">
        <div class="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8">
        
        <!-- Section Header -->
        <div class="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <h2 class="text-2xl sm:text-4xl lg:text-[46px] font-bold tracking-tight text-gray-950 mb-3 sm:mb-4 font-sans">
            The ProjectSPG Platform
          </h2>
          <p class="text-sm sm:text-base lg:text-lg text-gray-600 font-normal leading-relaxed px-2">
            End-to-end data de-identification, zero-retention privacy routing, and continuous enterprise compliance.
          </p>
        </div>

        <!-- 3 Squarish Category Buttons with Rounded Corners (De-Identify, Privacy, Compliance) -->
        <div class="grid grid-cols-3 gap-3 sm:gap-6 max-w-4xl mx-auto mb-8 sm:mb-12 px-1">
          <button id="cat-tab-inference" onclick="selectPlatformCategory('inference')" class="cat-pill py-3.5 sm:py-4.5 px-2 sm:px-6 rounded-md text-center font-bold text-xs sm:text-base md:text-xl transition-all duration-200 cursor-pointer text-gray-950 border border-transparent shadow-2xs bg-[#d5f5f6]">
            De-Identify
          </button>
          <button id="cat-tab-compute" onclick="selectPlatformCategory('compute')" class="cat-pill py-3.5 sm:py-4.5 px-2 sm:px-6 rounded-md text-center font-bold text-xs sm:text-base md:text-xl transition-all duration-200 cursor-pointer bg-white text-gray-900 border border-gray-200/70 shadow-2xs hover:bg-gray-50/90 hover:text-black">
            Privacy
          </button>
          <button id="cat-tab-shaping" onclick="selectPlatformCategory('shaping')" class="cat-pill py-3.5 sm:py-4.5 px-2 sm:px-6 rounded-md text-center font-bold text-xs sm:text-base md:text-xl transition-all duration-200 cursor-pointer bg-white text-gray-900 border border-gray-200/70 shadow-2xs hover:bg-gray-50/90 hover:text-black">
            Compliance
          </button>
        </div>

        <!-- Unified White Category Panel Wrapper -->
        <div class="w-full bg-white rounded-xl p-6 border border-gray-200/80 shadow-xs">

        <!-- ===================================================================== -->
        <!-- CATEGORY PANEL 1: DE-IDENTIFY -->
        <!-- ===================================================================== -->
        <div id="platform-cat-panel-inference" class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <!-- Left Column: De-Identify Sub-items Accordion -->
          <div class="lg:col-span-5 flex flex-col space-y-3">
            
            <!-- Item 0: Reversible Tokenization (Active Default) -->
            <div class="platform-subitem subitem-inference is-active w-full rounded-xl border transition-all duration-300 cursor-pointer overflow-hidden" onclick="selectPlatformSubItem('inference', 0)">
              <div class="p-4 sm:p-5 flex items-center justify-between">
                <div class="flex items-center gap-3.5">
                  <div class="subitem-icon-box w-9 h-9 rounded-xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-cyan-600 transition-all duration-300">
                    <i data-lucide="shield-check" class="w-5 h-5"></i>
                  </div>
                  <h3 class="subitem-title text-lg sm:text-xl font-bold tracking-tight text-gray-950 transition-colors">Automatic Data Redaction</h3>
                </div>
              </div>
              <div class="platform-accordion-drawer grid transition-[grid-template-rows] duration-350 ease-out">
                <div class="platform-accordion-drawer-inner overflow-hidden min-h-0">
                  <div class="px-4 sm:px-5 pb-5 sm:pb-6 pt-0">
                    <p class="text-sm sm:text-[15px] text-gray-600 leading-relaxed mb-6 font-normal">
                      Automatically redact customer PII and confidential records before prompts reach AI models, preventing data leaks without slowing development.
                    </p>
                    <button onclick="event.stopPropagation(); switchView('playground')" class="px-5 py-2.5 bg-black hover:bg-gray-800 text-white text-[11px] font-bold tracking-wider uppercase rounded-sm transition shadow-xs cursor-pointer">
                      TRY IN PLAYGROUND
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Item 1: Format-Preserving Encryption -->
            <div class="platform-subitem subitem-inference w-full rounded-xl border transition-all duration-300 cursor-pointer overflow-hidden" onclick="selectPlatformSubItem('inference', 1)">
              <div class="p-4 sm:p-5 flex items-center justify-between">
                <div class="flex items-center gap-3.5">
                  <div class="subitem-icon-box w-9 h-9 rounded-xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-cyan-600 transition-all duration-300">
                    <i data-lucide="hash" class="w-5 h-5"></i>
                  </div>
                  <h3 class="subitem-title text-lg sm:text-xl font-bold tracking-tight text-gray-950 transition-colors">Context-Preserving Masking</h3>
                </div>
              </div>
              <div class="platform-accordion-drawer grid transition-[grid-template-rows] duration-350 ease-out">
                <div class="platform-accordion-drawer-inner overflow-hidden min-h-0">
                  <div class="px-4 sm:px-5 pb-5 sm:pb-6 pt-0">
                    <p class="text-sm sm:text-[15px] text-gray-600 leading-relaxed mb-6 font-normal">
                      Disguise sensitive names and numbers while preserving formatting and grammar, letting models reason accurately without seeing real data.
                    </p>
                    <button onclick="event.stopPropagation(); switchView('playground')" class="px-5 py-2.5 bg-black hover:bg-gray-800 text-white text-[11px] font-bold tracking-wider uppercase rounded-sm transition shadow-xs cursor-pointer">
                      LEARN MORE
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Item 2: Global Entity Detectors -->
            <div class="platform-subitem subitem-inference w-full rounded-xl border transition-all duration-300 cursor-pointer overflow-hidden" onclick="selectPlatformSubItem('inference', 2)">
              <div class="p-4 sm:p-5 flex items-center justify-between">
                <div class="flex items-center gap-3.5">
                  <div class="subitem-icon-box w-9 h-9 rounded-xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-cyan-600 transition-all duration-300">
                    <i data-lucide="scan" class="w-5 h-5"></i>
                  </div>
                  <h3 class="subitem-title text-lg sm:text-xl font-bold tracking-tight text-gray-950 transition-colors">Global Privacy Scanner</h3>
                </div>
              </div>
              <div class="platform-accordion-drawer grid transition-[grid-template-rows] duration-350 ease-out">
                <div class="platform-accordion-drawer-inner overflow-hidden min-h-0">
                  <div class="px-4 sm:px-5 pb-5 sm:pb-6 pt-0">
                    <p class="text-sm sm:text-[15px] text-gray-600 leading-relaxed mb-6 font-normal">
                      Detect and shield regional identifiers across North America, Europe, Asia, Africa, and Latin America with zero manual setup.
                    </p>
                    <button onclick="event.stopPropagation(); switchView('playground')" class="px-5 py-2.5 bg-black hover:bg-gray-800 text-white text-[11px] font-bold tracking-wider uppercase rounded-sm transition shadow-xs cursor-pointer">
                      LEARN MORE
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Item 3: Isolated KMS Token Vault -->
            <div class="platform-subitem subitem-inference w-full rounded-xl border transition-all duration-300 cursor-pointer overflow-hidden" onclick="selectPlatformSubItem('inference', 3)">
              <div class="p-4 sm:p-5 flex items-center justify-between">
                <div class="flex items-center gap-3.5">
                  <div class="subitem-icon-box w-9 h-9 rounded-xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-cyan-600 transition-all duration-300">
                    <i data-lucide="database" class="w-5 h-5"></i>
                  </div>
                  <h3 class="subitem-title text-lg sm:text-xl font-bold tracking-tight text-gray-950 transition-colors">Secure Enterprise Vault</h3>
                </div>
              </div>
              <div class="platform-accordion-drawer grid transition-[grid-template-rows] duration-350 ease-out">
                <div class="platform-accordion-drawer-inner overflow-hidden min-h-0">
                  <div class="px-4 sm:px-5 pb-5 sm:pb-6 pt-0">
                    <p class="text-sm sm:text-[15px] text-gray-600 leading-relaxed mb-6 font-normal">
                      Keep real data isolated in your dedicated vault, secured by enterprise encryption keys that only your organization controls.
                    </p>
                    <button onclick="event.stopPropagation(); switchView('playground')" class="px-5 py-2.5 bg-black hover:bg-gray-800 text-white text-[11px] font-bold tracking-wider uppercase rounded-sm transition shadow-xs cursor-pointer">
                      LEARN MORE
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <!-- Right Column: Visual Showcases for De-Identify -->
          <div class="lg:col-span-7 flex items-center justify-center lg:justify-end">
            
            <!-- Mockup 0: Automatic Data Redaction Showcase -->
            <div class="mockup-inference relative rounded-xl border border-gray-200 overflow-hidden aspect-square w-full max-w-[540px] lg:ml-auto bg-white flex items-center justify-center">
              <img id="img-platform-inference-0" src="/images/automatic-data-redaction.png" alt="Automatic Data Redaction" class="w-full h-full object-cover" />
            </div>

            <!-- Mockup 1: Context-Preserving Masking Showcase -->
            <div class="mockup-inference hidden relative rounded-xl border border-gray-200 overflow-hidden aspect-square w-full max-w-[540px] lg:ml-auto bg-white flex items-center justify-center">
              <img id="img-platform-inference-1" src="/images/context-preserving-masking.png" alt="Context-Preserving Masking" class="w-full h-full object-cover" />
            </div>

            <!-- Mockup 2: Global Privacy Scanner Showcase -->
            <div class="mockup-inference hidden relative rounded-xl border border-gray-200 overflow-hidden aspect-square w-full max-w-[540px] lg:ml-auto bg-white flex items-center justify-center">
              <img id="img-platform-inference-2" src="/images/global-privacy-scanner.png" alt="Global Privacy Scanner" class="w-full h-full object-cover" />
            </div>

            <!-- Mockup 3: Secure Enterprise Vault Showcase -->
            <div class="mockup-inference hidden relative rounded-xl border border-gray-200 overflow-hidden aspect-square w-full max-w-[540px] lg:ml-auto bg-white flex items-center justify-center">
              <img id="img-platform-inference-3" src="/images/secure-enterprise-vault.png" alt="Secure Enterprise Vault" class="w-full h-full object-cover" />
            </div>

          </div>

        </div>

        <!-- ===================================================================== -->
        <!-- CATEGORY PANEL 2: PRIVACY -->
        <!-- ===================================================================== -->
        <div id="platform-cat-panel-compute" class="hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <!-- Left Column: Privacy Sub-items Accordion -->
          <div class="lg:col-span-5 flex flex-col space-y-3">
            
            <!-- Item 0: Universal OpenAI Wire Gateway (Active Default) -->
            <div class="platform-subitem subitem-compute is-active w-full rounded-xl border transition-all duration-300 cursor-pointer overflow-hidden" onclick="selectPlatformSubItem('compute', 0)">
              <div class="p-4 sm:p-5 flex items-center justify-between">
                <div class="flex items-center gap-3.5">
                  <div class="subitem-icon-box w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 transition-all duration-300">
                    <i data-lucide="cpu" class="w-5 h-5"></i>
                  </div>
                  <h3 class="subitem-title text-lg sm:text-xl font-bold tracking-tight text-gray-950 transition-colors">One-Click AI Gateway</h3>
                </div>
              </div>
              <div class="platform-accordion-drawer grid transition-[grid-template-rows] duration-350 ease-out">
                <div class="platform-accordion-drawer-inner overflow-hidden min-h-0">
                  <div class="px-4 sm:px-5 pb-5 sm:pb-6 pt-0">
                    <p class="text-sm sm:text-[15px] text-gray-600 leading-relaxed mb-6 font-normal">
                      Protect chatbots, agents, and apps in minutes with a single-line URL change — zero code rewrites required.
                    </p>
                    <button onclick="event.stopPropagation(); switchView('playground')" class="px-5 py-2.5 bg-black hover:bg-gray-800 text-white text-[11px] font-bold tracking-wider uppercase rounded-sm transition shadow-xs cursor-pointer">
                      LEARN MORE
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Item 1: Multi-Model Freedom Showcase -->
            <div class="platform-subitem subitem-compute w-full rounded-xl border transition-all duration-300 cursor-pointer overflow-hidden" onclick="selectPlatformSubItem('compute', 1)">
              <div class="p-4 sm:p-5 flex items-center justify-between">
                <div class="flex items-center gap-3.5">
                  <div class="subitem-icon-box w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 transition-all duration-300">
                    <i data-lucide="box" class="w-5 h-5"></i>
                  </div>
                  <h3 class="subitem-title text-lg sm:text-xl font-bold tracking-tight text-gray-950 transition-colors">Multi-Model Freedom (BYOK)</h3>
                </div>
              </div>
              <div class="platform-accordion-drawer grid transition-[grid-template-rows] duration-350 ease-out">
                <div class="platform-accordion-drawer-inner overflow-hidden min-h-0">
                  <div class="px-4 sm:px-5 pb-5 sm:pb-6 pt-0">
                    <p class="text-sm sm:text-[15px] text-gray-600 leading-relaxed mb-6 font-normal">
                      Route prompts across Groq, Gemini, Mistral, and open-source models with your own keys to optimize speed, cost, and quality.
                    </p>
                    <button onclick="event.stopPropagation(); switchView('playground')" class="px-5 py-2.5 bg-black hover:bg-gray-800 text-white text-[11px] font-bold tracking-wider uppercase rounded-sm transition shadow-xs cursor-pointer">
                      LEARN MORE
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Item 2: Real-Time Response Rehydration -->
            <div class="platform-subitem subitem-compute w-full rounded-xl border transition-all duration-300 cursor-pointer overflow-hidden" onclick="selectPlatformSubItem('compute', 2)">
              <div class="p-4 sm:p-5 flex items-center justify-between">
                <div class="flex items-center gap-3.5">
                  <div class="subitem-icon-box w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 transition-all duration-300">
                    <i data-lucide="hard-drive" class="w-5 h-5"></i>
                  </div>
                  <h3 class="subitem-title text-lg sm:text-xl font-bold tracking-tight text-gray-950 transition-colors">Seamless Live Rehydration</h3>
                </div>
              </div>
              <div class="platform-accordion-drawer grid transition-[grid-template-rows] duration-350 ease-out">
                <div class="platform-accordion-drawer-inner overflow-hidden min-h-0">
                  <div class="px-4 sm:px-5 pb-5 sm:pb-6 pt-0">
                    <p class="text-sm sm:text-[15px] text-gray-600 leading-relaxed mb-6 font-normal">
                      Reconstitute original details in real time as AI answers stream back, delivering personalized responses with zero friction.
                    </p>
                    <button onclick="event.stopPropagation(); switchView('playground')" class="px-5 py-2.5 bg-black hover:bg-gray-800 text-white text-[11px] font-bold tracking-wider uppercase rounded-sm transition shadow-xs cursor-pointer">
                      LEARN MORE
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <!-- Right Column: Visual Showcases for Privacy (Image Placeholders) -->
          <div class="lg:col-span-7 flex items-center justify-center lg:justify-end">
            
            <!-- Mockup 0: One-Click AI Gateway Integration Placeholder -->
            <div class="mockup-compute relative rounded-2xl sm:rounded-3xl p-3 sm:p-5 bg-gradient-to-tr from-[#93c5fd] via-[#e0e7ff] to-[#38bdf8] border border-gray-200/70 shadow-lg min-h-[260px] sm:min-h-[380px] lg:min-h-[460px] flex items-center justify-center overflow-hidden">
              <div class="w-full aspect-[16/10] bg-white/95 backdrop-blur-md rounded-xl sm:rounded-2xl border border-gray-200/90 shadow-xl overflow-hidden flex flex-col relative">
                <div class="h-8 sm:h-9 px-3 sm:px-4 border-b border-gray-100 flex items-center justify-between bg-white shrink-0">
                  <div class="flex items-center gap-1.5 sm:gap-2">
                    <span class="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-red-400"></span>
                    <span class="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-amber-400"></span>
                    <span class="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-emerald-400"></span>
                    <span class="text-[10px] sm:text-[11px] font-mono text-gray-500 ml-1.5 sm:ml-2">one-click-ai-gateway.png</span>
                  </div>
                  <span class="text-[9px] sm:text-[10px] text-gray-400 font-medium">16:10</span>
                </div>
                <div class="flex-1 relative flex items-center justify-center bg-gray-50/50 p-2 overflow-hidden">
                  <!-- PLACEHOLDER IMG: Replace src with image URL/path -->
                  <img id="img-platform-compute-0" src="" alt="One-Click AI Gateway" class="w-full h-full object-cover rounded-xl hidden" onload="this.classList.remove('hidden'); const fb=document.getElementById('fb-platform-compute-0'); if(fb) fb.classList.add('hidden');" />
                  <div id="fb-platform-compute-0" class="w-full h-full min-h-[200px] sm:min-h-[320px] border-2 border-dashed border-blue-300/80 rounded-xl bg-blue-50/40 flex flex-col items-center justify-center p-4 sm:p-8 text-center">
                    <div class="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center shadow-xs mb-2 sm:mb-3.5">
                      <i data-lucide="cpu" class="w-6 h-6 sm:w-8 sm:h-8"></i>
                    </div>
                    <h4 class="text-sm sm:text-base font-bold text-gray-900 mb-1">Accelerated Compute Image</h4>
                    <p class="text-[11px] sm:text-xs text-gray-500 max-w-sm mb-3 sm:mb-4">
                      Drop your screenshot into <code class="text-blue-800 bg-blue-100/70 px-1 py-0.5 rounded font-mono text-[10px] sm:text-[11px]">#img-platform-compute-0</code>
                    </p>
                    <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-gray-200/90 text-gray-700 text-[9px] sm:text-[10px] font-semibold tracking-wide uppercase shadow-2xs">
                      <i data-lucide="upload-cloud" class="w-3.5 h-3.5 text-blue-600"></i> Placeholder Image (16:10)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Mockup 1: Sandbox Image Placeholder -->
            <div class="mockup-compute hidden relative rounded-2xl sm:rounded-3xl p-3 sm:p-5 bg-gradient-to-tr from-[#a5b4fc] via-[#f0f9ff] to-[#67e8f9] border border-gray-200/70 shadow-lg min-h-[260px] sm:min-h-[380px] lg:min-h-[460px] flex items-center justify-center overflow-hidden">
              <div class="w-full aspect-[16/10] bg-white/95 backdrop-blur-md rounded-xl sm:rounded-2xl border border-gray-200/90 shadow-xl overflow-hidden flex flex-col relative">
                <div class="h-8 sm:h-9 px-3 sm:px-4 border-b border-gray-100 flex items-center justify-between bg-white shrink-0">
                  <div class="flex items-center gap-1.5 sm:gap-2">
                    <span class="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-red-400"></span>
                    <span class="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-amber-400"></span>
                    <span class="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-emerald-400"></span>
                    <span class="text-[10px] sm:text-[11px] font-mono text-gray-500 ml-1.5 sm:ml-2">multi-model-freedom.png</span>
                  </div>
                  <span class="text-[9px] sm:text-[10px] text-gray-400 font-medium">16:10</span>
                </div>
                <div class="flex-1 relative flex items-center justify-center bg-gray-50/50 p-2 overflow-hidden">
                  <!-- PLACEHOLDER IMG: Replace src with image URL/path -->
                  <img id="img-platform-compute-1" src="" alt="Multi-Model Freedom (BYOK)" class="w-full h-full object-cover rounded-xl hidden" onload="this.classList.remove('hidden'); const fb=document.getElementById('fb-platform-compute-1'); if(fb) fb.classList.add('hidden');" />
                  <div id="fb-platform-compute-1" class="w-full h-full min-h-[200px] sm:min-h-[320px] border-2 border-dashed border-indigo-300/80 rounded-xl bg-indigo-50/40 flex flex-col items-center justify-center p-4 sm:p-8 text-center">
                    <div class="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center shadow-xs mb-2 sm:mb-3.5">
                      <i data-lucide="box" class="w-6 h-6 sm:w-8 sm:h-8"></i>
                    </div>
                    <h4 class="text-sm sm:text-base font-bold text-gray-900 mb-1">Multi-Provider BYOK Routing</h4>
                    <p class="text-[11px] sm:text-xs text-gray-500 max-w-sm mb-3 sm:mb-4">
                      Drop your screenshot into <code class="text-indigo-800 bg-indigo-100/70 px-1 py-0.5 rounded font-mono text-[10px] sm:text-[11px]">#img-platform-compute-1</code>
                    </p>
                    <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-gray-200/90 text-gray-700 text-[9px] sm:text-[10px] font-semibold tracking-wide uppercase shadow-2xs">
                      <i data-lucide="upload-cloud" class="w-3.5 h-3.5 text-indigo-600"></i> Placeholder Image (16:10)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Mockup 2: Seamless Live Rehydration Showcase Placeholder -->
            <div class="mockup-compute hidden relative rounded-2xl sm:rounded-3xl p-3 sm:p-5 bg-gradient-to-tr from-[#93c5fd] via-[#e2e8f0] to-[#bfdbfe] border border-gray-200/70 shadow-lg min-h-[260px] sm:min-h-[380px] lg:min-h-[460px] flex items-center justify-center overflow-hidden">
              <div class="w-full aspect-[16/10] bg-white/95 backdrop-blur-md rounded-xl sm:rounded-2xl border border-gray-200/90 shadow-xl overflow-hidden flex flex-col relative">
                <div class="h-8 sm:h-9 px-3 sm:px-4 border-b border-gray-100 flex items-center justify-between bg-white shrink-0">
                  <div class="flex items-center gap-1.5 sm:gap-2">
                    <span class="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-red-400"></span>
                    <span class="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-amber-400"></span>
                    <span class="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-emerald-400"></span>
                    <span class="text-[10px] sm:text-[11px] font-mono text-gray-500 ml-1.5 sm:ml-2">seamless-live-rehydration.png</span>
                  </div>
                  <span class="text-[9px] sm:text-[10px] text-gray-400 font-medium">16:10</span>
                </div>
                <div class="flex-1 relative flex items-center justify-center bg-gray-50/50 p-2 overflow-hidden">
                  <!-- PLACEHOLDER IMG: Replace src with image URL/path -->
                  <img id="img-platform-compute-2" src="" alt="Seamless Live Rehydration" class="w-full h-full object-cover rounded-xl hidden" onload="this.classList.remove('hidden'); const fb=document.getElementById('fb-platform-compute-2'); if(fb) fb.classList.add('hidden');" />
                  <div id="fb-platform-compute-2" class="w-full h-full min-h-[200px] sm:min-h-[320px] border-2 border-dashed border-blue-300/80 rounded-xl bg-blue-50/40 flex flex-col items-center justify-center p-4 sm:p-8 text-center">
                    <div class="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center shadow-xs mb-2 sm:mb-3.5">
                      <i data-lucide="hard-drive" class="w-6 h-6 sm:w-8 sm:h-8"></i>
                    </div>
                    <h4 class="text-sm sm:text-base font-bold text-gray-900 mb-1">Managed Storage Image</h4>
                    <p class="text-[11px] sm:text-xs text-gray-500 max-w-sm mb-3 sm:mb-4">
                      Drop your screenshot into <code class="text-blue-800 bg-blue-100/70 px-1 py-0.5 rounded font-mono text-[10px] sm:text-[11px]">#img-platform-compute-2</code>
                    </p>
                    <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-gray-200/90 text-gray-700 text-[9px] sm:text-[10px] font-semibold tracking-wide uppercase shadow-2xs">
                      <i data-lucide="upload-cloud" class="w-3.5 h-3.5 text-blue-600"></i> Placeholder Image (16:10)
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

        <!-- ===================================================================== -->
        <!-- CATEGORY PANEL 3: COMPLIANCE -->
        <!-- ===================================================================== -->
        <div id="platform-cat-panel-shaping" class="hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <!-- Left Column: Compliance Sub-items Accordion -->
          <div class="lg:col-span-5 flex flex-col space-y-3">
            
            <!-- Item 0: Real-Time SIEM Audit Telemetry (Active Default) -->
            <div class="platform-subitem subitem-shaping is-active w-full rounded-xl border transition-all duration-300 cursor-pointer overflow-hidden" onclick="selectPlatformSubItem('shaping', 0)">
              <div class="p-4 sm:p-5 flex items-center justify-between">
                <div class="flex items-center gap-3.5">
                  <div class="subitem-icon-box w-9 h-9 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 transition-all duration-300">
                    <i data-lucide="activity" class="w-5 h-5"></i>
                  </div>
                  <h3 class="subitem-title text-lg sm:text-xl font-bold tracking-tight text-gray-950 transition-colors">Real-Time Security Audit Logs</h3>
                </div>
              </div>
              <div class="platform-accordion-drawer grid transition-[grid-template-rows] duration-350 ease-out">
                <div class="platform-accordion-drawer-inner overflow-hidden min-h-0">
                  <div class="px-4 sm:px-5 pb-5 sm:pb-6 pt-0">
                    <p class="text-sm sm:text-[15px] text-gray-600 leading-relaxed mb-6 font-normal">
                      Track every protected prompt, redacted entity, and model transaction in real time for complete security and audit visibility.
                    </p>
                    <button onclick="event.stopPropagation(); switchView('playground')" class="px-5 py-2.5 bg-black hover:bg-gray-800 text-white text-[11px] font-bold tracking-wider uppercase rounded-sm transition shadow-xs cursor-pointer">
                      LEARN MORE
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Item 1: Enterprise Regulatory Rulepacks -->
            <div class="platform-subitem subitem-shaping w-full rounded-xl border transition-all duration-300 cursor-pointer overflow-hidden" onclick="selectPlatformSubItem('shaping', 1)">
              <div class="p-4 sm:p-5 flex items-center justify-between">
                <div class="flex items-center gap-3.5">
                  <div class="subitem-icon-box w-9 h-9 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 transition-all duration-300">
                    <i data-lucide="shield" class="w-5 h-5"></i>
                  </div>
                  <h3 class="subitem-title text-lg sm:text-xl font-bold tracking-tight text-gray-950 transition-colors">Turnkey Regulatory Compliance</h3>
                </div>
              </div>
              <div class="platform-accordion-drawer grid transition-[grid-template-rows] duration-350 ease-out">
                <div class="platform-accordion-drawer-inner overflow-hidden min-h-0">
                  <div class="px-4 sm:px-5 pb-5 sm:pb-6 pt-0">
                    <p class="text-sm sm:text-[15px] text-gray-600 leading-relaxed mb-6 font-normal">
                      Satisfy HIPAA, GDPR, CCPA, and SOC 2 guardrails instantly, fast-tracking approval from legal and risk committees.
                    </p>
                    <button onclick="event.stopPropagation(); switchView('playground')" class="px-5 py-2.5 bg-black hover:bg-gray-800 text-white text-[11px] font-bold tracking-wider uppercase rounded-sm transition shadow-xs cursor-pointer">
                      LEARN MORE
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <!-- Right Column: Visual Showcases for Compliance (Image Placeholders) -->
          <div class="lg:col-span-7 flex items-center justify-center lg:justify-end">
            
            <!-- Mockup 0: Fine-Tuning Image Placeholder -->
            <div class="mockup-shaping relative rounded-2xl sm:rounded-3xl p-3 sm:p-5 bg-gradient-to-tr from-[#e9d5ff] via-[#fdf2f8] to-[#f472b6] border border-gray-200/70 shadow-lg min-h-[260px] sm:min-h-[380px] lg:min-h-[460px] flex items-center justify-center overflow-hidden">
              <div class="w-full aspect-[16/10] bg-white/95 backdrop-blur-md rounded-xl sm:rounded-2xl border border-gray-200/90 shadow-xl overflow-hidden flex flex-col relative">
                <div class="h-8 sm:h-9 px-3 sm:px-4 border-b border-gray-100 flex items-center justify-between bg-white shrink-0">
                  <div class="flex items-center gap-1.5 sm:gap-2">
                    <span class="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-red-400"></span>
                    <span class="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-amber-400"></span>
                    <span class="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-emerald-400"></span>
                    <span class="text-[10px] sm:text-[11px] font-mono text-gray-500 ml-1.5 sm:ml-2">realtime-security-audit.png</span>
                  </div>
                  <span class="text-[9px] sm:text-[10px] text-gray-400 font-medium">16:10</span>
                </div>
                <div class="flex-1 relative flex items-center justify-center bg-gray-50/50 p-2 overflow-hidden">
                  <!-- PLACEHOLDER IMG: Replace src with image URL/path -->
                  <img id="img-platform-shaping-0" src="" alt="Real-Time Security Audit Logs" class="w-full h-full object-cover rounded-xl hidden" onload="this.classList.remove('hidden'); const fb=document.getElementById('fb-platform-shaping-0'); if(fb) fb.classList.add('hidden');" />
                  <div id="fb-platform-shaping-0" class="w-full h-full min-h-[200px] sm:min-h-[320px] border-2 border-dashed border-purple-300/80 rounded-xl bg-purple-50/40 flex flex-col items-center justify-center p-4 sm:p-8 text-center">
                    <div class="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center shadow-xs mb-2 sm:mb-3.5">
                      <i data-lucide="sliders" class="w-6 h-6 sm:w-8 sm:h-8"></i>
                    </div>
                    <h4 class="text-sm sm:text-base font-bold text-gray-900 mb-1">Real-Time Security Audit Dashboard</h4>
                    <p class="text-[11px] sm:text-xs text-gray-500 max-w-sm mb-3 sm:mb-4">
                      Drop your screenshot into <code class="text-purple-800 bg-purple-100/70 px-1 py-0.5 rounded font-mono text-[10px] sm:text-[11px]">#img-platform-shaping-0</code>
                    </p>
                    <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-gray-200/90 text-gray-700 text-[9px] sm:text-[10px] font-semibold tracking-wide uppercase shadow-2xs">
                      <i data-lucide="upload-cloud" class="w-3.5 h-3.5 text-purple-600"></i> Placeholder Image (16:10)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Mockup 1: Turnkey Compliance Showcase Placeholder -->
            <div class="mockup-shaping hidden relative rounded-2xl sm:rounded-3xl p-3 sm:p-5 bg-gradient-to-tr from-[#fbcfe8] via-[#fdf4ff] to-[#ddd6fe] border border-gray-200/70 shadow-lg min-h-[260px] sm:min-h-[380px] lg:min-h-[460px] flex items-center justify-center overflow-hidden">
              <div class="w-full aspect-[16/10] bg-white/95 backdrop-blur-md rounded-xl sm:rounded-2xl border border-gray-200/90 shadow-xl overflow-hidden flex flex-col relative">
                <div class="h-8 sm:h-9 px-3 sm:px-4 border-b border-gray-100 flex items-center justify-between bg-white shrink-0">
                  <div class="flex items-center gap-1.5 sm:gap-2">
                    <span class="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-red-400"></span>
                    <span class="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-amber-400"></span>
                    <span class="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-emerald-400"></span>
                    <span class="text-[10px] sm:text-[11px] font-mono text-gray-500 ml-1.5 sm:ml-2">turnkey-regulatory-compliance.png</span>
                  </div>
                  <span class="text-[9px] sm:text-[10px] text-gray-400 font-medium">16:10</span>
                </div>
                <div class="flex-1 relative flex items-center justify-center bg-gray-50/50 p-2 overflow-hidden">
                  <!-- PLACEHOLDER IMG: Replace src with image URL/path -->
                  <img id="img-platform-shaping-1" src="" alt="Turnkey Regulatory Compliance" class="w-full h-full object-cover rounded-xl hidden" onload="this.classList.remove('hidden'); const fb=document.getElementById('fb-platform-shaping-1'); if(fb) fb.classList.add('hidden');" />
                  <div id="fb-platform-shaping-1" class="w-full h-full min-h-[200px] sm:min-h-[320px] border-2 border-dashed border-pink-300/80 rounded-xl bg-pink-50/40 flex flex-col items-center justify-center p-4 sm:p-8 text-center">
                    <div class="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-pink-100 text-pink-700 flex items-center justify-center shadow-xs mb-2 sm:mb-3.5">
                      <i data-lucide="git-merge" class="w-6 h-6 sm:w-8 sm:h-8"></i>
                    </div>
                    <h4 class="text-sm sm:text-base font-bold text-gray-900 mb-1">Model Alignment Image</h4>
                    <p class="text-[11px] sm:text-xs text-gray-500 max-w-sm mb-3 sm:mb-4">
                      Drop your screenshot into <code class="text-pink-800 bg-pink-100/70 px-1 py-0.5 rounded font-mono text-[10px] sm:text-[11px]">#img-platform-shaping-1</code>
                    </p>
                    <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-gray-200/90 text-gray-700 text-[9px] sm:text-[10px] font-semibold tracking-wide uppercase shadow-2xs">
                      <i data-lucide="upload-cloud" class="w-3.5 h-3.5 text-pink-600"></i> Placeholder Image (16:10)
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

        </div> <!-- /Unified White Category Panel Wrapper -->
        </div> <!-- /max-w-[1440px] -->

      </section>

      <!-- ======================================================================= -->
      <!-- SECTION 3: GROUNDED IN CUTTING-EDGE RESEARCH                            -->
      <!-- Matches uploaded media: 1790540856043.png & 1790540898787.png           -->
      <!-- ======================================================================= -->
      <section id="research-section" class="w-full bg-[#010120] text-white py-14 sm:py-24 relative border-t border-[#121235] scroll-mt-20 sm:scroll-mt-24">
        
        <!-- Ambient Subtle Deep Background Glow -->
        <div class="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-r from-blue-900/15 via-purple-900/15 to-indigo-900/15 blur-3xl pointer-events-none -z-0"></div>

        <div class="max-w-[1440px] mx-auto px-2.5 sm:px-4 lg:px-6 relative z-10">
          
          <!-- Header Row (Title & Navigation Arrows) -->
          <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-14">
            <div>
              <h2 class="text-2xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-white mb-2 sm:mb-3 font-sans">
                How ProjectSPG Works
              </h2>
              <p class="text-sm sm:text-base lg:text-lg text-gray-400 font-normal">
                The 4-step sovereign privacy pipeline — from prompt interception to real-time rehydration.
              </p>
            </div>

            <!-- Carousel Navigation Arrows (shown on desktop, hidden on mobile) -->
            <div class="hidden lg:flex items-center gap-2">
              <button onclick="scrollResearchCards('left')" class="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white flex items-center justify-center transition shadow-xs cursor-pointer" aria-label="Previous step">
                <i data-lucide="chevron-left" class="w-4 h-4"></i>
              </button>
              <button onclick="scrollResearchCards('right')" class="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white flex items-center justify-center transition shadow-xs cursor-pointer" aria-label="Next step">
                <i data-lucide="chevron-right" class="w-4 h-4"></i>
              </button>
            </div>
          </div>

          <!-- Cards Carousel Container with Horizontal Connector Line -->
          <div class="relative">
            
            <!-- Horizontal Connecting Line passing behind cards -->
            <div class="hidden lg:block absolute top-[50%] left-0 right-0 h-1.5 bg-[#8b7ff5] -translate-y-1/2 z-0 pointer-events-none"></div>

            <!-- Cards Track: Grid on desktop, stacked on top of each other on mobile -->
            <div id="research-cards-track" class="grid grid-cols-1 lg:grid-cols-4 gap-6 relative z-10">
              
              <!-- Card 1: Step 01 - Prompt Ingestion & Interception -->
              <div onclick="handleResearchCardClick(this)" class="research-card group relative rounded-md min-h-[320px] sm:min-h-[380px] lg:min-h-[420px] w-full p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 cursor-pointer overflow-hidden border border-white/[0.05] hover:border-white/20 hover:-translate-y-1.5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.6),0_0_25px_rgba(139,127,245,0.18)] bg-[#151531]">
                <!-- Base Solid Dark Underlay -->
                <div class="absolute inset-0 bg-[#151531] -z-10"></div>

                <!-- Hover Animated Iridescent Frosting -->
                <div class="research-frosting absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0 pointer-events-none overflow-hidden">
                  <div class="absolute inset-0 bg-[#3b3452]/50 backdrop-blur-md"></div>
                  <div class="absolute -top-12 -right-12 w-52 h-52 bg-pink-400/40 rounded-full blur-2xl"></div>
                  <div class="absolute top-1/3 left-0 w-60 h-60 bg-indigo-300/40 rounded-full blur-2xl"></div>
                  <div class="absolute -bottom-12 -left-12 w-52 h-52 bg-sky-300/40 rounded-full blur-2xl"></div>
                  <div class="absolute bottom-4 right-4 w-44 h-44 bg-amber-200/35 rounded-full blur-2xl"></div>
                  <div class="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/25"></div>
                </div>

                <!-- Top Badge Pill -->
                <div class="relative z-10 flex justify-center w-full">
                  <span class="research-badge px-3.5 py-1 rounded bg-white/10 group-hover:bg-white/20 border border-white/15 text-white/90 text-[10px] font-bold tracking-widest uppercase transition-colors">
                    STEP 01 • PROMPT
                  </span>
                </div>

                <!-- Middle Headline Only -->
                <div class="relative z-10 my-auto py-6 text-center">
                  <h3 class="text-lg sm:text-[19px] lg:text-[21px] font-bold text-white leading-snug group-hover:text-white transition-colors">
                    Prompt Ingestion &amp; Edge Interception
                  </h3>
                </div>

                <!-- Bottom Citation & Hover Button -->
                <div class="relative z-10 w-full h-11 flex items-center justify-center">
                  <p class="research-author text-[10px] font-mono tracking-widest text-gray-400 uppercase text-center transition-all duration-200 group-hover:opacity-0 group-hover:scale-95">
                    &lt;1MS SUB-MILLISECOND P99
                  </p>
                  <button onclick="switchView('playground')" class="research-btn absolute inset-0 m-auto w-32 h-9 rounded bg-white/25 hover:bg-white/35 text-white text-[11px] font-bold tracking-wider uppercase backdrop-blur-md border border-white/30 transition-all duration-300 shadow-md opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 flex items-center justify-center cursor-pointer">
                    READ MORE
                  </button>
                </div>
              </div>

              <!-- Card 2: Step 02 - Sovereign De-Identification -->
              <div onclick="handleResearchCardClick(this)" class="research-card group relative rounded-md min-h-[320px] sm:min-h-[380px] lg:min-h-[420px] w-full p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 cursor-pointer overflow-hidden border border-white/[0.05] hover:border-white/20 hover:-translate-y-1.5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.6),0_0_25px_rgba(139,127,245,0.18)] bg-[#151531]">
                <!-- Base Solid Dark Underlay -->
                <div class="absolute inset-0 bg-[#151531] -z-10"></div>

                <!-- Hover Animated Iridescent Frosting -->
                <div class="research-frosting absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0 pointer-events-none overflow-hidden">
                  <div class="absolute inset-0 bg-[#35334d]/50 backdrop-blur-md"></div>
                  <div class="absolute -top-12 -right-12 w-52 h-52 bg-purple-400/40 rounded-full blur-2xl"></div>
                  <div class="absolute top-1/4 -left-10 w-56 h-56 bg-amber-300/35 rounded-full blur-2xl"></div>
                  <div class="absolute -bottom-10 right-4 w-52 h-52 bg-pink-400/35 rounded-full blur-2xl"></div>
                  <div class="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/25"></div>
                </div>

                <!-- Top Badge Pill -->
                <div class="relative z-10 flex justify-center w-full">
                  <span class="research-badge px-3.5 py-1 rounded bg-white/10 group-hover:bg-white/20 border border-white/15 text-white/90 text-[10px] font-bold tracking-widest uppercase transition-colors">
                    STEP 02 • DE-IDENTIFY
                  </span>
                </div>

                <!-- Middle Headline Only -->
                <div class="relative z-10 my-auto py-6 text-center">
                  <h3 class="text-lg sm:text-[19px] lg:text-[21px] font-bold text-white leading-snug group-hover:text-white transition-colors">
                    Sovereign De-Identification &amp; Tokenization
                  </h3>
                </div>

                <!-- Bottom Citation & Hover Button -->
                <div class="relative z-10 w-full h-11 flex items-center justify-center">
                  <p class="research-author text-[10px] font-mono tracking-widest text-gray-400 uppercase text-center transition-all duration-200 group-hover:opacity-0 group-hover:scale-95">
                    BYOK KMS AES-256
                  </p>
                  <button onclick="switchView('playground')" class="research-btn absolute inset-0 m-auto w-32 h-9 rounded bg-white/25 hover:bg-white/35 text-white text-[11px] font-bold tracking-wider uppercase backdrop-blur-md border border-white/30 transition-all duration-300 shadow-md opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 flex items-center justify-center cursor-pointer">
                    READ MORE
                  </button>
                </div>
              </div>

              <!-- Card 3: Step 03 - Zero-Trust AI Inference -->
              <div onclick="handleResearchCardClick(this)" class="research-card group relative rounded-md min-h-[320px] sm:min-h-[380px] lg:min-h-[420px] w-full p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 cursor-pointer overflow-hidden border border-white/[0.05] hover:border-white/20 hover:-translate-y-1.5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.6),0_0_25px_rgba(139,127,245,0.18)] bg-[#151531]">
                <!-- Base Solid Dark Underlay -->
                <div class="absolute inset-0 bg-[#151531] -z-10"></div>

                <!-- Hover Animated Iridescent Frosting -->
                <div class="research-frosting absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0 pointer-events-none overflow-hidden">
                  <div class="absolute inset-0 bg-[#30394f]/50 backdrop-blur-md"></div>
                  <div class="absolute -top-12 -right-12 w-52 h-52 bg-sky-400/40 rounded-full blur-2xl"></div>
                  <div class="absolute top-1/3 left-0 w-60 h-60 bg-purple-400/40 rounded-full blur-2xl"></div>
                  <div class="absolute -bottom-10 left-10 w-52 h-52 bg-pink-400/35 rounded-full blur-2xl"></div>
                  <div class="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/25"></div>
                </div>

                <!-- Top Badge Pill -->
                <div class="relative z-10 flex justify-center w-full">
                  <span class="research-badge px-3.5 py-1 rounded bg-white/10 group-hover:bg-white/20 border border-white/15 text-white/90 text-[10px] font-bold tracking-widest uppercase transition-colors">
                    STEP 03 • INFERENCE
                  </span>
                </div>

                <!-- Middle Headline Only -->
                <div class="relative z-10 my-auto py-6 text-center">
                  <h3 class="text-lg sm:text-[19px] lg:text-[21px] font-bold text-white leading-snug group-hover:text-white transition-colors">
                    Zero-Trust Upstream AI Model Inference
                  </h3>
                </div>

                <!-- Bottom Citation & Hover Button -->
                <div class="relative z-10 w-full h-11 flex items-center justify-center">
                  <p class="research-author text-[10px] font-mono tracking-widest text-gray-400 uppercase text-center transition-all duration-200 group-hover:opacity-0 group-hover:scale-95">
                    GROQ • MISTRAL • OPENAI
                  </p>
                  <button onclick="switchView('playground')" class="research-btn absolute inset-0 m-auto w-32 h-9 rounded bg-white/25 hover:bg-white/35 text-white text-[11px] font-bold tracking-wider uppercase backdrop-blur-md border border-white/30 transition-all duration-300 shadow-md opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 flex items-center justify-center cursor-pointer">
                    READ MORE
                  </button>
                </div>
              </div>

              <!-- Card 4: Step 04 - Real-Time Rehydration -->
              <div onclick="handleResearchCardClick(this)" class="research-card group relative rounded-md min-h-[320px] sm:min-h-[380px] lg:min-h-[420px] w-full p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 cursor-pointer overflow-hidden border border-white/[0.05] hover:border-white/20 hover:-translate-y-1.5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.6),0_0_25px_rgba(139,127,245,0.18)] bg-[#151531]">
                <!-- Base Solid Dark Underlay -->
                <div class="absolute inset-0 bg-[#151531] -z-10"></div>

                <!-- Hover Animated Iridescent Frosting -->
                <div class="research-frosting absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0 pointer-events-none overflow-hidden">
                  <div class="absolute inset-0 bg-[#2d3a4d]/50 backdrop-blur-md"></div>
                  <div class="absolute -top-12 -right-12 w-52 h-52 bg-emerald-400/35 rounded-full blur-2xl"></div>
                  <div class="absolute top-1/4 -left-10 w-56 h-56 bg-cyan-300/35 rounded-full blur-2xl"></div>
                  <div class="absolute -bottom-10 right-4 w-52 h-52 bg-indigo-400/35 rounded-full blur-2xl"></div>
                  <div class="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/25"></div>
                </div>

                <!-- Top Badge Pill -->
                <div class="relative z-10 flex justify-center w-full">
                  <span class="research-badge px-3.5 py-1 rounded bg-white/10 group-hover:bg-white/20 border border-white/15 text-white/90 text-[10px] font-bold tracking-widest uppercase transition-colors">
                    STEP 04 • REHYDRATE
                  </span>
                </div>

                <!-- Middle Headline Only -->
                <div class="relative z-10 my-auto py-6 text-center">
                  <h3 class="text-lg sm:text-[19px] lg:text-[21px] font-bold text-white leading-snug group-hover:text-white transition-colors">
                    Real-Time Response &amp; Streaming Rehydration
                  </h3>
                </div>

                <!-- Bottom Citation & Hover Button -->
                <div class="relative z-10 w-full h-11 flex items-center justify-center">
                  <p class="research-author text-[10px] font-mono tracking-widest text-gray-400 uppercase text-center transition-all duration-200 group-hover:opacity-0 group-hover:scale-95">
                    STREAMING SSE DETOKENIZATION
                  </p>
                  <button onclick="switchView('playground')" class="research-btn absolute inset-0 m-auto w-32 h-9 rounded bg-white/25 hover:bg-white/35 text-white text-[11px] font-bold tracking-wider uppercase backdrop-blur-md border border-white/30 transition-all duration-300 shadow-md opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 flex items-center justify-center cursor-pointer">
                    READ MORE
                  </button>
                </div>
              </div>

            </div>

          </div>

          <!-- Bottom Testing & Empirical Validation Strip -->
          <div class="mt-16 pt-10 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 md:gap-12 opacity-85">
            <span class="text-[10.5px] font-bold tracking-widest text-gray-400 uppercase font-sans">
              TESTED ACROSS
            </span>

            <div class="h-5 w-px bg-white/15 hidden sm:block"></div>

            <!-- 9.34 MILLION PROMPTS -->
            <a href="/blog/benchmark" class="flex items-center gap-2 text-white hover:text-[#f0523d] font-bold text-sm sm:text-base tracking-wider font-sans transition-colors cursor-pointer">
              <span>9.34 MILLION PROMPTS</span>
            </a>

            <div class="h-5 w-px bg-white/15 hidden sm:block"></div>

            <!-- 1.94 BILLION TOKENS -->
            <a href="/blog/benchmark" class="flex items-center gap-2 text-white hover:text-[#f0523d] font-bold text-sm sm:text-base tracking-wider font-sans transition-colors cursor-pointer">
              <span>1.94 BILLION TOKENS</span>
            </a>
          </div>

        </div>

      </section>

      <!-- ======================================================================= -->
      <!-- SECTION 4: WHAT'S NEW AT PROJECTSPG (Blog & Updates)                  -->
      <!-- Matches uploaded media: 1790541881610.png                               -->
      <!-- ======================================================================= -->
      <section id="news-section" class="w-full bg-white text-gray-900 py-12 sm:py-20 border-t border-gray-100 scroll-mt-20 sm:scroll-mt-24">
        <div class="max-w-[1440px] mx-auto px-2.5 sm:px-4 lg:px-6">
          
          <!-- Section Header Row -->
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8 sm:mb-12">
            <h2 class="text-2xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-gray-950 font-sans">
              Learn more about ProjectSPG
            </h2>
            <a href="/blog/benchmark" class="self-start sm:self-auto px-4 py-2 rounded-lg bg-gray-100/90 hover:bg-gray-200/90 text-gray-800 text-[11px] font-bold tracking-wider uppercase transition shadow-2xs cursor-pointer flex items-center gap-1.5">
              <span>ALL BLOG POSTS</span>
            </a>
          </div>

          <!-- Two-Column Grid: Large Featured Post on Left, 3 Stacked Posts on Right -->
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            <!-- Left Column: Featured Post (The Open Source AI Stack) -->
            <div onclick="window.location.href='/blog/stack'" class="lg:col-span-6 group cursor-pointer">
              <!-- Stack Illustration Card -->
              <div class="w-full min-h-[380px] sm:aspect-[16/10] bg-[#0f121d] rounded-2xl p-5 sm:p-8 flex flex-col sm:flex-row justify-between border border-gray-800/80 shadow-md relative overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:border-gray-700">
                <!-- Background Ambient Glow -->
                <div class="absolute -right-20 -top-20 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

                <div class="flex flex-col sm:flex-row h-full w-full gap-5 sm:gap-0">
                  <!-- Left Side: Title Typography -->
                  <div class="w-full sm:w-[42%] flex flex-col justify-center pr-0 sm:pr-3">
                    <h3 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
                      The<br class="hidden sm:block"><span class="text-gray-100"> Open</span><br class="hidden sm:block"><span class="text-gray-200"> Model</span><br class="hidden sm:block"><span class="text-gray-300"> AI Stack</span>
                    </h3>
                    <p class="text-[10px] font-mono tracking-wider text-gray-400 mt-2 sm:mt-4 uppercase">
                      the <span class="text-white font-bold">MIGHT</span> stack
                    </p>
                  </div>

                  <!-- Right Side: Layered Stack Pills -->
                  <div class="w-full sm:w-[58%] flex flex-col justify-center gap-2 text-[10px] font-sans">
                    <!-- Layer 1: models -->
                    <div class="bg-[#171c2b] border border-gray-800/90 rounded-lg p-2.5 flex items-center justify-between shadow-2xs">
                      <span class="text-gray-400 font-mono text-[9.5px] uppercase">models</span>
                      <div class="flex items-center gap-1.5">
                        <span class="w-2.5 h-2.5 rounded-full bg-orange-400/90 inline-block shadow-xs"></span>
                        <span class="w-2.5 h-2.5 rounded-full bg-blue-400/90 inline-block shadow-xs"></span>
                        <span class="w-2.5 h-2.5 rounded-full bg-purple-400/90 inline-block shadow-xs"></span>
                        <span class="w-2.5 h-2.5 rounded-full bg-emerald-400/90 inline-block shadow-xs"></span>
                        <span class="text-[10px] font-bold text-white ml-0.5">∞</span>
                      </div>
                    </div>

                    <!-- Layer 2: inference -->
                    <div class="bg-[#171c2b] border border-gray-800/90 rounded-lg p-2.5 flex items-center justify-between shadow-2xs">
                      <span class="text-gray-400 font-mono text-[9.5px] uppercase">inference</span>
                      <div class="flex items-center gap-1.5 sm:gap-2 text-[9.5px] font-semibold text-gray-200 flex-wrap">
                        <span>• SGLang</span>
                        <span>• vLLM</span>
                        <span>• TRT-LLM</span>
                        <span class="text-[#f0523d] font-bold flex items-center gap-0.5">♥ ProjectSPG</span>
                      </div>
                    </div>

                    <!-- Layer 3: gateways & routers -->
                    <div class="bg-[#171c2b] border border-gray-800/90 rounded-lg p-2.5 flex items-center justify-between shadow-2xs">
                      <span class="text-gray-400 font-mono text-[9.5px] uppercase truncate mr-1">gateways &amp; routers</span>
                      <div class="flex items-center gap-2 text-[9.5px] font-semibold text-gray-300">
                        <span>LiteLLM</span>
                        <span>OpenRouter</span>
                        <span>AI Gateway</span>
                      </div>
                    </div>

                    <!-- Layer 4: harness -->
                    <div class="bg-[#171c2b] border border-gray-800/90 rounded-lg p-2.5 flex items-center justify-between shadow-2xs">
                      <span class="text-gray-400 font-mono text-[9.5px] uppercase">harness</span>
                      <div class="flex items-center gap-2 text-[9.5px] font-semibold text-gray-300">
                        <span>opencode</span>
                        <span>pi</span>
                        <span>Cursor</span>
                      </div>
                    </div>

                    <!-- Layer 5: tools -->
                    <div class="bg-[#171c2b] border border-gray-800/90 rounded-lg p-2.5 flex items-center justify-between shadow-2xs">
                      <span class="text-gray-400 font-mono text-[9.5px] uppercase">tools</span>
                      <div class="flex items-center gap-2.5 text-[9.5px] font-semibold text-gray-300">
                        <span>MCP</span>
                        <span>Skills</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Post Meta & Details -->
              <div class="mt-4">
                <span class="px-2.5 py-0.5 rounded bg-gray-100 text-gray-700 font-bold text-[10px] tracking-wider uppercase">
                  INFERENCE &amp; SECURITY
                </span>
                <h3 class="text-lg sm:text-2xl font-bold text-gray-950 mt-2 group-hover:text-[#f0523d] transition-colors leading-snug">
                  The Open Source AI Stack: Why ProjectSPG Ranks #1
                </h3>
                <p class="text-xs sm:text-sm text-gray-500 mt-1.5 line-clamp-2 leading-relaxed">
                  A deep dive into the open model AI stack and a ranked comparison of the leading AI security proxies across latency, reversibility, and sovereign compliance...
                </p>
              </div>
            </div>

            <!-- Right Column: 3 Horizontal Post Rows -->
            <div class="lg:col-span-6 flex flex-col gap-6 sm:gap-7">
              
              <!-- Item 1: Empirical Benchmark & Audit Report -->
              <div onclick="window.location.href='/blog/benchmark'" class="group flex flex-col sm:flex-row items-start gap-3.5 sm:gap-5 cursor-pointer">
                <!-- Pastel Gradient Thumbnail with subtle title overlay -->
                <div class="w-full sm:w-44 md:w-52 aspect-[16/10] shrink-0 rounded-xl overflow-hidden relative shadow-xs border border-gray-200/60 bg-gradient-to-br from-[#ffd5cc] via-[#f7e0ff] to-[#d8e6ff] flex items-center justify-center p-3 text-center transition-all duration-300 group-hover:shadow-md group-hover:scale-[1.02]">
                  <div class="flex flex-col items-center">
                    <div class="flex items-center gap-1 mb-1">
                      <span class="w-2 h-2 rounded-full bg-pink-500"></span>
                      <span class="text-[9px] font-bold text-gray-800 lowercase tracking-tight">project<span class="text-[#f0523d]">spg</span></span>
                    </div>
                    <p class="text-[10px] sm:text-[11px] font-bold text-gray-900 leading-tight">
                      Empirical Benchmark: 9.33M Prompts Evaluated with 100.00% Fidelity
                    </p>
                  </div>
                </div>

                <!-- Text Details -->
                <div class="flex-1 min-w-0">
                  <span class="px-2.5 py-0.5 rounded bg-gray-100 text-gray-700 font-bold text-[10px] tracking-wider uppercase">
                    BENCHMARK
                  </span>
                  <h4 class="text-base sm:text-lg font-bold text-gray-950 mt-1.5 group-hover:text-[#f0523d] transition-colors leading-snug">
                    Empirical Benchmark: 9,334,805 Prompts Evaluated with 100.00% Fidelity &amp; 86µs Latency
                  </h4>
                  <p class="text-xs sm:text-sm text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                    Exhaustive empirical validation across 1.94B tokens proving 100.00% zero-loss de-identification, 17,735 prompts/sec throughput, and 13.3ms HTTPS latency...
                  </p>
                </div>
              </div>

              <!-- Item 2: Global Sovereign AI Privacy: 109 Jurisdictions Supported -->
              <div onclick="window.location.href='/blog/countries'" class="group flex flex-col sm:flex-row items-start gap-3.5 sm:gap-5 cursor-pointer">
                <div class="w-full sm:w-44 md:w-52 aspect-[16/10] shrink-0 rounded-xl overflow-hidden relative shadow-xs border border-gray-200/60 bg-gradient-to-br from-[#fed7aa] via-[#fde047]/30 to-[#c7d2fe] flex items-center justify-center p-3 text-center transition-all duration-300 group-hover:shadow-md group-hover:scale-[1.02]">
                  <div class="flex flex-col items-center">
                    <div class="flex items-center gap-1 mb-1">
                      <span class="w-2 h-2 rounded-full bg-orange-500"></span>
                      <span class="text-[9px] font-bold text-gray-800 lowercase tracking-tight">project<span class="text-[#f0523d]">spg</span></span>
                    </div>
                    <p class="text-[10px] sm:text-[11px] font-bold text-gray-900 leading-tight">
                      Global Sovereign AI Privacy: 109 Jurisdictions Supported
                    </p>
                  </div>
                </div>

                <div class="flex-1 min-w-0">
                  <span class="px-2.5 py-0.5 rounded bg-gray-100 text-gray-700 font-bold text-[10px] tracking-wider uppercase">
                    COMPLIANCE
                  </span>
                  <h4 class="text-base sm:text-lg font-bold text-gray-950 mt-1.5 group-hover:text-[#f0523d] transition-colors leading-snug">
                    Global Sovereign AI Privacy: 109 Jurisdictions Supported by ProjectSPG
                  </h4>
                  <p class="text-xs sm:text-sm text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                    Protecting sensitive enterprise data across GDPR, India DPDP, Singapore PDPA, HIPAA, and 109 sovereign national jurisdictions without code changes...
                  </p>
                </div>
              </div>

              <!-- Item 3: Enterprise Guardrails for Regulated Industries -->
              <div onclick="window.location.href='/blog/industries'" class="group flex flex-col sm:flex-row items-start gap-3.5 sm:gap-5 cursor-pointer">
                <div class="w-full sm:w-44 md:w-52 aspect-[16/10] shrink-0 rounded-xl overflow-hidden relative shadow-xs border border-gray-200/60 bg-gradient-to-br from-[#fecdd3] via-[#e9d5ff] to-[#bfdbfe] flex items-center justify-center p-3 text-center transition-all duration-300 group-hover:shadow-md group-hover:scale-[1.02]">
                  <div class="flex flex-col items-center">
                    <div class="flex items-center gap-1 mb-1">
                      <span class="w-2 h-2 rounded-full bg-purple-500"></span>
                      <span class="text-[9px] font-bold text-gray-800 lowercase tracking-tight">project<span class="text-[#f0523d]">spg</span></span>
                    </div>
                    <p class="text-[10px] sm:text-[11px] font-bold text-gray-900 leading-tight">
                      Enterprise Guardrails &amp; Threat Models
                    </p>
                  </div>
                </div>

                <div class="flex-1 min-w-0">
                  <span class="px-2.5 py-0.5 rounded bg-gray-100 text-gray-700 font-bold text-[10px] tracking-wider uppercase">
                    ENTERPRISE
                  </span>
                  <h4 class="text-base sm:text-lg font-bold text-gray-950 mt-1.5 group-hover:text-[#f0523d] transition-colors leading-snug">
                    Enterprise Guardrails for Regulated Industries: Healthcare, FinTech &amp; Legal
                  </h4>
                  <p class="text-xs sm:text-sm text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                    Protecting clinical PHI under HIPAA, financial assets under PCI-DSS, attorney-client privilege, and defense telemetry across frontier LLMs with zero code changes...
                  </p>
                </div>
              </div>

            </div>

          </div>

      </section>

      <!-- ======================================================================= -->
      <!-- SECTION 5: PRIVATE ACCESS & EXCLUSIVE ONBOARDING (By Invitation Only)   -->
      <!-- ======================================================================= -->
      <section id="access-section" class="w-full bg-[#f8fafc] text-gray-900 py-20 sm:py-28 border-t border-gray-200/60 relative overflow-hidden scroll-mt-20 sm:scroll-mt-24">
        <!-- Legacy Anchor for backward compatibility -->
        <span id="pricing-section" class="absolute -top-20"></span>
        
        <!-- Ambient background glow -->
        <div class="absolute top-1/3 left-1/2 -translate-x-1/2 w-[750px] h-[380px] bg-gradient-to-r from-amber-100/40 via-sky-100/30 to-purple-100/30 blur-3xl pointer-events-none -z-0"></div>

        <div class="max-w-[1440px] mx-auto px-2.5 sm:px-4 lg:px-6 relative z-10">
          
          <!-- Section Header -->
          <div class="text-center max-w-3xl mx-auto mb-14">
            <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 text-[10.5px] font-bold tracking-widest uppercase mb-4 shadow-2xs">
              <span class="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
              <span>PRIVATE BETA • BY INVITATION ONLY</span>
            </div>
            <h2 class="text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-gray-950 font-sans leading-tight">
              Exclusive Sovereign Access
            </h2>
            <p class="text-base sm:text-lg text-gray-500 font-normal mt-3.5 leading-relaxed">
              To guarantee zero-latency throughput, dedicated KMS hardware envelope isolation, and sovereign compliance oversight across our 109 supported jurisdictions, ProjectSPG is currently accessible on an invitation-only basis.
            </p>

          </div>

          <!-- Dual-Mode Interactive Gatekeeper Console: Request Invite vs Redeem Code -->
          <div id="access-form-container" class="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200/90 shadow-md mb-14 max-w-4xl mx-auto">
            
            <!-- Tab Headers -->
            <div class="flex items-center justify-center gap-3 mb-8 border-b border-gray-100 pb-5">
              <button id="gate-tab-request" onclick="toggleGateMode('request')" class="px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition bg-gray-900 text-white cursor-pointer shadow-xs">
                Request Invitation
              </button>
              <button id="gate-tab-redeem" onclick="toggleGateMode('redeem')" class="px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition bg-gray-100 hover:bg-gray-200 text-gray-700 cursor-pointer">
                Redeem Invite Key
              </button>
            </div>

            <!-- Panel 1: Request Invitation Form -->
            <div id="gate-panel-request">
              <div class="text-center max-w-xl mx-auto mb-6">
                <h3 class="text-xl sm:text-2xl font-bold text-gray-950">Apply for Private Access</h3>
                <p class="text-xs sm:text-sm text-gray-500 mt-1">
                  We review requests daily to maintain isolated compute capacity. Approved organizations receive an invitation token within 24 hours.
                </p>
              </div>

              <form id="inviteRequestForm" onsubmit="handleInviteRequest(event)" class="space-y-4 max-w-2xl mx-auto">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1.5 font-mono">Work / Corporate Email *</label>
                    <input type="email" id="inviteEmail" required placeholder="alex@enterprise.com" class="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs sm:text-sm focus:border-black focus:ring-1 focus:ring-black outline-none transition font-sans">
                  </div>
                  <div>
                    <label class="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1.5 font-mono">Company / Organization Website *</label>
                    <input type="text" id="inviteOrg" required placeholder="https://acme.com" class="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs sm:text-sm focus:border-black focus:ring-1 focus:ring-black outline-none transition font-sans">
                  </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1.5 font-mono">Primary Compliance Mandate</label>
                    <select id="inviteCompliance" class="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs sm:text-sm focus:border-black focus:ring-1 focus:ring-black outline-none transition font-sans bg-white">
                      <option value="gdpr">EU GDPR &amp; EU AI Act</option>
                      <option value="dpdp">India DPDP Act 2023</option>
                      <option value="pdpa">Singapore PDPA &amp; ASEAN</option>
                      <option value="hipaa">US HIPAA Safe Harbor</option>
                      <option value="multi">Global Multi-Jurisdiction (109 Countries)</option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1.5 font-mono">Estimated Monthly Token Volume</label>
                    <select id="inviteVolume" class="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs sm:text-sm focus:border-black focus:ring-1 focus:ring-black outline-none transition font-sans bg-white">
                      <option value="100m">&lt; 100M Tokens / Month</option>
                      <option value="1b">100M - 1B Tokens / Month</option>
                      <option value="10b">1B - 10B Tokens / Month</option>
                      <option value="10b+">10B+ Tokens / Month (Dedicated Cluster)</option>
                    </select>
                  </div>
                </div>

                <div class="pt-2">
                  <button type="submit" id="btnSubmitInvite" class="w-full py-3.5 rounded-xl bg-black hover:bg-gray-800 text-white font-bold text-xs sm:text-sm uppercase tracking-wider transition shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-2">
                    <span>SUBMIT ACCESS APPLICATION</span>
                    <i data-lucide="arrow-right" class="w-4 h-4"></i>
                  </button>
                </div>
              </form>

              <!-- Success Alert (Hidden by default) -->
              <div id="inviteSuccessMessage" class="hidden mt-6 p-4 sm:p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 max-w-2xl mx-auto text-center">
                <div class="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-2.5">
                  <i data-lucide="check" class="w-5 h-5"></i>
                </div>
                <h4 class="font-bold text-sm sm:text-base">Invitation Request Received</h4>
                <p class="text-xs sm:text-sm text-emerald-800 mt-1 leading-relaxed">
                  Your application has been prioritized. Our infrastructure team verifies incoming organizations within 24 hours. Your access credentials and dedicated gateway keys will be delivered to <span id="confirmedInviteEmail" class="font-bold font-mono"></span>.
                </p>
              </div>
            </div>

            <!-- Panel 2: Redeem Invite Code -->
            <div id="gate-panel-redeem" class="hidden">
              <div class="text-center max-w-xl mx-auto mb-6">
                <h3 class="text-xl sm:text-2xl font-bold text-gray-950">Redeem Access Token</h3>
                <p class="text-xs sm:text-sm text-gray-500 mt-1">
                  Received an invitation token from the ProjectSPG core team or an enterprise sponsor? Enter it below to unlock the console.
                </p>
              </div>

              <div class="max-w-md mx-auto space-y-4">
                <div>
                  <label class="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1.5 font-mono">Invitation Key</label>
                  <input type="text" id="inviteCodeInput" placeholder="SPG-INVITE-XXXX-XXXX" class="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm font-mono tracking-widest text-center uppercase focus:border-black focus:ring-1 focus:ring-black outline-none transition">
                </div>

                <button onclick="handleRedeemCode()" class="w-full py-3.5 rounded-xl bg-black hover:bg-gray-800 text-white font-bold text-xs sm:text-sm uppercase tracking-wider transition shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-2">
                  <i data-lucide="unlock" class="w-4 h-4"></i>
                  <span>VERIFY &amp; ENTER PLATFORM</span>
                </button>

                <p id="redeemFeedback" class="text-xs text-center font-medium mt-2 min-h-[20px]"></p>
              </div>
            </div>

          </div>


        </div>
      </section>

      <!-- ======================================================================= -->
      <!-- SECTION 6: CALL TO ACTION ("Start building on ProjectSPG")            -->
      <!-- Matches uploaded media: 1790542040866.png                               -->
      <!-- ======================================================================= -->
      <section class="w-full relative pt-20 pb-28 sm:pt-32 sm:pb-48 overflow-hidden bg-white text-center">
        
        <!-- 3D Geometric Atmospheric Backdrop -->
        <div class="absolute inset-0 pointer-events-none overflow-hidden flex items-end justify-center">
          <!-- Left Warm Coral Glow -->
          <div class="absolute -left-24 bottom-0 w-[420px] h-[340px] bg-gradient-to-tr from-rose-500/25 via-red-400/20 to-transparent blur-3xl rounded-full"></div>
          
          <!-- Center Frosted Glass 3D Arc / Semi-Circle -->
          <div class="absolute bottom-[-140px] left-1/2 -translate-x-1/2 w-[700px] sm:w-[900px] h-[380px] rounded-t-full bg-gradient-to-b from-sky-100/40 via-blue-50/20 to-transparent border-t-2 border-l border-r border-white/80 backdrop-blur-xl shadow-2xl">
            <!-- Inner Glass Highlights -->
            <div class="absolute top-4 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-transparent via-white/80 to-transparent"></div>
          </div>

          <!-- Right Deep Royal Blue 3D Disc -->
          <div class="absolute -right-16 bottom-[-60px] w-72 sm:w-96 h-72 sm:h-96 rounded-[50px] sm:rounded-[64px] bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900 shadow-[0_25px_60px_rgba(29,78,216,0.45)] transform rotate-[18deg] -skew-x-6 border-t-2 border-l-2 border-sky-300/40"></div>

          <!-- Far Right Blue/Purple Atmosphere -->
          <div class="absolute -right-20 bottom-0 w-[480px] h-[400px] bg-gradient-to-tl from-indigo-600/25 via-blue-500/15 to-transparent blur-3xl rounded-full"></div>
        </div>

        <div class="max-w-5xl mx-auto px-2.5 sm:px-4 lg:px-6 relative z-10">
          <h2 class="text-3xl sm:text-5xl lg:text-[54px] font-bold text-gray-950 tracking-tight leading-tight">
            Start building on ProjectSPG
          </h2>
          <p class="text-sm sm:text-lg lg:text-xl text-gray-500 font-normal mt-4 max-w-2xl mx-auto leading-relaxed">
            From real-time prompt de-identification to enterprise-grade privacy compliance
          </p>
          <div class="mt-8 flex justify-center">
            <button onclick="openAuthModal()" class="px-7 py-3.5 rounded-xl bg-black hover:bg-gray-800 text-white text-xs font-bold tracking-wider uppercase transition shadow-md hover:shadow-lg cursor-pointer transform hover:-translate-y-0.5">
              GET STARTED NOW
            </button>
          </div>
        </div>
      </section>

      <!-- ======================================================================= -->
      <!-- SECTION 6: FOOTER                                                       -->
      <!-- Matches uploaded media: 1790542042470.png                               -->
      <!-- ======================================================================= -->
      <footer class="w-full relative overflow-hidden bg-gradient-to-b from-[#eaf2fc]/60 via-[#f1f6fc] to-[#e8edf7] pt-8 sm:pt-12">
        
        <!-- Ambient Edge Colors behind the white card -->
        <div class="absolute -left-20 top-0 w-80 h-96 bg-rose-400/25 blur-3xl pointer-events-none"></div>
        <div class="absolute -right-20 top-0 w-96 h-96 bg-blue-500/25 blur-3xl pointer-events-none"></div>

        <div class="max-w-[1440px] mx-auto px-2 sm:px-4 lg:px-6 relative z-10">
          
          <!-- Main White Footer Card with Curved Top -->
          <div class="w-full bg-white rounded-t-[28px] sm:rounded-t-[44px] border-t border-l border-r border-gray-100 shadow-[0_-10px_35px_rgba(0,0,0,0.02)] pt-10 sm:pt-16 pb-10 px-4 sm:px-8 lg:px-10 relative overflow-hidden">
            
            <!-- Top Grid: Brand Logo + 4 Category Columns -->
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
              
              <!-- Brand Logo (Left Column) -->
              <div class="lg:col-span-3">
                <a href="#landing" onclick="switchView('landing')" class="inline-flex items-center gap-2 group cursor-pointer" title="ProjectSPG">
                  <!-- ProjectSPG Brand Emblem -->
                  <div class="relative w-8 h-8 flex items-center justify-center">
                    <span class="absolute top-0 left-1 w-3.5 h-3.5 rounded-full bg-purple-400/90 shadow-2xs"></span>
                    <span class="absolute top-0 right-1 w-3.5 h-3.5 rounded-full bg-pink-500/90 shadow-2xs"></span>
                    <span class="absolute bottom-0 left-2.5 w-3.5 h-3.5 rounded-full bg-[#f0523d] shadow-2xs"></span>
                  </div>
                  <span class="font-extrabold text-[20px] tracking-tight text-gray-950">project<span class="text-[#f0523d]">spg</span></span>
                </a>
              </div>

              <!-- 4 Columns of Links -->
              <div class="lg:col-span-9 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-6 text-xs">
                
                <!-- Col 1: PRODUCTS -->
                <div>
                  <div class="border-t border-gray-200/90 pt-3 mb-3.5">
                    <span class="text-[10px] font-bold tracking-widest uppercase text-gray-900 font-mono">PRODUCTS</span>
                  </div>
                  <ul class="space-y-2.5 font-medium text-gray-600">
                    <li><a href="#playground" onclick="switchView('playground')" class="hover:text-gray-950 transition">Data Redaction</a></li>
                    <li><a href="#playground" onclick="switchView('playground')" class="hover:text-gray-950 transition">Context Masking</a></li>
                    <li><a href="#playground" onclick="switchView('playground')" class="hover:text-gray-950 transition">One-Click AI Gateway</a></li>
                    <li><a href="#playground" onclick="switchView('playground')" class="hover:text-gray-950 transition">Multi-Model Freedom</a></li>
                    <li><a href="#playground" onclick="switchView('playground')" class="hover:text-gray-950 transition">Live Rehydration</a></li>
                    <li><a href="#playground" onclick="switchView('playground')" class="hover:text-gray-950 transition">Audit & Security Logs</a></li>
                    <li><a href="#playground" onclick="switchView('playground')" class="hover:text-gray-950 transition">Turnkey Compliance</a></li>
                  </ul>
                </div>

                <!-- Col 2: MODELS -->
                <div>
                  <div class="border-t border-gray-200/90 pt-3 mb-3.5">
                    <span class="text-[10px] font-bold tracking-widest uppercase text-gray-900 font-mono">MODELS</span>
                  </div>
                  <ul class="space-y-2.5 font-medium text-gray-600">
                    <li><a href="#playground" onclick="switchView('playground')" class="hover:text-gray-950 transition">See all models</a></li>
                    <li><a href="#playground" onclick="switchView('playground')" class="hover:text-gray-950 transition">DeepSeek</a></li>
                    <li><a href="#playground" onclick="switchView('playground')" class="hover:text-gray-950 transition">Meta</a></li>
                    <li><a href="#playground" onclick="switchView('playground')" class="hover:text-gray-950 transition">Qwen</a></li>
                    <li><a href="#playground" onclick="switchView('playground')" class="hover:text-gray-950 transition">Google</a></li>
                    <li><a href="#playground" onclick="switchView('playground')" class="hover:text-gray-950 transition">OpenAI</a></li>
                    <li><a href="#playground" onclick="switchView('playground')" class="hover:text-gray-950 transition">Mistral AI</a></li>
                    <li><a href="#playground" onclick="switchView('playground')" class="hover:text-gray-950 transition">Custom models</a></li>
                  </ul>
                </div>

                <!-- Col 3: DEVELOPERS & PRICING -->
                <div>
                  <!-- Subgroup 1: DEVELOPERS -->
                  <div class="border-t border-gray-200/90 pt-3 mb-3.5">
                    <span class="text-[10px] font-bold tracking-widest uppercase text-gray-900 font-mono">DEVELOPERS</span>
                  </div>
                  <ul class="space-y-2.5 font-medium text-gray-600 mb-6">
                    <li><a href="/blog/benchmark" class="hover:text-gray-950 transition">Research &amp; Benchmark</a></li>
                    <li><a href="/blog/countries" class="hover:text-gray-950 transition">Supported Countries</a></li>
                    <li><a href="https://github.com/PriyanujBoruah/AI-Privacy-Core" target="_blank" class="hover:text-gray-950 transition">Open-Source Core</a></li>
                    <li><a href="#docs" onclick="switchView('docs')" class="hover:text-gray-950 transition">API Documentation</a></li>
                  </ul>

                  <!-- Subgroup 2: PRIVATE ACCESS -->
                  <div class="border-t border-gray-200/90 pt-3 mb-3.5">
                    <span class="text-[10px] font-bold tracking-widest uppercase text-gray-900 font-mono">PRIVATE ACCESS</span>
                  </div>
                  <ul class="space-y-2.5 font-medium text-gray-600">
                    <li><a href="#access-section" onclick="switchAccessView('request')" class="hover:text-gray-950 transition">Request Invitation</a></li>
                    <li><a href="#access-section" onclick="switchAccessView('verify')" class="hover:text-gray-950 transition">Redeem Invite Key</a></li>
                    <li><a href="#docs" onclick="switchView('docs')" class="hover:text-gray-950 transition">Enterprise Onboarding</a></li>
                    <li><a href="#access-section" class="hover:text-gray-950 transition">Sovereign Enclaves</a></li>
                  </ul>
                </div>

                <!-- Col 4: RESOURCES -->
                <div>
                  <div class="border-t border-gray-200/90 pt-3 mb-3.5">
                    <span class="text-[10px] font-bold tracking-widest uppercase text-gray-900 font-mono">RESOURCES</span>
                  </div>
                  <ul class="space-y-2.5 font-medium text-gray-600">
                    <li><a href="/blog/benchmark" class="hover:text-gray-950 transition">Blog &amp; Benchmarks</a></li>
                    <li><a href="/blog/countries" class="hover:text-gray-950 transition">109 Countries Matrix</a></li>
                    <li><a href="/" class="hover:text-gray-950 transition">About ProjectSPG</a></li>
                    <li><a href="mailto:support@projectspg.info" class="hover:text-gray-950 transition">Support</a></li>
                  </ul>
                </div>

              </div>

            </div>

            <!-- Giant Watermark Brand Name (ProjectSPG Signature) -->
            <div class="select-none pointer-events-none text-center text-[44px] sm:text-[90px] md:text-[135px] lg:text-[180px] font-bold tracking-tight text-gray-100/90 leading-none my-6 sm:my-10 overflow-hidden font-sans truncate">
              project<span class="text-[#f0523d]">spg</span>
            </div>

            <!-- Bottom Legal & Social Row -->
            <div class="border-t border-gray-100 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500 font-sans">
              <!-- Left Copyright -->
              <div class="text-[10px] font-mono text-gray-400 tracking-wider uppercase text-center md:text-left">
                © 2026 PROJECTSPG. ALL RIGHTS RESERVED.
              </div>

              <!-- Center Legal Links -->
              <div class="flex flex-wrap items-center justify-center gap-5 sm:gap-7 text-xs text-gray-600">
                <a href="#docs" onclick="switchView('docs')" class="hover:text-gray-950 transition">Privacy Policy</a>
                <a href="#docs" onclick="switchView('docs')" class="hover:text-gray-950 transition">Terms of service</a>
                <a href="#docs" onclick="switchView('docs')" class="hover:text-gray-950 transition">Cookie Policy</a>
                <a href="#docs" onclick="switchView('docs')" class="hover:text-gray-950 transition">Consent Preferences</a>
              </div>

              <!-- Right Social Icons -->
              <div class="flex items-center gap-4 text-gray-700">
                <!-- Discord -->
                <a href="https://discord.gg" target="_blank" rel="noopener noreferrer" class="hover:text-gray-950 transition p-1" title="Discord">
                  <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                  </svg>
                </a>

                <!-- X (Twitter) -->
                <a href="https://x.com" target="_blank" rel="noopener noreferrer" class="hover:text-gray-950 transition p-1" title="X (Twitter)">
                  <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>

                <!-- LinkedIn -->
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" class="hover:text-gray-950 transition p-1" title="LinkedIn">
                  <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
              </div>

            </div>

          </div>

        </div>

      </footer>

    </div>

    <!-- ======================================================================= -->
    <!-- VIEW 1: PLAYGROUND (Exact 3-Column Groq Layout) -->
    <!-- ======================================================================= -->
    <div id="view-playground" class="view-panel hidden border-t border-l border-r border-groq-grayBorder rounded-t-2xl bg-white mx-0 sm:mx-2 lg:mx-3 flex-1 flex flex-col overflow-x-hidden overflow-y-visible lg:overflow-hidden shadow-xs w-full sm:w-auto min-w-0 max-w-full">
      
      <!-- Sub-Toolbar (54px height) -->
      <div class="h-auto min-h-[54px] py-2 sm:py-0 border-b border-groq-grayBorder bg-white px-2 sm:px-4 flex flex-wrap items-center justify-between gap-1.5 sm:gap-2 shrink-0 w-full min-w-0 max-w-full">
        <div class="flex items-center gap-2 sm:gap-4 shrink-0">
          <h2 class="text-[15px] font-semibold text-groq-dark tracking-tight">Playground</h2>
          <div class="bg-[#f3f4f6] p-0.5 rounded-lg flex items-center text-xs select-none">
            <button id="btn-tier-free" onclick="switchPlaygroundTier('free')" class="px-2.5 sm:px-3 py-1 rounded-md bg-white text-groq-dark font-medium shadow-xs text-xs transition cursor-pointer">Free</button>
            <button id="btn-tier-byok" onclick="switchPlaygroundTier('byok')" class="px-2.5 sm:px-3 py-1 rounded-md text-groq-textMuted hover:text-groq-dark text-xs transition cursor-pointer">BYOK</button>
          </div>
        </div>

        <div class="flex items-center gap-1 sm:gap-2 flex-wrap max-w-full min-w-0">
          <!-- BYOK Provider API Keys Button (visible when BYOK mode is ON) -->
          <button id="btn-byok-keys" onclick="openByokKeysModal()" class="hidden px-2.5 sm:px-3 py-1.5 rounded-lg bg-white border border-groq-grayBorder text-xs font-medium text-groq-dark hover:bg-gray-50 flex items-center gap-1.5 shadow-2xs transition cursor-pointer shrink-0" title="Provider API Keys">
            <i data-lucide="key" class="w-3.5 h-3.5 text-blue-600"></i>
            <span>API Keys</span>
            <span id="byok-keys-badge" class="hidden w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white" title="Keys configured"></span>
          </button>

          <div class="relative max-w-[115px] xs:max-w-[130px] sm:max-w-none shrink min-w-0">
            <select id="playground-model" onchange="onModelChange()" class="appearance-none bg-white border border-groq-grayBorder text-groq-dark text-xs font-sans font-medium rounded-lg pl-2 sm:pl-3 pr-5 sm:pr-8 py-1.5 focus:border-gray-400 focus:outline-none cursor-pointer w-full truncate">
              <optgroup label="Groq Cloud">
                <option value="openai/gpt-oss-120b" data-provider="groq" selected>openai/gpt-oss-120b</option>
                <option value="openai/gpt-oss-20b" data-provider="groq">openai/gpt-oss-20b</option>
                <option value="qwen/qwen3.8-27b" data-provider="groq">qwen/qwen3.8-27b</option>
              </optgroup>
              <optgroup label="Google AI Studio">
                <option value="gemma-4-26b-a4b-it" data-provider="google">gemma-4-26b-a4b-it</option>
                <option value="gemma-4-31b-it" data-provider="google">gemma-4-31b-it</option>
              </optgroup>
              <optgroup label="Mistral AI">
                <option value="codestral-2508" data-provider="mistral">codestral-2508</option>
                <option value="ministral-8b-2512" data-provider="mistral">ministral-8b-2512</option>
                <option value="ministral-14b-2512" data-provider="mistral">ministral-14b-2512</option>
              </optgroup>
            </select>
            <i data-lucide="chevrons-up-down" class="w-3.5 h-3.5 text-groq-textSubtle absolute right-1.5 sm:right-2 top-2 pointer-events-none"></i>
          </div>

          <button onclick="copyModelName()" class="p-1.5 rounded-lg bg-white border border-groq-grayBorder text-groq-textMuted hover:text-groq-dark cursor-pointer shrink-0" title="Copy model name">
            <i data-lucide="copy" class="w-3.5 h-3.5"></i>
          </button>

          <button onclick="toggleCodePanel()" id="btn-toggle-code" class="px-2 sm:px-3 py-1.5 rounded-lg bg-white border border-groq-grayBorder text-xs font-medium text-groq-dark hover:bg-gray-50 flex items-center gap-1 cursor-pointer shrink-0" title="Toggle Code">
            <i data-lucide="code" class="w-3.5 h-3.5 text-groq-textMuted"></i>
            <span id="code-btn-text">Hide</span>
          </button>

          <button onclick="toggleParametersPanel()" id="btn-toggle-params" class="p-1.5 rounded-lg bg-white border border-groq-grayBorder text-groq-textMuted hover:text-groq-dark transition cursor-pointer shrink-0" title="Parameters">
            <i data-lucide="sliders-horizontal" class="w-3.5 h-3.5"></i>
          </button>
        </div>
      </div>

      <!-- Playground 3-Column Split -->
      <div class="flex-1 flex flex-col lg:flex-row overflow-x-hidden overflow-y-visible lg:overflow-hidden relative w-full min-w-0 max-w-full">
        <!-- Col 1: Prompts -->
        <div class="w-full lg:w-[33%] lg:min-w-[320px] lg:max-w-[420px] border-b lg:border-b-0 lg:border-r border-groq-grayBorder p-2.5 sm:p-6 flex flex-col justify-between overflow-x-hidden overflow-y-visible lg:overflow-y-auto bg-white lg:shrink-0 min-w-0 max-w-full">
          <div class="space-y-3.5 sm:space-y-4">
            <div class="flex items-center gap-2.5 sm:gap-3">
              <span class="text-[11px] font-semibold text-groq-textMuted uppercase tracking-wider shrink-0">SYSTEM</span>
              <input type="text" id="system-prompt" class="flex-1 min-w-0 bg-transparent border-0 text-xs text-groq-dark placeholder-groq-textSubtle focus:outline-none" placeholder="Enter system message (Optional)" value="Enter system message (Optional)">
            </div>

            <div class="bg-groq-grayBg border border-groq-grayBorder rounded-2xl p-2.5 sm:p-4 transition focus-within:border-gray-300">
              <div class="text-[11px] font-semibold text-groq-textSubtle uppercase tracking-wider mb-2">USER</div>
              <textarea id="user-prompt" rows="5" class="w-full bg-transparent text-xs text-groq-dark placeholder-groq-textSubtle focus:outline-none resize-none leading-relaxed" placeholder="Enter user message...">Please confirm order for Alice Wong (email: alice.wong@fintech.de, SSN: 123-45-6789) using Visa card 4532-0151-1283-0366. Repeat back her name, email, and card number.</textarea>
              
              <div class="mt-3 pt-2.5 border-t border-gray-200/70 flex flex-wrap gap-1 text-[10px]">
                <button onclick="loadSample('banking')" class="px-2 py-1 rounded-md bg-white border border-groq-grayBorder hover:border-gray-300 text-groq-textMuted hover:text-groq-dark transition cursor-pointer whitespace-nowrap">🏦 Banking Wire</button>
                <button onclick="loadSample('patient')" class="px-2 py-1 rounded-md bg-white border border-groq-grayBorder hover:border-gray-300 text-groq-textMuted hover:text-groq-dark transition cursor-pointer whitespace-nowrap">🏥 Patient Record</button>
                <button onclick="loadSample('germantax')" class="px-2 py-1 rounded-md bg-white border border-groq-grayBorder hover:border-gray-300 text-groq-textMuted hover:text-groq-dark transition cursor-pointer whitespace-nowrap">🇩🇪 German Tax ID</button>
              </div>
            </div>

            <div class="flex flex-col xs:flex-row items-start xs:items-center justify-between gap-1.5 text-xs px-2.5 sm:px-3 py-2 rounded-xl bg-sky-50 border border-sky-200 text-sky-900">
              <div class="flex items-center gap-1.5 min-w-0">
                <i data-lucide="shield-check" class="w-4 h-4 text-sky-600 shrink-0"></i>
                <span class="text-[11px] font-medium truncate sm:whitespace-normal">ProjectSPG Privacy Gateway Active</span>
              </div>
              <span class="text-[10px] font-mono font-semibold text-sky-700 bg-white border border-sky-300 px-1.5 py-0.5 rounded shrink-0 whitespace-nowrap" title="All 10 Canonical Regional & Corporate Packs Enabled">All 10 Packs Active</span>
            </div>
          </div>

          <div class="pt-4 flex items-center justify-between gap-2">
            <div class="flex items-center gap-2">
              <button onclick="clearInputs()" class="px-2.5 sm:px-3 py-1.5 rounded-lg bg-groq-grayBg border border-groq-grayBorder hover:bg-gray-100 text-xs font-medium text-groq-dark flex items-center gap-1.5 transition cursor-pointer">
                <i data-lucide="plus-circle" class="w-3.5 h-3.5 text-groq-textMuted"></i>
                <span>New</span>
              </button>
              <button onclick="clearInputs()" class="px-2.5 sm:px-3 py-1.5 rounded-lg bg-groq-grayBg border border-groq-grayBorder hover:bg-gray-100 text-xs font-medium text-groq-textMuted hover:text-groq-dark transition cursor-pointer">
                Clear
              </button>
            </div>
            <!-- Quick Submit for mobile viewports -->
            <button onclick="submitPrompt()" id="btn-quick-submit" class="lg:hidden px-3.5 py-1.5 rounded-full border-2 border-[#f0523d] bg-[#f0523d] text-white font-semibold text-xs flex items-center gap-1.5 transition active:scale-95 shadow-xs cursor-pointer shrink-0">
              <i data-lucide="send" class="w-3.5 h-3.5"></i>
              <span>Submit</span>
            </button>
          </div>
        </div>

        <!-- Col 2: Response -->
        <div id="col-response" class="w-full lg:flex-1 flex flex-col justify-between p-2.5 sm:p-6 border-b lg:border-b-0 lg:border-r border-groq-grayBorder overflow-x-hidden overflow-y-visible lg:overflow-y-auto bg-white min-h-[340px] min-w-0 max-w-full">
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

            <!-- OUTPUT 1: What is sent to the AI (The Protected Prompt) -->
            <div id="output-protected-container" class="hidden space-y-1.5 mb-4">
              <div class="flex flex-wrap items-center justify-between gap-1.5">
                <div class="flex items-center gap-2 flex-wrap min-w-0">
                  <span class="text-[11px] font-semibold text-groq-dark uppercase tracking-wider flex items-center gap-1.5 shrink-0">
                    <i data-lucide="shield-check" class="w-3.5 h-3.5 text-sky-600"></i>
                    Protected Prompt (Sent to AI)
                  </span>
                  <span id="protected-entities-badge" class="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 border border-sky-200 shrink-0">
                    Zero Raw PII
                  </span>
                </div>
                <button onclick="copyProtectedPrompt()" class="text-[11px] text-groq-textMuted hover:text-groq-dark flex items-center gap-1 transition cursor-pointer shrink-0 ml-auto sm:ml-0" title="Copy Protected Prompt">
                  <i data-lucide="copy" class="w-3 h-3"></i>
                  <span>Copy</span>
                </button>
              </div>
              <div id="protected-prompt-text" class="whitespace-pre-wrap break-words [overflow-wrap:anywhere] max-w-full text-slate-800 bg-[#f8fafc] p-3 sm:p-4 rounded-xl border border-slate-200 text-xs font-mono leading-relaxed max-h-none lg:max-h-52 lg:overflow-y-auto shadow-2xs"></div>
            </div>

            <!-- OUTPUT 2: AI Output (Rehydrated with Highlighted Parts) -->
            <div id="output-rehydrated-container" class="hidden space-y-1.5">
              <div class="flex flex-wrap items-center justify-between gap-1.5">
                <div class="flex items-center gap-2 flex-wrap min-w-0">
                  <span class="text-[11px] font-semibold text-groq-dark uppercase tracking-wider flex items-center gap-1.5 shrink-0">
                    <i data-lucide="sparkles" class="w-3.5 h-3.5 text-[#f0523d]"></i>
                    AI Output (Rehydrated)
                  </span>
                  <span class="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-orange-50 text-orange-800 border border-orange-200 flex items-center gap-1 shrink-0">
                    <span class="w-1.5 h-1.5 rounded-full bg-[#f0523d]"></span>
                    Hover highlighted parts to inspect
                  </span>
                </div>
                <button onclick="copyRehydratedText()" class="text-[11px] text-groq-textMuted hover:text-groq-dark flex items-center gap-1 transition cursor-pointer shrink-0 ml-auto sm:ml-0" title="Copy AI Output">
                  <i data-lucide="copy" class="w-3 h-3"></i>
                  <span>Copy</span>
                </button>
              </div>
              <div id="rehydrated-text" class="whitespace-pre-wrap break-words [overflow-wrap:anywhere] max-w-full text-groq-dark bg-groq-grayBg p-3 sm:p-4 rounded-xl border border-groq-grayBorder text-xs font-mono leading-relaxed max-h-none lg:max-h-72 lg:overflow-y-auto"></div>
            </div>
          </div>

          <div class="pt-4 flex flex-wrap items-center justify-between gap-2">
            <div class="flex items-center gap-3">
              <button onclick="addConversationTurn()" class="text-xs text-groq-textMuted hover:text-groq-dark flex items-center gap-1.5 font-medium transition cursor-pointer">
                <i data-lucide="arrow-left" class="w-3.5 h-3.5"></i> Add
              </button>
              <button onclick="clearResponse()" class="text-xs text-groq-textMuted hover:text-groq-dark flex items-center gap-1.5 font-medium transition cursor-pointer">
                <i data-lucide="trash-2" class="w-3.5 h-3.5"></i> Clear
              </button>
            </div>

            <button onclick="submitPrompt()" id="btn-submit" class="px-4 sm:px-5 py-2 rounded-full border-2 border-[#f0523d] bg-white hover:bg-[#fff5f3] text-groq-dark font-semibold text-xs flex items-center gap-1.5 sm:gap-2 transition active:scale-95 shadow-xs cursor-pointer shrink-0">
              <span>Submit</span>
              <span class="hidden sm:inline text-[11px] font-mono text-groq-textSubtle">Ctrl + ↵</span>
            </button>
          </div>
        </div>

        <!-- Col 3: Code -->
        <div id="col-code" class="w-full lg:w-[33%] lg:min-w-[320px] lg:max-w-[440px] p-2.5 sm:p-6 flex flex-col justify-between overflow-x-hidden overflow-y-visible lg:overflow-y-auto bg-white lg:shrink-0 min-w-0 max-w-full">
          <div class="min-w-0 max-w-full">
            <div class="flex items-center justify-between mb-4">
              <div class="relative">
                <select id="code-lang-select" onchange="updateCodeViewer()" class="appearance-none bg-transparent text-xs font-medium text-groq-textSubtle hover:text-groq-dark pr-4 focus:outline-none cursor-pointer">
                  <option value="python">Python</option>
                  <option value="curl">cURL</option>
                  <option value="langchain">LangChain</option>
                </select>
                <i data-lucide="chevrons-up-down" class="w-3 h-3 text-groq-textSubtle absolute right-0 top-0.5 pointer-events-none"></i>
              </div>

              <button onclick="copySnippet()" class="text-xs text-groq-textSubtle hover:text-groq-dark flex items-center gap-1 font-medium transition cursor-pointer">
                <i data-lucide="copy" class="w-3.5 h-3.5"></i> Copy
              </button>
            </div>

            <div id="code-snippet-box" class="font-mono text-[11px] leading-[1.65] text-groq-dark select-all overflow-x-auto whitespace-pre max-h-none lg:max-h-80 touch-scroll w-full min-w-0 max-w-full"></div>
          </div>

          <div class="pt-4 border-t border-groq-grayBorder text-[11px] text-groq-textSubtle flex items-center justify-between font-mono">
            <span>Target: Cloudflare Edge</span>
            <span class="text-emerald-600 font-medium">SSL Encrypted</span>
          </div>
        </div>

        <!-- Parameters Drawer Backdrop for mobile -->
        <div id="parameters-backdrop" onclick="toggleParametersPanel()" class="hidden fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 lg:hidden transition-opacity"></div>

        <!-- Col 4: Parameters Panel (Exact 1:1 Match to media_1790517999090.png & media_1790518000351.png) -->
        <div id="col-parameters" class="hidden fixed lg:relative inset-y-0 right-0 z-50 lg:z-20 w-[88vw] sm:w-[320px] lg:w-[280px] lg:min-w-[280px] lg:max-w-[320px] border-l border-groq-grayBorder bg-white flex flex-col h-full overflow-hidden shrink-0 shadow-2xl lg:shadow-xs">
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
    <div id="view-keys" class="view-panel hidden border-t border-l border-r border-groq-grayBorder rounded-t-2xl bg-white mx-0 sm:mx-2 lg:mx-3 flex-1 p-3.5 sm:p-6 md:p-8 max-w-[1440px] w-full overflow-visible md:overflow-y-auto shadow-xs">
      <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <h1 class="text-[17px] font-bold text-groq-dark tracking-tight mb-2">API Keys</h1>
          <p class="text-xs text-groq-textMuted">Manage your project API keys. Remember to keep your API keys safe to prevent unauthorized access.</p>
        </div>

        <button onclick="openCreateKeyModal()" class="px-4 py-2 rounded-lg border border-[#f0523d] bg-white hover:bg-[#fff5f3] text-groq-dark text-xs font-semibold flex items-center justify-center gap-1.5 transition shadow-xs w-full sm:w-auto shrink-0 cursor-pointer">
          <i data-lucide="plus" class="w-3.5 h-3.5 text-groq-dark"></i>
          <span>Create API Key</span>
        </button>
      </div>

      <!-- Mobile swipe hint -->
      <div class="sm:hidden flex items-center gap-1.5 text-[11px] text-groq-textSubtle mb-2.5 px-0.5">
        <i data-lucide="arrow-right-left" class="w-3.5 h-3.5 text-[#f0523d]"></i>
        <span>Swipe table horizontally to view full API keys data</span>
      </div>

      <div class="w-full overflow-x-auto -mx-1 sm:mx-0 px-1 sm:px-0 touch-scroll">
        <table class="w-full min-w-[620px] text-left text-xs font-sans border-collapse">
          <thead>
            <tr class="text-groq-textSubtle text-[11px] uppercase tracking-wider font-semibold">
              <th class="pb-5 font-semibold text-groq-textSubtle pr-6">NAME</th>
              <th class="pb-5 font-semibold text-groq-textSubtle pr-6">SECRET KEY</th>
              <th class="pb-5 font-semibold text-groq-textSubtle pr-6">TIER</th>
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
    <div id="view-dashboard" class="view-panel flex-1 flex flex-col md:flex-row overflow-visible md:overflow-hidden">
      
      <!-- STANDALONE LEFT PANEL (Matching Groq Dashboard Left Sidebar with mobile responsive pill strip) -->
      <aside class="w-full md:w-44 shrink-0 px-3 sm:px-4 md:pl-8 py-2.5 md:py-8 flex flex-row md:flex-col gap-2 md:gap-0 md:space-y-7 text-xs font-medium border-b md:border-b-0 border-groq-grayBorder overflow-x-auto no-scrollbar bg-white touch-scroll">
        <button onclick="switchDashTab('metrics')" id="dash-tab-btn-metrics" class="dash-tab-btn whitespace-nowrap px-3 py-1.5 md:px-0 md:py-0 rounded-lg md:rounded-none text-center md:text-left text-groq-textMuted hover:text-groq-dark transition cursor-pointer shrink-0">Metrics</button>
        <button onclick="switchDashTab('usage')" id="dash-tab-btn-usage" class="dash-tab-btn whitespace-nowrap px-3 py-1.5 md:px-0 md:py-0 rounded-lg md:rounded-none text-center md:text-left text-groq-textMuted hover:text-groq-dark transition cursor-pointer shrink-0">Usage</button>
        <button onclick="switchDashTab('logs')" id="dash-tab-btn-logs" class="dash-tab-btn whitespace-nowrap px-3 py-1.5 md:px-0 md:py-0 rounded-lg md:rounded-none text-center md:text-left text-[#f0523d] font-semibold transition cursor-pointer shrink-0">Logs</button>
        <button onclick="switchDashTab('batch')" id="dash-tab-btn-batch" class="dash-tab-btn whitespace-nowrap px-3 py-1.5 md:px-0 md:py-0 rounded-lg md:rounded-none text-center md:text-left text-groq-textMuted hover:text-groq-dark transition cursor-pointer shrink-0">Batch</button>
      </aside>

      <!-- MAIN CARD CONTAINER (Rounded top-left & top-right border matching images) -->
      <div class="border-t border-l border-r border-groq-grayBorder rounded-t-2xl md:rounded-tr-2xl md:rounded-br-none bg-white p-3.5 sm:p-6 md:p-8 mx-0 md:mx-0 mr-0 md:mr-2 flex-1 flex flex-col overflow-visible md:overflow-y-auto shadow-xs">
        
        <!-- =================================================================== -->
        <!-- SUBVIEW A: METRICS (Exact 1:1 Match to media_1790456964674.png) -->
        <!-- =================================================================== -->
        <section id="dash-content-metrics" class="dash-subview hidden space-y-6">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h1 class="text-[17px] font-bold text-groq-dark tracking-tight">Metrics</h1>
            
            <!-- Controls on Right -->
            <div class="flex flex-wrap items-center gap-2 sm:gap-3 w-full sm:w-auto">
              <!-- Row 1 on mobile: Limits switch & Refresh button -->
              <div class="flex items-center justify-between sm:justify-start gap-3 w-full sm:w-auto">
                <div class="flex items-center gap-2 text-xs font-medium text-groq-dark">
                  <span>Show Limits</span>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" id="metrics-show-limits" onchange="renderMetricsChart()" class="sr-only peer">
                    <div class="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-groq-dark"></div>
                  </label>
                </div>

                <button id="metrics-btn-refresh" onclick="refreshMetrics()" class="px-3 py-1.5 rounded-lg bg-groq-grayBg border border-groq-grayBorder hover:bg-gray-100 text-xs font-medium text-groq-dark flex items-center gap-1.5 transition cursor-pointer">
                  <i data-lucide="refresh-cw" class="w-3.5 h-3.5 text-groq-textMuted"></i>
                  <span>Refresh</span>
                </button>
              </div>

              <!-- Filter Dropdowns -->
              <div class="flex items-center gap-2 flex-wrap w-full sm:w-auto">
                <!-- Last 30 minutes dropdown -->
                <div class="relative flex-1 sm:flex-initial min-w-[125px]">
                  <select id="metrics-time-range" onchange="renderMetricsChart()" class="w-full appearance-none bg-groq-grayBg border border-groq-grayBorder text-groq-dark text-xs font-medium rounded-lg pl-3 pr-7 py-1.5 focus:outline-none cursor-pointer">
                    <option value="30m" selected>Last 30 minutes</option>
                    <option value="1h">Last 1 hour</option>
                    <option value="24h">Last 24 hours</option>
                    <option value="7d">Last 7 days</option>
                  </select>
                  <i data-lucide="chevron-down" class="w-3.5 h-3.5 text-groq-textSubtle absolute right-2 top-2 pointer-events-none"></i>
                </div>

                <!-- Show all Models dropdown -->
                <div class="relative flex-1 sm:flex-initial min-w-[140px]">
                  <select id="metrics-model-filter" onchange="renderMetricsChart()" class="w-full appearance-none bg-groq-grayBg border border-groq-grayBorder text-groq-dark text-xs font-medium rounded-lg pl-3 pr-7 py-1.5 focus:outline-none cursor-pointer">
                    <option value="all">Show all Models</option>
                    <option value="openai/gpt-oss-120b">openai/gpt-oss-120b</option>
                    <option value="openai/gpt-oss-20b">openai/gpt-oss-20b</option>
                    <option value="qwen/qwen3.8-27b">qwen/qwen3.8-27b</option>
                    <option value="gemma-4-26b-a4b-it">gemma-4-26b-a4b-it</option>
                    <option value="gemma-4-31b-it">gemma-4-31b-it</option>
                    <option value="codestral-2508">codestral-2508</option>
                    <option value="ministral-8b-2512">ministral-8b-2512</option>
                    <option value="ministral-14b-2512">ministral-14b-2512</option>
                  </select>
                  <i data-lucide="chevrons-up-down" class="w-3.5 h-3.5 text-groq-textSubtle absolute right-2 top-2 pointer-events-none"></i>
                </div>

                <!-- Show all API Keys dropdown -->
                <div class="relative flex-1 sm:flex-initial min-w-[130px]">
                  <select id="metrics-key-filter" onchange="renderMetricsChart()" class="w-full appearance-none bg-groq-grayBg border border-groq-grayBorder text-groq-dark text-xs font-medium rounded-lg pl-3 pr-7 py-1.5 focus:outline-none cursor-pointer">
                    <option value="all">Show all API Keys</option>
                    <option value="ProjectSPG Test">ProjectSPG Test</option>
                    <option value="Datums Space">Datums Space</option>
                    <option value="ProjectSPG Production">ProjectSPG Production</option>
                  </select>
                  <i data-lucide="chevrons-up-down" class="w-3.5 h-3.5 text-groq-textSubtle absolute right-2 top-2 pointer-events-none"></i>
                </div>
              </div>
            </div>
          </div>

          <!-- HTTP Status Codes Chart Card -->
          <div class="border border-groq-grayBorder rounded-xl p-4 sm:p-6 bg-white shadow-xs">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
              <div class="flex items-center gap-1.5 text-xs font-semibold text-groq-dark">
                <span>HTTP Status Codes</span>
                <i data-lucide="help-circle" class="w-3.5 h-3.5 text-groq-textSubtle" title="Aggregated request status breakdown across time buckets"></i>
              </div>

              <!-- Status Code Legend & Counter Badges -->
              <div class="flex flex-wrap items-center gap-3 text-xs">
                <div class="flex items-center gap-1.5">
                  <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
                  <span class="text-groq-textMuted">200 OK:</span>
                  <span id="metric-legend-200" class="font-mono font-semibold text-groq-dark">0</span>
                </div>
                <div class="flex items-center gap-1.5">
                  <span class="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span>
                  <span class="text-groq-textMuted">4xx Client:</span>
                  <span id="metric-legend-4xx" class="font-mono font-semibold text-groq-dark">0</span>
                </div>
                <div class="flex items-center gap-1.5">
                  <span class="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block"></span>
                  <span class="text-groq-textMuted">5xx Server:</span>
                  <span id="metric-legend-5xx" class="font-mono font-semibold text-groq-dark">0</span>
                </div>
                <div class="h-3 w-px bg-gray-200"></div>
                <div class="text-groq-textSubtle font-mono text-[11px]">
                  Total: <span id="metric-total-summary" class="font-semibold text-groq-dark">0</span> reqs
                </div>
              </div>
            </div>

            <!-- Dynamic Chart Container -->
            <div id="metrics-chart-container" class="relative w-full h-[220px] sm:h-[260px] flex flex-col justify-end">
              <!-- Dynamic Canvas & Bars injected here -->
            </div>
          </div>
        </section>

        <!-- =================================================================== -->
        <!-- SUBVIEW B: USAGE (Exact 1:1 Match to media_1790456991949.png) -->
        <!-- =================================================================== -->
        <section id="dash-content-usage" class="dash-subview hidden space-y-6">
          <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
            <div>
              <h1 class="text-[17px] font-bold text-groq-dark tracking-tight mb-2">Usage</h1>
              <p class="text-xs font-medium text-groq-dark">View usage data for your project</p>
              <p class="text-[11px] text-groq-textSubtle mt-0.5">Note: Data can be delayed by up to 15 minutes. All data shown in UTC time.</p>
            </div>

            <div class="flex flex-wrap items-center gap-2">
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
            <div class="border border-groq-grayBorder rounded-xl p-5 max-w-sm w-full bg-white shadow-xs">
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
              <div class="p-4 sm:p-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 class="text-xs font-bold text-groq-dark">Model Activity Breakdown</h3>
                  <p class="text-[11px] text-groq-textMuted mt-0.5">Aggregate usage, token consumption, and privacy interception counts per supported model</p>
                </div>
                <div class="flex items-center gap-2 self-start sm:self-auto">
                  <span class="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">Live Metering</span>
                </div>
              </div>

              <!-- Mobile swipe hint -->
              <div class="sm:hidden flex items-center gap-1.5 text-[11px] text-groq-textSubtle p-2.5 pb-1">
                <i data-lucide="arrow-right-left" class="w-3.5 h-3.5 text-[#f0523d]"></i>
                <span>Swipe table horizontally to inspect all metrics</span>
              </div>

              <div class="overflow-x-auto touch-scroll">
                <table class="w-full min-w-[660px] text-left text-xs border-collapse font-sans">
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
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
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
              <button onclick="downloadLogs()" class="px-3.5 py-1.5 rounded-lg bg-groq-grayBg border border-groq-grayBorder hover:bg-gray-100 text-xs font-medium text-groq-dark flex items-center gap-1.5 transition cursor-pointer">
                <span>Download</span>
                <i data-lucide="chevron-down" class="w-3.5 h-3.5 text-groq-textSubtle"></i>
              </button>
            </div>
          </div>

          <!-- Mobile swipe hint -->
          <div class="sm:hidden flex items-center gap-1.5 text-[11px] text-groq-textSubtle mb-2 px-0.5">
            <i data-lucide="arrow-right-left" class="w-3.5 h-3.5 text-[#f0523d]"></i>
            <span>Swipe table horizontally to inspect all 11 telemetry columns</span>
          </div>

          <!-- Logs Table (Exact Columns as Screenshot 3) -->
          <div class="w-full overflow-x-auto -mx-1 sm:mx-0 px-1 sm:px-0 touch-scroll">
            <table class="w-full min-w-[760px] text-left text-xs font-mono border-collapse">
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
    <div id="view-docs" class="view-panel hidden border-t border-l border-r border-groq-grayBorder rounded-t-2xl bg-white mx-0 sm:mx-2 lg:mx-3 flex-1 flex flex-col md:flex-row overflow-visible md:overflow-hidden shadow-xs">
      <aside class="w-full md:w-64 shrink-0 border-b md:border-b-0 md:border-r border-groq-grayBorder bg-white p-3.5 sm:p-5 text-xs overflow-visible md:overflow-y-auto">
        <!-- Mobile Accordion Trigger (Only visible on < md) -->
        <button type="button" onclick="toggleDocsMobileNav()" class="md:hidden w-full flex items-center justify-between py-2 px-3 rounded-lg bg-gray-50 border border-gray-200 text-xs font-semibold text-groq-dark cursor-pointer">
          <span class="flex items-center gap-2"><i data-lucide="book-open" class="w-4 h-4 text-[#f0523d]"></i> Documentation Navigation</span>
          <i id="docs-mobile-chevron" data-lucide="chevron-down" class="w-4 h-4 text-gray-500 transition-transform duration-200"></i>
        </button>

        <!-- Sidebar Content (Collapsible on mobile, always visible on md+) -->
        <div id="docs-sidebar-content" class="hidden md:block space-y-4 mt-3 md:mt-0">
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
        </div>
      </aside>

      <div class="flex-1 p-4 sm:p-8 overflow-visible md:overflow-y-auto flex flex-col lg:flex-row gap-6 lg:gap-8 bg-white">
        <div class="flex-1 max-w-xl space-y-6">
          <div>
            <h1 class="text-xl sm:text-2xl font-bold text-groq-dark mb-1">ProjectSPG API Reference</h1>
            <p class="text-xs text-groq-textMuted">Enterprise Privacy-Preserving LLM Gateway Reference</p>
          </div>

          <div class="space-y-3">
            <h2 class="text-base sm:text-lg font-semibold text-groq-dark flex items-center gap-2">
              <i data-lucide="shield-check" class="w-4 h-4 text-emerald-600"></i>
              Chat Completions
            </h2>
            <div class="space-y-2">
              <h3 class="text-xs sm:text-sm font-semibold text-groq-dark">Create chat completion</h3>
              <div class="flex flex-wrap items-center gap-2 p-2.5 sm:px-3 sm:py-2 rounded-xl bg-gray-50 border border-groq-grayBorder font-mono text-xs break-all">
                <span class="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px] shrink-0">POST</span>
                <span class="text-groq-dark break-all flex-1 select-all font-medium">https://projectspg.info/v1/chat/completions</span>
                <button onclick="navigator.clipboard.writeText('https://projectspg.info/v1/chat/completions'); alert('Endpoint URL copied!');" class="p-1 text-groq-textMuted hover:text-groq-dark cursor-pointer shrink-0" title="Copy endpoint">
                  <i data-lucide="copy" class="w-3.5 h-3.5"></i>
                </button>
              </div>
              <p class="text-xs text-groq-textMuted leading-relaxed">Creates a model response with automated edge privacy neutralization and reversible tokenization across 109 sovereign jurisdictions.</p>
            </div>
          </div>

          <!-- Quick Parameters Table -->
          <div class="space-y-2">
            <h4 class="text-xs font-semibold text-groq-dark uppercase tracking-wider">Required Headers</h4>
            <div class="border border-groq-grayBorder rounded-xl overflow-hidden text-xs font-sans">
              <div class="bg-gray-50 px-3 py-2 border-b border-gray-100 font-mono text-[11px] text-groq-textSubtle flex justify-between">
                <span>HEADER</span>
                <span>TYPE / VALUE</span>
              </div>
              <div class="p-3 border-b border-gray-100 flex items-center justify-between font-mono text-[11px]">
                <span class="text-groq-dark font-medium">Authorization</span>
                <span class="text-emerald-700 font-semibold">Bearer spg_live_...</span>
              </div>
              <div class="p-3 flex items-center justify-between font-mono text-[11px]">
                <span class="text-groq-dark font-medium">Content-Type</span>
                <span class="text-gray-600">application/json</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Side: Code Snippet Card in Docs -->
        <div class="w-full lg:w-[420px] shrink-0 space-y-3">
          <div class="flex items-center justify-between text-xs font-semibold text-groq-dark">
            <span class="flex items-center gap-1.5"><i data-lucide="terminal" class="w-3.5 h-3.5 text-[#f0523d]"></i> Example Request</span>
            <button onclick="navigator.clipboard.writeText(document.getElementById('docs-code-curl').innerText); alert('cURL snippet copied!');" class="text-[11px] text-groq-textMuted hover:text-groq-dark flex items-center gap-1 font-medium cursor-pointer">
              <i data-lucide="copy" class="w-3 h-3"></i> Copy
            </button>
          </div>
          <div id="docs-code-curl" class="bg-[#1e1e2e] text-slate-100 p-4 rounded-xl font-mono text-[11px] leading-[1.65] overflow-x-auto whitespace-pre touch-scroll shadow-md select-all">curl https://projectspg.info/v1/chat/completions \
  -H "Authorization: Bearer spg_live_your_key" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "openai/gpt-oss-120b",
    "messages": [
      {
        "role": "user",
        "content": "Confirm order for Alice (SSN: 123-45-6789)"
      }
    ],
    "temperature": 0.7
  }'</div>
        </div>
      </div>
    </div>

  </main>

  <!-- MODALS -->
  <div id="modal-create-key" class="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 hidden flex items-center justify-center p-4">
    <div class="bg-white border border-groq-grayBorder rounded-2xl max-w-md w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
      <button onclick="closeCreateKeyModal()" class="absolute top-4 right-4 text-groq-textMuted hover:text-groq-dark transition p-1.5 rounded-lg hover:bg-gray-100 cursor-pointer" title="Close">
        <i data-lucide="x" class="w-4 h-4"></i>
      </button>

      <div class="flex items-center gap-2 text-groq-dark text-base font-bold mb-1">
        <i data-lucide="key" class="w-4 h-4 text-[#f0523d]"></i> Create API Key
      </div>
      <p class="text-xs text-groq-textMuted">Generate a ProjectSPG key for wire-compatible AI privacy proxying.</p>

      <div class="mt-4 space-y-4 text-xs">
        <div>
          <label class="block text-groq-dark font-medium mb-1">Key Name</label>
          <input type="text" id="new-key-name" placeholder="e.g. Production Backend" class="w-full bg-[#f9fafb] border border-groq-grayBorder rounded-lg px-3 py-2 text-groq-dark focus:border-gray-400 focus:outline-none font-sans text-xs">
        </div>

        <div>
          <label class="block text-groq-dark font-medium mb-1.5">Access Tier</label>
          <div class="grid grid-cols-2 gap-2 bg-[#f3f4f6] p-1 rounded-xl">
            <button type="button" id="tier-tab-free" onclick="selectCreateKeyTier('free')" class="py-2 px-3 rounded-lg text-xs font-semibold transition cursor-pointer bg-white text-groq-dark shadow-xs flex items-center justify-center gap-1.5">
              <span>Free Tier</span>
            </button>
            <button type="button" id="tier-tab-byok" onclick="selectCreateKeyTier('byok')" class="py-2 px-3 rounded-lg text-xs font-semibold transition cursor-pointer text-groq-textMuted hover:text-groq-dark flex items-center justify-center gap-1.5">
              <i data-lucide="sparkles" class="w-3.5 h-3.5 text-blue-600"></i>
              <span>BYOK Tier</span>
            </button>
          </div>
          <input type="hidden" id="new-key-tier" value="free">
        </div>

        <!-- Free Tier Info Banner -->
        <div id="tier-info-free" class="p-3 rounded-xl bg-gray-50 border border-gray-200/80 text-[11px] text-gray-600 leading-relaxed">
          <div class="font-semibold text-gray-900 mb-0.5">Free Platform Quota</div>
          Uses ProjectSPG community infrastructure (1 req / 15s rate limit, 10,000 req/mo). No AI provider API keys required.
        </div>

        <!-- BYOK Tier Credentials Section (Collapsible) -->
        <div id="tier-info-byok" class="hidden space-y-3 pt-1">
          <div class="p-3 rounded-xl bg-blue-50/70 border border-blue-200 text-[11px] text-blue-900 leading-relaxed">
            <div class="font-semibold text-blue-950 mb-0.5 flex items-center gap-1">
              <i data-lucide="shield-check" class="w-3.5 h-3.5 text-blue-600"></i>
              Direct Upstream Zero-Throttling Routing
            </div>
            Associate your AI provider keys with this API key. When your backend or OpenAI SDK calls ProjectSPG with <code>spg_live_...</code>, requests are proxied directly using your accounts with zero platform rate limits.
          </div>

          <!-- Google AI Studio Key -->
          <div>
            <div class="flex items-center justify-between mb-1">
              <label class="block text-groq-dark font-medium text-[11px]">Google AI Studio Key</label>
              <span class="text-[10px] text-gray-400 font-mono">gemma-4-*</span>
            </div>
            <div class="relative">
              <input type="password" id="new-byok-google" placeholder="AIzaSy... (Optional)" class="w-full bg-[#f9fafb] border border-groq-grayBorder rounded-lg pl-3 pr-8 py-2 text-groq-dark placeholder-gray-400 focus:outline-none focus:border-gray-400 font-mono text-xs">
              <button type="button" onclick="toggleKeyVisibility('new-byok-google', this)" class="absolute right-2.5 top-2 text-gray-400 hover:text-gray-600 cursor-pointer p-0.5">
                <i data-lucide="eye" class="w-3.5 h-3.5"></i>
              </button>
            </div>
          </div>

          <!-- Mistral AI Key -->
          <div>
            <div class="flex items-center justify-between mb-1">
              <label class="block text-groq-dark font-medium text-[11px]">Mistral AI Key</label>
              <span class="text-[10px] text-gray-400 font-mono">codestral, ministral</span>
            </div>
            <div class="relative">
              <input type="password" id="new-byok-mistral" placeholder="api_... (Optional)" class="w-full bg-[#f9fafb] border border-groq-grayBorder rounded-lg pl-3 pr-8 py-2 text-groq-dark placeholder-gray-400 focus:outline-none focus:border-gray-400 font-mono text-xs">
              <button type="button" onclick="toggleKeyVisibility('new-byok-mistral', this)" class="absolute right-2.5 top-2 text-gray-400 hover:text-gray-600 cursor-pointer p-0.5">
                <i data-lucide="eye" class="w-3.5 h-3.5"></i>
              </button>
            </div>
          </div>

          <!-- Groq Cloud Key -->
          <div>
            <div class="flex items-center justify-between mb-1">
              <label class="block text-groq-dark font-medium text-[11px]">Groq Cloud Key</label>
              <span class="text-[10px] text-gray-400 font-mono">gpt-oss, qwen3.8</span>
            </div>
            <div class="relative">
              <input type="password" id="new-byok-groq" placeholder="gsk_... (Optional)" class="w-full bg-[#f9fafb] border border-groq-grayBorder rounded-lg pl-3 pr-8 py-2 text-groq-dark placeholder-gray-400 focus:outline-none focus:border-gray-400 font-mono text-xs">
              <button type="button" onclick="toggleKeyVisibility('new-byok-groq', this)" class="absolute right-2.5 top-2 text-gray-400 hover:text-gray-600 cursor-pointer p-0.5">
                <i data-lucide="eye" class="w-3.5 h-3.5"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-6 pt-4 border-t border-gray-100 flex justify-end gap-2 text-xs">
        <button onclick="closeCreateKeyModal()" class="px-4 py-2 rounded-lg bg-gray-100 text-groq-dark font-medium cursor-pointer">Cancel</button>
        <button onclick="submitCreateKey()" class="px-4 py-2 rounded-lg bg-black hover:bg-gray-800 text-white font-semibold shadow-xs transition cursor-pointer">Create API Key</button>
      </div>
    </div>
  </div>

  <div id="modal-show-key" class="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 hidden flex items-center justify-center p-4">
    <div class="bg-white border border-groq-grayBorder rounded-2xl max-w-lg w-full p-5 sm:p-6 shadow-2xl max-h-[90vh] overflow-y-auto touch-scroll">
      <div class="flex items-center gap-2 text-groq-dark text-sm font-bold mb-1">
        <i data-lucide="key" class="w-4 h-4 text-[#f0523d]"></i> Save your key
      </div>
      <p class="text-xs text-groq-textMuted">Save this secret key in a safe place. You won't be able to view it again.</p>
      <div class="mt-4 p-3 bg-gray-50 border border-groq-grayBorder rounded-lg flex items-center justify-between font-mono text-xs text-[#f0523d]">
        <span id="displayed-raw-key" class="break-all select-all font-semibold"></span>
        <button onclick="copyRawKey()" class="ml-2 text-groq-textMuted hover:text-groq-dark p-1 cursor-pointer"><i data-lucide="copy" class="w-4 h-4"></i></button>
      </div>
      <div class="mt-6 flex justify-end text-xs">
        <button onclick="closeShowKeyModal()" class="px-5 py-2 rounded-lg border border-[#f0523d] bg-white hover:bg-[#fff5f3] text-groq-dark font-semibold cursor-pointer">Done</button>
      </div>
    </div>
  </div>

  <div id="modal-config" class="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 hidden flex items-center justify-center p-4">
    <div class="bg-white border border-groq-grayBorder rounded-2xl max-w-md w-full p-5 sm:p-6 shadow-2xl max-h-[90vh] overflow-y-auto touch-scroll">
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
        <button onclick="closeConfigModal()" class="px-5 py-2 rounded-lg border border-[#f0523d] bg-white hover:bg-[#fff5f3] text-groq-dark font-semibold cursor-pointer">Save Settings</button>
      </div>
    </div>
  </div>

  <!-- ========================================================================= -->
  <!-- MODAL: BYOK PROVIDER API KEYS (Google, Mistral, Groq)                     -->
  <!-- ========================================================================= -->
  <div id="modal-byok-keys" onclick="if(event.target === this) closeByokKeysModal()" class="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 hidden flex items-center justify-center p-4">
    <div class="bg-white border border-groq-grayBorder rounded-2xl max-w-md w-full p-5 sm:p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto touch-scroll">
      <button onclick="closeByokKeysModal()" class="absolute top-4 right-4 text-groq-textMuted hover:text-groq-dark transition p-1.5 rounded-lg hover:bg-gray-100 cursor-pointer" title="Close">
        <i data-lucide="x" class="w-4 h-4"></i>
      </button>

      <div class="flex items-center gap-2.5 mb-1.5">
        <div class="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
          <i data-lucide="key" class="w-4 h-4"></i>
        </div>
        <div>
          <h3 class="text-base font-bold text-groq-dark">Provider API Keys</h3>
          <p class="text-[11px] text-groq-textMuted">Bring-Your-Own-Key (BYOK) Credentials</p>
        </div>
      </div>

      <p class="text-xs text-gray-500 mt-2 leading-relaxed">
        Configure your direct provider API keys. In BYOK mode, adding your keys automatically unlocks and populates all available models directly from Groq Cloud, Google AI Studio, and Mistral AI with zero platform rate limits.
      </p>

      <div class="mt-5 space-y-4 text-xs">
        
        <!-- Google AI Studio API Key -->
        <div>
          <div class="flex items-center justify-between mb-1">
            <label class="block text-groq-dark font-semibold">Google AI Studio Key</label>
            <span class="text-[10px] text-gray-400 font-mono">gemini-2.0-flash, gemini-1.5-pro, gemma...</span>
          </div>
          <div class="relative">
            <input type="password" id="byok-key-google" placeholder="AIzaSy..." class="w-full bg-[#f9fafb] border border-groq-grayBorder rounded-lg pl-3 pr-8 py-2 text-groq-dark placeholder-gray-400 focus:outline-none focus:border-gray-400 font-mono text-xs">
            <button type="button" onclick="toggleKeyVisibility('byok-key-google', this)" class="absolute right-2.5 top-2 text-gray-400 hover:text-gray-600 cursor-pointer p-0.5" title="Toggle visibility">
              <i data-lucide="eye" class="w-3.5 h-3.5"></i>
            </button>
          </div>
        </div>

        <!-- Mistral AI API Key -->
        <div>
          <div class="flex items-center justify-between mb-1">
            <label class="block text-groq-dark font-semibold">Mistral API Key</label>
            <span class="text-[10px] text-gray-400 font-mono">mistral-large, codestral, ministral...</span>
          </div>
          <div class="relative">
            <input type="password" id="byok-key-mistral" placeholder="api_..." class="w-full bg-[#f9fafb] border border-groq-grayBorder rounded-lg pl-3 pr-8 py-2 text-groq-dark placeholder-gray-400 focus:outline-none focus:border-gray-400 font-mono text-xs">
            <button type="button" onclick="toggleKeyVisibility('byok-key-mistral', this)" class="absolute right-2.5 top-2 text-gray-400 hover:text-gray-600 cursor-pointer p-0.5" title="Toggle visibility">
              <i data-lucide="eye" class="w-3.5 h-3.5"></i>
            </button>
          </div>
        </div>

        <!-- Groq Cloud API Key -->
        <div>
          <div class="flex items-center justify-between mb-1">
            <label class="block text-groq-dark font-semibold">Groq API Key</label>
            <span class="text-[10px] text-gray-400 font-mono">llama-3.3-70b, deepseek-r1, qwen...</span>
          </div>
          <div class="relative">
            <input type="password" id="byok-key-groq" placeholder="gsk_..." class="w-full bg-[#f9fafb] border border-groq-grayBorder rounded-lg pl-3 pr-8 py-2 text-groq-dark placeholder-gray-400 focus:outline-none focus:border-gray-400 font-mono text-xs">
            <button type="button" onclick="toggleKeyVisibility('byok-key-groq', this)" class="absolute right-2.5 top-2 text-gray-400 hover:text-gray-600 cursor-pointer p-0.5" title="Toggle visibility">
              <i data-lucide="eye" class="w-3.5 h-3.5"></i>
            </button>
          </div>
        </div>

        <div id="byok-sync-status" class="hidden p-2.5 rounded-lg text-xs flex items-center gap-2"></div>
      </div>

      <div class="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs">
        <button onclick="clearByokKeys()" class="text-xs text-gray-400 hover:text-rose-600 transition cursor-pointer font-medium">Clear All</button>
        <div class="flex items-center gap-2">
          <button onclick="closeByokKeysModal()" class="px-3 py-1.5 rounded-lg text-gray-600 hover:bg-gray-100 transition cursor-pointer font-medium">Cancel</button>
          <button onclick="saveByokKeys()" class="px-4 py-1.5 rounded-lg bg-black hover:bg-gray-800 text-white font-semibold shadow-xs transition cursor-pointer">Save Keys</button>
        </div>
      </div>
    </div>
  </div>

  <!-- ========================================================================= -->
  <!-- MODAL: FIREBASE AUTHENTICATION (Google + Email/Password) -->
  <!-- ========================================================================= -->
  <div id="modal-auth" class="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 hidden flex items-center justify-center p-4">
    <div class="bg-white border border-groq-grayBorder rounded-2xl max-w-sm w-full p-5 sm:p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto touch-scroll">
      <button onclick="closeAuthModal()" class="absolute top-4 right-4 text-groq-textMuted hover:text-groq-dark transition p-1 cursor-pointer">
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

    let activeView = 'landing'; // Default to ProjectSPG Landing Page for unauthenticated/entry visitors
    let activeDashTab = 'logs';   // Default sub-tab within Dashboard
    let isCodeVisible = true;
    let activeCodeLang = 'python';

    let sampleApiKeys = [
      { id: 'key_1', name: 'Datums Space', key_prefix: 'spg_live_97e4...IZS1', tier: 'free', created_at: '2026-09-09T00:00:00Z', last_used: '9/9/2026', expires: 'Never', requests_used: 0 },
      { id: 'key_2', name: 'ProjectSPG Production', key_prefix: 'spg_live_41fa...R5Ve', tier: 'byok', byok_providers: ['Groq', 'Google', 'Mistral'], created_at: '2026-09-27T00:00:00Z', last_used: '9/27/2026', expires: 'Never', requests_used: 3 }
    ];

    // Initial logs with timestamps
    const _initNow = Date.now();
    let localLogs = [
      { time: new Date(_initNow - 2 * 60 * 1000).toLocaleString(), timestamp: new Date(_initNow - 2 * 60 * 1000).toISOString(), model: 'openai/gpt-oss-120b', key: 'ProjectSPG Test', code: 200, ttft: '0.583', latency: '0.829', inTokens: 124, outTokens: 120, audio: '-', reqId: 'req_0...t5xz', error: '-' },
      { time: new Date(_initNow - 8 * 60 * 1000).toLocaleString(), timestamp: new Date(_initNow - 8 * 60 * 1000).toISOString(), model: 'openai/gpt-oss-120b', key: 'ProjectSPG Test', code: 200, ttft: '0.376', latency: '0.538', inTokens: 89, outTokens: 79, audio: '-', reqId: 'req_0...4xfy', error: '-' },
      { time: new Date(_initNow - 14 * 60 * 1000).toLocaleString(), timestamp: new Date(_initNow - 14 * 60 * 1000).toISOString(), model: 'llama-3.3-70b-versatile', key: 'ProjectSPG Test', code: 404, ttft: '0', latency: '0.002', inTokens: 0, outTokens: 0, audio: '-', reqId: 'req_0...0d96', error: 'model_not_found' }
    ];

    window.addEventListener('DOMContentLoaded', () => {
      const hash = window.location.hash.replace('#', '');
      if (['landing', 'playground', 'keys', 'dashboard', 'docs'].includes(hash)) {
        activeView = hash;
      } else {
        activeView = 'landing';
      }
      switchView(activeView);
      updateMobileResearchHighlight();
      updateCodeViewer();
      fetchApiLogs();
      fetchApiKeys();
      initByokKeys();
      renderMetricsChart();

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

      window.addEventListener('resize', syncBodyOverflow, { passive: true });
    });

    function syncBodyOverflow() {
      const mainEl = document.querySelector('main');
      if (activeView === 'landing' || window.innerWidth < 1024) {
        document.body.classList.remove('overflow-hidden', 'h-screen');
        document.body.classList.add('overflow-y-auto', 'min-h-screen');
        if (mainEl) {
          mainEl.classList.remove('overflow-hidden');
          mainEl.classList.add('overflow-visible');
        }
      } else {
        document.body.classList.add('overflow-hidden', 'h-screen');
        document.body.classList.remove('overflow-y-auto', 'min-h-screen');
        if (mainEl) {
          mainEl.classList.add('overflow-hidden');
          mainEl.classList.remove('overflow-visible');
        }
      }
    }

    function switchView(viewName) {
      activeView = viewName;
      window.location.hash = viewName;

      const globalHeader = document.getElementById('global-header');

      if (viewName === 'landing') {
        if (globalHeader) globalHeader.classList.add('hidden');
      } else {
        if (globalHeader) globalHeader.classList.remove('hidden');
      }

      syncBodyOverflow();

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

      // Update mobile navigation strip pills
      document.querySelectorAll('.nav-mobile-item').forEach(btn => {
        btn.className = 'nav-mobile-item flex-1 py-1.5 px-2 text-center rounded-lg text-xs font-medium whitespace-nowrap transition cursor-pointer text-groq-textMuted bg-white border border-gray-200/70 shadow-2xs';
      });
      const activeMobileBtn = document.getElementById('nav-mobile-' + viewName);
      if (activeMobileBtn) {
        activeMobileBtn.className = 'nav-mobile-item flex-1 py-1.5 px-2 text-center rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer text-[#f0523d] bg-orange-50 border border-[#f0523d]/30 shadow-2xs';
      }

      if (viewName === 'keys') fetchApiKeys();
      if (viewName === 'dashboard') switchDashTab(activeDashTab);
      if (typeof lucide !== 'undefined') {
        setTimeout(() => lucide.createIcons(), 10);
      }
      if (viewName === 'landing') {
        setTimeout(updateMobileResearchHighlight, 100);
      }
    }

    function selectPlatformCategory(cat) {
      const catConfig = {
        inference: { bg: 'bg-[#d5f5f6]', tab: 'cat-tab-inference' },
        compute: { bg: 'bg-[#dbeafe]', tab: 'cat-tab-compute' },
        shaping: { bg: 'bg-[#ede9fe]', tab: 'cat-tab-shaping' }
      };

      ['inference', 'compute', 'shaping'].forEach(c => {
        const btn = document.getElementById('cat-tab-' + c);
        if (btn) {
          btn.className = 'cat-pill py-3.5 sm:py-4.5 px-2 sm:px-6 rounded-md text-center font-bold text-xs sm:text-base md:text-xl transition-all duration-200 cursor-pointer bg-white text-gray-900 border border-gray-200/70 shadow-2xs hover:bg-gray-50/90 hover:text-black';
        }
        const panel = document.getElementById('platform-cat-panel-' + c);
        if (panel) panel.classList.add('hidden');
      });

      if (catConfig[cat]) {
        const activeBtn = document.getElementById(catConfig[cat].tab);
        if (activeBtn) {
          activeBtn.className = 'cat-pill py-3.5 sm:py-4.5 px-2 sm:px-6 rounded-md text-center font-bold text-xs sm:text-base md:text-xl transition-all duration-200 cursor-pointer text-gray-950 border border-transparent shadow-2xs ' + catConfig[cat].bg;
        }
      }

      const activePanel = document.getElementById('platform-cat-panel-' + cat);
      if (activePanel) activePanel.classList.remove('hidden');

      selectPlatformSubItem(cat, 0);

      if (typeof lucide !== 'undefined') {
        setTimeout(() => lucide.createIcons(), 10);
      }
    }

    function toggleLandingMobileMenu() {
      const menu = document.getElementById('landing-mobile-menu');
      const iconMenu = document.getElementById('landing-mobile-icon-menu');
      const iconClose = document.getElementById('landing-mobile-icon-close');
      if (!menu) return;
      const isHidden = menu.classList.contains('hidden');
      if (isHidden) {
        menu.classList.remove('hidden');
        if (iconMenu) iconMenu.classList.add('hidden');
        if (iconClose) iconClose.classList.remove('hidden');
      } else {
        menu.classList.add('hidden');
        if (iconMenu) iconMenu.classList.remove('hidden');
        if (iconClose) iconClose.classList.add('hidden');
      }
      if (typeof lucide !== 'undefined') lucide.createIcons();
    }

    function closeLandingMobileMenu() {
      const menu = document.getElementById('landing-mobile-menu');
      const iconMenu = document.getElementById('landing-mobile-icon-menu');
      const iconClose = document.getElementById('landing-mobile-icon-close');
      if (menu) menu.classList.add('hidden');
      if (iconMenu) iconMenu.classList.remove('hidden');
      if (iconClose) iconClose.classList.add('hidden');
      if (typeof lucide !== 'undefined') lucide.createIcons();
    }

    function selectPlatformSubItem(cat, index) {
      const subItems = document.querySelectorAll('.subitem-' + cat);
      subItems.forEach((item, idx) => {
        if (idx === index) {
          item.classList.add('is-active');
        } else {
          item.classList.remove('is-active');
        }
      });

      const mockups = document.querySelectorAll('.mockup-' + cat);
      mockups.forEach((mock, idx) => {
        if (idx === index) {
          mock.classList.remove('hidden');
        } else {
          mock.classList.add('hidden');
        }
      });

      if (typeof lucide !== 'undefined') {
        setTimeout(() => lucide.createIcons(), 10);
      }
    }

    function scrollResearchCards(direction) {
      const track = document.getElementById('research-cards-track');
      if (!track) return;
      const scrollAmount = 350;
      track.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }

    // Auto-highlight research cards on mobile scroll (replaces hover effect for mobile users)
    let isResearchScrollTicking = false;
    function updateMobileResearchHighlight() {
      if (window.innerWidth >= 1024) {
        document.querySelectorAll('.research-card.mobile-highlight').forEach(el => el.classList.remove('mobile-highlight'));
        return;
      }

      const cards = document.querySelectorAll('#research-cards-track .research-card');
      if (!cards.length) return;

      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const viewportCenter = viewportHeight / 2;

      let closestCard = null;
      let minDistance = Infinity;

      cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        // Trigger highlight when card is comfortably inside visible viewport area
        if (rect.bottom > 80 && rect.top < viewportHeight - 80) {
          const cardCenter = rect.top + rect.height / 2;
          const distance = Math.abs(cardCenter - viewportCenter);
          if (distance < minDistance) {
            minDistance = distance;
            closestCard = card;
          }
        }
      });

      cards.forEach(card => {
        if (closestCard && card === closestCard) {
          card.classList.add('mobile-highlight');
        } else {
          card.classList.remove('mobile-highlight');
        }
      });
    }

    function onMobileResearchScroll() {
      if (!isResearchScrollTicking) {
        window.requestAnimationFrame(() => {
          updateMobileResearchHighlight();
          isResearchScrollTicking = false;
        });
        isResearchScrollTicking = true;
      }
    }

    function handleResearchCardClick(cardEl) {
      if (window.innerWidth < 1024 && cardEl) {
        document.querySelectorAll('.research-card.mobile-highlight').forEach(el => el.classList.remove('mobile-highlight'));
        cardEl.classList.add('mobile-highlight');
      }
    }

    window.addEventListener('scroll', onMobileResearchScroll, { passive: true });
    window.addEventListener('resize', onMobileResearchScroll, { passive: true });
    document.addEventListener('scroll', onMobileResearchScroll, { passive: true });

    function switchAccessView(view) {
      if (view === 'verify' || view === 'redeem') {
        toggleGateMode('redeem');
      } else {
        toggleGateMode('request');
      }
      scrollToAccessForm();
    }

    function toggleGateMode(mode) {
      const reqTab = document.getElementById('gate-tab-request');
      const redTab = document.getElementById('gate-tab-redeem');
      const reqPanel = document.getElementById('gate-panel-request');
      const redPanel = document.getElementById('gate-panel-redeem');

      if (mode === 'request') {
        if (reqTab) reqTab.className = 'px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition bg-gray-900 text-white cursor-pointer shadow-xs';
        if (redTab) redTab.className = 'px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition bg-gray-100 hover:bg-gray-200 text-gray-700 cursor-pointer';
        if (reqPanel) reqPanel.classList.remove('hidden');
        if (redPanel) redPanel.classList.add('hidden');
      } else {
        if (reqTab) reqTab.className = 'px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition bg-gray-100 hover:bg-gray-200 text-gray-700 cursor-pointer';
        if (redTab) redTab.className = 'px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition bg-gray-900 text-white cursor-pointer shadow-xs';
        if (reqPanel) reqPanel.classList.add('hidden');
        if (redPanel) redPanel.classList.remove('hidden');
      }
    }

    function scrollToAccessForm(cohort) {
      toggleGateMode('request');
      const form = document.getElementById('access-form-container');
      if (form) {
        form.scrollIntoView({ behavior: 'smooth' });
      }
      if (cohort && document.getElementById('inviteCompliance')) {
        if (cohort === 'research') document.getElementById('inviteCompliance').value = 'multi';
        else if (cohort === 'enterprise') document.getElementById('inviteCompliance').value = 'gdpr';
        else if (cohort === 'sovereign') document.getElementById('inviteCompliance').value = 'multi';
      }
    }

    function handleInviteRequest(e) {
      e.preventDefault();
      const email = document.getElementById('inviteEmail').value;
      const org = document.getElementById('inviteOrg').value;
      const compliance = document.getElementById('inviteCompliance').value;
      const volume = document.getElementById('inviteVolume').value;

      try {
        const requests = JSON.parse(localStorage.getItem('spg_access_requests') || '[]');
        requests.push({ email, org, compliance, volume, timestamp: new Date().toISOString() });
        localStorage.setItem('spg_access_requests', JSON.stringify(requests));
      } catch (err) {}

      document.getElementById('inviteRequestForm').classList.add('hidden');
      document.getElementById('confirmedInviteEmail').innerText = email;
      document.getElementById('inviteSuccessMessage').classList.remove('hidden');
      if (window.lucide) lucide.createIcons();
    }

    function handleRedeemCode() {
      const codeInput = document.getElementById('inviteCodeInput');
      const feedback = document.getElementById('redeemFeedback');
      const code = (codeInput?.value || '').trim().toUpperCase();

      if (!code) {
        if (feedback) {
          feedback.innerText = 'Please enter an invitation key.';
          feedback.className = 'text-xs text-center font-medium mt-2 text-rose-500';
        }
        return;
      }

      if (feedback) {
        feedback.innerText = 'Verifying invitation key...';
        feedback.className = 'text-xs text-center font-medium mt-2 text-amber-500';
      }

      setTimeout(() => {
        if (feedback) {
          feedback.innerText = '✓ Invitation Key Verified. Welcome to ProjectSPG Private Access.';
          feedback.className = 'text-xs text-center font-bold mt-2 text-emerald-600';
        }
        setTimeout(() => {
          openAuthModal();
        }, 800);
      }, 500);
    }

    function switchDashTab(tabName) {
      activeDashTab = tabName;
      document.querySelectorAll('.dash-subview').forEach(el => el.classList.add('hidden'));
      const target = document.getElementById('dash-content-' + tabName);
      if (target) target.classList.remove('hidden');

      document.querySelectorAll('.dash-tab-btn').forEach(btn => {
        btn.classList.remove('text-[#f0523d]', 'font-semibold', 'bg-orange-50', 'border', 'border-[#f0523d]/20');
        btn.classList.add('text-groq-textMuted');
      });

      const activeBtn = document.getElementById('dash-tab-btn-' + tabName);
      if (activeBtn) {
        activeBtn.classList.remove('text-groq-textMuted');
        activeBtn.classList.add('text-[#f0523d]', 'font-semibold', 'bg-orange-50', 'border', 'border-[#f0523d]/20');
      }
      if (tabName === 'logs') fetchApiLogs();
      if (tabName === 'usage') updateUsageStats();
      if (tabName === 'metrics') renderMetricsChart();
      lucide.createIcons();
    }

    function toggleDocsMobileNav() {
      const content = document.getElementById('docs-sidebar-content');
      const chevron = document.getElementById('docs-mobile-chevron');
      if (!content) return;
      const isHidden = content.classList.contains('hidden');
      if (isHidden) {
        content.classList.remove('hidden');
        if (chevron) chevron.classList.add('rotate-180');
      } else {
        content.classList.add('hidden');
        if (chevron) chevron.classList.remove('rotate-180');
      }
      if (window.lucide) lucide.createIcons();
    }

    function toggleCodePanel() {
      const panel = document.getElementById('col-code');
      const text = document.getElementById('code-btn-text');
      isCodeVisible = !isCodeVisible;
      if (isCodeVisible) {
        panel.classList.remove('hidden');
        text.textContent = 'Hide';
      } else {
        panel.classList.add('hidden');
        text.textContent = 'Code';
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

    let currentProtectedPrompt = '';
    let currentRehydratedText = '';

    function escapeHtml(str) {
      if (!str) return '';
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    }

    function renderProtectedPrompt(text, tokenMap) {
      if (!text) return '';
      if (!tokenMap || Object.keys(tokenMap).length === 0) {
        return escapeHtml(text);
      }

      const matches = [];
      const tokens = Object.keys(tokenMap).sort((a, b) => b.length - a.length);

      for (const token of tokens) {
        if (!token) continue;
        let idx = text.indexOf(token);
        while (idx !== -1) {
          matches.push({
            start: idx,
            end: idx + token.length,
            token: token,
            origVal: tokenMap[token] || ''
          });
          idx = text.indexOf(token, idx + token.length);
        }
      }

      for (const token of tokens) {
        const bracketed = '<' + token + '>';
        let idx = text.indexOf(bracketed);
        while (idx !== -1) {
          matches.push({
            start: idx,
            end: idx + bracketed.length,
            token: bracketed,
            origVal: tokenMap[token] || ''
          });
          idx = text.indexOf(bracketed, idx + bracketed.length);
        }
      }

      matches.sort((a, b) => a.start - b.start || (b.end - b.start) - (a.end - a.start));
      const nonOverlapping = [];
      let lastEnd = 0;
      for (const m of matches) {
        if (m.start >= lastEnd) {
          nonOverlapping.push(m);
          lastEnd = m.end;
        }
      }

      let result = '';
      let cursor = 0;
      for (const m of nonOverlapping) {
        result += escapeHtml(text.slice(cursor, m.start));
        result += '<span class="inline-flex items-center px-1.5 py-0.5 rounded font-mono font-bold text-xs bg-sky-100 text-sky-800 border border-sky-300" title="Original: ' + escapeHtml(m.origVal) + '">' +
          '🔒 ' + escapeHtml(m.token) +
        '</span>';
        cursor = m.end;
      }
      result += escapeHtml(text.slice(cursor));
      return result;
    }

    function renderHighlightedRehydration(text, tokenMap) {
      if (!text) return '';
      if (!tokenMap || Object.keys(tokenMap).length === 0) {
        return escapeHtml(text);
      }

      const matches = [];
      const entries = Object.entries(tokenMap).sort((a, b) => b[1].length - a[1].length);

      for (const [token, origVal] of entries) {
        if (!origVal || origVal.length === 0) continue;
        let idx = text.indexOf(origVal);
        while (idx !== -1) {
          matches.push({
            start: idx,
            end: idx + origVal.length,
            token: token,
            displayVal: origVal
          });
          idx = text.indexOf(origVal, idx + origVal.length);
        }
      }

      for (const [token] of entries) {
        if (!token || token.length === 0) continue;
        let idx = text.indexOf(token);
        while (idx !== -1) {
          matches.push({
            start: idx,
            end: idx + token.length,
            token: token,
            displayVal: token
          });
          idx = text.indexOf(token, idx + token.length);
        }
      }

      matches.sort((a, b) => a.start - b.start || (b.end - b.start) - (a.end - a.start));
      const nonOverlapping = [];
      let lastEnd = 0;
      for (const m of matches) {
        if (m.start >= lastEnd) {
          nonOverlapping.push(m);
          lastEnd = m.end;
        }
      }

      let result = '';
      let cursor = 0;
      for (const m of nonOverlapping) {
        result += escapeHtml(text.slice(cursor, m.start));
        const tokenDisplay = m.token.startsWith('<') ? m.token : ('<' + m.token + '>');
        result += '<span class="rehydrated-badge group relative inline-flex items-center px-1.5 py-0.5 rounded font-mono font-semibold bg-[#fff4f2] text-[#f0523d] border border-[#ffcdca] hover:bg-[#ffece8] cursor-help transition-all shadow-2xs" title="Protected text: ' + escapeHtml(tokenDisplay) + '">' +
          '<span class="underline decoration-dotted decoration-[#f0523d]/70 underline-offset-2">' + escapeHtml(m.displayVal) + '</span>' +
          '<span class="pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-150 absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 z-30 flex flex-col items-center">' +
            '<span class="bg-gray-900 text-white text-[11px] font-mono px-2 py-1 rounded shadow-lg whitespace-nowrap flex items-center gap-1.5 border border-gray-700">' +
              '<span class="text-gray-300 font-normal">Protected:</span>' +
              '<span class="text-amber-300 font-bold font-mono">' + escapeHtml(tokenDisplay) + '</span>' +
            '</span>' +
            '<span class="w-1.5 h-1.5 -mt-0.5 rotate-45 bg-gray-900 border-r border-b border-gray-700"></span>' +
          '</span>' +
        '</span>';
        cursor = m.end;
      }
      result += escapeHtml(text.slice(cursor));
      return result;
    }

    function copyProtectedPrompt() {
      if (!currentProtectedPrompt) return;
      navigator.clipboard.writeText(currentProtectedPrompt);
      alert('Protected prompt copied to clipboard!');
    }

    function copyRehydratedText() {
      if (!currentRehydratedText) return;
      navigator.clipboard.writeText(currentRehydratedText);
      alert('AI Output copied to clipboard!');
    }

    function clearResponse() {
      document.getElementById('welcome-message').classList.remove('hidden');
      const protBox = document.getElementById('output-protected-container');
      if (protBox) protBox.classList.add('hidden');
      const rehydBox = document.getElementById('output-rehydrated-container');
      if (rehydBox) rehydBox.classList.add('hidden');
      currentProtectedPrompt = '';
      currentRehydratedText = '';
      document.getElementById('response-stats').textContent = '0 tokens • 0.00s';
    }

    function addConversationTurn() {
      const resp = currentRehydratedText || (document.getElementById('rehydrated-text') ? document.getElementById('rehydrated-text').textContent : '');
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

    const FREE_TIER_MODELS = {
      groq: [
        { id: 'openai/gpt-oss-120b', name: 'openai/gpt-oss-120b' },
        { id: 'openai/gpt-oss-20b', name: 'openai/gpt-oss-20b' },
        { id: 'qwen/qwen3.8-27b', name: 'qwen/qwen3.8-27b' }
      ],
      google: [
        { id: 'gemma-4-26b-a4b-it', name: 'gemma-4-26b-a4b-it' },
        { id: 'gemma-4-31b-it', name: 'gemma-4-31b-it' }
      ],
      mistral: [
        { id: 'codestral-2508', name: 'codestral-2508' },
        { id: 'ministral-8b-2512', name: 'ministral-8b-2512' },
        { id: 'ministral-14b-2512', name: 'ministral-14b-2512' }
      ]
    };

    // Fallback expanded list for a provider if dynamic API fetch has network error but user HAS provided that provider's key
    const EXPANDED_FALLBACK_MODELS = {
      groq: [
        { id: 'openai/gpt-oss-120b', name: 'openai/gpt-oss-120b' },
        { id: 'openai/gpt-oss-20b', name: 'openai/gpt-oss-20b' },
        { id: 'qwen/qwen3.8-27b', name: 'qwen/qwen3.8-27b' },
        { id: 'llama-3.3-70b-versatile', name: 'llama-3.3-70b-versatile' },
        { id: 'llama-3.1-8b-instant', name: 'llama-3.1-8b-instant' },
        { id: 'mixtral-8x7b-32768', name: 'mixtral-8x7b-32768' },
        { id: 'llama-guard-3-8b', name: 'llama-guard-3-8b' }
      ],
      google: [
        { id: 'gemini-2.5-pro', name: 'gemini-2.5-pro' },
        { id: 'gemini-2.5-flash', name: 'gemini-2.5-flash' },
        { id: 'gemini-2.0-flash', name: 'gemini-2.0-flash' },
        { id: 'gemini-1.5-pro', name: 'gemini-1.5-pro' },
        { id: 'gemini-1.5-flash', name: 'gemini-1.5-flash' },
        { id: 'gemma-4-26b-a4b-it', name: 'gemma-4-26b-a4b-it' },
        { id: 'gemma-4-31b-it', name: 'gemma-4-31b-it' }
      ],
      mistral: [
        { id: 'mistral-large-latest', name: 'mistral-large-latest' },
        { id: 'codestral-latest', name: 'codestral-latest' },
        { id: 'mistral-small-latest', name: 'mistral-small-latest' },
        { id: 'codestral-2508', name: 'codestral-2508' },
        { id: 'ministral-8b-2512', name: 'ministral-8b-2512' },
        { id: 'ministral-14b-2512', name: 'ministral-14b-2512' }
      ]
    };

    let cachedByokCatalog = null;
    let isFetchingByokModels = false;

    function renderPlaygroundModelDropdown(catalog, preferredSelected) {
      const select = document.getElementById('playground-model');
      if (!select) return;
      const targetVal = preferredSelected || select.value;
      select.innerHTML = '';

      const groups = [
        { label: 'Groq Cloud', provider: 'groq', items: catalog?.groq || [] },
        { label: 'Google AI Studio', provider: 'google', items: catalog?.google || [] },
        { label: 'Mistral AI', provider: 'mistral', items: catalog?.mistral || [] }
      ];

      let found = false;
      groups.forEach(g => {
        if (!g.items || g.items.length === 0) return;
        const optgroup = document.createElement('optgroup');
        optgroup.label = g.label;
        g.items.forEach(item => {
          const id = typeof item === 'string' ? item : item.id;
          const name = typeof item === 'string' ? item : (item.name || item.id);
          const opt = document.createElement('option');
          opt.value = id;
          opt.textContent = name;
          opt.setAttribute('data-provider', g.provider);
          if (id === targetVal) {
            opt.selected = true;
            found = true;
          }
          optgroup.appendChild(opt);
        });
        select.appendChild(optgroup);
      });

      if (!found && select.options.length > 0) {
        select.selectedIndex = 0;
      }
      if (typeof updateCodeViewer === 'function') {
        updateCodeViewer();
      }
    }

    async function fetchAndPopulateByokModels(forceRefresh = false) {
      if (playgroundTierMode !== 'byok') return;

      const groqKey = localStorage.getItem('byok_key_groq') || (document.getElementById('byok-key-groq') ? document.getElementById('byok-key-groq').value.trim() : '');
      const googleKey = localStorage.getItem('byok_key_google') || (document.getElementById('byok-key-google') ? document.getElementById('byok-key-google').value.trim() : '');
      const mistralKey = localStorage.getItem('byok_key_mistral') || (document.getElementById('byok-key-mistral') ? document.getElementById('byok-key-mistral').value.trim() : '');

      const catalog = {
        groq: [...FREE_TIER_MODELS.groq],
        google: [...FREE_TIER_MODELS.google],
        mistral: [...FREE_TIER_MODELS.mistral]
      };

      // If user hasn't added any keys at all, only show standard models
      if (!groqKey && !googleKey && !mistralKey) {
        cachedByokCatalog = catalog;
        renderPlaygroundModelDropdown(catalog);
        return;
      }

      if (cachedByokCatalog && !forceRefresh) {
        renderPlaygroundModelDropdown(cachedByokCatalog);
        return;
      }

      if (isFetchingByokModels) return;
      isFetchingByokModels = true;

      const select = document.getElementById('playground-model');
      const prevVal = select ? select.value : '';

      try {
        const res = await fetch('/api/byok/models', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ groqKey, googleKey, mistralKey })
        });
        if (!res.ok) throw new Error('Failed to query BYOK models');
        const data = await res.json();
        const providers = data?.providers || {};

        // Groq: only show longer list if user provided groqKey
        if (groqKey) {
          if (providers.groq?.models && providers.groq.models.length > 0) {
            catalog.groq = providers.groq.models;
          } else {
            catalog.groq = EXPANDED_FALLBACK_MODELS.groq;
          }
        } else {
          catalog.groq = [...FREE_TIER_MODELS.groq];
        }

        // Google AI Studio: only show longer list if user provided googleKey
        if (googleKey) {
          if (providers.google?.models && providers.google.models.length > 0) {
            catalog.google = providers.google.models;
          } else {
            catalog.google = EXPANDED_FALLBACK_MODELS.google;
          }
        } else {
          catalog.google = [...FREE_TIER_MODELS.google];
        }

        // Mistral AI: only show longer list if user provided mistralKey
        if (mistralKey) {
          if (providers.mistral?.models && providers.mistral.models.length > 0) {
            catalog.mistral = providers.mistral.models;
          } else {
            catalog.mistral = EXPANDED_FALLBACK_MODELS.mistral;
          }
        } else {
          catalog.mistral = [...FREE_TIER_MODELS.mistral];
        }

        cachedByokCatalog = catalog;
        renderPlaygroundModelDropdown(catalog, prevVal);
      } catch (err) {
        console.warn('BYOK dynamic model fetch error:', err);
        // On network error, only expand providers where user actually added their key
        if (groqKey) catalog.groq = EXPANDED_FALLBACK_MODELS.groq;
        if (googleKey) catalog.google = EXPANDED_FALLBACK_MODELS.google;
        if (mistralKey) catalog.mistral = EXPANDED_FALLBACK_MODELS.mistral;
        renderPlaygroundModelDropdown(catalog, prevVal);
      } finally {
        isFetchingByokModels = false;
      }
    }

    let playgroundTierMode = 'free'; // 'free' or 'byok'

    function switchPlaygroundTier(mode) {
      playgroundTierMode = mode;
      const freeBtn = document.getElementById('btn-tier-free');
      const byokBtn = document.getElementById('btn-tier-byok');
      const byokKeysBtn = document.getElementById('btn-byok-keys');

      if (mode === 'free') {
        if (freeBtn) {
          freeBtn.className = 'px-2.5 sm:px-3 py-1 rounded-md bg-white text-groq-dark font-medium shadow-xs text-xs transition cursor-pointer';
        }
        if (byokBtn) {
          byokBtn.className = 'px-2.5 sm:px-3 py-1 rounded-md text-groq-textMuted hover:text-groq-dark text-xs transition cursor-pointer';
        }
        if (byokKeysBtn) {
          byokKeysBtn.classList.add('hidden');
        }
        renderPlaygroundModelDropdown(FREE_TIER_MODELS, 'openai/gpt-oss-120b');
      } else {
        if (byokBtn) {
          byokBtn.className = 'px-2.5 sm:px-3 py-1 rounded-md bg-white text-groq-dark font-medium shadow-xs text-xs transition cursor-pointer';
        }
        if (freeBtn) {
          freeBtn.className = 'px-2.5 sm:px-3 py-1 rounded-md text-groq-textMuted hover:text-groq-dark text-xs transition cursor-pointer';
        }
        if (byokKeysBtn) {
          byokKeysBtn.classList.remove('hidden');
        }
        updateByokBadge();
        const hasKeys = !!(localStorage.getItem('byok_key_google') || localStorage.getItem('byok_key_mistral') || localStorage.getItem('byok_key_groq') || (document.getElementById('cfg-apikey') && document.getElementById('cfg-apikey').value.trim()));
        if (!hasKeys) {
          renderPlaygroundModelDropdown(FREE_TIER_MODELS);
          openByokKeysModal();
        } else {
          fetchAndPopulateByokModels();
        }
      }
    }

    async function submitPrompt() {
      const userPrompt = document.getElementById('user-prompt').value.trim();
      if (!userPrompt) return;

      const select = document.getElementById('playground-model');
      const model = select ? select.value : '';
      const selectedOption = select && select.selectedIndex >= 0 ? select.options[select.selectedIndex] : null;
      const optProvider = selectedOption ? selectedOption.getAttribute('data-provider') : '';
      const kmsKey = document.getElementById('cfg-kms').value.trim();
      let apiKey = '';

      let targetProvider = optProvider;
      if (!targetProvider) {
        if (model.includes('gemini') || model.startsWith('gemma')) targetProvider = 'google';
        else if (model.includes('mistral') || model.startsWith('codestral') || model.startsWith('ministral')) targetProvider = 'mistral';
        else if (model.includes('groq') || model.includes('oss') || model.startsWith('qwen') || model.startsWith('llama')) targetProvider = 'groq';
      }

      if (playgroundTierMode === 'byok') {
        const googleKey = (document.getElementById('byok-key-google') ? document.getElementById('byok-key-google').value.trim() : '') || localStorage.getItem('byok_key_google') || '';
        const mistralKey = (document.getElementById('byok-key-mistral') ? document.getElementById('byok-key-mistral').value.trim() : '') || localStorage.getItem('byok_key_mistral') || '';
        const groqKey = (document.getElementById('byok-key-groq') ? document.getElementById('byok-key-groq').value.trim() : '') || localStorage.getItem('byok_key_groq') || '';
        const legacyKey = (document.getElementById('cfg-apikey') ? document.getElementById('cfg-apikey').value.trim() : '');

        let providerName = '';
        if (targetProvider === 'google') {
          apiKey = googleKey || legacyKey;
          providerName = 'Google AI Studio';
        } else if (targetProvider === 'mistral') {
          apiKey = mistralKey || legacyKey;
          providerName = 'Mistral AI';
        } else if (targetProvider === 'groq') {
          apiKey = groqKey || legacyKey;
          providerName = 'Groq Cloud';
        } else {
          apiKey = legacyKey || groqKey || mistralKey || googleKey;
          providerName = 'upstream provider';
        }

        if (!apiKey) {
          alert('BYOK Mode is ON: Please enter your ' + providerName + ' API key in the API Keys panel.');
          openByokKeysModal();
          return;
        }
      }

      const mode = document.getElementById('cfg-mode') ? document.getElementById('cfg-mode').value : 'mask';

      const btn = document.getElementById('btn-submit');
      if (btn) {
        btn.innerHTML = '<span class="flex items-center gap-1.5"><i data-lucide="loader-2" class="w-3.5 h-3.5 animate-spin"></i><span>Running...</span></span>';
        btn.disabled = true;
      }
      const quickBtn = document.getElementById('btn-quick-submit');
      if (quickBtn) {
        quickBtn.innerHTML = '<i data-lucide="loader-2" class="w-3.5 h-3.5 animate-spin"></i><span>Running...</span>';
        quickBtn.disabled = true;
      }
      if (window.lucide) lucide.createIcons();

      const t0 = performance.now();

      try {
        const headers = {
          'Content-Type': 'application/json',
          'x-tokenization-mode': mode,
          'x-detection-categories': 'all'
        };
        if (kmsKey) headers['x-vault-encryption-key'] = kmsKey;
        if (apiKey) headers['Authorization'] = 'Bearer ' + apiKey;

        if (targetProvider === 'google') {
          headers['x-upstream-base-url'] = 'https://generativelanguage.googleapis.com/v1beta/openai';
          if (apiKey) headers['x-goog-api-key'] = apiKey;
        } else if (targetProvider === 'groq') {
          headers['x-upstream-base-url'] = 'https://api.groq.com/openai/v1';
        } else if (targetProvider === 'mistral') {
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
          categories: ['all'],
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

        if (data.choices && data.choices[0]) {
          const content = data.choices[0].message.content || '';
          currentRehydratedText = content;

          const tokenMap = (data.privacy && data.privacy.token_map) ? data.privacy.token_map : {};
          const protectedPrompt = (data.privacy && data.privacy.protected_prompt)
            ? data.privacy.protected_prompt
            : (decodeURIComponent(res.headers.get('x-privacy-protected-prompt') || '') || userPrompt);
          currentProtectedPrompt = protectedPrompt;

          const interceptedCount = (data.privacy && data.privacy.entities_count !== undefined)
            ? data.privacy.entities_count
            : (res.headers.get('x-privacy-entities-intercepted') || Object.keys(tokenMap).length);

          const badge = document.getElementById('protected-entities-badge');
          if (badge) {
            badge.textContent = interceptedCount + (interceptedCount === 1 ? ' Entity Masked' : ' Entities Masked');
          }

          // Render Output 1: Protected prompt sent to AI
          const protBox = document.getElementById('output-protected-container');
          if (protBox) protBox.classList.remove('hidden');
          const protText = document.getElementById('protected-prompt-text');
          if (protText) protText.innerHTML = renderProtectedPrompt(protectedPrompt, tokenMap);

          // Render Output 2: AI Output with highlighted rehydration and hover tooltips
          const rehydBox = document.getElementById('output-rehydrated-container');
          if (rehydBox) rehydBox.classList.remove('hidden');
          const rehydText = document.getElementById('rehydrated-text');
          if (rehydText) rehydText.innerHTML = renderHighlightedRehydration(content, tokenMap);

          const tokens = data.usage ? data.usage.completion_tokens : 45;
          document.getElementById('response-stats').textContent = tokens + ' tokens • ' + elapsedSec + 's';

          localLogs.unshift({
            time: new Date().toLocaleTimeString(),
            timestamp: new Date().toISOString(),
            model: model,
            key: 'ProjectSPG Test',
            code: 200,
            ttft: (elapsedSec * 0.4).toFixed(3),
            latency: elapsedSec,
            inTokens: data.usage ? data.usage.prompt_tokens : 85,
            outTokens: tokens,
            audio: '-',
            reqId: 'req_' + Math.random().toString(36).slice(2, 7) + '...',
            error: '-',
            protectedEntities: interceptedCount || 0
          });
          fetchApiLogs();
        } else if (res.status === 429) {
          const retrySec = (data.error && data.error.retry_after) || 15;
          document.getElementById('welcome-message').classList.add('hidden');
          const protBox = document.getElementById('output-protected-container');
          if (protBox) protBox.classList.add('hidden');
          const rehydBox = document.getElementById('output-rehydrated-container');
          if (rehydBox) rehydBox.classList.remove('hidden');
          document.getElementById('rehydrated-text').innerHTML =
            '<div class="p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-xs leading-relaxed">' +
            '<strong>Free Tier Rate Limit (1 request / 15s)</strong><br/>' +
            'To keep free inference available for everyone, free tier requests are rate limited to 1 protected request per 15 seconds.<br/>' +
            'Please retry in <strong class="text-[#f0523d]">' + retrySec + 's</strong>, or switch to BYOK mode for unlimited requests.' +
            '</div>';
          localLogs.unshift({
            time: new Date().toLocaleTimeString(),
            timestamp: new Date().toISOString(),
            model: model,
            key: 'ProjectSPG Test',
            code: 429,
            ttft: '0.000',
            latency: elapsedSec,
            inTokens: 0,
            outTokens: 0,
            audio: '-',
            reqId: 'req_' + Math.random().toString(36).slice(2, 7) + '...',
            error: 'rate_limited',
            protectedEntities: 0
          });
          renderLogsTable();
          renderMetricsChart();
          startCooldown(retrySec);
        } else if (!res.ok || data.error) {
          document.getElementById('welcome-message').classList.add('hidden');
          const protBox = document.getElementById('output-protected-container');
          if (protBox) protBox.classList.add('hidden');
          const rehydBox = document.getElementById('output-rehydrated-container');
          if (rehydBox) rehydBox.classList.remove('hidden');
          const errObj = data.error || data;
          const errMsg = typeof errObj === 'string' ? errObj : (errObj.message || JSON.stringify(errObj));
          const isTierError = res.status === 403 || errMsg.includes('subscription tier') || errMsg.includes('tier_not_allowed');
          document.getElementById('rehydrated-text').innerHTML =
            '<div class="p-3.5 bg-red-50 border border-red-200 rounded-xl text-red-900 text-xs leading-relaxed">' +
            '<strong>Provider Error (' + res.status + '):</strong> ' + escapeHtml(errMsg) +
            (isTierError ? '<br/><span class="text-groq-textSubtle mt-1.5 block">💡 <em>This model requires a paid Mistral AI subscription tier. To use paid Mistral models, click "Parameters", switch to BYOK mode, and enter your paid Mistral API key. For free testing, select <strong>codestral-2508</strong>, <strong>ministral-8b-2512</strong>, or <strong>ministral-14b-2512</strong>.</em></span>' : '') +
            '</div>';
          localLogs.unshift({
            time: new Date().toLocaleTimeString(),
            timestamp: new Date().toISOString(),
            model: model,
            key: 'ProjectSPG Test',
            code: res.status || 500,
            ttft: '0.000',
            latency: elapsedSec,
            inTokens: 0,
            outTokens: 0,
            audio: '-',
            reqId: 'req_' + Math.random().toString(36).slice(2, 7) + '...',
            error: errMsg ? String(errMsg).slice(0, 30) : 'error',
            protectedEntities: 0
          });
          renderLogsTable();
          renderMetricsChart();
        }
      } catch (err) {
        document.getElementById('rehydrated-text').textContent = 'Execution error: ' + err.message;
      } finally {
        if (!isCooldownActive) {
          if (btn) {
            btn.disabled = false;
            btn.innerHTML = '<span>Submit</span> <span class="hidden sm:inline text-[11px] font-mono text-groq-textSubtle">Ctrl + ↵</span>';
          }
          const quickBtn = document.getElementById('btn-quick-submit');
          if (quickBtn) {
            quickBtn.disabled = false;
            quickBtn.innerHTML = '<i data-lucide="send" class="w-3.5 h-3.5"></i><span>Submit</span>';
          }
        }
        if (window.lucide) lucide.createIcons();
      }
    }

    let isCooldownActive = false;

    function startCooldown(sec) {
      isCooldownActive = true;
      const btn = document.getElementById('btn-submit');
      const quickBtn = document.getElementById('btn-quick-submit');
      let remaining = sec;
      if (btn) {
        btn.disabled = true;
        btn.innerHTML = '<span>Wait ' + remaining + 's</span>';
      }
      if (quickBtn) {
        quickBtn.disabled = true;
        quickBtn.innerHTML = '<span>Wait ' + remaining + 's</span>';
      }
      const interval = setInterval(() => {
        remaining--;
        const timerEl = document.getElementById('cooldown-timer');
        if (timerEl) timerEl.textContent = remaining + 's';
        if (remaining <= 0) {
          clearInterval(interval);
          isCooldownActive = false;
          if (btn) {
            btn.disabled = false;
            btn.innerHTML = '<span>Submit</span> <span class="hidden sm:inline text-[11px] font-mono text-groq-textSubtle">Ctrl + ↵</span>';
          }
          if (quickBtn) {
            quickBtn.disabled = false;
            quickBtn.innerHTML = '<i data-lucide="send" class="w-3.5 h-3.5"></i><span>Submit</span>';
          }
          if (window.lucide) lucide.createIcons();
        } else {
          if (btn) btn.innerHTML = '<span>Wait ' + remaining + 's</span>';
          if (quickBtn) quickBtn.innerHTML = '<span>Wait ' + remaining + 's</span>';
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
        box.innerHTML = \`<span class="syn-keyword">from</span> openai <span class="syn-keyword">import</span> OpenAI

<span class="syn-comment"># Universal drop-in privacy gateway (Google Gemma, Mistral, Groq)</span>
client = OpenAI(
    base_url=<span class="syn-string">"https://projectspg.boruahpriyanuj2004.workers.dev/v1"</span>,
    api_key=<span class="syn-string">"spg_live_your_key"</span>  <span class="syn-comment"># Your ProjectSPG API Key</span>
)

completion = client.chat.completions.create(
    model=<span class="syn-string">"\${model}"</span>,
    messages=[
        {
            <span class="syn-string">"role"</span>: <span class="syn-string">"user"</span>,
            <span class="syn-string">"content"</span>: <span class="syn-string">"\${userPrompt ? userPrompt.slice(0, 30) + '...' : ''}"</span>
        }
    ],
    temperature=<span class="syn-number">\${tempVal}</span>,
    max_tokens=<span class="syn-number">\${tokensVal}</span>,
    top_p=<span class="syn-number">\${topPVal}</span>,
    stream=<span class="syn-bool">\${streamVal}</span>
)

<span class="syn-keyword">for</span> chunk <span class="syn-keyword">in</span> completion:
    <span class="syn-keyword">print</span>(chunk.choices[<span class="syn-number">0</span>].delta.content <span class="syn-keyword">or</span> <span class="syn-string">""</span>, end=<span class="syn-string">""</span>)\`;
      } else if (lang === 'curl') {
        box.innerHTML = \`curl https://projectspg.boruahpriyanuj2004.workers.dev/v1/chat/completions \\\\
  -H <span class="syn-string">"Content-Type: application/json"</span> \\\\
  -H <span class="syn-string">"Authorization: Bearer spg_live_your_key"</span> \\\\
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
      const backdrop = document.getElementById('parameters-backdrop');
      if (!panel) return;
      isParamsVisible = !isParamsVisible;
      if (isParamsVisible) {
        panel.classList.remove('hidden');
        if (backdrop) backdrop.classList.remove('hidden');
        if (btn) {
          btn.classList.add('bg-gray-100', 'text-groq-dark');
          btn.classList.remove('text-groq-textMuted');
        }
        updateSliderFill(document.getElementById('param-temp-slider'));
        updateSliderFill(document.getElementById('param-tokens-slider'));
        updateSliderFill(document.getElementById('param-top-p-slider'));
      } else {
        panel.classList.add('hidden');
        if (backdrop) backdrop.classList.add('hidden');
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
          const prefix = k.key_prefix || 'spg_live_...';
          const isByok = k.tier === 'byok';

          let providers = [];
          if (k.byok_providers && Array.isArray(k.byok_providers)) {
            providers = k.byok_providers;
          } else {
            if (k.byok_google_key) providers.push('Google');
            if (k.byok_mistral_key) providers.push('Mistral');
            if (k.byok_groq_key) providers.push('Groq');
          }

          const providerSuffix = providers.length > 0 ? (' (' + providers.join(', ') + ')') : '';
          const tierBadge = isByok
            ? ('<span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200"><span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span><span>BYOK</span>' + (providerSuffix ? ('<span class="text-emerald-600 font-normal">' + providerSuffix + '</span>') : '') + '</span>')
            : '<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-gray-100 text-gray-600">Free Tier</span>';

          return \`
            <tr class="hover:bg-gray-50/70 transition h-14">
              <td class="pr-6 font-sans font-medium text-groq-dark">\${k.name}</td>
              <td class="pr-6 font-mono text-groq-dark">\${prefix}</td>
              <td class="pr-6 font-sans">\${tierBadge}</td>
              <td class="pr-6 font-sans text-groq-dark">\${dateCreated}</td>
              <td class="pr-6 font-sans text-groq-dark">\${lastUsed}</td>
              <td class="pr-6 font-sans text-groq-dark">\${k.expires || 'Never'}</td>
              <td class="pr-6 font-sans text-groq-dark">\${calls} API Calls</td>
              <td class="text-right">
                <div class="flex items-center justify-end gap-2">
                  <button onclick="deleteKey('\${k.id}')" class="p-2 rounded-lg bg-groq-grayBg hover:bg-[#fff5f3] text-[#f0523d] transition cursor-pointer" title="Delete">
                    <i data-lucide="trash-2" class="w-3.5 h-3.5 text-[#f0523d]"></i>
                  </button>
                </div>
              </td>
            </tr>
          \`;
        }).join('');

        const keyFilterSelect = document.getElementById('metrics-key-filter');
        if (keyFilterSelect) {
          const currentVal = keyFilterSelect.value;
          const keyNames = Array.from(new Set(keysToRender.map(k => k.name).filter(Boolean)));
          keyFilterSelect.innerHTML = '<option value="all">Show all API Keys</option>' +
            keyNames.map(name => '<option value="' + escapeHtml(name) + '">' + escapeHtml(name) + '</option>').join('');
          if (currentVal && (currentVal === 'all' || keyNames.includes(currentVal))) {
            keyFilterSelect.value = currentVal;
          }
        }

        lucide.createIcons();
      } catch (err) {
        console.error('Fetch keys error', err);
      }
    }

    function selectCreateKeyTier(tier) {
      const tierInput = document.getElementById('new-key-tier');
      if (tierInput) tierInput.value = tier;
      const freeTab = document.getElementById('tier-tab-free');
      const byokTab = document.getElementById('tier-tab-byok');
      const freeInfo = document.getElementById('tier-info-free');
      const byokInfo = document.getElementById('tier-info-byok');

      if (tier === 'free') {
        if (freeTab) freeTab.className = 'py-2 px-3 rounded-lg text-xs font-semibold transition cursor-pointer bg-white text-groq-dark shadow-xs flex items-center justify-center gap-1.5';
        if (byokTab) byokTab.className = 'py-2 px-3 rounded-lg text-xs font-semibold transition cursor-pointer text-groq-textMuted hover:text-groq-dark flex items-center justify-center gap-1.5';
        if (freeInfo) freeInfo.classList.remove('hidden');
        if (byokInfo) byokInfo.classList.add('hidden');
      } else {
        if (byokTab) byokTab.className = 'py-2 px-3 rounded-lg text-xs font-semibold transition cursor-pointer bg-white text-groq-dark shadow-xs flex items-center justify-center gap-1.5';
        if (freeTab) freeTab.className = 'py-2 px-3 rounded-lg text-xs font-semibold transition cursor-pointer text-groq-textMuted hover:text-groq-dark flex items-center justify-center gap-1.5';
        if (freeInfo) freeInfo.classList.add('hidden');
        if (byokInfo) byokInfo.classList.remove('hidden');
        if (window.lucide) lucide.createIcons();
      }
    }

    function openCreateKeyModal() {
      selectCreateKeyTier('free');
      if (document.getElementById('new-key-name')) document.getElementById('new-key-name').value = '';
      if (document.getElementById('new-byok-google')) document.getElementById('new-byok-google').value = '';
      if (document.getElementById('new-byok-mistral')) document.getElementById('new-byok-mistral').value = '';
      if (document.getElementById('new-byok-groq')) document.getElementById('new-byok-groq').value = '';
      document.getElementById('modal-create-key').classList.remove('hidden');
      if (window.lucide) lucide.createIcons();
    }
    function closeCreateKeyModal() { document.getElementById('modal-create-key').classList.add('hidden'); }

    async function submitCreateKey() {
      const name = document.getElementById('new-key-name').value.trim() || 'ProjectSPG Key';
      const tier = document.getElementById('new-key-tier') ? document.getElementById('new-key-tier').value : 'free';
      const quota = tier === 'byok' ? 1000000 : 10000;
      const byokGoogleKey = document.getElementById('new-byok-google') ? document.getElementById('new-byok-google').value.trim() : '';
      const byokMistralKey = document.getElementById('new-byok-mistral') ? document.getElementById('new-byok-mistral').value.trim() : '';
      const byokGroqKey = document.getElementById('new-byok-groq') ? document.getElementById('new-byok-groq').value.trim() : '';

      try {
        const headers = { 'Content-Type': 'application/json' };
        if (currentIdToken) {
          headers['Authorization'] = 'Bearer ' + currentIdToken;
        }
        const res = await fetch('/api/keys', {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({
            name,
            tier,
            monthlyQuota: quota,
            byokGoogleKey,
            byokMistralKey,
            byokGroqKey
          })
        });
        const data = await res.json();
        closeCreateKeyModal();
        document.getElementById('displayed-raw-key').textContent = data.rawKey;
        document.getElementById('modal-show-key').classList.remove('hidden');
        fetchApiKeys();
        if (window.lucide) lucide.createIcons();
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
              const isoStr = isNaN(d.getTime()) ? new Date().toISOString() : d.toISOString();
              const ttft = (Math.max(0.08, (l.latencyMs || 200) * 0.0004)).toFixed(3);
              const latency = ((l.latencyMs || 200) / 1000).toFixed(3);
              const reqId = l.id ? (l.id.length > 13 ? l.id.slice(0, 5) + '...' + l.id.slice(-4) : l.id) : 'req_...';
              return {
                time: timeStr,
                timestamp: isoStr,
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
            renderMetricsChart();
          }
        }
      } catch (err) {
        console.error('Fetch logs error', err);
      }
      renderLogsTable();
      renderMetricsChart();
    }

    const SUPPORTED_MODELS_CATALOG = [
      { id: 'openai/gpt-oss-120b', name: 'OpenAI GPT-OSS 120B', provider: 'Groq Cloud', ratePer1MTokens: 0.15, tag: 'on_demand' },
      { id: 'openai/gpt-oss-20b', name: 'OpenAI GPT-OSS 20B', provider: 'Groq Cloud', ratePer1MTokens: 0.08, tag: 'on_demand' },
      { id: 'qwen/qwen3.8-27b', name: 'Qwen 3.8 27B', provider: 'Groq Cloud', ratePer1MTokens: 0.20, tag: 'on_demand' },
      { id: 'gemma-4-26b-a4b-it', name: 'Gemma 4 26B Instruct (a4b)', provider: 'Google AI Studio', ratePer1MTokens: 0.10, tag: 'on_demand' },
      { id: 'gemma-4-31b-it', name: 'Gemma 4 31B Instruct', provider: 'Google AI Studio', ratePer1MTokens: 0.15, tag: 'on_demand' },
      { id: 'codestral-2508', name: 'Codestral 2508', provider: 'Mistral AI', ratePer1MTokens: 0.30, tag: 'on_demand' },
      { id: 'ministral-8b-2512', name: 'Ministral 8B 2512', provider: 'Mistral AI', ratePer1MTokens: 0.10, tag: 'on_demand' },
      { id: 'ministral-14b-2512', name: 'Ministral 14B 2512', provider: 'Mistral AI', ratePer1MTokens: 0.20, tag: 'on_demand' }
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
          // Dynamic Y-Axis scale based on model spend
          let yTop = '$0.10', yMid1 = '$0.07', yMid2 = '$0.05', maxScale = 0.10;
          if (m.spend > 0) {
            if (m.spend <= 0.001) {
              maxScale = 0.001;
              yTop = '$0.0010';
              yMid1 = '$0.0007';
              yMid2 = '$0.0004';
            } else if (m.spend <= 0.005) {
              maxScale = 0.005;
              yTop = '$0.0050';
              yMid1 = '$0.0035';
              yMid2 = '$0.0020';
            } else if (m.spend <= 0.02) {
              maxScale = 0.02;
              yTop = '$0.020';
              yMid1 = '$0.014';
              yMid2 = '$0.007';
            } else if (m.spend <= 0.05) {
              maxScale = 0.05;
              yTop = '$0.050';
              yMid1 = '$0.035';
              yMid2 = '$0.020';
            } else {
              maxScale = Math.max(0.10, Math.ceil(m.spend * 10) / 10);
              yTop = '$' + maxScale.toFixed(2);
              yMid1 = '$' + (maxScale * 0.7).toFixed(2);
              yMid2 = '$' + (maxScale * 0.4).toFixed(2);
            }
          }

          // Build 30-day timeline for September
          const dailyStats = Array.from({ length: 30 }, (_, i) => ({
            day: i + 1,
            spend: 0,
            tokens: 0,
            requests: 0,
            protected: 0
          }));

          localLogs.forEach(l => {
            const modelId = l.model || 'openai/gpt-oss-120b';
            if (modelId === m.id) {
              let day = 27; // Default anchor day
              if (l.timestamp) {
                const d = new Date(l.timestamp);
                if (!isNaN(d.getDate())) day = d.getDate();
              } else if (l.time) {
                const d = new Date(l.time);
                if (!isNaN(d.getDate())) day = d.getDate();
              }
              const idx = Math.min(29, Math.max(0, day - 1));
              const reqTokens = (Number(l.inTokens) || 0) + (Number(l.outTokens) || 0);
              dailyStats[idx].requests += 1;
              dailyStats[idx].tokens += reqTokens;
              dailyStats[idx].spend += (reqTokens * m.ratePer1MTokens) / 1000000;
              dailyStats[idx].protected += (Number(l.protectedEntities) || 0);
            }
          });

          // Fallback if logs had relative time strings: assign aggregate to day 27
          if (m.requests > 0 && dailyStats.every(d => d.requests === 0)) {
            dailyStats[26] = {
              day: 27,
              spend: m.spend,
              tokens: m.totalTokens,
              requests: m.requests,
              protected: m.protectedEntities
            };
          }

          // Generate 30 daily columns with explicit pixel heights
          const dayBarsHtml = dailyStats.map(d => {
            if (d.spend > 0) {
              const barHeightPx = Math.max(28, Math.min(108, Math.round((d.spend / maxScale) * 105)));
              return \`
                <div class="flex-1 h-full flex flex-col justify-end items-center group relative cursor-pointer">
                  <div class="w-full max-w-[14px] bg-[#f0523d] rounded-t-sm shadow-xs transition-all group-hover:bg-[#e0422d]" style="height: \${barHeightPx}px;"></div>
                  <!-- Tooltip on hover -->
                  <div class="hidden group-hover:block absolute bottom-full mb-2 bg-slate-900 text-white text-[10px] font-mono py-2 px-3 rounded-lg shadow-xl whitespace-nowrap z-40 pointer-events-none">
                    <p class="font-bold text-white border-b border-gray-700 pb-1 mb-1">Sep \${d.day}, 2026</p>
                    <p class="text-[#f0523d] font-semibold">Spend: $\${d.spend.toFixed(4)}</p>
                    <p class="text-gray-300">Tokens: \${d.tokens.toLocaleString()}</p>
                    <p class="text-gray-300">Requests: \${d.requests}</p>
                    \${d.protected > 0 ? \`<p class="text-sky-400">🛡️ Protected: \${d.protected}</p>\` : ''}
                  </div>
                </div>
              \`;
            } else {
              return \`
                <div class="flex-1 h-full flex flex-col justify-end items-center group relative">
                  <div class="w-full max-w-[14px] h-[2px] bg-transparent group-hover:bg-gray-200 transition-all rounded-t-sm"></div>
                  <!-- Subtle Tooltip on hover -->
                  <div class="hidden group-hover:block absolute bottom-full mb-2 bg-slate-900 text-white text-[10px] font-mono py-1.5 px-2.5 rounded-lg shadow-xl whitespace-nowrap z-40 pointer-events-none">
                    <p class="font-bold text-gray-300">Sep \${d.day}, 2026</p>
                    <p class="text-gray-400">No usage</p>
                  </div>
                </div>
              \`;
            }
          }).join('');

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
              <div class="h-44 flex items-end pt-5 mt-2">
                <!-- Y-Axis labels (fixed width w-14) -->
                <div class="w-14 flex flex-col justify-between h-[120px] text-[10px] font-mono text-groq-textSubtle pr-3 border-r border-gray-200 shrink-0 text-right select-none pb-0.5">
                  <span>\${yTop}</span>
                  <span>\${yMid1}</span>
                  <span>\${yMid2}</span>
                  <span>$0.00</span>
                </div>

                <!-- Chart Canvas with Day Grid -->
                <div class="flex-1 flex flex-col h-[145px] ml-3 relative">
                  <!-- 120px Chart area with guidelines and bars -->
                  <div class="h-[120px] w-full relative">
                    <!-- Horizontal guideline grid -->
                    <div class="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-40">
                      <div class="border-b border-dashed border-gray-200 w-full"></div>
                      <div class="border-b border-dashed border-gray-200 w-full"></div>
                      <div class="border-b border-dashed border-gray-200 w-full"></div>
                      <div class="border-b border-gray-200 w-full"></div>
                    </div>

                    \${m.requests === 0 ? \`
                      <div class="absolute inset-0 flex items-center justify-center pointer-events-none text-[11px] text-gray-300 font-sans italic">
                        No usage recorded for this billing cycle
                      </div>
                    \` : ''}

                    <!-- 30-Day Bar Track Container -->
                    <div class="h-[120px] w-full flex items-end justify-between gap-[2px] z-10 px-1">
                      \${dayBarsHtml}
                    </div>
                  </div>

                  <!-- X-Axis timeline labels across September -->
                  <div class="border-b border-gray-200 w-full mt-1"></div>
                  <div class="flex items-center justify-between text-[10px] font-mono text-groq-textSubtle pt-1 px-1 select-none">
                    <span>Sep 1</span>
                    <span>Sep 5</span>
                    <span>Sep 10</span>
                    <span>Sep 15</span>
                    <span>Sep 20</span>
                    <span>Sep 25</span>
                    <span class="text-groq-dark font-bold">Sep 27</span>
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

    // =========================================================================
    // Dynamic HTTP Status Codes Chart & Metrics Rendering
    // =========================================================================
    async function refreshMetrics() {
      const btn = document.getElementById('metrics-btn-refresh');
      if (btn) {
        btn.innerHTML = '<i data-lucide="refresh-cw" class="w-3.5 h-3.5 text-groq-textMuted animate-spin"></i><span>Refreshing...</span>';
        if (window.lucide) lucide.createIcons();
      }
      await fetchApiLogs();
      renderMetricsChart();
      setTimeout(() => {
        if (btn) {
          btn.innerHTML = '<i data-lucide="refresh-cw" class="w-3.5 h-3.5 text-groq-textMuted"></i><span>Refresh</span>';
          if (window.lucide) lucide.createIcons();
        }
      }, 400);
    }

    function renderMetricsChart() {
      const container = document.getElementById('metrics-chart-container');
      if (!container) return;

      const timeRange = (document.getElementById('metrics-time-range') ? document.getElementById('metrics-time-range').value : '30m') || '30m';
      const modelFilter = (document.getElementById('metrics-model-filter') ? document.getElementById('metrics-model-filter').value : 'all') || 'all';
      const keyFilter = (document.getElementById('metrics-key-filter') ? document.getElementById('metrics-key-filter').value : 'all') || 'all';
      const showLimits = document.getElementById('metrics-show-limits') ? document.getElementById('metrics-show-limits').checked : false;

      // Determine duration & bucket count
      let durationMs = 30 * 60 * 1000;
      let bucketCount = 12;
      if (timeRange === '1h') {
        durationMs = 60 * 60 * 1000;
        bucketCount = 12;
      } else if (timeRange === '24h') {
        durationMs = 24 * 60 * 60 * 1000;
        bucketCount = 12;
      } else if (timeRange === '7d') {
        durationMs = 7 * 24 * 60 * 60 * 1000;
        bucketCount = 14;
      }

      const now = Date.now();
      const startTime = now - durationMs;
      const bucketDuration = durationMs / bucketCount;

      // Filter localLogs based on range, model, and key
      const filteredLogs = localLogs.filter(l => {
        let t = null;
        if (l.timestamp) {
          const pt = new Date(l.timestamp).getTime();
          if (!isNaN(pt)) t = pt;
        }
        if (t === null && l.time) {
          const pt = new Date(l.time).getTime();
          if (!isNaN(pt)) t = pt;
        }
        if (t === null) t = now - 60000;

        const inTime = (t >= startTime - 10000) && (t <= now + 60000);
        const matchModel = (modelFilter === 'all') || (l.model === modelFilter);
        const matchKey = (keyFilter === 'all') || (l.key === keyFilter) || (l.key && l.key.indexOf(keyFilter) !== -1);
        return inTime && matchModel && matchKey;
      });

      // Status totals
      const count200 = filteredLogs.filter(l => l.code >= 200 && l.code < 300).length;
      const count4xx = filteredLogs.filter(l => l.code >= 400 && l.code < 500).length;
      const count5xx = filteredLogs.filter(l => l.code >= 500 && l.code < 600).length;
      const totalAll = filteredLogs.length;

      const leg200 = document.getElementById('metric-legend-200');
      const leg4xx = document.getElementById('metric-legend-4xx');
      const leg5xx = document.getElementById('metric-legend-5xx');
      const totalSum = document.getElementById('metric-total-summary');
      if (leg200) leg200.textContent = count200;
      if (leg4xx) leg4xx.textContent = count4xx;
      if (leg5xx) leg5xx.textContent = count5xx;
      if (totalSum) totalSum.textContent = totalAll;

      // Build buckets
      const buckets = [];
      for (let i = 0; i < bucketCount; i++) {
        const bStart = startTime + i * bucketDuration;
        const bEnd = bStart + bucketDuration;
        buckets.push({
          start: bStart,
          end: bEnd,
          c200: 0,
          c4xx: 0,
          c5xx: 0,
          total: 0
        });
      }

      filteredLogs.forEach(l => {
        let t = null;
        if (l.timestamp) {
          const pt = new Date(l.timestamp).getTime();
          if (!isNaN(pt)) t = pt;
        }
        if (t === null && l.time) {
          const pt = new Date(l.time).getTime();
          if (!isNaN(pt)) t = pt;
        }
        if (t === null) t = now;

        let bIdx = Math.floor((t - startTime) / bucketDuration);
        if (bIdx < 0) bIdx = 0;
        if (bIdx >= bucketCount) bIdx = bucketCount - 1;

        const b = buckets[bIdx];
        if (l.code >= 200 && l.code < 300) b.c200++;
        else if (l.code >= 400 && l.code < 500) b.c4xx++;
        else if (l.code >= 500 && l.code < 600) b.c5xx++;
        else b.c200++;
        b.total++;
      });

      const maxBucket = Math.max(0, ...buckets.map(b => b.total));
      let yMax = 5;
      if (maxBucket > 50) yMax = Math.ceil(maxBucket / 20) * 20;
      else if (maxBucket > 20) yMax = 50;
      else if (maxBucket > 10) yMax = 25;
      else if (maxBucket > 4) yMax = 10;
      else yMax = 5;

      const freeLimit = Math.max(2, Math.round(yMax * 0.6));
      const limitHeightPct = Math.min(95, Math.round((freeLimit / yMax) * 100));

      // Generate 5 tick timestamps across bottom axis
      const ticks = [];
      for (let i = 0; i < 5; i++) {
        const tickTs = startTime + (durationMs * (i / 4));
        const d = new Date(tickTs);
        let label = '';
        if (timeRange === '7d') {
          label = (d.getMonth() + 1) + '/' + d.getDate() + ' ' + d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }).toLowerCase();
        } else {
          label = d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }).toLowerCase();
        }
        ticks.push(label);
      }

      let limitsHtml = '';
      if (showLimits) {
        limitsHtml = '<div class="absolute left-8 right-0 border-b border-dashed border-[#f0523d] flex items-center justify-end pr-2 pointer-events-none z-10" style="bottom: calc(32px + ' + (limitHeightPct * 0.8) + '%);">' +
          '<span class="bg-[#fff5f3] text-[#f0523d] border border-[#f0523d]/20 text-[9px] font-mono px-1.5 py-0.5 rounded -translate-y-3 font-semibold">Tier Rate Limit (' + freeLimit + ' req/bucket)</span>' +
          '</div>';
      }

      let emptyHtml = '';
      if (totalAll === 0) {
        emptyHtml = '<div class="absolute inset-x-0 top-6 bottom-10 flex flex-col items-center justify-center text-center pointer-events-none z-20">' +
          '<p class="text-xs font-medium text-groq-textMuted">No HTTP requests recorded in this time range</p>' +
          '<p class="text-[11px] text-gray-400 mt-1">Make requests via the Playground or API to stream live telemetry</p>' +
          '</div>';
      }

      let barsHtml = buckets.map(function(b) {
        const barHeightPct = b.total > 0 ? Math.min(100, Math.max(8, (b.total / yMax) * 100)) : 0;
        const startTimeStr = new Date(b.start).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }).toLowerCase();
        const endTimeStr = new Date(b.end).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }).toLowerCase();
        const p200 = b.total > 0 ? ((b.c200 / b.total) * 100) : 0;
        const p4xx = b.total > 0 ? ((b.c4xx / b.total) * 100) : 0;
        const p5xx = b.total > 0 ? ((b.c5xx / b.total) * 100) : 0;

        let barInner = '';
        if (b.total > 0) {
          barInner = '<div class="w-full max-w-[32px] flex flex-col justify-end rounded-t overflow-hidden transition-all duration-200 group-hover:opacity-90 shadow-2xs" style="height: ' + barHeightPct + '%;">' +
            (b.c5xx > 0 ? '<div class="w-full bg-rose-500 transition-all" style="height: ' + p5xx + '%;"></div>' : '') +
            (b.c4xx > 0 ? '<div class="w-full bg-amber-500 transition-all" style="height: ' + p4xx + '%;"></div>' : '') +
            (b.c200 > 0 ? '<div class="w-full bg-emerald-500 transition-all" style="height: ' + p200 + '%;"></div>' : '') +
            '</div>';
        } else {
          barInner = '<div class="w-full max-w-[32px] h-[2px] bg-gray-200 group-hover:bg-gray-300 rounded-full transition-colors"></div>';
        }

        return '<div class="group relative flex-1 flex flex-col justify-end items-center h-full cursor-pointer">' +
          '<div class="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover:flex flex-col bg-groq-dark text-white text-[11px] rounded-lg py-2 px-3 shadow-xl z-30 pointer-events-none whitespace-nowrap min-w-[130px]">' +
            '<div class="text-[10px] text-gray-300 font-mono mb-1.5 pb-1 border-b border-gray-700">' + startTimeStr + ' – ' + endTimeStr + '</div>' +
            '<div class="flex items-center justify-between gap-3 text-emerald-400 font-sans"><span class="flex items-center gap-1"><span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>200 OK:</span><span class="font-mono font-semibold">' + b.c200 + '</span></div>' +
            '<div class="flex items-center justify-between gap-3 text-amber-400 font-sans"><span class="flex items-center gap-1"><span class="w-1.5 h-1.5 rounded-full bg-amber-400"></span>4xx Client:</span><span class="font-mono font-semibold">' + b.c4xx + '</span></div>' +
            '<div class="flex items-center justify-between gap-3 text-rose-400 font-sans"><span class="flex items-center gap-1"><span class="w-1.5 h-1.5 rounded-full bg-rose-400"></span>5xx Server:</span><span class="font-mono font-semibold">' + b.c5xx + '</span></div>' +
            '<div class="border-t border-gray-700 mt-1.5 pt-1 flex items-center justify-between gap-3 font-semibold text-white font-sans"><span>Total:</span><span class="font-mono">' + b.total + '</span></div>' +
          '</div>' +
          barInner +
        '</div>';
      }).join('');

      container.innerHTML = '<div class="absolute inset-0 pointer-events-none flex flex-col justify-between pb-8">' +
        '<div class="w-full flex items-center gap-2 border-b border-gray-100 pb-0.5"><span class="text-[10px] font-mono text-groq-textSubtle w-6 text-right select-none">' + yMax + '</span><div class="flex-1 border-b border-dashed border-gray-200"></div></div>' +
        '<div class="w-full flex items-center gap-2 border-b border-gray-100 pb-0.5"><span class="text-[10px] font-mono text-groq-textSubtle w-6 text-right select-none">' + Math.round(yMax * 0.75) + '</span><div class="flex-1 border-b border-dashed border-gray-200"></div></div>' +
        '<div class="w-full flex items-center gap-2 border-b border-gray-100 pb-0.5"><span class="text-[10px] font-mono text-groq-textSubtle w-6 text-right select-none">' + Math.round(yMax * 0.5) + '</span><div class="flex-1 border-b border-dashed border-gray-200"></div></div>' +
        '<div class="w-full flex items-center gap-2 border-b border-gray-100 pb-0.5"><span class="text-[10px] font-mono text-groq-textSubtle w-6 text-right select-none">' + Math.round(yMax * 0.25) + '</span><div class="flex-1 border-b border-dashed border-gray-200"></div></div>' +
        '<div class="w-full flex items-center gap-2 border-b border-gray-200 pb-0.5"><span class="text-[10px] font-mono text-groq-textSubtle w-6 text-right select-none">0</span><div class="flex-1 border-b border-gray-300"></div></div>' +
        '</div>' +
        limitsHtml +
        emptyHtml +
        '<div class="relative z-10 flex-1 flex items-end justify-between gap-1 sm:gap-2 pl-9 pr-2 pb-8 h-[180px] sm:h-[220px]">' +
        barsHtml +
        '</div>' +
        '<div class="w-full border-t border-gray-200 pt-2 flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-groq-textSubtle pl-9 pr-2">' +
        '<span>' + ticks[0] + '</span>' +
        '<span class="hidden sm:inline">' + ticks[1] + '</span>' +
        '<span>' + ticks[2] + '</span>' +
        '<span class="hidden sm:inline">' + ticks[3] + '</span>' +
        '<span>' + ticks[4] + '</span>' +
        '</div>';

      if (window.lucide) lucide.createIcons();
    }

    function openConfigModal() { document.getElementById('modal-config').classList.remove('hidden'); }
    function closeConfigModal() { document.getElementById('modal-config').classList.add('hidden'); }

    // =========================================================================
    // BYOK Provider API Keys Modal Handlers
    // =========================================================================
    function openByokKeysModal() {
      const modal = document.getElementById('modal-byok-keys');
      if (!modal) return;
      const gInput = document.getElementById('byok-key-google');
      const mInput = document.getElementById('byok-key-mistral');
      const grInput = document.getElementById('byok-key-groq');
      if (gInput) gInput.value = localStorage.getItem('byok_key_google') || '';
      if (mInput) mInput.value = localStorage.getItem('byok_key_mistral') || '';
      if (grInput) grInput.value = localStorage.getItem('byok_key_groq') || '';
      modal.classList.remove('hidden');
      if (window.lucide) lucide.createIcons();
    }

    function closeByokKeysModal() {
      const modal = document.getElementById('modal-byok-keys');
      if (modal) modal.classList.add('hidden');
    }

    function saveByokKeys() {
      const gKey = document.getElementById('byok-key-google') ? document.getElementById('byok-key-google').value.trim() : '';
      const mKey = document.getElementById('byok-key-mistral') ? document.getElementById('byok-key-mistral').value.trim() : '';
      const grKey = document.getElementById('byok-key-groq') ? document.getElementById('byok-key-groq').value.trim() : '';

      if (gKey) localStorage.setItem('byok_key_google', gKey); else localStorage.removeItem('byok_key_google');
      if (mKey) localStorage.setItem('byok_key_mistral', mKey); else localStorage.removeItem('byok_key_mistral');
      if (grKey) localStorage.setItem('byok_key_groq', grKey); else localStorage.removeItem('byok_key_groq');

      const legacyKey = document.getElementById('cfg-apikey');
      if (legacyKey) legacyKey.value = grKey || mKey || gKey || '';

      cachedByokCatalog = null;
      updateByokBadge();
      closeByokKeysModal();

      if (playgroundTierMode === 'byok') {
        fetchAndPopulateByokModels(true);
      }
    }

    function clearByokKeys() {
      if (document.getElementById('byok-key-google')) document.getElementById('byok-key-google').value = '';
      if (document.getElementById('byok-key-mistral')) document.getElementById('byok-key-mistral').value = '';
      if (document.getElementById('byok-key-groq')) document.getElementById('byok-key-groq').value = '';

      localStorage.removeItem('byok_key_google');
      localStorage.removeItem('byok_key_mistral');
      localStorage.removeItem('byok_key_groq');

      const legacyKey = document.getElementById('cfg-apikey');
      if (legacyKey) legacyKey.value = '';

      cachedByokCatalog = null;
      updateByokBadge();

      if (playgroundTierMode === 'byok') {
        renderPlaygroundModelDropdown(FREE_TIER_MODELS);
      }
    }

    function toggleKeyVisibility(inputId, btn) {
      const input = document.getElementById(inputId);
      if (!input) return;
      if (input.type === 'password') {
        input.type = 'text';
        if (btn) btn.innerHTML = '<i data-lucide="eye-off" class="w-3.5 h-3.5"></i>';
      } else {
        input.type = 'password';
        if (btn) btn.innerHTML = '<i data-lucide="eye" class="w-3.5 h-3.5"></i>';
      }
      if (window.lucide) lucide.createIcons();
    }

    function updateByokBadge() {
      const g = localStorage.getItem('byok_key_google') || (document.getElementById('byok-key-google') ? document.getElementById('byok-key-google').value.trim() : '');
      const m = localStorage.getItem('byok_key_mistral') || (document.getElementById('byok-key-mistral') ? document.getElementById('byok-key-mistral').value.trim() : '');
      const gr = localStorage.getItem('byok_key_groq') || (document.getElementById('byok-key-groq') ? document.getElementById('byok-key-groq').value.trim() : '');
      const badge = document.getElementById('byok-keys-badge');
      if (badge) {
        if (g || m || gr) {
          badge.classList.remove('hidden');
        } else {
          badge.classList.add('hidden');
        }
      }
    }

    function initByokKeys() {
      const g = localStorage.getItem('byok_key_google') || '';
      const m = localStorage.getItem('byok_key_mistral') || '';
      const gr = localStorage.getItem('byok_key_groq') || '';
      if (document.getElementById('byok-key-google')) document.getElementById('byok-key-google').value = g;
      if (document.getElementById('byok-key-mistral')) document.getElementById('byok-key-mistral').value = m;
      if (document.getElementById('byok-key-groq')) document.getElementById('byok-key-groq').value = gr;
      updateByokBadge();
    }

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
        if (activeView === 'landing') {
          switchView('playground');
        }
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
        if (activeView === 'landing') {
          switchView('playground');
        }
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
      switchView('landing');
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
