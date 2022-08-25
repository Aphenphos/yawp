-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`\

drop table if exists restaurants_reviews;
drop table if exists restaurants;
drop table if exists yawp_users;

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
    stars int not null,
    detail text not null,
    restaurant_id bigint not null,
    user_id bigint not null,
    foreign key (restaurant_id) references restaurants(id),
    foreign key (user_id) references yawp_users(id)
);


insert into yawp_users (
    first_name,
    last_name,
    email,
    password_hash
)
values
    ('Geg', 'Um', 'geg@geg', '123'),
    ('Deg', 'Bum', 'gerg@grg', '123')
;

insert into restaurants (
    name,
    food_type
)
values
    ('McDonalds', 'Burger'),
    ('BurgerKing', 'Burgers')
;

insert into restaurants_reviews (
    stars,
    detail,
    restaurant_id,
    user_id
)
values
    ('5', 'sucks', '1', '2'),
    ('4', 'great','1', '1'),
    ('3', 'gross','2', '1'),
    ('2', 'amazing','2', '2')
;

