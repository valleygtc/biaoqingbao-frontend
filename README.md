## 开发：
```bashs
$ yarn # 安装依赖
$ yarn start
```

## 自动部署：
```
$ yarn build
$ fab -H 39.106.194.240 upgrade
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
    expires 24h;
}
```
