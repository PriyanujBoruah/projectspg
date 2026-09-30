// ============================================================================
// ProjectSPG - Enterprise Guardrails for Regulated Industries Blog
// Matches clean, text-focused editorial layout from Together.ai blog
// Routes: /blog/industries, /industries, /supported-industries
// ============================================================================

export const INDUSTRIES_BLOG_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Enterprise Guardrails for Regulated Industries: Healthcare, FinTech, Legal & Defense | ProjectSPG</title>
  <meta name="description" content="Explore how ProjectSPG sanitizes, protects, and secures sensitive enterprise data across healthcare (HIPAA), banking (PCI-DSS/GLBA), legal privilege, defense (ITAR), and DevSecOps.">
  <meta name="keywords" content="Enterprise AI Privacy, HIPAA LLM Guardrails, FinTech AI Security, PCI-DSS Masking, Legal Privilege AI Proxy, ITAR Defense AI, PII Redaction, Tokenization Engine">
  
  <!-- Open Graph -->
  <meta property="og:type" content="article">
  <meta property="og:url" content="https://projectspg.info/blog/industries">
  <meta property="og:title" content="Enterprise Guardrails for Regulated Industries: Healthcare, FinTech, Legal & Defense">
  <meta property="og:description" content="How ProjectSPG eliminates cross-border PII leakage, protects clinical PHI under HIPAA, secures banking assets under PCI-DSS, and preserves legal privilege without code changes.">
  <meta property="og:image" content="https://projectspg.info/og-industries.png">

  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image">
  <meta property="twitter:url" content="https://projectspg.info/blog/industries">
  <meta property="twitter:title" content="Enterprise Guardrails for Regulated Industries: Healthcare, FinTech, Legal & Defense">
  <meta property="twitter:description" content="How ProjectSPG eliminates cross-border PII leakage, protects clinical PHI under HIPAA, secures banking assets under PCI-DSS, and preserves legal privilege without code changes.">

  <!-- Schema.org TechArticle JSON-LD for Google SEO -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": "Enterprise Guardrails for Regulated Industries: Healthcare, FinTech, Legal & Defense",
    "description": "Comprehensive analysis of sector-specific AI threat models, regulatory mandates (HIPAA, PCI-DSS, GLBA, ITAR), and cryptographic sanitization architecture implemented by ProjectSPG.",
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
      background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%);
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
      background: linear-gradient(90deg, #8b5cf6, #ec4899);
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
        <li><a href="/blog/benchmark">Benchmark</a></li>
        <li><a href="/blog/countries">Countries</a></li>
        <li><a href="/blog/industries" style="color: #f0523d; font-weight: 600;">Industries</a></li>
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
      <span class="badge-category">ENTERPRISE</span>
      <span class="post-date">PUBLISHED 9/30/2026</span>
    </div>

    <!-- Title & Subtitle -->
    <h1 class="article-title">
      Enterprise Guardrails for Regulated Industries: Healthcare, FinTech, Legal &amp; Defense
    </h1>

    <p class="article-subtitle">
      A comprehensive technical deep-dive into how ProjectSPG sanitizes, protects, and cryptographically secures clinical PHI, banking ledger records, attorney-client privileged memos, defense parameters, and cloud credentials before payload egress to public LLMs.
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
          <li><a href="#threat-landscape">1. Industry AI Threat Landscape</a></li>
          <li><a href="#healthcare">2. Healthcare &amp; Life Sciences (HIPAA)</a></li>
          <li><a href="#fintech">3. Banking &amp; Capital Markets (PCI/GLBA)</a></li>
          <li><a href="#legal">4. Legal &amp; Corporate Counsel</a></li>
          <li><a href="#defense">5. Defense, Aerospace &amp; GovCloud</a></li>
          <li><a href="#devsecops">6. DevSecOps &amp; Cloud Secrets</a></li>
          <li><a href="#taxonomy">7. Entity Sanitization Taxonomy</a></li>
          <li><a href="#sandbox">8. Interactive Industry Testbed</a></li>
          <li><a href="#implementation">9. Enterprise Architecture Deployment</a></li>
        </ul>
      </div>

      <!-- Right Column: Visual Telemetry Card -->
      <div class="hero-visual-card">
        <div class="hero-visual-header">
          <span style="display:flex; align-items:center; gap:8px;">
            <span style="width:8px; height:8px; border-radius:50%; background:#8b5cf6;"></span>
            SECTOR THREAT MODEL DISPATCH
          </span>
          <span style="color:#64748b;">40+ ASSET CLASSES PROTECTED</span>
        </div>
        <div class="hero-visual-body">
          <div style="font-size: 13px; font-family: 'JetBrains Mono', monospace; color: #94a3b8; margin-bottom: 16px;">
            // Real-time zero-knowledge sector guardrails:
          </div>

          <!-- Mini Sector Grid in Hero -->
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; font-family: 'JetBrains Mono', monospace; font-size: 12px;">
            <div style="background: rgba(255,255,255,0.05); padding: 12px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.08);">
              <div style="color: #ec4899; font-weight:700;">HEALTHCARE (HIPAA)</div>
              <div style="color: #cbd5e1; font-size: 11px; margin-top: 4px;">45 CFR § 164.514 Safe Harbor</div>
              <div style="color: #4ade80; font-size: 10.5px; margin-top: 2px;">MRN, ICD-10, HICN, Rx, Specimen IDs</div>
            </div>

            <div style="background: rgba(255,255,255,0.05); padding: 12px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.08);">
              <div style="color: #38bdf8; font-weight:700;">FINTECH &amp; BANKING</div>
              <div style="color: #cbd5e1; font-size: 11px; margin-top: 4px;">PCI-DSS v4.0, GLBA Safeguards</div>
              <div style="color: #4ade80; font-size: 10.5px; margin-top: 2px;">PAN (Luhn), IBAN (Mod-97), SWIFT, Wire</div>
            </div>

            <div style="background: rgba(255,255,255,0.05); padding: 12px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.08);">
              <div style="color: #f59e0b; font-weight:700;">LEGAL &amp; M&amp;A COUNSEL</div>
              <div style="color: #cbd5e1; font-size: 11px; margin-top: 4px;">Attorney-Client Privilege, MNPI</div>
              <div style="color: #4ade80; font-size: 10.5px; margin-top: 2px;">Merger Targets, Deal Caps, Depositions</div>
            </div>

            <div style="background: rgba(255,255,255,0.05); padding: 12px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.08);">
              <div style="color: #a855f7; font-weight:700;">DEVSECOPS &amp; DEFENSE</div>
              <div style="color: #cbd5e1; font-size: 11px; margin-top: 4px;">ITAR, CMMC 2.0, SOC 2 Type II</div>
              <div style="color: #4ade80; font-size: 10.5px; margin-top: 2px;">API Keys, JWTs, DB URIs, Weapons Specs</div>
            </div>
          </div>

          <div style="margin-top: 18px; padding-top: 14px; border-top: 1px solid rgba(255,255,255,0.1); display: flex; align-items: center; justify-content: space-between; font-size: 11.5px; font-family: 'JetBrains Mono', monospace;">
            <span style="color: #4ade80;">● ACTIVE SECTOR SHIELDS: 100% IN-FLIGHT</span>
            <span style="color: #94a3b8;">ZERO RETENTION • REVERSIBLE SURROGATES</span>
          </div>
        </div>
      </div>

    </div>

    <!-- Editorial Blue Callout on Industry Liabilities -->
    <div class="editorial-callout">
      <strong>The Regulated Industry AI Exposure Reality:</strong> A single employee copying an unredacted patient discharge summary into ChatGPT triggers a Tier 4 HIPAA violation costing up to <strong>$2,000,000 annually</strong> in civil monetary penalties. A financial analyst inputting acquisition balance sheets forfeits non-public material information (MNPI) under SEC and FINRA rules. A corporate litigator analyzing client settlement terms waives <strong>Attorney-Client Privilege</strong> under Federal Rule of Evidence 502. ProjectSPG renders outbound tokens mathematically unidentifiable at the edge before packet departure, shielding enterprises from catastrophic regulatory and evidentiary forfeiture.
    </div>

    <!-- 4 High-Impact Metric Cards -->
    <div class="metric-grid">
      <div class="metric-card">
        <div class="metric-val">6+</div>
        <div class="metric-sub">Regulated Industry Sectors Shielded</div>
      </div>

      <div class="metric-card">
        <div class="metric-val">40+</div>
        <div class="metric-sub">Protected Sensitive Asset Classes</div>
      </div>

      <div class="metric-card">
        <div class="metric-val">0%</div>
        <div class="metric-sub">Raw Data Leakage to Third-Party AI</div>
      </div>

      <div class="metric-card">
        <div class="metric-val">&lt;1ms</div>
        <div class="metric-sub">Edge Sanitization &amp; Roundtrip Overhead</div>
      </div>
    </div>

    <!-- Section 1: The Threat Landscape -->
    <section id="threat-landscape" style="margin-top: 56px;">
      <h2 style="font-size: 26px; font-weight: 800; color: #0f172a; letter-spacing: -0.02em; margin-bottom: 16px;">
        1. The Regulated Industry AI Threat Landscape
      </h2>
      <p>
        Generative AI adoption inside modern enterprises has outpaced traditional cybersecurity perimeter controls. Enterprise employees across hospitals, hedge funds, law firms, and defense contractors routinely use generative models to draft communications, summarize clinical trials, audit balance sheets, and debug backend software.
      </p>
      <p style="margin-top: 14px;">
        However, the fundamental architectural premise of cloud-hosted frontier LLMs—including OpenAI GPT-4o, Anthropic Claude 3.5 Sonnet, Google Gemini 1.5 Pro, and DeepSeek V3—relies on centralized ingest servers that log HTTP requests, process data in shared GPU memory pools, and potentially store prompts for monitoring or fine-tuning.
      </p>
      <p style="margin-top: 14px;">
        When sensitive corporate or sovereign payloads transit across public networks unmasked, the enterprise faces four acute risk vectors:
      </p>
      <ul style="margin-top: 10px; padding-left: 20px; line-height: 1.8; color: #334155;">
        <li><strong>Regulatory Non-Compliance:</strong> Massive statutory fines under HIPAA, GDPR, India DPDP, and PCI-DSS v4.0 for unauthorized third-party processing.</li>
        <li><strong>Evidentiary Privilege Waiver:</strong> Inadvertent forfeiture of legal privilege and work-product protection under judicial precedent when third parties process confidential legal drafts.</li>
        <li><strong>Intellectual Property &amp; Trade Secret Exfiltration:</strong> Proprietary algorithmic trading weights, drug molecular targets, and source code leaking into model training corpora or cloud logs.</li>
        <li><strong>Credential &amp; Infrastructure Compromise:</strong> Developers accidentally submitting production database connection strings, JWT tokens, and AWS root credentials into AI coding assistants.</li>
      </ul>
    </section>

    <!-- Section 2: Healthcare & Life Sciences -->
    <section id="healthcare" style="margin-top: 56px;">
      <h2 style="font-size: 26px; font-weight: 800; color: #0f172a; letter-spacing: -0.02em; margin-bottom: 16px;">
        2. Healthcare, Pharmaceuticals &amp; Life Sciences
      </h2>
      <p>
        Under the Health Insurance Portability and Accountability Act (HIPAA) Privacy Rule and the HITECH Act, Covered Entities and Business Associates are strictly liable for the unauthorized exposure of Protected Health Information (PHI).
      </p>
      <div style="margin-top: 20px; background: #fafafa; border: 1px solid var(--border); border-radius: 12px; padding: 24px;">
        <h3 style="font-size: 18px; font-weight: 700; color: #0f172a; margin-bottom: 12px; display:flex; align-items:center; gap:8px;">
          <span style="color:#ec4899;">■</span> HIPAA Safe Harbor Method (45 CFR § 164.514(b)(2)) Enforcement
        </h3>
        <p style="font-size: 14.5px; color: #4b5563;">
          ProjectSPG automatically intercepts, masks, and tokenizes all 18 statutorily defined direct and indirect identifiers in clinical text:
        </p>
        <ul style="margin-top: 10px; font-size: 14px; color: #374151; padding-left: 20px; line-height: 1.8;">
          <li><strong>Patient Identifiers:</strong> Names, aliases, next-of-kin, emergency contact names mapped to consistent surrogates (<code>[PATIENT_1]</code>, <code>[DOCTOR_1]</code>).</li>
          <li><strong>Clinical Numbers:</strong> Medical Record Numbers (MRNs), Health Plan Beneficiary numbers, Account numbers, Certificate/license numbers.</li>
          <li><strong>Temporal &amp; Geographic Data:</strong> Admission dates, discharge dates, dates of death, ages over 89, postal codes, and specific clinical facilities.</li>
          <li><strong>Biometric &amp; Genetic Data:</strong> Genomic sequencing accession IDs, lab specimen tags, and pathology sample barcodes.</li>
        </ul>
      </div>
      <p style="margin-top: 14px;">
        <strong>Clinical Rehydration Guarantee:</strong> When a physician asks an LLM to generate a treatment plan for a patient with complex comorbidities, the outbound prompt replaces all PHI with cryptographically reversible surrogates. When the LLM streams its diagnostic reasoning back, ProjectSPG instantly rehydrates the original patient context locally, enabling full clinical utility without third-party exposure.
      </p>
    </section>

    <!-- Section 3: Banking & FinTech -->
    <section id="fintech" style="margin-top: 56px;">
      <h2 style="font-size: 26px; font-weight: 800; color: #0f172a; letter-spacing: -0.02em; margin-bottom: 16px;">
        3. Banking, Capital Markets &amp; FinTech
      </h2>
      <p>
        Global financial institutions operate under strict statutory regimes including the Gramm-Leach-Bliley Act (GLBA Safeguards Rule), PCI-DSS v4.0, FINRA Rule 4511, and the EU Payment Services Directive (PSD2).
      </p>
      
      <div class="pro-table-wrapper">
        <table class="pro-table">
          <thead>
            <tr>
              <th>Financial Asset Class</th>
              <th>Syntactic Format &amp; Mathematical Checksum</th>
              <th>Governing Mandate</th>
              <th>Sanitization Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Primary Account Numbers (PAN)</strong></td>
              <td>15–16 digit cards (Visa, MasterCard, Amex) verified via Luhn Algorithm</td>
              <td><span class="table-tag tag-blue">PCI-DSS v4.0 Req 3.4</span></td>
              <td>Masked to surrogate tokens with preserved card brand and last-4 digits for billing context</td>
            </tr>
            <tr>
              <td><strong>International Bank Account (IBAN)</strong></td>
              <td>Up to 34 alphanumeric chars verified via ISO 13616 Modulo-97 algorithm</td>
              <td><span class="table-tag tag-purple">SWIFT / SEPA / PSD2</span></td>
              <td>Replaced with deterministic FPE tokens preserving bank country prefix (e.g. <code>[IBAN_DE_1]</code>)</td>
            </tr>
            <tr>
              <td><strong>Wire Transfer Instructions</strong></td>
              <td>Fedwire / ABA routing numbers (9 digits), SWIFT BIC codes (8–11 chars)</td>
              <td><span class="table-tag tag-green">GLBA Safeguards</span></td>
              <td>Anonymized routing paths preventing account takeover and wire fraud vectors</td>
            </tr>
            <tr>
              <td><strong>Tax Identification Credentials</strong></td>
              <td>US SSN/EIN, India PAN/Aadhaar (Verhoeff), Brazil CPF, German Steuer-ID</td>
              <td><span class="table-tag tag-amber">SOX / FINRA / KYC</span></td>
              <td>Cryptographic irreversible hashing or session-scoped surrogate tokenization</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Section 4: Legal & Corporate Counsel -->
    <section id="legal" style="margin-top: 56px;">
      <h2 style="font-size: 26px; font-weight: 800; color: #0f172a; letter-spacing: -0.02em; margin-bottom: 16px;">
        4. Legal Practice, Litigation &amp; Corporate Counsel
      </h2>
      <p>
        For general counsels, litigation partners, and corporate deal attorneys, confidentiality is not merely a privacy policy—it is a condition precedent to the existence of <strong>Attorney-Client Privilege</strong> and the <strong>Attorney Work-Product Doctrine</strong>.
      </p>
      <p style="margin-top: 14px;">
        Under Federal Rule of Evidence 502 and international professional responsibility standards, disclosing privileged legal advice or work-product to a third party lacking fiduciary protection can trigger a <em>subject-matter waiver</em>, forcing the law firm to disclose all related internal deliberations in litigation discovery.
      </p>
      <div style="margin-top: 20px; background: #fafafa; border: 1px solid var(--border); border-radius: 12px; padding: 24px;">
        <h3 style="font-size: 18px; font-weight: 700; color: #0f172a; margin-bottom: 12px; display:flex; align-items:center; gap:8px;">
          <span style="color:#f59e0b;">■</span> Protected Legal Artifacts
        </h3>
        <ul style="font-size: 14px; color: #374151; padding-left: 20px; line-height: 1.8;">
          <li><strong>M&amp;A Non-Public Material Information (MNPI):</strong> Acquisition targets, EBITDA multiples, enterprise valuations, breakup fees, and regulatory antitrust filings.</li>
          <li><strong>Deposition Transcripts &amp; Witness Prep:</strong> Unredacted witness names, non-public testimony excerpts, litigation strategy notes, and settlement damage calculations.</li>
          <li><strong>Confidential Contract Negotiations:</strong> Exclusivity clauses, non-compete terms, intellectual property royalty schedules, and indemnification caps.</li>
        </ul>
      </div>
    </section>

    <!-- Section 5: Defense & Aerospace -->
    <section id="defense" style="margin-top: 56px;">
      <h2 style="font-size: 26px; font-weight: 800; color: #0f172a; letter-spacing: -0.02em; margin-bottom: 16px;">
        5. Defense, Aerospace &amp; Sovereign Government
      </h2>
      <p>
        Government contractors and defense industrial base (DIB) organizations handle Controlled Unclassified Information (CUI) governed by the International Traffic in Arms Regulations (ITAR), Export Administration Regulations (EAR), and the Cybersecurity Maturity Model Certification (CMMC 2.0).
      </p>
      <p style="margin-top: 14px;">
        Under ITAR § 120.17, transmitting technical data regarding items on the United States Munitions List (USML) across foreign servers constitutes an illegal deemed export. ProjectSPG resolves this by providing <strong>Sovereign Enclave Geofencing</strong>:
      </p>
      <ul style="margin-top: 10px; padding-left: 20px; line-height: 1.8; color: #334155;">
        <li><strong>Strict Boundary Routing:</strong> Packets are cryptographically prevented from transiting foreign edge relays or third-party cloud data centers outside designated national boundaries.</li>
        <li><strong>Military Credential Masking:</strong> CAGE codes, DUNS numbers, military serial numbers, and clearance classification markings (e.g. <code>CUI//SP-DEFENSE</code>) are quarantined at the local boundary.</li>
        <li><strong>Air-Gapped Edge Deployments:</strong> Support for self-hosted edge instances operating in completely isolated VPCs with Bring-Your-Own-KMS key governance.</li>
      </ul>
    </section>

    <!-- Section 6: DevSecOps & Cloud Secrets -->
    <section id="devsecops" style="margin-top: 56px;">
      <h2 style="font-size: 26px; font-weight: 800; color: #0f172a; letter-spacing: -0.02em; margin-bottom: 16px;">
        6. DevSecOps, Cloud Infrastructure &amp; Technical Secrets
      </h2>
      <p>
        Modern software development teams routinely submit code snippets, stack traces, and configuration files to AI coding assistants and terminal harness tools. Without automated guardrails, high-entropy secrets are transmitted directly to external model providers.
      </p>
      <p style="margin-top: 14px;">
        ProjectSPG’s technical secret detection layer operates at the syntactic byte level, identifying and neutralizing:
      </p>
      <ul style="margin-top: 10px; padding-left: 20px; line-height: 1.8; color: #334155;">
        <li><strong>API Tokens &amp; Private Keys:</strong> AWS access keys (<code>AKIA...</code>), OpenAI secret keys (<code>sk-...</code>), GitHub personal access tokens, Stripe live secrets, and SSH RSA/ED25519 private keys.</li>
        <li><strong>Database Connection Strings:</strong> Full connection URIs with embedded passwords (e.g. <code>postgres://user:pass@internal-cluster.rds.amazonaws.com:5432/prod_db</code>).</li>
        <li><strong>Internal Topology:</strong> RFC 1918 private IPv4 addresses (<code>10.0.0.0/8</code>, <code>192.168.0.0/16</code>), internal VPC hostnames, and MAC hardware addresses.</li>
      </ul>
    </section>

    <!-- Section 7: Entity Sanitization Taxonomy -->
    <section id="taxonomy" style="margin-top: 56px;">
      <h2 style="font-size: 26px; font-weight: 800; color: #0f172a; letter-spacing: -0.02em; margin-bottom: 16px;">
        7. Comprehensive Entity Sanitization Taxonomy
      </h2>
      <p>
        ProjectSPG categorizes sensitive enterprise data across three distinct security classes with specific cryptographic handling modes:
      </p>

      <div class="pro-table-wrapper">
        <table class="pro-table">
          <thead>
            <tr>
              <th>Classification</th>
              <th>Examples</th>
              <th>Threat Vector</th>
              <th>Sanitization Strategy</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Direct Identifiers</strong></td>
              <td>SSN, Aadhaar, NRIC, Passport Number, Credit Card PAN</td>
              <td>Immediate identity theft, regulatory breach, financial fraud</td>
              <td><span class="table-tag tag-blue">Surrogate Tokenization with Checksum Validation</span></td>
            </tr>
            <tr>
              <td><strong>Quasi-Identifiers</strong></td>
              <td>DOB, Postal Code, Job Title + Organization, Admission Date</td>
              <td>Re-identification via database cross-correlation attacks</td>
              <td><span class="table-tag tag-purple">Generalization &amp; Differential Masking</span></td>
            </tr>
            <tr>
              <td><strong>Corporate &amp; Technical Secrets</strong></td>
              <td>API Keys, M&amp;A Valuations, DB URIs, Trade Secrets</td>
              <td>Infrastructure compromise, insider trading, IP theft</td>
              <td><span class="table-tag tag-rose">High-Entropy Redaction &amp; Key Replacement</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Section 8: Interactive Industry Testbed -->
    <section id="sandbox" style="margin-top: 56px;">
      <h2 style="font-size: 26px; font-weight: 800; color: #0f172a; letter-spacing: -0.02em; margin-bottom: 16px;">
        8. Interactive Industry Sanitization Testbed
      </h2>
      <p>
        Experience real-time sector sanitization. Toggle between industry profiles to observe immediate in-flight tokenization and lossless rehydration:
      </p>

      <div class="verifier-box">
        <div class="verifier-header">
          <span style="font-weight: 700; font-size: 14px; color: #0f172a;">INDUSTRY THREAT TESTBED</span>
          <div style="display:flex; flex-wrap:wrap; gap:8px;">
            <button onclick="setIndustrySample('healthcare')" style="background:#f1f5f9; border:none; padding:4px 10px; border-radius:6px; font-size:11.5px; font-weight:600; cursor:pointer; color:#334155;">Healthcare (HIPAA)</button>
            <button onclick="setIndustrySample('fintech')" style="background:#f1f5f9; border:none; padding:4px 10px; border-radius:6px; font-size:11.5px; font-weight:600; cursor:pointer; color:#334155;">FinTech (Banking)</button>
            <button onclick="setIndustrySample('legal')" style="background:#f1f5f9; border:none; padding:4px 10px; border-radius:6px; font-size:11.5px; font-weight:600; cursor:pointer; color:#334155;">Legal (M&amp;A)</button>
            <button onclick="setIndustrySample('devops')" style="background:#f1f5f9; border:none; padding:4px 10px; border-radius:6px; font-size:11.5px; font-weight:600; cursor:pointer; color:#334155;">DevSecOps (Keys)</button>
          </div>
        </div>

        <div style="margin-bottom: 16px;">
          <label style="display:block; font-size: 12px; font-weight: 700; color: #4b5563; margin-bottom: 6px; text-transform: uppercase; font-family:'JetBrains Mono', monospace;">
            Inbound Enterprise Prompt:
          </label>
          <textarea id="industryInputPrompt" rows="3" style="width:100%; border:1px solid #cbd5e1; border-radius:8px; padding:12px; font-family:'JetBrains Mono', monospace; font-size:13px; color:#1e293b; outline:none;" oninput="runIndustryVerification()">Patient Eleanor Vance (MRN: 902-481-229, DOB: 04/18/1972) admitted to St. Jude Cardiac ICU. Prescribed 50mg Metoprolol (Rx: 4892018). Contact doctor dr.marcus@hospital.org or call 415-555-0199.</textarea>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
          <div>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
              <span style="font-size: 11px; font-weight: 700; color: #f0523d; text-transform: uppercase; font-family:'JetBrains Mono', monospace;">
                ● SENT TO PUBLIC LLM (SANITIZED)
              </span>
              <span style="font-size: 10px; color: #10b981; font-weight: 600;">ZERO PHI LEAKAGE</span>
            </div>
            <div id="industryOutputSanitized" style="background:#0f121d; color:#38bdf8; padding:14px; border-radius:8px; font-family:'JetBrains Mono', monospace; font-size:12.5px; min-height:100px; white-space:pre-wrap; border:1px solid #1e293b;"></div>
          </div>

          <div>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
              <span style="font-size: 11px; font-weight: 700; color: #10b981; text-transform: uppercase; font-family:'JetBrains Mono', monospace;">
                ● RETURNED TO APPLICATION (REHYDRATED)
              </span>
              <span style="font-size: 10px; color: #64748b; font-weight: 600;">100% REVERSIBLE FIDELITY</span>
            </div>
            <div id="industryOutputRehydrated" style="background:#f8fafc; color:#1e293b; padding:14px; border-radius:8px; font-family:'JetBrains Mono', monospace; font-size:12.5px; min-height:100px; white-space:pre-wrap; border:1px solid #cbd5e1;"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 9: Enterprise Architecture Deployment -->
    <section id="implementation" style="margin-top: 56px;">
      <h2 style="font-size: 26px; font-weight: 800; color: #0f172a; letter-spacing: -0.02em; margin-bottom: 16px;">
        9. Enterprise Architecture Deployment
      </h2>
      <p>
        ProjectSPG is completely wire-compatible with OpenAI SDKs, LangChain, LiteLLM, and LlamaIndex. Point your application's base URL to ProjectSPG to enforce sector guardrails in under 60 seconds:
      </p>

      <div class="terminal-box">
        <div class="terminal-header">
          <div class="terminal-dots">
            <span class="t-dot t-red"></span>
            <span class="t-dot t-yellow"></span>
            <span class="t-dot t-green"></span>
          </div>
          <span>enterprise_guardrail_client.py</span>
          <button onclick="copyTerminalCommands()" class="terminal-copy-btn" style="background:#334155; border:none; color:#f8fafc; padding:3px 9px; border-radius:4px; font-size:11px; cursor:pointer;">Copy</button>
        </div>
        <div class="terminal-body" id="terminalCommands">
<span class="t-comment"># Drop-in enterprise proxy with zero code refactoring</span>
<span class="t-keyword" style="color:#c084fc;">import</span> os
<span class="t-keyword" style="color:#c084fc;">from</span> openai <span class="t-keyword" style="color:#c084fc;">import</span> OpenAI

client = OpenAI(
    api_key=os.environ.get(<span class="t-out">"OPENAI_API_KEY"</span>),
    <span class="t-accent">base_url="https://projectspg.info/v1"</span>,  <span class="t-comment"># ProjectSPG Wire Proxy</span>
    default_headers={
        <span class="t-out">"x-detection-categories"</span>: <span class="t-out">"healthcare,fintech,corporate,global"</span>,
        <span class="t-out">"x-tokenization-mode"</span>: <span class="t-out">"surrogate"</span>
    }
)

<span class="t-comment"># Send sensitive clinical / banking prompt</span>
response = client.chat.completions.create(
    model=<span class="t-out">"gpt-4o"</span>,
    messages=[{
        <span class="t-out">"role"</span>: <span class="t-out">"user"</span>,
        <span class="t-out">"content"</span>: <span class="t-out">"Summarize patient Eleanor Vance (MRN: 902-481-229) cardiothoracic status."</span>
    }]
)

<span class="t-cmd">print</span>(response.choices[0].message.content)
<span class="t-success"># =&gt; LLM receives sanitized [PATIENT_1]; returned response is automatically rehydrated.</span>
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

        <!-- Related 2: Supported Countries -->
        <a href="/blog/countries" style="text-decoration: none; color: inherit; display: block;" class="group">
          <div style="aspect-ratio: 16/9; width: 100%; border-radius: 12px; overflow: hidden; background: linear-gradient(135deg, #fed7aa, #fef08a, #c7d2fe); border: 1px solid rgba(229,231,235,0.8); display: flex; align-items: center; justify-content: center; padding: 22px; text-align: center; box-shadow: 0 1px 3px rgba(0,0,0,0.03); transition: all 0.25s;" onmouseover="this.style.transform='translateY(-3px)'; this.style.boxShadow='0 10px 25px rgba(0,0,0,0.08)';" onmouseout="this.style.transform='none'; this.style.boxShadow='0 1px 3px rgba(0,0,0,0.03)';">
            <div>
              <div style="display: flex; align-items: center; justify-content: center; gap: 4px; margin-bottom: 6px;">
                <span style="width: 8px; height: 8px; border-radius: 50%; background: #f97316;"></span>
                <span style="font-size: 10px; font-weight: 700; color: #1f2937;">project<span style="color:#f0523d;">spg</span></span>
              </div>
              <h4 style="font-size: 14.5px; font-weight: 800; color: #111827; line-height: 1.35;">
                Global Sovereign AI Privacy: 109 Jurisdictions Supported by ProjectSPG
              </h4>
            </div>
          </div>
          <div style="margin-top: 14px;">
            <span style="background: #f3f4f6; color: #374151; font-size: 10px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; padding: 2px 8px; border-radius: 4px; font-family: monospace;">COMPLIANCE</span>
            <h3 style="font-size: 16.5px; font-weight: 700; color: #111827; margin-top: 8px; line-height: 1.35;">
              Supported Jurisdictions &amp; Regional Data Protections: GDPR, DPDP &amp; PDPA
            </h3>
          </div>
        </a>

        <!-- Related 3: Supported Industries (Current article) -->
        <a href="/blog/industries" style="text-decoration: none; color: inherit; display: block;" class="group">
          <div style="aspect-ratio: 16/9; width: 100%; border-radius: 12px; overflow: hidden; background: #0f121d; border: 1px solid rgba(229,231,235,0.2); display: flex; align-items: center; justify-content: center; padding: 22px; text-align: center; box-shadow: 0 1px 3px rgba(0,0,0,0.03); transition: all 0.25s;" onmouseover="this.style.transform='translateY(-3px)'; this.style.boxShadow='0 10px 25px rgba(0,0,0,0.2)';" onmouseout="this.style.transform='none'; this.style.boxShadow='0 1px 3px rgba(0,0,0,0.03)';">
            <div>
              <div style="display: flex; align-items: center; justify-content: center; gap: 4px; margin-bottom: 6px;">
                <span style="width: 8px; height: 8px; border-radius: 50%; background: #8b5cf6;"></span>
                <span style="font-size: 10px; font-weight: 700; color: #94a3b8;">project<span style="color:#f0523d;">spg</span></span>
              </div>
              <h4 style="font-size: 14.5px; font-weight: 800; color: #ffffff; line-height: 1.35;">
                Enterprise Guardrails for Regulated Industries: Healthcare, FinTech, Legal &amp; Defense
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
        From sector-grade de-identification across healthcare, banking, and defense to large-scale zero-trust AI model inference
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
                <li><a href="/blog/industries" class="hover:text-gray-950 transition">Regulated Industries</a></li>
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
                <li><a href="/blog/industries" class="hover:text-gray-950 transition">Industry Guardrails</a></li>
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
    const industrySamples = {
      healthcare: "Patient Eleanor Vance (MRN: 902-481-229, DOB: 04/18/1972) admitted to St. Jude Cardiac ICU. Prescribed 50mg Metoprolol (Rx: 4892018). Contact doctor dr.marcus@hospital.org or call 415-555-0199.",
      fintech: "Authorize wire transfer of $2,450,000 to Beneficiary Alpha Holdings (IBAN: DE89 3704 0044 0532 0130 00, BIC: DEUTDEDBFXX). Debit corporate Visa card 4532 0159 8243 1928, routing ABA: 121000358.",
      legal: "CONFIDENTIAL M&A MEMORANDUM: Project Titan acquisition of Apex Semiconductor for $4.2B ($38.50/share). Target EBITDA: $320M. Key counsel review by attorney sarah.jen@skadden-corp.law.",
      devops: "DEBUG CONNECTION ISSUE: Failed connecting to postgres://admin_prod:Secr3tP@ssw0rd!@db-primary.vpc-internal.corp:5432/analytics with AWS key AKIAIOSFODNN7EXAMPLE and OpenAI sk-proj-8429184029482910."
    };

    function setIndustrySample(sector) {
      document.getElementById('industryInputPrompt').value = industrySamples[sector] || industrySamples.healthcare;
      runIndustryVerification();
    }

    function runIndustryVerification() {
      const input = document.getElementById('industryInputPrompt').value;
      let sanitized = input;
      const tokenMap = {};

      // Emails
      sanitized = sanitized.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}/g, (m) => {
        const tok = "[EMAIL_1]";
        tokenMap[tok] = m;
        return tok;
      });

      // AWS Access Keys
      sanitized = sanitized.replace(/\\bAKIA[0-9A-Z]{16}\\b/g, (m) => {
        const tok = "[AWS_ACCESS_KEY_1]";
        tokenMap[tok] = m;
        return tok;
      });

      // OpenAI secret keys
      sanitized = sanitized.replace(/\\bsk-[a-zA-Z0-9_-]{20,}\\b/g, (m) => {
        const tok = "[AI_API_KEY_1]";
        tokenMap[tok] = m;
        return tok;
      });

      // Database connection strings
      sanitized = sanitized.replace(/postgres:\\/\\/[^\\s]+/g, (m) => {
        const tok = "[DB_CONNECTION_URI_1]";
        tokenMap[tok] = m;
        return tok;
      });

      // MRN (Medical Record Numbers)
      sanitized = sanitized.replace(/\\bMRN:\\s*[0-9-]+/gi, (m) => {
        const tok = "MRN: [PROTECTED_MRN_1]";
        tokenMap[tok] = m;
        return tok;
      });

      // Rx (Prescriptions)
      sanitized = sanitized.replace(/\\bRx:\\s*[0-9]+/gi, (m) => {
        const tok = "Rx: [PROTECTED_RX_1]";
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

      // Phones
      sanitized = sanitized.replace(/(?<![A-Za-z0-9])(?:\\+\\d{1,3}[-.\\s]?)?\\(?\\d{3}\\)?[-.\\s]?\\d{3}[-.\\s]?\\d{4}\\b/g, (m) => {
        const tok = "[PHONE_1]";
        tokenMap[tok] = m;
        return tok;
      });

      // Dollar amounts in deals (e.g. $4.2B, $2,450,000)
      sanitized = sanitized.replace(/\\$[0-9,.]+[BMKbmk]?/g, (m) => {
        const tok = "[FINANCIAL_VAL_1]";
        tokenMap[tok] = m;
        return tok;
      });

      document.getElementById('industryOutputSanitized').innerText = sanitized;

      // Rehydrate
      let rehydrated = sanitized;
      for (const [tok, orig] of Object.entries(tokenMap)) {
        rehydrated = rehydrated.replaceAll(tok, orig);
      }
      document.getElementById('industryOutputRehydrated').innerText = rehydrated;
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
    runIndustryVerification();
  </script>
</body>
</html>`;
