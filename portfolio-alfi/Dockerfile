FROM php:8.3-apache

RUN docker-php-ext-install pdo_mysql

RUN a2enmod rewrite headers
ENV APP_ENV=production APP_SECURE_COOKIES=1
RUN printf '%s\n' 'expose_php=Off' 'display_errors=Off' 'log_errors=On' 'upload_max_filesize=10M' 'post_max_size=32M' 'max_file_uploads=20' > /usr/local/etc/php/conf.d/production.ini

WORKDIR /var/www/html
COPY . .

# Simpan gambar awal untuk disalin ke persistent disk.
RUN mkdir -p uploads /opt/initial-uploads \
    && cp -a uploads/. /opt/initial-uploads/

# Lindungi file internal dan cegah eksekusi PHP di uploads.
RUN printf '%s\n' \
    '<Directory /var/www/html>' \
    'Options -Indexes' \
    'AllowOverride All' \
    '</Directory>' \
    '<DirectoryMatch "^/var/www/html/(database|includes|frontend|tools|deploy)(/|$)">' \
    'Require all denied' \
    '</DirectoryMatch>' \
    '<FilesMatch "(?i)^(config\.php|Dockerfile|\.env.*)$|\.(sql|md|zip|rar)$">' \
    'Require all denied' \
    '</FilesMatch>' \
    '<Directory /var/www/html/uploads>' \
    '<FilesMatch "(?i)\.(php[0-9]*|phtml|phar)$">' \
    'Require all denied' \
    '</FilesMatch>' \
    '</Directory>' \
    > /etc/apache2/conf-enabled/portfolio-security.conf

EXPOSE 80

CMD ["sh", "-c", "cp -rn /opt/initial-uploads/. /var/www/html/uploads/ && chown -R www-data:www-data /var/www/html/uploads && exec apache2-foreground"]
