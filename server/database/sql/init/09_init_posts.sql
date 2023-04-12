CREATE TABLE posts(
    id int not null AUTO_INCREMENT,
    author_id int not null,
    title varchar(50) not null,
    thumbnail text not null,
    content mediumtext not null,
    created_at datetime default current_timestamp,
    modified_at datetime,
    PRIMARY KEY (id),
    foreign key(author_id) references user(id) on delete cascade
);