create table picture(
    id int not null auto_increment primary key,
    url text not null UNIQUE,
    type VARCHAR(10) not null,
);