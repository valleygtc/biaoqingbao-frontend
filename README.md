## 简介
“表情宝”前端，地址：[https://bqb.plus](https://bqb.plus)

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

## 自动部署：
```
$ yarn build
$ cd deploy
$ pyinfra -v inventory.py deploy.py
```

## 手动部署：
```
$ yarn build
$ tar -zcvf biaoqingbao-frontend-x.x.x.tar.gz build

$ scp biaoqingbao-frontend-x.x.x.tar.gz <host>:/opt/www/biaoqingbao-frontend
$ ssh <host>
$ cd /opt/www/biaoqingbao-frontend
$ tar -zxvf biaoqingbao-frontend-0.1.0.tar.gz
```

nginx 配置备忘：
```nginx.conf
location / {
    root /opt/www/biaoqingbao-frontend/build;
    try_files $uri /index.html;
    expires 24h;
}
```
