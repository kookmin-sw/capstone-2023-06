create table follower (
    id int not null AUTO_INCREMENT,
    user_id int not null,
    follower_id int not null,
    PRIMARY KEY(id),
    FOREIGN KEY(user_id) REFERENCES user(id) on delete cascade,
    FOREIGN KEY(follower_id) REFERENCES user(id) on delete cascade
);