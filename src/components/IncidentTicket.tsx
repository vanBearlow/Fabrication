import React from 'react';
import type { Scenario } from '../types/scenario.ts';
import { getReporterAvatar } from '../utils/avatars.ts';

interface IncidentTicketProps {
  scenario: Scenario;
}

export function IncidentTicket({ scenario }: IncidentTicketProps) {
  const avatarSrc = getReporterAvatar(scenario.userReport.reporterName);
  const reporterEmail = `${scenario.userReport.reporterName.toLowerCase().replace(/\s+/g, '.')}@vanberlo.dev`;

  return (
    <div className="bg-surface border border-border rounded-xl shadow-card overflow-hidden flex flex-col">
      <div className="bg-surface2/80 px-5 py-3 border-b border-border flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2.5 flex-wrap font-mono text-xs">
          <span className="font-bold text-tx bg-surface border border-border px-2.5 py-1 rounded shadow-xs">
            TICKET #INC-2026-0{scenario.caseNumber}
          </span>
          <span className="font-bold px-2 py-0.5 rounded border border-danger/40 bg-danger/10 text-danger text-[11px]">
            P1 - {scenario.severity}
          </span>
          <span className="text-muted border border-border bg-surface px-2 py-0.5 rounded text-[11px]">
            {scenario.environment.workspaces}
          </span>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs text-muted2">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-accent font-semibold">SLA: 15m Response Target</span>
          </div>
          <span>•</span>
          <span>{scenario.userReport.timestamp}</span>
        </div>
      </div>

      <div className="p-6 flex flex-col gap-5 bg-surface">
        <div className="flex items-start justify-between flex-wrap gap-4 pb-4 border-b border-border">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={avatarSrc}
                alt={scenario.userReport.reporterName}
                className="w-12 h-12 rounded-full object-cover border-2 border-border shadow-sm flex-shrink-0"
              />
              <span 
                className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-success border-2 border-surface" 
                title="Active Now" 
              />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-display text-sm font-bold text-tx">
                  {scenario.userReport.reporterName}
                </h3>
                <span className="font-mono text-[10px] text-muted px-1.5 py-0.5 rounded bg-surface2 border border-border">
                  Business Stakeholder
                </span>
              </div>
              <span className="font-mono text-xs text-muted mt-0.5">
                {scenario.userReport.reporterRole} • {scenario.userReport.department}
              </span>
            </div>
          </div>

          <div className="flex flex-col items-end text-xs font-mono text-muted2">
            <span className="text-tx font-medium">Source: Email Dispatch Ingestion</span>
            <span>Status: Assigned to On-Call</span>
          </div>
        </div>

        <div className="bg-surface2/30 rounded-xl border border-border p-5 flex flex-col gap-4 font-sans text-sm">
          <div className="flex flex-col gap-2 pb-3 border-b border-border text-xs">
            <div className="flex items-baseline gap-2">
              <span className="text-muted w-14 flex-shrink-0 font-semibold">From:</span>
              <span className="text-tx font-bold">
                {scenario.userReport.reporterName}
              </span>
              <span className="text-muted">&lt;{reporterEmail}&gt;</span>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-muted w-14 flex-shrink-0 font-semibold">To:</span>
              <span className="text-tx font-medium">fabric-oncall@vanberlo.dev</span>
              <span className="text-muted">&lt;Fabric Analytics Engineering Team&gt;</span>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-muted w-14 flex-shrink-0 font-semibold">Date:</span>
              <span className="text-tx">{scenario.userReport.timestamp}</span>
            </div>

            <div className="flex items-baseline gap-2 pt-1 border-t border-border/50">
              <span className="text-muted w-14 flex-shrink-0 font-semibold">Subject:</span>
              <span className="text-tx font-bold text-sm">{scenario.title}</span>
            </div>
          </div>

          <div className="text-tx leading-relaxed flex flex-col gap-3 text-sm">
            <p>Hi Team,</p>
            <p className="leading-relaxed text-tx">
              {scenario.userReport.complaint}
            </p>
            <p className="text-tx">
              Please investigate the root cause across our ingestion pipeline and semantic model, and apply an operational fix as soon as possible before the executive board review.
            </p>

            <div className="pt-3 border-t border-border/70 flex flex-col text-xs text-muted leading-relaxed">
              <span>Best regards,</span>
              <span className="font-bold text-tx mt-1">{scenario.userReport.reporterName}</span>
              <span>{scenario.userReport.reporterRole}</span>
              <span>{scenario.userReport.department} | Van Berlo Enterprise</span>
            </div>
          </div>
        </div>

        <div className="p-3.5 bg-surface2/60 rounded-lg border border-accent/40 flex items-start gap-2.5 text-xs">
          <span className="font-mono font-bold text-accent uppercase tracking-wider flex-shrink-0 mt-0.5">
            [Objective]:
          </span>
          <div className="text-tx leading-relaxed font-sans font-medium">
            {scenario.objective}
          </div>
        </div>
      </div>
    </div>
  );
}
