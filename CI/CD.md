# 🚀 CI/CD – Complete Implementation Notes (Step-by-Step)

This file is written in the **same learning + implementation style** as your `next-auth` notes. It explains **what CI/CD is, why each step exists, and how to implement it properly in real projects**.

---

# 📌 WHAT PROBLEM CI/CD SOLVES

Without CI/CD:

* Bugs reach `main`
* Manual testing every time
* Manual deployment
* Human errors
* Broken production

CI/CD automates:

* Code validation
* Testing
* Build checks
* Deployment

---

# 🧠 CORE DEFINITIONS (MEMORIZE)

| Term     | Meaning                                    |
| -------- | ------------------------------------------ |
| CI       | Continuous Integration (code validation)   |
| CD       | Continuous Delivery / Deployment (release) |
| Pipeline | Automated steps executed on events         |
| Job      | Group of steps                             |
| Step     | Single command                             |
| Runner   | Machine executing pipeline                 |
| Artifact | Output of build                            |

---

# 🧩 HIGH-LEVEL FLOW (MENTAL MODEL)

```
Developer → Push / PR → CI → Merge → CD → Production
```

If CI fails → flow STOPS.

---

# 🧪 PART 1 — CONTINUOUS INTEGRATION (CI)

## What CI does

CI ensures your code is **safe to merge**.

### CI responsibilities

* Install dependencies
* Run lint
* Run tests
* Build project

CI **never deploys**.

---

## When CI runs

* On pull_request
* On push (optional)

---

## CI folder structure

```
.github/
  workflows/
    ci.yml
```

---

## Example CI Workflow (GitHub Actions)

```yaml
name: CI

on:
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20

      - run: npm install
      - run: npm run lint
      - run: npm test
      - run: npm run build
```

---

## Why each step exists

| Step       | Purpose            |
| ---------- | ------------------ |
| checkout   | Get repo code      |
| setup-node | Runtime version    |
| install    | Dependencies       |
| lint       | Code quality       |
| test       | Logic correctness  |
| build      | Compile validation |

---

# 🔒 BRANCH PROTECTION (MANDATORY)

CI is useless without this.

### Enable in GitHub:

* Settings → Branches → main
* Require status checks
* Require CI workflow
* Block direct pushes

✅ Result: merge blocked if CI fails.

---

# 🚚 PART 2 — CONTINUOUS DEPLOYMENT (CD)

CD handles **releasing validated code**.

It starts **only after CI + merge success**.

---

## Two types of CD

### 1️⃣ Continuous Delivery

* CI passes
* Manual approval to deploy

### 2️⃣ Continuous Deployment

* CI passes
* Auto deploy

Vercel uses **Continuous Deployment**.

---

# 🧠 CD RESPONSIBILITIES

* Build final artifact
* Upload to server / platform
* Inject environment variables
* Run migrations
* Restart service
* Rollback on failure

---

# 🌍 DEPLOYMENT TOOLS BY PLATFORM

| Platform       | Tool                            |
| -------------- | ------------------------------- |
| Vercel         | vercel CLI / GitHub integration |
| Cloudflare     | wrangler                        |
| AWS Lambda     | serverless / CDK / SAM          |
| Docker servers | docker + SSH                    |
| Netlify        | netlify CLI                     |

---

# ⚙️ HOW VERCEL WORKS (IMPORTANT)

```
Git push → GitHub → Vercel detects change → Build → Deploy
```

Vercel automatically:

* installs dependencies
* runs build
* creates serverless functions
* deploys globally

👉 This means **Vercel itself acts as CD**.

---

# 📦 SERVERLESS + CI/CD FLOW

```
Request → Serverless Function → Response → Destroyed
```

Deployment only prepares the function.
Execution happens later per request.

---

# 🧱 WHEN YOU NEED CUSTOM CD

You need your own CD pipeline if you have:

* Docker images
* Backend servers
* Multiple environments
* DB migrations
* Rollbacks
* Infra as code

---

# 📄 Example CD Workflow (Docker-based)

```yaml
name: CD

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - run: docker build -t app:latest .
      - run: docker push myrepo/app:latest
      - run: ssh user@server "docker pull myrepo/app && docker restart app"
```

---

# 🔐 ENVIRONMENT VARIABLES (IMPORTANT)

Never hardcode secrets.

Use:

* GitHub Secrets
* Vercel Environment Variables

Examples:

```
DATABASE_URL
JWT_SECRET
NEXTAUTH_SECRET
```

---

# ⚠️ COMMON MISTAKES (VERY IMPORTANT)

❌ CI without branch protection
❌ Deploying directly from feature branches
❌ Mixing CI + CD logic randomly
❌ Storing secrets in repo
❌ Assuming Vercel replaces CI
❌ No rollback plan

---

# 🧠 FINAL MENTAL MODEL (MEMORIZE)

| Concept  | Meaning                |
| -------- | ---------------------- |
| CI       | Validates code         |
| CD       | Releases code          |
| Pipeline | Automated workflow     |
| Job      | Group of steps         |
| Step     | Command                |
| Runner   | Machine executing jobs |
| Artifact | Build output           |
| Vercel   | Opinionated CD         |

---

# ✅ FINAL ONE-LINER

> **CI checks if code is safe. CD decides how and where that safe code is released.**

---

✅ This file is now equivalent to your `next-auth` notes but for **CI/CD**.
