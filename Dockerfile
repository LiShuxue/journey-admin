# 基础镜像
FROM nginx:alpine

# Nginx目录
ENV NGINX_PATH=/etc/nginx

# 删除nginx目录原有配置文件
RUN rm -rf ${NGINX_PATH}/nginx.conf
RUN rm -rf ${NGINX_PATH}/conf.d

# 复制新的配置文件
COPY ./nginx.conf ${NGINX_PATH}/

# 工作目录
WORKDIR /journey-admin

# 创建dist文件夹
RUN mkdir dist

# 将容器的 /journey-admin/dist 文件夹挂载出去
VOLUME /journey-admin/dist

# 不需要暴露端口，因为前面有单独的nginx反向代理

# 可以通过 docker build -t lishuxue/journey-admin . 来创建本地镜像
# 通过 docker run -d --name journey-admin --rm lishuxue/journey-admin 来运行此镜像
# 通过 docker exec -it fdba3 sh 进入容器内部