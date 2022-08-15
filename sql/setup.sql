-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`\

create table yawp_users (
    id bigint generated always as identity primary key,
    first_name text not null,
    last_name text not null,
    email text not null,
    password_hash text not null
);

create table restaurants (
    id bigint generated always as identity primary key,
    name text not null,
    food_type text not null
);

create table restaurants_reviews (
    id bigint generated always as identity primary key,
    star_rating int not null,
    restaurant_id bigint,
    user_id bigint,
    foreign key (restaurant_id) references restaurants(id),
    foreign key (user_id) references yawp_users(id)
);
