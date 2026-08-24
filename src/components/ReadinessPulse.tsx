import React from 'react';
import { useTriage } from '../context/TriageContext.tsx';
import { DOMAINS, type DomainKey } from '../types/scenario.ts';
import { AlertOctagon, HelpCircle, Sparkles, CheckCircle2, Flame } from './icons/index.tsx';

export function ReadinessPulse() {
  const { overallReadiness, startWeakSpotsTriage } = useTriage();
  const { 
    accuracyPercent,
    coveragePercent,
    totalAttempted, 
    totalScenarios, 
    domainStats,
    dangerousMisconceptionCount,
    knowledgeGapCount,
    luckyHitCount,
    strongSignalCount,
    solidUnderstandingCount,
    needsReviewCount
  } = overallReadiness;

  const scoreDisplay = accuracyPercent !== null ? accuracyPercent : 0;
  const weakSpotCount = dangerousMisconceptionCount + needsReviewCount + knowledgeGapCount + luckyHitCount;

  const DOMAIN_DETAILS: Record<DomainKey, { subtitle: string; icon: string }> = {
    prepare_data: {
      subtitle: 'Lakehouse, Warehouse & Dataflow Gen2',
      icon: 'data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2232%22%20height%3D%2232%22%20fill%3D%22currentColor%22%20role%3D%22img%22%20focusable%3D%22false%22%3E%3Cpath%20fill%3D%22url(%23idca273-a)%22%20d%3D%22M3%206.5A3.5%203.5%200%200%201%206.5%203h19A3.5%203.5%200%200%201%2029%206.5v19a3.5%203.5%200%200%201-3.5%203.5h-19A3.5%203.5%200%200%201%203%2025.5z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23idca273-b)%22%20fill-opacity%3D%220.2%22%20d%3D%22M3%206.5A3.5%203.5%200%200%201%206.5%203h19A3.5%203.5%200%200%201%2029%206.5v19a3.5%203.5%200%200%201-3.5%203.5h-19A3.5%203.5%200%200%201%203%2025.5z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23idca273-c)%22%20fill-rule%3D%22evenodd%22%20d%3D%22M25.5%204h-19A2.5%202.5%200%200%200%204%206.5v19A2.5%202.5%200%200%200%206.5%2028h19a2.5%202.5%200%200%200%202.5-2.5v-19A2.5%202.5%200%200%200%2025.5%204m-19-1A3.5%203.5%200%200%200%203%206.5v19A3.5%203.5%200%200%200%206.5%2029h19a3.5%203.5%200%200%200%203.5-3.5v-19A3.5%203.5%200%200%200%2025.5%203z%22%20clip-rule%3D%22evenodd%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23idca273-d)%22%20d%3D%22M15%2011.5a2.5%202.5%200%200%201-2%202.45V16h4.5a1.5%201.5%200%200%200%201.5-1.5v-.55a2.5%202.5%200%201%201%201%200v.55a2.5%202.5%200%200%201-2.5%202.5H13v1.05a2.5%202.5%200%201%201-2.294.709v-.056h.056A2.5%202.5%200%200%201%2012%2018.05v-4.1a2.5%202.5%200%200%201-1.294-4.191v-.023h.022A2.5%202.5%200%200%201%2015%2011.5%22%3E%3C%2Fpath%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22idca273-a%22%20x1%3D%2210.222%22%20x2%3D%2213.511%22%20y1%3D%223%22%20y2%3D%2229.311%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23fff%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23EBEBEB%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22idca273-c%22%20x1%3D%2211.396%22%20x2%3D%2214.897%22%20y1%3D%223%22%20y2%3D%2229.256%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23BBB%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23888%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22idca273-d%22%20x1%3D%2210%22%20x2%3D%2223.835%22%20y1%3D%229%22%20y2%3D%2220.859%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%234BA446%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%233F7D35%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3CradialGradient%20id%3D%22idca273-b%22%20cx%3D%220%22%20cy%3D%220%22%20r%3D%221%22%20gradientTransform%3D%22matrix(13.7222%2020.58336%20-17.81255%2011.875%2011.306%209.771)%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20offset%3D%220.177%22%20stop-color%3D%22%23fff%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23B8B8B8%22%3E%3C%2Fstop%3E%3C%2FradialGradient%3E%3C%2Fdefs%3E%3C%2Fsvg%3E'
    },
    maintain_analytics: {
      subtitle: 'Security, Deployment Pipelines & Git',
      icon: 'data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2232%22%20height%3D%2232%22%20fill%3D%22currentColor%22%20role%3D%22img%22%20focusable%3D%22false%22%3E%3Cpath%20fill%3D%22url(%23i7cb92d-a)%22%20fill-rule%3D%22evenodd%22%20d%3D%22m3.148%2021.322-.41%201.501c-.153.48-.367%201.186-.482%201.814a3.94%203.94%200%200%200%203.247%205.313c.554.08%201.181.075%201.884-.028l3.23-.446a2.05%202.05%200%200%200%201.695-1.49l2.223-8.164z%22%20clip-rule%3D%22evenodd%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23i7cb92d-b)%22%20d%3D%22M6.298%2021.71c-3.404.527-4.103%203.096-4.103%203.096l3.26-11.979%2017.035-2.304-2.323%208.438c-.12.452-.5.798-.971.87l-.095.016-12.898%201.879z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23i7cb92d-c)%22%20fill-opacity%3D%220.8%22%20d%3D%22M6.298%2021.71c-3.404.527-4.103%203.096-4.103%203.096l3.26-11.979%2017.035-2.304-2.323%208.438c-.12.452-.5.798-.971.87l-.095.016-12.898%201.879z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23i7cb92d-d)%22%20d%3D%22m8.23%2014.066%2018.86-2.786c.448-.06.811-.39.926-.82l1.946-7.043a1.116%201.116%200%200%200-1.218-1.408L10.75%204.668a5.03%205.03%200%200%200-4.044%203.636L4.11%2017.709c.52-1.902.84-3.05%204.12-3.643%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23i7cb92d-e)%22%20d%3D%22m8.23%2014.066%2018.86-2.786c.448-.06.811-.39.926-.82l1.946-7.043a1.116%201.116%200%200%200-1.218-1.408L10.75%204.668a5.03%205.03%200%200%200-4.044%203.636L4.11%2017.709c.52-1.902.84-3.05%204.12-3.643%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23i7cb92d-f)%22%20fill-opacity%3D%220.4%22%20d%3D%22m8.23%2014.066%2018.86-2.786c.448-.06.811-.39.926-.82l1.946-7.043a1.116%201.116%200%200%200-1.218-1.408L10.75%204.668a5.03%205.03%200%200%200-4.044%203.636L4.11%2017.709c.52-1.902.84-3.05%204.12-3.643%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23i7cb92d-g)%22%20d%3D%22M8.23%2014.066c-2.731.495-3.409%201.374-3.86%202.753l-2.175%207.988s.695-2.543%204.058-3.087L19.1%2019.848l.095-.016c.471-.071.851-.419.972-.87l1.911-6.941-13.85%202.045Z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23i7cb92d-h)%22%20fill-opacity%3D%220.2%22%20d%3D%22M8.23%2014.066c-2.731.495-3.409%201.374-3.86%202.753l-2.175%207.988s.695-2.543%204.058-3.087L19.1%2019.848l.095-.016c.471-.071.851-.419.972-.87l1.911-6.941-13.85%202.045Z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23i7cb92d-i)%22%20fill-rule%3D%22evenodd%22%20d%3D%22M6.253%2021.72c-2.842.46-3.775%202.342-3.997%202.916a3.94%203.94%200%200%200%203.247%205.314c.554.08%201.181.075%201.884-.028l3.23-.446a2.05%202.05%200%200%200%201.695-1.49l2.026-7.443z%22%20clip-rule%3D%22evenodd%22%3E%3C%2Fpath%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22i7cb92d-a%22%20x1%3D%228.268%22%20x2%3D%228.268%22%20y1%3D%2230.005%22%20y2%3D%2219.822%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20offset%3D%220.056%22%20stop-color%3D%22%232AAC94%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.155%22%20stop-color%3D%22%23239C87%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.372%22%20stop-color%3D%22%23177E71%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.588%22%20stop-color%3D%22%230E6961%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.799%22%20stop-color%3D%22%23095D57%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23085954%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22i7cb92d-b%22%20x1%3D%2221.134%22%20x2%3D%2211.302%22%20y1%3D%2222.617%22%20y2%3D%2211.923%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20offset%3D%220.042%22%20stop-color%3D%22%23ABE88E%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.549%22%20stop-color%3D%22%232AAA92%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.906%22%20stop-color%3D%22%23117865%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22i7cb92d-c%22%20x1%3D%22-3.028%22%20x2%3D%226.329%22%20y1%3D%2222.097%22%20y2%3D%2218.906%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%236AD6F9%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%236AD6F9%22%20stop-opacity%3D%220%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22i7cb92d-d%22%20x1%3D%224.11%22%20x2%3D%2229.016%22%20y1%3D%229.855%22%20y2%3D%229.855%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20offset%3D%220.043%22%20stop-color%3D%22%2325FFD4%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.874%22%20stop-color%3D%22%2355DDB9%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22i7cb92d-e%22%20x1%3D%224.11%22%20x2%3D%2226.546%22%20y1%3D%226.373%22%20y2%3D%2216.791%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%236AD6F9%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.23%22%20stop-color%3D%22%2360E9D0%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.651%22%20stop-color%3D%22%236DE9BB%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.994%22%20stop-color%3D%22%23ABE88E%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22i7cb92d-f%22%20x1%3D%226.185%22%20x2%3D%2218.385%22%20y1%3D%228.323%22%20y2%3D%2211.021%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23fff%22%20stop-opacity%3D%220%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.459%22%20stop-color%3D%22%23fff%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23fff%22%20stop-opacity%3D%220%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22i7cb92d-g%22%20x1%3D%2210.23%22%20x2%3D%2210.518%22%20y1%3D%2218.774%22%20y2%3D%2210.219%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20offset%3D%220.205%22%20stop-color%3D%22%23063D3B%22%20stop-opacity%3D%220%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.586%22%20stop-color%3D%22%23063D3B%22%20stop-opacity%3D%220.237%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.872%22%20stop-color%3D%22%23063D3B%22%20stop-opacity%3D%220.75%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22i7cb92d-h%22%20x1%3D%221.166%22%20x2%3D%2211.592%22%20y1%3D%2217.923%22%20y2%3D%2219.884%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23fff%22%20stop-opacity%3D%220%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.459%22%20stop-color%3D%22%23fff%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23fff%22%20stop-opacity%3D%220%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22i7cb92d-i%22%20x1%3D%228.698%22%20x2%3D%226.664%22%20y1%3D%2227.183%22%20y2%3D%2217.238%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20offset%3D%220.064%22%20stop-color%3D%22%23063D3B%22%20stop-opacity%3D%220%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.17%22%20stop-color%3D%22%23063D3B%22%20stop-opacity%3D%220.135%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.562%22%20stop-color%3D%22%23063D3B%22%20stop-opacity%3D%220.599%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.85%22%20stop-color%3D%22%23063D3B%22%20stop-opacity%3D%220.9%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23063D3B%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3C%2Fsvg%3E'
    },
    semantic_models: {
      subtitle: 'Direct Lake & Tabular DAX',
      icon: 'data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2232%22%20height%3D%2232%22%20fill%3D%22currentColor%22%20role%3D%22img%22%20focusable%3D%22false%22%3E%3Cpath%20fill%3D%22url(%23ic35943-a)%22%20d%3D%22M3%206.5A3.5%203.5%200%200%201%206.5%203h19A3.5%203.5%200%200%201%2029%206.5v19a3.5%203.5%200%200%201-3.5%203.5h-19A3.5%203.5%200%200%201%203%2025.5z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23ic35943-b)%22%20fill-opacity%3D%220.2%22%20d%3D%22M3%206.5A3.5%203.5%200%200%201%206.5%203h19A3.5%203.5%200%200%201%2029%206.5v19a3.5%203.5%200%200%201-3.5%203.5h-19A3.5%203.5%200%200%201%203%2025.5z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23ic35943-c)%22%20fill-rule%3D%22evenodd%22%20d%3D%22M25.5%204h-19A2.5%202.5%200%200%200%204%206.5v19A2.5%202.5%200%200%200%206.5%2028h19a2.5%202.5%200%200%200%202.5-2.5v-19A2.5%202.5%200%200%200%2025.5%204m-19-1A3.5%203.5%200%200%200%203%206.5v19A3.5%203.5%200%200%200%206.5%2029h19a3.5%203.5%200%200%200%203.5-3.5v-19A3.5%203.5%200%200%200%2025.5%203z%22%20clip-rule%3D%22evenodd%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23ic35943-d)%22%20d%3D%22M9.75%2014.5a1.75%201.75%200%201%200%200-3.5%201.75%201.75%200%200%200%200%203.5%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23ic35943-e)%22%20d%3D%22M16%2014.5a1.75%201.75%200%201%200%200-3.5%201.75%201.75%200%200%200%200%203.5%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23ic35943-f)%22%20d%3D%22M11.5%2019.25a1.75%201.75%200%201%201-3.5%200%201.75%201.75%200%200%201%203.5%200%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23ic35943-g)%22%20d%3D%22M16%2021a1.75%201.75%200%201%200%200-3.5%201.75%201.75%200%200%200%200%203.5%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23ic35943-h)%22%20d%3D%22M24%2012.75a1.75%201.75%200%201%201-3.5%200%201.75%201.75%200%200%201%203.5%200%22%3E%3C%2Fpath%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22ic35943-a%22%20x1%3D%2210.222%22%20x2%3D%2213.511%22%20y1%3D%223%22%20y2%3D%2229.311%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23fff%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23EBEBEB%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22ic35943-c%22%20x1%3D%2211.396%22%20x2%3D%2214.897%22%20y1%3D%223%22%20y2%3D%2229.256%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23BBB%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23888%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22ic35943-d%22%20x1%3D%228%22%20x2%3D%2216.989%22%20y1%3D%2211%22%20y2%3D%2225.382%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%237751B8%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%235A409C%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22ic35943-e%22%20x1%3D%228%22%20x2%3D%2216.989%22%20y1%3D%2211%22%20y2%3D%2225.382%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%237751B8%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%235A409C%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22ic35943-f%22%20x1%3D%228%22%20x2%3D%2216.989%22%20y1%3D%2211%22%20y2%3D%2225.382%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%237751B8%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%235A409C%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22ic35943-g%22%20x1%3D%228%22%20x2%3D%2216.989%22%20y1%3D%2211%22%20y2%3D%2225.382%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%237751B8%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%235A409C%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22ic35943-h%22%20x1%3D%228%22%20x2%3D%2216.989%22%20y1%3D%2211%22%20y2%3D%2225.382%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%237751B8%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%235A409C%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3CradialGradient%20id%3D%22ic35943-b%22%20cx%3D%220%22%20cy%3D%220%22%20r%3D%221%22%20gradientTransform%3D%22matrix(13.7222%2020.58336%20-17.81255%2011.875%2011.306%209.771)%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20offset%3D%220.177%22%20stop-color%3D%22%23fff%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23B8B8B8%22%3E%3C%2Fstop%3E%3C%2FradialGradient%3E%3C%2Fdefs%3E%3C%2Fsvg%3E'
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
        <div data-testid="practice-summary" className="md:col-span-5 bg-surface border border-border rounded-xl shadow-card p-6 flex flex-col justify-between gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img src="data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2232%22%20height%3D%2232%22%20fill%3D%22currentColor%22%20role%3D%22img%22%20focusable%3D%22false%22%3E%3Cpath%20fill%3D%22url(%23i7cb92d-a)%22%20fill-rule%3D%22evenodd%22%20d%3D%22m3.148%2021.322-.41%201.501c-.153.48-.367%201.186-.482%201.814a3.94%203.94%200%200%200%203.247%205.313c.554.08%201.181.075%201.884-.028l3.23-.446a2.05%202.05%200%200%200%201.695-1.49l2.223-8.164z%22%20clip-rule%3D%22evenodd%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23i7cb92d-b)%22%20d%3D%22M6.298%2021.71c-3.404.527-4.103%203.096-4.103%203.096l3.26-11.979%2017.035-2.304-2.323%208.438c-.12.452-.5.798-.971.87l-.095.016-12.898%201.879z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23i7cb92d-c)%22%20fill-opacity%3D%220.8%22%20d%3D%22M6.298%2021.71c-3.404.527-4.103%203.096-4.103%203.096l3.26-11.979%2017.035-2.304-2.323%208.438c-.12.452-.5.798-.971.87l-.095.016-12.898%201.879z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23i7cb92d-d)%22%20d%3D%22m8.23%2014.066%2018.86-2.786c.448-.06.811-.39.926-.82l1.946-7.043a1.116%201.116%200%200%200-1.218-1.408L10.75%204.668a5.03%205.03%200%200%200-4.044%203.636L4.11%2017.709c.52-1.902.84-3.05%204.12-3.643%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23i7cb92d-e)%22%20d%3D%22m8.23%2014.066%2018.86-2.786c.448-.06.811-.39.926-.82l1.946-7.043a1.116%201.116%200%200%200-1.218-1.408L10.75%204.668a5.03%205.03%200%200%200-4.044%203.636L4.11%2017.709c.52-1.902.84-3.05%204.12-3.643%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23i7cb92d-f)%22%20fill-opacity%3D%220.4%22%20d%3D%22m8.23%2014.066%2018.86-2.786c.448-.06.811-.39.926-.82l1.946-7.043a1.116%201.116%200%200%200-1.218-1.408L10.75%204.668a5.03%205.03%200%200%200-4.044%203.636L4.11%2017.709c.52-1.902.84-3.05%204.12-3.643%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23i7cb92d-g)%22%20d%3D%22M8.23%2014.066c-2.731.495-3.409%201.374-3.86%202.753l-2.175%207.988s.695-2.543%204.058-3.087L19.1%2019.848l.095-.016c.471-.071.851-.419.972-.87l1.911-6.941-13.85%202.045Z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23i7cb92d-h)%22%20fill-opacity%3D%220.2%22%20d%3D%22M8.23%2014.066c-2.731.495-3.409%201.374-3.86%202.753l-2.175%207.988s.695-2.543%204.058-3.087L19.1%2019.848l.095-.016c.471-.071.851-.419.972-.87l1.911-6.941-13.85%202.045Z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23i7cb92d-i)%22%20fill-rule%3D%22evenodd%22%20d%3D%22M6.253%2021.72c-2.842.46-3.775%202.342-3.997%202.916a3.94%203.94%200%200%200%203.247%205.314c.554.08%201.181.075%201.884-.028l3.23-.446a2.05%202.05%200%200%200%201.695-1.49l2.026-7.443z%22%20clip-rule%3D%22evenodd%22%3E%3C%2Fpath%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22i7cb92d-a%22%20x1%3D%228.268%22%20x2%3D%228.268%22%20y1%3D%2230.005%22%20y2%3D%2219.822%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20offset%3D%220.056%22%20stop-color%3D%22%232AAC94%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.155%22%20stop-color%3D%22%23239C87%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.372%22%20stop-color%3D%22%23177E71%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.588%22%20stop-color%3D%22%230E6961%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.799%22%20stop-color%3D%22%23095D57%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23085954%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22i7cb92d-b%22%20x1%3D%2221.134%22%20x2%3D%2211.302%22%20y1%3D%2222.617%22%20y2%3D%2211.923%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20offset%3D%220.042%22%20stop-color%3D%22%23ABE88E%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.549%22%20stop-color%3D%22%232AAA92%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.906%22%20stop-color%3D%22%23117865%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22i7cb92d-c%22%20x1%3D%22-3.028%22%20x2%3D%226.329%22%20y1%3D%2222.097%22%20y2%3D%2218.906%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%236AD6F9%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%236AD6F9%22%20stop-opacity%3D%220%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22i7cb92d-d%22%20x1%3D%224.11%22%20x2%3D%2229.016%22%20y1%3D%229.855%22%20y2%3D%229.855%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20offset%3D%220.043%22%20stop-color%3D%22%2325FFD4%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.874%22%20stop-color%3D%22%2355DDB9%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22i7cb92d-e%22%20x1%3D%224.11%22%20x2%3D%2226.546%22%20y1%3D%226.373%22%20y2%3D%2216.791%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%236AD6F9%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.23%22%20stop-color%3D%22%2360E9D0%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.651%22%20stop-color%3D%22%236DE9BB%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.994%22%20stop-color%3D%22%23ABE88E%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22i7cb92d-f%22%20x1%3D%226.185%22%20x2%3D%2218.385%22%20y1%3D%228.323%22%20y2%3D%2211.021%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23fff%22%20stop-opacity%3D%220%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.459%22%20stop-color%3D%22%23fff%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23fff%22%20stop-opacity%3D%220%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22i7cb92d-g%22%20x1%3D%2210.23%22%20x2%3D%2210.518%22%20y1%3D%2218.774%22%20y2%3D%2210.219%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20offset%3D%220.205%22%20stop-color%3D%22%23063D3B%22%20stop-opacity%3D%220%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.586%22%20stop-color%3D%22%23063D3B%22%20stop-opacity%3D%220.237%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.872%22%20stop-color%3D%22%23063D3B%22%20stop-opacity%3D%220.75%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22i7cb92d-h%22%20x1%3D%221.166%22%20x2%3D%2211.592%22%20y1%3D%2217.923%22%20y2%3D%2219.884%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23fff%22%20stop-opacity%3D%220%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.459%22%20stop-color%3D%22%23fff%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23fff%22%20stop-opacity%3D%220%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22i7cb92d-i%22%20x1%3D%228.698%22%20x2%3D%226.664%22%20y1%3D%2227.183%22%20y2%3D%2217.238%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20offset%3D%220.064%22%20stop-color%3D%22%23063D3B%22%20stop-opacity%3D%220%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.17%22%20stop-color%3D%22%23063D3B%22%20stop-opacity%3D%220.135%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.562%22%20stop-color%3D%22%23063D3B%22%20stop-opacity%3D%220.599%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.85%22%20stop-color%3D%22%23063D3B%22%20stop-opacity%3D%220.9%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23063D3B%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3C%2Fsvg%3E" alt="Fabric" className="w-4 h-4 object-contain" />
                <span className="font-mono text-xs text-muted tracking-widest font-bold">
                  Practice Accuracy
                </span>
              </div>
              <span className="font-mono text-xs text-muted2">
                Attempted incidents only
              </span>
            </div>

            <div className="flex items-baseline gap-3 pt-1">
              <span className="font-display text-5xl font-bold text-tx leading-none">
                {scoreDisplay}
                <span className="text-2xl text-muted font-normal">%</span>
              </span>
              <span className="font-mono text-xs text-muted2">
                {totalAttempted} attempted incident{totalAttempted === 1 ? '' : 's'}
              </span>
            </div>

            <div className="flex items-center justify-between font-mono text-[11px] pt-2">
              <span className="text-muted font-bold">Assessment Coverage</span>
              <span className="text-tx font-semibold">
                <span>{coveragePercent}% · </span>
                <span>{totalAttempted} of {totalScenarios} Triaged</span>
              </span>
            </div>
            <div className="h-2 rounded-full bg-surface2 border border-border overflow-hidden w-full mt-2">
              <div
                className="h-full rounded-full transition-all duration-500 bg-accent"
                style={{ width: `${coveragePercent}%` }}
              />
            </div>
          </div>

          <div className="flex items-center justify-between font-mono text-[11px] text-muted pt-3 border-t border-border">
            <span>Official DP-600 skill ranges</span>
            <span className="text-tx font-semibold">45-50% / 25-30% / 25-30%</span>
          </div>
        </div>

        <div className="md:col-span-7 bg-surface border border-border rounded-xl shadow-card p-6 flex flex-col justify-between gap-4">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-muted uppercase tracking-widest font-bold">
                Calibration Signals
              </span>
              <span className="font-mono text-[11px] text-muted2">
                Confidence vs Determinism
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div data-calibration-signal="strong_signal" data-count={strongSignalCount} className="p-3 rounded-lg border border-border bg-surface2/30 flex flex-col gap-1.5">
                <div className="flex items-center gap-1.5 font-mono text-[11px] text-success font-bold">
                  <CheckCircle2 size={12} color="rgb(var(--success))" />
                  <span>Strong</span>
                </div>
                <span className="font-display text-2xl font-bold text-success leading-none">
                  {strongSignalCount}
                </span>
                <span className="font-mono text-[10px] text-muted2">Certain &amp; Correct</span>
              </div>

              <div data-calibration-signal="solid_understanding" data-count={solidUnderstandingCount} className="p-3 rounded-lg border border-border bg-surface2/30 flex flex-col gap-1.5">
                <div className="flex items-center gap-1.5 font-mono text-[11px] text-success font-bold">
                  <CheckCircle2 size={12} color="rgb(var(--success))" />
                  <span>Solid</span>
                </div>
                <span className="font-display text-2xl font-bold text-tx leading-none">
                  {solidUnderstandingCount}
                </span>
                <span className="font-mono text-[10px] text-muted2">Probable &amp; Correct</span>
              </div>

              <div data-calibration-signal="lucky_hit" data-count={luckyHitCount} className="p-3 rounded-lg border border-border bg-surface2/30 flex flex-col gap-1.5">
                <div className="flex items-center gap-1.5 font-mono text-[11px] text-accent font-bold">
                  <Sparkles size={12} color="rgb(var(--accent))" />
                  <span>Lucky</span>
                </div>
                <span className="font-display text-2xl font-bold text-tx leading-none">
                  {luckyHitCount}
                </span>
                <span className="font-mono text-[10px] text-muted2">Guessed &amp; Correct</span>
              </div>

              <div data-calibration-signal="dangerous_misconception" data-count={dangerousMisconceptionCount} className={`p-3 rounded-lg border flex flex-col gap-1.5 ${
                dangerousMisconceptionCount > 0 
                  ? 'border-danger/50 bg-danger/10 text-danger' 
                  : 'border-border bg-surface2/30'
              }`}>
                <div className="flex items-center gap-1.5 font-mono text-[11px] font-bold text-danger">
                  <AlertOctagon size={12} color={dangerousMisconceptionCount > 0 ? 'rgb(var(--danger))' : undefined} />
                  <span>Misconception</span>
                </div>
                <span className={`font-display text-2xl font-bold leading-none ${
                  dangerousMisconceptionCount > 0 ? 'text-danger' : 'text-tx'
                }`}>
                  {dangerousMisconceptionCount}
                </span>
                <span className="font-mono text-[10px] text-muted2">Certain &amp; Wrong</span>
              </div>

              <div data-calibration-signal="needs_review" data-count={needsReviewCount} className="p-3 rounded-lg border border-border bg-surface2/30 flex flex-col gap-1.5">
                <div className="flex items-center gap-1.5 font-mono text-[11px] text-accent font-bold">
                  <HelpCircle size={12} color="rgb(var(--accent))" />
                  <span>Review</span>
                </div>
                <span className="font-display text-2xl font-bold text-tx leading-none">
                  {needsReviewCount}
                </span>
                <span className="font-mono text-[10px] text-muted2">Probable &amp; Wrong</span>
              </div>

              <div data-calibration-signal="knowledge_gap" data-count={knowledgeGapCount} className="p-3 rounded-lg border border-border bg-surface2/30 flex flex-col gap-1.5">
                <div className="flex items-center gap-1.5 font-mono text-[11px] text-muted font-bold">
                  <HelpCircle size={12} />
                  <span>Gap</span>
                </div>
                <span className="font-display text-2xl font-bold text-tx leading-none">
                  {knowledgeGapCount}
                </span>
                <span className="font-mono text-[10px] text-muted2">Guessed &amp; Wrong</span>
              </div>
            </div>
          </div>

          {weakSpotCount > 0 && (
            <button
              onClick={startWeakSpotsTriage}
              className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-danger/10 text-danger border border-danger/30 font-mono text-xs font-bold hover:bg-danger/15 transition-all cursor-pointer"
            >
              <Flame size={12} />
              <span>Review {weakSpotCount} Calibration Weak Spot(s) →</span>
            </button>
          )}
        </div>
      </div>

      <div className="bg-surface border border-border rounded-xl shadow-card p-5 flex flex-col gap-3">
        <span className="font-mono text-xs text-muted uppercase tracking-widest font-bold">
          By Topic Mastery
        </span>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {(['prepare_data', 'maintain_analytics', 'semantic_models'] as DomainKey[]).map(dKey => {
            const d = DOMAIN_DETAILS[dKey];
            const meta = DOMAINS[dKey];
            const stats = domainStats[dKey];
            const hasAttempted = stats.attemptedCount > 0;
            const passPercent = hasAttempted ? Math.round((stats.correctCount / stats.attemptedCount) * 100) : null;

            return (
              <div
                key={dKey}
                data-testid={`domain-${dKey}`}
                className="p-3.5 rounded-lg border border-border bg-surface2/30 flex flex-col justify-between gap-2.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img src={d.icon} alt={meta.title} className="w-4 h-4 object-contain" />
                    <span className="font-sans text-xs font-bold text-tx truncate">
                      {meta.title}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-muted px-1.5 py-0.5 rounded bg-surface border border-border">
                    {meta.examWeightRange}
                  </span>
                </div>

                <div className="flex items-center justify-between font-mono text-[11px]">
                  <span className="text-muted2">
                    {stats.attemptedCount}/{stats.totalIncidents} triaged
                  </span>
                  <span className={`font-bold ${
                    passPercent !== null
                      ? passPercent >= 75 ? 'text-success' : passPercent >= 50 ? 'text-accent' : 'text-danger'
                      : 'text-muted2'
                  }`}>
                    {passPercent !== null ? `${passPercent}%` : '0%'}
                  </span>
                </div>

                <div className="h-1.5 rounded-full bg-surface2 border border-border overflow-hidden w-full">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      passPercent !== null && passPercent >= 75 ? 'bg-success' : 'bg-accent'
                    }`}
                    style={{ width: `${passPercent || 0}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
