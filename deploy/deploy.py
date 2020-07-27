import os
from datetime import datetime

from pyinfra.operations import files, server

now = datetime.now()
time_id = now.strftime("%Y-%m-%d-%H-%M-%S") # 2020-07-27-18-20-06
filename = f'biaoqingbao-frontend-{time_id}.tar.gz'
os.system(f'tar -zcvf {filename} ../build')

repo_dir = '/opt/www/biaoqingbao-frontend'

files.put(
    name=f'Upload {filename}',
    src=filename,
    dest=f'{repo_dir}/{filename}',
    mode='644',
)

files.directory(
    name='Remove old build dir',
    path=f'{repo_dir}/build',
    present=False,
)

server.shell(
  name=f'Extract {filename}',
  commands=[f'tar -zxvf {filename}'],
  chdir=repo_dir,
)
