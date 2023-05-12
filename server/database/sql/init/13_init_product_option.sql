create table product_option(
    id int not null auto_increment primary key,
    product_id int not null,
    option_id int not null,   
    option_value varchar(45) not null,
    foreign key(product_id) references products(id) on delete cascade,
    foreign key(option_id) references options(id) on delete cascade
);