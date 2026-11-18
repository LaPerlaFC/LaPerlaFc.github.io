-- Pega todo esto en Supabase > SQL Editor > Run
create table if not exists app_state(
  id int primary key,
  json jsonb not null default '{}',
  updated_at timestamptz default now()
);
alter table app_state enable row level security;
create policy "todos leen" on app_state for select using (true);
create policy "admin inserta" on app_state for insert to authenticated with check (true);
create policy "admin actualiza" on app_state for update to authenticated using (true) with check (true);

insert into storage.buckets(id,name,public) values('media','media',true) on conflict do nothing;
create policy "media lectura" on storage.objects for select using (bucket_id='media');
create policy "media admin sube" on storage.objects for insert to authenticated with check (bucket_id='media');
