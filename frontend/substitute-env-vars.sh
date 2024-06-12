#!/bin/sh
ROOT_DIR=/usr/share/nginx/html

# Replace env vars in files served by NGINX
for file in $ROOT_DIR/static/js/*.js*;
do
  sed -i 's|REACT_APP_BACKEND_PLACEHOLDER|'${REACT_APP_BACKEND}'|g' $file
done