create table product(
    id int not null auto_increment primary key,
    author_id int not null,
    title varchar(255) not null,
    content text not null,
    created_at datetime,
    modified_at datetime
);