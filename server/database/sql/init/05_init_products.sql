create table products(
    id int not null auto_increment primary key,
    author_id int not null,
    title varchar(255) not null,
    description varchar(255) not null, 
    content text not null,
    created_at datetime default current_timestamp,
    modified_at datetime,
    thumbnail text not null,
    price int not null,
    foreign key(author_id) references user(id) on delete cascade
);