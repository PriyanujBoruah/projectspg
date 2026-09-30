// ============================================================================
// ProjectSPG - Global Sovereign AI Privacy & Supported Countries Blog
// Matches clean, text-focused editorial layout from Together.ai blog
// Routes: /blog/countries, /countries, /supported-countries
// ============================================================================

export const COUNTRIES_BLOG_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Global Sovereign AI Privacy: 109 Jurisdictions & Sovereign Data Regulations Supported by ProjectSPG</title>
  <meta name="description" content="Discover how ProjectSPG protects sensitive enterprise data across 109 sovereign jurisdictions, 10 global regions, and regulations including GDPR, India DPDP, Singapore PDPA, and HIPAA with zero code changes.">
  <meta name="keywords" content="Global AI Privacy, Sovereign AI, 109 Jurisdictions, GDPR LLM Proxy, India DPDP Act, Singapore PDPA, HIPAA Compliance, Cross-Border AI Security, PII Redaction, Tokenization Engine">
  
  <!-- Open Graph -->
  <meta property="og:type" content="article">
  <meta property="og:url" content="https://projectspg.info/blog/countries">
  <meta property="og:title" content="Global Sovereign AI Privacy: 109 Jurisdictions & Sovereign Data Regulations Supported by ProjectSPG">
  <meta property="og:description" content="Protecting sensitive enterprise prompts across 109 sovereign jurisdictions, 10 global regions, and regulations including GDPR, India DPDP, Singapore PDPA, and HIPAA with zero code changes.">
  <meta property="og:image" content="https://projectspg.info/og-countries.png">

  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image">
  <meta property="twitter:url" content="https://projectspg.info/blog/countries">
  <meta property="twitter:title" content="Global Sovereign AI Privacy: 109 Jurisdictions Supported by ProjectSPG">
  <meta property="twitter:description" content="Protecting sensitive enterprise prompts across 109 sovereign jurisdictions, 10 global regions, and regulations including GDPR, India DPDP, Singapore PDPA, and HIPAA with zero code changes.">

  <!-- Schema.org TechArticle JSON-LD for Google SEO -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": "Global Sovereign AI Privacy: 109 Jurisdictions & Sovereign Data Regulations Supported by ProjectSPG",
    "description": "Comprehensive audit and technical architecture of ProjectSPG's 109 supported sovereign national jurisdictions, mathematical checksums, and compliance frameworks for global enterprise LLM inference.",
    "author": {
      "@type": "Person",
      "name": "Priyanuj Boruah"
    },
    "publisher": {
      "@type": "Organization",
      "name": "ProjectSPG",
      "url": "https://projectspg.info"
    },
    "datePublished": "2026-09-30",
    "dateModified": "2026-09-30"
  }
  </script>

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"></script>
  
  <style>
    :root {
      --bg: #ffffff;
      --text: #111827;
      --text-muted: #4b5563;
      --text-dim: #9ca3af;
      --border: #e5e7eb;
      --primary: #0f172a;
      --accent: #f0523d;
      --blue-subtle: #eff6ff;
      --blue-border: #bfdbfe;
    }

    * { box-sizing: border-box; }
    html { scroll-behavior: smooth; font-size: 16px; }
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background-color: var(--bg);
      color: var(--text);
      line-height: 1.75;
      -webkit-font-smoothing: antialiased;
    }

    /* Top Clean Floating Navbar matching Together.ai */
    .site-nav {
      position: sticky;
      top: 0;
      z-index: 50;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid var(--border);
      height: 64px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 32px;
    }

    .nav-brand {
      display: flex;
      align-items: center;
      gap: 10px;
      text-decoration: none;
      color: #0f172a;
      font-weight: 700;
      font-size: 17px;
      letter-spacing: -0.02em;
    }

    .brand-dots {
      display: flex;
      align-items: center;
      gap: 3px;
    }

    .dot {
      width: 9px;
      height: 9px;
      border-radius: 50%;
    }

    .dot-pink { background: #ec4899; }
    .dot-orange { background: #f97316; }
    .dot-purple { background: #8b5cf6; }

    .nav-center-links {
      display: flex;
      align-items: center;
      gap: 28px;
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .nav-center-links a {
      color: #4b5563;
      text-decoration: none;
      font-size: 14px;
      font-weight: 500;
      transition: color 0.15s ease;
    }

    .nav-center-links a:hover {
      color: #0f172a;
    }

    .nav-right-actions {
      display: flex;
      align-items: center;
      gap: 14px;
    }

    .btn-nav-primary {
      background: #0f172a;
      color: #ffffff;
      padding: 8px 18px;
      border-radius: 8px;
      font-size: 13.5px;
      font-weight: 600;
      text-decoration: none;
      transition: background 0.15s;
    }

    .btn-nav-primary:hover {
      background: #1e293b;
    }

    /* Article layout */
    .article-container {
      max-width: 1080px;
      margin: 0 auto;
      padding: 56px 24px 100px 24px;
    }

    /* Badges & Meta */
    .badge-category {
      display: inline-block;
      background: #f3f4f6;
      color: #374151;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      padding: 4px 10px;
      border-radius: 4px;
      font-family: 'JetBrains Mono', monospace;
    }

    .post-date {
      font-family: 'JetBrains Mono', monospace;
      font-size: 12px;
      color: #6b7280;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-left: 14px;
    }

    /* Typography */
    h1.article-title {
      font-size: 42px;
      line-height: 1.18;
      font-weight: 800;
      color: #0f172a;
      letter-spacing: -0.03em;
      margin-top: 18px;
      margin-bottom: 20px;
    }

    p.article-subtitle {
      font-size: 19px;
      line-height: 1.6;
      color: #4b5563;
      font-weight: 400;
      margin-bottom: 36px;
    }

    /* Top Grid: Left TOC/Author, Right Visual Preview */
    .top-hero-grid {
      display: grid;
      grid-template-columns: 280px 1fr;
      gap: 36px;
      margin-bottom: 48px;
      align-items: start;
    }

    .author-card {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 28px;
    }

    .author-avatar {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: linear-gradient(135deg, #10b981 0%, #0284c7 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: 700;
      font-size: 16px;
    }

    .author-name {
      font-weight: 600;
      font-size: 14.5px;
      color: #111827;
      line-height: 1.25;
    }

    .author-role {
      font-size: 12px;
      color: #6b7280;
      font-weight: 400;
    }

    .toc-title {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #9ca3af;
      margin-bottom: 12px;
      font-family: 'JetBrains Mono', monospace;
    }

    .toc-list {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .toc-list a {
      color: #4b5563;
      text-decoration: none;
      font-size: 13.5px;
      line-height: 1.4;
      transition: color 0.15s;
    }

    .toc-list a:hover {
      color: #f0523d;
      font-weight: 500;
    }

    /* Visual preview card (Right side) */
    .hero-visual-card {
      border: 1px solid var(--border);
      border-radius: 14px;
      background: #fafafa;
      overflow: hidden;
      box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.05);
    }

    .hero-visual-header {
      padding: 14px 18px;
      border-bottom: 1px solid var(--border);
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #ffffff;
      font-size: 12px;
      font-family: 'JetBrains Mono', monospace;
      color: #4b5563;
    }

    .hero-visual-body {
      padding: 24px;
      background: #0f121d;
      color: #f8fafc;
    }

    /* Editorial Blue Callout */
    .editorial-callout {
      background: #f0f7ff;
      border: 1px solid #c7e1fe;
      border-left: 4px solid #2563eb;
      border-radius: 8px;
      padding: 22px 26px;
      margin: 36px 0;
      font-size: 15.5px;
      color: #1e3a8a;
      line-height: 1.7;
    }

    .editorial-callout strong {
      color: #1e3a8a;
      font-weight: 700;
    }

    /* Metric cards 4-col */
    .metric-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;
      margin: 36px 0;
    }

    .metric-card {
      background: #ffffff;
      border: 1px solid var(--border);
      border-radius: 10px;
      padding: 20px 18px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.03);
      position: relative;
      overflow: hidden;
    }

    .metric-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: linear-gradient(90deg, #f0523d, #8b5cf6);
    }

    .metric-val {
      font-size: 28px;
      font-weight: 800;
      color: #0f172a;
      font-family: 'JetBrains Mono', monospace;
      line-height: 1.1;
      margin-bottom: 6px;
    }

    .metric-sub {
      font-size: 12px;
      color: #6b7280;
      font-weight: 500;
      line-height: 1.35;
    }

    /* Clean Pro Data Tables */
    .pro-table-wrapper {
      margin: 32px 0;
      border: 1px solid var(--border);
      border-radius: 10px;
      overflow-x: auto;
      background: #ffffff;
      box-shadow: 0 2px 8px rgba(0,0,0,0.02);
    }

    .pro-table {
      width: 100%;
      border-collapse: collapse;
      text-align: left;
      font-size: 13.5px;
    }

    .pro-table th {
      background: #f8fafc;
      padding: 13px 18px;
      font-weight: 700;
      color: #1e293b;
      border-bottom: 1px solid var(--border);
      font-size: 12px;
      letter-spacing: 0.03em;
      text-transform: uppercase;
      font-family: 'JetBrains Mono', monospace;
    }

    .pro-table td {
      padding: 13px 18px;
      border-bottom: 1px solid #f1f5f9;
      color: #334155;
      vertical-align: middle;
    }

    .pro-table tr:last-child td {
      border-bottom: none;
    }

    .pro-table tr:hover td {
      background: #f8fafc;
    }

    .table-tag {
      display: inline-block;
      padding: 2px 7px;
      border-radius: 4px;
      font-size: 11px;
      font-family: 'JetBrains Mono', monospace;
      font-weight: 600;
    }

    .tag-blue { background: #dbeafe; color: #1e40af; }
    .tag-purple { background: #f3e8ff; color: #6b21a8; }
    .tag-green { background: #dcfce7; color: #166534; }
    .tag-amber { background: #fef3c7; color: #92400e; }
    .tag-rose { background: #ffe4e6; color: #9f1239; }

    /* Interactive Verifier Box */
    .verifier-box {
      border: 1px solid var(--border);
      border-radius: 12px;
      background: #ffffff;
      padding: 24px;
      margin: 40px 0;
      box-shadow: 0 4px 16px rgba(0,0,0,0.04);
    }

    .verifier-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 18px;
      padding-bottom: 14px;
      border-bottom: 1px solid #f1f5f9;
    }

    /* Terminal reproduction box */
    .terminal-box {
      background: #0b0f19;
      color: #f1f5f9;
      border-radius: 10px;
      overflow: hidden;
      font-family: 'JetBrains Mono', monospace;
      font-size: 13px;
      margin: 32px 0;
      box-shadow: 0 6px 24px rgba(0,0,0,0.15);
      border: 1px solid #1e293b;
    }

    .terminal-header {
      background: #151c2d;
      padding: 10px 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #1e293b;
      font-size: 12px;
      color: #94a3b8;
    }

    .terminal-dots {
      display: flex;
      gap: 6px;
    }

    .t-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
    }

    .t-red { background: #ef4444; }
    .t-yellow { background: #eab308; }
    .t-green { background: #22c55e; }

    .terminal-body {
      padding: 20px;
      overflow-x: auto;
      line-height: 1.65;
    }

    .t-prompt { color: #38bdf8; user-select: none; }
    .t-cmd { color: #f8fafc; font-weight: 600; }
    .t-comment { color: #64748b; }
    .t-out { color: #94a3b8; }
    .t-success { color: #4ade80; }
    .t-accent { color: #f0523d; }

    /* Related articles footer */
    .related-section {
      margin-top: 72px;
      padding-top: 48px;
      border-top: 1px solid var(--border);
    }

    .related-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 24px;
      margin-top: 24px;
    }

    @media (max-width: 900px) {
      .top-hero-grid { grid-template-columns: 1fr; }
      .metric-grid { grid-template-columns: repeat(2, 1fr); }
      .related-grid { grid-template-columns: 1fr; }
      .site-nav { padding: 0 16px; }
      .nav-center-links { display: none; }
      h1.article-title { font-size: 32px; }
    }
  </style>
</head>
<body>

  <!-- Top Clean Floating Navbar -->
  <header class="site-nav">
    <a href="/" class="nav-brand">
      <div class="brand-dots">
        <span class="dot dot-pink"></span>
        <span class="dot dot-orange"></span>
        <span class="dot dot-purple"></span>
      </div>
      <span>project<span style="color:#f0523d;">spg</span></span>
    </a>

    <nav>
      <ul class="nav-center-links">
        <li><a href="/#platform-section">Platform</a></li>
        <li><a href="/#research-section">Research</a></li>
        <li><a href="/blog/benchmark">Benchmark Blog</a></li>
        <li><a href="/blog/countries" style="color: #f0523d; font-weight: 600;">Countries</a></li>
        <li><a href="/#access-section">Private Access</a></li>
        <li><a href="/dashboard#docs">Docs</a></li>
        <li><a href="/dashboard#playground">Playground</a></li>
      </ul>
    </nav>

    <div class="nav-right-actions">
      <a href="/dashboard#docs" style="color:#4b5563; font-size:13.5px; font-weight:500; text-decoration:none; margin-right:6px;" class="hidden sm:inline-block">Contact Sales</a>
      <a href="/dashboard" class="btn-nav-primary">Get Started</a>
    </div>
  </header>

  <!-- Main Editorial Container -->
  <article class="article-container">
    
    <!-- Category & Date Header -->
    <div style="display: flex; align-items: center; margin-bottom: 8px;">
      <span class="badge-category">COMPLIANCE</span>
      <span class="post-date">PUBLISHED 9/30/2026</span>
    </div>

    <!-- Title & Subtitle -->
    <h1 class="article-title">
      Global Sovereign AI Privacy: 109 Jurisdictions &amp; Sovereign Data Regulations Supported by ProjectSPG
    </h1>

    <p class="article-subtitle">
      How modern enterprises across the European Union, India, South East Asia, North America, Latin America, Africa, and APAC stream LLM prompts across borders with 100.00% zero-loss de-identification, mathematical checksum verification, and sub-millisecond edge latency.
    </p>

    <!-- Top Hero Grid: Left TOC/Author, Right Live Architecture Card -->
    <div class="top-hero-grid">
      
      <!-- Left Column: Author & Dynamic Jump Links -->
      <div>
        <div class="author-card">
          <div class="author-avatar">PB</div>
          <div>
            <div class="author-name">Priyanuj Boruah</div>
            <div class="author-role">Founder &amp; Lead Architect, ProjectSPG</div>
          </div>
        </div>

        <div class="toc-title">TABLE OF CONTENTS</div>
        <ul class="toc-list">
          <li><a href="#dilemma">1. The Sovereign Data Dilemma in LLMs</a></li>
          <li><a href="#global-map">2. Global Coverage: 109 Jurisdictions</a></li>
          <li><a href="#regional-breakdown">3. Regional Deep-Dive &amp; Identifiers</a></li>
          <li><a href="#checksums">4. Mathematical Checksum Verification</a></li>
          <li><a href="#regulatory-matrix">5. Regulatory Mapping (GDPR, DPDP, HIPAA)</a></li>
          <li><a href="#latency">6. Zero-Data Retention &amp; Edge Overhead</a></li>
          <li><a href="#verifier">7. Interactive Sovereign Verifier</a></li>
          <li><a href="#implementation">8. 60-Second Implementation Guide</a></li>
        </ul>
      </div>

      <!-- Right Column: Visual Telemetry Card -->
      <div class="hero-visual-card">
        <div class="hero-visual-header">
          <span style="display:flex; align-items:center; gap:8px;">
            <span style="width:8px; height:8px; border-radius:50%; background:#22c55e;"></span>
            GLOBAL JURISDICTION DISPATCH
          </span>
          <span style="color:#64748b;">10 MACRO REGIONS • 109 NATIONS</span>
        </div>
        <div class="hero-visual-body">
          <div style="font-size: 13px; font-family: 'JetBrains Mono', monospace; color: #94a3b8; margin-bottom: 16px;">
            // Real-time edge sovereignty verification engine:
          </div>

          <!-- Mini Regional Grid in Hero -->
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; font-family: 'JetBrains Mono', monospace; font-size: 12px;">
            <div style="background: rgba(255,255,255,0.05); padding: 12px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.08);">
              <div style="color: #38bdf8; font-weight:700;">EUROPEAN UNION (27)</div>
              <div style="color: #cbd5e1; font-size: 11px; margin-top: 4px;">GDPR Art 44-50, EU AI Act</div>
              <div style="color: #22c55e; font-size: 10.5px; margin-top: 2px;">Steuer-ID, NIR, Codice, BSN, PESEL</div>
            </div>

            <div style="background: rgba(255,255,255,0.05); padding: 12px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.08);">
              <div style="color: #f97316; font-weight:700;">ASIA-PACIFIC (24)</div>
              <div style="color: #cbd5e1; font-size: 11px; margin-top: 4px;">India DPDP 2023, APPI, PIPA</div>
              <div style="color: #22c55e; font-size: 10.5px; margin-top: 2px;">Aadhaar (Verhoeff), PAN, My Number</div>
            </div>

            <div style="background: rgba(255,255,255,0.05); padding: 12px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.08);">
              <div style="color: #a855f7; font-weight:700;">SOUTH EAST ASIA (10)</div>
              <div style="color: #cbd5e1; font-size: 11px; margin-top: 4px;">Singapore PDPA, Malaysia PDP</div>
              <div style="color: #22c55e; font-size: 10.5px; margin-top: 2px;">NRIC/FIN, MyKad, NIK/KTP, CCCD</div>
            </div>

            <div style="background: rgba(255,255,255,0.05); padding: 12px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.08);">
              <div style="color: #ec4899; font-weight:700;">AMERICAS &amp; GLOBAL (48)</div>
              <div style="color: #cbd5e1; font-size: 11px; margin-top: 4px;">HIPAA, CCPA, LGPD, PCI-DSS</div>
              <div style="color: #22c55e; font-size: 10.5px; margin-top: 2px;">SSN, SIN, CPF, IBAN (Mod-97), Cards (Luhn)</div>
            </div>
          </div>

          <div style="margin-top: 18px; padding-top: 14px; border-top: 1px solid rgba(255,255,255,0.1); display: flex; align-items: center; justify-content: space-between; font-size: 11.5px; font-family: 'JetBrains Mono', monospace;">
            <span style="color: #22c55e;">● IN-FLIGHT SOVEREIGNTY: 100% SECURE</span>
            <span style="color: #94a3b8;">NO LOGGING • NO DATA RETENTION</span>
          </div>
        </div>
      </div>

    </div>

    <!-- Editorial Blue Callout on Sovereign Cross-Border Compliance -->
    <div class="editorial-callout">
      <strong>The Cross-Border AI Exposure Mandate:</strong> Under the European Union General Data Protection Regulation (GDPR Chapter V), the Indian Digital Personal Data Protection Act 2023 (DPDP Act §16), Singapore Personal Data Protection Act (PDPA §26), and US HIPAA Safe Harbor standards, transmitting unmasked personally identifiable national identifiers across foreign LLM inference clusters represents an immediate, high-severity regulatory violation. Penalties reach up to <strong>€20,000,000 or 4% of worldwide turnover</strong> under GDPR, and <strong>₹250 Crore per incident</strong> under India DPDP. ProjectSPG renders prompts 100% non-identifiable before packet transit.
    </div>

    <!-- 4 High-Impact Metric Cards -->
    <div class="metric-grid">
      <div class="metric-card">
        <div class="metric-val">109</div>
        <div class="metric-sub">Sovereign Jurisdictions Covered Natively</div>
      </div>

      <div class="metric-card">
        <div class="metric-val">10</div>
        <div class="metric-sub">Macro Geographic Regions with Local Parsers</div>
      </div>

      <div class="metric-card">
        <div class="metric-val">100.00%</div>
        <div class="metric-sub">Checksum Precision (Verhoeff, Luhn, Mod-97)</div>
      </div>

      <div class="metric-card">
        <div class="metric-val">&lt;1ms</div>
        <div class="metric-sub">Sub-millisecond Edge Inception Overhead</div>
      </div>
    </div>

    <!-- Section 1: The Sovereign Dilemma -->
    <section id="dilemma" style="margin-top: 56px;">
      <h2 style="font-size: 26px; font-weight: 800; color: #0f172a; letter-spacing: -0.02em; margin-bottom: 16px;">
        1. The Sovereign Data Dilemma in Generative AI
      </h2>
      <p>
        Enterprise adoption of Large Language Models (LLMs) has fundamentally collided with national data sovereignty frameworks. When a multinational enterprise deploys OpenAI GPT-4o, Anthropic Claude 3.5 Sonnet, Google Gemini 1.5 Pro, or DeepSeek V3, user queries and internal documents are routinely dispatched to centralized GPU clusters distributed across North America, Europe, or third-party cloud regions.
      </p>
      <p style="margin-top: 14px;">
        If a healthcare worker in London enters an NHS patient number, a banking analyst in Singapore pastes an NRIC or UEN registration, a customer support agent in Frankfurt inputs a German Steuer-ID, or an Indian fintech routes an Aadhaar number, the prompt violates extraterritorial transfer prohibitions the moment the TLS connection establishes with the foreign LLM provider.
      </p>
      <p style="margin-top: 14px;">
        Traditional solutions—such as deploying dedicated on-premise clusters or localized VPCs—impose crushing infrastructure capital expenditures, lack frontier model reasoning capabilities, and require months of bureaucratic deployment. ProjectSPG resolves this architectural contradiction through <strong>In-Flight Sovereign De-Identification</strong>: mathematical redaction and cryptographic surrogate tokenization that operates inside the edge network within the originating legal jurisdiction before payloads leave sovereign borders.
      </p>
    </section>

    <!-- Section 2: Global Coverage -->
    <section id="global-map" style="margin-top: 56px;">
      <h2 style="font-size: 26px; font-weight: 800; color: #0f172a; letter-spacing: -0.02em; margin-bottom: 16px;">
        2. Global Coverage: 109 Jurisdictions Across 10 Regions
      </h2>
      <p>
        ProjectSPG’s tokenization engine features native syntactic parsers, structural character masks, and mathematical verification algorithms for 109 sovereign territories across every inhabited continent. Rather than relying on fuzzy machine learning classifiers that hallucinate and introduce non-deterministic latency, ProjectSPG executes zero-overhead deterministic regex parsers coupled with hardware-level checksum validations.
      </p>

      <div class="pro-table-wrapper">
        <table class="pro-table">
          <thead>
            <tr>
              <th>Region</th>
              <th>Jurisdictions</th>
              <th>Key National Identifiers Covered</th>
              <th>Primary Governing Regulation</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>South East Asia (SEA)</strong></td>
              <td>10 countries (Singapore, Malaysia, Indonesia, Thailand, Philippines, Vietnam, etc.)</td>
              <td>Singapore NRIC/FIN, SingPass, UEN; Malaysia MyKad; Indonesia NIK/KTP; Philippines PhilSys; Vietnam CCCD</td>
              <td><span class="table-tag tag-blue">SG PDPA / MY PDPA / ID PDP Law</span></td>
            </tr>
            <tr>
              <td><strong>Asia (Non-SEA)</strong></td>
              <td>14 countries (India, Japan, South Korea, China, Taiwan, Hong Kong, etc.)</td>
              <td>India Aadhaar (Verhoeff Checksum), PAN Card, Voter ID; Japan My Number; Korea RRN; China Resident ID</td>
              <td><span class="table-tag tag-purple">India DPDP 2023 / Japan APPI / PIPA</span></td>
            </tr>
            <tr>
              <td><strong>European Union</strong></td>
              <td>27 EU Member States (Germany, France, Italy, Spain, Netherlands, Poland, Sweden, etc.)</td>
              <td>German Steuer-ID &amp; Personalausweis; French NIR/INSEE; Italian Codice Fiscale; Spanish DNI/NIE; Dutch BSN; Polish PESEL</td>
              <td><span class="table-tag tag-green">EU GDPR / EU AI Act / NIS2</span></td>
            </tr>
            <tr>
              <td><strong>Europe (Non-EU)</strong></td>
              <td>8 countries (United Kingdom, Switzerland, Norway, Iceland, Liechtenstein, etc.)</td>
              <td>UK NHS Number &amp; NINO; Swiss AHV/AVS13; Norway Fødselsnummer</td>
              <td><span class="table-tag tag-green">UK GDPR &amp; DPA 2018 / Swiss FADP</span></td>
            </tr>
            <tr>
              <td><strong>North America</strong></td>
              <td>3 countries (United States, Canada, Mexico)</td>
              <td>US SSN, EIN, ITIN, State Driver's Licenses; Canada SIN, Health Cards; Mexico CURP, RFC</td>
              <td><span class="table-tag tag-amber">HIPAA / CCPA-CPRA / GLBA / PIPEDA</span></td>
            </tr>
            <tr>
              <td><strong>South America</strong></td>
              <td>12 countries (Brazil, Argentina, Colombia, Chile, Peru, etc.)</td>
              <td>Brazil CPF &amp; CNPJ; Argentina DNI, CUIT; Colombia Cédula &amp; NIT; Chile RUT</td>
              <td><span class="table-tag tag-amber">Brazil LGPD / Colombia Law 1581</span></td>
            </tr>
            <tr>
              <td><strong>Africa</strong></td>
              <td>18 countries (South Africa, Nigeria, Kenya, Egypt, Ghana, etc.)</td>
              <td>Nigeria NIN &amp; BVN; South Africa ID &amp; Tax Reference; Kenya ID &amp; KRA PIN; Egypt National ID</td>
              <td><span class="table-tag tag-rose">South Africa POPIA / Nigeria NDPA</span></td>
            </tr>
            <tr>
              <td><strong>Oceania</strong></td>
              <td>4 countries (Australia, New Zealand, Fiji, Papua New Guinea)</td>
              <td>Australia TFN, Medicare, Driver's License; New Zealand IRD &amp; NHI</td>
              <td><span class="table-tag tag-blue">Australia Privacy Act 1988 (APPs)</span></td>
            </tr>
            <tr>
              <td><strong>Middle East</strong></td>
              <td>10 countries (UAE, Saudi Arabia, Qatar, Israel, Kuwait, etc.)</td>
              <td>UAE Emirates ID; Saudi National ID &amp; Iqama; Israel Teudat Zehut</td>
              <td><span class="table-tag tag-purple">UAE Decree 45/2021 / Saudi PDPL</span></td>
            </tr>
            <tr>
              <td><strong>Global / Universal</strong></td>
              <td>Worldwide (195+ Countries)</td>
              <td>ICAO Doc 9303 Passports, Luhn Credit Cards (Visa/MC/Amex), Modulo-97 IBANs, E.164 Phones, RFC 5322 Emails</td>
              <td><span class="table-tag tag-green">PCI-DSS v4.0 / Cross-Border ISO</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Section 3: Regional Deep-Dive -->
    <section id="regional-breakdown" style="margin-top: 56px;">
      <h2 style="font-size: 26px; font-weight: 800; color: #0f172a; letter-spacing: -0.02em; margin-bottom: 16px;">
        3. Regional Breakdown &amp; Sovereign Identity Standards
      </h2>
      <p>
        Each sovereign government issues national identity credentials engineered with idiosyncratic character sets, checksum validation schemes, and structural constraints. A generic PII redactor that searches merely for "digits" or "hyphens" generates intolerable false-positive rates on financial charts, part numbers, and code blocks while leaking non-standard alphanumeric identifiers.
      </p>

      <!-- Sub-region 3.1: South East Asia -->
      <div style="margin-top: 28px; background: #fafafa; border: 1px solid var(--border); border-radius: 12px; padding: 24px;">
        <h3 style="font-size: 18px; font-weight: 700; color: #0f172a; margin-bottom: 12px; display:flex; align-items:center; gap:8px;">
          <span style="color:#f0523d;">■</span> South East Asia (SEA): Singapore, Malaysia, Indonesia, Philippines &amp; Vietnam
        </h3>
        <p style="font-size: 14.5px; color: #4b5563;">
          South East Asian identity architectures combine century codes, serial issuance counters, and modular weighting checksums:
        </p>
        <ul style="margin-top: 10px; font-size: 14px; color: #374151; padding-left: 20px; line-height: 1.8;">
          <li><strong>Singapore NRIC/FIN:</strong> 9-character alphanumeric structure (<code>^[STFGMC]\d{7}[A-Z]$</code>). Validated with modulus 11 weights <code>[2, 7, 6, 5, 4, 3, 2]</code> with offset mappings for pre-2000 citizens (<code>S</code>), post-2000 citizens (<code>T</code>), and foreign residents (<code>F/G/M</code>).</li>
          <li><strong>Malaysia MyKad:</strong> 12-digit format (<code>YYMMDD-PB-###G</code>). Embeds verified date-of-birth, 2-digit birth state code (<code>01-16</code> for states/federal territories), and odd/even gender designation.</li>
          <li><strong>Indonesia NIK (Nomor Induk Kependudukan):</strong> 16-digit structure detailing provincial code (2 digits), regency/city code (2 digits), district (2 digits), date of birth (with female birth date offset +40), and sequential registration digits.</li>
          <li><strong>Philippines PhilSys Card (CRN):</strong> 12-digit Common Reference Number with modular parity verification.</li>
          <li><strong>Vietnam CCCD (Căn cước công dân):</strong> 12-digit citizen identity card incorporating century code, province code, and unique identity series.</li>
        </ul>
      </div>

      <!-- Sub-region 3.2: Asia (Non-SEA) -->
      <div style="margin-top: 20px; background: #fafafa; border: 1px solid var(--border); border-radius: 12px; padding: 24px;">
        <h3 style="font-size: 18px; font-weight: 700; color: #0f172a; margin-bottom: 12px; display:flex; align-items:center; gap:8px;">
          <span style="color:#8b5cf6;">■</span> Asia (Non-SEA): India, Japan, South Korea, China &amp; Taiwan
        </h3>
        <p style="font-size: 14.5px; color: #4b5563;">
          Home to the world's most populous biometric and identity databases, these standards demand strict mathematical validation:
        </p>
        <ul style="margin-top: 10px; font-size: 14px; color: #374151; padding-left: 20px; line-height: 1.8;">
          <li><strong>India Aadhaar:</strong> 12-digit national identifier governed by UIDAI. Validated via the <em>Verhoeff algorithm</em> (based on dihedral group \(D_5\)), catching 100% of single-digit transcription errors and 95.3% of adjacent transposition errors.</li>
          <li><strong>India Permanent Account Number (PAN):</strong> 10-character alphanumeric code (<code>^[A-Z]{3}[ABCFGHLJPT][A-Z]\d{4}[A-Z]$</code>) where the 4th character strictly categorizes taxpayer status (<code>P</code> for Individual, <code>C</code> for Company, <code>H</code> for HUF, <code>F</code> for Firm).</li>
          <li><strong>Japan My Number (社会・社会保障番号):</strong> 12-digit individual number validated using modulus 11 with weights <code>[2, 3, 4, 5, 6, 7, 2, 3, 4, 5, 6]</code>.</li>
          <li><strong>South Korea Resident Registration Number (RRN):</strong> 13-digit format (<code>YYMMDD-S######</code>) with gender century markers (1-4 for 20th/21st century natives, 5-8 for foreign residents) verified with modulus 11 parity.</li>
          <li><strong>China Resident Identity Card:</strong> 18-digit identity string (<code>GB 11643-1999</code>) verified using ISO 7064:1983.MOD 11-2 check character (including check digit 'X').</li>
        </ul>
      </div>

      <!-- Sub-region 3.3: European Union -->
      <div style="margin-top: 20px; background: #fafafa; border: 1px solid var(--border); border-radius: 12px; padding: 24px;">
        <h3 style="font-size: 18px; font-weight: 700; color: #0f172a; margin-bottom: 12px; display:flex; align-items:center; gap:8px;">
          <span style="color:#10b981;">■</span> European Union (EU) &amp; United Kingdom
        </h3>
        <p style="font-size: 14.5px; color: #4b5563;">
          Under the stringent mandates of GDPR and the EU AI Act, ProjectSPG identifies all sovereign member state identification schemas:
        </p>
        <ul style="margin-top: 10px; font-size: 14px; color: #374151; padding-left: 20px; line-height: 1.8;">
          <li><strong>Germany Steuer-Identifikationsnummer:</strong> 11-digit tax ID verified with DIN ISO/IEC 7064, MOD 11, 10 algorithm with unique recurrence rules (exactly one digit appears twice, no digit appears three times).</li>
          <li><strong>France NIR (Numéro de Sécurité Sociale):</strong> 15-digit code comprising sex, birth year/month, department of birth (including Corsica 2A/2B), commune, order number, and modulo 97 check key.</li>
          <li><strong>Italy Codice Fiscale:</strong> 16-character alphanumeric string encoding surname consonants/vowels, given name, birth year, month character (A-T), day (with +40 female shift), cadastral municipality code, and complex checksum lookup table.</li>
          <li><strong>United Kingdom NHS Number:</strong> 10-digit identifier validated using Modulus 11 with weights <code>[10, 9, 8, 7, 6, 5, 4, 3, 2]</code>.</li>
          <li><strong>Spain DNI/NIE:</strong> 8-digit national identity card followed by modulus 23 character lookup (TRWAGMYFPDXBNJZSQVHLCKE).</li>
        </ul>
      </div>

      <!-- Sub-region 3.4: Americas -->
      <div style="margin-top: 20px; background: #fafafa; border: 1px solid var(--border); border-radius: 12px; padding: 24px;">
        <h3 style="font-size: 18px; font-weight: 700; color: #0f172a; margin-bottom: 12px; display:flex; align-items:center; gap:8px;">
          <span style="color:#0284c7;">■</span> Americas: United States, Canada, Brazil &amp; Latin America
        </h3>
        <p style="font-size: 14.5px; color: #4b5563;">
          Covering federal, state, and provincial identification schemes across North and South America:
        </p>
        <ul style="margin-top: 10px; font-size: 14px; color: #374151; padding-left: 20px; line-height: 1.8;">
          <li><strong>United States SSN:</strong> 9-digit Social Security Number with area exclusion checks (excluding 000, 666, and 900-999) and group/serial validation.</li>
          <li><strong>Canada SIN (Social Insurance Number):</strong> 9-digit identifier validated using the Luhn checksum algorithm; 9-series temporary worker detection.</li>
          <li><strong>Brazil CPF (Cadastro de Pessoas Físicas):</strong> 11-digit national identity verified by consecutive dual-pass modulus 11 check digits with 100% false-positive rejection.</li>
          <li><strong>Brazil CNPJ:</strong> 14-digit corporate tax registry verified with dual modulus 11 weighting across corporate root, branch, and check digits.</li>
        </ul>
      </div>
    </section>

    <!-- Section 4: Mathematical Checksums -->
    <section id="checksums" style="margin-top: 56px;">
      <h2 style="font-size: 26px; font-weight: 800; color: #0f172a; letter-spacing: -0.02em; margin-bottom: 16px;">
        4. Mathematical Checksum Verification: Zero False Positives
      </h2>
      <p>
        The primary operational flaw of legacy data loss prevention (DLP) tools is reliance on naive regular expressions. When an enterprise scans engineering prompts containing memory addresses, Git commit hashes, UUIDs, or matrix multiplication weights, a standard 9-digit or 12-digit regex triggers thousands of false alarms, corrupting harmless technical prompts.
      </p>
      <p style="margin-top: 14px;">
        ProjectSPG enforces a strict two-stage identification architecture:
      </p>
      <ol style="margin-top: 12px; padding-left: 20px; line-height: 1.8; color: #334155;">
        <li><strong>Stage 1 (Syntax Parsing):</strong> High-throughput, zero-allocation regular expressions isolate potential sovereign tokens with boundary constraints in under <strong>15 microseconds</strong>.</li>
        <li><strong>Stage 2 (Algorithmic Mathematical Validation):</strong> The token is evaluated against its respective sovereign mathematical checksum:
          <ul style="margin-top: 8px; padding-left: 20px;">
            <li><strong>Verhoeff Dihedral Checksum:</strong> For Indian Aadhaar numbers. Implemented via static multiplication and permutation tables over group \(D_5\).</li>
            <li><strong>Luhn Algorithm (Base-10 Modulo):</strong> For Credit Cards (Visa, MasterCard, Amex) and Canadian SINs. Computes sum of doubled alternating digits.</li>
            <li><strong>ISO 13616 Modulo-97:</strong> For International Bank Account Numbers (IBAN). Replaces country letters with numeric equivalents and validates that \(NumericValue \pmod{97} \equiv 1\).</li>
            <li><strong>Weighted Modulus-11:</strong> For Singapore NRIC, UK NHS, German Steuer-ID, and Brazil CPF.</li>
          </ul>
        </li>
      </ol>
      <p style="margin-top: 14px;">
        If a sequence of digits fails the sovereign mathematical checksum, <strong>it is immediately released untouched</strong>. This guarantees that software code, compiler flags, random integer sequences, and product model serial numbers are never erroneously modified.
      </p>
    </section>

    <!-- Section 5: Regulatory Compliance Mapping -->
    <section id="regulatory-matrix" style="margin-top: 56px;">
      <h2 style="font-size: 26px; font-weight: 800; color: #0f172a; letter-spacing: -0.02em; margin-bottom: 16px;">
        5. Regulatory Compliance Mapping: GDPR, DPDP, HIPAA &amp; PDPA
      </h2>
      <p>
        ProjectSPG is built from the ground up to satisfy the audit and verification requirements of corporate Data Protection Officers (DPOs), General Counsels, and Chief Information Security Officers (CISOs).
      </p>

      <div class="pro-table-wrapper">
        <table class="pro-table">
          <thead>
            <tr>
              <th>Regulation</th>
              <th>Article / Clause</th>
              <th>Compliance Mandate</th>
              <th>ProjectSPG Technical Enforcement</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>EU GDPR</strong></td>
              <td>Chapter V, Articles 44–50</td>
              <td>Strict prohibition of personal data transfers to third countries lacking adequacy decisions (Schrems II precedent).</td>
              <td>PII is completely tokenized and removed at the local edge before prompt packets transit outside EU boundaries.</td>
            </tr>
            <tr>
              <td><strong>EU AI Act</strong></td>
              <td>Article 10 (Data Governance)</td>
              <td>High-risk AI systems must implement continuous data governance, privacy preservation, and anti-leakage controls.</td>
              <td>Automated tokenization audit logging with zero persistent plaintext storage across the inference pipeline.</td>
            </tr>
            <tr>
              <td><strong>India DPDP Act 2023</strong></td>
              <td>Section 16 &amp; Section 8(5)</td>
              <td>Restrictions on transfer of personal data outside India; mandatory protective measures against data breaches.</td>
              <td>Native Verhoeff-validated Aadhaar and PAN masking, preventing biometric or tax credentials from touching foreign LLM APIs.</td>
            </tr>
            <tr>
              <td><strong>Singapore PDPA</strong></td>
              <td>Section 26 (Transfer Limitation)</td>
              <td>Organizations must not transfer personal data to a country outside Singapore unless comparable protection is ensured.</td>
              <td>Complete surrogate tokenization of NRIC, FIN, SingPass, and corporate UEN registration data.</td>
            </tr>
            <tr>
              <td><strong>US HIPAA</strong></td>
              <td>45 CFR § 164.514(b) (Safe Harbor)</td>
              <td>Removal of all 18 specified direct and indirect health identifiers before clinical data sharing.</td>
              <td>Automatic masking of patient names, medical record numbers, dates, geographic data, and contact information.</td>
            </tr>
            <tr>
              <td><strong>PCI-DSS v4.0</strong></td>
              <td>Requirement 3.4 &amp; 3.5</td>
              <td>Primary Account Numbers (PAN) must be rendered unreadable anywhere they are stored or processed.</td>
              <td>Hardware-validated Luhn masking with preserved brand and last-4 digits for billing context without exposure.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Section 6: Latency & Zero-Data Retention -->
    <section id="latency" style="margin-top: 56px;">
      <h2 style="font-size: 26px; font-weight: 800; color: #0f172a; letter-spacing: -0.02em; margin-bottom: 16px;">
        6. Zero-Data Retention &amp; Sub-Millisecond Edge Latency
      </h2>
      <p>
        A data privacy layer cannot introduce latency bottlenecks or introduce a secondary point of compromise. ProjectSPG executes entirely within ephemeral worker memory across globally distributed edge nodes.
      </p>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 24px;">
        <div style="background: #f8fafc; border: 1px solid var(--border); border-radius: 10px; padding: 20px;">
          <h4 style="font-size: 16px; font-weight: 700; color: #0f172a; margin-bottom: 8px;">Zero Persistent Storage</h4>
          <p style="font-size: 13.5px; color: #4b5563; line-height: 1.6;">
            Surrogate token maps exist strictly in volatile memory for the duration of the HTTP streaming request. Once the downstream LLM delivers its completion tokens and ProjectSPG rehydrates the original terms in the client's response stream, the lookup table is permanently wiped from RAM.
          </p>
        </div>
        <div style="background: #f8fafc; border: 1px solid var(--border); border-radius: 10px; padding: 20px;">
          <h4 style="font-size: 16px; font-weight: 700; color: #0f172a; margin-bottom: 8px;">Sub-Millisecond Execution</h4>
          <p style="font-size: 13.5px; color: #4b5563; line-height: 1.6;">
            As proven in our empirical 9.33M prompt benchmark audit, the core sovereign tokenization engine adds just <strong>86 microseconds</strong> of processing overhead, running at over <strong>17,735 prompts/sec</strong> per edge compute worker.
          </p>
        </div>
      </div>
    </section>

    <!-- Section 7: Interactive Sovereign Verifier -->
    <section id="verifier" style="margin-top: 56px;">
      <h2 style="font-size: 26px; font-weight: 800; color: #0f172a; letter-spacing: -0.02em; margin-bottom: 16px;">
        7. Interactive Sovereign Entity Sandbox
      </h2>
      <p>
        Test ProjectSPG's real-time sovereign entity detection. Select a regional template or paste your own sample payload to observe deterministic tokenization and reversible rehydration:
      </p>

      <div class="verifier-box">
        <div class="verifier-header">
          <span style="font-weight: 700; font-size: 14px; color: #0f172a;">SOVEREIGN DETECTION TESTBED</span>
          <div style="display:flex; gap:8px;">
            <button onclick="setSample('sea')" style="background:#f1f5f9; border:none; padding:4px 10px; border-radius:6px; font-size:11.5px; font-weight:600; cursor:pointer; color:#334155;">SEA (Singapore/Malaysia)</button>
            <button onclick="setSample('india')" style="background:#f1f5f9; border:none; padding:4px 10px; border-radius:6px; font-size:11.5px; font-weight:600; cursor:pointer; color:#334155;">India (Aadhaar/PAN)</button>
            <button onclick="setSample('eu')" style="background:#f1f5f9; border:none; padding:4px 10px; border-radius:6px; font-size:11.5px; font-weight:600; cursor:pointer; color:#334155;">EU (Germany/IBAN)</button>
            <button onclick="setSample('us')" style="background:#f1f5f9; border:none; padding:4px 10px; border-radius:6px; font-size:11.5px; font-weight:600; cursor:pointer; color:#334155;">US/Global (SSN/CC)</button>
          </div>
        </div>

        <div style="margin-bottom: 16px;">
          <label style="display:block; font-size: 12px; font-weight: 700; color: #4b5563; margin-bottom: 6px; text-transform: uppercase; font-family:'JetBrains Mono', monospace;">
            Inbound Sovereign Prompt:
          </label>
          <textarea id="liveInputPrompt" rows="3" style="width:100%; border:1px solid #cbd5e1; border-radius:8px; padding:12px; font-family:'JetBrains Mono', monospace; font-size:13px; color:#1e293b; outline:none;" oninput="runLiveVerification()">Patient Tan Wei Ling (NRIC: S9876543A, SingPass: tan.wl@gov.sg) registered Singapore business UEN 201812345K with account SG89 0140 1234 5678 9012.</textarea>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
          <div>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
              <span style="font-size: 11px; font-weight: 700; color: #f0523d; text-transform: uppercase; font-family:'JetBrains Mono', monospace;">
                ● OUTBOUND TO LLM (SANITIZED)
              </span>
              <span style="font-size: 10px; color: #10b981; font-weight: 600;">ZERO LEAKAGE</span>
            </div>
            <div id="liveOutputSanitized" style="background:#0f121d; color:#38bdf8; padding:14px; border-radius:8px; font-family:'JetBrains Mono', monospace; font-size:12.5px; min-height:100px; white-space:pre-wrap; border:1px solid #1e293b;"></div>
          </div>

          <div>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
              <span style="font-size: 11px; font-weight: 700; color: #10b981; text-transform: uppercase; font-family:'JetBrains Mono', monospace;">
                ● RETURNED TO CLIENT (REHYDRATED)
              </span>
              <span style="font-size: 10px; color: #64748b; font-weight: 600;">100% FIDELITY</span>
            </div>
            <div id="liveOutputRehydrated" style="background:#f8fafc; color:#1e293b; padding:14px; border-radius:8px; font-family:'JetBrains Mono', monospace; font-size:12.5px; min-height:100px; white-space:pre-wrap; border:1px solid #cbd5e1;"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 8: 60-Second Implementation -->
    <section id="implementation" style="margin-top: 56px;">
      <h2 style="font-size: 26px; font-weight: 800; color: #0f172a; letter-spacing: -0.02em; margin-bottom: 16px;">
        8. 60-Second Drop-In Implementation Guide
      </h2>
      <p>
        ProjectSPG is completely wire-compatible with the standard OpenAI API specification. To protect your enterprise across all 109 jurisdictions, simply point your existing client SDK to the ProjectSPG gateway endpoint:
      </p>

      <div class="terminal-box">
        <div class="terminal-header">
          <div class="terminal-dots">
            <span class="t-dot t-red"></span>
            <span class="t-dot t-yellow"></span>
            <span class="t-dot t-green"></span>
          </div>
          <span>python_openai_sovereign_client.py</span>
          <button onclick="copyTerminalCommands()" class="terminal-copy-btn" style="background:#334155; border:none; color:#f8fafc; padding:3px 9px; border-radius:4px; font-size:11px; cursor:pointer;">Copy</button>
        </div>
        <div class="terminal-body" id="terminalCommands">
<span class="t-comment"># Install standard OpenAI client</span>
<span class="t-prompt">$</span> <span class="t-cmd">pip install openai</span>

<span class="t-comment"># Drop-in One-Line BaseURL Swap</span>
<span class="t-keyword" style="color:#c084fc;">import</span> os
<span class="t-keyword" style="color:#c084fc;">from</span> openai <span class="t-keyword" style="color:#c084fc;">import</span> OpenAI

client = OpenAI(
    api_key=os.environ.get(<span class="t-out">"OPENAI_API_KEY"</span>),
    <span class="t-accent">base_url="https://projectspg.info/v1"</span>  <span class="t-comment"># Points to Sovereign Edge</span>
)

<span class="t-comment"># Send sovereign payload - 100% compliant across 109 countries</span>
response = client.chat.completions.create(
    model=<span class="t-out">"gpt-4o"</span>,
    messages=[{
        <span class="t-out">"role"</span>: <span class="t-out">"user"</span>,
        <span class="t-out">"content"</span>: <span class="t-out">"Analyze patient Tan Wei Ling (NRIC: S9876543A) for cross-border care."</span>
    }]
)

<span class="t-cmd">print</span>(response.choices[0].message.content)
<span class="t-success"># =&gt; LLM receives non-identifiable tokens; response is rehydrated automatically.</span>
        </div>
      </div>
    </section>

    <!-- Related Articles Section (Matching Together.ai layout) -->
    <div class="related-section">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px;">
        <h2 style="font-size: 26px; font-weight: 800; color: #0f172a; letter-spacing: -0.02em; margin: 0;">
          Related articles
        </h2>
        <div style="display: flex; gap: 8px;">
          <button onclick="scrollRelated('left')" style="width: 36px; height: 36px; border-radius: 8px; border: 1px solid var(--border); background: #ffffff; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 16px; color: #374151;">
            ←
          </button>
          <button onclick="scrollRelated('right')" style="width: 36px; height: 36px; border-radius: 8px; border: 1px solid var(--border); background: #ffffff; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 16px; color: #374151;">
            →
          </button>
        </div>
      </div>

      <div class="related-grid" id="related-cards-track">
        
        <!-- Related 1: Empirical Benchmark -->
        <a href="/blog/benchmark" style="text-decoration: none; color: inherit; display: block;" class="group">
          <div style="aspect-ratio: 16/9; width: 100%; border-radius: 12px; overflow: hidden; background: linear-gradient(135deg, #ffd5cc, #f7e0ff, #d8e6ff); border: 1px solid rgba(229,231,235,0.8); display: flex; align-items: center; justify-content: center; padding: 22px; text-align: center; box-shadow: 0 1px 3px rgba(0,0,0,0.03); transition: all 0.25s;" onmouseover="this.style.transform='translateY(-3px)'; this.style.boxShadow='0 10px 25px rgba(0,0,0,0.08)';" onmouseout="this.style.transform='none'; this.style.boxShadow='0 1px 3px rgba(0,0,0,0.03)';">
            <div>
              <div style="display: flex; align-items: center; justify-content: center; gap: 4px; margin-bottom: 6px;">
                <span style="width: 8px; height: 8px; border-radius: 50%; background: #ec4899;"></span>
                <span style="font-size: 10px; font-weight: 700; color: #1f2937;">project<span style="color:#f0523d;">spg</span></span>
              </div>
              <h4 style="font-size: 14.5px; font-weight: 800; color: #111827; line-height: 1.35;">
                Empirical Benchmark: 9,334,805 Prompts Evaluated with 100.00% Fidelity &amp; 86µs Latency
              </h4>
            </div>
          </div>
          <div style="margin-top: 14px;">
            <span style="background: #f3f4f6; color: #374151; font-size: 10px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; padding: 2px 8px; border-radius: 4px; font-family: monospace;">BENCHMARK</span>
            <h3 style="font-size: 16.5px; font-weight: 700; color: #111827; margin-top: 8px; line-height: 1.35;">
              Empirical Benchmark: 9.33M Prompts Evaluated with 100% Roundtrip Precision
            </h3>
          </div>
        </a>

        <!-- Related 2: Open Model AI Stack & Market Ranking -->
        <a href="/blog/stack" style="text-decoration: none; color: inherit; display: block;" class="group">
          <div style="aspect-ratio: 16/9; width: 100%; border-radius: 12px; overflow: hidden; background: linear-gradient(135deg, #fed7aa, #fef08a, #c7d2fe); border: 1px solid rgba(229,231,235,0.8); display: flex; align-items: center; justify-content: center; padding: 22px; text-align: center; box-shadow: 0 1px 3px rgba(0,0,0,0.03); transition: all 0.25s;" onmouseover="this.style.transform='translateY(-3px)'; this.style.boxShadow='0 10px 25px rgba(0,0,0,0.08)';" onmouseout="this.style.transform='none'; this.style.boxShadow='0 1px 3px rgba(0,0,0,0.03)';">
            <div>
              <div style="display: flex; align-items: center; justify-content: center; gap: 4px; margin-bottom: 6px;">
                <span style="width: 8px; height: 8px; border-radius: 50%; background: #f97316;"></span>
                <span style="font-size: 10px; font-weight: 700; color: #1f2937;">project<span style="color:#f0523d;">spg</span></span>
              </div>
              <h4 style="font-size: 14.5px; font-weight: 800; color: #111827; line-height: 1.35;">
                The Open Model AI Stack: Why ProjectSPG is Ranked #1
              </h4>
            </div>
          </div>
          <div style="margin-top: 14px;">
            <span style="background: #f3f4f6; color: #374151; font-size: 10px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; padding: 2px 8px; border-radius: 4px; font-family: monospace;">ARCHITECTURE</span>
            <h3 style="font-size: 16.5px; font-weight: 700; color: #111827; margin-top: 8px; line-height: 1.35;">
              The Open Model AI Stack: Why ProjectSPG Ranks #1 for Enterprise Privacy
            </h3>
          </div>
        </a>

        <!-- Related 3: Supported Industries -->
        <a href="/blog/industries" style="text-decoration: none; color: inherit; display: block;" class="group">
          <div style="aspect-ratio: 16/9; width: 100%; border-radius: 12px; overflow: hidden; background: #0f121d; border: 1px solid rgba(229,231,235,0.2); display: flex; align-items: center; justify-content: center; padding: 22px; text-align: center; box-shadow: 0 1px 3px rgba(0,0,0,0.03); transition: all 0.25s;" onmouseover="this.style.transform='translateY(-3px)'; this.style.boxShadow='0 10px 25px rgba(0,0,0,0.2)';" onmouseout="this.style.transform='none'; this.style.boxShadow='0 1px 3px rgba(0,0,0,0.03)';">
            <div>
              <div style="display: flex; align-items: center; justify-content: center; gap: 4px; margin-bottom: 6px;">
                <span style="width: 8px; height: 8px; border-radius: 50%; background: #8b5cf6;"></span>
                <span style="font-size: 10px; font-weight: 700; color: #94a3b8;">project<span style="color:#f0523d;">spg</span></span>
              </div>
              <h4 style="font-size: 14.5px; font-weight: 800; color: #ffffff; line-height: 1.35;">
                Enterprise Guardrails for Regulated Industries: Healthcare, FinTech &amp; Legal
              </h4>
            </div>
          </div>
          <div style="margin-top: 14px;">
            <span style="background: #f3f4f6; color: #374151; font-size: 10px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; padding: 2px 8px; border-radius: 4px; font-family: monospace;">ENTERPRISE</span>
            <h3 style="font-size: 16.5px; font-weight: 700; color: #111827; margin-top: 8px; line-height: 1.35;">
              Enterprise Guardrails for Regulated Industries: Healthcare, FinTech &amp; Legal
            </h3>
          </div>
        </a>

      </div>
    </div>

  </article>

  <!-- ======================================================================= -->
  <!-- START BUILDING ON PROJECTSPG (Call To Action Section)                   -->
  <!-- ======================================================================= -->
  <section class="w-full relative pt-20 pb-28 sm:pt-32 sm:pb-48 overflow-hidden bg-white text-center border-t border-gray-100">
    
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
        From sovereign edge de-identification across 109 countries to large-scale zero-trust AI model inference
      </p>
      <div class="mt-8 flex justify-center">
        <a href="/dashboard" class="px-7 py-3.5 rounded-xl bg-black hover:bg-gray-800 text-white text-xs font-bold tracking-wider uppercase transition shadow-md hover:shadow-lg cursor-pointer transform hover:-translate-y-0.5 inline-block">
          GET STARTED NOW
        </a>
      </div>
    </div>
  </section>

  <!-- ======================================================================= -->
  <!-- MAIN ENTERPRISE FOOTER                                                  -->
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
            <a href="/" class="inline-flex items-center gap-2 group cursor-pointer" title="ProjectSPG">
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
                <li><a href="/dashboard" class="hover:text-gray-950 transition">Accelerated Compute</a></li>
                <li><a href="/dashboard" class="hover:text-gray-950 transition">Serverless Inference</a></li>
                <li><a href="/dashboard" class="hover:text-gray-950 transition">Provisioned Throughput</a></li>
                <li><a href="/dashboard" class="hover:text-gray-950 transition">Dedicated Inference</a></li>
                <li><a href="/dashboard" class="hover:text-gray-950 transition">Fine-Tuning</a></li>
                <li><a href="/dashboard" class="hover:text-gray-950 transition">Sandbox</a></li>
                <li><a href="/dashboard" class="hover:text-gray-950 transition">Evaluations</a></li>
              </ul>
            </div>

            <!-- Col 2: MODELS -->
            <div>
              <div class="border-t border-gray-200/90 pt-3 mb-3.5">
                <span class="text-[10px] font-bold tracking-widest uppercase text-gray-900 font-mono">MODELS</span>
              </div>
              <ul class="space-y-2.5 font-medium text-gray-600">
                <li><a href="/dashboard" class="hover:text-gray-950 transition">See all models</a></li>
                <li><a href="/dashboard" class="hover:text-gray-950 transition">DeepSeek</a></li>
                <li><a href="/dashboard" class="hover:text-gray-950 transition">Meta</a></li>
                <li><a href="/dashboard" class="hover:text-gray-950 transition">Qwen</a></li>
                <li><a href="/dashboard" class="hover:text-gray-950 transition">Google</a></li>
                <li><a href="/dashboard" class="hover:text-gray-950 transition">OpenAI</a></li>
                <li><a href="/dashboard" class="hover:text-gray-950 transition">Mistral AI</a></li>
                <li><a href="/dashboard" class="hover:text-gray-950 transition">Custom models</a></li>
              </ul>
            </div>

            <!-- Col 3: DEVELOPERS & PRICING -->
            <div>
              <div class="border-t border-gray-200/90 pt-3 mb-3.5">
                <span class="text-[10px] font-bold tracking-widest uppercase text-gray-900 font-mono">DEVELOPERS</span>
              </div>
              <ul class="space-y-2.5 font-medium text-gray-600 mb-6">
                <li><a href="/blog/benchmark" class="hover:text-gray-950 transition">Research &amp; Benchmark</a></li>
                <li><a href="/blog/countries" class="hover:text-gray-950 transition">Supported Countries</a></li>
                <li><a href="/dashboard" class="hover:text-gray-950 transition">API Documentation</a></li>
                <li><a href="https://github.com/PriyanujBoruah/AI-Privacy-Core" target="_blank" class="hover:text-gray-950 transition">Open-Source Core</a></li>
              </ul>

              <div class="border-t border-gray-200/90 pt-3 mb-3.5">
                <span class="text-[10px] font-bold tracking-widest uppercase text-gray-900 font-mono">PRIVATE ACCESS</span>
              </div>
              <ul class="space-y-2.5 font-medium text-gray-600">
                <li><a href="/#access-section" class="hover:text-gray-950 transition">Request Invitation</a></li>
                <li><a href="/#access-section" class="hover:text-gray-950 transition">Redeem Invite Key</a></li>
                <li><a href="/dashboard" class="hover:text-gray-950 transition">Enterprise Onboarding</a></li>
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

        <!-- Giant Watermark Brand Name -->
        <div class="select-none pointer-events-none text-center text-[44px] sm:text-[90px] md:text-[135px] lg:text-[180px] font-bold tracking-tight text-gray-100/90 leading-none my-6 sm:my-10 overflow-hidden font-sans truncate">
          project<span class="text-[#f0523d]">spg</span>
        </div>

        <!-- Bottom Legal & Social Row -->
        <div class="border-t border-gray-100 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500 font-sans">
          <div class="text-[10px] font-mono text-gray-400 tracking-wider uppercase text-center md:text-left">
            © 2026 PROJECTSPG. ALL RIGHTS RESERVED.
          </div>

          <div class="flex flex-wrap items-center justify-center gap-5 sm:gap-7 text-xs text-gray-600">
            <a href="/" class="hover:text-gray-950 transition">Privacy Policy</a>
            <a href="/" class="hover:text-gray-950 transition">Terms of Service</a>
            <a href="/" class="hover:text-gray-950 transition">Security Disclosure</a>
          </div>

          <div class="flex items-center gap-4 text-gray-700">
            <a href="https://discord.gg" target="_blank" rel="noopener noreferrer" class="hover:text-gray-950 transition p-1" title="Discord">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
            </a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" class="hover:text-gray-950 transition p-1" title="X (Twitter)">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
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

  <script>
    const samplePayloads = {
      sea: "Patient Tan Wei Ling (NRIC: S9876543A, SingPass: tan.wl@gov.sg) registered Singapore business UEN 201812345K with account SG89 0140 1234 5678 9012. Malaysian colleague Lee Meng (MyKad: 880512-14-5521).",
      india: "Fintech onboarded Rahul Sharma (Aadhaar: 4123 5678 9120, PAN: ABCPS1234F). Salary disbursed to account IFSC: HDFC0001234, email rahul.sharma@paytm.in.",
      eu: "Senior Consultant Maximilian Weber (Steuer-ID: 04 459 821 346, IBAN: DE89 3704 0044 0532 0130 00). French counterpart Claire Dubois (INSEE: 2 85 07 75 123 456 78).",
      us: "Employee Johnathan Davis (SSN: 942-58-1034) processed reimbursement on Visa card 4532 0159 8243 1928 with corporate email jdavis@enterprise.corp."
    };

    function setSample(region) {
      document.getElementById('liveInputPrompt').value = samplePayloads[region] || samplePayloads.sea;
      runLiveVerification();
    }

    function runLiveVerification() {
      const input = document.getElementById('liveInputPrompt').value;
      let sanitized = input;
      const tokenMap = {};

      // Emails
      sanitized = sanitized.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}/g, (m) => {
        const tok = "[EMAIL_1]";
        tokenMap[tok] = m;
        return tok;
      });

      // Singapore NRIC / FIN
      sanitized = sanitized.replace(/\\b[STFGMC]\\d{7}[A-Z]\\b/g, (m) => {
        const tok = "[SG_NRIC_1]";
        tokenMap[tok] = m;
        return tok;
      });

      // Malaysia MyKad
      sanitized = sanitized.replace(/\\b\\d{6}-\\d{2}-\\d{4}\\b/g, (m) => {
        const tok = "[MY_MYKAD_1]";
        tokenMap[tok] = m;
        return tok;
      });

      // Singapore UEN
      sanitized = sanitized.replace(/\\b\\d{8,9}[A-Z]\\b/g, (m) => {
        const tok = "[SG_UEN_1]";
        tokenMap[tok] = m;
        return tok;
      });

      // India Aadhaar (12 digits with spaces or hyphens)
      sanitized = sanitized.replace(/\\b\\d{4}[\\s-]\\d{4}[\\s-]\\d{4}\\b/g, (m) => {
        const tok = "[IN_AADHAAR_1]";
        tokenMap[tok] = m;
        return tok;
      });

      // India PAN Card
      sanitized = sanitized.replace(/\\b[A-Z]{5}\\d{4}[A-Z]\\b/g, (m) => {
        const tok = "[IN_PAN_1]";
        tokenMap[tok] = m;
        return tok;
      });

      // German Steuer-ID (11 digits with spaces)
      sanitized = sanitized.replace(/\\b\\d{2}\\s\\d{3}\\s\\d{3}\\s\\d{3}\\b/g, (m) => {
        const tok = "[DE_STEUER_ID_1]";
        tokenMap[tok] = m;
        return tok;
      });

      // French INSEE/NIR
      sanitized = sanitized.replace(/\\b[12]\\s\\d{2}\\s\\d{2}\\s\\d{2}\\s\\d{3}\\s\\d{3}\\s\\d{2}\\b/g, (m) => {
        const tok = "[FR_NIR_1]";
        tokenMap[tok] = m;
        return tok;
      });

      // US SSN
      sanitized = sanitized.replace(/\\b\\d{3}-\\d{2}-\\d{4}\\b/g, (m) => {
        const tok = "[US_SSN_1]";
        tokenMap[tok] = m;
        return tok;
      });

      // Credit Cards (16 digits with spaces)
      sanitized = sanitized.replace(/\\b(?:4\\d{3}|5[1-5]\\d{2}|6011)[\\s-]\\d{4}[\\s-]\\d{4}[\\s-]\\d{4}\\b/g, (m) => {
        const tok = "[CREDIT_CARD_1]";
        tokenMap[tok] = m;
        return tok;
      });

      // IBAN (General)
      sanitized = sanitized.replace(/\\b[A-Z]{2}\\d{2}[\\s-]?[A-Z0-9]{4}[\\s-]?[A-Z0-9]{4}[\\s-]?[A-Z0-9]{4}[\\s-]?[A-Z0-9]{2,4}\\b/g, (m) => {
        const tok = "[IBAN_1]";
        tokenMap[tok] = m;
        return tok;
      });

      document.getElementById('liveOutputSanitized').innerText = sanitized;

      // Rehydrate
      let rehydrated = sanitized;
      for (const [tok, orig] of Object.entries(tokenMap)) {
        rehydrated = rehydrated.replaceAll(tok, orig);
      }
      document.getElementById('liveOutputRehydrated').innerText = rehydrated;
    }

    function copyTerminalCommands() {
      const text = document.getElementById('terminalCommands').innerText;
      navigator.clipboard.writeText(text).then(() => {
        const btn = document.querySelector('.terminal-copy-btn');
        btn.innerText = "✓ Copied";
        setTimeout(() => btn.innerText = "Copy", 2000);
      });
    }

    function scrollRelated(direction) {
      const track = document.getElementById('related-cards-track');
      if (track) {
        const scrollAmount = 320;
        track.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
      }
    }

    // Run on load
    runLiveVerification();
  </script>
</body>
</html>`;
