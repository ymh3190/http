# HTTP

개발자로 근무하면서 정리한 내용에 대한 프로젝트

## 프로젝트 구조(On-Premise)

    1. 아키텍처 구조: client <-> reverse proxy <-> frontend서버 <-> reverse proxy <-> backend서버 <-> db
                                                                                            <-> middleware <-> PLC

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

## 프로젝트 구조(Container)

    - AWS EC2에 Docker 배포
    - webserver-backend-db 3tier architecture 구성
    - network 구성:
      - 172.20.0.1: gateway
      - 172.20.0.2: db
      - 172.20.0.3: backend
      - 172.20.0.4: webserver

## REST API를 위한 데이터베이스 설계 원칙

- PK, FK 설계: https://www.youtube.com/watch?v=B5r8CcTUs5Y / https://www.youtube.com/watch?v=tN6oJu2DqCM&t=491s 4:55
  - PK: auto_increment
  - FK: table_id
  - Composite PK: Unique(column, column2, ...)로 고유성을 보장
- auto_increment 이점: https://www.quora.com/What-are-the-advantages-of-using-an-auto-increment-column-as-a-primary-key-in-MySQL
  - 고유성, 단순성, 효율성, 데이터 무결성, 인덱싱
  - 데이터베이스 관리 단순화 및 성능 개선 및 데이터 무결성 향상
- 비정규화
  - reference: https://www.youtube.com/watch?v=V27XkmVPqYQ 5:20
  - 테이블 join시 성능 저하 이슈를 해결하기 위한 것
- url
  - ex) ?sort=-id&limit=1
  - ex) ?filter=color:blue

## REST API

- reference:

  - https://aws.amazon.com/what-is/restful-api
  - https://www.youtube.com/watch?v=-mN3VyJuCjM
  - https://docs.tosspayments.com/blog/what-is-idempotency

- AWS의 REST API개념 설명을 가져왔습니다.

      1. REST API란? 두 컴퓨터가 통신하는 표준

      2. API란? 서로 다른 두 컴퓨터가 서로에게 얘기하는 방법

      3. REST란? API 작동 방식에 대한 조건을 부과하는 소프트웨어 아키텍처

        - API 개발자는 여러 아키텍처를 사용하여 API를 설계할 수 있습니다. REST 아키텍처 스타일을 따르는 API를 REST API라고 합니다. REST 아키텍처를 구현하는 웹 서비스를 RESTful 웹 서비스라고 합니다. RESTful API라는 용어는 일반적으로 RESTful 웹 API를 나타냅니다. 하지만 REST API와 RESTful API라는 용어는 같은 의미로 사용할 수 있습니다.

        - REST API를 따르는 실 서비스: Stripe, Google Maps

      3-1. Uniform interface(균일한 인터페이스) - 요청은 리소스를 식별해야 한다. 이를 위해 균일한 리소스 식별자(URI)를 사용한다. - https://example.com/api/v3/products -> Product database, Create, Read products - https://example.com/api/v3/products/:id -> Read, Update, Delete product - https://example.com/api/v3/users -> User database

        - 명사를 사용한다. https://example.com/api/v3/getAllProducts -> 잘못된 사용

        - POST Method: Create new a resource
        - GET Method: Read the data about an existing resource
        - PUT(Patch) Method: Update an existing resource
        - DELETE Method: Remove an existing resource

        - 응답에 상태 코드를 포함한다.
        - OK: 200, 201, 304, 301, 302, 307, 308
        - Client Side Error: 400, 401, 403, 404
        - Server Side Error: 500

        - when an api is idempotent, making multiple identical requests has the same effect as making a single request.
        - api가 멱등하다는 것은 작업 결과가 한 번 수행하든 여러 번 수행하든 결과가 같다는 것
        - POST, PATCH: not idempotent
        - GET, PUT, DELETE: idempotent

        - pagination scheme: limit, offset -> /products?limit=25&offset=50

        - Versioning -> v1, v2

        - REST API가 항상 좋으냐? 그건 아니고 GraphQL, gRPC와 같은 아키텍처가 있다.

      3-2. Stateless(무상태) - 클라이언트와 서버가 세션 상태 정보를 저장하지 않는다는 것. 모든 요청과 응답의 사이클은 독립적이다. 이로 인해 웹 애플리케이션의 스케일 조정을 쉽게 하고 잘 동작하게 됐다.

      3-3. Layered system(계층화 시스템) - 레이어 분리

      3-4. Cacheability(캐시 가능성) - Server Side: 응답 헤더 ETag - Client Side: 요청 헤더 If-None-Match

      4. 사용하는 이유

        - 서비스 크기에 따른 확장성
        - 클라이언트-서버 분리에 따른 유연성
        - 프로그래밍 언어에 따른 독립성

## Middleware

- reference: https://aws.amazon.com/ko/what-is/middleware/

      - 개념: 미들웨어는 서로 다른 애플리케이션이 서로 통신하는 데 사용되는 소프트웨어입니다. 미들웨어는 더욱 빠르게 혁신할 수 있도록 애플리케이션을 지능적이고 효율적으로 연결하는 기능을 제공합니다. 미들웨어는 단일 시스템에 원활하게 통합할 수 있도록 다양한 기술, 도구, 데이터베이스 간에 다리 역할을 합니다. 그런 다음 이 단일 시스템은 사용자에게 통합된 서비스를 제공합니다. 예를 들어 Windows 프런트엔드 애플리케이션은 Linux 백엔드 서버에서 데이터를 송수신하지만, 애플리케이션 사용자는 그 차이를 인식하지 못합니다.

      - 사용 사례

        - 게임 개발: 게임 엔진
        - 전자: 다양한 유형의 센서를 메시징 프레임워크를 통해 컨트롤러와 통신

## CI / CD

    - Continuous Integration / Continuous Delivery, Deployment

    - 개념: 애플리케이션 개발 단계부터 배포 때까지 이 모든 단계들을 자동화를 통해서 조금 더 효율적이고 빠르게 사용자에게 빈번이 배포할 수 있도록 만드는 것을 말함

    - 사용 하는 이유
      빈번한 배포로 머지 주기를 짧게하여 충돌 문제를 덜 겪고, 문제시 해결 시간 단축의 장점
      자동 빌드, 테스트를 거쳐 수동 배포(Delivery) 혹은 자동 배포(Deployment)

    - 도구
      - jenkins, buildkite, github actions, gitlab ci/cd, bitbucket pipelines, circleci

    - reference: https://www.youtube.com/watch?v=sIPU_VkrguI
      - 마틴 파울러가 제시하는 CI의 4가지 규칙
        - 모든 소스코드가 살아 있고 누구든 현재의 소스에 접근할 수 있는 단일 지점을 유지할 것
        - 빌드 프로세스를 자동화해서 누구든 소스로부터 시스템을 빌드할 수 있게 할 것
        - 테스팅을 자동화해서 언제든지 시스템에 대한 건전한 테스트 수트를 실행할 수 있게 할 것
        - 누구든 현재 실행 파일을 얻으면 지금까지 가장 완전한 실행 파일을 얻었다는 확신을 하게 할 것

      - 무중단 배포 구현 방법
        - AWS에서 Blue-Green 무중단 배포
        - 도커를 이용한 무중단 배포
        - L4, L7 스위치를 이용한 무중단 배포
        - Nginx를 이용한 무중단 배포
          - Rolling 배포: 서버를 차례대로 업데이트 시키는 방식
            - 장점: 인스턴스를 추가하지 않아도 되는 점
            - 단점: 트래픽 쏠림, 구버전과 신버전의 공존으로 인한 호환성 문제
          - Canary 배포: 신버전을 소수의 사용자에게만 배포
            - 장점: 문제 상황을 빠르게 감지
            - 단점: 모니터링 관리 비용, 구버전과 신버전의 공존으로 인한 호환성 문제
          - Blue / Green 배포
            - Blue: 구버전, Green: 신버전
            - 구버전과 동일하게 신버전의 인스턴스를 구성
            - 신버전 배포 시 로드 밸런서를 통해 신버전으로만 트래픽을 전환
            - 장점: 빠른 배포 속도, 롤백 가능
            - 단점: 시스템 자원이 2배로 필요

## NGINX

- references: https://www.youtube.com/watch?v=9t9Mp0BGnyI

      - 리버스 프록시, 로드 밸런스, 캐싱을 위한 오픈 소스 웹 서버
      - encryption, decryption

      - directive:
        - key-value pair

      - context(block):
        - http {
          include mime.types;
        }

        - location:
          - path
          - html
          - proxy_pass

        - upstream ws {
          server 127.0.0.1:3000;
          server 127.0.0.1:3001;
          server 127.0.0.1:3002;
        }

        - upstream was {
          server 127.0.0.1:4000;
          server 127.0.0.1:4001;
          server 127.0.0.1:4002;
        }

        server {
          listen 8080;

          location / {
            proxy_pass http://ws/;
          }
        }

        server {
          listen 9090;

          location /api {
            proxy_pass http://was/;
          }

        }

      - command:
        - nginx -s reload|stop|quit|reopen: send signal to a master process
        - nginx -t: test configuration
        - nginx -T: test configuration && show configuration

## Docker

    - command:
      - docker build -f Dockerfile -t fun-docker .
        - .: build context, Dockerfile 위치
        - -f: Dockerfile 이름 명시, Dockerfile이면 생략 가능
        - -t: 이미지 이름 부여, 깃헙 리파지토리와 동일. 컨테이너 레지스트리에 푸시할 때 재사용됨

      - docker build -t webserver .

      - docker images: 로컬PC에서 만든 이미지를 확인

      - docker run -d -p 3000:3000 fun-docker
        - -d: detached, 백그라운드 실행을 의미
        - -p: port 지정, 호스트:컨테이너

      - docker run -it --rm -d -p 8000:80 --name web webserver

      - docker ps: 현재 구동중인 컨테이너 리스트

      - docker logs container_id
        - ex) docker logs f22c0f33b3c3

      - docker tag fun-docker:latest ymh3190/docker-example:latest
        - 도커허브에 이미지를 푸시하기 위해서는 docker images의 REPOSITORY이 동일해야한다
        - 그렇기 때문에 docker tag 명령어를 실행해서 리파지토리와 동일한 이름의 이미지를 생성한다.

      - docker login

      - docker push ymh3190/docker-example:fun-docker:latest

      - docker run -it --rm -d -p 8000:80 --name website nginx
        - -it: instruct docker to allocate a pseudo tty conneciton or allow us to have an interactive bash

        - --rm: clean up the containers and remove the file system if the container exists already

      - docker exec -it container_id bash || docker exec -it container_name bash
        - 해당 컨테이너 쉘모드 진입

      - docker top container_id || docker top container_name
        - 해당 컨테이너 사용중인 프로세스 확인

      - service nginx start|stop
        - 해당 컨테이너 쉘모드에서 nginx 시작|정지

      - custom nginx image
        - docker-compose
          - docker-compose up: yml파일을 읽어 컨테이너 실행
          - docker-compose up -d: yml파일을 읽어 데몬으로 컨테이너 실행
          - docker-compose down: stop and remove containers, networks

## AWS

    - ec2 docker compose 배포
    - 1. 로컬PC에서 image를 빌드하고(db, back, front) 각각 dockerHub에 올리고
    - 2. docker-compose.ym에서 해당 이미지를 다운받아서 컨데이너 빌드 및 실행

## VS Code 디버깅

    - 디버그 모드 실행: 서버 환경에서 디버깅을 위해서 launch.json 파일 생성을 클릭하고 Node.js를 선택합니다

    - 왼쪽 위 실행 프로그램을 선택하는 부분에서 Node.js를 선택 후 실행할 스크립트를 클릭합니다

## MySQL ORM

- 데이터베이스(입력)에 대한 일반화
  https://github.com/ymh3190/http/blob/main/backend/src/db.js

  - sequelize 및 typeORM과 비교하기

- crypto.randomUUID() 사용할 경우(UUID v4)

  - insert 성능 이슈(MySQL RDBMS: B+Tree)
  - reference: https://planetscale.com/blog/the-problem-with-using-a-uuid-primary-key-in-mysql#uuidv4

## Linux

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

  - 스케줄링: crontab

## Windows

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

## DOM Tree

- DOM 객체에 접근하는 것을 자동으로 할 수 없을까?, 다른 프로젝트에서도 사용하고 싶은데?
  https://github.com/ymh3190/http/blob/main/frontend/src/dom-sync.js

## WebSocket

- observer design pattern
- alarm

## Status Code

- 206
- 304
- 리다이렉트:
  - 301과 302는 리다이렉트할 때 GET Method로 변경해서 전송. 301대신에 308, 302대신에 307을 쓰면 더 안전
  - 301: Moved Permanently
  - 302: Found
  - 307: Temperary Redirect
  - 308: Permanent Redirect

## Origin/path?param

- % 전송 인코딩 문제

  - % -> %25
  - The encodeURI() function escapes characters by UTF-8 code units, with each octet encoded in the format %XX, left-padded with 0 if necessary.
  - encodeURI와 encodeURIComponent 차이
  - 레퍼런스: https://codingeverybody.kr/자바스크립트-인코딩-함수-비교/
