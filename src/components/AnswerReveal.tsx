import React from 'react';
import { useTriage } from '../context/TriageContext.tsx';
import type { Scenario } from '../types/scenario.ts';
import type { Attempt } from '../types/attempt.ts';
import { ArrowRight, RotateCcw } from './icons/index.tsx';
import { VisualEvidence } from './VisualEvidence.tsx';
import { renderFormattedText } from '../utils/codeHighlighter.tsx';
import { getReporterAvatar } from '../utils/avatars.ts';

const KEYS = ['1', '2', '3', '4'];
const CODES = ['A', 'B', 'C', 'D'];

interface AnswerRevealProps {
  scenario: Scenario;
  attempt: Attempt;
  onRetry: () => void;
}

export function AnswerReveal({
  scenario,
  attempt,
  onRetry
}: AnswerRevealProps) {
  const { 
    navigateToNextIncident, 
    navigateToDashboard, 
    navigateToReview, 
    scenarios 
  } = useTriage();

  const isCorrect = attempt.correct;
  const isLastScenario = scenario.caseNumber === scenarios.length;
  const solutionEvidence = scenario.evidence.filter((evidence) => evidence.stage === 'solution');

  const avatarSrc = getReporterAvatar(scenario.userReport.reporterName);

  const STAKEHOLDER_FEEDBACK: Record<string, {
    successQuote: string;
    failureQuote: string;
    successMetrics: { label: string; value: string }[];
    failureMetrics: { label: string; value: string }[];
  }> = {
    'sc-01': {
      successQuote: 'Thank you! After removing duplicate ProductKey values, the one-to-many relationship evaluates correctly and the affected Direct Lake visuals return results again.',
      failureQuote: 'The ProductKey values on the one side are still not unique, so Direct Lake queries that use the relationship continue to return an error.',
      successMetrics: [{ label: 'ProductKey', value: 'Unique' }, { label: 'Relationship', value: '1:Many Validated' }, { label: 'Visual Queries', value: 'Succeeded' }],
      failureMetrics: [{ label: 'ProductKey', value: 'Duplicate Values' }, { label: 'Relationship', value: 'Validation Failed' }, { label: 'Visual Queries', value: 'Failed' }]
    },
    'sc-02': {
      successQuote: 'The fleet telemetry now follows the Eventstream-to-Eventhouse path, and our measured alert latency is within the 10-second requirement.',
      failureQuote: 'The fleet alert still misses its 10-second requirement because the proposed design does not provide the required streaming path and KQL analysis.',
      successMetrics: [{ label: 'Alert SLA', value: 'Met (<10s)' }, { label: 'Eventstream', value: 'Healthy' }, { label: 'KQL Query', value: 'Validated' }],
      failureMetrics: [{ label: 'Alert SLA', value: 'Not Met' }, { label: 'Telemetry Path', value: 'Misconfigured' }, { label: 'Validation', value: 'Failed' }]
    },
    'sc-03': {
      successQuote: 'The flat export is now separated into a fact table and conformed dimensions, with relationships validated and performance benchmarked.',
      failureQuote: 'The model still mixes facts and descriptive attributes in one wide table, leaving grain, reuse, and relationship behavior unclear.',
      successMetrics: [{ label: 'Model Shape', value: 'Star Schema' }, { label: 'Relationships', value: 'Validated' }, { label: 'Benchmark', value: 'Completed' }],
      failureMetrics: [{ label: 'Model Shape', value: 'Wide Flat Table' }, { label: 'Grain', value: 'Unclear' }, { label: 'Benchmark', value: 'Not Passed' }]
    },
    'sc-04': {
      successQuote: 'Correct: the telemetry query now runs as KQL in Eventhouse and returns the requested five-minute aggregates.',
      failureQuote: 'The query is still targeting the wrong engine or language; this Eventhouse requirement must be expressed in KQL.',
      successMetrics: [{ label: 'Engine', value: 'Eventhouse' }, { label: 'Language', value: 'KQL' }, { label: 'Aggregation', value: '5-Minute Bins' }],
      failureMetrics: [{ label: 'Engine Match', value: 'Incorrect' }, { label: 'Query Language', value: 'Invalid' }, { label: 'Result', value: 'Not Produced' }]
    },
    'sc-05': {
      successQuote: 'Customer identity and LifetimeSpend are now standardized in the preparation pipeline, so every downstream report consumes the same curated values.',
      failureQuote: 'Customer and LifetimeSpend quality rules are still duplicated in downstream DAX, so reports continue to disagree.',
      successMetrics: [{ label: 'Customer Keys', value: 'Validated' }, { label: 'LifetimeSpend', value: 'Numeric' }, { label: 'Shared Logic', value: 'Upstream' }],
      failureMetrics: [{ label: 'Customer Keys', value: 'Dirty' }, { label: 'LifetimeSpend', value: 'Text/Mixed' }, { label: 'Shared Logic', value: 'Duplicated' }]
    },
    'sc-06': {
      successQuote: 'Microsoft Fabric Warehouse is the right SQL-centric store for this workload; required statements were validated and key integrity checks now run in the pipeline.',
      failureQuote: 'The pipeline is still failing! Lakehouse SQL endpoints are read-only and cannot execute direct INSERT/UPDATE/MERGE statements.',
      successMetrics: [{ label: 'SQL Engine', value: 'Fabric Warehouse' }, { label: 'T-SQL Surface', value: 'Validated' }, { label: 'Key Constraints', value: 'NOT ENFORCED' }],
      failureMetrics: [{ label: 'SQL Endpoint', value: 'Lakehouse (Read-Only)' }, { label: 'DML Error', value: 'Syntax Rejected' }, { label: 'ETL Pipeline', value: 'Failing' }]
    },
    'sc-07': {
      successQuote: 'OLS is now active for the Viewer role, and BaseSalary and BonusAmount are no longer discoverable or queryable by that role.',
      failureQuote: 'Sensitive payroll data is STILL discoverable in field metadata! Row-Level Security alone does not hide column names or schema objects from unauthorized analysts.',
      successMetrics: [{ label: 'Column Protection', value: 'OLS Enforced' }, { label: 'Workspace Role', value: 'Viewer' }, { label: 'Access Test', value: 'Passed' }],
      failureMetrics: [{ label: 'Salary Columns', value: 'Metadata Leaked' }, { label: 'Security Boundary', value: 'RLS Inadequate' }, { label: 'Compliance Audit', value: 'Critical Breach' }]
    },
    'sc-08': {
      successQuote: 'The staged Fabric lifecycle is in place, Production write access is restricted, and the separately configured PR checks and promotion automation are passing.',
      failureQuote: 'Production was overwritten again! Without isolated workspaces and parameter rules, unreviewed PBIX files are still overriding production data sources.',
      successMetrics: [{ label: 'ALM Stages', value: 'Dev/Test/Prod' }, { label: 'Production Writes', value: 'Restricted' }, { label: 'CI/CD Checks', value: 'Configured' }],
      failureMetrics: [{ label: 'Release Governance', value: 'Uncontrolled' }, { label: 'Production Overwrite', value: 'Active Risk' }, { label: 'Service SLA', value: 'Breached' }]
    },
    'sc-09': {
      successQuote: 'The dependency inventory is complete, affected owners were coordinated, and downstream refreshes passed before the schema contract changed.',
      failureQuote: 'Downstream reports are still throwing 500 errors! Renaming columns upstream without impact analysis broke 5 semantic models and 11 executive dashboards.',
      successMetrics: [{ label: 'Dependency Inventory', value: 'Verified' }, { label: 'Change Window', value: 'Coordinated' }, { label: 'Downstream Refresh', value: 'Validated' }],
      failureMetrics: [{ label: 'Schema Mismatch', value: 'Cust_ZipCode Missing' }, { label: 'Broken Dashboards', value: '11 Reports Down' }, { label: 'Incident Status', value: 'Escalated' }]
    },
    'sc-10': {
      successQuote: 'The membership bridge and explicit AllocationPct measure now make portfolio attribution intentional, and the reconciled totals passed the audit.',
      failureQuote: 'Asset totals are still inflated by $120 Million! Direct bi-directional many-to-many relationships are double-counting accounts shared across portfolios.',
      successMetrics: [{ label: 'Relationship Model', value: 'Explicit Bridge' }, { label: 'Allocation Measure', value: 'Applied' }, { label: 'Reconciliation', value: 'Passed' }],
      failureMetrics: [{ label: 'Relationship Model', value: 'Direct Many:Many' }, { label: 'Inflation Discrepancy', value: '+$120M (+38.7%)' }, { label: 'Audit Result', value: 'Material Weakness' }]
    },
    'sc-11': {
      successQuote: 'Incremental refresh is configured with RangeStart and RangeEnd; the rolling refresh period works and the measured capacity result meets our target.',
      failureQuote: 'Semantic model refresh is still timing out after 3.5 hours! The model is re-importing 500 million historical rows on every single scheduled refresh.',
      successMetrics: [{ label: 'Partition Policy', value: 'RangeStart / RangeEnd' }, { label: 'Store Period', value: 'Retained' }, { label: 'Refresh Test', value: 'Target Met' }],
      failureMetrics: [{ label: 'Refresh Duration', value: '214 Minutes' }, { label: 'Historical Processing', value: 'Full Re-import (511M)' }, { label: 'Capacity Throttling', value: 'Severe' }]
    },
    'sc-12': {
      successQuote: 'The repeated time logic is now centralized in a calculation group, while the 40 explicit base measures remain governed and reusable.',
      failureQuote: 'The model still contains hundreds of copied time-intelligence measures instead of reusable calculation items over explicit measures.',
      successMetrics: [{ label: 'Base Measures', value: '40 Explicit' }, { label: 'Time Logic', value: 'Calculation Group' }, { label: 'Implicit Measures', value: 'Discouraged' }],
      failureMetrics: [{ label: 'Measure Count', value: '360' }, { label: 'Time Logic', value: 'Duplicated' }, { label: 'Maintenance Risk', value: 'High' }]
    }
  };

  const getStakeholderFeedback = () => {
    const specific = STAKEHOLDER_FEEDBACK[scenario.id];

    if (isCorrect) {
      return {
        headline: 'Stakeholder Satisfied • Incident Resolved Successfully',
        badge: 'Delighted (Resolved)',
        badgeClass: 'bg-success/10 text-success border-success/30',
        quote: specific?.successQuote || `Thank you so much! Our ${scenario.domainLabel} metrics reconciled immediately after your patch deployed.`,
        metrics: specific?.successMetrics || [
          { label: 'Data Reconciliation', value: '100% Match' },
          { label: 'Pipeline SLA', value: 'Target Met' },
          { label: 'Production Status', value: 'Healthy & Verified' }
        ]
      };
    } else {
      return {
        headline: 'Stakeholder Escalation • Critical Issue Still Active!',
        badge: 'Frustrated (Escalated)',
        badgeClass: 'bg-danger/10 text-danger border-danger/30',
        quote: specific?.failureQuote || `Our reports are STILL completely out of sync! The executive meeting is about to start and your proposed fix did not solve the root cause.`,
        metrics: specific?.failureMetrics || [
          { label: 'Data Discrepancy', value: 'Still Active' },
          { label: 'Executive SLA', value: 'Breached' },
          { label: 'Production Status', value: 'Escalated to Lead' }
        ]
      };
    }
  };

  const feedback = getStakeholderFeedback();

  const renderMisconceptionNote = () => {
    switch (attempt.misconceptionType) {
      case 'dangerous_misconception':
        return (
          <div className="p-4 rounded-xl bg-danger/10 border border-danger/30 text-danger text-sm leading-relaxed flex flex-col gap-1.5 shadow-xs">
            <strong className="font-mono text-xs uppercase tracking-wider font-bold">
              [DANGEROUS MISCONCEPTION DETECTED]
            </strong>
            <span>
              You were confident about an incorrect remediation. In production, this would cause data corruptions or severe regressions. High confidence on incorrect architectural decisions creates serious blind spots on the DP-600 exam.
            </span>
          </div>
        );
      case 'needs_review':
        return (
          <div className="p-4 rounded-xl bg-surface2 border border-accent/40 flex flex-col gap-1.5 shadow-xs">
            <strong className="font-mono text-xs uppercase tracking-wider font-bold text-accent">
              [REMEDIATION NEEDS REVIEW]
            </strong>
            <span className="text-tx text-sm leading-relaxed">
              You were fairly sure. Review the failure rationale below to solidify the exact boundary rule and execution mechanics.
            </span>
          </div>
        );
      case 'knowledge_gap':
        return (
          <div className="p-4 rounded-xl bg-surface2 border border-border flex flex-col gap-1.5 shadow-xs">
            <strong className="font-mono text-xs uppercase tracking-wider text-muted font-bold">
              [KNOWLEDGE GAP IDENTIFIED]
            </strong>
            <span className="text-tx text-sm leading-relaxed">
              You acknowledged you were guessing. Add this architectural pattern to your study plan.
            </span>
          </div>
        );
      case 'lucky_hit':
        return (
          <div className="p-4 rounded-xl bg-surface2 border border-accent/40 flex flex-col gap-1.5 shadow-xs">
            <strong className="font-mono text-xs uppercase tracking-wider font-bold text-accent">
              [LUCKY HIT • VERIFY CONCEPT]
            </strong>
            <span className="text-tx text-sm leading-relaxed">
              You selected the correct remediation plan while guessing. Verify why this plan succeeds to ensure repeatability on the exam.
            </span>
          </div>
        );
      case 'strong_signal':
        return (
          <div className="p-4 rounded-xl bg-success/10 border border-success/30 text-success text-sm leading-relaxed flex flex-col gap-1.5 shadow-xs">
            <strong className="font-mono text-xs uppercase tracking-wider font-bold">
              [STRONG SIGNAL • VERIFIED SOLUTION]
            </strong>
            <span>
              High operator confidence and verified correct Microsoft Fabric architecture.
            </span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="animate-fade-in flex flex-col gap-6">
      <div className={`p-6 rounded-xl border shadow-card flex flex-col gap-5 ${
        isCorrect 
          ? 'bg-success/5 border-success/40' 
          : 'bg-danger/5 border-danger/40'
      }`}>
        <div className="flex items-start justify-between flex-wrap gap-4 pb-4 border-b border-border/80">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={avatarSrc}
                alt={scenario.userReport.reporterName}
                className="w-14 h-14 rounded-full object-cover border-2 border-border shadow-sm flex-shrink-0"
              />
              <span className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-surface flex items-center justify-center text-[9px] font-bold ${
                isCorrect ? 'bg-success text-white' : 'bg-danger text-white'
              }`}>
                {isCorrect ? '✓' : '!'}
              </span>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-display text-base font-bold text-tx">
                  {scenario.userReport.reporterName}
                </h3>
                <span className={`font-mono text-xs px-2 py-0.5 rounded-full border font-bold ${feedback.badgeClass}`}>
                  {feedback.badge}
                </span>
              </div>
              <span className="font-mono text-xs text-muted mt-0.5">
                {scenario.userReport.reporterRole} • {scenario.userReport.department}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onRetry}
              className="inline-flex items-center gap-1.5 py-1.5 px-3.5 rounded-lg font-mono text-xs border border-border bg-surface hover:bg-surface2 text-tx transition-colors cursor-pointer shadow-2xs"
            >
              <RotateCcw size={12} />
              <span>Re-evaluate Incident</span>
            </button>
          </div>
        </div>

        <div className="bg-surface/80 rounded-xl border border-border p-5 flex flex-col gap-3 shadow-xs">
          <div className="flex items-center justify-between text-xs font-mono text-muted2">
            <span className="font-semibold text-tx">Direct Stakeholder Feedback Dispatch</span>
            <span>Just now</span>
          </div>

          <p className="text-sm text-tx leading-relaxed italic font-sans">
            "{feedback.quote}"
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-border/60">
            {feedback.metrics.map((m, mIdx) => (
              <div key={mIdx} className="flex flex-col font-mono text-xs">
                <span className="text-muted text-[10px] uppercase">{m.label}</span>
                <span className={`font-bold mt-0.5 ${isCorrect ? 'text-success' : 'text-danger'}`}>
                  {m.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {renderMisconceptionNote()}

      <div className="bg-surface border border-border rounded-xl shadow-card p-6 flex flex-col gap-5">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div>
            <h3 className="font-mono text-xs uppercase tracking-widest text-muted font-bold">
              Remediation Plan Evaluation Breakdown
            </h3>
            <p className="font-mono text-xs text-muted mt-0.5">
              Review how each proposal performed against Microsoft Fabric architectural standards
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3.5">
          {scenario.choices.map((choice, idx) => {
            const isSelected = attempt.selectedChoiceId === choice.id;
            const isCorrectChoice = choice.id === scenario.correctChoiceId;
            const layer = choice.layer;

            let borderClass = 'border-border bg-surface2/30 text-muted';
            let tagClass = 'bg-surface2 text-muted border-border';
            let statusBadge = null;

            if (isCorrectChoice) {
              borderClass = 'border-success/60 bg-success/5 text-tx ring-1 ring-success/30';
              tagClass = 'bg-success text-bg border-success';
              statusBadge = (
                <span className="font-mono text-xs font-bold text-success flex items-center gap-1">
                  ✓ Optimal Architecture Patch
                </span>
              );
            } else if (isSelected && !isCorrectChoice) {
              borderClass = 'border-danger/60 bg-danger/5 text-tx ring-1 ring-danger/30';
              tagClass = 'bg-danger text-bg border-danger';
              statusBadge = (
                <span className="font-mono text-xs font-bold text-danger flex items-center gap-1">
                  ✗ Your Selection (Ineffective / Regression)
                </span>
              );
            } else {
              statusBadge = (
                <span className="font-mono text-xs text-muted2">
                  ○ Rejected Alternative
                </span>
              );
            }

            return (
              <div
                key={choice.id}
                data-testid={isCorrectChoice ? 'correct-proposal-card' : undefined}
                className={`p-5 rounded-xl border text-left transition-all flex flex-col gap-3 ${borderClass}`}
              >
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span className={`font-mono text-xs font-bold px-2 py-0.5 rounded border ${tagClass}`}>
                      PROPOSAL {CODES[idx]} [{KEYS[idx]}]
                    </span>

                    <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-surface2/70 border border-border font-mono text-[11px] text-muted">
                      <img
                        src={layer.iconSrc}
                        alt=""
                        className="w-3.5 h-3.5 object-contain flex-shrink-0"
                      />
                      <span className="font-semibold text-tx">{layer.label}</span>
                      <span className="text-muted2">•</span>
                      <span className="text-muted text-[10px] uppercase tracking-wider">{layer.category}</span>
                    </div>
                  </div>

                  {statusBadge}
                </div>

                <div className="text-sm font-medium text-tx leading-relaxed">
                  {renderFormattedText(choice.label)}
                </div>

                {choice.technicalDetails && (
                  <div className="pt-2 border-t border-border/60 flex items-start gap-2 text-xs font-mono text-muted">
                    <span className="text-muted2 flex-shrink-0 font-semibold">Implementation:</span>
                    <div className="text-tx/90 font-sans leading-normal">
                      {renderFormattedText(choice.technicalDetails)}
                    </div>
                  </div>
                )}

                {isCorrectChoice && solutionEvidence.length > 0 && (
                  <div data-testid="solution-evidence" className="pt-2 border-t border-success/25">
                    <VisualEvidence evidenceList={solutionEvidence} variant="solution" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-surface border border-border rounded-xl shadow-card p-6 flex flex-col gap-5">
        <div className="flex items-center gap-2 border-b border-border pb-3">
          <img src="data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2232%22%20height%3D%2232%22%20fill%3D%22currentColor%22%20role%3D%22img%22%20focusable%3D%22false%22%3E%3Cpath%20fill%3D%22url(%23i7cb92d-a)%22%20fill-rule%3D%22evenodd%22%20d%3D%22m3.148%2021.322-.41%201.501c-.153.48-.367%201.186-.482%201.814a3.94%203.94%200%200%200%203.247%205.313c.554.08%201.181.075%201.884-.028l3.23-.446a2.05%202.05%200%200%200%201.695-1.49l2.223-8.164z%22%20clip-rule%3D%22evenodd%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23i7cb92d-b)%22%20d%3D%22M6.298%2021.71c-3.404.527-4.103%203.096-4.103%203.096l3.26-11.979%2017.035-2.304-2.323%208.438c-.12.452-.5.798-.971.87l-.095.016-12.898%201.879z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23i7cb92d-c)%22%20fill-opacity%3D%220.8%22%20d%3D%22M6.298%2021.71c-3.404.527-4.103%203.096-4.103%203.096l3.26-11.979%2017.035-2.304-2.323%208.438c-.12.452-.5.798-.971.87l-.095.016-12.898%201.879z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23i7cb92d-d)%22%20d%3D%22m8.23%2014.066%2018.86-2.786c.448-.06.811-.39.926-.82l1.946-7.043a1.116%201.116%200%200%200-1.218-1.408L10.75%204.668a5.03%205.03%200%200%200-4.044%203.636L4.11%2017.709c.52-1.902.84-3.05%204.12-3.643%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23i7cb92d-e)%22%20d%3D%22m8.23%2014.066%2018.86-2.786c.448-.06.811-.39.926-.82l1.946-7.043a1.116%201.116%200%200%200-1.218-1.408L10.75%204.668a5.03%205.03%200%200%200-4.044%203.636L4.11%2017.709c.52-1.902.84-3.05%204.12-3.643%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23i7cb92d-f)%22%20fill-opacity%3D%220.4%22%20d%3D%22m8.23%2014.066%2018.86-2.786c.448-.06.811-.39.926-.82l1.946-7.043a1.116%201.116%200%200%200-1.218-1.408L10.75%204.668a5.03%205.03%200%200%200-4.044%203.636L4.11%2017.709c.52-1.902.84-3.05%204.12-3.643%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23i7cb92d-g)%22%20d%3D%22M8.23%2014.066c-2.731.495-3.409%201.374-3.86%202.753l-2.175%207.988s.695-2.543%204.058-3.087L19.1%2019.848l.095-.016c.471-.071.851-.419.972-.87l1.911-6.941-13.85%202.045Z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23i7cb92d-h)%22%20fill-opacity%3D%220.2%22%20d%3D%22M8.23%2014.066c-2.731.495-3.409%201.374-3.86%202.753l-2.175%207.988s.695-2.543%204.058-3.087L19.1%2019.848l.095-.016c.471-.071.851-.419.972-.87l1.911-6.941-13.85%202.045Z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23i7cb92d-i)%22%20fill-rule%3D%22evenodd%22%20d%3D%22M6.253%2021.72c-2.842.46-3.775%202.342-3.997%202.916a3.94%203.94%200%200%200%203.247%205.314c.554.08%201.181.075%201.884-.028l3.23-.446a2.05%202.05%200%200%200%201.695-1.49l2.026-7.443z%22%20clip-rule%3D%22evenodd%22%3E%3C%2Fpath%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22i7cb92d-a%22%20x1%3D%228.268%22%20x2%3D%228.268%22%20y1%3D%2230.005%22%20y2%3D%2219.822%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20offset%3D%220.056%22%20stop-color%3D%22%232AAC94%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.155%22%20stop-color%3D%22%23239C87%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.372%22%20stop-color%3D%22%23177E71%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.588%22%20stop-color%3D%22%230E6961%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.799%22%20stop-color%3D%22%23095D57%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23085954%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22i7cb92d-b%22%20x1%3D%2221.134%22%20x2%3D%2211.302%22%20y1%3D%2222.617%22%20y2%3D%2211.923%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20offset%3D%220.042%22%20stop-color%3D%22%23ABE88E%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.549%22%20stop-color%3D%22%232AAA92%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.906%22%20stop-color%3D%22%23117865%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22i7cb92d-c%22%20x1%3D%22-3.028%22%20x2%3D%226.329%22%20y1%3D%2222.097%22%20y2%3D%2218.906%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%236AD6F9%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%236AD6F9%22%20stop-opacity%3D%220%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22i7cb92d-d%22%20x1%3D%224.11%22%20x2%3D%2229.016%22%20y1%3D%229.855%22%20y2%3D%229.855%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20offset%3D%220.043%22%20stop-color%3D%22%2325FFD4%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.874%22%20stop-color%3D%22%2355DDB9%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22i7cb92d-e%22%20x1%3D%224.11%22%20x2%3D%2226.546%22%20y1%3D%226.373%22%20y2%3D%2216.791%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%236AD6F9%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.23%22%20stop-color%3D%22%2360E9D0%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.651%22%20stop-color%3D%22%236DE9BB%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.994%22%20stop-color%3D%22%23ABE88E%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22i7cb92d-f%22%20x1%3D%226.185%22%20x2%3D%2218.385%22%20y1%3D%228.323%22%20y2%3D%2211.021%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23fff%22%20stop-opacity%3D%220%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.459%22%20stop-color%3D%22%23fff%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23fff%22%20stop-opacity%3D%220%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22i7cb92d-g%22%20x1%3D%2210.23%22%20x2%3D%2210.518%22%20y1%3D%2218.774%22%20y2%3D%2210.219%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20offset%3D%220.205%22%20stop-color%3D%22%23063D3B%22%20stop-opacity%3D%220%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.586%22%20stop-color%3D%22%23063D3B%22%20stop-opacity%3D%220.237%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.872%22%20stop-color%3D%22%23063D3B%22%20stop-opacity%3D%220.75%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22i7cb92d-h%22%20x1%3D%221.166%22%20x2%3D%2211.592%22%20y1%3D%2217.923%22%20y2%3D%2219.884%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23fff%22%20stop-opacity%3D%220%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.459%22%20stop-color%3D%22%23fff%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23fff%22%20stop-opacity%3D%220%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22i7cb92d-i%22%20x1%3D%228.698%22%20x2%3D%226.664%22%20y1%3D%2227.183%22%20y2%3D%2217.238%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20offset%3D%220.064%22%20stop-color%3D%22%23063D3B%22%20stop-opacity%3D%220%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.17%22%20stop-color%3D%22%23063D3B%22%20stop-opacity%3D%220.135%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.562%22%20stop-color%3D%22%23063D3B%22%20stop-opacity%3D%220.599%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.85%22%20stop-color%3D%22%23063D3B%22%20stop-opacity%3D%220.9%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23063D3B%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3C%2Fsvg%3E" alt="Microsoft Fabric" className="w-5 h-5 object-contain" />
          <h3 className="font-mono text-xs uppercase tracking-widest text-tx font-bold">
            Root Cause &amp; Technical Architecture Analysis
          </h3>
        </div>

        <div className="p-5 bg-success/5 rounded-xl border border-success/30 flex flex-col gap-2.5">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-success" />
            <span className="font-mono text-xs text-success font-bold uppercase tracking-wider">
              Optimal Fabric Architectural Pattern
            </span>
          </div>
          <div className="text-sm text-tx leading-relaxed font-sans">
            {renderFormattedText(scenario.explanation)}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <span className="font-mono text-xs text-muted uppercase tracking-wider font-bold">
            Why Alternative Proposals Failed:
          </span>

          <div className="grid grid-cols-1 gap-2.5">
            {scenario.choices.filter(c => c.id !== scenario.correctChoiceId).map(choice => (
              <div key={choice.id} className="p-4 bg-surface2/40 rounded-xl border border-border flex items-start gap-3 text-xs">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-surface2 border border-border text-muted2 flex-shrink-0 mt-0.5">
                  Plan {choice.code}
                </span>
                <div className="flex flex-col gap-0.5">
                  <div className="text-tx/90 leading-relaxed font-sans">
                    {renderFormattedText(scenario.alternativeExplanations[choice.id] || 'Does not address the root architectural requirement.')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-5 bg-accent/5 rounded-xl border-l-4 border-l-accent border-border border flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs uppercase tracking-widest text-accent font-bold">
              [DP-600 Exam Core Takeaway]
            </span>
            <span className="font-mono text-[11px] text-muted">• {scenario.skillArea}</span>
          </div>
          <div className="text-sm font-semibold text-tx leading-relaxed font-sans">
            {renderFormattedText(scenario.examTakeaway)}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between flex-wrap gap-3 pt-4 border-t border-border">
        <button
          onClick={navigateToDashboard}
          className="py-2.5 px-4 rounded-lg font-mono text-xs text-muted border border-border hover:border-muted hover:text-tx bg-surface transition-colors cursor-pointer"
        >
          Return to Dashboard
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={navigateToReview}
            className="py-2.5 px-4 rounded-lg font-mono text-xs text-muted border border-border hover:border-muted hover:text-tx bg-surface transition-colors cursor-pointer"
          >
            Review Weak Spots
          </button>

          <button
            onClick={navigateToNextIncident}
            className="inline-flex items-center gap-2 py-2.5 px-6 rounded-lg font-sans text-sm font-bold bg-accent text-bg hover:bg-accent-dim transition-all cursor-pointer shadow-card"
          >
            <span>{isLastScenario ? 'View Final Report' : 'Next Incident →'}</span>
            <ArrowRight size={13} color="rgb(var(--bg))" />
          </button>
        </div>
      </div>
    </div>
  );
}
