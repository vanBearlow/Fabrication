# Fabric Triage

> **Diagnose the problem. Make the call. Find your DP-600 blind spots.**
>
> *Microsoft Fabric Apps Contest submission.*

**Fabric Triage** is an interactive analytics engineering incident simulator built for Microsoft Fabric. You step into the role of an on-call analytics engineer at **Van Berlo Enterprise**, triaging high-severity production incidents reported by stakeholders.

Instead of answering generic trivia questions, you investigate live system failures across Microsoft Fabric:
* Review telemetry, query logs, Lakehouse/Warehouse storage state, and architecture maps.
* Inspect executable DAX, T-SQL, KQL, Power Query M code, and Delta logs.
* Select an architectural remediation plan and calibrate your confidence level (*Guessing*, *Fairly sure*, *Confident*).
* Deploy the patch and receive simulated stakeholder feedback, business impact metrics, and post-mortem analysis.

---

## The Incident Catalog (12 Scenarios)

Fabric Triage covers 12 operational incidents across the core DP-600 exam domains:

### 1. Prepare Data (6 Incidents)
* **INC-01: Duplicate Revenue in Sales Reporting** (Dimension fan-out / non-unique keys)
* **INC-02: Streaming Telemetry in the Wrong Home** (Eventhouse & KQL streaming ingestion)
* **INC-03: The 40-Column Denormalized Sales Table** (Star-schema refactoring)
* **INC-04: Query Language Mix-Up in Telemetry Analysis** (KQL vs T-SQL vs DAX workload boundaries)
* **INC-05: Nulls Distorting Customer Analytics** (Dataflow Gen2 / Medallion data cleaning)
* **INC-06: Curated Analytical Store for SQL-First Analysts** (Fabric Warehouse ACID/T-SQL vs Lakehouse)

### 2. Maintain a Data Analytics Solution (3 Incidents)
* **INC-07: Salary Column Discovered Despite Row-Level Security** (RLS vs OLS boundaries)
* **INC-08: Unfinished Model Deployed Directly to Production** (Fabric ALM, Git integration & deployment pipelines)
* **INC-09: Breaking Column Renamed Without Dependency Analysis** (Lineage View & Impact Analysis)

### 3. Implement and Manage Semantic Models (3 Incidents)
* **INC-10: Ambiguous Direct Many-to-Many Relationship Filter Drift** (Bridge tables & filter propagation)
* **INC-11: Daily Full Refresh of 500M Historical Rows** (Incremental Refresh with RangeStart/RangeEnd)
* **INC-12: Massive Measure Proliferation from Redundant Time Calculations** (DAX Calculation Groups)

---

## Confidence Calibration

Before deploying a fix, you declare your certainty:
* **Guessing**
* **Fairly sure**
* **Confident**

The simulator compares your confidence against the actual outcome to diagnose your operational blind spots:
* **Dangerous Misconception (Wrong + Confident)**: High-risk false assumptions in production architecture.
* **Needs Review (Wrong + Fairly Sure)**: Boundary rule uncertainty.
* **Knowledge Gap (Wrong + Guessing)**: Unfamiliar concepts flagged for study.
* **Lucky Hit (Correct + Guessing)**: Correct guesses that require conceptual verification.
* **Strong Signal (Correct + Confident)**: Verified architectural competence.

---

## Architecture & Tech Stack

Built as a cloud-native Microsoft Fabric App:
* **Frontend**: React 19, TypeScript, Vite, Tailwind CSS
* **Runtime**: Microsoft Fabric App, Rayfin entity decorators (`@entity()`, `@role()`)
* **Auth & Persistence**: Microsoft Entra ID SSO, Rayfin GraphQL Engine, LocalStorage fallback

---

## Getting Started

### Local Development

```bash
npm install
npm run dev
```

### Build & Lint

```bash
npm run build
npm run lint
```

### Deploy to Microsoft Fabric

```bash
npx rayfin up
```
