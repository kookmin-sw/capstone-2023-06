create table USER(
    uid varchar(50) not null unique,
    nickname varchar(12) not null unique,
    email varchar(20) not null unique,
    password varchar(20) not null,
    phone varchar(11) not null unique,
    authtype int not null,
    usertype ENUM("ADMIN", "SELLER", "BUYER") not null DEFAULT "BUYER",
    PRIMARY KEY (uid)
);

-- create문만 init할 수 있음