create table product_comments(
    id int not null AUTO_INCREMENT,
    user_id int not null,
    product_id int not null,
    parent_id int,
    comment varchar(100) not null,
    created_at datetime default current_timestamp,
    modified_at datetime,
    PRIMARY KEY (id),
    foreign key(user_id) references user(id) on delete cascade,
    foreign key(product_id) references products(id) on delete cascade,
    foreign key(parent_id) references product_comments(id) on delete cascade
);