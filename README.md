# HTTP

## 개발자로 근무하면서 느낀 문제 의식에 대한 프로젝트

### MySQL ORM

- create, select, update, delete
  - 데이터베이스(입력)에 대한 일반화
  - https://github.com/ymh3190/http/blob/main/backend/src/db.js

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

- components
- server-side

### WebSocket

- observer design pattern
- alarm

### status code

- 304
- 206

### origin/path?param

- 한글 전송 인코딩 문제
