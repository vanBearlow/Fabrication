import React from 'react';

export function renderSyntaxHighlightedCode(codeStr: string) {
  const tokens = codeStr.split(/(\[[^\]]+\]|\b[A-Za-z_][A-Za-z0-9_.]*\b|[(),:.*=<>-]|%)/);

  const DAX_FUNCTIONS = [
    'SUM', 'SUMX', 'DISTINCT', 'CALCULATE', 'CALCULATETABLE', 'FILTER', 'ALL', 'ALLSELECTED',
    'VALUES', 'COUNT', 'COUNTROWS', 'AVERAGE', 'MIN', 'MAX', 'USERELATIONSHIP', 'RELATED',
    'RELATEDTABLE', 'SUMMARIZECOLUMNS', 'EVALUATE', 'DIVIDE', 'VAR', 'RETURN', 'SELECT',
    'FROM', 'WHERE', 'GROUP', 'BY', 'ORDER', 'CREATE', 'TABLE', 'MERGE', 'INSERT', 'UPDATE',
    'DELETE', 'OPTIMIZE', 'VACUUM', 'SELECTEDMEASURE', 'SELECTEDMEASUREFORMATSTRING',
    'ISSELECTEDMEASURE', 'USERPRINCIPALNAME', 'USERNAME', 'LOOKUPVALUE', 'TREATAS',
    'CROSSFILTER', 'TOTALYTD', 'SAMEPERIODLASTYEAR', 'DATEADD', 'DATESYTD', 'Table.SelectRows'
  ];

  const TIME_INTELLIGENCE_TERMS = ['YTD', 'PY', 'YoY', 'MTD', 'QTD', 'LTM'];

  const SKUS = ['F2', 'F4', 'F8', 'F16', 'F32', 'F64', 'F128', 'F256', 'F512', 'F1024', 'F2048', 'P1', 'P2', 'P3'];

  return (
    <code className="font-mono text-xs px-2 py-0.5 mx-0.5 rounded bg-surface2/90 border border-border shadow-2xs inline-flex items-center gap-0.5 select-text">
      {tokens.map((token, tIdx) => {
        if (!token) return null;
        const upper = token.toUpperCase();

        if (DAX_FUNCTIONS.includes(upper) || token === 'Table.SelectRows' || token.endsWith('()')) {
          return (
            <span key={tIdx} className="text-accent font-bold">
              {token}
            </span>
          );
        }

        if (TIME_INTELLIGENCE_TERMS.includes(token) || upper === 'YOY') {
          return (
            <span key={tIdx} className="text-warning font-bold">
              {token}
            </span>
          );
        }

        if (
          token.startsWith('Dim') ||
          token.startsWith('Fact') ||
          token.startsWith('Bridge') ||
          token.startsWith('Flat') ||
          token.startsWith('Gold') ||
          token.startsWith('Silver') ||
          token.startsWith('Bronze') ||
          token === 'FleetTelemetry' ||
          token === 'Delta'
        ) {
          return (
            <span key={tIdx} className="text-info font-bold">
              {token}
            </span>
          );
        }

        if (token.startsWith('[') && token.endsWith(']')) {
          return (
            <span key={tIdx} className="text-success font-semibold">
              {token}
            </span>
          );
        }

        if (
          SKUS.includes(token) ||
          upper === 'CU' ||
          upper === 'SKU' ||
          token === 'RangeStart' ||
          token === 'RangeEnd' ||
          token === 'OrderDateTime' ||
          token === 'Cust_ZipCode' ||
          token === 'PostalCode' ||
          token === 'AllocationPct'
        ) {
          return (
            <span key={tIdx} className="text-warning font-bold">
              {token}
            </span>
          );
        }

        if (
          token === 'RLS' ||
          token === 'OLS' ||
          token === '1-side' ||
          token === '1:Many' ||
          token === 'Many:1' ||
          token === 'Many:Many' ||
          token === 'V-Order' ||
          token === 'Z-Order' ||
          token === 'T-SQL' ||
          token === 'Direct Lake' ||
          token === 'DirectQuery' ||
          token === 'VertiPaq' ||
          token === 'Calculation Group' ||
          token === 'Calculation Groups' ||
          token === 'Calculation Item' ||
          token === 'Eventhouse' ||
          token === 'Eventstream' ||
          token === 'OneLake'
        ) {
          return (
            <span key={tIdx} className="text-accent font-bold">
              {token}
            </span>
          );
        }

        if (/[(),:.*=<>-]/.test(token)) {
          return (
            <span key={tIdx} className="text-muted2 font-normal">
              {token}
            </span>
          );
        }

        return <span key={tIdx} className="text-tx font-medium">{token}</span>;
      })}
    </code>
  );
}

export function renderFormattedText(text: string) {
  const pattern = /(`[^`]+`|\[[^\]]+\]|(?:SELECTEDMEASURE|SELECTEDMEASUREFORMATSTRING|ISSELECTEDMEASURE|USERPRINCIPALNAME|USERNAME|LOOKUPVALUE|TREATAS|CROSSFILTER|TOTALYTD|SAMEPERIODLASTYEAR|DATEADD|DATESYTD|SUMX?|CALCULATE|FILTER|ALL|VALUES|DISTINCT|USERELATIONSHIP|COUNTROWS|DIVIDE|SUMMARIZECOLUMNS)\([^)]*\)|(?:Dim|Fact|Bridge_|Flat_|Gold_|Silver_|Bronze_)[A-Za-z0-9_]+|RangeStart|RangeEnd|Table\.SelectRows|OrderDateTime|Cust_ZipCode|PostalCode|AllocationPct|Calculation Groups?|Calculation Items?|YoY %|YTD|PY|F\d+|P\d+|RLS|OLS|1:Many|Many:1|Many:Many|1-side|Many-side|Direct Lake|DirectQuery|VertiPaq|V-Order|T-SQL)/g;

  const parts = text.split(pattern);

  return parts.map((part, idx) => {
    if (!part) return null;

    const isCode =
      part.startsWith('`') ||
      part.startsWith('[') ||
      /^(?:SELECTEDMEASURE|SELECTEDMEASUREFORMATSTRING|ISSELECTEDMEASURE|USERPRINCIPALNAME|USERNAME|LOOKUPVALUE|TREATAS|CROSSFILTER|TOTALYTD|SAMEPERIODLASTYEAR|DATEADD|DATESYTD|SUMX?|CALCULATE|FILTER|ALL|VALUES|DISTINCT|USERELATIONSHIP|COUNTROWS|DIVIDE|SUMMARIZECOLUMNS)\(/.test(part) ||
      /^(?:Dim|Fact|Bridge_|Flat_|Gold_|Silver_|Bronze_)[A-Za-z0-9_]+$/.test(part) ||
      part === 'RangeStart' ||
      part === 'RangeEnd' ||
      part === 'Table.SelectRows' ||
      part === 'OrderDateTime' ||
      part === 'Cust_ZipCode' ||
      part === 'PostalCode' ||
      part === 'AllocationPct' ||
      part === 'Calculation Group' ||
      part === 'Calculation Groups' ||
      part === 'Calculation Item' ||
      part === 'Calculation Items' ||
      part === 'YoY %' ||
      part === 'YTD' ||
      part === 'PY' ||
      /^F\d+$/.test(part) ||
      /^P\d+$/.test(part) ||
      part === 'RLS' ||
      part === 'OLS' ||
      part === '1:Many' ||
      part === 'Many:1' ||
      part === 'Many:Many' ||
      part === '1-side' ||
      part === 'Many-side' ||
      part === 'Direct Lake' ||
      part === 'DirectQuery' ||
      part === 'VertiPaq' ||
      part === 'V-Order' ||
      part === 'T-SQL';

    if (isCode) {
      const cleanCode = part.replace(/^`|`$/g, '');
      return <React.Fragment key={idx}>{renderSyntaxHighlightedCode(cleanCode)}</React.Fragment>;
    }

    return <span key={idx}>{part}</span>;
  });
}
