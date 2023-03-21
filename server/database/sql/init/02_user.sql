CREATE TABLE user (
    id INT NOT NULL AUTO_INCREMENT,
    nickname VARChAR(45) NOT NULL UNIQUE,
    password VARCHAR(90) NOT NULL,
    email VARCHAR(30) NOT NULL UNIQUE,
    picture VARCHAR(45),
    user_role_id INT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(user_role_id) REFERENCES user_role(id)
);