type MarketChartProps = {
  accent: string;
};

const points = "0,150 55,132 105,142 155,92 215,104 275,66 335,78 390,42 452,56 510,24 580,36 640,18";
const area = `${points} 640,190 0,190`;

export function MarketChart({ accent }: MarketChartProps) {
  return (
    <div className="relative h-72 overflow-hidden rounded border border-white/10 bg-black/24">
      <div className="absolute inset-0 noise opacity-30" />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 640 210" preserveAspectRatio="none">
        <defs>
          <linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={accent} stopOpacity="0.34" />
            <stop offset="100%" stopColor={accent} stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon fill="url(#chartFill)" points={area} />
        <polyline fill="none" points={points} stroke={accent} strokeLinecap="round" strokeWidth="5" />
      </svg>
    </div>
  );
}
