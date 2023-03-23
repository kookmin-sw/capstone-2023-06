CREATE TABLE user_role(
    id int not null,
    role VARCHAR(45) NOT NULL UNIQUE,
    PRIMARY KEY (id)
);