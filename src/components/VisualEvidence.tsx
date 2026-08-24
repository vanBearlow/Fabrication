import React, { useState } from 'react';
import type { EvidenceItem } from '../types/scenario.ts';
import {
  Case6WorkloadComparison,
  Case6DecisionRecord,
  Case9LineageView,
  Case11RefreshPolicy,
  Case12ModelExplorer
} from './RedesignedEvidenceArtifacts.tsx';

interface VisualEvidenceProps {
  evidenceList: EvidenceItem[];
  variant?: 'studio' | 'solution';
}

export function VisualEvidence({ evidenceList, variant = 'studio' }: VisualEvidenceProps) {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);
  const [showRawSource, setShowRawSource] = useState<boolean>(false);

  const current = evidenceList[activeIndex] || evidenceList[0];

  if (!current) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(current.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getTabIcon = (ev: EvidenceItem) => {
    const text = (ev.title + ' ' + ev.tabLabel + ' ' + (ev.language || '') + ' ' + ev.type).toLowerCase();
    if (text.includes('git') || text.includes('branch') || text.includes('alm')) {
      return 'data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2048%2048%22%3E%3Cdefs%3E%3CclipPath%20id%3D%22a%22%3E%3Cpath%20d%3D%22M0%20.113h91.887V92H0Zm0%200%22%2F%3E%3C%2FclipPath%3E%3C%2Fdefs%3E%3Cg%20stroke-width%3D%222.552%22%20clip-path%3D%22url(%23a)%22%20transform%3D%22translate(0%20-.059)scale(.52238)%22%3E%3Cpath%20fill%3D%22%23f03c2e%22%20d%3D%22M90.156%2041.965%2050.036%201.848a5.92%205.92%200%200%200-8.372%200l-8.328%208.332%2010.566%2010.566a7.03%207.03%200%200%201%207.23%201.684%207.03%207.03%200%200%201%201.669%207.277l10.187%2010.184a7.03%207.03%200%200%201%207.278%201.672%207.04%207.04%200%200%201%200%209.957%207.05%207.05%200%200%201-9.965%200%207.04%207.04%200%200%201-1.528-7.66l-9.5-9.497V59.36a7.04%207.04%200%200%201%201.86%2011.29%207.04%207.04%200%200%201-9.957%200%207.04%207.04%200%200%201%200-9.958%207.1%207.1%200%200%201%202.304-1.539V33.926a7.05%207.05%200%200%201-3.82-9.234l-10.418-10.42L1.73%2041.777a5.925%205.925%200%200%200%200%208.371L41.852%2090.27a5.925%205.925%200%200%200%208.37%200l39.934-39.934a5.925%205.925%200%200%200%200-8.371%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E';
    }
    if (text.includes('sql') || text.includes('warehouse')) {
      return 'data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2232%22%20height%3D%2232%22%20fill%3D%22currentColor%22%20role%3D%22img%22%20focusable%3D%22false%22%3E%3Cpath%20fill%3D%22url(%23i15919b-a)%22%20d%3D%22M5%205.5A3.5%203.5%200%200%201%208.5%202h15A3.5%203.5%200%200%201%2027%205.5v21a3.5%203.5%200%200%201-3.5%203.5h-15A3.5%203.5%200%200%201%205%2026.5z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23i15919b-b)%22%20fill-opacity%3D%220.2%22%20d%3D%22M5%205.5A3.5%203.5%200%200%201%208.5%202h15A3.5%203.5%200%200%201%2027%205.5v21a3.5%203.5%200%200%201-3.5%203.5h-15A3.5%203.5%200%200%201%205%2026.5z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23i15919b-c)%22%20fill-rule%3D%22evenodd%22%20d%3D%22M23.5%203h-15A2.5%202.5%200%200%200%206%205.5v21A2.5%202.5%200%200%200%208.5%2029h15a2.5%202.5%200%200%200%202.5-2.5v-21A2.5%202.5%200%200%200%2023.5%203m-15-1A3.5%203.5%200%200%200%205%205.5v21A3.5%203.5%200%200%200%208.5%2030h15a3.5%203.5%200%200%200%203.5-3.5v-21A3.5%203.5%200%200%200%2023.5%202z%22%20clip-rule%3D%22evenodd%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23i15919b-d)%22%20d%3D%22M23%2022a2%202%200%200%201-2%202H11a2%202%200%200%201-2-2v-6.4a2%202%200%200%201%20.674-1.497l5-4.428a2%202%200%200%201%202.653%200l5%204.428A2%202%200%200%201%2023%2015.6z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22%23B4CDF8%22%20d%3D%22M13%2016a1%201%200%201%201-2%200%201%201%200%200%201%202%200m4%200a1%201%200%201%201-2%200%201%201%200%200%201%202%200m3%201a1%201%200%201%200%200-2%201%201%200%200%200%200%202m-3%203a1%201%200%201%201-2%200%201%201%200%200%201%202%200m-5%201a1%201%200%201%200%200-2%201%201%200%200%200%200%202m9-1a1%201%200%201%201-2%200%201%201%200%200%201%202%200%22%3E%3C%2Fpath%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22i15919b-a%22%20x1%3D%2211.111%22%20x2%3D%2215.576%22%20y1%3D%222%22%20y2%3D%2230.067%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23fff%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23EBEBEB%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22i15919b-c%22%20x1%3D%2212.104%22%20x2%3D%2216.851%22%20y1%3D%222%22%20y2%3D%2229.972%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23BBB%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23888%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22i15919b-d%22%20x1%3D%229%22%20x2%3D%2223.804%22%20y1%3D%229.172%22%20y2%3D%2223.149%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%233477EA%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%231D53A4%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3CradialGradient%20id%3D%22i15919b-b%22%20cx%3D%220%22%20cy%3D%220%22%20r%3D%221%22%20gradientTransform%3D%22matrix(11.61113%2022.16669%20-17.08352%208.94852%2012.028%209.292)%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20offset%3D%220.177%22%20stop-color%3D%22%23fff%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23B8B8B8%22%3E%3C%2Fstop%3E%3C%2FradialGradient%3E%3C%2Fdefs%3E%3C%2Fsvg%3E';
    }
    if (text.includes('dax') || text.includes('powerbi') || text.includes('metric') || text.includes('measure') || text.includes('report') || text.includes('model') || text.includes('relationship') || text.includes('bridge') || text.includes('schema') || text.includes('refresh') || text.includes('partition') || text.includes('calculation')) {
      return 'data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2232%22%20height%3D%2232%22%20fill%3D%22currentColor%22%20role%3D%22img%22%20focusable%3D%22false%22%3E%3Cpath%20fill%3D%22url(%23ic35943-a)%22%20d%3D%22M3%206.5A3.5%203.5%200%200%201%206.5%203h19A3.5%203.5%200%200%201%2029%206.5v19a3.5%203.5%200%200%201-3.5%203.5h-19A3.5%203.5%200%200%201%203%2025.5z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23ic35943-b)%22%20fill-opacity%3D%220.2%22%20d%3D%22M3%206.5A3.5%203.5%200%200%201%206.5%203h19A3.5%203.5%200%200%201%2029%206.5v19a3.5%203.5%200%200%201-3.5%203.5h-19A3.5%203.5%200%200%201%203%2025.5z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23ic35943-c)%22%20fill-rule%3D%22evenodd%22%20d%3D%22M25.5%204h-19A2.5%202.5%200%200%200%204%206.5v19A2.5%202.5%200%200%200%206.5%2028h19a2.5%202.5%200%200%200%202.5-2.5v-19A2.5%202.5%200%200%200%2025.5%204m-19-1A3.5%203.5%200%200%200%203%206.5v19A3.5%203.5%200%200%200%206.5%2029h19a3.5%203.5%200%200%200%203.5-3.5v-19A3.5%203.5%200%200%200%2025.5%203z%22%20clip-rule%3D%22evenodd%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23ic35943-d)%22%20d%3D%22M9.75%2014.5a1.75%201.75%200%201%200%200-3.5%201.75%201.75%200%200%200%200%203.5%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23ic35943-e)%22%20d%3D%22M16%2014.5a1.75%201.75%200%201%200%200-3.5%201.75%201.75%200%200%200%200%203.5%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23ic35943-f)%22%20d%3D%22M11.5%2019.25a1.75%201.75%200%201%201-3.5%200%201.75%201.75%200%200%201%203.5%200%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23ic35943-g)%22%20d%3D%22M16%2021a1.75%201.75%200%201%200%200-3.5%201.75%201.75%200%200%200%200%203.5%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23ic35943-h)%22%20d%3D%22M24%2012.75a1.75%201.75%200%201%201-3.5%200%201.75%201.75%200%200%201%203.5%200%22%3E%3C%2Fpath%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22ic35943-a%22%20x1%3D%2210.222%22%20x2%3D%2213.511%22%20y1%3D%223%22%20y2%3D%2229.311%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23fff%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23EBEBEB%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22ic35943-c%22%20x1%3D%2211.396%22%20x2%3D%2214.897%22%20y1%3D%223%22%20y2%3D%2229.256%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23BBB%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23888%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22ic35943-d%22%20x1%3D%228%22%20x2%3D%2216.989%22%20y1%3D%2211%22%20y2%3D%2225.382%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%237751B8%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%235A409C%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22ic35943-e%22%20x1%3D%228%22%20x2%3D%2216.989%22%20y1%3D%2211%22%20y2%3D%2225.382%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%237751B8%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%235A409C%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22ic35943-f%22%20x1%3D%228%22%20x2%3D%2216.989%22%20y1%3D%2211%22%20y2%3D%2225.382%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%237751B8%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%235A409C%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22ic35943-g%22%20x1%3D%228%22%20x2%3D%2216.989%22%20y1%3D%2211%22%20y2%3D%2225.382%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%237751B8%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%235A409C%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22ic35943-h%22%20x1%3D%228%22%20x2%3D%2216.989%22%20y1%3D%2211%22%20y2%3D%2225.382%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%237751B8%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%235A409C%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3CradialGradient%20id%3D%22ic35943-b%22%20cx%3D%220%22%20cy%3D%220%22%20r%3D%221%22%20gradientTransform%3D%22matrix(13.7222%2020.58336%20-17.81255%2011.875%2011.306%209.771)%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20offset%3D%220.177%22%20stop-color%3D%22%23fff%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23B8B8B8%22%3E%3C%2Fstop%3E%3C%2FradialGradient%3E%3C%2Fdefs%3E%3C%2Fsvg%3E';
    }
    if (text.includes('kql') || text.includes('telemetry') || text.includes('event') || text.includes('real-time') || text.includes('eventhouse') || text.includes('streaming')) {
      return 'data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2232%22%20height%3D%2232%22%20fill%3D%22currentColor%22%20role%3D%22img%22%20focusable%3D%22false%22%3E%3Cpath%20fill%3D%22url(%23ibc0df0-a)%22%20d%3D%22M3%206.5A3.5%203.5%200%200%201%206.5%203h19A3.5%203.5%200%200%201%2029%206.5v19a3.5%203.5%200%200%201-3.5%203.5h-19A3.5%203.5%200%200%201%203%2025.5z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23ibc0df0-b)%22%20fill-opacity%3D%220.2%22%20d%3D%22M3%206.5A3.5%203.5%200%200%201%206.5%203h19A3.5%203.5%200%200%201%2029%206.5v19a3.5%203.5%200%200%201-3.5%203.5h-19A3.5%203.5%200%200%201%203%2025.5z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23ibc0df0-c)%22%20fill-rule%3D%22evenodd%22%20d%3D%22M25.5%204h-19A2.5%202.5%200%200%200%204%206.5v19A2.5%202.5%200%200%200%206.5%2028h19a2.5%202.5%200%200%200%202.5-2.5v-19A2.5%202.5%200%200%200%2025.5%204m-19-1A3.5%203.5%200%200%200%203%206.5v19A3.5%203.5%200%200%200%206.5%2029h19a3.5%203.5%200%200%200%203.5-3.5v-19A3.5%203.5%200%200%200%2025.5%203z%22%20clip-rule%3D%22evenodd%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23ibc0df0-d)%22%20d%3D%22M16%2014c1.475%200%202.857-.238%203.907-.657A5%205%200%200%200%2021%2012.751V19.5c0%201.425-2.149%202.5-5%202.5s-5-1.075-5-2.5v-6.75c.322.24.698.435%201.093.593%201.05.42%202.432.657%203.907.657%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23ibc0df0-e)%22%20d%3D%22M11%2011c0%201.105%202.239%202%205%202s5-.895%205-2l-.001-.043C20.942%209.872%2018.726%209%2016%209c-2.071%200-3.848.504-4.607%201.222-.24.226-.378.475-.392.735z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22%23F5F5F5%22%20fill-rule%3D%22evenodd%22%20d%3D%22M21.518%2029.864a1.5%201.5%200%200%200%202.561%201.06l.624-.623a1.5%201.5%200%200%200%202.558.977l1.414-1.415c.134-.133.24-.29.314-.46l.45.45c.945.946%202.561.276%202.561-1.06V22.5a1.5%201.5%200%200%200-1.5-1.5h-6.293c-1.336%200-2.005%201.616-1.06%202.56l.332.333c-.17.074-.327.18-.46.313l-1.414%201.415a1.5%201.5%200%200%200%20.977%202.558l-.624.624a1.5%201.5%200%200%200-.44%201.06Z%22%20clip-rule%3D%22evenodd%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23ibc0df0-f)%22%20d%3D%22M31%2022.5a.5.5%200%200%200-.5-.5h-6.293a.5.5%200%200%200-.353.854l6.293%206.293a.5.5%200%200%200%20.853-.354z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23ibc0df0-g)%22%20d%3D%22M24.58%2025.267a.5.5%200%200%200-.854-.353l-1.415%201.414a.5.5%200%201%200%20.708.707l1.414-1.414a.5.5%200%200%200%20.146-.354Z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23ibc0df0-h)%22%20d%3D%22M26.347%2027.035a.5.5%200%200%200-.854-.353l-2.828%202.828a.5.5%200%201%200%20.707.707L26.2%2027.39a.5.5%200%200%200%20.147-.354Z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23ibc0df0-i)%22%20d%3D%22M27.968%2029.157a.5.5%200%200%200-.707-.708l-1.414%201.415a.5.5%200%200%200%20.707.707z%22%3E%3C%2Fpath%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22ibc0df0-a%22%20x1%3D%2210.222%22%20x2%3D%2213.511%22%20y1%3D%223%22%20y2%3D%2229.311%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23fff%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23EBEBEB%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22ibc0df0-c%22%20x1%3D%2211.396%22%20x2%3D%2214.897%22%20y1%3D%223%22%20y2%3D%2229.256%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23BBB%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23888%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22ibc0df0-d%22%20x1%3D%2211%22%20x2%3D%2223.565%22%20y1%3D%229%22%20y2%3D%2218.665%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23008EE6%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23006094%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22ibc0df0-e%22%20x1%3D%2211%22%20x2%3D%2223.565%22%20y1%3D%229%22%20y2%3D%2218.665%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23008EE6%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23006094%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22ibc0df0-f%22%20x1%3D%2222.165%22%20x2%3D%2230.881%22%20y1%3D%2222%22%20y2%3D%2230.834%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23008EE6%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23006094%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22ibc0df0-g%22%20x1%3D%2222.165%22%20x2%3D%2230.881%22%20y1%3D%2222%22%20y2%3D%2230.834%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23008EE6%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23006094%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22ibc0df0-h%22%20x1%3D%2222.165%22%20x2%3D%2230.881%22%20y1%3D%2222%22%20y2%3D%2230.834%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23008EE6%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23006094%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22ibc0df0-i%22%20x1%3D%2222.165%22%20x2%3D%2230.881%22%20y1%3D%2222%22%20y2%3D%2230.834%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23008EE6%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23006094%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3CradialGradient%20id%3D%22ibc0df0-b%22%20cx%3D%220%22%20cy%3D%220%22%20r%3D%221%22%20gradientTransform%3D%22matrix(13.7222%2020.58336%20-17.81255%2011.875%2011.306%209.771)%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20offset%3D%220.177%22%20stop-color%3D%22%23fff%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23B8B8B8%22%3E%3C%2Fstop%3E%3C%2FradialGradient%3E%3C%2Fdefs%3E%3C%2Fsvg%3E';
    }
    if (text.includes('lakehouse') || text.includes('delta') || text.includes('storage') || text.includes('parquet') || text.includes('v-order') || text.includes('lineage')) {
      return 'data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2232%22%20height%3D%2232%22%20fill%3D%22currentColor%22%20role%3D%22img%22%20focusable%3D%22false%22%3E%3Cpath%20fill%3D%22url(%23iab4f30-a)%22%20d%3D%22M5%205.5A3.5%203.5%200%200%201%208.5%202h15A3.5%203.5%200%200%201%2027%205.5v21a3.5%203.5%200%200%201-3.5%203.5h-15A3.5%203.5%200%200%201%205%2026.5z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23iab4f30-b)%22%20fill-opacity%3D%220.2%22%20d%3D%22M5%205.5A3.5%203.5%200%200%201%208.5%202h15A3.5%203.5%200%200%201%2027%205.5v21a3.5%203.5%200%200%201-3.5%203.5h-15A3.5%203.5%200%200%201%205%2026.5z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23iab4f30-c)%22%20fill-rule%3D%22evenodd%22%20d%3D%22M23.5%203h-15A2.5%202.5%200%200%200%206%205.5v21A2.5%202.5%200%200%200%208.5%2029h15a2.5%202.5%200%200%200%202.5-2.5v-21A2.5%202.5%200%200%200%2023.5%203m-15-1A3.5%203.5%200%200%200%205%205.5v21A3.5%203.5%200%200%200%208.5%2030h15a3.5%203.5%200%200%200%203.5-3.5v-21A3.5%203.5%200%200%200%2023.5%202z%22%20clip-rule%3D%22evenodd%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23iab4f30-d)%22%20d%3D%22M13.99%2022.69a1.5%201.5%200%200%200-.154.31H11a2%202%200%200%201-2-2v-6.4a2%202%200%200%201%20.674-1.497l5-4.428a2%202%200%200%201%202.653%200l5%204.428A2%202%200%200%201%2023%2014.6v3.409L22.98%2018a1.5%201.5%200%200%200-.94-.01l-.12.05c-.37.15-.66.44-.81.81-.01.02-.05.07-.11.13-.06-.05-.11-.11-.11-.13a1.49%201.49%200%200%200-1.39-.93h-.14a1.5%201.5%200%200%200-1.256.94%201%201%200%200%201-.104.12c-.06-.05-.11-.11-.11-.13a1.49%201.49%200%200%200-1.39-.93h-.14c-.57.05-1.05.42-1.26.95-.04.08-.06.13-.06.13q-.013.012-.09.032l-.03.008a1.5%201.5%200%200%200-1.13%201.79%201.46%201.46%200%200%200%201.264%201.15l-.004.01c-.008.009-.038.017-.09.032l-.03.008c-.39.09-.73.32-.94.66%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23iab4f30-e)%22%20d%3D%22M23.75%2021h-.01a.502.502%200%200%200%20.1-.99c-.47-.11-.71-.31-.89-.78a.49.49%200%200%200-.46-.32c-.2%200-.38.12-.46.31-.15.38-.6.78-1.04.78s-.88-.41-1.03-.78c-.16-.38-.78-.38-.93%200s-.6.78-1.04.78-.88-.41-1.03-.78c-.08-.19-.26-.33-.47-.31-.2%200-.39.13-.46.32-.18.47-.41.67-.89.78-.27.06-.44.33-.38.6s.33.43.6.38c.5-.11.88-.32%201.17-.65.37.38.86.66%201.46.66s1.13-.29%201.51-.69c.37.39.91.69%201.49.69s1.1-.28%201.48-.66c.29.33.67.54%201.17.65.031.008.08.01.1.01h-.01z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23iab4f30-f)%22%20d%3D%22M23.75%2024h-.01a.502.502%200%200%200%20.1-.99c-.47-.11-.71-.31-.89-.78a.49.49%200%200%200-.46-.32c-.2%200-.38.12-.46.31-.15.38-.6.78-1.04.78s-.88-.41-1.03-.78c-.16-.38-.78-.38-.93%200s-.6.78-1.04.78-.88-.41-1.03-.78c-.08-.19-.26-.33-.47-.31-.2%200-.39.13-.46.32-.18.47-.41.67-.89.78-.27.06-.44.33-.38.6s.33.43.6.38c.5-.11.88-.32%201.17-.65.37.38.86.66%201.46.66s1.13-.29%201.51-.69c.37.39.91.69%201.49.69s1.1-.28%201.48-.66c.29.33.67.54%201.17.65.031.008.08.01.1.01h-.01z%22%3E%3C%2Fpath%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22iab4f30-a%22%20x1%3D%2211.111%22%20x2%3D%2215.576%22%20y1%3D%222%22%20y2%3D%2230.067%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23fff%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23EBEBEB%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22iab4f30-c%22%20x1%3D%2212.104%22%20x2%3D%2216.851%22%20y1%3D%222%22%20y2%3D%2229.972%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23BBB%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23888%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22iab4f30-d%22%20x1%3D%229%22%20x2%3D%2224.817%22%20y1%3D%228.172%22%20y2%3D%2223.393%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%233477EA%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%231D53A4%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22iab4f30-e%22%20x1%3D%229%22%20x2%3D%2224.817%22%20y1%3D%228.172%22%20y2%3D%2223.393%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%233477EA%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%231D53A4%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22iab4f30-f%22%20x1%3D%229%22%20x2%3D%2224.817%22%20y1%3D%228.172%22%20y2%3D%2223.393%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%233477EA%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%231D53A4%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3CradialGradient%20id%3D%22iab4f30-b%22%20cx%3D%220%22%20cy%3D%220%22%20r%3D%221%22%20gradientTransform%3D%22matrix(11.61113%2022.16669%20-17.08352%208.94852%2012.028%209.292)%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20offset%3D%220.177%22%20stop-color%3D%22%23fff%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23B8B8B8%22%3E%3C%2Fstop%3E%3C%2FradialGradient%3E%3C%2Fdefs%3E%3C%2Fsvg%3E';
    }
    if (text.includes('pipeline') || text.includes('dataflow') || text.includes('etl') || text.includes('ingestion')) {
      return 'data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2232%22%20height%3D%2232%22%20fill%3D%22currentColor%22%20role%3D%22img%22%20focusable%3D%22false%22%3E%3Cpath%20fill%3D%22url(%23idca273-a)%22%20d%3D%22M3%206.5A3.5%203.5%200%200%201%206.5%203h19A3.5%203.5%200%200%201%2029%206.5v19a3.5%203.5%200%200%201-3.5%203.5h-19A3.5%203.5%200%200%201%203%2025.5z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23idca273-b)%22%20fill-opacity%3D%220.2%22%20d%3D%22M3%206.5A3.5%203.5%200%200%201%206.5%203h19A3.5%203.5%200%200%201%2029%206.5v19a3.5%203.5%200%200%201-3.5%203.5h-19A3.5%203.5%200%200%201%203%2025.5z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23idca273-c)%22%20fill-rule%3D%22evenodd%22%20d%3D%22M25.5%204h-19A2.5%202.5%200%200%200%204%206.5v19A2.5%202.5%200%200%200%206.5%2028h19a2.5%202.5%200%200%200%202.5-2.5v-19A2.5%202.5%200%200%200%2025.5%204m-19-1A3.5%203.5%200%200%200%203%206.5v19A3.5%203.5%200%200%200%206.5%2029h19a3.5%203.5%200%200%200%203.5-3.5v-19A3.5%203.5%200%200%200%2025.5%203z%22%20clip-rule%3D%22evenodd%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23idca273-d)%22%20d%3D%22M15%2011.5a2.5%202.5%200%200%201-2%202.45V16h4.5a1.5%201.5%200%200%200%201.5-1.5v-.55a2.5%202.5%200%201%201%201%200v.55a2.5%202.5%200%200%201-2.5%202.5H13v1.05a2.5%202.5%200%201%201-2.294.709v-.056h.056A2.5%202.5%200%200%201%2012%2018.05v-4.1a2.5%202.5%200%200%201-1.294-4.191v-.023h.022A2.5%202.5%200%200%201%2015%2011.5%22%3E%3C%2Fpath%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22idca273-a%22%20x1%3D%2210.222%22%20x2%3D%2213.511%22%20y1%3D%223%22%20y2%3D%2229.311%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23fff%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23EBEBEB%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22idca273-c%22%20x1%3D%2211.396%22%20x2%3D%2214.897%22%20y1%3D%223%22%20y2%3D%2229.256%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23BBB%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23888%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22idca273-d%22%20x1%3D%2210%22%20x2%3D%2223.835%22%20y1%3D%229%22%20y2%3D%2220.859%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%234BA446%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%233F7D35%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3CradialGradient%20id%3D%22idca273-b%22%20cx%3D%220%22%20cy%3D%220%22%20r%3D%221%22%20gradientTransform%3D%22matrix(13.7222%2020.58336%20-17.81255%2011.875%2011.306%209.771)%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20offset%3D%220.177%22%20stop-color%3D%22%23fff%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23B8B8B8%22%3E%3C%2Fstop%3E%3C%2FradialGradient%3E%3C%2Fdefs%3E%3C%2Fsvg%3E';
    }
    if (text.includes('notebook') || text.includes('spark') || text.includes('python')) {
      return 'data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2232%22%20height%3D%2232%22%20fill%3D%22currentColor%22%20role%3D%22img%22%20focusable%3D%22false%22%3E%3Cpath%20fill%3D%22url(%23i22b11d-a)%22%20d%3D%22M5%205.5A3.5%203.5%200%200%201%208.5%202h15A3.5%203.5%200%200%201%2027%205.5v21a3.5%203.5%200%200%201-3.5%203.5h-15A3.5%203.5%200%200%201%205%2026.5z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23i22b11d-b)%22%20fill-opacity%3D%220.2%22%20d%3D%22M5%205.5A3.5%203.5%200%200%201%208.5%202h15A3.5%203.5%200%200%201%2027%205.5v21a3.5%203.5%200%200%201-3.5%203.5h-15A3.5%203.5%200%200%201%205%2026.5z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23i22b11d-c)%22%20d%3D%22M17.494%208.521a.5.5%200%200%201%20.335.623l-2.7%209a.5.5%200%201%201-.957-.287l2.7-9a.5.5%200%200%201%20.622-.336%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23i22b11d-d)%22%20d%3D%22M18.797%2010.446a.5.5%200%200%201%20.707%200l2.63%202.63a.6.6%200%200%201%200%20.848l-2.63%202.63a.5.5%200%200%201-.707-.708l2.346-2.346-2.346-2.347a.5.5%200%200%201%200-.707%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23i22b11d-e)%22%20d%3D%22M12.496%2010.446a.5.5%200%201%201%20.707.707L10.857%2013.5l2.346%202.346a.5.5%200%200%201-.707.707l-2.63-2.629a.6.6%200%200%201%200-.848z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23i22b11d-f)%22%20fill-rule%3D%22evenodd%22%20d%3D%22M5%2026.5v-21A3.5%203.5%200%200%201%208.5%202h15A3.5%203.5%200%200%201%2027%205.5v21a3.5%203.5%200%200%201-3.5%203.5h-15A3.5%203.5%200%200%201%205%2026.5M8.5%203h15A2.5%202.5%200%200%201%2026%205.5V20a3%203%200%200%201-3%203H8.5A3.5%203.5%200%200%200%206%2024.05V5.5A2.5%202.5%200%200%201%208.5%203M26%2025.646v.854a2.5%202.5%200%200%201-2.5%202.5h-15a2.5%202.5%200%200%201%200-5H23a4%204%200%200%200%203-1.354V23a3%203%200%200%201-3%203H8a.5.5%200%200%200%200%201h15a4%204%200%200%200%203-1.354%22%20clip-rule%3D%22evenodd%22%3E%3C%2Fpath%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22i22b11d-a%22%20x1%3D%2211.111%22%20x2%3D%2215.576%22%20y1%3D%222%22%20y2%3D%2230.067%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23fff%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23EBEBEB%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22i22b11d-c%22%20x1%3D%229.691%22%20x2%3D%2219.427%22%20y1%3D%228.5%22%20y2%3D%2220.784%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%234BA446%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%233F7D35%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22i22b11d-d%22%20x1%3D%229.691%22%20x2%3D%2219.427%22%20y1%3D%228.5%22%20y2%3D%2220.784%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%234BA446%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%233F7D35%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22i22b11d-e%22%20x1%3D%229.691%22%20x2%3D%2219.427%22%20y1%3D%228.5%22%20y2%3D%2220.784%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%234BA446%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%233F7D35%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22i22b11d-f%22%20x1%3D%2212.104%22%20x2%3D%2216.851%22%20y1%3D%222%22%20y2%3D%2229.972%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23BBB%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23888%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3CradialGradient%20id%3D%22i22b11d-b%22%20cx%3D%220%22%20cy%3D%220%22%20r%3D%221%22%20gradientTransform%3D%22matrix(11.61113%2022.16669%20-17.08352%208.94852%2012.028%209.292)%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20offset%3D%220.177%22%20stop-color%3D%22%23fff%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23B8B8B8%22%3E%3C%2Fstop%3E%3C%2FradialGradient%3E%3C%2Fdefs%3E%3C%2Fsvg%3E';
    }
    if (text.includes('rls') || text.includes('ols') || text.includes('security') || text.includes('access')) {
      return 'data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20viewBox%3D%220%200%20385.84%20401.32%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22a%22%20x1%3D%22564.08%22%20y1%3D%22144.16%22%20x2%3D%22399.95%22%20y2%3D%22428.44%22%20gradientTransform%3D%22matrix(1%2C%200%2C%200%2C%20-1%2C%200%2C%20770)%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20offset%3D%220.37%22%20stop-color%3D%22%23114a8b%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%230c59a4%22%2F%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22b%22%20x1%3D%22402.18%22%20y1%3D%22195.84%22%20x2%3D%22262.61%22%20y2%3D%22437.59%22%20gradientTransform%3D%22matrix(1%2C%200%2C%200%2C%20-1%2C%200%2C%20770)%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%230669bc%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%230078d4%22%2F%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22c%22%20x1%3D%22528.83%22%20y1%3D%22360.36%22%20x2%3D%22390.83%22%20y2%3D%22599.36%22%20gradientTransform%3D%22matrix(1%2C%200%2C%200%2C%20-1%2C%200%2C%20770)%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%230078d4%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%231493df%22%2F%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22d%22%20x1%3D%22353.62%22%20y1%3D%22380.7%22%20x2%3D%22215.62%22%20y2%3D%22619.71%22%20gradientTransform%3D%22matrix(1%2C%200%2C%200%2C%20-1%2C%200%2C%20770)%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%2328afea%22%2F%3E%3Cstop%20offset%3D%220.74%22%20stop-color%3D%22%233ccbf4%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Ctitle%3EMicrosoft%20Defender%20logo%20-%20Brandlogos.net%3C%2Ftitle%3E%3Cpath%20d%3D%22M384%2C584.66a13.55%2C13.55%2C0%2C0%2C0%2C6.72-1.76C490.33%2C525.46%2C556.76%2C461%2C573%2C376.28q.42-2.19.79-4.38L370.69%2C358.45Z%22%20transform%3D%22translate(-191.08%20-183.34)%22%20style%3D%22fill%3Aurl(%23a)%22%2F%3E%3Cpath%20d%3D%22M377.27%2C582.9a13.54%2C13.54%2C0%2C0%2C0%2C6.72%2C1.76V358.44L194.23%2C371.89q.38%2C2.2.79%2C4.38C211.24%2C461%2C277.66%2C525.45%2C377.27%2C582.89Z%22%20transform%3D%22translate(-191.08%20-183.34)%22%20style%3D%22fill%3Aurl(%23b)%22%2F%3E%3Cpath%20d%3D%22M576.92%2C249a13.1%2C13.1%2C0%2C0%2C0-12.74-13.15c-60.25-1.24-81.56-11.65-111.27-31.7A117.71%2C117.71%2C0%2C0%2C0%2C384%2C183.36l-20%2C188.4H573.79a213%2C213%2C0%2C0%2C0%2C3.12-36Z%22%20transform%3D%22translate(-191.08%20-183.34)%22%20style%3D%22fill%3Aurl(%23c)%22%2F%3E%3Cpath%20d%3D%22M384%2C183.36a117.71%2C117.71%2C0%2C0%2C0-68.9%2C20.79c-29.72%2C20.06-51%2C30.47-111.27%2C31.7A13.1%2C13.1%2C0%2C0%2C0%2C191.08%2C249v86.8a213%2C213%2C0%2C0%2C0%2C3.12%2C36H384Z%22%20transform%3D%22translate(-191.08%20-183.34)%22%20style%3D%22fill%3Aurl(%23d)%22%2F%3E%3C%2Fsvg%3E';
    }
    return 'data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2232%22%20height%3D%2232%22%20fill%3D%22currentColor%22%20role%3D%22img%22%20focusable%3D%22false%22%3E%3Cpath%20fill%3D%22url(%23i7cb92d-a)%22%20fill-rule%3D%22evenodd%22%20d%3D%22m3.148%2021.322-.41%201.501c-.153.48-.367%201.186-.482%201.814a3.94%203.94%200%200%200%203.247%205.313c.554.08%201.181.075%201.884-.028l3.23-.446a2.05%202.05%200%200%200%201.695-1.49l2.223-8.164z%22%20clip-rule%3D%22evenodd%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23i7cb92d-b)%22%20d%3D%22M6.298%2021.71c-3.404.527-4.103%203.096-4.103%203.096l3.26-11.979%2017.035-2.304-2.323%208.438c-.12.452-.5.798-.971.87l-.095.016-12.898%201.879z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23i7cb92d-c)%22%20fill-opacity%3D%220.8%22%20d%3D%22M6.298%2021.71c-3.404.527-4.103%203.096-4.103%203.096l3.26-11.979%2017.035-2.304-2.323%208.438c-.12.452-.5.798-.971.87l-.095.016-12.898%201.879z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23i7cb92d-d)%22%20d%3D%22m8.23%2014.066%2018.86-2.786c.448-.06.811-.39.926-.82l1.946-7.043a1.116%201.116%200%200%200-1.218-1.408L10.75%204.668a5.03%205.03%200%200%200-4.044%203.636L4.11%2017.709c.52-1.902.84-3.05%204.12-3.643%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23i7cb92d-e)%22%20d%3D%22m8.23%2014.066%2018.86-2.786c.448-.06.811-.39.926-.82l1.946-7.043a1.116%201.116%200%200%200-1.218-1.408L10.75%204.668a5.03%205.03%200%200%200-4.044%203.636L4.11%2017.709c.52-1.902.84-3.05%204.12-3.643%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23i7cb92d-f)%22%20fill-opacity%3D%220.4%22%20d%3D%22m8.23%2014.066%2018.86-2.786c.448-.06.811-.39.926-.82l1.946-7.043a1.116%201.116%200%200%200-1.218-1.408L10.75%204.668a5.03%205.03%200%200%200-4.044%203.636L4.11%2017.709c.52-1.902.84-3.05%204.12-3.643%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23i7cb92d-g)%22%20d%3D%22M8.23%2014.066c-2.731.495-3.409%201.374-3.86%202.753l-2.175%207.988s.695-2.543%204.058-3.087L19.1%2019.848l.095-.016c.471-.071.851-.419.972-.87l1.911-6.941-13.85%202.045Z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23i7cb92d-h)%22%20fill-opacity%3D%220.2%22%20d%3D%22M8.23%2014.066c-2.731.495-3.409%201.374-3.86%202.753l-2.175%207.988s.695-2.543%204.058-3.087L19.1%2019.848l.095-.016c.471-.071.851-.419.972-.87l1.911-6.941-13.85%202.045Z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23i7cb92d-i)%22%20fill-rule%3D%22evenodd%22%20d%3D%22M6.253%2021.72c-2.842.46-3.775%202.342-3.997%202.916a3.94%203.94%200%200%200%203.247%205.314c.554.08%201.181.075%201.884-.028l3.23-.446a2.05%202.05%200%200%200%201.695-1.49l2.026-7.443z%22%20clip-rule%3D%22evenodd%22%3E%3C%2Fpath%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22i7cb92d-a%22%20x1%3D%228.268%22%20x2%3D%228.268%22%20y1%3D%2230.005%22%20y2%3D%2219.822%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20offset%3D%220.056%22%20stop-color%3D%22%232AAC94%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.155%22%20stop-color%3D%22%23239C87%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.372%22%20stop-color%3D%22%23177E71%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.588%22%20stop-color%3D%22%230E6961%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.799%22%20stop-color%3D%22%23095D57%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23085954%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22i7cb92d-b%22%20x1%3D%2221.134%22%20x2%3D%2211.302%22%20y1%3D%2222.617%22%20y2%3D%2211.923%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20offset%3D%220.042%22%20stop-color%3D%22%23ABE88E%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.549%22%20stop-color%3D%22%232AAA92%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.906%22%20stop-color%3D%22%23117865%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22i7cb92d-c%22%20x1%3D%22-3.028%22%20x2%3D%226.329%22%20y1%3D%2222.097%22%20y2%3D%2218.906%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%236AD6F9%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%236AD6F9%22%20stop-opacity%3D%220%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22i7cb92d-d%22%20x1%3D%224.11%22%20x2%3D%2229.016%22%20y1%3D%229.855%22%20y2%3D%229.855%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20offset%3D%220.043%22%20stop-color%3D%22%2325FFD4%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.874%22%20stop-color%3D%22%2355DDB9%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22i7cb92d-e%22%20x1%3D%224.11%22%20x2%3D%2226.546%22%20y1%3D%226.373%22%20y2%3D%2216.791%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%236AD6F9%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.23%22%20stop-color%3D%22%2360E9D0%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.651%22%20stop-color%3D%22%236DE9BB%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.994%22%20stop-color%3D%22%23ABE88E%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22i7cb92d-f%22%20x1%3D%226.185%22%20x2%3D%2218.385%22%20y1%3D%228.323%22%20y2%3D%2211.021%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23fff%22%20stop-opacity%3D%220%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.459%22%20stop-color%3D%22%23fff%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23fff%22%20stop-opacity%3D%220%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22i7cb92d-g%22%20x1%3D%2210.23%22%20x2%3D%2210.518%22%20y1%3D%2218.774%22%20y2%3D%2210.219%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20offset%3D%220.205%22%20stop-color%3D%22%23063D3B%22%20stop-opacity%3D%220%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.586%22%20stop-color%3D%22%23063D3B%22%20stop-opacity%3D%220.237%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.872%22%20stop-color%3D%22%23063D3B%22%20stop-opacity%3D%220.75%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22i7cb92d-h%22%20x1%3D%221.166%22%20x2%3D%2211.592%22%20y1%3D%2217.923%22%20y2%3D%2219.884%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23fff%22%20stop-opacity%3D%220%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.459%22%20stop-color%3D%22%23fff%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23fff%22%20stop-opacity%3D%220%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22i7cb92d-i%22%20x1%3D%228.698%22%20x2%3D%226.664%22%20y1%3D%2227.183%22%20y2%3D%2217.238%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20offset%3D%220.064%22%20stop-color%3D%22%23063D3B%22%20stop-opacity%3D%220%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.17%22%20stop-color%3D%22%23063D3B%22%20stop-opacity%3D%220.135%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.562%22%20stop-color%3D%22%23063D3B%22%20stop-opacity%3D%220.599%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.85%22%20stop-color%3D%22%23063D3B%22%20stop-opacity%3D%220.9%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23063D3B%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3C%2Fsvg%3E';
  };

  const isCase1Relationship = current.id === 'ev-01-b';
  const isCase3MaintenanceRisk = current.id === 'ev-03-c' || current.tabLabel === 'Maintenance Risk';
  const isCase4QueryMatrix = current.id === 'ev-04-b' || current.tabLabel === 'Architecture Matrix';
  const isCase4DesiredOutput = current.id === 'ev-04-c' || current.tabLabel === 'Desired Output';
  const isCase6Comparison = current.id === 'ev-06-b' || current.tabLabel === 'Fabric Item Comparison';
  const isCase6DecisionLog = current.id === 'ev-06-c' || current.tabLabel === 'Architecture Decision Log';
  const isCase7SecurityMatrix = current.id === 'ev-07-b' || current.tabLabel === 'Security Boundary';
  const isCase8ALMPipeline = current.id === 'ev-08-b' || current.tabLabel === 'Target ALM Architecture';
  const isCase9Lineage = current.id === 'ev-09-b' || current.tabLabel === 'Lineage Graph';
  const isCase9ImpactAnalysis = current.id === 'ev-09-c' || current.tabLabel === 'Impact Analysis Feature';
  const isCase10Bridge = (current.id === 'ev-10-a' || current.id === 'ev-10-c') || (current.tabLabel.includes('Bridge') && current.id.startsWith('ev-10'));
  const isCase10DirectRelationship = current.id === 'ev-10-a' || (current.id.startsWith('ev-10') && current.tabLabel.includes('Relationship'));
  const isCase11IncrementalRefresh = current.id === 'ev-11-b' || current.tabLabel === 'Incremental Refresh Architecture';
  const isCase12Maintainability = current.id === 'ev-12-c' || current.tabLabel === 'Maintainability Analysis';

  const isCustomDiagram = 
    isCase1Relationship || 
    isCase3MaintenanceRisk ||
    isCase4QueryMatrix ||
    isCase4DesiredOutput ||
    isCase6Comparison || 
    isCase6DecisionLog || 
    isCase7SecurityMatrix || 
    isCase8ALMPipeline || 
    isCase9Lineage || 
    isCase9ImpactAnalysis || 
    isCase10Bridge || 
    isCase11IncrementalRefresh || 
    isCase12Maintainability;

  const hasSqlOutput = current.content.includes('PortfolioType | TotalBalance') && !isCase10Bridge;

  const renderHighlightedCode = (rawCode: string, lang?: string) => {
    const lines = rawCode.split('\n');
    const isMarkdown = lang === 'markdown' || lang === 'md' || current.type === 'text';

    if (isMarkdown) {
      return (
        <div className="flex font-mono text-xs leading-6 overflow-x-auto select-text">
          <div className="py-3 px-3 bg-surface2/60 text-muted2 text-right select-none border-r border-border font-mono text-[11px] flex flex-col min-w-[40px]">
            {lines.map((_, i) => (
              <span key={i} className="leading-6">{i + 1}</span>
            ))}
          </div>

          <div className="py-3 px-5 flex-1 font-mono text-xs flex flex-col gap-1">
            {lines.map((line, lineIdx) => {
              const trimmed = line.trim();
              if (trimmed.startsWith('# ')) {
                return (
                  <div key={lineIdx} className="font-display text-sm font-bold text-tx pt-1 pb-0.5 border-b border-border/50">
                    {trimmed.replace('# ', '')}
                  </div>
                );
              }
              if (trimmed.startsWith('## ') || trimmed.startsWith('### ')) {
                return (
                  <div key={lineIdx} className="font-display text-xs font-bold text-tx pt-2 pb-0.5">
                    {trimmed.replace(/^###?\s+/, '')}
                  </div>
                );
              }
              if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
                return (
                  <div key={lineIdx} className="flex items-start gap-2 pl-2 text-tx">
                    <span className="text-muted">•</span>
                    <span>{trimmed.replace(/^[-*]\s+/, '')}</span>
                  </div>
                );
              }
              if (!trimmed) {
                return <div key={lineIdx} className="h-2" />;
              }
              return (
                <div key={lineIdx} className="text-tx leading-relaxed">
                  {line}
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    return (
      <div className="flex font-mono text-xs leading-6 overflow-x-auto select-text">
        <div className="py-3 px-3 bg-surface2/60 text-muted2 text-right select-none border-r border-border font-mono text-[11px] flex flex-col min-w-[40px]">
          {lines.map((_, i) => (
            <span key={i} className="leading-6">{i + 1}</span>
          ))}
        </div>

        <div className="py-3 px-4 flex-1 whitespace-pre font-mono text-xs leading-6">
          {lines.map((line, lineIdx) => {
            const trimmed = line.trim();
            if (trimmed.startsWith('--') || trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed.startsWith('*') || trimmed.endsWith('*/')) {
              return (
                <div key={lineIdx} className="text-muted italic leading-6">
                  {line}
                </div>
              );
            }

            const keywords = new Set([
              'SELECT', 'FROM', 'WHERE', 'GROUP BY', 'HAVING', 'ORDER BY', 'COUNT', 'DISTINCT',
              'AS', 'JOIN', 'LEFT JOIN', 'INNER JOIN', 'ON', 'AND', 'OR', 'NOT', 'NULL', 'IS',
              'IN', 'CASE', 'WHEN', 'THEN', 'ELSE', 'END', 'CALCULATE', 'SUM', 'DIVIDE',
              'USERELATIONSHIP', 'FILTER', 'ALL', 'VALUES', 'VAR', 'RETURN', 'EVALUATE',
              'SUMMARIZECOLUMNS', 'CREATE', 'TABLE', 'VARCHAR', 'DATE', 'INT', 'DECIMAL',
              'TABLE.SELECTROWS', 'RANGESTART', 'RANGEEND', 'ORDERDATETIME', 'LET',
              'EACH', 'TYPE', 'DATETIME', 'SOURCE', 'LAKEHOUSE.CONTENTS',
              'SELECTEDMEASURE', 'SELECTEDMEASUREFORMATSTRING', 'ISSELECTEDMEASURE',
              'DATESYTD', 'SAMEPERIODLASTYEAR', 'CALCULATION', 'ITEM', 'MEASURE'
            ]);

            const tokens = line.match(/"[^"]*"|'[^']*'|\[[^\]]*\]|[a-zA-Z_][a-zA-Z0-9_]*|\s+|[(),;=><+*./\\-]/g) || [line];

            return (
              <div key={lineIdx} className="leading-6 text-tx">
                {tokens.map((token, tIdx) => {
                  const upper = token.toUpperCase();
                  if (keywords.has(upper)) {
                    return <span key={tIdx} className="text-accent font-semibold">{token}</span>;
                  }
                  if ((token.startsWith('"') && token.endsWith('"')) || (token.startsWith("'") && token.endsWith("'"))) {
                    return <span key={tIdx} className="text-success">{token}</span>;
                  }
                  if (token.startsWith('[') && token.endsWith(']')) {
                    return <span key={tIdx} className="text-tx font-bold">{token}</span>;
                  }
                  if (/^\d+(\.\d+)?$/.test(token)) {
                    return <span key={tIdx} className="text-tx font-semibold">{token}</span>;
                  }
                  return <span key={tIdx}>{token}</span>;
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className={`bg-surface border border-border overflow-hidden flex flex-col ${
      variant === 'solution' ? 'rounded-lg shadow-xs' : 'rounded-xl shadow-card'
    }`}>
            <div className={`bg-surface2/60 pb-0 border-b border-border flex flex-col ${
        variant === 'solution' ? 'px-4 pt-3 gap-2' : 'px-5 pt-4 gap-3'
      }`}>
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h3 className={`font-display font-bold text-tx ${variant === 'solution' ? 'text-xs' : 'text-sm'}`}>
              {variant === 'solution' ? 'Solution Evidence' : 'Diagnostics & Evidence Studio'}
            </h3>
            <p className="font-mono text-xs text-muted mt-0.5">
              {variant === 'solution'
                ? 'Implementation artifact unlocked after evaluation'
                : 'Select an investigation artifact to inspect telemetry, queries, and topology'}
            </p>
          </div>

          {variant === 'studio' && <div className="flex items-center gap-2">
            {isCustomDiagram && (
              <button
                onClick={() => setShowRawSource(!showRawSource)}
                className={`font-mono text-xs px-2.5 py-1 rounded transition-colors border ${
                  showRawSource 
                    ? 'bg-accent text-accent-tx border-accent font-bold' 
                    : 'bg-surface hover:bg-surface2 text-muted hover:text-tx border-border'
                }`}
              >
                {showRawSource ? '[View Diagram]' : '[View Raw Source]'}
              </button>
            )}

            <button
              onClick={handleCopy}
              className="font-mono text-xs text-muted hover:text-tx px-2.5 py-1 rounded bg-surface hover:bg-surface2 border border-border transition-colors flex items-center gap-1.5"
            >
              {copied ? (
                <span className="text-success font-bold">✓ Copied</span>
              ) : (
                <span>[Copy Content]</span>
              )}
            </button>
          </div>}
        </div>

                <div className="flex items-center gap-1.5 overflow-x-auto pt-1 -mb-[1px] no-scrollbar">
          {evidenceList.map((ev, index) => {
            const isActive = index === activeIndex;
            const logoPath = getTabIcon(ev);

            return (
              <button
                key={ev.id}
                onClick={() => {
                  setActiveIndex(index);
                  setShowRawSource(false);
                }}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-t-lg font-mono text-xs font-medium transition-all whitespace-nowrap border-t border-x ${
                  isActive
                    ? 'bg-surface text-tx border-border border-b-transparent font-bold shadow-xs z-10'
                    : 'bg-surface2/40 text-muted hover:text-tx hover:bg-surface2 border-transparent border-b-border'
                }`}
              >
                <img src={logoPath} alt="" className="w-3.5 h-3.5 object-contain flex-shrink-0" />
                <span>{ev.tabLabel}</span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse ml-0.5" />
                )}
              </button>
            );
          })}
        </div>
      </div>

            <div className={`${variant === 'solution' ? 'p-4' : 'p-6'} flex flex-col gap-4 bg-surface`}>
                <div className="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-border/70">
          <div>
            <h4 className="text-sm font-bold text-tx font-display">{current.title}</h4>
            <p className="font-mono text-xs text-muted mt-0.5">{current.caption}</p>
          </div>

          <span className="font-mono text-xs px-2 py-0.5 rounded bg-surface2 border border-border text-muted2">
            Artifact Type: {current.type.toUpperCase()}
          </span>
        </div>

                                {!showRawSource && isCase1Relationship && (
          <div className="border border-border rounded-xl bg-surface2/20 p-5 flex flex-col gap-5">
            <div className="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-border">
              <div className="flex items-center gap-2">
                <img src="data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20width%3D%22630px%22%20height%3D%22630px%22%20viewBox%3D%220%200%20630%20630%22%20version%3D%221.1%22%3E%0D%0A%20%20%20%20%3C!--%20Generator%3A%20Sketch%2053.2%20(72643)%20-%20https%3A%2F%2Fsketchapp.com%20--%3E%0D%0A%20%20%20%20%3Ctitle%3EPBI%20Logo%3C%2Ftitle%3E%0D%0A%20%20%20%20%3Cdesc%3ECreated%20with%20Sketch.%3C%2Fdesc%3E%0D%0A%20%20%20%20%3Cdefs%3E%0D%0A%20%20%20%20%20%20%20%20%3ClinearGradient%20x1%3D%2250%25%22%20y1%3D%220%25%22%20x2%3D%2250%25%22%20y2%3D%22100%25%22%20id%3D%22linearGradient-1%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cstop%20stop-color%3D%22%23EBBB14%22%20offset%3D%220%25%22%2F%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cstop%20stop-color%3D%22%23B25400%22%20offset%3D%22100%25%22%2F%3E%0D%0A%20%20%20%20%20%20%20%20%3C%2FlinearGradient%3E%0D%0A%20%20%20%20%20%20%20%20%3ClinearGradient%20x1%3D%2250%25%22%20y1%3D%220%25%22%20x2%3D%2250%25%22%20y2%3D%22100%25%22%20id%3D%22linearGradient-2%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cstop%20stop-color%3D%22%23F9E583%22%20offset%3D%220%25%22%2F%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cstop%20stop-color%3D%22%23DE9800%22%20offset%3D%22100%25%22%2F%3E%0D%0A%20%20%20%20%20%20%20%20%3C%2FlinearGradient%3E%0D%0A%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M346%2C604%20L346%2C630%20L320%2C630%20L153%2C630%20C138.640597%2C630%20127%2C618.359403%20127%2C604%20L127%2C183%20C127%2C168.640597%20138.640597%2C157%20153%2C157%20L320%2C157%20C334.359403%2C157%20346%2C168.640597%20346%2C183%20L346%2C604%20Z%22%20id%3D%22path-3%22%2F%3E%0D%0A%20%20%20%20%20%20%20%20%3Cfilter%20x%3D%22-9.1%25%22%20y%3D%22-6.3%25%22%20width%3D%22136.5%25%22%20height%3D%22116.9%25%22%20filterUnits%3D%22objectBoundingBox%22%20id%3D%22filter-4%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3CfeOffset%20dx%3D%2220%22%20dy%3D%2210%22%20in%3D%22SourceAlpha%22%20result%3D%22shadowOffsetOuter1%22%2F%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3CfeGaussianBlur%20stdDeviation%3D%2210%22%20in%3D%22shadowOffsetOuter1%22%20result%3D%22shadowBlurOuter1%22%2F%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3CfeColorMatrix%20values%3D%220%200%200%200%200%20%20%200%200%200%200%200%20%20%200%200%200%200%200%20%200%200%200%200.0530211976%200%22%20type%3D%22matrix%22%20in%3D%22shadowBlurOuter1%22%2F%3E%0D%0A%20%20%20%20%20%20%20%20%3C%2Ffilter%3E%0D%0A%20%20%20%20%20%20%20%20%3ClinearGradient%20x1%3D%2250%25%22%20y1%3D%220%25%22%20x2%3D%2250%25%22%20y2%3D%22100%25%22%20id%3D%22linearGradient-5%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cstop%20stop-color%3D%22%23F9E68B%22%20offset%3D%220%25%22%2F%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cstop%20stop-color%3D%22%23F3CD32%22%20offset%3D%22100%25%22%2F%3E%0D%0A%20%20%20%20%20%20%20%20%3C%2FlinearGradient%3E%0D%0A%20%20%20%20%3C%2Fdefs%3E%0D%0A%20%20%20%20%3Cg%20id%3D%22PBI-Logo%22%20stroke%3D%22none%22%20stroke-width%3D%221%22%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%0D%0A%20%20%20%20%20%20%20%20%3Cg%20id%3D%22Group%22%20transform%3D%22translate(77.500000%2C%200.000000)%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Crect%20id%3D%22Rectangle%22%20fill%3D%22url(%23linearGradient-1)%22%20x%3D%22256%22%20y%3D%220%22%20width%3D%22219%22%20height%3D%22630%22%20rx%3D%2226%22%2F%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cg%20id%3D%22Combined-Shape%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cuse%20fill%3D%22black%22%20fill-opacity%3D%221%22%20filter%3D%22url(%23filter-4)%22%20xlink%3Ahref%3D%22%23path-3%22%2F%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cuse%20fill%3D%22url(%23linearGradient-2)%22%20fill-rule%3D%22evenodd%22%20xlink%3Ahref%3D%22%23path-3%22%2F%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fg%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M219%2C604%20L219%2C630%20L193%2C630%20L26%2C630%20C11.6405965%2C630%201.75851975e-15%2C618.359403%200%2C604%20L0%2C341%20C-1.75851975e-15%2C326.640597%2011.6405965%2C315%2026%2C315%20L193%2C315%20C207.359403%2C315%20219%2C326.640597%20219%2C341%20L219%2C604%20Z%22%20id%3D%22Combined-Shape%22%20fill%3D%22url(%23linearGradient-5)%22%2F%3E%0D%0A%20%20%20%20%20%20%20%20%3C%2Fg%3E%0D%0A%20%20%20%20%3C%2Fg%3E%0D%0A%3C%2Fsvg%3E" alt="Power BI" className="w-4 h-4 object-contain" />
                <span className="font-display text-xs font-bold text-tx">
                  Power BI Semantic Model • Model View
                </span>
              </div>
              <span className="font-mono text-[11px] text-danger font-semibold bg-danger/10 border border-danger/30 px-2 py-0.5 rounded">
                Query Failed: Duplicate Key on One Side
              </span>
            </div>

            <div
              data-testid="case1-model-view"
              className="min-w-0 overflow-x-auto rounded-[2px] border border-[#c8c6c4] bg-[#e7e6e5]"
            >
              <div className="min-h-[252px] min-w-[780px] bg-[#e7e6e5] px-10 py-10">
                <div className="flex items-start justify-center gap-0">
                  <div
                    role="group"
                    aria-label="FactSales table"
                    className="z-10 w-[250px] overflow-hidden rounded-[2px] border border-[#c8c6c4] bg-white shadow-[0_2px_5px_rgba(0,0,0,0.14)]"
                  >
                    <div className="flex h-10 items-center justify-between border-b border-[#d2d0ce] bg-white px-3 font-sans text-[#201f1e]">
                      <span className="text-[13px] font-semibold">FactSales</span>
                      <span className="text-[10px] text-[#605e5c]">Fact</span>
                    </div>
                    <div className="font-sans text-[12px] text-[#323130]">
                      <div className="flex h-9 items-center justify-between px-3">
                        <span>SalesOrderNumber</span>
                        <span className="text-[10px] text-[#605e5c]">string</span>
                      </div>
                      <div className="flex h-9 items-center justify-between border-y border-[#edebe9] bg-[#f3f2f1] px-3 font-semibold">
                        <span>ProductKey (FK)</span>
                        <span className="text-[10px] font-normal text-[#605e5c]">int64</span>
                      </div>
                      <div className="flex h-9 items-center justify-between px-3">
                        <span>OrderDate</span>
                        <span className="text-[10px] text-[#605e5c]">datetime</span>
                      </div>
                    </div>
                  </div>

                  <div
                    role="img"
                    aria-label="Many-to-one relationship, single direction"
                    className="relative mt-[50px] flex w-[180px] items-center font-sans text-[#323130]"
                  >
                    <span
                      aria-label="FactSales cardinality many"
                      className="z-10 -mr-px grid h-[20px] w-[19px] place-items-center rounded-[2px] border border-[#8a8886] bg-white text-[12px]"
                    >*</span>
                    <span className="h-px flex-1 bg-[#605e5c]" />
                    <span className="absolute left-1/2 top-1/2 flex h-[22px] -translate-x-1/2 -translate-y-1/2 items-center gap-1 rounded-[2px] border border-[#8a8886] bg-white px-1.5 text-[9px] text-[#323130]">
                      <span aria-hidden="true" className="h-0 w-0 border-y-[4px] border-r-[6px] border-y-transparent border-r-[#605e5c]" />
                      <span>Single</span>
                    </span>
                    <span
                      aria-label="DimProduct cardinality one, invalid"
                      className="z-10 -ml-px grid h-[20px] w-[19px] place-items-center rounded-[2px] border border-[#d13438] bg-white text-[12px] text-[#a4262c]"
                    >1</span>
                  </div>

                  <div
                    role="group"
                    aria-label="DimProduct table, invalid one side"
                    className="z-10 w-[250px] overflow-hidden rounded-[2px] border border-[#c8c6c4] bg-white shadow-[0_2px_5px_rgba(0,0,0,0.14)]"
                  >
                    <div className="flex h-10 items-center justify-between border-b border-[#d2d0ce] bg-white px-3 font-sans text-[#201f1e]">
                      <span className="text-[13px] font-semibold">DimProduct</span>
                      <span className="text-[10px] font-semibold text-[#a4262c]">1-side invalid</span>
                    </div>
                    <div className="font-sans text-[12px] text-[#323130]">
                      <div className="flex h-9 items-center justify-between border-l-[3px] border-[#d13438] bg-[#fde7e9] px-3 font-semibold text-[#a4262c]">
                        <span>ProductKey (PK)</span>
                        <span className="text-[10px]">Duplicate</span>
                      </div>
                      <div className="flex h-9 items-center justify-between border-t border-[#edebe9] px-3">
                        <span>ProductName</span>
                        <span className="text-[10px] text-[#605e5c]">string</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

                                {!showRawSource && isCase3MaintenanceRisk && (
          <div className="border border-border rounded-xl bg-surface2/20 p-5 flex flex-col gap-5">
            <div className="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-border">
              <div className="flex items-center gap-2">
                <img src="data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2232%22%20height%3D%2232%22%20fill%3D%22currentColor%22%20role%3D%22img%22%20focusable%3D%22false%22%3E%3Cpath%20fill%3D%22url(%23iab4f30-a)%22%20d%3D%22M5%205.5A3.5%203.5%200%200%201%208.5%202h15A3.5%203.5%200%200%201%2027%205.5v21a3.5%203.5%200%200%201-3.5%203.5h-15A3.5%203.5%200%200%201%205%2026.5z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23iab4f30-b)%22%20fill-opacity%3D%220.2%22%20d%3D%22M5%205.5A3.5%203.5%200%200%201%208.5%202h15A3.5%203.5%200%200%201%2027%205.5v21a3.5%203.5%200%200%201-3.5%203.5h-15A3.5%203.5%200%200%201%205%2026.5z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23iab4f30-c)%22%20fill-rule%3D%22evenodd%22%20d%3D%22M23.5%203h-15A2.5%202.5%200%200%200%206%205.5v21A2.5%202.5%200%200%200%208.5%2029h15a2.5%202.5%200%200%200%202.5-2.5v-21A2.5%202.5%200%200%200%2023.5%203m-15-1A3.5%203.5%200%200%200%205%205.5v21A3.5%203.5%200%200%200%208.5%2030h15a3.5%203.5%200%200%200%203.5-3.5v-21A3.5%203.5%200%200%200%2023.5%202z%22%20clip-rule%3D%22evenodd%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23iab4f30-d)%22%20d%3D%22M13.99%2022.69a1.5%201.5%200%200%200-.154.31H11a2%202%200%200%201-2-2v-6.4a2%202%200%200%201%20.674-1.497l5-4.428a2%202%200%200%201%202.653%200l5%204.428A2%202%200%200%201%2023%2014.6v3.409L22.98%2018a1.5%201.5%200%200%200-.94-.01l-.12.05c-.37.15-.66.44-.81.81-.01.02-.05.07-.11.13-.06-.05-.11-.11-.11-.13a1.49%201.49%200%200%200-1.39-.93h-.14a1.5%201.5%200%200%200-1.256.94%201%201%200%200%201-.104.12c-.06-.05-.11-.11-.11-.13a1.49%201.49%200%200%200-1.39-.93h-.14c-.57.05-1.05.42-1.26.95-.04.08-.06.13-.06.13q-.013.012-.09.032l-.03.008a1.5%201.5%200%200%200-1.13%201.79%201.46%201.46%200%200%200%201.264%201.15l-.004.01c-.008.009-.038.017-.09.032l-.03.008c-.39.09-.73.32-.94.66%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23iab4f30-e)%22%20d%3D%22M23.75%2021h-.01a.502.502%200%200%200%20.1-.99c-.47-.11-.71-.31-.89-.78a.49.49%200%200%200-.46-.32c-.2%200-.38.12-.46.31-.15.38-.6.78-1.04.78s-.88-.41-1.03-.78c-.16-.38-.78-.38-.93%200s-.6.78-1.04.78-.88-.41-1.03-.78c-.08-.19-.26-.33-.47-.31-.2%200-.39.13-.46.32-.18.47-.41.67-.89.78-.27.06-.44.33-.38.6s.33.43.6.38c.5-.11.88-.32%201.17-.65.37.38.86.66%201.46.66s1.13-.29%201.51-.69c.37.39.91.69%201.49.69s1.1-.28%201.48-.66c.29.33.67.54%201.17.65.031.008.08.01.1.01h-.01z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23iab4f30-f)%22%20d%3D%22M23.75%2024h-.01a.502.502%200%200%200%20.1-.99c-.47-.11-.71-.31-.89-.78a.49.49%200%200%200-.46-.32c-.2%200-.38.12-.46.31-.15.38-.6.78-1.04.78s-.88-.41-1.03-.78c-.16-.38-.78-.38-.93%200s-.6.78-1.04.78-.88-.41-1.03-.78c-.08-.19-.26-.33-.47-.31-.2%200-.39.13-.46.32-.18.47-.41.67-.89.78-.27.06-.44.33-.38.6s.33.43.6.38c.5-.11.88-.32%201.17-.65.37.38.86.66%201.46.66s1.13-.29%201.51-.69c.37.39.91.69%201.49.69s1.1-.28%201.48-.66c.29.33.67.54%201.17.65.031.008.08.01.1.01h-.01z%22%3E%3C%2Fpath%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22iab4f30-a%22%20x1%3D%2211.111%22%20x2%3D%2215.576%22%20y1%3D%222%22%20y2%3D%2230.067%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23fff%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23EBEBEB%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22iab4f30-c%22%20x1%3D%2212.104%22%20x2%3D%2216.851%22%20y1%3D%222%22%20y2%3D%2229.972%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23BBB%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23888%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22iab4f30-d%22%20x1%3D%229%22%20x2%3D%2224.817%22%20y1%3D%228.172%22%20y2%3D%2223.393%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%233477EA%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%231D53A4%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22iab4f30-e%22%20x1%3D%229%22%20x2%3D%2224.817%22%20y1%3D%228.172%22%20y2%3D%2223.393%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%233477EA%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%231D53A4%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22iab4f30-f%22%20x1%3D%229%22%20x2%3D%2224.817%22%20y1%3D%228.172%22%20y2%3D%2223.393%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%233477EA%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%231D53A4%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3CradialGradient%20id%3D%22iab4f30-b%22%20cx%3D%220%22%20cy%3D%220%22%20r%3D%221%22%20gradientTransform%3D%22matrix(11.61113%2022.16669%20-17.08352%208.94852%2012.028%209.292)%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20offset%3D%220.177%22%20stop-color%3D%22%23fff%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23B8B8B8%22%3E%3C%2Fstop%3E%3C%2FradialGradient%3E%3C%2Fdefs%3E%3C%2Fsvg%3E" alt="Maintenance Risk" className="w-4 h-4 object-contain" />
                <span className="font-display text-xs font-bold text-tx">
                  Flat_Orders_Dump • Repeated Attribute Consistency Review
                </span>
              </div>
              <span className="font-mono text-[11px] font-semibold px-2 py-0.5 rounded bg-surface border border-border text-tx">
                Observed Diagnostic
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-surface border border-border rounded-xl p-4 flex flex-col gap-3 shadow-xs">
                <div className="flex items-center gap-2 pb-2 border-b border-border">
                  <img src="data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2232%22%20height%3D%2232%22%20fill%3D%22currentColor%22%20role%3D%22img%22%20focusable%3D%22false%22%3E%3Cpath%20fill%3D%22url(%23iab4f30-a)%22%20d%3D%22M5%205.5A3.5%203.5%200%200%201%208.5%202h15A3.5%203.5%200%200%201%2027%205.5v21a3.5%203.5%200%200%201-3.5%203.5h-15A3.5%203.5%200%200%201%205%2026.5z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23iab4f30-b)%22%20fill-opacity%3D%220.2%22%20d%3D%22M5%205.5A3.5%203.5%200%200%201%208.5%202h15A3.5%203.5%200%200%201%2027%205.5v21a3.5%203.5%200%200%201-3.5%203.5h-15A3.5%203.5%200%200%201%205%2026.5z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23iab4f30-c)%22%20fill-rule%3D%22evenodd%22%20d%3D%22M23.5%203h-15A2.5%202.5%200%200%200%206%205.5v21A2.5%202.5%200%200%200%208.5%2029h15a2.5%202.5%200%200%200%202.5-2.5v-21A2.5%202.5%200%200%200%2023.5%203m-15-1A3.5%203.5%200%200%200%205%205.5v21A3.5%203.5%200%200%200%208.5%2030h15a3.5%203.5%200%200%200%203.5-3.5v-21A3.5%203.5%200%200%200%2023.5%202z%22%20clip-rule%3D%22evenodd%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23iab4f30-d)%22%20d%3D%22M13.99%2022.69a1.5%201.5%200%200%200-.154.31H11a2%202%200%200%201-2-2v-6.4a2%202%200%200%201%20.674-1.497l5-4.428a2%202%200%200%201%202.653%200l5%204.428A2%202%200%200%201%2023%2014.6v3.409L22.98%2018a1.5%201.5%200%200%200-.94-.01l-.12.05c-.37.15-.66.44-.81.81-.01.02-.05.07-.11.13-.06-.05-.11-.11-.11-.13a1.49%201.49%200%200%200-1.39-.93h-.14a1.5%201.5%200%200%200-1.256.94%201%201%200%200%201-.104.12c-.06-.05-.11-.11-.11-.13a1.49%201.49%200%200%200-1.39-.93h-.14c-.57.05-1.05.42-1.26.95-.04.08-.06.13-.06.13q-.013.012-.09.032l-.03.008a1.5%201.5%200%200%200-1.13%201.79%201.46%201.46%200%200%200%201.264%201.15l-.004.01c-.008.009-.038.017-.09.032l-.03.008c-.39.09-.73.32-.94.66%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23iab4f30-e)%22%20d%3D%22M23.75%2021h-.01a.502.502%200%200%200%20.1-.99c-.47-.11-.71-.31-.89-.78a.49.49%200%200%200-.46-.32c-.2%200-.38.12-.46.31-.15.38-.6.78-1.04.78s-.88-.41-1.03-.78c-.16-.38-.78-.38-.93%200s-.6.78-1.04.78-.88-.41-1.03-.78c-.08-.19-.26-.33-.47-.31-.2%200-.39.13-.46.32-.18.47-.41.67-.89.78-.27.06-.44.33-.38.6s.33.43.6.38c.5-.11.88-.32%201.17-.65.37.38.86.66%201.46.66s1.13-.29%201.51-.69c.37.39.91.69%201.49.69s1.1-.28%201.48-.66c.29.33.67.54%201.17.65.031.008.08.01.1.01h-.01z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23iab4f30-f)%22%20d%3D%22M23.75%2024h-.01a.502.502%200%200%200%20.1-.99c-.47-.11-.71-.31-.89-.78a.49.49%200%200%200-.46-.32c-.2%200-.38.12-.46.31-.15.38-.6.78-1.04.78s-.88-.41-1.03-.78c-.16-.38-.78-.38-.93%200s-.6.78-1.04.78-.88-.41-1.03-.78c-.08-.19-.26-.33-.47-.31-.2%200-.39.13-.46.32-.18.47-.41.67-.89.78-.27.06-.44.33-.38.6s.33.43.6.38c.5-.11.88-.32%201.17-.65.37.38.86.66%201.46.66s1.13-.29%201.51-.69c.37.39.91.69%201.49.69s1.1-.28%201.48-.66c.29.33.67.54%201.17.65.031.008.08.01.1.01h-.01z%22%3E%3C%2Fpath%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22iab4f30-a%22%20x1%3D%2211.111%22%20x2%3D%2215.576%22%20y1%3D%222%22%20y2%3D%2230.067%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23fff%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23EBEBEB%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22iab4f30-c%22%20x1%3D%2212.104%22%20x2%3D%2216.851%22%20y1%3D%222%22%20y2%3D%2229.972%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23BBB%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23888%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22iab4f30-d%22%20x1%3D%229%22%20x2%3D%2224.817%22%20y1%3D%228.172%22%20y2%3D%2223.393%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%233477EA%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%231D53A4%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22iab4f30-e%22%20x1%3D%229%22%20x2%3D%2224.817%22%20y1%3D%228.172%22%20y2%3D%2223.393%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%233477EA%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%231D53A4%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22iab4f30-f%22%20x1%3D%229%22%20x2%3D%2224.817%22%20y1%3D%228.172%22%20y2%3D%2223.393%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%233477EA%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%231D53A4%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3CradialGradient%20id%3D%22iab4f30-b%22%20cx%3D%220%22%20cy%3D%220%22%20r%3D%221%22%20gradientTransform%3D%22matrix(11.61113%2022.16669%20-17.08352%208.94852%2012.028%209.292)%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20offset%3D%220.177%22%20stop-color%3D%22%23fff%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23B8B8B8%22%3E%3C%2Fstop%3E%3C%2FradialGradient%3E%3C%2Fdefs%3E%3C%2Fsvg%3E" alt="" className="w-4 h-4 object-contain" />
                  <span className="font-display text-xs font-bold text-tx">Customer Address Update</span>
                </div>
                <p className="text-tx leading-relaxed font-sans text-xs">
                  A single correction touches repeated <code>CustomerStreet</code>, <code>CustomerCity</code>, and <code>CustomerZip</code> values across many order rows.
                </p>
                <span className="font-mono text-[10px] text-muted bg-surface2 px-2 py-1 rounded border border-border text-center">
                  Multi-row update surface
                </span>
              </div>

              <div className="bg-surface border border-border rounded-xl p-4 flex flex-col gap-3 shadow-xs">
                <div className="flex items-center gap-2 pb-2 border-b border-border">
                  <img src="data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2232%22%20height%3D%2232%22%20fill%3D%22currentColor%22%20role%3D%22img%22%20focusable%3D%22false%22%3E%3Cpath%20fill%3D%22url(%23iab4f30-a)%22%20d%3D%22M5%205.5A3.5%203.5%200%200%201%208.5%202h15A3.5%203.5%200%200%201%2027%205.5v21a3.5%203.5%200%200%201-3.5%203.5h-15A3.5%203.5%200%200%201%205%2026.5z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23iab4f30-b)%22%20fill-opacity%3D%220.2%22%20d%3D%22M5%205.5A3.5%203.5%200%200%201%208.5%202h15A3.5%203.5%200%200%201%2027%205.5v21a3.5%203.5%200%200%201-3.5%203.5h-15A3.5%203.5%200%200%201%205%2026.5z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23iab4f30-c)%22%20fill-rule%3D%22evenodd%22%20d%3D%22M23.5%203h-15A2.5%202.5%200%200%200%206%205.5v21A2.5%202.5%200%200%200%208.5%2029h15a2.5%202.5%200%200%200%202.5-2.5v-21A2.5%202.5%200%200%200%2023.5%203m-15-1A3.5%203.5%200%200%200%205%205.5v21A3.5%203.5%200%200%200%208.5%2030h15a3.5%203.5%200%200%200%203.5-3.5v-21A3.5%203.5%200%200%200%2023.5%202z%22%20clip-rule%3D%22evenodd%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23iab4f30-d)%22%20d%3D%22M13.99%2022.69a1.5%201.5%200%200%200-.154.31H11a2%202%200%200%201-2-2v-6.4a2%202%200%200%201%20.674-1.497l5-4.428a2%202%200%200%201%202.653%200l5%204.428A2%202%200%200%201%2023%2014.6v3.409L22.98%2018a1.5%201.5%200%200%200-.94-.01l-.12.05c-.37.15-.66.44-.81.81-.01.02-.05.07-.11.13-.06-.05-.11-.11-.11-.13a1.49%201.49%200%200%200-1.39-.93h-.14a1.5%201.5%200%200%200-1.256.94%201%201%200%200%201-.104.12c-.06-.05-.11-.11-.11-.13a1.49%201.49%200%200%200-1.39-.93h-.14c-.57.05-1.05.42-1.26.95-.04.08-.06.13-.06.13q-.013.012-.09.032l-.03.008a1.5%201.5%200%200%200-1.13%201.79%201.46%201.46%200%200%200%201.264%201.15l-.004.01c-.008.009-.038.017-.09.032l-.03.008c-.39.09-.73.32-.94.66%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23iab4f30-e)%22%20d%3D%22M23.75%2021h-.01a.502.502%200%200%200%20.1-.99c-.47-.11-.71-.31-.89-.78a.49.49%200%200%200-.46-.32c-.2%200-.38.12-.46.31-.15.38-.6.78-1.04.78s-.88-.41-1.03-.78c-.16-.38-.78-.38-.93%200s-.6.78-1.04.78-.88-.41-1.03-.78c-.08-.19-.26-.33-.47-.31-.2%200-.39.13-.46.32-.18.47-.41.67-.89.78-.27.06-.44.33-.38.6s.33.43.6.38c.5-.11.88-.32%201.17-.65.37.38.86.66%201.46.66s1.13-.29%201.51-.69c.37.39.91.69%201.49.69s1.1-.28%201.48-.66c.29.33.67.54%201.17.65.031.008.08.01.1.01h-.01z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23iab4f30-f)%22%20d%3D%22M23.75%2024h-.01a.502.502%200%200%200%20.1-.99c-.47-.11-.71-.31-.89-.78a.49.49%200%200%200-.46-.32c-.2%200-.38.12-.46.31-.15.38-.6.78-1.04.78s-.88-.41-1.03-.78c-.16-.38-.78-.38-.93%200s-.6.78-1.04.78-.88-.41-1.03-.78c-.08-.19-.26-.33-.47-.31-.2%200-.39.13-.46.32-.18.47-.41.67-.89.78-.27.06-.44.33-.38.6s.33.43.6.38c.5-.11.88-.32%201.17-.65.37.38.86.66%201.46.66s1.13-.29%201.51-.69c.37.39.91.69%201.49.69s1.1-.28%201.48-.66c.29.33.67.54%201.17.65.031.008.08.01.1.01h-.01z%22%3E%3C%2Fpath%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22iab4f30-a%22%20x1%3D%2211.111%22%20x2%3D%2215.576%22%20y1%3D%222%22%20y2%3D%2230.067%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23fff%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23EBEBEB%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22iab4f30-c%22%20x1%3D%2212.104%22%20x2%3D%2216.851%22%20y1%3D%222%22%20y2%3D%2229.972%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23BBB%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23888%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22iab4f30-d%22%20x1%3D%229%22%20x2%3D%2224.817%22%20y1%3D%228.172%22%20y2%3D%2223.393%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%233477EA%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%231D53A4%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22iab4f30-e%22%20x1%3D%229%22%20x2%3D%2224.817%22%20y1%3D%228.172%22%20y2%3D%2223.393%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%233477EA%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%231D53A4%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22iab4f30-f%22%20x1%3D%229%22%20x2%3D%2224.817%22%20y1%3D%228.172%22%20y2%3D%2223.393%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%233477EA%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%231D53A4%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3CradialGradient%20id%3D%22iab4f30-b%22%20cx%3D%220%22%20cy%3D%220%22%20r%3D%221%22%20gradientTransform%3D%22matrix(11.61113%2022.16669%20-17.08352%208.94852%2012.028%209.292)%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20offset%3D%220.177%22%20stop-color%3D%22%23fff%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23B8B8B8%22%3E%3C%2Fstop%3E%3C%2FradialGradient%3E%3C%2Fdefs%3E%3C%2Fsvg%3E" alt="" className="w-4 h-4 object-contain" />
                  <span className="font-display text-xs font-bold text-tx">Product Reclassification</span>
                </div>
                <p className="text-tx leading-relaxed font-sans text-xs">
                  Repeated <code>ProductCategory</code> values can diverge between orders when a correction reaches only part of the table.
                </p>
                <span className="font-mono text-[10px] text-muted bg-surface2 px-2 py-1 rounded border border-border text-center">
                  Conflicting group labels
                </span>
              </div>

              <div className="bg-surface border border-border rounded-xl p-4 flex flex-col gap-3 shadow-xs">
                <div className="flex items-center gap-2 pb-2 border-b border-border">
                  <img src="data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20width%3D%22630px%22%20height%3D%22630px%22%20viewBox%3D%220%200%20630%20630%22%20version%3D%221.1%22%3E%0D%0A%20%20%20%20%3C!--%20Generator%3A%20Sketch%2053.2%20(72643)%20-%20https%3A%2F%2Fsketchapp.com%20--%3E%0D%0A%20%20%20%20%3Ctitle%3EPBI%20Logo%3C%2Ftitle%3E%0D%0A%20%20%20%20%3Cdesc%3ECreated%20with%20Sketch.%3C%2Fdesc%3E%0D%0A%20%20%20%20%3Cdefs%3E%0D%0A%20%20%20%20%20%20%20%20%3ClinearGradient%20x1%3D%2250%25%22%20y1%3D%220%25%22%20x2%3D%2250%25%22%20y2%3D%22100%25%22%20id%3D%22linearGradient-1%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cstop%20stop-color%3D%22%23EBBB14%22%20offset%3D%220%25%22%2F%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cstop%20stop-color%3D%22%23B25400%22%20offset%3D%22100%25%22%2F%3E%0D%0A%20%20%20%20%20%20%20%20%3C%2FlinearGradient%3E%0D%0A%20%20%20%20%20%20%20%20%3ClinearGradient%20x1%3D%2250%25%22%20y1%3D%220%25%22%20x2%3D%2250%25%22%20y2%3D%22100%25%22%20id%3D%22linearGradient-2%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cstop%20stop-color%3D%22%23F9E583%22%20offset%3D%220%25%22%2F%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cstop%20stop-color%3D%22%23DE9800%22%20offset%3D%22100%25%22%2F%3E%0D%0A%20%20%20%20%20%20%20%20%3C%2FlinearGradient%3E%0D%0A%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M346%2C604%20L346%2C630%20L320%2C630%20L153%2C630%20C138.640597%2C630%20127%2C618.359403%20127%2C604%20L127%2C183%20C127%2C168.640597%20138.640597%2C157%20153%2C157%20L320%2C157%20C334.359403%2C157%20346%2C168.640597%20346%2C183%20L346%2C604%20Z%22%20id%3D%22path-3%22%2F%3E%0D%0A%20%20%20%20%20%20%20%20%3Cfilter%20x%3D%22-9.1%25%22%20y%3D%22-6.3%25%22%20width%3D%22136.5%25%22%20height%3D%22116.9%25%22%20filterUnits%3D%22objectBoundingBox%22%20id%3D%22filter-4%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3CfeOffset%20dx%3D%2220%22%20dy%3D%2210%22%20in%3D%22SourceAlpha%22%20result%3D%22shadowOffsetOuter1%22%2F%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3CfeGaussianBlur%20stdDeviation%3D%2210%22%20in%3D%22shadowOffsetOuter1%22%20result%3D%22shadowBlurOuter1%22%2F%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3CfeColorMatrix%20values%3D%220%200%200%200%200%20%20%200%200%200%200%200%20%20%200%200%200%200%200%20%200%200%200%200.0530211976%200%22%20type%3D%22matrix%22%20in%3D%22shadowBlurOuter1%22%2F%3E%0D%0A%20%20%20%20%20%20%20%20%3C%2Ffilter%3E%0D%0A%20%20%20%20%20%20%20%20%3ClinearGradient%20x1%3D%2250%25%22%20y1%3D%220%25%22%20x2%3D%2250%25%22%20y2%3D%22100%25%22%20id%3D%22linearGradient-5%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cstop%20stop-color%3D%22%23F9E68B%22%20offset%3D%220%25%22%2F%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cstop%20stop-color%3D%22%23F3CD32%22%20offset%3D%22100%25%22%2F%3E%0D%0A%20%20%20%20%20%20%20%20%3C%2FlinearGradient%3E%0D%0A%20%20%20%20%3C%2Fdefs%3E%0D%0A%20%20%20%20%3Cg%20id%3D%22PBI-Logo%22%20stroke%3D%22none%22%20stroke-width%3D%221%22%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%0D%0A%20%20%20%20%20%20%20%20%3Cg%20id%3D%22Group%22%20transform%3D%22translate(77.500000%2C%200.000000)%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Crect%20id%3D%22Rectangle%22%20fill%3D%22url(%23linearGradient-1)%22%20x%3D%22256%22%20y%3D%220%22%20width%3D%22219%22%20height%3D%22630%22%20rx%3D%2226%22%2F%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cg%20id%3D%22Combined-Shape%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cuse%20fill%3D%22black%22%20fill-opacity%3D%221%22%20filter%3D%22url(%23filter-4)%22%20xlink%3Ahref%3D%22%23path-3%22%2F%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cuse%20fill%3D%22url(%23linearGradient-2)%22%20fill-rule%3D%22evenodd%22%20xlink%3Ahref%3D%22%23path-3%22%2F%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fg%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M219%2C604%20L219%2C630%20L193%2C630%20L26%2C630%20C11.6405965%2C630%201.75851975e-15%2C618.359403%200%2C604%20L0%2C341%20C-1.75851975e-15%2C326.640597%2011.6405965%2C315%2026%2C315%20L193%2C315%20C207.359403%2C315%20219%2C326.640597%20219%2C341%20L219%2C604%20Z%22%20id%3D%22Combined-Shape%22%20fill%3D%22url(%23linearGradient-5)%22%2F%3E%0D%0A%20%20%20%20%20%20%20%20%3C%2Fg%3E%0D%0A%20%20%20%20%3C%2Fg%3E%0D%0A%3C%2Fsvg%3E" alt="" className="w-4 h-4 object-contain" />
                  <span className="font-display text-xs font-bold text-tx">Reporting Consequence</span>
                </div>
                <p className="text-tx leading-relaxed font-sans text-xs">
                  Inconsistent repeated attributes can filter and group the same customer or product differently across reports.
                </p>
                <span className="font-mono text-[10px] text-muted bg-surface2 px-2 py-1 rounded border border-border text-center">
                  Unreliable entity semantics
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
              <div className="p-3 rounded-lg bg-surface border border-border">
                <span className="text-muted text-[10px] uppercase block">Table Grain</span>
                <span className="font-bold text-tx mt-0.5 block">Transactions + Entity Attributes</span>
              </div>
              <div className="p-3 rounded-lg bg-surface border border-border">
                <span className="text-muted text-[10px] uppercase block">Maintenance Scope</span>
                <span className="font-bold text-tx mt-0.5 block">Repeated Row Corrections</span>
              </div>
              <div className="p-3 rounded-lg bg-surface border border-border">
                <span className="text-muted text-[10px] uppercase block">Evidence Status</span>
                <span className="font-bold text-tx mt-0.5 block">Root Cause Observed</span>
              </div>
            </div>
          </div>
        )}

                                {!showRawSource && isCase4QueryMatrix && (
          <div className="border border-border rounded-xl bg-surface2/20 p-5 flex flex-col gap-5">
            <div className="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-border">
              <div className="flex items-center gap-2">
                <img src="data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2232%22%20height%3D%2232%22%20fill%3D%22currentColor%22%20role%3D%22img%22%20focusable%3D%22false%22%3E%3Cpath%20fill%3D%22url(%23ibc0df0-a)%22%20d%3D%22M3%206.5A3.5%203.5%200%200%201%206.5%203h19A3.5%203.5%200%200%201%2029%206.5v19a3.5%203.5%200%200%201-3.5%203.5h-19A3.5%203.5%200%200%201%203%2025.5z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23ibc0df0-b)%22%20fill-opacity%3D%220.2%22%20d%3D%22M3%206.5A3.5%203.5%200%200%201%206.5%203h19A3.5%203.5%200%200%201%2029%206.5v19a3.5%203.5%200%200%201-3.5%203.5h-19A3.5%203.5%200%200%201%203%2025.5z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23ibc0df0-c)%22%20fill-rule%3D%22evenodd%22%20d%3D%22M25.5%204h-19A2.5%202.5%200%200%200%204%206.5v19A2.5%202.5%200%200%200%206.5%2028h19a2.5%202.5%200%200%200%202.5-2.5v-19A2.5%202.5%200%200%200%2025.5%204m-19-1A3.5%203.5%200%200%200%203%206.5v19A3.5%203.5%200%200%200%206.5%2029h19a3.5%203.5%200%200%200%203.5-3.5v-19A3.5%203.5%200%200%200%2025.5%203z%22%20clip-rule%3D%22evenodd%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23ibc0df0-d)%22%20d%3D%22M16%2014c1.475%200%202.857-.238%203.907-.657A5%205%200%200%200%2021%2012.751V19.5c0%201.425-2.149%202.5-5%202.5s-5-1.075-5-2.5v-6.75c.322.24.698.435%201.093.593%201.05.42%202.432.657%203.907.657%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23ibc0df0-e)%22%20d%3D%22M11%2011c0%201.105%202.239%202%205%202s5-.895%205-2l-.001-.043C20.942%209.872%2018.726%209%2016%209c-2.071%200-3.848.504-4.607%201.222-.24.226-.378.475-.392.735z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22%23F5F5F5%22%20fill-rule%3D%22evenodd%22%20d%3D%22M21.518%2029.864a1.5%201.5%200%200%200%202.561%201.06l.624-.623a1.5%201.5%200%200%200%202.558.977l1.414-1.415c.134-.133.24-.29.314-.46l.45.45c.945.946%202.561.276%202.561-1.06V22.5a1.5%201.5%200%200%200-1.5-1.5h-6.293c-1.336%200-2.005%201.616-1.06%202.56l.332.333c-.17.074-.327.18-.46.313l-1.414%201.415a1.5%201.5%200%200%200%20.977%202.558l-.624.624a1.5%201.5%200%200%200-.44%201.06Z%22%20clip-rule%3D%22evenodd%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23ibc0df0-f)%22%20d%3D%22M31%2022.5a.5.5%200%200%200-.5-.5h-6.293a.5.5%200%200%200-.353.854l6.293%206.293a.5.5%200%200%200%20.853-.354z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23ibc0df0-g)%22%20d%3D%22M24.58%2025.267a.5.5%200%200%200-.854-.353l-1.415%201.414a.5.5%200%201%200%20.708.707l1.414-1.414a.5.5%200%200%200%20.146-.354Z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23ibc0df0-h)%22%20d%3D%22M26.347%2027.035a.5.5%200%200%200-.854-.353l-2.828%202.828a.5.5%200%201%200%20.707.707L26.2%2027.39a.5.5%200%200%200%20.147-.354Z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23ibc0df0-i)%22%20d%3D%22M27.968%2029.157a.5.5%200%200%200-.707-.708l-1.414%201.415a.5.5%200%200%200%20.707.707z%22%3E%3C%2Fpath%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22ibc0df0-a%22%20x1%3D%2210.222%22%20x2%3D%2213.511%22%20y1%3D%223%22%20y2%3D%2229.311%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23fff%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23EBEBEB%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22ibc0df0-c%22%20x1%3D%2211.396%22%20x2%3D%2214.897%22%20y1%3D%223%22%20y2%3D%2229.256%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23BBB%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23888%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22ibc0df0-d%22%20x1%3D%2211%22%20x2%3D%2223.565%22%20y1%3D%229%22%20y2%3D%2218.665%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23008EE6%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23006094%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22ibc0df0-e%22%20x1%3D%2211%22%20x2%3D%2223.565%22%20y1%3D%229%22%20y2%3D%2218.665%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23008EE6%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23006094%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22ibc0df0-f%22%20x1%3D%2222.165%22%20x2%3D%2230.881%22%20y1%3D%2222%22%20y2%3D%2230.834%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23008EE6%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23006094%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22ibc0df0-g%22%20x1%3D%2222.165%22%20x2%3D%2230.881%22%20y1%3D%2222%22%20y2%3D%2230.834%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23008EE6%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23006094%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22ibc0df0-h%22%20x1%3D%2222.165%22%20x2%3D%2230.881%22%20y1%3D%2222%22%20y2%3D%2230.834%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23008EE6%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23006094%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22ibc0df0-i%22%20x1%3D%2222.165%22%20x2%3D%2230.881%22%20y1%3D%2222%22%20y2%3D%2230.834%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23008EE6%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23006094%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3CradialGradient%20id%3D%22ibc0df0-b%22%20cx%3D%220%22%20cy%3D%220%22%20r%3D%221%22%20gradientTransform%3D%22matrix(13.7222%2020.58336%20-17.81255%2011.875%2011.306%209.771)%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20offset%3D%220.177%22%20stop-color%3D%22%23fff%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23B8B8B8%22%3E%3C%2Fstop%3E%3C%2FradialGradient%3E%3C%2Fdefs%3E%3C%2Fsvg%3E" alt="Fabric Engines" className="w-4 h-4 object-contain" />
                <span className="font-display text-xs font-bold text-tx">
                  Fabric Analytical Engines &amp; Query Language Responsibilities
                </span>
              </div>
              <span className="font-mono text-[11px] font-semibold px-2 py-0.5 rounded bg-surface border border-border text-tx">
                Architectural Matrix
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-surface border border-border rounded-xl p-4 flex flex-col justify-between gap-3 shadow-xs">
                <div className="flex flex-col gap-2.5">
                  <div className="flex items-center gap-2 pb-2 border-b border-border">
                    <img src="data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2232%22%20height%3D%2232%22%20fill%3D%22currentColor%22%20role%3D%22img%22%20focusable%3D%22false%22%3E%3Cpath%20fill%3D%22url(%23ibc0df0-a)%22%20d%3D%22M3%206.5A3.5%203.5%200%200%201%206.5%203h19A3.5%203.5%200%200%201%2029%206.5v19a3.5%203.5%200%200%201-3.5%203.5h-19A3.5%203.5%200%200%201%203%2025.5z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23ibc0df0-b)%22%20fill-opacity%3D%220.2%22%20d%3D%22M3%206.5A3.5%203.5%200%200%201%206.5%203h19A3.5%203.5%200%200%201%2029%206.5v19a3.5%203.5%200%200%201-3.5%203.5h-19A3.5%203.5%200%200%201%203%2025.5z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23ibc0df0-c)%22%20fill-rule%3D%22evenodd%22%20d%3D%22M25.5%204h-19A2.5%202.5%200%200%200%204%206.5v19A2.5%202.5%200%200%200%206.5%2028h19a2.5%202.5%200%200%200%202.5-2.5v-19A2.5%202.5%200%200%200%2025.5%204m-19-1A3.5%203.5%200%200%200%203%206.5v19A3.5%203.5%200%200%200%206.5%2029h19a3.5%203.5%200%200%200%203.5-3.5v-19A3.5%203.5%200%200%200%2025.5%203z%22%20clip-rule%3D%22evenodd%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23ibc0df0-d)%22%20d%3D%22M16%2014c1.475%200%202.857-.238%203.907-.657A5%205%200%200%200%2021%2012.751V19.5c0%201.425-2.149%202.5-5%202.5s-5-1.075-5-2.5v-6.75c.322.24.698.435%201.093.593%201.05.42%202.432.657%203.907.657%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23ibc0df0-e)%22%20d%3D%22M11%2011c0%201.105%202.239%202%205%202s5-.895%205-2l-.001-.043C20.942%209.872%2018.726%209%2016%209c-2.071%200-3.848.504-4.607%201.222-.24.226-.378.475-.392.735z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22%23F5F5F5%22%20fill-rule%3D%22evenodd%22%20d%3D%22M21.518%2029.864a1.5%201.5%200%200%200%202.561%201.06l.624-.623a1.5%201.5%200%200%200%202.558.977l1.414-1.415c.134-.133.24-.29.314-.46l.45.45c.945.946%202.561.276%202.561-1.06V22.5a1.5%201.5%200%200%200-1.5-1.5h-6.293c-1.336%200-2.005%201.616-1.06%202.56l.332.333c-.17.074-.327.18-.46.313l-1.414%201.415a1.5%201.5%200%200%200%20.977%202.558l-.624.624a1.5%201.5%200%200%200-.44%201.06Z%22%20clip-rule%3D%22evenodd%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23ibc0df0-f)%22%20d%3D%22M31%2022.5a.5.5%200%200%200-.5-.5h-6.293a.5.5%200%200%200-.353.854l6.293%206.293a.5.5%200%200%200%20.853-.354z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23ibc0df0-g)%22%20d%3D%22M24.58%2025.267a.5.5%200%200%200-.854-.353l-1.415%201.414a.5.5%200%201%200%20.708.707l1.414-1.414a.5.5%200%200%200%20.146-.354Z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23ibc0df0-h)%22%20d%3D%22M26.347%2027.035a.5.5%200%200%200-.854-.353l-2.828%202.828a.5.5%200%201%200%20.707.707L26.2%2027.39a.5.5%200%200%200%20.147-.354Z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23ibc0df0-i)%22%20d%3D%22M27.968%2029.157a.5.5%200%200%200-.707-.708l-1.414%201.415a.5.5%200%200%200%20.707.707z%22%3E%3C%2Fpath%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22ibc0df0-a%22%20x1%3D%2210.222%22%20x2%3D%2213.511%22%20y1%3D%223%22%20y2%3D%2229.311%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23fff%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23EBEBEB%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22ibc0df0-c%22%20x1%3D%2211.396%22%20x2%3D%2214.897%22%20y1%3D%223%22%20y2%3D%2229.256%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23BBB%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23888%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22ibc0df0-d%22%20x1%3D%2211%22%20x2%3D%2223.565%22%20y1%3D%229%22%20y2%3D%2218.665%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23008EE6%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23006094%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22ibc0df0-e%22%20x1%3D%2211%22%20x2%3D%2223.565%22%20y1%3D%229%22%20y2%3D%2218.665%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23008EE6%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23006094%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22ibc0df0-f%22%20x1%3D%2222.165%22%20x2%3D%2230.881%22%20y1%3D%2222%22%20y2%3D%2230.834%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23008EE6%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23006094%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22ibc0df0-g%22%20x1%3D%2222.165%22%20x2%3D%2230.881%22%20y1%3D%2222%22%20y2%3D%2230.834%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23008EE6%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23006094%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22ibc0df0-h%22%20x1%3D%2222.165%22%20x2%3D%2230.881%22%20y1%3D%2222%22%20y2%3D%2230.834%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23008EE6%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23006094%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22ibc0df0-i%22%20x1%3D%2222.165%22%20x2%3D%2230.881%22%20y1%3D%2222%22%20y2%3D%2230.834%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23008EE6%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23006094%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3CradialGradient%20id%3D%22ibc0df0-b%22%20cx%3D%220%22%20cy%3D%220%22%20r%3D%221%22%20gradientTransform%3D%22matrix(13.7222%2020.58336%20-17.81255%2011.875%2011.306%209.771)%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20offset%3D%220.177%22%20stop-color%3D%22%23fff%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23B8B8B8%22%3E%3C%2Fstop%3E%3C%2FradialGradient%3E%3C%2Fdefs%3E%3C%2Fsvg%3E" alt="KQL" className="w-4 h-4 object-contain" />
                    <div>
                      <span className="font-display text-xs font-bold text-tx block">Eventhouse / KQL Database</span>
                      <span className="font-mono text-[10px] text-muted">Target: Real-Time Intelligence</span>
                    </div>
                  </div>
                  <div className="font-mono text-xs flex flex-col gap-1 text-tx">
                    <div><strong>Native:</strong> KQL; read-only T-SQL queries are also supported</div>
                    <div><strong>Best For:</strong> High-velocity logs, telemetry, timeseries binning</div>
                    <div><strong>Key Operators:</strong> <code>where</code>, <code>summarize</code>, <code>bin()</code></div>
                  </div>
                </div>
                <span className="font-mono text-[10px] text-tx bg-surface2 px-2 py-0.5 rounded border border-border text-center font-bold">
                  Use KQL for Streaming Logs
                </span>
              </div>

                            <div className="bg-surface border border-border rounded-xl p-4 flex flex-col justify-between gap-3 shadow-xs">
                <div className="flex flex-col gap-2.5">
                  <div className="flex items-center gap-2 pb-2 border-b border-border">
                    <img src="data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2232%22%20height%3D%2232%22%20fill%3D%22currentColor%22%20role%3D%22img%22%20focusable%3D%22false%22%3E%3Cpath%20fill%3D%22url(%23i15919b-a)%22%20d%3D%22M5%205.5A3.5%203.5%200%200%201%208.5%202h15A3.5%203.5%200%200%201%2027%205.5v21a3.5%203.5%200%200%201-3.5%203.5h-15A3.5%203.5%200%200%201%205%2026.5z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23i15919b-b)%22%20fill-opacity%3D%220.2%22%20d%3D%22M5%205.5A3.5%203.5%200%200%201%208.5%202h15A3.5%203.5%200%200%201%2027%205.5v21a3.5%203.5%200%200%201-3.5%203.5h-15A3.5%203.5%200%200%201%205%2026.5z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23i15919b-c)%22%20fill-rule%3D%22evenodd%22%20d%3D%22M23.5%203h-15A2.5%202.5%200%200%200%206%205.5v21A2.5%202.5%200%200%200%208.5%2029h15a2.5%202.5%200%200%200%202.5-2.5v-21A2.5%202.5%200%200%200%2023.5%203m-15-1A3.5%203.5%200%200%200%205%205.5v21A3.5%203.5%200%200%200%208.5%2030h15a3.5%203.5%200%200%200%203.5-3.5v-21A3.5%203.5%200%200%200%2023.5%202z%22%20clip-rule%3D%22evenodd%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23i15919b-d)%22%20d%3D%22M23%2022a2%202%200%200%201-2%202H11a2%202%200%200%201-2-2v-6.4a2%202%200%200%201%20.674-1.497l5-4.428a2%202%200%200%201%202.653%200l5%204.428A2%202%200%200%201%2023%2015.6z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22%23B4CDF8%22%20d%3D%22M13%2016a1%201%200%201%201-2%200%201%201%200%200%201%202%200m4%200a1%201%200%201%201-2%200%201%201%200%200%201%202%200m3%201a1%201%200%201%200%200-2%201%201%200%200%200%200%202m-3%203a1%201%200%201%201-2%200%201%201%200%200%201%202%200m-5%201a1%201%200%201%200%200-2%201%201%200%200%200%200%202m9-1a1%201%200%201%201-2%200%201%201%200%200%201%202%200%22%3E%3C%2Fpath%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22i15919b-a%22%20x1%3D%2211.111%22%20x2%3D%2215.576%22%20y1%3D%222%22%20y2%3D%2230.067%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23fff%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23EBEBEB%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22i15919b-c%22%20x1%3D%2212.104%22%20x2%3D%2216.851%22%20y1%3D%222%22%20y2%3D%2229.972%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23BBB%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23888%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22i15919b-d%22%20x1%3D%229%22%20x2%3D%2223.804%22%20y1%3D%229.172%22%20y2%3D%2223.149%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%233477EA%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%231D53A4%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3CradialGradient%20id%3D%22i15919b-b%22%20cx%3D%220%22%20cy%3D%220%22%20r%3D%221%22%20gradientTransform%3D%22matrix(11.61113%2022.16669%20-17.08352%208.94852%2012.028%209.292)%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20offset%3D%220.177%22%20stop-color%3D%22%23fff%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23B8B8B8%22%3E%3C%2Fstop%3E%3C%2FradialGradient%3E%3C%2Fdefs%3E%3C%2Fsvg%3E" alt="Warehouse" className="w-4 h-4 object-contain" />
                    <div>
                      <span className="font-display text-xs font-bold text-tx block">Fabric Warehouse &amp; Lakehouse SQL Endpoint</span>
                      <span className="font-mono text-[10px] text-muted">Target: Relational Warehousing</span>
                    </div>
                  </div>
                  <div className="font-mono text-xs flex flex-col gap-1 text-tx">
                    <div><strong>Warehouse:</strong> Supported T-SQL, transactions, and stored procedures</div>
                    <div><strong>Lakehouse endpoint:</strong> Read-only table data with supported query objects</div>
                    <div><strong>Operators:</strong> <code>SELECT</code>, <code>MERGE</code> (Warehouse), <code>GROUP BY</code></div>
                  </div>
                </div>
                <span className="font-mono text-[10px] text-muted bg-surface2 px-2 py-0.5 rounded border border-border text-center">
                  Match T-SQL Features to the Fabric Item
                </span>
              </div>

                            <div className="bg-surface border border-border rounded-xl p-4 flex flex-col justify-between gap-3 shadow-xs">
                <div className="flex flex-col gap-2.5">
                  <div className="flex items-center gap-2 pb-2 border-b border-border">
                    <img src="data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2232%22%20height%3D%2232%22%20fill%3D%22currentColor%22%20role%3D%22img%22%20focusable%3D%22false%22%3E%3Cpath%20fill%3D%22url(%23ic35943-a)%22%20d%3D%22M3%206.5A3.5%203.5%200%200%201%206.5%203h19A3.5%203.5%200%200%201%2029%206.5v19a3.5%203.5%200%200%201-3.5%203.5h-19A3.5%203.5%200%200%201%203%2025.5z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23ic35943-b)%22%20fill-opacity%3D%220.2%22%20d%3D%22M3%206.5A3.5%203.5%200%200%201%206.5%203h19A3.5%203.5%200%200%201%2029%206.5v19a3.5%203.5%200%200%201-3.5%203.5h-19A3.5%203.5%200%200%201%203%2025.5z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23ic35943-c)%22%20fill-rule%3D%22evenodd%22%20d%3D%22M25.5%204h-19A2.5%202.5%200%200%200%204%206.5v19A2.5%202.5%200%200%200%206.5%2028h19a2.5%202.5%200%200%200%202.5-2.5v-19A2.5%202.5%200%200%200%2025.5%204m-19-1A3.5%203.5%200%200%200%203%206.5v19A3.5%203.5%200%200%200%206.5%2029h19a3.5%203.5%200%200%200%203.5-3.5v-19A3.5%203.5%200%200%200%2025.5%203z%22%20clip-rule%3D%22evenodd%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23ic35943-d)%22%20d%3D%22M9.75%2014.5a1.75%201.75%200%201%200%200-3.5%201.75%201.75%200%200%200%200%203.5%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23ic35943-e)%22%20d%3D%22M16%2014.5a1.75%201.75%200%201%200%200-3.5%201.75%201.75%200%200%200%200%203.5%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23ic35943-f)%22%20d%3D%22M11.5%2019.25a1.75%201.75%200%201%201-3.5%200%201.75%201.75%200%200%201%203.5%200%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23ic35943-g)%22%20d%3D%22M16%2021a1.75%201.75%200%201%200%200-3.5%201.75%201.75%200%200%200%200%203.5%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23ic35943-h)%22%20d%3D%22M24%2012.75a1.75%201.75%200%201%201-3.5%200%201.75%201.75%200%200%201%203.5%200%22%3E%3C%2Fpath%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22ic35943-a%22%20x1%3D%2210.222%22%20x2%3D%2213.511%22%20y1%3D%223%22%20y2%3D%2229.311%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23fff%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23EBEBEB%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22ic35943-c%22%20x1%3D%2211.396%22%20x2%3D%2214.897%22%20y1%3D%223%22%20y2%3D%2229.256%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23BBB%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23888%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22ic35943-d%22%20x1%3D%228%22%20x2%3D%2216.989%22%20y1%3D%2211%22%20y2%3D%2225.382%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%237751B8%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%235A409C%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22ic35943-e%22%20x1%3D%228%22%20x2%3D%2216.989%22%20y1%3D%2211%22%20y2%3D%2225.382%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%237751B8%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%235A409C%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22ic35943-f%22%20x1%3D%228%22%20x2%3D%2216.989%22%20y1%3D%2211%22%20y2%3D%2225.382%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%237751B8%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%235A409C%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22ic35943-g%22%20x1%3D%228%22%20x2%3D%2216.989%22%20y1%3D%2211%22%20y2%3D%2225.382%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%237751B8%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%235A409C%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22ic35943-h%22%20x1%3D%228%22%20x2%3D%2216.989%22%20y1%3D%2211%22%20y2%3D%2225.382%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%237751B8%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%235A409C%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3CradialGradient%20id%3D%22ic35943-b%22%20cx%3D%220%22%20cy%3D%220%22%20r%3D%221%22%20gradientTransform%3D%22matrix(13.7222%2020.58336%20-17.81255%2011.875%2011.306%209.771)%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20offset%3D%220.177%22%20stop-color%3D%22%23fff%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23B8B8B8%22%3E%3C%2Fstop%3E%3C%2FradialGradient%3E%3C%2Fdefs%3E%3C%2Fsvg%3E" alt="Model" className="w-4 h-4 object-contain" />
                    <div>
                      <span className="font-display text-xs font-bold text-tx block">Power BI Semantic Model</span>
                      <span className="font-mono text-[10px] text-muted">Target: Business Intelligence</span>
                    </div>
                  </div>
                  <div className="font-mono text-xs flex flex-col gap-1 text-tx">
                    <div><strong>Language:</strong> DAX (Data Analysis Expressions)</div>
                    <div><strong>Best For:</strong> Dynamic business measures, filter context transitions</div>
                    <div><strong>Key Operators:</strong> <code>CALCULATE()</code>, <code>SUM()</code>, <code>DIVIDE()</code></div>
                  </div>
                </div>
                <span className="font-mono text-[10px] text-muted bg-surface2 px-2 py-0.5 rounded border border-border text-center">
                  Use DAX for Semantic Calculations
                </span>
              </div>
            </div>
          </div>
        )}

                                {!showRawSource && isCase4DesiredOutput && (
          <div className="border border-border rounded-xl bg-surface2/20 p-5 flex flex-col gap-5">
            <div className="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-border">
              <div className="flex items-center gap-2">
                <img src="data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2232%22%20height%3D%2232%22%20fill%3D%22currentColor%22%20role%3D%22img%22%20focusable%3D%22false%22%3E%3Cpath%20fill%3D%22url(%23ibc0df0-a)%22%20d%3D%22M3%206.5A3.5%203.5%200%200%201%206.5%203h19A3.5%203.5%200%200%201%2029%206.5v19a3.5%203.5%200%200%201-3.5%203.5h-19A3.5%203.5%200%200%201%203%2025.5z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23ibc0df0-b)%22%20fill-opacity%3D%220.2%22%20d%3D%22M3%206.5A3.5%203.5%200%200%201%206.5%203h19A3.5%203.5%200%200%201%2029%206.5v19a3.5%203.5%200%200%201-3.5%203.5h-19A3.5%203.5%200%200%201%203%2025.5z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23ibc0df0-c)%22%20fill-rule%3D%22evenodd%22%20d%3D%22M25.5%204h-19A2.5%202.5%200%200%200%204%206.5v19A2.5%202.5%200%200%200%206.5%2028h19a2.5%202.5%200%200%200%202.5-2.5v-19A2.5%202.5%200%200%200%2025.5%204m-19-1A3.5%203.5%200%200%200%203%206.5v19A3.5%203.5%200%200%200%206.5%2029h19a3.5%203.5%200%200%200%203.5-3.5v-19A3.5%203.5%200%200%200%2025.5%203z%22%20clip-rule%3D%22evenodd%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23ibc0df0-d)%22%20d%3D%22M16%2014c1.475%200%202.857-.238%203.907-.657A5%205%200%200%200%2021%2012.751V19.5c0%201.425-2.149%202.5-5%202.5s-5-1.075-5-2.5v-6.75c.322.24.698.435%201.093.593%201.05.42%202.432.657%203.907.657%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23ibc0df0-e)%22%20d%3D%22M11%2011c0%201.105%202.239%202%205%202s5-.895%205-2l-.001-.043C20.942%209.872%2018.726%209%2016%209c-2.071%200-3.848.504-4.607%201.222-.24.226-.378.475-.392.735z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22%23F5F5F5%22%20fill-rule%3D%22evenodd%22%20d%3D%22M21.518%2029.864a1.5%201.5%200%200%200%202.561%201.06l.624-.623a1.5%201.5%200%200%200%202.558.977l1.414-1.415c.134-.133.24-.29.314-.46l.45.45c.945.946%202.561.276%202.561-1.06V22.5a1.5%201.5%200%200%200-1.5-1.5h-6.293c-1.336%200-2.005%201.616-1.06%202.56l.332.333c-.17.074-.327.18-.46.313l-1.414%201.415a1.5%201.5%200%200%200%20.977%202.558l-.624.624a1.5%201.5%200%200%200-.44%201.06Z%22%20clip-rule%3D%22evenodd%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23ibc0df0-f)%22%20d%3D%22M31%2022.5a.5.5%200%200%200-.5-.5h-6.293a.5.5%200%200%200-.353.854l6.293%206.293a.5.5%200%200%200%20.853-.354z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23ibc0df0-g)%22%20d%3D%22M24.58%2025.267a.5.5%200%200%200-.854-.353l-1.415%201.414a.5.5%200%201%200%20.708.707l1.414-1.414a.5.5%200%200%200%20.146-.354Z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23ibc0df0-h)%22%20d%3D%22M26.347%2027.035a.5.5%200%200%200-.854-.353l-2.828%202.828a.5.5%200%201%200%20.707.707L26.2%2027.39a.5.5%200%200%200%20.147-.354Z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23ibc0df0-i)%22%20d%3D%22M27.968%2029.157a.5.5%200%200%200-.707-.708l-1.414%201.415a.5.5%200%200%200%20.707.707z%22%3E%3C%2Fpath%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22ibc0df0-a%22%20x1%3D%2210.222%22%20x2%3D%2213.511%22%20y1%3D%223%22%20y2%3D%2229.311%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23fff%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23EBEBEB%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22ibc0df0-c%22%20x1%3D%2211.396%22%20x2%3D%2214.897%22%20y1%3D%223%22%20y2%3D%2229.256%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23BBB%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23888%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22ibc0df0-d%22%20x1%3D%2211%22%20x2%3D%2223.565%22%20y1%3D%229%22%20y2%3D%2218.665%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23008EE6%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23006094%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22ibc0df0-e%22%20x1%3D%2211%22%20x2%3D%2223.565%22%20y1%3D%229%22%20y2%3D%2218.665%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23008EE6%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23006094%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22ibc0df0-f%22%20x1%3D%2222.165%22%20x2%3D%2230.881%22%20y1%3D%2222%22%20y2%3D%2230.834%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23008EE6%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23006094%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22ibc0df0-g%22%20x1%3D%2222.165%22%20x2%3D%2230.881%22%20y1%3D%2222%22%20y2%3D%2230.834%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23008EE6%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23006094%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22ibc0df0-h%22%20x1%3D%2222.165%22%20x2%3D%2230.881%22%20y1%3D%2222%22%20y2%3D%2230.834%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23008EE6%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23006094%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22ibc0df0-i%22%20x1%3D%2222.165%22%20x2%3D%2230.881%22%20y1%3D%2222%22%20y2%3D%2230.834%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23008EE6%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23006094%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3CradialGradient%20id%3D%22ibc0df0-b%22%20cx%3D%220%22%20cy%3D%220%22%20r%3D%221%22%20gradientTransform%3D%22matrix(13.7222%2020.58336%20-17.81255%2011.875%2011.306%209.771)%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20offset%3D%220.177%22%20stop-color%3D%22%23fff%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23B8B8B8%22%3E%3C%2Fstop%3E%3C%2FradialGradient%3E%3C%2Fdefs%3E%3C%2Fsvg%3E" alt="KQL" className="w-4 h-4 object-contain" />
                <span className="font-display text-xs font-bold text-tx">
                  Operational Telemetry Requirement • Native KQL Queryset &amp; Execution
                </span>
              </div>
              <span className="font-mono text-[11px] font-semibold px-2 py-0.5 rounded bg-surface border border-border text-tx">
                Target Output Specification
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="bg-surface border border-border rounded-xl p-4 flex flex-col justify-between gap-3 shadow-xs">
                <div className="flex flex-col gap-2">
                  <span className="font-mono text-[10px] text-muted uppercase font-bold">Target KQL Query:</span>
                  <div className="p-3 rounded bg-surface2/60 border border-border font-mono text-xs text-tx leading-relaxed">
                    <span className="text-tx font-bold">ServerHeartbeat</span><br />
                    | <span className="text-accent font-semibold">where</span> Timestamp &gt; ago(1h) <span className="text-accent font-semibold">and</span> CpuUtilization &gt; 90<br />
                    | <span className="text-accent font-semibold">summarize</span> FailureCount = <span className="text-accent font-semibold">count()</span> <span className="text-accent font-semibold">by</span> <span className="text-accent font-semibold">bin</span>(Timestamp, 5m), Hostname<br />
                    | <span className="text-accent font-semibold">order by</span> FailureCount <span className="text-accent font-semibold">desc</span>
                  </div>
                </div>
                <span className="font-mono text-[10px] text-tx bg-surface2 px-2 py-0.5 rounded border border-border text-center font-bold">
                  ✓ Native Eventhouse Timeseries Syntax
                </span>
              </div>

                            <div className="bg-surface border border-border rounded-xl p-4 flex flex-col justify-between gap-3 shadow-xs">
                <div className="flex flex-col gap-2">
                  <span className="font-mono text-[10px] text-muted uppercase font-bold">Executed 5-Minute Bucket Output:</span>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left font-mono text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-border text-muted bg-surface2/40">
                          <th className="p-2">Timestamp (bin)</th>
                          <th className="p-2">Hostname</th>
                          <th className="p-2">FailureCount</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        <tr>
                          <td className="p-2">2026-08-18 18:45:00</td>
                          <td className="p-2 font-bold">prod-app-01</td>
                          <td className="p-2 text-tx font-bold">42</td>
                        </tr>
                        <tr>
                          <td className="p-2">2026-08-18 18:50:00</td>
                          <td className="p-2 font-bold">prod-db-02</td>
                          <td className="p-2 text-tx font-bold">29</td>
                        </tr>
                        <tr>
                          <td className="p-2">2026-08-18 18:55:00</td>
                          <td className="p-2 font-bold">prod-app-03</td>
                          <td className="p-2 text-tx font-bold">18</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <span className="font-mono text-[10px] text-tx bg-surface2 px-2 py-0.5 rounded border border-border text-center">
                  Output: 5-minute binned spikes returned by Eventhouse
                </span>
              </div>
            </div>
          </div>
        )}

                                {!showRawSource && isCase6Comparison && <Case6WorkloadComparison />}

                                {!showRawSource && isCase6DecisionLog && <Case6DecisionRecord />}

                                {!showRawSource && isCase7SecurityMatrix && (
          <div className="border border-border rounded-xl bg-surface2/20 p-5 flex flex-col gap-5">
            <div className="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-border">
              <div className="flex items-center gap-2">
                <img src="data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20viewBox%3D%220%200%20385.84%20401.32%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22a%22%20x1%3D%22564.08%22%20y1%3D%22144.16%22%20x2%3D%22399.95%22%20y2%3D%22428.44%22%20gradientTransform%3D%22matrix(1%2C%200%2C%200%2C%20-1%2C%200%2C%20770)%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20offset%3D%220.37%22%20stop-color%3D%22%23114a8b%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%230c59a4%22%2F%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22b%22%20x1%3D%22402.18%22%20y1%3D%22195.84%22%20x2%3D%22262.61%22%20y2%3D%22437.59%22%20gradientTransform%3D%22matrix(1%2C%200%2C%200%2C%20-1%2C%200%2C%20770)%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%230669bc%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%230078d4%22%2F%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22c%22%20x1%3D%22528.83%22%20y1%3D%22360.36%22%20x2%3D%22390.83%22%20y2%3D%22599.36%22%20gradientTransform%3D%22matrix(1%2C%200%2C%200%2C%20-1%2C%200%2C%20770)%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%230078d4%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%231493df%22%2F%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22d%22%20x1%3D%22353.62%22%20y1%3D%22380.7%22%20x2%3D%22215.62%22%20y2%3D%22619.71%22%20gradientTransform%3D%22matrix(1%2C%200%2C%200%2C%20-1%2C%200%2C%20770)%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%2328afea%22%2F%3E%3Cstop%20offset%3D%220.74%22%20stop-color%3D%22%233ccbf4%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Ctitle%3EMicrosoft%20Defender%20logo%20-%20Brandlogos.net%3C%2Ftitle%3E%3Cpath%20d%3D%22M384%2C584.66a13.55%2C13.55%2C0%2C0%2C0%2C6.72-1.76C490.33%2C525.46%2C556.76%2C461%2C573%2C376.28q.42-2.19.79-4.38L370.69%2C358.45Z%22%20transform%3D%22translate(-191.08%20-183.34)%22%20style%3D%22fill%3Aurl(%23a)%22%2F%3E%3Cpath%20d%3D%22M377.27%2C582.9a13.54%2C13.54%2C0%2C0%2C0%2C6.72%2C1.76V358.44L194.23%2C371.89q.38%2C2.2.79%2C4.38C211.24%2C461%2C277.66%2C525.45%2C377.27%2C582.89Z%22%20transform%3D%22translate(-191.08%20-183.34)%22%20style%3D%22fill%3Aurl(%23b)%22%2F%3E%3Cpath%20d%3D%22M576.92%2C249a13.1%2C13.1%2C0%2C0%2C0-12.74-13.15c-60.25-1.24-81.56-11.65-111.27-31.7A117.71%2C117.71%2C0%2C0%2C0%2C384%2C183.36l-20%2C188.4H573.79a213%2C213%2C0%2C0%2C0%2C3.12-36Z%22%20transform%3D%22translate(-191.08%20-183.34)%22%20style%3D%22fill%3Aurl(%23c)%22%2F%3E%3Cpath%20d%3D%22M384%2C183.36a117.71%2C117.71%2C0%2C0%2C0-68.9%2C20.79c-29.72%2C20.06-51%2C30.47-111.27%2C31.7A13.1%2C13.1%2C0%2C0%2C0%2C191.08%2C249v86.8a213%2C213%2C0%2C0%2C0%2C3.12%2C36H384Z%22%20transform%3D%22translate(-191.08%20-183.34)%22%20style%3D%22fill%3Aurl(%23d)%22%2F%3E%3C%2Fsvg%3E" alt="Security Boundary" className="w-4 h-4 object-contain" />
                <span className="font-display text-xs font-bold text-tx">
                  Fabric Security Boundary Studio • RLS vs OLS Architecture
                </span>
              </div>
              <span className="font-mono text-[11px] font-semibold px-2 py-0.5 rounded bg-surface border border-border text-tx">
                Tabular Model Security &amp; Column Privacy Evaluation
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="bg-surface border border-border rounded-xl p-4 flex flex-col justify-between gap-4 shadow-xs">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between pb-2 border-b border-border">
                    <span className="font-display text-xs font-bold text-tx">Row-Level Security (RLS)</span>
                    <span className="font-mono text-[10px] font-medium px-2 py-0.5 rounded bg-surface2 text-muted border border-border">
                      Row-Filtering Only
                    </span>
                  </div>

                  <div className="p-3 rounded-lg bg-surface2/60 border border-border font-mono text-xs flex flex-col gap-1.5">
                    <span className="text-[10px] text-muted uppercase font-bold">Target Boundary:</span>
                    <span className="text-tx font-bold">Table Rows / Records Only</span>
                    <span className="text-muted text-[11px]">Filters which records a DAX query can access</span>
                  </div>

                  <div className="p-3 rounded-lg bg-surface2/60 border border-border font-mono text-xs flex flex-col gap-1.5">
                    <span className="text-[10px] text-muted uppercase font-bold">Schema / Metadata Discovery:</span>
                    <span className="text-tx font-bold">COLUMNS REMAIN VISIBLE</span>
                    <span className="text-muted text-[11px]">Column names (e.g. BaseSalary) remain visible in Power BI field lists and report builders.</span>
                  </div>

                  <div className="p-3 rounded-lg bg-surface2/60 border border-border font-mono text-xs flex flex-col gap-1.5">
                    <span className="text-[10px] text-muted uppercase font-bold">Query Execution Result:</span>
                    <span className="text-tx font-bold">Returns Filtered Row Context</span>
                    <span className="text-muted text-[11px]">Queries succeed and can aggregate salary totals across permitted EU rows.</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-surface2 text-muted border border-border font-mono text-xs text-center">
                  Discovery Protection: NO (Column Exists)
                </div>
              </div>

                            <div className="bg-surface border-2 border-border rounded-xl p-4 flex flex-col justify-between gap-4 shadow-sm">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between pb-2 border-b border-border">
                    <span className="font-display text-xs font-bold text-tx">Object-Level Security (OLS)</span>
                    <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-surface2 text-tx border border-border">
                      ✓ Optimal Fix
                    </span>
                  </div>

                  <div className="p-3 rounded-lg bg-surface2/60 border border-border font-mono text-xs flex flex-col gap-1.5">
                    <span className="text-[10px] text-muted uppercase font-bold">Target Boundary:</span>
                    <span className="text-tx font-bold">Columns &amp; Entire Tables</span>
                    <span className="text-muted text-[11px]">Secures specific metadata objects directly</span>
                  </div>

                  <div className="p-3 rounded-lg bg-surface2/60 border border-border font-mono text-xs flex flex-col gap-1.5">
                    <span className="text-[10px] text-muted uppercase font-bold">Schema / Metadata Discovery:</span>
                    <span className="text-tx font-bold">SECURED OBJECT HIDDEN FROM ROLE</span>
                    <span className="text-muted text-[11px]">Members of the OLS role cannot discover or query the secured column.</span>
                  </div>

                  <div className="p-3 rounded-lg bg-surface2/60 border border-border font-mono text-xs flex flex-col gap-1.5">
                    <span className="text-[10px] text-muted uppercase font-bold">Query Execution Result:</span>
                    <span className="text-tx font-bold">Semantic Resolution Error</span>
                    <span className="text-muted text-[11px]">Throws error: "Object 'BaseSalary' does not exist in the model."</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-surface2 text-tx border border-border font-mono text-xs text-center font-bold">
                  Applies to Viewer users assigned to the role
                </div>
              </div>
            </div>
          </div>
        )}

                                {!showRawSource && isCase8ALMPipeline && (
          <div className="border border-border rounded-xl bg-surface2/20 p-5 flex flex-col gap-5">
            <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-border">
              <div className="flex items-center gap-2">
                <img src="data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2232%22%20height%3D%2232%22%20fill%3D%22currentColor%22%20role%3D%22img%22%20focusable%3D%22false%22%3E%3Cpath%20fill%3D%22url(%23idca273-a)%22%20d%3D%22M3%206.5A3.5%203.5%200%200%201%206.5%203h19A3.5%203.5%200%200%201%2029%206.5v19a3.5%203.5%200%200%201-3.5%203.5h-19A3.5%203.5%200%200%201%203%2025.5z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23idca273-b)%22%20fill-opacity%3D%220.2%22%20d%3D%22M3%206.5A3.5%203.5%200%200%201%206.5%203h19A3.5%203.5%200%200%201%2029%206.5v19a3.5%203.5%200%200%201-3.5%203.5h-19A3.5%203.5%200%200%201%203%2025.5z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23idca273-c)%22%20fill-rule%3D%22evenodd%22%20d%3D%22M25.5%204h-19A2.5%202.5%200%200%200%204%206.5v19A2.5%202.5%200%200%200%206.5%2028h19a2.5%202.5%200%200%200%202.5-2.5v-19A2.5%202.5%200%200%200%2025.5%204m-19-1A3.5%203.5%200%200%200%203%206.5v19A3.5%203.5%200%200%200%206.5%2029h19a3.5%203.5%200%200%200%203.5-3.5v-19A3.5%203.5%200%200%200%2025.5%203z%22%20clip-rule%3D%22evenodd%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23idca273-d)%22%20d%3D%22M15%2011.5a2.5%202.5%200%200%201-2%202.45V16h4.5a1.5%201.5%200%200%200%201.5-1.5v-.55a2.5%202.5%200%201%201%201%200v.55a2.5%202.5%200%200%201-2.5%202.5H13v1.05a2.5%202.5%200%201%201-2.294.709v-.056h.056A2.5%202.5%200%200%201%2012%2018.05v-4.1a2.5%202.5%200%200%201-1.294-4.191v-.023h.022A2.5%202.5%200%200%201%2015%2011.5%22%3E%3C%2Fpath%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22idca273-a%22%20x1%3D%2210.222%22%20x2%3D%2213.511%22%20y1%3D%223%22%20y2%3D%2229.311%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23fff%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23EBEBEB%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22idca273-c%22%20x1%3D%2211.396%22%20x2%3D%2214.897%22%20y1%3D%223%22%20y2%3D%2229.256%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23BBB%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23888%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22idca273-d%22%20x1%3D%2210%22%20x2%3D%2223.835%22%20y1%3D%229%22%20y2%3D%2220.859%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%234BA446%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%233F7D35%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3CradialGradient%20id%3D%22idca273-b%22%20cx%3D%220%22%20cy%3D%220%22%20r%3D%221%22%20gradientTransform%3D%22matrix(13.7222%2020.58336%20-17.81255%2011.875%2011.306%209.771)%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20offset%3D%220.177%22%20stop-color%3D%22%23fff%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23B8B8B8%22%3E%3C%2Fstop%3E%3C%2FradialGradient%3E%3C%2Fdefs%3E%3C%2Fsvg%3E" alt="Fabric Deployment Pipeline" className="w-5 h-5 object-contain" />
                <span className="font-display text-sm font-bold text-tx">
                  Fabric Deployment Pipelines &amp; Git ALM Lifecycle Studio
                </span>
              </div>
              <span className="font-mono text-xs px-2.5 py-0.5 rounded bg-surface border border-border text-tx font-semibold">
                3-Stage Isolated Lifecycle Configured
              </span>
            </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-border border border-border rounded-xl bg-surface overflow-hidden shadow-sm">
                            <div className="p-5 flex flex-col justify-between gap-5 bg-surface">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between pb-3 border-b border-border">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-mono uppercase text-muted tracking-wider font-bold">Stage 1</span>
                      <span className="font-display text-sm font-bold text-tx">Development</span>
                    </div>
                    <span className="font-mono text-[10px] font-semibold px-2 py-0.5 rounded bg-surface2 text-tx border border-border">
                      WS-VanBerlo-Dev
                    </span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-surface2/60 border border-border flex items-center justify-between font-mono text-xs">
                    <div className="flex items-center gap-2">
                      <img src="data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2048%2048%22%3E%3Cdefs%3E%3CclipPath%20id%3D%22a%22%3E%3Cpath%20d%3D%22M0%20.113h91.887V92H0Zm0%200%22%2F%3E%3C%2FclipPath%3E%3C%2Fdefs%3E%3Cg%20stroke-width%3D%222.552%22%20clip-path%3D%22url(%23a)%22%20transform%3D%22translate(0%20-.059)scale(.52238)%22%3E%3Cpath%20fill%3D%22%23f03c2e%22%20d%3D%22M90.156%2041.965%2050.036%201.848a5.92%205.92%200%200%200-8.372%200l-8.328%208.332%2010.566%2010.566a7.03%207.03%200%200%201%207.23%201.684%207.03%207.03%200%200%201%201.669%207.277l10.187%2010.184a7.03%207.03%200%200%201%207.278%201.672%207.04%207.04%200%200%201%200%209.957%207.05%207.05%200%200%201-9.965%200%207.04%207.04%200%200%201-1.528-7.66l-9.5-9.497V59.36a7.04%207.04%200%200%201%201.86%2011.29%207.04%207.04%200%200%201-9.957%200%207.04%207.04%200%200%201%200-9.958%207.1%207.1%200%200%201%202.304-1.539V33.926a7.05%207.05%200%200%201-3.82-9.234l-10.418-10.42L1.73%2041.777a5.925%205.925%200%200%200%200%208.371L41.852%2090.27a5.925%205.925%200%200%200%208.37%200l39.934-39.934a5.925%205.925%200%200%200%200-8.371%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E" alt="Git Branch" className="w-3.5 h-3.5 object-contain" />
                      <span className="text-tx font-medium truncate max-w-[140px]">feature/sales-model</span>
                    </div>
                    <span className="text-[10px] font-bold text-muted bg-surface px-1.5 py-0.2 rounded border border-border">Synced</span>
                  </div>

                  <div className="flex flex-col gap-1.5 font-mono text-xs">
                    <span className="text-[10px] uppercase text-muted font-bold tracking-wider">Workspace Items:</span>

                    <div className="p-2.5 rounded-lg bg-surface2/60 border border-border flex items-center justify-between">
                      <div className="flex items-center gap-2 min-w-0">
                        <img src="data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2232%22%20height%3D%2232%22%20fill%3D%22currentColor%22%20role%3D%22img%22%20focusable%3D%22false%22%3E%3Cpath%20fill%3D%22url(%23ic35943-a)%22%20d%3D%22M3%206.5A3.5%203.5%200%200%201%206.5%203h19A3.5%203.5%200%200%201%2029%206.5v19a3.5%203.5%200%200%201-3.5%203.5h-19A3.5%203.5%200%200%201%203%2025.5z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23ic35943-b)%22%20fill-opacity%3D%220.2%22%20d%3D%22M3%206.5A3.5%203.5%200%200%201%206.5%203h19A3.5%203.5%200%200%201%2029%206.5v19a3.5%203.5%200%200%201-3.5%203.5h-19A3.5%203.5%200%200%201%203%2025.5z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23ic35943-c)%22%20fill-rule%3D%22evenodd%22%20d%3D%22M25.5%204h-19A2.5%202.5%200%200%200%204%206.5v19A2.5%202.5%200%200%200%206.5%2028h19a2.5%202.5%200%200%200%202.5-2.5v-19A2.5%202.5%200%200%200%2025.5%204m-19-1A3.5%203.5%200%200%200%203%206.5v19A3.5%203.5%200%200%200%206.5%2029h19a3.5%203.5%200%200%200%203.5-3.5v-19A3.5%203.5%200%200%200%2025.5%203z%22%20clip-rule%3D%22evenodd%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23ic35943-d)%22%20d%3D%22M9.75%2014.5a1.75%201.75%200%201%200%200-3.5%201.75%201.75%200%200%200%200%203.5%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23ic35943-e)%22%20d%3D%22M16%2014.5a1.75%201.75%200%201%200%200-3.5%201.75%201.75%200%200%200%200%203.5%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23ic35943-f)%22%20d%3D%22M11.5%2019.25a1.75%201.75%200%201%201-3.5%200%201.75%201.75%200%200%201%203.5%200%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23ic35943-g)%22%20d%3D%22M16%2021a1.75%201.75%200%201%200%200-3.5%201.75%201.75%200%200%200%200%203.5%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23ic35943-h)%22%20d%3D%22M24%2012.75a1.75%201.75%200%201%201-3.5%200%201.75%201.75%200%200%201%203.5%200%22%3E%3C%2Fpath%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22ic35943-a%22%20x1%3D%2210.222%22%20x2%3D%2213.511%22%20y1%3D%223%22%20y2%3D%2229.311%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23fff%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23EBEBEB%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22ic35943-c%22%20x1%3D%2211.396%22%20x2%3D%2214.897%22%20y1%3D%223%22%20y2%3D%2229.256%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23BBB%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23888%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22ic35943-d%22%20x1%3D%228%22%20x2%3D%2216.989%22%20y1%3D%2211%22%20y2%3D%2225.382%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%237751B8%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%235A409C%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22ic35943-e%22%20x1%3D%228%22%20x2%3D%2216.989%22%20y1%3D%2211%22%20y2%3D%2225.382%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%237751B8%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%235A409C%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22ic35943-f%22%20x1%3D%228%22%20x2%3D%2216.989%22%20y1%3D%2211%22%20y2%3D%2225.382%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%237751B8%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%235A409C%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22ic35943-g%22%20x1%3D%228%22%20x2%3D%2216.989%22%20y1%3D%2211%22%20y2%3D%2225.382%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%237751B8%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%235A409C%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22ic35943-h%22%20x1%3D%228%22%20x2%3D%2216.989%22%20y1%3D%2211%22%20y2%3D%2225.382%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%237751B8%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%235A409C%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3CradialGradient%20id%3D%22ic35943-b%22%20cx%3D%220%22%20cy%3D%220%22%20r%3D%221%22%20gradientTransform%3D%22matrix(13.7222%2020.58336%20-17.81255%2011.875%2011.306%209.771)%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20offset%3D%220.177%22%20stop-color%3D%22%23fff%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23B8B8B8%22%3E%3C%2Fstop%3E%3C%2FradialGradient%3E%3C%2Fdefs%3E%3C%2Fsvg%3E" alt="" className="w-4 h-4 object-contain flex-shrink-0" />
                        <div className="flex flex-col min-w-0">
                          <span className="font-bold text-tx truncate">Sales_Executive_Model</span>
                          <span className="text-[10px] text-muted">Semantic Model • v1.4</span>
                        </div>
                      </div>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-surface2 text-tx border border-border font-bold">Modified</span>
                    </div>

                    <div className="p-2.5 rounded-lg bg-surface2/30 border border-border/50 flex items-center justify-between opacity-80">
                      <div className="flex items-center gap-2 min-w-0">
                        <img src="data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2232%22%20height%3D%2232%22%20fill%3D%22currentColor%22%20role%3D%22img%22%20focusable%3D%22false%22%3E%3Cpath%20fill%3D%22url(%23ia91417-a)%22%20d%3D%22M3%206.5A3.5%203.5%200%200%201%206.5%203h19A3.5%203.5%200%200%201%2029%206.5v19a3.5%203.5%200%200%201-3.5%203.5h-19A3.5%203.5%200%200%201%203%2025.5z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23ia91417-b)%22%20fill-opacity%3D%220.2%22%20d%3D%22M3%206.5A3.5%203.5%200%200%201%206.5%203h19A3.5%203.5%200%200%201%2029%206.5v19a3.5%203.5%200%200%201-3.5%203.5h-19A3.5%203.5%200%200%201%203%2025.5z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23ia91417-c)%22%20fill-rule%3D%22evenodd%22%20d%3D%22M25.5%204h-19A2.5%202.5%200%200%200%204%206.5v19A2.5%202.5%200%200%200%206.5%2028h19a2.5%202.5%200%200%200%202.5-2.5v-19A2.5%202.5%200%200%200%2025.5%204m-19-1A3.5%203.5%200%200%200%203%206.5v19A3.5%203.5%200%200%200%206.5%2029h19a3.5%203.5%200%200%200%203.5-3.5v-19A3.5%203.5%200%200%200%2025.5%203z%22%20clip-rule%3D%22evenodd%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23ia91417-d)%22%20d%3D%22M15.906%2024a8%208%200%201%200%200-16%208%208%200%200%200%200%2016%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22%23F5BCD8%22%20d%3D%22M20.085%2011.82a.5.5%200%200%200-.635-.012l-.177.14a252%20252%200%200%200-3.423%202.772c-.218.183-.41.347-.56.48a4%204%200%200%200-.344.327%201.5%201.5%200%201%200%202.282%201.948c.072-.084.17-.232.27-.39.107-.17.239-.385.385-.628.292-.488.646-1.096.989-1.69a295%20295%200%200%200%201.213-2.126l.111-.196a.5.5%200%200%200-.11-.626Z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22%23F5BCD8%22%20d%3D%22M12.464%2012.464a5%205%200%200%201%205.354-1.123.5.5%200%200%200%20.363-.932%206%206%200%200%200-6.424%209.834.5.5%200%201%200%20.707-.708%205%205%200%200%201%200-7.07Z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22%23F5F5F5%22%20fill-rule%3D%22evenodd%22%20d%3D%22M21.518%2029.864a1.5%201.5%200%200%200%202.561%201.06l.624-.623a1.5%201.5%200%200%200%202.558.977l1.414-1.415c.134-.133.24-.29.314-.46l.45.45c.945.946%202.561.276%202.561-1.06V22.5a1.5%201.5%200%200%200-1.5-1.5h-6.293c-1.336%200-2.005%201.616-1.06%202.56l.332.333c-.17.074-.327.18-.46.313l-1.414%201.415a1.5%201.5%200%200%200%20.977%202.558l-.624.624a1.5%201.5%200%200%200-.44%201.06Z%22%20clip-rule%3D%22evenodd%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23ia91417-e)%22%20d%3D%22M31%2022.5a.5.5%200%200%200-.5-.5h-6.293a.5.5%200%200%200-.353.854l6.293%206.293a.5.5%200%200%200%20.853-.354z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23ia91417-f)%22%20d%3D%22M24.58%2025.267a.5.5%200%200%200-.854-.353l-1.415%201.414a.5.5%200%201%200%20.708.707l1.414-1.414a.5.5%200%200%200%20.146-.354Z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23ia91417-g)%22%20d%3D%22M26.347%2027.035a.5.5%200%200%200-.854-.353l-2.828%202.828a.5.5%200%201%200%20.707.707L26.2%2027.39a.5.5%200%200%200%20.147-.354Z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23ia91417-h)%22%20d%3D%22M27.968%2029.157a.5.5%200%200%200-.707-.708l-1.414%201.415a.5.5%200%200%200%20.707.707z%22%3E%3C%2Fpath%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22ia91417-a%22%20x1%3D%2210.222%22%20x2%3D%2213.511%22%20y1%3D%223%22%20y2%3D%2229.311%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23fff%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23EBEBEB%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22ia91417-c%22%20x1%3D%2211.396%22%20x2%3D%2214.897%22%20y1%3D%223%22%20y2%3D%2229.256%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23BBB%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23888%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22ia91417-d%22%20x1%3D%227.906%22%20x2%3D%2223.906%22%20y1%3D%228%22%20y2%3D%2224%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23E03F8F%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23BD1E7B%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22ia91417-e%22%20x1%3D%2222.165%22%20x2%3D%2230.881%22%20y1%3D%2222%22%20y2%3D%2230.834%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23E03F8F%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23BD1E7B%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22ia91417-f%22%20x1%3D%2222.165%22%20x2%3D%2230.881%22%20y1%3D%2222%22%20y2%3D%2230.834%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23E03F8F%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23BD1E7B%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22ia91417-g%22%20x1%3D%2222.165%22%20x2%3D%2230.881%22%20y1%3D%2222%22%20y2%3D%2230.834%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23E03F8F%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23BD1E7B%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22ia91417-h%22%20x1%3D%2222.165%22%20x2%3D%2230.881%22%20y1%3D%2222%22%20y2%3D%2230.834%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23E03F8F%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23BD1E7B%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3CradialGradient%20id%3D%22ia91417-b%22%20cx%3D%220%22%20cy%3D%220%22%20r%3D%221%22%20gradientTransform%3D%22matrix(13.7222%2020.58336%20-17.81255%2011.875%2011.306%209.771)%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20offset%3D%220.177%22%20stop-color%3D%22%23fff%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23B8B8B8%22%3E%3C%2Fstop%3E%3C%2FradialGradient%3E%3C%2Fdefs%3E%3C%2Fsvg%3E" alt="" className="w-4 h-4 object-contain flex-shrink-0" />
                        <div className="flex flex-col min-w-0">
                          <span className="text-tx truncate">Executive_Scorecard</span>
                          <span className="text-[10px] text-muted">Report • v1.2</span>
                        </div>
                      </div>
                      <span className="text-[10px] text-muted">Same</span>
                    </div>

                    <div className="p-2.5 rounded-lg bg-surface2/30 border border-border/50 flex items-center justify-between opacity-80">
                      <div className="flex items-center gap-2 min-w-0">
                        <img src="data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2232%22%20height%3D%2232%22%20fill%3D%22currentColor%22%20role%3D%22img%22%20focusable%3D%22false%22%3E%3Cpath%20fill%3D%22url(%23iab4f30-a)%22%20d%3D%22M5%205.5A3.5%203.5%200%200%201%208.5%202h15A3.5%203.5%200%200%201%2027%205.5v21a3.5%203.5%200%200%201-3.5%203.5h-15A3.5%203.5%200%200%201%205%2026.5z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23iab4f30-b)%22%20fill-opacity%3D%220.2%22%20d%3D%22M5%205.5A3.5%203.5%200%200%201%208.5%202h15A3.5%203.5%200%200%201%2027%205.5v21a3.5%203.5%200%200%201-3.5%203.5h-15A3.5%203.5%200%200%201%205%2026.5z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23iab4f30-c)%22%20fill-rule%3D%22evenodd%22%20d%3D%22M23.5%203h-15A2.5%202.5%200%200%200%206%205.5v21A2.5%202.5%200%200%200%208.5%2029h15a2.5%202.5%200%200%200%202.5-2.5v-21A2.5%202.5%200%200%200%2023.5%203m-15-1A3.5%203.5%200%200%200%205%205.5v21A3.5%203.5%200%200%200%208.5%2030h15a3.5%203.5%200%200%200%203.5-3.5v-21A3.5%203.5%200%200%200%2023.5%202z%22%20clip-rule%3D%22evenodd%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23iab4f30-d)%22%20d%3D%22M13.99%2022.69a1.5%201.5%200%200%200-.154.31H11a2%202%200%200%201-2-2v-6.4a2%202%200%200%201%20.674-1.497l5-4.428a2%202%200%200%201%202.653%200l5%204.428A2%202%200%200%201%2023%2014.6v3.409L22.98%2018a1.5%201.5%200%200%200-.94-.01l-.12.05c-.37.15-.66.44-.81.81-.01.02-.05.07-.11.13-.06-.05-.11-.11-.11-.13a1.49%201.49%200%200%200-1.39-.93h-.14a1.5%201.5%200%200%200-1.256.94%201%201%200%200%201-.104.12c-.06-.05-.11-.11-.11-.13a1.49%201.49%200%200%200-1.39-.93h-.14c-.57.05-1.05.42-1.26.95-.04.08-.06.13-.06.13q-.013.012-.09.032l-.03.008a1.5%201.5%200%200%200-1.13%201.79%201.46%201.46%200%200%200%201.264%201.15l-.004.01c-.008.009-.038.017-.09.032l-.03.008c-.39.09-.73.32-.94.66%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23iab4f30-e)%22%20d%3D%22M23.75%2021h-.01a.502.502%200%200%200%20.1-.99c-.47-.11-.71-.31-.89-.78a.49.49%200%200%200-.46-.32c-.2%200-.38.12-.46.31-.15.38-.6.78-1.04.78s-.88-.41-1.03-.78c-.16-.38-.78-.38-.93%200s-.6.78-1.04.78-.88-.41-1.03-.78c-.08-.19-.26-.33-.47-.31-.2%200-.39.13-.46.32-.18.47-.41.67-.89.78-.27.06-.44.33-.38.6s.33.43.6.38c.5-.11.88-.32%201.17-.65.37.38.86.66%201.46.66s1.13-.29%201.51-.69c.37.39.91.69%201.49.69s1.1-.28%201.48-.66c.29.33.67.54%201.17.65.031.008.08.01.1.01h-.01z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23iab4f30-f)%22%20d%3D%22M23.75%2024h-.01a.502.502%200%200%200%20.1-.99c-.47-.11-.71-.31-.89-.78a.49.49%200%200%200-.46-.32c-.2%200-.38.12-.46.31-.15.38-.6.78-1.04.78s-.88-.41-1.03-.78c-.16-.38-.78-.38-.93%200s-.6.78-1.04.78-.88-.41-1.03-.78c-.08-.19-.26-.33-.47-.31-.2%200-.39.13-.46.32-.18.47-.41.67-.89.78-.27.06-.44.33-.38.6s.33.43.6.38c.5-.11.88-.32%201.17-.65.37.38.86.66%201.46.66s1.13-.29%201.51-.69c.37.39.91.69%201.49.69s1.1-.28%201.48-.66c.29.33.67.54%201.17.65.031.008.08.01.1.01h-.01z%22%3E%3C%2Fpath%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22iab4f30-a%22%20x1%3D%2211.111%22%20x2%3D%2215.576%22%20y1%3D%222%22%20y2%3D%2230.067%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23fff%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23EBEBEB%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22iab4f30-c%22%20x1%3D%2212.104%22%20x2%3D%2216.851%22%20y1%3D%222%22%20y2%3D%2229.972%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23BBB%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23888%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22iab4f30-d%22%20x1%3D%229%22%20x2%3D%2224.817%22%20y1%3D%228.172%22%20y2%3D%2223.393%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%233477EA%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%231D53A4%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22iab4f30-e%22%20x1%3D%229%22%20x2%3D%2224.817%22%20y1%3D%228.172%22%20y2%3D%2223.393%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%233477EA%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%231D53A4%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22iab4f30-f%22%20x1%3D%229%22%20x2%3D%2224.817%22%20y1%3D%228.172%22%20y2%3D%2223.393%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%233477EA%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%231D53A4%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3CradialGradient%20id%3D%22iab4f30-b%22%20cx%3D%220%22%20cy%3D%220%22%20r%3D%221%22%20gradientTransform%3D%22matrix(11.61113%2022.16669%20-17.08352%208.94852%2012.028%209.292)%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20offset%3D%220.177%22%20stop-color%3D%22%23fff%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23B8B8B8%22%3E%3C%2Fstop%3E%3C%2FradialGradient%3E%3C%2Fdefs%3E%3C%2Fsvg%3E" alt="" className="w-4 h-4 object-contain flex-shrink-0" />
                        <div className="flex flex-col min-w-0">
                          <span className="text-tx truncate">Gold_Enterprise</span>
                          <span className="text-[10px] text-muted">Lakehouse • v2.0</span>
                        </div>
                      </div>
                      <span className="text-[10px] text-muted">Same</span>
                    </div>
                  </div>
                </div>

                <div className="p-2 rounded bg-surface2 border border-border font-mono text-[11px] flex items-center justify-between">
                  <span className="text-muted">Connection</span>
                  <span className="font-bold text-tx">Server=DevDB</span>
                </div>
              </div>

                            <div className="p-5 flex flex-col justify-between gap-5 bg-surface">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between pb-3 border-b border-border">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-mono uppercase text-muted tracking-wider font-bold">Stage 2</span>
                      <span className="font-display text-sm font-bold text-tx">Test / QA</span>
                    </div>
                    <span className="font-mono text-[10px] font-semibold px-2 py-0.5 rounded bg-surface2 text-tx border border-border">
                      WS-VanBerlo-Test
                    </span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-surface2/60 border border-border flex items-center justify-between font-mono text-xs">
                    <span className="text-muted">Deployment Rules:</span>
                    <span className="text-tx font-bold">Server=TestDB</span>
                  </div>

                  <div className="flex flex-col gap-1.5 font-mono text-xs">
                    <span className="text-[10px] uppercase text-muted font-bold tracking-wider">Workspace Items:</span>

                    <div className="p-2.5 rounded-lg bg-surface2/60 border border-border flex items-center justify-between">
                      <div className="flex items-center gap-2 min-w-0">
                        <img src="data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2232%22%20height%3D%2232%22%20fill%3D%22currentColor%22%20role%3D%22img%22%20focusable%3D%22false%22%3E%3Cpath%20fill%3D%22url(%23ic35943-a)%22%20d%3D%22M3%206.5A3.5%203.5%200%200%201%206.5%203h19A3.5%203.5%200%200%201%2029%206.5v19a3.5%203.5%200%200%201-3.5%203.5h-19A3.5%203.5%200%200%201%203%2025.5z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23ic35943-b)%22%20fill-opacity%3D%220.2%22%20d%3D%22M3%206.5A3.5%203.5%200%200%201%206.5%203h19A3.5%203.5%200%200%201%2029%206.5v19a3.5%203.5%200%200%201-3.5%203.5h-19A3.5%203.5%200%200%201%203%2025.5z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23ic35943-c)%22%20fill-rule%3D%22evenodd%22%20d%3D%22M25.5%204h-19A2.5%202.5%200%200%200%204%206.5v19A2.5%202.5%200%200%200%206.5%2028h19a2.5%202.5%200%200%200%202.5-2.5v-19A2.5%202.5%200%200%200%2025.5%204m-19-1A3.5%203.5%200%200%200%203%206.5v19A3.5%203.5%200%200%200%206.5%2029h19a3.5%203.5%200%200%200%203.5-3.5v-19A3.5%203.5%200%200%200%2025.5%203z%22%20clip-rule%3D%22evenodd%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23ic35943-d)%22%20d%3D%22M9.75%2014.5a1.75%201.75%200%201%200%200-3.5%201.75%201.75%200%200%200%200%203.5%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23ic35943-e)%22%20d%3D%22M16%2014.5a1.75%201.75%200%201%200%200-3.5%201.75%201.75%200%200%200%200%203.5%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23ic35943-f)%22%20d%3D%22M11.5%2019.25a1.75%201.75%200%201%201-3.5%200%201.75%201.75%200%200%201%203.5%200%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23ic35943-g)%22%20d%3D%22M16%2021a1.75%201.75%200%201%200%200-3.5%201.75%201.75%200%200%200%200%203.5%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23ic35943-h)%22%20d%3D%22M24%2012.75a1.75%201.75%200%201%201-3.5%200%201.75%201.75%200%200%201%203.5%200%22%3E%3C%2Fpath%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22ic35943-a%22%20x1%3D%2210.222%22%20x2%3D%2213.511%22%20y1%3D%223%22%20y2%3D%2229.311%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23fff%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23EBEBEB%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22ic35943-c%22%20x1%3D%2211.396%22%20x2%3D%2214.897%22%20y1%3D%223%22%20y2%3D%2229.256%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23BBB%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23888%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22ic35943-d%22%20x1%3D%228%22%20x2%3D%2216.989%22%20y1%3D%2211%22%20y2%3D%2225.382%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%237751B8%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%235A409C%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22ic35943-e%22%20x1%3D%228%22%20x2%3D%2216.989%22%20y1%3D%2211%22%20y2%3D%2225.382%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%237751B8%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%235A409C%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22ic35943-f%22%20x1%3D%228%22%20x2%3D%2216.989%22%20y1%3D%2211%22%20y2%3D%2225.382%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%237751B8%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%235A409C%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22ic35943-g%22%20x1%3D%228%22%20x2%3D%2216.989%22%20y1%3D%2211%22%20y2%3D%2225.382%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%237751B8%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%235A409C%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22ic35943-h%22%20x1%3D%228%22%20x2%3D%2216.989%22%20y1%3D%2211%22%20y2%3D%2225.382%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%237751B8%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%235A409C%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3CradialGradient%20id%3D%22ic35943-b%22%20cx%3D%220%22%20cy%3D%220%22%20r%3D%221%22%20gradientTransform%3D%22matrix(13.7222%2020.58336%20-17.81255%2011.875%2011.306%209.771)%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20offset%3D%220.177%22%20stop-color%3D%22%23fff%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23B8B8B8%22%3E%3C%2Fstop%3E%3C%2FradialGradient%3E%3C%2Fdefs%3E%3C%2Fsvg%3E" alt="" className="w-4 h-4 object-contain flex-shrink-0" />
                        <div className="flex flex-col min-w-0">
                          <span className="font-bold text-tx truncate">Sales_Executive_Model</span>
                          <span className="text-[10px] text-muted">Semantic Model • v1.3</span>
                        </div>
                      </div>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-surface2 text-muted border border-border">Target</span>
                    </div>

                    <div className="p-2.5 rounded-lg bg-surface2/30 border border-border/50 flex items-center justify-between opacity-80">
                      <div className="flex items-center gap-2 min-w-0">
                        <img src="data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2232%22%20height%3D%2232%22%20fill%3D%22currentColor%22%20role%3D%22img%22%20focusable%3D%22false%22%3E%3Cpath%20fill%3D%22url(%23ia91417-a)%22%20d%3D%22M3%206.5A3.5%203.5%200%200%201%206.5%203h19A3.5%203.5%200%200%201%2029%206.5v19a3.5%203.5%200%200%201-3.5%203.5h-19A3.5%203.5%200%200%201%203%2025.5z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23ia91417-b)%22%20fill-opacity%3D%220.2%22%20d%3D%22M3%206.5A3.5%203.5%200%200%201%206.5%203h19A3.5%203.5%200%200%201%2029%206.5v19a3.5%203.5%200%200%201-3.5%203.5h-19A3.5%203.5%200%200%201%203%2025.5z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23ia91417-c)%22%20fill-rule%3D%22evenodd%22%20d%3D%22M25.5%204h-19A2.5%202.5%200%200%200%204%206.5v19A2.5%202.5%200%200%200%206.5%2028h19a2.5%202.5%200%200%200%202.5-2.5v-19A2.5%202.5%200%200%200%2025.5%204m-19-1A3.5%203.5%200%200%200%203%206.5v19A3.5%203.5%200%200%200%206.5%2029h19a3.5%203.5%200%200%200%203.5-3.5v-19A3.5%203.5%200%200%200%2025.5%203z%22%20clip-rule%3D%22evenodd%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23ia91417-d)%22%20d%3D%22M15.906%2024a8%208%200%201%200%200-16%208%208%200%200%200%200%2016%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22%23F5BCD8%22%20d%3D%22M20.085%2011.82a.5.5%200%200%200-.635-.012l-.177.14a252%20252%200%200%200-3.423%202.772c-.218.183-.41.347-.56.48a4%204%200%200%200-.344.327%201.5%201.5%200%201%200%202.282%201.948c.072-.084.17-.232.27-.39.107-.17.239-.385.385-.628.292-.488.646-1.096.989-1.69a295%20295%200%200%200%201.213-2.126l.111-.196a.5.5%200%200%200-.11-.626Z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22%23F5BCD8%22%20d%3D%22M12.464%2012.464a5%205%200%200%201%205.354-1.123.5.5%200%200%200%20.363-.932%206%206%200%200%200-6.424%209.834.5.5%200%201%200%20.707-.708%205%205%200%200%201%200-7.07Z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22%23F5F5F5%22%20fill-rule%3D%22evenodd%22%20d%3D%22M21.518%2029.864a1.5%201.5%200%200%200%202.561%201.06l.624-.623a1.5%201.5%200%200%200%202.558.977l1.414-1.415c.134-.133.24-.29.314-.46l.45.45c.945.946%202.561.276%202.561-1.06V22.5a1.5%201.5%200%200%200-1.5-1.5h-6.293c-1.336%200-2.005%201.616-1.06%202.56l.332.333c-.17.074-.327.18-.46.313l-1.414%201.415a1.5%201.5%200%200%200%20.977%202.558l-.624.624a1.5%201.5%200%200%200-.44%201.06Z%22%20clip-rule%3D%22evenodd%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23ia91417-e)%22%20d%3D%22M31%2022.5a.5.5%200%200%200-.5-.5h-6.293a.5.5%200%200%200-.353.854l6.293%206.293a.5.5%200%200%200%20.853-.354z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23ia91417-f)%22%20d%3D%22M24.58%2025.267a.5.5%200%200%200-.854-.353l-1.415%201.414a.5.5%200%201%200%20.708.707l1.414-1.414a.5.5%200%200%200%20.146-.354Z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23ia91417-g)%22%20d%3D%22M26.347%2027.035a.5.5%200%200%200-.854-.353l-2.828%202.828a.5.5%200%201%200%20.707.707L26.2%2027.39a.5.5%200%200%200%20.147-.354Z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23ia91417-h)%22%20d%3D%22M27.968%2029.157a.5.5%200%200%200-.707-.708l-1.414%201.415a.5.5%200%200%200%20.707.707z%22%3E%3C%2Fpath%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22ia91417-a%22%20x1%3D%2210.222%22%20x2%3D%2213.511%22%20y1%3D%223%22%20y2%3D%2229.311%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23fff%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23EBEBEB%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22ia91417-c%22%20x1%3D%2211.396%22%20x2%3D%2214.897%22%20y1%3D%223%22%20y2%3D%2229.256%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23BBB%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23888%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22ia91417-d%22%20x1%3D%227.906%22%20x2%3D%2223.906%22%20y1%3D%228%22%20y2%3D%2224%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23E03F8F%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23BD1E7B%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22ia91417-e%22%20x1%3D%2222.165%22%20x2%3D%2230.881%22%20y1%3D%2222%22%20y2%3D%2230.834%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23E03F8F%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23BD1E7B%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22ia91417-f%22%20x1%3D%2222.165%22%20x2%3D%2230.881%22%20y1%3D%2222%22%20y2%3D%2230.834%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23E03F8F%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23BD1E7B%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22ia91417-g%22%20x1%3D%2222.165%22%20x2%3D%2230.881%22%20y1%3D%2222%22%20y2%3D%2230.834%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23E03F8F%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23BD1E7B%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22ia91417-h%22%20x1%3D%2222.165%22%20x2%3D%2230.881%22%20y1%3D%2222%22%20y2%3D%2230.834%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23E03F8F%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23BD1E7B%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3CradialGradient%20id%3D%22ia91417-b%22%20cx%3D%220%22%20cy%3D%220%22%20r%3D%221%22%20gradientTransform%3D%22matrix(13.7222%2020.58336%20-17.81255%2011.875%2011.306%209.771)%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20offset%3D%220.177%22%20stop-color%3D%22%23fff%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23B8B8B8%22%3E%3C%2Fstop%3E%3C%2FradialGradient%3E%3C%2Fdefs%3E%3C%2Fsvg%3E" alt="" className="w-4 h-4 object-contain flex-shrink-0" />
                        <div className="flex flex-col min-w-0">
                          <span className="text-tx truncate">Executive_Scorecard</span>
                          <span className="text-[10px] text-muted">Report • v1.2</span>
                        </div>
                      </div>
                      <span className="text-[10px] text-muted">Same</span>
                    </div>

                    <div className="p-2.5 rounded-lg bg-surface2/30 border border-border/50 flex items-center justify-between opacity-80">
                      <div className="flex items-center gap-2 min-w-0">
                        <img src="data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2232%22%20height%3D%2232%22%20fill%3D%22currentColor%22%20role%3D%22img%22%20focusable%3D%22false%22%3E%3Cpath%20fill%3D%22url(%23iab4f30-a)%22%20d%3D%22M5%205.5A3.5%203.5%200%200%201%208.5%202h15A3.5%203.5%200%200%201%2027%205.5v21a3.5%203.5%200%200%201-3.5%203.5h-15A3.5%203.5%200%200%201%205%2026.5z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23iab4f30-b)%22%20fill-opacity%3D%220.2%22%20d%3D%22M5%205.5A3.5%203.5%200%200%201%208.5%202h15A3.5%203.5%200%200%201%2027%205.5v21a3.5%203.5%200%200%201-3.5%203.5h-15A3.5%203.5%200%200%201%205%2026.5z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23iab4f30-c)%22%20fill-rule%3D%22evenodd%22%20d%3D%22M23.5%203h-15A2.5%202.5%200%200%200%206%205.5v21A2.5%202.5%200%200%200%208.5%2029h15a2.5%202.5%200%200%200%202.5-2.5v-21A2.5%202.5%200%200%200%2023.5%203m-15-1A3.5%203.5%200%200%200%205%205.5v21A3.5%203.5%200%200%200%208.5%2030h15a3.5%203.5%200%200%200%203.5-3.5v-21A3.5%203.5%200%200%200%2023.5%202z%22%20clip-rule%3D%22evenodd%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23iab4f30-d)%22%20d%3D%22M13.99%2022.69a1.5%201.5%200%200%200-.154.31H11a2%202%200%200%201-2-2v-6.4a2%202%200%200%201%20.674-1.497l5-4.428a2%202%200%200%201%202.653%200l5%204.428A2%202%200%200%201%2023%2014.6v3.409L22.98%2018a1.5%201.5%200%200%200-.94-.01l-.12.05c-.37.15-.66.44-.81.81-.01.02-.05.07-.11.13-.06-.05-.11-.11-.11-.13a1.49%201.49%200%200%200-1.39-.93h-.14a1.5%201.5%200%200%200-1.256.94%201%201%200%200%201-.104.12c-.06-.05-.11-.11-.11-.13a1.49%201.49%200%200%200-1.39-.93h-.14c-.57.05-1.05.42-1.26.95-.04.08-.06.13-.06.13q-.013.012-.09.032l-.03.008a1.5%201.5%200%200%200-1.13%201.79%201.46%201.46%200%200%200%201.264%201.15l-.004.01c-.008.009-.038.017-.09.032l-.03.008c-.39.09-.73.32-.94.66%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23iab4f30-e)%22%20d%3D%22M23.75%2021h-.01a.502.502%200%200%200%20.1-.99c-.47-.11-.71-.31-.89-.78a.49.49%200%200%200-.46-.32c-.2%200-.38.12-.46.31-.15.38-.6.78-1.04.78s-.88-.41-1.03-.78c-.16-.38-.78-.38-.93%200s-.6.78-1.04.78-.88-.41-1.03-.78c-.08-.19-.26-.33-.47-.31-.2%200-.39.13-.46.32-.18.47-.41.67-.89.78-.27.06-.44.33-.38.6s.33.43.6.38c.5-.11.88-.32%201.17-.65.37.38.86.66%201.46.66s1.13-.29%201.51-.69c.37.39.91.69%201.49.69s1.1-.28%201.48-.66c.29.33.67.54%201.17.65.031.008.08.01.1.01h-.01z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23iab4f30-f)%22%20d%3D%22M23.75%2024h-.01a.502.502%200%200%200%20.1-.99c-.47-.11-.71-.31-.89-.78a.49.49%200%200%200-.46-.32c-.2%200-.38.12-.46.31-.15.38-.6.78-1.04.78s-.88-.41-1.03-.78c-.16-.38-.78-.38-.93%200s-.6.78-1.04.78-.88-.41-1.03-.78c-.08-.19-.26-.33-.47-.31-.2%200-.39.13-.46.32-.18.47-.41.67-.89.78-.27.06-.44.33-.38.6s.33.43.6.38c.5-.11.88-.32%201.17-.65.37.38.86.66%201.46.66s1.13-.29%201.51-.69c.37.39.91.69%201.49.69s1.1-.28%201.48-.66c.29.33.67.54%201.17.65.031.008.08.01.1.01h-.01z%22%3E%3C%2Fpath%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22iab4f30-a%22%20x1%3D%2211.111%22%20x2%3D%2215.576%22%20y1%3D%222%22%20y2%3D%2230.067%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23fff%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23EBEBEB%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22iab4f30-c%22%20x1%3D%2212.104%22%20x2%3D%2216.851%22%20y1%3D%222%22%20y2%3D%2229.972%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23BBB%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23888%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22iab4f30-d%22%20x1%3D%229%22%20x2%3D%2224.817%22%20y1%3D%228.172%22%20y2%3D%2223.393%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%233477EA%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%231D53A4%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22iab4f30-e%22%20x1%3D%229%22%20x2%3D%2224.817%22%20y1%3D%228.172%22%20y2%3D%2223.393%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%233477EA%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%231D53A4%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22iab4f30-f%22%20x1%3D%229%22%20x2%3D%2224.817%22%20y1%3D%228.172%22%20y2%3D%2223.393%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%233477EA%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%231D53A4%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3CradialGradient%20id%3D%22iab4f30-b%22%20cx%3D%220%22%20cy%3D%220%22%20r%3D%221%22%20gradientTransform%3D%22matrix(11.61113%2022.16669%20-17.08352%208.94852%2012.028%209.292)%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20offset%3D%220.177%22%20stop-color%3D%22%23fff%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23B8B8B8%22%3E%3C%2Fstop%3E%3C%2FradialGradient%3E%3C%2Fdefs%3E%3C%2Fsvg%3E" alt="" className="w-4 h-4 object-contain flex-shrink-0" />
                        <div className="flex flex-col min-w-0">
                          <span className="text-tx truncate">Gold_Enterprise</span>
                          <span className="text-[10px] text-muted">Lakehouse • v2.0</span>
                        </div>
                      </div>
                      <span className="text-[10px] text-muted">Same</span>
                    </div>
                  </div>
                </div>

                <div className="p-2 rounded bg-surface2 border border-border font-mono text-[11px] flex items-center justify-between">
                  <span className="text-muted">Connection</span>
                  <span className="font-bold text-tx">Server=TestDB</span>
                </div>
              </div>

                            <div className="p-5 flex flex-col justify-between gap-5 bg-surface">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between pb-3 border-b border-border">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-mono uppercase text-muted tracking-wider font-bold">Stage 3</span>
                      <span className="font-display text-sm font-bold text-tx">Production</span>
                    </div>
                    <span className="font-mono text-[10px] font-semibold px-2 py-0.5 rounded bg-surface2 text-tx border border-border">
                      WS-VanBerlo-Prod
                    </span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-surface2/60 border border-border flex items-center justify-between font-mono text-xs">
                    <span className="text-muted">Production Target:</span>
                    <span className="text-tx font-bold">Server=ProdDB</span>
                  </div>

                  <div className="flex flex-col gap-1.5 font-mono text-xs">
                    <span className="text-[10px] uppercase text-muted font-bold tracking-wider">Protected Artifacts:</span>

                    <div className="p-2.5 rounded-lg bg-surface2/60 border border-border flex items-center justify-between">
                      <div className="flex items-center gap-2 min-w-0">
                        <img src="data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2232%22%20height%3D%2232%22%20fill%3D%22currentColor%22%20role%3D%22img%22%20focusable%3D%22false%22%3E%3Cpath%20fill%3D%22url(%23ic35943-a)%22%20d%3D%22M3%206.5A3.5%203.5%200%200%201%206.5%203h19A3.5%203.5%200%200%201%2029%206.5v19a3.5%203.5%200%200%201-3.5%203.5h-19A3.5%203.5%200%200%201%203%2025.5z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23ic35943-b)%22%20fill-opacity%3D%220.2%22%20d%3D%22M3%206.5A3.5%203.5%200%200%201%206.5%203h19A3.5%203.5%200%200%201%2029%206.5v19a3.5%203.5%200%200%201-3.5%203.5h-19A3.5%203.5%200%200%201%203%2025.5z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23ic35943-c)%22%20fill-rule%3D%22evenodd%22%20d%3D%22M25.5%204h-19A2.5%202.5%200%200%200%204%206.5v19A2.5%202.5%200%200%200%206.5%2028h19a2.5%202.5%200%200%200%202.5-2.5v-19A2.5%202.5%200%200%200%2025.5%204m-19-1A3.5%203.5%200%200%200%203%206.5v19A3.5%203.5%200%200%200%206.5%2029h19a3.5%203.5%200%200%200%203.5-3.5v-19A3.5%203.5%200%200%200%2025.5%203z%22%20clip-rule%3D%22evenodd%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23ic35943-d)%22%20d%3D%22M9.75%2014.5a1.75%201.75%200%201%200%200-3.5%201.75%201.75%200%200%200%200%203.5%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23ic35943-e)%22%20d%3D%22M16%2014.5a1.75%201.75%200%201%200%200-3.5%201.75%201.75%200%200%200%200%203.5%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23ic35943-f)%22%20d%3D%22M11.5%2019.25a1.75%201.75%200%201%201-3.5%200%201.75%201.75%200%200%201%203.5%200%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23ic35943-g)%22%20d%3D%22M16%2021a1.75%201.75%200%201%200%200-3.5%201.75%201.75%200%200%200%200%203.5%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23ic35943-h)%22%20d%3D%22M24%2012.75a1.75%201.75%200%201%201-3.5%200%201.75%201.75%200%200%201%203.5%200%22%3E%3C%2Fpath%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22ic35943-a%22%20x1%3D%2210.222%22%20x2%3D%2213.511%22%20y1%3D%223%22%20y2%3D%2229.311%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23fff%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23EBEBEB%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22ic35943-c%22%20x1%3D%2211.396%22%20x2%3D%2214.897%22%20y1%3D%223%22%20y2%3D%2229.256%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23BBB%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23888%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22ic35943-d%22%20x1%3D%228%22%20x2%3D%2216.989%22%20y1%3D%2211%22%20y2%3D%2225.382%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%237751B8%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%235A409C%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22ic35943-e%22%20x1%3D%228%22%20x2%3D%2216.989%22%20y1%3D%2211%22%20y2%3D%2225.382%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%237751B8%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%235A409C%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22ic35943-f%22%20x1%3D%228%22%20x2%3D%2216.989%22%20y1%3D%2211%22%20y2%3D%2225.382%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%237751B8%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%235A409C%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22ic35943-g%22%20x1%3D%228%22%20x2%3D%2216.989%22%20y1%3D%2211%22%20y2%3D%2225.382%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%237751B8%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%235A409C%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22ic35943-h%22%20x1%3D%228%22%20x2%3D%2216.989%22%20y1%3D%2211%22%20y2%3D%2225.382%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%237751B8%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%235A409C%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3CradialGradient%20id%3D%22ic35943-b%22%20cx%3D%220%22%20cy%3D%220%22%20r%3D%221%22%20gradientTransform%3D%22matrix(13.7222%2020.58336%20-17.81255%2011.875%2011.306%209.771)%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20offset%3D%220.177%22%20stop-color%3D%22%23fff%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23B8B8B8%22%3E%3C%2Fstop%3E%3C%2FradialGradient%3E%3C%2Fdefs%3E%3C%2Fsvg%3E" alt="" className="w-4 h-4 object-contain flex-shrink-0" />
                        <div className="flex flex-col min-w-0">
                          <span className="font-bold text-tx truncate">Sales_Executive_Model</span>
                          <span className="text-[10px] text-muted">Semantic Model • v1.2 Live</span>
                        </div>
                      </div>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-surface2 text-tx border border-border font-bold">Live</span>
                    </div>

                    <div className="p-2.5 rounded-lg bg-surface2/30 border border-border/50 flex items-center justify-between opacity-80">
                      <div className="flex items-center gap-2 min-w-0">
                        <img src="data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2232%22%20height%3D%2232%22%20fill%3D%22currentColor%22%20role%3D%22img%22%20focusable%3D%22false%22%3E%3Cpath%20fill%3D%22url(%23ia91417-a)%22%20d%3D%22M3%206.5A3.5%203.5%200%200%201%206.5%203h19A3.5%203.5%200%200%201%2029%206.5v19a3.5%203.5%200%200%201-3.5%203.5h-19A3.5%203.5%200%200%201%203%2025.5z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23ia91417-b)%22%20fill-opacity%3D%220.2%22%20d%3D%22M3%206.5A3.5%203.5%200%200%201%206.5%203h19A3.5%203.5%200%200%201%2029%206.5v19a3.5%203.5%200%200%201-3.5%203.5h-19A3.5%203.5%200%200%201%203%2025.5z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23ia91417-c)%22%20fill-rule%3D%22evenodd%22%20d%3D%22M25.5%204h-19A2.5%202.5%200%200%200%204%206.5v19A2.5%202.5%200%200%200%206.5%2028h19a2.5%202.5%200%200%200%202.5-2.5v-19A2.5%202.5%200%200%200%2025.5%204m-19-1A3.5%203.5%200%200%200%203%206.5v19A3.5%203.5%200%200%200%206.5%2029h19a3.5%203.5%200%200%200%203.5-3.5v-19A3.5%203.5%200%200%200%2025.5%203z%22%20clip-rule%3D%22evenodd%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23ia91417-d)%22%20d%3D%22M15.906%2024a8%208%200%201%200%200-16%208%208%200%200%200%200%2016%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22%23F5BCD8%22%20d%3D%22M20.085%2011.82a.5.5%200%200%200-.635-.012l-.177.14a252%20252%200%200%200-3.423%202.772c-.218.183-.41.347-.56.48a4%204%200%200%200-.344.327%201.5%201.5%200%201%200%202.282%201.948c.072-.084.17-.232.27-.39.107-.17.239-.385.385-.628.292-.488.646-1.096.989-1.69a295%20295%200%200%200%201.213-2.126l.111-.196a.5.5%200%200%200-.11-.626Z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22%23F5BCD8%22%20d%3D%22M12.464%2012.464a5%205%200%200%201%205.354-1.123.5.5%200%200%200%20.363-.932%206%206%200%200%200-6.424%209.834.5.5%200%201%200%20.707-.708%205%205%200%200%201%200-7.07Z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22%23F5F5F5%22%20fill-rule%3D%22evenodd%22%20d%3D%22M21.518%2029.864a1.5%201.5%200%200%200%202.561%201.06l.624-.623a1.5%201.5%200%200%200%202.558.977l1.414-1.415c.134-.133.24-.29.314-.46l.45.45c.945.946%202.561.276%202.561-1.06V22.5a1.5%201.5%200%200%200-1.5-1.5h-6.293c-1.336%200-2.005%201.616-1.06%202.56l.332.333c-.17.074-.327.18-.46.313l-1.414%201.415a1.5%201.5%200%200%200%20.977%202.558l-.624.624a1.5%201.5%200%200%200-.44%201.06Z%22%20clip-rule%3D%22evenodd%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23ia91417-e)%22%20d%3D%22M31%2022.5a.5.5%200%200%200-.5-.5h-6.293a.5.5%200%200%200-.353.854l6.293%206.293a.5.5%200%200%200%20.853-.354z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23ia91417-f)%22%20d%3D%22M24.58%2025.267a.5.5%200%200%200-.854-.353l-1.415%201.414a.5.5%200%201%200%20.708.707l1.414-1.414a.5.5%200%200%200%20.146-.354Z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23ia91417-g)%22%20d%3D%22M26.347%2027.035a.5.5%200%200%200-.854-.353l-2.828%202.828a.5.5%200%201%200%20.707.707L26.2%2027.39a.5.5%200%200%200%20.147-.354Z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23ia91417-h)%22%20d%3D%22M27.968%2029.157a.5.5%200%200%200-.707-.708l-1.414%201.415a.5.5%200%200%200%20.707.707z%22%3E%3C%2Fpath%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22ia91417-a%22%20x1%3D%2210.222%22%20x2%3D%2213.511%22%20y1%3D%223%22%20y2%3D%2229.311%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23fff%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23EBEBEB%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22ia91417-c%22%20x1%3D%2211.396%22%20x2%3D%2214.897%22%20y1%3D%223%22%20y2%3D%2229.256%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23BBB%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23888%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22ia91417-d%22%20x1%3D%227.906%22%20x2%3D%2223.906%22%20y1%3D%228%22%20y2%3D%2224%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23E03F8F%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23BD1E7B%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22ia91417-e%22%20x1%3D%2222.165%22%20x2%3D%2230.881%22%20y1%3D%2222%22%20y2%3D%2230.834%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23E03F8F%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23BD1E7B%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22ia91417-f%22%20x1%3D%2222.165%22%20x2%3D%2230.881%22%20y1%3D%2222%22%20y2%3D%2230.834%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23E03F8F%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23BD1E7B%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22ia91417-g%22%20x1%3D%2222.165%22%20x2%3D%2230.881%22%20y1%3D%2222%22%20y2%3D%2230.834%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23E03F8F%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23BD1E7B%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22ia91417-h%22%20x1%3D%2222.165%22%20x2%3D%2230.881%22%20y1%3D%2222%22%20y2%3D%2230.834%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23E03F8F%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23BD1E7B%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3CradialGradient%20id%3D%22ia91417-b%22%20cx%3D%220%22%20cy%3D%220%22%20r%3D%221%22%20gradientTransform%3D%22matrix(13.7222%2020.58336%20-17.81255%2011.875%2011.306%209.771)%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20offset%3D%220.177%22%20stop-color%3D%22%23fff%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23B8B8B8%22%3E%3C%2Fstop%3E%3C%2FradialGradient%3E%3C%2Fdefs%3E%3C%2Fsvg%3E" alt="" className="w-4 h-4 object-contain flex-shrink-0" />
                        <div className="flex flex-col min-w-0">
                          <span className="text-tx truncate">Executive_Scorecard</span>
                          <span className="text-[10px] text-muted">Report • Live</span>
                        </div>
                      </div>
                      <span className="text-[10px] text-muted">Live</span>
                    </div>

                    <div className="p-2.5 rounded-lg bg-surface2/30 border border-border/50 flex items-center justify-between opacity-80">
                      <div className="flex items-center gap-2 min-w-0">
                        <img src="data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2232%22%20height%3D%2232%22%20fill%3D%22currentColor%22%20role%3D%22img%22%20focusable%3D%22false%22%3E%3Cpath%20fill%3D%22url(%23iab4f30-a)%22%20d%3D%22M5%205.5A3.5%203.5%200%200%201%208.5%202h15A3.5%203.5%200%200%201%2027%205.5v21a3.5%203.5%200%200%201-3.5%203.5h-15A3.5%203.5%200%200%201%205%2026.5z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23iab4f30-b)%22%20fill-opacity%3D%220.2%22%20d%3D%22M5%205.5A3.5%203.5%200%200%201%208.5%202h15A3.5%203.5%200%200%201%2027%205.5v21a3.5%203.5%200%200%201-3.5%203.5h-15A3.5%203.5%200%200%201%205%2026.5z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23iab4f30-c)%22%20fill-rule%3D%22evenodd%22%20d%3D%22M23.5%203h-15A2.5%202.5%200%200%200%206%205.5v21A2.5%202.5%200%200%200%208.5%2029h15a2.5%202.5%200%200%200%202.5-2.5v-21A2.5%202.5%200%200%200%2023.5%203m-15-1A3.5%203.5%200%200%200%205%205.5v21A3.5%203.5%200%200%200%208.5%2030h15a3.5%203.5%200%200%200%203.5-3.5v-21A3.5%203.5%200%200%200%2023.5%202z%22%20clip-rule%3D%22evenodd%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23iab4f30-d)%22%20d%3D%22M13.99%2022.69a1.5%201.5%200%200%200-.154.31H11a2%202%200%200%201-2-2v-6.4a2%202%200%200%201%20.674-1.497l5-4.428a2%202%200%200%201%202.653%200l5%204.428A2%202%200%200%201%2023%2014.6v3.409L22.98%2018a1.5%201.5%200%200%200-.94-.01l-.12.05c-.37.15-.66.44-.81.81-.01.02-.05.07-.11.13-.06-.05-.11-.11-.11-.13a1.49%201.49%200%200%200-1.39-.93h-.14a1.5%201.5%200%200%200-1.256.94%201%201%200%200%201-.104.12c-.06-.05-.11-.11-.11-.13a1.49%201.49%200%200%200-1.39-.93h-.14c-.57.05-1.05.42-1.26.95-.04.08-.06.13-.06.13q-.013.012-.09.032l-.03.008a1.5%201.5%200%200%200-1.13%201.79%201.46%201.46%200%200%200%201.264%201.15l-.004.01c-.008.009-.038.017-.09.032l-.03.008c-.39.09-.73.32-.94.66%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23iab4f30-e)%22%20d%3D%22M23.75%2021h-.01a.502.502%200%200%200%20.1-.99c-.47-.11-.71-.31-.89-.78a.49.49%200%200%200-.46-.32c-.2%200-.38.12-.46.31-.15.38-.6.78-1.04.78s-.88-.41-1.03-.78c-.16-.38-.78-.38-.93%200s-.6.78-1.04.78-.88-.41-1.03-.78c-.08-.19-.26-.33-.47-.31-.2%200-.39.13-.46.32-.18.47-.41.67-.89.78-.27.06-.44.33-.38.6s.33.43.6.38c.5-.11.88-.32%201.17-.65.37.38.86.66%201.46.66s1.13-.29%201.51-.69c.37.39.91.69%201.49.69s1.1-.28%201.48-.66c.29.33.67.54%201.17.65.031.008.08.01.1.01h-.01z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23iab4f30-f)%22%20d%3D%22M23.75%2024h-.01a.502.502%200%200%200%20.1-.99c-.47-.11-.71-.31-.89-.78a.49.49%200%200%200-.46-.32c-.2%200-.38.12-.46.31-.15.38-.6.78-1.04.78s-.88-.41-1.03-.78c-.16-.38-.78-.38-.93%200s-.6.78-1.04.78-.88-.41-1.03-.78c-.08-.19-.26-.33-.47-.31-.2%200-.39.13-.46.32-.18.47-.41.67-.89.78-.27.06-.44.33-.38.6s.33.43.6.38c.5-.11.88-.32%201.17-.65.37.38.86.66%201.46.66s1.13-.29%201.51-.69c.37.39.91.69%201.49.69s1.1-.28%201.48-.66c.29.33.67.54%201.17.65.031.008.08.01.1.01h-.01z%22%3E%3C%2Fpath%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22iab4f30-a%22%20x1%3D%2211.111%22%20x2%3D%2215.576%22%20y1%3D%222%22%20y2%3D%2230.067%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23fff%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23EBEBEB%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22iab4f30-c%22%20x1%3D%2212.104%22%20x2%3D%2216.851%22%20y1%3D%222%22%20y2%3D%2229.972%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23BBB%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23888%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22iab4f30-d%22%20x1%3D%229%22%20x2%3D%2224.817%22%20y1%3D%228.172%22%20y2%3D%2223.393%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%233477EA%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%231D53A4%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22iab4f30-e%22%20x1%3D%229%22%20x2%3D%2224.817%22%20y1%3D%228.172%22%20y2%3D%2223.393%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%233477EA%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%231D53A4%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22iab4f30-f%22%20x1%3D%229%22%20x2%3D%2224.817%22%20y1%3D%228.172%22%20y2%3D%2223.393%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%233477EA%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%231D53A4%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3CradialGradient%20id%3D%22iab4f30-b%22%20cx%3D%220%22%20cy%3D%220%22%20r%3D%221%22%20gradientTransform%3D%22matrix(11.61113%2022.16669%20-17.08352%208.94852%2012.028%209.292)%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20offset%3D%220.177%22%20stop-color%3D%22%23fff%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23B8B8B8%22%3E%3C%2Fstop%3E%3C%2FradialGradient%3E%3C%2Fdefs%3E%3C%2Fsvg%3E" alt="" className="w-4 h-4 object-contain flex-shrink-0" />
                        <div className="flex flex-col min-w-0">
                          <span className="text-tx truncate">Gold_Enterprise</span>
                          <span className="text-[10px] text-muted">Lakehouse • Live</span>
                        </div>
                      </div>
                      <span className="text-[10px] text-muted">Live</span>
                    </div>
                  </div>
                </div>

                <div className="p-2 rounded bg-surface2 border border-border font-mono text-[11px] flex items-center justify-between">
                  <span className="text-muted">Direct Uploads</span>
                  <span className="font-bold text-tx">Blocked (Protected)</span>
                </div>
              </div>
            </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
              <div className="p-3 rounded-lg bg-surface border border-border">
                <span className="text-muted text-[10px] uppercase block">Parameter Rules</span>
                <span className="font-bold text-tx mt-0.5 block">Applied During Deployment</span>
              </div>
              <div className="p-3 rounded-lg bg-surface border border-border">
                <span className="text-muted text-[10px] uppercase block">Git Integration</span>
                <span className="font-bold text-tx mt-0.5 block">Repository Review Workflow</span>
              </div>
              <div className="p-3 rounded-lg bg-surface border border-border">
                <span className="text-muted text-[10px] uppercase block">Production Gate</span>
                <span className="font-bold text-tx mt-0.5 block">Restricted Workspace Writes</span>
              </div>
            </div>
          </div>
        )}

                                {!showRawSource && isCase9Lineage && <Case9LineageView />}

                                {!showRawSource && isCase9ImpactAnalysis && (
          <div className="border border-border rounded-xl bg-surface2/20 p-5 flex flex-col gap-5">
            <div className="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-border">
              <div className="flex items-center gap-2">
                <img src="data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2232%22%20height%3D%2232%22%20fill%3D%22currentColor%22%20role%3D%22img%22%20focusable%3D%22false%22%3E%3Cpath%20fill%3D%22url(%23iab4f30-a)%22%20d%3D%22M5%205.5A3.5%203.5%200%200%201%208.5%202h15A3.5%203.5%200%200%201%2027%205.5v21a3.5%203.5%200%200%201-3.5%203.5h-15A3.5%203.5%200%200%201%205%2026.5z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23iab4f30-b)%22%20fill-opacity%3D%220.2%22%20d%3D%22M5%205.5A3.5%203.5%200%200%201%208.5%202h15A3.5%203.5%200%200%201%2027%205.5v21a3.5%203.5%200%200%201-3.5%203.5h-15A3.5%203.5%200%200%201%205%2026.5z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23iab4f30-c)%22%20fill-rule%3D%22evenodd%22%20d%3D%22M23.5%203h-15A2.5%202.5%200%200%200%206%205.5v21A2.5%202.5%200%200%200%208.5%2029h15a2.5%202.5%200%200%200%202.5-2.5v-21A2.5%202.5%200%200%200%2023.5%203m-15-1A3.5%203.5%200%200%200%205%205.5v21A3.5%203.5%200%200%200%208.5%2030h15a3.5%203.5%200%200%200%203.5-3.5v-21A3.5%203.5%200%200%200%2023.5%202z%22%20clip-rule%3D%22evenodd%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23iab4f30-d)%22%20d%3D%22M13.99%2022.69a1.5%201.5%200%200%200-.154.31H11a2%202%200%200%201-2-2v-6.4a2%202%200%200%201%20.674-1.497l5-4.428a2%202%200%200%201%202.653%200l5%204.428A2%202%200%200%201%2023%2014.6v3.409L22.98%2018a1.5%201.5%200%200%200-.94-.01l-.12.05c-.37.15-.66.44-.81.81-.01.02-.05.07-.11.13-.06-.05-.11-.11-.11-.13a1.49%201.49%200%200%200-1.39-.93h-.14a1.5%201.5%200%200%200-1.256.94%201%201%200%200%201-.104.12c-.06-.05-.11-.11-.11-.13a1.49%201.49%200%200%200-1.39-.93h-.14c-.57.05-1.05.42-1.26.95-.04.08-.06.13-.06.13q-.013.012-.09.032l-.03.008a1.5%201.5%200%200%200-1.13%201.79%201.46%201.46%200%200%200%201.264%201.15l-.004.01c-.008.009-.038.017-.09.032l-.03.008c-.39.09-.73.32-.94.66%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23iab4f30-e)%22%20d%3D%22M23.75%2021h-.01a.502.502%200%200%200%20.1-.99c-.47-.11-.71-.31-.89-.78a.49.49%200%200%200-.46-.32c-.2%200-.38.12-.46.31-.15.38-.6.78-1.04.78s-.88-.41-1.03-.78c-.16-.38-.78-.38-.93%200s-.6.78-1.04.78-.88-.41-1.03-.78c-.08-.19-.26-.33-.47-.31-.2%200-.39.13-.46.32-.18.47-.41.67-.89.78-.27.06-.44.33-.38.6s.33.43.6.38c.5-.11.88-.32%201.17-.65.37.38.86.66%201.46.66s1.13-.29%201.51-.69c.37.39.91.69%201.49.69s1.1-.28%201.48-.66c.29.33.67.54%201.17.65.031.008.08.01.1.01h-.01z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23iab4f30-f)%22%20d%3D%22M23.75%2024h-.01a.502.502%200%200%200%20.1-.99c-.47-.11-.71-.31-.89-.78a.49.49%200%200%200-.46-.32c-.2%200-.38.12-.46.31-.15.38-.6.78-1.04.78s-.88-.41-1.03-.78c-.16-.38-.78-.38-.93%200s-.6.78-1.04.78-.88-.41-1.03-.78c-.08-.19-.26-.33-.47-.31-.2%200-.39.13-.46.32-.18.47-.41.67-.89.78-.27.06-.44.33-.38.6s.33.43.6.38c.5-.11.88-.32%201.17-.65.37.38.86.66%201.46.66s1.13-.29%201.51-.69c.37.39.91.69%201.49.69s1.1-.28%201.48-.66c.29.33.67.54%201.17.65.031.008.08.01.1.01h-.01z%22%3E%3C%2Fpath%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22iab4f30-a%22%20x1%3D%2211.111%22%20x2%3D%2215.576%22%20y1%3D%222%22%20y2%3D%2230.067%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23fff%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23EBEBEB%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22iab4f30-c%22%20x1%3D%2212.104%22%20x2%3D%2216.851%22%20y1%3D%222%22%20y2%3D%2229.972%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23BBB%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23888%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22iab4f30-d%22%20x1%3D%229%22%20x2%3D%2224.817%22%20y1%3D%228.172%22%20y2%3D%2223.393%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%233477EA%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%231D53A4%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22iab4f30-e%22%20x1%3D%229%22%20x2%3D%2224.817%22%20y1%3D%228.172%22%20y2%3D%2223.393%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%233477EA%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%231D53A4%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22iab4f30-f%22%20x1%3D%229%22%20x2%3D%2224.817%22%20y1%3D%228.172%22%20y2%3D%2223.393%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%233477EA%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%231D53A4%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3CradialGradient%20id%3D%22iab4f30-b%22%20cx%3D%220%22%20cy%3D%220%22%20r%3D%221%22%20gradientTransform%3D%22matrix(11.61113%2022.16669%20-17.08352%208.94852%2012.028%209.292)%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20offset%3D%220.177%22%20stop-color%3D%22%23fff%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23B8B8B8%22%3E%3C%2Fstop%3E%3C%2FradialGradient%3E%3C%2Fdefs%3E%3C%2Fsvg%3E" alt="Impact Analysis" className="w-4 h-4 object-contain" />
                <span className="font-display text-xs font-bold text-tx">
                  Fabric Built-in Impact Analysis &amp; Stakeholder Notification Console
                </span>
              </div>
              <span className="font-mono text-[11px] font-semibold px-2 py-0.5 rounded bg-surface border border-border text-tx">
                Proactive Governance
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-surface border border-border rounded-xl p-4 flex flex-col gap-3 shadow-xs">
                <span className="font-mono text-[10px] text-muted uppercase font-bold">1. Blast Radius Inspection</span>
                <div className="p-3 rounded-lg bg-surface2/60 border border-border font-mono text-xs flex flex-col gap-1 text-tx">
                  <div>• 5 Tabular Semantic Models</div>
                  <div>• 11 Power BI Executive Reports</div>
                  <div>• 2 Medallion Ingestion Pipelines</div>
                </div>
                <span className="font-mono text-[10px] text-tx bg-surface2 px-2 py-0.5 rounded border border-border text-center">
                  Item-Level Lineage Verified
                </span>
              </div>

              <div className="bg-surface border border-border rounded-xl p-4 flex flex-col gap-3 shadow-xs">
                <span className="font-mono text-[10px] text-muted uppercase font-bold">2. Supported Notifications</span>
                <p className="text-tx leading-relaxed font-sans text-xs">
                  Semantic model impact analysis can notify the contact lists of affected workspaces. Other consumers require direct owner coordination.
                </p>
                <span className="font-mono text-[10px] text-tx bg-surface2 px-2 py-0.5 rounded border border-border text-center">
                  Pre-Deployment Notification
                </span>
              </div>

              <div className="bg-surface border-2 border-border rounded-xl p-4 flex flex-col gap-3 shadow-sm">
                <span className="font-mono text-[10px] text-tx uppercase font-bold">3. Non-Breaking Remediation</span>
                <p className="text-tx leading-relaxed font-sans text-xs">
                  Where the consumer supports it, expose both <code>Cust_ZipCode</code> and <code>PostalCode</code> through a compatibility view while consumers migrate.
                </p>
                <span className="font-mono text-[10px] text-tx bg-surface2 px-2 py-0.5 rounded border border-border text-center font-bold">
                  Validate Every Downstream Refresh
                </span>
              </div>
            </div>
          </div>
        )}

                                {!showRawSource && isCase10Bridge && (
          <div className="border border-border rounded-xl bg-surface2/20 p-5 flex flex-col gap-5">
            <div className="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-border">
              <div className="flex items-center gap-2">
                <img
                  src="data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20width%3D%22630px%22%20height%3D%22630px%22%20viewBox%3D%220%200%20630%20630%22%20version%3D%221.1%22%3E%0D%0A%20%20%20%20%3C!--%20Generator%3A%20Sketch%2053.2%20(72643)%20-%20https%3A%2F%2Fsketchapp.com%20--%3E%0D%0A%20%20%20%20%3Ctitle%3EPBI%20Logo%3C%2Ftitle%3E%0D%0A%20%20%20%20%3Cdesc%3ECreated%20with%20Sketch.%3C%2Fdesc%3E%0D%0A%20%20%20%20%3Cdefs%3E%0D%0A%20%20%20%20%20%20%20%20%3ClinearGradient%20x1%3D%2250%25%22%20y1%3D%220%25%22%20x2%3D%2250%25%22%20y2%3D%22100%25%22%20id%3D%22linearGradient-1%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cstop%20stop-color%3D%22%23EBBB14%22%20offset%3D%220%25%22%2F%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cstop%20stop-color%3D%22%23B25400%22%20offset%3D%22100%25%22%2F%3E%0D%0A%20%20%20%20%20%20%20%20%3C%2FlinearGradient%3E%0D%0A%20%20%20%20%20%20%20%20%3ClinearGradient%20x1%3D%2250%25%22%20y1%3D%220%25%22%20x2%3D%2250%25%22%20y2%3D%22100%25%22%20id%3D%22linearGradient-2%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cstop%20stop-color%3D%22%23F9E583%22%20offset%3D%220%25%22%2F%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cstop%20stop-color%3D%22%23DE9800%22%20offset%3D%22100%25%22%2F%3E%0D%0A%20%20%20%20%20%20%20%20%3C%2FlinearGradient%3E%0D%0A%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M346%2C604%20L346%2C630%20L320%2C630%20L153%2C630%20C138.640597%2C630%20127%2C618.359403%20127%2C604%20L127%2C183%20C127%2C168.640597%20138.640597%2C157%20153%2C157%20L320%2C157%20C334.359403%2C157%20346%2C168.640597%20346%2C183%20L346%2C604%20Z%22%20id%3D%22path-3%22%2F%3E%0D%0A%20%20%20%20%20%20%20%20%3Cfilter%20x%3D%22-9.1%25%22%20y%3D%22-6.3%25%22%20width%3D%22136.5%25%22%20height%3D%22116.9%25%22%20filterUnits%3D%22objectBoundingBox%22%20id%3D%22filter-4%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3CfeOffset%20dx%3D%2220%22%20dy%3D%2210%22%20in%3D%22SourceAlpha%22%20result%3D%22shadowOffsetOuter1%22%2F%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3CfeGaussianBlur%20stdDeviation%3D%2210%22%20in%3D%22shadowOffsetOuter1%22%20result%3D%22shadowBlurOuter1%22%2F%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3CfeColorMatrix%20values%3D%220%200%200%200%200%20%20%200%200%200%200%200%20%20%200%200%200%200%200%20%200%200%200%200.0530211976%200%22%20type%3D%22matrix%22%20in%3D%22shadowBlurOuter1%22%2F%3E%0D%0A%20%20%20%20%20%20%20%20%3C%2Ffilter%3E%0D%0A%20%20%20%20%20%20%20%20%3ClinearGradient%20x1%3D%2250%25%22%20y1%3D%220%25%22%20x2%3D%2250%25%22%20y2%3D%22100%25%22%20id%3D%22linearGradient-5%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cstop%20stop-color%3D%22%23F9E68B%22%20offset%3D%220%25%22%2F%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cstop%20stop-color%3D%22%23F3CD32%22%20offset%3D%22100%25%22%2F%3E%0D%0A%20%20%20%20%20%20%20%20%3C%2FlinearGradient%3E%0D%0A%20%20%20%20%3C%2Fdefs%3E%0D%0A%20%20%20%20%3Cg%20id%3D%22PBI-Logo%22%20stroke%3D%22none%22%20stroke-width%3D%221%22%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%0D%0A%20%20%20%20%20%20%20%20%3Cg%20id%3D%22Group%22%20transform%3D%22translate(77.500000%2C%200.000000)%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Crect%20id%3D%22Rectangle%22%20fill%3D%22url(%23linearGradient-1)%22%20x%3D%22256%22%20y%3D%220%22%20width%3D%22219%22%20height%3D%22630%22%20rx%3D%2226%22%2F%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cg%20id%3D%22Combined-Shape%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cuse%20fill%3D%22black%22%20fill-opacity%3D%221%22%20filter%3D%22url(%23filter-4)%22%20xlink%3Ahref%3D%22%23path-3%22%2F%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cuse%20fill%3D%22url(%23linearGradient-2)%22%20fill-rule%3D%22evenodd%22%20xlink%3Ahref%3D%22%23path-3%22%2F%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fg%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M219%2C604%20L219%2C630%20L193%2C630%20L26%2C630%20C11.6405965%2C630%201.75851975e-15%2C618.359403%200%2C604%20L0%2C341%20C-1.75851975e-15%2C326.640597%2011.6405965%2C315%2026%2C315%20L193%2C315%20C207.359403%2C315%20219%2C326.640597%20219%2C341%20L219%2C604%20Z%22%20id%3D%22Combined-Shape%22%20fill%3D%22url(%23linearGradient-5)%22%2F%3E%0D%0A%20%20%20%20%20%20%20%20%3C%2Fg%3E%0D%0A%20%20%20%20%3C%2Fg%3E%0D%0A%3C%2Fsvg%3E"
                  alt="Power BI"
                  className="w-4 h-4 object-contain"
                />
                <span className="font-display text-xs font-bold text-tx">
                  {isCase10DirectRelationship
                    ? 'Power BI Semantic Model • Model View'
                    : 'Power BI Semantic Model • Bridge Architecture Canvas'}
                </span>
              </div>
              <span className="font-mono text-[11px] font-semibold px-2 py-0.5 rounded bg-surface border border-border text-tx">
                {current.content.includes('Bridge_AccountPortfolio') || current.title.includes('Bridge') || current.tabLabel.includes('Bridge')
                  ? '✓ Explicit Membership Bridge Active'
                  : 'Ambiguous Direct Many-to-Many Conflict'}
              </span>
            </div>

            <div className="relative overflow-x-auto rounded-[2px] border border-[#c8c6c4] bg-[#e7e6e5]">
              {isCase10DirectRelationship ? (
                                <div
                  data-testid="case10-model-view"
                  className="min-w-[780px] bg-[#e7e6e5]"
                >
                  <div
                    data-testid="case10-fabric-canvas"
                    className="min-h-[252px] bg-[#e7e6e5] px-10 py-10"
                  >
                    <div className="flex items-start justify-center gap-0">
                      <div
                        role="group"
                        aria-label="DimAccount table"
                        className="z-10 w-[250px] overflow-hidden rounded-[2px] border border-[#c8c6c4] bg-white shadow-[0_2px_5px_rgba(0,0,0,0.14)]"
                      >
                        <div className="flex h-10 items-center border-b border-[#d2d0ce] bg-white px-3 font-sans text-[#201f1e]">
                          <span className="text-[13px] font-semibold">DimAccount</span>
                        </div>
                        <div className="font-sans text-[12px] text-[#323130]">
                          <div className="flex h-9 items-center justify-between bg-[#f3f2f1] px-3 font-semibold">
                            <span>AccountID (PK)</span>
                            <span className="text-[10px] font-normal text-[#605e5c]">int64</span>
                          </div>
                          <div className="flex h-9 items-center justify-between border-t border-[#edebe9] px-3">
                            <span>AccountName</span>
                            <span className="text-[10px] text-[#605e5c]">string</span>
                          </div>
                          <div className="flex h-9 items-center justify-between border-t border-[#edebe9] px-3">
                            <span>RiskProfile</span>
                            <span className="text-[10px] text-[#605e5c]">string</span>
                          </div>
                        </div>
                      </div>

                      <div
                        role="img"
                        aria-label="Many-to-many relationship, bidirectional"
                        className="relative mt-[50px] flex w-[180px] items-center font-sans text-[#323130]"
                      >
                        <span
                          aria-label="DimAccount cardinality many"
                          className="z-10 -mr-px grid h-[20px] w-[19px] place-items-center rounded-[2px] border border-[#8a8886] bg-white text-[12px]"
                        >*</span>
                        <span className="h-px flex-1 bg-[#605e5c]" />
                        <span className="absolute left-1/2 top-1/2 flex h-[22px] -translate-x-1/2 -translate-y-1/2 items-center gap-1 rounded-[2px] border border-[#8a8886] bg-white px-1.5 text-[9px] text-[#323130]">
                          <span aria-hidden="true" className="h-0 w-0 border-y-[4px] border-r-[6px] border-y-transparent border-r-[#605e5c]" />
                          <span>Both</span>
                          <span aria-hidden="true" className="h-0 w-0 border-y-[4px] border-l-[6px] border-y-transparent border-l-[#605e5c]" />
                        </span>
                        <span
                          aria-label="DimPortfolio cardinality many"
                          className="z-10 -ml-px grid h-[20px] w-[19px] place-items-center rounded-[2px] border border-[#8a8886] bg-white text-[12px]"
                        >*</span>
                      </div>

                      <div
                        role="group"
                        aria-label="DimPortfolio table"
                        className="z-10 w-[250px] overflow-hidden rounded-[2px] border border-[#c8c6c4] bg-white shadow-[0_2px_5px_rgba(0,0,0,0.14)]"
                      >
                        <div className="flex h-10 items-center border-b border-[#d2d0ce] bg-white px-3 font-sans text-[#201f1e]">
                          <span className="text-[13px] font-semibold">DimPortfolio</span>
                        </div>
                        <div className="font-sans text-[12px] text-[#323130]">
                          <div className="flex h-9 items-center justify-between bg-[#f3f2f1] px-3 font-semibold">
                            <span>AccountID (FK)</span>
                            <span className="text-[10px] font-normal text-[#605e5c]">int64</span>
                          </div>
                          <div className="flex h-9 items-center justify-between border-t border-[#edebe9] px-3">
                            <span>PortfolioType</span>
                            <span className="text-[10px] text-[#605e5c]">string</span>
                          </div>
                          <div className="flex h-9 items-center justify-between border-t border-[#edebe9] px-3">
                            <span>ManagerCode</span>
                            <span className="text-[10px] text-[#605e5c]">string</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                                <div
                  data-testid="case10-bridge-model-view"
                  className={`flex min-h-[252px] items-start justify-center bg-[#e7e6e5] py-10 ${
                    variant === 'solution' ? 'min-w-[804px] px-3' : 'min-w-[1040px] px-6'
                  }`}
                >
                  <div
                    role="group"
                    aria-label="DimAccount table"
                    className={`z-10 overflow-hidden rounded-[2px] border border-[#c8c6c4] bg-white shadow-[0_2px_5px_rgba(0,0,0,0.14)] ${
                      variant === 'solution' ? 'w-[190px]' : 'w-[230px]'
                    }`}
                  >
                    <div className="flex h-10 items-center justify-between border-b border-[#d2d0ce] bg-white px-3 font-sans text-[#201f1e]">
                      <span className="text-[13px] font-semibold">DimAccount</span>
                      <span className="text-[10px] text-[#605e5c]">Dim</span>
                    </div>
                    <div className="font-sans text-[12px] text-[#323130]">
                      <div className="flex h-9 items-center justify-between bg-[#f3f2f1] px-3 font-semibold">
                        <span>AccountID (PK)</span>
                        <span className="text-[10px] font-normal text-[#605e5c]">int64 (1)</span>
                      </div>
                      <div className="flex h-9 items-center justify-between border-t border-[#edebe9] px-3">
                        <span>AccountName</span>
                        <span className="text-[10px] text-[#605e5c]">string</span>
                      </div>
                      <div className="flex h-9 items-center justify-between border-t border-[#edebe9] px-3">
                        <span>RiskProfile</span>
                        <span className="text-[10px] text-[#605e5c]">string</span>
                      </div>
                    </div>
                  </div>

                  <div
                    role="img"
                    aria-label="One-to-many relationship, bidirectional"
                    className={`relative mt-[50px] flex flex-shrink-0 items-center font-sans text-[#323130] ${
                      variant === 'solution' ? 'w-[80px]' : 'w-[105px]'
                    }`}
                  >
                    <span className="z-10 -mr-px grid h-[20px] w-[19px] place-items-center rounded-[2px] border border-[#8a8886] bg-white text-[12px]">1</span>
                    <span className="h-px flex-1 bg-[#605e5c]" />
                    <span className="absolute left-1/2 top-1/2 flex h-[22px] -translate-x-1/2 -translate-y-1/2 items-center gap-1 rounded-[2px] border border-[#8a8886] bg-white px-1 text-[8px]">
                      <span aria-hidden="true" className="h-0 w-0 border-y-[3px] border-r-[5px] border-y-transparent border-r-[#605e5c]" />
                      <span>Both</span>
                      <span aria-hidden="true" className="h-0 w-0 border-y-[3px] border-l-[5px] border-y-transparent border-l-[#605e5c]" />
                    </span>
                    <span className="z-10 -ml-px grid h-[20px] w-[19px] place-items-center rounded-[2px] border border-[#8a8886] bg-white text-[12px]">*</span>
                  </div>

                  <div
                    role="group"
                    aria-label="Bridge AccountPortfolio table"
                    className={`z-10 overflow-hidden rounded-[2px] border border-[#8a8886] bg-white shadow-[0_2px_5px_rgba(0,0,0,0.14)] ${
                      variant === 'solution' ? 'w-[240px]' : 'w-[270px]'
                    }`}
                  >
                    <div className="flex h-10 items-center justify-between border-b border-[#d2d0ce] bg-white px-3 font-sans text-[#201f1e]">
                      <span className="text-[13px] font-semibold">Bridge_AccountPortfolio</span>
                      <span className="text-[10px] text-[#605e5c]">Bridge</span>
                    </div>
                    <div className="font-sans text-[12px] text-[#323130]">
                      <div className="flex h-9 items-center justify-between bg-[#f3f2f1] px-3 font-semibold">
                        <span>AccountID (FK)</span>
                        <span className="text-[10px] font-normal text-[#605e5c]">Many (*)</span>
                      </div>
                      <div className="flex h-9 items-center justify-between border-t border-[#edebe9] bg-[#f3f2f1] px-3 font-semibold">
                        <span>PortfolioID (FK)</span>
                        <span className="text-[10px] font-normal text-[#605e5c]">Many (*)</span>
                      </div>
                      <div className="flex h-9 items-center justify-between border-t border-[#edebe9] px-3">
                        <span>AllocationPct</span>
                        <span className="text-[10px] text-[#605e5c]">decimal</span>
                      </div>
                    </div>
                  </div>

                  <div
                    role="img"
                    aria-label="Many-to-one relationship, single direction"
                    className={`relative mt-[50px] flex flex-shrink-0 items-center font-sans text-[#323130] ${
                      variant === 'solution' ? 'w-[80px]' : 'w-[105px]'
                    }`}
                  >
                    <span className="z-10 -mr-px grid h-[20px] w-[19px] place-items-center rounded-[2px] border border-[#8a8886] bg-white text-[12px]">*</span>
                    <span className="h-px flex-1 bg-[#605e5c]" />
                    <span className="absolute left-1/2 top-1/2 flex h-[22px] -translate-x-1/2 -translate-y-1/2 items-center gap-1 rounded-[2px] border border-[#8a8886] bg-white px-1 text-[8px]">
                      <span aria-hidden="true" className="h-0 w-0 border-y-[3px] border-r-[5px] border-y-transparent border-r-[#605e5c]" />
                      <span>Single</span>
                    </span>
                    <span className="z-10 -ml-px grid h-[20px] w-[19px] place-items-center rounded-[2px] border border-[#8a8886] bg-white text-[12px]">1</span>
                  </div>

                  <div
                    role="group"
                    aria-label="DimPortfolio table"
                    className={`z-10 overflow-hidden rounded-[2px] border border-[#c8c6c4] bg-white shadow-[0_2px_5px_rgba(0,0,0,0.14)] ${
                      variant === 'solution' ? 'w-[190px]' : 'w-[230px]'
                    }`}
                  >
                    <div className="flex h-10 items-center justify-between border-b border-[#d2d0ce] bg-white px-3 font-sans text-[#201f1e]">
                      <span className="text-[13px] font-semibold">DimPortfolio</span>
                      <span className="text-[10px] text-[#605e5c]">Dim</span>
                    </div>
                    <div className="font-sans text-[12px] text-[#323130]">
                      <div className="flex h-9 items-center justify-between bg-[#f3f2f1] px-3 font-semibold">
                        <span>PortfolioID (PK)</span>
                        <span className="text-[10px] font-normal text-[#605e5c]">int64 (1)</span>
                      </div>
                      <div className="flex h-9 items-center justify-between border-t border-[#edebe9] px-3">
                        <span>PortfolioType</span>
                        <span className="text-[10px] text-[#605e5c]">string</span>
                      </div>
                      <div className="flex h-9 items-center justify-between border-t border-[#edebe9] px-3">
                        <span>ManagerCode</span>
                        <span className="text-[10px] text-[#605e5c]">string</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

                        {!isCase10DirectRelationship && (
              <div
                data-testid="case10-bridge-metrics"
                className="grid grid-cols-1 divide-y divide-[#d2d0ce] overflow-hidden rounded-[2px] border border-[#c8c6c4] bg-white font-sans text-xs sm:grid-cols-3 sm:divide-x sm:divide-y-0"
              >
                <div className="px-4 py-3">
                  <span className="block text-[9px] uppercase tracking-[0.08em] text-[#605e5c]">Filter Context Flow</span>
                  <span className="mt-1 block font-semibold text-[#323130]">One Controlled Both Path</span>
                </div>
                <div className="px-4 py-3">
                  <span className="block text-[9px] uppercase tracking-[0.08em] text-[#605e5c]">Attribution Weighting</span>
                  <span className="mt-1 block font-semibold text-[#323130]">Required in Explicit Measure</span>
                </div>
                <div className="px-4 py-3">
                  <span className="block text-[9px] uppercase tracking-[0.08em] text-[#605e5c]">Additive Reconciliation</span>
                  <span className="mt-1 block font-semibold text-[#323130]">Test Allocated Totals</span>
                </div>
              </div>
            )}
          </div>
        )}

                                {!showRawSource && isCase11IncrementalRefresh && <Case11RefreshPolicy />}

                                {!showRawSource && isCase12Maintainability && <Case12ModelExplorer />}

                                {(showRawSource || !isCustomDiagram) && (
          <div className="border border-border rounded-xl overflow-hidden shadow-sm bg-surface">
            <div className="px-4 py-2.5 bg-surface2/80 border-b border-border flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-border" />
                <span className="w-2.5 h-2.5 rounded-full bg-border" />
                <span className="w-2.5 h-2.5 rounded-full bg-border" />
                <span className="font-bold text-tx ml-2">
                  {current.language === 'sql' 
                    ? `${current.tabLabel.replace(/\s+/g, '_')}.sql` 
                    : current.language === 'm'
                    ? `${current.tabLabel.replace(/\s+/g, '_')}.pq`
                    : `${current.tabLabel.replace(/\s+/g, '_')}.${current.language || 'txt'}`}
                </span>
              </div>

              <div className="flex items-center gap-3 text-muted2 text-[11px]">
                <span>UTF-8</span>
                <span>•</span>
                <span className="text-success font-medium">✓ Validated</span>
              </div>
            </div>

            <div className="bg-surface overflow-hidden">
              {renderHighlightedCode(current.content, current.language)}
            </div>
          </div>
        )}

                                {hasSqlOutput && (
          <div className="border border-border rounded-xl overflow-hidden shadow-sm">
            <div className="px-4 py-2.5 bg-surface2/70 border-b border-border flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-tx">Query Result Set Preview</span>
              <span className="text-danger font-semibold">Validation discrepancy detected</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs border-collapse">
                <thead>
                  <tr className="border-b border-border text-muted bg-surface2/40">
                    <th className="p-3">Entity / Dimension Key</th>
                    <th className="p-3">Observed Metric Total</th>
                    <th className="p-3">Attribution Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr className="bg-danger/5 text-tx">
                    <td className="p-3 font-bold text-danger">Aggressive Portfolio</td>
                    <td className="p-3 font-bold text-danger">$240,000,000</td>
                    <td className="p-3 text-danger font-semibold">Double-counted across joint accounts</td>
                  </tr>
                  <tr className="bg-surface text-tx">
                    <td className="p-3 font-bold">Conservative Portfolio</td>
                    <td className="p-3 font-bold">$190,000,000</td>
                    <td className="p-3 text-muted">Overlapping shared account allocation</td>
                  </tr>
                  <tr className="bg-danger/10 text-tx font-bold">
                    <td className="p-3 text-danger">True Ledger Total</td>
                    <td className="p-3 text-danger">$310,000,000</td>
                    <td className="p-3 text-danger">Sum of parts ($430M) exceeds ledger (+38.7% Inflation)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
