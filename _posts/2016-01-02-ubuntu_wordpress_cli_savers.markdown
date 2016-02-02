---
layout: post
title: Correct file/directory permissions for WordPress on Ubuntu
---
Whenever I'm uploading something through FTP software, the file permissions usually mess up. Three quick commands to clean up the WordPress installation below.

Start by assigning proper file ownership:
`chown www-data:www-data -R *`

Change all files to 644 access:
`find . -type f -exec chmod 644 {} \;`

Change all directories to 755 access:
`find . -type d -exec chmod 755 {} \;`
