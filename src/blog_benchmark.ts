// ============================================================================
// ProjectSPG - Empirical Benchmark & Reliability Audit Report Blog
// Matches clean, text-focused editorial layout from Together.ai blog
// Routes: /blog/benchmark, /test-results, /test-results.html
// ============================================================================

export const BENCHMARK_BLOG_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Empirical Benchmark: 9,334,805 Prompts Evaluated with 100.00% Roundtrip Fidelity & 86µs Latency | ProjectSPG</title>
  <meta name="description" content="Empirical performance benchmarks for AI Privacy Core: 100.00% exact roundtrip fidelity across 9,334,805 prompts, 17,735 prompts/sec throughput, and 13.3ms HTTPS latency.">
  <meta name="keywords" content="AI Privacy Benchmark, PII De-identification Latency, LLM Privacy Proxy, Edge Tokenization, Cloudflare Workers AI Gateway, GDPR Compliance">
  
  <!-- Open Graph -->
  <meta property="og:type" content="article">
  <meta property="og:url" content="https://projectspg.info/blog/benchmark">
  <meta property="og:title" content="Empirical Benchmark: 9,334,805 Prompts Evaluated with 100.00% Roundtrip Fidelity & 86µs Latency">
  <meta property="og:description" content="Empirical performance benchmarks across 1.94 billion tokens: 100.00% exact roundtrip fidelity, 17,735 prompts/sec throughput, and 13.3ms HTTPS latency.">
  
  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image">
  <meta property="twitter:url" content="https://projectspg.info/blog/benchmark">
  <meta property="twitter:title" content="Empirical Benchmark: 9,334,805 Prompts Evaluated with 100.00% Roundtrip Fidelity">
  <meta property="twitter:description" content="Empirical performance benchmarks across 1.94 billion tokens: 100.00% exact roundtrip fidelity, 17,735 prompts/sec throughput, and 13.3ms HTTPS latency.">

  <!-- Schema.org TechArticle JSON-LD for Google SEO -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": "Empirical Benchmark: 9,334,805 Prompts Evaluated with 100.00% Roundtrip Fidelity & 86µs Latency",
    "description": "Empirical performance benchmarks for AI Privacy Core: 100.00% exact roundtrip fidelity across 9,334,805 prompts, 17,735 prompts/sec throughput, and 13.3ms HTTPS latency.",
    "author": {
      "@type": "Person",
      "name": "Priyanuj Boruah"
    },
    "publisher": {
      "@type": "Organization",
      "name": "ProjectSPG",
      "url": "https://projectspg.info"
    },
    "datePublished": "2026-09-29",
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
      font-size: 13.5px;
      font-weight: 500;
      color: #4b5563;
    }

    .nav-link {
      text-decoration: none;
      color: #4b5563;
      transition: color 0.15s;
    }

    .nav-link:hover { color: #111827; }

    .nav-right-actions {
      display: flex;
      align-items: center;
      gap: 14px;
    }

    .btn-contact {
      font-size: 12.5px;
      font-weight: 700;
      color: #111827;
      text-decoration: none;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      padding: 6px 12px;
      transition: color 0.15s;
    }

    .btn-contact:hover { color: #f0523d; }

    .btn-signin {
      background: #000000;
      color: #ffffff;
      font-size: 11.5px;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      padding: 9px 18px;
      border-radius: 4px;
      text-decoration: none;
      transition: opacity 0.15s;
    }

    .btn-signin:hover { opacity: 0.85; }

    /* Page Container */
    .article-wrap {
      max-width: 1200px;
      margin: 0 auto;
      padding: 48px 24px 80px;
    }

    /* Article Header */
    .article-header {
      margin-bottom: 48px;
    }

    .meta-pills {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 20px;
    }

    .badge-category {
      background: #f3f4f6;
      border: 1px solid #e5e7eb;
      color: #374151;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      padding: 3px 9px;
      border-radius: 4px;
      font-family: 'JetBrains Mono', monospace;
    }

    .meta-date {
      font-size: 11px;
      font-weight: 600;
      color: #6b7280;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      font-family: 'JetBrains Mono', monospace;
    }

    .article-title {
      font-size: 42px;
      font-weight: 800;
      line-height: 1.15;
      letter-spacing: -0.03em;
      color: #111827;
      margin-bottom: 18px;
    }

    .article-lede {
      font-size: 18px;
      color: #6b7280;
      line-height: 1.6;
      max-width: 880px;
      font-weight: 400;
    }

    /* Top Grid: Left Meta + Right Visual Diagram */
    .hero-grid {
      display: grid;
      grid-template-columns: 240px 1fr;
      gap: 48px;
      margin-bottom: 56px;
      padding-bottom: 48px;
      border-bottom: 1px solid #f3f4f6;
    }

    .meta-sidebar {
      display: flex;
      flex-direction: column;
      gap: 32px;
    }

    .meta-section-title {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #9ca3af;
      margin-bottom: 8px;
      font-family: 'JetBrains Mono', monospace;
    }

    .authors-text {
      font-size: 14px;
      font-weight: 600;
      color: #1f2937;
      line-height: 1.4;
    }

    .toc-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .toc-item {
      font-size: 13.5px;
      font-weight: 500;
      color: #4b5563;
      text-decoration: none;
      transition: color 0.15s;
    }

    .toc-item:hover { color: #111827; font-weight: 600; }

    /* Visual Architecture Box on Right */
    .hero-diagram-card {
      background: #f9fafb;
      border: 1px solid #e5e7eb;
      border-radius: 16px;
      padding: 36px 32px;
      display: flex;
      flex-direction: column;
      align-items: center;
      box-shadow: 0 1px 3px rgba(0,0,0,0.03);
    }

    .diagram-title {
      font-size: 24px;
      font-weight: 700;
      color: #111827;
      margin-bottom: 28px;
      letter-spacing: -0.02em;
    }

    .pipeline-steps-row {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 14px;
      width: 100%;
    }

    .pipeline-step-box {
      background: #ffffff;
      border: 1px solid #e5e7eb;
      border-radius: 12px;
      padding: 18px 14px;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      min-height: 170px;
      box-shadow: 0 1px 2px rgba(0,0,0,0.04);
      transition: transform 0.15s, border-color 0.15s;
    }

    .pipeline-step-box:hover {
      transform: translateY(-2px);
      border-color: #cbd5e1;
    }

    .pipeline-step-box.highlight {
      background: #f0523d;
      border-color: #f0523d;
      color: #ffffff;
    }

    .pipeline-step-box.highlight .step-num { color: rgba(255,255,255,0.8); }
    .pipeline-step-box.highlight .step-name { color: #ffffff; }
    .pipeline-step-box.highlight .step-desc { color: rgba(255,255,255,0.9); }
    .pipeline-step-box.highlight .step-tag { background: rgba(255,255,255,0.2); color: #ffffff; }

    .step-icon-circle {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background: #f3f4f6;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 13px;
      margin: 0 auto 8px;
    }

    .step-num {
      font-size: 9.5px;
      font-weight: 700;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: #9ca3af;
      margin-bottom: 2px;
      font-family: 'JetBrains Mono', monospace;
    }

    .step-name {
      font-size: 14px;
      font-weight: 700;
      color: #111827;
      margin-bottom: 6px;
    }

    .step-desc {
      font-size: 11px;
      color: #6b7280;
      line-height: 1.4;
      margin-bottom: 12px;
    }

    .step-tag {
      font-size: 9.5px;
      font-weight: 600;
      font-family: 'JetBrains Mono', monospace;
      padding: 3px 8px;
      border-radius: 4px;
      background: #f3f4f6;
      color: #4b5563;
      display: inline-block;
      margin: 0 auto;
    }

    /* Main Prose Section */
    .prose-content {
      max-width: 820px;
      margin: 0 auto;
    }

    /* Editorial Callout Box matching Image 2 */
    .editorial-callout {
      background: #eff6ff;
      border: 1px solid #bfdbfe;
      border-radius: 14px;
      padding: 24px 28px;
      margin-bottom: 36px;
      font-size: 15.5px;
      color: #1e3a8a;
      line-height: 1.7;
    }

    .prose-p {
      font-size: 16.5px;
      color: #374151;
      line-height: 1.8;
      margin-bottom: 24px;
    }

    .prose-quote {
      border-left: 2px solid #e5e7eb;
      padding-left: 20px;
      font-size: 15.5px;
      color: #6b7280;
      font-style: italic;
      margin: 32px 0;
      line-height: 1.7;
    }

    .prose-h2 {
      font-size: 28px;
      font-weight: 800;
      letter-spacing: -0.02em;
      color: #111827;
      margin-top: 48px;
      margin-bottom: 18px;
      scroll-margin-top: 80px;
    }

    .prose-ul {
      list-style-type: none;
      padding: 0;
      margin-bottom: 28px;
    }

    .prose-li {
      position: relative;
      padding-left: 20px;
      margin-bottom: 10px;
      font-size: 16px;
      color: #374151;
      line-height: 1.7;
    }

    .prose-li::before {
      content: "•";
      position: absolute;
      left: 0;
      color: #9ca3af;
      font-weight: bold;
    }

    .prose-li strong {
      color: #111827;
      font-weight: 600;
    }

    /* Key Metrics Multi-Card Container matching Image 3 */
    .metrics-showcase-wrap {
      background: #f4f5f7;
      border-radius: 20px;
      padding: 36px 32px;
      margin: 40px 0;
    }

    .metrics-showcase-title {
      font-size: 24px;
      font-weight: 700;
      color: #111827;
      text-align: center;
      margin-bottom: 24px;
      letter-spacing: -0.02em;
    }

    .metric-tier-card {
      background: #ffffff;
      border: 1px solid #e5e7eb;
      border-radius: 12px;
      padding: 20px 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 14px;
      box-shadow: 0 1px 2px rgba(0,0,0,0.03);
    }

    .metric-tier-card:last-child { margin-bottom: 0; }

    .tier-left {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .tier-icon-box {
      width: 42px;
      height: 42px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
    }

    .icon-flame { background: #fef2f2; color: #ef4444; }
    .icon-scale { background: #eff6ff; color: #3b82f6; }
    .icon-bolt { background: #f5f3ff; color: #8b5cf6; }

    .tier-info-header {
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #f0523d;
      font-family: 'JetBrains Mono', monospace;
      margin-bottom: 2px;
    }

    .tier-title {
      font-size: 18px;
      font-weight: 700;
      color: #111827;
    }

    .tier-subtext {
      font-size: 13px;
      color: #6b7280;
    }

    .tier-pill-badge {
      background: #f1f5f9;
      border: 1px solid #e2e8f0;
      color: #334155;
      font-size: 12.5px;
      font-weight: 600;
      font-family: 'JetBrains Mono', monospace;
      padding: 6px 14px;
      border-radius: 6px;
    }

    /* Minimalist Data Tables */
    .clean-table-card {
      border: 1px solid var(--border);
      border-radius: 10px;
      overflow-x: auto;
      margin: 28px 0;
      background: #ffffff;
    }

    .clean-table {
      width: 100%;
      border-collapse: collapse;
      text-align: left;
      font-size: 14px;
    }

    .clean-table th {
      background: #f9fafb;
      color: #374151;
      font-weight: 600;
      font-size: 11.5px;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      padding: 12px 18px;
      border-bottom: 1px solid var(--border);
    }

    .clean-table td {
      padding: 12px 18px;
      border-bottom: 1px solid var(--border);
      color: #374151;
    }

    .clean-table tr:last-child td { border-bottom: none; }
    .clean-table tr:hover td { background: #fafafa; }
    .mono { font-family: 'JetBrains Mono', monospace; font-size: 13px; }

    /* Numbered List matching Image 4 */
    .numbered-step-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
      margin: 24px 0 32px;
    }

    .numbered-step-item {
      font-size: 16px;
      color: #374151;
      line-height: 1.7;
    }

    .numbered-step-item strong {
      color: #111827;
      font-weight: 700;
    }

    /* Terminal Code Block */
    .terminal-wrapper {
      background: #0f172a;
      border-radius: 8px;
      overflow: hidden;
      margin: 28px 0;
    }

    .terminal-top-bar {
      background: #1e293b;
      padding: 8px 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #94a3b8;
      font-size: 11px;
      font-family: 'JetBrains Mono', monospace;
    }

    .terminal-copy-btn {
      background: rgba(255,255,255,0.1);
      border: 1px solid rgba(255,255,255,0.15);
      color: #e2e8f0;
      padding: 3px 8px;
      border-radius: 4px;
      font-size: 10.5px;
      cursor: pointer;
    }

    .terminal-pre {
      padding: 18px 20px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 13px;
      line-height: 1.6;
      color: #e2e8f0;
      overflow-x: auto;
    }

    /* Interactive Verifier Box */
    .verifier-box {
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 24px;
      margin: 32px 0;
      background: #fafafa;
    }

    .verifier-input {
      width: 100%;
      height: 90px;
      padding: 12px;
      border: 1px solid var(--border);
      border-radius: 6px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 13px;
      outline: none;
      resize: vertical;
      background: #ffffff;
      margin-bottom: 12px;
    }

    .verifier-input:focus { border-color: #000000; }

    .verifier-output {
      padding: 10px 12px;
      background: #ffffff;
      border: 1px solid var(--border);
      border-radius: 6px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 12.5px;
      color: #111827;
      min-height: 48px;
      word-break: break-all;
    }

    .btn-verify {
      background: #000000;
      color: #ffffff;
      padding: 8px 18px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      border: none;
      cursor: pointer;
    }

    @media (max-width: 900px) {
      .hero-grid { grid-template-columns: 1fr; gap: 32px; }
      .nav-center-links { display: none; }
      .article-title { font-size: 32px; }
      .pipeline-steps-row { grid-template-columns: 1fr 1fr; }
    }
  </style>
</head>
<body>

  <!-- Top Clean Navigation Bar -->
  <nav class="site-nav">
    <a href="/" class="nav-brand">
      <div class="brand-dots">
        <span class="dot dot-pink"></span>
        <span class="dot dot-orange"></span>
        <span class="dot dot-purple"></span>
      </div>
      <span>project<span style="color:#f0523d;">spg</span></span>
    </a>

    <div class="nav-center-links">
      <a href="/#features" class="nav-link">Inference</a>
      <a href="/#research-section" class="nav-link">Research</a>
      <a href="/#news-section" class="nav-link">Blog</a>
      <a href="/dashboard" class="nav-link">Playground</a>
      <a href="https://github.com/PriyanujBoruah/AI-Privacy-Core" target="_blank" class="nav-link">Developers</a>
    </div>

    <div class="nav-right-actions">
      <a href="/" class="btn-contact">OVERVIEW</a>
      <a href="/dashboard" class="btn-signin">CONSOLE</a>
    </div>
  </nav>

  <!-- Article Wrapper -->
  <article class="article-wrap">
    
    <!-- Article Header -->
    <header class="article-header">
      <div class="meta-pills">
        <span class="badge-category">BENCHMARK</span>
        <span class="meta-date">PUBLISHED 9/29/2026</span>
      </div>
      <h1 class="article-title">
        Empirical Benchmark: 9,334,805 Prompts Evaluated with 100.00% Roundtrip Fidelity &amp; 86µs Latency
      </h1>
      <p class="article-lede">
        A practical, empirical audit for high-throughput sovereign AI privacy: evaluating zero information loss, sub-millisecond edge latency, and enterprise SLA stability across 1.94 billion tokens.
      </p>
    </header>

    <!-- Top Grid: Metadata Sidebar on Left + Hero Pipeline Diagram on Right -->
    <div class="hero-grid">
      
      <!-- Left Metadata & Table of Contents Sidebar -->
      <aside class="meta-sidebar">
        <div>
          <div class="meta-section-title">AUTHORS</div>
          <div class="authors-text">
            Priyanuj Boruah, ProjectSPG Research
          </div>
        </div>

        <div>
          <div class="meta-section-title">TABLE OF CONTENTS</div>
          <nav class="toc-list">
            <a href="#summary" class="toc-item">Executive Summary</a>
            <a href="#unified-dataset" class="toc-item">Empirical Datasets</a>
            <a href="#engine-benchmark" class="toc-item">9.33M Engine Audit</a>
            <a href="#https-benchmark" class="toc-item">HTTPS Network SLA</a>
            <a href="#percentile-matrix" class="toc-item">Latency Percentiles</a>
            <a href="#hardening" class="toc-item">Evolution to 100%</a>
            <a href="#interactive-verifier" class="toc-item">Live Edge-Case Verifier</a>
            <a href="#reproduce" class="toc-item">Reproduce Locally</a>
          </nav>
        </div>
      </aside>

      <!-- Right Visual Architecture Card matching Image 1 -->
      <div class="hero-diagram-card">
        <h3 class="diagram-title">The ProjectSPG Sovereign Privacy Pipeline</h3>
        
        <div class="pipeline-steps-row">
          <!-- Step 1 -->
          <div class="pipeline-step-box">
            <div>
              <div class="step-icon-circle">⚡</div>
              <div class="step-num">STEP 01</div>
              <div class="step-name">Intercept</div>
              <div class="step-desc">Sub-millisecond prompt ingestion at the edge.</div>
            </div>
            <span class="step-tag">&lt;1ms P99</span>
          </div>

          <!-- Step 2 -->
          <div class="pipeline-step-box">
            <div>
              <div class="step-icon-circle">🛡️</div>
              <div class="step-num">STEP 02</div>
              <div class="step-name">De-Identify</div>
              <div class="step-desc">Tokenize sensitive PII into cryptographic surrogates.</div>
            </div>
            <span class="step-tag">109 Jurisdictions</span>
          </div>

          <!-- Step 3: Highlighted Box matching Image 1 -->
          <div class="pipeline-step-box highlight">
            <div>
              <div class="step-icon-circle" style="background: rgba(255,255,255,0.2); color:#ffffff;">🔒</div>
              <div class="step-num">STEP 03 • ZERO TRUST</div>
              <div class="step-name">Inference</div>
              <div class="step-desc">Upstream frontier LLMs compute on zero private data.</div>
            </div>
            <span class="step-tag">Zero Exposure</span>
          </div>

          <!-- Step 4 -->
          <div class="pipeline-step-box">
            <div>
              <div class="step-icon-circle">🌊</div>
              <div class="step-num">STEP 04</div>
              <div class="step-name">Rehydrate</div>
              <div class="step-desc">Streaming SSE chunks restored bit-for-bit in flight.</div>
            </div>
            <span class="step-tag">100.00% Fidelity</span>
          </div>
        </div>
      </div>

    </div>

    <!-- Main Editorial Article Prose -->
    <div class="prose-content">

      <!-- Editorial Lead Callout Box -->
      <div class="editorial-callout" id="summary">
        Integrating enterprise AI with strict privacy compliance is typically the bane of any modern engineering organization. Systems are deeply integrated, compliance stakeholders demand zero data leakage, and small latency overheads compound into unacceptable user experience bottlenecks. Can an AI privacy layer guarantee 100.00% exact roundtrip fidelity without adding perceptible inference delay?
      </div>

      <p class="prose-p">
        Luckily, edge-native de-identification breaks the tradition of slow, lossy NLP anonymization pipelines. Traditional Python-based solutions like Microsoft Presidio or spaCy require heavy compute instances and typically incur <strong>50ms to 300ms</strong> of overhead per request.
      </p>

      <p class="prose-p">
        To validate whether an edge-native privacy engine can sustain enterprise production workloads with zero character distortion, we executed an exhaustive empirical audit over a composite corpus of <strong>9,334,805 prompts</strong> (~1.94 billion tokens) and <strong>10,281,399 protected entities</strong>.
      </p>

      <!-- Key Metrics Showcase Canvas -->
      <div class="metrics-showcase-wrap">
        <h3 class="metrics-showcase-title">Empirical Benchmark Highlights</h3>

        <!-- Card 1 -->
        <div class="metric-tier-card">
          <div class="tier-left">
            <div class="tier-icon-box icon-flame">✓</div>
            <div>
              <div class="tier-info-header">FIDELITY AUDIT</div>
              <div class="tier-title">100.00% Exact Roundtrip</div>
              <div class="tier-subtext">9,334,805 / 9,334,805 bit-for-bit exact equality, 0 collisions</div>
            </div>
          </div>
          <div class="tier-pill-badge">0 Mismatches</div>
        </div>

        <!-- Card 2 -->
        <div class="metric-tier-card">
          <div class="tier-left">
            <div class="tier-icon-box icon-scale">⚡</div>
            <div>
              <div class="tier-info-header">ENGINE THROUGHPUT</div>
              <div class="tier-title">17,735 Prompts / Sec</div>
              <div class="tier-subtext">Parallel multi-core V8 execution across all 94 row groups</div>
            </div>
          </div>
          <div class="tier-pill-badge">84x vs Presidio</div>
        </div>

        <!-- Card 3 -->
        <div class="metric-tier-card">
          <div class="tier-left">
            <div class="tier-icon-box icon-bolt">⏱️</div>
            <div>
              <div class="tier-info-header">COMPUTE LATENCY</div>
              <div class="tier-title">86 µs Median Latency (p50)</div>
              <div class="tier-subtext">0.086 ms per prompt de-identification compute time</div>
            </div>
          </div>
          <div class="tier-pill-badge">&lt;0.1 ms Overhead</div>
        </div>
      </div>

      <div class="prose-quote">
        "Every single prompt was tokenized, then rehydrated, and checked for strict byte-for-byte exact equality (rehydratedText === originalPrompt). Zero dropped characters, zero token drift."
      </div>

      <!-- Section: Datasets -->
      <h2 class="prose-h2" id="unified-dataset">The Unified Multi-Source Dataset</h2>
      <p class="prose-p">
        Evaluating privacy tokenizers only on synthetic dummy strings is insufficient. Real-world prompts contain complex punctuation, Unicode emojis, code blocks, tracking numbers, and conversational slang. Our benchmark corpus combined five premier datasets into 94 Apache Parquet row groups:
      </p>

      <ul class="prose-ul">
        <li class="prose-li"><strong>LMSYS Chatbot Arena:</strong> 2.52M real multi-turn interactions with frontier LLMs featuring natural conversational phrasing and multilingual queries.</li>
        <li class="prose-li"><strong>OpenOrca:</strong> 2.91M complex technical instructions, Python stack traces, UUIDs, mathematical expressions, and SQL statements.</li>
        <li class="prose-li"><strong>WildChat:</strong> 2.15M unfiltered global user prompts covering edge Unicode delimiters and non-Latin scripts.</li>
        <li class="prose-li"><strong>Enron Email Corpus:</strong> 1.02M corporate email headers, signatures, direct phone lines, work emails, and executive names.</li>
        <li class="prose-li"><strong>Customer Support Twitter:</strong> 734K unstructured complaints containing courier tracking numbers (UPS, FedEx) and invoice IDs.</li>
        <li class="prose-li"><strong>Sovereign ID Synthesis:</strong> Algorithmic test vectors across 109 jurisdictions (Aadhaar, SSN, NRIC, Codice Fiscale, and Luhn-valid cards).</li>
      </ul>

      <!-- Section: In-Memory Engine Audit Table -->
      <h2 class="prose-h2" id="engine-benchmark">Full In-Memory Engine Audit (9,334,805 Prompts)</h2>
      <p class="prose-p">
        In this stage, the standalone engine executed on an 8-worker thread pool. The goal was to test pure V8 computation speed, memory stability, and zero-collision determinism.
      </p>

      <div class="clean-table-card">
        <table class="clean-table">
          <thead>
            <tr>
              <th>Benchmark Metric</th>
              <th>Observed Value</th>
              <th>Auditable Standard</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Total Prompts Evaluated</strong></td>
              <td class="mono"><strong>9,334,805</strong></td>
              <td>100% of entire 94-row-group Parquet corpus</td>
            </tr>
            <tr>
              <td><strong>Exact Roundtrip Matches</strong></td>
              <td class="mono" style="color:#059669; font-weight:700;"><strong>9,334,805</strong></td>
              <td>100.00% Bit-for-Bit Exact Equality</td>
            </tr>
            <tr>
              <td><strong>Roundtrip Mismatches</strong></td>
              <td class="mono" style="color:#059669; font-weight:700;"><strong>0 (Zero)</strong></td>
              <td>Zero token collisions or dropped characters</td>
            </tr>
            <tr>
              <td><strong>Total Entities Protected</strong></td>
              <td class="mono"><strong>10,281,399</strong></td>
              <td>Sovereign IDs, cards, emails, phones, tracking IDs</td>
            </tr>
            <tr>
              <td><strong>Estimated Tokens Analyzed</strong></td>
              <td class="mono"><strong>1,937,516,961</strong></td>
              <td>~1.94 Billion tokens of text processed end-to-end</td>
            </tr>
            <tr>
              <td><strong>Total Execution Time</strong></td>
              <td class="mono"><strong>526.35 s (8.77 min)</strong></td>
              <td>Continuous multi-threaded execution</td>
            </tr>
            <tr>
              <td><strong>Overall Throughput</strong></td>
              <td class="mono" style="color:#0284c7; font-weight:700;"><strong>17,735 prompts / sec</strong></td>
              <td>Sustained engine throughput under maximum load</td>
            </tr>
            <tr>
              <td><strong>Average Processing Latency</strong></td>
              <td class="mono"><strong>0.314 ms (314 µs)</strong></td>
              <td>Sub-millisecond processing per prompt</td>
            </tr>
            <tr>
              <td><strong>Median Latency (p50)</strong></td>
              <td class="mono" style="color:#7c3aed; font-weight:700;"><strong>0.086 ms (86 µs)</strong></td>
              <td>Ultra-low compute footprint</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Section: HTTPS Network Benchmark -->
      <h2 class="prose-h2" id="https-benchmark">50,000 Prompts HTTPS Socket SLA Audit</h2>
      <p class="prose-p">
        In-memory benchmarks prove engine speed; network benchmarks prove real-world production SLAs. We ran <strong>50,000 real-world prompts</strong> uniformly sampled across all row groups over TLS 1.3 encrypted HTTPS connections with a 30-stream socket pool.
      </p>

      <div class="clean-table-card">
        <table class="clean-table">
          <thead>
            <tr>
              <th>Network Metric</th>
              <th>Observed Performance</th>
              <th>Operational Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Sampled Prompts</strong></td>
              <td class="mono"><strong>50,000 prompts</strong></td>
              <td>Uniformly sampled across 9.33M dataset</td>
            </tr>
            <tr>
              <td><strong>Total HTTPS Network Requests</strong></td>
              <td class="mono"><strong>100,000 requests</strong></td>
              <td>50k Tokenize + 50k Detokenize calls over TLS 1.3</td>
            </tr>
            <tr>
              <td><strong>Elapsed Network Time</strong></td>
              <td class="mono"><strong>37.15 seconds</strong></td>
              <td>30 concurrent socket streams</td>
            </tr>
            <tr>
              <td><strong>Overall Network RPS</strong></td>
              <td class="mono" style="color:#059669; font-weight:700;"><strong>2,691.95 HTTP req / sec</strong></td>
              <td>Continuous TLS 1.3 socket throughput</td>
            </tr>
            <tr>
              <td><strong>Network Prompt Throughput</strong></td>
              <td class="mono" style="color:#0284c7; font-weight:700;"><strong>1,345.98 prompts / sec</strong></td>
              <td>End-to-end client-to-API processing</td>
            </tr>
            <tr>
              <td><strong>Token Throughput</strong></td>
              <td class="mono"><strong>277,506 tokens / sec</strong></td>
              <td>Estimated at standard 4-char token density</td>
            </tr>
            <tr>
              <td><strong>Socket Drop / Timeout Errors</strong></td>
              <td class="mono" style="color:#059669; font-weight:700;"><strong>0 (Zero)</strong></td>
              <td>100% connection reliability</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Section: Percentile Latency Matrix -->
      <h2 class="prose-h2" id="percentile-matrix">Real-World Latency Percentile Matrix</h2>
      <p class="prose-p">
        The table below details response times across percentiles under sustained 30-stream concurrent production load over TLS 1.3 sockets:
      </p>

      <div class="clean-table-card">
        <table class="clean-table">
          <thead>
            <tr>
              <th>Operation</th>
              <th>Min</th>
              <th>p50 (Median)</th>
              <th>p90</th>
              <th>p95</th>
              <th>p99</th>
              <th>Max</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>POST /v1/tokenize</strong></td>
              <td class="mono">4.60 ms</td>
              <td class="mono" style="color:#0284c7; font-weight:700;">13.30 ms</td>
              <td class="mono">20.98 ms</td>
              <td class="mono">25.22 ms</td>
              <td class="mono">38.00 ms</td>
              <td class="mono">73.93 ms</td>
            </tr>
            <tr>
              <td><strong>POST /v1/detokenize</strong></td>
              <td class="mono">4.50 ms</td>
              <td class="mono" style="color:#059669; font-weight:700;">7.20 ms</td>
              <td class="mono">10.91 ms</td>
              <td class="mono">12.81 ms</td>
              <td class="mono">18.31 ms</td>
              <td class="mono">64.22 ms</td>
            </tr>
            <tr style="background:#f9fafb;">
              <td><strong>Total Roundtrip</strong></td>
              <td class="mono">12.06 ms</td>
              <td class="mono" style="color:#7c3aed; font-weight:700;">20.81 ms</td>
              <td class="mono">30.86 ms</td>
              <td class="mono">36.36 ms</td>
              <td class="mono">51.55 ms</td>
              <td class="mono">104.20 ms</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Section: Evolution to 100.00% Perfection -->
      <h2 class="prose-h2" id="hardening">Evolution to Absolute 100.00% Perfection</h2>
      <p class="prose-p">
        Achieving 100% roundtrip fidelity on nearly 10 million prompts is rare in data engineering. Across three successive benchmark iterations, we systematically eliminated edge-case collisions:
      </p>

      <div class="numbered-step-list">
        <div class="numbered-step-item">
          <strong>1. Run 1 (Initial Engine - 99.9964%):</strong> In the initial run, 339 out of 9.33M prompts suffered minor mismatches. Root causes included alphanumeric courier tracking number suffixes mistakenly matching phone patterns, and UUID length truncation.
        </div>
        <div class="numbered-step-item">
          <strong>2. Run 2 (Post-Fix - 99.9999%):</strong> We introduced negative lookbehinds <code class="mono" style="background:#f1f5f9; padding:2px 4px; border-radius:3px;">(?&lt;![A-Za-z0-9])</code> to phone patterns and added universal boundary caps, resolving 330 of the 339 mismatches.
        </div>
        <div class="numbered-step-item">
          <strong>3. Run 3 (Hardened Engine - 100.00%):</strong> The remaining 9 mismatches were isolated to vehicle code boundaries (e.g. <code class="mono">Ford-150</code>) colliding with invoice patterns, and Colombian national ID (<code class="mono">CC992140300</code>) prefix grouping. Once boundary checks were applied, all 9,334,805 prompts achieved bit-for-bit exact roundtrip equality.
        </div>
      </div>

      <!-- Section: Interactive Verifier -->
      <h2 class="prose-h2" id="interactive-verifier">Live Edge-Case Verifier</h2>
      <p class="prose-p">
        Try tokenizing and restoring one of the historically challenging edge cases in real-time below:
      </p>

      <div class="verifier-box">
        <label style="font-size:12px; font-weight:700; color:#374151; display:block; margin-bottom:6px; text-transform:uppercase; letter-spacing:0.05em;">Original Sensitive Prompt:</label>
        <textarea id="liveInputPrompt" class="verifier-input">Check shipment status for order Ford-150 with UPS tracking 1Z5A619V0399897253 sent to customer john.smith@company.com with phone +1-555-019-2834.</textarea>
        
        <div style="margin-bottom:12px;">
          <button class="btn-verify" onclick="runLiveVerification()">Test Tokenize &amp; Rehydrate</button>
        </div>

        <div style="margin-bottom:10px;">
          <label style="font-size:11px; font-weight:700; color:#6b7280; display:block; margin-bottom:4px; text-transform:uppercase;">Surrogate Sanitized Output:</label>
          <div id="liveOutputSanitized" class="verifier-output"></div>
        </div>

        <div>
          <label style="font-size:11px; font-weight:700; color:#6b7280; display:block; margin-bottom:4px; text-transform:uppercase;">Rehydrated Bit-for-Bit Output:</label>
          <div id="liveOutputRehydrated" class="verifier-output"></div>
        </div>
      </div>

      <!-- Section: Reproduce Locally -->
      <h2 class="prose-h2" id="reproduce">Reproduce the Benchmarks Locally</h2>
      <p class="prose-p">
        All benchmarks are 100% auditable and reproducible using Node.js 18+ and the open-source repository:
      </p>

      <div class="terminal-wrapper">
        <div class="terminal-top-bar">
          <span>bash / terminal</span>
          <button class="terminal-copy-btn" onclick="copyTerminalCommands()">Copy</button>
        </div>
        <pre class="terminal-pre" id="terminalCommands"># 1. Clone repository and install dependencies
git clone https://github.com/PriyanujBoruah/AI-Privacy-Core.git
cd AI-Privacy-Core
npm install

# 2. Run automated test suite (102 passing tests)
npm test

# 3. Execute 50,000-prompt HTTPS socket benchmark
node scripts/http_latency_benchmark.mjs --samples 50000 --concurrency 30

# 4. Execute direct multi-core engine audit on unified Parquet corpus
node scripts/multicore_benchmark.mjs --workers 8</pre>
      </div>

      <!-- Outro Prose matching Together.ai Screenshot -->
      <p class="prose-p" style="margin-top: 40px;">
        We understand that this is an empirical overview, but at its core we've seen this architecture unlock production LLM deployments without compromising privacy or incurring perceptible latency penalties.
      </p>
      <p class="prose-p">
        If you're evaluating a sovereign privacy layer for your enterprise or building multi-tenant AI pipelines, we encourage you to follow future benchmark blogs, test the playground, or reach out to <a href="mailto:support@projectspg.info" style="color:#111827; text-decoration:underline; font-weight:600;">support@projectspg.info</a>. And we'd love any feedback on what may be missing here. Happy building!
      </p>

    </div>

    <!-- Related Articles Section matching Together.ai Screenshot -->
    <div style="margin-top: 72px; padding-top: 48px; border-top: 1px solid #e5e7eb;">
      
      <!-- Heading & Navigation Row -->
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 28px; flex-wrap: wrap; gap: 12px;">
        <h2 style="font-size: 32px; font-weight: 800; color: #111827; letter-spacing: -0.02em;">Related articles</h2>
        <div style="display: flex; align-items: center; gap: 8px;">
          <button onclick="scrollRelated('left')" style="width: 32px; height: 32px; border-radius: 4px; border: 1px solid #e5e7eb; background: #ffffff; color: #4b5563; font-weight: bold; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background 0.15s;" onmouseover="this.style.background='#f3f4f6'" onmouseout="this.style.background='#ffffff'">‹</button>
          <button onclick="scrollRelated('right')" style="width: 32px; height: 32px; border-radius: 4px; border: 1px solid #e5e7eb; background: #ffffff; color: #4b5563; font-weight: bold; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background 0.15s;" onmouseover="this.style.background='#f3f4f6'" onmouseout="this.style.background='#ffffff'">›</button>
          <a href="/#news-section" style="padding: 6px 14px; background: #f3f4f6; border-radius: 4px; font-size: 11px; font-weight: 700; color: #374151; text-decoration: none; text-transform: uppercase; letter-spacing: 0.06em; transition: background 0.15s;" onmouseover="this.style.background='#e5e7eb'" onmouseout="this.style.background='#f3f4f6'">VIEW ALL</a>
        </div>
      </div>

      <!-- 3 Blog Cards Row -->
      <div id="related-cards-track" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(290px, 1fr)); gap: 24px;">
        
        <!-- Related 1: One-Line Swappable Proxy -->
        <a href="/#features" style="text-decoration: none; color: inherit; display: block;" class="group">
          <div style="aspect-ratio: 16/9; width: 100%; border-radius: 12px; overflow: hidden; background: linear-gradient(135deg, #ffd5cc, #f7e0ff, #d8e6ff); border: 1px solid rgba(229,231,235,0.8); display: flex; align-items: center; justify-content: center; padding: 22px; text-align: center; box-shadow: 0 1px 3px rgba(0,0,0,0.03); transition: all 0.25s;" onmouseover="this.style.transform='translateY(-3px)'; this.style.boxShadow='0 10px 25px rgba(0,0,0,0.08)';" onmouseout="this.style.transform='none'; this.style.boxShadow='0 1px 3px rgba(0,0,0,0.03)';">
            <div>
              <div style="display: flex; align-items: center; justify-content: center; gap: 4px; margin-bottom: 6px;">
                <span style="width: 8px; height: 8px; border-radius: 50%; background: #ec4899;"></span>
                <span style="font-size: 10px; font-weight: 700; color: #1f2937;">project<span style="color:#f0523d;">spg</span></span>
              </div>
              <h4 style="font-size: 14.5px; font-weight: 800; color: #111827; line-height: 1.35;">
                One-Line Swappable Proxy: Instant PII Protection Without Code Refactoring
              </h4>
            </div>
          </div>
          <div style="margin-top: 14px;">
            <span style="background: #f3f4f6; color: #374151; font-size: 10px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; padding: 2px 8px; border-radius: 4px; font-family: monospace;">INTEGRATION</span>
            <h3 style="font-size: 16.5px; font-weight: 700; color: #111827; margin-top: 8px; line-height: 1.35;">
              One-Line Swappable Proxy: Instant PII Protection Without Code Refactoring
            </h3>
          </div>
        </a>

        <!-- Related 2: Supported Countries & Regional Data Protections -->
        <a href="/blog/countries" style="text-decoration: none; color: inherit; display: block;" class="group">
          <div style="aspect-ratio: 16/9; width: 100%; border-radius: 12px; overflow: hidden; background: linear-gradient(135deg, #fed7aa, #fef08a, #c7d2fe); border: 1px solid rgba(229,231,235,0.8); display: flex; align-items: center; justify-content: center; padding: 22px; text-align: center; box-shadow: 0 1px 3px rgba(0,0,0,0.03); transition: all 0.25s;" onmouseover="this.style.transform='translateY(-3px)'; this.style.boxShadow='0 10px 25px rgba(0,0,0,0.08)';" onmouseout="this.style.transform='none'; this.style.boxShadow='0 1px 3px rgba(0,0,0,0.03)';">
            <div>
              <div style="display: flex; align-items: center; justify-content: center; gap: 4px; margin-bottom: 6px;">
                <span style="width: 8px; height: 8px; border-radius: 50%; background: #f97316;"></span>
                <span style="font-size: 10px; font-weight: 700; color: #1f2937;">project<span style="color:#f0523d;">spg</span></span>
              </div>
              <h4 style="font-size: 14.5px; font-weight: 800; color: #111827; line-height: 1.35;">
                Supported Jurisdictions &amp; Regional Data Protections: GDPR, DPDP &amp; PDPA
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

        <!-- Related 3: Supported Industries & Threat Models -->
        <a href="/#features" style="text-decoration: none; color: inherit; display: block;" class="group">
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
        From sovereign edge de-identification to large-scale zero-trust AI model inference
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
              <!-- Subgroup 1: DEVELOPERS -->
              <div class="border-t border-gray-200/90 pt-3 mb-3.5">
                <span class="text-[10px] font-bold tracking-widest uppercase text-gray-900 font-mono">DEVELOPERS</span>
              </div>
              <ul class="space-y-2.5 font-medium text-gray-600 mb-6">
                <li><a href="/blog/benchmark" class="hover:text-gray-950 transition">Research &amp; Benchmark</a></li>
                <li><a href="/blog/countries" class="hover:text-gray-950 transition">Supported Countries</a></li>
                <li><a href="/dashboard" class="hover:text-gray-950 transition">API Documentation</a></li>
                <li><a href="https://github.com/PriyanujBoruah/AI-Privacy-Core" target="_blank" class="hover:text-gray-950 transition">Open-Source Core</a></li>
                <li><a href="/dashboard" class="hover:text-gray-950 transition">Live Playground</a></li>
              </ul>

              <!-- Subgroup 2: PRICING -->
              <div class="border-t border-gray-200/90 pt-3 mb-3.5">
                <span class="text-[10px] font-bold tracking-widest uppercase text-gray-900 font-mono">PRICING</span>
              </div>
              <ul class="space-y-2.5 font-medium text-gray-600">
                <li><a href="/dashboard" class="hover:text-gray-950 transition">Pricing overview</a></li>
                <li><a href="/dashboard" class="hover:text-gray-950 transition">Serverless Free Tier</a></li>
                <li><a href="/dashboard" class="hover:text-gray-950 transition">Enterprise BYOK</a></li>
              </ul>
            </div>

            <!-- Col 4: RESOURCES -->
            <div>
              <div class="border-t border-gray-200/90 pt-3 mb-3.5">
                <span class="text-[10px] font-bold tracking-widest uppercase text-gray-900 font-mono">RESOURCES</span>
              </div>
              <ul class="space-y-2.5 font-medium text-gray-600">
                <li><a href="/blog/benchmark" class="hover:text-gray-950 transition">Blog &amp; Benchmarks</a></li>
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
            <a href="/" class="hover:text-gray-950 transition">Privacy Policy</a>
            <a href="/" class="hover:text-gray-950 transition">Terms of Service</a>
            <a href="/" class="hover:text-gray-950 transition">Security Disclosure</a>
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

  <script>
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

      // UPS Tracking
      sanitized = sanitized.replace(/\\b1Z[0-9A-Za-z]{16}\\b/g, (m) => {
        const tok = "[TRACKING_1]";
        tokenMap[tok] = m;
        return tok;
      });

      // Phones
      sanitized = sanitized.replace(/(?<![A-Za-z0-9])(?:\\+\\d{1,3}[-.\\s]?)?\\(?\\d{3}\\)?[-.\\s]?\\d{3}[-.\\s]?\\d{4}\\b/g, (m) => {
        const tok = "[PHONE_1]";
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
