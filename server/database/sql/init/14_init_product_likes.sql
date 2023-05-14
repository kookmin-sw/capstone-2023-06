CREATE TABLE product_likes(
    id int not null AUTO_INCREMENT,
    user_id int not null,
    product_id int not null,
    PRIMARY KEY (id),
    foreign key(user_id) references user(id) on delete cascade,
    foreign key(product_id) references products(id) on delete cascade
);