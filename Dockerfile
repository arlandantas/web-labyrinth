FROM httpd:2.4.41-alpine

COPY ssl/server.crt /usr/local/apache2/conf/server.crt
COPY ssl/server.key /usr/local/apache2/conf/server.key

RUN sed -i \
        -e 's/^#\(Include .*httpd-ssl.conf\)/\1/' \
        -e 's/^#\(LoadModule .*mod_ssl.so\)/\1/' \
        -e 's/^#\(LoadModule .*mod_socache_shmcb.so\)/\1/' \
        conf/httpd.conf