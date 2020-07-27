from datetime import datetime

from fabric import task
import invoke


@task
def upgrade(c):
    now = datetime.now()
    time_id = now.strftime("%Y%m%d") # 20200421
    filename = f'biaoqingbao-frontend-{time_id}.tar.gz'
    invoke.run(f'tar -zcvf {filename} build')
    result = c.put(filename, remote='/opt/www/biaoqingbao-frontend/')
    print(f'Uploaded {result.local} to {result.remote}')
    with c.cd('/opt/www/biaoqingbao-frontend/'):
        c.run('rm -rf build')
        print('extract .tar.gz:')
        result = c.run(f'tar -zxvf {filename}')
