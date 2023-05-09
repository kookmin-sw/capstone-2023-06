create table options(
    id int not null auto_increment primary key,
    name varchar(45) not null,
    parent_id int,
    foreign key(parent_id) references options(id) on delete cascade
);