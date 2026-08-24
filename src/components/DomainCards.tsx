import React from 'react';
import { useTriage } from '../context/TriageContext.tsx';
import { DOMAINS } from '../types/scenario.ts';
import type { DomainKey, Scenario } from '../types/scenario.ts';
import { getReporterAvatar } from '../utils/avatars.ts';

export function DomainCards() {
  const { 
    scenarios, 
    latestAttempts, 
    navigateToIncident, 
    overallReadiness
  } = useTriage();

  const domainKeys: DomainKey[] = ['prepare_data', 'maintain_analytics', 'semantic_models'];

  const getDomainIcon = (key: DomainKey) => {
    switch (key) {
      case 'prepare_data':
        return 'data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2232%22%20height%3D%2232%22%20fill%3D%22currentColor%22%20role%3D%22img%22%20focusable%3D%22false%22%3E%3Cpath%20fill%3D%22url(%23idca273-a)%22%20d%3D%22M3%206.5A3.5%203.5%200%200%201%206.5%203h19A3.5%203.5%200%200%201%2029%206.5v19a3.5%203.5%200%200%201-3.5%203.5h-19A3.5%203.5%200%200%201%203%2025.5z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23idca273-b)%22%20fill-opacity%3D%220.2%22%20d%3D%22M3%206.5A3.5%203.5%200%200%201%206.5%203h19A3.5%203.5%200%200%201%2029%206.5v19a3.5%203.5%200%200%201-3.5%203.5h-19A3.5%203.5%200%200%201%203%2025.5z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23idca273-c)%22%20fill-rule%3D%22evenodd%22%20d%3D%22M25.5%204h-19A2.5%202.5%200%200%200%204%206.5v19A2.5%202.5%200%200%200%206.5%2028h19a2.5%202.5%200%200%200%202.5-2.5v-19A2.5%202.5%200%200%200%2025.5%204m-19-1A3.5%203.5%200%200%200%203%206.5v19A3.5%203.5%200%200%200%206.5%2029h19a3.5%203.5%200%200%200%203.5-3.5v-19A3.5%203.5%200%200%200%2025.5%203z%22%20clip-rule%3D%22evenodd%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23idca273-d)%22%20d%3D%22M15%2011.5a2.5%202.5%200%200%201-2%202.45V16h4.5a1.5%201.5%200%200%200%201.5-1.5v-.55a2.5%202.5%200%201%201%201%200v.55a2.5%202.5%200%200%201-2.5%202.5H13v1.05a2.5%202.5%200%201%201-2.294.709v-.056h.056A2.5%202.5%200%200%201%2012%2018.05v-4.1a2.5%202.5%200%200%201-1.294-4.191v-.023h.022A2.5%202.5%200%200%201%2015%2011.5%22%3E%3C%2Fpath%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22idca273-a%22%20x1%3D%2210.222%22%20x2%3D%2213.511%22%20y1%3D%223%22%20y2%3D%2229.311%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23fff%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23EBEBEB%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22idca273-c%22%20x1%3D%2211.396%22%20x2%3D%2214.897%22%20y1%3D%223%22%20y2%3D%2229.256%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23BBB%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23888%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22idca273-d%22%20x1%3D%2210%22%20x2%3D%2223.835%22%20y1%3D%229%22%20y2%3D%2220.859%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%234BA446%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%233F7D35%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3CradialGradient%20id%3D%22idca273-b%22%20cx%3D%220%22%20cy%3D%220%22%20r%3D%221%22%20gradientTransform%3D%22matrix(13.7222%2020.58336%20-17.81255%2011.875%2011.306%209.771)%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20offset%3D%220.177%22%20stop-color%3D%22%23fff%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23B8B8B8%22%3E%3C%2Fstop%3E%3C%2FradialGradient%3E%3C%2Fdefs%3E%3C%2Fsvg%3E';
      case 'maintain_analytics':
        return 'data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2232%22%20height%3D%2232%22%20fill%3D%22currentColor%22%20role%3D%22img%22%20focusable%3D%22false%22%3E%3Cpath%20fill%3D%22url(%23i7cb92d-a)%22%20fill-rule%3D%22evenodd%22%20d%3D%22m3.148%2021.322-.41%201.501c-.153.48-.367%201.186-.482%201.814a3.94%203.94%200%200%200%203.247%205.313c.554.08%201.181.075%201.884-.028l3.23-.446a2.05%202.05%200%200%200%201.695-1.49l2.223-8.164z%22%20clip-rule%3D%22evenodd%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23i7cb92d-b)%22%20d%3D%22M6.298%2021.71c-3.404.527-4.103%203.096-4.103%203.096l3.26-11.979%2017.035-2.304-2.323%208.438c-.12.452-.5.798-.971.87l-.095.016-12.898%201.879z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23i7cb92d-c)%22%20fill-opacity%3D%220.8%22%20d%3D%22M6.298%2021.71c-3.404.527-4.103%203.096-4.103%203.096l3.26-11.979%2017.035-2.304-2.323%208.438c-.12.452-.5.798-.971.87l-.095.016-12.898%201.879z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23i7cb92d-d)%22%20d%3D%22m8.23%2014.066%2018.86-2.786c.448-.06.811-.39.926-.82l1.946-7.043a1.116%201.116%200%200%200-1.218-1.408L10.75%204.668a5.03%205.03%200%200%200-4.044%203.636L4.11%2017.709c.52-1.902.84-3.05%204.12-3.643%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23i7cb92d-e)%22%20d%3D%22m8.23%2014.066%2018.86-2.786c.448-.06.811-.39.926-.82l1.946-7.043a1.116%201.116%200%200%200-1.218-1.408L10.75%204.668a5.03%205.03%200%200%200-4.044%203.636L4.11%2017.709c.52-1.902.84-3.05%204.12-3.643%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23i7cb92d-f)%22%20fill-opacity%3D%220.4%22%20d%3D%22m8.23%2014.066%2018.86-2.786c.448-.06.811-.39.926-.82l1.946-7.043a1.116%201.116%200%200%200-1.218-1.408L10.75%204.668a5.03%205.03%200%200%200-4.044%203.636L4.11%2017.709c.52-1.902.84-3.05%204.12-3.643%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23i7cb92d-g)%22%20d%3D%22M8.23%2014.066c-2.731.495-3.409%201.374-3.86%202.753l-2.175%207.988s.695-2.543%204.058-3.087L19.1%2019.848l.095-.016c.471-.071.851-.419.972-.87l1.911-6.941-13.85%202.045Z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23i7cb92d-h)%22%20fill-opacity%3D%220.2%22%20d%3D%22M8.23%2014.066c-2.731.495-3.409%201.374-3.86%202.753l-2.175%207.988s.695-2.543%204.058-3.087L19.1%2019.848l.095-.016c.471-.071.851-.419.972-.87l1.911-6.941-13.85%202.045Z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23i7cb92d-i)%22%20fill-rule%3D%22evenodd%22%20d%3D%22M6.253%2021.72c-2.842.46-3.775%202.342-3.997%202.916a3.94%203.94%200%200%200%203.247%205.314c.554.08%201.181.075%201.884-.028l3.23-.446a2.05%202.05%200%200%200%201.695-1.49l2.026-7.443z%22%20clip-rule%3D%22evenodd%22%3E%3C%2Fpath%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22i7cb92d-a%22%20x1%3D%228.268%22%20x2%3D%228.268%22%20y1%3D%2230.005%22%20y2%3D%2219.822%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20offset%3D%220.056%22%20stop-color%3D%22%232AAC94%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.155%22%20stop-color%3D%22%23239C87%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.372%22%20stop-color%3D%22%23177E71%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.588%22%20stop-color%3D%22%230E6961%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.799%22%20stop-color%3D%22%23095D57%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23085954%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22i7cb92d-b%22%20x1%3D%2221.134%22%20x2%3D%2211.302%22%20y1%3D%2222.617%22%20y2%3D%2211.923%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20offset%3D%220.042%22%20stop-color%3D%22%23ABE88E%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.549%22%20stop-color%3D%22%232AAA92%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.906%22%20stop-color%3D%22%23117865%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22i7cb92d-c%22%20x1%3D%22-3.028%22%20x2%3D%226.329%22%20y1%3D%2222.097%22%20y2%3D%2218.906%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%236AD6F9%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%236AD6F9%22%20stop-opacity%3D%220%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22i7cb92d-d%22%20x1%3D%224.11%22%20x2%3D%2229.016%22%20y1%3D%229.855%22%20y2%3D%229.855%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20offset%3D%220.043%22%20stop-color%3D%22%2325FFD4%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.874%22%20stop-color%3D%22%2355DDB9%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22i7cb92d-e%22%20x1%3D%224.11%22%20x2%3D%2226.546%22%20y1%3D%226.373%22%20y2%3D%2216.791%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%236AD6F9%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.23%22%20stop-color%3D%22%2360E9D0%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.651%22%20stop-color%3D%22%236DE9BB%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.994%22%20stop-color%3D%22%23ABE88E%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22i7cb92d-f%22%20x1%3D%226.185%22%20x2%3D%2218.385%22%20y1%3D%228.323%22%20y2%3D%2211.021%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23fff%22%20stop-opacity%3D%220%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.459%22%20stop-color%3D%22%23fff%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23fff%22%20stop-opacity%3D%220%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22i7cb92d-g%22%20x1%3D%2210.23%22%20x2%3D%2210.518%22%20y1%3D%2218.774%22%20y2%3D%2210.219%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20offset%3D%220.205%22%20stop-color%3D%22%23063D3B%22%20stop-opacity%3D%220%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.586%22%20stop-color%3D%22%23063D3B%22%20stop-opacity%3D%220.237%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.872%22%20stop-color%3D%22%23063D3B%22%20stop-opacity%3D%220.75%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22i7cb92d-h%22%20x1%3D%221.166%22%20x2%3D%2211.592%22%20y1%3D%2217.923%22%20y2%3D%2219.884%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23fff%22%20stop-opacity%3D%220%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.459%22%20stop-color%3D%22%23fff%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23fff%22%20stop-opacity%3D%220%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22i7cb92d-i%22%20x1%3D%228.698%22%20x2%3D%226.664%22%20y1%3D%2227.183%22%20y2%3D%2217.238%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20offset%3D%220.064%22%20stop-color%3D%22%23063D3B%22%20stop-opacity%3D%220%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.17%22%20stop-color%3D%22%23063D3B%22%20stop-opacity%3D%220.135%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.562%22%20stop-color%3D%22%23063D3B%22%20stop-opacity%3D%220.599%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.85%22%20stop-color%3D%22%23063D3B%22%20stop-opacity%3D%220.9%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23063D3B%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3C%2Fsvg%3E';
      case 'semantic_models':
        return 'data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2232%22%20height%3D%2232%22%20fill%3D%22currentColor%22%20role%3D%22img%22%20focusable%3D%22false%22%3E%3Cpath%20fill%3D%22url(%23ic35943-a)%22%20d%3D%22M3%206.5A3.5%203.5%200%200%201%206.5%203h19A3.5%203.5%200%200%201%2029%206.5v19a3.5%203.5%200%200%201-3.5%203.5h-19A3.5%203.5%200%200%201%203%2025.5z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23ic35943-b)%22%20fill-opacity%3D%220.2%22%20d%3D%22M3%206.5A3.5%203.5%200%200%201%206.5%203h19A3.5%203.5%200%200%201%2029%206.5v19a3.5%203.5%200%200%201-3.5%203.5h-19A3.5%203.5%200%200%201%203%2025.5z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23ic35943-c)%22%20fill-rule%3D%22evenodd%22%20d%3D%22M25.5%204h-19A2.5%202.5%200%200%200%204%206.5v19A2.5%202.5%200%200%200%206.5%2028h19a2.5%202.5%200%200%200%202.5-2.5v-19A2.5%202.5%200%200%200%2025.5%204m-19-1A3.5%203.5%200%200%200%203%206.5v19A3.5%203.5%200%200%200%206.5%2029h19a3.5%203.5%200%200%200%203.5-3.5v-19A3.5%203.5%200%200%200%2025.5%203z%22%20clip-rule%3D%22evenodd%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23ic35943-d)%22%20d%3D%22M9.75%2014.5a1.75%201.75%200%201%200%200-3.5%201.75%201.75%200%200%200%200%203.5%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23ic35943-e)%22%20d%3D%22M16%2014.5a1.75%201.75%200%201%200%200-3.5%201.75%201.75%200%200%200%200%203.5%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23ic35943-f)%22%20d%3D%22M11.5%2019.25a1.75%201.75%200%201%201-3.5%200%201.75%201.75%200%200%201%203.5%200%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23ic35943-g)%22%20d%3D%22M16%2021a1.75%201.75%200%201%200%200-3.5%201.75%201.75%200%200%200%200%203.5%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23ic35943-h)%22%20d%3D%22M24%2012.75a1.75%201.75%200%201%201-3.5%200%201.75%201.75%200%200%201%203.5%200%22%3E%3C%2Fpath%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22ic35943-a%22%20x1%3D%2210.222%22%20x2%3D%2213.511%22%20y1%3D%223%22%20y2%3D%2229.311%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23fff%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23EBEBEB%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22ic35943-c%22%20x1%3D%2211.396%22%20x2%3D%2214.897%22%20y1%3D%223%22%20y2%3D%2229.256%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23BBB%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23888%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22ic35943-d%22%20x1%3D%228%22%20x2%3D%2216.989%22%20y1%3D%2211%22%20y2%3D%2225.382%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%237751B8%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%235A409C%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22ic35943-e%22%20x1%3D%228%22%20x2%3D%2216.989%22%20y1%3D%2211%22%20y2%3D%2225.382%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%237751B8%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%235A409C%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22ic35943-f%22%20x1%3D%228%22%20x2%3D%2216.989%22%20y1%3D%2211%22%20y2%3D%2225.382%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%237751B8%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%235A409C%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22ic35943-g%22%20x1%3D%228%22%20x2%3D%2216.989%22%20y1%3D%2211%22%20y2%3D%2225.382%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%237751B8%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%235A409C%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22ic35943-h%22%20x1%3D%228%22%20x2%3D%2216.989%22%20y1%3D%2211%22%20y2%3D%2225.382%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%237751B8%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%235A409C%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3CradialGradient%20id%3D%22ic35943-b%22%20cx%3D%220%22%20cy%3D%220%22%20r%3D%221%22%20gradientTransform%3D%22matrix(13.7222%2020.58336%20-17.81255%2011.875%2011.306%209.771)%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20offset%3D%220.177%22%20stop-color%3D%22%23fff%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23B8B8B8%22%3E%3C%2Fstop%3E%3C%2FradialGradient%3E%3C%2Fdefs%3E%3C%2Fsvg%3E';
    }
  };

  const getStakeholderCardQuote = (scenario: Scenario, isCompleted: boolean, isCorrect: boolean | undefined) => {
    const name = scenario.userReport.reporterName;
    const role = scenario.userReport.reporterRole;

    if (!isCompleted) {
      return {
        type: 'pending',
        badge: 'Stakeholder SLA Request',
        text: `"${scenario.userReport.complaint.slice(0, 110)}..."`,
        author: `${name} • ${role}`
      };
    }

    if (isCorrect) {
      switch (scenario.caseNumber) {
        case 1:
          return {
            type: 'resolved',
            badge: 'Client Feedback • Delighted',
            text: `"100% matched! Deduplicating DimProduct in the medallion pipeline resolved our executive revenue matrix immediately."`,
            author: `${name} (${role})`
          };
        case 2:
          return {
            type: 'resolved',
            badge: 'Client Feedback • Verified',
            text: `"Sub-second sliding windows are active in Fabric KQL Eventhouse! No more refresh timeouts."`,
            author: `${name} (${role})`
          };
        default:
          return {
            type: 'resolved',
            badge: 'Client Feedback • Resolved',
            text: `"Remediation verified in production! Architecture is stable and SLA target was met successfully."`,
            author: `${name} (${role})`
          };
      }
    } else {
      switch (scenario.caseNumber) {
        case 1:
          return {
            type: 'escalated',
            badge: 'Executive Escalation • Active',
            text: `"Revenue numbers are STILL 28% higher! Why did you rewrite DAX when DimProduct is still duplicating fact rows?"`,
            author: `${name} (${role})`
          };
        default:
          return {
            type: 'escalated',
            badge: 'Executive Escalation • Active',
            text: `"Production is still throwing regressions! The root architectural failure was not resolved by this patch."`,
            author: `${name} (${role})`
          };
      }
    }
  };

  return (
    <div className="flex flex-col gap-10">
      {domainKeys.map(key => {
        const meta = DOMAINS[key];
        const stats = overallReadiness.domainStats[key];
        const domainScenarios = scenarios.filter(s => s.domain === key);
        const domainIcon = getDomainIcon(key);

        return (
          <section key={key} className="flex flex-col gap-4">
            <div className="flex items-center justify-between flex-wrap gap-3 pb-2 border-b border-border">
              <div className="flex items-center gap-3">
                <img
                  src={domainIcon}
                  alt={meta.title}
                  className="w-6 h-6 object-contain flex-shrink-0"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-display text-base font-bold text-tx">
                      {meta.title}
                    </h2>
                    <span className="font-mono text-xs text-accent font-bold px-2 py-0.5 rounded bg-surface2 border border-border">
                      {meta.examWeightRange} Exam range
                    </span>
                  </div>
                  <p className="font-mono text-xs text-muted mt-0.5">
                    {meta.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 font-mono text-xs">
                <span className="text-muted">
                  Triaged: <strong className="text-tx font-bold">{stats.attemptedCount}/{stats.totalIncidents}</strong>
                </span>
                {stats.attemptedCount > 0 && (
                  <span className={`px-2 py-0.5 rounded border font-bold ${
                    stats.correctCount === stats.attemptedCount 
                      ? 'bg-success/10 text-success border-success/30' 
                      : 'bg-accent/10 text-accent border-accent/30'
                  }`}>
                    {Math.round((stats.correctCount / stats.attemptedCount) * 100)}% Pass Rate
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {domainScenarios.map(scenario => {
                const attempt = latestAttempts.get(scenario.slug);
                const isCompleted = !!attempt;
                const isCorrect = attempt?.correct;
                const isDangerous = attempt && !attempt.correct && attempt.confidence === 'confident';
                const avatarSrc = getReporterAvatar(scenario.userReport.reporterName);
                const quote = getStakeholderCardQuote(scenario, isCompleted, isCorrect);

                return (
                  <button
                    key={scenario.id}
                    onClick={() => navigateToIncident(scenario.slug)}
                    className={`group p-5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-4 shadow-card hover:-translate-y-0.5 relative overflow-hidden ${
                      isCompleted
                        ? isCorrect
                          ? 'border-success/50 bg-success/5 ring-1 ring-success/30 hover:border-success'
                          : 'border-danger/50 bg-danger/5 ring-1 ring-danger/30 hover:border-danger'
                        : 'bg-surface border-border hover:border-accent hover:bg-surface2/30'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-surface2 border border-border text-tx">
                          INC-{String(scenario.caseNumber).padStart(2, '0')}
                        </span>
                        <span className={`font-mono text-[10px] font-bold px-1.5 py-0.5 rounded border ${
                          scenario.severity === 'CRITICAL'
                            ? 'bg-danger/10 text-danger border-danger/30'
                            : 'bg-surface2 text-muted border-border'
                        }`}>
                          {scenario.severity}
                        </span>
                      </div>

                      {isCompleted ? (
                        <span className={`font-mono text-xs font-bold px-2.5 py-0.5 rounded-full border flex items-center gap-1 ${
                          isCorrect
                            ? 'bg-success/15 text-success border-success/40 shadow-xs'
                            : 'bg-danger/15 text-danger border-danger/40 shadow-xs'
                        }`}>
                          {isCorrect ? '✓ RESOLVED' : '✗ ESCALATED'}
                        </span>
                      ) : (
                        <span className="font-mono text-xs text-muted group-hover:text-accent font-semibold flex items-center gap-1 transition-colors">
                          Open Incident →
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col gap-2.5">
                      <h3 className="font-display text-base font-bold text-tx leading-snug group-hover:text-accent transition-colors">
                        {scenario.title}
                      </h3>

                      <div className="flex items-center gap-2.5 pt-1">
                        <div className="relative">
                          <img
                            src={avatarSrc}
                            alt={scenario.userReport.reporterName}
                            className="w-7 h-7 rounded-full object-cover border border-border shadow-xs flex-shrink-0"
                          />
                          <span className={`absolute bottom-0 right-0 w-2 h-2 rounded-full border border-surface ${
                            isCompleted
                              ? isCorrect ? 'bg-success' : 'bg-danger'
                              : 'bg-accent'
                          }`} />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="font-sans text-xs font-semibold text-tx truncate">
                            {scenario.userReport.reporterName}
                          </span>
                          <span className="font-mono text-[10px] text-muted truncate">
                            {scenario.userReport.department}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className={`p-3 rounded-lg border text-xs flex flex-col gap-1.5 ${
                      quote.type === 'resolved'
                        ? 'bg-success/10 border-success/30'
                        : quote.type === 'escalated'
                        ? 'bg-danger/10 border-danger/30'
                        : 'bg-surface2/50 border-border/80'
                    }`}>
                      <div className="flex items-center gap-1.5 font-mono text-[11px] font-bold">
                        <span className={`w-2 h-2 rounded-full flex-shrink-0 ${
                          quote.type === 'resolved' 
                            ? 'bg-success' 
                            : quote.type === 'escalated' 
                            ? 'bg-danger' 
                            : 'bg-muted2'
                        }`} />
                        <span className={
                          quote.type === 'resolved' 
                            ? 'text-success' 
                            : quote.type === 'escalated' 
                            ? 'text-danger' 
                            : 'text-muted'
                        }>
                          {quote.badge}
                        </span>
                      </div>
                      <p className="italic font-sans text-xs leading-snug text-tx line-clamp-2">
                        {quote.text}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-1.5 pt-3 border-t border-border/60 font-mono text-[10px]">
                      <span className="text-muted truncate max-w-[170px]" title={scenario.skillArea}>
                        {scenario.skillArea}
                      </span>

                      {isDangerous ? (
                        <span className="text-danger font-bold bg-danger/10 border border-danger/30 px-1.5 py-0.5 rounded">
                          Misconception Active
                        </span>
                      ) : isCompleted ? (
                        <span className="text-muted2">
                          Confidence: {attempt.confidence.replace('_', ' ')}
                        </span>
                      ) : (
                        <span className="text-muted2">
                          SLA: 15m Target
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
