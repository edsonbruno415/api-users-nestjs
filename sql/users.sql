drop schema if exists app cascade;

create schema app;

drop table if exists app.users cascade;

create table app.users (
	id uuid primary key,
	name varchar(63) not null,
	email varchar(127) not null,
  password varchar(127) not null,
	createdAt timestamp not null default now(),
	updatedAt timestamp not null default now()
);

-- docker run --name postgres-database -e POSTGRES_USER=root -e POSTGRES_PASSWORD=root123 -p 5432:5432 -d postgres
-- docker exec -it postgres-database psql --host=localhost --username=root
-- CREATE DATABASE app;
-- docker exec -it postgres-database psql --host=localhost --username=root --dbname=app --command="$(cat sql/users.sql)"