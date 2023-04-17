CREATE TABLE post_hashtag(
    id int not null AUTO_INCREMENT,
    hashtag_id int not null,
    post_id int not null,
    PRIMARY KEY (id),
    foreign key(hashtag_id) references hashtag(id) on delete cascade,
    foreign key(post_id) references posts(id) on delete cascade
);