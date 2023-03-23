CREATE TABLE postlikes(
    id int not null AUTO_INCREMENT,
    user_id int not null,
    post_id int not null,
    PRIMARY KEY (id),
    foreign key(user_id) references user(id) on delete cascade,
    foreign key(post_id) references posts(id) on delete cascade
);