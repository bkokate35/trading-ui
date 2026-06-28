export type Token = {
  symbol: string;
  name: string;
  mint: string;
  tradingViewSymbol: string;
  price: string;
  change: string;
  volume: string;
  holders: string;
  marketCap: string;
  accent: string;
};

export const tokens: Token[] = [
  {
    symbol: "CHAD",
    name: "ChadWallet",
    mint: "So11111111111111111111111111111111111111112",
    tradingViewSymbol: "BINANCE:SOLUSDT",
    price: "$0.0428",
    change: "+38.2%",
    volume: "$8.4M",
    holders: "18,420",
    marketCap: "$42.8M",
    accent: "#b8ff2c"
  },
  {
    symbol: "SOL",
    name: "Solana",
    mint: "So11111111111111111111111111111111111111112",
    tradingViewSymbol: "BINANCE:SOLUSDT",
    price: "$147.63",
    change: "+4.8%",
    volume: "$1.9B",
    holders: "11.2M",
    marketCap: "$68.7B",
    accent: "#46f7a7"
  },
  {
    symbol: "BONK",
    name: "Bonk",
    mint: "DezXAZ8z7PnrnRJjz3EznwXk6kdPn9P76XzwTeWA6i2",
    tradingViewSymbol: "GATEIO:BONKUSDT",
    price: "$0.000023",
    change: "+16.5%",
    volume: "$221M",
    holders: "896K",
    marketCap: "$1.55B",
    accent: "#ff5c39"
  },
  {
    symbol: "JUP",
    name: "Jupiter",
    mint: "JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN",
    tradingViewSymbol: "BINANCE:JUPUSDT",
    price: "$0.91",
    change: "+9.1%",
    volume: "$96M",
    holders: "612K",
    marketCap: "$1.23B",
    accent: "#35c8ff"
  },
  {
    symbol: "WIF",
    name: "dogwifhat",
    mint: "EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzL2622VZpLrxo",
    tradingViewSymbol: "BINANCE:WIFUSDT",
    price: "$1.84",
    change: "+12.7%",
    volume: "$318M",
    holders: "198K",
    marketCap: "$1.83B",
    accent: "#f7d95c"
  },
  {
    symbol: "PYTH",
    name: "Pyth Network",
    mint: "HZ1JovNiVvGrGNiiYvEozEVg4uYCQGf8F5r8k7x3y1H",
    tradingViewSymbol: "BINANCE:PYTHUSDT",
    price: "$0.34",
    change: "+6.3%",
    volume: "$48M",
    holders: "327K",
    marketCap: "$1.22B",
    accent: "#c183ff"
  }
];

export const holders: [string, string, string][] = [
  ["7t9...CHAD", "3.82%", "+$41,920"],
  ["9xA...moon", "2.14%", "+$18,204"],
  ["SoL...maxi", "1.88%", "+$15,840"],
  ["Jup...ape", "1.41%", "+$9,331"],
  ["Bnk...run", "0.92%", "+$4,508"]
];

export const trades: [string, string, string, string][] = [
  ["Buy", "12,500 CHAD", "$535.00", "now"],
  ["Buy", "4.8 SOL", "$708.62", "4s"],
  ["Sell", "31,000 BONK", "$713.00", "7s"],
  ["Buy", "620 JUP", "$564.20", "11s"],
  ["Buy", "380 WIF", "$699.20", "16s"],
  ["Sell", "1,900 PYTH", "$646.00", "22s"]
];

export function getToken(symbol?: string) {
  return tokens.find((token) => token.symbol.toLowerCase() === symbol?.toLowerCase()) ?? tokens[0];
}
