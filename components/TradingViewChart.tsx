type TradingViewChartProps = {
  symbol: string;
};

export function TradingViewChart({ symbol }: TradingViewChartProps) {
  const params = new URLSearchParams({
    symbol,
    interval: "15",
    theme: "dark",
    style: "1",
    locale: "en",
    hide_top_toolbar: "1",
    hide_legend: "1",
    allow_symbol_change: "0",
    save_image: "0",
    backgroundColor: "rgba(6,16,11,1)",
    gridColor: "rgba(255,255,255,0.06)"
  });

  return (
    <div className="h-72 overflow-hidden rounded border border-white/10 bg-black/24">
      <iframe
        className="h-full w-full"
        loading="lazy"
        src={`https://s.tradingview.com/widgetembed/?${params.toString()}`}
        title={`${symbol} TradingView chart`}
      />
    </div>
  );
}
