#!/bin/sh
# if a command is not provided, set a default command
if [ $# -eq 0 ]; then
  set -- python app.py
fi
# update to new requirements on each container start
pip --no-cache-dir install --upgrade -r requirements.txt
# use exec to replace pid 1 with the command (e.g. python app.py)
exec "$@"