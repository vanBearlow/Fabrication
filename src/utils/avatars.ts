export function getReporterAvatar(reporterName: string): string {
  const initials = reporterName
    .split(' ')
    .map(n => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const colors = [
    ['#2563eb', '#1d4ed8'],
    ['#059669', '#047857'],
    ['#7c3aed', '#6d28d9'],
    ['#db2777', '#be185d'],
    ['#ea580c', '#c2410c'],
    ['#0891b2', '#0e7490']
  ];

  let hash = 0;
  for (let i = 0; i < reporterName.length; i++) {
    hash = reporterName.charCodeAt(i) + ((hash << 5) - hash);
  }
  const [bg1, bg2] = colors[Math.abs(hash) % colors.length];

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
    <defs>
      <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${bg1}"/>
        <stop offset="100%" stop-color="${bg2}"/>
      </linearGradient>
    </defs>
    <rect width="40" height="40" rx="20" fill="url(#g)"/>
    <text x="20" y="25" fill="#ffffff" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="bold" text-anchor="middle">${initials}</text>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
