type LineageNodeProps = {
  ariaLabel: string;
  iconSrc: string;
  itemType: string;
  name: string;
  status: string;
  statusTone?: 'danger' | 'neutral';
};

function LineageNode({
  ariaLabel,
  iconSrc,
  itemType,
  name,
  status,
  statusTone = 'neutral'
}: LineageNodeProps) {
  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className="flex h-[58px] min-w-0 items-center gap-2 border border-[#c8c6c4] bg-white px-3 font-sans shadow-[0_1px_3px_rgba(0,0,0,0.12)]"
    >
      <img src={iconSrc} alt="" className="h-5 w-5 flex-shrink-0 object-contain" />
      <div className="min-w-0 flex-1">
        <span className="block truncate text-[11px] font-semibold text-[#323130]">{name}</span>
        <span className="block text-[9px] text-[#605e5c]">{itemType}</span>
      </div>
      <span
        className={`flex-shrink-0 border px-1.5 py-0.5 text-[9px] font-semibold ${
          statusTone === 'danger'
            ? 'border-[#f1aeb5] bg-[#fde7e9] text-[#a4262c]'
            : 'border-[#d2d0ce] bg-[#f3f2f1] text-[#605e5c]'
        }`}
      >
        {status}
      </span>
    </div>
  );
}

export function Case6WorkloadComparison() {
  return (
    <div
      data-testid="case6-workload-comparison"
      className="overflow-hidden rounded-[2px] border border-[#c8c6c4] bg-white font-sans text-[#323130]"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#d2d0ce] bg-[#faf9f8] px-4 py-3">
        <div className="flex items-center gap-2">
          <img src="data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2232%22%20height%3D%2232%22%20fill%3D%22currentColor%22%20role%3D%22img%22%20focusable%3D%22false%22%3E%3Cpath%20fill%3D%22url(%23i7cb92d-a)%22%20fill-rule%3D%22evenodd%22%20d%3D%22m3.148%2021.322-.41%201.501c-.153.48-.367%201.186-.482%201.814a3.94%203.94%200%200%200%203.247%205.313c.554.08%201.181.075%201.884-.028l3.23-.446a2.05%202.05%200%200%200%201.695-1.49l2.223-8.164z%22%20clip-rule%3D%22evenodd%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23i7cb92d-b)%22%20d%3D%22M6.298%2021.71c-3.404.527-4.103%203.096-4.103%203.096l3.26-11.979%2017.035-2.304-2.323%208.438c-.12.452-.5.798-.971.87l-.095.016-12.898%201.879z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23i7cb92d-c)%22%20fill-opacity%3D%220.8%22%20d%3D%22M6.298%2021.71c-3.404.527-4.103%203.096-4.103%203.096l3.26-11.979%2017.035-2.304-2.323%208.438c-.12.452-.5.798-.971.87l-.095.016-12.898%201.879z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23i7cb92d-d)%22%20d%3D%22m8.23%2014.066%2018.86-2.786c.448-.06.811-.39.926-.82l1.946-7.043a1.116%201.116%200%200%200-1.218-1.408L10.75%204.668a5.03%205.03%200%200%200-4.044%203.636L4.11%2017.709c.52-1.902.84-3.05%204.12-3.643%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23i7cb92d-e)%22%20d%3D%22m8.23%2014.066%2018.86-2.786c.448-.06.811-.39.926-.82l1.946-7.043a1.116%201.116%200%200%200-1.218-1.408L10.75%204.668a5.03%205.03%200%200%200-4.044%203.636L4.11%2017.709c.52-1.902.84-3.05%204.12-3.643%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23i7cb92d-f)%22%20fill-opacity%3D%220.4%22%20d%3D%22m8.23%2014.066%2018.86-2.786c.448-.06.811-.39.926-.82l1.946-7.043a1.116%201.116%200%200%200-1.218-1.408L10.75%204.668a5.03%205.03%200%200%200-4.044%203.636L4.11%2017.709c.52-1.902.84-3.05%204.12-3.643%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23i7cb92d-g)%22%20d%3D%22M8.23%2014.066c-2.731.495-3.409%201.374-3.86%202.753l-2.175%207.988s.695-2.543%204.058-3.087L19.1%2019.848l.095-.016c.471-.071.851-.419.972-.87l1.911-6.941-13.85%202.045Z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23i7cb92d-h)%22%20fill-opacity%3D%220.2%22%20d%3D%22M8.23%2014.066c-2.731.495-3.409%201.374-3.86%202.753l-2.175%207.988s.695-2.543%204.058-3.087L19.1%2019.848l.095-.016c.471-.071.851-.419.972-.87l1.911-6.941-13.85%202.045Z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23i7cb92d-i)%22%20fill-rule%3D%22evenodd%22%20d%3D%22M6.253%2021.72c-2.842.46-3.775%202.342-3.997%202.916a3.94%203.94%200%200%200%203.247%205.314c.554.08%201.181.075%201.884-.028l3.23-.446a2.05%202.05%200%200%200%201.695-1.49l2.026-7.443z%22%20clip-rule%3D%22evenodd%22%3E%3C%2Fpath%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22i7cb92d-a%22%20x1%3D%228.268%22%20x2%3D%228.268%22%20y1%3D%2230.005%22%20y2%3D%2219.822%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20offset%3D%220.056%22%20stop-color%3D%22%232AAC94%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.155%22%20stop-color%3D%22%23239C87%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.372%22%20stop-color%3D%22%23177E71%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.588%22%20stop-color%3D%22%230E6961%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.799%22%20stop-color%3D%22%23095D57%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23085954%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22i7cb92d-b%22%20x1%3D%2221.134%22%20x2%3D%2211.302%22%20y1%3D%2222.617%22%20y2%3D%2211.923%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20offset%3D%220.042%22%20stop-color%3D%22%23ABE88E%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.549%22%20stop-color%3D%22%232AAA92%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.906%22%20stop-color%3D%22%23117865%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22i7cb92d-c%22%20x1%3D%22-3.028%22%20x2%3D%226.329%22%20y1%3D%2222.097%22%20y2%3D%2218.906%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%236AD6F9%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%236AD6F9%22%20stop-opacity%3D%220%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22i7cb92d-d%22%20x1%3D%224.11%22%20x2%3D%2229.016%22%20y1%3D%229.855%22%20y2%3D%229.855%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20offset%3D%220.043%22%20stop-color%3D%22%2325FFD4%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.874%22%20stop-color%3D%22%2355DDB9%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22i7cb92d-e%22%20x1%3D%224.11%22%20x2%3D%2226.546%22%20y1%3D%226.373%22%20y2%3D%2216.791%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%236AD6F9%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.23%22%20stop-color%3D%22%2360E9D0%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.651%22%20stop-color%3D%22%236DE9BB%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.994%22%20stop-color%3D%22%23ABE88E%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22i7cb92d-f%22%20x1%3D%226.185%22%20x2%3D%2218.385%22%20y1%3D%228.323%22%20y2%3D%2211.021%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23fff%22%20stop-opacity%3D%220%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.459%22%20stop-color%3D%22%23fff%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23fff%22%20stop-opacity%3D%220%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22i7cb92d-g%22%20x1%3D%2210.23%22%20x2%3D%2210.518%22%20y1%3D%2218.774%22%20y2%3D%2210.219%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20offset%3D%220.205%22%20stop-color%3D%22%23063D3B%22%20stop-opacity%3D%220%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.586%22%20stop-color%3D%22%23063D3B%22%20stop-opacity%3D%220.237%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.872%22%20stop-color%3D%22%23063D3B%22%20stop-opacity%3D%220.75%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22i7cb92d-h%22%20x1%3D%221.166%22%20x2%3D%2211.592%22%20y1%3D%2217.923%22%20y2%3D%2219.884%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23fff%22%20stop-opacity%3D%220%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.459%22%20stop-color%3D%22%23fff%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23fff%22%20stop-opacity%3D%220%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22i7cb92d-i%22%20x1%3D%228.698%22%20x2%3D%226.664%22%20y1%3D%2227.183%22%20y2%3D%2217.238%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20offset%3D%220.064%22%20stop-color%3D%22%23063D3B%22%20stop-opacity%3D%220%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.17%22%20stop-color%3D%22%23063D3B%22%20stop-opacity%3D%220.135%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.562%22%20stop-color%3D%22%23063D3B%22%20stop-opacity%3D%220.599%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.85%22%20stop-color%3D%22%23063D3B%22%20stop-opacity%3D%220.9%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23063D3B%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3C%2Fsvg%3E" alt="Microsoft Fabric" className="h-5 w-5 object-contain" />
          <div>
            <span className="block text-[12px] font-semibold text-[#201f1e]">
              Microsoft Fabric • Analytical store comparison
            </span>
            <span className="block text-[9px] text-[#605e5c]">
              Corporate Treasury curated data platform
            </span>
          </div>
        </div>
        <span className="border border-[#c8c6c4] bg-white px-2 py-1 text-[9px] font-semibold text-[#323130]">
          Workload assessment
        </span>
      </div>

      <div className="grid border-b border-[#d2d0ce] text-[10px] sm:grid-cols-3 sm:divide-x sm:divide-[#d2d0ce]">
        <div className="flex items-center justify-between gap-3 border-b border-[#edebe9] px-4 py-3 sm:border-b-0">
          <span className="text-[#605e5c]">Consumers</span>
          <span className="font-semibold">30 SQL analysts</span>
        </div>
        <div className="flex items-center justify-between gap-3 border-b border-[#edebe9] px-4 py-3 sm:border-b-0">
          <span className="text-[#605e5c]">Primary skill</span>
          <span className="font-semibold">Advanced T-SQL</span>
        </div>
        <div className="flex items-center justify-between gap-3 px-4 py-3">
          <span className="text-[#605e5c]">Required surface</span>
          <span className="font-semibold">DML + transactions</span>
        </div>
      </div>

      <div className="overflow-x-auto p-4">
        <table
          aria-label="Warehouse and Lakehouse workload comparison"
          className="w-full min-w-[800px] border-collapse text-left text-[10px]"
        >
          <thead>
            <tr className="border border-[#d2d0ce] bg-[#f3f2f1]">
              <th className="w-[26%] px-3 py-2.5 font-semibold">Workload requirement</th>
              <th className="w-[37%] border-l-2 border-[#f2c811] bg-[#fffdf3] px-3 py-2.5 font-semibold">
                <span className="flex items-center justify-between gap-3">
                  <span className="flex items-center gap-2">
                    <img
                      src="data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2232%22%20height%3D%2232%22%20fill%3D%22currentColor%22%20role%3D%22img%22%20focusable%3D%22false%22%3E%3Cpath%20fill%3D%22url(%23i15919b-a)%22%20d%3D%22M5%205.5A3.5%203.5%200%200%201%208.5%202h15A3.5%203.5%200%200%201%2027%205.5v21a3.5%203.5%200%200%201-3.5%203.5h-15A3.5%203.5%200%200%201%205%2026.5z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23i15919b-b)%22%20fill-opacity%3D%220.2%22%20d%3D%22M5%205.5A3.5%203.5%200%200%201%208.5%202h15A3.5%203.5%200%200%201%2027%205.5v21a3.5%203.5%200%200%201-3.5%203.5h-15A3.5%203.5%200%200%201%205%2026.5z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23i15919b-c)%22%20fill-rule%3D%22evenodd%22%20d%3D%22M23.5%203h-15A2.5%202.5%200%200%200%206%205.5v21A2.5%202.5%200%200%200%208.5%2029h15a2.5%202.5%200%200%200%202.5-2.5v-21A2.5%202.5%200%200%200%2023.5%203m-15-1A3.5%203.5%200%200%200%205%205.5v21A3.5%203.5%200%200%200%208.5%2030h15a3.5%203.5%200%200%200%203.5-3.5v-21A3.5%203.5%200%200%200%2023.5%202z%22%20clip-rule%3D%22evenodd%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23i15919b-d)%22%20d%3D%22M23%2022a2%202%200%200%201-2%202H11a2%202%200%200%201-2-2v-6.4a2%202%200%200%201%20.674-1.497l5-4.428a2%202%200%200%201%202.653%200l5%204.428A2%202%200%200%201%2023%2015.6z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22%23B4CDF8%22%20d%3D%22M13%2016a1%201%200%201%201-2%200%201%201%200%200%201%202%200m4%200a1%201%200%201%201-2%200%201%201%200%200%201%202%200m3%201a1%201%200%201%200%200-2%201%201%200%200%200%200%202m-3%203a1%201%200%201%201-2%200%201%201%200%200%201%202%200m-5%201a1%201%200%201%200%200-2%201%201%200%200%200%200%202m9-1a1%201%200%201%201-2%200%201%201%200%200%201%202%200%22%3E%3C%2Fpath%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22i15919b-a%22%20x1%3D%2211.111%22%20x2%3D%2215.576%22%20y1%3D%222%22%20y2%3D%2230.067%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23fff%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23EBEBEB%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22i15919b-c%22%20x1%3D%2212.104%22%20x2%3D%2216.851%22%20y1%3D%222%22%20y2%3D%2229.972%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23BBB%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23888%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22i15919b-d%22%20x1%3D%229%22%20x2%3D%2223.804%22%20y1%3D%229.172%22%20y2%3D%2223.149%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%233477EA%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%231D53A4%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3CradialGradient%20id%3D%22i15919b-b%22%20cx%3D%220%22%20cy%3D%220%22%20r%3D%221%22%20gradientTransform%3D%22matrix(11.61113%2022.16669%20-17.08352%208.94852%2012.028%209.292)%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20offset%3D%220.177%22%20stop-color%3D%22%23fff%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23B8B8B8%22%3E%3C%2Fstop%3E%3C%2FradialGradient%3E%3C%2Fdefs%3E%3C%2Fsvg%3E"
                      alt="Fabric Warehouse"
                      className="h-5 w-5 object-contain"
                    />
                    <span>
                      <span className="block text-[11px]">Fabric Warehouse</span>
                      <span className="block text-[9px] font-normal text-[#605e5c]">SQL-first analytical store</span>
                    </span>
                  </span>
                  <span className="border border-[#d6b300] bg-[#fff4ce] px-1.5 py-0.5 text-[9px] font-semibold">
                    Best fit
                  </span>
                </span>
              </th>
              <th className="w-[37%] border-l border-[#d2d0ce] px-3 py-2.5 font-semibold">
                <span className="flex items-center gap-2">
                  <img
                    src="data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2232%22%20height%3D%2232%22%20fill%3D%22currentColor%22%20role%3D%22img%22%20focusable%3D%22false%22%3E%3Cpath%20fill%3D%22url(%23iab4f30-a)%22%20d%3D%22M5%205.5A3.5%203.5%200%200%201%208.5%202h15A3.5%203.5%200%200%201%2027%205.5v21a3.5%203.5%200%200%201-3.5%203.5h-15A3.5%203.5%200%200%201%205%2026.5z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23iab4f30-b)%22%20fill-opacity%3D%220.2%22%20d%3D%22M5%205.5A3.5%203.5%200%200%201%208.5%202h15A3.5%203.5%200%200%201%2027%205.5v21a3.5%203.5%200%200%201-3.5%203.5h-15A3.5%203.5%200%200%201%205%2026.5z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23iab4f30-c)%22%20fill-rule%3D%22evenodd%22%20d%3D%22M23.5%203h-15A2.5%202.5%200%200%200%206%205.5v21A2.5%202.5%200%200%200%208.5%2029h15a2.5%202.5%200%200%200%202.5-2.5v-21A2.5%202.5%200%200%200%2023.5%203m-15-1A3.5%203.5%200%200%200%205%205.5v21A3.5%203.5%200%200%200%208.5%2030h15a3.5%203.5%200%200%200%203.5-3.5v-21A3.5%203.5%200%200%200%2023.5%202z%22%20clip-rule%3D%22evenodd%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23iab4f30-d)%22%20d%3D%22M13.99%2022.69a1.5%201.5%200%200%200-.154.31H11a2%202%200%200%201-2-2v-6.4a2%202%200%200%201%20.674-1.497l5-4.428a2%202%200%200%201%202.653%200l5%204.428A2%202%200%200%201%2023%2014.6v3.409L22.98%2018a1.5%201.5%200%200%200-.94-.01l-.12.05c-.37.15-.66.44-.81.81-.01.02-.05.07-.11.13-.06-.05-.11-.11-.11-.13a1.49%201.49%200%200%200-1.39-.93h-.14a1.5%201.5%200%200%200-1.256.94%201%201%200%200%201-.104.12c-.06-.05-.11-.11-.11-.13a1.49%201.49%200%200%200-1.39-.93h-.14c-.57.05-1.05.42-1.26.95-.04.08-.06.13-.06.13q-.013.012-.09.032l-.03.008a1.5%201.5%200%200%200-1.13%201.79%201.46%201.46%200%200%200%201.264%201.15l-.004.01c-.008.009-.038.017-.09.032l-.03.008c-.39.09-.73.32-.94.66%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23iab4f30-e)%22%20d%3D%22M23.75%2021h-.01a.502.502%200%200%200%20.1-.99c-.47-.11-.71-.31-.89-.78a.49.49%200%200%200-.46-.32c-.2%200-.38.12-.46.31-.15.38-.6.78-1.04.78s-.88-.41-1.03-.78c-.16-.38-.78-.38-.93%200s-.6.78-1.04.78-.88-.41-1.03-.78c-.08-.19-.26-.33-.47-.31-.2%200-.39.13-.46.32-.18.47-.41.67-.89.78-.27.06-.44.33-.38.6s.33.43.6.38c.5-.11.88-.32%201.17-.65.37.38.86.66%201.46.66s1.13-.29%201.51-.69c.37.39.91.69%201.49.69s1.1-.28%201.48-.66c.29.33.67.54%201.17.65.031.008.08.01.1.01h-.01z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23iab4f30-f)%22%20d%3D%22M23.75%2024h-.01a.502.502%200%200%200%20.1-.99c-.47-.11-.71-.31-.89-.78a.49.49%200%200%200-.46-.32c-.2%200-.38.12-.46.31-.15.38-.6.78-1.04.78s-.88-.41-1.03-.78c-.16-.38-.78-.38-.93%200s-.6.78-1.04.78-.88-.41-1.03-.78c-.08-.19-.26-.33-.47-.31-.2%200-.39.13-.46.32-.18.47-.41.67-.89.78-.27.06-.44.33-.38.6s.33.43.6.38c.5-.11.88-.32%201.17-.65.37.38.86.66%201.46.66s1.13-.29%201.51-.69c.37.39.91.69%201.49.69s1.1-.28%201.48-.66c.29.33.67.54%201.17.65.031.008.08.01.1.01h-.01z%22%3E%3C%2Fpath%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22iab4f30-a%22%20x1%3D%2211.111%22%20x2%3D%2215.576%22%20y1%3D%222%22%20y2%3D%2230.067%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23fff%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23EBEBEB%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22iab4f30-c%22%20x1%3D%2212.104%22%20x2%3D%2216.851%22%20y1%3D%222%22%20y2%3D%2229.972%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23BBB%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23888%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22iab4f30-d%22%20x1%3D%229%22%20x2%3D%2224.817%22%20y1%3D%228.172%22%20y2%3D%2223.393%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%233477EA%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%231D53A4%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22iab4f30-e%22%20x1%3D%229%22%20x2%3D%2224.817%22%20y1%3D%228.172%22%20y2%3D%2223.393%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%233477EA%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%231D53A4%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22iab4f30-f%22%20x1%3D%229%22%20x2%3D%2224.817%22%20y1%3D%228.172%22%20y2%3D%2223.393%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%233477EA%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%231D53A4%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3CradialGradient%20id%3D%22iab4f30-b%22%20cx%3D%220%22%20cy%3D%220%22%20r%3D%221%22%20gradientTransform%3D%22matrix(11.61113%2022.16669%20-17.08352%208.94852%2012.028%209.292)%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20offset%3D%220.177%22%20stop-color%3D%22%23fff%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23B8B8B8%22%3E%3C%2Fstop%3E%3C%2FradialGradient%3E%3C%2Fdefs%3E%3C%2Fsvg%3E"
                    alt="Fabric Lakehouse"
                    className="h-5 w-5 object-contain"
                  />
                  <span>
                    <span className="block text-[11px]">Fabric Lakehouse</span>
                    <span className="block text-[9px] font-normal text-[#605e5c]">Multi-engine data store</span>
                  </span>
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-x border-b border-[#d2d0ce] align-top">
              <td className="px-3 py-2.5 font-semibold">T-SQL table data modification</td>
              <td className="border-l-2 border-[#f2c811] bg-[#fffdf3] px-3 py-2.5">
                <span className="block font-semibold text-[#0b6a0b]">Supported</span>
                <span className="mt-0.5 block text-[#605e5c]">INSERT, UPDATE, DELETE, MERGE and load statements</span>
              </td>
              <td className="border-l border-[#edebe9] px-3 py-2.5">
                <span className="block font-semibold text-[#a4262c]">Not supported through the SQL endpoint</span>
                <span className="mt-0.5 block text-[#605e5c]">Modify Lakehouse tables through Spark or another supported writer</span>
              </td>
            </tr>
            <tr className="border-x border-b border-[#d2d0ce] align-top">
              <td className="px-3 py-2.5 font-semibold">Cross-table transactions</td>
              <td className="border-l-2 border-[#f2c811] bg-[#fffdf3] px-3 py-2.5">
                <span className="block font-semibold text-[#0b6a0b]">Aligned</span>
                <span className="mt-0.5 block text-[#605e5c]">Full multi-table ACID transactions on the Warehouse surface</span>
              </td>
              <td className="border-l border-[#edebe9] px-3 py-2.5">
                <span className="block font-semibold text-[#a4262c]">No table-data transactions in T-SQL</span>
                <span className="mt-0.5 block text-[#605e5c]">The SQL analytics endpoint is read-only over Delta tables</span>
              </td>
            </tr>
            <tr className="border-x border-b border-[#d2d0ce] align-top">
              <td className="px-3 py-2.5 font-semibold">Views, functions and procedures</td>
              <td className="border-l-2 border-[#f2c811] bg-[#fffdf3] px-3 py-2.5">
                <span className="block font-semibold">Supported with the writable SQL workload</span>
                <span className="mt-0.5 block text-[#605e5c]">Reusable T-SQL logic can participate in the curated store design</span>
              </td>
              <td className="border-l border-[#edebe9] px-3 py-2.5">
                <span className="block font-semibold">Supported as query objects</span>
                <span className="mt-0.5 block text-[#605e5c]">They do not make the underlying Lakehouse tables writable</span>
              </td>
            </tr>
            <tr className="border-x border-b border-[#d2d0ce] align-top">
              <td className="px-3 py-2.5 font-semibold">Team operating model</td>
              <td className="border-l-2 border-[#f2c811] bg-[#fffdf3] px-3 py-2.5">
                <span className="block font-semibold text-[#0b6a0b]">Uses the team’s current skills</span>
                <span className="mt-0.5 block text-[#605e5c]">Curate and serve the model primarily with T-SQL</span>
              </td>
              <td className="border-l border-[#edebe9] px-3 py-2.5">
                <span className="block font-semibold">Adds a separate write path</span>
                <span className="mt-0.5 block text-[#605e5c]">Appropriate when Spark and data-engineering workflows are intentional</span>
              </td>
            </tr>
            <tr className="border-x border-b border-[#d2d0ce] align-top">
              <td className="px-3 py-2.5 font-semibold">OneLake and Power BI</td>
              <td className="border-l-2 border-[#f2c811] bg-[#fffdf3] px-3 py-2.5">
                <span className="block font-semibold">Open Delta storage in OneLake</span>
                <span className="mt-0.5 block text-[#605e5c]">Designed for governed relational BI workloads</span>
              </td>
              <td className="border-l border-[#edebe9] px-3 py-2.5">
                <span className="block font-semibold">Open Delta storage in OneLake</span>
                <span className="mt-0.5 block text-[#605e5c]">Designed for mixed data-engineering and analytics workloads</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="grid border-t border-[#d2d0ce] bg-[#faf9f8] text-[10px] sm:grid-cols-[1fr_2fr] sm:divide-x sm:divide-[#d2d0ce]">
        <div className="border-l-[3px] border-[#f2c811] px-4 py-3">
          <span className="block text-[#605e5c]">Decision for this workload</span>
          <span className="mt-1 block text-[12px] font-semibold text-[#201f1e]">Fabric Warehouse</span>
        </div>
        <div className="border-t border-[#d2d0ce] px-4 py-3 sm:border-t-0">
          <span className="block text-[#605e5c]">Implementation check</span>
          <span className="mt-1 block font-semibold">
            Validate every required T-SQL statement against the documented Fabric Warehouse surface.
          </span>
        </div>
      </div>
    </div>
  );
}

export function Case6DecisionRecord() {
  return (
    <div
      data-testid="case6-decision-record"
      className="overflow-hidden rounded-[2px] border border-[#c8c6c4] bg-white font-sans text-[#323130]"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#d2d0ce] bg-[#faf9f8] px-4 py-3">
        <div className="flex items-center gap-3">
          <img
            src="data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2232%22%20height%3D%2232%22%20fill%3D%22currentColor%22%20role%3D%22img%22%20focusable%3D%22false%22%3E%3Cpath%20fill%3D%22url(%23i15919b-a)%22%20d%3D%22M5%205.5A3.5%203.5%200%200%201%208.5%202h15A3.5%203.5%200%200%201%2027%205.5v21a3.5%203.5%200%200%201-3.5%203.5h-15A3.5%203.5%200%200%201%205%2026.5z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23i15919b-b)%22%20fill-opacity%3D%220.2%22%20d%3D%22M5%205.5A3.5%203.5%200%200%201%208.5%202h15A3.5%203.5%200%200%201%2027%205.5v21a3.5%203.5%200%200%201-3.5%203.5h-15A3.5%203.5%200%200%201%205%2026.5z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23i15919b-c)%22%20fill-rule%3D%22evenodd%22%20d%3D%22M23.5%203h-15A2.5%202.5%200%200%200%206%205.5v21A2.5%202.5%200%200%200%208.5%2029h15a2.5%202.5%200%200%200%202.5-2.5v-21A2.5%202.5%200%200%200%2023.5%203m-15-1A3.5%203.5%200%200%200%205%205.5v21A3.5%203.5%200%200%200%208.5%2030h15a3.5%203.5%200%200%200%203.5-3.5v-21A3.5%203.5%200%200%200%2023.5%202z%22%20clip-rule%3D%22evenodd%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23i15919b-d)%22%20d%3D%22M23%2022a2%202%200%200%201-2%202H11a2%202%200%200%201-2-2v-6.4a2%202%200%200%201%20.674-1.497l5-4.428a2%202%200%200%201%202.653%200l5%204.428A2%202%200%200%201%2023%2015.6z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22%23B4CDF8%22%20d%3D%22M13%2016a1%201%200%201%201-2%200%201%201%200%200%201%202%200m4%200a1%201%200%201%201-2%200%201%201%200%200%201%202%200m3%201a1%201%200%201%200%200-2%201%201%200%200%200%200%202m-3%203a1%201%200%201%201-2%200%201%201%200%200%201%202%200m-5%201a1%201%200%201%200%200-2%201%201%200%200%200%200%202m9-1a1%201%200%201%201-2%200%201%201%200%200%201%202%200%22%3E%3C%2Fpath%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22i15919b-a%22%20x1%3D%2211.111%22%20x2%3D%2215.576%22%20y1%3D%222%22%20y2%3D%2230.067%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23fff%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23EBEBEB%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22i15919b-c%22%20x1%3D%2212.104%22%20x2%3D%2216.851%22%20y1%3D%222%22%20y2%3D%2229.972%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23BBB%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23888%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22i15919b-d%22%20x1%3D%229%22%20x2%3D%2223.804%22%20y1%3D%229.172%22%20y2%3D%2223.149%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%233477EA%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%231D53A4%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3CradialGradient%20id%3D%22i15919b-b%22%20cx%3D%220%22%20cy%3D%220%22%20r%3D%221%22%20gradientTransform%3D%22matrix(11.61113%2022.16669%20-17.08352%208.94852%2012.028%209.292)%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20offset%3D%220.177%22%20stop-color%3D%22%23fff%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23B8B8B8%22%3E%3C%2Fstop%3E%3C%2FradialGradient%3E%3C%2Fdefs%3E%3C%2Fsvg%3E"
            alt="Fabric Warehouse"
            className="h-6 w-6 object-contain"
          />
          <div>
            <span className="block text-[13px] font-semibold text-[#201f1e]">
              ADR-042 · Curated analytical store
            </span>
            <span className="block text-[10px] text-[#605e5c]">
              Corporate Treasury · Fabric platform architecture
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-[10px]">
          <span className="border border-[#c8c6c4] bg-white px-2 py-1 text-[#605e5c]">
            RFC-2026-TREASURY-01
          </span>
          <span className="border border-[#107c10] bg-[#f1faf1] px-2 py-1 font-semibold text-[#0b6a0b]">
            Accepted
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 divide-x divide-y divide-[#edebe9] border-b border-[#d2d0ce] text-[10px] sm:grid-cols-4 sm:divide-y-0">
        <div className="px-4 py-3">
          <span className="block uppercase tracking-[0.08em] text-[#605e5c]">Owner</span>
          <span className="mt-1 block font-semibold">Amara Okafor</span>
          <span className="text-[#605e5c]">BI Engineering Lead</span>
        </div>
        <div className="px-4 py-3">
          <span className="block uppercase tracking-[0.08em] text-[#605e5c]">Stakeholder</span>
          <span className="mt-1 block font-semibold">Corporate Treasury</span>
          <span className="text-[#605e5c]">30 SQL-first analysts</span>
        </div>
        <div className="px-4 py-3">
          <span className="block uppercase tracking-[0.08em] text-[#605e5c]">Decision</span>
          <span className="mt-1 block font-semibold">Fabric Warehouse</span>
          <span className="text-[#605e5c]">Analytical SQL store</span>
        </div>
        <div className="px-4 py-3">
          <span className="block uppercase tracking-[0.08em] text-[#605e5c]">Scope</span>
          <span className="mt-1 block font-semibold">Production wave 1</span>
          <span className="text-[#605e5c]">Curated finance model</span>
        </div>
      </div>

      <div className="overflow-x-auto p-4">
        <table
          aria-label="Fabric analytical store decision matrix"
          className="min-w-[760px] w-full border-collapse text-left text-[10px]"
        >
          <thead>
            <tr className="border border-[#d2d0ce] bg-[#f3f2f1] text-[#323130]">
              <th className="w-[22%] px-3 py-2 font-semibold">Decision driver</th>
              <th className="w-[25%] border-l border-[#d2d0ce] px-3 py-2 font-semibold">Required operating model</th>
              <th className="w-[25%] border-l border-[#d2d0ce] px-3 py-2 font-semibold">
                <span className="flex items-center gap-2">
                  <img src="data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2232%22%20height%3D%2232%22%20fill%3D%22currentColor%22%20role%3D%22img%22%20focusable%3D%22false%22%3E%3Cpath%20fill%3D%22url(%23iab4f30-a)%22%20d%3D%22M5%205.5A3.5%203.5%200%200%201%208.5%202h15A3.5%203.5%200%200%201%2027%205.5v21a3.5%203.5%200%200%201-3.5%203.5h-15A3.5%203.5%200%200%201%205%2026.5z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23iab4f30-b)%22%20fill-opacity%3D%220.2%22%20d%3D%22M5%205.5A3.5%203.5%200%200%201%208.5%202h15A3.5%203.5%200%200%201%2027%205.5v21a3.5%203.5%200%200%201-3.5%203.5h-15A3.5%203.5%200%200%201%205%2026.5z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23iab4f30-c)%22%20fill-rule%3D%22evenodd%22%20d%3D%22M23.5%203h-15A2.5%202.5%200%200%200%206%205.5v21A2.5%202.5%200%200%200%208.5%2029h15a2.5%202.5%200%200%200%202.5-2.5v-21A2.5%202.5%200%200%200%2023.5%203m-15-1A3.5%203.5%200%200%200%205%205.5v21A3.5%203.5%200%200%200%208.5%2030h15a3.5%203.5%200%200%200%203.5-3.5v-21A3.5%203.5%200%200%200%2023.5%202z%22%20clip-rule%3D%22evenodd%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23iab4f30-d)%22%20d%3D%22M13.99%2022.69a1.5%201.5%200%200%200-.154.31H11a2%202%200%200%201-2-2v-6.4a2%202%200%200%201%20.674-1.497l5-4.428a2%202%200%200%201%202.653%200l5%204.428A2%202%200%200%201%2023%2014.6v3.409L22.98%2018a1.5%201.5%200%200%200-.94-.01l-.12.05c-.37.15-.66.44-.81.81-.01.02-.05.07-.11.13-.06-.05-.11-.11-.11-.13a1.49%201.49%200%200%200-1.39-.93h-.14a1.5%201.5%200%200%200-1.256.94%201%201%200%200%201-.104.12c-.06-.05-.11-.11-.11-.13a1.49%201.49%200%200%200-1.39-.93h-.14c-.57.05-1.05.42-1.26.95-.04.08-.06.13-.06.13q-.013.012-.09.032l-.03.008a1.5%201.5%200%200%200-1.13%201.79%201.46%201.46%200%200%200%201.264%201.15l-.004.01c-.008.009-.038.017-.09.032l-.03.008c-.39.09-.73.32-.94.66%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23iab4f30-e)%22%20d%3D%22M23.75%2021h-.01a.502.502%200%200%200%20.1-.99c-.47-.11-.71-.31-.89-.78a.49.49%200%200%200-.46-.32c-.2%200-.38.12-.46.31-.15.38-.6.78-1.04.78s-.88-.41-1.03-.78c-.16-.38-.78-.38-.93%200s-.6.78-1.04.78-.88-.41-1.03-.78c-.08-.19-.26-.33-.47-.31-.2%200-.39.13-.46.32-.18.47-.41.67-.89.78-.27.06-.44.33-.38.6s.33.43.6.38c.5-.11.88-.32%201.17-.65.37.38.86.66%201.46.66s1.13-.29%201.51-.69c.37.39.91.69%201.49.69s1.1-.28%201.48-.66c.29.33.67.54%201.17.65.031.008.08.01.1.01h-.01z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23iab4f30-f)%22%20d%3D%22M23.75%2024h-.01a.502.502%200%200%200%20.1-.99c-.47-.11-.71-.31-.89-.78a.49.49%200%200%200-.46-.32c-.2%200-.38.12-.46.31-.15.38-.6.78-1.04.78s-.88-.41-1.03-.78c-.16-.38-.78-.38-.93%200s-.6.78-1.04.78-.88-.41-1.03-.78c-.08-.19-.26-.33-.47-.31-.2%200-.39.13-.46.32-.18.47-.41.67-.89.78-.27.06-.44.33-.38.6s.33.43.6.38c.5-.11.88-.32%201.17-.65.37.38.86.66%201.46.66s1.13-.29%201.51-.69c.37.39.91.69%201.49.69s1.1-.28%201.48-.66c.29.33.67.54%201.17.65.031.008.08.01.1.01h-.01z%22%3E%3C%2Fpath%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22iab4f30-a%22%20x1%3D%2211.111%22%20x2%3D%2215.576%22%20y1%3D%222%22%20y2%3D%2230.067%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23fff%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23EBEBEB%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22iab4f30-c%22%20x1%3D%2212.104%22%20x2%3D%2216.851%22%20y1%3D%222%22%20y2%3D%2229.972%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23BBB%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23888%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22iab4f30-d%22%20x1%3D%229%22%20x2%3D%2224.817%22%20y1%3D%228.172%22%20y2%3D%2223.393%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%233477EA%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%231D53A4%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22iab4f30-e%22%20x1%3D%229%22%20x2%3D%2224.817%22%20y1%3D%228.172%22%20y2%3D%2223.393%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%233477EA%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%231D53A4%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22iab4f30-f%22%20x1%3D%229%22%20x2%3D%2224.817%22%20y1%3D%228.172%22%20y2%3D%2223.393%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%233477EA%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%231D53A4%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3CradialGradient%20id%3D%22iab4f30-b%22%20cx%3D%220%22%20cy%3D%220%22%20r%3D%221%22%20gradientTransform%3D%22matrix(11.61113%2022.16669%20-17.08352%208.94852%2012.028%209.292)%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20offset%3D%220.177%22%20stop-color%3D%22%23fff%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23B8B8B8%22%3E%3C%2Fstop%3E%3C%2FradialGradient%3E%3C%2Fdefs%3E%3C%2Fsvg%3E" alt="" className="h-4 w-4 object-contain" />
                  Fabric Lakehouse
                </span>
              </th>
              <th className="w-[28%] border-l-2 border-[#f2c811] bg-[#fffdf3] px-3 py-2 font-semibold">
                <span className="flex items-center justify-between gap-2">
                  <span className="flex items-center gap-2">
                    <img src="data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2232%22%20height%3D%2232%22%20fill%3D%22currentColor%22%20role%3D%22img%22%20focusable%3D%22false%22%3E%3Cpath%20fill%3D%22url(%23i15919b-a)%22%20d%3D%22M5%205.5A3.5%203.5%200%200%201%208.5%202h15A3.5%203.5%200%200%201%2027%205.5v21a3.5%203.5%200%200%201-3.5%203.5h-15A3.5%203.5%200%200%201%205%2026.5z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23i15919b-b)%22%20fill-opacity%3D%220.2%22%20d%3D%22M5%205.5A3.5%203.5%200%200%201%208.5%202h15A3.5%203.5%200%200%201%2027%205.5v21a3.5%203.5%200%200%201-3.5%203.5h-15A3.5%203.5%200%200%201%205%2026.5z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23i15919b-c)%22%20fill-rule%3D%22evenodd%22%20d%3D%22M23.5%203h-15A2.5%202.5%200%200%200%206%205.5v21A2.5%202.5%200%200%200%208.5%2029h15a2.5%202.5%200%200%200%202.5-2.5v-21A2.5%202.5%200%200%200%2023.5%203m-15-1A3.5%203.5%200%200%200%205%205.5v21A3.5%203.5%200%200%200%208.5%2030h15a3.5%203.5%200%200%200%203.5-3.5v-21A3.5%203.5%200%200%200%2023.5%202z%22%20clip-rule%3D%22evenodd%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23i15919b-d)%22%20d%3D%22M23%2022a2%202%200%200%201-2%202H11a2%202%200%200%201-2-2v-6.4a2%202%200%200%201%20.674-1.497l5-4.428a2%202%200%200%201%202.653%200l5%204.428A2%202%200%200%201%2023%2015.6z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22%23B4CDF8%22%20d%3D%22M13%2016a1%201%200%201%201-2%200%201%201%200%200%201%202%200m4%200a1%201%200%201%201-2%200%201%201%200%200%201%202%200m3%201a1%201%200%201%200%200-2%201%201%200%200%200%200%202m-3%203a1%201%200%201%201-2%200%201%201%200%200%201%202%200m-5%201a1%201%200%201%200%200-2%201%201%200%200%200%200%202m9-1a1%201%200%201%201-2%200%201%201%200%200%201%202%200%22%3E%3C%2Fpath%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22i15919b-a%22%20x1%3D%2211.111%22%20x2%3D%2215.576%22%20y1%3D%222%22%20y2%3D%2230.067%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23fff%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23EBEBEB%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22i15919b-c%22%20x1%3D%2212.104%22%20x2%3D%2216.851%22%20y1%3D%222%22%20y2%3D%2229.972%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23BBB%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23888%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22i15919b-d%22%20x1%3D%229%22%20x2%3D%2223.804%22%20y1%3D%229.172%22%20y2%3D%2223.149%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%233477EA%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%231D53A4%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3CradialGradient%20id%3D%22i15919b-b%22%20cx%3D%220%22%20cy%3D%220%22%20r%3D%221%22%20gradientTransform%3D%22matrix(11.61113%2022.16669%20-17.08352%208.94852%2012.028%209.292)%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20offset%3D%220.177%22%20stop-color%3D%22%23fff%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23B8B8B8%22%3E%3C%2Fstop%3E%3C%2FradialGradient%3E%3C%2Fdefs%3E%3C%2Fsvg%3E" alt="" className="h-4 w-4 object-contain" />
                    Fabric Warehouse
                  </span>
                  <span className="border border-[#d2d0ce] bg-white px-1.5 py-0.5 text-[9px]">Selected</span>
                </span>
              </th>
            </tr>
          </thead>
          <tbody className="text-[#323130]">
            <tr className="border-x border-b border-[#d2d0ce]">
              <td className="px-3 py-2 font-semibold">Table data changes</td>
              <td className="border-l border-[#edebe9] px-3 py-2">T-SQL INSERT, UPDATE, DELETE and MERGE</td>
              <td className="border-l border-[#edebe9] px-3 py-2 text-[#a4262c]">SQL endpoint cannot modify Lakehouse table data</td>
              <td className="border-l-2 border-[#f2c811] bg-[#fffdf3] px-3 py-2 font-semibold">Supported on the Warehouse T-SQL surface</td>
            </tr>
            <tr className="border-x border-b border-[#d2d0ce]">
              <td className="px-3 py-2 font-semibold">Transactions and procedures</td>
              <td className="border-l border-[#edebe9] px-3 py-2">Stored procedures and multi-table transactions</td>
              <td className="border-l border-[#edebe9] px-3 py-2 text-[#605e5c]">Requires a separate writer for table-data changes</td>
              <td className="border-l-2 border-[#f2c811] bg-[#fffdf3] px-3 py-2 font-semibold">Aligned to the SQL-first workload</td>
            </tr>
            <tr className="border-x border-b border-[#d2d0ce]">
              <td className="px-3 py-2 font-semibold">Team skills</td>
              <td className="border-l border-[#edebe9] px-3 py-2">Advanced T-SQL; no Python or Spark</td>
              <td className="border-l border-[#edebe9] px-3 py-2 text-[#a4262c]">Spark engineering required for table writes</td>
              <td className="border-l-2 border-[#f2c811] bg-[#fffdf3] px-3 py-2 font-semibold">Uses the team’s existing SQL skills</td>
            </tr>
            <tr className="border-x border-b border-[#d2d0ce]">
              <td className="px-3 py-2 font-semibold">Relational integrity</td>
              <td className="border-l border-[#edebe9] px-3 py-2">Primary, unique and foreign-key rules</td>
              <td className="border-l border-[#edebe9] px-3 py-2">Validate integrity in ingestion logic</td>
              <td className="border-l-2 border-[#f2c811] bg-[#fffdf3] px-3 py-2 font-semibold">Constraints are metadata only; validate in the load</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="grid border-t border-[#d2d0ce] text-[10px] sm:grid-cols-2 sm:divide-x sm:divide-[#d2d0ce]">
        <div className="px-4 py-3">
          <span className="block uppercase tracking-[0.08em] text-[#605e5c]">Decision rationale</span>
          <p className="mt-1 leading-4">
            Select the analytical store whose documented SQL surface matches the required modification,
            procedure and transaction workload.
          </p>
        </div>
        <div className="border-t border-[#d2d0ce] px-4 py-3 sm:border-t-0">
          <span className="block uppercase tracking-[0.08em] text-[#605e5c]">Implementation constraint</span>
          <p className="mt-1 leading-4">
            PRIMARY KEY, UNIQUE and FOREIGN KEY constraints are not enforced; the loading process owns validation.
          </p>
        </div>
      </div>
    </div>
  );
}

export function Case9LineageView() {
  return (
    <div
      data-testid="case9-lineage-view"
      className="overflow-hidden rounded-[2px] border border-[#c8c6c4] bg-white font-sans text-[#323130]"
    >
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#d2d0ce] bg-[#faf9f8] px-4 py-3">
        <div className="flex items-center gap-2">
          <img src="data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2232%22%20height%3D%2232%22%20fill%3D%22currentColor%22%20role%3D%22img%22%20focusable%3D%22false%22%3E%3Cpath%20fill%3D%22url(%23i7cb92d-a)%22%20fill-rule%3D%22evenodd%22%20d%3D%22m3.148%2021.322-.41%201.501c-.153.48-.367%201.186-.482%201.814a3.94%203.94%200%200%200%203.247%205.313c.554.08%201.181.075%201.884-.028l3.23-.446a2.05%202.05%200%200%200%201.695-1.49l2.223-8.164z%22%20clip-rule%3D%22evenodd%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23i7cb92d-b)%22%20d%3D%22M6.298%2021.71c-3.404.527-4.103%203.096-4.103%203.096l3.26-11.979%2017.035-2.304-2.323%208.438c-.12.452-.5.798-.971.87l-.095.016-12.898%201.879z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23i7cb92d-c)%22%20fill-opacity%3D%220.8%22%20d%3D%22M6.298%2021.71c-3.404.527-4.103%203.096-4.103%203.096l3.26-11.979%2017.035-2.304-2.323%208.438c-.12.452-.5.798-.971.87l-.095.016-12.898%201.879z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23i7cb92d-d)%22%20d%3D%22m8.23%2014.066%2018.86-2.786c.448-.06.811-.39.926-.82l1.946-7.043a1.116%201.116%200%200%200-1.218-1.408L10.75%204.668a5.03%205.03%200%200%200-4.044%203.636L4.11%2017.709c.52-1.902.84-3.05%204.12-3.643%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23i7cb92d-e)%22%20d%3D%22m8.23%2014.066%2018.86-2.786c.448-.06.811-.39.926-.82l1.946-7.043a1.116%201.116%200%200%200-1.218-1.408L10.75%204.668a5.03%205.03%200%200%200-4.044%203.636L4.11%2017.709c.52-1.902.84-3.05%204.12-3.643%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23i7cb92d-f)%22%20fill-opacity%3D%220.4%22%20d%3D%22m8.23%2014.066%2018.86-2.786c.448-.06.811-.39.926-.82l1.946-7.043a1.116%201.116%200%200%200-1.218-1.408L10.75%204.668a5.03%205.03%200%200%200-4.044%203.636L4.11%2017.709c.52-1.902.84-3.05%204.12-3.643%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23i7cb92d-g)%22%20d%3D%22M8.23%2014.066c-2.731.495-3.409%201.374-3.86%202.753l-2.175%207.988s.695-2.543%204.058-3.087L19.1%2019.848l.095-.016c.471-.071.851-.419.972-.87l1.911-6.941-13.85%202.045Z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23i7cb92d-h)%22%20fill-opacity%3D%220.2%22%20d%3D%22M8.23%2014.066c-2.731.495-3.409%201.374-3.86%202.753l-2.175%207.988s.695-2.543%204.058-3.087L19.1%2019.848l.095-.016c.471-.071.851-.419.972-.87l1.911-6.941-13.85%202.045Z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23i7cb92d-i)%22%20fill-rule%3D%22evenodd%22%20d%3D%22M6.253%2021.72c-2.842.46-3.775%202.342-3.997%202.916a3.94%203.94%200%200%200%203.247%205.314c.554.08%201.181.075%201.884-.028l3.23-.446a2.05%202.05%200%200%200%201.695-1.49l2.026-7.443z%22%20clip-rule%3D%22evenodd%22%3E%3C%2Fpath%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22i7cb92d-a%22%20x1%3D%228.268%22%20x2%3D%228.268%22%20y1%3D%2230.005%22%20y2%3D%2219.822%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20offset%3D%220.056%22%20stop-color%3D%22%232AAC94%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.155%22%20stop-color%3D%22%23239C87%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.372%22%20stop-color%3D%22%23177E71%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.588%22%20stop-color%3D%22%230E6961%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.799%22%20stop-color%3D%22%23095D57%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23085954%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22i7cb92d-b%22%20x1%3D%2221.134%22%20x2%3D%2211.302%22%20y1%3D%2222.617%22%20y2%3D%2211.923%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20offset%3D%220.042%22%20stop-color%3D%22%23ABE88E%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.549%22%20stop-color%3D%22%232AAA92%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.906%22%20stop-color%3D%22%23117865%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22i7cb92d-c%22%20x1%3D%22-3.028%22%20x2%3D%226.329%22%20y1%3D%2222.097%22%20y2%3D%2218.906%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%236AD6F9%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%236AD6F9%22%20stop-opacity%3D%220%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22i7cb92d-d%22%20x1%3D%224.11%22%20x2%3D%2229.016%22%20y1%3D%229.855%22%20y2%3D%229.855%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20offset%3D%220.043%22%20stop-color%3D%22%2325FFD4%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.874%22%20stop-color%3D%22%2355DDB9%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22i7cb92d-e%22%20x1%3D%224.11%22%20x2%3D%2226.546%22%20y1%3D%226.373%22%20y2%3D%2216.791%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%236AD6F9%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.23%22%20stop-color%3D%22%2360E9D0%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.651%22%20stop-color%3D%22%236DE9BB%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.994%22%20stop-color%3D%22%23ABE88E%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22i7cb92d-f%22%20x1%3D%226.185%22%20x2%3D%2218.385%22%20y1%3D%228.323%22%20y2%3D%2211.021%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23fff%22%20stop-opacity%3D%220%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.459%22%20stop-color%3D%22%23fff%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23fff%22%20stop-opacity%3D%220%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22i7cb92d-g%22%20x1%3D%2210.23%22%20x2%3D%2210.518%22%20y1%3D%2218.774%22%20y2%3D%2210.219%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20offset%3D%220.205%22%20stop-color%3D%22%23063D3B%22%20stop-opacity%3D%220%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.586%22%20stop-color%3D%22%23063D3B%22%20stop-opacity%3D%220.237%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.872%22%20stop-color%3D%22%23063D3B%22%20stop-opacity%3D%220.75%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22i7cb92d-h%22%20x1%3D%221.166%22%20x2%3D%2211.592%22%20y1%3D%2217.923%22%20y2%3D%2219.884%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23fff%22%20stop-opacity%3D%220%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.459%22%20stop-color%3D%22%23fff%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23fff%22%20stop-opacity%3D%220%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22i7cb92d-i%22%20x1%3D%228.698%22%20x2%3D%226.664%22%20y1%3D%2227.183%22%20y2%3D%2217.238%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20offset%3D%220.064%22%20stop-color%3D%22%23063D3B%22%20stop-opacity%3D%220%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.17%22%20stop-color%3D%22%23063D3B%22%20stop-opacity%3D%220.135%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.562%22%20stop-color%3D%22%23063D3B%22%20stop-opacity%3D%220.599%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.85%22%20stop-color%3D%22%23063D3B%22%20stop-opacity%3D%220.9%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23063D3B%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3C%2Fsvg%3E" alt="Microsoft Fabric" className="h-5 w-5 object-contain" />
          <span className="text-[12px] font-semibold">Microsoft Fabric • Lineage view</span>
        </div>
        <span className="border border-[#f1aeb5] bg-[#fde7e9] px-2 py-1 text-[9px] font-semibold text-[#a4262c]">
          Observed schema break · PostalCode rename
        </span>
      </div>

      <div className="overflow-x-auto bg-[#f3f2f1] p-5">
        <div className="grid min-w-[900px] grid-cols-[220px_40px_270px_40px_280px] grid-rows-3 items-center gap-y-3">
          <div
            role="group"
            aria-label="Gold Enterprise Lakehouse"
            className="row-span-3 overflow-hidden border border-[#c8c6c4] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.12)]"
          >
            <div className="flex items-center gap-2 border-b border-[#d2d0ce] px-3 py-2">
              <img src="data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2232%22%20height%3D%2232%22%20fill%3D%22currentColor%22%20role%3D%22img%22%20focusable%3D%22false%22%3E%3Cpath%20fill%3D%22url(%23iab4f30-a)%22%20d%3D%22M5%205.5A3.5%203.5%200%200%201%208.5%202h15A3.5%203.5%200%200%201%2027%205.5v21a3.5%203.5%200%200%201-3.5%203.5h-15A3.5%203.5%200%200%201%205%2026.5z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23iab4f30-b)%22%20fill-opacity%3D%220.2%22%20d%3D%22M5%205.5A3.5%203.5%200%200%201%208.5%202h15A3.5%203.5%200%200%201%2027%205.5v21a3.5%203.5%200%200%201-3.5%203.5h-15A3.5%203.5%200%200%201%205%2026.5z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23iab4f30-c)%22%20fill-rule%3D%22evenodd%22%20d%3D%22M23.5%203h-15A2.5%202.5%200%200%200%206%205.5v21A2.5%202.5%200%200%200%208.5%2029h15a2.5%202.5%200%200%200%202.5-2.5v-21A2.5%202.5%200%200%200%2023.5%203m-15-1A3.5%203.5%200%200%200%205%205.5v21A3.5%203.5%200%200%200%208.5%2030h15a3.5%203.5%200%200%200%203.5-3.5v-21A3.5%203.5%200%200%200%2023.5%202z%22%20clip-rule%3D%22evenodd%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23iab4f30-d)%22%20d%3D%22M13.99%2022.69a1.5%201.5%200%200%200-.154.31H11a2%202%200%200%201-2-2v-6.4a2%202%200%200%201%20.674-1.497l5-4.428a2%202%200%200%201%202.653%200l5%204.428A2%202%200%200%201%2023%2014.6v3.409L22.98%2018a1.5%201.5%200%200%200-.94-.01l-.12.05c-.37.15-.66.44-.81.81-.01.02-.05.07-.11.13-.06-.05-.11-.11-.11-.13a1.49%201.49%200%200%200-1.39-.93h-.14a1.5%201.5%200%200%200-1.256.94%201%201%200%200%201-.104.12c-.06-.05-.11-.11-.11-.13a1.49%201.49%200%200%200-1.39-.93h-.14c-.57.05-1.05.42-1.26.95-.04.08-.06.13-.06.13q-.013.012-.09.032l-.03.008a1.5%201.5%200%200%200-1.13%201.79%201.46%201.46%200%200%200%201.264%201.15l-.004.01c-.008.009-.038.017-.09.032l-.03.008c-.39.09-.73.32-.94.66%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23iab4f30-e)%22%20d%3D%22M23.75%2021h-.01a.502.502%200%200%200%20.1-.99c-.47-.11-.71-.31-.89-.78a.49.49%200%200%200-.46-.32c-.2%200-.38.12-.46.31-.15.38-.6.78-1.04.78s-.88-.41-1.03-.78c-.16-.38-.78-.38-.93%200s-.6.78-1.04.78-.88-.41-1.03-.78c-.08-.19-.26-.33-.47-.31-.2%200-.39.13-.46.32-.18.47-.41.67-.89.78-.27.06-.44.33-.38.6s.33.43.6.38c.5-.11.88-.32%201.17-.65.37.38.86.66%201.46.66s1.13-.29%201.51-.69c.37.39.91.69%201.49.69s1.1-.28%201.48-.66c.29.33.67.54%201.17.65.031.008.08.01.1.01h-.01z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23iab4f30-f)%22%20d%3D%22M23.75%2024h-.01a.502.502%200%200%200%20.1-.99c-.47-.11-.71-.31-.89-.78a.49.49%200%200%200-.46-.32c-.2%200-.38.12-.46.31-.15.38-.6.78-1.04.78s-.88-.41-1.03-.78c-.16-.38-.78-.38-.93%200s-.6.78-1.04.78-.88-.41-1.03-.78c-.08-.19-.26-.33-.47-.31-.2%200-.39.13-.46.32-.18.47-.41.67-.89.78-.27.06-.44.33-.38.6s.33.43.6.38c.5-.11.88-.32%201.17-.65.37.38.86.66%201.46.66s1.13-.29%201.51-.69c.37.39.91.69%201.49.69s1.1-.28%201.48-.66c.29.33.67.54%201.17.65.031.008.08.01.1.01h-.01z%22%3E%3C%2Fpath%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22iab4f30-a%22%20x1%3D%2211.111%22%20x2%3D%2215.576%22%20y1%3D%222%22%20y2%3D%2230.067%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23fff%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23EBEBEB%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22iab4f30-c%22%20x1%3D%2212.104%22%20x2%3D%2216.851%22%20y1%3D%222%22%20y2%3D%2229.972%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23BBB%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23888%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22iab4f30-d%22%20x1%3D%229%22%20x2%3D%2224.817%22%20y1%3D%228.172%22%20y2%3D%2223.393%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%233477EA%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%231D53A4%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22iab4f30-e%22%20x1%3D%229%22%20x2%3D%2224.817%22%20y1%3D%228.172%22%20y2%3D%2223.393%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%233477EA%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%231D53A4%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22iab4f30-f%22%20x1%3D%229%22%20x2%3D%2224.817%22%20y1%3D%228.172%22%20y2%3D%2223.393%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%233477EA%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%231D53A4%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3CradialGradient%20id%3D%22iab4f30-b%22%20cx%3D%220%22%20cy%3D%220%22%20r%3D%221%22%20gradientTransform%3D%22matrix(11.61113%2022.16669%20-17.08352%208.94852%2012.028%209.292)%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20offset%3D%220.177%22%20stop-color%3D%22%23fff%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23B8B8B8%22%3E%3C%2Fstop%3E%3C%2FradialGradient%3E%3C%2Fdefs%3E%3C%2Fsvg%3E" alt="" className="h-5 w-5 object-contain" />
              <div>
                <span className="block text-[11px] font-semibold">Gold_Enterprise</span>
                <span className="block text-[9px] text-[#605e5c]">Lakehouse</span>
              </div>
            </div>
            <div className="px-3 py-2 text-[10px]">
              <div className="flex items-center justify-between border-l-[3px] border-[#d13438] bg-[#fde7e9] px-2 py-1.5 text-[#a4262c]">
                <span className="font-semibold">DimCustomer</span>
                <span>Changed</span>
              </div>
              <div className="mt-2 text-[#605e5c]">
                <span className="line-through">Cust_ZipCode</span>
                <span className="ml-2 font-semibold text-[#323130]">PostalCode</span>
              </div>
            </div>
          </div>

          <div className="relative row-span-3 h-full">
            <span className="absolute bottom-[16.7%] left-1/2 top-[16.7%] w-px bg-[#8a8886]" />
            <span className="absolute left-0 top-1/2 h-px w-1/2 bg-[#8a8886]" />
            <span className="absolute left-1/2 top-[16.7%] h-px w-1/2 bg-[#8a8886]" />
            <span className="absolute left-1/2 top-1/2 h-px w-1/2 bg-[#8a8886]" />
            <span className="absolute left-1/2 top-[83.3%] h-px w-1/2 bg-[#8a8886]" />
          </div>

          <LineageNode
            ariaLabel="Sales Performance semantic model"
            iconSrc="data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20width%3D%22630px%22%20height%3D%22630px%22%20viewBox%3D%220%200%20630%20630%22%20version%3D%221.1%22%3E%0D%0A%20%20%20%20%3C!--%20Generator%3A%20Sketch%2053.2%20(72643)%20-%20https%3A%2F%2Fsketchapp.com%20--%3E%0D%0A%20%20%20%20%3Ctitle%3EPBI%20Logo%3C%2Ftitle%3E%0D%0A%20%20%20%20%3Cdesc%3ECreated%20with%20Sketch.%3C%2Fdesc%3E%0D%0A%20%20%20%20%3Cdefs%3E%0D%0A%20%20%20%20%20%20%20%20%3ClinearGradient%20x1%3D%2250%25%22%20y1%3D%220%25%22%20x2%3D%2250%25%22%20y2%3D%22100%25%22%20id%3D%22linearGradient-1%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cstop%20stop-color%3D%22%23EBBB14%22%20offset%3D%220%25%22%2F%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cstop%20stop-color%3D%22%23B25400%22%20offset%3D%22100%25%22%2F%3E%0D%0A%20%20%20%20%20%20%20%20%3C%2FlinearGradient%3E%0D%0A%20%20%20%20%20%20%20%20%3ClinearGradient%20x1%3D%2250%25%22%20y1%3D%220%25%22%20x2%3D%2250%25%22%20y2%3D%22100%25%22%20id%3D%22linearGradient-2%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cstop%20stop-color%3D%22%23F9E583%22%20offset%3D%220%25%22%2F%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cstop%20stop-color%3D%22%23DE9800%22%20offset%3D%22100%25%22%2F%3E%0D%0A%20%20%20%20%20%20%20%20%3C%2FlinearGradient%3E%0D%0A%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M346%2C604%20L346%2C630%20L320%2C630%20L153%2C630%20C138.640597%2C630%20127%2C618.359403%20127%2C604%20L127%2C183%20C127%2C168.640597%20138.640597%2C157%20153%2C157%20L320%2C157%20C334.359403%2C157%20346%2C168.640597%20346%2C183%20L346%2C604%20Z%22%20id%3D%22path-3%22%2F%3E%0D%0A%20%20%20%20%20%20%20%20%3Cfilter%20x%3D%22-9.1%25%22%20y%3D%22-6.3%25%22%20width%3D%22136.5%25%22%20height%3D%22116.9%25%22%20filterUnits%3D%22objectBoundingBox%22%20id%3D%22filter-4%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3CfeOffset%20dx%3D%2220%22%20dy%3D%2210%22%20in%3D%22SourceAlpha%22%20result%3D%22shadowOffsetOuter1%22%2F%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3CfeGaussianBlur%20stdDeviation%3D%2210%22%20in%3D%22shadowOffsetOuter1%22%20result%3D%22shadowBlurOuter1%22%2F%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3CfeColorMatrix%20values%3D%220%200%200%200%200%20%20%200%200%200%200%200%20%20%200%200%200%200%200%20%200%200%200%200.0530211976%200%22%20type%3D%22matrix%22%20in%3D%22shadowBlurOuter1%22%2F%3E%0D%0A%20%20%20%20%20%20%20%20%3C%2Ffilter%3E%0D%0A%20%20%20%20%20%20%20%20%3ClinearGradient%20x1%3D%2250%25%22%20y1%3D%220%25%22%20x2%3D%2250%25%22%20y2%3D%22100%25%22%20id%3D%22linearGradient-5%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cstop%20stop-color%3D%22%23F9E68B%22%20offset%3D%220%25%22%2F%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cstop%20stop-color%3D%22%23F3CD32%22%20offset%3D%22100%25%22%2F%3E%0D%0A%20%20%20%20%20%20%20%20%3C%2FlinearGradient%3E%0D%0A%20%20%20%20%3C%2Fdefs%3E%0D%0A%20%20%20%20%3Cg%20id%3D%22PBI-Logo%22%20stroke%3D%22none%22%20stroke-width%3D%221%22%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%0D%0A%20%20%20%20%20%20%20%20%3Cg%20id%3D%22Group%22%20transform%3D%22translate(77.500000%2C%200.000000)%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Crect%20id%3D%22Rectangle%22%20fill%3D%22url(%23linearGradient-1)%22%20x%3D%22256%22%20y%3D%220%22%20width%3D%22219%22%20height%3D%22630%22%20rx%3D%2226%22%2F%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cg%20id%3D%22Combined-Shape%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cuse%20fill%3D%22black%22%20fill-opacity%3D%221%22%20filter%3D%22url(%23filter-4)%22%20xlink%3Ahref%3D%22%23path-3%22%2F%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cuse%20fill%3D%22url(%23linearGradient-2)%22%20fill-rule%3D%22evenodd%22%20xlink%3Ahref%3D%22%23path-3%22%2F%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fg%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M219%2C604%20L219%2C630%20L193%2C630%20L26%2C630%20C11.6405965%2C630%201.75851975e-15%2C618.359403%200%2C604%20L0%2C341%20C-1.75851975e-15%2C326.640597%2011.6405965%2C315%2026%2C315%20L193%2C315%20C207.359403%2C315%20219%2C326.640597%20219%2C341%20L219%2C604%20Z%22%20id%3D%22Combined-Shape%22%20fill%3D%22url(%23linearGradient-5)%22%2F%3E%0D%0A%20%20%20%20%20%20%20%20%3C%2Fg%3E%0D%0A%20%20%20%20%3C%2Fg%3E%0D%0A%3C%2Fsvg%3E"
            itemType="Semantic model"
            name="Sales_Performance_Model"
            status="Failed"
            statusTone="danger"
          />
          <div className="h-px bg-[#8a8886]" />
          <LineageNode
            ariaLabel="Executive Sales report"
            iconSrc="data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2264%22%20height%3D%2264%22%3E%3Cpath%20d%3D%22M16.135%2037.33c-.775%200-1.404-.63-1.404-1.407V31.96c0-.777.63-1.407%201.404-1.407a1.41%201.41%200%200%201%201.405%201.407v3.964c0%20.777-.63%201.407-1.405%201.407zm4.52%201.52c-.776%200-1.404-.63-1.404-1.407v-7c0-.778.628-1.407%201.404-1.407s1.405.63%201.405%201.407v7c0%20.778-.63%201.407-1.405%201.407zm4.52%201.486c-.776%200-1.404-.63-1.404-1.407v-9.98c0-.778.63-1.407%201.404-1.407s1.404.63%201.404%201.407v9.978c0%20.778-.628%201.407-1.404%201.407zm11.85-16.3L17.423%2018.16c-.962-.3-1.83.3-1.83%201.233V29.2a2.78%202.78%200%200%201%20.543-.054%202.79%202.79%200%200%201%20.544.054v-9.8c0-.066%200-.22.24-.22a.64.64%200%200%201%20.192.031l19.603%205.876c.426.128.742.562.742.865v12.57c0%20.072%200%20.218-.24.218a.61.61%200%200%201-.191-.031l-4.522-1.353v1.135l4.2%201.263a1.78%201.78%200%200%200%20.503.077%201.27%201.27%200%200%200%201.327-1.31V25.94c0-.815-.667-1.653-1.52-1.908zm-7.33%2017.86c-.776%200-1.404-.63-1.404-1.407V27.392c0-.777.63-1.408%201.404-1.408s1.404.63%201.404%201.408V40.5c0%20.778-.628%201.407-1.404%201.407z%22%20transform%3D%22matrix(2.687703%200%200%202.687703%20-39.591841%20-48.605298)%22%20fill%3D%22%23333%22%2F%3E%3C%2Fsvg%3E"
            itemType="Power BI report"
            name="Executive Sales Dashboard"
            status="14 visuals"
            statusTone="danger"
          />

          <LineageNode
            ariaLabel="Regional Logistics semantic model"
            iconSrc="data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20width%3D%22630px%22%20height%3D%22630px%22%20viewBox%3D%220%200%20630%20630%22%20version%3D%221.1%22%3E%0D%0A%20%20%20%20%3C!--%20Generator%3A%20Sketch%2053.2%20(72643)%20-%20https%3A%2F%2Fsketchapp.com%20--%3E%0D%0A%20%20%20%20%3Ctitle%3EPBI%20Logo%3C%2Ftitle%3E%0D%0A%20%20%20%20%3Cdesc%3ECreated%20with%20Sketch.%3C%2Fdesc%3E%0D%0A%20%20%20%20%3Cdefs%3E%0D%0A%20%20%20%20%20%20%20%20%3ClinearGradient%20x1%3D%2250%25%22%20y1%3D%220%25%22%20x2%3D%2250%25%22%20y2%3D%22100%25%22%20id%3D%22linearGradient-1%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cstop%20stop-color%3D%22%23EBBB14%22%20offset%3D%220%25%22%2F%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cstop%20stop-color%3D%22%23B25400%22%20offset%3D%22100%25%22%2F%3E%0D%0A%20%20%20%20%20%20%20%20%3C%2FlinearGradient%3E%0D%0A%20%20%20%20%20%20%20%20%3ClinearGradient%20x1%3D%2250%25%22%20y1%3D%220%25%22%20x2%3D%2250%25%22%20y2%3D%22100%25%22%20id%3D%22linearGradient-2%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cstop%20stop-color%3D%22%23F9E583%22%20offset%3D%220%25%22%2F%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cstop%20stop-color%3D%22%23DE9800%22%20offset%3D%22100%25%22%2F%3E%0D%0A%20%20%20%20%20%20%20%20%3C%2FlinearGradient%3E%0D%0A%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M346%2C604%20L346%2C630%20L320%2C630%20L153%2C630%20C138.640597%2C630%20127%2C618.359403%20127%2C604%20L127%2C183%20C127%2C168.640597%20138.640597%2C157%20153%2C157%20L320%2C157%20C334.359403%2C157%20346%2C168.640597%20346%2C183%20L346%2C604%20Z%22%20id%3D%22path-3%22%2F%3E%0D%0A%20%20%20%20%20%20%20%20%3Cfilter%20x%3D%22-9.1%25%22%20y%3D%22-6.3%25%22%20width%3D%22136.5%25%22%20height%3D%22116.9%25%22%20filterUnits%3D%22objectBoundingBox%22%20id%3D%22filter-4%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3CfeOffset%20dx%3D%2220%22%20dy%3D%2210%22%20in%3D%22SourceAlpha%22%20result%3D%22shadowOffsetOuter1%22%2F%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3CfeGaussianBlur%20stdDeviation%3D%2210%22%20in%3D%22shadowOffsetOuter1%22%20result%3D%22shadowBlurOuter1%22%2F%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3CfeColorMatrix%20values%3D%220%200%200%200%200%20%20%200%200%200%200%200%20%20%200%200%200%200%200%20%200%200%200%200.0530211976%200%22%20type%3D%22matrix%22%20in%3D%22shadowBlurOuter1%22%2F%3E%0D%0A%20%20%20%20%20%20%20%20%3C%2Ffilter%3E%0D%0A%20%20%20%20%20%20%20%20%3ClinearGradient%20x1%3D%2250%25%22%20y1%3D%220%25%22%20x2%3D%2250%25%22%20y2%3D%22100%25%22%20id%3D%22linearGradient-5%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cstop%20stop-color%3D%22%23F9E68B%22%20offset%3D%220%25%22%2F%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cstop%20stop-color%3D%22%23F3CD32%22%20offset%3D%22100%25%22%2F%3E%0D%0A%20%20%20%20%20%20%20%20%3C%2FlinearGradient%3E%0D%0A%20%20%20%20%3C%2Fdefs%3E%0D%0A%20%20%20%20%3Cg%20id%3D%22PBI-Logo%22%20stroke%3D%22none%22%20stroke-width%3D%221%22%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%0D%0A%20%20%20%20%20%20%20%20%3Cg%20id%3D%22Group%22%20transform%3D%22translate(77.500000%2C%200.000000)%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Crect%20id%3D%22Rectangle%22%20fill%3D%22url(%23linearGradient-1)%22%20x%3D%22256%22%20y%3D%220%22%20width%3D%22219%22%20height%3D%22630%22%20rx%3D%2226%22%2F%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cg%20id%3D%22Combined-Shape%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cuse%20fill%3D%22black%22%20fill-opacity%3D%221%22%20filter%3D%22url(%23filter-4)%22%20xlink%3Ahref%3D%22%23path-3%22%2F%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cuse%20fill%3D%22url(%23linearGradient-2)%22%20fill-rule%3D%22evenodd%22%20xlink%3Ahref%3D%22%23path-3%22%2F%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fg%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M219%2C604%20L219%2C630%20L193%2C630%20L26%2C630%20C11.6405965%2C630%201.75851975e-15%2C618.359403%200%2C604%20L0%2C341%20C-1.75851975e-15%2C326.640597%2011.6405965%2C315%2026%2C315%20L193%2C315%20C207.359403%2C315%20219%2C326.640597%20219%2C341%20L219%2C604%20Z%22%20id%3D%22Combined-Shape%22%20fill%3D%22url(%23linearGradient-5)%22%2F%3E%0D%0A%20%20%20%20%20%20%20%20%3C%2Fg%3E%0D%0A%20%20%20%20%3C%2Fg%3E%0D%0A%3C%2Fsvg%3E"
            itemType="Semantic model"
            name="Regional_Logistics_Model"
            status="Failed"
            statusTone="danger"
          />
          <div className="h-px bg-[#8a8886]" />
          <LineageNode
            ariaLabel="Carrier Dispatch report"
            iconSrc="data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2264%22%20height%3D%2264%22%3E%3Cpath%20d%3D%22M16.135%2037.33c-.775%200-1.404-.63-1.404-1.407V31.96c0-.777.63-1.407%201.404-1.407a1.41%201.41%200%200%201%201.405%201.407v3.964c0%20.777-.63%201.407-1.405%201.407zm4.52%201.52c-.776%200-1.404-.63-1.404-1.407v-7c0-.778.628-1.407%201.404-1.407s1.405.63%201.405%201.407v7c0%20.778-.63%201.407-1.405%201.407zm4.52%201.486c-.776%200-1.404-.63-1.404-1.407v-9.98c0-.778.63-1.407%201.404-1.407s1.404.63%201.404%201.407v9.978c0%20.778-.628%201.407-1.404%201.407zm11.85-16.3L17.423%2018.16c-.962-.3-1.83.3-1.83%201.233V29.2a2.78%202.78%200%200%201%20.543-.054%202.79%202.79%200%200%201%20.544.054v-9.8c0-.066%200-.22.24-.22a.64.64%200%200%201%20.192.031l19.603%205.876c.426.128.742.562.742.865v12.57c0%20.072%200%20.218-.24.218a.61.61%200%200%201-.191-.031l-4.522-1.353v1.135l4.2%201.263a1.78%201.78%200%200%200%20.503.077%201.27%201.27%200%200%200%201.327-1.31V25.94c0-.815-.667-1.653-1.52-1.908zm-7.33%2017.86c-.776%200-1.404-.63-1.404-1.407V27.392c0-.777.63-1.408%201.404-1.408s1.404.63%201.404%201.408V40.5c0%20.778-.628%201.407-1.404%201.407z%22%20transform%3D%22matrix(2.687703%200%200%202.687703%20-39.591841%20-48.605298)%22%20fill%3D%22%23333%22%2F%3E%3C%2Fsvg%3E"
            itemType="Power BI report"
            name="Carrier Dispatch Map"
            status="Affected"
            statusTone="danger"
          />

          <LineageNode
            ariaLabel="Sync to CRM pipeline"
            iconSrc="data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2232%22%20height%3D%2232%22%20fill%3D%22currentColor%22%20role%3D%22img%22%20focusable%3D%22false%22%3E%3Cpath%20fill%3D%22url(%23idca273-a)%22%20d%3D%22M3%206.5A3.5%203.5%200%200%201%206.5%203h19A3.5%203.5%200%200%201%2029%206.5v19a3.5%203.5%200%200%201-3.5%203.5h-19A3.5%203.5%200%200%201%203%2025.5z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23idca273-b)%22%20fill-opacity%3D%220.2%22%20d%3D%22M3%206.5A3.5%203.5%200%200%201%206.5%203h19A3.5%203.5%200%200%201%2029%206.5v19a3.5%203.5%200%200%201-3.5%203.5h-19A3.5%203.5%200%200%201%203%2025.5z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23idca273-c)%22%20fill-rule%3D%22evenodd%22%20d%3D%22M25.5%204h-19A2.5%202.5%200%200%200%204%206.5v19A2.5%202.5%200%200%200%206.5%2028h19a2.5%202.5%200%200%200%202.5-2.5v-19A2.5%202.5%200%200%200%2025.5%204m-19-1A3.5%203.5%200%200%200%203%206.5v19A3.5%203.5%200%200%200%206.5%2029h19a3.5%203.5%200%200%200%203.5-3.5v-19A3.5%203.5%200%200%200%2025.5%203z%22%20clip-rule%3D%22evenodd%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23idca273-d)%22%20d%3D%22M15%2011.5a2.5%202.5%200%200%201-2%202.45V16h4.5a1.5%201.5%200%200%200%201.5-1.5v-.55a2.5%202.5%200%201%201%201%200v.55a2.5%202.5%200%200%201-2.5%202.5H13v1.05a2.5%202.5%200%201%201-2.294.709v-.056h.056A2.5%202.5%200%200%201%2012%2018.05v-4.1a2.5%202.5%200%200%201-1.294-4.191v-.023h.022A2.5%202.5%200%200%201%2015%2011.5%22%3E%3C%2Fpath%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22idca273-a%22%20x1%3D%2210.222%22%20x2%3D%2213.511%22%20y1%3D%223%22%20y2%3D%2229.311%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23fff%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23EBEBEB%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22idca273-c%22%20x1%3D%2211.396%22%20x2%3D%2214.897%22%20y1%3D%223%22%20y2%3D%2229.256%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23BBB%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23888%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22idca273-d%22%20x1%3D%2210%22%20x2%3D%2223.835%22%20y1%3D%229%22%20y2%3D%2220.859%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%234BA446%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%233F7D35%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3CradialGradient%20id%3D%22idca273-b%22%20cx%3D%220%22%20cy%3D%220%22%20r%3D%221%22%20gradientTransform%3D%22matrix(13.7222%2020.58336%20-17.81255%2011.875%2011.306%209.771)%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20offset%3D%220.177%22%20stop-color%3D%22%23fff%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23B8B8B8%22%3E%3C%2Fstop%3E%3C%2FradialGradient%3E%3C%2Fdefs%3E%3C%2Fsvg%3E"
            itemType="Data pipeline"
            name="Sync_To_CRM_Job"
            status="Dependent"
          />
          <div className="h-px bg-[#8a8886]" />
          <LineageNode
            ariaLabel="External CRM endpoint"
            iconSrc="data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2232%22%20height%3D%2232%22%20fill%3D%22currentColor%22%20role%3D%22img%22%20focusable%3D%22false%22%3E%3Cpath%20fill%3D%22url(%23i7cb92d-a)%22%20fill-rule%3D%22evenodd%22%20d%3D%22m3.148%2021.322-.41%201.501c-.153.48-.367%201.186-.482%201.814a3.94%203.94%200%200%200%203.247%205.313c.554.08%201.181.075%201.884-.028l3.23-.446a2.05%202.05%200%200%200%201.695-1.49l2.223-8.164z%22%20clip-rule%3D%22evenodd%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23i7cb92d-b)%22%20d%3D%22M6.298%2021.71c-3.404.527-4.103%203.096-4.103%203.096l3.26-11.979%2017.035-2.304-2.323%208.438c-.12.452-.5.798-.971.87l-.095.016-12.898%201.879z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23i7cb92d-c)%22%20fill-opacity%3D%220.8%22%20d%3D%22M6.298%2021.71c-3.404.527-4.103%203.096-4.103%203.096l3.26-11.979%2017.035-2.304-2.323%208.438c-.12.452-.5.798-.971.87l-.095.016-12.898%201.879z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23i7cb92d-d)%22%20d%3D%22m8.23%2014.066%2018.86-2.786c.448-.06.811-.39.926-.82l1.946-7.043a1.116%201.116%200%200%200-1.218-1.408L10.75%204.668a5.03%205.03%200%200%200-4.044%203.636L4.11%2017.709c.52-1.902.84-3.05%204.12-3.643%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23i7cb92d-e)%22%20d%3D%22m8.23%2014.066%2018.86-2.786c.448-.06.811-.39.926-.82l1.946-7.043a1.116%201.116%200%200%200-1.218-1.408L10.75%204.668a5.03%205.03%200%200%200-4.044%203.636L4.11%2017.709c.52-1.902.84-3.05%204.12-3.643%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23i7cb92d-f)%22%20fill-opacity%3D%220.4%22%20d%3D%22m8.23%2014.066%2018.86-2.786c.448-.06.811-.39.926-.82l1.946-7.043a1.116%201.116%200%200%200-1.218-1.408L10.75%204.668a5.03%205.03%200%200%200-4.044%203.636L4.11%2017.709c.52-1.902.84-3.05%204.12-3.643%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23i7cb92d-g)%22%20d%3D%22M8.23%2014.066c-2.731.495-3.409%201.374-3.86%202.753l-2.175%207.988s.695-2.543%204.058-3.087L19.1%2019.848l.095-.016c.471-.071.851-.419.972-.87l1.911-6.941-13.85%202.045Z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23i7cb92d-h)%22%20fill-opacity%3D%220.2%22%20d%3D%22M8.23%2014.066c-2.731.495-3.409%201.374-3.86%202.753l-2.175%207.988s.695-2.543%204.058-3.087L19.1%2019.848l.095-.016c.471-.071.851-.419.972-.87l1.911-6.941-13.85%202.045Z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22url(%23i7cb92d-i)%22%20fill-rule%3D%22evenodd%22%20d%3D%22M6.253%2021.72c-2.842.46-3.775%202.342-3.997%202.916a3.94%203.94%200%200%200%203.247%205.314c.554.08%201.181.075%201.884-.028l3.23-.446a2.05%202.05%200%200%200%201.695-1.49l2.026-7.443z%22%20clip-rule%3D%22evenodd%22%3E%3C%2Fpath%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22i7cb92d-a%22%20x1%3D%228.268%22%20x2%3D%228.268%22%20y1%3D%2230.005%22%20y2%3D%2219.822%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20offset%3D%220.056%22%20stop-color%3D%22%232AAC94%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.155%22%20stop-color%3D%22%23239C87%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.372%22%20stop-color%3D%22%23177E71%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.588%22%20stop-color%3D%22%230E6961%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.799%22%20stop-color%3D%22%23095D57%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23085954%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22i7cb92d-b%22%20x1%3D%2221.134%22%20x2%3D%2211.302%22%20y1%3D%2222.617%22%20y2%3D%2211.923%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20offset%3D%220.042%22%20stop-color%3D%22%23ABE88E%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.549%22%20stop-color%3D%22%232AAA92%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.906%22%20stop-color%3D%22%23117865%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22i7cb92d-c%22%20x1%3D%22-3.028%22%20x2%3D%226.329%22%20y1%3D%2222.097%22%20y2%3D%2218.906%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%236AD6F9%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%236AD6F9%22%20stop-opacity%3D%220%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22i7cb92d-d%22%20x1%3D%224.11%22%20x2%3D%2229.016%22%20y1%3D%229.855%22%20y2%3D%229.855%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20offset%3D%220.043%22%20stop-color%3D%22%2325FFD4%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.874%22%20stop-color%3D%22%2355DDB9%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22i7cb92d-e%22%20x1%3D%224.11%22%20x2%3D%2226.546%22%20y1%3D%226.373%22%20y2%3D%2216.791%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%236AD6F9%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.23%22%20stop-color%3D%22%2360E9D0%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.651%22%20stop-color%3D%22%236DE9BB%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.994%22%20stop-color%3D%22%23ABE88E%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22i7cb92d-f%22%20x1%3D%226.185%22%20x2%3D%2218.385%22%20y1%3D%228.323%22%20y2%3D%2211.021%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23fff%22%20stop-opacity%3D%220%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.459%22%20stop-color%3D%22%23fff%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23fff%22%20stop-opacity%3D%220%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22i7cb92d-g%22%20x1%3D%2210.23%22%20x2%3D%2210.518%22%20y1%3D%2218.774%22%20y2%3D%2210.219%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20offset%3D%220.205%22%20stop-color%3D%22%23063D3B%22%20stop-opacity%3D%220%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.586%22%20stop-color%3D%22%23063D3B%22%20stop-opacity%3D%220.237%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.872%22%20stop-color%3D%22%23063D3B%22%20stop-opacity%3D%220.75%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22i7cb92d-h%22%20x1%3D%221.166%22%20x2%3D%2211.592%22%20y1%3D%2217.923%22%20y2%3D%2219.884%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23fff%22%20stop-opacity%3D%220%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.459%22%20stop-color%3D%22%23fff%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23fff%22%20stop-opacity%3D%220%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22i7cb92d-i%22%20x1%3D%228.698%22%20x2%3D%226.664%22%20y1%3D%2227.183%22%20y2%3D%2217.238%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20offset%3D%220.064%22%20stop-color%3D%22%23063D3B%22%20stop-opacity%3D%220%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.17%22%20stop-color%3D%22%23063D3B%22%20stop-opacity%3D%220.135%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.562%22%20stop-color%3D%22%23063D3B%22%20stop-opacity%3D%220.599%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%220.85%22%20stop-color%3D%22%23063D3B%22%20stop-opacity%3D%220.9%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23063D3B%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3C%2Fsvg%3E"
            itemType="External endpoint"
            name="CRM customer sync"
            status="At risk"
          />
        </div>
      </div>

      <div className="grid divide-y divide-[#d2d0ce] border-t border-[#d2d0ce] text-[10px] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        <div className="px-4 py-3">
          <span className="block uppercase tracking-[0.08em] text-[#605e5c]">Observed scope</span>
          <span className="mt-1 block font-semibold">5 models · 11 reports</span>
        </div>
        <div className="px-4 py-3">
          <span className="block uppercase tracking-[0.08em] text-[#605e5c]">Known dependency</span>
          <span className="mt-1 block font-semibold">Item-level lineage path</span>
        </div>
        <div className="px-4 py-3">
          <span className="block uppercase tracking-[0.08em] text-[#605e5c]">Diagnostic state</span>
          <span className="mt-1 block font-semibold">Downstream failures observed</span>
        </div>
      </div>
    </div>
  );
}

export function Case11RefreshPolicy() {
  return (
    <div
      data-testid="case11-refresh-policy"
      className="overflow-hidden rounded-[2px] border border-[#c8c6c4] bg-white font-sans text-[#323130]"
    >
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#d2d0ce] bg-[#faf9f8] px-4 py-3">
        <div className="flex items-center gap-2">
          <img src="data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20width%3D%22630px%22%20height%3D%22630px%22%20viewBox%3D%220%200%20630%20630%22%20version%3D%221.1%22%3E%0D%0A%20%20%20%20%3C!--%20Generator%3A%20Sketch%2053.2%20(72643)%20-%20https%3A%2F%2Fsketchapp.com%20--%3E%0D%0A%20%20%20%20%3Ctitle%3EPBI%20Logo%3C%2Ftitle%3E%0D%0A%20%20%20%20%3Cdesc%3ECreated%20with%20Sketch.%3C%2Fdesc%3E%0D%0A%20%20%20%20%3Cdefs%3E%0D%0A%20%20%20%20%20%20%20%20%3ClinearGradient%20x1%3D%2250%25%22%20y1%3D%220%25%22%20x2%3D%2250%25%22%20y2%3D%22100%25%22%20id%3D%22linearGradient-1%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cstop%20stop-color%3D%22%23EBBB14%22%20offset%3D%220%25%22%2F%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cstop%20stop-color%3D%22%23B25400%22%20offset%3D%22100%25%22%2F%3E%0D%0A%20%20%20%20%20%20%20%20%3C%2FlinearGradient%3E%0D%0A%20%20%20%20%20%20%20%20%3ClinearGradient%20x1%3D%2250%25%22%20y1%3D%220%25%22%20x2%3D%2250%25%22%20y2%3D%22100%25%22%20id%3D%22linearGradient-2%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cstop%20stop-color%3D%22%23F9E583%22%20offset%3D%220%25%22%2F%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cstop%20stop-color%3D%22%23DE9800%22%20offset%3D%22100%25%22%2F%3E%0D%0A%20%20%20%20%20%20%20%20%3C%2FlinearGradient%3E%0D%0A%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M346%2C604%20L346%2C630%20L320%2C630%20L153%2C630%20C138.640597%2C630%20127%2C618.359403%20127%2C604%20L127%2C183%20C127%2C168.640597%20138.640597%2C157%20153%2C157%20L320%2C157%20C334.359403%2C157%20346%2C168.640597%20346%2C183%20L346%2C604%20Z%22%20id%3D%22path-3%22%2F%3E%0D%0A%20%20%20%20%20%20%20%20%3Cfilter%20x%3D%22-9.1%25%22%20y%3D%22-6.3%25%22%20width%3D%22136.5%25%22%20height%3D%22116.9%25%22%20filterUnits%3D%22objectBoundingBox%22%20id%3D%22filter-4%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3CfeOffset%20dx%3D%2220%22%20dy%3D%2210%22%20in%3D%22SourceAlpha%22%20result%3D%22shadowOffsetOuter1%22%2F%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3CfeGaussianBlur%20stdDeviation%3D%2210%22%20in%3D%22shadowOffsetOuter1%22%20result%3D%22shadowBlurOuter1%22%2F%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3CfeColorMatrix%20values%3D%220%200%200%200%200%20%20%200%200%200%200%200%20%20%200%200%200%200%200%20%200%200%200%200.0530211976%200%22%20type%3D%22matrix%22%20in%3D%22shadowBlurOuter1%22%2F%3E%0D%0A%20%20%20%20%20%20%20%20%3C%2Ffilter%3E%0D%0A%20%20%20%20%20%20%20%20%3ClinearGradient%20x1%3D%2250%25%22%20y1%3D%220%25%22%20x2%3D%2250%25%22%20y2%3D%22100%25%22%20id%3D%22linearGradient-5%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cstop%20stop-color%3D%22%23F9E68B%22%20offset%3D%220%25%22%2F%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cstop%20stop-color%3D%22%23F3CD32%22%20offset%3D%22100%25%22%2F%3E%0D%0A%20%20%20%20%20%20%20%20%3C%2FlinearGradient%3E%0D%0A%20%20%20%20%3C%2Fdefs%3E%0D%0A%20%20%20%20%3Cg%20id%3D%22PBI-Logo%22%20stroke%3D%22none%22%20stroke-width%3D%221%22%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%0D%0A%20%20%20%20%20%20%20%20%3Cg%20id%3D%22Group%22%20transform%3D%22translate(77.500000%2C%200.000000)%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Crect%20id%3D%22Rectangle%22%20fill%3D%22url(%23linearGradient-1)%22%20x%3D%22256%22%20y%3D%220%22%20width%3D%22219%22%20height%3D%22630%22%20rx%3D%2226%22%2F%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cg%20id%3D%22Combined-Shape%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cuse%20fill%3D%22black%22%20fill-opacity%3D%221%22%20filter%3D%22url(%23filter-4)%22%20xlink%3Ahref%3D%22%23path-3%22%2F%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cuse%20fill%3D%22url(%23linearGradient-2)%22%20fill-rule%3D%22evenodd%22%20xlink%3Ahref%3D%22%23path-3%22%2F%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fg%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M219%2C604%20L219%2C630%20L193%2C630%20L26%2C630%20C11.6405965%2C630%201.75851975e-15%2C618.359403%200%2C604%20L0%2C341%20C-1.75851975e-15%2C326.640597%2011.6405965%2C315%2026%2C315%20L193%2C315%20C207.359403%2C315%20219%2C326.640597%20219%2C341%20L219%2C604%20Z%22%20id%3D%22Combined-Shape%22%20fill%3D%22url(%23linearGradient-5)%22%2F%3E%0D%0A%20%20%20%20%20%20%20%20%3C%2Fg%3E%0D%0A%20%20%20%20%3C%2Fg%3E%0D%0A%3C%2Fsvg%3E" alt="Power BI" className="h-5 w-5 object-contain" />
          <div>
            <span className="block text-[12px] font-semibold">Power BI Semantic Model • Incremental refresh policy</span>
            <span className="block text-[9px] text-[#605e5c]">FactSales_Archive · Import storage mode</span>
          </div>
        </div>
        <span className="border border-[#c8c6c4] bg-white px-2 py-1 text-[9px] font-semibold text-[#323130]">
          Managed policy configured
        </span>
      </div>

      <div className="overflow-x-auto bg-[#f3f2f1] px-5 py-6">
        <div className="min-w-[760px]">
          <div className="mb-2 flex items-center justify-between text-[10px] font-semibold">
            <span>Store period • 10 years</span>
            <span>Refresh period • 7 days</span>
          </div>
          <div role="list" aria-label="Managed refresh partitions" className="flex h-[72px] border border-[#8a8886] bg-white">
            {['2016–2020', '2021', '2022', '2023', '2024', '2025'].map((label, index) => (
              <div
                key={label}
                role="listitem"
                className={`flex items-center justify-center border-r border-[#d2d0ce] bg-white text-[10px] text-[#605e5c] ${
                  index === 0 ? 'flex-[1.7]' : 'flex-1'
                }`}
              >
                {label}
              </div>
            ))}
            <div
              role="listitem"
              className="flex flex-[1.25] flex-col items-center justify-center border-l-2 border-[#d6b300] bg-[#fff4ce] px-2 text-center"
            >
              <span className="text-[10px] font-semibold text-[#323130]">Recent 7 days</span>
              <span className="mt-1 text-[9px] text-[#605e5c]">Refreshed</span>
            </div>
          </div>
          <div className="mt-2 grid grid-cols-[1fr_auto] text-[9px] text-[#605e5c]">
            <span>Retained managed range partitions · skipped during routine refresh</span>
            <span className="border-l border-[#d6b300] pl-3 font-semibold text-[#323130]">Active rolling window</span>
          </div>
        </div>
      </div>

      <div className="grid divide-y divide-[#d2d0ce] border-t border-[#d2d0ce] text-[10px] sm:grid-cols-4 sm:divide-x sm:divide-y-0">
        <div className="px-4 py-3">
          <span className="block text-[#605e5c]">RangeStart</span>
          <span className="mt-1 block font-semibold">Date/time parameter</span>
        </div>
        <div className="px-4 py-3">
          <span className="block text-[#605e5c]">RangeEnd</span>
          <span className="mt-1 block font-semibold">Date/time parameter</span>
        </div>
        <div className="px-4 py-3">
          <span className="block text-[#605e5c]">Query folding</span>
          <span className="mt-1 block font-semibold">Verify at source</span>
        </div>
        <div className="px-4 py-3">
          <span className="block text-[#605e5c]">Initial refresh</span>
          <span className="mt-1 block font-semibold">May remain expensive</span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#d2d0ce] bg-[#faf9f8] px-4 py-2.5 text-[9px]">
        <span><strong>Baseline:</strong> 214 minutes · 98% peak capacity</span>
        <span className="text-[#605e5c]">Measure duration and capacity again after deployment</span>
      </div>
    </div>
  );
}

export function Case12ModelExplorer() {
  return (
    <div
      data-testid="case12-model-explorer"
      className="overflow-hidden rounded-[2px] border border-[#c8c6c4] bg-white font-sans text-[#323130]"
    >
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#d2d0ce] bg-[#faf9f8] px-4 py-3">
        <div className="flex items-center gap-2">
          <img src="data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20width%3D%22630px%22%20height%3D%22630px%22%20viewBox%3D%220%200%20630%20630%22%20version%3D%221.1%22%3E%0D%0A%20%20%20%20%3C!--%20Generator%3A%20Sketch%2053.2%20(72643)%20-%20https%3A%2F%2Fsketchapp.com%20--%3E%0D%0A%20%20%20%20%3Ctitle%3EPBI%20Logo%3C%2Ftitle%3E%0D%0A%20%20%20%20%3Cdesc%3ECreated%20with%20Sketch.%3C%2Fdesc%3E%0D%0A%20%20%20%20%3Cdefs%3E%0D%0A%20%20%20%20%20%20%20%20%3ClinearGradient%20x1%3D%2250%25%22%20y1%3D%220%25%22%20x2%3D%2250%25%22%20y2%3D%22100%25%22%20id%3D%22linearGradient-1%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cstop%20stop-color%3D%22%23EBBB14%22%20offset%3D%220%25%22%2F%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cstop%20stop-color%3D%22%23B25400%22%20offset%3D%22100%25%22%2F%3E%0D%0A%20%20%20%20%20%20%20%20%3C%2FlinearGradient%3E%0D%0A%20%20%20%20%20%20%20%20%3ClinearGradient%20x1%3D%2250%25%22%20y1%3D%220%25%22%20x2%3D%2250%25%22%20y2%3D%22100%25%22%20id%3D%22linearGradient-2%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cstop%20stop-color%3D%22%23F9E583%22%20offset%3D%220%25%22%2F%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cstop%20stop-color%3D%22%23DE9800%22%20offset%3D%22100%25%22%2F%3E%0D%0A%20%20%20%20%20%20%20%20%3C%2FlinearGradient%3E%0D%0A%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M346%2C604%20L346%2C630%20L320%2C630%20L153%2C630%20C138.640597%2C630%20127%2C618.359403%20127%2C604%20L127%2C183%20C127%2C168.640597%20138.640597%2C157%20153%2C157%20L320%2C157%20C334.359403%2C157%20346%2C168.640597%20346%2C183%20L346%2C604%20Z%22%20id%3D%22path-3%22%2F%3E%0D%0A%20%20%20%20%20%20%20%20%3Cfilter%20x%3D%22-9.1%25%22%20y%3D%22-6.3%25%22%20width%3D%22136.5%25%22%20height%3D%22116.9%25%22%20filterUnits%3D%22objectBoundingBox%22%20id%3D%22filter-4%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3CfeOffset%20dx%3D%2220%22%20dy%3D%2210%22%20in%3D%22SourceAlpha%22%20result%3D%22shadowOffsetOuter1%22%2F%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3CfeGaussianBlur%20stdDeviation%3D%2210%22%20in%3D%22shadowOffsetOuter1%22%20result%3D%22shadowBlurOuter1%22%2F%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3CfeColorMatrix%20values%3D%220%200%200%200%200%20%20%200%200%200%200%200%20%20%200%200%200%200%200%20%200%200%200%200.0530211976%200%22%20type%3D%22matrix%22%20in%3D%22shadowBlurOuter1%22%2F%3E%0D%0A%20%20%20%20%20%20%20%20%3C%2Ffilter%3E%0D%0A%20%20%20%20%20%20%20%20%3ClinearGradient%20x1%3D%2250%25%22%20y1%3D%220%25%22%20x2%3D%2250%25%22%20y2%3D%22100%25%22%20id%3D%22linearGradient-5%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cstop%20stop-color%3D%22%23F9E68B%22%20offset%3D%220%25%22%2F%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cstop%20stop-color%3D%22%23F3CD32%22%20offset%3D%22100%25%22%2F%3E%0D%0A%20%20%20%20%20%20%20%20%3C%2FlinearGradient%3E%0D%0A%20%20%20%20%3C%2Fdefs%3E%0D%0A%20%20%20%20%3Cg%20id%3D%22PBI-Logo%22%20stroke%3D%22none%22%20stroke-width%3D%221%22%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%0D%0A%20%20%20%20%20%20%20%20%3Cg%20id%3D%22Group%22%20transform%3D%22translate(77.500000%2C%200.000000)%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Crect%20id%3D%22Rectangle%22%20fill%3D%22url(%23linearGradient-1)%22%20x%3D%22256%22%20y%3D%220%22%20width%3D%22219%22%20height%3D%22630%22%20rx%3D%2226%22%2F%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cg%20id%3D%22Combined-Shape%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cuse%20fill%3D%22black%22%20fill-opacity%3D%221%22%20filter%3D%22url(%23filter-4)%22%20xlink%3Ahref%3D%22%23path-3%22%2F%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cuse%20fill%3D%22url(%23linearGradient-2)%22%20fill-rule%3D%22evenodd%22%20xlink%3Ahref%3D%22%23path-3%22%2F%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fg%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M219%2C604%20L219%2C630%20L193%2C630%20L26%2C630%20C11.6405965%2C630%201.75851975e-15%2C618.359403%200%2C604%20L0%2C341%20C-1.75851975e-15%2C326.640597%2011.6405965%2C315%2026%2C315%20L193%2C315%20C207.359403%2C315%20219%2C326.640597%20219%2C341%20L219%2C604%20Z%22%20id%3D%22Combined-Shape%22%20fill%3D%22url(%23linearGradient-5)%22%2F%3E%0D%0A%20%20%20%20%20%20%20%20%3C%2Fg%3E%0D%0A%20%20%20%20%3C%2Fg%3E%0D%0A%3C%2Fsvg%3E" alt="Power BI" className="h-5 w-5 object-contain" />
          <div>
            <span className="block text-[12px] font-semibold">Power BI Semantic Model • Model explorer</span>
            <span className="block text-[9px] text-[#605e5c]">Enterprise_Financial_Metrics</span>
          </div>
        </div>
        <span className="border border-[#c8c6c4] bg-white px-2 py-1 text-[9px] font-semibold">
          Calculation group selected
        </span>
      </div>

      <div className="overflow-x-auto bg-[#f3f2f1] p-4">
        <div className="grid min-w-[850px] grid-cols-[205px_minmax(410px,1fr)_205px] border border-[#c8c6c4] bg-white">
          <div className="border-r border-[#d2d0ce]">
            <div className="border-b border-[#d2d0ce] bg-[#faf9f8] px-3 py-2 text-[10px] font-semibold">Model explorer</div>
            <div role="tree" aria-label="Semantic model explorer" className="py-2 text-[10px]">
              <div role="treeitem" aria-expanded="true" className="px-3 py-1 font-semibold">▾ Enterprise_Financial_Metrics</div>
              <div role="treeitem" className="px-6 py-1 text-[#605e5c]">Measures (40)</div>
              <div role="treeitem" aria-expanded="true" className="px-6 py-1 font-semibold">
                <span aria-hidden="true">▾ </span>
                <span>Calculation groups (1)</span>
              </div>
              <div role="treeitem" aria-selected="true" className="border-l-[3px] border-[#f2c811] bg-[#fff4ce] px-8 py-1.5 font-semibold">
                Time Intelligence
              </div>
              <div role="treeitem" className="px-6 py-1 text-[#605e5c]">Tables (8)</div>
              <div role="treeitem" className="px-6 py-1 text-[#605e5c]">Relationships (7)</div>
            </div>
          </div>

          <div className="min-w-0 border-r border-[#d2d0ce]">
            <div className="flex items-center justify-between border-b border-[#d2d0ce] bg-[#faf9f8] px-3 py-2">
              <div>
                <span className="block text-[10px] font-semibold">Time Intelligence</span>
                <span className="block text-[9px] text-[#605e5c]">Calculation group · precedence 10</span>
              </div>
              <span className="text-[9px] text-[#605e5c]">4 of 8 items shown</span>
            </div>
            <table aria-label="Time Intelligence calculation items" className="w-full border-collapse text-left text-[9px]">
              <thead>
                <tr className="border-b border-[#d2d0ce] bg-[#f3f2f1]">
                  <th className="w-[24%] px-3 py-2 font-semibold">Calculation item</th>
                  <th className="w-[52%] border-l border-[#d2d0ce] px-3 py-2 font-semibold">Expression</th>
                  <th className="w-[24%] border-l border-[#d2d0ce] px-3 py-2 font-semibold">Format string</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[#edebe9]">
                  <td className="px-3 py-2 font-semibold">Current</td>
                  <td className="border-l border-[#edebe9] px-3 py-2 font-mono">SELECTEDMEASURE()</td>
                  <td className="border-l border-[#edebe9] px-3 py-2 text-[#605e5c]">Inherited</td>
                </tr>
                <tr className="border-b border-[#edebe9] bg-[#fffdf3]">
                  <td className="border-l-[3px] border-[#f2c811] px-3 py-2 font-semibold">YTD</td>
                  <td className="border-l border-[#edebe9] px-3 py-2 font-mono">CALCULATE(…, DATESYTD('DimDate'[Date]))</td>
                  <td className="border-l border-[#edebe9] px-3 py-2 text-[#605e5c]">Inherited</td>
                </tr>
                <tr className="border-b border-[#edebe9]">
                  <td className="px-3 py-2 font-semibold">PY</td>
                  <td className="border-l border-[#edebe9] px-3 py-2 font-mono">CALCULATE(…, SAMEPERIODLASTYEAR(…))</td>
                  <td className="border-l border-[#edebe9] px-3 py-2 text-[#605e5c]">Inherited</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-semibold">YoY %</td>
                  <td className="border-l border-[#edebe9] px-3 py-2 font-mono">DIVIDE([Current] - [PY], [PY])</td>
                  <td className="border-l border-[#edebe9] px-3 py-2 font-mono">0.0%</td>
                </tr>
              </tbody>
            </table>
            <div className="border-t border-[#d2d0ce] bg-[#faf9f8] px-3 py-2">
              <span className="block text-[9px] text-[#605e5c]">Selected expression</span>
              <code className="mt-1 block overflow-x-auto whitespace-nowrap border border-[#d2d0ce] bg-white px-2 py-1.5 text-[9px]">
                CALCULATE(SELECTEDMEASURE(), DATESYTD('DimDate'[Date]))
              </code>
            </div>
          </div>

          <div>
            <div className="border-b border-[#d2d0ce] bg-[#faf9f8] px-3 py-2 text-[10px] font-semibold">Properties</div>
            <dl className="divide-y divide-[#edebe9] text-[9px]">
              <div className="px-3 py-2.5">
                <dt className="text-[#605e5c]">Name</dt>
                <dd className="mt-1 font-semibold">Time Intelligence</dd>
              </div>
              <div className="px-3 py-2.5">
                <dt className="text-[#605e5c]">Precedence</dt>
                <dd className="mt-1 font-semibold">10</dd>
              </div>
              <div className="px-3 py-2.5">
                <dt className="text-[#605e5c]">Discourage implicit measures</dt>
                <dd className="mt-1 font-semibold text-[#0b6a0b]">On</dd>
              </div>
              <div className="px-3 py-2.5">
                <dt className="text-[#605e5c]">Dynamic format strings</dt>
                <dd className="mt-1 font-semibold">Enabled</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      <div className="grid divide-y divide-[#d2d0ce] border-t border-[#d2d0ce] text-[10px] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        <div className="px-4 py-3">
          <span className="block text-[#605e5c]">Explicit base measures</span>
          <span className="mt-1 block font-semibold">40</span>
        </div>
        <div className="px-4 py-3">
          <span className="block text-[#605e5c]">Reusable calculation items</span>
          <span className="mt-1 block font-semibold">8</span>
        </div>
        <div className="px-4 py-3">
          <span className="block text-[#605e5c]">Duplicated definitions removed</span>
          <span className="mt-1 block font-semibold">320</span>
        </div>
      </div>
    </div>
  );
}
