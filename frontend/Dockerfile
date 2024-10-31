#1. React App 빌드 
FROM node:alpine3.10 as build
# 작업 디렉토리 설정    
WORKDIR /app
# 패키지 파일 복사
COPY package.json ./
# 패키지 설치
RUN npm install
# 원본 디렉토리의 모든 항목을 /app 디렉토리로 소스 파일 복사
COPY . .
# 빌드
RUN npm run build

#2. 만들어진 빌드파일을 Nginx로 serve
FROM nginx:1.23-alpine
# Nginx 파일 들어있는 곳으로 이동
WORKDIR /usr/share/nginx/html
# 전부 삭제
RUN rm -rf ./*
# 빌드파일 복사
COPY --from=dist /app/dist .
# 포트 설정
EXPOSE 80
# 진입점 설정
ENTRYPOINT [ "nginx","-g", "daemon off;" ]