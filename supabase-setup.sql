-- ============================================================
-- Flowchat — Supabase SQL Setup (Naya Dashboard ke liye)
-- Supabase Dashboard -> SQL Editor -> ye poori file paste karke RUN karo
-- ============================================================

-- 1) Instagram accounts table
create table if not exists instagram_accounts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  ig_user_id text unique,
  page_id text,
  username text,
  name text,
  followers_count bigint default 0,
  profile_pic_url text,
  biography text,
  access_token text,
  token_expires_at timestamptz,
  status text default 'active',
  connected_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists idx_instagram_accounts_user on instagram_accounts(user_id);
create index if not exists idx_instagram_accounts_ig on instagram_accounts(ig_user_id);

-- 2) AutoDM rules table
create table if not exists automations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  keyword text,
  reply_type text default 'dm',           -- 'dm' ya 'comment'
  reply_message text,
  status text default 'active',           -- 'active' ya 'paused'
  dms_sent integer default 0,
  clicks integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- purani table ho toh missing columns add kar do
alter table automations add column if not exists user_id uuid;
alter table automations add column if not exists keyword text;
alter table automations add column if not exists reply_type text default 'dm';
alter table automations add column if not exists reply_message text;
alter table automations add column if not exists status text default 'active';
alter table automations add column if not exists dms_sent integer default 0;
alter table automations add column if not exists clicks integer default 0;
alter table automations add column if not exists created_at timestamptz default now();
alter table automations add column if not exists updated_at timestamptz default now();

create index if not exists idx_automations_user on automations(user_id);

-- 3) DM activity log table
create table if not exists dm_logs (
  id uuid primary key default gen_random_uuid(),
  automation_id uuid,
  user_id uuid,
  comment_id text,
  commenter_username text,
  media_id text,
  comment_text text,
  reply_sent text,
  status text default 'failed',           -- 'sent' | 'failed'
  error text,
  created_at timestamptz default now()
);

create index if not exists idx_dm_logs_user on dm_logs(user_id);
create index if not exists idx_dm_logs_comment on dm_logs(comment_id, automation_id);

-- 4) RPC: dms_sent counter badhane ke liye (webhook use karta hai)
create or replace function increment_dms_sent(row_id uuid)
returns void
language plpgsql
as $$
begin
  update automations
  set dms_sent = coalesce(dms_sent, 0) + 1,
      updated_at = now()
  where id = row_id;
end;
$$;

-- ============================================================
-- NOTE: "users" table pehle se exist karti hai (Clerk sync se banti hai).
--       Usme plan, custom_access_granted, subscription_months,
--       plan_expires_at columns admin panel use karta hai — unhe mat chhedna.
-- ============================================================
