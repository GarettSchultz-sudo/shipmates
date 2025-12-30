-- ShipMates Database Schema for Supabase
-- Run this in the Supabase SQL Editor

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Profiles table
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  display_name text,
  one_liner text,
  project_url text,
  tech_stack text[] default '{}',
  looking_for text[] default '{}',
  building_pace text,
  timezone text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- Swipes table
create table public.swipes (
  id uuid default uuid_generate_v4() primary key,
  swiper_id uuid references public.profiles(id) on delete cascade not null,
  swiped_id uuid references public.profiles(id) on delete cascade not null,
  action text not null check (action in ('pass', 'connect', 'super_connect')),
  created_at timestamp with time zone default timezone('utc'::text, now()),
  unique(swiper_id, swiped_id)
);

-- Matches table
create table public.matches (
  id uuid default uuid_generate_v4() primary key,
  user1_id uuid references public.profiles(id) on delete cascade not null,
  user2_id uuid references public.profiles(id) on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  unique(user1_id, user2_id),
  check (user1_id < user2_id)
);

-- Messages table
create table public.messages (
  id uuid default uuid_generate_v4() primary key,
  match_id uuid references public.matches(id) on delete cascade not null,
  sender_id uuid references public.profiles(id) on delete cascade not null,
  content text not null,
  read_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Indexes for performance
create index swipes_swiper_id_idx on public.swipes(swiper_id);
create index swipes_swiped_id_idx on public.swipes(swiped_id);
create index matches_user1_id_idx on public.matches(user1_id);
create index matches_user2_id_idx on public.matches(user2_id);
create index messages_match_id_idx on public.messages(match_id);
create index messages_created_at_idx on public.messages(created_at);

-- Row Level Security (RLS)
alter table public.profiles enable row level security;
alter table public.swipes enable row level security;
alter table public.matches enable row level security;
alter table public.messages enable row level security;

-- Profiles policies
create policy "Public profiles are viewable by authenticated users"
  on public.profiles for select
  using (auth.role() = 'authenticated');

create policy "Users can insert their own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Swipes policies
create policy "Users can view their own swipes"
  on public.swipes for select
  using (auth.uid() = swiper_id);

create policy "Users can create their own swipes"
  on public.swipes for insert
  with check (auth.uid() = swiper_id);

-- Matches policies
create policy "Users can view their own matches"
  on public.matches for select
  using (auth.uid() = user1_id or auth.uid() = user2_id);

create policy "Authenticated users can create matches"
  on public.matches for insert
  with check (auth.role() = 'authenticated');

-- Messages policies
create policy "Users can view messages in their matches"
  on public.messages for select
  using (
    exists (
      select 1 from public.matches
      where id = messages.match_id
      and (user1_id = auth.uid() or user2_id = auth.uid())
    )
  );

create policy "Users can insert messages in their matches"
  on public.messages for insert
  with check (
    auth.uid() = sender_id
    and exists (
      select 1 from public.matches
      where id = match_id
      and (user1_id = auth.uid() or user2_id = auth.uid())
    )
  );

create policy "Users can update their own message read status"
  on public.messages for update
  using (
    exists (
      select 1 from public.matches
      where id = messages.match_id
      and (user1_id = auth.uid() or user2_id = auth.uid())
    )
  );

-- Enable Realtime for messages
alter publication supabase_realtime add table public.messages;
alter publication supabase_realtime add table public.matches;
