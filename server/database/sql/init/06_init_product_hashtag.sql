create table product_hashtag(
    id int not null auto_increment primary key,
    product_id int not null,
    hashtag_id int not null,
    foreign key(product_id) references products(id) on delete cascade,
    foreign key(hashtag_id) references hashtag(id) on delete cascade
);