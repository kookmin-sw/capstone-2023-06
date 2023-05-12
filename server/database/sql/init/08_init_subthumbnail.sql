create table subthumbnail(
    id int auto_increment primary key,
    product_id int not null,
    picture_id int not null,
    foreign key(product_id) references products(id) on delete cascade,
    foreign key(picture_id) references picture(id) on delete cascade
);