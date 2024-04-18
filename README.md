# HTTP

## 개발자로 근무하면서 느낀 문제 의식에 대한 프로젝트

### 타입스크립트로 전환 예정

    여러 사람이 개발하는 환경에서 타입을 강제할 필요를 느낌, 회사 템플릿에 기여하기 위함

### VS Code 디버깅

    - 디버그 모드 실행: 서버 환경에서 디버깅을 위해서 launch.json 파일 생성을 클릭하고 Node.js를 선택합니다
    - 왼쪽 위 실행 프로그램을 선택하는 부분에서 Node.js를 선택 후 실행할 스크립트를 클릭합니다

### MySQL ORM

- sequelize와 비교하기

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

  3. 선택
     - 모든 테이블의 id를 Char(32)로 하고, UUIDv1에서 high와 low를 변경해서 B+Tree 성능 유지

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
