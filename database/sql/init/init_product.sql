create table product(
    id int not null auto_increment primary key,
    author_id int not null,
    title varchar(255) not null,
    content text not null,
    create_at datetime,
    modify_at datetime
);