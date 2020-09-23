# 表情宝前端
在线地址：[bqb.plus](https://bqb.plus)

## 部署：
建议使用 Nginx 作为服务器，配置文件参考：[nginx.conf](./deploy/nginx.conf)

自动部署：
```
$ yarn build
$ cd deploy
$ pyinfra -v inventory.py deploy.py
```

手动部署：
```
$ yarn build
$ tar -zcvf biaoqingbao-frontend-x.x.x.tar.gz build

$ scp biaoqingbao-frontend-x.x.x.tar.gz <host>:/opt/www/biaoqingbao-frontend
$ ssh <host>
$ cd /opt/www/biaoqingbao-frontend
$ tar -zxvf biaoqingbao-frontend-0.1.0.tar.gz
```

## 开发：
```bash
$ yarn # 安装依赖
$ yarn start
```

Debug PWA service worker:
```
$ yarn build
$ node serve.js
```
