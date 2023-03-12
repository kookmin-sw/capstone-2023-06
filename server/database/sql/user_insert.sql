-- create table USER(
--     uid varchar(50) not null unique,
--     nickname varchar(12) not null,
--     email varchar(20) not null unique,
--     password varchar(20) not null,
--     phone varchar(11) not null unique,
--     authtype int not null,
--     usertype ENUM("ADMIN", "SELLER", "BUYER") not null DEFAULT "BUYER",
--     PRIMARY KEY (uid)
-- );
insert into user values
("1", "ADMIN_TEST1", "test01@naver.com", "@Ehddnjs12", "01025300767", 1, "ADMIN"),
("2", "SELLER_TEST1", "test02@naver.com", "@Ehddnjs12", "01023421123", 1, "SELLER"),
("3", "BUYER_TEST1", "test03@naver.com", "@Ehddnjs12", "01012345678", 1, "BUYER");