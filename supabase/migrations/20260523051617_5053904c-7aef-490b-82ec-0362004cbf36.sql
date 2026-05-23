
insert into storage.buckets (id, name, public)
values ('site-media', 'site-media', true)
on conflict (id) do nothing;

create policy "Public read site-media"
  on storage.objects for select
  using (bucket_id = 'site-media');
