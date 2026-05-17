**AI Test Failure Analyzer (Playwright + CI Scaling)**

A Playwright TypeScript automation framework enhanced with an **AI-powered failure triage system**, designed to scale from single test failures to CI-level insights.

**Why This Project Exists**

We’ve optimized how tests run:

* fast execution
* parallel pipelines
* stable frameworks

But one major problem remains:

> Understanding *why* tests fail is still manual.

Engineers spend time:

* reading logs
* analyzing stack traces
* correlating failures

This project explores a simple idea:

> Treat test failures as structured inputs
> and add a reasoning layer on top.

---

**What This Project Does**

### 1. Capture Failures

Automatically stores Playwright failures as structured JSON:

```json
{
  "testTitle": "...",
  "errorMessage": "...",
  "stackTrace": "...",
  "retry": 0
}
```

### 2. Analyze Failures (Single)

Generate AI-based explanation for one failure:

```bash
npm run ai:triage -- --input failure-artifacts/<file>.json
```

Output:

```txt
Root cause: Assertion mismatch
Category: test_issue
Suggested next step: Update expected text
```

### 3. Batch Analysis (CI-Scale)

Analyze all failures together:

```bash
npm run ai:triage:batch
```

Output:

```txt
AI Batch Failure Summary

Total failures: 3
test_issue: 2
flaky_or_environment: 1
```

## 🏗️ Architecture

```txt
Playwright Test Run
        ↓
Failure Artifacts (JSON)
        ↓
Format & Normalize Context
        ↓
AI Reasoning Layer
        ↓
Single Analysis / Batch Summary
        ↓
CI Report / Insights
```

## ⚙️ How It Works

### Step 1 — Run Tests

```bash
npx playwright test
```

Failures are saved in:

```txt
failure-artifacts/
```

### Step 2 — Run AI Triage (Single)

```bash
npm run ai:triage -- --input failure-artifacts/<file>.json
```

### Step 3 — Run Batch Triage

```bash
npm run ai:triage:batch
```

## 📂 Project Structure

```txt
fixtures/
pages/
tests/

utils/aiTriage/
  ├── analyzeFailure.ts
  ├── formatFailure.ts
  ├── runTriage.ts
  ├── runBatchTriage.ts
  ├── saveFailureArtifact.ts
  └── types.ts

failure-artifacts/
ai-triage-reports/
```

## 🧪 Framework Features

* Playwright + TypeScript
* Page Object Model
* Custom fixtures
* Reusable test data
* ESLint + Prettier
* GitHub Actions CI

## 🎯 Application Under Test

[SauceDemo](https://www.saucedemo.com)

Flows covered:

* login
* inventory validation
* add/remove cart
* checkout flow
* form validation

---

## 🔍 Example Use Case

Failure:

```txt
Expected: "Thank you for your order!!!"
Received: "Thank you for your order!"
```

AI Output:

```txt
Root cause: Assertion mismatch
Category: test_issue
Suggested next step: Update expected text
```

## 🧠 Key Idea

This project is not about replacing debugging.

> It reduces the time from **failure → understanding**

## ⚠️ Limitations

* Depends on input quality
* Limited context (no full DOM / trace yet)
* AI output may vary
* Complex failures need deeper analysis

