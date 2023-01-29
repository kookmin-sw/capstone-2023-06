create table product_tag(
    id int not null auto_increment primary key,
    x float not null,
    y float not null,
    product_id int null,
    target_product_id int null,
    picture_id int null
);