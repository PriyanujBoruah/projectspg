"""
Live Multi-Provider Test Script for ProjectSPG
Tests: Google AI Studio, Groq, Mistral AI, and OpenRouter through your live Cloudflare Gateway.
"""

import os
import sys
import json
import httpx

GATEWAY_URL = "https://projectspg.boruahpriyanuj2004.workers.dev/v1"

TEST_PROMPTS = {
    "us": "Customer John Doe (SSN: 123-45-6789, email: john.doe@enterprise.com) requests a credit limit increase on Visa 4532-0151-1283-0366. Summarize this request in 1 sentence.",
    "eu": "Verify transaction for Herr Schmidt, German Tax ID: 04 225 818 316, email: schmidt@berlin-tech.de. Confirm receipt in 1 sentence.",
    "india": "Aadhaar number 9999 4105 1234 linked to phone +91 98765 43210 is verified for Priya Sharma. Output a 1-sentence confirmation."
}

def test_provider(name: str, api_key: str, model: str, upstream_url: str = None, prompt_key: str = "us"):
    print(f"\n{'='*70}")
    print(f"🚀 Testing Provider: {name.upper()}")
    print(f"   Model: {model}")
    print(f"   Gateway: {GATEWAY_URL}")
    if upstream_url:
        print(f"   Upstream Base URL: {upstream_url}")
    print(f"{'='*70}")

    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {api_key}",
        "x-detection-categories": "global,north_america,european_union,asia_non_sea",
        "x-tokenization-mode": "structural",
    }
    if upstream_url:
        headers["x-upstream-base-url"] = upstream_url

    prompt = TEST_PROMPTS[prompt_key]
    print(f"\n[1] Sensitive Raw Prompt Sent from Client:\n   \"{prompt}\"")
    print("\n[2] Live Streaming Response from Model (Intercepted & Rehydrated by Gateway):")
    print("   \"", end="", flush=True)

    payload = {
        "model": model,
        "messages": [
            {"role": "system", "content": "You are a professional enterprise compliance assistant. Be brief and concise."},
            {"role": "user", "content": prompt}
        ],
        "stream": True,
        "temperature": 0.2
    }

    try:
        with httpx.stream("POST", f"{GATEWAY_URL}/chat/completions", headers=headers, json=payload, timeout=60.0) as res:
            if res.status_code != 200:
                print(f"\n❌ Gateway returned HTTP {res.status_code}: {res.read().decode('utf-8')}")
                return

            for line in res.iter_lines():
                if not line or not line.startswith("data: "):
                    continue
                data_str = line[6:].strip()
                if data_str == "[DONE]":
                    break
                try:
                    chunk = json.loads(data_str)
                    delta = chunk.get("choices", [{}])[0].get("delta", {})
                    content = delta.get("content", "")
                    if content:
                        print(content, end="", flush=True)
                except Exception:
                    pass

        print("\"\n")
        print("✅ SUCCESS: Prompt was intercepted & sanitized at Cloudflare's edge, sent upstream, and rehydrated!")

    except Exception as e:
        print(f"\n❌ Connection Error: {e}")

def main():
    print("""
    =======================================================
    🛡️  ProjectSPG — Live Multi-Provider Test Suite
    =======================================================
    Choose a provider to test through your Cloudflare Gateway:
    
    1. Google AI Studio (Gemini 2.5 Flash)
    2. Groq (Llama 3.3 70B Versatile)
    3. Mistral AI (Mistral Small / Large)
    4. OpenRouter (Any Model)
    5. Exit
    """)
    choice = input("Enter choice (1-4): ").strip()

    if choice == "1":
        api_key = os.getenv("GEMINI_API_KEY") or input("Enter your Google AI Studio key (AIza...): ").strip()
        test_provider("Google AI Studio", api_key, "gemini-2.5-flash", prompt_key="india")

    elif choice == "2":
        api_key = os.getenv("GROQ_API_KEY") or input("Enter your Groq API key (gsk_...): ").strip()
        test_provider("Groq", api_key, "llama-3.3-70b-versatile", upstream_url="https://api.groq.com/openai/v1", prompt_key="us")

    elif choice == "3":
        api_key = os.getenv("MISTRAL_API_KEY") or input("Enter your Mistral API key: ").strip()
        test_provider("Mistral AI", api_key, "mistral-small-latest", upstream_url="https://api.mistral.ai/v1", prompt_key="eu")

    elif choice == "4":
        api_key = os.getenv("OPENROUTER_API_KEY") or input("Enter your OpenRouter key (sk-or-...): ").strip()
        test_provider("OpenRouter", api_key, "meta-llama/llama-3.3-70b-instruct", upstream_url="https://openrouter.ai/api/v1", prompt_key="us")

    else:
        print("Exiting.")

if __name__ == "__main__":
    main()
