# 多阶段构建镜像，先build代码，再copy到nginx

# 第一阶段，build代码
# 基础镜像
FROM node:18-alpine AS build
# 设置环境代理源
RUN corepack enable && npm config set registry https://registry.npmmirror.com && yarn config set registry https://registry.npmmirror.com && pnpm config set registry https://registry.npmmirror.com
# 工作目录
WORKDIR /journey-admin
# 先copy不变的
COPY package.json pnpm-lock.yaml ./
# 安装依赖
RUN pnpm install
# 再copy源码
COPY . .
# 源代码构建
RUN pnpm build


# 第二阶段，放到nginx镜像
# 基础镜像
FROM nginx:alpine
# Nginx目录
ENV NGINX_PATH=/etc/nginx
# 删除nginx目录原有配置文件
RUN rm -rf ${NGINX_PATH}/nginx.conf
RUN rm -rf ${NGINX_PATH}/conf.d
# 复制新的配置文件
COPY ./nginx/nginx.conf ${NGINX_PATH}/
# 复制证书
COPY ./nginx/cert/ ${NGINX_PATH}/cert/
# 创建工作目录
WORKDIR /journey-admin
# 复制第一阶段构建好的代码
COPY --from=build /journey-admin/dist ./dist/

EXPOSE 80
EXPOSE 443

# 可以通过 docker build -t journey-admin . 来创建本地镜像
# 通过 docker run -d -p 80:80 443:443 --rm journey-admin 来运行此镜像
# 通过 docker exec -it fdba3 sh 进入容器内部