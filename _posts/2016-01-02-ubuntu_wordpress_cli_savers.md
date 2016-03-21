---
layout: post
title: Correct file/directory permissions for WordPress on Ubuntu
---
Whenever I'm uploading something through FTP software, the file permissions usually mess up. Three quick commands to clean up the WordPress installation below.

Start by assigning proper file ownership:
{% highlight bash %}
chown www-data:www-data -R *
{% endhighlight %}

Change all files to 644 access:
{% highlight bash %}
find . -type f -exec chmod 644 {} \;
{% endhighlight %}

Change all directories to 755 access:
{% highlight bash %}
find . -type d -exec chmod 755 {} \;
{% endhighlight %}
