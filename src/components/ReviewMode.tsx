import React from 'react';
import { useTriage } from '../context/TriageContext.tsx';
import { generateStudyPlanMarkdown } from '../utils/misconception.ts';
import type { Scenario } from '../types/scenario.ts';
import { ArrowLeft, ArrowRight, HelpCircle, Sparkles, CheckCircle2 } from './icons/index.tsx';
import { getReporterAvatar } from '../utils/avatars.ts';

export function ReviewMode() {
  const { 
    scenarios,
    latestAttempts,
    dangerousMisconceptions, 
    knowledgeGaps, 
    needsReviewScenarios, 
    luckyHits, 
    unattemptedScenarios,
    navigateToIncident, 
    navigateToDashboard,
    overallReadiness
  } = useTriage();

  const isAllCompleted = overallReadiness.assessmentComplete;

  const getDomainIcon = (domain: string) => {
    switch (domain) {
      case 'prepare_data':
        return 'data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2232%22%20height%3D%2232%22%20fill%3D%22currentColor%22%20role%3D%22img%22%20focusable%3D%22false%22%3E%3Cpath%20fill%3D%22url(%23idca273-a)%22%20d%3D%22M3%206.5A3.5%203.5%200%200%201%206.5%203h19A3.5%203.5%200%200%201%2029%206.5v19a3.5%203.5%200%200%201-3.5%203.5h-19A3.5%203.5%200%200%201%203%2025.5z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23idca273-b)%22%20fill-opacity%3D%220.2%22%20d%3D%22M3%206.5A3.5%203.5%200%200%201%206.5%203h19A3.5%203.5%200%200%201%2029%206.5v19a3.5%203.5%200%200%201-3.5%203.5h-19A3.5%203.5%200%200%201%203%2025.5z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23idca273-c)%22%20fill-rule%3D%22evenodd%22%20d%3D%22M25.5%204h-19A2.5%202.5%200%200%200%204%206.5v19A2.5%202.5%200%200%200%206.5%2028h19a2.5%202.5%200%200%200%202.5-2.5v-19A2.5%202.5%200%200%200%2025.5%204m-19-1A3.5%203.5%200%200%200%203%206.5v19A3.5%203.5%200%200%200%206.5%2029h19a3.5%203.5%200%200%200%203.5-3.5v-19A3.5%203.5%200%200%200%2025.5%203z%22%20clip-rule%3D%22evenodd%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23idca273-d)%22%20d%3D%22M15%2011.5a2.5%202.5%200%200%201-2%202.45V16h4.5a1.5%201.5%200%200%200%201.5-1.5v-.55a2.5%202.5%200%201%201%201%200v.55a2.5%202.5%200%200%201-2.5%202.5H13v1.05a2.5%202.5%200%201%201-2.294.709v-.056h.056A2.5%202.5%200%200%201%2012%2018.05v-4.1a2.5%202.5%200%200%201-1.294-4.191v-.023h.022A2.5%202.5%200%200%201%2015%2011.5%22%3E%3C%2Fpath%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22idca273-a%22%20x1%3D%2210.222%22%20x2%3D%2213.511%22%20y1%3D%223%22%20y2%3D%2229.311%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23fff%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23EBEBEB%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22idca273-c%22%20x1%3D%2211.396%22%20x2%3D%2214.897%22%20y1%3D%223%22%20y2%3D%2229.256%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23BBB%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23888%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22idca273-d%22%20x1%3D%2210%22%20x2%3D%2223.835%22%20y1%3D%229%22%20y2%3D%2220.859%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%234BA446%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%233F7D35%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3CradialGradient%20id%3D%22idca273-b%22%20cx%3D%220%22%20cy%3D%220%22%20r%3D%221%22%20gradientTransform%3D%22matrix(13.7222%2020.58336%20-17.81255%2011.875%2011.306%209.771)%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20offset%3D%220.177%22%20stop-color%3D%22%23fff%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23B8B8B8%22%3E%3C%2Fstop%3E%3C%2FradialGradient%3E%3C%2Fdefs%3E%3C%2Fsvg%3E';
      case 'maintain_analytics':
        return 'data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2232%22%20height%3D%2232%22%20fill%3D%22currentColor%22%20role%3D%22img%22%20focusable%3D%22false%22%3E%3Cpath%20fill%3D%22url(%23i7cb92d-a)%22%20fill-rule%3D%22evenodd%22%20d%3D%22m3.148%2021.322-.41%201.501c-.153.48-.367%201.186-.482%201.814a3.94%203.94%200%200%200%203.247%205.313c.554.08%201.181.075%201.884-.028l3.23-.446a2.05%202.05%200%200%200%201.695-1.49l2.223-8.164z%22%20clip-rule%3D%22evenodd%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23i7cb92d-b)%22%20d%3D%22M6.298%2021.71c-3.404.527-4.103%203.096-4.103%203.096l3.26-11.979%2017.035-2.304-2.323%208.438c-.12.452-.5.798-.971.87l-.095.016-12.898%201.879z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23i7cb92d-c)%22%20fill-opacity%3D%220.8%22%20d%3D%22M6.298%2021.71c-3.404.527-4.103%203.096-4.103%203.096l3.26-11.979%2017.035-2.304-2.323%208.438c-.12.452-.5.798-.971.87l-.095.016-12.898%201.879z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23i7cb92d-d)%22%20d%3D%22m8.23%2014.066%2018.86-2.786c.448-.06.811-.39.926-.82l1.946-7.043a1.116%201.116%200%200%200-1.218-1.408L10.75%204.668a5.03%205.03%200%200%200-4.044%203.636L4.11%2017.709c.52-1.902.84-3.05%204.12-3.643%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23i7cb92d-e)%22%20d%3D%22m8.23%2014.066%2018.86-2.786c.448-.06.811-.39.926-.82l1.946-7.043a1.116%201.116%200%200%200-1.218-1.408L10.75%204.668a5.03%205.03%200%200%200-4.044%203.636L4.11%2017.709c.52-1.902.84-3.05%204.12-3.643%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23i7cb92d-f)%22%20fill-opacity%3D%220.4%22%20d%3D%22m8.23%2014.066%2018.86-2.786c.448-.06.811-.39.926-.82l1.946-7.043a1.116%201.116%200%200%200-1.218-1.408L10.75%204.668a5.03%205.03%200%200%200-4.044%203.636L4.11%2017.709c.52-1.902.84-3.05%204.12-3.643%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23i7cb92d-g)%22%20d%3D%22M8.23%2014.066c-2.731.495-3.409%201.374-3.86%202.753l-2.175%207.988s.695-2.543%204.058-3.087L19.1%2019.848l.095-.016c.471-.071.851-.419.972-.87l1.911-6.941-13.85%202.045Z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23i7cb92d-h)%22%20fill-opacity%3D%220.2%22%20d%3D%22M8.23%2014.066c-2.731.495-3.409%201.374-3.86%202.753l-2.175%207.988s.695-2.543%204.058-3.087L19.1%2019.848l.095-.016c.471-.071.851-.419.972-.87l1.911-6.941-13.85%202.045Z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23i7cb92d-i)%22%20fill-rule%3D%22evenodd%22%20d%3D%22M6.253%2021.72c-2.842.46-3.775%202.342-3.997%202.916a3.94%203.94%200%200%200%203.247%205.314c.554.08%201.181.075%201.884-.028l3.23-.446a2.05%202.05%200%200%200%201.695-1.49l2.026-7.443z%22%20clip-rule%3D%22evenodd%22%3E%3C%2Fpath%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22i7cb92d-a%22%20x1%3D%228.268%22%20x2%3D%228.268%22%20y1%3D%2230.005%22%20y2%3D%2219.822%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20offset%3D%220.056%22%20stop-color%3D%22%232AAC94%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.155%22%20stop-color%3D%22%23239C87%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.372%22%20stop-color%3D%22%23177E71%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.588%22%20stop-color%3D%22%230E6961%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.799%22%20stop-color%3D%22%23095D57%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23085954%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22i7cb92d-b%22%20x1%3D%2221.134%22%20x2%3D%2211.302%22%20y1%3D%2222.617%22%20y2%3D%2211.923%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20offset%3D%220.042%22%20stop-color%3D%22%23ABE88E%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.549%22%20stop-color%3D%22%232AAA92%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.906%22%20stop-color%3D%22%23117865%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22i7cb92d-c%22%20x1%3D%22-3.028%22%20x2%3D%226.329%22%20y1%3D%2222.097%22%20y2%3D%2218.906%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%236AD6F9%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%236AD6F9%22%20stop-opacity%3D%220%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22i7cb92d-d%22%20x1%3D%224.11%22%20x2%3D%2229.016%22%20y1%3D%229.855%22%20y2%3D%229.855%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20offset%3D%220.043%22%20stop-color%3D%22%2325FFD4%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.874%22%20stop-color%3D%22%2355DDB9%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22i7cb92d-e%22%20x1%3D%224.11%22%20x2%3D%2226.546%22%20y1%3D%226.373%22%20y2%3D%2216.791%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%236AD6F9%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.23%22%20stop-color%3D%22%2360E9D0%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.651%22%20stop-color%3D%22%236DE9BB%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.994%22%20stop-color%3D%22%23ABE88E%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22i7cb92d-f%22%20x1%3D%226.185%22%20x2%3D%2218.385%22%20y1%3D%228.323%22%20y2%3D%2211.021%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23fff%22%20stop-opacity%3D%220%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.459%22%20stop-color%3D%22%23fff%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23fff%22%20stop-opacity%3D%220%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22i7cb92d-g%22%20x1%3D%2210.23%22%20x2%3D%2210.518%22%20y1%3D%2218.774%22%20y2%3D%2210.219%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20offset%3D%220.205%22%20stop-color%3D%22%23063D3B%22%20stop-opacity%3D%220%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.586%22%20stop-color%3D%22%23063D3B%22%20stop-opacity%3D%220.237%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.872%22%20stop-color%3D%22%23063D3B%22%20stop-opacity%3D%220.75%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22i7cb92d-h%22%20x1%3D%221.166%22%20x2%3D%2211.592%22%20y1%3D%2217.923%22%20y2%3D%2219.884%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23fff%22%20stop-opacity%3D%220%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.459%22%20stop-color%3D%22%23fff%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23fff%22%20stop-opacity%3D%220%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22i7cb92d-i%22%20x1%3D%228.698%22%20x2%3D%226.664%22%20y1%3D%2227.183%22%20y2%3D%2217.238%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20offset%3D%220.064%22%20stop-color%3D%22%23063D3B%22%20stop-opacity%3D%220%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.17%22%20stop-color%3D%22%23063D3B%22%20stop-opacity%3D%220.135%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.562%22%20stop-color%3D%22%23063D3B%22%20stop-opacity%3D%220.599%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.85%22%20stop-color%3D%22%23063D3B%22%20stop-opacity%3D%220.9%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23063D3B%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3C%2Fsvg%3E';
      case 'semantic_models':
        return 'data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2232%22%20height%3D%2232%22%20fill%3D%22currentColor%22%20role%3D%22img%22%20focusable%3D%22false%22%3E%3Cpath%20fill%3D%22url(%23ic35943-a)%22%20d%3D%22M3%206.5A3.5%203.5%200%200%201%206.5%203h19A3.5%203.5%200%200%201%2029%206.5v19a3.5%203.5%200%200%201-3.5%203.5h-19A3.5%203.5%200%200%201%203%2025.5z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23ic35943-b)%22%20fill-opacity%3D%220.2%22%20d%3D%22M3%206.5A3.5%203.5%200%200%201%206.5%203h19A3.5%203.5%200%200%201%2029%206.5v19a3.5%203.5%200%200%201-3.5%203.5h-19A3.5%203.5%200%200%201%203%2025.5z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23ic35943-c)%22%20fill-rule%3D%22evenodd%22%20d%3D%22M25.5%204h-19A2.5%202.5%200%200%200%204%206.5v19A2.5%202.5%200%200%200%206.5%2028h19a2.5%202.5%200%200%200%202.5-2.5v-19A2.5%202.5%200%200%200%2025.5%204m-19-1A3.5%203.5%200%200%200%203%206.5v19A3.5%203.5%200%200%200%206.5%2029h19a3.5%203.5%200%200%200%203.5-3.5v-19A3.5%203.5%200%200%200%2025.5%203z%22%20clip-rule%3D%22evenodd%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23ic35943-d)%22%20d%3D%22M9.75%2014.5a1.75%201.75%200%201%200%200-3.5%201.75%201.75%200%200%200%200%203.5%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23ic35943-e)%22%20d%3D%22M16%2014.5a1.75%201.75%200%201%200%200-3.5%201.75%201.75%200%200%200%200%203.5%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23ic35943-f)%22%20d%3D%22M11.5%2019.25a1.75%201.75%200%201%201-3.5%200%201.75%201.75%200%200%201%203.5%200%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23ic35943-g)%22%20d%3D%22M16%2021a1.75%201.75%200%201%200%200-3.5%201.75%201.75%200%200%200%200%203.5%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23ic35943-h)%22%20d%3D%22M24%2012.75a1.75%201.75%200%201%201-3.5%200%201.75%201.75%200%200%201%203.5%200%22%3E%3C%2Fpath%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22ic35943-a%22%20x1%3D%2210.222%22%20x2%3D%2213.511%22%20y1%3D%223%22%20y2%3D%2229.311%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23fff%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23EBEBEB%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22ic35943-c%22%20x1%3D%2211.396%22%20x2%3D%2214.897%22%20y1%3D%223%22%20y2%3D%2229.256%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23BBB%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23888%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22ic35943-d%22%20x1%3D%228%22%20x2%3D%2216.989%22%20y1%3D%2211%22%20y2%3D%2225.382%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%237751B8%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%235A409C%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22ic35943-e%22%20x1%3D%228%22%20x2%3D%2216.989%22%20y1%3D%2211%22%20y2%3D%2225.382%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%237751B8%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%235A409C%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22ic35943-f%22%20x1%3D%228%22%20x2%3D%2216.989%22%20y1%3D%2211%22%20y2%3D%2225.382%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%237751B8%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%235A409C%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22ic35943-g%22%20x1%3D%228%22%20x2%3D%2216.989%22%20y1%3D%2211%22%20y2%3D%2225.382%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%237751B8%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%235A409C%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22ic35943-h%22%20x1%3D%228%22%20x2%3D%2216.989%22%20y1%3D%2211%22%20y2%3D%2225.382%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%237751B8%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%235A409C%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3CradialGradient%20id%3D%22ic35943-b%22%20cx%3D%220%22%20cy%3D%220%22%20r%3D%221%22%20gradientTransform%3D%22matrix(13.7222%2020.58336%20-17.81255%2011.875%2011.306%209.771)%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20offset%3D%220.177%22%20stop-color%3D%22%23fff%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23B8B8B8%22%3E%3C%2Fstop%3E%3C%2FradialGradient%3E%3C%2Fdefs%3E%3C%2Fsvg%3E';
      default:
        return 'data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2232%22%20height%3D%2232%22%20fill%3D%22currentColor%22%20role%3D%22img%22%20focusable%3D%22false%22%3E%3Cpath%20fill%3D%22url(%23i7cb92d-a)%22%20fill-rule%3D%22evenodd%22%20d%3D%22m3.148%2021.322-.41%201.501c-.153.48-.367%201.186-.482%201.814a3.94%203.94%200%200%200%203.247%205.313c.554.08%201.181.075%201.884-.028l3.23-.446a2.05%202.05%200%200%200%201.695-1.49l2.223-8.164z%22%20clip-rule%3D%22evenodd%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23i7cb92d-b)%22%20d%3D%22M6.298%2021.71c-3.404.527-4.103%203.096-4.103%203.096l3.26-11.979%2017.035-2.304-2.323%208.438c-.12.452-.5.798-.971.87l-.095.016-12.898%201.879z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23i7cb92d-c)%22%20fill-opacity%3D%220.8%22%20d%3D%22M6.298%2021.71c-3.404.527-4.103%203.096-4.103%203.096l3.26-11.979%2017.035-2.304-2.323%208.438c-.12.452-.5.798-.971.87l-.095.016-12.898%201.879z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23i7cb92d-d)%22%20d%3D%22m8.23%2014.066%2018.86-2.786c.448-.06.811-.39.926-.82l1.946-7.043a1.116%201.116%200%200%200-1.218-1.408L10.75%204.668a5.03%205.03%200%200%200-4.044%203.636L4.11%2017.709c.52-1.902.84-3.05%204.12-3.643%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23i7cb92d-e)%22%20d%3D%22m8.23%2014.066%2018.86-2.786c.448-.06.811-.39.926-.82l1.946-7.043a1.116%201.116%200%200%200-1.218-1.408L10.75%204.668a5.03%205.03%200%200%200-4.044%203.636L4.11%2017.709c.52-1.902.84-3.05%204.12-3.643%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23i7cb92d-f)%22%20fill-opacity%3D%220.4%22%20d%3D%22m8.23%2014.066%2018.86-2.786c.448-.06.811-.39.926-.82l1.946-7.043a1.116%201.116%200%200%200-1.218-1.408L10.75%204.668a5.03%205.03%200%200%200-4.044%203.636L4.11%2017.709c.52-1.902.84-3.05%204.12-3.643%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23i7cb92d-g)%22%20d%3D%22M8.23%2014.066c-2.731.495-3.409%201.374-3.86%202.753l-2.175%207.988s.695-2.543%204.058-3.087L19.1%2019.848l.095-.016c.471-.071.851-.419.972-.87l1.911-6.941-13.85%202.045Z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23i7cb92d-h)%22%20fill-opacity%3D%220.2%22%20d%3D%22M8.23%2014.066c-2.731.495-3.409%201.374-3.86%202.753l-2.175%207.988s.695-2.543%204.058-3.087L19.1%2019.848l.095-.016c.471-.071.851-.419.972-.87l1.911-6.941-13.85%202.045Z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23i7cb92d-i)%22%20fill-rule%3D%22evenodd%22%20d%3D%22M6.253%2021.72c-2.842.46-3.775%202.342-3.997%202.916a3.94%203.94%200%200%200%203.247%205.314c.554.08%201.181.075%201.884-.028l3.23-.446a2.05%202.05%200%200%200%201.695-1.49l2.026-7.443z%22%20clip-rule%3D%22evenodd%22%3E%3C%2Fpath%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22i7cb92d-a%22%20x1%3D%228.268%22%20x2%3D%228.268%22%20y1%3D%2230.005%22%20y2%3D%2219.822%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20offset%3D%220.056%22%20stop-color%3D%22%232AAC94%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.155%22%20stop-color%3D%22%23239C87%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.372%22%20stop-color%3D%22%23177E71%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.588%22%20stop-color%3D%22%230E6961%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.799%22%20stop-color%3D%22%23095D57%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23085954%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22i7cb92d-b%22%20x1%3D%2221.134%22%20x2%3D%2211.302%22%20y1%3D%2222.617%22%20y2%3D%2211.923%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20offset%3D%220.042%22%20stop-color%3D%22%23ABE88E%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.549%22%20stop-color%3D%22%232AAA92%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.906%22%20stop-color%3D%22%23117865%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22i7cb92d-c%22%20x1%3D%22-3.028%22%20x2%3D%226.329%22%20y1%3D%2222.097%22%20y2%3D%2218.906%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%236AD6F9%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%236AD6F9%22%20stop-opacity%3D%220%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22i7cb92d-d%22%20x1%3D%224.11%22%20x2%3D%2229.016%22%20y1%3D%229.855%22%20y2%3D%229.855%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20offset%3D%220.043%22%20stop-color%3D%22%2325FFD4%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.874%22%20stop-color%3D%22%2355DDB9%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22i7cb92d-e%22%20x1%3D%224.11%22%20x2%3D%2226.546%22%20y1%3D%226.373%22%20y2%3D%2216.791%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%236AD6F9%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.23%22%20stop-color%3D%22%2360E9D0%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.651%22%20stop-color%3D%22%236DE9BB%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.994%22%20stop-color%3D%22%23ABE88E%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22i7cb92d-f%22%20x1%3D%226.185%22%20x2%3D%2218.385%22%20y1%3D%228.323%22%20y2%3D%2211.021%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23fff%22%20stop-opacity%3D%220%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.459%22%20stop-color%3D%22%23fff%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23fff%22%20stop-opacity%3D%220%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22i7cb92d-g%22%20x1%3D%2210.23%22%20x2%3D%2210.518%22%20y1%3D%2218.774%22%20y2%3D%2210.219%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20offset%3D%220.205%22%20stop-color%3D%22%23063D3B%22%20stop-opacity%3D%220%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.586%22%20stop-color%3D%22%23063D3B%22%20stop-opacity%3D%220.237%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.872%22%20stop-color%3D%22%23063D3B%22%20stop-opacity%3D%220.75%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22i7cb92d-h%22%20x1%3D%221.166%22%20x2%3D%2211.592%22%20y1%3D%2217.923%22%20y2%3D%2219.884%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23fff%22%20stop-opacity%3D%220%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.459%22%20stop-color%3D%22%23fff%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23fff%22%20stop-opacity%3D%220%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22i7cb92d-i%22%20x1%3D%228.698%22%20x2%3D%226.664%22%20y1%3D%2227.183%22%20y2%3D%2217.238%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20offset%3D%220.064%22%20stop-color%3D%22%23063D3B%22%20stop-opacity%3D%220%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.17%22%20stop-color%3D%22%23063D3B%22%20stop-opacity%3D%220.135%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.562%22%20stop-color%3D%22%23063D3B%22%20stop-opacity%3D%220.599%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.85%22%20stop-color%3D%22%23063D3B%22%20stop-opacity%3D%220.9%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23063D3B%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3C%2Fsvg%3E';
    }
  };

  const renderScenarioReviewCard = (
    scenario: Scenario,
    type: 'dangerous' | 'gap' | 'lucky' | 'unattempted',
    actionLabel: string
  ) => {
    const avatarSrc = getReporterAvatar(scenario.userReport.reporterName);
    const domainIcon = getDomainIcon(scenario.domain);

    let borderClass = 'border-border bg-surface hover:border-accent';
    let badgeClass = 'bg-surface2 text-muted border-border';
    let badgeText = 'Needs Review';

    if (type === 'dangerous') {
      borderClass = 'border-danger/40 bg-danger/5 hover:border-danger ring-1 ring-danger/20';
      badgeClass = 'bg-danger/15 text-danger border-danger/30';
      badgeText = 'High Risk Misconception';
    } else if (type === 'lucky') {
      borderClass = 'border-border bg-surface hover:border-accent';
      badgeClass = 'bg-accent/15 text-accent border-accent/30';
      badgeText = 'Lucky Hit (Verify Concept)';
    } else if (type === 'unattempted') {
      badgeText = 'Not Yet Triaged';
    }

    return (
      <div
        key={scenario.id}
        onClick={() => navigateToIncident(scenario.slug)}
        className={`p-5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between gap-4 shadow-card hover:-translate-y-0.5 ${borderClass}`}
      >
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-surface2 border border-border text-tx">
              INC-{String(scenario.caseNumber).padStart(2, '0')}
            </span>
            <span className={`font-mono text-[11px] font-bold px-2 py-0.5 rounded border ${badgeClass}`}>
              {badgeText}
            </span>
          </div>

          <button className="font-mono text-xs font-bold text-tx hover:text-accent flex items-center gap-1 transition-colors">
            <span>{actionLabel}</span>
            <ArrowRight size={11} />
          </button>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-display text-base font-bold text-tx leading-snug">
            {scenario.title}
          </h3>

          <div className="flex items-center gap-2.5 pt-1">
            <img
              src={avatarSrc}
              alt={scenario.userReport.reporterName}
              className="w-6 h-6 rounded-full object-cover border border-border shadow-xs flex-shrink-0"
            />
            <span className="font-sans text-xs font-semibold text-tx">
              {scenario.userReport.reporterName}
            </span>
            <span className="font-mono text-[11px] text-muted truncate">
              • {scenario.userReport.department}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-2 pt-3 border-t border-border/60 font-mono text-[11px]">
          <div className="flex items-center gap-1.5 text-muted">
            <img src={domainIcon} alt={scenario.domainLabel} className="w-3.5 h-3.5 object-contain" />
            <span>{scenario.skillArea}</span>
          </div>

          <span className="text-muted2">
            Severity: {scenario.severity}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="animate-fade-in flex flex-col gap-8 pb-12">
      <div className="flex items-center justify-between flex-wrap gap-4 pb-4 border-b border-border">
        <div className="flex items-center gap-3">
          <button
            onClick={navigateToDashboard}
            className="inline-flex items-center gap-1.5 py-2 px-3.5 rounded-lg font-mono text-xs text-muted border border-border hover:border-muted hover:text-tx bg-surface transition-colors cursor-pointer"
          >
            <ArrowLeft size={12} />
            <span>Dashboard</span>
          </button>

          <div>
            <div className="flex items-center gap-2">
              <img src="data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2232%22%20height%3D%2232%22%20fill%3D%22currentColor%22%20role%3D%22img%22%20focusable%3D%22false%22%3E%3Cpath%20fill%3D%22url(%23i7cb92d-a)%22%20fill-rule%3D%22evenodd%22%20d%3D%22m3.148%2021.322-.41%201.501c-.153.48-.367%201.186-.482%201.814a3.94%203.94%200%200%200%203.247%205.313c.554.08%201.181.075%201.884-.028l3.23-.446a2.05%202.05%200%200%200%201.695-1.49l2.223-8.164z%22%20clip-rule%3D%22evenodd%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23i7cb92d-b)%22%20d%3D%22M6.298%2021.71c-3.404.527-4.103%203.096-4.103%203.096l3.26-11.979%2017.035-2.304-2.323%208.438c-.12.452-.5.798-.971.87l-.095.016-12.898%201.879z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23i7cb92d-c)%22%20fill-opacity%3D%220.8%22%20d%3D%22M6.298%2021.71c-3.404.527-4.103%203.096-4.103%203.096l3.26-11.979%2017.035-2.304-2.323%208.438c-.12.452-.5.798-.971.87l-.095.016-12.898%201.879z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23i7cb92d-d)%22%20d%3D%22m8.23%2014.066%2018.86-2.786c.448-.06.811-.39.926-.82l1.946-7.043a1.116%201.116%200%200%200-1.218-1.408L10.75%204.668a5.03%205.03%200%200%200-4.044%203.636L4.11%2017.709c.52-1.902.84-3.05%204.12-3.643%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23i7cb92d-e)%22%20d%3D%22m8.23%2014.066%2018.86-2.786c.448-.06.811-.39.926-.82l1.946-7.043a1.116%201.116%200%200%200-1.218-1.408L10.75%204.668a5.03%205.03%200%200%200-4.044%203.636L4.11%2017.709c.52-1.902.84-3.05%204.12-3.643%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23i7cb92d-f)%22%20fill-opacity%3D%220.4%22%20d%3D%22m8.23%2014.066%2018.86-2.786c.448-.06.811-.39.926-.82l1.946-7.043a1.116%201.116%200%200%200-1.218-1.408L10.75%204.668a5.03%205.03%200%200%200-4.044%203.636L4.11%2017.709c.52-1.902.84-3.05%204.12-3.643%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23i7cb92d-g)%22%20d%3D%22M8.23%2014.066c-2.731.495-3.409%201.374-3.86%202.753l-2.175%207.988s.695-2.543%204.058-3.087L19.1%2019.848l.095-.016c.471-.071.851-.419.972-.87l1.911-6.941-13.85%202.045Z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23i7cb92d-h)%22%20fill-opacity%3D%220.2%22%20d%3D%22M8.23%2014.066c-2.731.495-3.409%201.374-3.86%202.753l-2.175%207.988s.695-2.543%204.058-3.087L19.1%2019.848l.095-.016c.471-.071.851-.419.972-.87l1.911-6.941-13.85%202.045Z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23i7cb92d-i)%22%20fill-rule%3D%22evenodd%22%20d%3D%22M6.253%2021.72c-2.842.46-3.775%202.342-3.997%202.916a3.94%203.94%200%200%200%203.247%205.314c.554.08%201.181.075%201.884-.028l3.23-.446a2.05%202.05%200%200%200%201.695-1.49l2.026-7.443z%22%20clip-rule%3D%22evenodd%22%3E%3C%2Fpath%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22i7cb92d-a%22%20x1%3D%228.268%22%20x2%3D%228.268%22%20y1%3D%2230.005%22%20y2%3D%2219.822%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20offset%3D%220.056%22%20stop-color%3D%22%232AAC94%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.155%22%20stop-color%3D%22%23239C87%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.372%22%20stop-color%3D%22%23177E71%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.588%22%20stop-color%3D%22%230E6961%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.799%22%20stop-color%3D%22%23095D57%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23085954%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22i7cb92d-b%22%20x1%3D%2221.134%22%20x2%3D%2211.302%22%20y1%3D%2222.617%22%20y2%3D%2211.923%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20offset%3D%220.042%22%20stop-color%3D%22%23ABE88E%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.549%22%20stop-color%3D%22%232AAA92%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.906%22%20stop-color%3D%22%23117865%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22i7cb92d-c%22%20x1%3D%22-3.028%22%20x2%3D%226.329%22%20y1%3D%2222.097%22%20y2%3D%2218.906%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%236AD6F9%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%236AD6F9%22%20stop-opacity%3D%220%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22i7cb92d-d%22%20x1%3D%224.11%22%20x2%3D%2229.016%22%20y1%3D%229.855%22%20y2%3D%229.855%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20offset%3D%220.043%22%20stop-color%3D%22%2325FFD4%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.874%22%20stop-color%3D%22%2355DDB9%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22i7cb92d-e%22%20x1%3D%224.11%22%20x2%3D%2226.546%22%20y1%3D%226.373%22%20y2%3D%2216.791%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%236AD6F9%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.23%22%20stop-color%3D%22%2360E9D0%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.651%22%20stop-color%3D%22%236DE9BB%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.994%22%20stop-color%3D%22%23ABE88E%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22i7cb92d-f%22%20x1%3D%226.185%22%20x2%3D%2218.385%22%20y1%3D%228.323%22%20y2%3D%2211.021%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23fff%22%20stop-opacity%3D%220%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.459%22%20stop-color%3D%22%23fff%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23fff%22%20stop-opacity%3D%220%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22i7cb92d-g%22%20x1%3D%2210.23%22%20x2%3D%2210.518%22%20y1%3D%2218.774%22%20y2%3D%2210.219%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20offset%3D%220.205%22%20stop-color%3D%22%23063D3B%22%20stop-opacity%3D%220%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.586%22%20stop-color%3D%22%23063D3B%22%20stop-opacity%3D%220.237%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.872%22%20stop-color%3D%22%23063D3B%22%20stop-opacity%3D%220.75%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22i7cb92d-h%22%20x1%3D%221.166%22%20x2%3D%2211.592%22%20y1%3D%2217.923%22%20y2%3D%2219.884%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23fff%22%20stop-opacity%3D%220%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.459%22%20stop-color%3D%22%23fff%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23fff%22%20stop-opacity%3D%220%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22i7cb92d-i%22%20x1%3D%228.698%22%20x2%3D%226.664%22%20y1%3D%2227.183%22%20y2%3D%2217.238%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20offset%3D%220.064%22%20stop-color%3D%22%23063D3B%22%20stop-opacity%3D%220%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.17%22%20stop-color%3D%22%23063D3B%22%20stop-opacity%3D%220.135%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.562%22%20stop-color%3D%22%23063D3B%22%20stop-opacity%3D%220.599%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.85%22%20stop-color%3D%22%23063D3B%22%20stop-opacity%3D%220.9%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23063D3B%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3C%2Fsvg%3E" alt="Fabric" className="w-5 h-5 object-contain" />
              <h1 className="font-display text-2xl font-bold text-tx">
                Weak Spots &amp; Misconceptions
              </h1>
            </div>
            <p className="font-mono text-xs text-muted mt-0.5">
              Prioritized review queue sorted by operator metacognitive risk
            </p>
          </div>
        </div>

        {overallReadiness.totalAttempted > 0 && (
          <button
            onClick={() => {
              const md = generateStudyPlanMarkdown(overallReadiness, scenarios, latestAttempts);
              const blob = new Blob([md], { type: 'text/markdown' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `dp600-study-plan-${new Date().toISOString().split('T')[0]}.md`;
              a.click();
              URL.revokeObjectURL(url);
            }}
            className="inline-flex items-center gap-2 py-2 px-4 rounded-lg font-mono text-xs font-bold border border-accent bg-accent text-bg hover:bg-accent-dim transition-all cursor-pointer shadow-card"
          >
            <span>Download Study Plan (.md) ↓</span>
          </button>
        )}
      </div>

      {isAllCompleted && (
        <div className="bg-surface border border-accent/40 border-l-4 border-l-accent rounded-xl shadow-card p-6 flex flex-col gap-2">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-accent font-bold">
            <CheckCircle2 size={14} color="rgb(var(--accent))" />
            <span>Practice Assessment Completed</span>
          </div>
          <h2 className="font-display text-lg font-bold text-tx">
            "Your biggest risk is not what you do not know. It is what you think you know for sure that just is not so."
          </h2>
          <p className="text-xs text-muted leading-relaxed font-sans">
            You have triaged all 12 practice scenarios. Use the findings below with the current Microsoft Learn DP-600 study guide; this sample does not cover every exam skill or guarantee exam readiness.
          </p>
        </div>
      )}

      <div className="bg-surface border border-border rounded-xl shadow-card p-6 flex flex-col gap-5">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-danger animate-pulse" />
            <h2 className="font-mono text-xs uppercase tracking-widest text-danger font-bold">
              Priority 1: Dangerous Misconceptions ({dangerousMisconceptions.length})
            </h2>
          </div>
          <span className="font-mono text-xs text-muted2">
            Wrong + High Confidence
          </span>
        </div>

        {dangerousMisconceptions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dangerousMisconceptions.map(s => renderScenarioReviewCard(s, 'dangerous', 'Re-evaluate Patch'))}
          </div>
        ) : (
          <div className="p-6 rounded-xl border border-success/30 bg-success/5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-success/15 border border-success/30 flex items-center justify-center text-success flex-shrink-0">
              <CheckCircle2 size={20} color="rgb(var(--success))" />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-sm font-bold text-tx">
                No High-Confidence Errors in Attempted Cases
              </span>
              <span className="font-sans text-xs text-muted mt-0.5">
                No confident-but-wrong result is present in the cases you have attempted so far.
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="bg-surface border border-border rounded-xl shadow-card p-6 flex flex-col gap-5">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div className="flex items-center gap-2">
            <HelpCircle size={14} />
            <h2 className="font-mono text-xs uppercase tracking-widest text-tx font-bold">
              Priority 2: Knowledge Gaps &amp; Needs Review ({knowledgeGaps.length + needsReviewScenarios.length})
            </h2>
          </div>
          <span className="font-mono text-xs text-muted2">
            Low / Mid Confidence Areas
          </span>
        </div>

        {[...needsReviewScenarios, ...knowledgeGaps].length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...needsReviewScenarios, ...knowledgeGaps].map(s => renderScenarioReviewCard(s, 'gap', 'Triage Concept'))}
          </div>
        ) : (
          <div className="p-6 rounded-xl border border-border bg-surface2/30 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-surface border border-border flex items-center justify-center text-muted flex-shrink-0">
              <CheckCircle2 size={20} />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-sm font-bold text-tx">
                No Low- or Mid-Confidence Errors in Attempted Cases
              </span>
              <span className="font-sans text-xs text-muted mt-0.5">
                {unattemptedScenarios.length > 0
                  ? `${unattemptedScenarios.length} case${unattemptedScenarios.length === 1 ? ' remains' : 's remain'} unattempted and cannot be evaluated yet.`
                  : 'No guessed or probable incorrect result is present in the completed practice assessment.'}
              </span>
            </div>
          </div>
        )}
      </div>

      {unattemptedScenarios.length > 0 && (
        <div data-testid="unattempted-cases" className="bg-surface border border-border rounded-xl shadow-card p-6 flex flex-col gap-5">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <div className="flex items-center gap-2">
              <HelpCircle size={14} />
              <h2 className="font-mono text-xs tracking-widest text-tx font-bold">
                Unattempted Cases ({unattemptedScenarios.length})
              </h2>
            </div>
            <span className="font-mono text-xs text-muted2">
              No calibration signal yet
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {unattemptedScenarios.map(s => renderScenarioReviewCard(s, 'unattempted', 'Triage Incident'))}
          </div>
        </div>
      )}

      {luckyHits.length > 0 && (
        <div className="bg-surface border border-border rounded-xl shadow-card p-6 flex flex-col gap-5">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <div className="flex items-center gap-2">
              <Sparkles size={14} color="rgb(var(--accent))" />
              <h2 className="font-mono text-xs uppercase tracking-widest text-accent font-bold">
                Priority 3: Lucky Hits (Concept Verification Recommended) ({luckyHits.length})
              </h2>
            </div>
            <span className="font-mono text-xs text-muted2">
              Guessed Correctly
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {luckyHits.map(s => renderScenarioReviewCard(s, 'lucky', 'Verify Concept'))}
          </div>
        </div>
      )}
    </div>
  );
}
