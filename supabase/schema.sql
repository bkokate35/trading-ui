create table if not exists public.watchlist_tokens (
  id bigint generated always as identity primary key,
  symbol text not null unique,
  mint text not null,
  display_name text not null,
  trading_view_symbol text,
  accent text not null default '#b8ff2c',
  enabled boolean not null default true,
  sort_order integer not null default 100,
  created_at timestamptz not null default now()
);

alter table public.watchlist_tokens enable row level security;

create policy "watchlist_tokens_public_read"
  on public.watchlist_tokens
  for select
  using (enabled = true);

insert into public.watchlist_tokens
  (symbol, mint, display_name, trading_view_symbol, accent, sort_order)
values
  ('CHAD', 'So11111111111111111111111111111111111111112', 'ChadWallet', 'BINANCE:SOLUSDT', '#b8ff2c', 10),
  ('SOL', 'So11111111111111111111111111111111111111112', 'Solana', 'BINANCE:SOLUSDT', '#46f7a7', 20),
  ('BONK', 'DezXAZ8z7PnrnRJjz3EznwXk6kdPn9P76XzwTeWA6i2', 'Bonk', 'GATEIO:BONKUSDT', '#ff5c39', 30),
  ('JUP', 'JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN', 'Jupiter', 'BINANCE:JUPUSDT', '#35c8ff', 40),
  ('WIF', 'EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzL2622VZpLrxo', 'dogwifhat', 'BINANCE:WIFUSDT', '#f7d95c', 50),
  ('PYTH', 'HZ1JovNiVvGrGNiiYvEozEVg4uYCQGf8F5r8k7x3y1H', 'Pyth Network', 'BINANCE:PYTHUSDT', '#c183ff', 60)
on conflict (symbol) do update set
  mint = excluded.mint,
  display_name = excluded.display_name,
  trading_view_symbol = excluded.trading_view_symbol,
  accent = excluded.accent,
  sort_order = excluded.sort_order,
  enabled = true;
