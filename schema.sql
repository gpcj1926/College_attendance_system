-- Run this query in the Supabase SQL editor to setup your tables  
-- Follow the convention of double-quoting column names so they support camelCase   
-- Full instructions at https://divjoy.com/docs/supabase

/*** USERS ***/

create table public.users (
  -- UUID from auth.users
  "id" uuid references auth.users not null primary key,
  -- User data
  "email" text,
  "roleas" text,
  "status" text default 'Not Approved',
  "department" text,
  "mobileno" text,
  "name" text,
  -- Validate data
  constraint "email" check (char_length("email") >= 3 OR char_length("email") <= 500),
  constraint "name" check (char_length("name") >= 1 OR char_length("name") <= 144)
);

-- Create security policies
alter table public.users enable row level security;
create policy "Can view their user data" on public.users for select using ( auth.uid() = "id" );
create policy "Can update their user data" on public.users for update using ( auth.uid() = "id" );

-- Create a trigger that automatically inserts a new user after signup with Supabase Auth
create or replace function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.users ("id", "email", "name" , "role")
  values (new."id", new."email", new."raw_user_meta_data"->>'full_name');
  return new;
end;
$$ language plpgsql security definer;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


-- Create a trigger that automatically updates a user when their email is changed in Supabase Auth
create or replace function public.handle_update_user() 
returns trigger as $$
begin
  update public.users
  set "email" = new."email"
  where "id" = new."id";
  return new;
end;
$$ language plpgsql security definer;
create trigger on_auth_user_updated
  after update of "email" on auth.users
  for each row execute procedure public.handle_update_user();


create table public.students (
  "id" uuid primary key default uuid_generate_v4(),
  "owner" uuid references public.users not null,
  "name" text,
  "address" text,
  "cnic_no" text,
  "college_rollno" text,
  "dateofbirth" text,
  "department" text,
  "email_address" text,
  "father_name" text,
  "gender" text,
  "phone_number" text,
  "registration_no" text,
  "session" text,
  "shift" text,
  "religion" text,
  "university_rollno" text,
  "createdAt" timestamp with time zone default timezone('utc'::text, now()) not null
);


create table public.attendance  (
  "id" uuid primary key default uuid_generate_v4(),
  "owner" uuid references public.users not null,
  "attendance" text,
  "class_id" uuid,
  "teacher_id" uuid,
  "student_id" uuid,
  "phone_number" text,
  "subject" text,
  "university_rollno" text,
  "college_rollno" text,
  "name" text,
  "createdAt" timestamp with time zone default timezone('utc'::text, now()) not null
);


create table public.classes  (
  "id" uuid primary key default uuid_generate_v4(),
  "owner" uuid references public.users not null,
  "class_name" text,
  "department" text,
  "semester" text,
  "shift" text,
  "teacher_id" uuid,
  "createdAt" timestamp with time zone default timezone('utc'::text, now()) not null
);