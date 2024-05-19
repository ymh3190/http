# HTTP

## 개발자로 근무하면서 느낀 문제 의식에 대한 프로젝트

### 프로젝트 구조

    1. 아키텍처 구조: client <-> frontend서버 <-> backend서버 <-> db
    2. 데이터 흐름:
      - client: frontend서버에 리소스를 요청
      - frontend 서버: 필요한 데이터를 backend 서버에 요청
      - backend 서버: 데이터 조회 후 frontend 서버에 응답
      - frontend 서버: ejs렌더 및 backend 서버로 부터 받은 데이터를 클라이언트에 응답

    3. 서비스 설정
      - frontend 서버:
        - 예) port 8081에서 listening 상태
        - frontend 서버만 외부에 노출시킴
        - view engine ejs는 서버 사이드 렌더링
      - backend 서버: 예) port 8082에서 listening 상태
      - db서버:
        - bind-address 127.0.0.1으로 외부노출 X
        - 만약 db서버를 따로 구축한다면 bind-address를 0.0.0.0으로 설정하고
        - iptables로 backend서버 공인IP/32만 허용

    4. 스케일업 계획
      - 각각의 서버만 따로 분리시켜서 구축하는 구조
      - frontend 서버: 내부망에 nginx나 apache를 사용할 계층. 이 서버만 외부에 노출시키고
                      nginx나 apache를 프록시 서버 기능으로 사용
      - backend 서버: 마찬가지로 내부망에 nginx나 apache를 사용할 계층. 이 서버만 frontend
                      서버에 노출시키고 iptables -s 기능으로 해당 프론트엔드 서버에서 오는 트래픽만 허용
      - db 서버: iptables로 backend 서버의 아이피만 허용

### REST API

    - AWS의 REST API개념 설명을 가져왔습니다. reference) https://aws.amazon.com/what-is/restful-api/
    1. REST API란? 두 컴퓨터가 통신하는 표준
    2. API란? 서로 다른 두 컴퓨터가 서로에게 얘기하는 방법
    3. REST란? API 작동 방식에 대한 조건을 부과하는 소프트웨어 아키텍처
      - API 개발자는 여러 아키텍처를 사용하여 API를 설계할 수 있습니다. REST 아키텍처 스타일을 따르는 API를 REST API라고 합니다. REST 아키텍처를 구현하는 웹 서비스를 RESTful 웹 서비스라고 합니다. RESTful API라는 용어는 일반적으로 RESTful 웹 API를 나타냅니다. 하지만 REST API와 RESTful API라는 용어는 같은 의미로 사용할 수 있습니다.
      - REST API를 따르는 실 서비스: Stripe, Google Maps reference) https://www.youtube.com/watch?v=-mN3VyJuCjM
      3-1. Uniform interface(균일한 인터페이스)
        - HTTP/1.1
        - 요청은 리소스를 식별해야 한다. 이를 위해 균일한 리소스 식별자(URI)를 사용한다.
        - https://example.com/api/v3/products -> Product database, Create, Read products
        - https://example.com/api/v3/products/:id -> Read, Update, Delete product
        - https://example.com/api/v3/users -> User database
        - 명사를 사용한다. https://example.com/api/v3/getAllProducts -> 잘못된 사용
        - POST Method: Create new a resource
        - GET Method: Read the data about an existing resource
        - PUT(Patch) Method: Update an existing resource
        - DELETE Method: Remove an existing resource
        - 응답에 상태 코드를 포함한다.
        - OK: 200, 201, 206, 304
        - Client Side Error: 400, 401, 403, 404
        - Server Side Error: 500
        - when an api is idempotent, making multiple identical requests has the same effect as making a single request.
        - api가 멱등하다는 것은 작업 결과가 한 번 수행하든 여러 번 수행하든 결과가 같다는 것 reference) https://docs.tosspayments.com/blog/what-is-idempotency
        - POST, PATCH: not idempotent
        - GET, PUT, DELETE: idempotent
        - pagination scheme: limit, offset -> /products?limit=25&offset=50
        - Versioning -> v1, v2
        - REST API가 항상 좋으냐? 그건 아니고 GraphQL, gRPC와 같은 아키텍처가 있다.
      3-2. Stateless(무상태)
        - 클라이언트와 서버가 세션 상태 정보를 저장하지 않는다는 것. 모든 요청과 응답의 사이클은 독립적이다. 이로 인해 웹 애플리케이션의 스케일 조정을 쉽게 하고 잘 동작하게 됐다.
      3-3. Layered system(계층화 시스템)
        - 레이어 분리
      3-4. Cacheability(캐시 가능성)
        - Server Side: 응답 헤더 ETag
        - Client Side: 요청 헤더 If-None-Match

### 타입스크립트로 전환 예정

    - 여러 사람이 개발하는 환경에서 타입을 강제할 필요를 느낌, 회사 템플릿에 기여하기 위함

### VS Code 디버깅

    - 디버그 모드 실행: 서버 환경에서 디버깅을 위해서 launch.json 파일 생성을 클릭하고 Node.js를 선택합니다
    - 왼쪽 위 실행 프로그램을 선택하는 부분에서 Node.js를 선택 후 실행할 스크립트를 클릭합니다

### MySQL ORM

- sequelize 및 typeORM과 비교하기

- create, select, update, delete, join

  - 데이터베이스(입력)에 대한 일반화
    https://github.com/ymh3190/http/blob/main/backend/src/db.js

  - 조인시 테이블간 id 칼럼명 중복에 대한 부분은 FROM 테이블 기준으로 변경

- UUID char(32) vs binary(16)

  1. crypto.randomUUID() 사용할 경우

     - char(32) 타입으로 binary(16)에 비해 큰 저장 공간을 차지(하이픈(-) 제외)
     - INSERT 성능 이슈(MySQL RDBMS: B+Tree)
     - 레퍼런스: https://planetscale.com/blog/the-problem-with-using-a-uuid-primary-key-in-mysql#uuidv4

     - 해결 방안
       UUIDv1 time_high <-> time_low

  2. UUID_TO_BIN 내장함수를 사용할 경우

     - INSERT 후 해당 id를 선택해 오는 문제

  3. 선택(X)

     - 모든 테이블의 id를 Char(32)로 하고, UUIDv1에서 high와 low를 변경해서 B+Tree 성능 유지

  4. Snowflake가 대안이 될 것 같다.

  5. 선택(O)

     - int auto_increnment

### Linux

- iptables

  - 패킷 제어 스크립트

        pc 3대(90, 39, 140)에서 90번 피시가 39번 피시에게 request를 하지만 39번 피시는 패킷을 140으로 포워드 후 90에게 전달

        #/bin/bash

        iptables -t nat -A PREROUTING -p tcp --dport 8082 -j DNAT --to-destination 192.168.0.39
        iptables -t nat -A POSTROUTING -o eno1 -s 192.168.0.0/24 -j SNAT --to-source 192.168.0.140

        sysctl -w net.ipv4.ip_forward=1

- shell script

  - request with cookies

        #/bin/bash

        ls dataset/cookies > /dev/null 2>&1
        if [ $? = 1 ]
        then
        curl -i -d '{"username": "admin", "password": "1"}' \
        -H 'Content-Type: application/json' \
        192.168.0.90:8081/api/v1/auth/signin \
        | grep -i set-cookie > data/cookies 2> /dev/null
        fi
        curl -s -o /dev/null -w %{time_total}\\n -b data/cookies 192.168.0.90:8081/

  - mysqldump

        #!/bin/bash

        DATE=`date +%Y%m%d`
        mysqldump -uroot -ppassword db > db_${DATE}.sql
        scp db_${DATE}.sql 'user'@'192.168.0.100':/volume1/db_backup
        rm db_${DATE}.sql

        #procedure
        mysqldump --routines --no-create-info --no-data --no-create-db --skip-opt -uroot -ppassword db > routine_${DATE}.sql
        scp routine_${DATE}.sql 'user'@'192.168.0.100':/volume1/db_backup/routines
        rm routine_${DATE}.sql

- systemctl, journalctl

  - 데몬: systemctl
  - 로그: journalctl

- cron

  - 스케줄링
  - crontab -e

### Windows

- batch script

  - auto-commit

        @echo off

        cd %userprofile%\Desktop\generics && ^
        git add . && ^
        set /p comment=input comment:
        git commit -m %comment% && ^
        git push origin main

  - auto-run

        @echo off

        set desktopPath=%userprofile%\Desktop
        set batsPath=%desktopPath%\bats
        set genericsPath=%desktopPath%\generics
        set frontendPath=%genericsPath%\frontend
        set backendPath=%genericsPath%\backend

        start "back" %batsPath%\back.bat
        start "front" %batsPath%\front.bat
        start "dist" %batsPath%\dist.bat

### DOM Tree

- DOM 객체에 접근하는 것을 자동으로 할 수 없을까?, 다른 프로젝트에서도 사용하고 싶은데?
  https://github.com/ymh3190/http/blob/main/frontend/src/dom-sync.js

### WebSocket

- observer design pattern
- alarm

### Status Code

- 304
- 206

### Origin/path?param

- % 전송 인코딩 문제

  - % -> %25
  - The encodeURI() function escapes characters by UTF-8 code units, with each octet encoded in the format %XX, left-padded with 0 if necessary.
  - encodeURI와 encodeURIComponent 차이
  - 레퍼런스: https://codingeverybody.kr/자바스크립트-인코딩-함수-비교/
