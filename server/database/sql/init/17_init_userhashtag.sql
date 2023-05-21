create table user_hashtag (
    id int not null auto_increment primary key,
    hashtag_id int not null,
    user_id int not null,
    score int not null,
    foreign key(hashtag_id) references hashtag(id) on delete cascade,
    foreign key(user_id) references user(id) on delete cascade
);