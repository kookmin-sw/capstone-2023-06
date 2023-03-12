# Node JS Project-A

## 개발환경 구성
docker-compose로 db / node 컨테이너로 구성되어 있음

mysql 버전: 8.0.31

node 버전: 19.4.0
## 구성 방법
### 1. git clone
### 2. Docker 다운로드
### 3. Visual Studio Code Extension
<img width="206" alt="스크린샷 2023-01-12 오전 9 32 26" src="https://user-images.githubusercontent.com/63653473/211947713-86694dd0-187e-4e6e-8e09-c1670d429d41.png">


Visual Studio Code Extension으로 Docker와 Dev Containers 다운로드
### 3. .env 파일
.env 파일을 노션의 백엔드 세션에서 찾아 다운로드 받고
프로젝트의 **/enviroment** 폴더에 복사 붙여넣기
### 4. envioment 폴더 진입
> cd enviroment
### 5. docker-compose로 빌드
> docker compose up -d --build
### 6. 개발
<img width="354" alt="스크린샷 2023-01-12 오전 9 37 33" src="https://user-images.githubusercontent.com/63653473/211948341-5ec69891-bf0b-4cdc-bd6a-cd8083ddeadd.png">

Viusal Studio Code에서 도커 탭 클릭 후 다루고 다룰 컨테이너 우클릭하고 Attach Shell 혹은 Attach Visual Studio Code 클릭하여 개발
### 7. 실행
node 컨테이너에서 아래의 명령어를 입력하면 서버 실행됨
> node main.js

### 추가 사항
1. DB를 Workbench 등의 툴에 연결하고 싶으면 Host는 localhost, User와 Password, Port는 .env 참고 (DB_USER / DB_PASS / DB_HOST_PORT)
2. docker build 전에 **/database/sql/init** 에 Create Table 쿼리을 추가하여 테이블 생성 가능 (Create Table 쿼리만 가능 / build시에만 작동)
