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

-- authtype을 int 형으로 한 이유
-- 아직 어떤 인증이 필요하고 어떤 인증이 추가적으로 들어올 것인지 모름
-- varchar로 하기에는 데이터 무결성이 깨질 경우가 있음 ex) 클라이언트나 api가 google이 아니라 gooogle로 저장한 경우
-- enum은 데이터 제약조건이 초반에 붙어 수정이 까다로움
-- int형으로 놓고, int형으로 인증 관련 테이블을 만드는 것이 더 유리할 것으로 보여서 작성함