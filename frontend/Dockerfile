# 도커 이미지를 만들 때 처음부터 우리가 다 만드는게 아니라
# 만들어진 걸 가져다 쓴다
# nodejs를 예로, 18은 버전, 앨파인은 리눅스 최소 단위 버전
FROM node:18-alpine

# 도커 이미지(컨테이너) 안에서 어떤 경로에 이 이미지를 실행할 건지 명시
# WORKDIR는 cd와 같은 명령어
# 우리 이미지 파일 안에서 어떤 디렉토리에 우리 애플리케이션을 복사해 올 건지 명시
# app 디렉토리에 들어왔다
WORKDIR /app

COPY .env babel.config.json ./

# Dockerfile에서 복사하거나 명령어를 수행하는 것은
# 레이어 시스템으로 구성되어 있기 때문에
# 빈번하게 변경되는 파일일수록 마지막에 복사
# 변경 사항이 적은 것들 위주로 먼저 복사
# WORKDIR 명령어를 통해서 /app이라는 경로에 들어왔기 때문에
# ./는 현재 경로, /app 폴더를 의미한다
COPY package.json package-lock.json ./

# package.json에 명시된 모든 모듈을 설치한다
# npm install보다 ci가 더 좋다.
# install을 하면 예를들어 버전 3으로 도커파일을 만들었는데
# 해당 모듈이 버전 5가 나왔다? 그럼 버전 5가 설치됨
# 그래서 프로젝트를 개발한 버전과 다를 수 있다
# ci를 사용하면 lock.json에 명시된 버전으로 설치됨
# 이름이 왜 ci냐? CI/CD를 세팅할 때 사용. continuous integration의 약자
RUN npm ci

COPY static ./static

COPY views ./views

COPY webpack.config.js ./

COPY client ./client

COPY src ./src

RUN npm run build

CMD [ "npm", "start" ]
# ENTRYPOINT ["node", "index.js"]